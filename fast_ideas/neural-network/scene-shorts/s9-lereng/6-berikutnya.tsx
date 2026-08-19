/* T19-S9 · scene 6 · berikutnya — gantungan ke Episode 10
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   SCENE INI BARU 2026-08-19. Versi lama Short ini menutup seri tanpa gantungan,
   karena dulu ia dikira episode terakhir. Peta 15 episode menyambungkannya ke
   Episode 10 — training (naskah.md § Bentrok tercatat 3).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { LabelTahap, TeksLayar, W } from "../panggung-nn";
import { Bola, Lereng, SumbuMeleset } from "../panggung-lereng";
import { GELUNG } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_GABUNG = beat(ID, 0); // "Gabungkan semuanya, dan jadilah latihan."

/* Empat kotak gelung latihan diambil dari `GELUNG` di panggung-seri — bentuk
   yang SAMA dengan isi pokok Episode 10. Gantungan yang bentuknya berbeda dari
   episode yang dijanjikannya membuat penonton mengira ia benda lain. */

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  /* Lereng menyusut ke pojok kanan bawah gelung — ia jadi satu tahap di antara
     empat, bukan seluruh ceritanya. */
  const susut = t(d, { mulai: 0.1, durasi: 0.7, dari: 0, ke: 1, ease: E.sineInOut });
  const skala = 1 - 0.72 * susut;
  const dx = 190 * susut;
  const dy = -100 * susut;

  const kotak = (i: number): number =>
    t(d, { mulai: B_GABUNG + 0.15 + i * 0.12, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });

  const teks = masuk(d, { mulai: B_GABUNG + 0.55, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g
            transform={`translate(${dx} ${dy}) translate(${W / 2} 1100) scale(${skala}) translate(${-W / 2} ${-1100})`}
          >
            <g opacity={1 - 0.6 * susut}>
              <SumbuMeleset />
            </g>
            <Lereng />
            <Bola u={0.03} />
          </g>

          {GELUNG.map((k, i) => (
            <g key={k.teks} opacity={kotak(i) * susut}>
              <LabelTahap x={k.x} y={k.y} teks={k.teks} nyala={i === 3 ? 1 : 0} />
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "LATIHAN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
