/* T01-S2 · scene 9 · beli — beat konsekuensi + CTA, 4,69 dtk
   Direction: 09-beli-direction.md
   VO:        09-beli-vo.md

   DUA SISI MUNCUL BERSAMAAN, bukan bergantian. Kalimatnya perbandingan;
   menampilkannya berurutan mengubahnya jadi dua pernyataan, dan yang kedua akan
   terbaca sebagai yang benar.

   Di 9:16 "terbelah dua" berarti ATAS dan BAWAH. Keduanya harus muat di kotak
   aman y 240–1480, jadi ini SATU-SATUNYA scene Short ini yang boleh mengubah
   skala meja — dan skalanya dipakai untuk kedua sisi, sama besar, supaya tidak
   ada sisi yang tampil lebih penting daripada yang lain.

   CTA-nya teks, TIDAK diucapkan (09-beli-vo.md § Catatan).
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  BERKAS,
  Berkas,
  MEJA,
  MIRING,
  Meja,
  W_PENUH,
  X_BERKAS,
  X_PENUH,
  X_TENGAH,
  Y_MEJA,
  hitungBalik,
} from "../meja-kerja";
import { T_TURUN } from "./07-bolak-balik";
import { cari } from "./timing.gen";

const T_BELAH = 0.05;
const T_MENDARAT = T_BELAH + 0.55;

/** Kedua sisi dipakai apa adanya dari scene 4 dan 6, cuma dikecilkan. */
const SKALA = 0.62;
/** Permukaan meja tiap sisi. Kaki meja (.meja::after) menjulur 110px ke bawah,
 *  jadi tiap sisi memakan sekitar 170px setelah diskalakan — dan keduanya wajib
 *  tetap di dalam kotak aman y 240-1480 (docs/03). */
const Y_ATAS = 560;
const Y_BAWAH = 1080;

/** Angka bolak-balik yang MEMBEKU — pembayaran scene 7 dan 8. Ia harus masih
 *  terbaca angkanya, bukan hilang. Diturunkan, bukan diketik. */
const BEKU = hitungBalik(
  cari("bolak-balik").durasi - T_TURUN + cari("indikator").durasi,
);

/** Satu sisi: meja + isinya, dikecilkan dan digeser ke posisi sisinya. */
const Sisi: React.FC<{
  y: number;
  masuk: number;
  children: React.ReactNode;
}> = ({ y, masuk, children }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      /* Urutan CSS dibaca kanan ke kiri: skala dulu (titik jangkarnya permukaan
         meja, jadi permukaan tidak bergerak), baru digeser. Karena itu geserannya
         TIDAK ikut diskalakan dan boleh dihitung di koordinat panggung penuh. */
      transform: `translateY(${y - Y_MEJA}px) scale(${SKALA})`,
      transformOrigin: `${X_TENGAH}px ${Y_MEJA}px`,
      opacity: masuk,
    }}
  >
    {children}
  </div>
);

export const Beli: React.FC = () => {
  const d = useDetik();

  const m = t(d, { mulai: T_BELAH, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });
  const mendarat = t(d, {
    mulai: T_MENDARAT,
    durasi: 0.4,
    dari: 0,
    ke: 1,
    ease: E.backOut(1.4),
  });

  return (
    <Scene tengah={false}>
      {/* --- ATAS: meja penuh yang dilebarkan → berkasnya langsung lega --- */}
      <Sisi y={Y_ATAS} masuk={m}>
        <Meja lebar={MEJA.wLebar} />
        {X_PENUH.map((x) => (
          <Berkas key={x} x={x} w={W_PENUH} />
        ))}
        {/* berkas yang tadi menggantung, akhirnya mendarat di ruang baru */}
        <Berkas
          x={X_TENGAH + MEJA.w / 2 + 60}
          w={W_PENUH}
          terang
          angkat={(1 - mendarat) * 180}
        />
      </Sisi>

      <p
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 660,
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: 46,
          color: "var(--accent-ink)",
          opacity: m,
        }}
      >
        penuh → nambah membantu
      </p>

      {/* hitungan yang MEMBEKU — bukan hilang */}
      <p
        className="t-label"
        style={{
          position: "absolute",
          right: 90,
          top: 270,
          fontFamily: "var(--font-mono)",
          color: "var(--warn)",
          opacity: m * (1 - 0.5 * mendarat),
        }}
      >
        bolak-balik ×{BEKU} → berhenti
      </p>

      {/* --- BAWAH: meja longgar yang dilebarkan → tetap kosong --- */}
      <Sisi y={Y_BAWAH} masuk={m}>
        <Meja lebar={MEJA.wLebar} />
        {X_BERKAS.map((x, i) => (
          <Berkas key={x} x={x} miring={MIRING[i]} />
        ))}
        <div
          style={{
            position: "absolute",
            left: (X_BERKAS[3] ?? 0) + BERKAS.w / 2,
            top: Y_MEJA - BERKAS.h,
            width: X_TENGAH + MEJA.wLebar / 2 - ((X_BERKAS[3] ?? 0) + BERKAS.w / 2),
            height: BERKAS.h,
            borderRadius: 8,
            border: "3px dashed var(--ink-2)",
          }}
        />
      </Sisi>

      <p
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1180,
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: 46,
          color: "var(--ink-2)",
          opacity: m,
        }}
      >
        belum penuh → tidak ngefek
      </p>

      {/* CTA — kecil, redup, di dalam kotak aman bawah (y ≤ 1480) */}
      <p
        className="t-label"
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1400,
          textAlign: "center",
          color: "var(--ink-2)",
          opacity: t(d, { mulai: 0.8, durasi: 0.5, dari: 0, ke: 1 }),
        }}
      >
        cara kerjanya → video panjang
      </p>
    </Scene>
  );
};
