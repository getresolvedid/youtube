/* T14-S1 · scene 1 · dari-belakang — beat hook, 3,93 dtk
   Direction: 01-dari-belakang-direction.md
   VO:        01-dari-belakang-vo.md

   Frame pertama sudah bergerak, dan yang bergerak adalah PENANDA yang masuk
   dari kanan. Arah masuknya mengajarkan klaimnya sebelum VO selesai
   mengucapkannya — penanda yang masuk dari kiri membatalkan kalimatnya di detik
   yang sama.

   Nama dan bilah alamatnya TIDAK dianimasikan masuk: keduanya sudah ada sebelum
   penonton sempat berkedip. Di Short, tiga per sepuluh detik yang dipakai untuk
   memunculkan latar adalah tiga per sepuluh detik yang hilang dari hook-nya.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksAtas } from "../teks-atas";
import {
  BilahAlamat,
  NamaSitusS,
  PenandaS,
  VIEWBOX,
  X_PENANDA_LUAR,
  xPotonganS,
} from "../tangga-tegak";

/** Dipakai juga oleh 09-loop: di situlah loop Short ini menyambung, jadi
 *  gerakannya harus sama persis — bukan mirip. */
export const MASUK_PENANDA = { mulai: 0.25, durasi: 0.7 };

export const DariBelakang: React.FC = () => {
  const d = useDetik();

  const masukPen = t(d, {
    ...MASUK_PENANDA,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const xPen = X_PENANDA_LUAR + (xPotonganS(2) - X_PENANDA_LUAR) * masukPen;

  return (
    <Scene tengah={false}>
      <TeksAtas>Nama situs itu dibaca dari belakang.</TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <BilahAlamat />
        <NamaSitusS />
        <PenandaS x={xPen} opacity={masukPen} />
      </svg>
    </Scene>
  );
};
