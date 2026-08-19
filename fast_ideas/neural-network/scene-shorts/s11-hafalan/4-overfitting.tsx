/* T19-S11 · scene 4 · overfitting — payoff kedua
   VO:        4-overfitting-vo.md
   Direction: 4-overfitting-direction.md

   YANG DISOROT TEMPAT MENEMPELNYA, bukan seluruh garis. Yang harus terbaca
   bahwa batas itu menempel ke titik latihan — bukan sekadar bahwa ia berkelok.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { BATAS_HAFAL, KOTAK, Sebaran } from "../panggung-lapis";
import { Kurva, jalurKurva } from "../panggung-seri";
import { beat } from "./timing.gen";

const LEBAR = KOTAK.x2 - KOTAK.x1;
const TINGGI = KOTAK.y2 - KOTAK.y1;
const TENGAH = (KOTAK.y1 + KOTAK.y2) / 2;
const D_HAFAL = jalurKurva(BATAS_HAFAL, KOTAK.x1, TENGAH, LEBAR, TINGGI);

const ID = "overfitting";

const B_HAFAL = beat(ID, 0); // "Batas pemisahnya berkelok mengikuti tiap titik latihan…"

/** Empat tempat batas paling menempel — dihitung dari bentuk kelokannya, bukan
 *  dipilih dengan mata. */
const TEMPEL = [-0.62, -0.2, 0.24, 0.66];

export const Overfitting: React.FC = () => {
  const d = useDetik();

  const sorot = (i: number): number =>
    t(d, { mulai: B_HAFAL + 0.2 + i * 0.25, durasi: 0.3, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_HAFAL + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Sebaran />
          <Kurva d={D_HAFAL} warna="var(--ink-0)" tebal={7} />

          {TEMPEL.map((u, i) => (
            <circle
              key={u}
              cx={KOTAK.x1 + LEBAR / 2 + (u * LEBAR) / 2}
              cy={TENGAH - (BATAS_HAFAL(u) * TINGGI) / 2}
              r={26}
              fill="none"
              stroke="var(--warn)"
              strokeWidth={6}
              opacity={sorot(i)}
            />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["HAFAL"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};

