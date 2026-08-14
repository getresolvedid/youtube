/* T01-S2 · scene 7 · bolak-balik — beat bukti 4 dari 4, 8,97 dtk
   Direction: 07-bolak-balik-direction.md
   VO:        07-bolak-balik-vo.md

   Scene terpanjang Short ini, dan satu-satunya yang memperlihatkan mekanismenya
   BERGERAK.

   PATAHNYA IRAMA TANGAN ADALAH BUKTINYA — bukan berkas yang naik-turun.
   Naik-turun cuma kejadian; yang dirasakan penonton di komputernya sendiri
   adalah menunggu. Karena itu iramanya tetap `IRAMA` yang sama dengan scene 4
   dan 5; yang DITAMBAHKAN cuma jeda tunggu di antaranya, dan jedanya konstanta,
   bukan acak (Math.random() dilarang — CLAUDE.md § Deterministik).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  BERKAS,
  Berkas,
  Gudang,
  MIRING,
  Meja,
  Tangan,
  TeksAtas,
  W_PENUH,
  X_PENUH,
  X_TENGAH,
  Y_GUDANG,
  Y_GUDANG_NAIK,
  Y_MEJA,
  hitungBalik,
} from "../meja-kerja";
import { beat } from "./timing.gen";

const ID = "bolak-balik";

/** Titik serah ke 08-indikator: hitungan bolak-balik di sana melanjutkan dari
 *  sini, jadi angkanya tidak boleh ditebak ulang di berkas itu. */
export const T_TURUN = beat(ID, 0) + 0.25;
const DUR_TURUN = 0.55;
const T_NAIK = beat(ID, 1) + 0.1;
const DUR_NAIK = 0.7;

/** Berkas yang dikorbankan: yang paling kiri. Berkas yang menggantung sejak
 *  scene 6 mendarat di tempatnya. */
const I_KORBAN = 0;
const X_KORBAN = X_PENUH[I_KORBAN] ?? 0;

/** Dan saat si korban dijemput kembali, ADA YANG HARUS TURUN untuk memberi
 *  tempat. Tanpa ini mejanya diam-diam memuat sembilan berkas di delapan slot,
 *  dan seluruh sebab "meja penuh" runtuh di scene yang justru menjelaskannya. */
const I_PENGGANTI = 4;
const X_PENGGANTI = X_PENUH[I_PENGGANTI] ?? 0;

/** Tangan bekerja di antara berkas yang MASIH ada, lalu menunggu tiap kali ia
 *  butuh yang sedang di bawah. Jeda tunggunya konstanta. */
const URUTAN_SEMPIT = [2, 4, 6, 4] as const;
const IRAMA_TUNGGU = 0.78;

export const BolakBalik: React.FC = () => {
  const d = useDetik();

  const turun = t(d, {
    mulai: T_TURUN,
    durasi: DUR_TURUN,
    dari: 0,
    ke: 1,
    ease: E.power1in,
  });
  const naik = t(d, {
    mulai: T_NAIK,
    durasi: DUR_NAIK,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  /* Gudang naik ke dalam bingkai supaya perjalanannya terlihat sampai tujuan —
     tapi tidak dipindah ke tengah: ia harus tetap terasa "di bawah sana". */
  const yGudang = Y_GUDANG + (Y_GUDANG_NAIK - Y_GUDANG) * turun;

  const yKorban = Y_MEJA - BERKAS.h + (yGudang + 40 - (Y_MEJA - BERKAS.h)) * (turun - naik);

  /* Tangan: irama yang sama, DITAMBAH jeda tunggu. Fungsi murni dari waktu. */
  const lewat = Math.max(0, d - T_TURUN);
  const i = Math.floor(lewat / IRAMA_TUNGGU);
  const dalam = lewat - i * IRAMA_TUNGGU;
  const u = t(dalam, { mulai: 0, durasi: 0.18, dari: 0, ke: 1, ease: E.power2out });
  const n = URUTAN_SEMPIT.length;
  const xDari = X_PENUH[URUTAN_SEMPIT[i % n] ?? 0] ?? 0;
  const xKe = X_PENUH[URUTAN_SEMPIT[(i + 1) % n] ?? 0] ?? 0;

  /** Hitungan bolak-balik — turunan frame, tidak menyimpan state. Fungsinya
   *  milik ../meja-kerja.tsx supaya scene 8 bisa melanjutkannya. */
  const putaran = hitungBalik(d - T_TURUN);

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        {d < T_NAIK ? (
          "dikembalikan ke gudang"
        ) : (
          <span style={{ color: "var(--warn)" }}>dijemput lagi</span>
        )}
      </TeksAtas>

      <Meja />

      {X_PENUH.map((x, k) => {
        if (k === I_KORBAN || k === I_PENGGANTI) return null;
        return <Berkas key={x} x={x} w={W_PENUH} />;
      })}

      {/* penggantinya: turun ke gudang saat si korban naik */}
      <div
        style={{
          position: "absolute",
          left: X_PENGGANTI - W_PENUH / 2,
          top: Y_MEJA - BERKAS.h + (yGudang + 40 - (Y_MEJA - BERKAS.h)) * naik,
          width: W_PENUH,
          height: BERKAS.h,
          borderRadius: 8,
          border: "3px solid var(--ink-1)",
          background: "var(--bg-elev)",
          opacity: 1 - 0.4 * naik,
        }}
      />

      {/* berkas yang menggantung sejak scene 6, akhirnya mendarat di tempat
          yang baru saja ditinggalkan */}
      <Berkas
        x={X_TENGAH + (X_KORBAN - X_TENGAH) * turun}
        w={W_PENUH}
        terang
        angkat={210 * (1 - turun)}
      />

      {/* korbannya: turun ke gudang, lalu naik lagi saat dibutuhkan */}
      <div
        style={{
          position: "absolute",
          left: X_KORBAN - W_PENUH / 2,
          top: yKorban,
          width: W_PENUH,
          height: BERKAS.h,
          borderRadius: 8,
          border: "3px solid var(--ink-1)",
          background: "var(--bg-elev)",
          transform: `rotate(${MIRING[0] ?? 0}deg)`,
        }}
      />

      <Tangan x={xDari + (xKe - xDari) * u} />
      <Gudang y={yGudang} />

      {/* hitungan bolak-balik: kecil di sudut, dan tidak pernah berhenti sampai
          scene habis — scene 8 yang membesarkannya */}
      <p
        className="t-label"
        style={{
          position: "absolute",
          right: 90,
          top: 620,
          fontFamily: "var(--font-mono)",
          color: "var(--warn)",
          opacity: t(d, { mulai: T_NAIK, durasi: 0.4, dari: 0, ke: 1 }),
        }}
      >
        bolak-balik ×{putaran}
      </p>
    </Scene>
  );
};
