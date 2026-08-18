import type React from "react";
import { ABU } from "./palet";

/* Sumber gambar: SVG Repo — "hand-holding" (#473219),
 * https://www.svgrepo.com/svg/473219/hand-holding
 *
 * BELUM DIVERIFIKASI LISENSINYA. Halaman koleksinya dijaga bot-check dan
 * menolak diambil, jadi yang berhasil diunduh cuma berkas SVG-nya, tanpa nama
 * koleksi maupun barisan lisensinya. Sebelum topik yang memakai figur ini
 * diunggah, buka halaman itu di peramban dan pastikan lisensinya CC0/MIT —
 * kalau ternyata CC BY, atribusinya wajib ikut di deskripsi video (docs/06).
 *
 * Jalur `d` di bawah UTUH seperti aslinya. Yang diubah cuma pembungkusnya:
 * `fill` hitam mati jadi token warna, dan titik nolnya dipindah ke telapak.
 */

/** Ukuran asli ikonnya 32×32; panggung kita bekerja pada frame 1920×1080.
 *  Pengali ini yang menjembatani, dan ia TETAP — `skala` prop bekerja di
 *  atasnya, supaya `skala={1}` berarti hal yang sama di semua scene. */
const S = 5;

/** Titik nol figur ini, dalam satuan ikon aslinya: dasar cekungan telapak,
 *  tempat benda yang dipegang MENDARAT.
 *
 *  Angkanya dibaca dari render, bukan dari jalur `d`-nya. Tebakan pertama
 *  (14, 11.5) diambil dari batas atas kotak ikonnya dan meleset ~5px ke kiri
 *  dan ~18px ke atas: gembok yang ditaruh di koordinat yang sama tenggelam ke
 *  dalam pergelangan. Cekungan telapak bukan tepi atas kotak — ia lebih ke
 *  kanan dan lebih rendah. Bandingkan lagi lewat `figur-kontak` kalau diubah. */
const TUMPU = { x: 19, y: 15 };

/** Tangan menadah dari samping — telapak terbuka, sesuatu duduk di atasnya.
 *
 *  Bedanya dengan `Tangan` di `panggung-kiriman.tsx`: yang itu jari-jari yang
 *  menjulur dari BAWAH garis jalan, tanpa lengan, untuk memperlihatkan bahwa
 *  siapa pun bisa meraih yang lewat. Yang ini punya lengan dan telapak yang
 *  terbaca sebagai MEMEGANG — tangan yang memiliki, bukan tangan yang meraih.
 *
 *  Titik acuannya permukaan telapak, bukan kaki (README aturan 2 mengecualikan
 *  benda yang memang tidak berdiri di lantai): benda yang dipegang ditaruh di
 *  koordinat yang SAMA dengan tangannya, dan ia duduk pas di telapak.
 *
 *  CATATAN GAYA — figur ini BLOK ISI, sementara semua figur lain di folder ini
 *  garis. Di scene yang berisi keduanya, tangan ini akan terbaca lebih berat
 *  daripada apa pun di sebelahnya. Itu berguna kalau tangannya memang subjek
 *  scene; kalau ia cuma latar, turunkan `opacity` atau pakai `warna={TEDUH}`.
 */
export const TanganMemegang: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** 1 = telapak menghadap kanan (lengan dari kiri), -1 = cerminannya. */
  hadap?: 1 | -1;
  /** Miringkan tangan, derajat, berporos di telapak. */
  miring?: number;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, hadap = 1, miring = 0, warna = ABU }) => (
  <g transform={`translate(${x} ${y}) rotate(${miring})`} opacity={opacity}>
    <g transform={`scale(${hadap * S * skala} ${S * skala}) translate(${-TUMPU.x} ${-TUMPU.y})`}>
      <path
        fill={warna}
        d="M29.064 11.92c-0.421-0.176-0.911-0.279-1.424-0.279-0.576 0-1.122 0.129-1.611 0.36l0.023-0.010-5.778 2.596c0.003-0.047 0.026-0.088 0.026-0.135-0.014-1.371-1.129-2.477-2.502-2.477-0.069 0-0.136 0.003-0.204 0.008l0.009-0.001h-3.783l-4.76-1.394c-0.062-0.019-0.134-0.030-0.209-0.030-0.001 0-0.002 0-0.002 0h-2.169v-0.758c-0-0.414-0.336-0.75-0.75-0.75h-3.883c-0.414 0-0.75 0.336-0.75 0.75v0 12.208c0 0.414 0.336 0.75 0.75 0.75h3.883c0.414-0 0.75-0.336 0.75-0.75v0-1.004c1.818 0.284 3.446 0.742 4.988 1.366l-0.15-0.054c1.159 0.416 2.497 0.656 3.891 0.656 1.607 0 3.139-0.319 4.536-0.898l-0.079 0.029c1.243-0.553 2.298-1.136 3.297-1.799l-0.082 0.051c0.338-0.209 0.674-0.418 1.014-0.619 1.641-0.971 2.951-1.819 4.129-2.671 0.58-0.413 1.086-0.822 1.567-1.257l-0.015 0.013c0.37-0.301 0.666-0.679 0.865-1.11l0.008-0.019c0.032-0.080 0.050-0.172 0.050-0.269 0-0.056-0.006-0.111-0.018-0.164l0.001 0.005c-0.147-1.016-0.756-1.866-1.603-2.338l-0.016-0.008zM5.181 21.26h-2.383v-10.708h2.383zM28.719 14.759c-0.412 0.37-0.861 0.73-1.328 1.063l-0.047 0.032c-1.137 0.822-2.412 1.647-4.014 2.596-0.348 0.205-0.691 0.418-1.037 0.631-0.855 0.574-1.838 1.121-2.866 1.586l-0.13 0.052c-1.152 0.473-2.49 0.748-3.891 0.748-1.203 0-2.358-0.202-3.435-0.575l0.074 0.022c-1.555-0.652-3.364-1.15-5.25-1.41l-0.115-0.013v-7.432h2.061l4.76 1.394c0.062 0.019 0.134 0.030 0.209 0.030 0.001 0 0.002 0 0.002 0h3.89c0.883 0 1.197 0.522 1.197 0.97s-0.314 0.97-1.197 0.97h-6.809c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h7.781c0.111-0 0.216-0.024 0.311-0.067l-0.005 0.002 7.795-3.502c0.287-0.132 0.623-0.21 0.977-0.21 0.266 0 0.521 0.043 0.76 0.124l-0.017-0.005c0.382 0.229 0.658 0.604 0.75 1.045l0.002 0.010c-0.135 0.159-0.276 0.302-0.427 0.434l-0.005 0.004z"
      />
    </g>
  </g>
);
