/* T17-S4 · scene 1 · masih-lambang — hook
   VO:        1-masih-lambang-vo.md
   Direction: 1-masih-lambang-direction.md

   ISINYA HARUS MASIH LAMBANG DI FRAME PERTAMA. Kalau sudah terbaca, seluruh
   Short ini kehilangan alasannya ada.

   Hook-nya memperkenalkan tiga hal dalam satu napas — ada pesan, ada penerima,
   dan isinya tidak terbaca — supaya penonton yang mendarat di sini tanpa pernah
   melihat Short 1–3 langsung punya semuanya (docs/02 § SERIAL).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, SANDI_PANJANG, layarHp } from "../../panggung-kiriman";
import { HP_PENERIMA, TeksLayar, W, kamera } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "masih-lambang";
const B_SAMPAI = beat(ID, 0);

/** HP-nya DIBESARKAN dari ukuran panggungnya: Short 4 seluruhnya terjadi di
 *  dalam satu HP, jadi ia adegan dekat — bukan adegan panggung. Titik tengahnya
 *  tetap sama dengan `HP_PENERIMA` supaya sambungan dari Short 3 terbaca. */
export const HP = {
  x: 140,
  y: HP_PENERIMA.y - 300,
  w: 800,
  h: 1150,
} as const;
export const L = layarHp(HP.x, HP.y, HP.w, HP.h);

export const MasihLambang: React.FC = () => {
  const d = useDetik();

  const rapat = t(d, {
    mulai: 0,
    durasi: B_SAMPAI + 5.0,
    dari: 1,
    ke: 1.08,
    ease: E.expoOut,
  });
  const lambang = masuk(d, { mulai: 0.4, durasi: 0.6, geser: 0 });
  const teks = t(d, { mulai: 0.9, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(rapat, HP.x + HP.w / 2, HP.y + HP.h / 2)}>
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
                opacity={lambang.opacity}
              >
                {SANDI_PANJANG}
              </text>
            </Hp>
          </g>

          <TeksLayar baris={["Sampai — tapi", "belum terbaca."]} y={230} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
