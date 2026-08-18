/* T17-S2 · scene 3 · terbaca
   VO:        3-terbaca-vo.md
   Direction: 3-terbaca-direction.md

   SCENE YANG JADI SELURUH ALASAN SHORT 2 ADA. Frame ini yang dibandingkan
   Short 3 — kalau ia lewat cepat, seluruh payoff Short 3 jadi klaim kosong.

   Push-in-nya `RAPAT_MONITOR` dari ../panggung-short.tsx, dan Short 3 memakai
   nilai yang sama persis.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Monitor, PESAN, Paket, Sosok } from "../../panggung-kiriman";
import {
  JALUR,
  JaringanTegak,
  MONITOR,
  PENGAMAT,
  RAPAT_MONITOR,
  TUMPU_MONITOR,
  TeksLayar,
  W,
  kameraKe,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "terbaca";
const B_LIHAT = beat(ID, 0);

export const Terbaca: React.FC = () => {
  const d = useDetik();

  const maju = t(d, { mulai: 0, durasi: 2.0, dari: 0, ke: 1, ease: E.linear });
  const yPaket = JALUR.atas + 200 + (MONITOR.y - (JALUR.atas + 200)) * maju;

  const rapat = t(d, {
    mulai: 0,
    durasi: 1.6,
    dari: 1,
    ke: RAPAT_MONITOR,
    ease: E.expoOut,
  });

  /* Paket terbuka: opasitasnya turun sementara teksnya naik, di rentang yang
     sama — ia terbuka, bukan hilang lalu diganti teks. */
  const buka = t(d, { mulai: B_LIHAT + 1.5, durasi: 0.6, dari: 0, ke: 1 });
  const teks = t(d, { mulai: B_LIHAT + 0.4, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kameraKe(rapat, TUMPU_MONITOR.cx, TUMPU_MONITOR.cy, RAPAT_MONITOR)}>
            <JaringanTegak luas={1} nyala={nyalaSimpul(yPaket)} />
            <Sosok x={PENGAMAT.x} y={PENGAMAT.alas} skala={0.62} />
            <Paket x={JALUR.x} y={yPaket} skala={1.4} opacity={1 - maju} />

            <Monitor {...MONITOR} nyala={0.8}>
              <g opacity={1 - buka}>
                <Paket
                  x={MONITOR.x + MONITOR.w / 2}
                  y={MONITOR.y + MONITOR.h / 2}
                  skala={0.7}
                />
              </g>
              <text
                x={MONITOR.x + MONITOR.w / 2}
                y={MONITOR.y + MONITOR.h / 2}
                fontSize={34}
                fontFamily="var(--font-body)"
                fontWeight={700}
                fill="var(--ink-0)"
                textAnchor="middle"
                dominantBaseline="middle"
                opacity={buka}
              >
                {PESAN}
              </text>
            </Monitor>
          </g>

          <TeksLayar baris={["Isinya terbaca."]} y={230} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
