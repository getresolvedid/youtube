/* Kover Short 3 · 9:16 · 2160x3840
   Brief: ../thumbnail.md § Kover Short

     npx remotion still T17-thumb-s3 ideas/enkripsi/render/thumb-s3.png
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { KotakProses, SANDI } from "../panggung-kiriman";

const W = 1860;
const H = 2100;

const KOTAK = { x: W / 2, y: 1050, w: 1560, h: 700 } as const;

export const ThumbS3: React.FC = () => (
  <KartuThumbnail baris={["DIKUNCI,", "LALU LEWAT"]} rasio="9x16">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {/* Kotaknya TERBUKA, isinya sudah berubah — yang dijanjikan kartu ini
          hasilnya, bukan mesinnya. Kotak yang tertutup rapat tidak menunjukkan
          apa pun yang bisa dibaca dalam seperempat detik. */}
      <KotakProses {...KOTAK} label="ENKRIPSI" tutup={0}>
        <text
          x={KOTAK.x}
          y={KOTAK.y}
          fontSize={190}
          fontFamily="var(--font-mono)"
          fontWeight={700}
          fill="var(--accent-ink)"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing={8}
        >
          {SANDI}
        </text>
      </KotakProses>
    </svg>
  </KartuThumbnail>
);
