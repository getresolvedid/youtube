/* T19-S8 · scene 4 · arah-turun — payoff kedua
   VO:        4-arah-turun-vo.md
   Direction: 4-arah-turun-direction.md

   PANJANG PANAH = BESAR ANDILNYA, dihitung dari `ANDIL` — angka yang sama yang
   mengatur terang sambungannya di scene 3. Dua nilai terpisah akan berpisah
   begitu salah satunya disetel.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, SAMBUNGAN, TeksLayar, W } from "../panggung-nn";
import { ANDIL, Meter, Panah } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "arah-turun";

const B_ARAH = beat(ID, 0); // "Dari situ ketahuan arah mana yang menurunkan kesalahannya."

/** Empat sambungan paling berandil — bukan keduabelasnya. Dua belas panah di
 *  satu frame adalah anyaman, bukan penjelasan. */
const DIPILIH = [9, 0, 4, 6] as const;

export const ArahTurun: React.FC = () => {
  const d = useDetik();

  const panah = (n: number): number =>
    t(d, { mulai: B_ARAH + 0.2 + n * 0.14, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });

  const teks = masuk(d, { mulai: B_ARAH + 0.3, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan opacity={0.5} />

          {SAMBUNGAN.map((s, i) => (
            <line
              key={`${s.x1}-${s.y1}-${s.x2}-${s.y2}`}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="var(--bad)"
              strokeWidth={4 + 9 * (ANDIL[i] ?? 0.3)}
              strokeLinecap="round"
              opacity={0.55 * (ANDIL[i] ?? 0.3)}
            />
          ))}

          {DIPILIH.map((i, n) => {
            const s = SAMBUNGAN[i];
            if (!s) return null;
            const a = ANDIL[i] ?? 0.3;
            return (
              <g key={i} opacity={panah(n)}>
                <Panah
                  x={(s.x1 + s.x2) / 2}
                  y={(s.y1 + s.y2) / 2}
                  panjang={40 + 90 * a}
                  arah={-90}
                  warna="var(--ok)"
                  tebal={6}
                />
              </g>
            );
          })}

          <Meter y={1330} nilai={0.72} label="KESALAHAN" opacity={0.5} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["ARAH YANG", "MENURUNKAN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
