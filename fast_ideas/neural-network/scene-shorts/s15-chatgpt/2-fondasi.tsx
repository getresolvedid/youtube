/* T19-S15 · scene 2 · fondasi — ketegangan
   VO:        2-fondasi-vo.md
   Direction: 2-fondasi-direction.md

   Bloknya bentuk yang SAMA dengan Episode 14. Kalau bentuknya beda, seri ini
   berhenti terasa menyambung tepat di episode terakhirnya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, kamera } from "../panggung-nn";
import { BlokTransformer, JendelaObrolan } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "fondasi";

const B_DIBANGUN = beat(ID, 0); // "ChatGPT dibangun di atas jaringan saraf, termasuk transformer."

export const Fondasi: React.FC = () => {
  const d = useDetik();

  const blok = t(d, { mulai: B_DIBANGUN + 0.2, durasi: 0.55, dari: 0, ke: 1, ease: E.expoOut });
  const jaring = t(d, { mulai: B_DIBANGUN + 0.1, durasi: 0.4, dari: 0.12, ke: 0.35 });
  const teks = masuk(d, { mulai: B_DIBANGUN + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(0.75)}>
            <Jaringan opacity={jaring} />
          </g>
          <BlokTransformer y={760} tampil={blok} />
          <JendelaObrolan y={1180} tampil={1} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["JARINGAN +", "TRANSFORMER"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
