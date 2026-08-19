/* T19-S10 · scene 1 · apa-terjadi-latihan — hook
   VO:        1-apa-terjadi-latihan-vo.md
   Direction: 1-apa-terjadi-latihan-direction.md

   KEEMPAT KOTAK KOSONG di frame nol. Kotak yang sudah berlabel sudah menjawab
   pertanyaannya sebelum ditanya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KotakTahap, PanahGelung } from "../panggung-gelung";
import { beat } from "./timing.gen";

const ID = "apa-terjadi-latihan";

const B_TANYA = beat(ID, 0); // "Jadi apa yang sebenarnya terjadi saat sebuah AI dilatih?"

export const ApaTerjadiLatihan: React.FC = () => {
  const d = useDetik();

  const kotak = (i: number): number =>
    t(d, { mulai: 0.08 + i * 0.08, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.5, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <KotakTahap key={i} i={i} nyala={0} tampil={kotak(i)} />
          ))}
          <PanahGelung tampil={() => 0} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["LATIHAN"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
