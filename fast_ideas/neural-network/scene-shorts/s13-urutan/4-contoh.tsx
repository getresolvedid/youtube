/* T19-S13 · scene 4 · contoh — payoff kedua
   VO:        4-contoh-vo.md
   Direction: 4-contoh-direction.md

   KETIGANYA MASUK KE SATU MODEL, bukan tiga model berjajar: yang dijelaskan
   bahwa urutannya yang sama, bukan bahwa ada tiga bidang.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { Pil } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "contoh";

const B_PENTING = beat(ID, 0); // "Itu penting untuk bahasa, suara, dan deret waktu."

const TUJUAN = { x: W / 2, y: 1180 };
const ASAL = [
  { x: 200, y: 760, nama: "BAHASA" },
  { x: 200, y: 900, nama: "SUARA" },
  { x: 200, y: 1040, nama: "WAKTU" },
];

export const Contoh: React.FC = () => {
  const d = useDetik();

  const masukKe = (i: number): number =>
    t(d, { mulai: B_PENTING + 0.25 + i * 0.15, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out });
  const teks = masuk(d, { mulai: B_PENTING + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Satu kotak model — satu, bukan tiga. */}
          <rect
            x={TUJUAN.x - 170}
            y={TUJUAN.y - 80}
            width={340}
            height={160}
            rx={20}
            fill="var(--bg-elev)"
            stroke="var(--accent-ink)"
            strokeWidth={5}
          />
          <text
            x={TUJUAN.x}
            y={TUJUAN.y + 14}
            fontSize={38}
            fontFamily="var(--font-display)"
            fontWeight={800}
            fill="var(--ink-0)"
            textAnchor="middle"
          >
            MODEL
          </text>

          {ASAL.map((a, i) => {
            const u = masukKe(i);
            return (
              <g key={a.nama}>
                <Pil
                  x={a.x + (TUJUAN.x - a.x) * u}
                  y={a.y + (TUJUAN.y - a.y) * u}
                  teks={a.nama}
                  lebar={220}
                  ukuran={34}
                  opacity={1 - 0.85 * u}
                />
              </g>
            );
          })}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BAHASA · SUARA", "· WAKTU"]} ukuran={46} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
