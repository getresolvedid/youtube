/* T19-S15 · scene 1 · di-mana — hook
   VO:        1-di-mana-vo.md
   Direction: 1-di-mana-direction.md

   Jendelanya DIGAMBAR SEDERHANA, bukan tiruan antarmuka produk tertentu — yang
   dibicarakan mekanismenya, bukan mereknya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, kamera } from "../panggung-nn";
import { BlokTransformer, JendelaObrolan } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "di-mana";

const B_TANYA = beat(ID, 0); // "Jadi semua ini munculnya di ChatGPT sebelah mana?"

export const DiMana: React.FC = () => {
  const d = useDetik();

  const jendela = t(d, { mulai: 0.05, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.5, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(0.75)}>
            <Jaringan opacity={0.12} />
          </g>
          <JendelaObrolan y={1000} tampil={jendela} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DI MANA?"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
