/* T01-S2 · scene 6 · penuh — beat bukti 3 dari 4, 5,97 dtk
   Direction: 06-penuh-direction.md
   VO:        06-penuh-vo.md

   Balik arah: keadaan tempat mitos di scene 1 sebenarnya BENAR mulai dibangun
   di sini. Tanpa scene ini Short-nya tidak jujur, dan scene 9 tidak punya
   apa-apa untuk direkomendasikan.

   MEJANYA WAJIB KEMBALI KE LEBAR SEMULA. Kalau penuhnya terjadi di meja yang
   sudah dilebarkan, yang terbaca adalah "meja lebar pun tetap penuh" —
   kebalikan dari maksudnya.

   Berkas yang menggantung TIDAK boleh jatuh di scene ini. Menggantungnya itu
   yang membuat scene 7 terbaca sebagai jalan keluar, bukan kejadian baru.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Berkas,
  Gudang,
  MEJA,
  Meja,
  TeksAtas,
  W_PENUH,
  X_PENUH,
  X_TENGAH,
} from "../meja-kerja";
import { beat } from "./timing.gen";

const ID = "penuh";

const T_SUSUT = 0.05;
const T_ISI = beat(ID, 0) + 0.3;
const T_GANTUNG = beat(ID, 1);

/** Stagger memendek — berkas berdatangan makin bertubi. */
const JEDA = [0, 0.14, 0.25, 0.34, 0.42, 0.49, 0.55, 0.6];

export const Penuh: React.FC = () => {
  const d = useDetik();

  const lebar = t(d, {
    mulai: T_SUSUT,
    durasi: 0.3,
    dari: MEJA.wLebar,
    ke: MEJA.w,
    ease: E.power2out,
  });

  return (
    <Scene tengah={false}>
      <TeksAtas
        {...masuk(d, { mulai: 0.02, durasi: 0.35 })}
        warna={d < T_GANTUNG ? "var(--warn)" : "var(--ink-0)"}
      >
        {d < T_GANTUNG ? "penuh" : "mau ditaruh di mana?"}
      </TeksAtas>

      <Meja lebar={lebar} />

      {X_PENUH.map((x, i) => {
        const m = t(d, {
          mulai: T_ISI + (JEDA[i] ?? 0),
          durasi: 0.3,
          dari: 0,
          ke: 1,
          ease: E.power2out,
        });
        return (
          <div key={x} style={{ opacity: Math.min(1, m * 2) }}>
            <Berkas x={x} w={W_PENUH} angkat={(1 - m) * 70} />
          </div>
        );
      })}

      {/* Berkas baru: melayang, bergoyang kecil dan teredam di tempat. Bukan
          berputar-putar — yang harus terbaca "tidak menemukan tempat". */}
      <div
        style={{
          opacity: t(d, { mulai: T_GANTUNG, durasi: 0.25, dari: 0, ke: 1 }),
        }}
      >
        <Berkas
          x={X_TENGAH}
          w={W_PENUH}
          terang
          angkat={
            210 +
            tPP(d, {
              mulai: T_GANTUNG + 0.25,
              durasi: 1.4,
              dari: 0,
              ke: 12,
              ease: E.sineInOut,
            })
          }
        />
      </div>

      <Gudang opacity={0.9} />
    </Scene>
  );
};
