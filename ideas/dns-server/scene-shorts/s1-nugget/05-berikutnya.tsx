/* T14-S1 · scene 5 · berikutnya — payoff 2 dari 3, 5,26 dtk
   Direction: 05-berikutnya-direction.md
   VO:        05-berikutnya-vo.md

   PALING PENDEK di antara ketiga payoff, dan itu disengaja: begitu pola
   "menunjuk, bukan menjawab" terbaca sekali di scene 4, mengulanginya
   panjang-panjang membuang detik yang dibutuhkan scene 6.

   Laci loket pertama TETAP TERBUKA di sini. Menutupnya membuat penonton mengira
   keadaan itu sudah selesai; yang dimaksud justru bahwa keduanya kosong pada
   saat yang sama.
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
import { TUNJUK_SEBAGIAN } from "./04-paling-kanan";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_MENUNJUK = beat(ID, 0); // "Jadi dia tidak menjawab. Dia menunjuk."
const B_BERIKUT = beat(ID, 1); // "Potongan berikutnya membuka loket berikutnya."

const P0 = posLoketS(0);

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  /* Lanjutan tangan penunjuk scene 4 — titik mulainya dibaca dari sana, bukan
     diketik ulang. */
  const tunjuk = t(d, {
    mulai: B_MENUNJUK,
    durasi: 0.4,
    dari: TUNJUK_SEBAGIAN,
    ke: 1,
    ease: E.power2out,
  });

  const gPen = t(d, {
    mulai: B_BERIKUT,
    durasi: 0.3,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const xPen = xPotonganS(2) + (xPotonganS(1) - xPotonganS(2)) * gPen;

  const nyala2 = t(d, { mulai: B_BERIKUT + 0.15, durasi: 0.35, dari: 0, ke: 1 });
  const laci2 = t(d, {
    mulai: B_BERIKUT + 0.35,
    durasi: 0.55,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });

  const j1 = jendelaLoketS(1);
  const j2 = jendelaLoketS(2);
  const xp1 = xPotonganS(2);
  const xp2 = xPotonganS(1);
  const panjang1 = Math.hypot(j1.x - xp1, j1.y - Y_NAMA_BAWAH);
  const panjang2 = Math.hypot(j2.x - xp2, j2.y - Y_NAMA_BAWAH);

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_BERIKUT
          ? "Dia menunjuk, bukan menjawab."
          : "Potongan berikutnya, loket berikutnya."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <NamaSitusS pecah={1} sorot={d < B_BERIKUT ? 2 : 1} />
        <PenandaS x={xPen} />

        {/* garis scene 4 tetap terpasang; garis kedua menyusul */}
        <path
          d={`M${xp1} ${Y_NAMA_BAWAH}L${j1.x} ${j1.y}`}
          stroke={GARIS_S.warna}
          strokeWidth={GARIS_S.tebal}
          strokeLinecap="round"
          opacity={GARIS_S.opasitas}
        />
        <path
          d={`M${xp2} ${Y_NAMA_BAWAH}L${j2.x} ${j2.y}`}
          stroke={GARIS_S.warna}
          strokeWidth={GARIS_S.tebal}
          strokeLinecap="round"
          opacity={GARIS_S.opasitas}
          {...gambarGaris(d, panjang2, { mulai: B_BERIKUT + 0.1, durasi: 0.4 })}
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
              nyala={i === 1 ? 1 : i === 2 ? nyala2 : 0}
              laci={i === 1 ? 1 : i === 2 ? laci2 : 0}
              isi={0}
            />
          );
        })}

        {/* tangan penunjuk menyelesaikan sisanya — lanjutan, bukan tangan baru */}
        <g>
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

        {/* panjang garis pertama dipakai sebagai jaminan bentuknya tidak berubah
            dari scene 4 — kalau angkanya bergeser, garisnya memang salah. */}
        <desc>{`garis-1=${Math.round(panjang1)}`}</desc>
      </svg>
    </Scene>
  );
};
