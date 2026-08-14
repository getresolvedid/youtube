/* Daftar scene Short 2 "Jebakan" T14 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx`, dan bentuk yang sama dipakai sebagai ID
   komposisi Remotion DENGAN PREFIKS `t14-s2-` — dua lapis sejak episode kedua,
   alasannya di `../s1-nugget/index.ts` dan `src/Root.tsx`:

     ideas/dns-server/scene-shorts/s2-jebakan/01-mitos.tsx
     npx remotion still t14-s2-01-mitos out/s2-mitos.png
     Studio -> t14-short-2-jebakan/t14-s2-01-mitos

     urutan  posisi scene di Short ini, 1-based, MULAI DARI 01 LAGI. HARD RULE 5
             berlaku di dalam folder ini dan tidak pernah menyeberang ke
             s1-nugget/. Closing DIPATOK di 99 dan tidak ikut mengurut.
     id      kolom pertama tabel scene di naskah.md § Short 2, dan kunci di SCENES.

     01-mitos.tsx           mitos — dibaca apa adanya, tanpa dibantah
     02-salah.tsx           bantahan + janji
     03-tanya-dulu.tsx      UNDANGAN + panggung berdiri
     04-sekali-di-awal.tsx  bukti 1 · bilah waktu satu halaman
     05-sisanya-sama.tsx    bukti 2 · loketnya diganti, sisanya tidak
     06-dijawab-salah.tsx   bukti 3 · yang benar-benar berubah
     07-terbuka.tsx         konsekuensi · terbuka, bukan kencang
     08-tetap-melihat.tsx   konsekuensi · yang tidak berubah
     09-pilih.tsx           konsekuensi + CTA (CTA cuma teks, tidak diucapkan)
     (99-closing = tanda brand 9:16, shared/StandarScenes.tsx)

   KOSAKATA VISUAL BERSAMA ada SATU TINGKAT DI ATAS folder ini:

     ../jalur-tanya.tsx   koordinat 9:16, bilah waktu, coretan, tanda, mitos
     ../teks-atas.tsx     teks di layar, dipakai kedua Short

   dan BENTUK LOKETNYA dua tingkat di atas, dipakai bersama video panjang:

     ../../panggung-loket.tsx   Loket, Kartu, Sosok, Papan, Bangunan, nomor

   Letak keduanya di luar folder ini disengaja — `npm run sisa` memeriksa setiap
   .tsx di sini terhadap daftar kunci dari naskah, jadi berkas bantu yang tinggal
   di sini akan dilaporkan sebagai nama yang tidak dikenal.

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     01-mitos-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     01-mitos-direction.md  apa di layar        (HARD RULE 3)
*/
import type React from "react";

import { MitosScene } from "./01-mitos";
import { Salah } from "./02-salah";
import { TanyaDulu } from "./03-tanya-dulu";
import { SekaliDiAwal } from "./04-sekali-di-awal";
import { SisanyaSama } from "./05-sisanya-sama";
import { DijawabSalah } from "./06-dijawab-salah";
import { Terbuka } from "./07-terbuka";
import { TetapMelihat } from "./08-tetap-melihat";
import { Pilih } from "./09-pilih";

export const SCENES: Readonly<Record<string, React.FC>> = {
  mitos: MitosScene,
  salah: Salah,
  "tanya-dulu": TanyaDulu,
  "sekali-di-awal": SekaliDiAwal,
  "sisanya-sama": SisanyaSama,
  "dijawab-salah": DijawabSalah,
  terbuka: Terbuka,
  "tetap-melihat": TetapMelihat,
  pilih: Pilih,
};
