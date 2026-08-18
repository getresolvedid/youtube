/* T17-S2 · scene 2 · ada-yang-lihat
   VO:        2-ada-yang-lihat-vo.md
   Direction: 2-ada-yang-lihat-direction.md

   Sosoknya masuk lewat OPASITAS SAJA, tanpa geser: dia tidak sedang datang, dia
   sudah di situ sejak Short 1 — penonton yang baru melihatnya.

   Bukan tudung, bukan ruang gelap, bukan warna bahaya. `--bad` tidak dipakai
   sama sekali di Short ini.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Monitor, Paket, Sosok } from "../../panggung-kiriman";
import {
  JALUR,
  JaringanTegak,
  MONITOR,
  PENGAMAT,
  TeksLayar,
  W,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "ada-yang-lihat";
const B_ADA = beat(ID, 0);

export const AdaYangLihat: React.FC = () => {
  const d = useDetik();

  const maju = t(d, { mulai: 0, durasi: B_ADA + 4.6, dari: 0, ke: 1, ease: E.linear });
  const yPaket = JALUR.atas + (JALUR.bawah - JALUR.atas) * maju;

  const hadir = t(d, { mulai: 0.9, durasi: 1.0, dari: 0, ke: 1 });
  const teks = t(d, { mulai: 1.4, durasi: 0.5, dari: 0, ke: 1 });

  /* Geser kamera, BUKAN skala: besarnya benda tidak boleh berubah — yang berubah
     cuma bagian panggung yang terlihat. */
  const geser = t(d, { mulai: 0.5, durasi: 1.4, dari: 0, ke: -70, ease: E.expoOut });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={`translate(${geser} 0)`}>
            <JaringanTegak luas={1} nyala={nyalaSimpul(yPaket)} />
            <Paket x={JALUR.x} y={yPaket} skala={1.4} />

            <g opacity={hadir}>
              <Sosok x={PENGAMAT.x} y={PENGAMAT.alas} skala={0.62} />
              <Monitor {...MONITOR} nyala={0.7}>
                {/* layarnya baru menampilkan paketnya — isinya belum terbuka */}
                <Paket
                  x={MONITOR.x + MONITOR.w / 2}
                  y={MONITOR.y + MONITOR.h / 2}
                  skala={0.7}
                />
              </Monitor>
            </g>
          </g>

          <TeksLayar baris={["Ada yang lihat."]} y={230} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
