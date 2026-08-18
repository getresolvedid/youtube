/* Daftar scene episode T18 — HARD RULE 1: satu scene = satu berkas.

   NAMA BERKAS: `<urutan>-<id>.tsx` — dan bentuk yang sama persis dipakai sebagai
   ID komposisi Remotion (berprefiks `t18-` di src/Root.tsx):

     ideas/tcp-ip/scenes/07-peran-tcp.tsx
     npx remotion still t18-07-peran-tcp out/peran-tcp.png
     Studio -> scene-t18/t18-07-peran-tcp

     01-hook.tsx             ← urutan 1
     02-opening.tsx          ← urutan 2, TAPI bukan scene: kartunya milik
                               shared/StandarScenes.tsx. Berkas itu cuma berisi
                               FIGUR episode ini, yang dikirim Episode.tsx lewat
                               prop `figur` di <KartuJudul>. Karena itu ia TIDAK
                               ada di SCENES.
     03-apa-itu.tsx          ← urutan 3
     04-analogi-paket.tsx    ← urutan 4
     05-ip-address.tsx       ← urutan 5
     06-jadi-paket.tsx       ← urutan 6    inti 1: potongan bernomor
     07-peran-tcp.tsx        ← urutan 7    inti 2: satu hilang, diminta ulang
     08-analogi-tcp.tsx      ← urutan 8
     09-tcp-plus-ip.tsx      ← urutan 9
     10-bukan-hanya.tsx      ← urutan 10
     11-buka-website.tsx     ← urutan 11
     12-kesimpulan.tsx       ← urutan 12
     13-penutup.tsx          ← urutan 13
     (99-closing = penutup brand, shared/StandarScenes.tsx)

   SATU berkas koordinat dipakai bersama SEMUA scene, dan ia sengaja di luar
   folder ini — `npm run sisa` memeriksa setiap `.tsx` di sini terhadap daftar
   kunci dari naskah, jadi berkas bantu yang tinggal di sini akan dilaporkan
   sebagai nama yang tidak dikenal:

     ../panggung-jaringan.tsx  jalur, simpul, potongan, perangkat, kotak fisik,
                               rumah, buku, peramban, dan jaring latar.
                               ARAHNYA MENGIKAT: kiri = pengirim, kanan =
                               penerima. Cuma scene 7 dan 11 yang boleh
                               menggerakkan sesuatu ke kiri, dan justru karena
                               sebelas scene lain konsisten, gerakan itu
                               langsung terbaca sebagai "sesuatu yang kembali".

   Di samping tiap scene ada DUA berkas bernama sama, dan keduanya ditulis lebih
   dulu — `.tsx` adalah turunannya:

     07-peran-tcp-vo.md         teks VO scene itu   (HARD RULE 4, docs/11)
     07-peran-tcp-direction.md  apa di layar        (HARD RULE 3)

   Menyisipkan scene di TENGAH menggeser nomor semua scene sesudahnya — tiga
   berkas per scene ikut diganti nama, diselesaikan di langkah yang sama, bukan
   nanti. HARD RULE 5 di CLAUDE.md.
*/
import type React from "react";

import { Hook } from "./01-hook";
import { ApaItu } from "./03-apa-itu";
import { AnalogiPaket } from "./04-analogi-paket";
import { IpAddress } from "./05-ip-address";
import { JadiPaket } from "./06-jadi-paket";
import { PeranTcp } from "./07-peran-tcp";
import { AnalogiTcp } from "./08-analogi-tcp";
import { TcpPlusIp } from "./09-tcp-plus-ip";
import { BukanHanya } from "./10-bukan-hanya";
import { BukaWebsite } from "./11-buka-website";
import { Kesimpulan } from "./12-kesimpulan";
import { Penutup } from "./13-penutup";

export const SCENES: Readonly<Record<string, React.FC>> = {
  hook: Hook,
  "apa-itu": ApaItu,
  "analogi-paket": AnalogiPaket,
  "ip-address": IpAddress,
  "jadi-paket": JadiPaket,
  "peran-tcp": PeranTcp,
  "analogi-tcp": AnalogiTcp,
  "tcp-plus-ip": TcpPlusIp,
  "bukan-hanya": BukanHanya,
  "buka-website": BukaWebsite,
  kesimpulan: Kesimpulan,
  penutup: Penutup,
};
