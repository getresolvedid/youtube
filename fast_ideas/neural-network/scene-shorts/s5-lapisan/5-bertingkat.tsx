/* T19-S3 · scene 5 · bertingkat — tutup
   VO:        5-bertingkat-vo.md
   Direction: 5-bertingkat-direction.md

   SATU KEPUTUSAN: tangganya NAIK, bukan mendatar. Yang harus terbaca "makin
   lama makin besar", dan arah tegak membawa arti itu tanpa satu kata pun
   (docs/03 § Bahasa gerak).
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kucing, LabelTahap, W, kamera } from "../panggung-nn";
import { ANAK_TANGGA, JaringLapis } from "../panggung-lapis";
import { beat } from "./timing.gen";

const ID = "bertingkat";

const B_TIAP = beat(ID, 0); // "Tiap lapis menyusun temuan lapis sebelumnya…"

export const Bertingkat: React.FC = () => {
  const d = useDetik();

  const bersih = t(d, { mulai: 0.05, durasi: 0.35, dari: 1, ke: 0 });
  const siluet = 0.08 + 0.92 * bersih;

  const anak = (i: number): number =>
    t(d, { mulai: B_TIAP + 0.1 + i * 0.2, durasi: 0.32, dari: 0, ke: 1, ease: E.expoOut });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(0.9)}>
            <JaringLapis tengah={1} opacity={siluet} />
            <g opacity={siluet}>
              <Kucing y={1010} skala={1.15} />
            </g>
          </g>

          {/* Garis penghubung antar-anak tangga, digambar sebelum labelnya —
              yang menaiki tangga mata penonton, dan ia butuh pegangan. */}
          {ANAK_TANGGA.slice(0, -1).map((a, i) => {
            const b = ANAK_TANGGA[i + 1];
            if (!b) return null;
            return (
              <line
                key={a.teks}
                x1={a.x + 118}
                y1={a.y - 20}
                x2={b.x - 118}
                y2={b.y + 20}
                stroke="var(--ink-2)"
                strokeWidth={6}
                strokeLinecap="round"
                opacity={anak(i + 1)}
              />
            );
          })}

          {ANAK_TANGGA.map((a, i) => (
            <g key={a.teks} opacity={anak(i)}>
              <LabelTahap x={a.x} y={a.y} teks={a.teks} nyala={i === 2 ? 1 : 0} />
            </g>
          ))}
        </svg>
      </div>
    </Scene>
  );
};
