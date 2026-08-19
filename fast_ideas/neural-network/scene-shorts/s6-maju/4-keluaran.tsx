/* T19-S6 · scene 4 · keluaran — payoff kedua
   VO:        4-keluaran-vo.md
   Direction: 4-keluaran-direction.md

   Kartunya komponen yang sama dengan Episode 01: tebakan yang keluar dari
   jaringan selalu digambar sebagai kartu, di episode mana pun.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Denyut, Jaringan, Kartu, TeksLayar, W, yDenyut } from "../panggung-nn";
import { beat } from "./timing.gen";

const ID = "keluaran";

const B_UBAH = beat(ID, 0); // "Lapis terakhir mengubah semuanya jadi satu tebakan."
const B_JAWAB = beat(ID, 1); // "Itu jawabannya."

export const Keluaran: React.FC = () => {
  const d = useDetik();

  const nyala = t(d, { mulai: 0.1, durasi: 0.4, dari: 0, ke: 1, ease: E.backOut(1.2) });
  const kartu = t(d, { mulai: B_JAWAB - 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_UBAH + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan nyala={(l) => (l === 2 ? nyala : 0)} />
          <Denyut y={yDenyut(1)} opacity={1 - kartu} />

          <Kartu y={1230} teks="KUCING" warna="benar" opacity={kartu} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["TEBAKAN"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
