/* T14-S2 · scene 5 · sisanya-sama — bukti 2 dari 3, 7,02 dtk
   Direction: 05-sisanya-sama-direction.md
   VO:        05-sisanya-sama-vo.md

   Mitosnya dieksekusi di layar: loketnya benar-benar diganti, dan bilah yang
   SAMA memperlihatkan bahwa yang tersentuh cuma ujung paling depannya.

   TIGA HAL YANG TIDAK BOLEH BERUBAH:

   1. Loket baru mendarat di `X_LOKET_S2` yang sama persis. Loket yang bergeser
      sedikit terbaca sebagai "ada yang berubah di susunannya", padahal yang
      dimaksud justru sebaliknya.
   2. Potongan bertanya BERKEDIP — tidak memanjang, tidak memendek. Memendekkan
      -nya adalah klaim berangka yang tidak punya sumber (naskah.md § Sumber).
   3. Sisa bilahnya tidak dianimasikan ulang. Kalau ia ikut berkedip "supaya
      seimbang", kalimat "sama persis" terbantah oleh gambarnya sendiri.
*/
import type React from "react";

import { E, gambarGaris, getar, masuk, t, useDetik } from "../../../../shared/anim";
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
  X_TUJUAN_S2,
  xBilah,
  Y_LANTAI_S2,
} from "../jalur-tanya";
import { beat } from "./timing.gen";

const ID = "sisanya-sama";

const B_GANTI = beat(ID, 0); // "Ganti loketnya, yang berganti cuma bagian bertanya tadi."
const B_SAMA = beat(ID, 1); // "Sisa perjalanannya lewat jalur yang sama persis."

export const SisanyaSama: React.FC = () => {
  const d = useDetik();

  const keluar = t(d, {
    mulai: B_GANTI + 0.15,
    durasi: 0.4,
    dari: 0,
    ke: 1,
    ease: E.power2in,
  });
  const masukLoket = t(d, {
    mulai: B_GANTI + 0.45,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });

  /* Kedip pada ASPEK YANG SAMA (opasitas aksen), bukan pada lebarnya. */
  const kedip =
    1 -
    0.55 *
      Math.abs(
        /* `getar()` dihitung per PUTARAN sepanjang durasinya, bukan per detik:
           3,3 Hz selama 0,6 dtk = 2 putaran. Amplitudonya 1 supaya nilai
           kembaliannya langsung jadi pengali opasitas. */
        getar(d, { mulai: B_GANTI + 0.6, durasi: 0.6, jauh: 1, putaran: 2 }),
      );

  const xTanya = xBilah(BILAH.tanya);
  const kurung = gambarGaris(d, BILAH.x1 - xTanya, { mulai: B_SAMA + 0.3, durasi: 0.5 });

  return (
    <Scene tengah={false}>
      <TeksAtas>{d < B_SAMA ? "Ganti loketnya." : "Sisa jalurnya sama persis."}</TeksAtas>

      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <BilahWaktu sorotTanya={kedip} nyalaSisa={1} />

        <Label x={BILAH.x0} y={BILAH.y + 96} anchor="start" warna="var(--accent-ink)">
          bertanya
        </Label>
        <Label x={BILAH.x1} y={BILAH.y + 96} anchor="end">
          sisa perjalanannya
        </Label>

        {/* kurung di bawah sisa bilah: bagian yang tidak tersentuh */}
        <path
          d={`M${xTanya} ${BILAH.y + 132}H${BILAH.x1}`}
          stroke="var(--ink-2)"
          strokeWidth={4}
          strokeLinecap="round"
          {...kurung}
        />
        <g style={masuk(d, { mulai: B_SAMA + 0.55, durasi: 0.35, geser: 12 })}>
          <Label x={(xTanya + BILAH.x1) / 2} y={BILAH.y + 182}>
            tidak berubah
          </Label>
        </g>

        <path
          d={`M90 ${Y_LANTAI_S2}H990`}
          stroke="var(--line)"
          strokeWidth={5}
          strokeLinecap="round"
        />

        {/* loket lama turun keluar; loket baru naik ke koordinat yang SAMA */}
        <g transform={`translate(0 ${180 * keluar})`} opacity={1 - keluar}>
          <Loket x={X_LOKET_S2} y={Y_LANTAI_S2} skala={SKALA_LOKET_S2} nyala={1} />
        </g>
        <g transform={`translate(0 ${180 * (1 - masukLoket)})`} opacity={masukLoket}>
          <Loket
            x={X_LOKET_S2}
            y={Y_LANTAI_S2}
            skala={SKALA_LOKET_S2}
            nyala={1}
            aksen
          />
        </g>

        <Sosok x={X_SOSOK_AKHIR_S2} y={Y_LANTAI_S2} skala={SKALA_SOSOK_S2} />
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
