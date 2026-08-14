/* T01-S2 · scene 1 · mitos — beat mitos, 2,97 dtk
   Direction: 01-mitos-direction.md
   VO:        01-mitos-vo.md

   Pernyataannya ditulis besar dan dibaca apa adanya, TANPA dibantah dulu.
   Penonton yang mempercayainya harus merasa kalimat ini miliknya sebelum
   kalimat berikutnya mengambilnya.

   Tidak ada label "MITOS", tidak ada tanda silang, tidak ada apa pun yang
   membantah di scene ini — begitu dilabeli, penonton yang mempercayainya
   langsung tahu ia sedang disalahkan, dan scene 2 kehilangan efeknya.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { KATA_MITOS, Mitos } from "../meja-kerja";

/** Masuk per KATA, bukan per huruf — mengetik huruf demi huruf memakan detik
 *  yang tidak dipunya Short. */
const T_KATA = 0.05;
const JEDA_KATA = 0.16;

export const MitosScene: React.FC = () => {
  const d = useDetik();

  const kata = (i: number) =>
    t(d, {
      mulai: T_KATA + Math.min(i, KATA_MITOS.length - 1) * JEDA_KATA,
      durasi: 0.4,
      dari: 0,
      ke: 1,
      ease: E.expoOut,
    });

  return (
    <Scene tengah={false}>
      <Mitos kata={kata} />
    </Scene>
  );
};
