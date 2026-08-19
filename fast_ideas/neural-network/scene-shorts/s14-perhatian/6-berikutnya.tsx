/* T19-S14 · scene 6 · berikutnya — gantungan ke Episode 15
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   Yang digantung benda di layar — jendela percakapan — bukan episodenya
   (HARD RULE 7).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { BlokTransformer, JendelaObrolan } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_BAGIAN = beat(ID, 0); // "Dan itu sebagian besar dari cara AI bahasa sekarang bekerja."

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const susut = t(d, { mulai: 0.1, durasi: 0.6, dari: 1, ke: 0.6, ease: E.sineInOut });
  const jendela = t(d, { mulai: B_BAGIAN + 0.2, durasi: 0.45, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_BAGIAN + 0.45, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={`translate(${W / 2} 900) scale(${susut}) translate(${-W / 2} -900)`}>
            <BlokTransformer y={900} tampil={1} />
          </g>

          <JendelaObrolan y={1180} tampil={jendela} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "CHATGPT"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
