/* Thumbnail T18 · 16:9 · 1280x720
   Brief: thumbnail.md (fase 1) — ARAHNYA SATU, brief → kartu.

   Kalau kartunya sudah dirender tapi terasa meleset dari briefnya, yang benar
   BRIEFNYA: ubah berkas ini, jangan menulis ulang brief supaya cocok dengan yang
   terlanjur digambar (docs/06, sama seperti direction → komposisi HARD RULE 3).

   YANG MILIK EPISODE CUMA DUA: kata-katanya dan figurnya. Tata letak, ukuran
   huruf, palet, dan marjin hidup di shared/Thumbnail.tsx dan dipakai bersama —
   syarat thumbnail yang paling sulit dipenuhi bukan "bagus" melainkan SAMA.

   FIGURNYA DARI VIDEONYA SENDIRI, bukan gambar baru yang mirip: `Paket` dari
   ../tcp-ip/panggung-jaringan.tsx, komponen yang sama persis dengan papan
   penerima di scenes/07-peran-tcp.tsx tahap 3. Thumbnail yang menjanjikan
   gambar yang tidak ada di videonya menaikkan CTR dan menurunkan retensi, dan
   YouTube menghitung yang kedua.

     npx remotion still T18-thumb ideas/tcp-ip/render/thumb.png
*/
import type React from "react";

import { KartuThumbnail } from "../../shared/Thumbnail";
import { PAKET, Paket } from "./panggung-jaringan";

/* Pita figur kartu 16:9: 1152 x 300 (shared/Thumbnail.tsx). Koordinat di bawah
   dihitung terhadap viewBox itu, bukan terhadap kartu penuh. */
const W = 1152;
const H = 300;

const N = 4;
const SKALA = 2.2;
const JARAK = 270;
const Y = H / 2;

/** Lubangnya di TENGAH barisan, bukan di posisi kedua seperti scene 07.
 *
 *  Alasannya ada di thumbnail.md dan bukan kelalaian: lubang di posisi kedua,
 *  dilihat pada 210x118 di feed ponsel, terbaca seperti barisan yang cuma mulai
 *  dari kanan. Lubang di tengah tidak punya bacaan kedua. Yang dijanjikan kartu
 *  ini adalah "barisan bernomor yang kurang satu" — dan itu benar-benar ada di
 *  videonya; nomornya sendiri bukan janji. */
const HILANG = 2;

const x = (i: number) => W / 2 + (i - (N - 1) / 2) * JARAK;

export const ThumbT18: React.FC = () => (
  <KartuThumbnail baris={["SATU HILANG,", "TETAP UTUH"]}>
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {Array.from({ length: N }, (_, i) =>
        i === HILANG ? (
          /* Lubangnya digambar sebagai TEMPAT yang menunggu, bukan sebagai
             ketiadaan: garis putus-putus seukuran kotaknya. Ruang kosong tanpa
             bingkai akan terbaca sebagai jarak antar-kotak, bukan sebagai satu
             kotak yang tidak ada. */
          <rect
            key={i}
            x={x(i) - (PAKET.w * SKALA) / 2}
            y={Y - (PAKET.h * SKALA) / 2}
            width={PAKET.w * SKALA}
            height={PAKET.h * SKALA}
            rx={22}
            fill="none"
            stroke="var(--bad)"
            strokeWidth={9}
            strokeDasharray="24 22"
          />
        ) : (
          <Paket key={i} x={x(i)} y={Y} nomor={i + 1} skala={SKALA} warna="ok" />
        ),
      )}
    </svg>
  </KartuThumbnail>
);
