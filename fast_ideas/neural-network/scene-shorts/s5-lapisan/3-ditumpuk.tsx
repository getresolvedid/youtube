/* T19-S3 · scene 3 · ditumpuk — payoff
   VO:        3-ditumpuk-vo.md
   Direction: 3-ditumpuk-direction.md

   DUA KEPUTUSAN:

   1. Baris baru MENDARAT (`backOut`), tidak memudar masuk. Mendaratnya yang
      membuat "menyisip" terbaca sebagai masuk ke tempat kosong di antara dua
      yang sudah ada.

   2. Sambungan langsung memudar DULUAN, baru yang baru tumbuh. Kalau bersamaan,
      lapis baru terbaca sebagai hiasan yang ditempel — bukan sebagai jalan yang
      sekarang harus dilewati.
*/
import type React from "react";

import { E, t, masuk, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W, X_SIMPUL } from "../panggung-nn";
import { JaringLapis, Potongan, Y_MID } from "../panggung-lapis";
import { beat } from "./timing.gen";

const ID = "ditumpuk";

const B_SISIP = beat(ID, 0); // "Makanya disisipkan satu lapis di tengah."
const B_POTONGAN = beat(ID, 1); // "Lapis pertama cuma mencari potongan sederhana."

export const Ditumpuk: React.FC = () => {
  const d = useDetik();

  const sebaranPergi = t(d, { mulai: 0.05, durasi: 0.3, dari: 1, ke: 0 });

  const turun = t(d, {
    mulai: B_SISIP + 0.15,
    durasi: 0.55,
    dari: 0,
    ke: 1,
    ease: E.backOut(1.05),
  });

  const potongan = (i: number): number =>
    t(d, { mulai: B_POTONGAN + 0.1 + i * 0.16, durasi: 0.35, dari: 0, ke: 1, ease: E.expoOut });

  const teks = masuk(d, { mulai: B_POTONGAN, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={`translate(0 ${-180 * (1 - turun)})`}>
            <JaringLapis tengah={turun} nyalaMid={(i) => potongan(i)} />
          </g>

          {X_SIMPUL.map((x, i) => (
            <Potongan
              key={x}
              jenis={i as 0 | 1 | 2}
              x={x}
              y={Y_MID - 130}
              opacity={potongan(i)}
              skala={0.85}
            />
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["LAPIS PERTAMA:", "POTONGAN"]} ukuran={50} />
          </g>

          {/* Sebaran scene 2 masih ada di frame 0 lalu pergi — itulah jahitannya. */}
          <g opacity={sebaranPergi} />
        </svg>
      </div>
    </Scene>
  );
};
