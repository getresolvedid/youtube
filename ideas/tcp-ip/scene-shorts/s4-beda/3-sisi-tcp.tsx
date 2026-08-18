/* T18-S4 · scene 3 · sisi-tcp
   VO:        3-sisi-tcp-vo.md
   Direction: 3-sisi-tcp-direction.md

   Panggungnya SAMA PERSIS dengan scene 2, isinya yang berganti — itu yang
   membuat keduanya terbaca sebagai perbandingan, bukan sebagai dua adegan.

   TIGA KEPUTUSAN:

   1. Tidak ada perjalanan di scene ini. Yang ditunjukkan adalah yang terjadi
      SESUDAH sampai. Kalau potongan di sini juga menempuh jalur, kedua sisi jadi
      sama saja dan seluruh Short kehilangan alasannya.

   2. Nama berganti di titik yang SAMA, bukan satu keluar dan satu masuk dari
      tempat lain. Tempat yang sama itu yang membuat keduanya terbaca sebagai dua
      jawaban atas satu pertanyaan.

   3. Kotak yang menyeberangi tetangganya TERANGKAT — dua kotak yang bertukar
      tempat di garis yang sama terbaca melebur, bukan bertukar.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Centang, Label, Paket } from "../../panggung-jaringan";
import { TeksLayar, W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "sisi-tcp";
const B_TCP = beat(ID, 0); // "Sedangkan TCP membantu memastikan bagian data…"

const Y_NAMA = 620;
const Y_BARIS = 1120;
const N = 4;
const LEBAR_SLOT = 196;

/** Urutan tiba — berantakan, dan sengaja bukan urutan nomor. */
const URUT_TIBA = [3, 1, 4, 2] as const;

/** Tinggi lengkungan saat menyeberang, indeks = nomor − 1. Kotak yang saling
 *  menyeberang wajib beda tinggi. */
const LAJUR = [0, 150, 80, 0] as const;

const slotX = (i: number) => W / 2 + (i - (N - 1) / 2) * LEBAR_SLOT;

export const SisiTcp: React.FC = () => {
  const d = useDetik();

  /* Nama berganti di titik yang sama. */
  const ganti = t(d, { mulai: B_TCP, durasi: 0.35, dari: 0, ke: 1 });
  const cabangKeluar = t(d, { mulai: B_TCP, durasi: 0.5, dari: 1, ke: 0 });

  const datang = (i: number) => masuk(d, { mulai: B_TCP + 0.5, urutan: i, jeda: 0.06, geser: 22 });
  const urut = (i: number) =>
    t(d, { mulai: B_TCP + 2.0 + i * 0.05, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });
  const centang = (i: number) =>
    t(d, { mulai: B_TCP + 3.0 + i * 0.08, durasi: 0.35, dari: 0, ke: 1 });

  const teks = masuk(d, { mulai: B_TCP + 0.2, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Sisa panggung scene 2, memudar keluar. */}
          <g opacity={cabangKeluar * 0.5} />

          {/* Nama: titik yang sama persis dengan scene 2. */}
          <g opacity={1 - ganti}>
            <Label x={W / 2} y={Y_NAMA} teks="IP" besar />
          </g>
          <g opacity={ganti}>
            <Label x={W / 2} y={Y_NAMA} teks="TCP" besar />
          </g>

          {URUT_TIBA.map((nomor, iSlot) => {
            const i = nomor - 1;
            const m = datang(iSlot);
            const s = urut(i);

            const xDatang = slotX(iSlot);
            const xUrut = slotX(i);
            const x = xDatang + (xUrut - xDatang) * s;
            const angkat = s * (1 - s) * 4 * (LAJUR[i] ?? 0);

            return (
              <g key={nomor} style={{ opacity: m.opacity, transform: m.transform }}>
                <Paket
                  x={x}
                  y={Y_BARIS - angkat}
                  nomor={nomor}
                  skala={0.86}
                  warna={centang(i) > 0.5 ? "ok" : "biasa"}
                />
                <Centang x={x} y={Y_BARIS + 96} skala={1.2} opacity={centang(i)} />
              </g>
            );
          })}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["TCP: sampai", "benar?"]} y={300} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
