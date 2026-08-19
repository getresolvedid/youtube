/* T19-S12 · scene 5 · cnn — tutup, dan tempat namanya jatuh
   VO:        5-cnn-vo.md
   Direction: 5-cnn-direction.md

   Tangganya bentuk yang SAMA dengan tangga Episode 05 (`ANAK_TANGGA` di
   panggung-lapis) — dua episode yang bicara "bertingkat" harus memakai bentuk
   yang sama, kalau tidak penonton membacanya sebagai dua gagasan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kucing, LabelTahap, TeksLayar, W } from "../panggung-nn";
import { ANAK_TANGGA } from "../panggung-lapis";
import { beat } from "./timing.gen";

const ID = "cnn";

const B_INTI = beat(ID, 0); // "Itu inti dari convolutional neural network."

/** Tiga anak tangga versi Episode 12 — posisinya sama dengan Episode 05, cuma
 *  katanya yang berganti sesuai jalan yang ditempuh gambar. */
const KATA = ["PETAK", "CIRI", "BENTUK"] as const;

export const Cnn: React.FC = () => {
  const d = useDetik();

  const bersih = t(d, { mulai: 0.05, durasi: 0.35, dari: 1, ke: 0.1 });
  const anak = (i: number): number =>
    t(d, { mulai: 0.2 + i * 0.18, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });
  const nama = masuk(d, { mulai: B_INTI + 0.3, durasi: 0.4, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={bersih}>
            <Kucing y={1010} skala={1.2} />
          </g>

          {ANAK_TANGGA.map((a, i) => (
            <g key={a.teks} opacity={anak(i)}>
              <LabelTahap x={a.x} y={a.y} teks={KATA[i] ?? a.teks} nyala={i === 2 ? 1 : 0} />
            </g>
          ))}

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <TeksLayar baris={["CNN"]} y={620} ukuran={84} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
