/* Kover Short 1 · 9:16 · 2160x3840
   Brief: ../thumbnail.md § Kover Short

   DI LUAR folder scene-nya — `npm run sisa` memeriksa tiap `.tsx` di dalam
   folder scene terhadap daftar kunci dari naskah, jadi berkas kover yang
   tinggal di sana dilaporkan sebagai nama yang tidak dikenal (CLAUDE.md
   HARD RULE 1).

   Keempat kover sengaja SEJENIS satu sama lain: empat Short yang muncul
   berurutan di feed harus terbaca sebagai satu keluarga, kalau tidak penonton
   yang sudah menonton S1 memperlakukan S2 sebagai video acak. Yang menyatukan
   keempatnya: potongan bernomor yang sama, jalur tegak yang sama, dan satu
   benda yang menyala di antara benda yang tidak.

     npx remotion still T18-thumb-s1 ideas/tcp-ip/render/thumb-s1.png
*/
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { Paket } from "../panggung-jaringan";

/* Pita figur kartu 9:16: 1860 x 2100 (shared/Thumbnail.tsx). */
const W = 1860;
const H = 2100;

const X = W / 2;
const Y_CABANG = 1000;
const Y_UJUNG = 1950;
const X_UJUNG = [330, 930, 1530] as const;
const DIPILIH = 1;

export const ThumbS1: React.FC = () => (
  <KartuThumbnail baris={["ADA ALAMAT,", "ADA JALAN"]} rasio="9x16">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {/* Batang masuk, dari tepi atas ke titik cabang. */}
      <line
        x1={X}
        y1={120}
        x2={X}
        y2={Y_CABANG}
        stroke="var(--line)"
        strokeWidth={16}
        strokeDasharray="44 52"
        strokeLinecap="round"
      />

      {/* TIGA cabang, dan yang dua tetap tergambar. Cabang yang hilang membuat
          kartu ini menjanjikan "cuma ada satu jalan" — kebalikan dari isi
          Short-nya, dan pelanggaran docs/06 yang paling halus: janji yang tidak
          ada di videonya. */}
      {X_UJUNG.map((xu, i) => (
        <line
          key={xu}
          x1={X}
          y1={Y_CABANG}
          x2={xu}
          y2={Y_UJUNG}
          stroke={i === DIPILIH ? "var(--accent)" : "var(--line)"}
          strokeWidth={16}
          strokeLinecap="round"
          opacity={i === DIPILIH ? 1 : 0.4}
        />
      ))}
      {X_UJUNG.map((xu, i) => (
        <circle
          key={`u${xu}`}
          cx={xu}
          cy={Y_UJUNG}
          r={34}
          fill={i === DIPILIH ? "var(--accent)" : "var(--ink-2)"}
          opacity={i === DIPILIH ? 1 : 0.5}
        />
      ))}

      {/* Potongannya DI ATAS cabang, belum memilih: yang dijanjikan kartu ini
          adalah keputusannya, dan keputusan yang sudah diambil bukan lagi
          keputusan. */}
      <circle cx={X} cy={700} r={190} fill="var(--accent-ink)" opacity={0.22} />
      <Paket x={X} y={700} nomor={1} skala={3.2} label="192.168.1.10" />
    </svg>
  </KartuThumbnail>
);
