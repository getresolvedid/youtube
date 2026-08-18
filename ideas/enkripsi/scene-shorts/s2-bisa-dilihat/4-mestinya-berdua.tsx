/* T17-S2 · scene 4 · mestinya-berdua
   VO:        4-mestinya-berdua-vo.md
   Direction: 4-mestinya-berdua-direction.md

   Scene 3 menunjukkan APA yang terbaca; scene ini menunjukkan DI MANA dia
   berdiri — di antara kamu dan temanmu, bukan di ujung.

   KALIMAT DI LAYAR PENGAMAT TIDAK DIHAPUS saat kamera mundur. Kalau ia hilang,
   scene ini cuma jadi peta; yang bikin gelisah justru bahwa ia masih terbaca
   dari jauh.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, Monitor, PESAN, Sosok } from "../../panggung-kiriman";
import {
  HP_PENERIMA,
  HP_PENGIRIM,
  JALUR,
  JaringanTegak,
  MONITOR,
  PENGAMAT,
  RAPAT_MONITOR,
  TUMPU_MONITOR,
  TeksLayar,
  W,
  kameraKe,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "mestinya-berdua";
const B_PADAHAL = beat(ID, 0);

export const MestinyaBerdua: React.FC = () => {
  const d = useDetik();

  /* Mundur: skalanya kembali ke 1,0 dan jangkarnya ikut pulang sendiri karena
     panningnya turunan dari skala. */
  const skala = t(d, {
    mulai: 0,
    durasi: 1.5,
    dari: RAPAT_MONITOR,
    ke: 1,
    ease: E.expoOut,
  });

  /* Satu-satunya benda BARU di scene ini: garis dari jalur ke layarnya. Ia yang
     menyatakan "dia mengambilnya dari sana" — redup dan tipis, bukan panah. */
  const garis = gambarGaris(d, 210, { mulai: B_PADAHAL + 1.2, durasi: 0.7 });
  const teks = t(d, { mulai: B_PADAHAL + 0.5, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kameraKe(skala, TUMPU_MONITOR.cx, TUMPU_MONITOR.cy, RAPAT_MONITOR)}>
            <JaringanTegak luas={1} />

            <Hp {...HP_PENGIRIM} nyala={0.5} />
            <Hp {...HP_PENERIMA} nyala={0.5} />

            <path
              d={`M ${JALUR.x} ${MONITOR.y + MONITOR.h / 2} H ${MONITOR.x}`}
              stroke="var(--ink-2)"
              strokeWidth={4}
              strokeLinecap="round"
              fill="none"
              opacity={0.7}
              {...garis}
            />

            <Sosok x={PENGAMAT.x} y={PENGAMAT.alas} skala={0.62} />
            <Monitor {...MONITOR} nyala={0.8}>
              <text
                x={MONITOR.x + MONITOR.w / 2}
                y={MONITOR.y + MONITOR.h / 2}
                fontSize={34}
                fontFamily="var(--font-body)"
                fontWeight={700}
                fill="var(--ink-0)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {PESAN}
              </text>
            </Monitor>
          </g>

          <TeksLayar baris={["Padahal cuma", "buat berdua."]} y={230} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
