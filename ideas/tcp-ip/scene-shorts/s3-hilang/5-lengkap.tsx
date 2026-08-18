/* T18-S3 · scene 5 · lengkap
   VO:        5-lengkap-vo.md
   Direction: 5-lengkap-direction.md

   DUA KEPUTUSAN:

   1. Potongan yang kembali adalah potongan YANG SAMA — nomor sama, bentuk sama.
      Kalau ia digambar beda, yang terbaca kiriman pengganti, dan itu keliru:
      yang dikirim ulang persis bagian yang sama.

   2. Lubangnya yang menutup, bukan barisan yang dibangun ulang. Keempat slot
      lain diam total; satu-satunya yang berubah di layar adalah lubang itu
      terisi. Barisan yang seluruhnya bergerak mengaburkan apa yang diperbaiki.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
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
  slotX,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "lengkap";
const B_SETELAH = beat(ID, 0); // "Setelah bagian yang hilang diterima…"

const HILANG = 3;

export const Lengkap: React.FC = () => {
  const d = useDetik();

  const turun = t(d, { mulai: B_SETELAH + 0.2, durasi: 1.6, dari: 0, ke: 1, ease: E.power1out });
  /* Bergeser ke slotnya di seperempat terakhir turunnya. */
  const geser = Math.min(1, Math.max(0, (turun - 0.75) * 4));
  const penuh = turun > 0.98;

  const denyut = tPP(d, { mulai: B_SETELAH + 2.0, durasi: 0.7, dari: 1, ke: 1.08 });
  const teks = masuk(d, { mulai: B_SETELAH + 2.0, durasi: 0.45, geser: 20 });

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

            if (nomor === HILANG) {
              return (
                <g key={nomor}>
                  {/* Lubang, sampai ia terisi. */}
                  <g opacity={penuh ? 0 : 1}>
                    <SlotKosong i={i} warna="var(--bad)" />
                  </g>
                  {/* Potongan YANG SAMA, kembali dari atas. */}
                  <Paket
                    x={JALUR_UTAMA + (slotX(i) - JALUR_UTAMA) * geser}
                    y={-160 + (Y_SLOT + 160) * turun}
                    nomor={nomor}
                    skala={0.9 * (penuh ? denyut : 1)}
                    warna={penuh ? "ok" : "ulang"}
                  />
                </g>
              );
            }

            /* Keempat slot lain DIAM TOTAL. */
            return (
              <Paket
                key={nomor}
                x={slotX(i)}
                y={Y_SLOT}
                nomor={nomor}
                skala={0.9 * (penuh ? denyut : 1)}
                warna="ok"
              />
            );
          })}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["Lengkap."]} y={300} warna="var(--ok)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
