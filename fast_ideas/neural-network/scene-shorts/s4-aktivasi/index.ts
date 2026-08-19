/* Daftar scene Short 4 "aktivasi" (T19 · Episode 04) — HARD RULE 1.

     1-cuma-tambah.tsx        hook — hasil penjumlahan itu garis lurus
     2-terlalu-sederhana.tsx  tiga garis lurus melebur jadi satu
     3-dilengkungkan.tsx      garisnya berubah bentuk jadi lengkungan S
     4-pola-rumit.tsx         batas pemisah berkelok memisahkan sebaran XOR
     5-intinya.tsx            lurus vs lengkung berdampingan. Namanya jatuh di sini
     6-berikutnya.tsx         simpul berlipat jadi jaringan berlapis
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU (di luar folder ini):

     ../panggung-nn.tsx     jaringan & teks layar — komponen yang SAMA dengan
                            Episode 01, 02, 05
     ../panggung-seri.tsx   sumbu, kurva, kotak grafik, bentuk AKTIVASI
     ../panggung-lapis.tsx  sebaran XOR yang sama persis dengan Episode 05
*/
import type React from "react";

import { CumaTambah } from "./1-cuma-tambah";
import { TerlaluSederhana } from "./2-terlalu-sederhana";
import { Dilengkungkan } from "./3-dilengkungkan";
import { PolaRumit } from "./4-pola-rumit";
import { Intinya } from "./5-intinya";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "cuma-tambah": CumaTambah,
  "terlalu-sederhana": TerlaluSederhana,
  dilengkungkan: Dilengkungkan,
  "pola-rumit": PolaRumit,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
