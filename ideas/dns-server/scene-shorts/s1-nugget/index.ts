/* Daftar scene Short 1 "Nugget" T14 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx`, dan bentuk yang sama dipakai sebagai ID
   komposisi Remotion DENGAN PREFIKS `t14-s1-`:

     ideas/dns-server/scene-shorts/s1-nugget/01-dari-belakang.tsx
     npx remotion still t14-s1-01-dari-belakang out/s1-hook.png
     Studio -> t14-short-1-nugget/t14-s1-01-dari-belakang

   Prefiksnya bukan hiasan, dan sejak episode kedua ia dua lapis. `s1`
   memisahkan Short dari video panjang — tanpa itu `01-dari-belakang` dan
   `01-hook-alamat` berebut ruang nama yang sama. `t14` memisahkan episode dari
   episode: `09-loop` dan `99-closing` ada di Short 1 KEDUA episode, dan Remotion
   menolak dua komposisi dengan id yang sama — saat render, bukan saat tsc
   (src/Root.tsx · CLAUDE.md HARD RULE 1).

     urutan  posisi scene di Short ini, 1-based, MULAI DARI 01 LAGI — dua Short
             adalah dua urutan tayang yang berdiri sendiri, bukan satu daftar
             panjang. HARD RULE 5 berlaku di dalam folder ini dan tidak pernah
             menyeberang ke s2-jebakan/.
             Closing DIPATOK di 99 dan tidak ikut mengurut.
     id      kolom pertama tabel scene di naskah.md § Short 1, dan kunci di SCENES.

     01-dari-belakang.tsx      hook — klaim, tanpa undangan (lihat -vo.md)
     02-kamu-kiri.tsx          hook lanjutan: dua arah baca, berurutan
     03-dipotong.tsx           UNDANGAN + panggung berdiri
     04-paling-kanan.tsx       payoff 1 · loket pertama, laci kosong
     05-berikutnya.tsx         payoff 2 · menunjuk, bukan menjawab
     06-ujung.tsx              payoff 3 · satu-satunya laci berisi
     07-tidak-ada-yang-tahu.tsx  tutup — apa yang dibeli dengan arah baca itu
     08-namanya.tsx            nama menyusul: D N S
     09-loop.tsx               tutup + loop ke frame pertama
     (99-closing = tanda brand 9:16, shared/StandarScenes.tsx)

   KOSAKATA VISUAL BERSAMA ada SATU TINGKAT DI ATAS folder ini:

     ../tangga-tegak.tsx  koordinat 9:16, nama situs, penanda, bilah alamat,
                          kamera mundur
     ../teks-atas.tsx     teks di layar, dipakai kedua Short

   dan BENTUK LOKETNYA dua tingkat di atas, dipakai bersama video panjang:

     ../../panggung-loket.tsx   Loket, Kartu, Sosok, Komputer, POTONGAN, nomor

   Letak keduanya di luar folder ini disengaja — `npm run sisa` memeriksa setiap
   .tsx di sini terhadap daftar kunci dari naskah, jadi berkas bantu yang tinggal
   di sini akan dilaporkan sebagai nama yang tidak dikenal.

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     01-dari-belakang-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     01-dari-belakang-direction.md  apa di layar        (HARD RULE 3)

   Cara menambah scene: sama persis dengan video panjang, tapi tabelnya yang
   disunting adalah `### Scene` di bawah `## Short 1` di naskah.md.
   Lalu `npm run gen`, lihat `kunci`-nya di timing.gen.ts folder ini,
   tulis dua berkas sumbernya, baru `.tsx`-nya. `npm run sisa` yang memeriksa.
*/
import type React from "react";

import { DariBelakang } from "./01-dari-belakang";
import { KamuKiri } from "./02-kamu-kiri";
import { Dipotong } from "./03-dipotong";
import { PalingKanan } from "./04-paling-kanan";
import { Berikutnya } from "./05-berikutnya";
import { Ujung } from "./06-ujung";
import { TidakAdaYangTahu } from "./07-tidak-ada-yang-tahu";
import { Namanya } from "./08-namanya";
import { Loop } from "./09-loop";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "dari-belakang": DariBelakang,
  "kamu-kiri": KamuKiri,
  dipotong: Dipotong,
  "paling-kanan": PalingKanan,
  berikutnya: Berikutnya,
  ujung: Ujung,
  "tidak-ada-yang-tahu": TidakAdaYangTahu,
  namanya: Namanya,
  loop: Loop,
};
