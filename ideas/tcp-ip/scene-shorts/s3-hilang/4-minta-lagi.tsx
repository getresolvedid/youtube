/* T18-S3 · scene 4 · minta-lagi — payoff
   VO:        4-minta-lagi-vo.md
   Direction: 4-minta-lagi-direction.md

   Satu-satunya gerakan ke ATAS di seluruh Short ini.

   TIGA KEPUTUSAN:

   1. Arah naik itu miliknya sendiri. Sebelas beat sebelum ini semuanya turun;
      justru karena itu satu gerakan naik langsung terbaca sebagai "sesuatu yang
      kembali", tanpa perlu label.

   2. Permintaannya berangkat DARI LUBANG, bukan dari tepi bawah frame. Asalnya
      yang membuat penonton tahu apa yang diminta.

   3. Bentuknya lingkaran, bukan kotak bernomor. Kotak bernomor yang naik akan
      terbaca sebagai potongan yang salah arah.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-jaringan";
import {
  JALUR_UTAMA,
  JaringanTegak,
  N_SLOT,
  SlotKosong,
  TeksLayar,
  W,
  Y_SLOT,
  kamera,
  slotX,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "minta-lagi";

const B_LENGKAP = beat(ID, 0); // "TCP membantu memastikan data diterima secara lengkap…"
const B_MINTA = beat(ID, 1); // "Jika sebuah bagian yang dibutuhkan tidak diterima…"

const HILANG = 3;

export const MintaLagi: React.FC = () => {
  const d = useDetik();

  const mundur = t(d, { mulai: B_LENGKAP, durasi: 0.7, dari: 1.25, ke: 1, ease: E.power2out });
  const terang = t(d, { mulai: B_LENGKAP, durasi: 0.7, dari: 0.3, ke: 1 });

  /* NAIK — arah ini miliknya sendiri di seluruh Short. */
  const naik = t(d, { mulai: B_MINTA + 0.3, durasi: 1.4, dari: 0, ke: 1, ease: E.power1out });

  const teks1 = masuk(d, { mulai: B_LENGKAP + 0.2, durasi: 0.45, geser: 20 });
  const teks2 = masuk(d, { mulai: B_MINTA + 0.2, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(mundur, slotX(HILANG - 1), Y_SLOT)}>
            <JaringanTegak jalur={[1]} luas={1} />

            {Array.from({ length: N_SLOT }, (_, i) => {
              const nomor = i + 1;
              if (nomor === HILANG) return <SlotKosong key={nomor} i={i} warna="var(--bad)" />;
              return (
                <g key={nomor} opacity={terang}>
                  <Paket x={slotX(i)} y={Y_SLOT} nomor={nomor} skala={0.9} warna="ok" />
                </g>
              );
            })}

            {/* Permintaan: lingkaran, bukan kotak bernomor — dan ia naik. */}
            {naik > 0 && naik < 1 && (
              <g>
                <circle
                  cx={slotX(HILANG - 1) + (JALUR_UTAMA - slotX(HILANG - 1)) * Math.min(1, naik * 3)}
                  cy={Y_SLOT - (Y_SLOT + 160) * naik}
                  r={26}
                  fill="var(--accent)"
                />
                <text
                  x={slotX(HILANG - 1) + (JALUR_UTAMA - slotX(HILANG - 1)) * Math.min(1, naik * 3)}
                  y={Y_SLOT - (Y_SLOT + 160) * naik - 56}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize={34}
                  fill="var(--accent)"
                >
                  minta 3
                </text>
              </g>
            )}
          </g>

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["Lengkap dan urut."]} y={300} />
          </g>
          <g style={{ opacity: teks2.opacity, transform: teks2.transform }}>
            <TeksLayar baris={["Minta lagi", "yang hilang."]} y={300} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
