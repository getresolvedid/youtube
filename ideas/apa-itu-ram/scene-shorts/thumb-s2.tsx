/* Kover T01-S2 "Jebakan" — "MEJA LEBAR, TANGAN SAMA".

   Judul Short-nya "Nambah RAM belum tentu bikin cepat". Kover ini nol kata yang
   sama (docs/06) — dan itu bukan kebetulan: judul memakai bahasa bendanya (RAM,
   cepat), kover memakai bahasa gambarannya (meja, tangan). Yang membaca judul
   dan yang melihat kover mendapat dua pegangan berbeda pada gagasan yang sama.

   Figurnya inti Short-nya, dipadatkan: dua meja, yang bawah dua kali lebih
   lebar, DENGAN JUMLAH BERKAS YANG SAMA. Sisi kanan meja lebar sengaja
   dibiarkan kosong melompong — kekosongan itulah argumennya, dan ia tidak butuh
   satu kata pun untuk terbaca.

   Kata keduanya "SAMA SAJA", bukan "TANGAN SAMA": yang kedua 11 huruf pada
   kartu yang cuma muat 10, dan ia MELIPAT jadi kartu tiga baris tanpa ada yang
   gagal. Sekarang shared/Thumbnail.tsx menolaknya. "Sama saja" juga kalimat
   yang memang diucapkan orang untuk hal ini — dan tetap nol kata yang sama
   dengan judulnya.

   Di scene-shorts/, di luar folder scene-nya — alasan yang sama dengan
   thumb-s1.tsx di sebelahnya.
*/
import type React from "react";

import { Ic } from "../../../shared/Icons";
import { KartuThumbnail } from "../../../shared/Thumbnail";

const X = 930;
const SEMPIT = 700;
const LEBAR = 1400;
const BERKAS = 170;

/** Empat berkas, jarak yang sama di kedua meja. Yang berubah cuma mejanya —
 *  kalau berkasnya ikut merenggang, kover ini berhenti berargumen dan cuma
 *  memperlihatkan dua meja yang beda ukuran. */
const JARAK = 196;
const OFFSET = [-1.5, -0.5, 0.5, 1.5];

const Berkas: React.FC<{ y: number; kiri: number }> = ({ y, kiri }) => (
  <>
    {OFFSET.map((o) => (
      <Ic
        key={o}
        n="file"
        warna="c-accent"
        style={{
          position: "absolute",
          left: kiri + o * JARAK - BERKAS / 2,
          top: y,
          width: BERKAS,
          height: BERKAS,
        }}
      />
    ))}
  </>
);

export const ThumbS2: React.FC = () => (
  <KartuThumbnail rasio="9x16" baris={["Meja Lebar,", "Sama Saja"]}>
    {/* meja sempit — penuh */}
    <Berkas y={120} kiri={X} />
    <div
      className="meja"
      style={{ position: "absolute", left: X - SEMPIT / 2, top: 310, width: SEMPIT }}
    />

    {/* meja dua kali lebih lebar — berkas yang SAMA, berkumpul di kiri, dan
        separuh kanannya kosong. */}
    <Berkas y={1290} kiri={X - LEBAR / 2 + 400} />
    <div
      className="meja"
      style={{ position: "absolute", left: X - LEBAR / 2, top: 1480, width: LEBAR }}
    />
  </KartuThumbnail>
);
