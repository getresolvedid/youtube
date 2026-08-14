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
 * Keluaran ElevenLabs duduk di sekitar −24 LUFS. YouTube TIDAK menaikkan yang
 * pelan — ia cuma menurunkan yang keras — jadi video yang dikirim sepelan itu
 * akan terdengar pelan di sebelah Shorts orang lain, selamanya.
 *
 * Metodenya loudnorm dua langkah (ukur dulu, baru terapkan): langkah kedua
 * memakai angka hasil langkah pertama, jadi penguatannya linier dan dinamika
 * kalimatnya tidak dipompa. Batas puncaknya −1,5 dBTP supaya tidak ada yang
 * terpotong setelah dikuatkan.
 *
 * Aman dijalankan berkali-kali: berkas yang sudah berada dalam ±0,5 LU dari
 * target dilewati.
 */

import { spawnSync } from "node:child_process";
import { renameSync, unlinkSync } from "node:fs";

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
const AMBANG = 0.5;

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";

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

const keluaran = [
  { prefiks: "L", label: "video panjang", ...bacaEpisode(slug) },
  ...daftarShort(slug).map((s) => ({
    prefiks: s.prefiks,
    label: `Short ${s.nomor} · ${s.folder}`,
    ...bacaShort(slug, s),
  })),
];

let adaKerja = false;

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

    /* Langkah 2: terapkan dengan angka hasil pengukuran — inilah yang membuatnya
       linier. Tanpa measured_*, loudnorm bekerja dinamis dan menaikkan bagian
       pelan di dalam satu kalimat, yang pada narasi terdengar seperti napas
       ikut dikeraskan. */
    const tmp = `${b.path}.norm.mp3`;
    jalankanFF([
      "-hide_banner", "-nostats", "-y", "-i", b.path,
      "-af",
      `loudnorm=I=${TARGET}:TP=${TP}:LRA=${LRA}` +
        `:measured_I=${m.input_i}:measured_TP=${m.input_tp}` +
        `:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}` +
        `:offset=${m.target_offset}:linear=true:print_format=summary`,
      "-ar", "44100", "-b:a", "128k", "-codec:a", "libmp3lame",
      tmp,
    ]);
    renameSync(tmp, b.path);
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
