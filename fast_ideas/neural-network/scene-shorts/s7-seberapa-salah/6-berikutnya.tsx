/* T19-S7 · scene 6 · berikutnya — gantungan ke Episode 08
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   Yang digantung benda di layar — satu sambungan yang menyala — bukan
   episodenya (HARD RULE 7).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, SAMBUNGAN, TeksLayar, W, kamera } from "../panggung-nn";
import { Meter } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_UBAH = beat(ID, 0); // "Sekarang jaringannya harus tahu apa yang harus diubah."

/** Sambungan yang menyala — indeks tetap, bukan diacak, dan bukan yang paling
 *  kanan (di balik rail tombol ia tidak terlihat sama sekali). */
const I_PILIH = 4;

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const jaring = t(d, { mulai: 0.1, durasi: 0.45, dari: 0, ke: 0.55 });
  const nyala = t(d, { mulai: B_UBAH + 0.2, durasi: 0.3, dari: 0, ke: 1 });
  const skala = t(d, { mulai: 0.15, durasi: 0.8, dari: 1, ke: 1.15, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_UBAH + 0.5, durasi: 0.35, geser: 16 });

  const s = SAMBUNGAN[I_PILIH];

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)}>
            <Jaringan opacity={jaring} />
            {s && (
              <line
                x1={s.x1}
                y1={s.y1}
                x2={s.x2}
                y2={s.y2}
                stroke="var(--accent-ink)"
                strokeWidth={10}
                strokeLinecap="round"
                opacity={nyala}
              />
            )}
          </g>

          <Meter y={1330} nilai={0.25} opacity={0.35} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "APA YANG DIUBAH"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
