/* T19-S4 · scene 4 · pola-rumit — payoff kedua
   VO:        4-pola-rumit-vo.md
   Direction: 4-pola-rumit-direction.md

   SEBARANNYA `TITIK` dari panggung-lapis — pola XOR yang sama persis dengan
   Episode 05. Dua episode yang bicara soal batas pemisah harus memakai sebaran
   yang sama; kalau tidak, salah satunya terlihat curang.

   Batas lurusnya MELENGKUNG, tidak dihapus: "yang tadi jadi begini", bukan
   "yang tadi diganti".
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KOTAK, Sebaran } from "../panggung-lapis";
import { Kurva, jalurKurva } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "pola-rumit";

const B_POLA = beat(ID, 0); // "Dengan begitu lapisannya bisa membangun pola yang jauh lebih rumit."

const LEBAR = KOTAK.x2 - KOTAK.x1;
const TENGAH = (KOTAK.y1 + KOTAK.y2) / 2;

export const PolaRumit: React.FC = () => {
  const d = useDetik();

  const titik = t(d, { mulai: 0.1, durasi: 0.4, dari: 0, ke: 1 });
  const kelok = t(d, { mulai: B_POLA + 0.4, durasi: 1, dari: 0, ke: 1, ease: E.sineInOut });

  /* Dari garis lurus mendatar ke batas berkelok — bentuk antaranya dihitung
     tiap frame, bukan dua path yang ditukar. */
  const dBatas = jalurKurva(
    (u) => Math.sin(u * Math.PI * 1.15) * 0.82 * kelok,
    KOTAK.x1,
    TENGAH,
    LEBAR,
    KOTAK.y2 - KOTAK.y1,
  );

  const teks = masuk(d, { mulai: B_POLA + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Sebaran tampil={() => titik} />
          <Kurva d={dBatas} warna="var(--ink-0)" tebal={7} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["POLA RUMIT"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
