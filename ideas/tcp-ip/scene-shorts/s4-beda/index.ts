/* Daftar scene Short 4 "beda" — HARD RULE 1 berlaku utuh di sini.

   Penomoran mulai dari 1 lagi (docs/02 § Di mana berkasnya), dan SATU DIGIT
   karena Short ini cuma punya enam entri (5 scene + closing).

     1-pertanyaan.tsx  hook — dua nama dempet, lalu dipisahkan
     2-sisi-ip.tsx     sisi pertama: memilih arah
     3-sisi-tcp.tsx    sisi kedua: yang terjadi SESUDAH sampai
     4-bersama.tsx     payoff — layar dibelah ATAS-BAWAH, lalu menyatu
     5-namanya.tsx     tutup + loop — garis miringnya yang jadi payoff
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   ID KOMPOSISI BERPREFIKS DUA LAPIS: `t18-s4-4-bersama`.

   BERKAS BANTU di luar folder ini: ../panggung-short.tsx (koordinat 9:16) dan
   ../../panggung-jaringan.tsx (komponen bersama dengan video panjang).
*/
import type React from "react";

import { Pertanyaan } from "./1-pertanyaan";
import { SisiIp } from "./2-sisi-ip";
import { SisiTcp } from "./3-sisi-tcp";
import { Bersama } from "./4-bersama";
import { Namanya } from "./5-namanya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  pertanyaan: Pertanyaan,
  "sisi-ip": SisiIp,
  "sisi-tcp": SisiTcp,
  bersama: Bersama,
  namanya: Namanya,
};
