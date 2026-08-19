/* T19-S9 · scene 4 · langkah-kecil — payoff kedua
   VO:        4-langkah-kecil-vo.md
   Direction: 4-langkah-kecil-direction.md

   SATU KEPUTUSAN: langkahnya MEMENDEK mendekati dasar, karena lerengnya makin
   landai. Itu benar secara mekanisme, dan sekaligus yang membuat bola berhenti
   tanpa direm — langkah sama panjang sampai dasar akan terbaca sebagai bola
   yang dihentikan tangan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import {
  Bola,
  LANGKAH,
  Lereng,
  Singgung,
  SumbuMeleset,
  Y_DASAR,
  xLereng,
  yLereng,
} from "../panggung-lereng";
import { beat, cari } from "./timing.gen";

const ID = "langkah-kecil";

const B_LANGKAH = beat(ID, 0); // "Langkah kecil yang diulang berkali-kali bisa menurunkan melesetnya."
const DUR = cari(ID).durasi;

/** Mulai dari tempat scene 3 berhenti, bukan dari puncak. */
const U_MULAI = 0.72;
const SISA = [0.46, 0.26, 0.12, 0.03] as const;

const MULAI = B_LANGKAH + 0.15;
const SATU = Math.max(0.3, (DUR - MULAI - 0.3) / SISA.length);

export const LangkahKecil: React.FC = () => {
  const d = useDetik();

  /* Posisi bola: empat langkah berurutan, murni fungsi dari detik — tidak ada
     state yang dibawa antar-langkah (CLAUDE.md § Deterministik). */
  const u = SISA.reduce((posisi, tujuan, i) => {
    const dari = i === 0 ? U_MULAI : (SISA[i - 1] ?? U_MULAI);
    return (
      posisi +
      (tujuan - dari) *
        t(d, { mulai: MULAI + i * SATU, durasi: SATU * 0.68, dari: 0, ke: 1, ease: E.power2out })
    );
  }, U_MULAI);

  const teks = masuk(d, { mulai: B_LANGKAH, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SumbuMeleset />
          <Lereng />

          {/* Penanda tinggi meleset di sumbu — ia memendek bersama bolanya, dan
              itulah bukti bahwa "melesetnya turun" bukan cuma kalimat VO. */}
          <line
            x1={150}
            y1={Y_DASAR}
            x2={150}
            y2={yLereng(u)}
            stroke="var(--bad)"
            strokeWidth={12}
            strokeLinecap="round"
            opacity={0.9}
          />
          <line
            x1={128}
            y1={yLereng(u)}
            x2={xLereng(u)}
            y2={yLereng(u)}
            stroke="var(--line)"
            strokeWidth={4}
            strokeDasharray="10 12"
          />

          <Singgung u={u} />
          <Bola u={u} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["LANGKAH KECIL", "BERKALI-KALI"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
