/* T15 · scene 8 · baris-terakhir — bagian 5 [why], 24,23 dtk
   VO:        08-baris-terakhir-vo.md
   Direction: 08-baris-terakhir-direction.md

   Scene 7 menjelaskan bagaimana yang benar bisa masuk; scene ini menjelaskan
   kenapa yang tidak disebut sama sekali tidak bisa.

   DUA KEPUTUSAN:

   1. Tahap 5 menggambarkan sesuatu yang TIDAK ada: ruang kosong di sebelah
      daftar, dibingkai sebentar. Itu gambar dari "tidak ada daftar orang jahat".
      Tanpanya, sebagian penonton tetap pulang dengan gambaran firewall sebagai
      benda yang mengenali serangan.

   2. Penjaganya TETAP BERDIRI di tahap 7. "Tinggal patung" berarti ia masih di
      sana dan tidak melakukan apa-apa — penjaga yang lenyap akan terbaca sebagai
      "firewall dimatikan", dan itu hal yang berbeda.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Daftar,
  GEDUNG,
  Gedung,
  Ketukan,
  Lantai,
  N_PINTU,
  P_DAFTAR,
  SKALA_DAFTAR_SISI,
  Penjaga,
  X_GEDUNG,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
  kamera,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "baris-terakhir";

const B_BAWAH = beat(ID, 0); // "Dan yang paling menentukan justru baris paling bawah…"
const B_PENDEK = beat(ID, 1); // "Isinya cuma satu kalimat pendek."
const B_SELAIN = beat(ID, 2); // "Selain yang di atas, tidak boleh."
const B_BERARTI = beat(ID, 3); // "Itu yang bikin penjaganya berarti."
const B_HAFAL = beat(ID, 4); // "Dia tidak perlu hafal siapa saja yang harus ditolak."
const B_CUKUP = beat(ID, 5); // "Cukup tahu siapa yang boleh…"
const B_BALIK = beat(ID, 6); // "Balik baris itu jadi selain itu boleh…"

const X_DAFTAR = P_DAFTAR.x;
const Y_DAFTAR = P_DAFTAR.y;
/** Titik baris terakhir daftar — pusat zoom tahap 2. Ia tepat di atas alas
 *  kartunya, tempat baris "selain itu, tidak boleh" digambar. */
const P_AKHIR = { x: X_DAFTAR, y: Y_DAFTAR - 40 };

const PINTU_TETAP = Array.from({ length: N_PINTU }, () => ({ nyala: 0.35 }));

export const BarisTerakhir: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: daftar maju kembali. Kebalikan persis dari tahap 1 scene 7. --- */
  const maju = t(d, { mulai: B_BAWAH, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 2: kamera turun menyusuri daftar --- */
  const turun = t(d, { mulai: B_PENDEK, durasi: 1.0, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 3: baris terakhir menyala sendirian --- */
  const akhir = t(d, { mulai: B_SELAIN, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 4: ketukan asing berhenti di baris itu, tanpa diperiksa --- */
  const berhenti = (k: number) =>
    t(d, { mulai: B_BERARTI + k * 0.34, durasi: 1.0, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 5: ruang kosong di sebelah daftar, dibingkai lalu memudar --- */
  const bingkai = gambarGaris(d, 1180, { mulai: B_HAFAL + 0.15, durasi: 1.0 });
  const bingkaiPadam = t(d, { mulai: B_CUKUP, durasi: 0.6, dari: 1, ke: 0 });

  /* --- tahap 6: baris atas menyala berurutan, lalu baris terakhir lagi --- */
  const sapu = t(d, { mulai: B_CUKUP, durasi: 1.3, dari: -1, ke: 4 });

  /* --- tahap 7: baris terakhir dibalik. Daftarnya tidak berubah sedikit pun,
     tapi semuanya langsung mengalir masuk. --- */
  const dibalik = t(d, { mulai: B_BALIK + 0.5, durasi: 0.45, dari: 0, ke: 1 });
  const mengalir = t(d, { mulai: B_BALIK + 0.9, durasi: 1.4, dari: 0, ke: 1, ease: E.power1out });

  const iSapu = Math.round(sapu);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ x: P_AKHIR.x, y: P_AKHIR.y, skala: 1 + 0.28 * turun })}>
            <Lantai />
            <Gedung pintu={PINTU_TETAP} />
            <Penjaga x={X_PENJAGA} y={Y_LANTAI} hadap={1} />

            {/* --- tahap 5: ruang kosong yang memang kosong --- */}
            <g opacity={0.7 * bingkaiPadam}>
              <rect
                x={X_DAFTAR - 300}
                y={Y_DAFTAR - 300}
                width={240}
                height={300}
                rx={14}
                fill="none"
                stroke="var(--ink-2)"
                strokeWidth={4}
                {...bingkai}
              />
            </g>

            {/* --- daftar: benda utama scene ini --- */}
            <Daftar
              x={X_DAFTAR}
              y={Y_DAFTAR}
              skala={SKALA_DAFTAR_SISI + 0.26 * maju}
              baris={4}
              sorot={iSapu >= 0 && iSapu < 4 ? iSapu : -1}
              akhirNyala={akhir}
              bolehSemua={dibalik > 0.5}
            />

            {/* --- tahap 4: ketukan berhenti di baris terakhir --- */}
            {[0, 1, 2].map((k) => {
              const b = berhenti(k);
              const xHenti = X_DAFTAR - 250 - k * 96;
              const x = X_LUAR + (xHenti - X_LUAR) * b + (X_GEDUNG - xHenti) * mengalir;
              return (
                <Ketukan
                  key={k}
                  x={x}
                  y={Y_DAFTAR - 120 + k * 46}
                  skala={0.72}
                  opacity={b > 0 ? 1 - 0.8 * mengalir : 0}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
