/* T19-S4 · scene 5 · intinya — tutup, dan tempat namanya jatuh
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   DUA bentuk berdampingan, bukan satu yang berubah lagi: perubahannya sudah
   ditunjukkan di scene 3, dan yang dibutuhkan di sini perbandingan yang terbaca
   sekali lihat.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { AKTIVASI, Kurva, Panah, jalurKurva } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_NAMA = beat(ID, 0); // "Langkah itu namanya fungsi aktivasi…"

const KIRI = jalurKurva((u) => u * 0.8, 140, 880, 280, 240);
const KANAN = jalurKurva(AKTIVASI, 620, 880, 280, 240);

export const Intinya: React.FC = () => {
  const d = useDetik();

  const kiri = t(d, { mulai: 0.15, durasi: 0.35, dari: 0, ke: 1, ease: E.expoOut });
  const kanan = t(d, { mulai: 0.45, durasi: 0.35, dari: 0, ke: 1, ease: E.expoOut });
  const nama = masuk(d, { mulai: B_NAMA + 0.3, durasi: 0.4, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Kurva d={KIRI} opacity={kiri} warna="var(--ink-2)" />
          <g opacity={kanan}>
            <Panah x={450} y={880} panjang={110} />
          </g>
          <Kurva d={KANAN} opacity={kanan} />

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <TeksLayar baris={["AKTIVASI"]} y={1220} ukuran={72} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
