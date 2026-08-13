/* Scene standar — kartu judul (pembuka) & tanda tangan brand (penutup).
   Dipakai apa adanya supaya semua episode membuka dan menutup identik.
   Aturan lengkap + apa yang boleh diubah: docs/10-scene-standar.md

   Koreografinya milik bersama. Kalau ritmenya perlu berubah, ubah DI SINI
   untuk semua episode — jangan menyalin lalu menyetel ulang di satu episode.

   PEMBAGIAN PERANNYA: judul ada di PEMBUKA, brand di PENUTUP.
   Sebelumnya terbalik — pembuka cuma logo besar dan penutup yang membawa
   judul episode. Judul yang muncul di detik terakhir video tidak lagi
   memberi tahu penonton sedang menonton apa; ia cuma mengulang.
*/
import type React from "react";
import { staticFile } from "remotion";

import { CFG } from "./config.gen";
import { E, gambarGaris, keluar, t, tPP, useDetik } from "./anim";
import { Scene } from "./Stage";

export const DUR = {
  opening: CFG.OPENING_SECONDS,
  closing16x9: CFG.CLOSING_LONG_SECONDS,
  closing9x16: CFG.CLOSING_SHORT_SECONDS,
} as const;

/** Keliling cincin pada mark (r = 33) — dasar animasi stroke draw. */
const RING = 2 * Math.PI * 33; // ≈ 207,35

/** Mark getresolved sebagai SVG inline.
 *
 *  Dipakai dua kali dengan tingkat kerumitan berbeda: pembuka cuma butuh
 *  bentuknya (kecil, 2,5 dtk harus dipakai untuk judul), penutup memainkan
 *  seluruh pembangunannya — cincin menggambar diri, lalu titik hijau muncul.
 *  Karena itu `bangun` opsional; kalau tidak diberikan, mark tampil utuh. */
const Mark: React.FC<{
  ukuran: number;
  /** Detik relatif scene. Kalau diisi, cincin & titik dianimasikan. */
  bangun?: { d: number; mulaiCincin: number; mulaiTitik: number };
}> = ({ ukuran, bangun }) => (
  <svg
    viewBox="0 0 120 120"
    style={{ width: ukuran, height: ukuran, flex: "none" }}
  >
    <defs>
      <linearGradient id="mkPlate" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#818CF8" />
        <stop offset="1" stopColor="#4338CA" />
      </linearGradient>
      <linearGradient id="mkDot" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#34D399" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>

    <rect width="120" height="120" rx="30" fill="url(#mkPlate)" />

    <circle
      cx="60"
      cy="60"
      r="33"
      fill="none"
      stroke="#fff"
      strokeWidth="9"
      strokeLinecap="round"
      {...(bangun
        ? gambarGaris(bangun.d, RING, {
            mulai: bangun.mulaiCincin,
            durasi: 0.62,
            ease: E.power2out,
          })
        : {})}
    />

    <circle
      cx="60"
      cy="60"
      r="13"
      fill="url(#mkDot)"
      style={
        bangun
          ? {
              transformOrigin: "60px 60px",
              transform: `scale(${t(bangun.d, {
                mulai: bangun.mulaiTitik,
                durasi: 0.42,
                dari: 0,
                ke: 1,
                ease: E.backOut(2.2),
              })})`,
            }
          : undefined
      }
    />
  </svg>
);

/** Wordmark yang disingkap dari kiri. */
const Wordmark: React.FC<{
  tinggi: number;
  d: number;
  mulai: number;
}> = ({ tinggi, d, mulai }) => (
  <img
    src={staticFile("logos/getresolved-wordmark-inverse.svg")}
    alt=""
    style={{
      height: tinggi,
      width: "auto",
      clipPath: `inset(0 ${t(d, {
        mulai,
        durasi: 0.52,
        dari: 100,
        ke: 0,
        ease: E.power3out,
      })}% 0 0)`,
    }}
  />
);

/**
 * Kartu judul — pembuka, 2,5 dtk.
 * BUKAN frame pertama video: ditaruh di awal babak 2, setelah hook (docs/10).
 * Tidak pernah dipakai di Shorts.
 *
 * Rata kiri, bukan di tengah. Judul yang ditengahkan bersama logo terbaca
 * sebagai poster; rata kiri terbaca sebagai kepala bab — dan itu memang
 * fungsinya di sini.
 */
export const KartuJudul: React.FC<{
  /** Judul episode. Maks 5 kata — pada 2,5 dtk ia hanya tampil ~1,5 dtk.
   *  JANGAN membocorkan jawaban episode: penonton baru di detik ~10. */
  judul: string;
}> = ({ judul }) => {
  const d = useDetik();

  return (
    <div style={{ opacity: keluar(d, DUR.opening), width: "100%", height: "100%" }}>
      <Scene kelas="sc-open" tengah={false}>
        <div className="open-brand">
          <div
            style={{
              transform: `scale(${t(d, {
                mulai: 0.05,
                durasi: 0.45,
                dari: 0.7,
                ke: 1,
                ease: E.backOut(1.8),
              })})`,
              transformOrigin: "center",
              opacity: t(d, { mulai: 0.05, durasi: 0.3, dari: 0, ke: 1 }),
            }}
          >
            <Mark ukuran={104} />
          </div>
          <Wordmark tinggi={56} d={d} mulai={0.3} />
        </div>

        <div
          className="open-rule"
          style={{
            transform: `scaleX(${t(d, {
              mulai: 0.55,
              durasi: 0.45,
              dari: 0,
              ke: 1,
              ease: E.expoOut,
            })})`,
          }}
        />

        <h1
          className="open-judul"
          style={{
            opacity: t(d, { mulai: 0.7, durasi: 0.4, dari: 0, ke: 1, ease: E.power3out }),
            transform: `translateY(${t(d, {
              mulai: 0.7,
              durasi: 0.5,
              dari: 22,
              ke: 0,
              ease: E.power3out,
            })}px)`,
          }}
        >
          {judul}
        </h1>
      </Scene>
    </div>
  );
};

/**
 * Tanda tangan brand — penutup.
 * 16:9 → 5 dtk, konten di paruh kiri (paruh kanan milik end screen YouTube,
 * yang butuh minimal 5 detik agar bisa diklik).
 * 9:16 → 2 dtk, konten di tengah, tanpa baris deskripsi.
 *
 * Tidak ada judul di sini — itu tugas pembuka. Yang tinggal cuma: siapa yang
 * bicara barusan, dan di mana penonton bisa menemukannya lagi.
 *
 * Pembangunan mark yang penuh (cincin menggambar diri, titik hijau muncul)
 * ditaruh di sini karena marknya besar; pada mark 104px di pembuka, gerakan
 * itu tidak terlihat sebagai apa pun.
 */
export const TandaBrand: React.FC<{
  sub?: string;
  rasio?: "16x9" | "9x16";
}> = ({
  sub = "Penjelasan teknologi, coding, dan engineering dalam Bahasa Indonesia.",
  rasio = "16x9",
}) => {
  const d = useDetik();
  const pendek = rasio === "9x16";

  return (
    <Scene kelas="sc-close" tengah={false}>
      <div
        className="close-brand"
        style={{
          opacity: t(d, { mulai: 0.1, durasi: 0.4, dari: 0, ke: 1 }),
          /* Gerak kecil di tengah scene supaya 5 detik terakhir tidak jadi
             layar diam. Tidak dipakai di Shorts — 2 detik terlalu pendek
             untuk terbaca sebagai gerakan, hanya sebagai getaran. */
          transform: `translateY(${
            pendek ? 0 : tPP(d, { mulai: 1.8, durasi: 2.6, dari: 0, ke: -6 })
          }px)`,
        }}
      >
        <div
          style={{
            transform: `scale(${t(d, {
              mulai: 0.1,
              durasi: 0.5,
              dari: 0.86,
              ke: 1,
              ease: E.backOut(1.6),
            })})`,
            transformOrigin: "center",
          }}
        >
          <Mark
            ukuran={pendek ? 176 : 200}
            bangun={{ d, mulaiCincin: 0.22, mulaiTitik: 0.6 }}
          />
        </div>
        <Wordmark tinggi={pendek ? 72 : 84} d={d} mulai={0.78} />
      </div>

      <div
        className="close-rule"
        style={{
          transform: `scaleX(${t(d, {
            mulai: 1.05,
            durasi: 0.5,
            dari: 0,
            ke: 1,
            ease: E.expoOut,
          })})`,
        }}
      />

      <p
        className="close-handle"
        style={{
          opacity: t(d, { mulai: 1.2, durasi: 0.45, dari: 0, ke: 1 }),
          transform: `translateY(${t(d, {
            mulai: 1.2,
            durasi: 0.45,
            dari: 16,
            ke: 0,
          })}px)`,
        }}
      >
        {CFG.CHANNEL_HANDLE}
      </p>

      {!pendek && (
        <p
          className="close-sub"
          style={{
            opacity: t(d, { mulai: 1.42, durasi: 0.45, dari: 0, ke: 1 }),
            transform: `translateY(${t(d, {
              mulai: 1.42,
              durasi: 0.45,
              dari: 14,
              ke: 0,
            })}px)`,
          }}
        >
          {sub}
        </p>
      )}
    </Scene>
  );
};
