/* T17-S4 · scene 4 · rantai
   VO:        4-rantai-vo.md
   Direction: 4-rantai-direction.md

   RANTAINYA TEGAK, bukan mendatar. Arahan user menulisnya mendatar (bentuk
   16:9); di 9:16 enam potong mendatar memaksa tiap potong mengecil sampai tidak
   terbaca. Arah atas→bawah juga sudah benar: seluruh seri mengalir begitu.

   ENAM POTONG DI DALAM SATU BEAT — `mulai` tiap potong diturunkan dari
   `beat("rantai", 0)` + pecahan DURASI barisnya, bukan detik yang diketik.

   HALO MUNCUL DUA KALI, di kedua ujung, dan bentuknya harus sama persis.
*/
import type React from "react";

import { gambarGaris, masuk, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { SANDI, munculSkala } from "../../panggung-kiriman";
import { TeksLayar, W } from "../panggung-short";
import { beat, cari } from "./timing.gen";

const ID = "rantai";
const B_RANTAI = beat(ID, 0);
const DUR = cari(ID).beat[0]?.durasi ?? 1;

const RANTAI = [
  { y: 340, jenis: "teks", isi: "HALO" },
  { y: 590, jenis: "kotak", isi: "ENKRIPSI" },
  { y: 840, jenis: "sandi", isi: SANDI },
  { y: 1090, jenis: "jaringan", isi: "" },
  { y: 1340, jenis: "kotak", isi: "DEKRIPSI" },
  { y: 1590, jenis: "teks", isi: "HALO" },
] as const;

export const Rantai: React.FC = () => {
  const d = useDetik();

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {RANTAI.map((p, i) => {
            const mulai = B_RANTAI + 0.2 + (i * DUR) / 7;
            const m = masuk(d, { mulai, durasi: 0.45, geser: 14 });
            const s = munculSkala(d, mulai);
            const sebelum = RANTAI[i - 1];
            const panah = sebelum
              ? gambarGaris(d, 96, { mulai: mulai - 0.22, durasi: 0.3 })
              : null;

            return (
              <g key={p.y}>
                {panah && sebelum && (
                  <path
                    d={`M ${W / 2} ${sebelum.y + 66} v 96`}
                    stroke="var(--ink-2)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    fill="none"
                    {...panah}
                  />
                )}

                <g
                  style={{ opacity: m.opacity, transform: m.transform }}
                  transform={`translate(${W / 2} ${p.y}) scale(${s}) translate(${-W / 2} ${-p.y})`}
                >
                  {p.jenis === "teks" && (
                    <text
                      x={W / 2}
                      y={p.y}
                      fontSize={64}
                      fontFamily="var(--font-display)"
                      fontWeight={800}
                      fill="var(--ink-0)"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {p.isi}
                    </text>
                  )}

                  {p.jenis === "sandi" && (
                    <text
                      x={W / 2}
                      y={p.y}
                      fontSize={50}
                      fontFamily="var(--font-mono)"
                      fontWeight={700}
                      fill="var(--accent-ink)"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      letterSpacing={3}
                    >
                      {p.isi}
                    </text>
                  )}

                  {p.jenis === "kotak" && (
                    <>
                      <rect
                        x={W / 2 - 200}
                        y={p.y - 52}
                        width={400}
                        height={104}
                        rx={16}
                        fill="var(--bg-elev)"
                        stroke="var(--accent-ink)"
                        strokeWidth={3}
                      />
                      <text
                        x={W / 2}
                        y={p.y + 2}
                        fontSize={34}
                        fontFamily="var(--font-mono)"
                        fontWeight={700}
                        fill="var(--accent-ink)"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        letterSpacing={2}
                      >
                        {p.isi}
                      </text>
                    </>
                  )}

                  {p.jenis === "jaringan" && (
                    <>
                      <line
                        x1={W / 2 - 180}
                        y1={p.y}
                        x2={W / 2 + 180}
                        y2={p.y}
                        stroke="var(--line)"
                        strokeWidth={5}
                        strokeDasharray="14 18"
                        strokeLinecap="round"
                      />
                      {[-180, -60, 60, 180].map((dx) => (
                        <circle
                          key={dx}
                          cx={W / 2 + dx}
                          cy={p.y}
                          r={12}
                          fill="var(--ink-2)"
                        />
                      ))}
                    </>
                  )}
                </g>
              </g>
            );
          })}

          {/* Tidak ada teks layar tambahan — rantainya sendiri yang jadi teksnya. */}
          <TeksLayar baris={[]} />
        </svg>
      </div>
    </Scene>
  );
};
