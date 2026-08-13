/* Daftar scene episode T01 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx` — dan bentuk yang sama persis dipakai
   sebagai ID komposisi Remotion. Berkas, perintah CLI, dan baris di sidebar
   Studio menyebut hal yang identik:

     ideas/apa-itu-ram/scenes/01-hook-question.tsx
     npx remotion still 01-hook-question out/hook.png
     Studio -> scene/01-hook-question

     urutan  posisi scene di episode, 1-based, sesuai TIMING di timing.gen.ts.
             Di-pad selebar jumlah scene (83 scene -> 2 digit) supaya
             `ls scenes/` benar-benar urut tayang; tanpa pad, urutannya jadi
             1, 10, 11, 2, 20 dan nomornya tidak mengurutkan apa-apa.
             Opening & closing IKUT terhitung walaupun berkasnya tidak di sini
             (keduanya milik shared/) — jadi nomornya berlubang di 02 dan 83.
     id      kolom pertama tabel scene di naskah.md, dan kunci di SCENES.

     01-hook-question.tsx    ← urutan 1
     (urutan 02 = opening, shared/StandarScenes.tsx)
     03-s004.tsx             ← urutan 3, id s004
     ...
     (urutan 83 = closing, shared/StandarScenes.tsx)

   Nomornya dihitung `tools/bangun-timing.mjs` (field `kunci`), bukan diketik
   manual, dan diperiksa `npm run sisa` — kalau naskah disisipi scene baru dan
   nomor berkasnya tidak digeser, ia protes. Jangan diabaikan: nomor yang bohong
   lebih buruk daripada tidak ada nomor.

   Cara menambah scene:
     1. `npm run gen`, lihat `kunci` scene itu di timing.gen.ts.
     2. Buat berkas dengan nama persis `<kunci>.tsx`, export satu komponen.
     3. Daftarkan di SCENES di bawah — kuncinya **id**, bukan `kunci`.
     4. `npm run sisa` untuk memastikan nomornya benar.

   Yang otomatis didapat begitu terdaftar:
     - masuk episode pada timing dari naskah (../Episode.tsx)
     - jadi komposisi sendiri di Studio, bisa di-preview satuan (src/Root.tsx)

   ID yang ada di naskah tapi belum di sini tampil sebagai <BelumDibuat> —
   kuning bergaris, lengkap dengan baris VO-nya.
*/
import type React from "react";

import { HookQuestion } from "./01-hook-question";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "hook-question": HookQuestion,
};
