/* T19-S10 · scene 7 · berikutnya — gantungan ke Episode 11
   VO:        7-berikutnya-vo.md
   Direction: 7-berikutnya-direction.md

   Gelungnya MELAMBAT lalu berhenti, bukan berhenti mendadak: yang digantung
   adalah satu kartu yang tertinggal, dan kartu itu harus sempat terlihat
   tertinggal.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { CONTOH, KartuContoh, KotakTahap, PanahGelung } from "../panggung-gelung";
import { GELUNG } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_MASALAH = beat(ID, 0); // "Tapi diulang terus-menerus melahirkan masalah baru."

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  /* Melambat: kecepatan putaran turun ke nol, jadi jumlah tahap yang sudah
     dilewati adalah integral dari kecepatannya — tetap fungsi murni dari detik. */
  const rem = t(d, { mulai: 0, durasi: 0.9, dari: 1, ke: 0, ease: E.power2out });
  const jalan = (d * 4.5 * (1 + rem)) / 2;
  const tahap = rem > 0.02 ? Math.floor(jalan) % 4 : 0;

  const merah = t(d, { mulai: B_MASALAH + 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_MASALAH + 0.45, durasi: 0.35, geser: 16 });

  const k0 = GELUNG[0];

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <KotakTahap key={i} i={i} nyala={i === tahap ? 1 - merah : 0} />
          ))}
          <PanahGelung tampil={() => 1 - 0.6 * merah} />

          {k0 && (
            <KartuContoh
              x={k0.x}
              y={k0.y - 210}
              teks={CONTOH[0] ?? ""}
              warna={merah > 0.5 ? "salah" : "biasa"}
            />
          )}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "HAFAL ATAU BELAJAR"]} ukuran={46} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
