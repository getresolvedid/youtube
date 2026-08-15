/**
 * coba-suara.mjs — bandingkan satu scene lewat banyak setelan sekaligus.
 *
 *   node --env-file=.env tools/coba-suara.mjs <slug> --scene <kunci> [--target L|S1|S2]
 *        [--voice Charon,Leda,Orus] [--model ...] [--tempo 1.0,1.15] [--pace "..."]
 *
 * KENAPA BERKAS SENDIRI, BUKAN FLAG DI bikin-vo.mjs:
 *
 *   1. Ia menulis ke `out/voicetest/`, TIDAK PERNAH ke `public/vo/`. Mencari
 *      suara berarti menjalankan satu kalimat sepuluh kali; kalau keluarannya
 *      jatuh di jalur produksi, percobaan kesepuluh menimpa sembilan yang lain
 *      dan yang tersisa cuma yang terakhir — justru bukan yang mau dibandingkan.
 *   2. Ia melewati gerbang `naskah_beku`. Gerbang itu menjaga PRODUKSI; menahan
 *      percobaan suara sampai naskahnya beku memaksa urutan yang terbalik —
 *      memilih suara setelah kalimatnya tidak boleh diubah lagi.
 *   3. Ia tidak menyentuh timing. Berkas di out/ tidak dibaca `npm run gen`.
 *
 * Yang TIDAK dijawab berkas ini: mana yang paling wajar. Itu cuma bisa dijawab
 * dengan mendengarkan, dan tabel durasi di bawah bukan penggantinya.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

import { bacaEpisode, bacaShort, daftarShort } from "./baca-episode.mjs";
import { siapkan } from "./tts-gemini.mjs";

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const opt = (n, b) => {
  const i = argv.indexOf(n);
  return i === -1 ? b : argv[i + 1];
};
const daftar = (n, b) =>
  String(opt(n, b))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const SCENE = opt("--scene");
const TARGET = (opt("--target", "L") ?? "L").toUpperCase();

if (!slug || !SCENE) {
  console.error(
    "Pakai: node --env-file=.env tools/coba-suara.mjs <slug> --scene <kunci> " +
      "[--target L|S1|S2] [--voice a,b] [--model a,b] [--tempo 1.0,1.15] [--pace \"...\"]",
  );
  process.exit(1);
}

/* --- teks scene-nya, dari sumber yang sama dengan produksi ------------------ */

const sumber =
  TARGET === "L"
    ? bacaEpisode(slug)
    : bacaShort(slug, daftarShort(slug).find((s) => s.prefiks === TARGET) ?? {});

const scene = sumber.timing?.find((t) => t.kunci === SCENE);
if (!scene?.vo?.trim()) {
  console.error(
    `Scene "${SCENE}" tidak ketemu di ${slug} target ${TARGET}, atau blok ## VO-nya kosong.`,
  );
  process.exit(1);
}

/* --- matriks percobaan ------------------------------------------------------ */

const dasar = siapkan(slug).profil(TARGET);

const voices = daftar("--voice", dasar.voice);
const models = daftar("--model", process.env.GEMINI_TTS_MODEL);
const tempos = daftar("--tempo", String(dasar.tempoAngka));
const pace = opt("--pace", dasar.pace);

const varian = [];
for (const voice of voices)
  for (const model of models)
    for (const tempo of tempos) varian.push({ voice, model, tempo, pace });

const dirOut = `out/voicetest/${slug}`;
mkdirSync(dirOut, { recursive: true });

console.log(`\ncoba-suara · ${slug} · ${TARGET}-${SCENE}`);
console.log(`"${scene.vo}"`);
console.log(`${scene.kata} kata · ${varian.length} varian · ${scene.chars * varian.length} karakter\n`);

/* --- jalan ------------------------------------------------------------------ */

const durasi = (f) =>
  Number(
    execFileSync(
      process.env.FFPROBE_PATH?.trim() || "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
      { encoding: "utf8" },
    ).trim(),
  );

const hasil = [];
for (const v of varian) {
  /* Nama berkas memuat SELURUH setelan yang membedakannya. Nama seperti
     "varian-3.mp3" memaksa mengingat urutan percobaan, dan urutan itu hilang
     begitu terminalnya ditutup — lalu yang tersisa tiga berkas tanpa identitas. */
  const nama = `${TARGET}-${SCENE}__${v.voice}__${v.model.replace(/^gemini-|-preview-tts$|-tts-preview$/g, "")}__t${v.tempo}.mp3`;
  process.stdout.write(`  ${nama} … `);

  try {
    const mesin = siapkan(slug, {
      voice: v.voice,
      model: v.model,
      tempo: v.tempo,
      ...(pace ? { pace } : {}),
    });
    const buf = await mesin.suarakan({ teks: scene.vo, prefiks: TARGET });
    writeFileSync(`${dirOut}/${nama}`, buf);
    const d = durasi(`${dirOut}/${nama}`);
    hasil.push({ nama, d, wpm: (scene.kata / d) * 60 });
    console.log(`ok · ${d.toFixed(2)} dtk`);
  } catch (err) {
    console.log(`GAGAL — ${err.message.split("\n")[0]}`);
  }
}

if (!hasil.length) process.exit(1);

console.log(`\n${hasil.length} varian di ${dirOut}/\n`);
for (const h of hasil.sort((a, b) => a.d - b.d))
  console.log(`  ${h.d.toFixed(2).padStart(6)} dtk ${h.wpm.toFixed(0).padStart(5)} wpm  ${h.nama}`);

console.log(
  `\nVO T14 yang sudah tayang berjalan 137 wpm — itu patokannya, bukan angka\n` +
    `tercepat di daftar. DENGARKAN semuanya; tabel ini cuma mengurutkan durasi.\n`,
);
