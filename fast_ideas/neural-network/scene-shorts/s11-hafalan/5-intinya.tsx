/* T19-S11 · scene 5 · intinya — tutup, dan tempat namanya jatuh
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   BATASNYA MELURUS, bukan diganti: bentuk antaranya dihitung tiap frame, jadi
   yang terbaca "yang tadi jadi begini", bukan "yang tadi dihapus".
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { BATAS_HAFAL, BATAS_POLA, KOTAK, Sebaran, TITIK_BARU } from "../panggung-lapis";
import { Kurva, jalurKurva } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_BELAJAR = beat(ID, 0); // "Belajar yang benar bekerja di luar contoh yang pernah dilihat."

const LEBAR = KOTAK.x2 - KOTAK.x1;
const TINGGI = KOTAK.y2 - KOTAK.y1;
const TENGAH = (KOTAK.y1 + KOTAK.y2) / 2;

export const Intinya: React.FC = () => {
  const d = useDetik();

  const lurus = t(d, { mulai: 0.15, durasi: 0.9, dari: 0, ke: 1, ease: E.sineInOut });
  const dBatas = jalurKurva(
    (u) => BATAS_HAFAL(u) * (1 - lurus) + BATAS_POLA(u) * lurus,
    KOTAK.x1,
    TENGAH,
    LEBAR,
    TINGGI,
  );
  const nama = masuk(d, { mulai: B_BELAJAR + 0.4, durasi: 0.4, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Sebaran />
          <Kurva d={dBatas} warna="var(--ink-0)" tebal={7} />

          {TITIK_BARU.map((p) => (
            <circle
              key={`${p.x}-${p.y}`}
              cx={p.x}
              cy={p.y}
              r={18}
              fill="none"
              stroke={p.biru ? "var(--accent-ink)" : "var(--bad)"}
              strokeWidth={6}
            />
          ))}

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <TeksLayar baris={["OVERFITTING"]} y={640} ukuran={62} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
