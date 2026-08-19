/* Lapisan — benda bersama Short 3 (T19-S3), 9:16.
 *
 * Di luar folder scene, sama seperti panggung-nn dan panggung-neuron.
 *
 * KOORDINAT LAPISNYA DIPINJAM dari `panggung-nn`, tidak ditulis ulang: Short 3
 * menunjukkan jaringan yang SAMA dengan Short 1 dan 2, cuma lapis tengahnya
 * yang datang belakangan. Dua daftar koordinat berarti dua jaringan yang cuma
 * mirip.
 */
import type React from "react";

import { X_SIMPUL, Y_LAPIS, simpul } from "./panggung-nn";

export const Y_IN = Y_LAPIS[0];
export const Y_MID = Y_LAPIS[1];
export const Y_OUT = Y_LAPIS[2];

/** Jaringan Short 3. `tengah` 0 = dua lapis saja (masukan langsung ke jawaban),
 *  `tengah` 1 = lapis tengah hadir penuh dan sambungan langsungnya sudah putus. */
export const JaringLapis: React.FC<{
  tengah?: number;
  opacity?: number;
  nyalaMid?: (i: number) => number;
}> = ({ tengah = 0, opacity = 1, nyalaMid }) => {
  const out = simpul(2, 0);
  return (
    <g opacity={opacity} aria-hidden>
      {/* Sambungan LANGSUNG masukan → jawaban. Ia memudar duluan, baru yang baru
          tumbuh — kalau bersamaan, lapis baru terbaca sebagai hiasan yang
          ditempel, bukan sebagai jalan yang sekarang harus dilewati. */}
      {X_SIMPUL.map((x) => (
        <line
          key={`l-${x}`}
          x1={x}
          y1={Y_IN}
          x2={out.x}
          y2={Y_OUT}
          stroke="var(--ink-2)"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.55 * Math.max(0, 1 - tengah * 1.6)}
        />
      ))}

      {X_SIMPUL.map((x) =>
        X_SIMPUL.map((xm) => (
          <line
            key={`a-${x}-${xm}`}
            x1={x}
            y1={Y_IN}
            x2={xm}
            y2={Y_MID}
            stroke="var(--ink-2)"
            strokeWidth={5}
            strokeLinecap="round"
            opacity={0.55 * tengah}
          />
        )),
      )}
      {X_SIMPUL.map((xm) => (
        <line
          key={`b-${xm}`}
          x1={xm}
          y1={Y_MID}
          x2={out.x}
          y2={Y_OUT}
          stroke="var(--ink-2)"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.55 * tengah}
        />
      ))}

      {X_SIMPUL.map((x) => (
        <circle
          key={`in-${x}`}
          cx={x}
          cy={Y_IN}
          r={34}
          fill="var(--bg-elev)"
          stroke="var(--ink-2)"
          strokeWidth={5}
        />
      ))}
      {X_SIMPUL.map((x, i) => {
        const n = nyalaMid ? nyalaMid(i) : 0;
        return (
          <circle
            key={`mid-${x}`}
            cx={x}
            cy={Y_MID}
            r={34}
            fill={n > 0.5 ? "var(--accent)" : "var(--bg-elev)"}
            stroke={n > 0.5 ? "var(--accent-ink)" : "var(--ink-2)"}
            strokeWidth={5}
            opacity={tengah}
          />
        );
      })}
      <circle
        cx={out.x}
        cy={Y_OUT}
        r={34}
        fill="var(--bg-elev)"
        stroke="var(--ink-2)"
        strokeWidth={5}
      />
    </g>
  );
};

/* --- sebaran titik (scene 2) ------------------------------------------------

   POLANYA XOR: dua kelompok di sudut yang berseberangan. Ini bukan pilihan
   gaya — sebaran seperti inilah yang benar-benar TIDAK bisa dipisah satu garis
   lurus, dan seluruh Short 3 berdiri di atas klaim itu. Sebaran yang sebenarnya
   bisa dipisah, lalu digambar seolah tidak, membuat Short-nya bohong.

   Titiknya DITULIS, tidak diacak: `Math.random()` menghasilkan gambar berbeda
   tiap frame saat render paralel (CLAUDE.md § Deterministik). */

export const KOTAK = { x1: 260, y1: 880, x2: 820, y2: 1330 } as const;

export const dalam = (u: number, v: number) => ({
  x: KOTAK.x1 + (KOTAK.x2 - KOTAK.x1) * u,
  y: KOTAK.y1 + (KOTAK.y2 - KOTAK.y1) * v,
});

export const TITIK: readonly { x: number; y: number; biru: boolean }[] = [
  ...[
    [0.14, 0.18], [0.28, 0.1], [0.2, 0.32], [0.34, 0.26],
    [0.72, 0.74], [0.86, 0.82], [0.78, 0.9], [0.9, 0.66],
  ].map(([u, v]) => ({ ...dalam(u ?? 0, v ?? 0), biru: true })),
  ...[
    [0.74, 0.16], [0.88, 0.28], [0.8, 0.34], [0.9, 0.12],
    [0.16, 0.78], [0.26, 0.9], [0.12, 0.66], [0.3, 0.72],
  ].map(([u, v]) => ({ ...dalam(u ?? 0, v ?? 0), biru: false })),
];

export const Sebaran: React.FC<{
  tampil?: (i: number) => number;
  salah?: (i: number) => number;
}> = ({ tampil, salah }) => (
  <g aria-hidden>
    {TITIK.map((p, i) => {
      const s = salah ? salah(i) : 0;
      return (
        <circle
          key={`${p.x}-${p.y}`}
          cx={p.x}
          cy={p.y}
          r={16 + 8 * s}
          fill={p.biru ? "var(--accent-ink)" : "var(--bad)"}
          opacity={(tampil ? tampil(i) : 1) * (0.55 + 0.45 * (1 - s) + s)}
        />
      );
    })}
  </g>
);

/** Garis lurus pemisah — melalui pusat kotak, sudutnya dalam derajat. */
export const GarisPemisah: React.FC<{ sudut: number; opacity?: number }> = ({
  sudut,
  opacity = 1,
}) => {
  const cx = (KOTAK.x1 + KOTAK.x2) / 2;
  const cy = (KOTAK.y1 + KOTAK.y2) / 2;
  const r = 420;
  const a = (sudut * Math.PI) / 180;
  return (
    <line
      x1={cx - Math.cos(a) * r}
      y1={cy - Math.sin(a) * r}
      x2={cx + Math.cos(a) * r}
      y2={cy + Math.sin(a) * r}
      stroke="var(--ink-0)"
      strokeWidth={7}
      strokeLinecap="round"
      opacity={opacity}
      aria-hidden
    />
  );
};

/** Temuan lapis pertama: potongan sederhana. Digambar, bukan diberi label —
 *  menuliskan "tepi miring" mengubah scene jadi daftar. */
export const Potongan: React.FC<{
  jenis: 0 | 1 | 2;
  x: number;
  y: number;
  opacity?: number;
  skala?: number;
}> = ({ jenis, x, y, opacity = 1, skala = 1 }) => {
  const d =
    jenis === 0
      ? `M ${-30} ${30} L ${30} ${-30}`
      : jenis === 1
        ? `M 0 ${-34} L 0 ${34}`
        : `M ${-30} ${24} Q 0 ${-34} ${30} ${24}`;
  return (
    <g
      opacity={opacity}
      transform={`translate(${x} ${y}) scale(${skala})`}
      aria-hidden
    >
      <rect x={-48} y={-48} width={96} height={96} rx={14} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={4} />
      <path d={d} fill="none" stroke="var(--accent-ink)" strokeWidth={9} strokeLinecap="round" />
    </g>
  );
};

/** Tangga tiga anak — NAIK, karena yang harus terbaca "makin lama makin besar"
 *  (docs/03 § Bahasa gerak: yang bertumpuk bergerak tegak). */
export const ANAK_TANGGA = [
  { teks: "POTONGAN", x: 280, y: 1180 },
  { teks: "BENTUK", x: 540, y: 1010 },
  { teks: "KUCING", x: 800, y: 840 },
] as const;

export const CX_KOTAK = (KOTAK.x1 + KOTAK.x2) / 2;
export const CY_KOTAK = (KOTAK.y1 + KOTAK.y2) / 2;
/* --- batas pemisah & titik baru (Episode 11) -------------------------------

   Dua bentuk batas untuk sebaran yang sama: yang MENGHAFAL (berkelok rapat,
   menempel ke tiap titik latihan) dan yang MENANGKAP POLA (mulus). Keduanya
   fungsi dari u yang sama, jadi bentuk antaranya bisa dihitung tiap frame —
   itu yang membuat "melurus" terbaca sebagai perubahan, bukan pergantian. */

/** Batas yang menghafal — berkelok rapat. */
export const BATAS_HAFAL = (u: number): number =>
  Math.sin(u * Math.PI * 1.15) * 0.72 + Math.sin(u * Math.PI * 6.5) * 0.2;

/** Batas yang menangkap pola — bentuk besarnya sama, kelokan kecilnya hilang. */
export const BATAS_POLA = (u: number): number => Math.sin(u * Math.PI * 1.15) * 0.72;

/** Titik yang BARU dilihat model. DITULIS, tidak diacak — dan sengaja ditaruh
 *  di celah antar-titik latihan, tempat batas yang menghafal paling meleset. */
export const TITIK_BARU: readonly { x: number; y: number; biru: boolean }[] = [
  { ...dalam(0.46, 0.24), biru: true },
  { ...dalam(0.62, 0.44), biru: false },
  { ...dalam(0.4, 0.62), biru: false },
  { ...dalam(0.56, 0.8), biru: true },
];
