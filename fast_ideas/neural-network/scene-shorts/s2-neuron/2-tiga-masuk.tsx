/* T19-S2 · scene 2 · tiga-masuk — ketegangan
   VO:        2-tiga-masuk-vo.md
   Direction: 2-tiga-masuk-direction.md

   DUA KEPUTUSAN:

   1. Ketiga angka turun BERSAMAAN dan sama cepat. Beda cepat di sini terbaca
      sebagai "yang satu lebih penting" — padahal itu isi scene 3.

   2. Ketebalan berubah SETELAH angkanya turun. Ketebalan yang sudah berbeda
      sejak awal terbaca sebagai hiasan, bukan sebagai peristiwa.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import {
  AngkaJalan,
  MASUK,
  SambunganMasuk,
  SimpulBesar,
  TEBAL,
} from "../panggung-neuron";
import { beat } from "./timing.gen";

const ID = "tiga-masuk";

const B_TIGA = beat(ID, 0); // "Tiga angka masuk lewat tiga sambungan."
const B_TIDAK_SAMA = beat(ID, 1); // "Ketiganya tidak diperlakukan sama."

export const TigaMasuk: React.FC = () => {
  const d = useDetik();

  const sambungan = t(d, { mulai: 0.05, durasi: 0.35, dari: 0, ke: 1 });
  const maju = t(d, { mulai: B_TIGA + 0.2, durasi: 0.9, dari: 0, ke: 0.55, ease: E.power1out });

  /* Dari seragam ke berbeda-beda. Sebelum `beda`, ketiganya setebal 0,5 —
     bukan setebal aslinya. */
  const beda = t(d, { mulai: B_TIDAK_SAMA, durasi: 0.5, dari: 0, ke: 1, ease: E.sineInOut });
  const tebal = (i: number): number => 0.5 + ((TEBAL[i] ?? 1) - 0.5) * beda;

  const teks = masuk(d, { mulai: B_TIDAK_SAMA + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SambunganMasuk tebal={tebal} opacity={sambungan} />
          <SimpulBesar />

          {MASUK.map((nilai, i) => (
            <AngkaJalan
              key={nilai + i}
              i={i}
              maju={maju}
              nilai={nilai}
              opacity={t(d, { mulai: B_TIGA + 0.1, durasi: 0.3, dari: 0, ke: 1 })}
            />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["TIDAK SAMA"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
