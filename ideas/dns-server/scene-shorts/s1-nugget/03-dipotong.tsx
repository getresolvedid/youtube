/* T14-S1 · scene 3 · dipotong — ketegangan → panggung berdiri, 5,70 dtk
   Direction: 03-dipotong-direction.md
   VO:        03-dipotong-vo.md

   SCENE YANG MENDIRIKAN PANGGUNG. Enam scene sesudahnya memakai ruang yang sama
   persis — koordinatnya di ../tangga-tegak.tsx, tidak diketik ulang di mana pun.

   Loketnya masuk sebagai SILUET, belum menyala. Kalau ia langsung terang, scene
   4 tidak punya apa pun untuk dinyalakan dan tiga payoff berikutnya kehilangan
   tangganya.

   Staggernya dari BAWAH ke ATAS, dan itu bukan selera: urutan munculnya yang
   mengajarkan arah tangganya sebelum satu kalimat pun menjelaskannya.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Komputer, Loket } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import { BilahAlamat, NamaSitusS, posLoketS, VIEWBOX } from "../tangga-tegak";
import { beat } from "./timing.gen";

const ID = "dipotong";

const B_POTONG = beat(ID, 0); // "Coba bayangkan namanya dipotong di tiap titik."
const B_LOKET = beat(ID, 1); // "Tiap potongan punya loketnya sendiri."

const P0 = posLoketS(0);

export const Dipotong: React.FC = () => {
  const d = useDetik();

  const pecah = t(d, {
    mulai: B_POTONG + 0.1,
    durasi: 0.55,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const bilah = t(d, { mulai: B_POTONG, durasi: 0.4, dari: 1, ke: 0 });

  /** Naik dari bawah, satu per satu, dari anak tangga terbawah ke atas. */
  const naik = (i: number) =>
    t(d, {
      mulai: B_LOKET + i * 0.12,
      durasi: 0.6,
      dari: 0,
      ke: 1,
      ease: E.expoOut,
    });

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_LOKET ? "Potong di tiap titiknya." : "Tiap potongan punya loketnya."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <BilahAlamat opacity={bilah} />
        <NamaSitusS pecah={pecah} />

        {/* anak tangga terbawah: kamu */}
        <g opacity={naik(0)} transform={`translate(0 ${40 * (1 - naik(0))})`}>
          <Komputer x={P0.x} y={P0.y} skala={P0.skala} />
        </g>

        {/* tiga loket di atasmu — siluet redup, belum menyala */}
        {[1, 2, 3].map((i) => {
          const p = posLoketS(i);
          const n = naik(i);
          return (
            <g key={i} opacity={n} transform={`translate(0 ${40 * (1 - n)})`}>
              <Loket x={p.x} y={p.y} skala={p.skala} nyala={0} />
            </g>
          );
        })}
      </svg>
    </Scene>
  );
};
