/* T19-S7 · scene 4 · makin-besar — payoff kedua
   VO:        4-makin-besar-vo.md
   Direction: 4-makin-besar-direction.md

   SATU ANGKA MENGGERAKKAN TIGA BENDA: jarak kedua kartu, panjang meter, dan
   angka di ujungnya. Tiga tween terpisah akan berpisah begitu salah satunya
   disetel — dan justru hubungan ketiganya yang jadi isi scene ini.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { angka } from "../panggung-neuron";
import { Meter, Perbandingan } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "makin-besar";

const B_JAUH = beat(ID, 0); // "Makin jauh melesetnya, makin besar angkanya."
const B_DEKAT = beat(ID, 1); // "Makin dekat, makin kecil."

const Y_ATAS_DASAR = 820;
const Y_BAWAH = 1100;

export const MakinBesar: React.FC = () => {
  const d = useDetik();

  /* Satu nilai untuk semuanya. */
  const salah =
    0.8 +
    0.15 * t(d, { mulai: B_JAUH + 0.2, durasi: 0.6, dari: 0, ke: 1, ease: E.sineInOut }) -
    0.7 * t(d, { mulai: B_DEKAT, durasi: 0.7, dari: 0, ke: 1, ease: E.sineInOut });

  /* LANTAI 150 px, bukan sekadar jarak kecil: kartu bawah punya KAPSI di 62 px
     di atasnya, jadi dua kartu yang cuma berjarak 42 px membuat kartu atas
     menimpa tulisan "SEHARUSNYA". `npm run tumpang` yang menangkapnya. */
  const yAtas = Y_BAWAH - (150 + 220 * Math.min(1, Math.max(0, salah)));

  const teks1 = masuk(d, { mulai: B_JAUH, durasi: 0.35, geser: 18 });
  const teks2 = masuk(d, { mulai: B_DEKAT, durasi: 0.35, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Perbandingan
            yAtas={yAtas}
            yBawah={Y_BAWAH}
            atas={angka(1 - salah)}
            bawah="1,0"
            labelAtas="TEBAKAN"
            labelBawah="SEHARUSNYA"
            selisih={1}
          />
          {/* Angka meter = 1,0 − angka kartu atas, dihitung dari nilai yang
              SAMA yang menggerakkan jaraknya. Meter yang menunjukkan 1,35
              sementara kartunya 0,2 dan 1,0 adalah aritmetika yang salah di
              layar — dan penonton yang menghitung sendiri berhenti percaya. */}
          <Meter y={1330} nilai={Math.max(0.02, salah)} label="SELISIH" />

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["MAKIN JAUH,", "MAKIN BESAR"]} ukuran={50} />
          </g>
          <g style={{ opacity: teks2.opacity, transform: teks2.transform }}>
            <TeksLayar baris={["MAKIN DEKAT,", "MAKIN KECIL"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
