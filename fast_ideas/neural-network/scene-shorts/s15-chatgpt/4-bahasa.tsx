/* T19-S15 · scene 4 · bahasa — payoff kedua
   VO:        4-bahasa-vo.md
   Direction: 4-bahasa-direction.md

   Garis perhatiannya komponen yang sama dengan Episode 14, dengan angka yang
   sama (`PERHATIAN`) — rekap yang memakai angka lain bukan rekap.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kartu, TeksLayar, W } from "../panggung-nn";
import { GarisPerhatian, KALIMAT, PERHATIAN, Potongan, X_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "bahasa";

const B_PAKAI = beat(ID, 0); // "Transformer memakai perhatian untuk mengolah bahasa."

const Y = 820;
const DARI = 3;

export const Bahasa: React.FC = () => {
  const d = useDetik();

  const garis = t(d, { mulai: B_PAKAI + 0.2, durasi: 0.45, dari: 0, ke: 1 });
  const alir = t(d, { mulai: B_PAKAI + 0.8, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out });
  const teks = masuk(d, { mulai: B_PAKAI + 0.3, durasi: 0.4, geser: 18 });

  const baris = PERHATIAN[DARI] ?? [];

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {KALIMAT.map((_, ke) => {
            if (ke === DARI) return null;
            return (
              <GarisPerhatian
                key={ke}
                x1={X_KATA[DARI] ?? 840}
                y1={Y - 40}
                x2={X_KATA[ke] ?? 180}
                y2={Y - 40}
                kuat={Math.max(0.05, baris[ke] ?? 0.15)}
                opacity={garis}
              />
            );
          })}

          {KALIMAT.map((k, i) => (
            <Potongan key={k} x={X_KATA[i] ?? 180} y={Y} teks={k} nyala={i === DARI ? 1 : 0} />
          ))}

          {/* Semuanya mengalir jadi satu tebakan kata berikutnya. */}
          <g opacity={alir}>
            <Kartu y={1150} teks="…ENAK" warna="benar" skala={0.85 + 0.15 * alir} />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["PERHATIAN + MAKNA"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
