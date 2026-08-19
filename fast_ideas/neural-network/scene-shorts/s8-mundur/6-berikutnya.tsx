/* T19-S8 · scene 6 · berikutnya — gantungan ke Episode 09
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   PANAHNYA yang digantung, bukan jaringannya: Episode 09 seluruhnya soal besar
   langkahnya, bukan soal jaringan.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, SAMBUNGAN, TeksLayar, W, kamera } from "../panggung-nn";
import { ANDIL, Panah } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_BESAR = beat(ID, 0); // "Tapi seberapa besar tiap setelannya?"

const I_SISA = 9;

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const keluar = t(d, { mulai: 0.05, durasi: 0.3, dari: 1, ke: 0 });
  /* Membesar lalu kembali — sedang DITAKAR, bukan diputuskan. */
  const takar = tPP(d, { mulai: B_BESAR + 0.2, durasi: 1, dari: 1, ke: 2.1 });
  const skala = t(d, { mulai: 0.2, durasi: 0.8, dari: 1, ke: 1.2, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_BESAR + 0.45, durasi: 0.35, geser: 16 });

  const s = SAMBUNGAN[I_SISA];
  const a = ANDIL[I_SISA] ?? 0.5;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan opacity={0.14} />

          <g opacity={keluar} />

          {s && (
            <g transform={kamera(skala, (s.x1 + s.x2) / 2, (s.y1 + s.y2) / 2)}>
              <Panah
                x={(s.x1 + s.x2) / 2}
                y={(s.y1 + s.y2) / 2}
                panjang={(40 + 90 * a) * takar}
                arah={-90}
                warna="var(--ok)"
                tebal={7}
              />
            </g>
          )}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "SEBERAPA BESAR"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
