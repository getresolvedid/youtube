/* T14-S2 · scene 7 · terbuka — konsekuensi 1 dari 3, 2,16 dtk
   Direction: 07-terbuka-direction.md
   VO:        07-terbuka-vo.md

   SCENE TERPENDEK SHORT INI, dan kalimat yang dibawa pulang penontonnya. Dua
   kata, dua kata — sengaja pendek supaya bisa diulang orang.

   Coretan pada "kencang" adalah coretan yang SAMA dari scene 2: bentuk dan
   sudutnya datang dari `SUDUT_CORET` di ../jalur-tanya.tsx. Itu yang membuatnya
   terbaca sebagai janji yang ditagih, bukan sebagai coretan baru yang kebetulan
   mirip.

   Kedua kata berukuran SAMA. Kalau "terbuka" digambar lebih besar,
   perbandingannya berubah jadi penekanan dan kalimatnya berhenti jadi koreksi.

   Lantai dan bendanya diredupkan, BUKAN dihapus — menghapusnya membuat scene 8
   harus mendirikan panggungnya lagi, dan itu undangan kedua yang dilarang
   HARD RULE 6.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Bangunan, Loket, Sosok } from "../../panggung-loket";
import {
  Coret,
  SKALA_LOKET_S2,
  SKALA_SOSOK_S2,
  SKALA_TUJUAN_S2,
  VIEWBOX_S2,
  X_LOKET_S2,
  X_SOSOK_AKHIR_S2,
  X_TUJUAN_S2,
  Y_LANTAI_S2,
} from "../jalur-tanya";

const FS_KATA = 132;
const Y_TERBUKA = 700;
const Y_KENCANG = 880;

export const Terbuka: React.FC = () => {
  const d = useDetik();

  const kencang = t(d, { mulai: 0.55, durasi: 0.3, dari: 0, ke: 1 });
  const coret = t(d, {
    mulai: 0.95,
    durasi: 0.28,
    dari: 0,
    ke: 1,
    ease: E.power3out,
  });
  const buang = t(d, { mulai: 1.55, durasi: 0.35, dari: 1, ke: 0 });

  return (
    <Scene tengah={false}>
      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        {/* panggung scene 6, diredupkan — bukan dihapus */}
        <g opacity={0.28}>
          <path
            d={`M90 ${Y_LANTAI_S2}H990`}
            stroke="var(--line)"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <Loket
            x={X_LOKET_S2}
            y={Y_LANTAI_S2}
            skala={SKALA_LOKET_S2}
            nyala={1}
            aksen
          />
          <Sosok x={X_SOSOK_AKHIR_S2} y={Y_LANTAI_S2} skala={SKALA_SOSOK_S2} />
          <Bangunan
            x={X_TUJUAN_S2}
            y={Y_LANTAI_S2}
            skala={SKALA_TUJUAN_S2}
            papan={0}
          />
        </g>

        <g style={masuk(d, { mulai: 0.1, durasi: 0.4, geser: 30 })}>
          <text
            x={540}
            y={Y_TERBUKA}
            fontSize={FS_KATA}
            fontFamily="var(--font-display)"
            fontWeight={800}
            fill="var(--accent-ink)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            terbuka
          </text>
        </g>

        <g opacity={kencang * buang}>
          <text
            x={540}
            y={Y_KENCANG}
            fontSize={FS_KATA}
            fontFamily="var(--font-display)"
            fontWeight={800}
            fill="var(--ink-1)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            kencang
          </text>
          <Coret x0={200} x1={880} y={Y_KENCANG} p={coret} tebal={12} />
        </g>
      </svg>
    </Scene>
  );
};
