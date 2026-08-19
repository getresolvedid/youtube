/* Daftar scene Short 9 "lereng" (T19 · Episode 09) — HARD RULE 1 berlaku utuh.

   DIBANGUN ULANG 2026-08-19 mengikuti peta 15 episode: scene `coba-semua` lama
   dihapus (tidak ada di peta), `turun` dipecah jadi `menurun` + `langkah-kecil`
   seperti peta memisahkan MOVE DOWNHILL dari SMALL STEPS, dan `berikutnya`
   ditambahkan karena Short ini menyambung ke Episode 10 — bukan menutup seri
   (naskah.md § Bentrok tercatat 3).

     1-ke-mana.tsx        hook — bola di lereng, dua arah sama terang
     2-lereng.tsx         melesetnya digambar sebagai lereng
     3-menurun.tsx        panah kemiringan menanjak; yang dilakukan kebalikannya
     4-langkah-kecil.tsx  empat langkah, tiap langkah memendek
     5-dasar.tsx          sampai di dasar. Di sinilah namanya jatuh
     6-berikutnya.tsx     lereng jadi satu tahap dari empat; latihan digantung
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)
*/
import type React from "react";

import { KeMana } from "./1-ke-mana";
import { LerengScene } from "./2-lereng";
import { Menurun } from "./3-menurun";
import { LangkahKecil } from "./4-langkah-kecil";
import { Dasar } from "./5-dasar";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "ke-mana": KeMana,
  lereng: LerengScene,
  menurun: Menurun,
  "langkah-kecil": LangkahKecil,
  dasar: Dasar,
  berikutnya: Berikutnya,
};
