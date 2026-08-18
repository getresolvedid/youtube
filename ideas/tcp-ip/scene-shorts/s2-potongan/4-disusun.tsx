/* T18-S2 · scene 4 · disusun
   VO:        4-disusun-vo.md
   Direction: 4-disusun-direction.md

   Yang baru di scene ini URUTAN, bukan kedatangan.

   DUA KEPUTUSAN:

   1. Ada jeda ±1 dtk di mana potongan diam dalam keadaan berantakan. Kalau
      penyusunan mulai begitu potongan mendarat, penonton tidak pernah melihat
      keadaan yang justru jadi sebab scene ini ada.

   2. Kotak yang menyeberangi tetangganya TERANGKAT ke ketinggian berbeda. Dua
      kotak yang bertukar tempat di garis yang sama terbaca MELEBUR, bukan
      bertukar — kesalahan ini sudah terjadi sekali di scene 8 video panjang dan
      ketahuan lewat `npm run tumpang`.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-jaringan";
import { JaringanTegak, TeksLayar, Tujuan, W, Y_ATAS, Y_BAWAH } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "disusun";
const B_SATU = beat(ID, 0); // "Di sana, bagian-bagian tersebut disatukan kembali…"

const N = 5;
const Y_KUMPUL = Y_BAWAH - 40;
const LEBAR_SLOT = 172;

/** Urutan mendarat — BERANTAKAN, dan sengaja bukan urutan nomor. */
const URUT_DATANG = [2, 5, 1, 3, 4] as const;

/** Tinggi lengkungan saat menyeberang, indeks = nomor − 1. Kotak yang saling
 *  menyeberang wajib beda tinggi; angkanya bukan hiasan. */
const LAJUR = [0, 120, 0, 200, 60] as const;

const slotX = (i: number) => W / 2 + (i - (N - 1) / 2) * LEBAR_SLOT;

export const Disusun: React.FC = () => {
  const d = useDetik();

  /* Mendarat, lalu DIAM — keberantakannya harus sempat dibaca. */
  const datang = (i: number) =>
    t(d, { mulai: B_SATU + i * 0.12, durasi: 0.9, dari: 0, ke: 1, ease: E.power1out });

  const susun = (i: number) =>
    t(d, { mulai: B_SATU + 2.6 + i * 0.05, durasi: 0.75, dari: 0, ke: 1, ease: E.power2out });

  const teks1 = masuk(d, { mulai: B_SATU + 0.4, durasi: 0.45, geser: 20 });
  const teks2 = masuk(d, { mulai: B_SATU + 2.6, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} />
          <Tujuan y={1740} nyala={0.4} />

          {Array.from({ length: N }, (_, iSlot) => {
            const nomor = URUT_DATANG[iSlot] ?? 1;
            const i = nomor - 1;

            const xDatang = slotX(iSlot);
            const xUrut = slotX(i);
            const s = susun(i);
            const u = datang(i);

            const x = xDatang + (xUrut - xDatang) * s;
            /* Terangkat saat menyeberang, kembali rata di kedua ujungnya. */
            const angkat = s * (1 - s) * 4 * (LAJUR[i] ?? 0);
            const y = Y_ATAS + (Y_KUMPUL - Y_ATAS) * u - angkat;

            return (
              <Paket
                key={nomor}
                x={x}
                y={y}
                nomor={nomor}
                skala={0.84}
                warna={s > 0.9 ? "ok" : "biasa"}
              />
            );
          })}

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["Datangnya acak."]} y={300} />
          </g>
          <g style={{ opacity: teks2.opacity, transform: teks2.transform }}>
            <TeksLayar baris={["Disusun ulang."]} y={300} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
