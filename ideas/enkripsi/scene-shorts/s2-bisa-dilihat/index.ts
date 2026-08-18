/* Daftar scene Short 2 "bisa-dilihat" — HARD RULE 1 berlaku utuh di sini.
   Bentuknya sama persis dengan s1-perjalanan/index.ts; alasannya ada di sana.

     1-jalan-terus.tsx       hook — diperkenalkan ulang tanpa "di video sebelumnya"
     2-ada-yang-lihat.tsx
     3-terbaca.tsx           frame yang dibandingkan Short 3
     4-mestinya-berdua.tsx
     5-pertanyaan.tsx        gembok sebagai GARIS
     6-jawabannya.tsx        garis jadi pejal; namanya jatuh; berhenti
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   `5-pertanyaan.tsx` mengekspor PUSAT, SENGKANG, dan BADAN yang dipakai
   `6-jawabannya.tsx`: gemboknya harus berada di TITIK YANG SAMA saat berubah
   dari garis jadi pejal, dan dua salinan angka akan meleset dalam sekali sunting.
*/
import type React from "react";

import { JalanTerus } from "./1-jalan-terus";
import { AdaYangLihat } from "./2-ada-yang-lihat";
import { Terbaca } from "./3-terbaca";
import { MestinyaBerdua } from "./4-mestinya-berdua";
import { Pertanyaan } from "./5-pertanyaan";
import { Jawabannya } from "./6-jawabannya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "jalan-terus": JalanTerus,
  "ada-yang-lihat": AdaYangLihat,
  terbaca: Terbaca,
  "mestinya-berdua": MestinyaBerdua,
  pertanyaan: Pertanyaan,
  jawabannya: Jawabannya,
};
