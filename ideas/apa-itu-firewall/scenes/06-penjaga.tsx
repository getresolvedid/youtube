/* T15 · scene 6 · penjaga — bagian 4 [answer] → [what], 20,70 dtk
   VO:        06-penjaga-vo.md
   Direction: 06-penjaga-direction.md

   Scene yang MENAMAI subjek episode. Frame pertamanya = frame terakhir
   `05-dikunci-semua`: dua benda identik diam di depan dinding yang tergembok.

   TIGA KEPUTUSAN:

   1. Penjaganya berdiri PERSIS di ruang kosong antara benda-benda itu dan
      dinding — ruang yang sudah terlihat sejak scene 1 dan tidak pernah diisi
      siapa pun. Kalau ia muncul di tempat lain, hubungan sebab-akibatnya hilang.

   2. Baris terakhir daftar sudah digambar berbeda warna sejak tahap 5, tapi
      TIDAK disorot dan tidak disebut. Ia menunggu scene 8; yang ditanam di sini
      cuma bahwa ia ada.

   3. Nama resmi muncul PALING AKHIR dan SENDIRIAN. Kartu judul sudah menulis
      "Firewall" di detik ~21; kalau nama ini datang bersama gerakan lain, ia
      terbaca sebagai pengulangan judul dan bukan sebagai penegasan (HARD RULE 6).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  Daftar,
  Gedung,
  JALUR_Y,
  Ketukan,
  Lantai,
  N_PINTU,
  P_DAFTAR,
  SKALA_DAFTAR_SISI,
  Sosok,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
  posPintu,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "penjaga";

const B_KUNCI = beat(ID, 0); // "Yang kurang bukan kuncinya."
const B_MEMILIH = beat(ID, 1); // "Yang kurang, seseorang yang memilih."
const B_TARUH = beat(ID, 2); // "Jadi di depan pintu ditaruh satu penjaga."
const B_BERHENTI = beat(ID, 3); // "Semua yang datang berhenti dulu di situ."
const B_DAFTAR = beat(ID, 4); // "Dia pegang daftar…"
const B_COCOK = beat(ID, 5); // "Cocok, dibukakan. Tidak cocok, tidak masuk."
const B_NAMA = beat(ID, 6); // "Penjaga di depan pintu itu namanya firewall."

/** Garis berhenti di depan penjaga — tempat semua yang datang mengantre. */
const X_ANTRE = X_PENJAGA - 120;

export const Penjaga: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: gembok lepas dan jatuh keluar frame --- */
  const lepas = (i: number) =>
    t(d, { mulai: B_KUNCI + i * 0.04, durasi: 0.5, dari: 0, ke: 1, ease: E.power2in });

  const pintu = Array.from({ length: N_PINTU }, (_, i) => ({
    nyala: 0.35,
    gembok: 1 - lepas(i),
  }));

  /* --- tahap 2: ruang kosong ditunjuk --- */
  const ruang = t(d, { mulai: B_MEMILIH, durasi: 0.55, dari: 0, ke: 1 });
  const ruangPadam = t(d, { mulai: B_TARUH, durasi: 0.5, dari: 1, ke: 0 });

  /* --- tahap 3: penjaga tumbuh dari garis lantai --- */
  const tumbuh = t(d, {
    mulai: B_TARUH,
    durasi: 0.75,
    dari: 0,
    ke: 1,
    ease: E.backOut(1.3),
  });

  /* --- tahap 4: ketukan mengantre di garis di depannya --- */
  const antre = (k: number) =>
    t(d, {
      mulai: B_BERHENTI + k * 0.3,
      durasi: 1.1,
      dari: 0,
      ke: 1,
      ease: E.power1out,
    });

  /* --- tahap 5: daftar terbuka, barisnya tergambar --- */
  const daftarMasuk = t(d, { mulai: B_DAFTAR, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const baris = t(d, { mulai: B_DAFTAR + 0.35, durasi: 1.4, dari: 0, ke: 4 });

  /* --- tahap 6: satu lewat, satu berbalik --- */
  const lewat = t(d, { mulai: B_COCOK, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });
  const tolak = t(d, { mulai: B_COCOK + 0.85, durasi: 0.9, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 7: namanya mendarat, sendirian --- */
  const nama = masuk(d, { mulai: B_NAMA + 0.12, durasi: 0.5, geser: 24 });

  const pTuju = posPintu(2);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Lantai />
          <Gedung pintu={pintu} />

          {/* gembok yang lepas, jatuh ke bawah dan keluar frame */}
          {Array.from({ length: N_PINTU }, (_, i) => {
            const p = lepas(i);
            if (p <= 0 || p >= 1) return null;
            const pos = posPintu(i);
            return (
              <g key={i} transform={`translate(${pos.x} ${pos.y - 66 + 320 * p})`} opacity={1 - p}>
                <rect x={-17} y={-4} width={34} height={28} rx={5} fill="var(--ink-2)" />
              </g>
            );
          })}

          {/* --- tahap 2: ruang kosong di depan dinding --- */}
          <rect
            x={X_PENJAGA - 150}
            y={Y_LANTAI - 380}
            width={300}
            height={380}
            rx={16}
            fill="none"
            stroke={AKSEN}
            strokeWidth={4}
            strokeDasharray="14 12"
            opacity={0.75 * ruang * ruangPadam}
          />

          {/* --- tahap 4: garis berhenti --- */}
          <path
            d={`M${X_ANTRE} ${Y_LANTAI}v-330`}
            stroke={AKSEN}
            strokeWidth={3}
            strokeDasharray="10 12"
            opacity={0.5 * t(d, { mulai: B_BERHENTI, durasi: 0.5, dari: 0, ke: 1 })}
          />

          {/* --- tahap 3: penjaga --- */}
          <g
            transform={`translate(${X_PENJAGA} ${Y_LANTAI}) scale(1 ${tumbuh}) translate(${-X_PENJAGA} ${-Y_LANTAI})`}
          >
            <Sosok x={X_PENJAGA} y={Y_LANTAI} topi hadap={1} />
          </g>

          {/* --- tahap 4: tiga ketukan mengantre --- */}
          {[0, 1, 2].map((k) => {
            const a = antre(k);
            const xAntre = X_ANTRE - k * 105;
            const x = X_LUAR + (xAntre - X_LUAR) * a;
            /* Ketukan pertama yang nanti dicocokkan di tahap 6: ia yang lewat. */
            const xLewat = k === 0 ? x + (pTuju.x - x) * lewat : x;
            const xTolak = k === 1 ? x - 520 * tolak : xLewat;
            return (
              <Ketukan
                key={k}
                x={xTolak}
                y={JALUR_Y - k * 8}
                skala={0.85}
                opacity={a > 0 ? 1 - (k === 0 ? lewat : k === 1 ? tolak : 0) * 0.9 : 0}
              />
            );
          })}

          {/* --- tahap 5: daftar --- */}
          <g opacity={daftarMasuk}>
            <Daftar
              x={P_DAFTAR.x}
              y={P_DAFTAR.y}
              skala={SKALA_DAFTAR_SISI}
              baris={Math.max(0, Math.round(baris))}
              akhirNyala={0.35}
            />
          </g>

          {/* --- tahap 7: penamaan [what], sendirian --- */}
          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <text
              x={X_PENJAGA}
              y={936}
              fontSize={66}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--accent-ink)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              firewall
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
