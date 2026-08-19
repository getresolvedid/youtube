/* T19-S14 · scene 4 · konteks — payoff kedua
   VO:        4-konteks-vo.md
   Direction: 4-konteks-direction.md

   POLANYA BERUBAH, BUKAN BERTAMBAH. Garis yang menumpuk membuatnya terbaca
   sebagai satu jaring, bukan sebagai pilihan tiap kata.
*/
import type React from "react";

import { masuk, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { GarisPerhatian, KALIMAT, PERHATIAN, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "konteks";

const B_KONTEKS = beat(ID, 0); // "Dari situ konteks dari seluruh kalimat ikut terpakai."

/** Sorotan berpindah: GORENG → MAKAN → NASI. */
const URUT = [3, 1, 2] as const;
const PER_KATA = 0.7;

export const Konteks: React.FC = () => {
  const d = useDetik();

  const n = Math.min(
    URUT.length - 1,
    Math.max(0, Math.floor((d - B_KONTEKS) / PER_KATA)),
  );
  const dari = URUT[n] ?? 3;
  const baris = PERHATIAN[dari] ?? [];
  const teks = masuk(d, { mulai: B_KONTEKS + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {KALIMAT.map((_, ke) => {
            if (ke === dari) return null;
            return (
              <GarisPerhatian
                key={ke}
                x1={X_KATA[dari] ?? 840}
                y1={Y_KATA - 40}
                x2={X_KATA[ke] ?? 180}
                y2={Y_KATA - 40}
                kuat={Math.max(0.05, baris[ke] ?? 0.15)}
              />
            );
          })}

          {KALIMAT.map((k, i) => (
            <Potongan key={k} x={X_KATA[i] ?? 180} y={Y_KATA} teks={k} nyala={i === dari ? 1 : 0} />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["TIAP KATA", "PUNYA POLANYA"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
