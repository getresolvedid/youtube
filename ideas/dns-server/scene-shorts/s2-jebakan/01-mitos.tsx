/* T14-S2 · scene 1 · mitos — beat mitos, 4,37 dtk
   Direction: 01-mitos-direction.md
   VO:        01-mitos-vo.md

   Pernyataannya ditulis besar dan dibaca apa adanya, TANPA dibantah dulu.
   Penonton yang mempercayainya harus merasa kalimat ini miliknya sebelum
   kalimat berikutnya mengambilnya.

   Tidak ada label "MITOS", tidak ada tanda silang, tidak ada apa pun yang
   membantah di scene ini — begitu dilabeli, penonton yang mempercayainya
   langsung tahu ia sedang disalahkan, dan scene 2 kehilangan efeknya.

   Bilah kecepatannya NETRAL, bukan aksen. Di Short ini warna aksen dipakai
   untuk yang benar; mitosnya tidak boleh tampil sebagai kesimpulan.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { BilahJanji, KATA_MITOS, Mitos, VIEWBOX_S2 } from "../jalur-tanya";

/** Masuk per KATA, bukan per huruf — mengetik huruf demi huruf memakan detik
 *  yang tidak dipunya Short. */
const T_KATA = 0.05;
const JEDA_KATA = 0.14;

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

  const janji = t(d, {
    mulai: 0.5,
    durasi: 1.4,
    dari: 0,
    ke: 1,
    ease: E.backOut(1.4),
  });

  return (
    <Scene tengah={false}>
      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <Mitos kata={kata} />
        <BilahJanji naik={janji} />
      </svg>
    </Scene>
  );
};
