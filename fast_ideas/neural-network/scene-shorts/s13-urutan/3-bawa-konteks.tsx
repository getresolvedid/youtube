/* T19-S13 · scene 3 · bawa-konteks — payoff
   VO:        3-bawa-konteks-vo.md
   Direction: 3-bawa-konteks-direction.md

   KAPSULNYA MEMBESAR tiap langkah, karena ia membawa lebih banyak — itu yang
   membedakannya dari denyut biasa yang cuma lewat. Posisi dan ukurannya dari
   SATU nilai maju yang sama.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { KALIMAT, Pil, Potongan, X_KATA, Y_KATA } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "bawa-konteks";

const B_BAWA = beat(ID, 0); // "Model urutan membawa keterangan dari langkah sebelumnya…"

export const BawaKonteks: React.FC = () => {
  const d = useDetik();

  const maju = t(d, {
    mulai: B_BAWA + 0.3,
    durasi: 1.6,
    dari: 0,
    ke: KALIMAT.length - 1,
    ease: E.sineInOut,
  });
  const i = Math.min(KALIMAT.length - 2, Math.floor(maju));
  const p = maju - i;
  const x = (X_KATA[i] ?? 180) + ((X_KATA[i + 1] ?? 400) - (X_KATA[i] ?? 180)) * p;

  const kapsul = t(d, { mulai: B_BAWA + 0.25, durasi: 0.2, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_BAWA + 0.4, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {KALIMAT.map((k, n) => (
            <Potongan
              key={k}
              x={X_KATA[n] ?? 180}
              y={Y_KATA}
              teks={k}
              nyala={n <= maju ? 1 : 0}
            />
          ))}

          {/* Membesar seiring maju — 0,7 di potongan pertama, 1,15 di terakhir. */}
          <g opacity={kapsul}>
            <Pil
              x={x}
              y={Y_KATA - 150}
              teks="KONTEKS"
              warna="ingat"
              lebar={230}
              ukuran={32}
              skala={0.7 + (0.45 * maju) / (KALIMAT.length - 1)}
            />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DIBAWA KE", "LANGKAH BERIKUTNYA"]} ukuran={44} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
