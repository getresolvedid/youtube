/* T17 (provisional) · scene 4 · lewat-internet — bagian 3 [problem]
   VO:        04-lewat-internet-vo.md
   Direction: 04-lewat-internet-direction.md

   Panggung yang dibangun di sini DIPAKAI LAGI APA ADANYA di scene 7, dan itu
   bukan penghematan: seluruh pelajaran episode ini ada di perbandingan kedua
   scene itu. Karena itu tidak ada satu koordinat pun yang ditulis di berkas ini
   — semuanya dari ../panggung-kiriman.tsx.

   NYALA SIMPUL DITURUNKAN DARI POSISI PAKET, bukan dari waktu. Simpul menyala
   karena ADA YANG LEWAT, jadi nyalanya tidak pernah meleset saat satu kalimat VO
   berubah dan seluruh timing bergeser.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  HP_KANAN,
  HP_KIRI,
  JALUR,
  Hp,
  Jaringan,
  Paket,
  nyalaSimpul,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "lewat-internet";

const B_MASUK = beat(ID, 0); // "Pesan tersebut diubah menjadi data…"
const B_LEWAT = beat(ID, 1); // "Data ini dapat melewati beberapa perangkat…"
const B_TANYA = beat(ID, 2); // "Dan di sinilah muncul pertanyaan penting."

/** Paket berhenti sebelum sampai — HP penerima baru dimasuki di scene 7. */
const X_HENTI = JALUR.kanan - 190;

export const LewatInternet: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: jaringannya tersingkap ---
     Satu nilai `luas` untuk simpul jauh, jadi mereka datang sebagai satu
     lapisan — bukan sembilan benda yang masing-masing punya jadwal. */
  const luas = t(d, {
    mulai: B_MASUK + 0.6,
    durasi: 1.4,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });

  /* --- paket menyusuri jalur ---
     Satu tween untuk seluruh scene, melambat di ujungnya (`E.expoOut` di ekor
     lewat durasi yang melewati B_TANYA). Kamera tidak menggeser: yang bergerak
     paketnya, dan jaringannya tetap di tempat supaya scene 7 bisa dibandingkan
     frame per frame. */
  const maju = t(d, {
    mulai: B_MASUK + 0.9,
    durasi: (B_TANYA - B_MASUK) + 1.4,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });
  const xPaket = JALUR.kiri - 90 + (X_HENTI - (JALUR.kiri - 90)) * maju;

  const hpKanan = t(d, { mulai: B_LEWAT + 1.4, durasi: 0.7, dari: 0, ke: 1 });

  /* --- tahap 3: pertanyaannya mendarat SESUDAH panggungnya diam ---
     Jedanya dibayar dari VO_PAD_SECONDS di ekor scene; teksnya sengaja jatuh di
     ekor beat terakhir, bukan di awalnya. */
  const tanya = masuk(d, { mulai: B_TANYA + 1.5, durasi: 0.6, geser: 24 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan luas={luas} nyala={nyalaSimpul(xPaket)} />

          <Hp {...HP_KIRI} nyala={0.6} />
          <g opacity={hpKanan}>
            <Hp {...HP_KANAN} nyala={0.6} />
          </g>

          <Paket x={xPaket} y={JALUR.y} />

          <g style={{ opacity: tanya.opacity, transform: tanya.transform }}>
            <text
              x={960}
              y={190}
              fontSize={56}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              Bagaimana jika data itu dilihat oleh orang lain?
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
