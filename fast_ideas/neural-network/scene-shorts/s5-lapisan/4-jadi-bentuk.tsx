/* T19-S3 · scene 4 · jadi-bentuk — payoff kedua
   VO:        4-jadi-bentuk-vo.md
   Direction: 4-jadi-bentuk-direction.md

   SATU KEPUTUSAN YANG MENGIKAT: kucingnya `Kucing` dari panggung-nn — komponen
   yang SAMA dengan Short 1, bukan gambar mirip yang digambar ulang. Dua gambar
   mirip yang digambar terpisah akan berbeda dalam seminggu, dan penonton yang
   menonton dua Short akan merasa berada di dua dunia.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kucing, TeksLayar, W, X_SIMPUL, kamera } from "../panggung-nn";
import { JaringLapis, Potongan, Y_MID } from "../panggung-lapis";
import { beat } from "./timing.gen";

const ID = "jadi-bentuk";

const B_GABUNG = beat(ID, 0); // "Lapis berikutnya menggabungkan potongan itu jadi bentuk."
const B_KUCING = beat(ID, 1); // "Bentuknya jadi kucing."

/** Ke mana ketiga potongan berkumpul. */
const KUMPUL = { x: 540, y: 1010 };

export const JadiBentuk: React.FC = () => {
  const d = useDetik();

  const kumpul = t(d, {
    mulai: B_GABUNG + 0.15,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  const kucing = t(d, {
    mulai: B_KUCING,
    durasi: 0.45,
    dari: 0,
    ke: 1,
    ease: E.backOut(1.1),
  });

  /* Ditarik mundur selama penggabungan: yang tadi dilihat sepotong-sepotong
     ternyata bagian dari sesuatu yang lebih besar. */
  const skala = t(d, { mulai: B_GABUNG, durasi: 1.2, dari: 1, ke: 0.9, ease: E.sineInOut });

  const teks = masuk(d, { mulai: B_GABUNG + 0.1, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)}>
            <JaringLapis tengah={1} opacity={1 - 0.8 * kucing} />

            {X_SIMPUL.map((x, i) => {
              const y0 = Y_MID - 130;
              return (
                <Potongan
                  key={x}
                  jenis={i as 0 | 1 | 2}
                  x={x + (KUMPUL.x - x) * kumpul}
                  y={y0 + (KUMPUL.y - y0) * kumpul}
                  opacity={(1 - kucing) * (0.4 + 0.6 * (1 - kumpul * 0.5))}
                  skala={0.85 - 0.25 * kumpul}
                />
              );
            })}

            <g opacity={kucing}>
              <Kucing y={KUMPUL.y} skala={1.15 * kucing} />
            </g>
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["LAPIS BERIKUTNYA:", "BENTUK"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
