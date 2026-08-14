/* T16 · scene 6 · belum-pernah-ketemu — bagian 3 [problem], 20,70 dtk
   VO:        06-belum-pernah-ketemu-vo.md
   Direction: 06-belum-pernah-ketemu-direction.md

   Scene terakhir bagian 3. Ia menutup jalan keluar terakhir — "ya sudah,
   kuncinya disepakati dulu sebelumnya" — dan berakhir dengan rumusan masalah
   yang terdengar mustahil. Bagian 4 hanya bekerja kalau tahap 5 benar-benar
   terasa buntu.

   SOSOK PENERIMA TIDAK BOLEH DIBERI WAJAH, SENYUM, ATAU PAPAN NAMA. Ia harus
   tetap terasa asing sampai scene 11, tempat pertanyaan "ini benar dia atau
   bukan" akhirnya ditanyakan. Wajah ramah di sini menjawab pertanyaan itu
   sepuluh menit terlalu awal.

   Kalender, bukan jam: yang tidak pernah terjadi adalah PERTEMUAN sebelumnya,
   dan satuannya hari.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  ABU,
  GELAP,
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

const ID = "belum-pernah-ketemu";

const B_SULIT = beat(ID, 0); // "Dan itu belum bagian yang paling sulit."
const B_LIHAT = beat(ID, 1); // "Lihat lagi siapa yang kamu kirimi."
const B_TOKO = beat(ID, 2); // "Toko yang baru kamu buka pagi tadi."
const B_KETEMU = beat(ID, 3); // "Kamu belum pernah bertemu dia."
const B_KEMARIN = beat(ID, 4); // "…tidak pernah ada hari kemarin…"
const B_SEKARANG = beat(ID, 5); // "Rahasianya harus disepakati sekarang…"

const X_KUNCI = X_TERIMA - 150;
/** Titik pertemuan garis waktu — ruang kosong di atas jalan, bukan di bawahnya:
 *  bawah jalan sudah milik tangan, dan nanti milik tumpukan di scene 13. */
const P_LALU = { x: 560, y: 250 };

export const BelumPernahKetemu: React.FC = () => {
  const d = useDetik();

  const dekat = t(d, { mulai: B_LIHAT, durasi: 1.1, dari: 1, ke: 1.45, ease: E.power2out });
  const kembali = t(d, { mulai: B_SEKARANG, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });
  const skala = dekat - 0.45 * kembali;

  const sosok = masuk(d, { mulai: B_TOKO + 0.15, durasi: 0.5, geser: 22 });

  const garisKiri = gambarGaris(d, 900, { mulai: B_KETEMU + 0.2, durasi: 0.9 });
  const garisKanan = gambarGaris(d, 1400, { mulai: B_KETEMU + 0.35, durasi: 0.9 });
  const padam = 1 - t(d, { mulai: B_KEMARIN + 1.5, durasi: 0.7, dari: 0, ke: 1, ease: E.power2in });

  const sorot = t(d, { mulai: B_SEKARANG + 0.3, durasi: 0.6, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ x: X_TERIMA, y: Y_JALAN - 60, skala })}>
            <Jalan />
            <Meja x={X_KIRIM} sorot={sorot} />
            <Meja x={X_TERIMA} sorot={sorot} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} nyala={sorot > 0.5 ? 1 : 0} />
            ))}

            <Kotak x={X_TERIMA} y={Y_JALAN} gembok={1} skala={0.42} />
            <Kunci x={X_KUNCI} y={Y_JALAN - 34} skala={1.1} />

            {/* penerima — tanpa wajah, tanpa nama, berdiri di samping mejanya */}
            <g style={{ opacity: sosok.opacity, transform: sosok.transform }}>
              <Sosok x={X_TERIMA + 260} y={Y_LANTAI} skala={0.86} />
            </g>

            {/* garis waktu ke belakang — menjulur, lalu berhenti di ruang kosong */}
            <g opacity={padam}>
              <path
                d={`M${X_KIRIM} ${Y_JALAN - 40}L${P_LALU.x} ${P_LALU.y}`}
                stroke={ABU}
                strokeWidth={4}
                strokeDasharray={garisKiri.strokeDasharray}
                strokeDashoffset={garisKiri.strokeDashoffset}
                opacity={0.7}
              />
              <path
                d={`M${X_TERIMA} ${Y_JALAN - 40}L${P_LALU.x} ${P_LALU.y}`}
                stroke={ABU}
                strokeWidth={4}
                strokeDasharray={garisKanan.strokeDasharray}
                strokeDashoffset={garisKanan.strokeDashoffset}
                opacity={0.7}
              />

              {/* kalender: enam hari, semuanya kosong */}
              {Array.from({ length: 6 }, (_, k) => {
                const m = masuk(d, { mulai: B_KEMARIN + 0.1 + k * 0.05, durasi: 0.4, geser: 14 });
                return (
                  <g key={k} style={{ opacity: m.opacity, transform: m.transform }}>
                    <rect
                      x={P_LALU.x - 300 + k * 96}
                      y={P_LALU.y - 44}
                      width={80}
                      height={88}
                      rx={8}
                      fill="var(--bg-elev)"
                      stroke={GELAP}
                      strokeWidth={4}
                    />
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
