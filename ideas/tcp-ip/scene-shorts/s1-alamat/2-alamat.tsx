/* T18-S1 · scene 2 · alamat
   VO:        2-alamat-vo.md
   Direction: 2-alamat-direction.md

   DUA KEPUTUSAN:

   1. Kotaknya tidak pindah dan tidak diganti — benda yang sama dengan scene 1,
      cuma labelnya yang berubah. Kotak yang muncul ulang terbaca sebagai
      kiriman kedua, dan seluruh Short ini soal satu kiriman.

   2. LATAR berubah duluan, bendanya belakangan. Perpindahan dunia nyata →
      jaringan dipecah dua supaya scene 3 punya kejutannya sendiri.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kotak } from "../../panggung-jaringan";
import { JALUR_X, JaringanTegak, TeksLayar, W, Y_BAWAH } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "alamat";

const B_TENTU = beat(ID, 0); // "Tentu saja alamat tujuan."
const B_INTERNET = beat(ID, 1); // "Di internet, konsepnya juga seperti itu."

const Y_KOTAK = 900;

export const Alamat: React.FC = () => {
  const d = useDetik();

  /* Label ditempel — datang dari samping, bukan memudar di tempat. */
  const label = t(d, { mulai: B_TENTU + 0.2, durasi: 0.5, dari: 260, ke: 0, ease: E.backOut(1.2) });
  const labelAda = t(d, { mulai: B_TENTU + 0.2, durasi: 0.3, dari: 0, ke: 1 });

  const jaring = t(d, { mulai: B_INTERNET, durasi: 1.0, dari: 0, ke: 1, ease: E.power1out });
  const teks = masuk(d, { mulai: B_TENTU + 0.1, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Jalur lurus warisan scene 1, memudar jadi jalur jaringan. */}
          <g opacity={1 - jaring}>
            {JALUR_X.map((x) => (
              <line
                key={x}
                x1={W / 2}
                y1={Y_KOTAK + 120}
                x2={x}
                y2={Y_BAWAH}
                stroke="var(--line)"
                strokeWidth={6}
                strokeLinecap="round"
              />
            ))}
          </g>
          <JaringanTegak luas={jaring} opacity={jaring} />

          <Kotak x={W / 2} y={Y_KOTAK} skala={2.0} />

          {/* Label yang ditempel — di atas badan kotak, bukan menggantikannya. */}
          <g opacity={labelAda} transform={`translate(${label} 0)`}>
            <rect
              x={W / 2 - 130}
              y={Y_KOTAK - 34}
              width={260}
              height={72}
              rx={8}
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth={4}
            />
            <text
              x={W / 2}
              y={Y_KOTAK + 18}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={40}
              fontWeight={700}
              fill="var(--ink-0)"
            >
              TO: B
            </text>
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["Butuh alamat."]} y={330} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
