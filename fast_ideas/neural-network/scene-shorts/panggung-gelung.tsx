/* Gelung latihan — benda bersama Short 10 (T19-S10), 9:16.
 *
 * Isi tiap kotak diambil dari EPISODENYA MASING-MASING: denyut maju Episode 06,
 * meter Episode 07, denyut mundur merah Episode 08. Itu yang membuat Episode 10
 * terasa merangkum, bukan mengulang dari nol — dan itu juga yang dijaga peta
 * § Series Continuity ("same visual language").
 *
 * Di luar folder scene (HARD RULE 1).
 */
import type React from "react";

import { GELUNG } from "./panggung-seri";

/** Setengah lebar & tinggi kotak tahap. */
export const KOTAK_W = 190;
export const KOTAK_H = 130;

/** Kotak satu tahap: bingkai + nama di bawahnya. Isinya dikirim sebagai
 *  `children` supaya tiap tahap bisa membawa gerak episodenya sendiri. */
export const KotakTahap: React.FC<{
  i: number;
  nyala: number;
  tampil?: number;
  children?: React.ReactNode;
}> = ({ i, nyala, tampil = 1, children }) => {
  const k = GELUNG[i];
  if (!k) return null;
  return (
    <g opacity={tampil} aria-hidden>
      <rect
        x={k.x - KOTAK_W / 2}
        y={k.y - KOTAK_H / 2}
        width={KOTAK_W}
        height={KOTAK_H}
        rx={20}
        fill={nyala > 0.5 ? "var(--accent-soft)" : "var(--bg-elev)"}
        stroke={nyala > 0.5 ? "var(--accent-ink)" : "var(--line)"}
        strokeWidth={5}
      />
      <g transform={`translate(${k.x} ${k.y})`}>{children}</g>
      <text
        x={k.x}
        y={k.y + KOTAK_H / 2 + 44}
        fontSize={32}
        fontFamily="var(--font-display)"
        fontWeight={800}
        fill={nyala > 0.5 ? "var(--ink-0)" : "var(--ink-2)"}
        textAnchor="middle"
        letterSpacing={1}
        opacity={nyala > 0.5 ? 1 : 0.55}
      >
        {`${i + 1} ${k.teks}`}
      </text>
    </g>
  );
};

/** Panah gelung: empat busur yang menyambungkan kotak searah jarum jam, dan
 *  yang keempat PULANG ke kotak pertama. Panah pulang itulah yang membuat empat
 *  kotak terbaca sebagai gelung, bukan sebagai daftar. */
export const PanahGelung: React.FC<{ tampil: (n: number) => number }> = ({ tampil }) => (
  <g aria-hidden>
    {[0, 1, 2, 3].map((n) => {
      const a = GELUNG[n];
      const b = GELUNG[(n + 1) % 4];
      if (!a || !b) return null;
      const mendatar = a.y === b.y;
      /* Ruas TEGAK digeser ke luar kotak. Lewat sumbu kotaknya, ia menembus
         tulisan nama tahap yang duduk 44 px di bawah tiap kotak — cacat yang
         tidak ditangkap `npm run tumpang` karena garis bukan teks. */
      const luar = (a.x < 540 ? -1 : 1) * (KOTAK_W / 2 + 45);
      const x1 = mendatar ? a.x + (b.x > a.x ? KOTAK_W / 2 + 10 : -KOTAK_W / 2 - 10) : a.x + luar;
      const y1 = mendatar ? a.y : a.y + (b.y > a.y ? KOTAK_H / 2 + 10 : -KOTAK_H / 2 - 10);
      const x2 = mendatar ? b.x + (b.x > a.x ? -KOTAK_W / 2 - 24 : KOTAK_W / 2 + 24) : b.x + luar;
      const y2 = mendatar ? b.y : b.y + (b.y > a.y ? -KOTAK_H / 2 - 24 : KOTAK_H / 2 + 24);
      const sudut = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
      return (
        <g key={n} opacity={tampil(n)}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink-2)" strokeWidth={6} strokeLinecap="round" />
          <g transform={`translate(${x2} ${y2}) rotate(${sudut})`}>
            <path d="M -18 -13 L 8 0 L -18 13 Z" fill="var(--ink-2)" />
          </g>
        </g>
      );
    })}
  </g>
);

/** Kartu contoh yang masuk ke kotak pertama. Bentuknya sengaja kecil — ia
 *  bukan tokoh di sini, cuma yang diputar. */
export const KartuContoh: React.FC<{
  x: number;
  y: number;
  teks: string;
  warna?: "biasa" | "salah";
  opacity?: number;
}> = ({ x, y, teks, warna = "biasa", opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <rect
      x={x - 70}
      y={y - 34}
      width={140}
      height={68}
      rx={12}
      fill={warna === "salah" ? "var(--bad-soft)" : "var(--bg-elev)"}
      stroke={warna === "salah" ? "var(--bad)" : "var(--ink-2)"}
      strokeWidth={4}
    />
    <text
      x={x}
      y={y + 12}
      fontSize={34}
      fontFamily="var(--font-display)"
      fontWeight={800}
      fill="var(--ink-1)"
      textAnchor="middle"
    >
      {teks}
    </text>
  </g>
);

/** Contoh yang diputar di scene 6 — DITULIS, tidak diacak. */
export const CONTOH = ["KUCING", "ANJING", "BURUNG", "IKAN"] as const;

/* --- blok transformer & jendela obrolan (Episode 14–15) --------------------

   Keduanya lahir di Episode 14 dan dipakai lagi di Episode 15. Kalau bentuknya
   berbeda di antara keduanya, seri ini berhenti terasa menyambung TEPAT di
   episode terakhirnya — tempat sambungan paling mahal. */

export const BlokTransformer: React.FC<{ y: number; tampil: number }> = ({ y, tampil }) => (
  <g opacity={tampil} aria-hidden>
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={330 + i * 8}
        y={y - 90 + i * 26}
        width={420 - i * 16}
        height={62}
        rx={14}
        fill="var(--bg-elev)"
        stroke="var(--accent-ink)"
        strokeWidth={4}
        opacity={0.5 + 0.25 * i}
      />
    ))}
  </g>
);

/** Jendela percakapan — DIGAMBAR SEDERHANA, bukan tiruan antarmuka produk
 *  tertentu: yang dibicarakan mekanismenya, bukan mereknya. */
export const JendelaObrolan: React.FC<{ y: number; tampil: number }> = ({ y, tampil }) => (
  <g opacity={tampil} aria-hidden>
    <rect x={180} y={y - 130} width={720} height={260} rx={22} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={5} />
    <rect x={220} y={y - 90} width={380} height={54} rx={27} fill="var(--bg)" stroke="var(--ink-2)" strokeWidth={3} />
    <rect x={480} y={y - 10} width={380} height={54} rx={27} fill="var(--accent-soft)" stroke="var(--accent-ink)" strokeWidth={3} />
    <rect x={220} y={y + 70} width={300} height={40} rx={20} fill="var(--bg)" stroke="var(--ink-2)" strokeWidth={3} />
  </g>
);
