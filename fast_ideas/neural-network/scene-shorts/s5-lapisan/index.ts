/* Daftar scene Short 3 "lapisan" (T19 · Episode 3) — HARD RULE 1 berlaku utuh.

     1-satu-lapis.tsx    hook — dua lapis saja, tersambung langsung
     2-cuma-garis.tsx    satu garis lurus mencoba memisahkan, dan gagal
     3-ditumpuk.tsx      satu lapis menyisip di tengah; temuannya potongan
     4-jadi-bentuk.tsx   potongan bergabung jadi bentuk, lalu jadi kucing
     5-bertingkat.tsx    tangga tiga anak. Di sinilah namanya jatuh
     6-berikutnya.tsx    satu sambungan menyala, siap digeser — tapi ke mana?
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   DUA BERKAS BANTU, keduanya DI LUAR folder ini:

     ../panggung-nn.tsx     koordinat lapis, kucing, teks layar, label tahap —
                            komponen yang SAMA dengan Short 1 dan 2
     ../panggung-lapis.tsx  jaringan dua/tiga lapis, sebaran XOR, garis pemisah,
                            potongan, tangga
*/
import type React from "react";

import { SatuLapis } from "./1-satu-lapis";
import { CumaGaris } from "./2-cuma-garis";
import { Ditumpuk } from "./3-ditumpuk";
import { JadiBentuk } from "./4-jadi-bentuk";
import { Bertingkat } from "./5-bertingkat";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "satu-lapis": SatuLapis,
  "cuma-garis": CumaGaris,
  ditumpuk: Ditumpuk,
  "jadi-bentuk": JadiBentuk,
  bertingkat: Bertingkat,
  berikutnya: Berikutnya,
};
