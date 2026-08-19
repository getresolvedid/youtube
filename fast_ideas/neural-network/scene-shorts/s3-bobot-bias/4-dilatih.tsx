/* T19-S3 · scene 4 · dilatih — payoff kedua
   VO:        4-dilatih-vo.md
   Direction: 4-dilatih-direction.md

   SATU KEPUTUSAN: perubahan tebal, geseran kapsul, dan mengecilnya jarak dua
   kartu memakai SATU tween yang sama. Kalau ketiganya animasi terpisah,
   penonton membacanya sebagai tiga kejadian yang kebetulan berdekatan —
   padahal justru hubungan ketiganya yang jadi isi scene ini.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { SambunganMasuk, SimpulBesar, TEBAL, angka } from "../panggung-neuron";
import { Perbandingan, Pil } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "dilatih";

const B_LATIH = beat(ID, 0); // "Selama dilatih, kedua nilai itu diubah supaya tebakannya membaik."

const Y_ATAS = 1130;
const Y_BAWAH = 1370;

export const Dilatih: React.FC = () => {
  const d = useDetik();

  const kartu = t(d, { mulai: 0.1, durasi: 0.4, dari: 0, ke: 1 });

  /* SATU tween untuk tiga perubahan. */
  const setel = t(d, {
    mulai: B_LATIH + 0.5,
    durasi: 1.1,
    dari: 0,
    ke: 1,
    ease: E.sineInOut,
  });

  const tebal = (i: number): number => {
    const dasar = TEBAL[i] ?? 1;
    /* Yang tipis menebal, yang tebal sedikit menipis — itu yang membuat
       "disetel" terbaca sebagai penyesuaian, bukan sebagai penguatan. */
    return dasar + (i === 1 ? 0.5 : -0.15) * setel;
  };

  const teks = masuk(d, { mulai: B_LATIH + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SambunganMasuk tebal={tebal} opacity={0.75} skala={0.72} />
          <SimpulBesar skala={0.72} />

          <g opacity={kartu}>
            <Pil
              x={W / 2}
              y={700}
              teks={`+ ${angka(0.9 - 0.6 * setel)}`}
              warna="ingat"
              lebar={280}
              ukuran={42}
            />
            <Perbandingan
              yAtas={Y_ATAS + (Y_BAWAH - Y_ATAS - 150) * setel}
              yBawah={Y_BAWAH}
              atas="0,4"
              bawah="1,0"
              labelAtas="TEBAKAN"
              labelBawah="SASARAN"
              selisih={1 - 0.8 * setel}
            />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["DISETEL", "SAAT LATIHAN"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
