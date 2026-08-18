/* T18-S4 · scene 2 · sisi-ip
   VO:        2-sisi-ip-vo.md
   Direction: 2-sisi-ip-direction.md

   DUA KEPUTUSAN:

   1. Dua tujuan yang TIDAK dipilih tetap terlihat. Kalau keduanya hilang, yang
      terbaca "cuma ada satu jalan" dan memilih berhenti jadi memilih — kesalahan
      yang sama yang sudah diperbaiki di scene 9 video panjang.

   2. Gerakannya sengaja daur ulang dari Short 1 scene 4. Penonton Short 4
      mungkin belum menonton Short 1, tapi yang sudah akan mengenalinya — dan
      keduanya menunjuk hal yang sama.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Label, Paket } from "../../panggung-jaringan";
import { TeksLayar, W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "sisi-ip";

const B_BAYANG = beat(ID, 0); // "Bayangkan kamu mengirim sebuah paket."
const B_IP = beat(ID, 1); // "IP membantu menentukan alamat…"

const Y_NAMA_AWAL = 900;
const Y_NAMA = 620;
const Y_CABANG = 1000;
const Y_TUJUAN = 1440;

const TUJUAN = ["A", "B", "C"] as const;
const DIPILIH = 1;
const X_TUJUAN = [280, 540, 800] as const;

export const SisiIp: React.FC = () => {
  const d = useDetik();

  /* Nama IP pindah dari tempatnya di scene 1 ke atas; TCP keluar. */
  const pindah = t(d, { mulai: B_BAYANG, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const cabang = masuk(d, { mulai: B_BAYANG + 0.5, durasi: 0.5, geser: 20 });

  const pilih = t(d, { mulai: B_IP + 0.4, durasi: 0.5, dari: 0, ke: 1 });
  const jalan = t(d, { mulai: B_IP + 0.8, durasi: 1.2, dari: 0, ke: 1, ease: E.power1out });

  const teks = masuk(d, { mulai: B_BAYANG + 0.3, durasi: 0.45, geser: 20 });

  const xPaket = W / 2 + ((X_TUJUAN[DIPILIH] ?? W / 2) - W / 2) * jalan;
  const yPaket = Y_CABANG + (Y_TUJUAN - 130 - Y_CABANG) * jalan;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* TCP keluar; IP naik ke atas dan tinggal. */}
          <g opacity={1 - pindah}>
            <Label x={W / 2 - 240 - 300 * pindah} y={Y_NAMA_AWAL} teks="TCP" besar />
          </g>
          <Label
            x={W / 2 + 240 - 240 * pindah}
            y={Y_NAMA_AWAL + (Y_NAMA - Y_NAMA_AWAL) * pindah}
            teks="IP"
            besar
          />

          <g style={{ opacity: cabang.opacity, transform: cabang.transform }}>
            {/* Tiga cabang; yang tidak dipilih TETAP terlihat. */}
            {X_TUJUAN.map((x, i) => (
              <line
                key={x}
                x1={W / 2}
                y1={Y_CABANG}
                x2={x}
                y2={Y_TUJUAN - 60}
                stroke={i === DIPILIH ? "var(--accent)" : "var(--line)"}
                strokeWidth={6}
                strokeLinecap="round"
                opacity={i === DIPILIH ? 0.35 + 0.65 * pilih : 0.45}
              />
            ))}

            {TUJUAN.map((nama, i) => (
              <g key={nama}>
                <rect
                  x={(X_TUJUAN[i] ?? 0) - 66}
                  y={Y_TUJUAN - 60}
                  width={132}
                  height={120}
                  rx={14}
                  fill="var(--bg-elev)"
                  stroke={i === DIPILIH ? "var(--accent)" : "var(--line)"}
                  strokeWidth={5}
                  opacity={i === DIPILIH ? 0.5 + 0.5 * pilih : 0.6}
                />
                <text
                  x={X_TUJUAN[i]}
                  y={Y_TUJUAN + 18}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize={54}
                  fontWeight={700}
                  fill="var(--ink-0)"
                  opacity={i === DIPILIH ? 0.6 + 0.4 * pilih : 0.6}
                >
                  {nama}
                </text>
              </g>
            ))}

            <Paket
              x={xPaket}
              y={yPaket}
              nomor={1}
              skala={0.86}
              warna={jalan > 0.95 ? "ok" : "biasa"}
            />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["IP: ke mana?"]} y={300} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
