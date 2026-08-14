/* T15 · scene 9 · dari-atas — bagian 6 [explaining], 29,97 dtk
   VO:        09-dari-atas-vo.md
   Direction: 09-dari-atas-direction.md

   Lapis L2 pertama di episode: daftar yang sama, dilihat sebagai URUTAN dan
   bukan sebagai kumpulan.

   TIGA KEPUTUSAN:

   1. Penanda baca BERHENTI, tidak memudar. Posisinya yang berhenti di tengah
      daftar adalah seluruh isi tahap 4; penanda yang memudar terbaca sebagai
      "pembacaannya selesai".

   2. Baris sisipan mendorong seluruh daftar TURUN dalam tween yang sama, supaya
      terbaca sebagai menyelip dan bukan sebagai baris yang menimpa.

   3. Daftar tidak pernah dihapus di tahap 9, cuma jadi abu-abu. Daftar yang
      menghilang berarti aturannya dihapus; daftar yang abu-abu berarti aturannya
      ada dan tidak berlaku — jauh lebih dekat ke kenyataannya.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Daftar,
  Gedung,
  Ketukan,
  Lantai,
  N_PINTU,
  PenandaBaca,
  Sosok,
  X_GEDUNG,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
  kamera,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "dari-atas";

const B_SEKALIGUS = beat(ID, 0); // "Dan daftar itu tidak dibaca sekaligus."
const B_ATAS = beat(ID, 1); // "Dibacanya dari atas, satu baris demi satu baris."
const B_BERHENTI = beat(ID, 2); // "Begitu ketemu baris yang cocok, dia berhenti."
const B_BAWAH = beat(ID, 3); // "Yang di bawahnya tidak pernah terbaca."
const B_SELIP = beat(ID, 4); // "Sekarang, satu baris longgar diselipkan…"
const B_SIAPA = beat(ID, 5); // "Bunyinya boleh untuk siapa saja."
const B_UTUH = beat(ID, 6); // "Sisa daftarnya masih ada, masih rapi…"
const B_SEMPAT = beat(ID, 7); // "Cuma tidak ada satu pun yang sempat dibaca lagi."
const B_SALAH = beat(ID, 8); // "Satu baris di tempat yang salah…"

/** Daftar jadi benda utama di scene ini, jadi ia pindah ke ruang kosong di kiri
 *  — BUKAN ke tengah frame. Tengah frame sudah ditempati dinding gedung, dan
 *  kartu setinggi ini di sana menutup empat pintu sekaligus. */
const X_DAFTAR = 470;
const Y_DAFTAR = Y_LANTAI - 60;
/** Penjaga digeser ke kanan HANYA di scene ini, jadi siluet di antara daftar dan
 *  dinding. Ia tidak sedang jadi subjek; yang dibaca penonton daftarnya. */
const X_PENJAGA_SILUET = 790;
const SKALA_DAFTAR = 0.92;
const H_BARIS = 54 * SKALA_DAFTAR;

/** Titik tengah baris ke-i pada daftar, koordinat frame. Diturunkan dari
 *  geometri `Daftar` — bukan angka yang ditebak, supaya penanda baca tidak
 *  pernah meleset dari barisnya. */
const yBaris = (i: number): number => {
  const tinggi = (46 + 7 * 54) * SKALA_DAFTAR;
  return Y_DAFTAR - tinggi + 46 * SKALA_DAFTAR + i * H_BARIS + H_BARIS / 2;
};

const PINTU_TETAP = Array.from({ length: N_PINTU }, () => ({ nyala: 0.22 }));

/** Baris yang cocok di pembacaan pertama. */
const I_COCOK = 2;

export const DariAtas: React.FC = () => {
  const d = useDetik();

  /* --- kamera: dekat sepanjang scene, mundur di tahap 7 --- */
  const dekat = t(d, { mulai: B_SEKALIGUS, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const mundur = t(d, { mulai: B_UTUH, durasi: 1.0, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 2 & 3: penanda baca turun lalu BERHENTI di baris yang cocok --- */
  const baca = t(d, {
    mulai: B_ATAS,
    durasi: 1.5,
    dari: -0.6,
    ke: I_COCOK,
    ease: E.linear,
  });
  const sorot = t(d, { mulai: B_BERHENTI, durasi: 0.4, dari: 0, ke: 1 });

  /* --- tahap 4: baris di bawahnya meredup --- */
  const redup = t(d, { mulai: B_BAWAH, durasi: 0.7, dari: 0, ke: 1 });

  /* --- tahap 5 & 6: baris longgar diselipkan di paling atas --- */
  const selip = t(d, { mulai: B_SELIP, durasi: 0.7, dari: 0, ke: 1, ease: E.backOut(1.1) });
  const longgar = t(d, { mulai: B_SIAPA, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 8: semua berhenti di baris pertama, semuanya lewat --- */
  const alir = (k: number) =>
    t(d, { mulai: B_SEMPAT + k * 0.32, durasi: 1.15, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 9: sisa daftar jadi abu-abu dan tinggal begitu --- */
  const mati = t(d, { mulai: B_SALAH, durasi: 0.9, dari: 0, ke: 1 });

  const adaSelip = selip > 0.5;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g
            transform={kamera({
              x: X_DAFTAR,
              y: yBaris(2),
              skala: 1 + 0.25 * dekat * (1 - mundur),
            })}
          >
            <Lantai opacity={0.5} />
            <Gedung pintu={PINTU_TETAP} opacity={0.3} />
            <Sosok x={X_PENJAGA_SILUET} y={Y_LANTAI} topi hadap={1} opacity={0.3} />

            <g transform={`translate(0 ${selip * H_BARIS})`}>
              <Daftar
                x={X_DAFTAR}
                y={Y_DAFTAR}
                skala={SKALA_DAFTAR}
                baris={4}
                sorot={sorot > 0.5 && !adaSelip ? I_COCOK : adaSelip ? -1 : -1}
                terbaca={baca}
                akhirNyala={0.4}
                redup={Math.max(redup * (1 - selip), mati)}
              />
            </g>

            {/* baris longgar: digambar terpisah di atas daftar supaya ia benar-
                benar terbaca sebagai sisipan, bukan sebagai baris pertama yang
                berubah warna */}
            <g opacity={selip}>
              <rect
                x={X_DAFTAR - 168 * SKALA_DAFTAR}
                y={yBaris(0) - 15 * SKALA_DAFTAR}
                width={336 * SKALA_DAFTAR}
                height={30 * SKALA_DAFTAR}
                rx={8}
                fill="var(--warn)"
                opacity={0.55 + 0.45 * longgar}
              />
            </g>

            {/* --- tahap 2: penanda baca --- */}
            <PenandaBaca
              x={X_DAFTAR - 210 * SKALA_DAFTAR}
              y={yBaris(Math.max(0, baca)) + (adaSelip ? H_BARIS : 0)}
              skala={SKALA_DAFTAR}
              opacity={baca > -0.5 ? 1 - selip * 0.65 : 0}
            />

            {/* --- tahap 8: ketukan berhenti di baris pertama, semuanya lewat --- */}
            {[0, 1, 2, 3].map((k) => {
              const a = alir(k);
              const xHenti = X_DAFTAR - 320;
              return (
                <Ketukan
                  key={k}
                  x={X_LUAR + (xHenti - X_LUAR) * a + (X_GEDUNG - xHenti) * Math.max(0, a - 0.5) * 2}
                  y={yBaris(0) - 90 + k * 44}
                  skala={0.6}
                  opacity={a > 0 && a < 0.98 ? 1 : 0}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
