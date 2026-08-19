/* lokasi.mjs — di folder mana sebuah topik tinggal.
 *
 * Ada DUA titik masuk topik di repo ini, dan isinya berbentuk sama persis:
 *
 *     ideas/<slug>/        ide mentah → uji 4 syarat → lima fase (ideas/README)
 *     fast_ideas/<slug>/   direction diunggah user → tiga fase (fast_ideas/README)
 *
 * Yang berbeda cuma cara topiknya masuk. Sesudah itu naskah.md, scenes/,
 * scene-shorts/, dan render/ identik — jadi seluruh perkakas membaca keduanya
 * lewat SATU fungsi ini, bukan lewat cabang `if` yang disalin ke sepuluh berkas.
 *
 * KENAPA BUKAN DAFTAR SLUG. Daftar yang ditulis tangan meleset satu hari setelah
 * topik pertama pindah folder, dan melesetnya diam: perkakasnya tetap jalan,
 * cuma membaca naskah yang salah. Yang dipakai keberadaan foldernya sendiri.
 *
 * URUTANNYA `fast_ideas` DULU, lalu `ideas`. Kalau satu slug ada di keduanya itu
 * kekeliruan yang harus diperbaiki, bukan keadaan yang perlu ditoleransi — dan
 * `dirTopik` menolaknya, karena dua folder untuk satu slug berarti dua naskah
 * yang akan berbeda diam-diam.
 */
import { existsSync } from "node:fs";

/** Semua akar topik, sesuai urutan pencarian. */
export const AKAR = ["fast_ideas", "ideas"];

/** Folder topik sebuah slug — mis. `fast_ideas/neural-network`.
 *
 *  Melempar kalau slug-nya tidak ada di mana pun, atau ada di lebih dari satu
 *  akar. Keduanya kesalahan yang lebih murah dihentikan di sini daripada
 *  ketahuan sebagai naskah yang isinya bukan yang disunting. */
export const dirTopik = (slug) => {
  const ada = AKAR.filter((akar) => existsSync(`${akar}/${slug}`));

  if (ada.length === 0) {
    throw new Error(
      `Topik "${slug}" tidak ada di ${AKAR.map((a) => `${a}/`).join(" maupun ")}.`,
    );
  }
  if (ada.length > 1) {
    throw new Error(
      `Topik "${slug}" ada di ${ada.map((a) => `${a}/${slug}`).join(" DAN ")}. ` +
        `Satu slug cuma boleh tinggal di satu akar — pindahkan atau hapus salah satunya.`,
    );
  }

  return `${ada[0]}/${slug}`;
};

/** Slug dari sebuah argumen yang boleh berupa slug atau jalur folder topik.
 *  `fast_ideas/neural-network`, `ideas/tcp-ip/scenes`, dan `tcp-ip` sama saja. */
export const slugDari = (arg) => {
  const bersih = String(arg).replace(/\\/g, "/");
  const m = new RegExp(`(?:^|/)(?:${AKAR.join("|")})/([^/]+)`).exec(bersih);
  return m ? m[1] : bersih.replace(/\/.*$/, "");
};

/** Apakah topik ini punya VIDEO PANJANG.
 *
 *  Yang menentukan keberadaan folder `scenes/`, bukan daftar di skrip mana pun —
 *  pola yang sama dengan `daftarShort()`, yang membaca subfolder `scene-shorts/`
 *  alih-alih daftar yang ditulis tangan.
 *
 *  Ada topik yang memang tidak punya: seri Shorts, tempat tiap episode berdiri
 *  sendiri sebagai satu Short (fast_ideas/neural-network). Sebelum ini seluruh
 *  perkakas mengandaikan setiap topik punya video panjang, dan topik seperti itu
 *  berhenti di `bacaEpisode()` dengan pesan tentang "bagian 1 (question)" yang
 *  tidak ada hubungannya dengan sebabnya. */
export const punyaEpisode = (slug) => existsSync(`${dirTopik(slug)}/scenes`);
