/* T19-S14 · scene 5 · intinya — tutup, dan tempat namanya jatuh
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   Blok yang terbentuk di sini bentuknya dipakai lagi di Episode 15 — kalau
   berbeda, seri ini berhenti terasa menyambung tepat di episode terakhirnya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { GarisPerhatian, KALIMAT, PERHATIAN, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { BlokTransformer } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_DASAR = beat(ID, 0); // "Cara menghubungkan itulah yang jadi dasar transformer."

const DARI = 3;

export const Intinya: React.FC = () => {
  const d = useDetik();

  const satu = t(d, { mulai: 0.1, durasi: 0.6, dari: 0, ke: 1, ease: E.sineInOut });
  const nama = masuk(d, { mulai: B_DASAR + 0.35, durasi: 0.4, geser: 20 });

  const baris = PERHATIAN[DARI] ?? [];

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={1 - satu}>
            {KALIMAT.map((_, ke) => {
              if (ke === DARI) return null;
              return (
                <GarisPerhatian
                  key={ke}
                  x1={X_KATA[DARI] ?? 840}
                  y1={Y_KATA - 40}
                  x2={X_KATA[ke] ?? 180}
                  y2={Y_KATA - 40}
                  kuat={Math.max(0.05, baris[ke] ?? 0.15)}
                />
              );
            })}
            {KALIMAT.map((k, i) => (
              <Potongan key={k} x={X_KATA[i] ?? 180} y={Y_KATA} teks={k} nyala={i === DARI ? 1 : 0} />
            ))}
          </g>

          <BlokTransformer y={Y_KATA} tampil={satu} />

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <TeksLayar baris={["TRANSFORMER"]} y={1230} ukuran={62} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
