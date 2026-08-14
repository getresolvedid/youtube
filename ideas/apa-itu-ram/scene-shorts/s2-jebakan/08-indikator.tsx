/* T01-S2 · scene 8 · indikator — beat konsekuensi, 7,26 dtk
   Direction: 08-indikator-direction.md
   VO:        08-indikator-vo.md

   Bagian yang bisa dipakai penonton besok pagi, dan satu-satunya tempat kata
   "ram" muncul lagi setelah scene 1 — di layar, tepat di sebelah mejanya, jadi
   pasangannya terbaca tanpa satu kalimat definisi pun (HARD RULE 6).

   DUA HAL YANG TIDAK BOLEH DIUBAH:

   1. Bilahnya DITANDAI SILANG, bukan dihapus. Penonton akan tetap melihat angka
      itu di komputernya besok; yang perlu berubah bobotnya, bukan keberadaannya.
   2. Bilahnya TIDAK BERANGKA. Persentase apa pun di situ adalah jebakan yang
      sedang dibantah, dan menuliskannya menanamnya lebih dalam.

   Panah bolak-balik bukan benda baru — ia gerakan yang sama yang sudah berjalan
   sejak scene 7, cuma disorot. Diagram baru di sini memutus rantai sebab yang
   baru saja dibangun.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Berkas,
  Gudang,
  Meja,
  TeksAtas,
  W_PENUH,
  X_PENUH,
  X_TENGAH,
  Y_GUDANG_NAIK,
  Y_MEJA,
  hitungBalik,
} from "../meja-kerja";
import { T_TURUN } from "./07-bolak-balik";
import { beat, cari } from "./timing.gen";

const ID = "indikator";

const T_BILAH = 0.15;
const T_SILANG = beat(ID, 0) + 1.1;
const T_PINDAH = beat(ID, 1);

const BILAH = { w: 620, h: 46, y: 700 };
/** Berhenti sebelum ujung — bilah yang mentok terbaca sebagai "habis", dan
 *  itu klaim yang tidak dibuat kalimat mana pun di sini. */
const ISI = 0.92;

/** Hitungan bolak-balik melanjutkan dari 07-bolak-balik — DITURUNKAN dari
 *  timing scene itu, bukan angka baru yang kebetulan mirip. */
const SEJAK_BALIK = cari("bolak-balik").durasi - T_TURUN;

export const Indikator: React.FC = () => {
  const d = useDetik();

  const isi = t(d, { mulai: T_BILAH, durasi: 0.5, dari: 0, ke: ISI, ease: E.power2out });
  const silang = gambarGaris(d, BILAH.w, { mulai: T_SILANG, durasi: 0.3 });
  const pindah = t(d, { mulai: T_PINDAH, durasi: 0.5, dari: 0, ke: 1, ease: E.power3out });

  /** Panah antara meja dan gudang, denyut naik-turun — gerakan yang sama yang
   *  sudah berjalan sejak scene 7. */
  const denyut = (d * 1.6) % 1;

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        {d < T_PINDAH ? (
          "bukan angka terpakainya"
        ) : (
          <span style={{ color: "var(--accent-ink)" }}>bolak-balik ke gudang</span>
        )}
      </TeksAtas>

      {/* bilah "ram terpakai" — tanpa angka, ditandai silang, lalu tinggal redup */}
      <div style={{ opacity: 1 - 0.55 * pindah }}>
        <p
          className="t-label"
          style={{
            position: "absolute",
            left: X_TENGAH - BILAH.w / 2,
            top: BILAH.y - 44,
            fontFamily: "var(--font-mono)",
            color: "var(--ink-1)",
          }}
        >
          ram terpakai
        </p>
        <div
          style={{
            position: "absolute",
            left: X_TENGAH - BILAH.w / 2,
            top: BILAH.y,
            width: BILAH.w,
            height: BILAH.h,
            borderRadius: 10,
            border: "3px solid var(--line)",
            background: "var(--bg-elev)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${isi * 100}%`,
              height: "100%",
              background: "var(--ink-2)",
            }}
          />
        </div>
        <svg
          style={{
            position: "absolute",
            left: X_TENGAH - BILAH.w / 2,
            top: BILAH.y,
            width: BILAH.w,
            height: BILAH.h,
            overflow: "visible",
          }}
        >
          <line
            x1={0}
            y1={0}
            x2={BILAH.w}
            y2={BILAH.h}
            stroke="var(--warn)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={silang.strokeDasharray}
            strokeDashoffset={silang.strokeDashoffset}
          />
        </svg>
      </div>

      <Meja />
      {X_PENUH.map((x, k) => (k === 0 ? null : <Berkas key={x} x={x} w={W_PENUH} />))}

      {/* panah turun-naik — disorot, bukan digambar ulang */}
      <div
        style={{
          position: "absolute",
          left: X_TENGAH - 4,
          top: Y_MEJA + 40,
          width: 8,
          height: Y_GUDANG_NAIK - Y_MEJA - 60,
          background: "var(--accent)",
          opacity: 0.25 + 0.75 * pindah,
          transform: `scaleY(${0.9 + 0.1 * Math.sin(denyut * Math.PI * 2)})`,
          transformOrigin: "center",
        }}
      />

      <Gudang y={Y_GUDANG_NAIK} />

      {/* hitungan yang tadi kecil di sudut, sekarang di tengah dan besar */}
      <p
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 560,
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: 40 + 34 * pindah,
          color: "var(--warn)",
          opacity: pindah,
        }}
      >
        bolak-balik ×{hitungBalik(SEJAK_BALIK + d)}
      </p>
    </Scene>
  );
};
