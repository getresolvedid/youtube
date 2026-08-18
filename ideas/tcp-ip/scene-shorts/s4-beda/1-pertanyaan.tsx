/* T18-S4 · scene 1 · pertanyaan — hook
   VO:        1-pertanyaan-vo.md
   Direction: 1-pertanyaan-direction.md

   Yang bekerja di sini tipografinya, bukan bendanya.

   DUA KEPUTUSAN:

   1. Beat 0 menempelkan kedua nama RAPAT tanpa jarak. Kerenggangan di beat 1
      baru berarti kalau penonton sempat melihat keduanya sebagai satu benda.

   2. Tidak ada benda apa pun di scene ini — paket, jalur, dan simpul baru masuk
      di scene 2. Layarnya sengaja kosong supaya dua nama itu tidak punya
      saingan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Label } from "../../panggung-jaringan";
import { TeksLayar, W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "pertanyaan";

const B_BARENG = beat(ID, 0); // "TCP dan IP sering disebut bersamaan."
const B_SAMA = beat(ID, 1); // "Tapi apakah keduanya sama?"
const B_TIDAK = beat(ID, 2); // "Tidak."

const Y_NAMA = 900;
/** Jarak akhir dari tengah. Di beat 0 keduanya dempet (jarak = 118). */
const RENGGANG = 240;
const DEMPET = 118;

export const Pertanyaan: React.FC = () => {
  const d = useDetik();

  const nama = masuk(d, { mulai: 0.15, durasi: 0.5, geser: 24 });
  /* Melewati sedikit lalu kembali — terpisah paksa, bukan bergeser. */
  const pisah = t(d, {
    mulai: B_SAMA,
    durasi: 0.7,
    dari: DEMPET,
    ke: RENGGANG,
    ease: E.backOut(1.3),
  });
  const bukan = masuk(d, { mulai: B_SAMA + 0.55, durasi: 0.35, geser: 0 });
  const tidak = masuk(d, { mulai: B_TIDAK, durasi: 0.25, geser: 0 });

  const teks1 = masuk(d, { mulai: B_BARENG + 0.2, durasi: 0.45, geser: 20 });
  const teks2 = masuk(d, { mulai: B_SAMA + 0.1, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <Label x={W / 2 - pisah} y={Y_NAMA} teks="TCP" besar />
            <Label x={W / 2 + pisah} y={Y_NAMA} teks="IP" besar />
          </g>

          <g style={{ opacity: bukan.opacity, transform: bukan.transform }}>
            <text
              x={W / 2}
              y={Y_NAMA}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize={86}
              fontWeight={800}
              fill="var(--bad)"
            >
              ≠
            </text>
          </g>

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["Sering disebut", "bareng."]} y={330} />
          </g>
          <g style={{ opacity: teks2.opacity * (1 - tidak.opacity), transform: teks2.transform }}>
            <TeksLayar baris={["Sama?"]} y={330} />
          </g>
          <g style={{ opacity: tidak.opacity, transform: tidak.transform }}>
            <TeksLayar baris={["Tidak."]} y={330} warna="var(--bad)" ukuran={82} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
