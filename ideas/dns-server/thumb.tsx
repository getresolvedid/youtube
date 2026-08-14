/* Thumbnail T14 — "LOKET, BUKAN DAFTAR".

   Keputusannya tertulis di render/publish.md § Thumbnail; berkas ini cuma
   menjalankannya. Dua hal yang mengikat dari sana:

   1. **Tidak mengulang satu kata pun dari judul.** Judulnya "Apa itu DNS?
      Kenapa satu nama harus ditanya dulu" — ia MENJELASKAN. Thumbnail menaruh
      GAMBARANNYA, dan sekaligus jalan buntu yang ditutup episode ini. Kalau
      keduanya bilang hal yang sama, salah satunya mubazir, dan yang mubazir di
      feed selalu thumbnail-nya.

   2. **Figurnya dari videonya sendiri.** Loketnya komponen `Loket` yang sama
      dengan `05-loket` dan `06-tangga`, bukan gambar baru yang mirip.

   KENAPA "DAFTAR" DAN BUKAN "BUKU": jalan buntu di `04-daftar-yang-basi`
   digambar sebagai TABEL — nama di kiri, nomor di kanan, barisnya basi lebih
   cepat daripada bisa ditulis. Kartu yang menjanjikan buku akan menjanjikan
   gambar yang tidak ada di videonya, dan itu menaikkan CTR sambil menurunkan
   retensi — tukar yang buruk (docs/06).

   KENAPA LOKET TERANG DAN TABEL REDUP: ini kartu KOREKSI, bukan proses. Yang
   dibaca penonton dalam seperempat detik adalah "yang ini, bukan yang itu", dan
   itu dibawa kontras terang-redup — coretannya cuma menegaskan.
*/
import type React from "react";

import { KartuThumbnail } from "../../shared/Thumbnail";
import { Loket } from "./panggung-loket";

/* Koordinat pita figur: 1152 x 300 (1280 dikurangi dua padding 64). */
const PITA = { w: 1152, h: 300 };

/** Dua loket saja, bukan empat. Di 210x118 anak tangga ketiga dan keempat
 *  menyusut jadi noda; yang perlu terbaca cuma "ada lebih dari satu, dan yang
 *  satu menunjuk yang lain". */
const LOKET_1 = { x: 232, y: 292, skala: 0.5 };
const LOKET_2 = { x: 452, y: 236, skala: 0.44 };

/** Tabel yang ditolak — bentuk yang sama dengan `04-daftar-yang-basi`:
 *  nama di kiri, nomor di kanan. */
const TABEL = { x: 762, y: 54, w: 330, h: 196, baris: 4 };

export const Thumb: React.FC = () => (
  <KartuThumbnail baris={["Loket,", "Bukan Daftar"]}>
    <svg
      viewBox={`0 0 ${PITA.w} ${PITA.h}`}
      width={PITA.w}
      height={PITA.h}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* --- loket: kiri, terang, yang satu menunjuk yang lain --------------- */}
      <Loket {...LOKET_1} nyala={1} laci={1} isi={0} />
      <Loket {...LOKET_2} nyala={1} laci={1} isi={1} aksen />

      {/* Tangan penunjuk dari loket bawah ke loket atas. Tipis, supaya tetap
          benda kedua di layar dan bukan yang ketiga. */}
      <path
        d="M300 196 L392 158"
        stroke="var(--ink-1)"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <circle cx={392} cy={158} r={9} fill="var(--ink-1)" />

      {/* --- tabel: kanan, redup, tercoret ----------------------------------
          Redup tapi tidak sampai hilang: "bukan daftar" butuh daftar yang
          kelihatan untuk ditolak. Ini sisi yang kalah, bukan sisi yang tidak
          ada. */}
      <g opacity={0.5}>
        <rect
          x={TABEL.x}
          y={TABEL.y}
          width={TABEL.w}
          height={TABEL.h}
          rx={10}
          fill="var(--bg-elev)"
          stroke="var(--ink-1)"
          strokeWidth={5}
        />
        {Array.from({ length: TABEL.baris }, (_, i) => {
          const y = TABEL.y + 34 + i * ((TABEL.h - 52) / (TABEL.baris - 1));
          return (
            <g key={i}>
              <path
                d={`M${TABEL.x + 26} ${y}h118`}
                stroke="var(--ink-0)"
                strokeWidth={9}
                strokeLinecap="round"
              />
              <path
                d={`M${TABEL.x + 186} ${y}h118`}
                stroke="var(--ink-2)"
                strokeWidth={9}
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>

      <path
        d={`M${TABEL.x - 18} ${TABEL.y - 14}L${TABEL.x + TABEL.w + 18} ${
          TABEL.y + TABEL.h + 14
        }`}
        stroke="var(--bad)"
        strokeWidth={12}
        strokeLinecap="round"
      />
    </svg>
  </KartuThumbnail>
);
