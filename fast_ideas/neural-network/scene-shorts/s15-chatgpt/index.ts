/* Daftar scene Short 15 "chatgpt" (T19 · Episode 15) — HARD RULE 1.

   EPISODE TERAKHIR SERI. Scene penutupnya tidak menggantung apa pun.

     1-di-mana.tsx    hook — jendela percakapan, jaringan samar di belakangnya
     2-fondasi.tsx    blok transformer tersusun di belakang jendela
     3-ide-sama.tsx   BOBOT → LATIHAN → KESALAHAN → SETELAN (kata Ep 03/10/07/08)
     4-bahasa.tsx     garis perhatian Episode 14, mengalir jadi satu tebakan
     5-intinya.tsx    satu simpul (Ep 02) tumbuh jadi jaringan lalu blok
     6-penutup.tsx    lima belas titik jadi satu jalur; judul seri
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU (di luar folder ini):

     ../panggung-gelung.tsx  blok transformer & jendela obrolan — bentuk yang
                             SAMA dengan Episode 14
     ../panggung-seri.tsx    kalimat & angka perhatian yang sama dengan Ep 13–14
     ../panggung-neuron.tsx  simpul besar Episode 02
     ../panggung-nn.tsx      jaringan yang sama sejak Episode 01
*/
import type React from "react";

import { DiMana } from "./1-di-mana";
import { Fondasi } from "./2-fondasi";
import { IdeSama } from "./3-ide-sama";
import { Bahasa } from "./4-bahasa";
import { Intinya } from "./5-intinya";
import { Penutup } from "./6-penutup";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "di-mana": DiMana,
  fondasi: Fondasi,
  "ide-sama": IdeSama,
  bahasa: Bahasa,
  intinya: Intinya,
  penutup: Penutup,
};
