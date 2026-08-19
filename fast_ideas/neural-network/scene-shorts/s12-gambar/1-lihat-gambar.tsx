/* T19-S12 · scene 1 · lihat-gambar — hook
   VO:        1-lihat-gambar-vo.md
   Direction: 1-lihat-gambar-direction.md

   GAMBARNYA KISI SEJAK FRAME NOL, bukan foto yang berubah jadi kisi: yang
   ditanyakan bagaimana ia dibaca, bukan bagaimana ia disimpan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { GAMBAR, Kisi, N_KISI } from "../panggung-seri";
import { beat } from "./timing.gen";

/** Kisi gambar utama — koordinatnya sama di keempat scene pertama. */
const SEL = 74;
const X0 = W / 2 - (N_KISI * SEL) / 2;
const Y0 = 620;

const ID = "lihat-gambar";

const B_TANYA = beat(ID, 0); // "Bagaimana jaringan bisa memahami sebuah gambar?"

export const LihatGambar: React.FC = () => {
  const d = useDetik();

  const sel = t(d, { mulai: 0.05, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.5, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Kisi x={X0} y={Y0} n={N_KISI} sel={SEL} isi={GAMBAR} opacity={sel} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BAGAIMANA", "AI MELIHAT?"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
