/* T19-S8 · scene 2 · mundur — ketegangan
   VO:        2-mundur-vo.md
   Direction: 2-mundur-direction.md

   ARAHNYA KEBALIKAN EPISODE 06, dan itu seluruh gunanya: denyut yang berjalan
   ke arah yang sama membuat episode ini tidak bisa dibedakan dari forward
   propagation. Warnanya pun beda — yang berjalan di sini keterangan kesalahan,
   bukan masukan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, yDenyut } from "../panggung-nn";
import { Meter } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "mundur";

const B_KIRIM = beat(ID, 0); // "Keterangan kesalahan itu dikirim mundur lewat jaringannya."

export const Mundur: React.FC = () => {
  const d = useDetik();

  /* Dari 1 ke 0: keluaran ke masukan. */
  const u = t(d, { mulai: B_KIRIM + 0.2, durasi: 1.3, dari: 1, ke: 0, ease: E.sineInOut });
  const y = yDenyut(u);
  const on = t(d, { mulai: B_KIRIM + 0.15, durasi: 0.15, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_KIRIM + 0.25, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan opacity={0.85} />

          {/* Denyut mundur — warna peringatan, bukan aksen. */}
          <g opacity={on}>
            <circle cx={W / 2} cy={y} r={40} fill="var(--bad-soft)" />
            <circle cx={W / 2} cy={y} r={16} fill="var(--bad)" />
          </g>

          <Meter y={1330} nilai={0.72} label="KESALAHAN" opacity={0.6} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["MUNDUR"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
