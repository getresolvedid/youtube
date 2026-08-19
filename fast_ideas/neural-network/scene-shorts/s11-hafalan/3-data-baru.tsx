/* T19-S11 · scene 3 · data-baru — payoff
   VO:        3-data-baru-vo.md
   Direction: 3-data-baru-direction.md

   TITIK BARUNYA BERGARIS TEPI, bentuknya beda dari titik latihan — supaya
   penonton membedakan mana latihan mana baru tanpa dijelaskan. Posisinya
   DITULIS di `TITIK_BARU`, bukan diacak.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { BATAS_HAFAL, KOTAK, Sebaran, TITIK_BARU } from "../panggung-lapis";
import { Kurva, jalurKurva } from "../panggung-seri";
import { beat } from "./timing.gen";

const LEBAR = KOTAK.x2 - KOTAK.x1;
const TINGGI = KOTAK.y2 - KOTAK.y1;
const TENGAH = (KOTAK.y1 + KOTAK.y2) / 2;
const D_HAFAL = jalurKurva(BATAS_HAFAL, KOTAK.x1, TENGAH, LEBAR, TINGGI);

const ID = "data-baru";

const B_BARU = beat(ID, 0); // "Tapi begitu datang yang baru, jawabannya meleset."

export const DataBaru: React.FC = () => {
  const d = useDetik();

  const jatuh = (i: number): number =>
    t(d, { mulai: B_BARU + 0.1 + i * 0.12, durasi: 0.4, dari: 0, ke: 1, ease: E.backOut(1.1) });
  const teks = masuk(d, { mulai: B_BARU + 0.3, durasi: 0.4, geser: 18 });

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

          {TITIK_BARU.map((p, i) => (
            <circle
              key={`${p.x}-${p.y}`}
              cx={p.x}
              cy={p.y - 120 * (1 - jatuh(i))}
              r={18}
              fill="none"
              stroke={p.biru ? "var(--accent-ink)" : "var(--bad)"}
              strokeWidth={6}
              opacity={jatuh(i)}
            />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DATA BARU"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};

