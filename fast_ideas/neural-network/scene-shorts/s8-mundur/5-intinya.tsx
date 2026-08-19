/* T19-S8 · scene 5 · intinya — tutup, dan tempat namanya jatuh
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   Istilah aslinya di LAYAR; VO memakai kalimat Indonesianya — pola yang sama
   dengan Episode 07 ("loss") dan 09 ("gradient descent").
*/
import type React from "react";

import { masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, SAMBUNGAN, TeksLayar, W } from "../panggung-nn";
import { ANDIL, Panah } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_MUNDUR = beat(ID, 0); // "Yang berjalan mundur itu memberi tahu di mana harus disetel."

const DIPILIH = [9, 0, 4, 6] as const;

export const Intinya: React.FC = () => {
  const d = useDetik();

  const redup = t(d, { mulai: 0.05, durasi: 0.35, dari: 0.5, ke: 0.14 });
  const nama = masuk(d, { mulai: B_MUNDUR + 0.35, durasi: 0.4, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan opacity={redup} />

          {DIPILIH.map((i) => {
            const s = SAMBUNGAN[i];
            if (!s) return null;
            const a = ANDIL[i] ?? 0.3;
            return (
              <Panah
                key={i}
                x={(s.x1 + s.x2) / 2}
                y={(s.y1 + s.y2) / 2}
                panjang={40 + 90 * a}
                arah={-90}
                warna="var(--ok)"
                tebal={6}
              />
            );
          })}

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <TeksLayar baris={["BACKPROPAGATION"]} y={1300} ukuran={54} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
