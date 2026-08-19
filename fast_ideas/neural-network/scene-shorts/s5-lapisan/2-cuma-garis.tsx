/* T19-S3 · scene 2 · cuma-garis — ketegangan
   VO:        2-cuma-garis-vo.md
   Direction: 2-cuma-garis-direction.md

   DUA KEPUTUSAN:

   1. Sebarannya BENAR-BENAR tidak terpisahkan garis lurus (pola XOR di
      panggung-lapis). Sebaran yang sebenarnya bisa dipisah lalu digambar seolah
      tidak membuat seluruh Short ini bohong.

   2. Garisnya BERHENTI, tidak berputar sampai scene habis. Berputar terus
      terbaca sebagai animasi latar; berhenti terbaca sebagai menyerah.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W, kamera } from "../panggung-nn";
import { GarisPemisah, JaringLapis, Sebaran } from "../panggung-lapis";
import { beat } from "./timing.gen";

const ID = "cuma-garis";

const B_LURUS = beat(ID, 0); // "Tapi satu lapis cuma bisa memisahkan dengan garis lurus."
const B_TIDAK = beat(ID, 1); // "Yang ini tidak bisa."

/** Titik yang selalu salah sisi di posisi garis terakhir. Ditulis, bukan
 *  dihitung ulang tiap frame — dan itu sah karena sebarannya juga tetap. */
const SALAH = [3, 11] as const;

export const CumaGaris: React.FC = () => {
  const d = useDetik();

  /* Jaringannya menepi ke atas DAN mengecil. Cuma digeser, ia mendarat tepat di
     baris teks layar — dan teks yang tertimpa jaringan adalah cacat yang tidak
     ditangkap `npm run tumpang` (garis bukan teks). */
  const susut = t(d, { mulai: 0.1, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  const titikTampil = (i: number): number =>
    t(d, { mulai: 0.35 + i * 0.04, durasi: 0.3, dari: 0, ke: 1 });

  /* Tiga posisi, lalu berhenti. Sudutnya fungsi murni dari detik. */
  const sudut =
    -18 * t(d, { mulai: B_LURUS + 0.2, durasi: 0.5, dari: 0, ke: 1, ease: E.sineInOut }) +
    54 * t(d, { mulai: B_LURUS + 0.8, durasi: 0.5, dari: 0, ke: 1, ease: E.sineInOut }) -
    26 * t(d, { mulai: B_LURUS + 1.4, durasi: 0.5, dari: 0, ke: 1, ease: E.sineInOut });

  const garis = t(d, { mulai: B_LURUS + 0.15, durasi: 0.3, dari: 0, ke: 1 });

  /* Sekali kedip, bukan berulang: kedip berulang terbaca sebagai rusak. */
  const kedip = tPP(d, { mulai: B_TIDAK, durasi: 0.7, dari: 0, ke: 1 });
  const salah = (i: number): number => (SALAH.includes(i as 3) ? kedip : 0);

  const teks = masuk(d, { mulai: B_TIDAK + 0.1, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Menepi, tidak hilang — ia yang sedang gagal. */}
          <g
            transform={`translate(0 ${-300 * susut}) ${kamera(1 - 0.45 * susut)}`}
            opacity={1 - 0.55 * susut}
          >
            <JaringLapis tengah={0} />
          </g>

          <Sebaran tampil={titikTampil} salah={salah} />
          <GarisPemisah sudut={sudut} opacity={garis} />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["SELALU ADA", "YANG SALAH"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
