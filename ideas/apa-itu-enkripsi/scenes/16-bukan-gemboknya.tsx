/* T16 · scene 16 · bukan-gemboknya — bagian 7 [case], 29,07 dtk
   VO:        16-bukan-gemboknya-vo.md
   Direction: 16-bukan-gemboknya-direction.md

   Scene penutup. TIDAK ADA BENDA BARU SAMA SEKALI — ketiga sebabnya sudah pernah
   terlihat (kunci dari scene 8, ruang antara dari scene 15, surat pengenal dari
   scene 11), dan yang baru cuma urutannya. Benda baru di scene penutup membuat
   penonton mengira ada bahan yang belum dijelaskan.

   TAHAP 5 WAJIB MEMPERLIHATKAN GEMBOKNYA TETAP UTUH. Seluruh kalimat bawa-pulang
   bergantung padanya; gembok yang digambar retak menyampaikan kebalikan dari
   yang dikatakan.

   Tidak ada teks kesimpulan di layar — kalimat bawa-pulang milik VO. Menulisnya
   juga di layar membuatnya terbaca sebagai slide penutup.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  Bangunan,
  Gembok,
  Jalan,
  Kotak,
  Kunci,
  Meja,
  N_TANGAN,
  Sosok,
  SuratPengenal,
  Tangan,
  X_ANTARA,
  X_KIRIM,
  X_TERIMA,
  Y_JALAN,
  Y_LANTAI,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "bukan-gemboknya";

const B_CURIGA = beat(ID, 0); // "…gemboknya justru curiga terakhir."
const B_KUNCI = beat(ID, 1); // "…kuncinya ditaruh di tempat yang bisa diambil orang."
const B_ANTARA = beat(ID, 2); // "Atau kotaknya memang dibuka di ruang antara…"
const B_PENGENAL = beat(ID, 3); // "Atau kamu sendiri yang membukakan…"
const B_BEKERJA = beat(ID, 4); // "Gemboknya bekerja."
const B_JANJI = beat(ID, 5); // "Dia cuma tidak pernah menjanjikan hal-hal itu."
const B_JALAN = beat(ID, 6); // "Yang dijaga gembok adalah jalannya."

/** Ketiga sebab, berjajar di tahap 5 — posisi tetap sejak masing-masing muncul. */
const X_SEBAB = [430, 960, 1490] as const;
const Y_SEBAB = Y_JALAN - 330;

export const BukanGemboknya: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: jalur bawah scene lalu keluar, kotak kembali ke tengah --- */
  const satu = t(d, { mulai: B_CURIGA, durasi: 0.8, dari: 0, ke: 1, ease: E.power2in });

  const sebab1 = masuk(d, { mulai: B_KUNCI + 0.15, durasi: 0.5, geser: 20 });
  const sebab2 = masuk(d, { mulai: B_ANTARA + 0.15, durasi: 0.5, geser: 20 });
  const sebab3 = masuk(d, { mulai: B_PENGENAL + 0.15, durasi: 0.5, geser: 20 });

  /* --- tahap 6: ketiga sebab meredup, gemboknya tetap terang --- */
  const redup = 1 - 0.85 * t(d, { mulai: B_JANJI + 0.2, durasi: 0.7, dari: 0, ke: 1 });

  /* --- tahap 7: jalan menyala penuh, lalu cuma kedua ujungnya --- */
  const nyala = t(d, { mulai: B_JALAN, durasi: 0.8, dari: 0, ke: 1 });
  const tengahPadam = t(d, { mulai: B_JALAN + 1.2, durasi: 1.0, dari: 0, ke: 1 });
  const mundur = t(d, { mulai: B_JALAN, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala: 0.86 + 0.14 * mundur })}>
            <Jalan opacity={0.35 + 0.65 * nyala * (1 - 0.75 * tengahPadam)} />
            {/* kedua ujung jalan yang tetap terang di frame terakhir */}
            <g opacity={nyala}>
              <path
                d={`M40 ${Y_JALAN}h300M1580 ${Y_JALAN}h300`}
                stroke={AKSEN}
                strokeWidth={5}
                strokeLinecap="round"
                opacity={tengahPadam}
              />
            </g>

            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} opacity={1 - 0.5 * tengahPadam} />
            ))}
            <Sosok x={X_TERIMA + 260} y={Y_LANTAI} skala={0.86} opacity={0.8} />

            {/* kotak tergembok di tengah — utuh, dan tetap utuh sampai frame terakhir */}
            <Kotak x={960} y={Y_JALAN} gembok={1} label={1} skala={0.72 + 0.28 * satu} />

            {/* sebab 1: kunci yang tergeletak DI LUAR meja, di lantai */}
            <g style={{ opacity: sebab1.opacity * redup, transform: sebab1.transform }}>
              <Kunci x={X_SEBAB[0]} y={Y_SEBAB} skala={1.5} rot={18} />
            </g>

            {/* sebab 2: ruang antara, isinya terbaca di sana */}
            <g style={{ opacity: sebab2.opacity * redup, transform: sebab2.transform }}>
              <Bangunan x={X_SEBAB[1]} y={Y_SEBAB + 40} skala={0.5} nyala={1} />
            </g>

            {/* sebab 3: surat pengenal yang namanya benar */}
            <g style={{ opacity: sebab3.opacity * redup, transform: sebab3.transform }}>
              <SuratPengenal x={X_SEBAB[2]} y={Y_SEBAB} skala={0.75} tanda={1} />
              <Gembok x={X_SEBAB[2] + 150} y={Y_SEBAB} skala={1.1} terbuka={1} />
            </g>

            {/* kunci yang seharusnya tidak pernah keluar meja — sekarang di lantai */}
            <g opacity={sebab1.opacity * redup}>
              <Kunci x={X_TERIMA - 260} y={Y_LANTAI - 10} skala={1.1} rot={-14} />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
