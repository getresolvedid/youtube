import type React from "react";
import { GELAP } from "./palet";

/** Garis dasar panggung — satu-satunya benda yang ada di hampir semua scene.
 *
 *  Ia yang membuat potongan keras antar-scene terbaca sebagai perpindahan
 *  PANDANG, bukan perpindahan TEMPAT: selama garisnya di ketinggian yang sama,
 *  penonton membaca dua scene sebagai satu ruangan.
 *
 *  Karena itu `y` wajib diisi dan datangnya dari konstanta topik
 *  (`Y_LANTAI` / `Y_JALAN` di `panggung-*.tsx`), tidak pernah diketik angka di
 *  scene: dua scene yang lantainya beda 8px tidak terlihat sebagai cacat, cuma
 *  sebagai potongan yang terasa goyah.
 *
 *  `panjang` 0..1 menggambarnya tumbuh dari kiri — untuk scene yang memang
 *  mendirikan ruangannya di depan penonton. Scene lanjutan memakai bawaan 1.
 */
export const Lantai: React.FC<{
  y: number;
  x1?: number;
  x2?: number;
  opacity?: number;
  panjang?: number;
  warna?: string;
  tebal?: number;
}> = ({ y, x1 = 120, x2 = 1800, opacity = 1, panjang = 1, warna = GELAP, tebal = 5 }) => (
  <path
    d={`M${x1} ${y}h${(x2 - x1) * Math.max(0, Math.min(1, panjang))}`}
    stroke={warna}
    strokeWidth={tebal}
    strokeLinecap="round"
    opacity={opacity}
    fill="none"
  />
);
