/* T18-S2 · scene 2 · dipecah
   VO:        2-dipecah-vo.md
   Direction: 2-dipecah-direction.md

   Scene yang membayar hook: yang tadi tidak muat sekarang muat.

   DUA KEPUTUSAN:

   1. Bidang aslinya HABIS di 0,25 dtk pertama pembelahan. Kalau ia masih
      tinggal saat potongannya muncul, yang terbaca "disalin" — dan itu keliru.

   2. Mulut jalurnya TIDAK melebar. Seluruh isi scene ini adalah bendanya yang
      mengecil; lubang yang ikut membesar membatalkan hook-nya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-jaringan";
import { JaringanTegak, TeksLayar, W, Y_ATAS } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "dipecah";

const B_PECAH = beat(ID, 0); // "Data dapat dipecah menjadi bagian-bagian kecil…"
const B_BUKU = beat(ID, 1); // "Bayangkan kamu ingin mengirim sebuah buku…"
const B_KOTAK = beat(ID, 2); // "Daripada mengirim seluruh buku…"

const BERKAS = { w: 620, h: 300 } as const;
const MULUT = 260;
const Y_MULUT = Y_ATAS + 60;
const N = 5;

export const Dipecah: React.FC = () => {
  const d = useDetik();

  const belah = t(d, { mulai: B_PECAH, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  /* Bidang asli HABIS — tidak ada sisa di belakang potongannya. */
  const sisa = t(d, { mulai: B_PECAH, durasi: 0.25, dari: 1, ke: 0 });

  const kecil = t(d, { mulai: B_BUKU, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });
  const baris = t(d, { mulai: B_KOTAK, durasi: 0.6, dari: 0, ke: 1, ease: E.backOut(1.1) });

  const teks = masuk(d, { mulai: B_PECAH + 0.2, durasi: 0.45, geser: 20 });

  const yBerkas = Y_MULUT - BERKAS.h / 2 - 40;
  /* Lebar barisan menyusut sampai jelas lebih sempit daripada mulut jalur. */
  const jarak = 150 - (150 - 44) * kecil;
  const skala = 1 - 0.38 * kecil;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak jalur={[1]} luas={1} />

          {/* Mulut jalur — DIAM. Yang berubah bendanya. */}
          <rect x={W / 2 - MULUT / 2 - 34} y={Y_MULUT} width={34} height={150} rx={8} fill="var(--ink-2)" />
          <rect x={W / 2 + MULUT / 2} y={Y_MULUT} width={34} height={150} rx={8} fill="var(--ink-2)" />

          {/* Bidang asli — habis. */}
          <g opacity={sisa}>
            <rect
              x={W / 2 - BERKAS.w / 2}
              y={yBerkas - BERKAS.h / 2}
              width={BERKAS.w}
              height={BERKAS.h}
              rx={16}
              fill="var(--bg-elev)"
              stroke="var(--accent)"
              strokeWidth={6}
            />
            <text
              x={W / 2}
              y={yBerkas + 18}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={56}
              fontWeight={700}
              fill="var(--ink-0)"
            >
              FILE
            </text>
          </g>

          {/* Lima potongan — pembelahan, bukan penggandaan. */}
          {Array.from({ length: N }, (_, i) => {
            const dx = (i - (N - 1) / 2) * jarak;
            return (
              <Paket
                key={i}
                x={W / 2 + dx * belah}
                y={yBerkas + 40 * baris}
                nomor={i + 1}
                skala={1.35 * skala}
                opacity={belah}
              />
            );
          })}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["Dipecah", "kecil-kecil."]} y={300} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
