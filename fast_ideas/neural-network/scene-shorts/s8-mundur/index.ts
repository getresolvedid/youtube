/* Daftar scene Short 8 "mundur" (T19 · Episode 08) — HARD RULE 1.

     1-apa-diubah.tsx   hook — meter kesalahan berhenti, jaringan membeku
     2-mundur.tsx       denyut berjalan ke ATAS, melawan arah Episode 06
     3-andil.tsx        sambungan menyala dengan terang yang berbeda-beda
     4-arah-turun.tsx   panah muncul, panjangnya mengikuti andilnya
     5-intinya.tsx      namanya jatuh di sini
     6-berikutnya.tsx   satu panah ditakar besarnya
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU: ../panggung-nn.tsx · ../panggung-seri.tsx (`ANDIL` — nilai andil
   per sambungan, DITULIS bukan diacak)
*/
import type React from "react";

import { ApaDiubah } from "./1-apa-diubah";
import { Mundur } from "./2-mundur";
import { Andil } from "./3-andil";
import { ArahTurun } from "./4-arah-turun";
import { Intinya } from "./5-intinya";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "apa-diubah": ApaDiubah,
  mundur: Mundur,
  andil: Andil,
  "arah-turun": ArahTurun,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
