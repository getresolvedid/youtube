/* T19-S13 · scene 1 · urutan — hook
   VO:        1-urutan-vo.md
   Direction: 1-urutan-direction.md

   Kalimatnya `KALIMAT` di panggung-seri — SAMA untuk Episode 13, 14, dan 15.
   Tiga episode yang memakai kalimat berbeda terbaca sebagai tiga contoh, bukan
   sebagai satu benda yang dilihat dari tiga sudut.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KALIMAT, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "urutan";

const B_TANYA = beat(ID, 0); // "Kenapa urutan penting buat AI?"

export const Urutan: React.FC = () => {
  const d = useDetik();

  const kata = (i: number): number =>
    t(d, { mulai: 0.05 + i * 0.06, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.4, durasi: 0.4, geser: 18 });

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
            <TeksLayar baris={["URUTAN"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
