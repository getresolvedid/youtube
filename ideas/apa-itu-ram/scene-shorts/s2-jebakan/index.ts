/* Daftar scene Short 2 "Jebakan" — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx`, dan bentuk yang sama dipakai sebagai ID
   komposisi Remotion DENGAN PREFIKS `s2-`:

     ideas/apa-itu-ram/scene-shorts/s2-jebakan/01-mitos.tsx
     npx remotion still s2-01-mitos out/s2-mitos.png
     Studio -> short 2 · jebakan/s2-01-mitos

     urutan  posisi scene di Short ini, MULAI DARI 01 LAGI — penomoran s1-nugget
             dan s2-jebakan tidak pernah menyeberang (CLAUDE.md HARD RULE 1 & 5).
             Closing DIPATOK di 99.
     id      kolom pertama tabel scene di naskah.md § Short 2, dan kunci di SCENES.

     01-mitos.tsx         mitos — dibaca apa adanya, belum dibantah
     02-salah.tsx         bantahan + janji bukti
     03-meja.tsx          UNDANGAN + panggung berdiri
     04-muat.tsx          bukti 1 · memasang IRAMA tangan
     05-lebih-lebar.tsx   bukti 2 · irama yang sama di meja 2x lebih lebar
     06-penuh.tsx         bukti 3 · keadaan tempat mitosnya benar
     07-bolak-balik.tsx   bukti 4 · iramanya PATAH
     08-indikator.tsx     konsekuensi · yang harus dilihat
     09-beli.tsx          keputusan + CTA
     (99-closing = tanda brand 9:16, shared/StandarScenes.tsx)

   KOSAKATA VISUAL BERSAMA ada SATU TINGKAT DI ATAS folder ini:

     ../meja-kerja.tsx    koordinat panggung, meja, berkas, tangan, gudang,
                          kalimat mitos, dan IRAMA tangan
     ../teks-atas.tsx     teks besar sepertiga atas, dipakai kedua Short

   Letaknya di luar folder ini disengaja — `npm run sisa` memeriksa setiap .tsx
   di sini terhadap daftar kunci dari naskah, jadi berkas bantu yang tinggal di
   sini akan dilaporkan sebagai nama yang tidak dikenal.

   SATU TITIK SERAH ANTAR-SCENE: `T_TURUN` diekspor 07-bolak-balik.tsx dan
   dibaca 08-indikator.tsx serta 09-beli.tsx, supaya hitungan bolak-balik di
   ketiganya benar-benar satu hitungan yang sama — bukan tiga angka yang
   kebetulan mirip.

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     01-mitos-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     01-mitos-direction.md  apa di layar        (HARD RULE 3)
*/
import type React from "react";

import { MitosScene } from "./01-mitos";
import { Salah } from "./02-salah";
import { MejaScene } from "./03-meja";
import { Muat } from "./04-muat";
import { LebihLebar } from "./05-lebih-lebar";
import { Penuh } from "./06-penuh";
import { BolakBalik } from "./07-bolak-balik";
import { Indikator } from "./08-indikator";
import { Beli } from "./09-beli";

export const SCENES: Readonly<Record<string, React.FC>> = {
  mitos: MitosScene,
  salah: Salah,
  meja: MejaScene,
  muat: Muat,
  "lebih-lebar": LebihLebar,
  penuh: Penuh,
  "bolak-balik": BolakBalik,
  indikator: Indikator,
  beli: Beli,
};
