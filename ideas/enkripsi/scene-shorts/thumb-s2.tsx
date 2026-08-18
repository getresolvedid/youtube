/* Kover Short 2 · 9:16 · 2160x3840
   Brief: ../thumbnail.md § Kover Short

     npx remotion still T17-thumb-s2 ideas/enkripsi/render/thumb-s2.png
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { Monitor, PESAN, Sosok } from "../panggung-kiriman";

const W = 1860;
const H = 2100;

const MON = { x: 230, y: 620, w: 1400, h: 880 } as const;

export const ThumbS2: React.FC = () => (
  <KartuThumbnail baris={["ADA YANG", "IKUT BACA"]} rasio="9x16">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {/* Sosoknya di belakang layarnya, redup — yang dijanjikan kartu ini bukan
          orangnya, melainkan apa yang terbaca di layarnya. */}
      <g opacity={0.35}>
        <Sosok x={W / 2} y={2100} skala={1.5} />
      </g>

      <Monitor {...MON} nyala={0.85}>
        <text
          x={MON.x + MON.w / 2}
          y={MON.y + MON.h / 2}
          fontSize={150}
          fontFamily="var(--font-body)"
          fontWeight={700}
          fill="var(--ink-0)"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {PESAN}
        </text>
      </Monitor>
    </svg>
  </KartuThumbnail>
);
