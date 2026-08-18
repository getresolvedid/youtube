/* Daftar scene episode "enkripsi" — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx` — dan bentuk yang sama persis dipakai sebagai
   ID komposisi Remotion (berprefiks `t17-` di src/Root.tsx):

     ideas/enkripsi/scenes/06-enkripsi.tsx
     npx remotion still t17-06-enkripsi out/enkripsi.png
     Studio -> scene-t17/t17-06-enkripsi

     01-pesan-dikirim.tsx      ← urutan 1   hook, bagian 1
     02-opening                ← urutan 2   kartu judul, milik shared/ — TIDAK di SCENES
     03-mengirim-pesan.tsx     ← urutan 3
     04-lewat-internet.tsx     ← urutan 4
     05-bisa-dilihat.tsx       ← urutan 5
     06-enkripsi.tsx           ← urutan 6   [what] DINAMAI di sini
     07-terkunci-di-jalan.tsx  ← urutan 7
     08-dekripsi.tsx           ← urutan 8
     09-ringkasan.tsx          ← urutan 9
     10-definisi.tsx           ← urutan 10
     (99-closing = penutup, shared/StandarScenes.tsx)

   NOMORNYA BARU SAJA BERUBAH DARI SATU DIGIT KE DUA. Lebar nomor mengikuti
   JUMLAH entri (tools/baca-episode.mjs), dan episode ini menyeberangi sepuluh
   saat arahan animasi scene 3–10 masuk: `1-pesan-dikirim` jadi
   `01-pesan-dikirim`, ketiga berkasnya sekaligus. HARD RULE 5, dan `npm run
   sisa` yang menyebutkan nama barunya satu per satu.

   BELUM ADA BERKAS 02-opening.tsx, dan itu disengaja: berkas itu tempatnya
   figur kartu judul, dan figur kartu judul wajib komponen yang sama persis
   dengan scene-nya (docs/06). Kandidatnya sekarang ada — gembok di scene 6 —
   tapi menaruhnya di kartu judul membocorkan jawaban di bagian 2. Alasan
   lengkapnya: `02-opening-direction.md`.

   SATU BERKAS KOSAKATA VISUAL dipakai bersama SEMBILAN scene, dan ia sengaja di
   luar folder ini — `npm run sisa` memeriksa setiap `.tsx` di sini terhadap
   daftar kunci dari naskah, jadi berkas bantu yang tinggal di sini akan
   dilaporkan sebagai nama yang tidak dikenal:

     ../panggung-kiriman.tsx   kalimat contoh, jalur & simpul, HP kedua ujung,
                               yang mengamati + layarnya, paket, kotak proses,
                               kunci, dan gembok.
                               ARAHNYA MENGIKAT: kiri = pengirim, kanan = penerima.
                               Scene 4, 5, 7 memakai koordinat yang SAMA PERSIS —
                               itu yang membuat perbandingan bagian 5 bekerja.

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     06-enkripsi-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     06-enkripsi-direction.md  apa di layar        (HARD RULE 3)

   Cara menambah scene:
     1. Tambah barisnya di tabel `### Scene` di naskah.md, di posisi tayangnya.
     2. `npm run gen`, lihat `kunci` scene itu di timing.gen.ts.
     3. Tulis `<kunci>-vo.md` lalu `<kunci>-direction.md` — komposisi belum boleh
        dibangun sebelum keduanya ada isinya.
     4. Buat berkas dengan nama persis `<kunci>.tsx`, export satu komponen.
     5. Daftarkan di SCENES di bawah — kuncinya **id**, bukan `kunci`.
     6. `npm run sisa:t17` untuk memastikan nomornya benar.
*/
import type React from "react";

import { PesanDikirim } from "./01-pesan-dikirim";
import { MengirimPesan } from "./03-mengirim-pesan";
import { LewatInternet } from "./04-lewat-internet";
import { BisaDilihat } from "./05-bisa-dilihat";
import { Enkripsi } from "./06-enkripsi";
import { TerkunciDiJalan } from "./07-terkunci-di-jalan";
import { Dekripsi } from "./08-dekripsi";
import { Ringkasan } from "./09-ringkasan";
import { Definisi } from "./10-definisi";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "pesan-dikirim": PesanDikirim,
  "mengirim-pesan": MengirimPesan,
  "lewat-internet": LewatInternet,
  "bisa-dilihat": BisaDilihat,
  enkripsi: Enkripsi,
  "terkunci-di-jalan": TerkunciDiJalan,
  dekripsi: Dekripsi,
  ringkasan: Ringkasan,
  definisi: Definisi,
};
