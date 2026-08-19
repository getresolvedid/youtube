/**
 * estimate-timing.mjs — perkiraan timing episode, TANPA memanggil API.
 *
 * Dipakai di langkah 3 pipeline: membangun komposisi bisu dengan timing
 * perkiraan supaya naskah & rencana VO bisa diiterasi gratis sebelum VO dibuat.
 *
 *   node --env-file=.env tools/estimate-timing.mjs tcp-ip
 *
 * Sumbernya sama persis dengan yang dipakai `npm run gen`
 * (tools/baca-episode.mjs): daftar scene dari naskah.md, teks VO dari
 * ideas/<slug>/scenes/<kunci>-vo.md. Yang ditambahkan berkas ini cuma
 * pembacaan untuk manusia — tabel, hitungan karakter sebagai perkiraan kredit
 * TTS, dan peringatan terhadap target durasi.
 *
 * Angka perkiraan ini CUKUP untuk menilai ritme dan tata letak, tapi TIDAK
 * frame-akurat. Timing sebenarnya diambil dari tools/vo-durations.mjs setelah
 * VO jadi (langkah 7).
 */

import { bacaEpisode, wajib } from "./baca-episode.mjs";
import { slugDari } from "./lokasi.mjs";

const arg = process.argv[2];
if (!arg) {
  console.error("Pakai: node --env-file=.env tools/estimate-timing.mjs <slug>");
  process.exit(1);
}
/* Terima slug maupun path naskah — perintah lama di dokumen menyebut path. */
const slug = slugDari(arg);

const MAX_CHARS = wajib("VO_MAX_CHARS_PER_TOPIC");
const LONG_TARGET = wajib("LONG_TARGET_SECONDS");

const { WPM, PAD, timing, TOTAL } = bacaEpisode(slug);
const f = (n) => n.toFixed(2);

console.log(`\n## ${slug} — video panjang\n`);
console.log("| # | kunci | kata | durasi | mulai |");
console.log("|---|---|---|---|---|");

let chars = 0;
let belum = 0;
for (const t of timing) {
  const kata = t.standar ? "—" : t.beat.length === 0 ? "belum" : String(t.kata);
  if (!t.standar && t.beat.length === 0) belum += 1;
  console.log(`| ${t.urut} | ${t.kunci} | ${kata} | ${f(t.durasi)} | ${f(t.mulai)} |`);
  chars += t.chars;
}

const mm = Math.floor(TOTAL / 60);
const ss = Math.round(TOTAL % 60);
console.log(
  `\n${timing.length} scene · total ${f(TOTAL)} dtk ` +
    `(${mm}:${String(ss).padStart(2, "0")}) · ${chars} karakter`,
);

if (belum) {
  console.log(
    `⚠  ${belum} scene belum punya rencana VO — durasinya masih placeholder, ` +
      `jadi total di atas bukan angka yang bisa dipercaya.`,
  );
}

const lo = LONG_TARGET * 0.75;
const hi = LONG_TARGET * 1.25;
if (TOTAL < lo) console.log(`⚠  Di bawah target (~${f(LONG_TARGET)} dtk) — materinya kurang.`);
if (TOTAL > hi) console.log(`⚠  Di atas target (~${f(LONG_TARGET)} dtk) — pangkas bagian 6 dulu.`);

console.log(`\n─────────────────────────────────────────────`);
console.log(`${chars} karakter naskah`);
if (chars > MAX_CHARS) {
  console.log(`⚠  Lewat pagar VO_MAX_CHARS_PER_TOPIC (${MAX_CHARS}).`);
} else {
  console.log(`   Pagar VO_MAX_CHARS_PER_TOPIC: ${MAX_CHARS} — aman.`);
}

console.log(
  `\nPerkiraan @ ${WPM} kata/menit + ${PAD} dtk padding. ` +
    `Angka final: tools/vo-durations.mjs`,
);
console.log(
  `Shorts belum ikut dihitung di sini — keduanya baru punya scene (dan rencana ` +
    `VO-nya sendiri) setelah video panjang disetujui, lihat docs/05.`,
);
