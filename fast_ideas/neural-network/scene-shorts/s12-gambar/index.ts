/* Daftar scene Short 12 "gambar" (T19 · Episode 12) — HARD RULE 1.

     1-lihat-gambar.tsx  hook — gambar sebagai kisi titik
     2-jendela.tsx       satu sel salah; jendela 3x3 menyapu sepetak demi sepetak
     3-penyaring.tsx     tiga hasil dari gambar yang SAMA, penyaring berbeda
     4-bertingkat.tsx    hasil bergabung jadi bentuk, lalu jadi kucing
     5-cnn.tsx           tangga PETAK → CIRI → BENTUK. Namanya jatuh di sini
     6-berikutnya.tsx    kisi memudar; potongan kata muncul
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU: ../panggung-seri.tsx (`GAMBAR`, `PENYARING`, `Kisi`,
   `Potongan`) · ../panggung-lapis.tsx (tangga yang sama dengan Episode 05) ·
   ../panggung-nn.tsx (kucing yang sama dengan Episode 01 dan 05)
*/
import type React from "react";

import { LihatGambar } from "./1-lihat-gambar";
import { Jendela } from "./2-jendela";
import { Penyaring } from "./3-penyaring";
import { Bertingkat } from "./4-bertingkat";
import { Cnn } from "./5-cnn";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "lihat-gambar": LihatGambar,
  jendela: Jendela,
  penyaring: Penyaring,
  bertingkat: Bertingkat,
  cnn: Cnn,
  berikutnya: Berikutnya,
};
