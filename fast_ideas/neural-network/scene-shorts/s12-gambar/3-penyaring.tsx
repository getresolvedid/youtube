/* T19-S12 · scene 3 · penyaring — payoff
   VO:        3-penyaring-vo.md
   Direction: 3-penyaring-direction.md

   KETIGANYA DARI GAMBAR YANG SAMA, cuma penyaringnya beda — `PENYARING` di
   panggung-seri diturunkan dari `GAMBAR` yang sama. Kalau gambarnya juga beda,
   yang terbaca "tiga gambar", bukan "tiga penyaring".
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import { GAMBAR, Kisi, NAMA_PENYARING, N_KISI, PENYARING } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "penyaring";

const B_SARING = beat(ID, 0); // "Penyaring yang berbeda menanggapi hal yang berbeda…"

const SEL = 74;
const X0 = W / 2 - (N_KISI * SEL) / 2;
const Y0 = 620;

/** Tiga kisi hasil, lebih kecil, berjajar di bawah gambarnya.
 *
 *  Y_HASIL 1000, BUKAN 1210: pada 1210 label penyaringnya jatuh di `y` 1490 —
 *  di bawah kotak aman, tertimpa judul dan nama channel. Kisi utamanya yang
 *  mengalah, mengecil dan naik. */
const SEL_KECIL = 30;
const Y_HASIL = 1000;
const X_HASIL = [150, 420, 690];

export const Penyaring: React.FC = () => {
  const d = useDetik();

  /* Kisi utama mengecil dan naik — berangkat dari posisi frame terakhir scene 2,
     jadi jahitannya tetap (HARD RULE 3). */
  const susut = t(d, { mulai: 0.05, durasi: 0.5, dari: 0, ke: 1, ease: E.sineInOut });
  const skalaKisi = 1 - 0.4 * susut;

  const hasil = (i: number): number =>
    t(d, { mulai: B_SARING + 0.2 + i * 0.14, durasi: 0.35, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_SARING + 0.2, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g
            transform={`translate(${W / 2} ${Y0}) scale(${skalaKisi}) translate(${-W / 2} ${-Y0}) translate(0 ${-100 * susut})`}
          >
            <Kisi x={X0} y={Y0} n={N_KISI} sel={SEL} isi={GAMBAR} opacity={1 - 0.5 * susut} />
          </g>

          {PENYARING.map((f, i) => (
            <g key={NAMA_PENYARING[i]} opacity={hasil(i)}>
              <Kisi
                x={X_HASIL[i] ?? 150}
                y={Y_HASIL}
                n={N_KISI}
                sel={SEL_KECIL}
                isi={f}
                warna="var(--accent-ink)"
              />
              <text
                x={(X_HASIL[i] ?? 150) + (N_KISI * SEL_KECIL) / 2 - 2}
                y={Y_HASIL + N_KISI * SEL_KECIL + 40}
                fontSize={26}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill="var(--ink-2)"
                textAnchor="middle"
                letterSpacing={1}
              >
                {NAMA_PENYARING[i]}
              </text>
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["PENYARING BERBEDA"]} ukuran={50} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
