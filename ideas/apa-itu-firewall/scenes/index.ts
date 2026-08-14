/* Daftar scene episode T15 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx` — dan bentuk yang sama persis dipakai sebagai
   ID komposisi Remotion (berprefiks `t15-` di src/Root.tsx). Berkas, perintah
   CLI, dan baris di sidebar Studio menyebut hal yang identik:

     ideas/apa-itu-firewall/scenes/06-penjaga.tsx
     npx remotion still t15-06-penjaga out/penjaga.png
     Studio -> scene-t15/t15-06-penjaga

     urutan  posisi scene di episode, 1-based, sesuai TIMING di timing.gen.ts.
             Di-pad selebar jumlah scene (16 scene -> 2 digit). LEBARNYA IKUT
             BERUBAH saat jumlah scene menyeberang kelipatan 10 — `npm run sisa`
             yang memberitahu, dan ia menyebut nama barunya satu per satu.
             Opening IKUT terhitung walaupun berkasnya bukan scene (milik
             shared/), jadi nomornya berlubang di 2. Closing tidak ikut mengurut
             sama sekali: ia DIPATOK di 99 (tools/baca-episode.mjs).
     id      kolom pertama tabel scene di naskah.md, dan kunci di SCENES.

     01-hook-mengetuk.tsx          ← urutan 1
     02-opening.tsx                ← urutan 2, TAPI bukan scene: scene-nya milik
                                     shared/StandarScenes.tsx. Berkas itu cuma
                                     berisi figur penjaga yang dikirim
                                     Episode.tsx lewat prop `figur` di
                                     <KartuJudul> (docs/10 § Figur episode).
                                     Karena itu ia TIDAK ada di SCENES.
     03-pintu-bernomor.tsx         ← urutan 3
     04-siapa-pun-mengetuk.tsx     ← urutan 4
     05-dikunci-semua.tsx          ← urutan 5
     06-penjaga.tsx                ← urutan 6   [what] dinamai di sini
     07-buku-catatan.tsx           ← urutan 7
     08-baris-terakhir.tsx         ← urutan 8
     09-dari-atas.tsx              ← urutan 9
     10-diam.tsx                   ← urutan 10
     11-keluar-juga.tsx            ← urutan 11
     12-label-bukan-isi.tsx        ← urutan 12
     13-banyak-penjaga.tsx         ← urutan 13
     14-pintu-dibuka-sendiri.tsx   ← urutan 14
     15-diundang-masuk.tsx         ← urutan 15
     (99-closing = penutup, shared/StandarScenes.tsx)

   SATU berkas koordinat dipakai bersama DUA BELAS scene, dan ia sengaja di luar
   folder ini — `npm run sisa` memeriksa setiap `.tsx` di sini terhadap daftar
   kunci dari naskah, jadi berkas bantu yang tinggal di sini akan dilaporkan
   sebagai nama yang tidak dikenal:

     ../panggung-gedung.tsx  gedung, pintunya (`posPintu`), penjaga, ketukan,
                             daftar, buku, kotak, peta, dan layar laptop.
                             ARAHNYA MENGIKAT: kiri = luar, kanan = dalam.
                             Scene 1, 4, 5, 7, 11, 14 dan 15 bertumpu pada arah
                             itu sekaligus, dan cuma scene 11 yang boleh
                             memutar penjaganya.

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     06-penjaga-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     06-penjaga-direction.md  apa di layar        (HARD RULE 3)

   Cara menambah scene:
     1. Tambah barisnya di tabel `### Scene` di naskah.md, di posisi tayangnya.
     2. `npm run gen`, lihat `kunci` scene itu di timing.gen.ts.
     3. Tulis `<kunci>-vo.md` lalu `<kunci>-direction.md` — komposisi belum boleh
        dibangun sebelum keduanya ada isinya.
     4. Buat berkas dengan nama persis `<kunci>.tsx`, export satu komponen.
     5. Daftarkan di SCENES di bawah — kuncinya **id**, bukan `kunci`.
     6. `npm run sisa` untuk memastikan nomornya benar.

   Menyisipkan scene di TENGAH menggeser nomor semua scene sesudahnya — tiga
   berkas per scene ikut diganti nama, dan itu diselesaikan di langkah yang sama,
   bukan nanti. HARD RULE 5 di CLAUDE.md.
*/
import type React from "react";

import { HookMengetuk } from "./01-hook-mengetuk";
import { PintuBernomor } from "./03-pintu-bernomor";
import { SiapaPunMengetuk } from "./04-siapa-pun-mengetuk";
import { DikunciSemua } from "./05-dikunci-semua";
import { Penjaga } from "./06-penjaga";
import { BukuCatatan } from "./07-buku-catatan";
import { BarisTerakhir } from "./08-baris-terakhir";
import { DariAtas } from "./09-dari-atas";
import { Diam } from "./10-diam";
import { KeluarJuga } from "./11-keluar-juga";
import { LabelBukanIsi } from "./12-label-bukan-isi";
import { BanyakPenjaga } from "./13-banyak-penjaga";
import { PintuDibukaSendiri } from "./14-pintu-dibuka-sendiri";
import { DiundangMasuk } from "./15-diundang-masuk";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "hook-mengetuk": HookMengetuk,
  "pintu-bernomor": PintuBernomor,
  "siapa-pun-mengetuk": SiapaPunMengetuk,
  "dikunci-semua": DikunciSemua,
  penjaga: Penjaga,
  "buku-catatan": BukuCatatan,
  "baris-terakhir": BarisTerakhir,
  "dari-atas": DariAtas,
  diam: Diam,
  "keluar-juga": KeluarJuga,
  "label-bukan-isi": LabelBukanIsi,
  "banyak-penjaga": BanyakPenjaga,
  "pintu-dibuka-sendiri": PintuDibukaSendiri,
  "diundang-masuk": DiundangMasuk,
};
