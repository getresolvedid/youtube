/* T19-S14 · scene 1 · kata-mana — hook
   VO:        1-kata-mana-vo.md
   Direction: 1-kata-mana-direction.md

   TANPA GARIS PENGHUBUNG di frame nol. Garis yang sudah ada sudah menjawab
   pertanyaannya sebelum ditanya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KALIMAT, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "kata-mana";

const B_TANYA = beat(ID, 0); // "Bagaimana AI tahu kata mana yang penting buat kata lain?"

export const KataMana: React.FC = () => {
  const d = useDetik();

  const kata = (i: number): number =>
    t(d, { mulai: 0.05 + i * 0.06, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.5, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {KALIMAT.map((k, i) => (
            <g key={k} opacity={kata(i)}>
              <Potongan x={X_KATA[i] ?? 180} y={Y_KATA} teks={k} />
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["KATA MANA", "YANG PENTING?"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
