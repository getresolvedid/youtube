/* T19-S4 · scene 2 · terlalu-sederhana — ketegangan
   VO:        2-terlalu-sederhana-vo.md
   Direction: 2-terlalu-sederhana-direction.md

   SATU KEPUTUSAN: ketiga garis MELEBUR, tidak memudar. Kalau dua di antaranya
   cuma menghilang, penonton membacanya sebagai dua yang dihapus — bukan sebagai
   tiga yang ternyata sama saja dengan satu.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { D_LURUS, GRAFIK, Kurva, Sumbu } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "terlalu-sederhana";

const B_TUMPUK = beat(ID, 0); // "Karena penjumlahan yang ditumpuk tetap berlaku…"

/** Jarak tegak ketiga garis sebelum melebur. */
const PISAH = 90;

export const TerlaluSederhana: React.FC = () => {
  const d = useDetik();

  const pisah = t(d, { mulai: 0.1, durasi: 0.45, dari: 0, ke: 1, ease: E.expoOut });
  const lebur = t(d, { mulai: B_TUMPUK + 0.7, durasi: 0.8, dari: 1, ke: 0, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_TUMPUK + 1.1, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Sumbu x={GRAFIK.x} y={GRAFIK.y} lebar={GRAFIK.lebar} tinggi={GRAFIK.tinggi} />

          {[-1, 0, 1].map((k) => (
            <g key={k} transform={`translate(0 ${k * PISAH * pisah * lebur})`}>
              <Kurva
                d={D_LURUS}
                opacity={k === 0 ? 1 : 0.75}
                tebal={k === 0 ? 8 : 6}
              />
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["TETAP SATU GARIS"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
