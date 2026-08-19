/* T19-S4 · scene 3 · dilengkungkan — payoff
   VO:        3-dilengkungkan-vo.md
   Direction: 3-dilengkungkan-direction.md

   SATU KEPUTUSAN: garisnya BERUBAH BENTUK, bukan diganti garis baru. Titik demi
   titik diinterpolasi dari lurus ke lengkung — itu yang membuat "mengubah
   hasilnya" terbaca sebagai perubahan, bukan sebagai pergantian.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { AKTIVASI, GRAFIK, Kurva, Sumbu, jalurKurva } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "dilengkungkan";

const B_LANGKAH = beat(ID, 0); // "Satu langkah tambahan mengubah hasilnya."
const B_BELOK = beat(ID, 1); // "Garis lurusnya jadi bisa membelok."

export const Dilengkungkan: React.FC = () => {
  const d = useDetik();

  const kotak = t(d, { mulai: B_LANGKAH + 0.15, durasi: 0.35, dari: 0, ke: 1 });
  const belok = t(d, { mulai: B_BELOK, durasi: 0.8, dari: 0, ke: 1, ease: E.sineInOut });

  /* Bentuk antara lurus dan lengkung, dihitung tiap frame — bukan dua path yang
     ditukar. */
  const d_kurva = jalurKurva(
    (u) => u * 0.8 * (1 - belok) + AKTIVASI(u) * belok,
    GRAFIK.x,
    GRAFIK.y,
    GRAFIK.lebar,
    GRAFIK.tinggi,
  );

  const teks = masuk(d, { mulai: B_BELOK + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Sumbu x={GRAFIK.x} y={GRAFIK.y} lebar={GRAFIK.lebar} tinggi={GRAFIK.tinggi} />

          {/* Kotak langkah — memotong jalur garis, bukan berdiri di sampingnya. */}
          <g opacity={kotak}>
            <rect
              x={GRAFIK.x + GRAFIK.lebar / 2 - 80}
              y={GRAFIK.y - 80}
              width={160}
              height={160}
              rx={18}
              fill="var(--bg-elev)"
              stroke="var(--warn)"
              strokeWidth={5}
            />
            <path
              d={`M ${GRAFIK.x + GRAFIK.lebar / 2 - 44} ${GRAFIK.y + 34} Q ${GRAFIK.x + GRAFIK.lebar / 2} ${GRAFIK.y - 60} ${GRAFIK.x + GRAFIK.lebar / 2 + 44} ${GRAFIK.y - 34}`}
              fill="none"
              stroke="var(--warn)"
              strokeWidth={7}
              strokeLinecap="round"
            />
          </g>

          <Kurva d={d_kurva} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DILENGKUNGKAN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
