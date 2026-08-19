/* Daftar scene Short 6 "maju" (T19 · Episode 06) — HARD RULE 1.

     1-apa-terjadi.tsx  hook — masukan muncul, jaringan menyala sekejap
     2-masuk.tsx        angka turun ke lapis pertama; dua lapis lain masih gelap
     3-maju.tsx         denyut menyeberangi dua lapis dengan tempo yang sama
     4-keluaran.tsx     simpul keluaran menyala; kartu tebakan muncul
     5-forward.tsx      panah membentang seluruh jaringan. Namanya jatuh di sini
     6-berikutnya.tsx   kartu bergetar; tanda tanya muncul di sebelahnya
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU (di luar folder ini): ../panggung-nn.tsx · ../panggung-seri.tsx
*/
import type React from "react";

import { ApaTerjadi } from "./1-apa-terjadi";
import { Masuk } from "./2-masuk";
import { Maju } from "./3-maju";
import { Keluaran } from "./4-keluaran";
import { Forward } from "./5-forward";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "apa-terjadi": ApaTerjadi,
  masuk: Masuk,
  maju: Maju,
  keluaran: Keluaran,
  forward: Forward,
  berikutnya: Berikutnya,
};
