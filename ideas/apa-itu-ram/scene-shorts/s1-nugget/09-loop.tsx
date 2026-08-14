/* T01-S1 · scene 9 · loop — beat tutup + loop, 3,4 dtk
   Direction: 09-loop-direction.md
   VO:        09-loop-vo.md

   Tugas scene ini bukan merangkum — ia MENYIAPKAN PENDARATAN untuk penonton
   yang akan mengulang Short ini dari detik nol.

   FRAME TERAKHIR SCENE INI = FRAME PERTAMA 01-menunggu. Itu bukan kemiripan
   gaya, itu syarat: loop YouTube Shorts memotong keras dari frame terakhir ke
   frame pertama, dan dua susunan yang berbeda membuat putaran kedua terasa
   sebagai video lain. Posisi chip, pola denyut, dan letak hitungan semuanya
   dibaca dari ../tiga-tempat.tsx — sama persis dengan yang dibaca scene 1.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Chip,
  HitunganDiam,
  TeksAtas,
  TigaTempat,
  denyutChip,
} from "../tiga-tempat";

/** Panggung dibubarkan dulu, baru chip-nya sendirian. */
const T_BUBAR = 0.05;
const T_DENYUT = 1.15;
/** Hitungan muncul lagi setelah denyut kedua berhenti — jarak yang sama dengan
 *  scene 1, diukur dari denyutnya, bukan dari awal scene. */
const T_HITUNG = T_DENYUT + 0.84;

export const Loop: React.FC = () => {
  const d = useDetik();

  const bubar = t(d, {
    mulai: T_BUBAR,
    durasi: 0.4,
    dari: 1,
    ke: 0,
    ease: E.power1in,
  });

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        yang tidak sempat disalin
      </TeksAtas>

      {/* Tiga tempat & angkanya memudar keluar. Chip dan hitungan TIDAK ikut —
          merekalah yang harus sudah pada tempatnya saat frame terakhir tiba. */}
      <TigaTempat terang={() => false} opacity={bubar} geser={20 * (1 - bubar)} />

      <Chip skala={denyutChip(d, T_DENYUT)} />
      <HitunganDiam
        nilai={d - T_HITUNG}
        opacity={t(d, { mulai: T_HITUNG, durasi: 0.3, dari: 0, ke: 1 })}
      />

      {/* CTA — kecil, redup, dan TIDAK diucapkan (09-loop-vo.md § Catatan).
          Di dalam kotak aman bawah: di bawah y 1480 tertutup UI YouTube. */}
      <p
        className="t-label"
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1390,
          textAlign: "center",
          color: "var(--ink-2)",
          opacity: t(d, { mulai: 0.6, durasi: 0.5, dari: 0, ke: 1 }),
        }}
      >
        cara kerjanya → video panjang
      </p>
    </Scene>
  );
};
