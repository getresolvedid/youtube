/* T19-S7 · scene 1 · seberapa-salah — hook
   VO:        1-seberapa-salah-vo.md
   Direction: 1-seberapa-salah-direction.md

   KEDUA KARTU MUNCUL BERSAMAAN. Kalau yang benar menyusul, penonton membacanya
   sebagai koreksi — padahal yang ditanyakan cara mengukurnya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W, kamera } from "../panggung-nn";
import { Perbandingan } from "../panggung-seri";
import { beat, cari } from "./timing.gen";

const ID = "seberapa-salah";

const B_TANYA = beat(ID, 0); // "AI sudah menebak. Tapi dari mana dia tahu tebakannya salah?"
const DUR = cari(ID).durasi;

export const SeberapaSalah: React.FC = () => {
  const d = useDetik();

  const kartu = t(d, { mulai: 0.1, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.6, durasi: 0.4, geser: 18 });
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
            <Perbandingan
              yAtas={820}
              yBawah={1100}
              atas="0,2"
              bawah="1,0"
              labelAtas="TEBAKAN"
              labelBawah="SEHARUSNYA"
              opacity={kartu}
            />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["SEBERAPA SALAH?"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
