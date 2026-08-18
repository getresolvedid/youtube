/* T18-S3 · scene 6 · namanya — tutup + loop
   VO:        6-namanya-vo.md
   Direction: 6-namanya-direction.md

   SATU KEPUTUSAN: rangkumannya menyebut PEKERJAANNYA, bukan kepanjangannya.
   "Transmission Control Protocol" tidak muncul di Short ini sama sekali — ia
   tidak menambah satu pun gambaran, dan di 9:16 ia memakan dua baris penuh yang
   lebih berguna untuk pekerjaannya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Label, Paket } from "../../panggung-jaringan";
import { JaringanTegak, N_SLOT, W, Y_SLOT, slotX } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "namanya";
const B_JADI = beat(ID, 0); // "Jadi, TCP membantu membuat komunikasi data…"

/** Jarak antar-potongan setelah merapat — cukup untuk tetap terbaca lima, cukup
 *  rapat untuk terbaca satu blok. */
const RAPAT = 118;

export const Namanya: React.FC = () => {
  const d = useDetik();

  const rapat = t(d, { mulai: B_JADI + 0.2, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const nama = masuk(d, { mulai: B_JADI + 1.0, durasi: 0.55, geser: 24 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak jalur={[1]} luas={1} />

          {Array.from({ length: N_SLOT }, (_, i) => {
            const xAwal = slotX(i);
            const xRapat = W / 2 + (i - (N_SLOT - 1) / 2) * RAPAT;
            return (
              <Paket
                key={i}
                x={xAwal + (xRapat - xAwal) * rapat}
                y={Y_SLOT}
                nomor={i + 1}
                skala={0.9}
                warna="ok"
              />
            );
          })}

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <Label x={W / 2} y={1200} teks="TCP" sub="lengkap & urut" besar />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
