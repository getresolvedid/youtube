/* T01-S2 · scene 2 · salah — beat bantahan, 3,83 dtk
   Direction: 02-salah-direction.md
   VO:        02-salah-vo.md

   Kesinambungan: kalimat mitos dan batang ram mulai persis di posisi & ukuran
   akhir 01-mitos. Potongannya keras, jadi kesinambungan itu satu-satunya yang
   menyambungkan keduanya.

   KALIMATNYA TINGGAL DI LAYAR, TERCORET. Menghapusnya membuat penonton yang
   baru scroll masuk kehilangan apa yang sedang dibantah — dan di feed Shorts,
   sebagian penonton memang mendarat di detik ketiga.

   Coretannya GARIS MENDATAR, bukan silang. Silang berarti "salah total"; ini
   "tidak selalu" (lihat 02-salah-vo.md), dan bentuk coretannya harus sepakat
   dengan kalimatnya. Satu garis PER BARIS, karena kalimatnya dua baris — satu
   garis melintasi blok akan jatuh di celah antar-baris dan terbaca sebagai
   garis bawah.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { MITOS_GEO, Mitos } from "../meja-kerja";

const T_CORET = 0.12;
const DUR_CORET = 0.35;
/** Sepanjang kalimatnya, di dalam kotak aman x 90–990. */
const PANJANG = MITOS_GEO.lebar;

/** SATU coretan PER BARIS, bukan satu garis melintasi blok dua baris. Garis
 *  tunggal di tengah blok jatuh di celah antar-baris dan terbaca sebagai garis
 *  bawah, bukan coretan. Keduanya digambar beruntun, cepat. */
const Y_CORET = Array.from(
  { length: MITOS_GEO.baris },
  (_, i) => MITOS_GEO.yTeks + (i + 0.5) * MITOS_GEO.tinggiBaris,
);
const Y_KETERANGAN = MITOS_GEO.yTeks + MITOS_GEO.baris * MITOS_GEO.tinggiBaris + 44;

export const Salah: React.FC = () => {
  const d = useDetik();

  const redup = t(d, { mulai: T_CORET, durasi: 0.4, dari: 1, ke: 0.35 });

  return (
    <Scene tengah={false}>
      <Mitos redup={redup} />

      {Y_CORET.map((y, i) => {
        const garis = gambarGaris(d, PANJANG, {
          mulai: T_CORET + i * (DUR_CORET * 0.55),
          durasi: DUR_CORET,
          ease: E.power2out,
        });
        return (
          <svg
            key={y}
            style={{
              position: "absolute",
              left: MITOS_GEO.xKiri,
              top: y - 6,
              width: PANJANG,
              height: 12,
              overflow: "visible",
            }}
          >
            <line
              x1={0}
              y1={6}
              x2={PANJANG}
              y2={6}
              stroke="var(--warn)"
              strokeWidth={12}
              strokeLinecap="round"
              strokeDasharray={garis.strokeDasharray}
              strokeDashoffset={garis.strokeDashoffset}
            />
          </svg>
        );
      })}

      {/* Frasa yang menahan Short ini dari klaim yang terlalu besar. Ia wajib
          terbaca penonton yang menonton tanpa suara — mitos ini memang benar
          dalam satu keadaan, dan keadaan itu isi scene 6 sampai 9. */}
      <p
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: Y_KETERANGAN,
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: 44,
          color: "var(--warn)",
          ...masuk(d, { mulai: T_CORET + DUR_CORET * 1.6, durasi: 0.35, geser: 12 }),
        }}
      >
        sebagian besar waktu
      </p>
    </Scene>
  );
};
