/* Daftar scene Short 13 "urutan" (T19 · Episode 13) — HARD RULE 1.

     1-urutan.tsx        hook — empat potongan kata berjajar
     2-konteks.tsx       dua potongan BERTUKAR TEMPAT lewat lintasan melengkung
     3-bawa-konteks.tsx  kapsul keterangan berjalan dan MEMBESAR tiap langkah
     4-contoh.tsx        bahasa, suara, waktu masuk ke SATU model
     5-intinya.tsx       potongan AWAL yang menyala saat yang terakhir diproses
     6-berikutnya.tsx    garis melengkung muncul, tebalnya masih seragam
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU: ../panggung-seri.tsx (`KALIMAT` — kalimat yang SAMA untuk
   Episode 13, 14, 15) · ../panggung-nn.tsx
*/
import type React from "react";

import { Urutan } from "./1-urutan";
import { Konteks } from "./2-konteks";
import { BawaKonteks } from "./3-bawa-konteks";
import { Contoh } from "./4-contoh";
import { Intinya } from "./5-intinya";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  urutan: Urutan,
  konteks: Konteks,
  "bawa-konteks": BawaKonteks,
  contoh: Contoh,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
