/* Dua hal: berapa scene yang masih placeholder, dan apakah nomor urut di nama
   berkas masih jujur.

   Naskah punya N scene; scenes/index.ts punya M komponen. Selisihnya adalah
   sisa pekerjaan, dan tanpa perintah ini selisih itu cuma terlihat sebagai
   layar kuning yang lewat saat scrubbing.

   Nomor urut ikut diperiksa karena konvensi penamaan yang tidak diverifikasi
   akan meleset dalam sebulan: begitu naskah disisipi satu scene di tengah,
   semua nomor sesudahnya salah, dan `ls scenes/` diam-diam berhenti berarti
   urutan tayang. Lihat ideas/<slug>/scenes/index.ts.

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

const semua = [...timing.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
const isiSCENES = daftar.split(/SCENES[^=]*=\s*\{/)[1] ?? "";
const punya = new Set(
  [...isiSCENES.matchAll(/^\s*"?([a-z][a-z0-9-]*|s\d{3})"?\s*:/gim)].map((m) => m[1]),
);

const STANDAR = new Set(["opening", "closing"]);
const belum = semua.filter((id) => !STANDAR.has(id) && !punya.has(id));
const jadi = semua.length - belum.length;

console.log(`${jadi}/${semua.length} scene sudah punya komponen.`);

/* --- nomor urut di nama berkas --------------------------------------------- */

const urutan = new Map(semua.map((id, i) => [id, i + 1]));
const berkas = readdirSync(dir).filter((f) => f.endsWith(".tsx"));
const salah = [];

for (const f of berkas) {
  const m = /^(\d+)-(.+)\.tsx$/.exec(f);
  if (!m) {
    salah.push(`${f} — tidak berpola <urutan>-<id>.tsx`);
    continue;
  }
  const [, nomor, id] = m;
  const benar = urutan.get(id);
  if (benar === undefined) {
    salah.push(`${f} — id "${id}" tidak ada di naskah`);
  } else if (Number(nomor) !== benar) {
    salah.push(`${f} — seharusnya ${benar}-${id}.tsx`);
  }
}

if (salah.length) {
  console.error(`\n${salah.length} nama berkas salah nomor:`);
  for (const s of salah) console.error(`  ${s}`);
  console.error(
    `\nUrutan menghitung opening & closing walaupun berkasnya di shared/ — ` +
      `lihat ${dir}/index.ts.`,
  );
  process.exitCode = 1;
} else if (berkas.length) {
  console.log(`${berkas.length} nama berkas nomornya benar.`);
}

/* --- sisa pekerjaan -------------------------------------------------------- */

if (belum.length === 0) {
  console.log("\nTidak ada placeholder tersisa — episode siap dirender.");
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
