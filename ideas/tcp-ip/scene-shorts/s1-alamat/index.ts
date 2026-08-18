/* Daftar scene Short 1 "alamat" — HARD RULE 1 berlaku utuh di sini.

   PENOMORAN MULAI DARI 1 LAGI di tiap subfolder, dan HARD RULE 5 berhenti di
   batas subfolder: empat Short adalah empat urutan tayang yang berdiri sendiri,
   bukan satu daftar panjang (docs/02 § Di mana berkasnya).

   Nomornya SATU DIGIT karena Short ini cuma punya enam entri (5 scene +
   closing). Begitu ia menyeberang sepuluh, SEMUA berkas berganti jadi `01-`
   dan seterusnya — `npm run sisa` yang menyebutkan nama barunya.

     1-paket.tsx           hook — satu kotak, satu pertanyaan
     2-alamat.tsx          label ditempel; latar berubah jadi jaringan
     3-jadi-alamat-ip.tsx  kotak jadi potongan, label jadi angka
     4-cari-jalur.tsx      payoff — satu dari tiga jalur menyala
     5-sampai.tsx          tutup + loop kembali ke pertanyaan scene 1
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   ID KOMPOSISI BERPREFIKS DUA LAPIS: `t18-s1-4-cari-jalur`. Lapis `s1`
   memisahkan Short dari video panjang — tanpa itu `1-paket` berebut ruang nama
   dengan scene video panjang. Lapis `t18` memisahkan episode dari episode:
   `99-closing` ada di SETIAP Short setiap topik, dan Remotion menolak dua
   komposisi dengan id yang sama — saat RENDER, bukan saat `tsc`.

   DUA BERKAS BANTU, keduanya DI LUAR folder ini (`npm run sisa` memeriksa tiap
   `.tsx` di sini terhadap daftar kunci dari naskah):

     ../panggung-short.tsx        koordinat 9:16, jaringan tegak, teks layar
     ../../panggung-jaringan.tsx  komponen bersama dengan video panjang —
                                  potongan bernomor, kotak fisik, label, centang
*/
import type React from "react";

import { Paket } from "./1-paket";
import { Alamat } from "./2-alamat";
import { JadiAlamatIp } from "./3-jadi-alamat-ip";
import { CariJalur } from "./4-cari-jalur";
import { Sampai } from "./5-sampai";

export const SCENES: Readonly<Record<string, React.FC>> = {
  paket: Paket,
  alamat: Alamat,
  "jadi-alamat-ip": JadiAlamatIp,
  "cari-jalur": CariJalur,
  sampai: Sampai,
};
