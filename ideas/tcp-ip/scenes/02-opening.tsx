/* T18 · scene 2 · opening — kartu judul standar
   Direction: 02-opening-direction.md

   SCENE-nya sendiri BUKAN milik berkas ini. Kartu judul milik
   shared/StandarScenes.tsx supaya semua episode identik (docs/10); yang tinggal
   di sini cuma FIGUR khas episode ini, yang dikirim Episode.tsx lewat prop
   `figur` di <KartuJudul>.

   Karena itu berkas ini TIDAK terdaftar di SCENES (scenes/index.ts).
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { PAKET } from "../panggung-jaringan";

/** Tiga potongan bernomor yang berjalan beriringan lalu satu tertinggal.
 *
 *  Figurnya sengaja MENJANJIKAN isi episodenya dalam empat detik tanpa satu
 *  kata: benda yang sama, bernomor, dan salah satunya tidak sejalan dengan yang
 *  lain. Itu persis yang dibongkar scene 7. */
export const FigurPaket: React.FC = () => {
  const d = useDetik();

  const maju = (i: number) =>
    t(d, { mulai: 0.35 + i * 0.14, durasi: 1.5, dari: -30, ke: 30, ease: E.sineInOut });

  /* Potongan tengah tertinggal sedikit — janji scene 7, dibayar nanti. */
  const tertinggal = t(d, { mulai: 1.2, durasi: 1.0, dari: 0, ke: 26, ease: E.power1out });

  return (
    <svg viewBox="-200 -90 400 180" style={{ width: 400, height: 180 }} aria-hidden>
      {[0, 1, 2].map((i) => {
        const x = -130 + i * 130 + maju(i) - (i === 1 ? tertinggal : 0);
        return (
          <g key={i} transform={`translate(${x} 0) scale(0.78)`}>
            <rect
              x={-PAKET.w / 2}
              y={-PAKET.h / 2}
              width={PAKET.w}
              height={PAKET.h}
              rx={10}
              fill="var(--bg-elev)"
              stroke={i === 1 ? "var(--accent)" : "var(--line)"}
              strokeWidth={4}
            />
            <rect
              x={-PAKET.w / 2 + 12}
              y={-PAKET.h / 2}
              width={10}
              height={PAKET.h}
              fill={i === 1 ? "var(--accent)" : "var(--ink-2)"}
              opacity={0.5}
            />
            <text
              x={8}
              y={10}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={32}
              fontWeight={700}
              fill="var(--ink-0)"
            >
              {`0${i + 1}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
