/**
 * vo-script-audit.mjs — memeriksa NASKAH VO, bukan suaranya.
 *
 *   node --env-file=.env tools/vo-script-audit.mjs <slug>
 *
 * Namanya sengaja menyebut "script": yang diperiksa di sini teks di blok `## VO`.
 * Memeriksa audionya — apakah TTS benar-benar mengucapkannya seperti
 * dugaan — pekerjaan lain, di lapis lain, dan belum ada.
 *
 * DUA TINGKAT, dan bedanya bukan soal keparahan melainkan soal SIAPA YANG BISA
 * MEMUTUSKAN:
 *
 *   A · pasti salah      mesin tahu ini salah tanpa membaca kalimatnya.
 *                        Simbol mentah, angka digit, akronim tanpa aturan kamus,
 *                        audio tag di model yang tidak mendukungnya.
 *                        -> exit 1. Menahan render dan menahan generate VO.
 *
 *   B · perlu dibaca     mesin cuma bisa menunjuk, tidak bisa menilai.
 *                        Ritme datar, dua kalimat dalam satu beat, kalimat
 *                        panjang. -> dicetak saja, TIDAK PERNAH exit 1.
 *
 * Kenapa B tidak boleh menggagalkan: baris pembuka `05-kenapa-cepat` —
 * "Dekatnya memang membantu. Tapi bukan cuma itu." — ditandai sebagai dua
 * kalimat dalam satu beat, padahal ia justru jembatan HARD RULE 7 terbaik di
 * episode itu. Aturan yang menggagalkan build karena naskahnya bagus akan
 * dimatikan orang dalam seminggu, dan tingkat A ikut mati bersamanya.
 *
 * Sumber teksnya lewat baca-episode.mjs — modul yang sama dengan yang menghitung
 * timing dan yang mengirim ke TTS. Parser kedua akan berbeda diam-diam.
 */

import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

import { bacaEpisode, bacaShort, daftarShort } from "./baca-episode.mjs";

/** Berkas ini dua-duanya: CLI dan modul. `tingkatA`/`tingkatB` diekspor supaya
 *  bisa diuji dengan baris yang sengaja salah — satu-satunya cara membuktikan
 *  pemeriksaannya menggigit, karena naskah yang sehat justru tidak memicunya.
 *  Tanpa penjaga ini, sekadar mengimpornya menjalankan audit penuh dan bisa
 *  `exit(1)` di tengah proses yang cuma mau memakai satu fungsinya. */
const DIJALANKAN_LANGSUNG =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

const slug = process.argv[2] ?? "apa-itu-ram";
const MAKS_KATA_KALIMAT = 18;

/* Ambang ritme. cv = simpangan baku / rata-rata panjang baris. Angkanya memang
   dipilih, bukan diturunkan: 0.30 kira-kira memisahkan scene yang punya baris
   pendek sebagai tumpuan dari scene yang semua barisnya sepanjang itu. Ia cuma
   menyalakan lampu tingkat B, jadi salah tebak sedikit tidak menghentikan apa
   pun. */
const CV_DATAR = 0.3;

/* Audio tag dan <break> DILARANG di blok `## VO`, dan larangannya tidak lagi
   bergantung model.

   Dulu aturannya dibaca dari nama model TTS: tag sah di sebagian model, <break>
   sah di v2. Itu keliru arah — ia menilai apa yang MODEL sanggup baca, padahal
   yang menentukan adalah siapa saja yang membaca blok itu. Blok `## VO` punya
   empat pembaca: penghitung timing di baca-episode.mjs, subtitel preview,
   daftar sambungan yang dicetak `npm run sisa`, dan nanti berkas subtitel
   penonton. Mesin TTS cuma satu dari empat.

   Jadi `[slow]` tetap salah walaupun Gemini memahaminya — ia terhitung sebagai
   kata, muncul di subtitel, dan mengotori daftar sambungan. Tempat yang benar
   untuk arahan pembacaan adalah profil topik
   (ideas/<slug>/vo-gemini-profile.yaml, docs/11), sama seperti pengucapan
   tinggal di `## Kamus pengucapan` dan bukan diketik fonetik ke naskah. */

/* --- kamus pengucapan ------------------------------------------------------- */

/** Kolom kiri tabel `## Kamus pengucapan` di naskah.md — ejaan yang boleh
 *  ditulis di blok `## VO` karena ada aturan alias yang menerjemahkannya.
 *
 *  Ini yang membuat pemeriksaan akronim dan angka punya arti. Tanpa kamus,
 *  satu-satunya cara menulis "SSD" dengan aman adalah mengetiknya "S S D" —
 *  dan pemeriksaannya jadi hampa karena tidak ada lagi yang tersisa untuk
 *  ditangkap. Dengan kamus, invariannya jadi tajam: akronim boleh ada JIKA DAN
 *  HANYA JIKA ada aturan yang mencakupnya. */
const bacaKamus = () => {
  const set = new Set();
  const path = `ideas/${slug}/naskah.md`;
  /* Saat diimpor sebagai modul, argv[2] milik proses lain dan slug-nya bisa
     menunjuk topik yang tidak ada. Kamus kosong lebih benar daripada lempar. */
  if (!existsSync(path)) return set;
  const naskah = readFileSync(path, "utf8");
  const bagian = /^## Kamus pengucapan\s*$([\s\S]*?)^## /m.exec(naskah);
  if (!bagian) return set;

  for (const baris of bagian[1].split("\n")) {
    const m = /^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/.exec(baris);
    if (!m) continue;
    const kiri = m[1].trim();
    if (!kiri || kiri === "Tulis di VO" || /^-+$/.test(kiri)) continue;
    set.add(kiri);
  }
  return set;
};

const KAMUS = bacaKamus();

/* --- pembantu --------------------------------------------------------------- */

const kata = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const kalimat = (s) =>
  s
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter(Boolean);

/** Sudah tercakup kamus? Dicek sebagai potongan utuh supaya "DDR4" lolos lewat
 *  aturan "DDR4", tapi "HTTP" yang belum pernah didaftarkan tetap tertangkap. */
const dicakupKamus = (potongan) => {
  for (const k of KAMUS) if (k === potongan || k.includes(potongan)) return true;
  return false;
};

/* --- tingkat A: mesin tahu ini salah ---------------------------------------- */

export const tingkatA = (teks) => {
  const t = [];

  const tag = teks.match(/\[[a-zA-Z][a-zA-Z ]*\]/g);
  if (tag)
    t.push(
      `audio tag ${tag.join(" ")} di blok VO — ikut terhitung sebagai kata, ` +
        `tampil di subtitel preview, dan ikut tercetak saat menilai sambungan`,
    );

  const brk = teks.match(/<break[^>]*>/g);
  if (brk)
    t.push(`<break> di blok VO — tidak didukung Gemini, dan ikut terhitung sebagai kata`);

  for (const s of teks.match(/[→&%/]/g) ?? [])
    t.push(`simbol mentah "${s}" — tulis kata-katanya`);
  if (/[()]/.test(teks)) t.push(`tanda kurung — TTS membacanya sebagai jeda aneh`);
  if (/\*\*|__/.test(teks)) t.push(`markdown di teks VO`);

  for (const d of teks.match(/\b\d+\b/g) ?? [])
    t.push(`angka digit "${d}" — tulis sesuai cara baca`);

  /* Akronim: 2+ karakter, diawali huruf besar, boleh mengandung angka.
     "S S D" yang dieja per huruf tidak kena — tiap potongannya cuma 1 karakter. */
  for (const a of teks.match(/\b[A-Z][A-Z0-9]+\b/g) ?? [])
    if (!dicakupKamus(a))
      t.push(`akronim "${a}" tanpa aturan kamus — pengucapannya tidak dijamin`);

  return t;
};

/* --- tingkat B: cuma bisa ditunjuk ------------------------------------------ */

const KATA_TANYA = /^(apa|kenapa|kok|gimana|bagaimana|berapa|siapa|kapan|di mana|pernah)\b/i;

export const tingkatB = (teks) => {
  const t = [];
  const kal = kalimat(teks);

  if (kal.length > 1) t.push(`${kal.length} kalimat dalam satu beat`);
  for (const k of kal) {
    const n = kata(k);
    if (n > MAKS_KATA_KALIMAT) t.push(`kalimat ${n} kata (patokan ${MAKS_KATA_KALIMAT})`);
    if (KATA_TANYA.test(k) && !k.includes("?"))
      t.push(`tanya tanpa "?" — TTS tidak akan menaikkan intonasi`);
  }
  if (/\b[A-Z]{2,}\b/.test(teks) && !/^[^a-z]*$/.test(teks))
    t.push(`huruf kapital — ikut terbawa ke berkas subtitel penonton`);

  return t;
};

/* --- ritme ------------------------------------------------------------------ */

/** Sebaran panjang baris. Ritme yang rata terbaca telinga sebagai metronom, dan
 *  metronom adalah tempat penonton berhenti mendengarkan isi.
 *
 *  Cakupannya berbeda antara video panjang dan Shorts, dan itu bukan detail:
 *  scene video panjang punya 4–9 baris, jadi ritmenya hidup DI DALAM scene.
 *  Scene Short cuma 1–2 baris — menghitung cv di situ menghasilkan 0.00 di
 *  hampir semua scene, bendera palsu di mana-mana, dan orang berhenti membaca
 *  laporannya. Ritme Short hidup MELINTASI scene. */
const ritme = (n) => {
  const rata = n.reduce((a, b) => a + b, 0) / n.length;
  const sd = Math.sqrt(n.reduce((a, b) => a + (b - rata) ** 2, 0) / n.length);
  return { rata, sd, cv: rata ? sd / rata : 0 };
};

/* --- laporan ---------------------------------------------------------------- */

let totalA = 0;
let totalB = 0;

const laporan = (nama, timing, { ritmePerScene }) => {
  console.log(`\n${"=".repeat(68)}\n${nama}\n${"=".repeat(68)}`);

  const semuaBaris = [];

  for (const t of timing) {
    if (t.standar || !t.vo?.trim()) continue;

    const baris = t.beat.map((b) => b.teks);
    const n = baris.map(kata);
    semuaBaris.push(...n);

    const temuanA = [];
    const temuanB = [];
    baris.forEach((b, i) => {
      for (const p of tingkatA(b)) temuanA.push(`baris ${i + 1}: ${p}`);
      for (const p of tingkatB(b)) temuanB.push(`baris ${i + 1}: ${p}`);
    });

    if (ritmePerScene && n.length >= 4) {
      const { rata, cv } = ritme(n);
      if (cv < CV_DATAR)
        temuanB.push(`ritme datar — cv ${cv.toFixed(2)}, rata ${rata.toFixed(1)} kata/baris`);
      if (n.length >= 5 && Math.min(...n) >= 6)
        temuanB.push(`tidak ada baris pendek — terpendek ${Math.min(...n)} kata`);
    }

    if (temuanA.length === 0 && temuanB.length === 0) continue;

    console.log(`\n  ${t.kunci}   [${n.join(" · ")}]`);
    for (const p of temuanA) console.log(`    A  ${p}`);
    for (const p of temuanB) console.log(`    B  ${p}`);
    totalA += temuanA.length;
    totalB += temuanB.length;
  }

  if (!ritmePerScene && semuaBaris.length >= 4) {
    const { rata, cv } = ritme(semuaBaris);
    console.log(`\n  ritme seluruh Short — cv ${cv.toFixed(2)}, rata ${rata.toFixed(1)} kata/baris`);
    if (cv < CV_DATAR) {
      console.log(`    B  ritme datar melintasi scene`);
      totalB++;
    }
  }
};

/* --- jalan ------------------------------------------------------------------ */

if (DIJALANKAN_LANGSUNG) {
  console.log(`\nvo-script-audit · ${slug}`);
  console.log(`Kamus pengucapan: ${KAMUS.size} entri — ${[...KAMUS].join(", ") || "(kosong)"}`);

  laporan(`${slug} — video panjang`, bacaEpisode(slug).timing, { ritmePerScene: true });

  for (const s of daftarShort(slug)) {
    laporan(`${slug} — Short ${s.nomor} · ${s.folder}`, bacaShort(slug, s).timing, {
      ritmePerScene: false,
    });
  }

  console.log(`\n${"─".repeat(68)}`);
  console.log(`Tingkat A (pasti salah) : ${totalA}`);
  console.log(`Tingkat B (perlu dibaca): ${totalB}`);

  if (totalA > 0) {
    console.error(
      `\n${totalA} temuan tingkat A. Semuanya berakhir sebagai kesalahan yang\n` +
        `terdengar di MP3 dan cuma bisa diperbaiki dengan generate ulang berbayar.\n` +
        `Perbaiki dulu, atau daftarkan istilahnya di § Kamus pengucapan.\n`,
    );
    process.exit(1);
  }

  console.log(
    totalB > 0
      ? `\nTidak ada yang menahan. ${totalB} temuan tingkat B menunggu DIBACA —\n` +
          `mesin cuma menunjuk, yang menilai tetap kamu. Ritme datar dan dua\n` +
          `kalimat dalam satu beat sering justru disengaja; kalau begitu, tulis\n` +
          `alasannya di "## Catatan" supaya sesi berikutnya tidak mengubahnya.\n`
      : `\nBersih di kedua tingkat.\n`,
  );
}
