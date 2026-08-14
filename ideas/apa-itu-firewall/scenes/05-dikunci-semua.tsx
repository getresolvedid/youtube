/* T15 · scene 5 · dikunci-semua — bagian 3 [problem], 28,19 dtk
   VO:        05-dikunci-semua-vo.md
   Direction: 05-dikunci-semua-direction.md

   Scene penutup bagian 3, dan scene yang menentukan apakah bagian 4 terasa
   sebagai jawaban atau sebagai definisi.

   TIGA KEPUTUSAN:

   1. Jalur jawaban dan jalur ketukan BERIMPIT, bukan sejajar. Dua garis
      berdekatan masih terbaca sebagai dua jalan; satu garis yang dilewati dua
      benda terbaca sebagai satu jalan. Keduanya memakai `JALUR_Y` yang sama.

   2. Dua benda di tahap 6 memakai komponen `Ketukan` yang SAMA PERSIS. Dua
      komponen berbeda cepat atau lambat jadi dua gambar berbeda, dan seluruh
      scene ini bergantung pada keduanya tidak bisa dibedakan.

   3. Tanda centang dan silang DICABUT lagi di tahap 8. Kalau keduanya tinggal di
      layar, penonton pulang dengan kesan bahwa keduanya memang bisa dibedakan
      dari luar — kebalikan persis dari isi scene ini.
*/
import type React from "react";

import { E, getar, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  GEDUNG,
  Gedung,
  JALUR_Y,
  Ketukan,
  Lantai,
  N_PINTU,
  X_GEDUNG,
  X_LUAR,
  kamera,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "dikunci-semua";

const B_KUNCI = beat(ID, 0); // "Jadi kunci saja semuanya…"
const B_TEMBUS = beat(ID, 1); // "Sekarang tidak ada satu pun ketukan yang tembus."
const B_LIHAT = beat(ID, 2); // "Tapi lihat apa lagi yang ikut tertahan di luar."
const B_HALAMAN = beat(ID, 3); // "Halaman yang kamu buka sendiri…"
const B_SAMA = beat(ID, 4); // "Lewat pintu yang sama, dari arah yang sama."
const B_PERSIS = beat(ID, 5); // "Dari sini, jawabanmu dan orang asing…"
const B_HARUS = beat(ID, 6); // "Yang satu harus masuk, yang satu tidak boleh."
const B_CUMA = beat(ID, 7); // "Dan keduanya cuma ketukan."

const X_DINDING = X_GEDUNG - GEDUNG.w / 2;
/** Titik berhenti dua benda identik di tahap 6 — berdampingan, jarak sempit. */
const X_TUNGGU_A = X_DINDING - 260;
const X_TUNGGU_B = X_DINDING - 110;

export const DikunciSemua: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: semua pintu digembok, cepat, terbaca sebagai SATU tindakan --- */
  const pintu = Array.from({ length: N_PINTU }, (_, i) => ({
    nyala: 0.2,
    gembok: t(d, { mulai: B_KUNCI + i * 0.06, durasi: 0.35, dari: 0, ke: 1 }),
  }));

  /* --- tahap 2: ketukan memantul, tidak ada yang masuk --- */
  const pantul = (mulai: number) => {
    const maju = t(d, { mulai, durasi: 1.1, dari: 0, ke: 1, ease: E.power1out });
    const balik = t(d, { mulai: mulai + 1.1, durasi: 1.0, dari: 0, ke: 1, ease: E.power2in });
    const x = X_LUAR + (X_DINDING - X_LUAR) * maju - (X_DINDING - X_LUAR) * 0.75 * balik;
    return { x, getar: getar(d, { mulai: mulai + 1.05, durasi: 0.4, jauh: 9 }) };
  };
  const p1 = pantul(B_TEMBUS);
  const p2 = pantul(B_TEMBUS + 0.75);
  const pantulPadam = t(d, { mulai: B_LIHAT, durasi: 0.5, dari: 1, ke: 0 });

  /* --- tahap 3: kamera bergeser ke ruang kosong di luar --- */
  const geser = t(d, { mulai: B_LIHAT, durasi: 1.0, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 4: permintaan berangkat dari DALAM ke luar --- */
  const berangkat = t(d, { mulai: B_HALAMAN, durasi: 1.3, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 5: jawabannya pulang lewat jalur yang sama persis --- */
  const pulang = t(d, { mulai: B_SAMA, durasi: 1.4, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 6, 7, 8 --- */
  const berdiri = t(d, { mulai: B_PERSIS, durasi: 0.6, dari: 0, ke: 1 });
  const tanda = masuk(d, { mulai: B_HARUS + 0.1, durasi: 0.5, geser: 14 });
  const cabut = t(d, { mulai: B_CUMA + 0.25, durasi: 0.7, dari: 1, ke: 0 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala: 1 + 0.14 * geser, dx: 130 * geser })}>
            <Lantai />
            <Gedung pintu={pintu} />

            {/* --- tahap 2: dua ketukan memantul --- */}
            {[p1, p2].map((p, i) => (
              <Ketukan
                key={i}
                x={p.x + p.getar}
                y={i === 0 ? JALUR_Y : JALUR_Y - 150}
                skala={0.9}
                opacity={pantulPadam}
              />
            ))}

            {/* --- tahap 4: permintaan keluar. Satu-satunya benda di scene ini
                yang bergerak dari kanan ke kiri. --- */}
            <Ketukan
              x={X_DINDING - (X_DINDING - X_LUAR) * berangkat}
              y={JALUR_Y}
              skala={0.9 - 0.35 * berangkat}
              opacity={berangkat > 0 && berangkat < 1 ? 1 - berangkat * 0.4 : 0}
            />

            {/* --- tahap 5: jawabannya pulang, jalur yang SAMA --- */}
            <Ketukan
              x={X_LUAR + (X_TUNGGU_A - X_LUAR) * pulang}
              y={JALUR_Y}
              skala={0.9}
              opacity={pulang > 0 ? 1 : 0}
            />

            {/* --- tahap 6: dua benda identik berdampingan --- */}
            <g opacity={berdiri}>
              <Ketukan x={X_TUNGGU_B} y={JALUR_Y} skala={0.9} />
            </g>

            {/* --- tahap 7 & 8: tanda yang muncul lalu dicabut lagi --- */}
            <g style={{ opacity: tanda.opacity * cabut, transform: tanda.transform }}>
              <path
                d={`M${X_TUNGGU_A - 24} ${JALUR_Y - 112}l20 22 38 -46`}
                fill="none"
                stroke="var(--ok)"
                strokeWidth={9}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M${X_TUNGGU_B - 22} ${JALUR_Y - 132}l44 44M${X_TUNGGU_B + 22} ${JALUR_Y - 132}l-44 44`}
                stroke="var(--bad)"
                strokeWidth={9}
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
