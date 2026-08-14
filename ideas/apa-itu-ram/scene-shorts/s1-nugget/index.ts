/* Daftar scene Short 1 "Nugget" — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx`, dan bentuk yang sama dipakai sebagai ID
   komposisi Remotion DENGAN PREFIKS `s1-`:

     ideas/apa-itu-ram/scene-shorts/s1-nugget/01-menunggu.tsx
     npx remotion still s1-01-menunggu out/s1-hook.png
     Studio -> short 1 · nugget/s1-01-menunggu

   Prefiksnya bukan hiasan: tanpa itu `01-menunggu` dan `01-hook-question` milik
   video panjang berebut ruang nama yang sama di sidebar Studio yang sama
   (src/Root.tsx · CLAUDE.md HARD RULE 1).

     urutan  posisi scene di Short ini, 1-based, MULAI DARI 01 LAGI — dua Short
             adalah dua urutan tayang yang berdiri sendiri, bukan satu daftar
             panjang. HARD RULE 5 berlaku di dalam folder ini dan tidak pernah
             menyeberang ke s2-jebakan/.
             Closing DIPATOK di 99 dan tidak ikut mengurut.
     id      kolom pertama tabel scene di naskah.md § Short 1, dan kunci di SCENES.

     01-menunggu.tsx      hook — klaim, tanpa undangan (lihat -vo.md)
     02-sekejap.tsx       hook lanjutan
     03-satu-detik.tsx    UNDANGAN + panggung berdiri
     04-meja-nempel.tsx   payoff 1 · 1 detik
     05-meja-kerja.tsx    payoff 2 · 1 menit
     06-gudang.tsx        payoff 3 · 3 bulan
     07-namanya.tsx       nama menyusul: cache · ram · hardisk
     08-sekali-jalan.tsx  tutup — kenapa disalin
     09-loop.tsx          tutup + loop ke frame pertama
     (99-closing = tanda brand 9:16, shared/StandarScenes.tsx)

   KOSAKATA VISUAL BERSAMA ada SATU TINGKAT DI ATAS folder ini:

     ../tiga-tempat.tsx   koordinat panggung, chip, ketiga tempat, jam,
                          kalender, kolom angka, hitungan diam

   Letaknya di luar folder ini disengaja — `npm run sisa` memeriksa setiap .tsx
   di sini terhadap daftar kunci dari naskah, jadi berkas bantu yang tinggal di
   sini akan dilaporkan sebagai nama yang tidak dikenal.

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     01-menunggu-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     01-menunggu-direction.md  apa di layar        (HARD RULE 3)

   Cara menambah scene: sama persis dengan video panjang, tapi tabelnya yang
   disunting adalah `### Scene` di bawah `## Short 1` di naskah.md.
   Lalu `npm run gen`, lihat `kunci`-nya di timing.gen.ts folder ini,
   tulis dua berkas sumbernya, baru `.tsx`-nya. `npm run sisa` yang memeriksa.
*/
import type React from "react";

import { Menunggu } from "./01-menunggu";
import { Sekejap } from "./02-sekejap";
import { SatuDetik } from "./03-satu-detik";
import { MejaNempel } from "./04-meja-nempel";
import { MejaKerja } from "./05-meja-kerja";
import { Gudang } from "./06-gudang";
import { Namanya } from "./07-namanya";
import { SekaliJalan } from "./08-sekali-jalan";
import { Loop } from "./09-loop";

export const SCENES: Readonly<Record<string, React.FC>> = {
  menunggu: Menunggu,
  sekejap: Sekejap,
  "satu-detik": SatuDetik,
  "meja-nempel": MejaNempel,
  "meja-kerja": MejaKerja,
  gudang: Gudang,
  namanya: Namanya,
  "sekali-jalan": SekaliJalan,
  loop: Loop,
};
