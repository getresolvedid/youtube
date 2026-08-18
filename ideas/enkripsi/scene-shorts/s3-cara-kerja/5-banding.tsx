/* T17-S3 · scene 5 · banding — frame terpenting Short 3
   VO:        5-banding-vo.md
   Direction: 5-banding-direction.md

   BELAHNYA MENDATAR, BUKAN TEGAK. Arahan user menulis split screen kiri-kanan —
   bentuk 16:9. Di 9:16 dua kolom sempit memaksa teksnya mengecil sampai tidak
   terbaca di ponsel; atas-bawah memberi tiap sisi lebar penuh. Isinya tidak
   berkurang sedikit pun.

   Satu-satunya scene di Short ini yang benar-benar diam setelah keduanya
   berdiri. Ini frame yang penonton tangkap layar.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Gembok, SANDI_PANJANG } from "../../panggung-kiriman";
import { W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "banding";
const B_INI = beat(ID, 0);

/* Kedua blok DIANGKAT dari render still pertama: pada 640/1240, lambang di blok
   bawah jatuh di balik kotak subtitel preview — dan lambang itu separuh dari
   perbandingan yang jadi seluruh isi scene ini. */
const ATAS = 520;
const BAWAH = 1010;

export const Banding: React.FC = () => {
  const d = useDetik();

  const garis = t(d, { mulai: 0.15, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  /* Kedua sisi masuk BERSAMAAN — yang muncul belakangan terbaca sebagai akibat
     dari yang pertama, dan di sini keduanya setara. */
  const sisi = masuk(d, { mulai: 0.35, durasi: 0.6, geser: 22 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <line
            x1={90}
            y1={(ATAS + BAWAH) / 2 + 80}
            x2={W - 90}
            y2={(ATAS + BAWAH) / 2 + 80}
            stroke="var(--line)"
            strokeWidth={4}
            style={{ transform: `scaleX(${garis})`, transformOrigin: `${W / 2}px 0` }}
          />

          <g style={{ opacity: sisi.opacity, transform: sisi.transform }}>
            {/* --- atas: tanpa enkripsi --- */}
            <text
              x={W / 2}
              y={ATAS}
              fontSize={30}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              fill="var(--ink-2)"
              textAnchor="middle"
              letterSpacing={3}
            >
              TANPA ENKRIPSI
            </text>
            <text
              x={W / 2}
              y={ATAS + 96}
              fontSize={52}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
            >
              HALO, APA KABAR?
            </text>

            {/* --- bawah: dengan enkripsi --- */}
            <text
              x={W / 2}
              y={BAWAH}
              fontSize={30}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              fill="var(--ink-2)"
              textAnchor="middle"
              letterSpacing={3}
            >
              DENGAN ENKRIPSI
            </text>
            <Gembok x={W / 2} y={BAWAH + 78} skala={0.85} />
            <text
              x={W / 2}
              y={BAWAH + 200}
              fontSize={52}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              fill="var(--accent-ink)"
              textAnchor="middle"
              letterSpacing={3}
            >
              {SANDI_PANJANG}
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
