/* T19-S10 · scene 4 · mundur — tahap 3
   VO:        4-mundur-vo.md
   Direction: 4-mundur-direction.md

   WARNA DAN ARAH keduanya sama dengan Episode 08 — merah, ke atas. Salah satu
   saja berbeda, penonton membacanya sebagai benda lain.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { W } from "../panggung-nn";
import { KotakTahap, PanahGelung } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "mundur";

const B_TIGA = beat(ID, 0); // "Tiga: kesalahan itu ditelusuri mundur sampai ketahuan andilnya."

export const Mundur: React.FC = () => {
  const d = useDetik();

  const nyala = t(d, { mulai: B_TIGA + 0.1, durasi: 0.3, dari: 0, ke: 1 });
  const naik = t(d, { mulai: B_TIGA + 0.3, durasi: 0.9, dari: 44, ke: -44, ease: E.sineInOut });
  const denyut = t(d, { mulai: B_TIGA + 0.25, durasi: 0.2, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <KotakTahap key={i} i={i} nyala={i === 2 ? nyala : 0}>
              {i === 2 ? (
                <g opacity={denyut}>
                  <circle cx={0} cy={naik} r={26} fill="var(--bad-soft)" />
                  <circle cx={0} cy={naik} r={11} fill="var(--bad)" />
                </g>
              ) : null}
            </KotakTahap>
          ))}
          <PanahGelung tampil={(n) => (n <= 2 ? 1 : 0)} />
        </svg>
      </div>
    </Scene>
  );
};
