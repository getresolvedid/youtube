/* T19-S1 · scene 1 · cara-belajar — hook
   VO:        1-cara-belajar-vo.md
   Direction: 1-cara-belajar-direction.md

   Tiga detik untuk menaruh satu benda yang sudah bergerak + satu pertanyaan
   yang belum terjawab.

   DUA KEPUTUSAN:

   1. Simpulnya TIDAK berlabel. Label di detik nol menyuruh penonton membaca;
      jaringan yang cuma bergerak menyuruhnya menonton.

   2. Denyutnya turun, bukan menyeberang. Arah jaringan diputar 90° untuk 9:16
      (panggung-nn.tsx) — kalau ia mengalir ke kanan, jawabannya keluar di balik
      rail tombol YouTube.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Denyut,
  Jaringan,
  TeksLayar,
  W,
  kamera,
  nyalaLapis,
  yDenyut,
} from "../panggung-nn";
import { beat, cari } from "./timing.gen";

const ID = "cara-belajar";

const B_TANYA = beat(ID, 0); // "Bagaimana sebuah AI sebenarnya bisa belajar?"
const DUR = cari(ID).durasi;

export const CaraBelajar: React.FC = () => {
  const d = useDetik();

  /* Simpul dulu, lapis demi lapis, baru sambungannya. Urutan ini yang membuat
     jaringannya terbaca TUMBUH, bukan muncul jadi. */
  const tampilSimpul = (l: number): number =>
    t(d, { mulai: 0.05 + l * 0.1, durasi: 0.28, dari: 0, ke: 1, ease: E.expoOut });
  const tampilSambungan = (i: number): number =>
    t(d, { mulai: 0.4 + (i % 3) * 0.04, durasi: 0.3, dari: 0, ke: 1 });

  /* Satu denyut, sekali jalan. Posisinya yang menyalakan simpul — bukan detik,
     jadi nyalanya tidak pernah meleset saat kalimat VO-nya berubah. */
  const u = t(d, { mulai: 0.9, durasi: 1.15, dari: 0, ke: 1, ease: E.sineInOut });
  const y = yDenyut(u);
  const denyutOn = t(d, { mulai: 0.85, durasi: 0.12, dari: 0, ke: 1 });

  const teks = masuk(d, { mulai: B_TANYA + 0.75, durasi: 0.45, geser: 20 });

  /* Dorongan sangat halus. Kalau terasa, ia sudah terlalu besar. */
  const skala = t(d, { mulai: 0, durasi: DUR, dari: 1, ke: 1.03, ease: E.linear });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)}>
            <Jaringan
              tampilSimpul={tampilSimpul}
              tampilSambungan={tampilSambungan}
              nyala={nyalaLapis(y)}
            />
            <Denyut y={y} opacity={denyutOn} />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BAGAIMANA AI", "BELAJAR?"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
