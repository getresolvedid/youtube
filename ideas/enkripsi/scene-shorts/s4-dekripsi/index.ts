/* Daftar scene Short 4 "dekripsi" — HARD RULE 1 berlaku utuh.
   Bentuknya sama persis dengan s1-perjalanan/index.ts; alasannya ada di sana.

     1-masih-lambang.tsx  hook — isinya HARUS masih lambang di frame pertama
     2-kunci.tsx          kunci datang dari SISI PENERIMA, bukan dari jalur
     3-dekripsi.tsx       kebalikan persis dari Short 3 scene 2
     4-rantai.tsx         rantai TEGAK, enam potong di dalam satu beat
     5-dua-layar.tsx      bayaran seluruh seri
     6-definisi.tsx       definisinya, sekali, paling akhir
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   `1-masih-lambang.tsx` mengekspor HP dan L; `2-kunci.tsx` mengekspor Y_GEMBOK.
   Ketiganya dipakai scene sesudahnya supaya HP, bidang layar, dan letak
   gemboknya TIDAK PERNAH bergeser antar-scene — Short 4 seluruhnya terjadi di
   dalam satu HP, dan pergeseran sekecil apa pun terbaca sebagai potongan.
*/
import type React from "react";

import { MasihLambang } from "./1-masih-lambang";
import { KunciScene } from "./2-kunci";
import { Dekripsi } from "./3-dekripsi";
import { Rantai } from "./4-rantai";
import { DuaLayar } from "./5-dua-layar";
import { Definisi } from "./6-definisi";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "masih-lambang": MasihLambang,
  kunci: KunciScene,
  dekripsi: Dekripsi,
  rantai: Rantai,
  "dua-layar": DuaLayar,
  definisi: Definisi,
};
