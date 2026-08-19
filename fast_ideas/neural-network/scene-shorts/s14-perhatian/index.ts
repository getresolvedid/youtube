/* Daftar scene Short 14 "perhatian" (T19 · Episode 14) — HARD RULE 1.

     1-kata-mana.tsx   hook — empat potongan, TANPA garis penghubung
     2-token.tsx       garis muncul antar-semua pasangan, semuanya sama tipis
     3-perhatian.tsx   satu potongan disorot; garisnya menebal sesuai angkanya
     4-konteks.tsx     sorotan berpindah; polanya BERUBAH, bukan bertambah
     5-intinya.tsx     garis menyatu jadi blok. Namanya jatuh di sini
     6-berikutnya.tsx  blok mengecil; jendela percakapan muncul
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU: ../panggung-seri.tsx (`KALIMAT` & `PERHATIAN` — angka perhatian
   DITULIS dan masuk akal untuk kalimatnya) · ../panggung-gelung.tsx (blok
   transformer & jendela obrolan, dipakai lagi Episode 15)
*/
import type React from "react";

import { KataMana } from "./1-kata-mana";
import { Token } from "./2-token";
import { Perhatian } from "./3-perhatian";
import { Konteks } from "./4-konteks";
import { Intinya } from "./5-intinya";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "kata-mana": KataMana,
  token: Token,
  perhatian: Perhatian,
  konteks: Konteks,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
