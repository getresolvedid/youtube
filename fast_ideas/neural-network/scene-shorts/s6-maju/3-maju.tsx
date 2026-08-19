/* T19-S6 · scene 3 · maju — payoff
   VO:        3-maju-vo.md
   Direction: 3-maju-direction.md

   SATU KEPUTUSAN: satu tween menyeberangi DUA lapis, bukan dua tween yang
   disambung. Temponya tidak boleh patah di tengah — perjalanan yang makin cepat
   terbaca sebagai "dipercepat", bukan sebagai "lapis demi lapis".
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Denyut, Jaringan, TeksLayar, W, nyalaLapis, yDenyut } from "../panggung-nn";
import { beat, cari } from "./timing.gen";

const ID = "maju";

const B_HITUNG = beat(ID, 0); // "Tiap simpul menghitung satu angka, lalu meneruskannya…"
const DUR = cari(ID).durasi;

export const Maju: React.FC = () => {
  const d = useDetik();

  const u = t(d, {
    mulai: B_HITUNG + 0.2,
    durasi: Math.max(1.2, DUR - B_HITUNG - 0.8),
    dari: 0,
    ke: 1,
    ease: E.sineInOut,
  });
  const y = yDenyut(u);
  const teks = masuk(d, { mulai: B_HITUNG + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan nyala={nyalaLapis(y)} />
          <Denyut y={y} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["MAJU"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
