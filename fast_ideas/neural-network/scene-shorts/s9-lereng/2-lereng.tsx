/* T19-S4 · scene 3 · lereng — payoff
   VO:        3-lereng-vo.md
   Direction: 3-lereng-direction.md

   DUA KEPUTUSAN:

   1. Lerengnya DIGAMBAR (`gambarGaris`), bukan dimunculkan. Kurva yang muncul
      jadi tidak terbaca sebagai bentuk — dan bentuknyalah yang harus dimengerti
      penonton di scene ini.

   2. Bolanya mendarat di sisi KANAN ATAS: di dasar tidak ada yang perlu
      dikerjakan, di puncak persis ia terlihat seperti ditaruh manusia.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, kamera } from "../panggung-nn";
import { Bola, LANGKAH, Lereng, PANJANG, SumbuMeleset } from "../panggung-lereng";
import { beat } from "./timing.gen";

const ID = "lereng";

const B_BAYANG = beat(ID, 0); // "Bayangkan melesetnya sebagai lereng: ada yang tinggi…"
const B_POSISI = beat(ID, 1); // "Sekarang posisinya masih jauh di atas."

const U_AWAL = LANGKAH[0] ?? 0.86;

export const LerengScene: React.FC = () => {
  const d = useDetik();

  const jaringPergi = t(d, { mulai: 0.05, durasi: 0.4, dari: 0.55, ke: 0.08 });

  const garis = gambarGaris(d, PANJANG, { mulai: B_BAYANG + 0.15, durasi: 0.7 });
  const sumbu = t(d, { mulai: B_BAYANG + 0.5, durasi: 0.35, dari: 0, ke: 1 });

  /* Bola JATUH dan mendarat di kurvanya — bukan memudar masuk di posisinya. */
  const jatuh = t(d, {
    mulai: B_POSISI,
    durasi: 0.5,
    dari: -320,
    ke: 0,
    ease: E.backOut(1.1),
  });
  const bola = t(d, { mulai: B_POSISI, durasi: 0.2, dari: 0, ke: 1 });

  const teks = masuk(d, { mulai: B_BAYANG + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(0.55)}>
            <Jaringan opacity={jaringPergi} />
          </g>

          <SumbuMeleset opacity={sumbu} />
          <Lereng gambar={garis} />
          <Bola u={U_AWAL} turun={jatuh} opacity={bola} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["MELESET = TINGGI"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
