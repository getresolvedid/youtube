/**
 * estimate-timing.mjs — perkiraan timing dari naskah, TANPA memanggil API.
 *
 * Dipakai di langkah 3 pipeline: membangun komposisi bisu dengan timing
 * perkiraan supaya naskah bisa diiterasi gratis sebelum VO dibuat.
 *
 *   node --env-file=.env tools/estimate-timing.mjs topics/T01-slug/naskah.md
 *
 * Membaca tabel scene di naskah.md (tabel yang punya kolom persis "VO"),
 * lalu mengeluarkan tabel data-start/data-duration siap salin + hitungan
 * karakter sebagai perkiraan kredit ElevenLabs.
 *
 * Angka perkiraan ini CUKUP untuk menilai ritme dan tata letak, tapi TIDAK
 * frame-akurat. Timing sebenarnya diambil dari tools/vo-durations.mjs setelah
 * VO jadi (langkah 7).
 */

import { readFileSync } from "node:fs";

const WPM = Number(process.env.VO_WORDS_PER_MINUTE ?? 140);
const PAD = Number(process.env.VO_PAD_SECONDS ?? 0.4);
const MAX_CHARS = Number(process.env.ELEVENLABS_MAX_CHARS_PER_TOPIC ?? 12000);
const LONG_TARGET = Number(process.env.LONG_TARGET_SECONDS ?? 480);
const SHORT_MAX = Number(process.env.SHORT_MAX_SECONDS ?? 60);

const file = process.argv[2];
if (!file) {
  console.error("Pakai: node --env-file=.env tools/estimate-timing.mjs <naskah.md>");
  process.exit(1);
}

const cells = (line) =>
  line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

/** Buang markdown supaya hitungan kata/karakter mendekati teks yang dikirim ke TTS. */
const plain = (s) =>
  s
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const sections = [];
let current = null;
let voCol = -1; // kolom "VO" pada tabel scene yang sedang dibaca

for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
  const line = raw.trim();

  const heading = line.match(/^##\s+(Video panjang|Short 1|Short 2)\b.*$/i);
  if (heading) {
    current = { title: line.replace(/^##\s+/, ""), kind: heading[1].toLowerCase(), scenes: [] };
    sections.push(current);
    voCol = -1;
    continue;
  }
  if (line.startsWith("#")) voCol = -1; // heading lain menutup tabel

  if (!current || !line.startsWith("|")) {
    if (!line.startsWith("|")) voCol = -1;
    continue;
  }

  const cols = cells(line);

  // Baris header: tabel scene dikenali dari kolom yang persis bernama "VO"
  // (tabel timing memakai "Berkas VO"/"Durasi VO", jadi tidak ikut terbaca).
  const idx = cols.findIndex((c) => c.toUpperCase() === "VO");
  if (idx !== -1) {
    voCol = idx;
    continue;
  }
  if (voCol === -1) continue;
  if (/^-{2,}/.test(cols[0])) continue; // baris pemisah

  const no = cols[0];
  if (!/^\d{1,3}$/.test(no)) continue;

  const text = plain(cols[voCol] ?? "");
  if (!text || text === "...") continue;

  const words = text.split(/\s+/).filter(Boolean).length;
  current.scenes.push({ no: no.padStart(3, "0"), words, chars: text.length });
}

if (!sections.length) {
  console.error(`Tidak ada tabel scene yang terbaca di ${file}.`);
  console.error('Tabel scene harus punya kolom berjudul persis "VO" dan nomor scene di kolom pertama.');
  process.exit(1);
}

const f = (n) => n.toFixed(2);
let grandChars = 0;

for (const s of sections) {
  let start = 0;
  let chars = 0;

  console.log(`\n## ${s.title}\n`);
  console.log("| # | kata | estimasi VO | data-duration | data-start |");
  console.log("|---|---|---|---|---|");

  for (const sc of s.scenes) {
    const vo = (sc.words / WPM) * 60;
    const dur = vo + PAD;
    console.log(`| ${sc.no} | ${sc.words} | ${f(vo)} | ${f(dur)} | ${f(start)} |`);
    start += dur;
    chars += sc.chars;
  }

  grandChars += chars;
  const mm = Math.floor(start / 60);
  const ss = Math.round(start % 60);

  console.log(
    `\n${s.scenes.length} scene · total ${f(start)} dtk (${mm}:${String(ss).padStart(2, "0")}) · ${chars} karakter`
  );

  const isShort = s.kind.startsWith("short");
  if (isShort && start > SHORT_MAX) {
    console.log(`⚠  Lewat batas Shorts ${SHORT_MAX} dtk — potong ${f(start - SHORT_MAX)} dtk.`);
  }
  if (!isShort) {
    const lo = LONG_TARGET * 0.75;
    const hi = LONG_TARGET * 1.25;
    if (start < lo) console.log(`⚠  Di bawah target (~${f(LONG_TARGET)} dtk) — materinya kurang.`);
    if (start > hi) console.log(`⚠  Di atas target (~${f(LONG_TARGET)} dtk) — pangkas babak 3 dulu.`);
  }
}

console.log(`\n─────────────────────────────────────────────`);
console.log(`Total seluruh topik: ${grandChars} karakter ≈ ${grandChars} kredit ElevenLabs`);
if (grandChars > MAX_CHARS) {
  console.log(`⚠  Lewat pagar ELEVENLABS_MAX_CHARS_PER_TOPIC (${MAX_CHARS}).`);
} else {
  console.log(`   Pagar ELEVENLABS_MAX_CHARS_PER_TOPIC: ${MAX_CHARS} — aman.`);
}
console.log(`\nPerkiraan @ ${WPM} kata/menit + ${PAD} dtk padding. Angka final: tools/vo-durations.mjs`);
