/* T01-S2 · scene 3 · meja — beat bantahan → bukti, 5,11 dtk
   Direction: 03-meja-direction.md
   VO:        03-meja-vo.md

   Undangan Short ini, dan satu-satunya (docs/09 aturan 4: satu analogi per
   topik). Enam scene sesudahnya berdiri di meja yang sama dan tidak mengundang
   ulang.

   MEJA MASUK KOSONG DULU, BARU DIISI. Meja yang datang lengkap dengan berkasnya
   membuat undangan VO ("Bayangkan meja kerja") jatuh di layar yang sudah
   selesai — penonton tidak sempat membayangkan apa pun.

   Pucuk gudang di tepi bawah adalah satu-satunya persiapan untuk scene 7.
   Tanpanya, gudang di sana datang entah dari mana.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Berkas,
  Gudang,
  MIRING,
  Meja,
  Mitos,
  TeksAtas,
  X_BERKAS,
  Y_MEJA,
} from "../meja-kerja";
import { beat } from "./timing.gen";

const ID = "meja";

const T_MASUK = beat(ID, 0) + 0.15;
const T_BERKAS = beat(ID, 1);
const JEDA_BERKAS = 0.16;

export const MejaScene: React.FC = () => {
  const d = useDetik();

  /* mitos keluar ke atas — dibuang, bukan memudar di tempat: ia sudah selesai
     tugasnya, dan yang tinggal di layar harus meja */
  const keluar = t(d, { mulai: 0.05, durasi: 0.35, dari: 0, ke: 1, ease: E.power1in });

  const mMeja = t(d, {
    mulai: T_MASUK,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });

  return (
    <Scene tengah={false}>
      <Mitos opacity={1 - keluar} geser={-120 * keluar} redup={0.35} />

      <TeksAtas
        {...masuk(d, { mulai: T_MASUK + 0.2, durasi: 0.4 })}
        warna="var(--ink-1)"
      >
        yang sedang kamu buka
      </TeksAtas>

      <Meja opacity={mMeja} geser={80 * (1 - mMeja)} />

      {X_BERKAS.map((x, i) => {
        const m = t(d, {
          mulai: T_BERKAS + i * JEDA_BERKAS,
          durasi: 0.42,
          dari: 0,
          ke: 1,
          ease: E.backOut(1.4),
        });
        return (
          <div key={x} style={{ opacity: Math.min(1, m * 2) }}>
            <Berkas x={x} miring={(MIRING[i] ?? 0) * m} angkat={(1 - m) * 60} />
          </div>
        );
      })}

      {/* pucuk gudang: ada sejak sekarang, dipakai baru di scene 7 */}
      <Gudang opacity={mMeja * 0.9} />
    </Scene>
  );
};
