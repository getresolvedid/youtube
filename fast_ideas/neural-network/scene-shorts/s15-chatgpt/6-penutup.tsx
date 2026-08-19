/* T19-S15 · scene 6 · penutup — penutup seri
   VO:        6-penutup-vo.md
   Direction: 6-penutup-direction.md

   TIDAK ADA GANTUNGAN di sini — ini episode terakhir seri. Yang menutupnya
   jalur lima belas titik itu, bukan kalimat ajakan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { beat } from "./timing.gen";

const ID = "penutup";

const B_PETA = beat(ID, 0); // "Dan sekarang kamu punya petanya."

/** Lima belas titik — satu per episode, tiga baris lima. Titik terakhir menyala:
 *  ia episode yang sedang ditonton. */
const TITIK = Array.from({ length: 15 }, (_, i) => ({
  x: 190 + (i % 5) * 175,
  y: 860 + Math.floor(i / 5) * 130,
}));

export const Penutup: React.FC = () => {
  const d = useDetik();

  const titik = (i: number): number =>
    t(d, { mulai: 0.1 + i * 0.045, durasi: 0.25, dari: 0, ke: 1, ease: E.expoOut });
  const judul = masuk(d, { mulai: B_PETA + 0.4, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {TITIK.slice(0, -1).map((p, i) => {
            const q = TITIK[i + 1];
            if (!q) return null;
            return (
              <line
                key={`${p.x}-${p.y}`}
                x1={p.x}
                y1={p.y}
                x2={q.x}
                y2={q.y}
                stroke="var(--ink-2)"
                strokeWidth={4}
                strokeLinecap="round"
                opacity={0.5 * titik(i + 1)}
              />
            );
          })}

          {TITIK.map((p, i) => (
            <circle
              key={`${p.x}-${p.y}`}
              cx={p.x}
              cy={p.y}
              r={18}
              fill={i === 14 ? "var(--accent)" : "var(--bg-elev)"}
              stroke="var(--accent-ink)"
              strokeWidth={4}
              opacity={titik(i)}
            />
          ))}

          <g style={{ opacity: judul.opacity, transform: judul.transform }}>
            <TeksLayar baris={["NEURAL NETWORK", "DARI NOL"]} y={1330} ukuran={54} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
