/**
 * rata-vo.mjs — meratakan loudness berkas VO ke TARGET_LUFS.
 *
 *   node --env-file=.env tools/rata-vo.mjs <slug>              # rencana saja
 *   node --env-file=.env tools/rata-vo.mjs <slug> --jalan
 *   node --env-file=.env tools/rata-vo.mjs <slug> S1 --jalan
 *
 * KENAPA DI MP3, BUKAN DI MP4 HASIL RENDER: kalau perataannya ditempel ke
 * berkas keluaran, MP4 di render/ berhenti bisa dihasilkan ulang dari
 * `npm run render` — dan berkas yang tidak bisa dibuat ulang adalah berkas yang
 * tidak bisa diperbaiki. Diratakan di sumbernya, setiap render sesudahnya benar
 * dengan sendirinya.
 *
 * Keluaran TTS duduk jauh di bawah target siar. YouTube TIDAK menaikkan yang
 * pelan — ia cuma menurunkan yang keras — jadi video yang dikirim sepelan itu
 * akan terdengar pelan di sebelah Shorts orang lain, selamanya.
 *
 * METODENYA: penguatan SERAGAM, lalu limiter true-peak. Bukan loudnorm.
 *
 * Sebelum ini di sini berdiri loudnorm dua langkah dengan `linear=true` dan
 * seluruh `measured_*` — persis resep yang seharusnya membuat penguatannya
 * linier. Ternyata ffmpeg mengabaikannya: keluaran TTS ini duduk di −17 LUFS
 * dengan puncak yang sudah menyentuh −1,5 dBTP (aliran S1 malah +0,09), jadi
 * penguatan yang dibutuhkan MELANGGAR batas puncaknya — dan saat itu terjadi
 * loudnorm diam-diam jatuh ke mode dinamis. Diukur di berkas T14 yang sudah
 * jadi, ffmpeg sendiri yang melaporkannya:
 *
 *     "normalization_type" : "dynamic"      <- di KETIGA berkas yang diperiksa
 *     input_lra 5,70  ->  output_lra 21,70  <- dinamikanya justru dirusak
 *
 * Itu persis "napas yang ikut dikeraskan" yang komentar lama ini bilang sedang
 * dihindari, dan hasilnya mendarat di tempat yang berbeda-beda tiap berkas
 * (−14,99 / −14,33 / −14,07 dari target yang sama) — yang terdengar sebagai
 * pencerita yang maju-mundur dari mikrofon antar-scene.
 *
 * Gantinya dua bagian yang masing-masing cuma mengerjakan satu hal:
 *
 *   1. `volume` — satu angka dB yang sama untuk seluruh berkas. Ini yang benar
 *      -benar linier: tidak ada bagian yang dinaikkan lebih daripada bagian
 *      lain, jadi jarak antara kalimat keras dan napas tetap persis seperti
 *      yang dibaca.
 *   2. `alimiter` di 4x laju cuplik — cuma puncaknya yang disentuh, dalam
 *      hitungan milidetik, bukan selubung loudness-nya yang hitungan detik.
 *      Oversampling-nya bukan hiasan: tanpa itu limiter bekerja di puncak
 *      CUPLIK, dan true-peak-nya menyelinap 0,85 dB di atas ambang.
 *
 * Karena limiter memakan sebagian penguatan, gain-nya dicari berulang (secant,
 * ≤ 5 putaran) sampai mendarat di dalam ±0,15 LU dari target. Tiap putaran
 * mengukur WAV sementara dari berkas ASLI — MP3-nya baru ditulis sekali, di
 * akhir, jadi tidak ada rugi generasi walaupun putarannya empat kali.
 *
 * Diukur pada aliran L T14: −14,00 LUFS, −1,50 dBTP, LRA 5,7 → 5,1.
 *
 * Aman dijalankan berkali-kali: berkas yang sudah berada dalam ±0,5 LU dari
 * target dilewati.
 */

import { spawnSync } from "node:child_process";
import { existsSync, renameSync, unlinkSync } from "node:fs";

import { bacaEpisode, bacaShort, daftarShort, wajib } from "./baca-episode.mjs";

const argv = process.argv.slice(2);
const bebas = argv.filter((a) => !a.startsWith("--"));
const slug = bebas[0];
const hanya = bebas[1];
const JALAN = argv.includes("--jalan");

if (!slug) {
  console.error("Pakai: node --env-file=.env tools/rata-vo.mjs <slug> [L|S1|S2] [--jalan]");
  process.exit(1);
}

const TARGET = wajib("TARGET_LUFS");
const TP = -1.5;
const LRA = 11;
/** Selisih yang masih dianggap "sudah pas" dan tidak perlu disentuh.
 *
 *  0,2 dan bukan 0,5 seperti dulu: dengan loudnorm yang lama, mendarat lebih
 *  dekat daripada ±0,5 memang tidak bisa dijanjikan, jadi ambang seketat ini
 *  cuma akan membuat berkas dikodekan ulang berkali-kali tanpa membaik.
 *  Rantai penggantinya mendarat di ±0,15 (MENDARAT di bawah), jadi 0,2 tetap
 *  idempoten — jalan kedua melewati semuanya — sementara 0,5 meninggalkan
 *  selisih setengah LU antar-scene yang justru keluhan yang sedang dibereskan. */
const AMBANG = 0.2;

/** Seberapa dekat ke target sudah dianggap mendarat. Lebih ketat daripada
 *  AMBANG — AMBANG memutuskan apakah sebuah berkas PERLU disentuh, ini
 *  memutuskan kapan pencarian gain-nya berhenti. */
const MENDARAT = 0.15;
const PUTARAN_MAX = 5;

/** Ambang limiter dalam amplitudo linier, bukan dB — `alimiter` memintanya
 *  begitu. 10^(−1,5/20) = 0,841. */
const LIMIT = 10 ** (TP / 20);

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";
const BITRATE = process.env.GEMINI_TTS_MP3_BITRATE?.trim() || "128k";

/** Penguatan seragam, lalu puncaknya ditahan di 4x laju cuplik.
 *
 *  Urutannya mengikat: menahan puncak SEBELUM dikuatkan tidak menahan apa pun,
 *  karena yang melanggar ambang justru hasil penguatannya. */
const rantai = (gain) =>
  `volume=${gain.toFixed(3)}dB,aresample=192000,` +
  `alimiter=limit=${LIMIT.toFixed(4)}:attack=5:release=50:level=disabled,` +
  `aresample=44100`;

/** ffmpeg menulis SEMUA laporannya — termasuk JSON loudnorm — ke stderr, dan
 *  keluar dengan kode nol saat berhasil. `spawnSync` dipakai justru karena ia
 *  menyerahkan stderr baik saat gagal maupun saat berhasil; `execFileSync` cuma
 *  memberikannya lewat exception, jadi jalur suksesnya kehilangan angkanya. */
const jalankanFF = (args) => {
  const r = spawnSync(FFMPEG, args, { encoding: "utf8" });
  if (r.error?.code === "ENOENT") {
    console.error("ffmpeg tidak ditemukan. Pasang: winget install Gyan.FFmpeg");
    console.error("PATH-nya baru aktif di terminal BARU, atau set FFMPEG_PATH di .env.");
    process.exit(1);
  }
  if (r.status !== 0) {
    console.error(String(r.stderr ?? r.error?.message).slice(-500));
    process.exit(1);
  }
  return String(r.stderr ?? "");
};

/** Langkah 1: ukur. */
const ukur = (path) => {
  const stderr = jalankanFF([
    "-hide_banner", "-nostats", "-i", path,
    "-af", `loudnorm=I=${TARGET}:TP=${TP}:LRA=${LRA}:print_format=json`,
    "-f", "null", "-",
  ]);
  const m = /\{[\s\S]*\}/.exec(stderr);
  if (!m) {
    console.error(`Tidak bisa mengukur ${path}. Keluaran ffmpeg:\n${stderr.slice(-400)}`);
    process.exit(1);
  }
  return JSON.parse(m[0]);
};

/** Mencari gain yang membuat berkas ini mendarat di TARGET setelah limiter.
 *
 *  Kenapa dicari dan tidak dihitung: berapa loudness yang dimakan limiter
 *  bergantung pada bentuk puncak berkasnya, dan itu tidak diketahui sebelum
 *  limiternya jalan. Diukur di T14, satu dB gain menghasilkan sekitar 0,63 LU
 *  — tapi angka itu milik berkas itu, bukan tetapan.
 *
 *  Secant dengan dua titik nyata, bukan Newton dengan turunan yang ditebak:
 *  putaran pertama memakai kemiringan 1,0 (tebakan aman karena selalu MENGHASILKAN
 *  gain yang kekecilan, tidak pernah kebesaran), lalu kemiringannya diukur dari
 *  dua putaran terakhir.
 *
 *  TIAP PUTARAN MENULIS MP3, BUKAN WAV, dan yang mendarat itulah yang dipakai.
 *  Versi pertama mencari di WAV lalu menulis MP3 dari gain yang ditemukan — dan
 *  hasilnya tidak idempoten: encode 128k sendiri menggeser loudness sekitar
 *  0,45 LU, jadi berkas yang "mendarat di −14,00" muncul lagi sebagai −14,45 di
 *  jalan berikutnya. Penjaga yang mengukur artefak yang bukan artefak yang
 *  ditulis adalah penjaga yang tidak ada — kesalahan yang sama persis dengan
 *  yang sudah tercatat di potongDanTulis (bikin-vo-utuh.mjs).
 *
 *  Tiap putaran meng-encode dari berkas ASLI, bukan dari hasil putaran
 *  sebelumnya, jadi empat putaran tetap satu generasi. */
const cariGain = (path, awalI, tmpMp3) => {
  const jejak = [];
  let gain = Number(TARGET) - awalI;
  let sebelum = null;

  for (let putaran = 1; putaran <= PUTARAN_MAX; putaran++) {
    jalankanFF([
      "-hide_banner", "-nostats", "-y", "-i", path,
      "-af", rantai(gain),
      "-ar", "44100", "-b:a", BITRATE, "-codec:a", "libmp3lame",
      "-f", "mp3", tmpMp3,
    ]);
    const m = ukur(tmpMp3);
    const I = Number(m.input_i);
    jejak.push({ gain, I, tp: Number(m.input_tp), lra: Number(m.input_lra) });

    const meleset = Number(TARGET) - I;
    if (Math.abs(meleset) <= MENDARAT) return { gain, hasil: jejak.at(-1), jejak };

    /* Kemiringan dari dua putaran terakhir; putaran pertama belum punya
       pasangan, jadi ia memakai 1,0. Dijaga di 0,2..1,0 supaya satu pengukuran
       yang aneh tidak melempar gain ke tempat yang jauh. */
    let kemiringan = 1;
    if (sebelum && Math.abs(gain - sebelum.gain) > 1e-6) {
      kemiringan = (I - sebelum.I) / (gain - sebelum.gain);
      kemiringan = Math.min(1, Math.max(0.2, kemiringan));
    }
    sebelum = { gain, I };
    gain += meleset / kemiringan;
  }

  return { gain: null, hasil: jejak.at(-1), jejak };
};

const keluaran = [
  { prefiks: "L", label: "video panjang", ...bacaEpisode(slug) },
  ...daftarShort(slug).map((s) => ({
    prefiks: s.prefiks,
    label: `Short ${s.nomor} · ${s.folder}`,
    ...bacaShort(slug, s),
  })),
];

let adaKerja = false;
let gagalAda = false;

for (const k of keluaran) {
  if (hanya && hanya.toUpperCase() !== k.prefiks) continue;

  const berkas = k.timing.filter((t) => t.voAudio).map((t) => ({ kunci: t.kunci, path: `public/${t.voAudio}` }));
  if (berkas.length === 0) continue;

  console.log(`\n=== ${k.label} · ${k.prefiks} · target ${TARGET} LUFS ===`);

  for (const b of berkas) {
    const m = ukur(b.path);
    const I = Number(m.input_i);
    const selisih = Number(TARGET) - I;

    if (Math.abs(selisih) <= AMBANG) {
      console.log(`  ${b.kunci.padEnd(18)} ${I.toFixed(1)} LUFS — sudah pas, dilewati`);
      continue;
    }

    adaKerja = true;
    console.log(
      `  ${b.kunci.padEnd(18)} ${I.toFixed(1)} LUFS → ${TARGET}` +
        ` (${selisih > 0 ? "+" : ""}${selisih.toFixed(1)} LU)` +
        (JALAN ? "" : "   [rencana]"),
    );
    if (!JALAN) continue;

    /* Berkas yang mendarat ditulis sebagai `.part` dulu lalu DINAMAI — proses
       yang mati di tengah pencarian meninggalkan `.part`, bukan MP3 setengah
       jadi di tempat berkas VO yang asli. */
    const tmp = `${b.path}.part`;
    const { gain, hasil, jejak } = cariGain(b.path, I, tmp);

    if (gain === null) {
      if (existsSync(tmp)) unlinkSync(tmp);
      console.error(
        `\n  ${b.kunci}: gain tidak mendarat setelah ${PUTARAN_MAX} putaran.\n` +
          jejak.map((j) => `      gain ${j.gain.toFixed(2)} dB -> ${j.I.toFixed(2)} LUFS`).join("\n") +
          `\n  Berkasnya TIDAK diubah. Dengarkan sendiri — bentuk puncaknya tidak wajar.\n`,
      );
      gagalAda = true;
      continue;
    }

    renameSync(tmp, b.path);

    /* LRA sebelum dan sesudah dicetak berdampingan justru karena inilah yang
       dulu rusak tanpa ketahuan: yang lama mendarat di angka loudness yang
       benar sambil melebarkan LRA 5,7 jadi 21,7. Angka loudness saja bukan
       bukti perataannya sehat. */
    console.log(
      `      gain ${gain >= 0 ? "+" : ""}${gain.toFixed(2)} dB · ` +
        `${hasil.I.toFixed(2)} LUFS · ${hasil.tp.toFixed(2)} dBTP · ` +
        `LRA ${Number(m.input_lra).toFixed(1)} → ${hasil.lra.toFixed(1)} · ` +
        `${jejak.length} putaran`,
    );
  }
}

if (!adaKerja) {
  console.log("\nSemua berkas VO sudah berada di sekitar target. Tidak ada yang diubah.\n");
} else if (!JALAN) {
  console.log("\nIni baru rencana — belum ada berkas yang disentuh. Tambahkan --jalan.\n");
} else {
  console.log(
    "\nSelesai. Jalankan `npm run gen` (durasi berkas bisa bergeser beberapa\n" +
      "milidetik setelah dikodekan ulang), lalu render.\n",
  );
}

/* Berkas yang gagal mendarat dilaporkan dengan kode keluar, bukan cuma dengan
   tulisan: rata-vo dipanggil di tengah rangkaian perintah, dan yang gagal di
   tengah daftar panjang tidak pernah terbaca di layar. */
if (gagalAda) process.exit(1);
