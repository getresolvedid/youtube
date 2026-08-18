/* Kover Short 4 · 9:16 · 2160x3840
   Brief: ../thumbnail.md § Kover Short

     npx remotion still T17-thumb-s4 ideas/enkripsi/render/thumb-s4.png
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { Gembok, Kunci } from "../panggung-kiriman";

const W = 1860;
const H = 2100;

export const ThumbS4: React.FC = () => (
  <KartuThumbnail baris={["ADA KUNCI,", "BISA BACA"]} rasio="9x16">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {/* Gembok TERBUKA + kunci di sebelahnya. Ini satu-satunya kover yang
          memakai `--ok`, dan itu sengaja: hijau cuma dipakai untuk yang
          membuka, di seluruh seri. */}
      <g
        transform={`translate(${W / 2 - 220} 1050) scale(7) translate(${
          -(W / 2 - 220)
        } -1050)`}
      >
        <Gembok x={W / 2 - 220} y={1050} terbuka={1} />
      </g>

      <g
        transform={`translate(${W / 2 + 420} 1080) scale(7.5) translate(${
          -(W / 2 + 420)
        } -1080)`}
      >
        <Kunci x={W / 2 + 420} y={1080} />
      </g>
    </svg>
  </KartuThumbnail>
);
