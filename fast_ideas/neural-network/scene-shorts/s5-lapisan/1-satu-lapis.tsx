/* T19-S3 · scene 1 · satu-lapis — hook
   VO:        1-satu-lapis-vo.md
   Direction: 1-satu-lapis-direction.md

   DUA KEPUTUSAN:

   1. Lapis tengah BELUM ADA, dan itu seluruh isi Short ini. Kalau ia sudah ada
      di hook, scene 3 tidak punya apa pun untuk disisipkan.

   2. Tanda tanya ada di teks layar, bukan di VO. VO menyatakan "kelihatannya
      cukup" — pernyataan yang akan dipatahkan scene 2. Dua-duanya bertanya
      membuat scene ini terdengar ragu.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W, kamera } from "../panggung-nn";
import { JaringLapis } from "../panggung-lapis";
import { beat, cari } from "./timing.gen";

const ID = "satu-lapis";

const B_SEDERHANA = beat(ID, 0); // "Ini jaringan paling sederhana: masuk, langsung ke jawaban."
const B_CUKUP = beat(ID, 1); // "Kelihatannya cukup."
const DUR = cari(ID).durasi;

export const SatuLapis: React.FC = () => {
  const d = useDetik();

  const tampil = t(d, { mulai: B_SEDERHANA + 0.05, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_CUKUP, durasi: 0.4, geser: 18 });

  /* Dorongan sangat halus, sama seperti hook Short 1 — dua hook yang bergerak
     sama membuat keduanya terasa satu seri. */
  const skala = t(d, { mulai: 0, durasi: DUR, dari: 1, ke: 1.03, ease: E.linear });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)}>
            <JaringLapis tengah={0} opacity={tampil} />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["CUKUP?"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
