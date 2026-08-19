/* Kover Short 2 · 9:16 · 2160x3840
   Brief: ../thumbnail.md § Kover Short

   Sekeluarga dengan thumb-s1/s3/s4 — potongan bernomor yang sama, dan satu
   benda yang menyala di antara benda yang tidak.

     npx remotion still T18-thumb-s2 ideas/tcp-ip/render/thumb-s2.png
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { Paket } from "../panggung-jaringan";

const W = 1860;
const H = 2100;

const N = 5;
const JARAK = 340;
const Y_BERKAS = 620;
/** Barisan ditaruh dekat DASAR pita figur (2100), bukan di tengahnya: pita
 *  9:16 punya kelebihan tinggi, dan yang tidak dipakai jadi zona mati antara
 *  figur dan teks — bukan ruang napas (shared/Thumbnail.tsx). */
const Y_POTONGAN = 1830;
const BERKAS = { w: 1120, h: 440 } as const;

export const ThumbS2: React.FC = () => (
  <KartuThumbnail baris={["SATU FILE,", "LIMA KOTAK"]} rasio="9x16">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {/* Yang satu, di atas. */}
      <rect
        x={W / 2 - BERKAS.w / 2}
        y={Y_BERKAS - BERKAS.h / 2}
        width={BERKAS.w}
        height={BERKAS.h}
        rx={30}
        fill="var(--bg-elev)"
        stroke="var(--ink-2)"
        strokeWidth={12}
      />
      <text
        x={W / 2}
        y={Y_BERKAS + 40}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={150}
        fontWeight={700}
        fill="var(--ink-2)"
      >
        FILE
      </text>

      {/* Panah turun — satu jadi banyak, dan arahnya harus terbaca tanpa kata. */}
      <path
        d={`M${W / 2} ${Y_BERKAS + 300} v 520 m -70 -90 l 70 90 l 70 -90`}
        stroke="var(--accent)"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Yang banyak, di bawah — dan mereka yang menyala. */}
      {Array.from({ length: N }, (_, i) => (
        <Paket
          key={i}
          x={W / 2 + (i - (N - 1) / 2) * JARAK}
          y={Y_POTONGAN}
          nomor={i + 1}
          skala={3.0}
        />
      ))}
    </svg>
  </KartuThumbnail>
);
