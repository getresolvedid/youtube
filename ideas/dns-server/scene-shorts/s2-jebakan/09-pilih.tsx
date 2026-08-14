/* T14-S2 · scene 9 · pilih — konsekuensi + CTA, 5,25 dtk
   Direction: 09-pilih-direction.md
   VO:        09-pilih-vo.md

   TIDAK ADA TANDA SILANG PADA LOKETNYA SENDIRI. Short ini membantah alasan orang
   menggantinya, bukan tindakannya. Menyilang loketnya membuat penonton yang
   sudah mengganti merasa disalahkan — dan orang yang merasa disalahkan tidak
   membagikan videonya.

   CTA-nya TIDAK diucapkan, cuma teks di layar (docs/02 § Aturan Shorts). Kalimat
   CTA memakan detik terakhir yang justru paling menentukan apakah kalimat
   keputusan di atas menempel. Letaknya di bawah garis lantai — satu-satunya
   jalur yang tidak berpotongan dengan loket maupun papannya.
*/
import type React from "react";

import { masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Loket, Papan } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  BARIS_PAPAN_PENUH,
  Label,
  SKALA_LOKET_S2,
  SKALA_PAPAN_S2,
  TaliPapan,
  Tanda,
  VIEWBOX_S2,
  X_LOKET_LAMA_S2,
  X_LOKET_S2,
  Y_LANTAI_S2,
  Y_PAPAN_S2,
} from "../jalur-tanya";
import { beat } from "./timing.gen";

const ID = "pilih";

const B_BOLEH = beat(ID, 0); // "Jadi menggantinya boleh."
const B_BELI = beat(ID, 1); // "Asal kamu tahu yang kamu beli itu apa."

/* Sama persis dengan scene 8 — dibaca dari ../jalur-tanya.tsx, tidak diketik
   ulang. Papan yang bergeser sedikit saat scene berganti terbaca sebagai benda
   lain, bukan sebagai papan yang sama. */
const Y_PAPAN = Y_PAPAN_S2;
const SKALA_PAPAN = SKALA_PAPAN_S2;
const BARIS_PENUH = BARIS_PAPAN_PENUH;

/** Dua label keputusan, di kanan loket dan papannya. */
const X_TANDA = 640;
const X_LABEL = 700;
const Y_TERBUKA = 1120;
const Y_KENCANG = 1250;

export const Pilih: React.FC = () => {
  const d = useDetik();

  const keluarLama = t(d, { mulai: B_BOLEH, durasi: 0.4, dari: 1, ke: 0 });

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_BELI ? "Menggantinya boleh." : "Asal tahu yang kamu beli."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <path
          d={`M90 ${Y_LANTAI_S2}H990`}
          stroke="var(--line)"
          strokeWidth={5}
          strokeLinecap="round"
        />

        {/* loket lama scene 8 memudar keluar */}
        <g opacity={keluarLama}>
          <Loket
            x={X_LOKET_LAMA_S2}
            y={Y_LANTAI_S2}
            skala={SKALA_LOKET_S2}
            nyala={1}
          />
          <TaliPapan x={X_LOKET_LAMA_S2} />
          <Papan
            x={X_LOKET_LAMA_S2}
            y={Y_PAPAN}
            baris={BARIS_PENUH}
            skala={SKALA_PAPAN}
          />
        </g>

        <Loket
          x={X_LOKET_S2}
          y={Y_LANTAI_S2}
          skala={SKALA_LOKET_S2}
          nyala={1}
          aksen
        />
        <TaliPapan x={X_LOKET_S2} />
        <Papan
          x={X_LOKET_S2}
          y={Y_PAPAN}
          baris={BARIS_PENUH}
          skala={SKALA_PAPAN}
        />

        {/* yang kamu dapat, dan yang tidak */}
        <g style={masuk(d, { mulai: B_BELI + 0.1, durasi: 0.4, geser: 20 })}>
          <Tanda x={X_TANDA} y={Y_TERBUKA} jenis="ok" skala={1.2} />
          <Label x={X_LABEL} y={Y_TERBUKA + 12} anchor="start" warna="var(--ok)">
            terbuka
          </Label>
        </g>
        <g style={masuk(d, { mulai: B_BELI + 0.45, durasi: 0.4, geser: 20 })}>
          <Tanda x={X_TANDA} y={Y_KENCANG} jenis="bad" skala={1.2} />
          <Label x={X_LABEL} y={Y_KENCANG + 12} anchor="start" warna="var(--bad)">
            kencang
          </Label>
        </g>

        {/* CTA tidak diucapkan; ia cuma ada di layar */}
        <g style={masuk(d, { mulai: B_BELI + 1.1, durasi: 0.4, geser: 14 })}>
          <text
            x={540}
            y={1462}
            fontSize={34}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill="var(--ink-2)"
            textAnchor="middle"
          >
            mekanismenya lengkap di video panjang
          </text>
        </g>
      </svg>
    </Scene>
  );
};
