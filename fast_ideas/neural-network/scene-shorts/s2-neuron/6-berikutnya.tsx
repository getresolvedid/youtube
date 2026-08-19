/* T19-S2 · scene 6 · berikutnya — gantungan episode berikutnya
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   Kebalikan persis dari scene 1: kalau di sana kamera MASUK ke satu simpul, di
   sini ia MUNDUR sampai simpul itu jadi satu di antara ratusan. Itu yang
   membuat pertanyaannya ("kenapa berlapis?") menunjuk benda yang baru terlihat,
   bukan menunjuk episode berikutnya sebagai acara (HARD RULE 7).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, LabelTahap, TeksLayar, W, simpul } from "../panggung-nn";
import { SimpulBesar } from "../panggung-neuron";
import { beat, cari } from "./timing.gen";

const ID = "berikutnya";

const B_NEXT = beat(ID, 0); // "Tapi siapa yang menentukan bobotnya?"
const DUR = cari(ID).durasi;

const TUMPU = simpul(1, 1);

/** Rantai scene 5 — digambar ulang di frame 0 lalu dipadamkan (HARD RULE 3). */
const RANTAI = [
  { teks: "DIKALI", x: 300, y: 1300 },
  { teks: "DIJUMLAH", x: 720, y: 1300 },
  { teks: "LEWAT BATAS", x: 510, y: 1420 },
] as const;

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const rantaiKeluar = t(d, { mulai: 0.05, durasi: 0.25, dari: 1, ke: 0 });

  /* Mundur: simpul besar mengecil, jaringan penuh mengambil alih di tempat yang
     sama — pertukaran yang sama dengan scene 1, dibalik arahnya. */
  const mundur = t(d, {
    mulai: 0.15,
    durasi: Math.max(0.6, DUR - 0.9),
    dari: 1,
    ke: 0,
    ease: E.sineInOut,
  });
  const teks = masuk(d, { mulai: B_NEXT + 0.5, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={mundur}>
            <SimpulBesar skala={0.35 + 0.65 * mundur} nyala={mundur} />
          </g>

          <g
            transform={`translate(${TUMPU.x} ${TUMPU.y}) scale(${0.8 + 1.4 * mundur}) translate(${-TUMPU.x} ${-TUMPU.y})`}
            opacity={1 - mundur}
          >
            <Jaringan nyala={(l) => (l === 1 ? 1 - mundur : 0)} />
          </g>

          <g opacity={rantaiKeluar}>
            {RANTAI.map((r, i) => (
              <LabelTahap key={r.teks} x={r.x} y={r.y} teks={r.teks} nyala={i === 2 ? 1 : 0} />
            ))}
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "BOBOT"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
