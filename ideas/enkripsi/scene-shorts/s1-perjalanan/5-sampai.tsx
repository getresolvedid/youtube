/* T17-S1 · scene 5 · sampai
   VO:        5-sampai-vo.md
   Direction: 5-sampai-direction.md

   Lingkarannya ditutup. GELEMBUNG YANG MUNCUL BENTUKNYA SAMA PERSIS dengan yang
   diketik di scene 1 — kalau ia digambar sedikit berbeda, gagasan "kalimat yang
   sama sampai di ujung" ikut bocor, dan itu satu-satunya hal yang scene ini
   tetapkan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, PESAN, Paket, layarHp } from "../../panggung-kiriman";
import {
  HP_PENERIMA,
  JALUR,
  JaringanTegak,
  TeksLayar,
  W,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "sampai";
const B_TIBA = beat(ID, 0);

const L = layarHp(
  HP_PENERIMA.x,
  HP_PENERIMA.y,
  HP_PENERIMA.w,
  HP_PENERIMA.h,
);

export const Sampai: React.FC = () => {
  const d = useDetik();

  const maju = t(d, {
    mulai: 0,
    durasi: 1.5,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });
  const yPaket = JALUR.bawah + (HP_PENERIMA.y + 60 - JALUR.bawah) * maju;

  /* Paket MASUK: opasitasnya turun sementara nyala layar HP naik, di rentang
     yang sama — ia masuk, bukan menghilang lalu HP-nya menyala. */
  const masukHp = t(d, {
    mulai: 1.2,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const gelembung = masuk(d, { mulai: B_TIBA + 1.8, durasi: 0.6, geser: 22 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} nyala={nyalaSimpul(yPaket)} />

          <Hp {...HP_PENERIMA} nyala={0.4 + 0.6 * masukHp}>
            <g style={{ opacity: gelembung.opacity, transform: gelembung.transform }}>
              <rect
                x={L.x + 24}
                y={L.y + 150}
                width={L.w - 48}
                height={86}
                rx={26}
                fill="var(--accent)"
              />
              <text
                x={L.x + L.w / 2}
                y={L.y + 195}
                fontSize={32}
                fontFamily="var(--font-body)"
                fontWeight={700}
                fill="var(--ink-0)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {PESAN}
              </text>
            </g>
          </Hp>

          <Paket x={JALUR.x} y={yPaket} skala={1.4} opacity={1 - masukHp} />

          <TeksLayar baris={["Sampai."]} y={300} opacity={masukHp} />
        </svg>
      </div>
    </Scene>
  );
};
