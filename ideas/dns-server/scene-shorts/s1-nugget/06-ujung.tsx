/* T14-S1 · scene 6 · ujung — payoff 3 dari 3, 8,35 dtk
   Direction: 06-ujung-direction.md
   VO:        06-ujung-vo.md

   LOKET UJUNG ADALAH SATU-SATUNYA LACI BERISI DI SELURUH SHORT INI. Kalau ada
   laci lain yang pernah digambar berisi sebelumnya, seluruh kontrasnya hilang —
   dan bersamanya seluruh gagasan Short ini.

   Aksen juga dipakai sekali saja, di sini. Di Short ini warna aksen berarti
   "yang memang punya jawabannya"; menaburkannya ke loket lain membuatnya jadi
   hiasan.

   Sosok pemiliknya ditaruh di KIRI loket teratas: sisi kanannya sudah dipakai
   kartu nomor, dan sosok yang berdiri di situ menempel ke kartu — persis
   kesalahan yang tidak terlihat sampai still-nya dirender.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Kartu,
  Komputer,
  Loket,
  NOMOR_LAMA,
  Sosok,
} from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  GARIS_S,
  I_PEMILIK_S,
  jendelaLoketS,
  KARTU_NOMOR,
  laciLoketS,
  NamaSitusS,
  PenandaS,
  posLoketS,
  SOSOK_PEMILIK,
  VIEWBOX,
  xPotonganS,
  Y_NAMA_BAWAH,
} from "../tangga-tegak";
import { beat } from "./timing.gen";

const ID = "ujung";

const B_KIRI = beat(ID, 0); // "Begitu terus, sampai potongan paling kiri."
const B_NOMOR = beat(ID, 1); // "Yang di ujung itu memegang nomornya."
const B_PEMILIK = beat(ID, 2); // "Karena di situ pemilik situsnya sendiri."

const P0 = posLoketS(0);
const P3 = posLoketS(I_PEMILIK_S);

export const Ujung: React.FC = () => {
  const d = useDetik();

  const gPen = t(d, {
    mulai: B_KIRI,
    durasi: 0.35,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const xPen = xPotonganS(1) + (xPotonganS(0) - xPotonganS(1)) * gPen;

  const nyala3 = t(d, { mulai: B_KIRI + 0.15, durasi: 0.35, dari: 0, ke: 1 });
  const laci3 = t(d, {
    mulai: B_NOMOR,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const aksen = d >= B_NOMOR;

  const j3 = jendelaLoketS(I_PEMILIK_S);
  const xp3 = xPotonganS(0);
  const panjang3 = Math.hypot(j3.x - xp3, j3.y - Y_NAMA_BAWAH);
  const pLaci = laciLoketS(I_PEMILIK_S);

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d >= B_PEMILIK
          ? "Pemilik situsnya sendiri."
          : d >= B_NOMOR
            ? "Yang ini memang punya nomornya."
            : "Sampai potongan paling kiri."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <NamaSitusS pecah={1} sorot={d < B_KIRI + 0.2 ? 1 : 0} />
        <PenandaS x={xPen} />

        {[1, 2].map((i) => {
          const j = jendelaLoketS(i);
          const xp = xPotonganS(3 - i);
          return (
            <path
              key={i}
              d={`M${xp} ${Y_NAMA_BAWAH}L${j.x} ${j.y}`}
              stroke={GARIS_S.warna}
              strokeWidth={GARIS_S.tebal}
              strokeLinecap="round"
              opacity={GARIS_S.opasitas}
            />
          );
        })}
        <path
          d={`M${xp3} ${Y_NAMA_BAWAH}L${j3.x} ${j3.y}`}
          stroke={GARIS_S.warna}
          strokeWidth={GARIS_S.tebal}
          strokeLinecap="round"
          opacity={GARIS_S.opasitas}
          {...gambarGaris(d, panjang3, { mulai: B_KIRI + 0.1, durasi: 0.45 })}
        />

        <Komputer x={P0.x} y={P0.y} skala={P0.skala} />

        {[1, 2, 3].map((i) => {
          const p = posLoketS(i);
          const pemilik = i === I_PEMILIK_S;
          return (
            <Loket
              key={i}
              x={p.x}
              y={p.y}
              skala={p.skala}
              nyala={pemilik ? nyala3 : 1}
              laci={pemilik ? laci3 : 1}
              isi={pemilik && aksen ? 1 : 0}
              aksen={pemilik && aksen}
            />
          );
        })}

        {/* kartu nomornya — berdiri di ruang kosong kanan tangga, dihubungkan
            garis tipis ke lacinya. Menempelkannya ke sisi loket membuatnya
            terbaca sebagai bagian bangunan, padahal ia justru ISI lacinya. */}
        <g style={masuk(d, { mulai: B_NOMOR + 0.25, durasi: 0.5, geser: 40 })}>
          <path
            d={`M${pLaci.x + 90 * P3.skala} ${pLaci.y}H${KARTU_NOMOR.x - 100}`}
            stroke="var(--accent-ink)"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.5}
          />
          <Kartu
            x={KARTU_NOMOR.x}
            y={pLaci.y}
            teks={NOMOR_LAMA}
            skala={KARTU_NOMOR.skala}
          />
        </g>

        {/* pemiliknya — di KIRI, sisi kanan sudah dipakai kartunya. Tanpa label
            teks: yang dikatakannya sudah ditanggung teks di layar scene ini. */}
        <g style={masuk(d, { mulai: B_PEMILIK, durasi: 0.5, geser: 24 })}>
          <Sosok x={SOSOK_PEMILIK.x} y={P3.y} skala={SOSOK_PEMILIK.skala} />
        </g>
      </svg>
    </Scene>
  );
};
