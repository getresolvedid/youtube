/* T14-S1 · scene 4 · paling-kanan — payoff 1 dari 3, 8,35 dtk
   Direction: 04-paling-kanan-direction.md
   VO:        04-paling-kanan-vo.md

   Langkah pertama tangga, satu-satunya yang dijelaskan utuh. Dua langkah
   sesudahnya tinggal mengulang polanya, dan itu sebabnya scene ini boleh
   sepanjang ini di Short 55 detik.

   TIGA HAL YANG TIDAK BOLEH BERUBAH:

   1. Laci kosong DIBUKA di layar. Kekosongan yang tidak pernah ditunjukkan
      terbaca sebagai "belum sempat digambar isinya", bukan sebagai fakta.
   2. Tangan penunjuk BERHENTI DI TENGAH. Sisanya milik scene 5; menyelesaikannya
      di sini membuat scene berikutnya cuma mengulang.
   3. Loket 2 dan 3 tetap siluet. Tidak ada yang menyala mendahului urutannya.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Komputer, Loket } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  GARIS_S,
  jendelaLoketS,
  NamaSitusS,
  PenandaS,
  posLoketS,
  VIEWBOX,
  xPotonganS,
  Y_NAMA_BAWAH,
} from "../tangga-tegak";
import { beat } from "./timing.gen";

const ID = "paling-kanan";

const B_KANAN = beat(ID, 0); // "Yang ditanya duluan potongan paling kanan."
const B_KOSONG = beat(ID, 1); // "Loketnya tidak tahu apa-apa soal situsnya."
const B_MENUNJUK = beat(ID, 2); // "Cuma tahu siapa yang mengurus akhirannya."

/** Sejauh mana tangan penunjuk tumbuh di scene ini. Sisanya milik scene 5 —
 *  angkanya diulang di sana, dan itu satu-satunya angka yang memang harus sama
 *  di dua berkas: yang di sini titik berhentinya, yang di sana titik mulainya. */
export const TUNJUK_SEBAGIAN = 0.45;

const P0 = posLoketS(0);

export const PalingKanan: React.FC = () => {
  const d = useDetik();

  const nyala1 = t(d, { mulai: B_KANAN + 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const laci1 = t(d, {
    mulai: B_KOSONG,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const tunjuk = t(d, {
    mulai: B_MENUNJUK,
    durasi: 0.5,
    dari: 0,
    ke: TUNJUK_SEBAGIAN,
    ease: E.expoOut,
  });

  const j1 = jendelaLoketS(1);
  const j2 = jendelaLoketS(2);
  const xp = xPotonganS(2);
  const panjangGaris = Math.hypot(j1.x - xp, j1.y - Y_NAMA_BAWAH);

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d >= B_MENUNJUK
          ? "Dia cuma tahu siapa berikutnya."
          : d >= B_KOSONG
            ? "Lacinya kosong."
            : "Yang paling kanan dulu."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <NamaSitusS pecah={1} sorot={2} />
        <PenandaS x={xp} />

        {/* garis potongan paling kanan -> loket pertama di atasmu */}
        <path
          d={`M${xp} ${Y_NAMA_BAWAH}L${j1.x} ${j1.y}`}
          stroke={GARIS_S.warna}
          strokeWidth={GARIS_S.tebal}
          strokeLinecap="round"
          opacity={GARIS_S.opasitas}
          {...gambarGaris(d, panjangGaris, { mulai: B_KANAN + 0.15, durasi: 0.5 })}
        />

        <Komputer x={P0.x} y={P0.y} skala={P0.skala} />

        {[1, 2, 3].map((i) => {
          const p = posLoketS(i);
          return (
            <Loket
              key={i}
              x={p.x}
              y={p.y}
              skala={p.skala}
              nyala={i === 1 ? nyala1 : 0}
              laci={i === 1 ? laci1 : 0}
              isi={0}
            />
          );
        })}

        {/* tangan penunjuk — berhenti di tengah jalan, sengaja */}
        {tunjuk > 0 && (
          <g opacity={Math.min(1, tunjuk / TUNJUK_SEBAGIAN)}>
            <path
              d={`M${j1.x} ${j1.y}L${j1.x + (j2.x - j1.x) * tunjuk} ${
                j1.y + (j2.y - j1.y) * tunjuk
              }`}
              stroke="var(--ink-1)"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <circle
              cx={j1.x + (j2.x - j1.x) * tunjuk}
              cy={j1.y + (j2.y - j1.y) * tunjuk}
              r={10}
              fill="var(--ink-1)"
            />
          </g>
        )}
      </svg>
    </Scene>
  );
};
