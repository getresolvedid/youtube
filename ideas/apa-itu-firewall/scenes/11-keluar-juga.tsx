/* T15 · scene 11 · keluar-juga — bagian 6 [explaining], 25,99 dtk
   VO:        11-keluar-juga-vo.md
   Direction: 11-keluar-juga-direction.md

   SATU-SATUNYA scene yang boleh memutar arah hadap penjaga
   (`../panggung-gedung.tsx`), dan seluruh artinya bergantung pada arah yang
   sudah dipakai sejak scene 1.

   DUA KEPUTUSAN:

   1. Penjaganya berputar DI TEMPAT — `scaleX` 1 -> -1 lewat nol, tanpa berpindah
      satu piksel. Penjaga yang bergeser saat berputar terbaca sebagai penjaga
      kedua yang datang.

   2. Kiriman tanpa jejak digambar dengan warna yang SAMA dengan yang lain.
      Bedanya harus ada di bukunya, bukan di bendanya — kiriman yang diberi warna
      bahaya mengubah scene ini jadi cerita horor.

   Scene ini yang paling mungkin dipangkas kalau episodenya kepanjangan
   (`naskah.md § Scene`); `12-label-bukan-isi` sengaja tetap utuh tanpanya.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  ABU,
  AKSEN,
  Buku,
  GEDUNG,
  Gedung,
  JALUR_Y,
  Ketukan,
  Lantai,
  N_PINTU,
  Penjaga,
  X_GEDUNG,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "keluar-juga";

const B_LUAR = beat(ID, 0); // "Sampai sini penjaganya selalu kita lihat menghadap ke luar."
const B_PUTAR = beat(ID, 1); // "Sekarang putar badannya."
const B_DUA = beat(ID, 2); // "Dia berdiri untuk dua arah…"
const B_KELUAR = beat(ID, 3); // "Ada yang keluar dari dalam gedungmu juga…"
const B_SURUH = beat(ID, 4); // "Sebagian memang kamu yang menyuruh."
const B_TIDAK = beat(ID, 5); // "Sebagian tidak…"
const B_LAMA = beat(ID, 6); // "Penjaga yang cuma menjaga pintu masuk…"

const X_DINDING = X_GEDUNG - GEDUNG.w / 2;

const PINTU_TETAP = Array.from({ length: N_PINTU }, () => ({ nyala: 0.35 }));

export const KeluarJuga: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: panah ke dalam, seperti sejak tadi --- */
  const masukPanah = gambarGaris(d, 300, { mulai: B_LUAR, durasi: 0.7 });

  /* --- tahap 2: berputar di tempat, lewat nol --- */
  const putar = t(d, { mulai: B_PUTAR, durasi: 0.8, dari: 1, ke: -1, ease: E.power2out });

  /* --- tahap 3: panah kedua, arahnya keluar --- */
  const keluarPanah = gambarGaris(d, 300, { mulai: B_DUA + 0.2, durasi: 0.8 });

  /* --- tahap 4 & 5: kiriman berangkat dari dalam, sebagian berjejak --- */
  const kirim = (k: number) =>
    t(d, {
      mulai: B_KELUAR + k * 0.55,
      durasi: 1.5,
      dari: 0,
      ke: 1,
      ease: E.power1out,
    });
  const bukuBuka = t(d, { mulai: B_SURUH, durasi: 0.5, dari: 0, ke: 1 });
  const jejak = t(d, { mulai: B_SURUH + 0.3, durasi: 0.8, dari: 0, ke: 3 });

  /* --- tahap 6: satu berangkat tanpa jejak sama sekali --- */
  const tanpaJejak = t(d, { mulai: B_TIDAK, durasi: 1.7, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 7: penjaga versi lama, siluet, membelakangi semuanya --- */
  const lama = t(d, { mulai: B_LAMA, durasi: 0.7, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Lantai />
          <Gedung pintu={PINTU_TETAP} />

          {/* dua panah arah, sama tebalnya — yang kedua tidak boleh terbaca
              sebagai tambahan kecil */}
          <g opacity={0.85}>
            <path
              d={`M${X_PENJAGA + 60} ${JALUR_Y - 250}h300`}
              stroke={ABU}
              strokeWidth={7}
              strokeLinecap="round"
              {...masukPanah}
            />
            <path
              d={`M${X_PENJAGA + 60} ${JALUR_Y - 190}h300`}
              stroke={AKSEN}
              strokeWidth={7}
              strokeLinecap="round"
              {...keluarPanah}
            />
            <path
              d={`M${X_PENJAGA + 360} ${JALUR_Y - 250}l-26 -15v30z`}
              fill={ABU}
              opacity={masukPanah.strokeDashoffset < 4 ? 1 : 0}
              transform={`rotate(180 ${X_PENJAGA + 360} ${JALUR_Y - 250})`}
            />
            <path
              d={`M${X_PENJAGA + 60} ${JALUR_Y - 190}l26 -15v30z`}
              fill={AKSEN}
              opacity={keluarPanah.strokeDashoffset < 4 ? 1 : 0}
              transform={`rotate(180 ${X_PENJAGA + 60} ${JALUR_Y - 190})`}
            />
          </g>

          {/* --- penjaga: berputar di tempat --- */}
          <Penjaga x={X_PENJAGA} y={Y_LANTAI} hadap={putar} />

          {/* --- tahap 4 & 5: kiriman berangkat ke luar --- */}
          {[0, 1, 2].map((k) => {
            const p = kirim(k);
            const berjejak = k < Math.floor(jejak);
            return (
              <Ketukan
                key={k}
                x={X_DINDING - (X_DINDING - X_LUAR) * p}
                y={JALUR_Y - k * 46}
                skala={0.72}
                opacity={p > 0 && p < 1 ? 1 : 0}
                warna={berjejak ? AKSEN : ABU}
              />
            );
          })}

          {/* --- tahap 6: satu berangkat tanpa jejak. Warnanya SAMA. --- */}
          <Ketukan
            x={X_DINDING - (X_DINDING - X_LUAR) * tanpaJejak}
            y={JALUR_Y + 70}
            skala={0.72}
            opacity={tanpaJejak > 0 && tanpaJejak < 1 ? 1 : 0}
            warna={ABU}
          />

          {/* --- buku: terisi untuk yang disuruh, kosong untuk yang tidak ---
              Ditaruh TINGGI di sisi kiri, bukan di `P_BUKU`: scene ini
              satu-satunya yang melintaskan kiriman di sepanjang lebar frame,
              jadi tempat buku yang biasa persis berada di jalurnya. */}
          <Buku
            x={250}
            y={Y_LANTAI - 470}
            skala={0.55}
            opacity={bukuBuka}
            baris={Math.max(0, Math.min(3, Math.floor(jejak)))}
          />

          {/* --- tahap 7: penjaga versi lama, siluet yang tidak beranimasi --- */}
          <Penjaga
            x={X_PENJAGA - 330}
            y={Y_LANTAI}
            hadap={1}
            skala={0.9}
            opacity={0.35 * lama}
          />
        </svg>
      </div>
    </Scene>
  );
};
