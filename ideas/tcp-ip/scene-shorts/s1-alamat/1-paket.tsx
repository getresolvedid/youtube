/* T18-S1 · scene 1 · paket — hook
   VO:        1-paket-vo.md
   Direction: 1-paket-direction.md

   Frame pertama Short 1: satu benda yang dikenal + satu pertanyaan yang belum
   terjawab, dalam tiga detik.

   DUA KEPUTUSAN:

   1. Label kotaknya KOSONG, bukan bertanda tanya. Kosong membuat penonton
      mencari isinya sendiri; tanda tanya sudah menjawab bahwa yang hilang
      adalah "sesuatu".

   2. Ketiga jalur sama redup. Begitu satu di antaranya menyala di sini, scene 4
      kehilangan satu-satunya kejutannya.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kotak } from "../../panggung-jaringan";
import { JALUR_X, TeksLayar, W, Y_BAWAH } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "paket";

const B_KIRIM = beat(ID, 0); // "Bayangkan kamu ingin mengirim sebuah paket…"
const B_BUTUH = beat(ID, 1); // "Apa yang dibutuhkan?"

const Y_KOTAK = 900;

export const Paket: React.FC = () => {
  const d = useDetik();

  /* Mendarat, bukan memudar masuk — di feed, benda yang muncul dengan opacity
     terbaca sebagai layar yang belum selesai memuat. */
  const turun = t(d, { mulai: 0, durasi: 0.5, dari: -70, ke: 0, ease: E.backOut(1.1) });

  const teks1 = masuk(d, { mulai: 0.25, durasi: 0.45, geser: 20 });
  const teks2 = masuk(d, { mulai: B_BUTUH, durasi: 0.45, geser: 20 });

  const garis = gambarGaris(d, Y_BAWAH - (Y_KOTAK + 120), {
    mulai: B_BUTUH,
    durasi: 0.6,
  });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Tiga jalur, SAMA REDUP. Yang menyala baru ada di scene 4. */}
          {JALUR_X.map((x) => (
            <line
              key={x}
              x1={W / 2}
              y1={Y_KOTAK + 120}
              x2={x}
              y2={Y_BAWAH}
              stroke="var(--line)"
              strokeWidth={6}
              strokeLinecap="round"
              {...garis}
            />
          ))}

          <g transform={`translate(0 ${turun})`}>
            {/* 2,0 dan bukan 1,5: di 1080x1920 kotak sebesar itu jadi persegi
                kecil di tengah frame kosong, dan frame pertama yang lemah tidak
                ditonton di feed (docs/02). */}
            <Kotak x={W / 2} y={Y_KOTAK} skala={2.0} />
          </g>

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["Mau kirim paket."]} y={330} />
          </g>
          <g style={{ opacity: teks2.opacity, transform: teks2.transform }}>
            <TeksLayar baris={["Ke mana?"]} y={330} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
