/* Lima hal: berapa scene yang masih placeholder, apakah setiap scene sudah
   punya rencana VO + direction, apakah nama berkasnya masih cocok dengan kunci
   yang dihitung dari naskah, bagaimana tiap scene DIBUKA (HARD RULE 6), dan
   bagaimana tiap scene BERSAMBUNG ke tetangganya (HARD RULE 7).

   Satu scene lengkap terdiri dari tiga berkas bernama sama:

     <kunci>-vo.md          teks VO       — HARD RULE 4
     <kunci>-direction.md   apa di layar  — HARD RULE 3
     <kunci>.tsx            komposisinya  — HARD RULE 1, dibangun dari dua di atas

   Arahnya satu: rencana VO + direction -> komposisi. Karena itu yang dilaporkan
   di sini bukan cuma "komponennya belum ada", tapi juga mana yang belum boleh
   dibangun sama sekali karena sumbernya belum ditulis.

   Nama berkas ikut diperiksa karena konvensi yang tidak diverifikasi akan
   meleset dalam sebulan: begitu naskah disisipi satu scene di tengah, semua
   nomor sesudahnya salah, `ls scenes/` diam-diam berhenti berarti urutan
   tayang, dan `npx remotion still <nama-berkas>` menunjuk scene yang keliru.

   KEDUA SHORT ikut diperiksa dengan pemeriksaan yang sama persis — Shorts
   tunduk pada HARD RULE yang sama (CLAUDE.md), jadi ia tidak boleh punya
   pemeriksa sendiri yang lebih longgar.

   Jalankan:  npm run sisa
*/
import { existsSync, readdirSync, readFileSync } from "node:fs";

import { bacaEpisode, bacaShort, daftarShort } from "./baca-episode.mjs";

const slug = process.argv[2] ?? "apa-itu-ram";

/** Berkas .tsx yang memang BUKAN scene. Tanpa daftar ini, perangkai dan berkas
 *  timing dilaporkan sebagai "id yang tidak ada di naskah" — peringatan palsu
 *  yang, sekali dibiarkan, membuat seluruh keluaran perintah ini berhenti
 *  dipercaya. */
const BUKAN_SCENE = new Set(["Episode.tsx", "Short.tsx", "index.ts", "timing.gen.ts"]);

const AKHIRAN = [".tsx", "-vo.md", "-direction.md"];

/** Satu keluaran: video panjang atau satu Short. Keduanya diperiksa identik. */
const periksa = ({ nama, dir, timing, audioYatim, maks, total }) => {
  console.log(`\n=== ${nama} ===`);

  /* index.ts dibaca sebagai teks, bukan diimpor — ia TypeScript, dan menyeret
     transpiler ke skrip sekecil ini tidak sebanding. Bentuknya dikurasi, jadi
     polanya stabil. */
  const daftar = readFileSync(`${dir}/index.ts`, "utf8");

  /* Dipatok ke DEKLARASINYA (`export const SCENES ... = {`), bukan ke kata
     "SCENES" di mana pun. Versi longgar sebelumnya cocok juga dengan kata SCENES
     di dalam komentar asalkan ada `={` di belakangnya — dan komentar yang
     menyebut sebuah prop JSX (`figur={...}`) sudah cukup untuk membuatnya
     memotong berkas di tempat yang salah. Akibatnya perintah ini melaporkan
     scene yang komponennya SUDAH ada sebagai placeholder: tepat jenis kebohongan
     yang perintah ini dibuat untuk mencegah. */
  const isiSCENES = daftar.split(/export\s+const\s+SCENES[^=]*=\s*\{/)[1] ?? "";
  const punya = new Set(
    [...isiSCENES.matchAll(/^\s*"?([a-z][a-z0-9-]*|s\d{3})"?\s*:/gim)].map((m) => m[1]),
  );

  const belum = timing.filter((t) => !t.standar && !punya.has(t.id));
  const jadi = timing.length - belum.length;

  console.log(`${jadi}/${timing.length} scene sudah punya komponen.`);

  if (maks !== undefined) {
    const sisa = Math.round((maks - total) * 10) / 10;
    console.log(
      `Durasi ${total} dtk dari batas ${maks} dtk` +
        (sisa >= 0 ? ` — sisa ${sisa} dtk.` : ` — LEWAT ${-sisa} dtk.`),
    );
  }

  /* --- rencana VO & direction ---------------------------------------------- */

  const berkas = new Set(readdirSync(dir));
  const kurang = [];

  for (const t of timing) {
    /* Rencana VO cuma untuk scene yang bicara. Opening & closing tidak punya VO
       sama sekali (docs/10), jadi berkasnya memang tidak ada. */
    if (!t.standar) {
      if (!berkas.has(`${t.kunci}-vo.md`)) kurang.push(`${t.kunci}-vo.md — belum ada`);
      else if (t.beat.length === 0) {
        kurang.push(`${t.kunci}-vo.md — blok "## VO" masih kosong`);
      }
    }
    /* Direction untuk SEMUA scene, opening & closing termasuk — koreografinya
       milik shared/ dan berubahnya menyentuh semua episode (HARD RULE 3). */
    const dir2 = `${t.kunci}-direction.md`;
    if (!berkas.has(dir2)) kurang.push(`${dir2} — belum ada`);
    else if (!readFileSync(`${dir}/${dir2}`, "utf8").trim()) {
      kurang.push(`${dir2} — masih kosong`);
    }
  }

  if (kurang.length) {
    console.log(`\n${kurang.length} sumber scene belum lengkap:`);
    for (const k of kurang) console.log(`  ${k}`);
    console.log(
      `\nRencana VO (HARD RULE 4) & direction (HARD RULE 3) ditulis Claude, ` +
        `direvisi user lewat chat. Selama salah satunya kosong, .tsx-nya belum ` +
        `boleh dibangun.`,
    );
  }

  /* --- baris pembuka VO: HARD RULE 6 --------------------------------------- */

  /* Undangan membayangkan dan nama benda yang datang terlalu awal tidak bisa
     diperiksa mesin — keduanya soal apakah gambarannya sudah berdiri di kepala
     penonton, dan itu cuma bisa dinilai dengan membaca. Yang BISA dilakukan di
     sini adalah menaruh keempat baris pembukanya berurutan dalam satu daftar
     pendek, sesuatu yang tidak pernah terjadi sendiri: tiap berkas dibuka
     sendiri-sendiri saat digarap, jadi "semua scene dibuka dengan cara yang sama"
     adalah persis jenis kesalahan yang tidak kelihatan dari dalam satu berkas.

     Dicetak, bukan divonis. Perintah ini tidak pernah gagal karenanya. */
  const pembuka = timing.filter((t) => !t.standar && t.beat.length > 0);
  if (pembuka.length) {
    console.log(`\nBaris pembuka VO — HARD RULE 6 (undangan dulu, nama belakangan):`);
    for (const t of pembuka) console.log(`  ${t.kunci}  "${t.beat[0].teks}"`);
    console.log(
      `\nPeriksa dengan membaca: gambaran baru -> wajib mengundang; gambaran ` +
        `yang sama -> jangan mengundang ulang; nama benda tidak pernah membuka ` +
        `scene. Scene yang sengaja tidak mengundang menulis alasannya di ` +
        `"## Catatan" (docs/11).`,
    );
  }

  /* --- sambungan antar-scene: HARD RULE 7 ---------------------------------- */

  /* Sambungan sebuah scene ke tetangganya cuma dua baris — baris terakhir scene N
     dan baris pertama scene N+1 — dan keduanya ada di BERKAS YANG BERBEDA. Itu
     yang membuat sambungan yang lompat tidak pernah kelihatan saat menggarap satu
     scene: dari dalam berkasnya, kedua baris itu masing-masing baik-baik saja.

     Karena itu yang dicetak di sini bukan daftar scene, melainkan daftar JAHITAN —
     dua baris yang bersentuhan, ditaruh berdampingan. Sama seperti HARD RULE 6 di
     atas: dicetak, tidak divonis. Apakah sebuah jahitan menyambung atau cuma
     berdempetan hanya bisa dinilai dengan membacanya. */
  const berurut = pembuka;
  if (berurut.length > 1) {
    console.log(`\nSambungan antar-scene — HARD RULE 7 (jembatan, bukan pengumuman):`);
    for (let i = 0; i + 1 < berurut.length; i++) {
      const a = berurut[i];
      const b = berurut[i + 1];

      /* Scene standar yang menyela (kartu judul) disebutkan supaya jahitan yang
         "terasa jauh" tidak dikira salah baca — opening tidak bicara, jadi kedua
         baris ini tetap bersentuhan langsung di telinga penonton (docs/10). */
      const disela = timing
        .slice(timing.indexOf(a) + 1, timing.indexOf(b))
        .filter((t) => t.standar)
        .map((t) => t.id);

      console.log(
        `  ${a.kunci} -> ${b.kunci}${disela.length ? `   (disela ${disela.join(", ")} — tidak bicara)` : ""}`,
      );
      console.log(`    …"${a.beat.at(-1).teks}"`);
      console.log(`     "${b.beat[0].teks}"…`);
    }
    console.log(
      `\nUji tiap jahitan: tutup baris atasnya, baca baris bawahnya sendirian. ` +
        `Kalau masih utuh maknanya, ia bukan jembatan — ia bab baru. Perbaikannya ` +
        `hampir selalu di baris TERAKHIR scene sebelumnya (gantung sesuatu di ` +
        `sana), bukan di scene barunya. Jahitan yang sengaja dibiarkan menganga ` +
        `menulis alasannya di "## Catatan" (docs/11).`,
    );
  }

  /* --- berkas VO: preview atau final --------------------------------------- */

  /* Scene yang belum punya berkas VO tampil dengan subtitel preview (docs/11).
     Itu benar selama produksi, dan salah di MP4 final — jadi jumlahnya dilaporkan
     di sini, bersama placeholder, bukan disimpan sebagai pengetahuan di kepala. */
  const bicara = timing.filter((t) => !t.standar);
  const bersuara = bicara.filter((t) => t.voAudio);
  console.log(
    `\n${bersuara.length}/${bicara.length} scene sudah punya berkas VO di public/vo/${slug}/.`,
  );
  if (bersuara.length < bicara.length) {
    console.log(
      `${bicara.length - bersuara.length} scene masih tampil dengan SUBTITEL PREVIEW — ` +
        `jangan render MP4 final selama masih ada.`,
    );
  }

  /* Berkas VO yang tidak cocok dengan kunci mana pun: hampir selalu sisa
     penomoran lama (HARD RULE 5). Ini gagal DIAM-DIAM kalau tidak dilaporkan —
     scene-nya kembali bisu dan bersubtitel, dan itu baru ketahuan saat menonton
     hasil render. */
  if (audioYatim.length) {
    console.error(`\n${audioYatim.length} berkas VO tidak dipakai scene mana pun:`);
    for (const p of audioYatim) console.error(`  public/${p}`);
    console.error(
      `\nNama berkas VO = <prefiks>-<kunci>.mp3. Kalau scene-nya baru dinomori ` +
        `ulang, ganti nama berkas VO-nya juga — jangan generate ulang, itu berbayar.`,
    );
    process.exitCode = 1;
  }

  /* --- nama berkas --------------------------------------------------------- */

  const kunciSah = new Set(timing.map((t) => t.kunci));
  const kunciDariId = new Map(timing.map((t) => [t.id, t.kunci]));
  const salah = [];

  for (const f of berkas) {
    if (BUKAN_SCENE.has(f)) continue;
    const akhiran = AKHIRAN.find((a) => f.endsWith(a));
    if (!akhiran) continue;

    const nama = f.slice(0, -akhiran.length);
    if (kunciSah.has(nama)) continue;

    /* Cocokkan lewat ID-nya supaya pesannya bisa menyebut nama yang benar,
       bukan cuma bilang "salah". */
    const m = /^\d+-(.+)$/.exec(nama);
    const id = m ? m[1] : nama;
    const benar = kunciDariId.get(id);
    salah.push(
      benar ? `${f} — seharusnya ${benar}${akhiran}` : `${f} — id "${id}" tidak ada di naskah`,
    );
  }

  if (salah.length) {
    console.error(`\n${salah.length} nama berkas tidak cocok:`);
    for (const s of salah) console.error(`  ${s}`);
    console.error(
      `\nNama berkas = id komposisi Remotion = field \`kunci\` di timing.gen.ts. ` +
        `Urutan menghitung scene standar walaupun komponennya di shared/ — ` +
        `lihat ${dir}/index.ts.`,
    );
    process.exitCode = 1;
  } else {
    const n = [...berkas].filter(
      (f) => !BUKAN_SCENE.has(f) && AKHIRAN.some((a) => f.endsWith(a)),
    ).length;
    if (n) console.log(`${n} nama berkas cocok dengan kunci di naskah.`);
  }

  /* --- sisa pekerjaan ------------------------------------------------------ */

  if (belum.length === 0) {
    console.log("\nTidak ada placeholder tersisa — siap dirender.");
  } else {
    console.log(`\n${belum.length} masih placeholder:`);
    const k = belum.map((t) => t.kunci);
    for (let i = 0; i < k.length; i += 8) console.log("  " + k.slice(i, i + 8).join(" "));
    console.log(
      `\nJANGAN render MP4 final selama masih ada placeholder — ` +
        `lihat shared/Placeholder.tsx.`,
    );
  }
};

/* --- video panjang ---------------------------------------------------------- */

const ep = bacaEpisode(slug);
periksa({
  nama: `video panjang · ideas/${slug}/scenes`,
  dir: ep.dirVO,
  timing: ep.timing,
  audioYatim: ep.audioYatim,
});

/* --- Shorts ----------------------------------------------------------------- */

for (const short of daftarShort(slug)) {
  const s = bacaShort(slug, short);
  if (!existsSync(`${s.dirVO}/index.ts`)) {
    console.error(
      `\n=== Short ${short.nomor} · ${s.dirVO} ===\n` +
        `index.ts belum ada — daftar SCENES Short ini tidak bisa dibaca.`,
    );
    process.exitCode = 1;
    continue;
  }
  periksa({
    nama: `Short ${short.nomor} · ${s.dirVO}`,
    dir: s.dirVO,
    timing: s.timing,
    audioYatim: s.audioYatim,
    maks: s.MAKS,
    total: s.TOTAL,
  });
}
