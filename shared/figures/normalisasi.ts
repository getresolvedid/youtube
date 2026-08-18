/* Menormalkan figur yang digambar di viewBox orang lain ke panggung kita.
 *
 * Tiga figur manusia repo ini datang dari SVG Repo di viewBox 0 0 512 512 —
 * sumbu y ke bawah, titik nolnya pojok kiri atas, dan tidak satu pun bertumpu di
 * kakinya. Aturan 2 di README folder ini mensyaratkan kebalikannya: titik acuan
 * KAKI, y ke atas negatif, tidak ada yang digambar di bawah 0.
 *
 * Yang menjembatani keduanya cuma satu transform, dan ia ditulis sekali di sini
 * supaya tiga figur tidak menurunkan tiga rumus yang sedikit berbeda. Perbedaan
 * seperti itu muncul sebagai satu figur yang amblas dua piksel ke dalam lantai —
 * dan dua piksel tidak pernah terlihat sampai ada yang menaruh keduanya
 * berdampingan.
 */
import type { KotakFigur } from "./sumber-svgrepo";

/** Tinggi baku semua figur manusia, pada `skala` 1.
 *
 *  Angkanya warisan `Sosok` versi garis yang digantikan ketiga siluet ini —
 *  kepala di y -116 dengan bahu setinggi 147 — dan dipertahankan justru supaya
 *  ia warisan: seluruh koordinat T15 (`Y_LANTAI`, jarak antar sosok, skala 0.44
 *  sampai 1.05 di lima belas scene) disetel terhadap tinggi itu. Mengubahnya di
 *  sini berarti menata ulang lima belas scene, bukan mengganti satu bentuk. */
export const TINGGI_FIGUR = 147;

/** Transform yang memindahkan sebuah `KotakFigur` ke titik tumpu (0,0) dengan
 *  tinggi `tinggi`.
 *
 *  Dibaca dari KANAN ke kiri, seperti semua transform SVG:
 *    1. `translate(-tengah, -dasar)` — sumbu badan ke x 0, garis lantainya ke y 0
 *    2. `scale(s)`                   — ubun-ubunnya jatuh tepat di y -tinggi
 *
 *  Hasilnya: bagian gambar yang ada di BAWAH `dasar` — kaki polisi yang tidak
 *  terpakai — berakhir di y positif, dan itu disengaja. Yang memotongnya
 *  `<clipPath>` di komponennya, bukan rumus ini; potongan yang dikerjakan di
 *  sini akan ikut memotong figur yang tidak minta dipotong. */
export const normalisasi = (kotak: KotakFigur, tinggi = TINGGI_FIGUR): string => {
  const s = tinggi / (kotak.dasar - kotak.atas);
  return `scale(${s}) translate(${-kotak.tengah} ${-kotak.dasar})`;
};

/** Lebar figur pada `tinggi` tertentu — bukan dipakai saat render, dipakai saat
 *  MENYETEL. Tiga figur yang tingginya sama tapi lebarnya berbeda dua kali lipat
 *  tidak terbaca sebagai tiga orang, dan lembar kontak yang mencetak angka ini
 *  di bawah tiap figur membuat perbedaannya jadi angka, bukan firasat. */
export const lebarPada = (kotak: KotakFigur, tinggi = TINGGI_FIGUR): number =>
  Math.round((kotak.lebar * tinggi) / (kotak.dasar - kotak.atas));
