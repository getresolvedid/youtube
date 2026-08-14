/* T16 · scene 3 · jalan-umum — bagian 3 [problem], 20,69 dtk
   VO:        03-jalan-umum-vo.md
   Direction: 03-jalan-umum-direction.md

   Frame pertamanya = frame terakhir `01-hook-banyak-tangan`: jalan, lima tangan,
   kotak berhenti di tengah. Kartu judul menyela di antaranya, jadi yang
   menyambung keduanya VO-nya (HARD RULE 7).

   JALUR BERSIH DI TAHAP 3 MUNCUL UNTUK DIPADAMKAN. Kalau ia tidak pernah
   ditunjukkan, penonton menyimpan harapannya sendiri sampai bagian 6 dan
   mengukur semua jawaban terhadap harapan yang tidak pernah dibantah.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  Jalan,
  Kotak,
  Meja,
  N_TANGAN,
  Tangan,
  X_KIRIM,
  X_LUAR_KANAN,
  X_LUAR_KIRI,
  Y_JALAN,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "jalan-umum";

const B_SEPI = beat(ID, 0); // "Bukan karena jalannya sepi."
const B_RAMAI = beat(ID, 1); // "Jalannya justru ramai…"
const B_JALUR = beat(ID, 2); // "Tidak ada jalur khusus…"
const B_TANGAN = beat(ID, 3); // "Tiap kotak lewat tangan…"
const B_BENTUK = beat(ID, 4); // "Itu bukan kerusakan."
const B_KOTAK = beat(ID, 5); // "…kotaknya yang harus diapa-apakan."

const X_BERHENTI = 960;

/** Kotak lain di jalan — kecepatan dan titik lahirnya diturunkan dari INDEKS,
 *  bukan dari acak: `Math.random()` dilarang (CLAUDE.md § Deterministik). */
const LAIN = [
  { x0: 120, laju: 780, skala: 0.62 },
  { x0: 520, laju: 620, skala: 0.5 },
  { x0: 980, laju: 900, skala: 0.56 },
  { x0: 1380, laju: 700, skala: 0.46 },
  { x0: 1700, laju: 840, skala: 0.58 },
] as const;

const PANJANG_JALUR = X_LUAR_KANAN - X_LUAR_KIRI;

export const JalanUmum: React.FC = () => {
  const d = useDetik();

  /* Satu tween untuk seluruh arus, lalu satu tween kedua yang nyaris berhenti.
     Dijumlahkan, jadi lajunya turun tanpa satu pun nilai yang menyimpan state. */
  const jalanCepat = t(d, { mulai: B_RAMAI, durasi: B_BENTUK - B_RAMAI, dari: 0, ke: 1, ease: E.linear });
  const jalanPelan = t(d, { mulai: B_BENTUK, durasi: 6, dari: 0, ke: 0.12, ease: E.power2out });
  const arus = jalanCepat + jalanPelan;

  const ramai = t(d, { mulai: B_RAMAI, durasi: 0.6, dari: 0, ke: 1 });

  const jalur = gambarGaris(d, PANJANG_JALUR, { mulai: B_JALUR + 0.1, durasi: 0.9 });
  const jalurPadam = 1 - t(d, { mulai: B_JALUR + 1.5, durasi: 0.7, dari: 0, ke: 1, ease: E.power2in });

  const sorot = t(d, { mulai: B_TANGAN, durasi: 0.5, dari: 0, ke: 1 });
  /* Tangan menyala berurutan mengikuti kotakmu yang diam: penanda berjalan dari
     kiri ke kanan sepanjang beat ini. */
  const berjalan = t(d, { mulai: B_TANGAN, durasi: 2.4, dari: -1, ke: N_TANGAN });

  const redup = t(d, { mulai: B_KOTAK, durasi: 0.8, dari: 1, ke: 0.22 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({})}>
            <g opacity={redup}>
              <Jalan />
              <Meja x={X_KIRIM} />
              {Array.from({ length: N_TANGAN }, (_, i) => (
                <Tangan
                  key={i}
                  x={posTangan(i)}
                  nyala={sorot > 0.4 && Math.abs(berjalan - i) < 0.55 ? 1 : 0}
                />
              ))}

              {/* arus kotak lain — jalannya memang dipakai ramai-ramai */}
              {LAIN.map((k, i) => {
                const x = X_LUAR_KIRI + ((k.x0 + k.laju * arus - X_LUAR_KIRI) % PANJANG_JALUR);
                return (
                  <g key={i} opacity={ramai * 0.55}>
                    <Kotak x={x} y={Y_JALAN} skala={k.skala} />
                  </g>
                );
              })}

              {/* jalur bersih yang tidak pernah ada */}
              <path
                d={`M${X_LUAR_KIRI} ${Y_JALAN - 190}h${PANJANG_JALUR}`}
                stroke={AKSEN}
                strokeWidth={4}
                strokeLinecap="round"
                opacity={0.8 * jalurPadam}
                strokeDasharray={jalur.strokeDasharray}
                strokeDashoffset={jalur.strokeDashoffset}
              />
            </g>

            {/* kotakmu — satu-satunya yang tidak ikut meredup */}
            <Kotak x={X_BERHENTI} y={Y_JALAN} />
            <circle
              cx={X_BERHENTI}
              cy={Y_JALAN - 52}
              r={118}
              fill="none"
              stroke={AKSEN}
              strokeWidth={4}
              strokeDasharray="12 14"
              opacity={0.55 * sorot}
            />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
