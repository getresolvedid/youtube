/* T19-S12 · scene 6 · berikutnya — gantungan ke Episode 13
   VO:        6-berikutnya-vo.md
   Direction: 6-berikutnya-direction.md

   Yang digantung benda di layar — potongan kata yang baru muncul — bukan
   episodenya (HARD RULE 7).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { LabelTahap, TeksLayar, W } from "../panggung-nn";
import { ANAK_TANGGA } from "../panggung-lapis";
import { Potongan } from "../panggung-seri";
import { beat } from "./timing.gen";

const ID = "berikutnya";

const B_BUKAN = beat(ID, 0); // "Tapi gambar bukan satu-satunya bentuk masukan."

/** Kalimat contoh seri ini — dipakai Episode 13, 14, dan 15. Empat potongan
 *  cukup: lima sudah tidak muat di kotak aman pada ukuran yang terbaca di HP. */
const KALIMAT = ["DIA", "MAKAN", "NASI", "GORENG"] as const;
const X_KATA = [180, 400, 620, 830];

const KATA = ["PETAK", "CIRI", "BENTUK"] as const;

export const Berikutnya: React.FC = () => {
  const d = useDetik();

  const keluar = t(d, { mulai: 0.05, durasi: 0.3, dari: 1, ke: 0 });
  const kata = (i: number): number =>
    t(d, { mulai: B_BUKAN + 0.15 + i * 0.1, durasi: 0.3, dari: 0, ke: 1, ease: E.expoOut });
  const teks = masuk(d, { mulai: B_BUKAN + 0.5, durasi: 0.35, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={keluar}>
            {ANAK_TANGGA.map((a, i) => (
              <LabelTahap key={a.teks} x={a.x} y={a.y} teks={KATA[i] ?? a.teks} nyala={i === 2 ? 1 : 0} />
            ))}
          </g>

          {KALIMAT.map((k, i) => (
            <g key={k} opacity={kata(i)}>
              <Potongan x={X_KATA[i] ?? 180} y={1000} teks={k} />
            </g>
          ))}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["BERIKUTNYA", "URUTAN"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
