/* T19-S4 · scene 1 · cuma-tambah — hook
   VO:        1-cuma-tambah-vo.md
   Direction: 1-cuma-tambah-direction.md

   Garisnya LURUS dan sudah ada di frame nol. Yang ditanyakan hook ini kenapa itu
   tidak cukup, bukan apa yang terjadi — dan pertanyaan seperti itu hanya berdiri
   kalau keadaannya sudah terlihat.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W, kamera } from "../panggung-nn";
import { D_LURUS, GRAFIK, Kurva, Sumbu } from "../panggung-seri";
import { beat, cari } from "./timing.gen";

const ID = "cuma-tambah";

const B_TANYA = beat(ID, 0); // "Kenapa jaringan tidak cukup menjumlah angka saja?"
const DUR = cari(ID).durasi;

export const CumaTambah: React.FC = () => {
  const d = useDetik();

  const tampil = t(d, { mulai: 0.05, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_TANYA + 0.45, durasi: 0.4, geser: 18 });
  const skala = t(d, { mulai: 0, durasi: DUR, dari: 1, ke: 1.03, ease: E.linear });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)} opacity={tampil}>
            <Sumbu x={GRAFIK.x} y={GRAFIK.y} lebar={GRAFIK.lebar} tinggi={GRAFIK.tinggi} />
            <Kurva d={D_LURUS} />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["CUMA MENJUMLAH?"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
