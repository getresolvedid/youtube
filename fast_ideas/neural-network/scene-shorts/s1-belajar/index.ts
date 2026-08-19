/* Daftar scene Short 1 "belajar" (T19 · Episode 1) — HARD RULE 1 berlaku utuh.

   PENOMORAN MULAI DARI 1 di tiap subfolder, dan HARD RULE 5 berhenti di batas
   subfolder: tiap Short adalah urutan tayang yang berdiri sendiri.

   Nomornya SATU DIGIT karena Short ini punya tujuh entri (6 scene + closing).
   Begitu ia menyeberang sepuluh, SEMUA berkas berganti jadi `01-` dan
   seterusnya — `npm run sisa` yang menyebutkan nama barunya.

     1-cara-belajar.tsx     hook — jaringan tumbuh, satu denyut, satu pertanyaan
     2-belum-tahu.tsx       contoh masuk, jawabannya salah, jaraknya menganga
     3-tebak-cek-geser.tsx  tiga tahap: tebak → meleset → geser
     4-diulang.tsx          gelung berputar tiga kali, jaraknya mengecil
     5-intinya.tsx          rantai empat kata — di sini namanya jatuh
     6-berikutnya.tsx       kamera masuk ke satu simpul
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   ID KOMPOSISI BERPREFIKS DUA LAPIS: `t19-s1-4-diulang`. Lapis `s1` memisahkan
   Short dari video panjang; lapis `t19` memisahkan topik dari topik —
   `99-closing` ada di SETIAP Short setiap topik, dan Remotion menolak dua
   komposisi dengan id yang sama saat RENDER, bukan saat `tsc`.

   SATU BERKAS BANTU, di luar folder ini (`npm run sisa` memeriksa tiap `.tsx`
   di sini terhadap daftar kunci dari naskah):

     ../panggung-nn.tsx   koordinat 9:16, jaringan tiga lapis, kartu, batang
                          meleset, kolom tahap, dan transform gelung scene 4–6
*/
import type React from "react";

import { CaraBelajar } from "./1-cara-belajar";
import { BelumTahu } from "./2-belum-tahu";
import { TebakCekGeser } from "./3-tebak-cek-geser";
import { Diulang } from "./4-diulang";
import { Intinya } from "./5-intinya";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "cara-belajar": CaraBelajar,
  "belum-tahu": BelumTahu,
  "tebak-cek-geser": TebakCekGeser,
  diulang: Diulang,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
