/* Daftar scene episode T01 — HARD RULE 1: satu scene = satu berkas.
   Nama berkas boleh nomor (`s042.tsx`) atau semantik (`hook-question.tsx`).

   Cara menambah scene:

     1. Buat ideas/apa-itu-ram/scenes/s042.tsx
        export const S042: React.FC = () => { ... }
     2. Daftarkan di SCENES di bawah, kuncinya = ID di kolom pertama tabel
        scene di naskah.md.

   Otomatis dapat dua hal begitu terdaftar:
     - masuk ke episode pada timing dari naskah (ideas/.../Episode.tsx)
     - jadi komposisi sendiri di Studio, bisa di-preview satuan (src/Root.tsx)

   ID yang ada di naskah tapi belum ada di sini akan tampil sebagai
   <BelumDibuat> — kuning bergaris, lengkap dengan baris VO-nya.

   Opening & closing TIDAK didaftarkan di sini. Keduanya milik shared/
   (shared/StandarScenes.tsx) supaya semua episode membuka dan menutup
   identik — docs/10-scene-standar.md.
*/
import type React from "react";

export const SCENES: Readonly<Record<string, React.FC>> = {
  // (kosong — 80 scene generate lama dibuang saat migrasi ke Remotion)
};
