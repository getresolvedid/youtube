/* Kover Short 1 T14 — "KANAN DULUAN". 2160x3840 (docs/06 § Kover Short).

   Keputusannya di render/publish.md § Short 1 · Kover.

   NOL KATA YANG SAMA DENGAN JUDULNYA. Judul Short ini "Nama situs dibaca dari
   belakang" — ia menyebut ARAHNYA. Kover menyebut URUTANNYA. Yang membaca judul
   dan yang melihat kover dapat dua pegangan berbeda pada gagasan yang sama.

   Dua kata, dan itu karena kartunya cuma muat 11 huruf per baris pada 260px
   (shared/Thumbnail.tsx). "KANAN DULU, KIRI TERAKHIR" — kata-kata yang
   direncanakan pertama — ditolak penjaga panjang baris sebelum render, persis
   seperti "TANGAN SAMA" di T01. Yang dipendekkan katanya, bukan hurufnya.

   FIGURNYA DARI SHORT-NYA SENDIRI: `Loket` dari ../panggung-loket.tsx, susunan
   yang sama dengan `06-ujung` — potongan paling kanan turun ke loket TERENDAH,
   potongan paling kiri ke loket tertinggi. Membalik arahnya di kover berarti
   mengajarkan kebalikannya kepada orang yang belum menonton Short-nya.

   Kelebihan tinggi kartu 9:16 dipakai untuk hal yang isinya memang ketinggian:
   tangganya.
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { Loket, POTONGAN } from "../panggung-loket";

/* Pita figur: 1860 x 2100 (2160 dikurangi dua padding 150). */
const PITA = { w: 1860, h: 2100 };

const Y_NAMA = 200;
const FS_NAMA = 150;
/** Titik tengah tiap potongan, kiri ke kanan — urutan TAYANG. */
const X_POTONGAN = [380, 930, 1480];

/** Anak tangga. Indeks 0 = yang dibuka potongan PALING KANAN, jadi ia yang
 *  terendah dan terbesar. Jangkauan x ketiga garisnya tidak beririsan, sama
 *  seperti di ../tangga-tegak.tsx. */
const LOKET = [
  { x: 1480, y: 2050, skala: 1.7 },
  { x: 930, y: 1500, skala: 1.55 },
  { x: 380, y: 950, skala: 1.4 },
];

/** Tepi bawah huruf nama — pangkal garis ke loket. */
const Y_PANGKAL = Y_NAMA + FS_NAMA / 2;

/** Puncak atap loket ke-i, dihitung dari bentuk `Loket` (badan 260 + kanopi 46)
 *  — bukan diketik, supaya ia ikut kalau loketnya berubah.
 *
 *  Garis penghubung berhenti DI SINI, bukan di jendelanya. Tiap loket duduk
 *  tepat di bawah potongannya, jadi garisnya persis tegak; garis tegak yang
 *  diteruskan sampai ke dalam badan loket berhenti terbaca sebagai penghubung
 *  dan mulai terbaca sebagai TALI GANTUNGAN — loketnya tampak digantung, bukan
 *  ditunjuk. Berhenti di atap menghapus bacaan itu tanpa kehilangan apa pun. */
const atap = (i: number) => {
  const L = LOKET[i]!;
  return { x: L.x, y: L.y - (260 + 46) * L.skala };
};

export const ThumbS1: React.FC = () => (
  <KartuThumbnail baris={["Kanan", "Duluan"]} rasio="9x16">
    <svg
      viewBox={`0 0 ${PITA.w} ${PITA.h}`}
      width={PITA.w}
      height={PITA.h}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* --- nama situs, terpecah ------------------------------------------- */}
      {POTONGAN.map((p, i) => (
        <text
          key={p}
          x={X_POTONGAN[i]}
          y={Y_NAMA}
          fontSize={FS_NAMA}
          fontFamily="var(--font-display)"
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="middle"
          /* Yang paling kanan menyala; dua lainnya meredup. Itu seluruh isi
             kovernya — dan ia harus terbaca sebelum satu kata pun dibaca. */
          fill={i === POTONGAN.length - 1 ? "var(--accent-ink)" : "var(--ink-0)"}
          opacity={i === POTONGAN.length - 1 ? 1 : 0.4}
        >
          {i === POTONGAN.length - 1 ? p : `${p}.`}
        </text>
      ))}

      {/* Penanda di atas potongan paling kanan — masuk dari kanan, sama seperti
          di Short-nya. */}
      <path
        d={`M${X_POTONGAN[2]! - 52} ${Y_NAMA - 190}h104l-52 78z`}
        fill="var(--accent-ink)"
      />

      {/* --- garis potongan -> loketnya masing-masing ------------------------ */}
      {LOKET.map((_, i) => {
        const a = atap(i);
        const xp = X_POTONGAN[POTONGAN.length - 1 - i]!;
        return (
          <path
            key={i}
            d={`M${xp} ${Y_PANGKAL}L${a.x} ${a.y - 18}`}
            stroke="var(--accent-ink)"
            strokeWidth={9}
            strokeLinecap="round"
            opacity={i === 0 ? 0.75 : 0.3}
          />
        );
      })}

      {/* --- tangga ---------------------------------------------------------
          Yang terendah beraksen: dialah yang dibuka potongan paling kanan, dan
          itu yang dijanjikan kata "DULUAN". */}
      {LOKET.map((L, i) => (
        <Loket
          key={i}
          x={L.x}
          y={L.y}
          skala={L.skala}
          nyala={1}
          laci={1}
          isi={0}
          aksen={i === 0}
          opacity={i === 0 ? 1 : 0.55}
        />
      ))}
    </svg>
  </KartuThumbnail>
);
