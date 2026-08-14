/* T14-S1 · scene 2 · kamu-kiri — hook lanjutan, 4,81 dtk
   Direction: 02-kamu-kiri-direction.md
   VO:        02-kamu-kiri-vo.md

   DUA ARAH TIDAK PERNAH JALAN BERSAMAAN. Kalimatnya perbandingan berurutan;
   dua garis yang bergerak bareng membuat penonton membandingkan panjang, bukan
   arah — dan arah itu seluruh isi Short ini.

   Yang dipakai satu garis, bukan dua: garis kedua terbaca sebagai dua hal yang
   berbeda, sedangkan garis yang SAMA ditarik mundur terbaca sebagai hal yang
   sama, dibaca terbalik. Itu persis kalimatnya.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { POTONGAN } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  BilahAlamat,
  GarisBaca,
  NamaSitusS,
  PenandaS,
  VIEWBOX,
  xPotonganS,
} from "../tangga-tegak";
import { beat } from "./timing.gen";

const ID = "kamu-kiri";

const B_KIRI = beat(ID, 0); // "Kamu membacanya dari kiri."
const B_TERBALIK = beat(ID, 1); // "Yang mengantarmu ke sana membacanya terbalik."

/** Ujung kiri & kanan garis baca — sama dengan yang dipakai <GarisBaca>. */
const X0 = xPotonganS(0) - 100;
const X1 = xPotonganS(POTONGAN.length - 1) + 90;

export const KamuKiri: React.FC = () => {
  const d = useDetik();

  const maju = t(d, {
    mulai: B_KIRI + 0.15,
    durasi: 0.9,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const mundur = t(d, {
    mulai: B_TERBALIK + 0.1,
    durasi: 0.8,
    dari: 0,
    ke: 1,
    ease: E.power2in,
  });

  /* Penanda scene 1 memudar keluar, lalu masuk lagi MENGIKUTI ujung kanan garis
     yang menyusut. Ia tidak melompat ke posisi baru: yang harus terbaca adalah
     satu ujung yang bergerak ke kiri, bukan dua penanda yang berbeda. */
  const keluarPen = t(d, { mulai: B_KIRI, durasi: 0.3, dari: 1, ke: 0 });
  const masukPen = t(d, { mulai: B_TERBALIK + 0.1, durasi: 0.25, dari: 0, ke: 1 });
  const xUjung = X0 + (X1 - X0) * (maju - mundur);

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_TERBALIK ? "Kamu membacanya dari kiri." : "Yang mengantarmu, terbalik."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <BilahAlamat />
        <NamaSitusS />
        <GarisBaca maju={maju} mundur={mundur} />
        <PenandaS
          x={d < B_TERBALIK ? xPotonganS(2) : xUjung}
          opacity={d < B_TERBALIK ? keluarPen : masukPen}
        />
      </svg>
    </Scene>
  );
};
