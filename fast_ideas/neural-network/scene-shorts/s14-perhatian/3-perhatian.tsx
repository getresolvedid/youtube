/* T19-S14 · scene 3 · perhatian — payoff
   VO:        3-perhatian-vo.md
   Direction: 3-perhatian-direction.md

   TEBAL DAN TERANG keduanya dari SATU angka — `PERHATIAN[dari][ke]` di
   panggung-seri. Dua nilai terpisah akan berpisah begitu salah satunya disetel.

   Angkanya DITULIS dan masuk akal untuk kalimatnya: "GORENG" paling
   memperhatikan "NASI". Perhatian yang acak terbaca sebagai hiasan — dan
   episode ini seluruhnya berdiri di atas klaim bahwa angkanya berarti.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { GarisPerhatian, KALIMAT, PERHATIAN, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "perhatian";

const B_TIAP = beat(ID, 0); // "Tiap potongan memberi perhatian berbeda-beda ke potongan lain."

/** Potongan yang disorot di scene ini: "GORENG". */
const DARI = 3;

export const Perhatian: React.FC = () => {
  const d = useDetik();

  const beda = t(d, { mulai: B_TIAP + 0.2, durasi: 0.7, dari: 0, ke: 1, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_TIAP + 0.3, durasi: 0.4, geser: 18 });

  const baris = PERHATIAN[DARI] ?? [];

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {KALIMAT.map((_, ke) => {
            if (ke === DARI) return null;
            const kuat = 0.25 + ((baris[ke] ?? 0.2) - 0.25) * beda;
            return (
              <GarisPerhatian
                key={ke}
                x1={X_KATA[DARI] ?? 840}
                y1={Y_KATA - 40}
                x2={X_KATA[ke] ?? 180}
                y2={Y_KATA - 40}
                kuat={Math.max(0.05, kuat)}
              />
            );
          })}

          {KALIMAT.map((k, i) => (
            <Potongan key={k} x={X_KATA[i] ?? 180} y={Y_KATA} teks={k} nyala={i === DARI ? 1 : 0} />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["PERHATIAN"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
