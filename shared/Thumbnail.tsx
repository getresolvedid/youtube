/* Kartu thumbnail — kerangka bersama SEMUA episode.
   Aturannya: docs/06 § Thumbnail.

   Kenapa di shared/ dan bukan di folder episodenya: syarat thumbnail yang
   paling sulit dipenuhi bukan "bagus", melainkan **sama**. Video channel
   dikenali di feed dari kejauhan lewat posisi teks, palet, dan bobot huruf yang
   tidak berubah antar-episode — dan itu hanya bertahan kalau tata letaknya
   dipakai bersama, bukan disalin lalu digeser sedikit tiap kali.

   Yang milik episode cuma DUA: kata-katanya dan figurnya. Sisanya di sini.

   Kenapa dirender dari Remotion dan bukan digambar di luar: paletnya
   `shared/theme.css` yang sama, hurufnya `@remotion/google-fonts` yang sama,
   dan figurnya komponen yang sama dengan scene di videonya. Thumbnail yang
   digambar terpisah akan pelan-pelan meleset dari videonya — dan yang meleset
   duluan selalu warnanya.

   TIGA ANGKA YANG MENGIKAT (docs/06):
     1. 1280x720, PNG, < 2 MB.
     2. Teks maksimal 4 kata, Manrope 800, tinggi huruf kapital >= 90px.
     3. Terbaca pada 210x118 — ukuran nyatanya di feed ponsel.

   Yang ketiga tidak bisa dibuktikan komponen ini; ia diuji dengan mengecilkan
   PNG-nya dan melihatnya sendiri. Yang pertama dan kedua dijaga di sini.
*/
import type React from "react";
import { AbsoluteFill } from "remotion";

import "./fonts";
import "./theme.css";
import "./figur.css";
import { SpriteIkon } from "./Icons";

/** Tinggi huruf kapital Manrope 800 = 0,72 x ukuran hurufnya. Syarat docs/06
 *  adalah >= 90px, jadi ukuran huruf minimumnya 125px. Dipakai apa adanya —
 *  kalau sebuah judul tidak muat pada ukuran ini, yang dipendekkan KATANYA,
 *  bukan hurufnya. Thumbnail yang tidak terbaca di feed sama saja dengan
 *  thumbnail yang tidak ada. */
const FS_JUDUL = 132;
const CAP_RATIO = 0.72;

/** Marjin aman. TV-safe tidak berlaku di sini, tapi durasi tayang YouTube
 *  menaruh badge durasi di kanan bawah — jadi sudut itu tidak boleh dipakai
 *  untuk apa pun yang harus terbaca. */
const PADDING = 64;

export const KartuThumbnail: React.FC<{
  /** Maksimal dua baris, maksimal empat kata SELURUHNYA (docs/06). Baris
   *  pertama biasanya yang beraksen, baris kedua yang memikul klaimnya. */
  baris: readonly [string, string];
  /** Figur dari videonya sendiri — bukan gambar baru. Menempati pita atas. */
  children: React.ReactNode;
}> = ({ baris, children }) => {
  const kata = baris.join(" ").trim().split(/\s+/).filter(Boolean).length;
  if (kata > 4) {
    /* Dilempar, bukan diperingatkan: render yang lolos dengan lima kata akan
       terunggah, dan yang membaca peringatan di terminal cuma orang yang
       kebetulan menggulir ke atas. */
    throw new Error(
      `Thumbnail ${kata} kata: "${baris.join(" ")}". Batasnya 4 (docs/06 § Thumbnail). ` +
        `Teks thumbnail dibaca dalam waktu kurang dari sedetik di feed — kata ke-5 ` +
        `tidak dibaca siapa pun, ia cuma mengecilkan keempat kata yang lain.`,
    );
  }

  return (
    <AbsoluteFill className="panggung r-16x9">
      <SpriteIkon />

      {/* Pita figur — sepertiga atas lebih sedikit. Figurnya dipusatkan sendiri
          oleh episodenya; yang dijaga di sini cuma tingginya, supaya baseline
          teks jatuh di tempat yang sama di semua episode. */}
      <div
        style={{
          position: "absolute",
          left: PADDING,
          right: PADDING,
          top: PADDING,
          height: 300,
        }}
      >
        {children}
      </div>

      {/* Teks selalu di KIRI BAWAH. Sudut kanan bawah milik badge durasi
          YouTube, dan teks yang ditaruh di tengah akan bertabrakan dengan
          tombol putar yang muncul saat kursor lewat. */}
      <div
        style={{
          position: "absolute",
          left: PADDING,
          right: PADDING,
          bottom: PADDING - 14,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: FS_JUDUL,
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}
      >
        <div style={{ color: "var(--accent-ink)" }}>{baris[0]}</div>
        <div style={{ color: "var(--ink-0)" }}>{baris[1]}</div>
      </div>
    </AbsoluteFill>
  );
};

/** Tinggi huruf kapital yang benar-benar dipakai — dicetak `npm run check`
 *  supaya syarat >= 90px docs/06 punya angka, bukan perasaan. */
export const TINGGI_KAPITAL = Math.round(FS_JUDUL * CAP_RATIO);
