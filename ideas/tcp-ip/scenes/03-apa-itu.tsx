/* T18 · scene 3 · apa-itu — definisi
   VO:        03-apa-itu-vo.md
   Direction: 03-apa-itu-direction.md

   VO-nya abstrak sepanjang scene, jadi SELURUH beban ada di layar: tiap benda
   yang disebut harus berdiri sebagai benda, bukan sebagai kata.

   SATU KEPUTUSAN YANG TIDAK BOLEH DIGESER: urutan tiga label di layar sama
   persis dengan urutan yang disebut VO — dikirim, alamat, diterima. Kalau
   tidak, penonton membaca yang satu sambil mendengar yang lain dan kehilangan
   keduanya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Buku,
  Desktop,
  Label,
  Laptop,
  Paket,
  Ponsel,
  Server,
  Y_LANTAI,
} from "../panggung-jaringan";
import { beat, cari } from "../timing.gen";

const ID = "apa-itu";

const B_DEF = beat(ID, 0); // "TCP/IP adalah sekumpulan protokol…"
const B_ATURAN = beat(ID, 1); // "Sederhananya, TCP/IP adalah seperti aturan…"

/** Panjang beat 1 — dipakai untuk menyebar tiga label di sepanjang kalimatnya
 *  tanpa mengetik detik hasil hitungan tangan. */
const PANJANG_ATURAN = cari(ID).beat[1]?.durasi ?? 8;

const PERANGKAT_X = [430, 760, 1120, 1500] as const;

/** Urutannya MENGIKAT — sama dengan urutan yang disebut VO. */
const LABEL = [
  { teks: "SEND", u: 0.16 },
  { teks: "ADDRESS", u: 0.44 },
  { teks: "DELIVER", u: 0.7 },
] as const;

export const ApaItu: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: potongan warisan scene 1 larut, perangkat naik --- */
  const larut = t(d, { mulai: B_DEF, durasi: 0.7, dari: 1, ke: 0 });
  const naik = (i: number) => masuk(d, { mulai: B_DEF + 0.25, urutan: i, jeda: 0.12, geser: 26 });
  const sambung = t(d, { mulai: B_DEF + 0.9, durasi: 1.6, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 2: tiga label, lalu melebur jadi satu nama, lalu buku --- */
  const lebur = t(d, { mulai: B_ATURAN + PANJANG_ATURAN * 0.78, durasi: 0.7, dari: 0, ke: 1 });
  const namaGabung = masuk(d, {
    mulai: B_ATURAN + PANJANG_ATURAN * 0.78 + 0.45,
    durasi: 0.5,
    geser: 16,
  });
  const bukuAda = t(d, { mulai: B_ATURAN + PANJANG_ATURAN * 0.88, durasi: 0.6, dari: 0, ke: 1 });
  const bukuBuka = t(d, { mulai: B_ATURAN + PANJANG_ATURAN * 0.94, durasi: 0.8, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Potongan yang diwarisi scene 1 — ia larut, tidak dipotong keras. */}
          <Paket x={960} y={360} skala={0.4 + 0.6 * larut} opacity={larut} />

          {/* --- garis jaringan antar-perangkat --- */}
          {PERANGKAT_X.slice(0, 3).map((x, i) => {
            const x2 = PERANGKAT_X[i + 1] ?? x;
            const u = Math.min(1, Math.max(0, sambung * 3 - i));
            return (
              <line
                key={i}
                x1={x}
                y1={Y_LANTAI - 250}
                x2={x + (x2 - x) * u}
                y2={Y_LANTAI - 250}
                stroke="var(--accent)"
                strokeWidth={3}
                opacity={0.6}
              />
            );
          })}

          {/* --- empat perangkat: VO bilang "perangkat", jamak --- */}
          <g style={{ opacity: naik(0).opacity, transform: naik(0).transform }}>
            <Laptop x={PERANGKAT_X[0]} y={Y_LANTAI} skala={0.62} nyala={0.8} />
          </g>
          <g style={{ opacity: naik(1).opacity, transform: naik(1).transform }}>
            <Ponsel x={PERANGKAT_X[1]} y={Y_LANTAI} skala={0.86} />
          </g>
          <g style={{ opacity: naik(2).opacity, transform: naik(2).transform }}>
            <Desktop x={PERANGKAT_X[2]} y={Y_LANTAI} skala={0.78} />
          </g>
          <g style={{ opacity: naik(3).opacity, transform: naik(3).transform }}>
            <Server x={PERANGKAT_X[3]} y={Y_LANTAI} skala={0.66} nyala={0.5} />
          </g>

          {/* --- tahap 2: tiga label, urutannya mengikat --- */}
          {LABEL.map((l, i) => {
            const m = masuk(d, {
              mulai: B_ATURAN + PANJANG_ATURAN * l.u,
              durasi: 0.45,
              geser: 18,
            });
            const x = 520 + i * 440;
            return (
              <g
                key={l.teks}
                style={{ opacity: m.opacity * (1 - lebur), transform: m.transform }}
              >
                <Label x={x + (960 - x) * lebur} y={330} teks={l.teks} />
              </g>
            );
          })}

          {/* Nama gabungan, tepat saat ketiganya sampai di tengah. */}
          <g style={{ opacity: namaGabung.opacity * (1 - bukuAda), transform: namaGabung.transform }}>
            <Label x={960} y={330} teks="TCP/IP" besar />
          </g>

          {/* --- buku aturan: muncul sekali di seluruh episode --- */}
          <g opacity={bukuAda}>
            <Buku x={960} y={430} skala={0.78} buka={bukuBuka} judul="NETWORK RULES" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
