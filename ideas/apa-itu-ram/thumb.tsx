/* Thumbnail T01 — "MEJA, BUKAN GUDANG".

   Keputusannya tertulis di render/publish.md § Thumbnail; berkas ini cuma
   menjalankannya. Dua hal yang mengikat dari sana:

   1. **Tidak mengulang satu kata pun dari judul.** Judulnya "Apa itu RAM?
      Kenapa isinya harus disalin dulu" — ia MENJELASKAN. Thumbnail menaruh
      GAMBARANNYA. Kalau keduanya bilang hal yang sama, salah satunya mubazir,
      dan yang mubazir di feed selalu thumbnail-nya.

   2. **Figurnya dari videonya sendiri.** Meja dan lemari di sini memakai kelas
      `.meja` dan `.lemari` yang sama dengan scene `04-ram-analogy`, jadi orang
      yang mengklik thumbnail ini langsung menemukan benda yang sama di dalam
      videonya. Thumbnail yang menjanjikan gambar yang tidak ada di videonya
      menaikkan CTR dan menurunkan retensi — tukar yang buruk.

   KENAPA MEJA TERANG DAN LEMARI REDUP: thumbnail ini sebuah KOREKSI, bukan
   sebuah proses. Yang dibaca penonton dalam seperempat detik adalah "yang ini,
   bukan yang itu" — dan itu dibawa oleh kontras terang-redup, bukan oleh panah.
   Panahnya tetap ada, kecil, cuma untuk menjawab "lalu isinya dari mana".
*/
import type React from "react";

import { Ic } from "../../shared/Icons";
import { KartuThumbnail } from "../../shared/Thumbnail";

/* Koordinat pita figur: 1152 x 300 (1280 dikurangi dua padding 64). */
const PITA = { w: 1152, h: 300 };

const MEJA_W = 420;
const LEMARI = { w: 176, h: 210, n: 4 };

/** Berkas di atas meja. Tiga, dan berjarak lebar — di 210x118 yang tersisa dari
 *  tiga ikon kecil cuma "ada sesuatu di atas meja itu", dan itu memang yang
 *  perlu terbaca. Empat mulai terlihat sebagai tekstur. */
const BERKAS = [-120, 0, 120];

export const Thumb: React.FC = () => (
  <KartuThumbnail baris={["Meja,", "Bukan Gudang"]}>
    {/* --- meja: kiri, terang ------------------------------------------- */}
    <div style={{ position: "absolute", left: 56, top: 96 }}>
      {BERKAS.map((dx) => (
        <Ic
          key={dx}
          n="file"
          warna="c-accent"
          style={{
            position: "absolute",
            left: MEJA_W / 2 + dx - 34,
            top: -78,
            width: 68,
            height: 68,
          }}
        />
      ))}
      <div className="meja" style={{ width: MEJA_W }} />
    </div>

    {/* --- panah salin: gudang -> meja ------------------------------------
        Menunjuk KE KIRI karena isinya memang berjalan dari gudang ke meja.

        SENGAJA PANJANG, dari tepi lemari sampai tepi meja. Versi pertamanya
        pendek dan mengambang di tengah — ia terbaca sebagai tanda, bukan
        sebagai perjalanan, padahal jarak itulah isi videonya. Tipis, supaya
        tetap benda kedua di layar dan bukan yang ketiga: di 210x118 tidak ada
        ruang untuk tiga hal yang sama beratnya. */}
    <svg
      viewBox={`0 0 ${PITA.w} ${PITA.h}`}
      width={PITA.w}
      height={PITA.h}
      style={{ position: "absolute", inset: 0 }}
    >
      <path
        d="M856 150 H520"
        stroke="var(--accent-ink)"
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.8}
      />
      <path
        d="M546 128 L518 150 L546 172"
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </svg>

    {/* --- lemari: kanan, redup ------------------------------------------- */}
    <div
      className="lemari"
      style={{
        position: "absolute",
        right: 96,
        top: 44,
        width: LEMARI.w,
        height: LEMARI.h,
        /* Redup, tapi tidak sampai hilang. Di 0,5 ia lenyap pada 210x118 dan
           kalimatnya patah: "bukan gudang" butuh gudang yang kelihatan untuk
           ditolak. Ini sisi yang kalah, bukan sisi yang tidak ada. */
        opacity: 0.62,
      }}
    >
      {Array.from({ length: LEMARI.n }, (_, i) => (
        <div key={i} className="laci" style={{ background: "var(--bg)" }} />
      ))}
    </div>
  </KartuThumbnail>
);
