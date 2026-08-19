/* T19-S2 · scene 5 · mesin-kecil — tutup, dan tempat namanya jatuh
   VO:        5-mesin-kecil-vo.md
   Direction: 5-mesin-kecil-direction.md

   Rantai tiga kata, diambil apa adanya dari peta: INPUTS → CALCULATION →
   OUTPUT. Ditumpuk dua baris karena tiga label berjajar butuh ±800 px dan
   kotak amannya 830 — sama seperti rantai empat kata di Short 1.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { LabelTahap, W } from "../panggung-nn";
import { SimpulBesar } from "../panggung-neuron";
import { beat } from "./timing.gen";

const ID = "mesin-kecil";

const B_MESIN = beat(ID, 0); // "Jadi satu neuron pada dasarnya mesin hitung kecil."

const RANTAI = [
  { teks: "MASUK", x: 300, y: 860 },
  { teks: "HITUNG", x: 720, y: 860 },
  { teks: "KELUAR", x: 510, y: 1010 },
] as const;

export const MesinKecil: React.FC = () => {
  const d = useDetik();

  const bersih = t(d, { mulai: 0.05, durasi: 0.35, dari: 1, ke: 0.12 });
  const kata = (i: number): number =>
    t(d, { mulai: B_MESIN + 0.1 + i * 0.2, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SimpulBesar opacity={bersih} skala={0.9} />

          {RANTAI.map((r, i) => (
            <g key={r.teks} opacity={kata(i)}>
              <LabelTahap x={r.x} y={r.y} teks={r.teks} nyala={i === 2 ? 1 : 0} />
            </g>
          ))}
        </svg>
      </div>
    </Scene>
  );
};
