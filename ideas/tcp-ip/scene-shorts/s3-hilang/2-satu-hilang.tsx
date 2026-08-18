/* T18-S3 · scene 2 · satu-hilang — ketegangan
   VO:        2-satu-hilang-vo.md
   Direction: 2-satu-hilang-direction.md

   Ritmenya yang bekerja: tiga kedatangan datar lalu satu yang tidak.

   DUA KEPUTUSAN:

   1. Potongan 3 MEMUDAR — tanpa getar, tanpa skala mengecil. Ledakan terbaca
      sebagai kerusakan luar biasa; hilangnya potongan itu peristiwa biasa.

   2. Yang bekerja tahap 4, bukan tahap 3. Saat 4 dan 5 masuk dengan selamat,
      lubang nomor 3 jadi satu-satunya yang tersisa — dan mata menemukannya
      sendiri. Karena itu teks layarnya jatuh di tahap 4, bukan lebih awal.
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
  Y_ATAS,
  Y_SLOT,
  slotX,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "satu-hilang";

/** Satu beat per potongan; nomor 3 punya beat-nya sendiri, dan itu ritmenya. */
const B = [beat(ID, 0), beat(ID, 1), beat(ID, 2), beat(ID, 3)] as const;

/** Beat tempat tiap potongan bergerak. 4 dan 5 berbagi beat terakhir. */
const MULAI = [B[0], B[1], B[2], B[3], B[3] + 0.5] as const;
const HILANG = 3;

export const SatuHilang: React.FC = () => {
  const d = useDetik();

  const jalan = (i: number) =>
    t(d, { mulai: MULAI[i] ?? 0, durasi: 1.0, dari: 0, ke: 1, ease: E.power1out });

  /* Nomor 3 memudar di tengah jalur. */
  const padam = t(d, { mulai: B[2] + 0.45, durasi: 0.7, dari: 1, ke: 0, ease: E.power1in });

  const teks = masuk(d, { mulai: B[3] + 0.9, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak jalur={[1]} luas={1} />

          {Array.from({ length: N_SLOT }, (_, i) => {
            const nomor = i + 1;
            const u = jalan(i);
            const terisi = nomor !== HILANG && u > 0.98;

            return (
              <g key={nomor}>
                {/* Slot: putus-putus selama kosong, merah untuk yang hilang. */}
                <g opacity={terisi ? 0 : 1}>
                  <SlotKosong
                    i={i}
                    warna={nomor === HILANG && padam < 0.5 ? "var(--bad)" : "var(--line)"}
                  />
                </g>

                {/* Potongan: turun dari jalur ke slotnya. */}
                {nomor === HILANG ? (
                  <Paket
                    x={JALUR_UTAMA}
                    y={Y_ATAS + (Y_SLOT - Y_ATAS) * Math.min(u, 0.55)}
                    nomor={nomor}
                    skala={0.9}
                    opacity={padam}
                  />
                ) : (
                  <Paket
                    x={JALUR_UTAMA + (slotX(i) - JALUR_UTAMA) * u}
                    y={Y_ATAS + (Y_SLOT - Y_ATAS) * u}
                    nomor={nomor}
                    skala={0.9}
                    warna={terisi ? "ok" : "biasa"}
                    opacity={u > 0 ? 1 : 0}
                  />
                )}
              </g>
            );
          })}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["Satu tidak", "sampai."]} y={300} warna="var(--bad)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
