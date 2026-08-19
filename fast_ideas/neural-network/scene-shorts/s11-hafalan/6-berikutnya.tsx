/* T19-S11 · scene 6 · berikutnya — gantungan ke Episode 12
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   Yang digantung benda di layar — kisi gambar yang baru muncul — bukan
   episodenya (HARD RULE 7).
*/
import type React from "react";

import { masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KOTAK, Sebaran } from "../panggung-lapis";
import { Kisi } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_GAMBAR = beat(ID, 0); // "Sekarang, bagaimana kalau yang masuk itu sebuah gambar?"

const N = 8;
const SEL = 62;
const X0 = (KOTAK.x1 + KOTAK.x2) / 2 - (N * SEL) / 2;
const Y0 = 920;

/** Bentuk isi kisi — DITULIS sebagai fungsi, bukan diacak: `Math.random()`
 *  menghasilkan gambar berbeda tiap frame saat render paralel. */
const isi = (i: number, j: number): number => {
  const dx = i - 3.5;
  const dy = j - 3.5;
  return Math.max(0, 1 - Math.hypot(dx, dy) / 4);
};

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const pergi = t(d, { mulai: 0.05, durasi: 0.35, dari: 1, ke: 0 });
  const sel = t(d, { mulai: B_GAMBAR, durasi: 0.5, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_GAMBAR + 0.45, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={pergi}>
            <Sebaran />
          </g>

          <Kisi x={X0} y={Y0} n={N} sel={SEL} isi={isi} opacity={sel} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "GAMBAR"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
