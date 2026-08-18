/* T18 · scene 8 · analogi-tcp — analogi sepuluh kotak
   VO:        08-analogi-tcp-vo.md
   Direction: 08-analogi-tcp-direction.md

   Scene penguat. Yang baru di sini cuma SATU: urutan. Scene 7 memperlihatkan
   yang hilang; scene ini memperlihatkan yang tidak berurutan.

   DUA KEPUTUSAN:

   1. Keberantakan lahir dari DURASI TEMPUH yang berbeda, bukan dari titik
      berangkat yang diacak. Kalau titik berangkatnya diacak, tahap 1 tidak
      pernah terlihat rapi — dan justru kontras rapi → kacau → rapi yang jadi
      seluruh isi scene ini.

   2. Angkanya tetap. `Math.random()` dilarang di komposisi (CLAUDE.md
      § Deterministik); tabel `TEMPUH` yang menentukan siapa tiba duluan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Label, Paket } from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "analogi-tcp";

const B_SEPULUH = beat(ID, 0); // "Bayangkan kamu mengirim sepuluh kotak…"
const B_URUTAN = beat(ID, 1); // "…tidak semuanya tiba dalam urutan yang sama."
const B_SUSUN = beat(ID, 2); // "TCP membantu memastikan semua bagian…"

/** Lama tempuh tiap kotak, detik. INI yang menghasilkan keberantakan —
 *  kotak 04 lebih cepat daripada 02 dan 03, jadi ia tiba lebih dulu.
 *  Kotak 06 tidak pernah tiba (nilainya tidak dipakai). */
const TEMPUH = [2.0, 2.9, 3.1, 2.2, 3.4, 9.9, 2.6, 3.8, 4.0, 3.6] as const;

const N = 10;
const HILANG = 6; // nomor kotak yang tidak pernah sampai

const X_KIRI_BARIS = 240;
const X_KANAN_BARIS = 1680;
const Y_BARIS = 560;
const LEBAR_SLOT = (X_KANAN_BARIS - X_KIRI_BARIS) / (N - 1);

/** Tinggi lengkungan tiap kotak saat menyeberang, indeks = nomor − 1.
 *
 *  BUKAN angka hias, dan bukan `i % 3`: yang dipakai pertama membuat kotak 04
 *  dan 07 melengkung di ketinggian yang sama persis, dan keduanya memang saling
 *  menyalip — jadi yang satu melewati yang lain di garis yang sama dan terbaca
 *  MELEBUR, bukan menyalip.
 *
 *  Angkanya diturunkan dari rentang slot yang benar-benar dilewati tiap kotak
 *  (slot berangkat → slot tiba). Kotak yang rentangnya beririsan wajib beda
 *  ketinggian; yang tidak pernah bertemu boleh berbagi:
 *
 *      02, 03, 04, 07  saling beririsan semua  -> empat ketinggian berbeda
 *      01, 05, 10      tidak pernah bertemu    -> boleh sama-sama 0
 *      08, 09          tidak bertemu satu sama lain, tapi bertemu 10
 *
 *  Di titik berangkat dan titik tiba lengkungannya nol, jadi barisannya tetap
 *  rata — yang berbeda cuma jalur di udaranya. */
const LAJUR = [0, 0, 88, 176, 0, 0, 264, 88, 88, 0] as const;

/** Urutan kedatangan — diturunkan dari TEMPUH, bukan ditulis kedua kalinya.
 *  Dua daftar yang wajib sepadan adalah dua daftar yang akan berbeda. */
const URUT_TIBA = TEMPUH.map((lama, i) => ({ nomor: i + 1, lama }))
  .filter((k) => k.nomor !== HILANG)
  .sort((a, b) => a.lama - b.lama)
  .map((k) => k.nomor);

export const AnalogiTcp: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: berbaris rapi, lalu berangkat bersamaan --- */
  const baris = (i: number) => masuk(d, { mulai: B_SEPULUH + 0.15, urutan: i, jeda: 0.05, geser: 16 });

  /* --- tahap 3: susun ulang ke slot nomornya --- */
  const susun = (i: number) =>
    t(d, { mulai: B_SUSUN + 0.4 + i * 0.05, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  /* --- kotak yang hilang, diminta lagi --- */
  const tanda = masuk(d, { mulai: B_SUSUN + 1.8, durasi: 0.5, geser: 14 });
  const isiLubang = masuk(d, { mulai: B_SUSUN + 3.0, durasi: 0.6, geser: -60 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <line
            x1={X_KIRI_BARIS - 80}
            y1={Y_BARIS + 90}
            x2={X_KANAN_BARIS + 80}
            y2={Y_BARIS + 90}
            stroke="var(--line)"
            strokeWidth={4}
          />

          {Array.from({ length: N }, (_, i) => {
            const nomor = i + 1;
            if (nomor === HILANG) return null;

            /* Tempatnya saat berangkat: urut nomor. */
            const xAwal = X_KIRI_BARIS + i * LEBAR_SLOT;
            /* Tempatnya saat tiba: urut KEDATANGAN — inilah keberantakannya. */
            const iTiba = URUT_TIBA.indexOf(nomor);
            const xTiba = X_KIRI_BARIS + iTiba * LEBAR_SLOT;

            const jalan = t(d, {
              mulai: B_SEPULUH + 1.2,
              durasi: TEMPUH[i] ?? 2.5,
              dari: 0,
              ke: 1,
              ease: E.power1out,
            });
            const s = susun(i);
            const m = baris(i);

            /* Berangkat rapi -> tiba berantakan -> disusun ke slot nomornya. */
            const x = xAwal + (xTiba - xAwal) * jalan + (xAwal - xTiba) * s;
            /* Tiap kotak terangkat ke ketinggian yang BERBEDA selama ia
               bergerak. Dengan satu ketinggian yang sama untuk semuanya, kotak
               yang menyalip kotak lain melewatinya persis di garis yang sama
               dan terbaca MELEBUR, bukan menyalip.
               Dua gerakan yang perlu diangkat, bukan satu: perjalanan (`jalan`)
               DAN penyusunan (`s`). Versi pertama cuma mengangkat yang pertama,
               dan seluruh tumpang-tindihnya justru terjadi di yang kedua —
               di situ hampir semua kotak menyeberangi kotak lain sekaligus.
               Di kedua ujung tiap gerakan angkatannya nol, jadi barisan
               berangkat dan barisan akhirnya tetap rata. */
            const angkat = Math.max(jalan * (1 - jalan), s * (1 - s)) * 4;
            const y = Y_BARIS - angkat * (LAJUR[i] ?? 0);

            return (
              <g key={nomor} style={{ opacity: m.opacity, transform: m.transform }}>
                <Paket
                  x={x}
                  y={y}
                  nomor={nomor}
                  skala={0.74}
                  warna={s > 0.9 ? "ok" : "biasa"}
                />
              </g>
            );
          })}

          {/* --- lubang di posisi 06, lalu diisi --- */}
          <g opacity={1 - isiLubang.opacity}>
            <rect
              x={X_KIRI_BARIS + (HILANG - 1) * LEBAR_SLOT - 36}
              y={Y_BARIS - 27}
              width={72}
              height={54}
              rx={8}
              fill="none"
              stroke="var(--bad)"
              strokeWidth={3}
              strokeDasharray="8 8"
            />
          </g>
          <g style={{ opacity: isiLubang.opacity, transform: isiLubang.transform }}>
            <Paket
              x={X_KIRI_BARIS + (HILANG - 1) * LEBAR_SLOT}
              y={Y_BARIS}
              nomor={HILANG}
              skala={0.74}
              warna="ulang"
            />
          </g>

          <g style={{ opacity: tanda.opacity * (1 - isiLubang.opacity), transform: tanda.transform }}>
            <Label
              x={960}
              y={330}
              teks="SEND 06 AGAIN"
              warna="var(--accent)"
            />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
