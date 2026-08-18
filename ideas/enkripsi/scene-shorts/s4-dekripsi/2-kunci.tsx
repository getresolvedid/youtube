/* T17-S4 · scene 2 · kunci
   VO:        2-kunci-vo.md
   Direction: 2-kunci-direction.md

   ARAH MASUKNYA MENGIKAT. Dari jalur (atas) berarti kuncinya ikut dikirim — dan
   itu justru yang tidak terjadi. Dari sisi penerima (kanan) berarti ia sudah ada
   di sana. Ini SATU-SATUNYA isyarat di seluruh seri soal itu, dan ia dikerjakan
   arah gerak, bukan kalimat.

   Warnanya `--ok`, satu-satunya benda hijau di seluruh seri: biru untuk yang
   biasa, ungu untuk yang terkunci, hijau untuk yang membuka.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Gembok, Hp, Kunci, SANDI_PANJANG, munculSkala } from "../../panggung-kiriman";
import { TeksLayar, W, kamera } from "../panggung-short";
import { HP, L } from "./1-masih-lambang";
import { beat } from "./timing.gen";

const ID = "kunci";
const B_BUTUH = beat(ID, 0);

/** Titik berhenti kunci — di sebelah gembok yang menempel di lambangnya. */
export const Y_GEMBOK = L.y + L.h / 2 + 140;

export const KunciScene: React.FC = () => {
  const d = useDetik();

  const jauh = t(d, { mulai: 0, durasi: 1.2, dari: 1.08, ke: 1, ease: E.expoOut });

  const masuk2 = t(d, {
    mulai: B_BUTUH + 0.8,
    durasi: 1.0,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const skala = munculSkala(d, B_BUTUH + 0.8);
  const teks = t(d, { mulai: 0.5, durasi: 0.5, dari: 0, ke: 1 });

  const xKunci = W / 2 + 420 - 250 * masuk2;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(jauh, HP.x + HP.w / 2, HP.y + HP.h / 2)}>
            <Hp {...HP} nyala={1}>
              <text
                x={L.x + L.w / 2}
                y={L.y + L.h / 2}
                fontSize={44}
                fontFamily="var(--font-mono)"
                fontWeight={700}
                fill="var(--accent-ink)"
                textAnchor="middle"
                dominantBaseline="middle"
                letterSpacing={3}
              >
                {SANDI_PANJANG}
              </text>
              {/* gembok masih TERTUTUP di sini — ia terbuka di scene 3 */}
              <Gembok x={L.x + L.w / 2} y={Y_GEMBOK} skala={0.9} />
            </Hp>
          </g>

          {/* Kunci datang dari SISI PENERIMA — kanan, bukan dari jalur di atas. */}
          <g opacity={masuk2}>
            <g
              transform={`translate(${xKunci} ${Y_GEMBOK}) scale(${
                1.8 * skala
              }) translate(${-xKunci} ${-Y_GEMBOK})`}
            >
              <Kunci x={xKunci} y={Y_GEMBOK} />
            </g>
          </g>

          <TeksLayar baris={["Butuh kuncinya."]} y={230} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
