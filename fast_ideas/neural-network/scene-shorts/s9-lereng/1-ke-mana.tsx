/* T19-S9 · scene 1 · ke-mana — hook
   VO:        1-ke-mana-vo.md
   Direction: 1-ke-mana-direction.md

   DIBANGUN ULANG 2026-08-19. Versi lama membuka dengan satu sambungan jaringan
   dan dua panah; peta menaruh "ball on a loss landscape" di HOOK, bukan di
   setup — yang dijelaskan setup adalah lerengnya, bukan bolanya.

   Kedua arah SAMA TERANG. Begitu salah satu lebih terang, scene 3 kehilangan
   seluruh alasannya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { Bola, LANGKAH, Lereng, xLereng, yLereng } from "../panggung-lereng";
import { beat } from "./timing.gen";

const ID = "ke-mana";

const B_TANYA = beat(ID, 0); // "Bagaimana AI tahu ke arah mana harus membaik?"

const U = LANGKAH[0] ?? 0.86;

export const KeMana: React.FC = () => {
  const d = useDetik();

  /* Lerengnya sudah ada di frame nol — tidak digambar di sini. Yang digambar
     scene 2 adalah ARTINYA (sumbu meleset), bukan bentuknya. */
  const panah = t(d, { mulai: 0.35, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.35, durasi: 0.4, geser: 18 });

  const x = xLereng(U);
  const y = yLereng(U) - 26;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Lereng opacity={0.75} />
          <Bola u={U} />

          {/* Dua arah, opasitas IDENTIK — keduanya `panah`, bukan dua nilai yang
              kebetulan sama. */}
          {[-1, 1].map((arah) => (
            <g key={arah} opacity={panah}>
              <line
                x1={x + arah * 60}
                y1={y - 90}
                x2={x + arah * 150}
                y2={y - 90}
                stroke="var(--ink-0)"
                strokeWidth={7}
                strokeLinecap="round"
              />
              <path
                d={`M ${x + arah * 142} ${y - 106} L ${x + arah * 178} ${y - 90} L ${x + arah * 142} ${y - 74} Z`}
                fill="var(--ink-0)"
              />
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["KE ARAH MANA?"]} ukuran={58} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
