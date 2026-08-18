/* T15 · scene 15 · diundang-masuk — bagian 7 [case], 32,60 dtk
   VO:        15-diundang-masuk-vo.md
   Direction: 15-diundang-masuk-direction.md

   Scene penutup. TITIK PUTUS ANALOGI NOMOR DUA (`naskah.md`) sekaligus kalimat
   bawa-pulang episode.

   TIGA KEPUTUSAN:

   1. Tangan yang menulis di tahap 5 datang dari DALAM, dan arah menggambarnya
      berlawanan dengan scene 7. Itu satu-satunya pembeda visual antara "penjaga
      mencatat" dan "kamu yang menyuruh", dan seluruh scene ini bergantung
      padanya.

   2. Penjaganya tetap berdiri tegak di tahap 7 dan 8. Kalau ia digambar gagal
      atau terdesak, seluruh episode berubah jadi cerita bahwa firewall itu lemah
      — padahal isinya justru bahwa ia melakukan tepat yang diminta.

   3. Frame terakhir episode sebelum tanda brand adalah GAMBAR, bukan teks. Satu
      pintu menyala di dinding yang gelap. Kalimat bawa-pulangnya sudah
      diucapkan; menuliskannya lagi di layar berarti tidak percaya pada VO-nya.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  Buku,
  GEDUNG,
  Gedung,
  I_PINTU_DIBUKA,
  Ketukan,
  Kotak,
  Lantai,
  N_PINTU,
  PINTU_HIDUP,
  P_BUKU,
  Penjaga,
  X_GEDUNG,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
  kamera,
  posPintu,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "diundang-masuk";

const B_LAGI = beat(ID, 0); // "Ada satu pintu lagi yang jauh lebih sering dipakai."
const B_DALAM = beat(ID, 1); // "Bukan dari luar. Dari dalam."
const B_KLIK = beat(ID, 2); // "Kamu klik sesuatu…"
const B_BUKU = beat(ID, 3); // "Penjaganya buka bukunya."
const B_BARIS = beat(ID, 4); // "Ada barisnya. Dan kamu yang menulis baris itu tadi."
const B_MINGGIR = beat(ID, 5); // "Jadi dia minggir, dan kotaknya lewat."
const B_BUKAN = beat(ID, 6); // "Itu bukan penjaganya kebobolan."
const B_SEHARUSNYA = beat(ID, 7); // "Itu penjaganya bekerja persis seperti seharusnya."
const B_MENJAGA = beat(ID, 8); // "Firewall menjaga pintu yang tidak pernah kamu buka."
const B_BANYAK = beat(ID, 9); // "Dan itu banyak."
const B_TANGGUNG = beat(ID, 10); // "Tapi pintu yang kamu buka sendiri…"

const X_DINDING = X_GEDUNG - GEDUNG.w / 2;
const P_BUKA = posPintu(I_PINTU_DIBUKA);

const hidup = (i: number) => PINTU_HIDUP.includes(i as (typeof PINTU_HIDUP)[number]);

export const DiundangMasuk: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: ketukan luar meredup sampai hampir hilang --- */
  const luarPadam = t(d, { mulai: B_LAGI + 0.3, durasi: 1.2, dari: 1, ke: 0.12 });

  /* --- tahap 2: arah pandang berbalik ke dalam. `scaleX -1` pada panggung
     DILARANG — teksnya ikut terbalik. Yang dibalik cuma arah gerak bendanya. --- */
  const kedalam = t(d, { mulai: B_DALAM, durasi: 0.8, dari: 0, ke: 1 });

  /* --- tahap 3: permintaan berangkat dari dalam ke luar --- */
  const kirim = t(d, { mulai: B_KLIK, durasi: 1.5, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 4 & 5: buku terbuka, barisnya ditulis DARI KANAN --- */
  const buku = t(d, { mulai: B_BUKU, durasi: 0.6, dari: 0, ke: 1, ease: E.backOut(1.2) });
  const baris = gambarGaris(d, 76, { mulai: B_BARIS + 0.15, durasi: 0.8 });
  const cocok = t(d, { mulai: B_BARIS + 0.9, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 6: penjaga minggir, kotaknya lewat --- */
  const minggir = t(d, { mulai: B_MINGGIR, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });
  const kotak = t(d, { mulai: B_MINGGIR + 0.35, durasi: 1.6, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 9 & 10: kamera mundur, pintu terkunci menyala satu demi satu --- */
  const mundur = t(d, { mulai: B_MENJAGA, durasi: 1.2, dari: 0, ke: 1, ease: E.expoOut });
  const rapat = t(d, { mulai: B_BANYAK, durasi: 0.8, dari: 0, ke: 1 });

  /* --- tahap 11: semuanya meredup, tinggal satu pintu yang terbuka --- */
  const tinggalSatu = t(d, { mulai: B_TANGGUNG + 0.4, durasi: 1.3, dari: 0, ke: 1 });

  const pintu = Array.from({ length: N_PINTU }, (_, i) => {
    const terkunci = !hidup(i);
    const nyalaKunci = t(d, {
      mulai: B_MENJAGA + 0.2 + i * 0.09,
      durasi: 0.5,
      dari: 0,
      ke: 1,
    });
    const dasar = terkunci ? 0.2 + 0.7 * nyalaKunci * (0.7 + 0.3 * rapat) : 0.6;
    return {
      nyala: dasar * (i === I_PINTU_DIBUKA ? 1 : 1 - 0.92 * tinggalSatu),
      gembok: terkunci ? 0.6 * nyalaKunci : 0,
      buka: i === I_PINTU_DIBUKA ? 1 : 0,
      sorot: i === I_PINTU_DIBUKA ? Math.max(0.4, tinggalSatu) : 0,
    };
  });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala: 1.16 - 0.16 * mundur })}>
            <Lantai />
            <Gedung pintu={pintu} />

            {/* --- tahap 1: sisa ketukan dari luar --- */}
            {[0, 1].map((k) => (
              <Ketukan
                key={k}
                x={X_LUAR + 220 + k * 150}
                y={520 + k * 190}
                skala={0.7}
                opacity={luarPadam}
              />
            ))}

            {/* --- penjaga: minggir satu langkah, tetap tegak --- */}
            <Penjaga x={X_PENJAGA - 44 * minggir} y={Y_LANTAI} hadap={1 - 2 * kedalam} />

            {/* --- tahap 3: permintaan berangkat dari dalam --- */}
            <Ketukan
              x={X_DINDING - (X_DINDING - X_LUAR) * kirim}
              y={P_BUKA.y - 66}
              skala={0.68 - 0.2 * kirim}
              opacity={kirim > 0 && kirim < 1 ? 1 : 0}
              warna={AKSEN}
            />

            {/* --- tahap 4 & 5: buku, dan tangan yang menulis DARI DALAM --- */}
            <g
              transform={`translate(${P_BUKU.x} ${P_BUKU.y}) scale(${buku} 1) translate(${-P_BUKU.x} ${-P_BUKU.y})`}
            >
              <Buku x={P_BUKU.x} y={P_BUKU.y} skala={0.62} opacity={buku} baris={0} cocok={cocok} />
              <g transform={`translate(${P_BUKU.x} ${P_BUKU.y}) scale(0.62)`}>
                {/* arah gambar dari KANAN ke kiri — kebalikan scene 7 */}
                <path
                  d="M100 -38h-76"
                  stroke={cocok > 0 ? AKSEN : "var(--ink-2)"}
                  strokeWidth={7}
                  strokeLinecap="round"
                  {...baris}
                />
              </g>
            </g>

            {/* --- tahap 6: kotaknya pulang dan lewat --- */}
            <Kotak
              x={X_LUAR + (P_BUKA.x + 120 - X_LUAR) * kotak}
              y={P_BUKA.y - 70}
              skala={0.62}
              label={1}
              opacity={kotak > 0 && kotak < 0.98 ? 1 : 0}
            />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
