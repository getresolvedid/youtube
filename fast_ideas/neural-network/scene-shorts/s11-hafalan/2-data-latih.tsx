/* T19-S11 · scene 2 · data-latih — ketegangan
   VO:        2-data-latih-vo.md
   Direction: 2-data-latih-direction.md

   BATASNYA BERKELOK RAPAT, bukan mulus. Kelokan yang mengikuti tiap titik itulah
   bendanya — kalau digambar mulus, scene 4 tidak punya apa pun untuk ditunjuk.
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

const ID = "data-latih";

const B_LATIH = beat(ID, 0); // "Di contoh yang dipakai latihan, nilainya bisa nyaris sempurna."

const D_HAFAL = jalurKurva(BATAS_HAFAL, KOTAK.x1, TENGAH, LEBAR, TINGGI);

export const DataLatih: React.FC = () => {
  const d = useDetik();

  const batas = t(d, { mulai: B_LATIH + 0.15, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out });
  const teks = masuk(d, { mulai: B_LATIH + 0.35, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Sebaran />
          <Kurva d={D_HAFAL} warna="var(--ink-0)" tebal={7} opacity={batas} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DI DATA LATIH:", "HAMPIR SEMPURNA"]} ukuran={46} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
