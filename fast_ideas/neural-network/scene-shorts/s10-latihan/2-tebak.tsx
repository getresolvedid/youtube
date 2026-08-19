/* T19-S10 · scene 2 · tebak — tahap 1
   VO:        2-tebak-vo.md
   Direction: 2-tebak-direction.md

   Denyut di dalam kotaknya arah dan warnanya SAMA PERSIS dengan Episode 06.
   Itu yang membuat Episode 10 terasa merangkum, bukan mengulang dari nol.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KotakTahap, PanahGelung } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "tebak";

const B_SATU = beat(ID, 0); // "Satu: jaringannya menebak dulu."
const B_JALAN = beat(ID, 1); // "Masukan berjalan sampai keluar."

export const Tebak: React.FC = () => {
  const d = useDetik();

  const nyala = t(d, { mulai: B_SATU + 0.1, durasi: 0.3, dari: 0, ke: 1 });
  const maju = t(d, { mulai: B_JALAN, durasi: 0.9, dari: -44, ke: 44, ease: E.sineInOut });
  const denyut = t(d, { mulai: B_JALAN - 0.1, durasi: 0.2, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <KotakTahap key={i} i={i} nyala={i === 0 ? nyala : 0}>
              {i === 0 ? (
                <g opacity={denyut}>
                  <circle cx={0} cy={maju} r={26} fill="var(--accent-soft)" />
                  <circle cx={0} cy={maju} r={11} fill="var(--accent-ink)" />
                </g>
              ) : null}
            </KotakTahap>
          ))}
          <PanahGelung tampil={(n) => (n === 0 ? nyala : 0)} />
        </svg>
      </div>
    </Scene>
  );
};
