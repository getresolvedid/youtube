/* T19-S15 · scene 3 · ide-sama — payoff
   VO:        3-ide-sama-vo.md
   Direction: 3-ide-sama-direction.md

   KEEMPAT KATANYA sama persis dengan Episode 03, 07, 08, dan 10. Rekap yang
   memakai kata baru bukan rekap.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { LabelTahap, TeksLayar, W } from "../panggung-nn";
import { BlokTransformer, JendelaObrolan } from "../panggung-gelung";
import { Panah } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "ide-sama";

const B_SAMA = beat(ID, 0); // "Bobot, latihan, kesalahan, dan penyetelan…"

/** Empat kata dari empat episode: 03, 10, 07, 08. */
const RANTAI = [
  { teks: "BOBOT", x: 300, y: 820 },
  { teks: "LATIHAN", x: 740, y: 820 },
  { teks: "KESALAHAN", x: 300, y: 1030 },
  { teks: "SETELAN", x: 740, y: 1030 },
] as const;

export const IdeSama: React.FC = () => {
  const d = useDetik();

  /* Frame 0 = frame terakhir scene 2 (HARD RULE 3): blok transformer + jendela
     obrolan masih di tempatnya, lalu memudar. Tanpa ini scene ini membuka pada
     layar KOSONG — dan `npm run jahit` meloloskannya karena kotak subtitel ikut
     terhitung sebagai benda yang dipegang. Yang menemukannya frame MP4-nya. */
  const bekas = t(d, { mulai: 0.05, durasi: 0.4, dari: 1, ke: 0 });

  const kata = (i: number): number =>
    t(d, { mulai: B_SAMA + 0.15 + i * 0.22, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_SAMA + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={bekas}>
            <BlokTransformer y={760} tampil={1} />
            <JendelaObrolan y={1180} tampil={1} />
          </g>

          <g opacity={kata(1)}>
            <Panah x={455} y={820} panjang={120} />
          </g>
          <g opacity={kata(3)}>
            <Panah x={455} y={1030} panjang={120} />
          </g>

          {RANTAI.map((r, i) => (
            <g key={r.teks} opacity={kata(i)}>
              <LabelTahap x={r.x} y={r.y} teks={r.teks} nyala={i === 3 ? 1 : 0} />
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["YANG TADI,", "SEMUANYA"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
