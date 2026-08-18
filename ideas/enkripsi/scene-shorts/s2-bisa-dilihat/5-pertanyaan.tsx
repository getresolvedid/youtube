/* T17-S2 · scene 5 · pertanyaan
   VO:        5-pertanyaan-vo.md
   Direction: 5-pertanyaan-direction.md

   POTONG KERAS, dan panggungnya jadi kosong. Setelah empat scene yang penuh,
   kekosongan inilah yang membuat pertanyaannya terdengar.

   Gemboknya GARIS di sini, bukan bentuk pejal — yang pejal datang di scene 6
   saat ia menutup.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "pertanyaan";
const B_TANYA = beat(ID, 0);

/** Kalimatnya di tengah panggung bersih — huruf besar semua supaya terbaca
 *  sebagai BENDA yang sedang dibicarakan, bukan sebagai gelembung chat yang
 *  sedang berlangsung. */
export const PUSAT = { x: W / 2, y: 980 } as const;

/** Bentuk gembok sebagai GARIS, dipakai bersama scene 6 (di sana ia jadi
 *  pejal). Ditulis di sini karena cuma dua scene ini yang memakainya. */
export const SENGKANG = `M ${PUSAT.x - 60} ${PUSAT.y - 40} v -46
   a 60 60 0 0 1 120 0 v 46`;
export const BADAN = { x: PUSAT.x - 96, y: PUSAT.y - 40, w: 192, h: 150 } as const;

export const Pertanyaan: React.FC = () => {
  const d = useDetik();

  const kalimat = masuk(d, { mulai: 0.15, durasi: 0.6, geser: 22 });

  /* `mulai` diturunkan dari beat + pecahan durasinya, supaya garisnya tetap
     jatuh di kata "tidak mudah dipahami" kalau kalimatnya berubah panjang. */
  const mulaiGaris = B_TANYA + 3.2;
  const badan = gambarGaris(d, 684, { mulai: mulaiGaris, durasi: 1.0 });
  const sengkang = gambarGaris(d, 240, { mulai: mulaiGaris + 0.5, durasi: 0.8 });

  const teks = t(d, { mulai: 0.6, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g style={{ opacity: kalimat.opacity, transform: kalimat.transform }}>
            <text
              x={PUSAT.x}
              y={PUSAT.y + 24}
              fontSize={56}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              HALO, APA KABAR?
            </text>
          </g>

          {/* Sengkangnya BELUM turun — gembok yang terbentuk tapi menganga
              adalah pertanyaan dalam bentuk gambar. */}
          <g fill="none" stroke="var(--accent-ink)" strokeWidth={9} strokeLinecap="round">
            <rect
              x={BADAN.x}
              y={BADAN.y}
              width={BADAN.w}
              height={BADAN.h}
              rx={18}
              {...badan}
            />
            <path d={SENGKANG} {...sengkang} />
          </g>

          <TeksLayar baris={["Supaya tidak terbaca?"]} y={230} opacity={teks} ukuran={54} />
        </svg>
      </div>
    </Scene>
  );
};
