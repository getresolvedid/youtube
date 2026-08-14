/* Kover Short 2 T14 — "SEKALI, DI AWAL". 2160x3840 (docs/06 § Kover Short).

   Keputusannya di render/publish.md § Short 2 · Kover.

   NOL KATA YANG SAMA DENGAN JUDULNYA. Judul Short ini "Ganti DNS tidak bikin
   internet cepat" — ia membantah. Kover menaruh BUKTINYA: bagian yang berubah
   itu potongan paling depan, dan cuma itu.

   KENAPA BUKAN "TERBUKA, BUKAN KENCANG" seperti yang direncanakan pertama:
   kartu 9:16 cuma muat 11 huruf per baris pada 260px (shared/Thumbnail.tsx),
   dan "Bukan Kencang" 13 huruf. Penjaga panjang baris menolaknya sebelum render
   — persis seperti "TANGAN SAMA" di T01. Memendekkannya jadi "Bukan Cepat"
   akan mengulang kata dari judulnya, jadi yang diambil sudut lain: bukan
   kesimpulannya, melainkan gambar yang membawanya.

   FIGURNYA DARI SHORT-NYA SENDIRI: bilah waktu dengan potongan bertanya di
   paling depan, bentuk yang sama dengan `04-sekali-di-awal`. PERBANDINGAN
   PANJANGNYA yang jadi argumen, dan ia tidak butuh satu angka pun — penting,
   karena angka itu masih baris ⚠ di ../naskah.md § Sumber.
*/
import type React from "react";

import { Bangunan, Loket, Sosok } from "../panggung-loket";
import { KartuThumbnail } from "../../../shared/Thumbnail";

/* Pita figur: 1860 x 2100 (2160 dikurangi dua padding 150). */
const PITA = { w: 1860, h: 2100 };

/** Bilah waktu satu halaman. Porsinya sama dengan `BILAH.tanya` di
 *  ../scene-shorts/jalur-tanya.tsx — kover yang memakai porsi berbeda dari
 *  Short-nya menjanjikan perbandingan yang tidak ada di videonya. */
const BILAH = { x0: 60, x1: 1800, y: 780, h: 170, tanya: 0.13 };
const X_TANYA = BILAH.x0 + (BILAH.x1 - BILAH.x0) * BILAH.tanya;

const Y_LANTAI = 1980;

export const ThumbS2: React.FC = () => (
  <KartuThumbnail baris={["Sekali,", "Di Awal"]} rasio="9x16">
    <svg
      viewBox={`0 0 ${PITA.w} ${PITA.h}`}
      width={PITA.w}
      height={PITA.h}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* --- bilah waktu ----------------------------------------------------
          Dasarnya abu dan panjang, kepalanya beraksen dan sangat pendek. Itu
          seluruh argumennya, dan ia terbaca sebelum satu kata pun dibaca. */}
      <rect
        x={BILAH.x0}
        y={BILAH.y}
        width={BILAH.x1 - BILAH.x0}
        height={BILAH.h}
        rx={BILAH.h / 2}
        fill="var(--bg-elev)"
        stroke="var(--ink-2)"
        strokeWidth={10}
      />
      <rect
        x={X_TANYA}
        y={BILAH.y}
        width={BILAH.x1 - X_TANYA}
        height={BILAH.h}
        rx={BILAH.h / 2}
        fill="var(--ink-1)"
        opacity={0.4}
      />
      <rect
        x={BILAH.x0}
        y={BILAH.y}
        width={X_TANYA - BILAH.x0}
        height={BILAH.h}
        rx={BILAH.h / 2}
        fill="var(--accent-ink)"
      />
      <path
        d={`M${X_TANYA} ${BILAH.y - 54}v${BILAH.h + 108}`}
        stroke="var(--ink-0)"
        strokeWidth={12}
        strokeLinecap="round"
      />

      {/* --- yang dilewati bilah itu ----------------------------------------
          Loket di pojok kiri (ditanya lalu ditinggalkan), sosok berjalan, tempat
          tujuan jauh di kanan — susunan yang sama dengan `03-tanya-dulu`. Ia
          yang membuat bilah di atasnya terbaca sebagai WAKTU PERJALANAN dan
          bukan sebagai bilah pemuatan biasa. */}
      <path
        d={`M${BILAH.x0} ${Y_LANTAI}H${BILAH.x1}`}
        stroke="var(--line)"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <Loket x={300} y={Y_LANTAI} skala={1.3} nyala={1} aksen />
      <Sosok x={900} y={Y_LANTAI} skala={2.2} />
      <Bangunan x={1550} y={Y_LANTAI} skala={1.1} papan={0} />
    </svg>
  </KartuThumbnail>
);
