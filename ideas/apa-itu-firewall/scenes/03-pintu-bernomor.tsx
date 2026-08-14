/* T15 · scene 3 · pintu-bernomor — bagian 3 [problem], 22,91 dtk
   VO:        03-pintu-bernomor-vo.md
   Direction: 03-pintu-bernomor-direction.md

   Scene yang mendirikan PINTU sebagai benda yang dipakai dua belas scene
   berikutnya, lalu menutup jalan keluar yang paling malas dengan
   memperlihatkannya gagal.

   Ketiga pintu yang hidup dipatok di `PINTU_HIDUP` (panggung-gedung.tsx) dan
   dipakai ulang di scene 4, 5, 12 dan 14. Pintu hidup yang berpindah antar scene
   membuat penonton mengira jumlahnya berubah.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Gedung,
  Kotak,
  Lantai,
  N_PINTU,
  PINTU_HIDUP,
  X_LUAR,
  kamera,
  posPintu,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "pintu-bernomor";

const B_DEKAT = beat(ID, 0); // "Sekarang lihat dinding luarnya lebih dekat."
const B_RAPAT = beat(ID, 1); // "Dindingnya rapat, tapi tidak buta."
const B_NOMOR = beat(ID, 2); // "Ada banyak pintu di situ…"
const B_KUNCI = beat(ID, 3); // "Sebagian besar terkunci…"
const B_HARUS = beat(ID, 4); // "Tapi beberapa memang harus bisa diketuk."
const B_LEWAT = beat(ID, 5); // "Lewat situlah halaman datang…"
const B_CABUT = beat(ID, 6); // "Jadi menutup semuanya sama saja…"

const hidup = (i: number) => PINTU_HIDUP.includes(i as (typeof PINTU_HIDUP)[number]);

export const PintuBernomor: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: kamera mendekat, lalu tinggal di situ sampai akhir --- */
  const dekat = t(d, { mulai: B_DEKAT, durasi: 1.1, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 2: permukaan dinding menyala --- */
  const permukaan = t(d, { mulai: B_RAPAT, durasi: 0.7, dari: 0, ke: 1 });

  /* --- tahap 4 & 5 --- */
  const gembok = t(d, { mulai: B_KUNCI, durasi: 0.8, dari: 0, ke: 1 });
  const terang = t(d, { mulai: B_HARUS, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 7: semuanya ikut digembok, gedungnya jadi siluet mati, lalu
     ketiganya menyala lagi di ujung scene --- */
  const mati = t(d, { mulai: B_CABUT + 0.35, durasi: 0.7, dari: 0, ke: 1, ease: E.power2in });
  const pulih = t(d, { mulai: B_CABUT + 2.6, durasi: 0.8, dari: 0, ke: 1 });
  const padam = mati * (1 - pulih);

  const pintu = Array.from({ length: N_PINTU }, (_, i) => {
    /* Tahap 3: pintu tergambar satu per satu, kiri bawah ke kanan atas. */
    const lahir = t(d, {
      mulai: B_NOMOR + i * 0.1,
      durasi: 0.45,
      dari: 0,
      ke: 1,
      ease: E.expoOut,
    });
    const nyalaDasar = hidup(i) ? 0.55 + 0.45 * terang : 0.55 * (1 - gembok);
    return {
      nyala: lahir * nyalaDasar * (1 - padam),
      gembok: lahir * (hidup(i) ? padam : gembok),
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
          <g transform={kamera({ skala: 1 + 0.12 * dekat })}>
            <Lantai />
            <Gedung
              dinding={0.55 + 0.45 * permukaan}
              pintu={pintu}
              nomorTampil={t(d, { mulai: B_NOMOR + 0.25, durasi: 0.6, dari: 0, ke: 1 })}
            />

            {/* --- tahap 6: tiga kiriman lewat ketiga pintu yang hidup ---
                Bentuknya kotak, bukan ketukan: mereka LEWAT, dan bedanya harus
                terbaca sebelum scene 4 memperlihatkan yang tidak boleh lewat. */}
            {PINTU_HIDUP.map((iPintu, k) => {
              const p = posPintu(iPintu);
              const maju = t(d, {
                mulai: B_LEWAT + k * 0.38,
                durasi: 1.25,
                dari: 0,
                ke: 1,
                ease: E.power1out,
              });
              return (
                <Kotak
                  key={iPintu}
                  x={X_LUAR + (p.x - X_LUAR) * maju}
                  y={p.y - 66}
                  skala={0.5}
                  opacity={maju > 0 && maju < 1 ? 1 : 0}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
