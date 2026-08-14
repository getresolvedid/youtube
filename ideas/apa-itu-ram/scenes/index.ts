/* Daftar scene episode T01 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx` — dan bentuk yang sama persis dipakai
   sebagai ID komposisi Remotion. Berkas, perintah CLI, dan baris di sidebar
   Studio menyebut hal yang identik:

     ideas/apa-itu-ram/scenes/01-hook-question.tsx
     npx remotion still 01-hook-question out/hook.png
     Studio -> scene/01-hook-question

     urutan  posisi scene di episode, 1-based, sesuai TIMING di timing.gen.ts.
             Di-pad selebar jumlah scene (3 scene -> 1 digit, 83 scene -> 2)
             supaya `ls scenes/` benar-benar urut tayang; tanpa pad, urutannya
             jadi 1, 10, 11, 2, 20 dan nomornya tidak mengurutkan apa-apa.
             LEBARNYA IKUT BERUBAH saat jumlah scene menyeberang kelipatan 10 —
             menambah scene ke-10 mengganti nama SEMUA berkas. `npm run sisa`
             yang memberitahu; ia menyebut nama barunya satu per satu.
             Opening IKUT terhitung walaupun berkasnya tidak di sini (milik
             shared/) — jadi nomornya berlubang di 2. Closing tidak ikut
             mengurut sama sekali: ia DIPATOK di 99 (tools/bangun-timing.mjs),
             supaya menambah scene tidak terus-menerus mengganti namanya.
     id      kolom pertama tabel scene di naskah.md, dan kunci di SCENES.

     01-hook-question.tsx    ← urutan 1
     02-opening.tsx          ← urutan 2, TAPI bukan scene: scene-nya milik
                               shared/StandarScenes.tsx. Berkas ini cuma berisi
                               figur RAM yang dikirim Episode.tsx lewat prop
                               `figur` di <KartuJudul> (docs/10 § Figur
                               episode). Karena itu ia TIDAK ada di SCENES.
     03-bolak-balik.tsx      ← urutan 3
     04-ram-analogy.tsx      ← urutan 4
     05-kenapa-cepat.tsx     ← urutan 5
     06-ram-size.tsx         ← urutan 6
     07-ram-bentuk.tsx       ← urutan 7
     08-ram-generasi.tsx     ← urutan 8
     09-beda-penyimpanan.tsx ← urutan 9
     10-ram-tugas.tsx        ← urutan 10
     (99-closing = penutup, shared/StandarScenes.tsx)

   DUA KELOMPOK scene berbagi berkas koordinat, dan keduanya sengaja di luar
   folder ini — `npm run sisa` memeriksa setiap `.tsx` di sini terhadap daftar
   kunci dari naskah, jadi berkas bantu akan dilaporkan sebagai nama yang tidak
   dikenal:

     ../panggung-analogi.tsx   scene 3, 4, 5 & 9 — lemari, prosesor, kotak meja,
                               jalur panjang, tautan pendek. Scene 9 memakai
                               panggung yang sama sesudah kameranya mundur dari
                               batang.
     ../batang-ram.tsx         scene 7 & 8 — batang, slot, papan, kisi sel,
                               plus titik serah koordinat dari scene 7 ke 8,
                               dan dari scene 8 ke 9 (KOTAK_TERTAHAN: batang
                               yang melebar jadi papan meja)

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     01-hook-question-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     01-hook-question-direction.md  apa di layar        (HARD RULE 3)

   Keduanya ditulis Claude dan direvisi user lewat chat; koreksi dari chat
   ditulis balik ke berkasnya, bukan dibiarkan hidup di riwayat percakapan.

   Nomornya dihitung `tools/baca-episode.mjs` (field `kunci`), bukan diketik
   manual, dan diperiksa `npm run sisa` — kalau naskah disisipi scene baru dan
   nomor berkasnya tidak digeser, ia protes. Jangan diabaikan: nomor yang bohong
   lebih buruk daripada tidak ada nomor.

   Cara menambah scene:
     1. Tambah barisnya di tabel `### Scene` di naskah.md, di posisi tayangnya.
     2. `npm run gen`, lihat `kunci` scene itu di timing.gen.ts.
     3. Tulis `<kunci>-vo.md` lalu `<kunci>-direction.md` — komposisi belum boleh
        dibangun sebelum keduanya ada isinya.
     4. Buat berkas dengan nama persis `<kunci>.tsx`, export satu komponen.
     5. Daftarkan di SCENES di bawah — kuncinya **id**, bukan `kunci`.
     6. `npm run sisa` untuk memastikan nomornya benar.

   Menyisipkan scene di TENGAH (atau memecah satu scene jadi dua) menggeser nomor
   semua scene sesudahnya — tiga berkas per scene ikut diganti nama, dan itu
   diselesaikan di langkah yang sama, bukan nanti. HARD RULE 5 di CLAUDE.md.

   Yang otomatis didapat begitu terdaftar:
     - masuk episode pada timing dari naskah (../Episode.tsx)
     - jadi komposisi sendiri di Studio, bisa di-preview satuan (src/Root.tsx)

   ID yang ada di naskah tapi belum di sini tampil sebagai <BelumDibuat> —
   kuning bergaris, lengkap dengan baris VO-nya.
*/
import type React from "react";

import { HookQuestion } from "./01-hook-question";
import { BolakBalik } from "./03-bolak-balik";
import { RamAnalogy } from "./04-ram-analogy";
import { KenapaCepat } from "./05-kenapa-cepat";
import { RamSize } from "./06-ram-size";
import { RamBentuk } from "./07-ram-bentuk";
import { RamGenerasi } from "./08-ram-generasi";
import { BedaPenyimpanan } from "./09-beda-penyimpanan";
import { RamTugas } from "./10-ram-tugas";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "hook-question": HookQuestion,
  "bolak-balik": BolakBalik,
  "ram-analogy": RamAnalogy,
  "kenapa-cepat": KenapaCepat,
  "ram-size": RamSize,
  "ram-bentuk": RamBentuk,
  "ram-generasi": RamGenerasi,
  "beda-penyimpanan": BedaPenyimpanan,
  "ram-tugas": RamTugas,
};
