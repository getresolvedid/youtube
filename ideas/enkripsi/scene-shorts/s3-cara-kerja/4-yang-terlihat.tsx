/* T17-S3 · scene 4 · yang-terlihat — bayaran Short 3
   VO:        4-yang-terlihat-vo.md
   Direction: 4-yang-terlihat-direction.md

   FRAME INI HARUS IDENTIK DENGAN SHORT 2 SCENE 3, KECUALI ISI LAYARNYA. Itu
   seluruh kerja Short 3, dan ia gagal kalau ada satu benda yang bergeser —
   karena itu letak, ukuran layar, tempat duduk, dan skala push-in-nya semuanya
   dari ../panggung-short.tsx.

   DIA TIDAK PERGI DARI FRAME. Enkripsi tidak mengusirnya; ia tetap bisa melihat
   paketnya lewat. Itu titik yang paling sering salah dipahami, dan gambar yang
   mengusirnya akan mengajarkannya.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Monitor, Paket, SANDI_PANJANG, Sosok } from "../../panggung-kiriman";
import {
  JALUR,
  JaringanTegak,
  MONITOR,
  PENGAMAT,
  RAPAT_MONITOR,
  TUMPU_MONITOR,
  TeksLayar,
  W,
  kameraKe,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "yang-terlihat";
const B_LIHAT = beat(ID, 0);

export const YangTerlihat: React.FC = () => {
  const d = useDetik();

  const maju = t(d, { mulai: 0, durasi: 4.4, dari: 0, ke: 1, ease: E.linear });
  const yPaket = JALUR.atas + (JALUR.bawah - JALUR.atas) * maju;

  /* Nilai dan ease-nya SAMA PERSIS dengan Short 2 scene 3. */
  const rapat = t(d, {
    mulai: 0.2,
    durasi: 1.6,
    dari: 1,
    ke: RAPAT_MONITOR,
    ease: E.expoOut,
  });

  /* Ditahan kecil: bahu turun sedikit, badan berputar sedikit. Tidak ada getar,
     tanda seru, atau perubahan warna. */
  const bingung = t(d, { mulai: B_LIHAT + 2.2, durasi: 0.9, dari: 0, ke: 1 });
  const teks = t(d, { mulai: B_LIHAT + 0.5, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kameraKe(rapat, TUMPU_MONITOR.cx, TUMPU_MONITOR.cy, RAPAT_MONITOR)}>
            <JaringanTegak luas={1} nyala={nyalaSimpul(yPaket)} />
            <Paket x={JALUR.x} y={yPaket} terkunci={1} skala={1.4} />

            <g
              transform={`rotate(${-6 * bingung} ${PENGAMAT.x} ${PENGAMAT.alas - 200})`}
            >
              <Sosok
                x={PENGAMAT.x}
                y={PENGAMAT.alas + 5 * bingung}
                skala={0.62}
              />
            </g>

            <Monitor {...MONITOR} nyala={0.8}>
              <text
                x={MONITOR.x + MONITOR.w / 2}
                y={MONITOR.y + MONITOR.h / 2}
                fontSize={30}
                fontFamily="var(--font-mono)"
                fontWeight={700}
                fill="var(--accent-ink)"
                textAnchor="middle"
                dominantBaseline="middle"
                letterSpacing={2}
              >
                {SANDI_PANJANG}
              </text>
            </Monitor>
          </g>

          <TeksLayar baris={["Bukan pesannya lagi."]} y={230} opacity={teks} ukuran={54} />
        </svg>
      </div>
    </Scene>
  );
};
