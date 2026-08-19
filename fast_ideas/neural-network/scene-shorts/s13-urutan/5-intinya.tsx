/* T19-S13 · scene 5 · intinya — tutup
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   YANG MENYALA POTONGAN AWAL, bukan yang terakhir. Kalau yang terakhir yang
   menyala, yang terbaca "yang penting yang baru" — kebalikan dari isi
   episodenya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KALIMAT, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_DULU = beat(ID, 0); // "Untuk urutan, apa yang datang lebih dulu bisa menentukan."

const TERAKHIR = KALIMAT.length - 1;

export const Intinya: React.FC = () => {
  const d = useDetik();

  const proses = t(d, { mulai: 0.15, durasi: 0.35, dari: 0, ke: 1 });
  const awal = (i: number): number =>
    t(d, { mulai: B_DULU + 0.25 + i * 0.16, durasi: 0.3, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_DULU + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {KALIMAT.map((k, i) => (
            <Potongan
              key={k}
              x={X_KATA[i] ?? 180}
              y={Y_KATA}
              teks={k}
              nyala={i === TERAKHIR ? proses : awal(i)}
            />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["YANG DULU", "MENENTUKAN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
