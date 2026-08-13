/* Daftar scene episode T01 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx`

     urutan  posisi scene di episode, 1-based, sesuai TIMING di timing.gen.ts.
             Opening & closing IKUT terhitung walaupun berkasnya tidak di sini
             (keduanya milik shared/) — jadi nomornya berlubang di 2 dan 83.
     id      kolom pertama tabel scene di naskah.md, dan kunci di SCENES.

     1-hook-question.tsx     ← urutan 1
     (urutan 2 = opening, shared/StandarScenes.tsx)
     3-s004.tsx              ← urutan 3, id s004
     ...
     (urutan 83 = closing, shared/StandarScenes.tsx)

   Kenapa nomornya di nama berkas dan bukan cuma ID: `ls scenes/` jadi urutan
   tayang, bukan urutan abjad. Dengan ID saja, `hook-question.tsx` mendarat di
   antara `s0xx` yang lain dan urutan sebenarnya cuma ada di kepala.

   Nomornya diperiksa `npm run sisa` — kalau naskah disisipi scene baru dan
   nomor berkasnya tidak digeser, ia akan protes. Jangan diabaikan: nomor yang
   bohong lebih buruk daripada tidak ada nomor.

   Cara menambah scene:
     1. Buat berkasnya, export satu komponen.
     2. Daftarkan di SCENES, kuncinya ID dari naskah.
     3. `npm run sisa` untuk memastikan nomornya benar.

   Yang otomatis didapat begitu terdaftar:
     - masuk episode pada timing dari naskah (../Episode.tsx)
     - jadi komposisi sendiri di Studio, bisa di-preview satuan (src/Root.tsx)

   ID yang ada di naskah tapi belum di sini tampil sebagai <BelumDibuat> —
   kuning bergaris, lengkap dengan baris VO-nya.
*/
import type React from "react";

import { HookQuestion } from "./1-hook-question";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "hook-question": HookQuestion,
};
