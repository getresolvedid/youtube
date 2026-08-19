/* T19-S3 · scene 3 · bias-geser — payoff
   VO:        3-bias-geser-vo.md
   Direction: 3-bias-geser-direction.md

   SATU KEPUTUSAN YANG MENGIKAT: yang bergerak PENANDANYA, bukan garisnya. Garis
   bilangan yang ikut bergeser menghilangkan patokan — dan tanpa patokan, kata
   "bergeser" tidak berarti apa-apa.

   Posisi penanda adalah FUNGSI dari angka kapsulnya, bukan tween terpisah:
   dua tween yang kebetulan seiring akan berpisah begitu salah satunya disetel.
*/
import type React from "react";

import { gambarGaris, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { SambunganMasuk, SimpulBesar, TEBAL, angka } from "../panggung-neuron";
import { Pil } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "bias-geser";

const B_ADA = beat(ID, 0); // "Ada satu angka lagi yang menggeser titik awal simpulnya."
const B_UBAH = beat(ID, 1); // "Ubah angkanya, seluruh hasilnya ikut bergeser."

const X1 = 180;
const X2 = 900;
const Y_GARIS = 1290;

export const BiasGeser: React.FC = () => {
  const d = useDetik();

  const garis = gambarGaris(d, X2 - X1, { mulai: B_ADA + 0.15, durasi: 0.4 });
  const kapsul = t(d, { mulai: B_ADA + 0.5, durasi: 0.35, dari: 0, ke: 1 });

  /* Satu angka mengatur dua benda: isi kapsul DAN posisi penanda. */
  const nilai = tPP(d, { mulai: B_UBAH, durasi: 1.5, dari: 0, ke: 0.9 });
  const xPenanda = (X1 + X2) / 2 + ((X2 - X1) / 2) * (nilai / 1.2);

  const teks = masuk(d, { mulai: B_UBAH + 0.1, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SambunganMasuk tebal={(i) => TEBAL[i] ?? 1} opacity={0.5} skala={0.8} />
          <SimpulBesar skala={0.8} />

          <line
            x1={X1}
            y1={Y_GARIS}
            x2={X2}
            y2={Y_GARIS}
            stroke="var(--ink-2)"
            strokeWidth={6}
            strokeLinecap="round"
            {...garis}
          />

          {/* Penanda hasil — segitiga yang berdiri di garisnya. */}
          <g opacity={kapsul}>
            <path
              d={`M ${xPenanda - 20} ${Y_GARIS - 40} L ${xPenanda + 20} ${Y_GARIS - 40} L ${xPenanda} ${Y_GARIS - 6} Z`}
              fill="var(--accent-ink)"
            />
          </g>

          <g opacity={kapsul}>
            <Pil
              x={W / 2}
              y={1180}
              teks={`+ ${angka(nilai)}`}
              warna="ingat"
              lebar={280}
              ukuran={42}
            />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["PENGGESER"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
