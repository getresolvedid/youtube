/* T17 (provisional) · scene 5 · bisa-dilihat — bagian 3 [problem]
   VO:        05-bisa-dilihat-vo.md
   Direction: 05-bisa-dilihat-direction.md

   DI SINILAH MASALAHNYA LAHIR. Seluruh bagian 4 sampai 6 bergantung pada satu
   perasaan yang harus benar-benar tumbuh di sini: itu kalimatku, dan dia
   membacanya.

   DUA KEPUTUSAN:

   1. YANG MENGAMATI MEMAKAI KOMPONEN `Sosok` YANG SAMA dengan pengirim. Bukan
      tudung, bukan ruang gelap, bukan warna bahaya (arahan user). Yang
      membedakannya cuma tempat, ukuran, dan terangnya — bentuk yang berbeda
      terbaca sebagai jenis makhluk yang berbeda, dan begitu ia terbaca sebagai
      "penjahat", scene ini berhenti mengajarkan apa pun.

   2. LETAKNYA DIPATOK di ../panggung-kiriman.tsx dan dipakai lagi di scene 7 di
      koordinat yang sama persis. Bergeser sedikit pun, penonton membacanya
      sebagai orang yang berbeda.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  HP_KANAN,
  HP_KIRI,
  JALUR,
  Hp,
  Jaringan,
  MONITOR,
  Monitor,
  PENGAMAT,
  PESAN,
  Paket,
  RAPAT_MONITOR,
  Sosok,
  TUMPU_MONITOR,
  kameraKe,
  nyalaSimpul,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "bisa-dilihat";

const B_ADA = beat(ID, 0); // "Jika data tidak dilindungi dengan baik…"
const B_TERBACA = beat(ID, 1); // "Misalnya, pesan yang seharusnya hanya untuk temanmu…"
const B_MUNDUR = beat(ID, 2); // "Karena itu, kita membutuhkan cara untuk melindungi data."

export const BisaDilihat: React.FC = () => {
  const d = useDetik();

  /* Paketnya TERUS BERJALAN pelan sepanjang scene. Panggung yang benar-benar
     beku di scene sepanjang ini terbaca sebagai gambar diam. */
  const maju = t(d, {
    mulai: 0,
    durasi: B_MUNDUR + 3.4,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });
  const xPaket = JALUR.kiri + (JALUR.kanan - 240 - JALUR.kiri) * maju;

  /* Masuk lewat OPASITAS SAJA, tanpa geser: dia tidak boleh terbaca sedang
     datang — dia sudah di situ, cuma baru terlihat. */
  const hadir = t(d, { mulai: B_ADA + 0.5, durasi: 0.9, dari: 0, ke: 1 });
  const noleh = t(d, { mulai: B_ADA + 1.4, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 2: kamera merapat ke layarnya, lalu MUNDUR di tahap 3 --- */
  const rapat = t(d, {
    mulai: B_TERBACA,
    durasi: 1.6,
    dari: 1,
    ke: RAPAT_MONITOR,
    ease: E.expoOut,
  });
  const mundur = t(d, {
    mulai: B_MUNDUR,
    durasi: 1.5,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const skala = rapat + (1 - rapat) * mundur;

  /* Isi layar: mula-mula paketnya, lalu kalimatnya terbaca utuh. Kalimatnya
     TIDAK diketik ulang huruf per huruf — ia sudah ada di sana; yang berubah
     cuma kita jadi bisa melihatnya. */
  const isiPaket = t(d, { mulai: B_TERBACA + 0.9, durasi: 0.5, dari: 1, ke: 0 });
  const isiTeks = t(d, { mulai: B_TERBACA + 1.1, durasi: 0.6, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kameraKe(skala, TUMPU_MONITOR.cx, TUMPU_MONITOR.cy, RAPAT_MONITOR)}>
            <Jaringan luas={1} nyala={nyalaSimpul(xPaket)} />

            <Hp {...HP_KIRI} nyala={0.6} />
            <Hp {...HP_KANAN} nyala={0.6} />
            <Paket x={xPaket} y={JALUR.y} />

            {/* --- yang mengamati --- */}
            <g opacity={hadir}>
              <g
                transform={`rotate(${8 * noleh} ${PENGAMAT.x} ${
                  PENGAMAT.alas - 120
                })`}
              >
                <Sosok x={PENGAMAT.x} y={PENGAMAT.alas} skala={0.62} />
              </g>

              <Monitor {...MONITOR} nyala={0.8}>
                {/* isi layar: paket dulu, lalu kalimatnya */}
                <g opacity={isiPaket}>
                  <Paket
                    x={MONITOR.x + MONITOR.w / 2}
                    y={MONITOR.y + MONITOR.h / 2}
                    skala={0.62}
                  />
                </g>
                <text
                  x={MONITOR.x + MONITOR.w / 2}
                  y={MONITOR.y + MONITOR.h / 2}
                  fontSize={26}
                  fontFamily="var(--font-body)"
                  fontWeight={700}
                  fill="var(--ink-0)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={isiTeks}
                >
                  {PESAN}
                </text>
              </Monitor>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
