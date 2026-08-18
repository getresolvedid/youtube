/* T18-S4 · scene 5 · namanya — tutup + loop
   VO:        5-namanya-vo.md
   Direction: 5-namanya-direction.md

   DUA KEPUTUSAN:

   1. Garis miringnya yang jadi payoff, bukan namanya. Nama "TCP/IP" sudah
      disebut di scene 1; yang baru di sini adalah penonton akhirnya tahu kenapa
      ada dua nama dan kenapa dipisah garis miring. Karena itu ia muncul
      BELAKANGAN, setelah keduanya bertemu — bukan bersamaan.

   2. Merapatnya dua gerakan berurutan: MELEBAR DULU, baru bertemu. Urutan
      sebaliknya (y dulu) membuat kedua nama melewati titik yang sama persis di
      tengah frame dan saling menimpa penuh — `npm run tumpang` melaporkannya.
      Melebar dulu juga lebih benar isinya: keduanya memang harus terpisah
      sebelum garis miring punya tempat untuk berdiri.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Label } from "../../panggung-jaringan";
import { JaringanTegak, W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "namanya";
const B_ITULAH = beat(ID, 0); // "Itulah mengapa kita sering mendengar istilah TCP/IP."

/** Tempat kedua nama sebelum merapat — warisan scene 4 (atas & bawah). */
const Y_IP_AWAL = 510;
const Y_TCP_AWAL = 1490;
const Y_TEMU = 960;
/** Jarak akhir dari tengah, cukup untuk menyisipkan garis miring. */
const X_AKHIR = 210;

export const Namanya: React.FC = () => {
  const d = useDetik();

  /* Dua gerakan BERURUTAN: melebar dulu, baru bertemu. */
  const lebar = t(d, { mulai: B_ITULAH + 0.2, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out });
  const temu = t(d, { mulai: B_ITULAH + 0.8, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });

  const miring = masuk(d, { mulai: B_ITULAH + 1.6, durasi: 0.4, geser: 0 });

  const yIp = Y_IP_AWAL + (Y_TEMU - Y_IP_AWAL) * temu;
  const yTcp = Y_TCP_AWAL + (Y_TEMU - Y_TCP_AWAL) * temu;
  const xOffset = X_AKHIR * lebar;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak jalur={[]} luas={1} opacity={0.6} />

          <Label x={W / 2 - xOffset} y={yTcp} teks="TCP" besar />
          <Label x={W / 2 + xOffset} y={yIp} teks="IP" besar />

          {/* Payoff-nya: garis miring, dan ia datang BELAKANGAN. */}
          <g style={{ opacity: miring.opacity, transform: miring.transform }}>
            <text
              x={W / 2}
              y={Y_TEMU}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize={86}
              fontWeight={800}
              fill="var(--accent)"
            >
              /
            </text>
            <text
              x={W / 2}
              y={Y_TEMU + 190}
              textAnchor="middle"
              fontFamily="var(--font-body)"
              fontSize={40}
              fill="var(--ink-2)"
            >
              dua tugas, satu nama
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
