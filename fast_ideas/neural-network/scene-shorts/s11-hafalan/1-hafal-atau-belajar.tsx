/* T19-S11 · scene 1 · hafal-atau-belajar — hook
   VO:        1-hafal-atau-belajar-vo.md
   Direction: 1-hafal-atau-belajar-direction.md

   SEMUA BENAR DI FRAME NOL, dan itu umpannya: penonton harus percaya dulu bahwa
   modelnya bagus, baru scene 3 boleh mematahkannya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { Sebaran } from "../panggung-lapis";
import { beat } from "./timing.gen";

const ID = "hafal-atau-belajar";

const B_TANYA = beat(ID, 0); // "Bisa nggak AI kelihatan pintar cuma karena hafal contohnya?"

export const HafalAtauBelajar: React.FC = () => {
  const d = useDetik();

  const centang = (i: number): number =>
    t(d, { mulai: 0.1 + i * 0.03, durasi: 0.25, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.5, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Sebaran tampil={centang} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["HAFAL ATAU", "BELAJAR?"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
