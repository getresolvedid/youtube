/* T19-S9 · scene 3 · menurun — payoff
   VO:        3-menurun-vo.md
   Direction: 3-menurun-direction.md

   SATU KEPUTUSAN YANG MENGIKAT: DUA panah berlawanan, bukan satu. Peta
   menyebutnya terang-terangan — "the gradient points toward the direction of
   steepest increase, so we move the other way". Kalau cuma panah turun yang
   digambar, bagian paling berlawanan-akal-sehat dari gradient descent hilang,
   dan yang tersisa cuma bola yang menggelinding.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import {
  Bola,
  LANGKAH,
  Lereng,
  Singgung,
  SumbuMeleset,
  miring,
  xLereng,
  yLereng,
} from "../panggung-lereng";
import { beat } from "./timing.gen";

const ID = "menurun";

const B_MENANJAK = beat(ID, 0); // "Kemiringan di kakinya menunjuk ke arah menanjak."
const B_KEBALIKAN = beat(ID, 1); // "Jadi ia bergerak kebalikannya: turun."

const U_AWAL = LANGKAH[0] ?? 0.86;
const U_SESUDAH = 0.72;

/** Panah pendek sepanjang kaki bola, arahnya mengikuti kemiringan di titik itu.
 *  `tanda` +1 = menanjak (arah gradien), -1 = menurun (arah langkahnya). */
const Panah: React.FC<{ u: number; tanda: 1 | -1; warna: string; opacity: number }> = ({
  u,
  tanda,
  warna,
  opacity,
}) => {
  const m = miring(u);
  const n = Math.hypot(1, m);
  /* Menanjak berarti menjauhi dasar. Di sisi kanan lereng (u > 0) itu ke kanan;
     tandanya dihitung dari kemiringannya sendiri, bukan diketik per sisi. */
  const arah = (m >= 0 ? 1 : -1) * tanda;
  const dx = (150 * arah) / n;
  const dy = (150 * arah * m) / n;
  const x = xLereng(u);
  const y = yLereng(u) - 8;
  const sudut = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <g opacity={opacity} aria-hidden>
      <line x1={x} y1={y} x2={x + dx} y2={y + dy} stroke={warna} strokeWidth={9} strokeLinecap="round" />
      <g transform={`translate(${x + dx} ${y + dy}) rotate(${sudut})`}>
        <path d="M -18 -15 L 12 0 L -18 15 Z" fill={warna} />
      </g>
    </g>
  );
};

export const Menurun: React.FC = () => {
  const d = useDetik();

  const naik = t(d, { mulai: B_MENANJAK + 0.15, durasi: 0.35, dari: 0, ke: 1 });
  const turun = t(d, { mulai: B_KEBALIKAN, durasi: 0.35, dari: 0, ke: 1 });

  /* Bola bergerak sedikit ke arah menurun — sedikit, karena empat langkah
     penuhnya milik scene 4. */
  const geser = t(d, {
    mulai: B_KEBALIKAN + 0.3,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const u = U_AWAL + (U_SESUDAH - U_AWAL) * geser;

  const teks1 = masuk(d, { mulai: B_MENANJAK, durasi: 0.35, geser: 18 });
  const teks2 = masuk(d, { mulai: B_KEBALIKAN, durasi: 0.35, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SumbuMeleset />
          <Lereng />
          <Singgung u={u} opacity={naik} />
          <Panah u={u} tanda={1} warna="var(--bad)" opacity={naik * (1 - 0.35 * turun)} />
          <Panah u={u} tanda={-1} warna="var(--ok)" opacity={turun} />
          <Bola u={u} />

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["ARAH MENANJAK"]} ukuran={54} />
          </g>
          <g style={{ opacity: teks2.opacity, transform: teks2.transform }}>
            <TeksLayar baris={["JADI: TURUN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
