/* Daftar scene Short 1 "perjalanan" — HARD RULE 1 berlaku utuh di sini.

   PENOMORAN MULAI DARI 1 LAGI di tiap subfolder, dan HARD RULE 5 berhenti di
   batas subfolder: empat Short adalah empat urutan tayang yang berdiri sendiri,
   bukan satu daftar panjang (docs/02 § Di mana berkasnya).

   Nomornya SATU DIGIT karena Short ini cuma punya tujuh entri (6 scene +
   closing). Begitu ia menyeberang sepuluh, SEMUA berkas berganti jadi `01-`
   dan seterusnya — `npm run sisa` yang menyebutkan nama barunya.

     1-ketik-kirim.tsx      hook — belum ada jaringan, belum ada pengamat
     2-keluar-layar.tsx
     3-masuk-jaringan.tsx   panggung yang dipakai ulang Short 2, 3, 4
     4-perjalanan.tsx
     5-sampai.tsx
     6-aman-tidak.tsx       tutup + jembatan ke Short 2
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   ID KOMPOSISI BERPREFIKS DUA LAPIS: `t17-s1-3-masuk-jaringan`. Lapis `s1`
   memisahkan Short dari video panjang — tanpa itu `1-ketik-kirim` berebut ruang
   nama dengan scene video panjang. Lapis `t17` memisahkan episode dari episode:
   `99-closing` ada di SETIAP Short setiap topik, dan Remotion menolak dua
   komposisi dengan id yang sama — saat RENDER, bukan saat `tsc`.

   DUA BERKAS BANTU, keduanya DI LUAR folder ini (`npm run sisa` memeriksa tiap
   `.tsx` di sini terhadap daftar kunci dari naskah):

     ../panggung-short.tsx      koordinat 9:16, jaringan tegak, teks layar
     ../../panggung-kiriman.tsx komponen bersama dengan video panjang —
                                sosok, HP, paket, kotak proses, kunci, gembok,
                                dan kalimat contohnya
*/
import type React from "react";

import { KetikKirim } from "./1-ketik-kirim";
import { KeluarLayar } from "./2-keluar-layar";
import { MasukJaringan } from "./3-masuk-jaringan";
import { Perjalanan } from "./4-perjalanan";
import { Sampai } from "./5-sampai";
import { AmanTidak } from "./6-aman-tidak";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "ketik-kirim": KetikKirim,
  "keluar-layar": KeluarLayar,
  "masuk-jaringan": MasukJaringan,
  perjalanan: Perjalanan,
  sampai: Sampai,
  "aman-tidak": AmanTidak,
};
