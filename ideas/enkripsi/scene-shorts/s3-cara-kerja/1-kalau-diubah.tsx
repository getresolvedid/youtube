/* T17-S3 · scene 1 · kalau-diubah — hook
   VO:        1-kalau-diubah-vo.md
   Direction: 1-kalau-diubah-direction.md

   SOSOK DI LATAR MENGERJAKAN PEKERJAAN BERAT: ia menjawab "kenapa perlu diubah"
   tanpa satu kata pun, untuk penonton yang mendarat di Short 3 tanpa pernah
   melihat Short 2. Opasitasnya ditahan rendah — kalau ia terlalu terang,
   penonton menunggu dia berbuat sesuatu dan berhenti membaca kalimatnya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Monitor, Sosok } from "../../panggung-kiriman";
import { MONITOR, PENGAMAT, TeksLayar, W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "kalau-diubah";
const B_TANYA = beat(ID, 0);

/** Kalimatnya di tengah, lalu turun ke arah kotak yang lahir di scene 2. */
export const PUSAT = { x: W / 2, y: 880 } as const;

export const KalauDiubah: React.FC = () => {
  const d = useDetik();

  const kalimat = masuk(d, { mulai: 0.15, durasi: 0.6, geser: 24 });
  const latar = t(d, { mulai: 0.6, durasi: 0.9, dari: 0, ke: 0.25 });
  const teks = t(d, { mulai: 0.5, durasi: 0.5, dari: 0, ke: 1 });

  /* Mulai bergerak di paruh kedua barisnya — ia menuju kotak yang belum ada. */
  const turun = t(d, {
    mulai: B_TANYA + 3.0,
    durasi: 1.6,
    dari: 0,
    ke: 120,
    ease: E.expoOut,
  });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={latar}>
            <Sosok x={PENGAMAT.x} y={PENGAMAT.alas} skala={0.62} />
            <Monitor {...MONITOR} nyala={0.5} />
          </g>

          <g
            style={{ opacity: kalimat.opacity, transform: kalimat.transform }}
            transform={`translate(0 ${turun})`}
          >
            <text
              x={PUSAT.x}
              y={PUSAT.y}
              fontSize={56}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              HALO, APA KABAR?
            </text>
          </g>

          <TeksLayar baris={["Kalau diubah dulu?"]} y={230} opacity={teks} ukuran={56} />
        </svg>
      </div>
    </Scene>
  );
};
