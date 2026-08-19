/* T19-S6 · scene 6 · berikutnya — gantungan ke Episode 07
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   KARTUNYA yang digantung, bukan jaringannya. Episode 07 seluruhnya soal jarak
   antara kartu itu dan jawaban yang benar.
*/
import type React from "react";

import { E, getar, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, Kartu, TeksLayar, W, kamera } from "../panggung-nn";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_SALAH = beat(ID, 0); // "Tapi dari mana dia tahu tebakannya salah?"

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const keluar = t(d, { mulai: 0.05, durasi: 0.25, dari: 1, ke: 0 });
  const goyang = getar(d, { mulai: B_SALAH + 0.15, durasi: 0.55, jauh: 10, putaran: 3 });
  const tanya = t(d, { mulai: B_SALAH + 0.6, durasi: 0.3, dari: 0, ke: 1, ease: E.backOut(1.2) });
  const skala = t(d, { mulai: 0.15, durasi: 0.8, dari: 1, ke: 1.2, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_SALAH + 0.5, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan opacity={0.25} />

          <g transform={kamera(skala, W / 2, 1230)}>
            <g transform={`translate(${goyang} 0)`}>
              <Kartu y={1230} teks="KUCING" warna="benar" />
            </g>
            <text
              x={W / 2 + 260}
              y={1252}
              fontSize={92}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--warn)"
              textAnchor="middle"
              opacity={tanya}
            >
              ?
            </text>
          </g>

          <g opacity={keluar} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "SEBERAPA SALAH"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
