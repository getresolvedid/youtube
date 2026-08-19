/* Satu neuron dari dalam — benda bersama Short 2 (T19-S2), 9:16.
 *
 * Di luar folder scene (`npm run sisa` memeriksa tiap `.tsx` di dalam folder
 * scene terhadap daftar kunci naskah), sama seperti `panggung-nn.tsx`.
 *
 * ANGKANYA HARUS BENAR-BENAR BERJUMLAH. 0,90 + 0,04 + 0,30 = 1,24, dan 1,24
 * melewati ambang 1,0. Penonton yang menghitung dan mendapati jumlahnya tidak
 * cocok berhenti mempercayai seluruh Short — ini bukan detail estetika, dan
 * itu sebabnya ketiga hasilnya diturunkan di sini, bukan diketik per scene.
 */
import type React from "react";

import { W } from "./panggung-nn";

/** Simpul besar yang jadi panggung Short 2. */
export const PUSAT = { x: W / 2, y: 950 } as const;
export const R_NEURON = 195;

/** Tiga sambungan masuk — pangkalnya di baris masukan, ujungnya di tepi atas
 *  simpul besar. */
export const X_MASUK = [300, 540, 780] as const;
export const Y_MASUK = 520;

/** Angka yang masuk, dan tebal sambungannya (0..1). Hasilnya perkalian
 *  keduanya — dihitung, tidak diketik. */
export const MASUK: readonly number[] = [0.9, 0.2, 0.5];
export const TEBAL: readonly number[] = [1, 0.2, 0.6];
export const HASIL = MASUK.map((m, i) => Math.round(m * (TEBAL[i] ?? 1) * 100) / 100);
export const JUMLAH = Math.round(HASIL.reduce((a, b) => a + b, 0) * 100) / 100;

/** Angka penggeser yang ditambahkan setelah penjumlahan — "bias" di peta.
 *
 *  DIGANTI 2026-08-19: konstanta lama di sini `AMBANG` (batas yang harus
 *  dilewati). Ambang adalah fungsi aktivasi, dan peta 15 episode menaruhnya di
 *  Episode 04; Episode 02 berhenti di bias lalu keluaran. */
export const BIAS = 0.3;

/** Nilai akhir simpul: jumlah masukan berbobot + bias. Dihitung, tidak diketik. */
export const NILAI = Math.round((JUMLAH + BIAS) * 100) / 100;

export const angka = (n: number): string => n.toFixed(2).replace(".", ",");

/** Titik tempat sambungan ke-i menyentuh simpul besar.
 *
 *  `skala` WAJIB sama dengan skala `SimpulBesar` di scene yang sama — sambungan
 *  yang berhenti di jari-jari penuh sementara simpulnya diperkecil meninggalkan
 *  celah menganga antara garis dan lingkarannya. */
export const sentuh = (i: number, skala = 1): { x: number; y: number } => {
  const x0 = X_MASUK[i] ?? W / 2;
  const dx = x0 - PUSAT.x;
  const dy = Y_MASUK - PUSAT.y;
  const p = Math.hypot(dx, dy);
  return {
    x: PUSAT.x + (dx / p) * R_NEURON * skala,
    y: PUSAT.y + (dy / p) * R_NEURON * skala,
  };
};

export const SimpulBesar: React.FC<{
  nyala?: number;
  skala?: number;
  opacity?: number;
}> = ({ nyala = 0, skala = 1, opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <circle
      cx={PUSAT.x}
      cy={PUSAT.y}
      r={R_NEURON * skala + 30 * nyala}
      fill="var(--accent-ink)"
      opacity={0.28 * nyala}
    />
    <circle
      cx={PUSAT.x}
      cy={PUSAT.y}
      r={R_NEURON * skala}
      fill={nyala > 0.5 ? "var(--accent)" : "var(--bg-elev)"}
      stroke={nyala > 0.5 ? "var(--accent-ink)" : "var(--ink-2)"}
      strokeWidth={6}
    />
  </g>
);

/** Tiga sambungan masuk. `tebal` dipisah dari daftar TEBAL supaya scene 2 bisa
 *  menganimasikan perubahannya dari seragam ke berbeda-beda. */
export const SambunganMasuk: React.FC<{
  tebal?: (i: number) => number;
  nyala?: (i: number) => number;
  opacity?: number;
  /** Sama dengan skala `SimpulBesar` di scene yang sama. */
  skala?: number;
}> = ({ tebal, nyala, opacity = 1, skala = 1 }) => (
  <g opacity={opacity} aria-hidden>
    {X_MASUK.map((x, i) => {
      const u = sentuh(i, skala);
      const n = nyala ? nyala(i) : 0;
      return (
        <line
          key={x}
          x1={x}
          y1={Y_MASUK}
          x2={u.x}
          y2={u.y}
          stroke={n > 0.5 ? "var(--accent-ink)" : "var(--ink-2)"}
          strokeWidth={6 + 26 * (tebal ? tebal(i) : 1)}
          strokeLinecap="round"
          opacity={n > 0.5 ? 1 : 0.55}
        />
      );
    })}
  </g>
);

/** Geseran mendatar tiap angka supaya ia tidak duduk DI ATAS sambungannya.
 *  Angka yang bertumpuk garis tetap terbaca oleh `npm run tumpang` (garis bukan
 *  teks), tapi tidak terbaca oleh mata — dan angka itulah isi scene 2–4. */
export const GESER_ANGKA: readonly number[] = [-92, 70, 120];

/** Satu angka yang sedang berjalan di sepanjang sambungan. */
export const AngkaJalan: React.FC<{
  i: number;
  /** 0 = di pangkal sambungan, 1 = di tepi simpul. */
  maju: number;
  nilai: number;
  skala?: number;
  opacity?: number;
  warna?: string;
}> = ({ i, maju, nilai, skala = 1, opacity = 1, warna = "var(--ink-0)" }) => {
  const x0 = X_MASUK[i] ?? W / 2;
  const u = sentuh(i);
  /* Geserannya IKUT membesar bersama angkanya. Geseran tetap cukup saat angka
     berukuran normal, tapi begitu ia tumbuh di scene 3 (skala sampai ±1,4),
     sisi dalamnya kembali menyentuh sambungan — cacat satu detik yang tidak
     ditangkap `npm run tumpang` karena garis bukan teks. */
  const x = x0 + (u.x - x0) * maju + (GESER_ANGKA[i] ?? 0) * skala;
  const y = Y_MASUK + (u.y - Y_MASUK) * maju;
  return (
    <text
      x={x}
      y={y}
      fontSize={54 * skala}
      fontFamily="var(--font-mono)"
      fontWeight={700}
      fill={warna}
      textAnchor="middle"
      opacity={opacity}
      aria-hidden
    >
      {angka(nilai)}
    </text>
  );
};

/** Kapsul bias yang masuk dari samping. Dibedakan warnanya dari masukan: ia
 *  BUKAN masukan keempat — ia tidak datang dari sambungan mana pun, dan itu
 *  seluruh bedanya. */
export const PilBias: React.FC<{ x: number; y: number; opacity?: number }> = ({
  x,
  y,
  opacity = 1,
}) => (
  <g opacity={opacity} aria-hidden>
    <rect
      x={x - 130}
      y={y - 42}
      width={260}
      height={84}
      rx={42}
      fill="var(--bg-elev)"
      stroke="var(--warn)"
      strokeWidth={5}
    />
    <text
      x={x}
      y={y + 14}
      fontSize={40}
      fontFamily="var(--font-mono)"
      fontWeight={700}
      fill="var(--warn)"
      textAnchor="middle"
    >
      {`+ ${angka(BIAS)}`}
    </text>
  </g>
);
