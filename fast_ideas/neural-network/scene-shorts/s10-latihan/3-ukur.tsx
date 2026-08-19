/* T19-S10 · scene 3 · ukur — tahap 2
   VO:        3-ukur-vo.md
   Direction: 3-ukur-direction.md

   Meternya komponen yang sama dengan Episode 07, DIPERKECIL — bukan digambar
   ulang. Bentuk yang digambar ulang akan berbeda dari Episode 07 dalam seminggu.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { W } from "../panggung-nn";
import { KotakTahap, PanahGelung } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "ukur";

const B_DUA = beat(ID, 0); // "Dua: tebakan itu dibandingkan, dan kesalahannya diukur."

export const Ukur: React.FC = () => {
  const d = useDetik();

  const nyala = t(d, { mulai: B_DUA + 0.1, durasi: 0.3, dari: 0, ke: 1 });
  const isi = t(d, { mulai: B_DUA + 0.35, durasi: 0.6, dari: 0, ke: 0.72, ease: E.power2out });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <KotakTahap key={i} i={i} nyala={i === 1 ? nyala : 0}>
              {i === 1 ? (
                <g>
                  <rect x={-70} y={-14} width={140} height={28} rx={14} fill="var(--bg)" stroke="var(--line)" strokeWidth={3} />
                  <rect x={-67} y={-11} width={134 * isi} height={22} rx={11} fill="var(--bad)" />
                </g>
              ) : null}
            </KotakTahap>
          ))}
          <PanahGelung tampil={(n) => (n <= 1 ? 1 : 0)} />
        </svg>
      </div>
    </Scene>
  );
};
