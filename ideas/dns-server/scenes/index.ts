/* Daftar scene episode T14 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx` — dan bentuk yang sama persis dipakai
   sebagai ID komposisi Remotion. Berkas, perintah CLI, dan baris di sidebar
   Studio menyebut hal yang identik:

     ideas/dns-server/scenes/05-loket.tsx
     npx remotion still 05-loket out/loket.png
     Studio -> scene-t14/05-loket

     urutan  posisi scene di episode, 1-based, sesuai TIMING di timing.gen.ts.
             Di-pad selebar jumlah scene (13 scene -> 2 digit). LEBARNYA IKUT
             BERUBAH saat jumlah scene menyeberang kelipatan 10 — `npm run sisa`
             yang memberitahu, dan ia menyebut nama barunya satu per satu.
             Opening IKUT terhitung walaupun berkasnya bukan scene (milik
             shared/), jadi nomornya berlubang di 2. Closing tidak ikut mengurut
             sama sekali: ia DIPATOK di 99 (tools/baca-episode.mjs).
     id      kolom pertama tabel scene di naskah.md, dan kunci di SCENES.

     01-hook-alamat.tsx       ← urutan 1
     02-opening.tsx           ← urutan 2, TAPI bukan scene: scene-nya milik
                                shared/StandarScenes.tsx. Berkas itu cuma berisi
                                figur loket yang dikirim Episode.tsx lewat prop
                                `figur` di <KartuJudul> (docs/10 § Figur
                                episode). Karena itu ia TIDAK ada di SCENES.
     03-nomor-bukan-nama.tsx  ← urutan 3
     04-daftar-yang-basi.tsx  ← urutan 4
     05-loket.tsx             ← urutan 5   [what] dinamai di sini
     06-tangga.tsx            ← urutan 6
     07-dicatat.tsx           ← urutan 7
     08-umur-catatan.tsx      ← urutan 8
     09-jenis-catatan.tsx     ← urutan 9
     10-polos.tsx             ← urutan 10
     11-amplop-vs-segel.tsx   ← urutan 11
     12-ganti-loket.tsx       ← urutan 12
     (99-closing = penutup, shared/StandarScenes.tsx)

   SATU berkas koordinat dipakai bersama SEMBILAN scene, dan ia sengaja di luar
   folder ini — `npm run sisa` memeriksa setiap `.tsx` di sini terhadap daftar
   kunci dari naskah, jadi berkas bantu akan dilaporkan sebagai nama yang tidak
   dikenal:

     ../panggung-loket.tsx   loket, tangganya (`posLoket`), kartu, catatan,
                             sosok, papan, komputer, bangunan, dan nama situs.
                             ARAH TANGGANYA MENGIKAT: bawah = kamu, atas =
                             pemilik situs. Scene 6, 7, 8, 9 dan 12 bertumpu
                             pada arah itu sekaligus.

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     05-loket-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     05-loket-direction.md  apa di layar        (HARD RULE 3)

   Cara menambah scene:
     1. Tambah barisnya di tabel `### Scene` di naskah.md, di posisi tayangnya.
     2. `npm run gen`, lihat `kunci` scene itu di timing.gen.ts.
     3. Tulis `<kunci>-vo.md` lalu `<kunci>-direction.md` — komposisi belum boleh
        dibangun sebelum keduanya ada isinya.
     4. Buat berkas dengan nama persis `<kunci>.tsx`, export satu komponen.
     5. Daftarkan di SCENES di bawah — kuncinya **id**, bukan `kunci`.
     6. `npm run sisa` untuk memastikan nomornya benar.

   Menyisipkan scene di TENGAH menggeser nomor semua scene sesudahnya — tiga
   berkas per scene ikut diganti nama, dan itu diselesaikan di langkah yang
   sama, bukan nanti. HARD RULE 5 di CLAUDE.md.
*/
import type React from "react";

import { HookAlamat } from "./01-hook-alamat";
import { NomorBukanNama } from "./03-nomor-bukan-nama";
import { DaftarYangBasi } from "./04-daftar-yang-basi";
import { LoketScene } from "./05-loket";
import { Tangga } from "./06-tangga";
import { Dicatat } from "./07-dicatat";
import { UmurCatatan } from "./08-umur-catatan";
import { JenisCatatan } from "./09-jenis-catatan";
import { Polos } from "./10-polos";
import { AmplopVsSegel } from "./11-amplop-vs-segel";
import { GantiLoket } from "./12-ganti-loket";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "hook-alamat": HookAlamat,
  "nomor-bukan-nama": NomorBukanNama,
  "daftar-yang-basi": DaftarYangBasi,
  loket: LoketScene,
  tangga: Tangga,
  dicatat: Dicatat,
  "umur-catatan": UmurCatatan,
  "jenis-catatan": JenisCatatan,
  polos: Polos,
  "amplop-vs-segel": AmplopVsSegel,
  "ganti-loket": GantiLoket,
};
