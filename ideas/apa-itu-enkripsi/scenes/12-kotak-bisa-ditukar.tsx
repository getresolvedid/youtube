/* T16 · scene 12 · kotak-bisa-ditukar — bagian 6 [explaining], 26,87 dtk
   VO:        12-kotak-bisa-ditukar-vo.md
   Direction: 12-kotak-bisa-ditukar-direction.md

   Scene yang memisahkan dua hal yang hampir selalu dikira satu: TIDAK TERBACA
   dan TIDAK BERUBAH.

   TAHAP 5 ADALAH INTINYA: ketiga kotak yang rusak wajib terlihat MASIH
   TERGEMBOK. Kalau salah satunya digambar terbuka, penonton menyimpulkan
   gemboknya gagal, dan bedanya "tidak terbaca" dengan "tidak berubah" hilang
   seluruhnya.

   Segel digambar sebagai PITA yang bisa robek, bukan gembok kedua — dua gembok
   terbaca sebagai kunci yang lebih kuat, persis kesimpulan yang salah. Tanda
   segelnya BERGERIGI, sengaja tidak mirip tanda tangan bergelombang di surat
   pengenal scene 11 (`../panggung-kiriman.tsx`).
*/
import type React from "react";

import { E, getar, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Jalan,
  Kotak,
  Meja,
  N_TANGAN,
  Sosok,
  SuratPengenal,
  Tangan,
  X_KIRIM,
  X_TERIMA,
  Y_JALAN,
  Y_LANTAI,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "kotak-bisa-ditukar";

const B_BENAR = beat(ID, 0); // "Sekarang gemboknya benar…"
const B_TETAP = beat(ID, 1); // "Tetap ada yang bisa terjadi di jalan."
const B_TUKAR = beat(ID, 2); // "…masih bisa ditukar dengan kotak lain."
const B_POTONG = beat(ID, 3); // "Bisa dipotong sebagian. Bisa dikirim dua kali."
const B_UTUH = beat(ID, 4); // "Terkunci ternyata tidak sama dengan utuh."
const B_SEGEL = beat(ID, 5); // "Jadi kotaknya disegel…"
const B_TOLAK = beat(ID, 6); // "…ditolak, tanpa pernah dibuka."

const X_TAHAN = posTangan(2);
/** Ketiga kotak yang rusak, berjajar di tahap 5. */
const X_SEJAJAR = [640, 960, 1280] as const;

export const KotakBisaDitukar: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: berangkat dengan gembok yang benar + surat pengenalnya --- */
  const maju = t(d, { mulai: B_BENAR, durasi: B_TETAP - B_BENAR, dari: 0, ke: 1, ease: E.linear });
  const xKotak = X_KIRIM + (X_TAHAN - X_KIRIM) * maju;

  /* --- tahap 3: ditukar dengan kotak yang bentuknya sama persis --- */
  const keluar = t(d, { mulai: B_TUKAR + 0.2, durasi: 0.5, dari: 0, ke: 1, ease: E.power2in });
  const ganti = t(d, { mulai: B_TUKAR + 0.2, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 4: dipotong sebagian, dan datang dua kali --- */
  const potong = t(d, { mulai: B_POTONG + 0.15, durasi: 0.4, dari: 0, ke: 1 });
  const kembar = t(d, { mulai: B_POTONG + 0.7, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 5: ketiganya sejajar, semuanya MASIH tergembok --- */
  const sejajar = t(d, { mulai: B_UTUH, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 6: pita segel melintang --- */
  const segel = t(d, { mulai: B_SEGEL + 0.2, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 7: sampai di ujung, segelnya robek, kotaknya dipulangkan --- */
  const keUjung = t(d, { mulai: B_SEGEL + 1.3, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });
  const robek = t(d, { mulai: B_TOLAK, durasi: 0.4, dari: 0, ke: 1 });
  const goyang = getar(d, { mulai: B_TOLAK, durasi: 0.5, jauh: 6, putaran: 3 });
  const pulang = t(d, { mulai: B_TOLAK + 0.5, durasi: 1.5, dari: 0, ke: 1, ease: E.power2in });

  /* Tutupnya TIDAK pernah dianimasikan di sini — itu satu-satunya cara
     "ditolak tanpa dibuka" terbaca. */
  const xSegel =
    X_SEJAJAR[1] + (X_TERIMA - X_SEJAJAR[1]) * keUjung - (X_TERIMA - X_KIRIM) * pulang + goyang;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({})}>
            <Jalan />
            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} nyala={Math.abs(xKotak - posTangan(i)) < 110 ? 1 : 0} />
            ))}
            <Sosok x={X_TERIMA + 260} y={Y_LANTAI} skala={0.86} />

            {/* surat pengenal dari scene lalu, masih menempel di sisi kotak */}
            <g opacity={0.85 * (1 - sejajar)}>
              <SuratPengenal x={xKotak} y={Y_JALAN - 250} skala={0.5} tanda={1} />
            </g>

            {/* kotak asli, digeser keluar frame saat ditukar */}
            <g opacity={(1 - keluar) * (1 - sejajar)}>
              <Kotak x={xKotak} y={Y_JALAN + 260 * keluar} skala={0.72} gembok={1} />
            </g>

            {/* kotak pengganti — bentuknya sama persis, sama tergembok */}
            <g opacity={ganti * (1 - sejajar)}>
              <Kotak x={xKotak} y={Y_JALAN + 260 * (1 - ganti)} skala={0.72} gembok={1} />
            </g>

            {/* tahap 5: tiga kerusakan berjajar, SEMUANYA masih terkunci */}
            <g opacity={sejajar * (1 - segel)}>
              <Kotak x={X_SEJAJAR[0]} y={Y_JALAN} skala={0.72} gembok={1} />
              <Kotak x={X_SEJAJAR[1]} y={Y_JALAN} skala={0.72} gembok={1} potong={potong} />
              <Kotak x={X_SEJAJAR[2] - 40} y={Y_JALAN} skala={0.72} gembok={1} />
              <g opacity={kembar}>
                <Kotak x={X_SEJAJAR[2] + 60} y={Y_JALAN} skala={0.72} gembok={1} />
              </g>
            </g>

            {/* tahap 6 & 7: yang disegel, lalu dipulangkan tanpa pernah dibuka */}
            <g opacity={segel}>
              <Kotak
                x={xSegel}
                y={Y_JALAN}
                skala={0.72}
                gembok={1}
                segel={segel}
                segelRobek={robek}
              />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
