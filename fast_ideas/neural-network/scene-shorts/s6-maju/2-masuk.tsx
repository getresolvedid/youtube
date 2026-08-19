/* T19-S6 · scene 2 · masuk — ketegangan
   VO:        2-masuk-vo.md
   Direction: 2-masuk-direction.md

   DUA LAPIS LAIN TETAP GELAP. Kalau seluruh jaringan menyala di sini, scene 3
   tidak punya apa pun untuk ditunjukkan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, X_SIMPUL, Y_LAPIS } from "../panggung-nn";
import { MASUKAN, Pil } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "masuk";

const B_MASUK = beat(ID, 0); // "Masukan itu memasuki lapis pertama."

const Y_ANGKA = Y_LAPIS[0] - 170;

export const Masuk: React.FC = () => {
  const d = useDetik();

  const turun = t(d, { mulai: B_MASUK + 0.1, durasi: 0.45, dari: 0, ke: 1, ease: E.power1out });

  /* Nyala lapis pertama MENYUSUL 0,1 dtk sesudah angkanya tiba — akibat, bukan
     kebetulan yang bersamaan. */
  const nyala = t(d, { mulai: B_MASUK + 0.65, durasi: 0.3, dari: 0, ke: 1 });

  const teks = masuk(d, { mulai: B_MASUK + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan nyala={(l) => (l === 0 ? nyala : 0)} />

          {X_SIMPUL.map((x, i) => (
            <g key={x} transform={`translate(0 ${(Y_LAPIS[0] - 92 - Y_ANGKA) * turun})`}>
              <Pil x={x} y={Y_ANGKA} teks={MASUKAN[i] ?? ""} lebar={150} ukuran={40} />
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["MASUK"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
