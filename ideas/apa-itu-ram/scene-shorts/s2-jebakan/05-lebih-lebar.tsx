/* T01-S2 · scene 5 · lebih-lebar — beat bukti 2 dari 4, 7,26 dtk
   Direction: 05-lebih-lebar-direction.md
   VO:        05-lebih-lebar-vo.md

   Bantahan utama Short ini, dan seluruhnya dipikul oleh satu hal yang TIDAK
   berubah: irama tangan. Ia dibaca dari ../meja-kerja.tsx, sama persis dengan
   scene 4. Kalau di sini iramanya beda beberapa frame saja, mata penonton akan
   membacanya sebagai "jadi lebih cepat" — dan kalimat VO-nya langsung terdengar
   bohong.

   Melebarnya meja TIDAK memakai scale pada seluruh grup: berkas akan ikut
   membesar. Yang melebar cuma lebar mejanya; isinya tetap, dan itu memang
   maksudnya.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  BERKAS,
  Berkas,
  Gudang,
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

const ID = "lebih-lebar";

const T_LEBAR = beat(ID, 0) + 0.15;
const DUR_LEBAR = 0.6;
/** Tangan meneruskan tanpa jeda dari scene 4 — iramanya tidak pernah berhenti
 *  di potongan antar-scene, karena yang dibuktikan justru kesinambungannya. */
const T_TANGAN = 0;

export const LebihLebar: React.FC = () => {
  const d = useDetik();

  const lebar = t(d, {
    mulai: T_LEBAR,
    durasi: DUR_LEBAR,
    dari: MEJA.w,
    ke: MEJA.wLebar,
    ease: E.power3out,
  });

  const { dari, ke, u } = langkahTangan(d, T_TANGAN, URUTAN);
  const xDari = X_BERKAS[dari] ?? 0;
  const xKe = X_BERKAS[ke] ?? 0;
  const xTangan = xDari + (xKe - xDari) * u;

  const kedip = (i: number) =>
    i === ke && u > 0.9
      ? tPP(u, { mulai: 0.9, durasi: 0.1, dari: 0, ke: 1, ease: E.linear })
      : 0;

  /** Separuh kanan yang tinggal kosong. `--ink-2`, BUKAN `--warn`: kosong di
   *  sini belum masalah — ia baru jadi masalah di scene 9, dan warna yang
   *  mendahului kesimpulannya akan mendahului kalimatnya juga. */
  const kiriKosong = (X_BERKAS[3] ?? 0) + BERKAS.w / 2;
  const kananMeja = X_TENGAH + lebar / 2;

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        {d < beat(ID, 1) ? (
          <>
            <span style={{ color: "var(--accent-ink)" }}>2×</span> lebih lebar
          </>
        ) : (
          "kecepatan sama"
        )}
      </TeksAtas>

      <Meja lebar={lebar} />

      <div
        style={{
          position: "absolute",
          left: kiriKosong,
          top: Y_MEJA - BERKAS.h,
          width: Math.max(0, kananMeja - kiriKosong),
          height: BERKAS.h,
          borderRadius: 8,
          border: "3px dashed var(--ink-2)",
          opacity: t(d, { mulai: T_LEBAR + DUR_LEBAR - 0.15, durasi: 0.4, dari: 0, ke: 1 }),
        }}
      />

      {/* Berkasnya TIDAK bertambah saat mejanya melebar — yang menentukan
          jumlahnya pekerjaanmu, bukan lebar mejanya. */}
      {X_BERKAS.map((x, i) => (
        <Berkas key={x} x={x} miring={MIRING[i]} terang={kedip(i) > 0.5} />
      ))}

      <Tangan x={xTangan} />
      <Gudang opacity={0.9} />
    </Scene>
  );
};
