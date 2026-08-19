/* Kover Short 3 · 9:16 · 2160x3840
   Brief: ../thumbnail.md § Kover Short

   Sekeluarga dengan thumb-s1/s2/s4, dan ia SENGAJA paling dekat dengan kartu
   video panjangnya: barisan bernomor yang kurang satu. Short 3 memang keluaran
   yang isinya paling berimpit dengan puncak video panjang, dan kover yang
   menyembunyikan itu cuma menukar kejelasan dengan variasi.

     npx remotion still T18-thumb-s3 ideas/tcp-ip/render/thumb-s3.png
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { PAKET, Paket } from "../panggung-jaringan";

const W = 1860;
const H = 2100;

const N = 5;
const JARAK = 350;
const SKALA = 2.8;
/** 1900 dan bukan 1620: pita figur 9:16 tingginya 2100, dan barisan yang
 *  berhenti di 77% menyisakan sepertiga kartu kosong antara figur dan teksnya.
 *  Kelebihan tinggi yang tidak dipakai bukan jadi ruang napas melainkan zona
 *  mati di tengah — peringatan yang sudah tertulis di shared/Thumbnail.tsx dan
 *  baru terlihat dari PNG-nya. */
const Y_SLOT = 1900;
const HILANG = 2; // nomor 3

const x = (i: number) => W / 2 + (i - (N - 1) / 2) * JARAK;

export const ThumbS3: React.FC = () => (
  <KartuThumbnail baris={["NOMOR TIGA", "KE MANA?"]} rasio="9x16">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {/* Jalur turun ke barisan — arah atas→bawah yang sama dengan Short-nya. */}
      <line
        x1={W / 2}
        y1={140}
        x2={W / 2}
        y2={Y_SLOT - 280}
        stroke="var(--line)"
        strokeWidth={16}
        strokeDasharray="44 52"
        strokeLinecap="round"
      />
      {[480, 940, 1400].map((y) => (
        <circle key={y} cx={W / 2} cy={y} r={34} fill="var(--ink-2)" />
      ))}

      {Array.from({ length: N }, (_, i) =>
        i === HILANG ? (
          <g key={i}>
            <rect
              x={x(i) - (PAKET.w * SKALA) / 2}
              y={Y_SLOT - (PAKET.h * SKALA) / 2}
              width={PAKET.w * SKALA}
              height={PAKET.h * SKALA}
              rx={26}
              fill="none"
              stroke="var(--bad)"
              strokeWidth={12}
              strokeDasharray="30 26"
            />
            <text
              x={x(i)}
              y={Y_SLOT + 42}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize={130}
              fontWeight={800}
              fill="var(--bad)"
            >
              ?
            </text>
          </g>
        ) : (
          <Paket key={i} x={x(i)} y={Y_SLOT} nomor={i + 1} skala={SKALA} warna="ok" />
        ),
      )}
    </svg>
  </KartuThumbnail>
);
