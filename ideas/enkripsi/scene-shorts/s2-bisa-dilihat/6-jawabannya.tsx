/* T17-S2 · scene 6 · jawabannya — penutup
   VO:        6-jawabannya-vo.md
   Direction: 6-jawabannya-direction.md

   Scene terpendek di seluruh seri, dan itu tugasnya: BERHENTI TEPAT SETELAH
   NAMANYA JATUH. Arahan user: "Do NOT explain how encryption works yet."

   Tidak ada lambang, tidak ada kotak proses, tidak ada perubahan huruf —
   semuanya milik Short 3.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-short";
import { BADAN, PUSAT, SENGKANG } from "./5-pertanyaan";
import { beat } from "./timing.gen";

const ID = "jawabannya";
const B_NAMA = beat(ID, 0);

export const Jawabannya: React.FC = () => {
  const d = useDetik();

  /* Garis → pejal: dua bentuk yang bertukar DI TITIK YANG SAMA terbaca sebagai
     satu benda yang mengeras, bukan sebagai dua benda. */
  const pejal = t(d, { mulai: 0.1, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  /* Sengkang turun; BADANNYA TIDAK BERGERAK — gembok yang seluruhnya melompat
     terbaca sebagai gembok yang dipasang, bukan yang menutup. */
  const tutup = t(d, { mulai: 0.25, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  const nama = masuk(d, { mulai: B_NAMA + 0.7, durasi: 0.5, geser: 20 });
  const cta = t(d, { mulai: B_NAMA + 1.2, durasi: 0.4, dari: 0, ke: 0.75 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Kalimatnya MASIH TERBACA di dalam gembok saat ia menutup — gembok
              yang menutup di ruang kosong tidak menutup apa-apa. */}
          <text
            x={PUSAT.x}
            y={PUSAT.y + 24}
            fontSize={56}
            fontFamily="var(--font-display)"
            fontWeight={800}
            fill="var(--ink-0)"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity={1 - 0.55 * pejal}
          >
            HALO, APA KABAR?
          </text>

          <g data-tumpang="sengaja">
            {/* garis, memudar */}
            <g
              fill="none"
              stroke="var(--accent-ink)"
              strokeWidth={9}
              strokeLinecap="round"
              opacity={1 - pejal}
            >
              <rect
                x={BADAN.x}
                y={BADAN.y}
                width={BADAN.w}
                height={BADAN.h}
                rx={18}
              />
              <path d={SENGKANG} />
            </g>

            {/* pejal, muncul di titik yang sama */}
            <g opacity={pejal}>
              <path
                d={SENGKANG}
                fill="none"
                stroke="var(--accent-ink)"
                strokeWidth={16}
                strokeLinecap="round"
                transform={`translate(0 ${-26 * (1 - tutup)})`}
              />
              <rect
                x={BADAN.x}
                y={BADAN.y}
                width={BADAN.w}
                height={BADAN.h}
                rx={18}
                fill="var(--accent-ink)"
              />
            </g>
          </g>

          <TeksLayar
            baris={["ENKRIPSI"]}
            y={330}
            opacity={nama.opacity}
            transform={nama.transform}
            warna="var(--accent-ink)"
            ukuran={78}
          />

          <text
            x={W / 2}
            y={1745}
            fontSize={34}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill="var(--ink-1)"
            textAnchor="middle"
            letterSpacing={2}
            opacity={cta}
          >
            Lanjut ke Short 3
          </text>
        </svg>
      </div>
    </Scene>
  );
};
