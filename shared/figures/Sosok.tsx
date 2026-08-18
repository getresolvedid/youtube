import type React from "react";
import { ABU } from "./palet";
import { PERSON_D, PERSON_KOTAK } from "./sumber-svgrepo";
import { TINGGI_FIGUR, normalisasi } from "./normalisasi";

/** Batas kepala dan badan di koordinat sumber, dipakai `miring`.
 *
 *  Ditaruh di 215 karena itu titik paling SEMPIT siluetnya — pangkal leher.
 *  Kepala dan badan dipotong dari path yang sama lalu digambar sebagai dua
 *  bagian, jadi memutar kepala selalu meninggalkan celah di garis potongnya;
 *  di titik tersempit celah itu selebar leher, di tempat lain selebar bahu. */
const LEHER = 215;

/** Satu-satunya id `<clipPath>` figur ini, sengaja tetap dan bukan diacak.
 *
 *  Sosok muncul belasan kali dalam satu frame, jadi definisi ini ikut tercetak
 *  belasan kali dengan id yang sama — dan itu memang yang diinginkan: isinya
 *  identik, browser memakai yang pertama, dan id acak justru yang berbahaya di
 *  sini karena ia melanggar aturan deterministik CLAUDE.md (`Math.random()`
 *  membuat frame 1.234 tidak bisa dirender tanpa merender 1.233). */
const KLIP_KEPALA = "figur-sosok-kepala";
const KLIP_BADAN = "figur-sosok-badan";

/** Sosok orang — siluet, tanpa wajah.
 *
 *  Bentuknya siluet person-silhouette dari SVG Repo, satu koleksi dengan
 *  `Peretas` dan `Penjaga` ([sumber-svgrepo.ts](./sumber-svgrepo.ts)). Versi
 *  sebelumnya digambar garis — kepala lingkaran berongga, bahu satu busur — dan
 *  diganti karena manusia adalah satu-satunya benda di panggung ini yang perlu
 *  dikenali dari jauh sebagai SIAPA, bukan sebagai apa. Bentuk garis membedakan
 *  penjaga dari orang lewat dengan satu topi kecil; siluet membedakan keduanya
 *  lewat seluruh bentuknya, dan itu masih terbaca pada skala 0,44 di scene 13.
 *
 *  Benda lain di panggung TETAP garis, dan campurannya disengaja: manusia
 *  padat, barang berongga. Yang padat maju, yang berongga mundur — jadi mata
 *  menemukan orangnya lebih dulu tanpa satu pun warna aksen dipakai.
 *
 *  TANPA WAJAH, dan itu bukan penghematan. Begitu ada mata dan mulut, penonton
 *  mulai membaca perasaannya, dan sosok ini tidak pernah jadi tokoh — ia cuma
 *  "siapa pun yang kebetulan berdiri di situ".
 *
 *  Titik acuannya KAKI (aturan 2 di README): `y` adalah garis lantainya, dan
 *  tidak ada bagian yang digambar di bawah 0.
 */
export const Sosok: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** Arah hadap: 1 ke kanan, -1 ke kiri. Cerminan, BUKAN derajat.
   *
   *  Ini kekeliruan yang sudah pernah terjadi: satu topik memakai `hadap`
   *  sebagai derajat rotasi dan dua lainnya sebagai cermin ±1, dan `hadap={90}`
   *  di berkas yang salah menghasilkan kepala yang terbang, bukan error.
   *
   *  Nilai PECAHAN di antara -1 dan 1 sah, dan bukan kecelakaan: itulah cara
   *  memutar badan sebagai animasi — figurnya memipih sampai selebar nol lalu
   *  melebar lagi menghadap arah sebaliknya. Scene 11 T15 memakainya begitu.
   *
   *  Siluet ini menghadap PENONTON, jadi ±1 tidak mengubah apa pun yang
   *  terlihat — yang terlihat cuma pemipihan di antaranya. */
  hadap?: number;
  /** Miring kepala, derajat — untuk sosok yang mengikuti benda lewat.
   *  Kecil saja: di atas ±15° celah di lehernya mulai terlihat. */
  miring?: number;
  /** Tinggi pada `skala` 1. Hampir tidak pernah disetel — yang mengubah ukuran
   *  di dalam scene adalah `skala`. Ada supaya lembar kontak bisa membandingkan
   *  ketiga figur pada tinggi yang dipaksa sama. */
  tinggi?: number;
  warna?: string;
}> = ({
  x,
  y,
  skala = 1,
  opacity = 1,
  hadap = 1,
  miring = 0,
  tinggi = TINGGI_FIGUR,
  warna = ABU,
}) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <g transform={`scale(${hadap} 1)`}>
      <g transform={normalisasi(PERSON_KOTAK, tinggi)}>
        <defs>
          <clipPath id={KLIP_KEPALA}>
            <rect x={0} y={PERSON_KOTAK.atas} width={512} height={LEHER - PERSON_KOTAK.atas} />
          </clipPath>
          <clipPath id={KLIP_BADAN}>
            <rect x={0} y={LEHER} width={512} height={PERSON_KOTAK.dasar - LEHER} />
          </clipPath>
        </defs>
        <path d={PERSON_D} fill={warna} clipPath={`url(#${KLIP_BADAN})`} />
        <g transform={`rotate(${miring} ${PERSON_KOTAK.tengah} ${LEHER})`}>
          <path d={PERSON_D} fill={warna} clipPath={`url(#${KLIP_KEPALA})`} />
        </g>
      </g>
    </g>
  </g>
);
