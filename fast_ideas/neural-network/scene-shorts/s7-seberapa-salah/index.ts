/* Daftar scene Short 7 "seberapa salah" (T19 · Episode 07) — HARD RULE 1.

     1-seberapa-salah.tsx  hook — tebakan dan jawaban benar berdampingan
     2-dibandingkan.tsx    angkanya muncul; jaraknya ditandai batang
     3-jadi-angka.tsx      batang jarak BERPINDAH jadi meter
     4-makin-besar.tsx     satu angka menggerakkan jarak, meter, dan angkanya
     5-intinya.tsx         tinggal meter + namanya. Namanya jatuh di sini
     6-berikutnya.tsx      satu sambungan menyala; apa yang harus diubah?
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU (di luar folder ini): ../panggung-nn.tsx · ../panggung-seri.tsx
*/
import type React from "react";

import { SeberapaSalah } from "./1-seberapa-salah";
import { Dibandingkan } from "./2-dibandingkan";
import { JadiAngka } from "./3-jadi-angka";
import { MakinBesar } from "./4-makin-besar";
import { Intinya } from "./5-intinya";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "seberapa-salah": SeberapaSalah,
  dibandingkan: Dibandingkan,
  "jadi-angka": JadiAngka,
  "makin-besar": MakinBesar,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
