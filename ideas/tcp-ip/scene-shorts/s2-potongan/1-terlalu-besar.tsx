/* T18-S2 · scene 1 · terlalu-besar — hook
   VO:        1-terlalu-besar-vo.md
   Direction: 1-terlalu-besar-direction.md

   Satu benda besar dan satu lubang yang jelas lebih kecil — seluruh hook-nya
   terbaca tanpa satu kata pun.

   DUA KEPUTUSAN:

   1. Bidangnya TIDAK pecah di sini. Pecah di scene 1 mendahului scene 2, yang
      seluruh isinya justru pembelahan itu. Yang boleh terjadi di sini cuma:
      tidak muat.

   2. Mulut jalurnya jelas lebih sempit daripada bidangnya. Kalau bedanya tipis,
      penonton membaca benturan sebagai kesalahan animasi, bukan sebagai ukuran.
*/
import type React from "react";

import { E, getar, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { JaringanTegak, TeksLayar, W, Y_ATAS } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "terlalu-besar";

const B_TANYA = beat(ID, 0); // "Ketika kamu mengirim sebuah file…"
const B_TIDAK = beat(ID, 1); // "Tidak."

const BERKAS = { w: 620, h: 300 } as const;
/** Mulut jalur — sengaja jauh lebih sempit daripada bidangnya. */
const MULUT = 260;
const Y_MULUT = Y_ATAS + 60;

export const TerlaluBesar: React.FC = () => {
  const d = useDetik();

  /* Makin cepat menjelang benturan — `E.power2in`, bukan out. */
  const turun = t(d, { mulai: 0, durasi: 1.4, dari: -420, ke: 0, ease: E.power2in });
  const bentur = getar(d, { mulai: 1.4, durasi: 0.7, jauh: 18, putaran: 2 });

  const teks1 = masuk(d, { mulai: 0.3, durasi: 0.45, geser: 20 });
  const teks2 = masuk(d, { mulai: B_TIDAK, durasi: 0.25, geser: 0 });

  const yBerkas = Y_MULUT - BERKAS.h / 2 - 40 + turun + bentur;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak jalur={[1]} luas={1} />

          {/* Mulut jalur — dua tiang, jaraknya JAUH lebih sempit. */}
          <rect x={W / 2 - MULUT / 2 - 34} y={Y_MULUT} width={34} height={150} rx={8} fill="var(--ink-2)" />
          <rect x={W / 2 + MULUT / 2} y={Y_MULUT} width={34} height={150} rx={8} fill="var(--ink-2)" />

          {/* Bidang besar — utuh sepanjang scene ini. */}
          <g>
            <rect
              x={W / 2 - BERKAS.w / 2}
              y={yBerkas - BERKAS.h / 2}
              width={BERKAS.w}
              height={BERKAS.h}
              rx={16}
              fill="var(--bg-elev)"
              stroke="var(--accent)"
              strokeWidth={6}
            />
            <text
              x={W / 2}
              y={yBerkas + 18}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={56}
              fontWeight={700}
              fill="var(--ink-0)"
            >
              FILE
            </text>
          </g>

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["Satu file besar."]} y={300} />
          </g>
          <g style={{ opacity: teks2.opacity, transform: teks2.transform }}>
            <TeksLayar baris={["Tidak."]} y={300} warna="var(--bad)" ukuran={82} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
