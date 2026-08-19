/* T19-S1 · scene 6 · berikutnya — gantungan episode berikutnya
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   Dua detik. Kamera masuk ke SATU simpul, sisanya menepi.

   DUA KEPUTUSAN:

   1. Dorongannya dihitung dari `titikGelung()`, bukan dari titik yang diketik
      ulang di sini. Simpul keluaran sudah bergeser sejak scene 4; titik yang
      ditulis tangan akan mendorong ke tempat yang salah beberapa piksel — dan
      di skala 1,6 beberapa piksel jadi puluhan.

   2. Teksnya digambar DI LUAR grup yang didorong, jadi ia tidak ikut membesar.
      Dua detik terakhir Short adalah tempat YouTube menggambar judul dan nama
      channel; teks yang ikut terdorong akan meleset ke luar kotak aman persis
      saat ia jadi satu-satunya yang harus terbaca.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Jaringan,
  LabelTahap,
  RANTAI_INTI,
  SKALA_GELUNG,
  TeksLayar,
  W,
  petaGelung,
  simpul,
  titikGelung,
} from "../panggung-nn";
import { beat, cari } from "./timing.gen";

const ID = "berikutnya";

const B_NEXT = beat(ID, 0); // "Berikutnya: apa kerja satu neuron?"
const DUR = cari(ID).durasi;

/** Simpul keluaran, setelah geseran scene 4. Titik tumpu dorongan kamera. */
const TUMPU = titikGelung(simpul(2, 0).x, simpul(2, 0).y);

/* Rantai scene 5 (`RANTAI_INTI`) digambar ulang di frame 0 lalu dipadamkan —
   itulah jahitannya. */

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const rantaiKeluar = t(d, { mulai: 0.05, durasi: 0.25, dari: 1, ke: 0 });

  /* Mendekat, bukan mendarat — `sineInOut`, bukan `backOut`. */
  const dorong = t(d, {
    mulai: 0.2,
    durasi: Math.max(0.6, DUR - 0.9),
    dari: 1,
    ke: 1.6,
    ease: E.sineInOut,
  });
  const sisa = t(d, { mulai: 0.2, durasi: 0.6, dari: 0.12, ke: 0.05 });
  const nyala = t(d, { mulai: 0.35, durasi: 0.5, dari: 0, ke: 1 });

  const teks = masuk(d, { mulai: B_NEXT + 0.55, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g
            transform={`translate(${TUMPU.x} ${TUMPU.y}) scale(${dorong}) translate(${-TUMPU.x} ${-TUMPU.y})`}
          >
            {/* Sisa jaringan tidak dihapus, cuma menepi — simpul yang berdiri
                sendiri tanpa jaringannya berhenti terbaca sebagai bagian dari
                sesuatu, dan justru itu yang dijanjikan episode berikutnya. */}
            <g transform={petaGelung()}>
              <Jaringan opacity={sisa} />
              {/* SATU simpul yang disorot — bukan jaringan kedua di atasnya.
                  Jaringan kedua akan menyalakan semuanya, dan yang dijanjikan
                  episode berikutnya cuma yang satu ini. */}
              <circle
                cx={simpul(2, 0).x}
                cy={simpul(2, 0).y}
                r={34}
                fill="var(--accent)"
                stroke="var(--accent-ink)"
                strokeWidth={5 / SKALA_GELUNG}
                opacity={nyala}
              />
            </g>
          </g>

          <g opacity={rantaiKeluar}>
            {RANTAI_INTI.map((r, i) => (
              <LabelTahap key={r.teks} x={r.x} y={r.y} teks={r.teks} nyala={i === 3 ? 1 : 0} />
            ))}
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "SATU NEURON"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
