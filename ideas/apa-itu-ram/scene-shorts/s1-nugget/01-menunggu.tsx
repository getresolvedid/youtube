/* T01-S1 · scene 1 · menunggu — beat hook, 2,97 dtk
   Direction: 01-menunggu-direction.md   ← sumber tata letak & koreografi
   VO:        01-menunggu-vo.md          ← sumber kalimat & beat

   Frame pertama Short ini, dan sekaligus frame yang didarati penonton saat
   Short mengulang. Karena itu susunannya dijaga identik dengan frame TERAKHIR
   09-loop: posisi chip, pola denyutnya, dan letak hitungan diam semuanya dibaca
   dari ../tiga-tempat.tsx, bukan diketik di sini.

   Yang bergerak setelah detik 1 cuma hitungan diam — dan itu memang isi
   scene-nya: layar yang ikut berhenti bersama chip-nya membuat "menunggu"
   terasa, bukan cuma terbaca.
*/
import type React from "react";

import { masuk, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Chip, HitunganDiam, T_DIAM, TeksAtas, denyutChip } from "../tiga-tempat";

/** Denyut mulai hampir seketika — hook tidak punya waktu untuk pemanasan. */
const T_DENYUT = 0.06;

export const Menunggu: React.FC = () => {
  const d = useDetik();

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.4 })}>
        prosesormu lebih sering
        <br />
        <span style={{ color: "var(--warn)" }}>MENUNGGU</span>
      </TeksAtas>

      <Chip skala={denyutChip(d, T_DENYUT)} />
      <HitunganDiam
        nilai={d - T_DIAM}
        opacity={masuk(d, { mulai: T_DIAM, durasi: 0.3 }).opacity}
      />
    </Scene>
  );
};
