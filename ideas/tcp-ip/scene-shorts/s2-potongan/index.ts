/* Daftar scene Short 2 "potongan" — HARD RULE 1 berlaku utuh di sini.

   Penomoran mulai dari 1 lagi (docs/02 § Di mana berkasnya), dan SATU DIGIT
   karena Short ini cuma punya enam entri (5 scene + closing).

     1-terlalu-besar.tsx  hook — satu benda besar, satu lubang lebih kecil
     2-dipecah.tsx        bidang terbelah lima; sekarang muat
     3-jalur-beda.tsx     payoff — kelimanya menyebar ke tiga jalur
     4-disusun.tsx        tiba berantakan, lalu diurutkan
     5-utuh.tsx           tutup + loop — bidang yang sama dengan scene 1
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   ID KOMPOSISI BERPREFIKS DUA LAPIS: `t18-s2-3-jalur-beda`.

   BERKAS BANTU di luar folder ini: ../panggung-short.tsx (koordinat 9:16) dan
   ../../panggung-jaringan.tsx (komponen bersama dengan video panjang).
*/
import type React from "react";

import { TerlaluBesar } from "./1-terlalu-besar";
import { Dipecah } from "./2-dipecah";
import { JalurBeda } from "./3-jalur-beda";
import { Disusun } from "./4-disusun";
import { Utuh } from "./5-utuh";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "terlalu-besar": TerlaluBesar,
  dipecah: Dipecah,
  "jalur-beda": JalurBeda,
  disusun: Disusun,
  utuh: Utuh,
};
