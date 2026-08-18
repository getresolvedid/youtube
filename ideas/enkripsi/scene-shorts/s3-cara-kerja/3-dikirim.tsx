/* T17-S3 · scene 3 · dikirim
   VO:        3-dikirim-vo.md
   Direction: 3-dikirim-direction.md

   Jaringan yang SAMA PERSIS dengan Short 1 dan 2 — arahan user § Network
   Continuity. Tidak ada satu koordinat pun di berkas ini.

   `terkunci` dipatok 1 tanpa tween: paketnya sudah terkunci sebelum scene ini
   mulai, dan menganimasikannya lagi mengulang temuan scene 2.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-kiriman";
import { JALUR, JaringanTegak, TeksLayar, W, nyalaSimpul } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "dikirim";
const B_KIRIM = beat(ID, 0);

export const Dikirim: React.FC = () => {
  const d = useDetik();

  const maju = t(d, {
    mulai: 0,
    durasi: B_KIRIM + 3.3,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });
  const yPaket = JALUR.atas - 140 + (JALUR.bawah - (JALUR.atas - 140)) * maju;
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
          <Paket x={JALUR.x} y={yPaket} terkunci={1} skala={1.4} />
          <TeksLayar baris={["Yang dikirim ini."]} y={230} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
