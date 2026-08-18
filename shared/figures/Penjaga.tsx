import type React from "react";
import { ABU } from "./palet";
import {
  POLICEMAN_BADAN_D,
  POLICEMAN_KEPALA_D,
  POLICEMAN_KOTAK,
  POLICEMAN_TOPI_D,
} from "./sumber-svgrepo";
import { TINGGI_FIGUR, normalisasi } from "./normalisasi";

/** Titik putar kepala di koordinat sumber: pangkal leher, tepat di bawah dagu
 *  (kepala 54–110, bahu mulai 125). */
const LEHER_Y = 116;

/** Lihat catatan id di [Sosok.tsx](./Sosok.tsx) — tetap, bukan diacak. */
const KLIP = "figur-penjaga-potong";

/** Penjaga — petugas berseragam bertopi puncak.
 *
 *  Siluet policeman dari SVG Repo, satu koleksi dengan `Sosok` dan `Peretas`.
 *  Aslinya BADAN PENUH sampai kaki, satu-satunya dari ketiganya yang begitu, dan
 *  dipakai utuh ia berdiri dua setengah kali lebih tinggi dari yang lain di
 *  lantai yang sama. Karena itu ia dipotong sebatas dada
 *  ([sumber-svgrepo.ts](./sumber-svgrepo.ts) `POLICEMAN_KOTAK`) — bukan
 *  dikecilkan, karena mengecilkannya menyamakan TINGGI dengan mengorbankan
 *  ukuran kepala, dan kepala yang mengecil itulah yang membuat sebuah figur
 *  terbaca berdiri jauh di belakang.
 *
 *  Yang membuatnya terbaca sebagai petugas ada tiga dan ketiganya bertahan
 *  sampai skala kecil: puncak topi yang menjorok, dasi, dan garis sabuk. Versi
 *  garis yang digantikannya cuma punya satu — topi beraksen — dan itu satu-
 *  satunya pembeda dari sosok biasa selama sepuluh scene.
 *
 *  TOPINYA PUNYA ARAH, tidak seperti `Sosok`. Puncaknya menjorok ke arah hadap,
 *  jadi `hadap` di sini benar-benar mengubah gambarnya — dan itu yang membuat
 *  penjaga yang membalikkan badan di scene 11 T15 terbaca sebagai berbalik dan
 *  bukan sebagai berkedip.
 *
 *  Titik acuannya KAKI (aturan 2 di README).
 */
export const Penjaga: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** Arah hadap: 1 ke kanan, -1 ke kiri. Cerminan, BUKAN derajat.
   *
   *  Pecahan di antaranya sah — itu animasi berbalik badan, dan figur inilah
   *  yang paling membutuhkannya: topinya punya arah, jadi pemipihan sampai nol
   *  lalu melebar lagi benar-benar terbaca sebagai badan yang berputar. */
  hadap?: number;
  /** Miring kepala, derajat. Kepala dan topi ikut; badannya tidak. */
  miring?: number;
  /** Tinggi pada `skala` 1 — lihat catatan yang sama di `Sosok`. */
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
      <g transform={normalisasi(POLICEMAN_KOTAK, tinggi)}>
        <defs>
          <clipPath id={KLIP}>
            <rect
              x={0}
              y={POLICEMAN_KOTAK.atas}
              width={512}
              height={POLICEMAN_KOTAK.dasar - POLICEMAN_KOTAK.atas}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${KLIP})`}>
          <path d={POLICEMAN_BADAN_D} fill={warna} fillRule="evenodd" />
          <g transform={`rotate(${miring} ${POLICEMAN_KOTAK.tengah} ${LEHER_Y})`}>
            <path d={POLICEMAN_KEPALA_D} fill={warna} />
            <path d={POLICEMAN_TOPI_D} fill={warna} />
          </g>
        </g>
      </g>
    </g>
  </g>
);
