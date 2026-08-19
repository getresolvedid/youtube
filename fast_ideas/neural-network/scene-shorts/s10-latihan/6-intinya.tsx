/* T19-S10 · scene 6 · intinya — tutup
   VO:        6-intinya-vo.md
   Direction: 6-intinya-direction.md

   Sorotan berpindah dengan `Math.floor` dari detik — fungsi murni dari frame,
   tanpa state antar-putaran (CLAUDE.md § Deterministik). Contohnya DITULIS di
   `CONTOH`, tidak diacak.
*/
import type React from "react";

import { masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { CONTOH, KartuContoh, KotakTahap, PanahGelung } from "../panggung-gelung";
import { GELUNG } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "intinya";

const B_GELUNG = beat(ID, 0); // "Latihan adalah gelung ini, diulang untuk ribuan contoh."

/** Satu tahap per 0,22 dtk — cukup cepat untuk terbaca "berkali-kali", cukup
 *  lambat untuk mata mengikuti arah putarannya. */
const PER_TAHAP = 0.22;

export const Intinya: React.FC = () => {
  const d = useDetik();

  const jalan = Math.max(0, (d - B_GELUNG) / PER_TAHAP);
  const tahap = Math.floor(jalan) % 4;
  const putaran = Math.floor(jalan / 4);

  const kartu = CONTOH[putaran % CONTOH.length] ?? CONTOH[0];
  const teks = masuk(d, { mulai: B_GELUNG + 0.3, durasi: 0.4, geser: 18 });
  const masukKartu = t(d, { mulai: B_GELUNG, durasi: 0.3, dari: 0, ke: 1 });

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
            <KotakTahap key={i} i={i} nyala={i === tahap ? 1 : 0} />
          ))}
          <PanahGelung tampil={() => 1} />

          {k0 && (
            <KartuContoh x={k0.x} y={k0.y - 210} teks={kartu ?? ""} opacity={masukKartu} />
          )}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["RIBUAN CONTOH"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
