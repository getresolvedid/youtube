/* T18-S1 · scene 5 · sampai — tutup + loop
   VO:        5-sampai-vo.md
   Direction: 5-sampai-direction.md

   DUA KEPUTUSAN:

   1. Potongan kedua memakai komponen `Paket` yang SAMA, cuma tanpa prop
      `label`. Seluruh beat 1 bergantung pada keduanya identik kecuali labelnya
      — bentuk yang sama persis dipakai scene 5 video panjang.

   2. Beat 1 adalah loop-nya: potongan yang mati di persimpangan mengembalikan
      penonton ke pertanyaan frame pertama ("ke mana?"), jadi perulangan Short
      terasa menyambung dan bukan mengulang dari awal.
*/
import type React from "react";

import { E, getar, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Label, Paket } from "../../panggung-jaringan";
import {
  JALUR_UTAMA,
  JALUR_X,
  JaringanTegak,
  SIMPUL_Y,
  TeksLayar,
  Tujuan,
  W,
  Y_ATAS,
  Y_BAWAH,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "sampai";

const B_KOTA = beat(ID, 0); // "Jadi, kalau internet adalah sebuah kota besar…"
const B_TANPA = beat(ID, 1); // "Tanpa alamat tujuan…"

const ALAMAT = "192.168.1.10";
const DIPILIH = 1;

export const Sampai: React.FC = () => {
  const d = useDetik();

  /* --- beat 0: masuk ke tujuan --- */
  const masukTujuan = t(d, { mulai: B_KOTA, durasi: 0.7, dari: 0, ke: 1, ease: E.power2in });
  const nyala = t(d, { mulai: B_KOTA + 0.6, durasi: 0.35, dari: 0, ke: 1 });
  const rangkum = masuk(d, { mulai: B_KOTA + 0.9, durasi: 0.55, geser: 22 });

  /* --- beat 1: potongan tanpa alamat, dan ia tidak sampai ke mana pun --- */
  const polos = t(d, { mulai: B_TANPA, durasi: 1.3, dari: 0, ke: 1, ease: E.power1out });
  const goyang = getar(d, { mulai: B_TANPA + 1.3, durasi: 0.8, jauh: 16, putaran: 2 });
  const padam = t(d, { mulai: B_TANPA + 1.9, durasi: 0.7, dari: 1, ke: 0.3 });

  const yPolos = Y_ATAS + (SIMPUL_Y[0] - Y_ATAS) * polos;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} />

          {/* Jalur terpilih masih menyala — warisan scene 4, dan ia padam
              bersama beat 1: yang kedua tidak punya jalur yang menyala. */}
          <line
            x1={JALUR_X[DIPILIH]}
            y1={Y_ATAS}
            x2={JALUR_X[DIPILIH]}
            y2={Y_BAWAH}
            stroke="var(--accent)"
            strokeWidth={7}
            strokeLinecap="round"
            opacity={1 - polos}
          />

          <Tujuan y={1700} nyala={nyala} />

          {/* Potongan pertama — masuk ke tujuan lalu hilang di dalamnya. */}
          <Paket
            x={JALUR_UTAMA}
            y={Y_BAWAH + (1620 - Y_BAWAH) * masukTujuan}
            nomor={1}
            skala={1.2}
            label={masukTujuan < 0.6 ? ALAMAT : undefined}
            warna="ok"
            opacity={1 - masukTujuan}
          />

          {/* Potongan kedua — komponen yang SAMA, tanpa label. */}
          <g opacity={polos > 0 ? padam : 0}>
            <Paket
              x={JALUR_UTAMA + goyang}
              y={yPolos}
              nomor={2}
              skala={1.2}
              warna="hilang"
            />
          </g>

          <g style={{ opacity: rangkum.opacity * (1 - polos), transform: rangkum.transform }}>
            <Label x={W / 2} y={1180} teks="IP" sub="alamat & jalur" />
          </g>

          <TeksLayar
            baris={["Tanpa alamat,", "mentok."]}
            y={300}
            opacity={polos > 0.5 ? 1 : 0}
          />
        </svg>
      </div>
    </Scene>
  );
};
