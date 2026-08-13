/* Berapa scene yang masih placeholder.

   Naskah punya N scene; scenes/index.ts punya M komponen. Selisihnya adalah
   sisa pekerjaan, dan tanpa perintah ini selisih itu cuma terlihat sebagai
   layar kuning yang lewat saat scrubbing.

   Jalankan:  npm run sisa
*/
import { readFileSync } from "node:fs";

const slug = process.argv[2] ?? "apa-itu-ram";

/* timing.gen.ts dan scenes/index.ts dibaca sebagai teks, bukan diimpor —
   keduanya TypeScript, dan menyeret transpiler ke skrip sekecil ini tidak
   sebanding. Bentuk keduanya digenerate/dikurasi, jadi polanya stabil. */
const timing = readFileSync(`ideas/${slug}/timing.gen.ts`, "utf8");
const daftar = readFileSync(`ideas/${slug}/scenes/index.ts`, "utf8");

const semua = [...timing.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
const isiSCENES = daftar.split(/SCENES[^=]*=\s*\{/)[1] ?? "";
const punya = new Set(
  [...isiSCENES.matchAll(/^\s*"?([a-z][a-z0-9-]*|s\d{3})"?\s*:/gim)].map((m) => m[1]),
);

const STANDAR = new Set(["opening", "closing"]);
const belum = semua.filter((id) => !STANDAR.has(id) && !punya.has(id));
const jadi = semua.length - belum.length;

console.log(`${jadi}/${semua.length} scene sudah punya komponen.`);
if (belum.length === 0) {
  console.log("Tidak ada placeholder tersisa — episode siap dirender.");
} else {
  console.log(`\n${belum.length} masih placeholder:`);
  for (let i = 0; i < belum.length; i += 12) {
    console.log("  " + belum.slice(i, i + 12).join(" "));
  }
  console.log(
    `\nJANGAN render MP4 final selama masih ada placeholder — ` +
      `lihat shared/Placeholder.tsx.`,
  );
}
