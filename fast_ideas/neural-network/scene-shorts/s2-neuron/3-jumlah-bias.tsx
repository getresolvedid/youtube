/* T19-S2 · scene 3 · jumlah-bias — payoff
   VO:        3-jumlah-bias-vo.md
   Direction: 3-jumlah-bias-direction.md

   DUA KEPUTUSAN:

   1. Bias masuk DARI SAMPING, bukan lewat sambungan. Ia bukan masukan keempat —
      kalau ia datang seperti yang lain, seluruh bedanya hilang.

   2. Angkanya dihitung, tidak diketik: `NILAI = JUMLAH + BIAS` di
      panggung-neuron. Penonton yang menghitung sendiri dan mendapati jumlahnya
      tidak cocok berhenti mempercayai seluruh Short.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import {
  AngkaJalan,
  HASIL,
  JUMLAH,
  NILAI,
  PUSAT,
  PilBias,
  SambunganMasuk,
  SimpulBesar,
  TEBAL,
  angka,
} from "../panggung-neuron";
import { beat } from "./timing.gen";

const ID = "jumlah-bias";

const B_GABUNG = beat(ID, 0); // "Masukan yang sudah diberi bobot itu digabung jadi satu."
const B_BIAS = beat(ID, 1); // "Lalu ditambah satu angka penggeser."

export const JumlahBias: React.FC = () => {
  const d = useDetik();

  const kePusat = t(d, {
    mulai: B_GABUNG + 0.15,
    durasi: 0.5,
    dari: 0.55,
    ke: 1.32,
    ease: E.power2out,
  });
  const lebur = t(d, { mulai: B_GABUNG + 0.6, durasi: 0.25, dari: 1, ke: 0 });
  const jumlah = t(d, { mulai: B_GABUNG + 0.62, durasi: 0.4, dari: 0, ke: 1, ease: E.backOut(1.1) });

  /* Bias meluncur masuk lalu lenyap ke dalam angkanya — masuknya yang membuat
     "ditambahkan" terbaca, bukan angka yang tiba-tiba berubah sendiri. */
  const masukBias = t(d, { mulai: B_BIAS, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });
  const leburBias = t(d, { mulai: B_BIAS + 0.55, durasi: 0.25, dari: 1, ke: 0 });
  const jadiNilai = t(d, { mulai: B_BIAS + 0.62, durasi: 0.3, dari: 0, ke: 1 });

  const teks = masuk(d, { mulai: B_BIAS + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SambunganMasuk tebal={(i) => TEBAL[i] ?? 1} />
          <SimpulBesar />

          {HASIL.map((hasil, i) => (
            <AngkaJalan
              key={hasil + i}
              i={i}
              maju={kePusat}
              nilai={hasil}
              skala={0.55 + 0.9 * hasil}
              opacity={lebur}
              warna="var(--accent-ink)"
            />
          ))}

          <text
            x={PUSAT.x}
            y={PUSAT.y + 26}
            fontSize={92 * jumlah}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill="var(--ink-0)"
            textAnchor="middle"
            opacity={jumlah}
          >
            {jadiNilai > 0.5 ? angka(NILAI) : angka(JUMLAH)}
          </text>

          <PilBias
            x={PUSAT.x + 430 - 250 * masukBias}
            y={PUSAT.y + 250}
            opacity={masukBias * leburBias}
          />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DIJUMLAH", "+ PENGGESER"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
