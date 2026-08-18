/* T17-S4 · scene 5 · dua-layar — BAYARAN SELURUH SERI
   VO:        5-dua-layar-vo.md
   Direction: 5-dua-layar-direction.md

   Ia bekerja karena penonton sudah melihat kedua layar itu masing-masing — satu
   di Short 2, satu di scene sebelumnya. Menyandingkannya di sini tidak
   mengajarkan hal baru; ia mengunci yang sudah dipelajari.

   Belahnya MENDATAR, alasan yang sama dengan Short 3 scene 5: di 9:16 dua kolom
   sempit memaksa isinya mengecil sampai tidak terbaca di ponsel.

   Kedua layar memakai komponen aslinya — penonton harus MENGENALI keduanya,
   bukan mencocokkannya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, Monitor, PESAN, SANDI_PANJANG, layarHp } from "../../panggung-kiriman";
import { W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "dua-layar";
const B_ORANG = beat(ID, 0);

const MON = { x: 190, y: 480, w: 700, h: 400 } as const;
const HP2 = { x: 340, y: 1130, w: 400, h: 620 } as const;
const L2 = layarHp(HP2.x, HP2.y, HP2.w, HP2.h);

export const DuaLayar: React.FC = () => {
  const d = useDetik();

  const garis = t(d, { mulai: 0.15, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  /* Kedua sisi masuk BERSAMAAN — keduanya setara. */
  const sisi = masuk(d, { mulai: 0.35, durasi: 0.6, geser: 22 });

  const label = (x: number, y: number, s: string) => (
    <text
      x={x}
      y={y}
      fontSize={30}
      fontFamily="var(--font-mono)"
      fontWeight={700}
      fill="var(--ink-2)"
      textAnchor="middle"
      letterSpacing={3}
    >
      {s}
    </text>
  );

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <line
            x1={90}
            y1={1010}
            x2={W - 90}
            y2={1010}
            stroke="var(--line)"
            strokeWidth={4}
            style={{ transform: `scaleX(${garis})`, transformOrigin: `${W / 2}px 0` }}
          />

          <g style={{ opacity: sisi.opacity, transform: sisi.transform }}>
            {label(W / 2, 420, "YANG MENGINTIP")}
            <Monitor {...MON} nyala={0.8}>
              <text
                x={MON.x + MON.w / 2}
                y={MON.y + MON.h / 2}
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
            </Monitor>

            {label(W / 2, 1090, "YANG DITUJU")}
            <Hp {...HP2} nyala={0.95}>
              <rect
                x={L2.x + 20}
                y={L2.y + 150}
                width={L2.w - 40}
                height={86}
                rx={26}
                fill="var(--accent)"
              />
              <text
                x={L2.x + L2.w / 2}
                y={L2.y + 194}
                fontSize={32}
                fontFamily="var(--font-body)"
                fontWeight={700}
                fill="var(--ink-0)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {PESAN}
              </text>
            </Hp>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
