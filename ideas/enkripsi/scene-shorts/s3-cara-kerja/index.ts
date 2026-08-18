/* Daftar scene Short 3 "cara-kerja" — HARD RULE 1 berlaku utuh.
   Bentuknya sama persis dengan s1-perjalanan/index.ts; alasannya ada di sana.

     1-kalau-diubah.tsx    hook — sosok latar menjawab "kenapa" tanpa satu kata
     2-enkripsi.tsx        [what] DINAMAI di sini; perubahan bentuknya
     3-dikirim.tsx         jaringan yang sama persis dengan Short 1 & 2
     4-yang-terlihat.tsx   frame identik dengan Short 2 scene 3, isi berbeda
     5-banding.tsx         perbandingan MENDATAR — frame terpenting
     6-gimana-bacanya.tsx  tutup + jembatan ke Short 4
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   `1-kalau-diubah.tsx` mengekspor PUSAT dan `2-enkripsi.tsx` mengekspor KOTAK —
   keduanya dipakai supaya kalimatnya turun ke tempat kotaknya akan berdiri,
   bukan ke titik yang kebetulan mirip.
*/
import type React from "react";

import { KalauDiubah } from "./1-kalau-diubah";
import { Enkripsi } from "./2-enkripsi";
import { Dikirim } from "./3-dikirim";
import { YangTerlihat } from "./4-yang-terlihat";
import { Banding } from "./5-banding";
import { GimanaBacanya } from "./6-gimana-bacanya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "kalau-diubah": KalauDiubah,
  enkripsi: Enkripsi,
  dikirim: Dikirim,
  "yang-terlihat": YangTerlihat,
  banding: Banding,
  "gimana-bacanya": GimanaBacanya,
};
