/* Daftar scene episode T16 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx` — dan bentuk yang sama persis dipakai sebagai
   ID komposisi Remotion (berprefiks `t16-` di src/Root.tsx). Berkas, perintah
   CLI, dan baris di sidebar Studio menyebut hal yang identik:

     ideas/apa-itu-enkripsi/scenes/07-gembok-terbuka.tsx
     npx remotion still t16-07-gembok-terbuka out/gembok.png
     Studio -> scene-t16/t16-07-gembok-terbuka

     urutan  posisi scene di episode, 1-based, sesuai TIMING di timing.gen.ts.
             Di-pad selebar jumlah scene (17 scene -> 2 digit). LEBARNYA IKUT
             BERUBAH saat jumlah scene menyeberang kelipatan 10 — `npm run sisa`
             yang memberitahu, dan ia menyebut nama barunya satu per satu.
             Opening IKUT terhitung walaupun berkasnya bukan scene (milik
             shared/), jadi nomornya berlubang di 2. Closing tidak ikut mengurut
             sama sekali: ia DIPATOK di 99 (tools/baca-episode.mjs).
     id      kolom pertama tabel scene di naskah.md, dan kunci di SCENES.

     01-hook-banyak-tangan.tsx        ← urutan 1
     02-opening.tsx                   ← urutan 2, TAPI bukan scene: scene-nya
                                        milik shared/StandarScenes.tsx. Berkas
                                        itu cuma berisi figur kotak yang dikirim
                                        Episode.tsx lewat prop `figur` di
                                        <KartuJudul> (docs/10 § Figur episode).
                                        Karena itu ia TIDAK ada di SCENES.
     03-jalan-umum.tsx                ← urutan 3
     04-kotak-digembok.tsx            ← urutan 4
     05-kuncinya-ikut.tsx             ← urutan 5
     06-belum-pernah-ketemu.tsx       ← urutan 6
     07-gembok-terbuka.tsx            ← urutan 7   [what] dinamai di sini
     08-kunci-tidak-pernah-lewat.tsx  ← urutan 8
     09-rahasia-berdua.tsx            ← urutan 9
     10-gembok-lambat.tsx             ← urutan 10
     11-gembok-siapa.tsx              ← urutan 11
     12-kotak-bisa-ditukar.tsx        ← urutan 12
     13-kunci-yang-dibuang.tsx        ← urutan 13
     14-label-tetap-terbaca.tsx       ← urutan 14
     15-dibuka-di-ujung.tsx           ← urutan 15
     16-bukan-gemboknya.tsx           ← urutan 16
     (99-closing = penutup, shared/StandarScenes.tsx)

   SATU berkas koordinat dipakai bersama LIMA BELAS scene, dan ia sengaja di luar
   folder ini — `npm run sisa` memeriksa setiap `.tsx` di sini terhadap daftar
   kunci dari naskah, jadi berkas bantu yang tinggal di sini akan dilaporkan
   sebagai nama yang tidak dikenal:

     ../panggung-kiriman.tsx  jalan, dua meja, tangan (`posTangan`), kotak,
                              surat, gembok, kunci, sosok, surat pengenal,
                              bangunan, potongan, dan barang setengah jadi.
                              ARAHNYA MENGIKAT: kiri = kamu, kanan = yang kamu
                              kirimi. Scene 1, 5, 9, 10, 12 dan 15 bertumpu pada
                              arah itu sekaligus, dan cuma scene 10 yang punya
                              arus dua arah.
                              KUNCI PUNYA SATU TITIK (`P_KUNCI_MEJA`) dan tidak
                              pernah pindah sejak scene 7 — diamnya itu isi
                              bagian 5.

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     07-gembok-terbuka-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     07-gembok-terbuka-direction.md  apa di layar        (HARD RULE 3)

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

import { HookBanyakTangan } from "./01-hook-banyak-tangan";
import { JalanUmum } from "./03-jalan-umum";
import { KotakDigembok } from "./04-kotak-digembok";
import { KuncinyaIkut } from "./05-kuncinya-ikut";
import { BelumPernahKetemu } from "./06-belum-pernah-ketemu";
import { GembokTerbuka } from "./07-gembok-terbuka";
import { KunciTidakPernahLewat } from "./08-kunci-tidak-pernah-lewat";
import { RahasiaBerdua } from "./09-rahasia-berdua";
import { GembokLambat } from "./10-gembok-lambat";
import { GembokSiapa } from "./11-gembok-siapa";
import { KotakBisaDitukar } from "./12-kotak-bisa-ditukar";
import { KunciYangDibuang } from "./13-kunci-yang-dibuang";
import { LabelTetapTerbaca } from "./14-label-tetap-terbaca";
import { DibukaDiUjung } from "./15-dibuka-di-ujung";
import { BukanGemboknya } from "./16-bukan-gemboknya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "hook-banyak-tangan": HookBanyakTangan,
  "jalan-umum": JalanUmum,
  "kotak-digembok": KotakDigembok,
  "kuncinya-ikut": KuncinyaIkut,
  "belum-pernah-ketemu": BelumPernahKetemu,
  "gembok-terbuka": GembokTerbuka,
  "kunci-tidak-pernah-lewat": KunciTidakPernahLewat,
  "rahasia-berdua": RahasiaBerdua,
  "gembok-lambat": GembokLambat,
  "gembok-siapa": GembokSiapa,
  "kotak-bisa-ditukar": KotakBisaDitukar,
  "kunci-yang-dibuang": KunciYangDibuang,
  "label-tetap-terbaca": LabelTetapTerbaca,
  "dibuka-di-ujung": DibukaDiUjung,
  "bukan-gemboknya": BukanGemboknya,
};
