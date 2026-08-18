/* T17-S1 · scene 4 · perjalanan
   VO:        4-perjalanan-vo.md
   Direction: 4-perjalanan-direction.md

   Satu hal yang ditunjukkan, dan cuma satu yang boleh: IA BERJALAN, TIDAK
   MELOMPAT. Paketnya turun dengan `E.linear` dan tidak pernah melambat di simpul
   mana pun — yang melambat terbaca sebagai pemeriksaan, dan tidak ada yang
   diperiksa di Short ini.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, Paket } from "../../panggung-kiriman";
import {
  HP_PENERIMA,
  JALUR,
  JaringanTegak,
  TeksLayar,
  W,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "perjalanan";
const B_LEWAT = beat(ID, 0);

export const Perjalanan: React.FC = () => {
  const d = useDetik();

  const maju = t(d, {
    mulai: 0,
    durasi: B_LEWAT + 5.0,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });
  const yPaket = JALUR.atas + 130 + (JALUR.bawah - (JALUR.atas + 130)) * maju;

  /* HP penerima MENDEKAT dalam arti terlihat, bukan bergerak. */
  const muncul = t(d, { mulai: 1.4, durasi: 1.6, dari: 0, ke: 0.6 });
  const teks = t(d, { mulai: 0.4, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} nyala={nyalaSimpul(yPaket)} />

          <g opacity={muncul}>
            <Hp {...HP_PENERIMA} nyala={0.4} />
          </g>

          <Paket x={JALUR.x} y={yPaket} skala={1.4} />

          <TeksLayar baris={["Lewat banyak tempat."]} y={300} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
