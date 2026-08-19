/* T19-S15 · scene 5 · intinya — tutup
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   SIMPULNYA BENTUK YANG SAMA DENGAN EPISODE 02. Episode terakhir menutup
   lingkaran ke episode kedua — itu yang membuat seri terasa selesai, bukan
   sekadar berhenti.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, kamera } from "../panggung-nn";
import { SimpulBesar } from "../panggung-neuron";
import { BlokTransformer } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_AWAL = beat(ID, 0); // "Jadi satu simpul sederhana tadi awal dari cerita yang jauh lebih besar."

export const Intinya: React.FC = () => {
  const d = useDetik();

  /* SATU tween menyeberangi tiga bentuk: simpul → jaringan → blok. Tiga tween
     terpisah akan terbaca sebagai tiga benda yang bergantian, bukan sebagai
     satu yang tumbuh. */
  const tumbuh = t(d, { mulai: 0.15, durasi: 1.6, dari: 0, ke: 2, ease: E.sineInOut });
  const simpul = Math.max(0, 1 - tumbuh);
  const jaring = Math.max(0, 1 - Math.abs(tumbuh - 1));
  const blok = Math.max(0, tumbuh - 1);
  const teks = masuk(d, { mulai: B_AWAL + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={simpul}>
            <SimpulBesar skala={0.6} />
          </g>
          <g transform={kamera(0.85)}>
            <Jaringan opacity={jaring} />
          </g>
          <BlokTransformer y={950} tampil={blok} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DARI SATU SIMPUL"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
