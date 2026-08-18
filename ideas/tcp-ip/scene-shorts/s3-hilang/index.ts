/* Daftar scene Short 3 "hilang" — HARD RULE 1 berlaku utuh di sini.

   Penomoran mulai dari 1 lagi (docs/02 § Di mana berkasnya), dan SATU DIGIT
   karena Short ini punya tujuh entri (6 scene + closing).

     1-lima-potongan.tsx  hook — lima potongan sudah berangkat di frame nol
     2-satu-hilang.tsx    ketegangan — nomor 3 tidak pernah sampai
     3-ketahuan.tsx       lubangnya disorot dengan meredupkan yang lain
     4-minta-lagi.tsx     payoff — satu-satunya gerakan ke ATAS
     5-lengkap.tsx        lubangnya menutup; slot lain diam total
     6-namanya.tsx        tutup + loop
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   ID KOMPOSISI BERPREFIKS DUA LAPIS: `t18-s3-4-minta-lagi`.

   KOORDINAT SLOT MILIK ../panggung-short.tsx (`slotX`, `Y_SLOT`, `SlotKosong`),
   bukan salah satu berkas di sini. Kelima scene memakainya, dan slot yang
   bergeser satu piksel pun antar-scene membatalkan seluruh Short ini — jadi
   angkanya cuma boleh ada di satu tempat, dan tempat itu di luar folder scene.
*/
import type React from "react";

import { LimaPotongan } from "./1-lima-potongan";
import { SatuHilang } from "./2-satu-hilang";
import { Ketahuan } from "./3-ketahuan";
import { MintaLagi } from "./4-minta-lagi";
import { Lengkap } from "./5-lengkap";
import { Namanya } from "./6-namanya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "lima-potongan": LimaPotongan,
  "satu-hilang": SatuHilang,
  ketahuan: Ketahuan,
  "minta-lagi": MintaLagi,
  lengkap: Lengkap,
  namanya: Namanya,
};
