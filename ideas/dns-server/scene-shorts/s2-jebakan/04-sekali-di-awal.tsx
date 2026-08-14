/* T14-S2 · scene 4 · sekali-di-awal — bukti 1 dari 3, 6,14 dtk
   Direction: 04-sekali-di-awal-direction.md
   VO:        04-sekali-di-awal-vo.md

   GAMBAR YANG MEMBUKTIKAN SELURUH SHORT INI: bilah waktu satu halaman, dengan
   bagian bertanya sebagai potongan paling pendek di paling depan.

   PANJANG RELATIF ADALAH BUKTINYA, DAN ITU MENGGANTIKAN ANGKA. Berapa lama
   bertanya nama dan berapa besar porsinya dari pemuatan halaman adalah baris ⚠
   di naskah.md § Sumber. Tidak ada satu label angka pun di bilah ini, dan
   jangan menambahkannya sebelum pengukurannya jadi.

   Titik penanda di bilah dan sosok di lantai WAJIB seirama — dua tween dengan
   `mulai` dan `durasi` yang sama, bukan dua angka yang kebetulan mirip. Kalau
   keduanya lepas, bilahnya berhenti terbaca sebagai waktu perjalanan itu.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Bangunan, Loket, Sosok } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  BILAH,
  BilahWaktu,
  Label,
  SKALA_LOKET_S2,
  SKALA_SOSOK_S2,
  SKALA_TUJUAN_S2,
  VIEWBOX_S2,
  X_LOKET_S2,
  X_SOSOK_AKHIR_S2,
  X_SOSOK_S2,
  X_TUJUAN_S2,
  xBilah,
  Y_LANTAI_S2,
} from "../jalur-tanya";
import { beat } from "./timing.gen";

const ID = "sekali-di-awal";

const B_SEKALI = beat(ID, 0); // "Bertanya itu cuma sekali, di paling awal."
const B_JALAN = beat(ID, 1); // "Setelah alamatnya ketemu, kamu jalan sendiri."

/** Satu tween untuk dua benda. Dipisah jadi dua pemanggilan `t()` dengan angka
 *  yang "sama", cepat atau lambat salah satunya digeser sendirian. */
const JALAN = { mulai: 0.1, durasi: 1.6 };

export const SekaliDiAwal: React.FC = () => {
  const d = useDetik();

  const gambar = t(d, {
    mulai: B_SEKALI,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const sorot = t(d, { mulai: B_SEKALI + 0.55, durasi: 0.3, dari: 0, ke: 1 });

  const jalan = t(d, {
    mulai: B_JALAN + JALAN.mulai,
    durasi: JALAN.durasi,
    dari: 0,
    ke: 1,
    ease: E.sineInOut,
  });

  const xTitik = xBilah(BILAH.tanya + (1 - BILAH.tanya) * jalan);
  const xSosok = X_SOSOK_S2 + (X_SOSOK_AKHIR_S2 - X_SOSOK_S2) * jalan;

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_JALAN ? "Bertanya cuma sekali, di awal." : "Sisanya kamu jalan sendiri."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <BilahWaktu gambar={gambar} sorotTanya={sorot} nyalaSisa={sorot} />

        <g style={masuk(d, { mulai: B_SEKALI + 0.7, durasi: 0.35, geser: 14 })}>
          <Label x={BILAH.x0} y={BILAH.y + 96} anchor="start" warna="var(--accent-ink)">
            bertanya
          </Label>
        </g>
        <g style={masuk(d, { mulai: B_SEKALI + 0.8, durasi: 0.35, geser: 14 })}>
          <Label x={BILAH.x1} y={BILAH.y + 96} anchor="end">
            sisa perjalanannya
          </Label>
        </g>

        {/* titik yang berjalan di bilah */}
        {jalan > 0 && (
          <circle cx={xTitik} cy={BILAH.y + BILAH.h / 2} r={16} fill="var(--ink-0)" />
        )}

        <path
          d={`M90 ${Y_LANTAI_S2}H990`}
          stroke="var(--line)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <Loket x={X_LOKET_S2} y={Y_LANTAI_S2} skala={SKALA_LOKET_S2} nyala={1} />
        <Sosok x={xSosok} y={Y_LANTAI_S2} skala={SKALA_SOSOK_S2} />
        <Bangunan
          x={X_TUJUAN_S2}
          y={Y_LANTAI_S2}
          skala={SKALA_TUJUAN_S2}
          papan={0}
        />
      </svg>
    </Scene>
  );
};
