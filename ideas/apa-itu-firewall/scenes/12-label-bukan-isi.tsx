/* T15 · scene 12 · label-bukan-isi — bagian 6 [explaining], 29,53 dtk
   VO:        12-label-bukan-isi-vo.md
   Direction: 12-label-bukan-isi-direction.md

   TITIK PUTUS ANALOGI NOMOR SATU (`naskah.md`), dan batas terpenting yang harus
   dibawa pulang penonton.

   DUA KEPUTUSAN:

   1. Tahap 7 memperlihatkan isi kotak ke PENONTON, tidak pernah ke penjaga. Itu
      seluruh ketegangan scene ini: kita tahu ada isinya, dan penjaganya tidak
      akan pernah tahu. Isinya netral — bukan tengkorak, bukan warna bahaya.

   2. TAHAP 9 BERGANTUNG PADA SUMBER YANG BELUM ADA. Baris VO terakhir memuat
      satu-satunya klaim tanpa sumber di episode ini ("jauh lebih lambat",
      `naskah.md § Sumber`). Kalau sampai gerbang dibuka sumbernya belum ketemu,
      baris itu dicoret dan blok bertanda TAHAP 9 di bawah ikut dicabut.
*/
import type React from "react";

import { E, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Daftar,
  Kotak,
  Lantai,
  PINTU,
  P_DAFTAR,
  Pintu,
  SKALA_DAFTAR_SISI,
  Sosok,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
  posPintu,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "label-bukan-isi";

const B_SATU = beat(ID, 0); // "Tapi ada satu hal yang tidak dia lakukan…"
const B_LIHAT = beat(ID, 1); // "Lihat waktu sebuah kotak sampai di depannya."
const B_BACA = beat(ID, 2); // "Dia baca labelnya."
const B_DARI = beat(ID, 3); // "Dari mana, dan mau ke pintu nomor berapa."
const B_COCOK = beat(ID, 4); // "Cocok dengan daftarnya, kotaknya lewat."
const B_TUTUP = beat(ID, 5); // "Kotaknya sendiri tidak pernah dibuka."
const B_URUSAN = beat(ID, 6); // "Isinya memang bukan urusan dia."
const B_JENIS = beat(ID, 7); // "Makanya ada penjaga jenis lain…"
const B_LAMBAT = beat(ID, 8); // "Dan membuka kotak itu pekerjaan yang jauh lebih lambat."

const P_PINTU = posPintu(2);
const Y_KOTAK = P_PINTU.y - PINTU.h / 2;
const X_PERIKSA = X_PENJAGA - 150;

export const LabelBukanIsi: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: panggung menyempit, penjaga menghadap kiri lagi --- */
  const bersih = t(d, { mulai: B_SATU, durasi: 0.7, dari: 0, ke: 1 });

  /* --- tahap 2: kotak masuk dan berhenti --- */
  const datang = t(d, { mulai: B_LIHAT, durasi: 1.1, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 3: kepala menunduk ke label --- */
  const tunduk = t(d, { mulai: B_BACA, durasi: 0.5, dari: 0, ke: 8 });

  /* --- tahap 4: label menyala. Opasitas saja: label yang bergerak terbaca
     sebagai ditempel, padahal ia memang sudah ada di situ. --- */
  const label = t(d, { mulai: B_DARI, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 5: dicocokkan lalu lewat --- */
  const daftar = t(d, { mulai: B_COCOK - 0.35, durasi: 0.5, dari: 0, ke: 1 });
  const lewat = t(d, { mulai: B_COCOK + 0.35, durasi: 1.5, dari: 0, ke: 1, ease: E.power1out });
  const buka = t(d, { mulai: B_COCOK + 0.3, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 7: isi kotak, sekilas, untuk penonton saja --- */
  const isi = tPB(d, B_URUSAN);

  /* --- TAHAP 8 & 9 --- */
  const jenis = t(d, { mulai: B_JENIS, durasi: 0.7, dari: 0, ke: 1, ease: E.expoOut });
  const antre = (k: number) =>
    t(d, { mulai: B_LAMBAT + k * 0.42, durasi: 1.2, dari: 0, ke: 1, ease: E.power1out });

  /* Kotaknya berhenti DI pintu, bukan di belakangnya: kalau ia terus berjalan ke
     kanan, ia mendarat tepat di badan penjaga kedua. Yang masuk ke dalam gedung
     memang tidak perlu terlihat lagi — itu sebabnya ia memudar di ujung. */
  const xKotak = X_LUAR + (X_PERIKSA - X_LUAR) * datang + (P_PINTU.x + 40 - X_PERIKSA) * lewat;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Lantai />

          {/* Sepotong dinding di belakang pintunya. Panggung scene ini memang
              menyempit, tapi pintu yang tidak menempel pada apa pun berhenti
              terbaca sebagai pintu — ia jadi persegi melayang. */}
          <rect
            x={P_PINTU.x - 190}
            y={Y_LANTAI - 430}
            width={380}
            height={430}
            rx={12}
            fill="var(--bg-elev)"
            stroke="var(--line)"
            strokeWidth={5}
            opacity={bersih}
          />

          {/* satu pintu saja: semua yang tidak dibutuhkan dilepas dari layar */}
          <Pintu {...P_PINTU} nyala={1} buka={buka} nomorTampil={bersih} />

          {/* --- TAHAP 8 & 9: penjaga kedua di belakang pintu, dan antreannya ---
              Blok ini yang dicabut kalau klaim "jauh lebih lambat" tidak dapat
              sumber. Sisa scene tetap utuh tanpanya. */}
          <g opacity={jenis}>
            <Sosok x={P_PINTU.x + 300} y={Y_LANTAI} topi hadap={1} skala={0.86} />
            {/* meja periksa, dengan satu kotak yang TERBUKA di atasnya */}
            <path
              d={`M${P_PINTU.x + 390} ${Y_LANTAI - 150}h220`}
              stroke="var(--ink-1)"
              strokeWidth={9}
              strokeLinecap="round"
            />
            <Kotak x={P_PINTU.x + 500} y={Y_LANTAI - 202} skala={0.55} isi={1} />
            {/* Antreannya menjorok ke kanan, jadi jarak antar kotak dan titik
                terjauhnya dipatok supaya kotak terakhir tidak keluar frame. */}
            {[0, 1, 2].map((k) => {
              const a = antre(k);
              return (
                <Kotak
                  key={k}
                  x={P_PINTU.x + 600 - k * 105 * a}
                  y={Y_LANTAI - 202}
                  skala={0.5}
                  opacity={a}
                />
              );
            })}
          </g>

          {/* --- penjaga pertama --- */}
          <g transform={`rotate(${tunduk} ${X_PENJAGA} ${Y_LANTAI - 116})`}>
            <Sosok x={X_PENJAGA} y={Y_LANTAI} topi hadap={1} />
          </g>

          {/* --- daftar, muncul sebentar saat dicocokkan --- */}
          <g opacity={daftar * (1 - lewat)}>
            <Daftar
              x={P_DAFTAR.x}
              y={P_DAFTAR.y}
              skala={SKALA_DAFTAR_SISI}
              baris={4}
              sorot={1}
            />
          </g>

          {/* --- kotaknya: pitanya tidak pernah terangkat --- */}
          <Kotak
            x={xKotak}
            y={Y_KOTAK}
            skala={0.8}
            label={label}
            isi={isi}
            opacity={datang > 0 ? 1 - Math.max(0, lewat - 0.75) * 4 : 0}
          />
        </svg>
      </div>
    </Scene>
  );
};

/** Bayangan isi kotak: naik lalu turun dalam satu ayunan, pelan. Dipisah jadi
 *  fungsi supaya jelas ia BUKAN keadaan yang bertahan — isinya cuma terlihat
 *  sekilas, dan cuma oleh penonton. */
function tPB(d: number, mulai: number): number {
  return tPP(d, { mulai, durasi: 2.4, dari: 0, ke: 1 });
}
