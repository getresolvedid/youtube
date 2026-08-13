/* Dua hal: berapa scene yang masih placeholder, dan apakah nama berkas masih
   cocok dengan kunci yang dihitung dari naskah.

   Naskah punya N scene; scenes/index.ts punya M komponen. Selisihnya adalah
   sisa pekerjaan, dan tanpa perintah ini selisih itu cuma terlihat sebagai
   layar kuning yang lewat saat scrubbing.

   Nama berkas ikut diperiksa karena konvensi yang tidak diverifikasi akan
   meleset dalam sebulan: begitu naskah disisipi satu scene di tengah, semua
   nomor sesudahnya salah, `ls scenes/` diam-diam berhenti berarti urutan
   tayang, dan `npx remotion still <nama-berkas>` menunjuk scene yang keliru.
   Lihat ideas/<slug>/scenes/index.ts.

   Jalankan:  npm run sisa
*/
import { readdirSync, readFileSync } from "node:fs";

const slug = process.argv[2] ?? "apa-itu-ram";
const dir = `ideas/${slug}/scenes`;

/* timing.gen.ts dan scenes/index.ts dibaca sebagai teks, bukan diimpor —
   keduanya TypeScript, dan menyeret transpiler ke skrip sekecil ini tidak
   sebanding. Bentuk keduanya digenerate/dikurasi, jadi polanya stabil. */
const timing = readFileSync(`ideas/${slug}/timing.gen.ts`, "utf8");
const daftar = readFileSync(`${dir}/index.ts`, "utf8");

/* Kunci dihitung tools/bangun-timing.mjs, bukan diturunkan ulang di sini —
   kalau lebar padding-nya dihitung dua kali, cepat atau lambat keduanya beda. */
const entri = [...timing.matchAll(/"id":\s*"([^"]+)",\s*"kunci":\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], kunci: m[2] }),
);
if (entri.length === 0) {
  throw new Error(
    `Tidak ada entri terbaca di ideas/${slug}/timing.gen.ts. Jalankan npm run gen.`,
  );
}

const isiSCENES = daftar.split(/SCENES[^=]*=\s*\{/)[1] ?? "";
const punya = new Set(
  [...isiSCENES.matchAll(/^\s*"?([a-z][a-z0-9-]*|s\d{3})"?\s*:/gim)].map((m) => m[1]),
);

const STANDAR = new Set(["opening", "closing"]);
const belum = entri.filter((e) => !STANDAR.has(e.id) && !punya.has(e.id));
const jadi = entri.length - belum.length;

console.log(`${jadi}/${entri.length} scene sudah punya komponen.`);

/* --- nama berkas ----------------------------------------------------------- */

const kunciSah = new Map(entri.map((e) => [e.kunci, e.id]));
const kunciDariId = new Map(entri.map((e) => [e.id, e.kunci]));
const berkas = readdirSync(dir).filter((f) => f.endsWith(".tsx"));
const salah = [];

for (const f of berkas) {
  const nama = f.replace(/\.tsx$/, "");
  if (kunciSah.has(nama)) continue;

  /* Cocokkan lewat ID-nya supaya pesannya bisa menyebut nama yang benar,
     bukan cuma bilang "salah". */
  const m = /^\d+-(.+)$/.exec(nama);
  const id = m ? m[1] : nama;
  const benar = kunciDariId.get(id);
  salah.push(
    benar
      ? `${f} — seharusnya ${benar}.tsx`
      : `${f} — id "${id}" tidak ada di naskah`,
  );
}

if (salah.length) {
  console.error(`\n${salah.length} nama berkas tidak cocok:`);
  for (const s of salah) console.error(`  ${s}`);
  console.error(
    `\nNama berkas = id komposisi Remotion = field \`kunci\` di timing.gen.ts. ` +
      `Urutan menghitung opening & closing walaupun berkasnya di shared/ — ` +
      `lihat ${dir}/index.ts.`,
  );
  process.exitCode = 1;
} else if (berkas.length) {
  console.log(`${berkas.length} nama berkas cocok dengan kunci di naskah.`);
}

/* --- sisa pekerjaan -------------------------------------------------------- */

if (belum.length === 0) {
  console.log("\nTidak ada placeholder tersisa — episode siap dirender.");
} else {
  console.log(`\n${belum.length} masih placeholder:`);
  const k = belum.map((e) => e.kunci);
  for (let i = 0; i < k.length; i += 8) console.log("  " + k.slice(i, i + 8).join(" "));
  console.log(
    `\nJANGAN render MP4 final selama masih ada placeholder — ` +
      `lihat shared/Placeholder.tsx.`,
  );
}
