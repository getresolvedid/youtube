/* Scene standar — brand sting & end card.
   Dipakai apa adanya supaya semua episode membuka dan menutup identik.
   Aturan lengkap + apa yang boleh diubah: docs/10-scene-standar.md

   Koreografinya milik bersama. Kalau ritmenya perlu berubah, ubah DI SINI
   untuk semua episode — jangan menyalin lalu menyetel ulang di satu episode.

   Angka waktunya sengaja identik dengan versi GSAP yang sudah diuji render
   1920×1080 sebelum migrasi; yang berubah cuma cara menyatakannya.
*/
import type React from "react";
import { staticFile } from "remotion";

import { CFG } from "./config.gen";
import { E, gambarGaris, keluar, t, tPP, useDetik } from "./anim";
import { Scene } from "./Stage";

/* Durasi dikunci di .env, bukan di sini — tools/bangun-timing.mjs membaca
   nilai yang sama untuk menyusun timeline. Kalau angkanya ditulis dua kali,
   cepat atau lambat keduanya berbeda dan scene sesudahnya bergeser. */
export const DUR = {
  opening: CFG.OPENING_SECONDS,
  closing16x9: CFG.CLOSING_LONG_SECONDS,
  closing9x16: CFG.CLOSING_SHORT_SECONDS,
} as const;

/** Keliling cincin pada mark (r = 33) — dasar animasi stroke draw. */
const RING = 2 * Math.PI * 33; // ≈ 207,35

/**
 * Brand sting, 1,5 dtk.
 * BUKAN pembuka video — ditaruh di awal babak 2, setelah hook.
 * Tidak pernah dipakai di Shorts (docs/10).
 */
export const BrandSting: React.FC = () => {
  const d = useDetik();
  const opacity = keluar(d, DUR.opening);

  return (
    <div style={{ opacity, width: "100%", height: "100%" }}>
      <Scene kelas="sc-open">
        <div className="sting">
          <svg className="sting-mark" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="stingPlate" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#818CF8" />
                <stop offset="1" stopColor="#4338CA" />
              </linearGradient>
              <linearGradient id="stingDot" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#34D399" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* 1. Kotak mark meredup masuk di belakangnya */}
            <rect
              width="120"
              height="120"
              rx="30"
              fill="url(#stingPlate)"
              opacity={t(d, {
                mulai: 0.05,
                durasi: 0.35,
                dari: 0,
                ke: 1,
                ease: E.power1out,
              })}
            />

            {/* 2. Cincin menggambar diri */}
            <circle
              cx="60"
              cy="60"
              r="33"
              fill="none"
              stroke="#fff"
              strokeWidth="9"
              strokeLinecap="round"
              {...gambarGaris(d, RING, {
                mulai: 0.05,
                durasi: 0.62,
                ease: E.power2out,
              })}
            />

            {/* 3. Titik hijau — the resolve point */}
            <circle
              cx="60"
              cy="60"
              r="13"
              fill="url(#stingDot)"
              style={{
                transformOrigin: "60px 60px",
                transform: `scale(${t(d, {
                  mulai: 0.4,
                  durasi: 0.42,
                  dari: 0,
                  ke: 1,
                  ease: E.backOut(2.2),
                })})`,
              }}
            />
          </svg>

          {/* 4. Wordmark disingkap dari kiri */}
          <img
            className="sting-word"
            src={staticFile("logos/getresolved-wordmark-inverse.svg")}
            alt=""
            style={{
              clipPath: `inset(0 ${t(d, {
                mulai: 0.58,
                durasi: 0.52,
                dari: 100,
                ke: 0,
                ease: E.power3out,
              })}% 0 0)`,
            }}
          />
        </div>
      </Scene>
    </div>
  );
};

/**
 * End card.
 * 16:9 → 5 dtk, konten di paruh kiri (paruh kanan milik end screen YouTube).
 * 9:16 → 2 dtk, konten di tengah, tanpa baris deskripsi.
 *
 * Yang boleh berbeda per episode hanya `cta` (maks 6 kata) dan `sub`.
 */
export const EndCard: React.FC<{
  /** Satu ajakan, maksimal 6 kata. Kata yang ditekankan dibungkus <em>. */
  cta: React.ReactNode;
  sub?: string;
  rasio?: "16x9" | "9x16";
}> = ({
  cta,
  sub = "Penjelasan teknologi, coding, dan engineering dalam Bahasa Indonesia.",
  rasio = "16x9",
}) => {
  const d = useDetik();
  const pendek = rasio === "9x16";

  const mark = {
    opacity: t(d, { mulai: 0.1, durasi: 0.5, dari: 0, ke: 1, ease: E.backOut(1.6) }),
    /* Gerak kecil di tengah scene supaya 5 detik terakhir tidak jadi layar
       diam. Tidak dipakai di Shorts — 2 detik tidak cukup untuk terbaca
       sebagai gerakan, hanya sebagai getaran. */
    y: pendek ? 0 : tPP(d, { mulai: 1.6, durasi: 2.8, dari: 0, ke: -6 }),
    skala: t(d, { mulai: 0.1, durasi: 0.5, dari: 0.86, ke: 1, ease: E.backOut(1.6) }),
  };

  return (
    <Scene kelas="sc-close" tengah={false}>
      <img
        className="close-mark"
        src={staticFile("logos/getresolved-mark.svg")}
        alt=""
        style={{
          opacity: mark.opacity,
          transform: `translateY(${mark.y}px) scale(${mark.skala})`,
          transformOrigin: "center",
        }}
      />

      <h2
        className="close-cta"
        style={{
          opacity: t(d, { mulai: 0.28, durasi: 0.55, dari: 0, ke: 1, ease: E.power3out }),
          transform: `translateY(${t(d, {
            mulai: 0.28,
            durasi: 0.55,
            dari: 26,
            ke: 0,
            ease: E.power3out,
          })}px)`,
        }}
      >
        {cta}
      </h2>

      <div
        className="close-rule"
        style={{
          transform: `scaleX(${t(d, {
            mulai: 0.5,
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
          opacity: t(d, { mulai: 0.62, durasi: 0.45, dari: 0, ke: 1 }),
          transform: `translateY(${t(d, {
            mulai: 0.62,
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
            opacity: t(d, { mulai: 0.8, durasi: 0.45, dari: 0, ke: 1 }),
            transform: `translateY(${t(d, {
              mulai: 0.8,
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
