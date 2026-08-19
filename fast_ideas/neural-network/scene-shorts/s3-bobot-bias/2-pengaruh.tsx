/* T19-S3 · scene 2 · pengaruh — ketegangan
   VO:        2-pengaruh-vo.md
   Direction: 2-pengaruh-direction.md

   DUA KEPUTUSAN:

   1. Ketiga denyut berangkat dari SATU tween yang sama. Beda cepat akan terbaca
      sebagai urutan ("yang ini duluan"), padahal yang dibedakan besarnya.

   2. Besar denyut dihitung dari `TEBAL` — angka yang sama yang menggambar
      garisnya. Tiga ukuran yang dipilih terpisah akan meleset satu sama lain
      begitu salah satunya diubah.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import {
  SambunganMasuk,
  SimpulBesar,
  TEBAL,
  X_MASUK,
  Y_MASUK,
  sentuh,
} from "../panggung-neuron";
import { beat } from "./timing.gen";

const ID = "pengaruh";

const B_KUAT = beat(ID, 0); // "Kuat sambungannya menentukan seberapa besar pengaruh satu masukan."
const B_LEMAH = beat(ID, 1); // "Yang lemah nyaris tidak terasa."

export const Pengaruh: React.FC = () => {
  const d = useDetik();

  const maju = t(d, { mulai: B_KUAT + 0.2, durasi: 1.3, dari: 0, ke: 1, ease: E.sineInOut });
  const tampil = t(d, { mulai: B_KUAT + 0.15, durasi: 0.2, dari: 0, ke: 1 });

  /* Yang tipis menyusut habis menjelang tiba — bukan menghilang mendadak. */
  const susut = t(d, { mulai: B_LEMAH, durasi: 0.5, dari: 1, ke: 0.12 });

  const teks = masuk(d, { mulai: B_KUAT + 0.4, durasi: 0.4, geser: 18 });

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

          {X_MASUK.map((x0, i) => {
            const u = sentuh(i);
            const kuat = TEBAL[i] ?? 1;
            const r = 14 + 30 * kuat * (kuat < 0.5 ? susut : 1);
            return (
              <g key={x0} opacity={tampil} aria-hidden>
                <circle
                  cx={x0 + (u.x - x0) * maju}
                  cy={Y_MASUK + (u.y - Y_MASUK) * maju}
                  r={r + 14}
                  fill="var(--accent-soft)"
                />
                <circle
                  cx={x0 + (u.x - x0) * maju}
                  cy={Y_MASUK + (u.y - Y_MASUK) * maju}
                  r={r}
                  fill="var(--accent-ink)"
                />
              </g>
            );
          })}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["PENGARUH"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
