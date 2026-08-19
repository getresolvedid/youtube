/* T19-S13 · scene 6 · berikutnya — gantungan ke Episode 14
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   TEBALNYA MASIH SERAGAM di sini. Perbedaan tebal itu isi Episode 14; kalau
   sudah berbeda di gantungan, episode berikutnya kehilangan payoff-nya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { GarisPerhatian, KALIMAT, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_BARU = beat(ID, 0); // "Lalu ada cara baru yang mengubah semuanya."

/** Pasangan yang dihubungkan — sama untuk semua, tebalnya seragam. */
const PASANG = [
  [0, 2],
  [1, 3],
  [0, 3],
] as const;

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const garis = (i: number): number =>
    t(d, { mulai: B_BARU + 0.15 + i * 0.12, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_BARU + 0.45, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {PASANG.map(([a, b], i) => (
            <GarisPerhatian
              key={`${a}-${b}`}
              x1={X_KATA[a] ?? 180}
              y1={Y_KATA - 40}
              x2={X_KATA[b] ?? 620}
              y2={Y_KATA - 40}
              kuat={0.35}
              opacity={garis(i)}
            />
          ))}

          {KALIMAT.map((k, i) => (
            <Potongan key={k} x={X_KATA[i] ?? 180} y={Y_KATA} teks={k} />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "PERHATIAN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
