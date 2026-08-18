/* T17-S1 · scene 3 · masuk-jaringan
   VO:        3-masuk-jaringan-vo.md
   Direction: 3-masuk-jaringan-direction.md

   PANGGUNG YANG DIBANGUN DI SINI DIPAKAI ULANG APA ADANYA DI SHORT 2, 3, DAN 4.
   Itu bukan penghematan: seluruh perbandingan seri ini — kalimat terbaca di
   Short 2 vs lambang di Short 3 — bertumpu pada jaringannya terlihat identik.
   Karena itu tidak ada satu koordinat pun di berkas ini; semuanya dari
   ../panggung-short.tsx.

   NYALA SIMPUL DITURUNKAN DARI POSISI PAKET, bukan dari waktu: simpul menyala
   karena ADA YANG LEWAT, jadi nyalanya tidak pernah meleset saat satu kalimat VO
   berubah dan seluruh timing bergeser.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-kiriman";
import {
  JALUR,
  JaringanTegak,
  TeksLayar,
  W,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "masuk-jaringan";
const B_MASUK = beat(ID, 0);

export const MasukJaringan: React.FC = () => {
  const d = useDetik();

  /* Satu nilai untuk seluruh lapisan latar — mereka datang sebagai satu
     lapisan, bukan sembilan benda yang masing-masing punya jadwal. */
  const luas = t(d, {
    mulai: B_MASUK + 1.0,
    durasi: 1.6,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });

  const jalur = t(d, { mulai: 0.1, durasi: 0.8, dari: 0, ke: 1, ease: E.expoOut });

  /* Paket masuk dari atas frame dan berhenti di simpul kedua — sisanya ditempuh
     di scene 4. */
  const maju = t(d, {
    mulai: 0.3,
    durasi: 3.4,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });
  const yPaket = -80 + (JALUR.atas + 130 - -80) * maju;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={jalur}>
            <JaringanTegak luas={luas} nyala={nyalaSimpul(yPaket)} />
          </g>

          <Paket x={JALUR.x} y={yPaket} skala={1.4} />

          <TeksLayar baris={["Lewat internet."]} y={300} opacity={luas} />
        </svg>
      </div>
    </Scene>
  );
};
