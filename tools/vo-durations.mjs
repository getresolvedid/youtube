/**
 * vo-durations.mjs — timing FINAL dari durasi berkas VO yang sudah jadi.
 *
 * Dipakai di langkah 7 pipeline, setelah VO dibuat. Menggantikan angka
 * perkiraan dari estimate-timing.mjs dengan durasi sebenarnya.
 *
 *   node --env-file=.env tools/vo-durations.mjs topics/T01-slug/vo L
 *   node --env-file=.env tools/vo-durations.mjs topics/T01-slug/vo S1
 *
 * Argumen kedua adalah awalan berkas (L, S1, S2). Butuh ffprobe di PATH
 * (atau set FFPROBE_PATH di .env).
 *
 * Keluaran: tabel timing siap salin + baris <audio> track VO untuk komposisi.
 */

import { readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const PAD = Number(process.env.VO_PAD_SECONDS ?? 0.4);
const TRACK_VO = Number(process.env.TRACK_VO ?? 8);
const FFPROBE = process.env.FFPROBE_PATH || "ffprobe";

const [dir, prefix = "L"] = process.argv.slice(2);
if (!dir) {
  console.error("Pakai: node --env-file=.env tools/vo-durations.mjs <folder-vo> [L|S1|S2]");
  process.exit(1);
}

let files;
try {
  files = readdirSync(dir)
    .filter((f) => new RegExp(`^${prefix}-\\d+\\.(mp3|wav|m4a)$`, "i").test(f))
    .sort();
} catch {
  console.error(`Folder tidak ditemukan: ${dir}`);
  process.exit(1);
}

if (!files.length) {
  console.error(`Tidak ada berkas berawalan "${prefix}-" di ${dir}.`);
  process.exit(1);
}

function durationOf(path) {
  try {
    const out = execFileSync(
      FFPROBE,
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
      { encoding: "utf8" }
    );
    const d = Number(out.trim());
    if (!Number.isFinite(d)) throw new Error("durasi tidak terbaca");
    return d;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`ffprobe tidak ditemukan. Pasang: winget install Gyan.FFmpeg`);
      console.error(`Atau set FFPROBE_PATH di .env.`);
      process.exit(1);
    }
    console.error(`Gagal membaca ${path}: ${err.message}`);
    process.exit(1);
  }
}

const f = (n) => n.toFixed(2);
const rows = [];
let start = 0;

for (const file of files) {
  const vo = durationOf(join(dir, file));
  const dur = vo + PAD;
  rows.push({ no: file.match(/(\d+)/)[1], file, vo, dur, start });
  start += dur;
}

console.log(`\n### Tabel timing — ${prefix} (${rows.length} scene)\n`);
console.log("| # | Berkas VO | Durasi VO | data-duration | data-start |");
console.log("|---|---|---|---|---|");
for (const r of rows) {
  console.log(`| ${r.no} | ${dir}/${r.file} | ${f(r.vo)} | ${f(r.dur)} | ${f(r.start)} |`);
}

const mm = Math.floor(start / 60);
const ss = Math.round(start % 60);
console.log(`\nTotal: ${f(start)} dtk (${mm}:${String(ss).padStart(2, "0")})\n`);

console.log(`### Track VO — salin ke komposisi (track ${TRACK_VO})\n`);
console.log("```html");
for (const r of rows) {
  console.log(
    `<audio data-start="${f(r.start)}" data-duration="${f(r.vo)}" ` +
      `data-track-index="${TRACK_VO}" data-volume="1.0" src="../vo/${r.file}"></audio>`
  );
}
console.log("```");
console.log(
  `\nIngat: data-duration scene = durasi VO + ${PAD} dtk padding, tapi elemen <audio>\n` +
    `memakai durasi ASLI (tanpa padding). Geser juga semua waktu di timeline GSAP.`
);
