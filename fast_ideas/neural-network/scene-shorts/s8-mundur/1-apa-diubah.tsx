/* T19-S8 · scene 1 · apa-diubah — hook
   VO:        1-apa-diubah-vo.md
   Direction: 1-apa-diubah-direction.md

   Jaringannya BEKU, bukan redup. Beku berarti ada yang sedang menunggu
   diputuskan; redup berarti ia tidak penting.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, kamera } from "../panggung-nn";
import { Meter } from "../panggung-seri";
import { beat, cari } from "./timing.gen";

const ID = "apa-diubah";

const B_TANYA = beat(ID, 0); // "Tahu salahnya saja belum cukup. Apa yang harus diubah?"
const DUR = cari(ID).durasi;

export const ApaDiubah: React.FC = () => {
  const d = useDetik();

  const meter = t(d, { mulai: 0.1, durasi: 0.4, dari: 0, ke: 1 });
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
            <Jaringan opacity={0.85} />
          </g>
          <Meter y={1330} nilai={0.72} label="KESALAHAN" opacity={meter} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["APA YANG DIUBAH?"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
