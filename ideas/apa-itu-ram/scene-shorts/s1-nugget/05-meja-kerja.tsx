/* T01-S1 · scene 5 · meja-kerja — beat payoff 2 dari 3, 3,4 dtk
   Direction: 05-meja-kerja-direction.md
   VO:        05-meja-kerja-vo.md

   Lanjutan langsung dari 04-meja-nempel; "1 detik" tetap di kolom kanan sejak
   frame pertama scene ini, dan jarum jam mulai dari strip tempat scene lalu
   meninggalkannya.

   Putaran penuh dipilih justru karena BERLEBIHAN untuk satu menit di muka jam:
   yang harus mendarat rasa "jauh lebih lama", dan satu putaran adalah bahasa jam
   yang paling langsung untuk itu.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Chip, Jam, KolomAngka, TeksAtas, TigaTempat } from "../tiga-tempat";
import { beat } from "./timing.gen";

const ID = "meja-kerja";

const T_PUTAR = beat(ID, 0) + 0.2;
const DUR_PUTAR = 0.55;

export const MejaKerja: React.FC = () => {
  const d = useDetik();

  const sudut = t(d, {
    mulai: T_PUTAR,
    durasi: DUR_PUTAR,
    dari: 6,
    ke: 366,
    ease: E.power2out,
  });

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        satu <span style={{ color: "var(--accent-ink)" }}>meja</span> ke bawah
      </TeksAtas>

      <Chip redup />
      <TigaTempat terang={(x) => x === "meja"} />
      <Jam sudut={sudut} />

      {/* Angka kedua jatuh tepat saat jarum menyentuh dua belas lagi. */}
      <KolomAngka d={d} mulai={[-1, T_PUTAR + DUR_PUTAR - 0.1]} />
    </Scene>
  );
};
