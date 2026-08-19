/* T19-S2 · scene 4 · keluaran — payoff
   VO:        4-keluaran-vo.md
   Direction: 4-keluaran-direction.md

   SATU KEPUTUSAN YANG MENGIKAT: tidak ada ambang dan tidak ada "menyala" di
   sini. Peta Episode 02 berhenti di keluaran; yang mengubah bentuk hasil adalah
   fungsi aktivasi, dan itu Episode 04. Menaruhnya di sini membuat Episode 04
   kehilangan isinya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Denyut, TeksLayar, W } from "../panggung-nn";
import {
  NILAI,
  PUSAT,
  R_NEURON,
  SambunganMasuk,
  SimpulBesar,
  TEBAL,
  angka,
} from "../panggung-neuron";
import { beat } from "./timing.gen";

const ID = "keluaran";

const B_JADI = beat(ID, 0); // "Angka itulah yang jadi keluaran simpulnya."
const B_BERANGKAT = beat(ID, 1); // "Ia berangkat ke lapis berikutnya."

/** Ke mana denyut keluaran pergi. Di bawah kotak aman memang boleh — yang
 *  penting angkanya sendiri tetap di dalam. */
const Y_TUJUAN = 1440;

export const Keluaran: React.FC = () => {
  const d = useDetik();

  /* Angka turun ke tepi bawah simpul: dari isi jadi keluaran. */
  const turun = t(d, { mulai: B_JADI + 0.1, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });
  const y = PUSAT.y + 26 + (R_NEURON + 40) * turun;

  const berangkat = t(d, { mulai: B_BERANGKAT, durasi: 0.9, dari: 0, ke: 1, ease: E.sineInOut });
  const denyutOn = t(d, { mulai: B_BERANGKAT, durasi: 0.15, dari: 0, ke: 1 });

  const teks = masuk(d, { mulai: B_JADI + 0.3, durasi: 0.4, geser: 18 });

  const yMulai = PUSAT.y + R_NEURON + 60;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SambunganMasuk tebal={(i) => TEBAL[i] ?? 1} opacity={0.55} />
          <SimpulBesar />

          {/* Sambungan keluar baru digambar di scene ini — sebelum ini simpulnya
              belum punya apa pun untuk dikirim. */}
          <line
            x1={PUSAT.x}
            y1={PUSAT.y + R_NEURON}
            x2={PUSAT.x}
            y2={Y_TUJUAN + 60}
            stroke="var(--ink-2)"
            strokeWidth={8}
            strokeLinecap="round"
            opacity={0.55 * berangkat}
          />

          <text
            x={PUSAT.x}
            y={y}
            fontSize={92 - 24 * turun}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill="var(--ink-0)"
            textAnchor="middle"
          >
            {angka(NILAI)}
          </text>

          <Denyut y={yMulai + (Y_TUJUAN - yMulai) * berangkat} opacity={denyutOn} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["KELUARAN"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
