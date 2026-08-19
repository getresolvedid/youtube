/* T19-S12 · scene 2 · jendela — ketegangan
   VO:        2-jendela-vo.md
   Direction: 2-jendela-direction.md

   SAPUANNYA SEPETAK DEMI SEPETAK — posisi jendela `Math.floor` dari detik,
   melompat per petak. Luncuran mulus menghapus justru hal yang dijelaskan:
   bahwa ia membaca daerah kecil satu per satu.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { GAMBAR, Kisi, N_KISI } from "../panggung-seri";
import { beat } from "./timing.gen";

/** Kisi gambar utama — koordinatnya sama di keempat scene pertama. */
const SEL = 74;
const X0 = W / 2 - (N_KISI * SEL) / 2;
const Y0 = 620;

const ID = "jendela";

const B_BUKAN = beat(ID, 0); // "Bukan tiap titik dibaca sendiri-sendiri."
const B_SAPU = beat(ID, 1); // "Satu jendela kecil menyapu gambarnya, sepetak demi sepetak."

/** Satu petak per 0,16 dtk. */
const PER_PETAK = 0.16;
const LANGKAH = N_KISI - 2;

export const Jendela: React.FC = () => {
  const d = useDetik();

  const satu = t(d, { mulai: B_BUKAN + 0.15, durasi: 0.25, dari: 0, ke: 1 });
  const batal = t(d, { mulai: B_BUKAN + 0.7, durasi: 0.25, dari: 0, ke: 1 });

  const jalan = Math.max(0, (d - B_SAPU) / PER_PETAK);
  const n = Math.min(LANGKAH * LANGKAH - 1, Math.floor(jalan));
  const jx = n % LANGKAH;
  const jy = Math.floor(n / LANGKAH);
  const sapu = t(d, { mulai: B_SAPU, durasi: 0.2, dari: 0, ke: 1 });

  const teks = masuk(d, { mulai: B_SAPU + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Kisi x={X0} y={Y0} n={N_KISI} sel={SEL} isi={GAMBAR} />

          {/* Satu sel sendirian — cara yang SALAH, lalu dibatalkan. */}
          <g opacity={satu * (1 - batal)}>
            <rect
              x={X0 + 3 * SEL - 4}
              y={Y0 + 3 * SEL - 4}
              width={SEL + 4}
              height={SEL + 4}
              rx={6}
              fill="none"
              stroke="var(--bad)"
              strokeWidth={5}
            />
          </g>

          {/* Jendela 3x3 yang menyapu. */}
          <rect
            x={X0 + jx * SEL - 5}
            y={Y0 + jy * SEL - 5}
            width={SEL * 3 + 2}
            height={SEL * 3 + 2}
            rx={8}
            fill="var(--accent-soft)"
            stroke="var(--accent-ink)"
            strokeWidth={6}
            opacity={sapu}
          />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["SEPETAK", "DEMI SEPETAK"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
