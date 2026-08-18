/* T17-S4 · scene 3 · dekripsi — payoff
   VO:        3-dekripsi-vo.md
   Direction: 3-dekripsi-direction.md

   KEBALIKAN PERSIS DARI SHORT 3 SCENE 2, dan pengulangan terbalik itulah yang
   mengajarkan — bukan kalimatnya. `tutup` bergerak 1 → 0 di sini, 0 → 1 di sana.

   GELEMBUNG YANG MUNCUL BENTUKNYA SAMA PERSIS dengan yang diketik di Short 1
   scene 1. Kalau ia digambar sedikit berbeda, gagasan "dikembalikan ke bentuk
   aslinya" ikut bocor — dan itu satu-satunya hal yang scene ini ajarkan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Gembok,
  Hp,
  Kunci,
  PESAN,
  SANDI_PANJANG,
  Sosok,
} from "../../panggung-kiriman";
import { TeksLayar, W, kamera } from "../panggung-short";
import { HP, L } from "./1-masih-lambang";
import { Y_GEMBOK } from "./2-kunci";
import { beat } from "./timing.gen";

const ID = "dekripsi";
const B_UBAH = beat(ID, 0);
const B_BACA = beat(ID, 1);

const KOTAK = { x: L.x + L.w / 2, y: L.y + L.h / 2, w: L.w - 40, h: 300 } as const;

export const Dekripsi: React.FC = () => {
  const d = useDetik();

  /* Sengkang terangkat; badan gemboknya diam. */
  const terbuka = t(d, { mulai: 0.3, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  /* Daun kotak MEMBUKA — kebalikan dari Short 3. */
  const buka = t(d, {
    mulai: B_UBAH + 0.9,
    durasi: 0.8,
    dari: 1,
    ke: 0,
    ease: E.power2out,
  });
  /* Barisnya MEMENDEK — kebalikan dari yang melar di Short 3. */
  const tukar = t(d, { mulai: B_UBAH + 1.2, durasi: 1.4, dari: 0, ke: 1 });

  const gelembung = masuk(d, { mulai: B_BACA + 0.4, durasi: 0.6, geser: 26 });
  const lega = t(d, { mulai: B_BACA + 0.9, durasi: 0.8, dari: 0, ke: 1 });
  const nama = t(d, { mulai: B_UBAH + 0.4, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(1, HP.x + HP.w / 2, HP.y + HP.h / 2)}>
            <Hp {...HP} nyala={1}>
              <g data-tumpang="sengaja">
                <text
                  x={KOTAK.x}
                  y={KOTAK.y}
                  fontSize={44}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill="var(--accent-ink)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  letterSpacing={3}
                  opacity={(1 - tukar) * buka}
                >
                  {SANDI_PANJANG}
                </text>
              </g>

              {/* Gelembung chat biasa — bentuk yang sama persis dengan Short 1. */}
              <g style={{ opacity: gelembung.opacity, transform: gelembung.transform }}>
                <rect
                  x={L.x + 40}
                  y={KOTAK.y - 52}
                  width={L.w - 80}
                  height={104}
                  rx={30}
                  fill="var(--accent)"
                />
                <text
                  x={L.x + L.w / 2}
                  y={KOTAK.y + 2}
                  fontSize={44}
                  fontFamily="var(--font-body)"
                  fontWeight={700}
                  fill="var(--ink-0)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {PESAN}
                </text>
              </g>

              <g opacity={1 - tukar}>
                <Gembok x={L.x + L.w / 2} y={Y_GEMBOK} skala={0.9} terbuka={terbuka} />
              </g>
            </Hp>
          </g>

          <g opacity={1 - tukar}>
            <Kunci x={W / 2 + 170} y={Y_GEMBOK} skala={1.8} />
          </g>

          {/* Penerimanya — bahunya turun sedikit; tidak ada wajah yang berubah. */}
          <Sosok x={W - 130} y={1900 + 6 * lega} skala={0.8} opacity={0.75} />

          <TeksLayar
            baris={["DEKRIPSI"]}
            y={230}
            opacity={nama * (1 - tukar)}
            warna="var(--ok)"
            ukuran={72}
          />
          <TeksLayar
            baris={["Halo, apa kabar?"]}
            y={230}
            opacity={tukar}
            ukuran={62}
          />
        </svg>
      </div>
    </Scene>
  );
};
