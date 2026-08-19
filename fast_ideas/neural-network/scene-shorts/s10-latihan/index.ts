/* Daftar scene Short 10 "latihan" (T19 · Episode 10) — HARD RULE 1.

   TUJUH scene, bukan enam: peta Episode 10 memang punya tujuh blok — hook,
   empat tahap, takeaway, next.

     1-apa-terjadi-latihan.tsx  hook — empat kotak kosong tersusun melingkar
     2-tebak.tsx                tahap 1, denyut maju (bentuk Episode 06)
     3-ukur.tsx                 tahap 2, meter kesalahan (bentuk Episode 07)
     4-mundur.tsx               tahap 3, denyut merah ke atas (bentuk Episode 08)
     5-perbarui.tsx             tahap 4 + panah yang PULANG ke kotak pertama
     6-intinya.tsx              gelung berputar cepat, contoh berganti-ganti
     7-berikutnya.tsx           gelung melambat; satu kartu tertinggal menyala merah
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU: ../panggung-gelung.tsx (kotak tahap, panah gelung, kartu
   contoh) · ../panggung-seri.tsx (`GELUNG` — susunan yang sama dengan gantungan
   Episode 09) · ../panggung-nn.tsx
*/
import type React from "react";

import { ApaTerjadiLatihan } from "./1-apa-terjadi-latihan";
import { Tebak } from "./2-tebak";
import { Ukur } from "./3-ukur";
import { Mundur } from "./4-mundur";
import { Perbarui } from "./5-perbarui";
import { Intinya } from "./6-intinya";
import { Berikutnya } from "./7-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "apa-terjadi-latihan": ApaTerjadiLatihan,
  tebak: Tebak,
  ukur: Ukur,
  mundur: Mundur,
  perbarui: Perbarui,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
