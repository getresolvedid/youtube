/* T19-S3 · scene 1 · kenapa-bobot — hook
   VO:        1-kenapa-bobot-vo.md
   Direction: 1-kenapa-bobot-direction.md

   SATU KEPUTUSAN: ketebalannya sudah berbeda sejak frame nol, tidak
   dianimasikan berubah. Yang ditanyakan hook ini "kenapa begitu", bukan "apa
   yang terjadi" — dan pertanyaan itu hanya berdiri kalau keadaannya sudah ada.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W, kamera } from "../panggung-nn";
import { SambunganMasuk, SimpulBesar, TEBAL } from "../panggung-neuron";
import { beat, cari } from "./timing.gen";

const ID = "kenapa-bobot";

const B_TANYA = beat(ID, 0); // "Kenapa sambungan di dalam AI tidak sama kuat?"
const DUR = cari(ID).durasi;

export const KenapaBobot: React.FC = () => {
  const d = useDetik();

  const tampil = t(d, { mulai: 0.05, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });
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
            <SambunganMasuk tebal={(i) => TEBAL[i] ?? 1} opacity={tampil} />
            <SimpulBesar opacity={tampil} />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["KENAPA BEDA-BEDA?"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
