/* T19-S6 · scene 1 · apa-terjadi — hook
   VO:        1-apa-terjadi-vo.md
   Direction: 1-apa-terjadi-direction.md

   Jaringannya menyala SEKEJAP lalu redup lagi. Nyala yang bertahan sudah
   menjawab pertanyaannya; yang dibutuhkan hook cuma janji bahwa sesuatu akan
   berjalan di dalamnya.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, X_SIMPUL, Y_LAPIS, kamera } from "../panggung-nn";
import { MASUKAN, Pil } from "../panggung-seri";
import { beat, cari } from "./timing.gen";

const ID = "apa-terjadi";

const B_TANYA = beat(ID, 0); // "Apa yang terjadi saat AI diberi satu masukan?"
const DUR = cari(ID).durasi;

const Y_ANGKA = Y_LAPIS[0] - 170;

export const ApaTerjadi: React.FC = () => {
  const d = useDetik();

  const angka = t(d, { mulai: 0.1, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });
  const kilat = tPP(d, { mulai: B_TANYA + 0.35, durasi: 0.8, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_TANYA + 0.5, durasi: 0.4, geser: 18 });
  const skala = t(d, { mulai: 0, durasi: DUR, dari: 1, ke: 1.03, ease: E.linear });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)}>
            <Jaringan nyala={() => kilat} />
          </g>

          {X_SIMPUL.map((x, i) => (
            <g key={x} opacity={angka}>
              <Pil x={x} y={Y_ANGKA} teks={MASUKAN[i] ?? ""} lebar={150} ukuran={40} />
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["APA YANG TERJADI?"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
