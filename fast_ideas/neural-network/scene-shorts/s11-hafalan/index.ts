/* Daftar scene Short 11 "hafalan" (T19 · Episode 11) — HARD RULE 1.

     1-hafal-atau-belajar.tsx  hook — semua contoh latihan dijawab benar
     2-data-latih.tsx          batas berkelok rapat; skor hampir sempurna
     3-data-baru.tsx           titik baru jatuh; sebagian di sisi yang salah
     4-overfitting.tsx         tempat batas MENEMPEL ke titik latihan disorot
     5-intinya.tsx             batas MELURUS jadi pola. Namanya jatuh di sini
     6-berikutnya.tsx          sebaran memudar; kisi gambar muncul
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU: ../panggung-lapis.tsx (sebaran XOR yang sama dengan Episode 04
   dan 05, dua bentuk batas, titik baru) · ../panggung-seri.tsx · ../panggung-nn.tsx
*/
import type React from "react";

import { HafalAtauBelajar } from "./1-hafal-atau-belajar";
import { DataLatih } from "./2-data-latih";
import { DataBaru } from "./3-data-baru";
import { Overfitting } from "./4-overfitting";
import { Intinya } from "./5-intinya";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "hafal-atau-belajar": HafalAtauBelajar,
  "data-latih": DataLatih,
  "data-baru": DataBaru,
  overfitting: Overfitting,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
