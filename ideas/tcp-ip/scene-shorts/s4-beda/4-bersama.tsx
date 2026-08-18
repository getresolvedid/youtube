/* T18-S4 · scene 4 · bersama — payoff
   VO:        4-bersama-vo.md
   Direction: 4-bersama-direction.md

   DI 9:16 LAYAR DIBELAH ATAS–BAWAH, BUKAN KIRI–KANAN. Storyboard menulis "screen
   split menjadi dua" dengan sisi kiri dan kanan, tapi itu bentuk 16:9. Di
   bingkai tegak, dua kolom sempit membuat teksnya tidak terbaca di layar HP.
   Perputaran ini sejalan dengan arah jalur yang juga sudah diputar 90°.

   DUA KEPUTUSAN:

   1. Kedua bidang bergerak SEJAUH YANG SAMA saat menyatu. Yang disampaikan
      kalimatnya adalah kerja sama, bukan penggabungan; bidang yang diam
      sementara yang lain mendatanginya membalik artinya.

   2. Isi kedua bidang daur ulang dari scene 2 dan 3, diperkecil. Rangkuman yang
      memperkenalkan gerakan baru bukan rangkuman.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Centang, Label, Paket } from "../../panggung-jaringan";
import { W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "bersama";

const B_IP = beat(ID, 0); // "Jadi, IP lebih berhubungan dengan alamat dan perjalanan."
const B_TCP = beat(ID, 1); // "TCP lebih berhubungan dengan keandalan komunikasi."
const B_SAMA = beat(ID, 2); // "Mereka memiliki tugas berbeda, tetapi bekerja bersama."

const Y_BELAH = 960;
const Y_ATAS_ISI = 700;
const Y_BAWAH_ISI = 1240;

const X_CABANG = [400, 540, 680] as const;
const DIPILIH = 1;

export const Bersama: React.FC = () => {
  const d = useDetik();

  const garis = gambarGaris(d, W, { mulai: B_IP, durasi: 0.7 });

  const atas = masuk(d, { mulai: B_IP + 0.3, durasi: 0.5, geser: 22 });
  const bawah = masuk(d, { mulai: B_TCP + 0.2, durasi: 0.5, geser: 22 });

  /* Menyatu — jarak yang SAMA untuk keduanya. */
  const satu = t(d, { mulai: B_SAMA + 0.3, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });
  const geser = 150 * satu;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Belahan MENDATAR — bukan tegak. */}
          <line
            x1={0}
            y1={Y_BELAH}
            x2={W}
            y2={Y_BELAH}
            stroke="var(--line)"
            strokeWidth={4}
            opacity={1 - satu}
            {...garis}
          />

          {/* ---------- bidang ATAS: alamat & jalur ---------- */}
          <g style={{ opacity: atas.opacity, transform: atas.transform }}>
            <g transform={`translate(0 ${geser})`}>
              <Label x={W / 2} y={Y_ATAS_ISI - 190} teks="IP" sub="alamat & jalur" />
              {X_CABANG.map((x, i) => (
                <line
                  key={x}
                  x1={W / 2}
                  y1={Y_ATAS_ISI - 60}
                  x2={x}
                  y2={Y_ATAS_ISI + 90}
                  stroke={i === DIPILIH ? "var(--accent)" : "var(--line)"}
                  strokeWidth={5}
                  strokeLinecap="round"
                  opacity={i === DIPILIH ? 1 : 0.45}
                />
              ))}
              <Paket x={X_CABANG[DIPILIH]} y={Y_ATAS_ISI + 130} nomor={1} skala={0.6} warna="ok" />
            </g>
          </g>

          {/* ---------- bidang BAWAH: lengkap & urut ---------- */}
          <g style={{ opacity: bawah.opacity, transform: bawah.transform }}>
            <g transform={`translate(0 ${-geser})`}>
              <Label x={W / 2} y={Y_BAWAH_ISI + 250} teks="TCP" sub="lengkap & urut" />
              {[1, 2, 3, 4].map((n, i) => {
                const x = W / 2 + (i - 1.5) * 130;
                return (
                  <g key={n}>
                    <Paket x={x} y={Y_BAWAH_ISI + 40} nomor={n} skala={0.6} warna="ok" />
                    <Centang x={x} y={Y_BAWAH_ISI + 110} skala={0.9} />
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
