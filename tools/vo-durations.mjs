/**
 * vo-durations.mjs — durasi VO SEBENARNYA vs perkiraan dari jumlah kata.
 *
 * Dipakai di langkah 7 pipeline, setelah VO dibuat (docs/04 §7).
 *
 *   node --env-file=.env tools/vo-durations.mjs <slug>
 *   node --env-file=.env tools/vo-durations.mjs <slug> S1
 *
 * Butuh ffprobe di PATH (atau FFPROBE_PATH di .env).
 *
 * Yang dicetak: selisih tiap scene antara durasi perkiraan (yang dipakai
 * komposisi sekarang) dan durasi MP3 sungguhan — plus pergeseran yang MENUMPUK
 * ke belakang, karena itulah yang membuat visual berhenti jatuh di kalimat yang
 * benar di menit-menit terakhir, bukan selisih satu scene.
 *
 * Skrip ini TIDAK menulis apa pun. `timing.gen.ts` tetap turunan naskah + blok
 * `## VO`, dan tidak pernah disunting tangan. Kalau pergeserannya sudah tidak
 * bisa ditolerir, yang diubah adalah tools/bangun-timing.mjs supaya membaca
 * durasi asli — bukan angka di berkas hasil generate.
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

import { R, bacaEpisode, bacaShort, daftarShort, wajib } from "./baca-episode.mjs";

const [slug, hanya] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!slug) {
  console.error("Pakai: node --env-file=.env tools/vo-durations.mjs <slug> [L|S1|S2]");
  process.exit(1);
}

const PAD = wajib("VO_PAD_SECONDS");
const FFPROBE = process.env.FFPROBE_PATH || "ffprobe";

/** Ambang pergeseran menumpuk yang masih aman. Di atas ini, scene terakhir
 *  sudah bergeser lebih dari satu beat penuh dan visualnya tidak lagi jatuh di
 *  kalimat yang dimaksud. */
const AMBANG_GESER = 1.5;

const durasiOf = (path) => {
  try {
    const out = execFileSync(
      FFPROBE,
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
      { encoding: "utf8" },
    );
    const d = Number(out.trim());
    if (!Number.isFinite(d)) throw new Error("durasi tidak terbaca");
    return d;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("ffprobe tidak ditemukan. Pasang: winget install Gyan.FFmpeg");
      console.error("Atau set FFPROBE_PATH di .env. PATH-nya baru aktif di terminal BARU.");
      process.exit(1);
    }
    console.error(`Gagal membaca ${path}: ${err.message}`);
    process.exit(1);
  }
};

const keluaran = [
  { prefiks: "L", label: "video panjang", ...bacaEpisode(slug) },
  ...daftarShort(slug).map((s) => ({
    prefiks: s.prefiks,
    label: `Short ${s.nomor} · ${s.folder}`,
    ...bacaShort(slug, s),
  })),
];

const f = (n) => n.toFixed(2);
const tanda = (n) => `${n >= 0 ? "+" : ""}${f(n)}`;
let adaYangDicek = false;
let perluTindakan = false;

for (const k of keluaran) {
  if (hanya && hanya.toUpperCase() !== k.prefiks) continue;

  const punyaVO = k.timing.filter((t) => t.voAudio);
  console.log(`\n=== ${k.label} · ${k.prefiks} ===`);

  if (punyaVO.length === 0) {
    console.log("Belum ada satu pun berkas VO di public/vo/" + slug + "/.");
    console.log("Buat dulu: node --env-file=.env tools/bikin-vo.mjs " + slug + " --jalan");
    continue;
  }

  adaYangDicek = true;
  console.log(`${punyaVO.length}/${k.timing.filter((t) => !t.standar).length} scene sudah bersuara.\n`);
  console.log("| Scene | Perkiraan | VO asli + pad | Selisih | Geser menumpuk |");
  console.log("|---|---|---|---|---|");

  let geser = 0;
  for (const t of k.timing) {
    if (!t.voAudio) continue;
    const path = `public/${t.voAudio}`;
    if (!existsSync(path)) continue;

    const nyata = R(durasiOf(path) + Number(PAD));
    const selisih = R(nyata - t.durasi);
    geser = R(geser + selisih);
    console.log(
      `| ${t.kunci} | ${f(t.durasi)} | ${f(nyata)} | ${tanda(selisih)} | ${tanda(geser)} |`,
    );
  }

  console.log(`\nPergeseran total di akhir ${k.prefiks}: ${tanda(geser)} dtk.`);

  if (Math.abs(geser) > AMBANG_GESER) {
    perluTindakan = true;
    console.log(
      `⚠ Di atas ambang ${AMBANG_GESER} dtk — scene terakhir sudah bergeser lebih dari\n` +
        `  satu beat. Perbaikannya di tools/bangun-timing.mjs (baca durasi asli dari\n` +
        `  public/vo/), BUKAN dengan menyunting timing.gen.ts (docs/04 §7).`,
    );
  } else {
    console.log("Masih di dalam ambang — timing perkiraan boleh dipakai apa adanya.");
  }
}

if (!adaYangDicek) process.exit(0);

console.log(
  "\nSelisih beberapa persen itu normal: perkiraan dihitung dari jumlah kata,\n" +
    "dan orang tidak membaca dengan kecepatan tetap. Yang berbahaya adalah yang\n" +
    "MENUMPUK — kolom terakhir, bukan kolom selisih.\n",
);

process.exit(perluTindakan ? 1 : 0);
