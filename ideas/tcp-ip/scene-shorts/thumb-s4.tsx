/* Kover Short 4 · 9:16 · 2160x3840
   Brief: ../thumbnail.md § Kover Short

   Sekeluarga dengan thumb-s1/s2/s3. Ia satu-satunya yang menaruh DUA gambaran
   di satu kartu, dan itu memang isinya: dua tugas yang berbeda.

   FIGURNYA, BUKAN NAMANYA. Godaan terbesar kartu ini adalah menulis `TCP` dan
   `IP` besar-besar di figurnya — dan itu akan mengulang teks kartunya sendiri,
   yang sudah berbunyi DUA NAMA, DUA TUGAS. Yang ditunjukkan di sini pekerjaan
   keduanya: memilih arah, dan mengurutkan.

     npx remotion still T18-thumb-s4 ideas/tcp-ip/render/thumb-s4.png
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { Centang, Paket } from "../panggung-jaringan";

const W = 1860;
const H = 2100;

const Y_CABANG = 420;
const Y_UJUNG = 900;
const X_UJUNG = [430, 930, 1430] as const;
const DIPILIH = 1;

const N = 4;
const JARAK = 400;
const Y_BARIS = 1620;

export const ThumbS4: React.FC = () => (
  <KartuThumbnail baris={["DUA NAMA,", "DUA TUGAS"]} rasio="9x16">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {/* ---- tugas pertama: memilih arah ---- */}
      {X_UJUNG.map((xu, i) => (
        <line
          key={xu}
          x1={W / 2}
          y1={Y_CABANG}
          x2={xu}
          y2={Y_UJUNG}
          stroke={i === DIPILIH ? "var(--accent)" : "var(--line)"}
          strokeWidth={16}
          strokeLinecap="round"
          opacity={i === DIPILIH ? 1 : 0.4}
        />
      ))}
      <Paket x={X_UJUNG[DIPILIH]} y={Y_UJUNG + 120} nomor={1} skala={2.4} />

      {/* Garis pemisah — dua tugas, bukan satu urutan. Mendatar, karena di 9:16
          belahan tegak menyisakan dua kolom sempit yang tidak terbaca di feed. */}
      <line
        x1={180}
        y1={1240}
        x2={W - 180}
        y2={1240}
        stroke="var(--line)"
        strokeWidth={8}
      />

      {/* ---- tugas kedua: mengurutkan ---- */}
      {Array.from({ length: N }, (_, i) => {
        const x = W / 2 + (i - (N - 1) / 2) * JARAK;
        return (
          <g key={i}>
            <Paket x={x} y={Y_BARIS} nomor={i + 1} skala={2.4} warna="ok" />
            <Centang x={x} y={Y_BARIS + 190} skala={3.2} />
          </g>
        );
      })}
    </svg>
  </KartuThumbnail>
);
