/* T19-S4 · scene 6 · berikutnya — gantungan ke Episode 05
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   Jaringan yang muncul komponen yang SAMA dengan Episode 01, 02, dan 05.
   Gantungan yang memperlihatkan jaringan berbeda membuat episode berikutnya
   terasa berganti dunia.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, kamera } from "../panggung-nn";
import { AKTIVASI, Kurva, jalurKurva } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_LAPIS = beat(ID, 0); // "Lalu kenapa simpulnya ditumpuk jadi lapisan?"

const KANAN = jalurKurva(AKTIVASI, 620, 880, 280, 240);

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const keluar = t(d, { mulai: 0.05, durasi: 0.3, dari: 1, ke: 0 });
  const jaring = t(d, { mulai: B_LAPIS, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });
  const skala = t(d, { mulai: B_LAPIS, durasi: 0.9, dari: 0.75, ke: 1, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_LAPIS + 0.5, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Kurva d={KANAN} opacity={keluar} />

          <g transform={kamera(skala)}>
            <Jaringan opacity={jaring} />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "LAPISAN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
