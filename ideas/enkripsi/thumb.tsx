/* Thumbnail T17 · 16:9 · 1280x720
   Brief: thumbnail.md (fase 1) — ARAHNYA SATU, brief → kartu.

   Kalau kartunya sudah dirender tapi terasa meleset dari briefnya, yang benar
   BRIEFNYA: ubah berkas ini, jangan menulis ulang brief supaya cocok dengan yang
   terlanjur digambar (docs/06, sama seperti direction → komposisi HARD RULE 3).

   YANG MILIK EPISODE CUMA DUA: kata-katanya dan figurnya. Tata letak, ukuran
   huruf, palet, dan marjin hidup di shared/Thumbnail.tsx dan dipakai bersama —
   syarat thumbnail yang paling sulit dipenuhi bukan "bagus" melainkan SAMA.

   FIGURNYA DARI VIDEONYA SENDIRI, bukan gambar baru yang mirip: `Monitor` dan
   `Hp` dari ../panggung-kiriman.tsx, komponen yang sama persis dengan
   scenes/09-ringkasan.tsx beat 1. Thumbnail yang menjanjikan gambar yang tidak
   ada di videonya menaikkan CTR dan menurunkan retensi, dan YouTube menghitung
   yang kedua.

     npx remotion still T17-thumb ideas/enkripsi/render/thumb.png
*/
import type React from "react";

import { KartuThumbnail } from "../../shared/Thumbnail";
import { Hp, Monitor, PESAN, SANDI_PANJANG, layarHp } from "./panggung-kiriman";

/* Pita figur kartu 16:9: 1152 x 300 (shared/Thumbnail.tsx). Koordinat di bawah
   dihitung terhadap viewBox itu, bukan terhadap kartu penuh. */
const W = 1152;
const H = 300;

/* HP DILEBARKAN dari 170 ke 230, dan teksnya dikecilkan. Pada 170, gelembung
   "Halo, apa kabar?" menjorok keluar badan HP di kedua sisi — ketahuan dari
   PNG-nya, bukan dari pemeriksaan mana pun. Yang dijaga di sini bukan kerapian:
   separuh kartu ini adalah "kalimat yang TERBACA", dan kalimat yang tumpah
   keluar bingkainya tidak terbaca sebagai kalimat, cuma sebagai coretan. */
const MON = { x: 40, y: 8, w: 500, h: 250 } as const;
const HP = { x: 680, y: 0, w: 230, h: 296 } as const;
const L = layarHp(HP.x, HP.y, HP.w, HP.h);

export const ThumbT17: React.FC = () => (
  <KartuThumbnail baris={["LAYAR SAMA,", "ISI BEDA"]}>
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
      {/* --- yang mengintip: deretan lambang --- */}
      <Monitor {...MON} nyala={0.8}>
        <text
          x={MON.x + MON.w / 2}
          y={MON.y + MON.h / 2}
          fontSize={54}
          fontFamily="var(--font-mono)"
          fontWeight={700}
          fill="var(--accent-ink)"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing={2}
        >
          {SANDI_PANJANG}
        </text>
      </Monitor>

      {/* --- yang dituju: kalimatnya, terbaca --- */}
      <Hp {...HP} nyala={0.95}>
        <rect
          x={L.x + 6}
          y={L.y + 74}
          width={L.w - 12}
          height={58}
          rx={19}
          fill="var(--accent)"
        />
        <text
          x={L.x + L.w / 2}
          y={L.y + 104}
          fontSize={18}
          fontFamily="var(--font-body)"
          fontWeight={700}
          fill="var(--ink-0)"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {PESAN}
        </text>
      </Hp>
    </svg>
  </KartuThumbnail>
);
