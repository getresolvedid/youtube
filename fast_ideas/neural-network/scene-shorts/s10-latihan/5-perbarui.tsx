/* T19-S10 · scene 5 · perbarui — tahap 4
   VO:        5-perbarui-vo.md
   Direction: 5-perbarui-direction.md

   PANAH YANG PULANG ke kotak pertama itu yang membuat empat kotak terbaca
   sebagai GELUNG, bukan sebagai daftar yang kebetulan berdekatan.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { W } from "../panggung-nn";
import { KotakTahap, PanahGelung } from "../panggung-gelung";
import { Panah } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "perbarui";

const B_EMPAT = beat(ID, 0); // "Empat: nilainya disetel sedikit, lalu gelungnya berputar lagi."

export const Perbarui: React.FC = () => {
  const d = useDetik();

  const nyala = t(d, { mulai: B_EMPAT + 0.1, durasi: 0.3, dari: 0, ke: 1 });
  const setel = t(d, { mulai: B_EMPAT + 0.3, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });
  const pulang = t(d, { mulai: B_EMPAT + 0.9, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <KotakTahap key={i} i={i} nyala={i === 3 ? nyala : 0}>
              {i === 3 ? (
                <g opacity={setel}>
                  <Panah x={-40} y={20} panjang={70} arah={-60} warna="var(--ok)" tebal={6} />
                  <Panah x={30} y={20} panjang={50} arah={-60} warna="var(--ok)" tebal={5} />
                </g>
              ) : null}
            </KotakTahap>
          ))}
          <PanahGelung tampil={(n) => (n === 3 ? pulang : 1)} />
        </svg>
      </div>
    </Scene>
  );
};
