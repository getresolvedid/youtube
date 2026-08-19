/* T19-S8 · scene 3 · andil — payoff
   VO:        3-andil-vo.md
   Direction: 3-andil-direction.md

   TERANGNYA BERBEDA-BEDA, bukan seragam. Kalau semua sama terang, yang terbaca
   "semuanya salah" — padahal isi scene ini justru bahwa andilnya tidak sama.
   Nilainya `ANDIL` di panggung-seri: DITULIS, bukan diacak.
*/
import type React from "react";

import { masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, SAMBUNGAN, TeksLayar, W } from "../panggung-nn";
import { ANDIL, Meter } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "andil";

const B_ANDIL = beat(ID, 0); // "Di tiap sambungan ketahuan seberapa besar andilnya…"
export const Andil: React.FC = () => {
  const d = useDetik();

  /* Sambungan menyala berurutan dari keluaran ke masukan — mengikuti arah
     denyut mundur scene 2. */
  const nyala = (i: number): number => {
    const urut = SAMBUNGAN.length - 1 - i;
    return t(d, {
      mulai: B_ANDIL + 0.2 + urut * 0.06,
      durasi: 0.3,
      dari: 0,
      ke: ANDIL[i] ?? 0.3,
    });
  };

  const teks = masuk(d, { mulai: B_ANDIL + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan opacity={0.6} />

          {SAMBUNGAN.map((s, i) => (
            <line
              key={`${s.x1}-${s.y1}-${s.x2}-${s.y2}`}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="var(--bad)"
              strokeWidth={4 + 9 * (ANDIL[i] ?? 0.3)}
              strokeLinecap="round"
              opacity={nyala(i)}
            />
          ))}

          <Meter y={1330} nilai={0.72} label="KESALAHAN" opacity={0.5} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["ANDILNYA", "BEDA-BEDA"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
