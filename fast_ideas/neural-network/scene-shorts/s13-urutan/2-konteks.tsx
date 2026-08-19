/* T19-S13 · scene 2 · konteks — ketegangan
   VO:        2-konteks-vo.md
   Direction: 2-konteks-direction.md

   YANG BERTUKAR HARUS TERLIHAT BERTUKAR — keduanya bergerak lewat lintasan
   melengkung, bukan hilang lalu muncul di tempat baru. Pertukaran itu
   satu-satunya bukti bahwa urutannya yang berubah, bukan katanya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KALIMAT, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "konteks";

const B_TUKAR = beat(ID, 0); // "Kata yang sama, urutannya ditukar, artinya bisa berubah."

/** Yang bertukar: potongan ke-0 dan ke-2. */
const A = 0;
const B = 2;

export const Konteks: React.FC = () => {
  const d = useDetik();

  const tukar = t(d, { mulai: B_TUKAR + 0.3, durasi: 0.9, dari: 0, ke: 1, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_TUKAR + 0.4, durasi: 0.4, geser: 18 });

  const xa = X_KATA[A] ?? 180;
  const xb = X_KATA[B] ?? 620;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {KALIMAT.map((k, i) => {
            if (i === A || i === B) return null;
            return <Potongan key={k} x={X_KATA[i] ?? 180} y={Y_KATA} teks={k} />;
          })}

          {/* Keduanya melengkung ke arah berlawanan supaya lintasannya tidak
              berimpit — dua benda yang lewat garis yang sama terbaca sebagai
              satu benda yang berkedip. */}
          <Potongan
            x={xa + (xb - xa) * tukar}
            y={Y_KATA - 90 * Math.sin(tukar * Math.PI)}
            teks={KALIMAT[A] ?? ""}
            nyala={1}
          />
          <Potongan
            x={xb + (xa - xb) * tukar}
            y={Y_KATA + 90 * Math.sin(tukar * Math.PI)}
            teks={KALIMAT[B] ?? ""}
            nyala={1}
          />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DITUKAR,", "ARTINYA BEDA"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
