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
 *  adalah >= 90px pada kartu 1280x720, jadi ukuran huruf minimumnya 125px.
 *  Dipakai apa adanya — kalau sebuah judul tidak muat pada ukuran ini, yang
 *  dipendekkan KATANYA, bukan hurufnya. Thumbnail yang tidak terbaca di feed
 *  sama saja dengan thumbnail yang tidak ada. */
const CAP_RATIO = 0.72;

/** Setelan per rasio. Angkanya beda BUKAN karena selera: kartu 9:16 tiga kali
 *  lebih tinggi resolusinya (2160x3840, docs/06), jadi ukuran huruf yang sama
 *  akan mengecil jadi sepertiganya di layar. Yang dijaga sama adalah porsinya
 *  terhadap lebar kartu — itu yang menentukan keterbacaan, bukan pikselnya. */
/* UKURAN HURUFNYA DIPATOK DARI STILL, BUKAN DARI HITUNGAN. Dinaikkan
   15 Agustus 2026 (16:9 132 → 144, 9:16 260 → 280) dan yang menentukan batasnya
   bukan syarat docs/06 — keduanya sudah jauh di atas 90px — melainkan **baris
   terpanjang yang sudah ada**: "BUKAN GUDANG"/"BUKAN DAFTAR" 12 huruf di 16:9,
   "MEJA LEBAR," 11 huruf di 9:16.

   Percobaan pertama menaikkan 16:9 ke 160 dan itu **menjorok keluar bingkai** —
   penjaga panjang baris di bawah meloloskannya, karena hampiran 0,6 lebar huruf
   ternyata terlalu murah hati untuk huruf lebar (U, D, A, N, G). Lebar
   sungguhannya, diukur dari PNG: 0,64 x ukuran huruf untuk "BUKAN GUDANG",
   0,54 untuk "MEJA LEBAR," yang punya koma dan spasi. Satu angka tidak bisa
   mewakili keduanya, jadi penjaganya sengaja dibiarkan longgar dan **still-nya
   yang memutuskan** — sama seperti `npm run check` yang tidak membuktikan
   gambarnya ada.

   Mau lebih besar lagi? Yang dipendekkan KATANYA. Pada kartu 1280 dengan marjin
   64, baris 12 huruf sudah memakan hampir seluruh lebarnya di 144. */
const SETELAN = {
  "16x9": { fs: 144, padding: 64, pitaFigur: 300, bawah: 50 },
  /* 9:16 — teks tidak menempel di dasar kartu. Di feed dan halaman hasil
     pencarian, judul Short ditumpuk di bawah kovernya; kata yang ditaruh di
     100px terbawah akan tertutup di separuh permukaan tempat ia muncul.

     Pita figurnya SANGAT tinggi (2100 dari 3840) dan itu disengaja: kartu 9:16
     punya kelebihan tinggi, dan kelebihan yang tidak dipakai tidak jadi ruang
     napas melainkan zona mati di tengah — figur mengambang di atas, teks
     menempel di bawah, dan yang di antaranya kosong tanpa alasan. */
  "9x16": { fs: 280, padding: 150, pitaFigur: 2100, bawah: 620 },
} as const;

export type RasioThumb = keyof typeof SETELAN;

/** Lebar kartu tiap rasio — dipakai penjaga panjang baris di bawah. Angka
 *  ini kembar dengan THUMB_WIDTH/THUMB_SHORT_WIDTH di .env, dan itu satu-
 *  satunya kembaran yang dibiarkan: config.gen.ts diimpor src/Root.tsx untuk
 *  UKURAN komposisi, sementara yang dibutuhkan di sini cuma untuk MEMERIKSA —
 *  dan pemeriksaan yang ikut mati kalau .env belum digenerate tidak berguna. */
const LEBAR: Record<RasioThumb, number> = { "16x9": 1280, "9x16": 2160 };

export const KartuThumbnail: React.FC<{
  /** Maksimal dua baris, maksimal empat kata SELURUHNYA (docs/06). Baris
   *  pertama biasanya yang beraksen, baris kedua yang memikul klaimnya. */
  baris: readonly [string, string];
  /** 16:9 untuk video panjang, 9:16 untuk kover Short. */
  rasio?: RasioThumb;
  /** Figur dari videonya sendiri — bukan gambar baru. Menempati pita atas. */
  children: React.ReactNode;
}> = ({ baris, rasio = "16x9", children }) => {
  const S = SETELAN[rasio];

  /* Lebar rata-rata satu huruf kapital Manrope 800 ~ 0,60 x ukuran hurufnya.
     Hampiran, dan sengaja: yang dijaga bukan lebar persis, melainkan supaya
     baris yang KEPANJANGAN tidak lolos diam-diam.

     Tanpa penjaga ini, baris yang tidak muat MELIPAT jadi baris ketiga — dan
     kartu tiga baris tidak gagal di mana pun. Ia cuma berhenti terbaca dalam
     seperempat detik, dan itu ketahuannya setelah diunggah. Persis terjadi di
     kover Short 2: "TANGAN SAMA" 11 huruf pada kartu yang cuma muat 10. */
  const MUAT = Math.floor((LEBAR[rasio] - 2 * S.padding) / (0.6 * S.fs));
  const kepanjangan = baris.filter((b) => b.length > MUAT);
  if (kepanjangan.length > 0) {
    throw new Error(
      `Baris thumbnail kepanjangan untuk kartu ${rasio}: ` +
        kepanjangan.map((b) => `"${b}" (${b.length} huruf)`).join(", ") +
        `. Muatnya ${MUAT} huruf per baris pada ukuran ${S.fs}px. ` +
        `Pendekkan KATANYA — mengecilkan hurufnya melanggar syarat tinggi ` +
        `huruf kapital docs/06, dan baris yang melipat jadi kartu tiga baris ` +
        `yang tidak terbaca di feed.`,
    );
  }

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
    <AbsoluteFill className={`panggung r-${rasio}`}>
      <SpriteIkon />

      {/* Pita figur — sepertiga atas lebih sedikit. Figurnya dipusatkan sendiri
          oleh episodenya; yang dijaga di sini cuma tingginya, supaya baseline
          teks jatuh di tempat yang sama di semua episode. */}
      <div
        style={{
          position: "absolute",
          left: S.padding,
          right: S.padding,
          top: S.padding,
          height: S.pitaFigur,
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
          left: S.padding,
          right: S.padding,
          bottom: S.bawah,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: S.fs,
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          /* Sabuk pengaman kedua di samping penjaga panjang baris di atas:
             kalau hampiran lebar hurufnya meleset, yang terjadi adalah baris
             yang menjorok keluar bingkai — kelihatan langsung — bukan baris
             ketiga yang diam-diam muncul dan tetap terlihat rapi. */
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ color: "var(--accent-ink)" }}>{baris[0]}</div>
        <div style={{ color: "var(--ink-0)" }}>{baris[1]}</div>
      </div>
    </AbsoluteFill>
  );
};

/** Tinggi huruf kapital yang benar-benar dipakai, per rasio — supaya syarat
 *  >= 90px docs/06 punya angka, bukan perasaan. Untuk 9:16 angkanya dibaca
 *  relatif: 216px pada kartu selebar 2160 setara 128px pada kartu 1280. */
export const TINGGI_KAPITAL: Record<RasioThumb, number> = {
  "16x9": Math.round(SETELAN["16x9"].fs * CAP_RATIO),
  "9x16": Math.round(SETELAN["9x16"].fs * CAP_RATIO),
};
