/* T17-S1 · scene 1 · ketik-kirim — hook
   VO:        1-ketik-kirim-vo.md
   Direction: 1-ketik-kirim-direction.md

   Frame pertama SELURUH SERI. Pengetikan sudah berjalan sejak frame nol, bukan
   menunggu kamera selesai merapat: di feed, yang tidak bergerak di frame pertama
   tidak pernah ditonton.

   Belum ada jaringan, belum ada pengamat, belum ada gembok — arahan user:
   penonton harus fokus ke tindakan yang sudah ia kenal.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, PESAN, layarHp } from "../../panggung-kiriman";
import { TeksLayar, W, kamera } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "ketik-kirim";
const B_TANYA = beat(ID, 0);

/** HP mengisi sebagian besar frame — ini adegan dekat, bukan adegan panggung. */
/* HP-nya DIANGKAT dan DIPENDEKKAN dari render still pertama: pada 620 x 1150,
   kolom ketik dan tombol kirim — satu-satunya tempat yang benar-benar terjadi
   sesuatu — jatuh di balik kotak subtitel preview, dan dua pertiga layar atas
   cuma ruang percakapan kosong. */
export const HP = { x: 150, y: 380, w: 780, h: 1000 } as const;
const L = layarHp(HP.x, HP.y, HP.w, HP.h);

export const KetikKirim: React.FC = () => {
  const d = useDetik();

  /* Merapat pelan dan SEDIKIT — di 9:16 push-in besar cepat terasa gelisah. */
  const rapat = t(d, {
    mulai: 0,
    durasi: B_TANYA + 4.6,
    dari: 1,
    ke: 1.12,
    ease: E.expoOut,
  });

  /* Hurufnya tumbuh lewat JUMLAH HURUF yang terlihat, bukan opasitas per huruf —
     yang kedua terbaca sebagai teks berkedip, bukan sebagai teks yang diketik. */
  const nHuruf = Math.floor(
    t(d, { mulai: 0.35, durasi: 2.6, dari: 0, ke: PESAN.length, ease: E.linear }),
  );

  const teks = t(d, { mulai: 1.2, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(rapat, HP.x + HP.w / 2, HP.y + HP.h / 2)}>
            <Hp {...HP} nyala={1}>
              {/* kepala percakapan — dipatok ke tepi bidang LAYAR, bukan tepi
                  badan HP: bezelnya membuat dua tepi itu tidak berjarak sama */}
              <rect x={L.x} y={L.y} width={L.w} height={92} fill="var(--bg-elev)" />
              <text
                x={L.x + 44}
                y={L.y + 60}
                fontSize={46}
                fontFamily="var(--font-body)"
                fontWeight={700}
                fill="var(--ink-0)"
              >
                Teman
              </text>

              {/* kolom ketik */}
              <rect
                x={L.x + 40}
                y={L.y + L.h - 150}
                width={L.w - 210}
                height={100}
                rx={50}
                fill="var(--bg)"
                stroke="var(--accent-ink)"
                strokeWidth={4}
              />
              <text
                x={L.x + 80}
                y={L.y + L.h - 88}
                fontSize={40}
                fontFamily="var(--font-body)"
                fill="var(--ink-0)"
              >
                {PESAN.slice(0, nHuruf)}
              </text>

              {/* tombol kirim */}
              <circle
                cx={L.x + L.w - 82}
                cy={L.y + L.h - 100}
                r={48}
                fill="var(--accent)"
              />
              <path
                d={`M ${L.x + L.w - 104} ${L.y + L.h - 100} h 38
                    M ${L.x + L.w - 76} ${L.y + L.h - 116} l 16 16 l -16 16`}
                stroke="var(--ink-0)"
                strokeWidth={7}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Hp>
          </g>

          <TeksLayar baris={["Setelah kamu", "tekan kirim…"]} y={230} opacity={teks} />
        </svg>
      </div>
    </Scene>
  );
};
