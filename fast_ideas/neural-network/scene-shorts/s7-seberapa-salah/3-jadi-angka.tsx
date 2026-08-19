/* T19-S7 · scene 3 · jadi-angka — payoff
   VO:        3-jadi-angka-vo.md
   Direction: 3-jadi-angka-direction.md

   SATU KEPUTUSAN: batang jaraknya BERPINDAH jadi meter, bukan hilang lalu
   diganti. Batang yang menghilang dan meter yang muncul terbaca sebagai dua
   benda — padahal yang sedang dijelaskan justru bahwa keduanya sama.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { Meter, Perbandingan } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "jadi-angka";

const B_UBAH = beat(ID, 0); // "Selisih itu diubah jadi satu angka."

/** Selisih 1,0 − 0,2 = 0,8. Angkanya diturunkan, tidak diketik. */
const SELISIH = 0.8;

export const JadiAngka: React.FC = () => {
  const d = useDetik();

  const pindah = t(d, { mulai: B_UBAH + 0.2, durasi: 0.7, dari: 0, ke: 1, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_UBAH + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Perbandingan
            yAtas={820}
            yBawah={1100}
            atas="0,2"
            bawah="1,0"
            labelAtas="TEBAKAN"
            labelBawah="SEHARUSNYA"
            selisih={1 - pindah}
          />

          {/* Meter tumbuh dari nol tepat saat batangnya menyusut — satu peristiwa,
              dua bentuk. */}
          <g opacity={pindah}>
            <Meter y={1330} nilai={SELISIH * pindah} label="SELISIH" />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["JADI SATU ANGKA"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
