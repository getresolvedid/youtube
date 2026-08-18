/* T18-S2 · scene 5 · utuh — tutup + loop
   VO:        5-utuh-vo.md
   Direction: 5-utuh-direction.md

   SATU KEPUTUSAN YANG MENGIKAT: bidang yang tersusun kembali identik dengan
   yang membentur di scene 1 — ukuran, warna, dan tulisannya. Itu yang menutup
   lingkarannya: yang tadi tidak muat sekarang sudah sampai, utuh. Bidang yang
   sedikit berbeda membuat penonton mengira ini file lain, dan loop-nya putus.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Label, Paket } from "../../panggung-jaringan";
import { JaringanTegak, Tujuan, W, Y_BAWAH } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "utuh";
const B_JADI = beat(ID, 0); // "Jadi, saat kamu mengirim data melalui internet…"

const N = 5;
const LEBAR_SLOT = 172;
const Y_KUMPUL = Y_BAWAH - 40;

/** Ukurannya SAMA PERSIS dengan bidang di 1-terlalu-besar.tsx. */
const BERKAS = { w: 620, h: 300 } as const;

export const Utuh: React.FC = () => {
  const d = useDetik();

  const rapat = t(d, { mulai: B_JADI + 0.2, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });
  /* Menyatu di titik yang SAMA — tanpa geser, tanpa skala. */
  const satu = t(d, { mulai: B_JADI + 0.85, durasi: 0.4, dari: 0, ke: 1 });
  const nyala = t(d, { mulai: B_JADI + 1.2, durasi: 0.4, dari: 0, ke: 1 });
  const rangkum = masuk(d, { mulai: B_JADI + 1.5, durasi: 0.55, geser: 22 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} />
          <Tujuan y={1740} nyala={nyala} />

          {/* Lima potongan merapat lalu larut. */}
          <g opacity={1 - satu}>
            {Array.from({ length: N }, (_, i) => {
              const xUrut = W / 2 + (i - (N - 1) / 2) * LEBAR_SLOT;
              /* Merapat ke JARAK RAPAT, bukan ke satu titik. Lima potongan yang
                 berhimpit di W/2 saling menimpa penuh sebelum bidangnya sempat
                 mengambil alih — dan `npm run tumpang` melaporkannya. */
              const xRapat = W / 2 + (i - (N - 1) / 2) * 112;
              return (
                <Paket
                  key={i}
                  x={xUrut + (xRapat - xUrut) * rapat}
                  y={Y_KUMPUL}
                  nomor={i + 1}
                  skala={0.84}
                  warna="ok"
                />
              );
            })}
          </g>

          {/* Bidang utuh — identik dengan scene 1, di titik yang sama. */}
          <g opacity={satu}>
            <rect
              x={W / 2 - BERKAS.w / 2}
              y={Y_KUMPUL - BERKAS.h / 2}
              width={BERKAS.w}
              height={BERKAS.h}
              rx={16}
              fill="var(--bg-elev)"
              stroke="var(--ok)"
              strokeWidth={6}
            />
            <text
              x={W / 2}
              y={Y_KUMPUL + 18}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={56}
              fontWeight={700}
              fill="var(--ink-0)"
            >
              FILE
            </text>
          </g>

          <g style={{ opacity: rangkum.opacity, transform: rangkum.transform }}>
            <Label x={W / 2} y={360} teks="Banyak potongan kecil" sub="= satu file utuh" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
