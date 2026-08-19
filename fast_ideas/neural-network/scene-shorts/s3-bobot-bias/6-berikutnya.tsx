/* T19-S3 · scene 6 · berikutnya — gantungan ke Episode 04
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   Lengkungannya `AKTIVASI` dari panggung-seri — bentuk yang sama persis dengan
   yang jadi isi Episode 04. Gantungan yang memperlihatkan bentuk lain membuat
   episode berikutnya terasa berganti topik.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { LabelTahap, TeksLayar, W, kamera } from "../panggung-nn";
import { PUSAT, SimpulBesar } from "../panggung-neuron";
import { AKTIVASI, Kurva, jalurKurva } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_BELUM = beat(ID, 0); // "Tapi menjumlah saja belum cukup."

const BARIS = [
  { kiri: "BOBOT", kanan: "PENGARUH", y: 870 },
  { kiri: "BIAS", kanan: "GESER", y: 1080 },
] as const;

const D_KURVA = jalurKurva(AKTIVASI, PUSAT.x - 150, PUSAT.y, 300, 230);

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const keluar = t(d, { mulai: 0.05, durasi: 0.25, dari: 1, ke: 0 });
  const terang = t(d, { mulai: 0.2, durasi: 0.4, dari: 0.1, ke: 1 });
  const kurva = gambarGaris(d, 520, { mulai: B_BELUM + 0.15, durasi: 0.45 });
  const skala = t(d, { mulai: 0.2, durasi: 0.8, dari: 1, ke: 1.2, ease: E.sineInOut });
  const teks = masuk(d, { mulai: B_BELUM + 0.5, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)}>
            <SimpulBesar opacity={terang} skala={0.85} />
            <g opacity={terang}>
              <Kurva d={D_KURVA} tebal={9} {...kurva} />
            </g>
          </g>

          <g opacity={keluar}>
            {BARIS.map((b) => (
              <g key={b.kiri}>
                <LabelTahap x={280} y={b.y} teks={b.kiri} nyala={1} />
                <LabelTahap x={730} y={b.y} teks={b.kanan} nyala={0} />
              </g>
            ))}
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "AKTIVASI"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
