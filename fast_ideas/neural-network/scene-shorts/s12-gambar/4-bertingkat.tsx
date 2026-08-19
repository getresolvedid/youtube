/* T19-S12 · scene 4 · bertingkat — payoff kedua
   VO:        4-bertingkat-vo.md
   Direction: 4-bertingkat-direction.md

   KUCINGNYA KOMPONEN YANG SAMA dengan Episode 01 dan 05. Ia benda yang sama,
   dikenali lewat jalan yang berbeda — dan itu yang membuat seri ini terasa satu
   dunia.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kucing, TeksLayar, W } from "../panggung-nn";
import { Kisi, NAMA_PENYARING, N_KISI, PENYARING } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "bertingkat";

const B_GABUNG = beat(ID, 0); // "Lapis yang lebih dalam menggabungkannya jadi bentuk dan bagian."

const SEL_KECIL = 30;
const Y_HASIL = 1000;
const X_HASIL = [150, 420, 690];
const KUMPUL = { x: W / 2 - (N_KISI * SEL_KECIL) / 2, y: 940 };

export const Bertingkat: React.FC = () => {
  const d = useDetik();

  const kumpul = t(d, { mulai: B_GABUNG + 0.15, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out });
  const kucing = t(d, { mulai: B_GABUNG + 0.9, durasi: 0.45, dari: 0, ke: 1, ease: E.backOut(1.1) });
  const teks = masuk(d, { mulai: B_GABUNG + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {PENYARING.map((f, i) => {
            const x0 = X_HASIL[i] ?? 150;
            return (
              <g key={NAMA_PENYARING[i]} opacity={(1 - kucing) * 0.9}>
                <Kisi
                  x={x0 + (KUMPUL.x - x0) * kumpul}
                  y={Y_HASIL + (KUMPUL.y - Y_HASIL) * kumpul}
                  n={N_KISI}
                  sel={SEL_KECIL * (1 - 0.25 * kumpul)}
                  isi={f}
                  warna="var(--accent-ink)"
                />
              </g>
            );
          })}

          <g opacity={kucing}>
            <Kucing y={1010} skala={1.2 * kucing} />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["JADI BENTUK"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
