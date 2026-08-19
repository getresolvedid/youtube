/* T19-S7 · scene 2 · dibandingkan — ketegangan
   VO:        2-dibandingkan-vo.md
   Direction: 2-dibandingkan-direction.md

   Batang jaraknya bentuk yang sama dengan batang meleset di Episode 01 —
   `Perbandingan` di panggung-seri, komponen yang sama.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { Perbandingan } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "dibandingkan";

const B_BANDING = beat(ID, 0); // "Tebakannya dibandingkan dengan jawaban yang benar."
const B_ANGKA = beat(ID, 1); // "Nol koma dua, padahal seharusnya satu."

export const Dibandingkan: React.FC = () => {
  const d = useDetik();

  const batang = t(d, { mulai: B_ANGKA, durasi: 0.35, dari: 0, ke: 1, ease: E.power2out });
  const teks = masuk(d, { mulai: B_BANDING + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Perbandingan
            yAtas={820}
            yBawah={1100}
            atas="0,2"
            bawah="1,0"
            labelAtas="TEBAKAN"
            labelBawah="SEHARUSNYA"
            selisih={batang}
          />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DIBANDINGKAN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
