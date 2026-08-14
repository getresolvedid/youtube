/* T14-S2 · scene 2 · salah — bantahan, 4,37 dtk
   Direction: 02-salah-direction.md
   VO:        02-salah-vo.md

   Coretnya DIGAMBAR, bukan muncul jadi: garis yang tiba-tiba ada terbaca sebagai
   hiasan, garis yang ditarik terbaca sebagai keputusan. Bentuk dan sudutnya
   datang dari ../jalur-tanya.tsx karena scene 7 harus memakai coretan yang sama
   persis — itu yang membuatnya terbaca sebagai janji yang ditagih.

   TIDAK MENJELASKAN APA PUN DI SINI. Godaan terbesarnya adalah membocorkan
   "yang berubah cuma waktu bertanya"; itu milik scene 4, dan dibocorkan di sini
   tiga scene bukti sesudahnya jadi pengulangan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksAtas } from "../teks-atas";
import {
  BilahJanji,
  Coret,
  CORET_MITOS,
  Mitos,
  VIEWBOX_S2,
  Y_MITOS,
} from "../jalur-tanya";
import { beat } from "./timing.gen";

const ID = "salah";

const B_SALAH = beat(ID, 0); // "Salah."
const B_BERGUNA = beat(ID, 1); // "Dan yang benar justru lebih berguna daripada itu."

export const Salah: React.FC = () => {
  const d = useDetik();

  const coret = t(d, {
    mulai: B_SALAH,
    durasi: 0.3,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const janji = t(d, {
    mulai: B_SALAH + 0.1,
    durasi: 0.45,
    dari: 1,
    ke: 0,
    ease: E.power2in,
  });
  const keluar = t(d, {
    mulai: B_BERGUNA,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.power2in,
  });

  return (
    <Scene tengah={false}>
      {d >= B_BERGUNA && (
        <TeksAtas {...masuk(d, { mulai: B_BERGUNA + 0.35, durasi: 0.4, geser: 20 })}>
          Yang benar lebih berguna.
        </TeksAtas>
      )}

      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <g
          transform={`translate(0 ${-340 * keluar})`}
          opacity={1 - keluar}
        >
          <Mitos />
          {CORET_MITOS.map((c, i) => (
            <Coret key={c.x0} x0={c.x0} x1={c.x1} y={Y_MITOS[i] ?? Y_MITOS[0]} p={coret} />
          ))}
          <BilahJanji naik={janji} />
        </g>
      </svg>
    </Scene>
  );
};
