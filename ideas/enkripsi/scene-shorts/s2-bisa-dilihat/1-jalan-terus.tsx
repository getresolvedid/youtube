/* T17-S2 · scene 1 · jalan-terus — hook
   VO:        1-jalan-terus-vo.md
   Direction: 1-jalan-terus-direction.md

   Frame pertamanya harus terbaca sebagai tempat yang SUDAH DIKENAL oleh yang
   menonton Short 1, dan sebagai tempat yang JELAS oleh yang belum. Dua tuntutan
   itu dipenuhi benda yang sama, dan itu sebabnya tidak ada satu koordinat pun di
   berkas ini — semuanya dari ../panggung-short.tsx.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-kiriman";
import { JALUR, JaringanTegak, TeksLayar, W, nyalaSimpul } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "jalan-terus";
const B_JALAN = beat(ID, 0);

export const JalanTerus: React.FC = () => {
  const d = useDetik();

  const maju = t(d, {
    mulai: 0,
    durasi: B_JALAN + 5.0,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });
  const yPaket = JALUR.atas - 120 + (JALUR.bawah - (JALUR.atas - 120)) * maju;
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
          <Paket x={JALUR.x} y={yPaket} skala={1.4} />
          <TeksLayar baris={["Satu kalimat,", "lagi jalan."]} y={230} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
