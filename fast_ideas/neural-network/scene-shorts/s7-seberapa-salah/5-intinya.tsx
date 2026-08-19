/* T19-S7 · scene 5 · intinya — tutup, dan tempat namanya jatuh
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   Istilah aslinya muncul di LAYAR; VO memakai kata Indonesianya. Itu yang
   membuat penonton mengenalinya lagi saat menemukannya di tempat lain, tanpa
   harus menelan istilah Inggris di tengah kalimat.
*/
import type React from "react";

import { masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { Meter } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_UKUR = beat(ID, 0); // "Angka itulah yang membuat kesalahan bisa diukur."

export const Intinya: React.FC = () => {
  const d = useDetik();

  const bersih = t(d, { mulai: 0.05, durasi: 0.35, dari: 1, ke: 0 });
  const nama = masuk(d, { mulai: B_UKUR + 0.3, durasi: 0.4, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={bersih} />
          <Meter y={950} nilai={0.25} label="SELISIH" />

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <TeksLayar baris={["LOSS"]} y={1150} ukuran={84} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
