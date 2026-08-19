/* Lereng — benda bersama Short 4 (T19-S4), 9:16.
 *
 * SUMBU TEGAKNYA "MELESET", kata yang sama persis dengan Short 1. Ini bukan
 * benda baru: batang merah di Short 1 dan tinggi lereng di sini mengukur hal
 * yang sama. Kalau kata itu diganti, keempat Short berhenti jadi satu seri.
 *
 * KEMIRINGANNYA DIHITUNG DARI TURUNAN KURVANYA, bukan diketik per langkah.
 * Garis singgung yang sudutnya ditulis tangan akan meleset dari kurvanya begitu
 * satu angka bentuk lereng berubah — dan melesetnya justru di scene yang
 * seluruh isinya "arahnya dari kemiringan".
 */
import type React from "react";

import { W } from "./panggung-nn";

/** Dasar lereng ada di tengah frame; makin ke tepi makin tinggi. */
export const CX = W / 2;
export const Y_DASAR = 1240;
export const LEBAR = 380;
export const TINGGI = 470;

/** u ∈ [-1, 1] → titik di lereng. Bentuknya parabola: tinggi = TINGGI · u². */
export const xLereng = (u: number): number => CX + u * LEBAR;
export const yLereng = (u: number): number => Y_DASAR - TINGGI * u * u;

/** Kemiringan dy/dx di titik u — turunan analitik, bukan beda dua titik.
 *  Positif = menanjak ke kanan. */
export const miring = (u: number): number => (-2 * TINGGI * u) / LEBAR;

/** Jalur kurvanya, disampel rapat. 61 titik cukup untuk mulus di 1080 px dan
 *  murah untuk dihitung tiap frame. */
export const JALUR = (() => {
  const n = 60;
  let d = "";
  for (let i = 0; i <= n; i += 1) {
    const u = -1 + (2 * i) / n;
    d += `${i === 0 ? "M" : "L"} ${xLereng(u).toFixed(1)} ${yLereng(u).toFixed(1)} `;
  }
  return d.trim();
})();

/** Panjang kurva, untuk `gambarGaris()`. Dihitung dari sampel yang sama. */
export const PANJANG = (() => {
  const n = 60;
  let p = 0;
  for (let i = 1; i <= n; i += 1) {
    const a = -1 + (2 * (i - 1)) / n;
    const b = -1 + (2 * i) / n;
    p += Math.hypot(xLereng(b) - xLereng(a), yLereng(b) - yLereng(a));
  }
  return Math.ceil(p);
})();

export const Lereng: React.FC<{
  gambar?: { strokeDasharray: number; strokeDashoffset: number };
  opacity?: number;
}> = ({ gambar, opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <path
      d={JALUR}
      fill="none"
      stroke="var(--ink-2)"
      strokeWidth={8}
      strokeLinecap="round"
      {...gambar}
    />
  </g>
);

/** Sumbu tegak berlabel MELESET, di kiri lereng — di dalam kotak aman, jauh
 *  dari rail tombol kanan. */
export const SumbuMeleset: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <line
      x1={150}
      y1={Y_DASAR}
      x2={150}
      y2={Y_DASAR - TINGGI - 40}
      stroke="var(--ink-2)"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <path d={`M 136 ${Y_DASAR - TINGGI - 20} L 150 ${Y_DASAR - TINGGI - 48} L 164 ${Y_DASAR - TINGGI - 20} Z`} fill="var(--ink-2)" />
    <text
      x={150}
      y={Y_DASAR - TINGGI - 72}
      fontSize={34}
      fontFamily="var(--font-display)"
      fontWeight={800}
      fill="var(--ink-1)"
      textAnchor="middle"
      letterSpacing={2}
    >
      MELESET
    </text>
  </g>
);

/** Bola di posisi u. */
export const Bola: React.FC<{ u: number; opacity?: number; turun?: number }> = ({
  u,
  opacity = 1,
  turun = 0,
}) => (
  <g opacity={opacity} aria-hidden>
    <circle
      cx={xLereng(u)}
      cy={yLereng(u) - 26 + turun}
      r={30}
      fill="var(--accent)"
      stroke="var(--accent-ink)"
      strokeWidth={5}
    />
  </g>
);

/** Garis singgung PENDEK di kaki bola — dan pendeknya itu inti seluruh Short:
 *  yang bisa dilihat jaringan cuma kemiringan di titik tempatnya berdiri, bukan
 *  seluruh lereng. Garis panjang membuat penonton menyimpulkan jaringannya
 *  sudah tahu di mana dasarnya. */
export const Singgung: React.FC<{ u: number; opacity?: number; panjang?: number }> = ({
  u,
  opacity = 1,
  panjang = 110,
}) => {
  const m = miring(u);
  const n = Math.hypot(1, m);
  const dx = (panjang / 2) * (1 / n);
  const dy = (panjang / 2) * (m / n);
  const x = xLereng(u);
  const y = yLereng(u);
  return (
    <line
      x1={x - dx}
      y1={y - dy}
      x2={x + dx}
      y2={y + dy}
      stroke="var(--warn)"
      strokeWidth={9}
      strokeLinecap="round"
      opacity={opacity}
      aria-hidden
    />
  );
};

/** Empat langkah menuruni lereng. Tiap langkah MEMENDEK mendekati dasar karena
 *  lerengnya makin landai — benar secara mekanisme, dan sekaligus yang membuat
 *  bola berhenti tanpa direm. */
export const LANGKAH: readonly number[] = [0.86, 0.52, 0.26, 0.1, 0.02];
