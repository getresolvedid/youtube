/* T14-S2 · scene 8 · tetap-melihat — konsekuensi 2 dari 3, 7,02 dtk
   Direction: 08-tetap-melihat-direction.md
   VO:        08-tetap-melihat-vo.md

   BEAT YANG PALING GAMPANG HILANG SAAT MEMOTONG DURASI, DAN YANG PALING TIDAK
   BOLEH HILANG: tanpa dia, Short ini berakhir sebagai saran terselubung untuk
   mengganti loket — padahal yang barusan dijelaskan justru bahwa loket melihat
   semua yang ditanyakan.

   DUA PAPAN SAMA-SAMA PENUH, bukan satu yang lebih penuh. Begitu salah satunya
   digambar lebih penuh, Short ini berubah jadi rekomendasi memilih loket, dan
   itu klaim tentang pihak tertentu yang tidak punya sumber.

   Sosok dan tujuan WAJIB keluar sebelum loket lama masuk — keduanya
   memperebutkan piksel yang sama di sisi kanan. Ini satu-satunya tempat di
   Short ini yang panggungnya berubah.
*/
import type React from "react";

import { masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Bangunan, Loket, Papan, Sosok } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  BARIS_PAPAN_PENUH,
  Label,
  SKALA_LOKET_S2,
  SKALA_PAPAN_S2,
  SKALA_SOSOK_S2,
  SKALA_TUJUAN_S2,
  TaliPapan,
  VIEWBOX_S2,
  X_LOKET_LAMA_S2,
  X_LOKET_S2,
  X_SOSOK_AKHIR_S2,
  X_TUJUAN_S2,
  Y_LANTAI_S2,
  Y_PAPAN_S2,
} from "../jalur-tanya";
import { beat } from "./timing.gen";

const ID = "tetap-melihat";

const B_MELIHAT = beat(ID, 0); // "Dan loket barunya tetap melihat semua yang kamu tanyakan."
const B_SIAPA = beat(ID, 1); // "Yang berubah cuma siapa yang menjawab."

/* Papan penuh = `BARIS_PAPAN_PENUH` dari ../jalur-tanya.tsx, dipakai KEDUA papan.
   Kalau salah satunya diberi angka lain, seluruh maksud scene ini terbalik —
   makanya angkanya cuma ada di satu tempat. */
const Y_PAPAN = Y_PAPAN_S2;
const SKALA_PAPAN = SKALA_PAPAN_S2;
const BARIS_PENUH = BARIS_PAPAN_PENUH;

export const TetapMelihat: React.FC = () => {
  const d = useDetik();

  const terang = t(d, { mulai: B_MELIHAT, durasi: 0.35, dari: 0.28, ke: 1 });

  /* Terisi baris demi baris — satu baris tiap 0,45 dtk. */
  const barisBaru = Math.min(
    BARIS_PENUH,
    Math.floor(Math.max(0, d - (B_MELIHAT + 0.8)) / 0.45),
  );

  const keluarJalur = t(d, { mulai: B_SIAPA, durasi: 0.4, dari: 1, ke: 0 });

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_SIAPA
          ? "Loketnya melihat semua yang kamu tanya."
          : "Yang berubah cuma siapa yang menjawab."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <g opacity={terang}>
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
        </g>

        {/* sisa perjalanan scene 3–7 keluar sebelum loket lama masuk */}
        <g opacity={keluarJalur}>
          <Sosok x={X_SOSOK_AKHIR_S2} y={Y_LANTAI_S2} skala={SKALA_SOSOK_S2} />
          <Bangunan
            x={X_TUJUAN_S2}
            y={Y_LANTAI_S2}
            skala={SKALA_TUJUAN_S2}
            papan={0}
          />
        </g>

        <g style={masuk(d, { mulai: B_MELIHAT + 0.3, durasi: 0.5, geser: 30 })}>
          <TaliPapan x={X_LOKET_S2} />
          <Papan
            x={X_LOKET_S2}
            y={Y_PAPAN}
            baris={barisBaru}
            skala={SKALA_PAPAN}
          />
        </g>

        {/* loket lama, dengan papan yang SAMA PERSIS dan sama-sama penuh */}
        {d >= B_SIAPA && (
          <g style={masuk(d, { mulai: B_SIAPA + 0.25, durasi: 0.5, geser: 40 })}>
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
            <Label x={X_LOKET_LAMA_S2} y={Y_PAPAN - 108}>
              loket lama
            </Label>
            <Label x={X_LOKET_S2} y={Y_PAPAN - 108} warna="var(--accent-ink)">
              loket baru
            </Label>
          </g>
        )}
      </svg>
    </Scene>
  );
};
