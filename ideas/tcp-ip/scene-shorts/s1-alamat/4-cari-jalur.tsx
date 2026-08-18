/* T18-S1 · scene 4 · cari-jalur — payoff
   VO:        4-cari-jalur-vo.md
   Direction: 4-cari-jalur-direction.md

   Bayaran atas pertanyaan yang digantung scene 1.

   DUA KEPUTUSAN:

   1. Dua jalur yang TIDAK dipilih tetap terlihat di opacity semula. Kalau
      keduanya hilang, yang terbaca "cuma ada satu jalan" — dan pilihan berhenti
      jadi pilihan. Ini kesalahan yang sama yang sudah diperbaiki di scene 9
      video panjang.

   2. Simpul menyala menurut POSISI potongan, bukan menurut detik. Begitu satu
      kalimat VO berubah dan seluruh timing bergeser, nyalanya ikut sendiri.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-jaringan";
import {
  JALUR_UTAMA,
  JALUR_X,
  JaringanTegak,
  TeksLayar,
  Tujuan,
  W,
  Y_ATAS,
  Y_BAWAH,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "cari-jalur";

const B_PILIH = beat(ID, 0); // "Ketika kamu mengirim data, informasi tentang alamat…"
const B_LEWAT = beat(ID, 1); // "Data kemudian bergerak melalui berbagai perangkat…"

const ALAMAT = "192.168.1.10";
const DIPILIH = 1;

export const CariJalur: React.FC = () => {
  const d = useDetik();

  const pilih = t(d, { mulai: B_PILIH + 0.6, durasi: 0.6, dari: 0, ke: 1 });
  const turun = t(d, { mulai: B_LEWAT, durasi: 2.6, dari: 0, ke: 1, ease: E.power1out });

  const yPaket = Y_ATAS + (Y_BAWAH - Y_ATAS) * turun;

  const teks1 = masuk(d, { mulai: B_PILIH + 0.2, durasi: 0.45, geser: 20 });
  const teks2 = masuk(d, { mulai: B_LEWAT + 0.2, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} nyala={nyalaSimpul(yPaket)} />

          {/* Jalur terpilih MENYALA di atas jalur yang sudah ada — yang dua
              lainnya tidak disentuh sama sekali. */}
          <line
            x1={JALUR_X[DIPILIH]}
            y1={Y_ATAS}
            x2={JALUR_X[DIPILIH]}
            y2={Y_BAWAH}
            stroke="var(--accent)"
            strokeWidth={7}
            strokeLinecap="round"
            opacity={pilih}
          />

          <Tujuan y={1700} nyala={turun > 0.95 ? 1 : 0} />

          <Paket
            x={JALUR_UTAMA}
            y={yPaket}
            nomor={1}
            skala={1.2}
            label={ALAMAT}
            warna={turun > 0.95 ? "ok" : "biasa"}
          />

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["Alamatnya yang", "memilih jalan."]} y={300} />
          </g>
          <g style={{ opacity: teks2.opacity, transform: teks2.transform }}>
            <TeksLayar baris={["Lewat banyak", "tangan."]} y={300} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
