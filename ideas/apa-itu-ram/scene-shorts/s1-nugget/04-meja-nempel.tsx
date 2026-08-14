/* T01-S1 · scene 4 · meja-nempel — beat payoff 1 dari 3, 4,69 dtk
   Direction: 04-meja-nempel-direction.md
   VO:        04-meja-nempel-vo.md

   Panggung tidak dibangun ulang: ketiga tempat, garis, dan jam mulai persis di
   keadaan akhir 03-satu-detik. Yang berubah cuma MANA yang menyala.

   Satu strip jarum sengaja hampir tidak kelihatan. Ia patokan; yang harus
   terlihat besar adalah putaran penuh di scene 5, dan besar-kecilnya cuma punya
   arti kalau ada patokan yang kecil.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Chip, Jam, KolomAngka, TeksAtas, TigaTempat } from "../tiga-tempat";
import { beat } from "./timing.gen";

const ID = "meja-nempel";

const T_NYALA = beat(ID, 0) + 0.15;
/** Satu strip muka jam = 6 derajat. */
const SUDUT_SESTRIP = 6;

export const MejaNempel: React.FC = () => {
  const d = useDetik();

  const sudut = t(d, {
    mulai: T_NYALA + 0.35,
    durasi: 0.3,
    dari: 0,
    ke: SUDUT_SESTRIP,
    ease: E.power2out,
  });

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        yang paling <span style={{ color: "var(--accent-ink)" }}>dekat</span>
      </TeksAtas>

      <Chip redup />
      <TigaTempat terang={(x) => x === "nempel"} />
      <Jam sudut={sudut} />

      {/* Angka pertama mendarat di sini dan TIDAK pernah pergi lagi — dua
          saudaranya menyusul di scene 5 & 6, dan ketiganya harus bisa dibaca
          bersamaan (04-meja-nempel-direction.md). */}
      <KolomAngka d={d} mulai={[T_NYALA + 0.5]} />
    </Scene>
  );
};
