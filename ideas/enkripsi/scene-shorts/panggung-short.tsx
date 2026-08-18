/* Koordinat 9:16 untuk Shorts topik "enkripsi".

   KENAPA BERKAS SENDIRI, PADAHAL SUDAH ADA ../panggung-kiriman.tsx.
   Yang bisa dipakai ulang lintas rasio cuma KOMPONENNYA — sosok, HP, paket,
   kotak proses, kunci, gembok. Koordinatnya tidak: `panggung-kiriman.tsx`
   menaruh jalur mendatar dari x 300 ke 1620 di kanvas 1920 x 1080, dan di
   kanvas 1080 x 1920 angka itu keluar frame. Menyalin komponennya ke sini akan
   membuat paket Short dan paket video panjang jadi dua benda yang cuma mirip;
   menyalin koordinatnya ke sini akan membuat Short-nya kosong di kanan.

   Jadi: komponen DIIMPOR, koordinat DITULIS ULANG di sini.

   Berkas ini tinggal di `scene-shorts/`, DI LUAR folder scene-nya — `npm run
   sisa` memeriksa setiap `.tsx` di dalam folder scene terhadap daftar kunci
   dari naskah, jadi berkas bantu yang tinggal di sana dilaporkan sebagai nama
   yang tidak dikenal (CLAUDE.md HARD RULE 1).

   ARAHNYA MEMUTAR 90°: di video panjang kiri = pengirim, kanan = penerima. Di
   9:16 tidak ada ruang mendatar untuk itu, jadi jalurnya TEGAK — atas =
   pengirim, bawah = penerima. Perputaran itu disengaja dan konsisten di
   keempat Short; yang tidak boleh cuma satu Short memutar arahnya sendiri.
*/
import type React from "react";

import { SIMPUL_JAUH } from "../panggung-kiriman";

/** Kanvas Short. Dipakai sebagai viewBox di tiap scene. */
export const W = 1080;
export const H = 1920;

/** Jalur TEGAK — atas ke bawah. Panjangnya dipatok oleh empat benda yang harus
 *  muat sekaligus di frame penutup: HP pengirim, jalurnya, layar yang mengamati,
 *  dan HP penerima. Di 16:9 keempatnya berjajar mendatar dan lega; di 9:16
 *  jalurnya yang harus mengalah. */
export const JALUR = { x: W / 2, atas: 680, bawah: 1180 } as const;

/** Simpul di sepanjang jalur. Jaraknya DITULIS, tidak dihitung dari acak:
 *  `Math.random()` menghasilkan gambar berbeda tiap frame saat render paralel. */
export const SIMPUL = [680, 805, 930, 1055, 1180] as const;

/** Simpul latar. Diturunkan dari daftar yang sama dengan video panjang lalu
 *  DIPUTAR — bukan ditulis ulang, supaya jaringan latarnya tetap terasa berasal
 *  dari tempat yang sama walau bingkainya berbeda. */
export const LATAR = SIMPUL_JAUH.map((s) => ({
  x: (s.y / 1080) * W,
  y: (s.x / 1920) * H,
}));

/** Yang mengamati — DI SAMPING jalur, bukan di atasnya. Bedanya berarti: di
 *  jalur ia terbaca sebagai bagian dari jalannya, sesuatu yang memang harus
 *  dilewati; di samping jalur ia terbaca sebagai seseorang yang kebetulan bisa
 *  melihat. Dipakai di Short 1 (sebagai siluet), 2, dan 3 — di koordinat yang
 *  sama persis, karena seluruh perbandingan seri ini bertumpu pada itu. */
export const MONITOR = { x: 690, y: 880, w: 340, h: 230 } as const;
export const PENGAMAT = { x: 838, alas: 1430 } as const;
export const TUMPU_MONITOR = {
  cx: MONITOR.x + MONITOR.w / 2,
  cy: MONITOR.y + MONITOR.h / 2,
} as const;

/** HP pengirim, di ujung ATAS jalur. */
export const HP_PENGIRIM = { x: 390, y: 80, w: 300, h: 520 } as const;

/** Skala saat layar itu mengisi frame. Satu nilai untuk scene 2 dan scene 6 —
 *  push-in yang berbeda membuat penonton mengira ia melihat tempat yang lain,
 *  dan perbandingannya ikut hilang. */
export const RAPAT_MONITOR = 2.0;

/** HP penerima, di ujung BAWAH jalur. */
export const HP_PENERIMA = { x: 390, y: 1260, w: 300, h: 520 } as const;

/** Kamera 9:16 — sama bentuknya dengan yang di video panjang, tapi titik
 *  tengahnya beda karena kanvasnya beda. Ditulis di sini supaya tidak ada scene
 *  Short yang memanggil versi 16:9-nya dan diam-diam bertumpu di titik yang salah. */
export const kamera = (skala: number, cx = W / 2, cy = H / 2): string =>
  `translate(${cx} ${cy}) scale(${skala}) translate(${-cx} ${-cy})`;

/** Merapat KE sebuah benda sekaligus MEMBAWANYA ke tengah frame — lihat
 *  `kameraKe` di ../panggung-kiriman.tsx untuk alasannya. */
export const kameraKe = (
  skala: number,
  cx: number,
  cy: number,
  maks: number,
): string => {
  const p = maks > 1 ? Math.min(1, Math.max(0, (skala - 1) / (maks - 1))) : 0;
  const ax = cx + (W / 2 - cx) * p;
  const ay = cy + (H / 2 - cy) * p;
  return `translate(${ax} ${ay}) scale(${skala}) translate(${-cx} ${-cy})`;
};

/** Nyala satu simpul saat paket melewatinya — fungsi murni dari POSISI paket,
 *  bukan dari waktu. Simpul menyala karena ada yang lewat, jadi nyalanya tidak
 *  pernah meleset saat satu kalimat VO berubah dan seluruh timing bergeser. */
export const nyalaSimpul =
  (yPaket: number) =>
  (i: number): number =>
    Math.max(0, 1 - Math.abs(yPaket - (SIMPUL[i] ?? -1e9)) / 150);

/** Jaringan tegak. Bentuknya sengaja seiras dengan `Jaringan` 16:9 — garis
 *  putus-putus, simpul bulat, tanpa kabel dan tanpa satu huruf pun. */
export const JaringanTegak: React.FC<{
  luas?: number;
  nyala?: (i: number) => number;
  opacity?: number;
}> = ({ luas = 1, nyala, opacity = 1 }) => (
  <g opacity={opacity}>
    <g opacity={0.5 * luas}>
      {LATAR.map((s) => (
        <circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} r={9} fill="var(--line)" />
      ))}
    </g>

    <line
      x1={JALUR.x}
      y1={JALUR.atas}
      x2={JALUR.x}
      y2={JALUR.bawah}
      stroke="var(--line)"
      strokeWidth={7}
      strokeDasharray="20 24"
      strokeLinecap="round"
    />

    {SIMPUL.map((y, i) => {
      const n = nyala ? nyala(i) : 0;
      return (
        <g key={y}>
          <circle
            cx={JALUR.x}
            cy={y}
            r={15 + 18 * n}
            fill="var(--accent-ink)"
            opacity={0.28 * n}
          />
          <circle
            cx={JALUR.x}
            cy={y}
            r={15}
            fill={n > 0.5 ? "var(--accent-ink)" : "var(--ink-2)"}
          />
        </g>
      );
    })}
  </g>
);

/** Teks di layar — WAJIB di Shorts, karena mayoritas penonton menonton tanpa
 *  suara (docs/02 § Aturan Shorts). Ini padanan ringkas kalimat VO-nya, bukan
 *  transkrip penuh: transkrip penuh di 9:16 memakan sepertiga tinggi frame.
 *
 *  Ditaruh di SEPERTIGA ATAS, di luar jalur benda utamanya, dan tidak pernah
 *  di 15% paling bawah — di situ letak judul dan tombol antarmuka YouTube. */
export const TeksLayar: React.FC<{
  baris: readonly string[];
  y?: number;
  opacity?: number;
  transform?: string;
  warna?: string;
  ukuran?: number;
}> = ({
  baris,
  y = 250,
  opacity = 1,
  transform,
  warna = "var(--ink-0)",
  ukuran = 62,
}) => (
  /* Jarak antarbaris 1,34x, bukan 1,18x: pada 1,18 kotak glif dua baris saling
     mengiris 12px dan `npm run tumpang` melaporkannya — bukan cacat yang
     terlihat mata, tapi ia menandai baris yang memang terlalu rapat untuk
     dibaca sekilas di feed. */
  <g style={{ opacity, transform }}>
    {baris.map((b, i) => (
      <text
        key={b}
        x={W / 2}
        y={y + i * (ukuran * 1.34)}
        fontSize={ukuran}
        fontFamily="var(--font-display)"
        fontWeight={800}
        fill={warna}
        textAnchor="middle"
      >
        {b}
      </text>
    ))}
  </g>
);
