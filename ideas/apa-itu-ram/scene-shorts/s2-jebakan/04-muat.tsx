/* T01-S2 · scene 4 · muat — beat bukti 1 dari 4, 6,4 dtk
   Direction: 04-muat-direction.md
   VO:        04-muat-vo.md

   Scene ini MEMASANG IRAMA yang jadi alat ukur seluruh Short: irama yang sama
   dipakai lagi di scene 5, lalu patah di scene 7. Iramanya dibaca dari
   ../meja-kerja.tsx (`IRAMA`, `langkahTangan`) dan tidak pernah diketik ulang —
   alasannya ada di kepala berkas itu.

   Sorotan ruang kosong muncul SEKALI dan tinggal. Berkedip berulang akan
   terbaca sebagai peringatan, padahal di scene ini kosong itu kabar baik.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  BERKAS,
  Berkas,
  Gudang,
  IRAMA,
  MEJA,
  MIRING,
  Meja,
  Tangan,
  TeksAtas,
  URUTAN,
  X_BERKAS,
  X_TENGAH,
  Y_MEJA,
  langkahTangan,
} from "../meja-kerja";
import { beat } from "./timing.gen";

const ID = "muat";

const T_SOROT = beat(ID, 0) + 0.2;
const T_TANGAN = beat(ID, 1);

/** Sisa ruang kosong di kanan meja — kira-kira selebar satu berkas. */
const X_KOSONG = (X_BERKAS[3] ?? 0) + BERKAS.w / 2;
const W_KOSONG = X_TENGAH + MEJA.w / 2 - X_KOSONG;

export const Muat: React.FC = () => {
  const d = useDetik();

  const { dari, ke, u } = langkahTangan(d, T_TANGAN, URUTAN);
  const xDari = X_BERKAS[dari] ?? 0;
  const xKe = X_BERKAS[ke] ?? 0;
  const xTangan = xDari + (xKe - xDari) * u;

  /** Berkas berkedip tepat saat tangan mendarat padanya. */
  const kedip = (i: number) =>
    i === ke && u > 0.9
      ? tPP(u, { mulai: 0.9, durasi: 0.1, dari: 0, ke: 1, ease: E.linear })
      : 0;

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        {d < T_TANGAN ? (
          "masih muat"
        ) : (
          <>
            secepat <span style={{ color: "var(--ok)" }}>tanganmu</span>
          </>
        )}
      </TeksAtas>

      <Meja />

      {/* sisa ruang: disorot sekali, lalu tinggal */}
      <div
        style={{
          position: "absolute",
          left: X_KOSONG,
          top: Y_MEJA - BERKAS.h,
          width: W_KOSONG,
          height: BERKAS.h,
          borderRadius: 8,
          background: "var(--accent-soft)",
          opacity: t(d, { mulai: T_SOROT, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut }),
          transform: `scaleX(${t(d, {
            mulai: T_SOROT,
            durasi: 0.4,
            dari: 0.9,
            ke: 1,
            ease: E.expoOut,
          })})`,
        }}
      />

      {X_BERKAS.map((x, i) => (
        <Berkas key={x} x={x} miring={MIRING[i]} terang={kedip(i) > 0.5} />
      ))}

      <Tangan
        x={xTangan}
        opacity={t(d, { mulai: T_TANGAN - 0.2, durasi: 0.3, dari: 0, ke: 1 })}
      />

      <Gudang opacity={0.9} />
    </Scene>
  );
};
