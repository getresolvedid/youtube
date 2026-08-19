/* T19-S14 · scene 2 · token — ketegangan
   VO:        2-token-vo.md
   Direction: 2-token-direction.md

   SEMUA GARIS SAMA TIPIS DULU. Perbedaannya baru datang di scene 3 — kalau
   sudah beda di sini, scene 3 tidak punya apa pun untuk ditunjukkan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { GarisPerhatian, KALIMAT, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

/** Semua pasangan potongan, sekali saja per pasangan. */
const PASANG: readonly (readonly [number, number])[] = KALIMAT.flatMap((_, a) =>
  KALIMAT.map((__, b) => [a, b] as const).filter(([x, y]) => x < y),
);

const ID = "token";

const B_PECAH = beat(ID, 0); // "Kalimatnya dipecah jadi potongan, lalu hubungannya dibaca."

export const Token: React.FC = () => {
  const d = useDetik();

  const garis = (i: number): number =>
    t(d, { mulai: B_PECAH + 0.2 + i * 0.08, durasi: 0.3, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_PECAH + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {PASANG.map(([a, b], i) => (
            <GarisPerhatian
              key={`${a}-${b}`}
              x1={X_KATA[a] ?? 180}
              y1={Y_KATA - 40}
              x2={X_KATA[b] ?? 620}
              y2={Y_KATA - 40}
              kuat={0.25}
              opacity={garis(i)}
            />
          ))}

          {KALIMAT.map((k, i) => (
            <Potongan key={k} x={X_KATA[i] ?? 180} y={Y_KATA} teks={k} />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["POTONGAN &", "HUBUNGANNYA"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
