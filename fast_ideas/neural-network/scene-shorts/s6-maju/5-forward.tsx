/* T19-S6 · scene 5 · forward — tutup, dan tempat namanya jatuh
   VO:        5-forward-vo.md
   Direction: 5-forward-direction.md

   Panahnya DIGAMBAR dari atas ke bawah — arah gambarnya sama dengan arah
   perjalanannya. Panah yang muncul sekaligus kehilangan satu-satunya hal yang
   ia jelaskan.
*/
import type React from "react";

import { gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, Kartu, TeksLayar, W, Y_LAPIS } from "../panggung-nn";
import { beat } from "./timing.gen";

const ID = "forward";

const B_NAMA = beat(ID, 0); // "Perjalanan dari masuk sampai keluar itu namanya forward propagation."

const Y1 = Y_LAPIS[0] - 120;
const Y2 = 1160;

export const Forward: React.FC = () => {
  const d = useDetik();

  const panah = gambarGaris(d, Y2 - Y1, { mulai: 0.1, durasi: 0.5 });
  const kepala = t(d, { mulai: 0.55, durasi: 0.2, dari: 0, ke: 1 });
  const nama = masuk(d, { mulai: B_NAMA + 0.35, durasi: 0.4, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan opacity={0.5} />
          <Kartu y={1230} teks="KUCING" warna="benar" opacity={0.5} />

          <line
            x1={210}
            y1={Y1}
            x2={210}
            y2={Y2}
            stroke="var(--accent-ink)"
            strokeWidth={9}
            strokeLinecap="round"
            {...panah}
          />
          <path d={`M 190 ${Y2 - 26} L 230 ${Y2 - 26} L 210 ${Y2 + 14} Z`} fill="var(--accent-ink)" opacity={kepala} />

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <TeksLayar baris={["FORWARD", "PROPAGATION"]} ukuran={58} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
