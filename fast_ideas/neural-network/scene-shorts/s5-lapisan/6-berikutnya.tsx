/* T19-S3 · scene 6 · berikutnya — gantungan episode berikutnya
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   SATU KEPUTUSAN: getarnya SEKALI, bukan berulang. `getar()` meluruh sampai nol
   dan berhenti di tempat semula; getar berdurasi tetap yang dipotong di tengah
   ayunan meninggalkan sambungan beberapa piksel dari tempatnya — pergeseran
   yang tidak pernah kembali.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Denyut, LabelTahap, TeksLayar, W, kamera, yDenyut } from "../panggung-nn";
import { ANAK_TANGGA, JaringLapis } from "../panggung-lapis";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_NEXT = beat(ID, 0); // "Sekarang lihat isinya berjalan lewat lapisan-lapisan itu."

/** Denyut berhenti di 0,55 — di antara lapis tengah dan keluaran. Perjalanan
 *  yang sudah selesai tidak menggantung apa pun. */
const U_BERHENTI = 0.55;

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const tanggaKeluar = t(d, { mulai: 0.05, durasi: 0.25, dari: 1, ke: 0 });
  const terang = t(d, { mulai: 0.2, durasi: 0.4, dari: 0.08, ke: 0.5 });
  const nyala = t(d, { mulai: B_NEXT, durasi: 0.3, dari: 0, ke: 1 });
  const maju = t(d, { mulai: B_NEXT + 0.1, durasi: 0.9, dari: 0, ke: U_BERHENTI, ease: E.sineInOut });

  const skala = t(d, { mulai: 0.2, durasi: 0.9, dari: 1, ke: 1.25, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_NEXT + 0.5, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)}>
            <JaringLapis tengah={1} opacity={terang} />

            <Denyut y={yDenyut(maju)} opacity={nyala} />
          </g>

          <g opacity={tanggaKeluar}>
            {ANAK_TANGGA.map((a, i) => (
              <LabelTahap key={a.teks} x={a.x} y={a.y} teks={a.teks} nyala={i === 2 ? 1 : 0} />
            ))}
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "JALANNYA"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
