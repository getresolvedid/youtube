/* T19-S3 · scene 5 · intinya — tutup, dan tempat keduanya dinamai
   VO:        5-intinya-vo.md
   Direction: 5-intinya-direction.md

   DUA nama sekaligus di sini, dan itu memang isi episodenya — peta menyebut
   Episode 03 "What Are Weights and Biases?", jadi `[what]`-nya sepasang.
   Kalimatnya diambil apa adanya dari peta.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { LabelTahap, W } from "../panggung-nn";
import { SimpulBesar } from "../panggung-neuron";
import { Panah } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_INTI = beat(ID, 0); // "Bobot mengatur pengaruh. Bias menggeser hasil."

const BARIS = [
  { kiri: "BOBOT", kanan: "PENGARUH", y: 870 },
  { kiri: "BIAS", kanan: "GESER", y: 1080 },
] as const;

export const Intinya: React.FC = () => {
  const d = useDetik();

  const bersih = t(d, { mulai: 0.05, durasi: 0.35, dari: 1, ke: 0.1 });
  const baris = (i: number): number =>
    t(d, { mulai: B_INTI + 0.15 + i * 0.22, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SimpulBesar opacity={bersih} skala={0.85} />

          {BARIS.map((b, i) => (
            <g key={b.kiri} opacity={baris(i)}>
              <LabelTahap x={280} y={b.y} teks={b.kiri} nyala={1} />
              <Panah x={430} y={b.y} panjang={130} />
              <LabelTahap x={730} y={b.y} teks={b.kanan} nyala={0} />
            </g>
          ))}
        </svg>
      </div>
    </Scene>
  );
};
