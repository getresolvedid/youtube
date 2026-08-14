/* T16 · scene 13 · kunci-yang-dibuang — bagian 6 [explaining], 24,23 dtk
   VO:        13-kunci-yang-dibuang-vo.md
   Direction: 13-kunci-yang-dibuang-direction.md

   SATU-SATUNYA SCENE YANG BERGERAK DI WAKTU, bukan di tempat. Panggungnya tidak
   berubah; yang bertambah cuma satu tumpukan di BAWAH jalan yang terus
   meninggi — ruang yang belum pernah dipakai scene mana pun.

   TAHAP 4 HARUS TERJADI SEBELUM TAHAP 5. Penonton harus melihat kerugiannya
   dulu; kalau kuncinya langsung digambar dibuang, yang terbaca cuma kebiasaan
   rapi, bukan jawaban atas sesuatu.

   Tumpukan yang terbuka di tahap 4 dibuka SEMUANYA pada waktu yang sama persis.
   Kalau di-stagger, ia terbaca sebagai kerja keras — bukan sebagai runtuh
   sekaligus.

   Scene ini yang DIPANGKAS DULUAN kalau episode kepanjangan (naskah.md), jadi
   tidak ada nama baru dan tidak ada titik putus analogi yang dititipkan di sini.
*/
import type React from "react";

import { E, getar, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Jalan,
  Kotak,
  Kunci,
  Meja,
  N_TANGAN,
  Sosok,
  Tangan,
  X_KIRIM,
  X_TERIMA,
  Y_JALAN,
  Y_LANTAI,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "kunci-yang-dibuang";

const B_SATU = beat(ID, 0); // "Satu lagi, dan ini yang paling jarang kelihatan."
const B_SALIN = beat(ID, 1); // "Ada yang menyalin kotakmu di jalan…"
const B_TUNGGU = beat(ID, 2); // "Dia tidak bisa membukanya hari ini. Dia menunggu."
const B_ITUITU = beat(ID, 3); // "Kalau kuncinya itu-itu saja…"
const B_BUANG = beat(ID, 4); // "Makanya kuncinya dibuang…"
const B_COCOK = beat(ID, 5); // "…tumpukan kotak tanpa kunci yang cocok."

const X_SALIN = posTangan(2);
const Y_TUMPUK = Y_LANTAI + 40;

export const KunciYangDibuang: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 2: kotak berjalan biasa, satu tangan menyalinnya --- */
  const maju = t(d, { mulai: B_SATU, durasi: B_SALIN - B_SATU + 1.0, dari: 0, ke: 1, ease: E.linear });
  const xKotak = X_KIRIM + (X_TERIMA - X_KIRIM) * maju;
  const jatuh = t(d, { mulai: B_SALIN + 0.3, durasi: 0.7, dari: 0, ke: 1, ease: E.power1in });

  /* --- tahap 3 & 4: tumpukan meninggi, lalu terbuka SEMUA sekaligus --- */
  const tinggi = t(d, { mulai: B_TUNGGU, durasi: 3.4, dari: 1, ke: 6 });
  const bukaSemua = t(d, { mulai: B_ITUITU + 1.6, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });
  const kunciTurun = t(d, { mulai: B_ITUITU + 1.0, durasi: 0.7, dari: 0, ke: 1, ease: E.power1in });

  /* --- tahap 5: adegan diulang — kunci dipakai, lalu dipatahkan dan dibuang --- */
  const ulang = t(d, { mulai: B_BUANG, durasi: 0.4, dari: 0, ke: 1 });
  const patah = t(d, { mulai: B_BUANG + 0.7, durasi: 0.5, dari: 0, ke: 1 });
  const lempar = t(d, { mulai: B_BUANG + 1.1, durasi: 0.8, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 6: kunci baru dicoba, tidak satu pun cocok --- */
  const coba = t(d, { mulai: B_COCOK + 0.2, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out });
  const gagal =
    getar(d, { mulai: B_COCOK + 0.9, durasi: 0.5, jauh: 6, putaran: 3 }) +
    getar(d, { mulai: B_COCOK + 1.6, durasi: 0.5, jauh: 6, putaran: 3 }) +
    getar(d, { mulai: B_COCOK + 2.3, durasi: 0.5, jauh: 6, putaran: 3 });

  const nTumpuk = Math.max(1, Math.round(tinggi));
  /* Terbuka sesudah tahap 4, TERTUTUP LAGI sesudah kuncinya dibuang. */
  const bukaTumpuk = bukaSemua * (1 - ulang);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ y: Y_JALAN + 60, skala: 0.86 })}>
            <Jalan />
            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} nyala={i === 2 && d > B_SALIN ? 1 : 0} />
            ))}
            <Sosok x={X_TERIMA + 260} y={Y_LANTAI} skala={0.86} />

            {/* kotak yang tetap berjalan — yang disalin tidak pernah tahu */}
            <Kotak x={xKotak} y={Y_JALAN} skala={0.62} gembok={1} />

            {/* salinannya jatuh ke bawah jalan */}
            {jatuh > 0 && jatuh < 1 && (
              <Kotak
                x={X_SALIN}
                y={Y_JALAN + (Y_TUMPUK - Y_JALAN) * jatuh}
                skala={0.62}
                gembok={1}
                opacity={0.55}
              />
            )}

            {/* tumpukan di ruang bawah jalan — makin tinggi, makin lama menunggu */}
            {Array.from({ length: nTumpuk }, (_, k) => (
              <Kotak
                key={k}
                x={X_SALIN - 150 + (k % 3) * 150}
                y={Y_TUMPUK - Math.floor(k / 3) * 84}
                skala={0.55}
                gembok={1 - bukaTumpuk}
                buka={bukaTumpuk}
                opacity={0.85}
              />
            ))}

            {/* kunci yang membuka semuanya sekaligus, lalu dipatahkan dan dibuang */}
            <g opacity={kunciTurun * (1 - lempar)}>
              <Kunci
                x={X_SALIN + 320}
                y={Y_JALAN + 120 + 200 * kunciTurun + 400 * lempar}
                skala={1.4}
                rot={40 * lempar}
                patah={patah}
              />
            </g>

            {/* kunci baru: dicoba, dan tidak satu pun cocok */}
            <g opacity={coba}>
              <Kunci x={X_SALIN + 320 + gagal} y={Y_TUMPUK - 120} skala={1.4} />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
