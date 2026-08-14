/* Kover T01-S1 "Nugget" — "1 DETIK, 3 BULAN".

   Judul Short-nya "Prosesormu lebih sering menunggu". Kover ini tidak mengulang
   satu kata pun darinya (docs/06): judul menyebut AKIBATNYA, kover menaruh
   ANGKANYA — dan angka itulah yang membuat orang berhenti menggulir.

   Figurnya kalimat yang sama dengan Short-nya, dipadatkan jadi satu tarikan:
   yang menempel di prosesor dekat sekali, gudangnya jauh sekali, dan jarak itu
   digambar sebagai jarak sungguhan di kartu — bukan diwakili panah. Di 9:16
   tinggi kartu memang barang yang paling banyak dipunya; dipakai untuk hal yang
   isinya memang ketinggian.

   BERKAS INI DI scene-shorts/, DI LUAR FOLDER SCENE-nya. `npm run sisa`
   memeriksa tiap .tsx di dalam s1-nugget/ terhadap daftar kunci dari naskah,
   jadi berkas bantu di sana akan dilaporkan sebagai nama yang tidak dikenal —
   aturan yang sama dengan tiga-tempat.tsx di sebelahnya (CLAUDE.md HARD RULE 1).
*/
import type React from "react";

import { Ic } from "../../../shared/Icons";
import { KartuThumbnail } from "../../../shared/Thumbnail";

/* Pita figur: 1860 x 2100 (2160 dikurangi dua padding 150). */
const X = 930;
const PITA_H = 2100;

/** Meja dan lemari sengaja SEUKURAN. Yang dibandingkan kover ini jaraknya,
 *  bukan besarnya — dan dua benda yang beda ukuran akan membuat penonton
 *  membandingkan ukurannya. */
const LEBAR = 660;

export const ThumbS1: React.FC = () => (
  <KartuThumbnail rasio="9x16" baris={["1 detik,", "3 bulan"]}>
    {/* prosesor + meja yang menempel padanya — rapat, di atas */}
    <Ic
      n="chip"
      warna="c-accent"
      style={{ position: "absolute", left: X - 170, top: 20, width: 340, height: 340 }}
    />
    <div
      className="meja"
      style={{ position: "absolute", left: X - LEBAR / 2, top: 430, width: LEBAR }}
    />

    {/* garis jarak — panjang, tipis, putus-putus. Ia BUKAN panah: tidak ada
        yang sedang berjalan di kover, yang ada cuma dua tempat dan jarak di
        antaranya. Panjangnya memakai seluruh sisa pita: jarak yang digambar
        pendek akan dibaca sebagai "agak jauh", dan Short ini justru tentang
        betapa jauhnya. */}
    <svg
      viewBox={`0 0 1860 ${PITA_H}`}
      width={1860}
      height={PITA_H}
      style={{ position: "absolute", inset: 0 }}
    >
      <path
        d={`M${X} 680 V1450`}
        stroke="var(--ink-2)"
        strokeWidth={9}
        strokeDasharray="30 34"
        strokeLinecap="round"
      />
    </svg>

    {/* lemari arsip — jauh di bawah, redup */}
    <div
      className="lemari"
      style={{
        position: "absolute",
        left: X - LEBAR / 2,
        top: 1500,
        width: LEBAR,
        height: 600,
        opacity: 0.68,
      }}
    >
      {/* Garis lacinya ditebalkan di sini. `.laci` memakai border 2px yang pas
          untuk lemari 240px di dalam videonya; pada kartu setinggi 600px di
          kover 2160 lebar, 2px lenyap dan lemarinya jadi kotak kosong — dan
          kotak kosong tidak terbaca sebagai gudang. */}
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="laci"
          style={{ background: "var(--bg)", border: "5px solid var(--ink-2)" }}
        />
      ))}
    </div>
  </KartuThumbnail>
);
