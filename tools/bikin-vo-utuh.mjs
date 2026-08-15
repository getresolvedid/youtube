/**
 * bikin-vo-utuh.mjs — satu Short disintesis dalam SATU permintaan, lalu dipotong
 * jadi satu MP3 per scene.
 *
 *   node --env-file=.env tools/bikin-vo-utuh.mjs <slug> --target S1            rencana
 *   node --env-file=.env tools/bikin-vo-utuh.mjs <slug> --target S1 --jalan    jalan
 *   node --env-file=.env tools/bikin-vo-utuh.mjs <slug> --target S1 --coba     ke out/
 *
 * KENAPA ADA:
 *
 * bikin-vo.mjs memanggil Gemini sekali per scene, dan tiap panggilan buta
 * terhadap tetangganya. Akibatnya terukur: teks yang sama, setelan yang sama,
 * durasi mentahnya berayun 31% antar-panggilan — lebih besar daripada seluruh
 * jangkauan aman pengali `tempo`. Sembilan potongan Short jadi jatuh di tempo
 * yang acak satu sama lain, dan pencerita yang berganti kecepatan tanpa sebab di
 * tiap potongan justru lawan dari terdengar wajar.
 *
 * Di sini kesembilan scene dikirim sebagai satu naskah. Model membacanya sebagai
 * satu pertunjukan: temponya konsisten dengan sendirinya, dan sambungan antar-scene
 * (HARD RULE 7) benar-benar tersambung di suaranya — bukan cuma di naskahnya.
 * Ini juga yang menggantikan `previous_text`/`next_text` yang hilang bersama
 * mesin lama, dan menggantikannya dengan cara yang lebih kuat: bukan konteks
 * yang dibisikkan, melainkan satu tarikan napas yang sama.
 *
 * YANG DITUKAR: potongannya dicari, bukan diketahui. Gemini menaruh jeda di
 * tengah kalimat juga, jadi "senyap" saja bukan bukti batas scene. Penjaganya
 * ada di § POTONG di bawah, dan semuanya menggigit: gagal = NOL berkas ditulis,
 * bukan sembilan berkas yang batasnya meleset.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";

import { bacaEpisode, bacaShort, daftarShort, wajib } from "./baca-episode.mjs";
import { siapkan } from "./tts-gemini.mjs";

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const flag = (n) => argv.includes(n);
const opt = (n, b) => {
  const i = argv.indexOf(n);
  return i === -1 ? b : argv[i + 1];
};

const TARGET = String(opt("--target", "S1")).toUpperCase();
const JALAN = flag("--jalan");
const COBA = flag("--coba");
const PAKSA = flag("--paksa");

if (!slug) {
  console.error(
    "Pakai: node --env-file=.env tools/bikin-vo-utuh.mjs <slug> --target L|S1|S2 [--coba] [--jalan]",
  );
  process.exit(1);
}

const FFMPEG = process.env.FFMPEG_PATH?.trim() || "ffmpeg";
const MAX_CHARS = wajib("VO_MAX_CHARS_PER_TOPIC");

const durasiDari = (f) =>
  Number(
    execFileSync(
      process.env.FFPROBE_PATH?.trim() || "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
      { encoding: "utf8" },
    ).trim(),
  );

/* --- scene-nya -------------------------------------------------------------- */

const sumber =
  TARGET === "L"
    ? bacaEpisode(slug)
    : bacaShort(slug, daftarShort(slug).find((s) => s.prefiks === TARGET) ?? {});

const scenes = (sumber.timing ?? []).filter((t) => !t.standar && t.vo.trim());
if (scenes.length < 2) {
  console.error(`${slug} ${TARGET}: cuma ${scenes.length} scene bicara — tidak ada yang perlu dipotong.`);
  process.exit(1);
}

/* Gerbang naskah beku — sama dengan bikin-vo.mjs. Dilewati saat --coba, karena
   percobaan suara memang harus bisa jalan sebelum naskahnya dibekukan. */
if (!COBA) {
  const naskah = readFileSync(`ideas/${slug}/naskah.md`, "utf8");
  const blok = /^naskah_beku:[^\n]*\n((?:[ \t]+\S[^\n]*\n)*)/m.exec(naskah);
  const beku = new Map();
  for (const baris of blok?.[1]?.split("\n") ?? []) {
    const m = /^\s*([A-Za-z0-9]+):([^#\n]*)/.exec(baris);
    if (m?.[2]?.trim()) beku.set(m[1].toUpperCase(), m[2].trim());
  }
  if (!beku.has(TARGET)) {
    console.error(
      `\nideas/${slug}/naskah.md: "${TARGET}" belum punya tanggal di naskah_beku.\n` +
        `VO tidak dibuat dari naskah yang belum lewat gerbang docs/04 §5.\n` +
        `Untuk percobaan suara sebelum beku, pakai --coba.\n`,
    );
    process.exit(1);
  }
}

/* --- naskah gabungan --------------------------------------------------------
 *
 * Dipisah baris kosong, bukan spasi. Batas scene harus punya alasan untuk
 * dijeda model — tanpa itu ia membaca sembilan kalimat sebagai satu paragraf
 * rapat, dan pemotongnya kehilangan satu-satunya penanda yang ia punya. */
/* Pemisahnya audio tag `[long pause]`, disuntikkan DI SINI — bukan diketik ke
   blok `## VO`. Ini persis pembagian yang sama dengan kamus pengucapan: naskah
   menyimpan apa yang DIKATAKAN, dan hal-hal yang cuma dimengerti mesin TTS
   ditempelkan di batasnya. Blok `## VO` tetap bersih untuk keempat pembacanya.

   Kenapa perlu: tanpa penanda, batas scene harus DITEBAK dari panjang jeda —
   dan terukur di Short ini, jeda antar-scene (0,65–0,99 dtk) tumpang tindih
   dengan jeda di tengah kalimat (0,52–0,65 dtk). Tidak ada ambang yang
   memisahkan keduanya, jadi satu batas salah pilih dan semua sesudahnya ikut
   bergeser. Tag ini membuat batasnya dibuat, bukan dicari. */
const PEMISAH = opt("--pemisah", "[long pause]");

/** --pisah <n>: n scene PERTAMA disintesis sendiri-sendiri, sisanya menyatu.
 *
 *  Ada karena bacaan utuh membeli keseragaman dengan membayar jangkauan
 *  dinamis. Terukur di Short T14: VO lama membaca hook 22% lebih cepat
 *  daripada rata-rata Short-nya; bacaan satu-permintaan cuma 6% — hook-nya rata
 *  bersama yang lain, karena model membaca kesembilan kalimat sebagai satu
 *  paragraf.
 *
 *  Untuk Nugget itu justru yang paling mahal hilangnya: beat pertamanya adalah
 *  KLAIM yang berdiri sendiri, bukan kelanjutan apa pun (docs/02 § Anatomi
 *  Shorts) — dan `01-dari-belakang-vo.md` sudah menulis di `## Catatan` bahwa
 *  ketiadaan undangan di situ disengaja. Jadi memisahnya bukan kompromi
 *  teknis; ia mengikuti bentuk naskahnya.
 *
 *  Sambungan yang memang harus tersambung di suaranya (HARD RULE 7) semuanya
 *  ada di scene ke-2 dan sesudahnya, dan itu tetap satu tarikan napas. */
const PISAH = Number(opt("--pisah", 0));
if (!Number.isInteger(PISAH) || PISAH < 0 || PISAH > scenes.length - 2) {
  console.error(
    `\n--pisah ${opt("--pisah")} tidak masuk akal — harus 0..${scenes.length - 2}, ` +
      `karena yang menyatu harus tersisa minimal 2 scene.\n`,
  );
  process.exit(1);
}

const sendiri = scenes.slice(0, PISAH);
const gabung = scenes.slice(PISAH);

const naskahGabung = gabung.map((s) => s.vo).join(`\n\n${PEMISAH}\n\n`);
const totalKata = gabung.reduce((n, s) => n + s.kata, 0);
const totalChars = naskahGabung.length + sendiri.reduce((n, s) => n + s.chars, 0);

const mesin = siapkan(slug);
const profil = mesin.profil(TARGET);

const dirOut = COBA ? `out/voicetest/${slug}` : `public/vo/${slug}`;

console.log(
  `\nbikin-vo-utuh · ${slug} · ${TARGET} · ` +
    (PISAH
      ? `${PISAH} scene sendiri + ${gabung.length} scene menyatu`
      : `${gabung.length} scene dalam 1 permintaan`),
);
console.log(`  suara ${profil.voice} · tempo ${profil.tempoAngka}`);
if (profil.arahan) console.log(`  arahan "${profil.arahan}"`);
console.log(`  ${totalKata} kata · ${totalChars} karakter · tujuan ${dirOut}/\n`);

for (const s of scenes) {
  const tanda = sendiri.includes(s) ? "sendiri " : "        ";
  console.log(
    `    ${tanda}${TARGET}-${s.kunci}  ${String(s.kata).padStart(3)} kata  ` +
      `"${s.vo.slice(0, 48)}${s.vo.length > 48 ? "…" : ""}"`,
  );
}

if (Number(totalChars) > Number(MAX_CHARS)) {
  console.error(`\n${totalChars} karakter di atas pagar ${MAX_CHARS}.`);
  process.exit(1);
}

if (!JALAN) {
  console.log(`\nIni baru rencana — belum ada yang dikirim. Tambahkan --jalan.`);
  console.log(`Percobaan yang tidak menyentuh public/vo/: tambahkan --coba juga.\n`);
  process.exit(0);
}

/* --- sintesis: SATU permintaan ---------------------------------------------- */

const wav = `${dirOut}/.utuh-${TARGET}.wav`;
mkdirSync(dirOut, { recursive: true });

/* Scene yang dipisah: satu permintaan masing-masing, langsung jadi MP3 — tidak
   lewat pemotong sama sekali, karena tidak ada yang perlu dipotong. Batasnya
   sudah pasti: berkasnya memang cuma berisi scene itu. */
for (const s of sendiri) {
  const berkasAda = `${dirOut}/${TARGET}-${s.kunci}.mp3`;
  /* Scene yang dipisah adalah scene yang paling sering diulang sampai jatuh
     di tempo dan nada yang disetujui — dan Gemini tidak deterministik, jadi
     render yang disetujui TIDAK bisa dibuat ulang. Melewatinya adalah baku;
     menimpanya harus diminta. */
  if (existsSync(berkasAda) && !PAKSA) {
    console.log(`  ${TARGET}-${s.kunci} (sendiri) … sudah ada, dilewati (--paksa untuk menimpa)`);
    continue;
  }
  const pr = mesin.profil(TARGET, s.kunci);
  if (pr.kunci && pr.arahan) console.log(`    arahan khusus: "${pr.arahan}"`);
  process.stdout.write(`  ${TARGET}-${s.kunci} (sendiri) … `);
  const buf = await mesin.suarakan({ teks: s.vo, prefiks: TARGET, kunci: s.kunci });
  const berkas = `${dirOut}/${TARGET}-${s.kunci}.mp3`;
  writeFileSync(`${berkas}.part`, buf);
  renameSync(`${berkas}.part`, berkas);
  const d = durasiDari(berkas);
  console.log(`ok · ${d.toFixed(2)} dtk · ${((s.kata / d) * 60).toFixed(0)} wpm`);
}

/* --pakai-wav: pakai lagi aliran utuh yang sudah ada, jangan sintesis ulang.
   Menyetel pemotong butuh puluhan percobaan, dan tiap percobaan yang membayar
   ulang membuat penyetelannya berhenti sebelum benar — padahal bahan yang
   diperiksa persis sama. Yang disetel pemotongnya, bukan bacaannya. */
if (flag("--pakai-wav")) {
  if (!existsSync(wav)) {
    console.error(`\n--pakai-wav: ${wav} belum ada. Jalankan sekali tanpa flag itu dulu.\n`);
    process.exit(1);
  }
  console.log(`\n  Memakai ulang ${wav} — nol permintaan, nol karakter.`);
} else {
  console.log(`\n  Mengirim 1 permintaan … `);
  const { pcm, laju } = await mesin.suarakanPCM({ teks: naskahGabung, prefiks: TARGET });

  /* Tempo dipasang SEKARANG, ke seluruh aliran — sebelum dipotong. Kalau tiap
     potongan ditempo sendiri-sendiri, keseragaman yang baru saja dibeli dengan
     satu permintaan langsung dibuang lagi. */
  execFileSync(
    FFMPEG,
    [
      "-hide_banner", "-loglevel", "error",
      "-f", "s16le", "-ar", String(laju), "-ac", "1", "-i", "pipe:0",
      ...(profil.tempoAngka !== 1 ? ["-af", `atempo=${profil.tempoAngka}`] : []),
      "-y", wav,
    ],
    { input: pcm, maxBuffer: 256 * 1024 * 1024 },
  );
}


const total = durasiDari(wav);
console.log(`  ${total.toFixed(2)} dtk · ${(totalKata / total * 60).toFixed(0)} wpm\n`);

/* --- POTONG ----------------------------------------------------------------
 *
 * Batasnya TIDAK dicari sebagai "delapan senyap terpanjang". Jeda di tengah
 * kalimat bisa lebih panjang daripada jeda antar-scene, dan sekali satu batas
 * salah pilih, semua batas sesudahnya ikut bergeser.
 *
 * Yang dipakai: kita TAHU kira-kira di detik ke berapa tiap batas seharusnya —
 * dari jumlah kata kumulatifnya. Jadi tiap batas mencari senyap yang PALING
 * DEKAT dengan tempat yang diharapkan, bukan yang paling panjang. */

/* --batas <json>: batas dari tools/cocokkan-vo.mjs — cap waktu per kata, bukan
   tebakan dari senyap. Ini jalur yang benar; heuristik senyap di bawah tinggal
   sebagai cadangan untuk audio yang belum sempat dicocokkan.

   Kenapa jauh lebih kuat: jeda antar-kalimat DI DALAM scene dan jeda ANTAR scene
   secara akustik adalah benda yang sama, jadi tidak ada ambang yang memisahkan
   keduanya. Cap waktu kata tidak perlu memisahkan apa pun — scene 1 berakhir di
   kata ke-8, dan kata ke-8 punya alamat. */
let berkasBatas = opt("--batas");

/* Baku: batas dicari lewat cap waktu per kata, bukan lewat senyap. Dijalankan
   sebagai proses anak alih-alih diimpor — cocokkan-vo.mjs tetap berguna berdiri
   sendiri (ia juga yang membuktikan naskahnya diucapkan utuh), dan dua alat yang
   masing-masing bisa dijalankan sendiri lebih mudah didiagnosis daripada satu
   alat yang cuma bisa dijalankan seluruhnya.

   --senyap mengembalikan heuristik lama. Ia dipertahankan bukan karena setara,
   melainkan karena ia satu-satunya jalan saat transkripsi gagal — dan saat itu
   terjadi, "tidak ada jalan sama sekali" lebih buruk daripada "jalan yang harus
   diperiksa penjaganya". */
if (!berkasBatas && !flag("--senyap")) {
  console.log(`  Mencari batas lewat cap waktu kata …\n`);
  const anak = spawnSync(
    process.execPath,
    ["tools/cocokkan-vo.mjs", slug, "--target", TARGET, "--wav", wav, "--lewati", String(PISAH)],
    { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] },
  );
  process.stdout.write(
    (anak.stdout ?? "")
      .split("\n")
      .filter((l) => /cocok|tidak diucapkan|naskah "|tidak terdengar|tidak ada di naskah/.test(l))
      .map((l) => `  ${l.trim()}`)
      .join("\n") + "\n",
  );
  if (anak.status !== 0) {
    console.error(
      `\n  Pencocokan gagal. Ulangi dengan --senyap untuk memakai heuristik jeda,\n` +
        `  atau jalankan tools/cocokkan-vo.mjs sendiri untuk melihat kenapa.\n`,
    );
    process.exit(1);
  }
  berkasBatas = `out/voicetest/${slug}/batas-${TARGET}.json`;
}

if (berkasBatas) {
  const b = JSON.parse(readFileSync(berkasBatas, "utf8"));
  if (b.tepi?.length !== gabung.length + 1) {
    console.error(
      `\n${berkasBatas}: ${b.tepi?.length ?? 0} tepi untuk ${gabung.length} scene menyatu — ` +
        `butuh ${gabung.length + 1}. Jalankan ulang cocokkan-vo.mjs.\n`,
    );
    process.exit(1);
  }
  console.log(`  Batas dari ${berkasBatas} (cap waktu per kata)\n`);
  await potongDanTulis(b.tepi, gabung);
  process.exit(0);
}

const senyap = [];
{
  /* silencedetect menulis temuannya ke STDERR, di level `info`. Dua jebakan
     sekaligus: `execFileSync` cuma mengembalikan stdout (jadi hasilnya string
     kosong yang terbaca sebagai "tidak ada jeda"), dan `-loglevel error`
     membuang barisnya sebelum sempat ditulis. Karena itu spawnSync, dan level
     lognya dibiarkan apa adanya. */
  const jalan = spawnSync(
    FFMPEG,
    ["-hide_banner", "-i", wav, "-af", "silencedetect=noise=-35dB:d=0.12", "-f", "null", "-"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  const teks = jalan.stderr ?? "";
  let mulai = null;
  for (const baris of teks.split(/\r?\n/)) {
    const a = /silence_start:\s*([\d.]+)/.exec(baris);
    const b = /silence_end:\s*([\d.]+)/.exec(baris);
    if (a) mulai = Number(a[1]);
    if (b && mulai !== null) {
      senyap.push({
        mulai,
        akhir: Number(b[1]),
        tengah: (mulai + Number(b[1])) / 2,
        lama: Number(b[1]) - mulai,
      });
      mulai = null;
    }
  }
}

const gagal = (pesan) => {
  console.error(`\n  POTONG GAGAL — ${pesan}\n`);
  console.error(`  Nol berkas ditulis. Yang utuh ada di ${wav} — dengarkan sendiri;`);
  console.error(`  kalau bacaannya bagus, yang perlu disetel pemotongnya, bukan naskahnya.\n`);
  process.exit(1);
};

/* Senyap di tepi tidak pernah jadi batas antar-scene. */
const kandidat = senyap.filter((s) => s.tengah > 0.25 && s.tengah < total - 0.25);
if (kandidat.length < gabung.length - 1) {
  gagal(
    `cuma ${kandidat.length} jeda terdeteksi, butuh ${gabung.length - 1}. ` +
      `Model membaca terlalu rapat — naikkan jeda di naskah gabungan atau turunkan ambang.`,
  );
}

/* Posisi yang diharapkan tiap batas, dari jumlah kata kumulatif. */
const harap = [];
{
  let k = 0;
  for (let i = 0; i < gabung.length - 1; i++) {
    k += gabung[i].kata;
    harap.push((k / totalKata) * total);
  }
}

/* Pemilihan GLOBAL, bukan serakah kiri-ke-kanan.
 *
 * Versi serakah memilih tiap batas sendiri-sendiri, dan itu gagal dengan cara
 * yang mahal: di Short ini batas ke-5 kalah 0,56 dtk melawan jeda di TENGAH
 * scene 05 — lalu scene 05 terpotong jadi 2,0 dtk dan semua batas sesudahnya
 * ikut bergeser. Satu kekalahan tipis menyeret delapan keputusan lain.
 *
 * Di sini kedelapan batas dipilih sekaligus dengan program dinamis, memaksimalkan
 * satu skor: dekat dengan tempat yang diharapkan, DAN jedanya panjang. Jeda
 * panjang penting karena `[long pause]` di pemisah memang menaikkan sebagian —
 * tapi tidak semuanya, jadi ia bukti yang menambah keyakinan, bukan yang
 * memutuskan sendirian. */
const skor = (s, i) => -(((s.tengah - harap[i]) / total) ** 2) * 40 + s.lama;

const N = kandidat.length;
const B = gabung.length - 1;
if (N < B) gagal(`cuma ${N} jeda kandidat, butuh ${B}`);

/* terbaik[i][j] = skor terbaik memilih batas 0..i dengan batas ke-i di kandidat j */
const terbaik = Array.from({ length: B }, () => new Array(N).fill(-Infinity));
const dari = Array.from({ length: B }, () => new Array(N).fill(-1));

for (let j = 0; j < N; j++) terbaik[0][j] = skor(kandidat[j], 0);
for (let i = 1; i < B; i++) {
  let argmax = -1;
  for (let j = 0; j < N; j++) {
    /* Batas harus maju: kandidat sebelumnya selalu berindeks lebih kecil. */
    if (j > 0 && terbaik[i - 1][j - 1] > (argmax === -1 ? -Infinity : terbaik[i - 1][argmax]))
      argmax = j - 1;
    if (argmax === -1) continue;
    terbaik[i][j] = terbaik[i - 1][argmax] + skor(kandidat[j], i);
    dari[i][j] = argmax;
  }
}

let akhirJ = -1;
for (let j = 0; j < N; j++)
  if (terbaik[B - 1][j] > (akhirJ === -1 ? -Infinity : terbaik[B - 1][akhirJ])) akhirJ = j;
if (akhirJ === -1) gagal("tidak ada rangkaian batas yang sah");

const pilihan = new Array(B);
for (let i = B - 1, j = akhirJ; i >= 0; j = dari[i][j], i--) pilihan[i] = kandidat[j];

/* Penjaga 1: tidak ada batas yang boleh jauh dari tempat yang diharapkan.
   Longgar (20% durasi) karena jumlah kata cuma perkiraan kasar posisi. */
const batas = [];
pilihan.forEach((s, i) => {
  const meleset = Math.abs(s.tengah - harap[i]);
  if (meleset > total * 0.2)
    gagal(
      `batas ke-${i + 1} (${gabung[i + 1].kunci}) meleset ${meleset.toFixed(2)} dtk ` +
        `dari perkiraan ${harap[i].toFixed(2)} dtk — jeda terpilih di ${s.tengah.toFixed(2)} dtk`,
    );
  batas.push(s.tengah);
});

await potongDanTulis([0, ...batas, total], gabung);

/* --- tulis ------------------------------------------------------------------ */

/** Memotong aliran utuh menurut `tepi`, mengukur hasilnya, lalu menulis — atau
 *  tidak menulis apa pun sama sekali.
 *
 *  Dipakai kedua sumber batas: cap waktu per kata (--batas) dan heuristik
 *  senyap. Penjaganya sama untuk keduanya, karena yang dijaga sama — dan sumber
 *  batas yang lebih dipercaya bukan alasan untuk memeriksanya lebih longgar. */
async function potongDanTulis(tepi, daftar) {
  /* Sama alasannya dengan scene yang dipisah: potongan yang sudah disetujui
     tidak bisa dibuat ulang. Bedanya di sini ia menghentikan SELURUH proses,
     bukan melewati satu berkas — memotong sebagian dari satu aliran lalu
     menyisakan sisanya dari aliran lama menghasilkan Short yang separuhnya
     dari dua pertunjukan berbeda, dan itu justru cacat yang paling susah
     ditunjuk saat mendengarkan. */
  const sudahAda = daftar
    .map((s) => `${dirOut}/${TARGET}-${s.kunci}.mp3`)
    .filter((f) => existsSync(f));
  if (sudahAda.length && !PAKSA) {
    console.error(
      `
  ${sudahAda.length} berkas potongan sudah ada di ${dirOut}/.
` +
        `  Tambahkan --paksa kalau memang mau menimpanya — Gemini tidak
` +
        `  deterministik, jadi yang tertimpa tidak bisa dikembalikan.
`,
    );
    process.exit(1);
  }

  const potongan = daftar.map((s, i) => ({
    scene: s,
    mulai: tepi[i],
    akhir: tepi[i + 1],
    durasi: tepi[i + 1] - tepi[i],
  }));

/* Dipotong ke .part dulu, DIUKUR, baru dinamai. Sebelumnya penjaga rasio
   menilai potongan sebelum tepinya dipangkas — dan yang ditulis ke berkas justru
   yang sesudahnya. Satu potongan lolos di 2,51 dtk lalu mendarat di 2,00 dtk
   untuk 11 kata (330 wpm, mustahil) tanpa satu pun peringatan. Penjaga yang
   memeriksa angka yang bukan angka yang ditulis adalah penjaga yang tidak ada. */
  console.log(`  ${tepi.length - 2} batas. Memotong, lalu mengukur hasilnya:\n`);
  let jadi = 0;
  const siap = [];
  for (const p of potongan) {
  const berkas = `${dirOut}/${TARGET}-${p.scene.kunci}.mp3`;
  const tmp = `${berkas}.part`;

  /* Dipotong dari WAV yang sudah bertempo, lalu tepinya dipangkas — jeda antar-scene
     memang milik sambungannya, bukan milik salah satu scene. */
  execFileSync(
    FFMPEG,
    [
      "-hide_banner", "-loglevel", "error",
      "-ss", String(p.mulai), "-to", String(p.akhir), "-i", wav,
      "-af",
      "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-35dB:detection=peak," +
        "areverse," +
        "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-35dB:detection=peak," +
        "areverse",
      "-codec:a", "libmp3lame", "-b:a", process.env.GEMINI_TTS_MP3_BITRATE?.trim() || "128k",
      /* Formatnya disebut, tidak ditebak: berkasnya ditulis sebagai `.part`
         dulu (supaya proses yang mati di tengah tidak meninggalkan MP3
         terpotong), dan dari akhiran itu ffmpeg tidak bisa menyimpulkan apa pun. */
      "-f", "mp3",
      "-y", tmp,
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  );
  siap.push({ ...p, tmp, berkas, jadi: durasiDari(tmp) });
}

  /* Penjaga 3, dan satu-satunya yang mengukur apa yang benar-benar akan ditulis.
   Ambangnya lebih ketat daripada penjaga 2 (0,6–1,7 vs 0,5–2,0) karena di sini
   tebakannya sudah tidak ada: ini durasi berkasnya. */
  const rusak = siap
  .map((p) => ({ p, rasio: p.jadi / ((p.scene.kata / totalKata) * total) }))
  .filter(({ rasio }) => rasio < 0.6 || rasio > 1.7);

  if (rusak.length) {
  /* Semua .part dibuang dulu: gagal berarti NOL berkas, dan sembilan berkas
     .part yang tertinggal adalah sembilan berkas juga. */
  for (const p of siap) if (existsSync(p.tmp)) unlinkSync(p.tmp);
  gagal(
    `${rusak.length} potongan meleset setelah dipangkas:\n` +
      rusak
        .map(
          ({ p, rasio }) =>
            `      ${p.scene.kunci} — ${p.jadi.toFixed(2)} dtk untuk ${p.scene.kata} kata ` +
            `(${((p.scene.kata / p.jadi) * 60).toFixed(0)} wpm, ${rasio.toFixed(2)}x perkiraan)`,
        )
        .join("\n"),
  );
}

  for (const p of siap) {
  renameSync(p.tmp, p.berkas);
  console.log(
    `    ${TARGET}-${p.scene.kunci.padEnd(22)} ${p.jadi.toFixed(2).padStart(6)} dtk ` +
      `${((p.scene.kata / p.jadi) * 60).toFixed(0).padStart(4)} wpm`,
  );
  jadi++;
}

  console.log(
    `\n  ${jadi + sendiri.length} berkas di ${dirOut}/ · ${totalChars} karakter` +
      (sendiri.length ? ` (${sendiri.length} sendiri + ${jadi} dari potongan)` : ""),
  );
  console.log(`  Yang utuh disimpan di ${wav} — itu rujukan kalau potongannya diragukan.`);
  if (!COBA) console.log(`\n  Berikutnya: npm run gen, lalu DENGARKAN berurutan.\n`);
  else console.log(`\n  --coba: public/vo/ tidak disentuh.\n`);
}
