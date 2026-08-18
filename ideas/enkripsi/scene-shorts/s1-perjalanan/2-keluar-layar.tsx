/* T17-S1 · scene 2 · keluar-layar
   VO:        2-keluar-layar-vo.md
   Direction: 2-keluar-layar-direction.md

   PERUBAHAN GELEMBUNG → PAKET TERJADI TEPAT DI TEPI LAYAR, bukan sebelum atau
   sesudahnya. Itu yang membuatnya terbaca sebagai AKIBAT dari keluar, bukan
   sebagai efek yang kebetulan jalan.

   Warnanya TIDAK berubah — bentuk boleh, warna tidak. Itu yang menjaga penonton
   membacanya sebagai benda yang sama. Warna baru berubah di Short 3, saat ia
   dikunci.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, PESAN, Paket, layarHp } from "../../panggung-kiriman";
import { TeksLayar, W } from "../panggung-short";
import { HP } from "./1-ketik-kirim";
import { beat } from "./timing.gen";

const ID = "keluar-layar";
const B_JALAN = beat(ID, 0);

const L = layarHp(HP.x, HP.y, HP.w, HP.h);

export const KeluarLayar: React.FC = () => {
  const d = useDetik();

  const tekan = tPP(d, { mulai: 0.15, durasi: 0.32, dari: 1, ke: 0.84 });
  const naik = masuk(d, { mulai: 0.4, durasi: 0.5, geser: 26 });

  /* Perjalanan gelembung dari dalam layar sampai keluar tepi bawahnya. */
  const jalan = t(d, {
    mulai: 0.75,
    durasi: B_JALAN + 2.4,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });

  /* Titik tepi layar, dinyatakan sebagai pecahan perjalanan — di situlah
     bentuknya mengeras. SATU nilai untuk radius sudut DAN lebar: dua tween
     terpisah membuat sudutnya selesai lebih dulu dari lebarnya, dan bentuk
     antaranya terbaca sebagai bentuk ketiga. */
  const TEPI = 0.45;
  const keras = Math.min(1, Math.max(0, (jalan - TEPI) / 0.25));

  const yGelembung = L.y + 300 + (1920 - (L.y + 300)) * jalan;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Hp {...HP} nyala={1}>
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

            <rect
              x={L.x + 40}
              y={L.y + L.h - 150}
              width={L.w - 210}
              height={100}
              rx={50}
              fill="var(--bg)"
              stroke="var(--line)"
              strokeWidth={4}
            />

            <g
              transform={`translate(${L.x + L.w - 82} ${
                L.y + L.h - 100
              }) scale(${tekan}) translate(${-(L.x + L.w - 82)} ${-(L.y + L.h - 100)})`}
            >
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
            </g>
          </Hp>

          {/* Gelembungnya digambar DI LUAR <Hp> supaya ia tidak terpotong bidang
              layarnya saat menyeberangi tepi — dan penyeberangan itulah isi
              scene ini. */}
          <g style={{ opacity: naik.opacity, transform: naik.transform }}>
            <Paket
              x={W / 2 + 60 - 60 * keras}
              y={yGelembung}
              radius={44 - 34 * keras}
              lebar={420 - 260 * keras}
              tinggi={120 - 26 * keras}
              skala={1}
            />
            <text
              x={W / 2 + 60 - 60 * keras}
              y={yGelembung + 4}
              fontSize={40}
              fontFamily="var(--font-body)"
              fontWeight={600}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={1 - keras}
            >
              {PESAN}
            </text>
          </g>

          <TeksLayar baris={["Ia jalan dulu."]} y={300} opacity={keras} />
        </svg>
      </div>
    </Scene>
  );
};
