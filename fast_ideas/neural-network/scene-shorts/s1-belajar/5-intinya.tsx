/* T19-S1 · scene 5 · intinya — tutup
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   Scene ini MEMBUANG, tidak menambah. Frame pertamanya = frame terakhir scene
   4; yang terjadi cuma semuanya pergi kecuali gelungnya.

   DUA KEPUTUSAN:

   1. Empat kata ditumpuk DUA BARIS, bukan satu baris mendatar. Empat label
      berjajar butuh ±1000 px; kotak amannya 830. Yang dikecilkan tata letaknya,
      bukan hurufnya — teks yang menyusut sampai muat berhenti terbaca di HP.

   2. Nama "neural network" TIDAK ditulis di layar. Ia jatuh di VO, sekali
      (HARD RULE 6); teks layar yang menyalin kalimat VO adalah yang dilarang
      unggahan § 16.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Jaringan,
  LabelTahap,
  RANTAI_INTI,
  W,
  petaGelung,
} from "../panggung-nn";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_INTI = beat(ID, 0); // "Itulah cara paling dasar sebuah neural network belajar."

/* Rantai empat katanya milik panggung-nn (`RANTAI_INTI`) — scene 6 membuka
   dengan rantai yang sama persis, jadi koordinatnya cuma boleh ada di satu
   tempat. TEBAK → MELESET → GESER menghasilkan BELAJAR; kata keempat bukan
   tahap keempat, dan tempatnya di baris bawah yang membuatnya terbaca sebagai
   hasil. */

export const Intinya: React.FC = () => {
  const d = useDetik();

  /* Semuanya pergi bersamaan — satu peristiwa "membersihkan", bukan lima benda
     yang pergi sendiri-sendiri. Jaringannya tinggal siluet. */
  const bersih = t(d, { mulai: 0.05, durasi: 0.3, dari: 1, ke: 0 });
  const siluet = 0.08 + 0.92 * bersih;

  const kata = (i: number): number =>
    t(d, { mulai: B_INTI + 0.15 + i * 0.18, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={petaGelung()}>
            <Jaringan opacity={siluet} />
          </g>

          {/* Panah antar-kata. Yang mendatar menyambung dalam satu baris; yang
              menikung membawa mata dari ujung baris atas ke awal baris bawah. */}
          <g opacity={kata(1)}>
            <line
              x1={470}
              y1={800}
              x2={608}
              y2={800}
              stroke="var(--ink-2)"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <path d="M 592 786 L 618 800 L 592 814 Z" fill="var(--ink-2)" />
          </g>
          <g opacity={kata(2)}>
            {/* Menikung dari ujung baris atas ke ATAS kotak GESER — bukan ke
                ruang kosong di kirinya. Panah yang berhenti di dekat sasaran
                membuat mata mencari sasaran kedua yang tidak ada. */}
            <path
              d="M 880 842 C 940 930 430 900 330 982"
              fill="none"
              stroke="var(--ink-2)"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <path d="M 316 966 L 344 972 L 328 1000 Z" fill="var(--ink-2)" />
          </g>
          <g opacity={kata(3)}>
            <line
              x1={470}
              y1={1040}
              x2={608}
              y2={1040}
              stroke="var(--ink-2)"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <path d="M 592 1026 L 618 1040 L 592 1054 Z" fill="var(--ink-2)" />
          </g>

          {RANTAI_INTI.map((r, i) => (
            <g key={r.teks} opacity={kata(i)}>
              <LabelTahap x={r.x} y={r.y} teks={r.teks} nyala={i === 3 ? 1 : 0} />
            </g>
          ))}
        </svg>
      </div>
    </Scene>
  );
};
