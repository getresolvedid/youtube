/* T19-S1 · scene 4 · diulang — payoff kedua: gelungnya berputar
   VO:        4-diulang-vo.md
   Direction: 4-diulang-direction.md

   Tiga tahap tadi jadi satu gelung yang jelas berputar, dan jaraknya mengecil
   tiap putaran.

   TIGA KEPUTUSAN:

   1. TIGA putaran, bukan lima. Anggarannya enam detik; putaran keempat memakan
      waktu tanpa menambah pemahaman, dan Short yang kehabisan detik di sini
      akan memotong scene 5 — satu-satunya scene yang menyebut namanya.

   2. Temponya TETAP di ketiga putaran. Yang berubah panjang batangnya, bukan
      kecepatannya; putaran yang makin cepat terbaca sebagai "videonya
      dipercepat", bukan sebagai "jaringannya makin benar".

   3. Kartu "seharusnya" MEMUDAR di putaran terakhir. Pada meleset ~0 kedua
      kartu berimpit di titik yang sama — dua kartu yang saling menutupi terbaca
      sebagai cacat, bukan sebagai jawaban yang akhirnya benar.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  BatangMeleset,
  DIGESER,
  Denyut,
  Jaringan,
  Kartu,
  LabelTahap,
  PanahPulang,
  TAHAP,
  TeksLayar,
  U_SAMBUNG,
  W,
  X_TAHAP,
  Y_HARUS,
  Y_TAHAP,
  petaGelung,
  nyalaLapis,
  yDenyut,
  yJawab,
} from "../panggung-nn";
import { beat, cari } from "./timing.gen";

const ID = "diulang";

const B_ULANG = beat(ID, 0); // "Lalu semuanya diulang."
const B_RIBUAN = beat(ID, 1); // "Ribuan kali, sampai melesetnya makin kecil…"
const DUR = cari(ID).durasi;

/** Meleset di awal tiap putaran, lalu nilai akhir. Empat angka untuk tiga
 *  putaran — angka terakhir yang dipakai kartu hijau. */
const MELESET = [1, 0.6, 0.25, 0] as const;

const MULAI_PUTARAN = B_ULANG + 0.5;
const AKHIR_PUTARAN = DUR - 0.85;
const DURASI_PUTARAN = (AKHIR_PUTARAN - MULAI_PUTARAN) / 3;

export const Diulang: React.FC = () => {
  const d = useDetik();

  /* Mengecil DAN bergeser ke kanan, memberi tempat kolom tahap di kiri. Frame 0
     tetap 1,0 tanpa geseran — itu frame terakhir scene 3 (HARD RULE 3). */
  const buka = t(d, { mulai: 0, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out });
  const peta = petaGelung(1 - (1 - 0.85) * buka, 110 * buka);

  /* Putaran ke berapa, dan sejauh apa di dalamnya. `Math.floor` di sini tetap
     fungsi murni dari frame — tidak ada state yang dibawa antar-putaran. */
  const jalan = (d - MULAI_PUTARAN) / DURASI_PUTARAN;
  const ronde = Math.min(2, Math.max(0, Math.floor(jalan)));
  const p = Math.min(1, Math.max(0, jalan - ronde));
  const selesai = d >= AKHIR_PUTARAN;

  /* Denyut putaran ini. Putaran pertama MELANJUTKAN denyut scene 3 dari titik
     yang sama persis — di situlah potongannya tidak terasa. */
  const u = t(p, {
    mulai: 0,
    durasi: 0.5,
    dari: ronde === 0 ? U_SAMBUNG : 0,
    ke: 1,
    ease: E.sineInOut,
  });
  const y = yDenyut(u);

  /* Batang memendek di ekor tiap putaran — menahan dulu, baru mengecil, supaya
     "tiap putaran" terbaca sebagai langkah, bukan sebagai luncuran mulus. */
  const meleset =
    d < MULAI_PUTARAN
      ? MELESET[0]
      : t(p, {
          mulai: 0.55,
          durasi: 0.35,
          dari: MELESET[ronde] ?? MELESET[0],
          ke: MELESET[ronde + 1] ?? MELESET[3],
          ease: E.power2out,
        });

  const nyalaTahap = (i: number): number =>
    d >= MULAI_PUTARAN && !selesai && p >= i / 3 && p < (i + 1) / 3 ? 1 : 0;

  const kolom = t(d, { mulai: B_ULANG, durasi: 0.45, dari: 0, ke: 1 });

  /* Sambungan tetap di keadaan akhir scene 3, lalu berdenyut sedikit tiap kali
     tahap GESER menyala — perubahannya kecil, seperti di scene 3. */
  const tebal = (i: number): number => {
    const j = DIGESER.indexOf(i as (typeof DIGESER)[number]);
    if (j === -1) return 1;
    const dasar = j === 0 ? 2.6 : 0.45;
    return dasar * (1 + 0.18 * nyalaTahap(2));
  };

  const benar = t(d, { mulai: AKHIR_PUTARAN, durasi: 0.4, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_RIBUAN, durasi: 0.4, geser: 18 });
  const teksAkhir = masuk(d, { mulai: AKHIR_PUTARAN, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Kolom tiga tahap + panah yang pulang ke atas. Itulah "gelung"-nya:
              yang membuatnya terbaca berputar bukan bentuk lingkaran, melainkan
              panah yang kembali ke tahap pertama. */}
          <g opacity={kolom}>
            <PanahPulang nyala={nyalaTahap(2)} />
            {TAHAP.map((teksTahap, i) => (
              <LabelTahap
                key={teksTahap}
                x={X_TAHAP}
                y={Y_TAHAP[i] ?? Y_TAHAP[0]}
                teks={teksTahap}
                nyala={nyalaTahap(i)}
              />
            ))}
          </g>

          <g transform={peta}>
            <Jaringan nyala={nyalaLapis(y)} tebal={tebal} />
            <Denyut y={y} opacity={selesai ? 0 : 1} />

            <Kartu
              y={yJawab(meleset)}
              teks={benar > 0.5 ? "KUCING" : "ANJING"}
              warna={benar > 0.5 ? "benar" : "salah"}
            />
            <Kartu
              y={Y_HARUS}
              teks="KUCING"
              atas="SEHARUSNYA"
              warna="redup"
              opacity={0.85 * (1 - benar)}
            />
            <BatangMeleset meleset={meleset} opacity={1 - benar} label="" />
          </g>

          <g style={{ opacity: teks.opacity * (1 - teksAkhir.opacity), transform: teks.transform }}>
            <TeksLayar baris={["RIBUAN KALI"]} />
          </g>
          <g style={{ opacity: teksAkhir.opacity, transform: teksAkhir.transform }}>
            <TeksLayar baris={["MENANGKAP POLA"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
