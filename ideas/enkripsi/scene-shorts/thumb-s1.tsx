/* Kover Short 1 · 9:16 · 2160x3840
   Brief: ../thumbnail.md § Kover Short

   DI LUAR folder scene-nya — `npm run sisa` memeriksa tiap `.tsx` di dalam
   folder scene terhadap daftar kunci dari naskah, jadi berkas kover yang
   tinggal di sana dilaporkan sebagai nama yang tidak dikenal (CLAUDE.md
   HARD RULE 1).

   Keempat kover sengaja SEJENIS satu sama lain: empat Short serial yang muncul
   berurutan di feed harus terbaca sebagai satu keluarga, kalau tidak penonton
   yang sudah menonton S1 memperlakukan S2 sebagai video acak.

     npx remotion still T17-thumb-s1 ideas/enkripsi/render/thumb-s1.png
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { Paket } from "../panggung-kiriman";

/* Pita figur kartu 9:16: 1860 x 2100 (shared/Thumbnail.tsx). */
const W = 1860;
const H = 2100;

const X = W / 2;
const SIMPUL = [180, 560, 940, 1320, 1700, 2000] as const;

export const ThumbS1: React.FC = () => (
  <KartuThumbnail baris={["JALAN DULU,", "BARU SAMPAI"]} rasio="9x16">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      <line
        x1={X}
        y1={SIMPUL[0]}
        x2={X}
        y2={SIMPUL[SIMPUL.length - 1]}
        stroke="var(--line)"
        strokeWidth={14}
        strokeDasharray="40 48"
        strokeLinecap="round"
      />
      {SIMPUL.map((y) => (
        <circle key={y} cx={X} cy={y} r={30} fill="var(--ink-2)" />
      ))}

      {/* Paketnya di TENGAH jalur, bukan di ujung: yang dijanjikan kartu ini
          adalah perjalanannya, dan perjalanan yang sudah sampai bukan lagi
          perjalanan. */}
      <circle cx={X} cy={940} r={78} fill="var(--accent-ink)" opacity={0.25} />
      <Paket x={X} y={940} skala={2.6} />
    </svg>
  </KartuThumbnail>
);
