/* T19-S4 · scene 5 · dasar — tutup seri
   VO:        5-dasar-vo.md
   Direction: 5-dasar-direction.md

   DUA KEPUTUSAN:

   1. Bolanya tidak direm. Langkah terakhir di scene 4 memang sudah sangat
      pendek karena lerengnya makin landai, jadi ia berhenti sendiri — dan
      berhenti sendiri itulah yang membuat mekanismenya terasa benar.

   2. Nama Inggrisnya dibiarkan Inggris. "Penurunan gradien" membuat penonton
      tidak mengenalinya saat menemukannya di tempat lain — dan mengenali
      kembali adalah satu-satunya gunanya nama di Short 30 detik.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { TeksLayar, W } from "../panggung-nn";
import {
  Bola,
  LANGKAH,
  Lereng,
  Singgung,
  SumbuMeleset,
  Y_DASAR,
} from "../panggung-lereng";
import { beat } from "./timing.gen";

const ID = "dasar";

const B_DASAR = beat(ID, 0); // "Sampai di dasar, melesetnya paling kecil."
const B_NAMA = beat(ID, 1); // "Cara itu namanya gradient descent."

const U_AKHIR = LANGKAH[LANGKAH.length - 1] ?? 0;

export const Dasar: React.FC = () => {
  const d = useDetik();

  /* Sisa langkah terakhir: dari posisi akhir scene 4 ke dasar persis. */
  const u = U_AKHIR * (1 - t(d, { mulai: 0.05, durasi: 0.45, dari: 0, ke: 1, ease: E.power2out }));

  const sederhana = t(d, { mulai: B_NAMA - 0.25, durasi: 0.4, dari: 1, ke: 0.12 });
  const nama = masuk(d, { mulai: B_NAMA, durasi: 0.45, geser: 20 });
  const teks = masuk(d, { mulai: B_DASAR + 0.15, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={sederhana}>
            <SumbuMeleset />
          </g>
          <Lereng opacity={0.12 + 0.88 * sederhana} />
          <Singgung u={u} opacity={sederhana} />
          <Bola u={u} />

          {/* Penanda tinggi meleset di dasar — paling pendek sepanjang Short. */}
          <line
            x1={150}
            y1={Y_DASAR}
            x2={150}
            y2={Y_DASAR - 18}
            stroke="var(--ok)"
            strokeWidth={12}
            strokeLinecap="round"
            opacity={sederhana}
          />

          <g style={{ opacity: teks.opacity * sederhana, transform: teks.transform }}>
            <TeksLayar baris={["MELESET", "PALING KECIL"]} ukuran={54} />
          </g>

          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <TeksLayar baris={["GRADIENT", "DESCENT"]} y={820} ukuran={72} warna="var(--accent-ink)" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
