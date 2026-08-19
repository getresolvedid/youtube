/* T19-S1 · scene 3 · tebak-cek-geser — payoff, tiga tahap
   VO:        3-tebak-cek-geser-vo.md
   Direction: 3-tebak-cek-geser-direction.md

   Satu kalimat VO, tiga tahap visual, satu gerak utama per tahap.

   TIGA KEPUTUSAN:

   1. Kedua kartu TIDAK keluar di tahap 1 — cuma diredupkan. Kalau keduanya
      pergi, jarak yang jadi tulang punggung scene ini ikut hilang, dan tahap 2
      harus membangunnya lagi dari nol.

   2. Sambungan yang digeser DIPILIH dengan indeks tetap (`DIGESER` di
      panggung-nn), bukan diacak dan bukan yang paling kanan: yang bergeser di
      balik rail tombol adalah tahap yang hilang tanpa satu pun tanda.

   3. Dorongan kamera tahap 3 DITARIK BALIK ke 1,0 sebelum scene habis. Scene 4
      membuka dengan frame ini (HARD RULE 3); kamera yang ditinggal mendekat
      membuat potongannya melompat.
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
  TeksLayar,
  U_SAMBUNG,
  W,
  Y_HARUS,
  kamera,
  nyalaLapis,
  yDenyut,
  yJawab,
} from "../panggung-nn";
import { beat, cari } from "./timing.gen";

const ID = "tebak-cek-geser";

const B_TEBAK = beat(ID, 0); // "Tapi dia tidak berhenti di situ. Dia menebak lagi."
const B_MELESET = beat(ID, 1); // "Lalu mengecek seberapa jauh melesetnya."
const B_GESER = beat(ID, 2); // "Dan sambungan di dalamnya digeser sedikit."
const DUR = cari(ID).durasi;

/** Denyut penutup: berangkat lagi menjelang scene habis dan BELUM sampai.
 *  Scene 4 melanjutkannya dari `U_SAMBUNG` yang sama persis — itulah jahitannya. */
const MULAI_SAMBUNG = DUR - 0.9;

export const TebakCekGeser: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: tebak ---------------------------------------------------- */
  const redup = t(d, { mulai: B_TEBAK, durasi: 0.3, dari: 1, ke: 0.35 });
  const terangLagi = t(d, { mulai: B_MELESET - 0.2, durasi: 0.3, dari: 0, ke: 1 });
  const kartuOpacity = redup + (1 - redup) * terangLagi;

  const u1 = t(d, { mulai: B_TEBAK + 0.15, durasi: 1.1, dari: 0, ke: 1, ease: E.sineInOut });

  /* --- tahap 3: denyut penutup ------------------------------------------- */
  const u2 = t(d, {
    mulai: MULAI_SAMBUNG,
    durasi: 0.9,
    dari: 0,
    ke: U_SAMBUNG,
    ease: E.linear,
  });
  const denyutPenutup = t(d, { mulai: MULAI_SAMBUNG, durasi: 0.1, dari: 0, ke: 1 });

  const y = d >= MULAI_SAMBUNG ? yDenyut(u2) : yDenyut(u1);
  const denyutOn =
    d >= MULAI_SAMBUNG
      ? denyutPenutup
      : t(d, { mulai: B_TEBAK + 0.1, durasi: 0.12, dari: 0, ke: 1 });

  /* --- tahap 2: batang meleset ------------------------------------------- */
  const batang = t(d, { mulai: B_MELESET + 0.1, durasi: 0.35, dari: 0, ke: 1 });

  /* --- tahap 3: sambungan digeser ---------------------------------------- */
  const geser = t(d, { mulai: B_GESER + 0.1, durasi: 0.5, dari: 0, ke: 1, ease: E.sineInOut });
  const tebal = (i: number): number => {
    const j = DIGESER.indexOf(i as (typeof DIGESER)[number]);
    if (j === -1) return 1;
    /* Satu menebal, dua menipis — perubahannya kecil dan BERSAMAAN. Ini satu
       peristiwa, bukan tiga. */
    const target = j === 0 ? 2.6 : 0.45;
    return 1 + (target - 1) * geser;
  };

  const skala = 1 + 0.04 * t(d, { mulai: B_GESER, durasi: 0.45, dari: 0, ke: 1 })
    - 0.04 * t(d, { mulai: DUR - 0.75, durasi: 0.55, dari: 0, ke: 1 });

  /* Teks tahap: yang lama keluar sebelum yang baru masuk — tidak pernah dua
     sekaligus di layar. */
  const teks1 = masuk(d, { mulai: B_TEBAK, durasi: 0.35, geser: 18 });
  const teks2 = masuk(d, { mulai: B_MELESET, durasi: 0.35, geser: 18 });
  const teks3 = masuk(d, { mulai: B_GESER, durasi: 0.35, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(skala)}>
            <Jaringan nyala={nyalaLapis(y)} tebal={tebal} />
            <Denyut y={y} opacity={denyutOn} />

            <Kartu y={yJawab(1)} teks="ANJING" warna="salah" opacity={kartuOpacity} />
            <Kartu
              y={Y_HARUS}
              teks="KUCING"
              atas="SEHARUSNYA"
              warna="redup"
              opacity={kartuOpacity * 0.85}
            />
            <BatangMeleset meleset={1} opacity={batang} />
          </g>

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["TEBAK"]} />
          </g>
          <g style={{ opacity: teks2.opacity * (1 - teks3.opacity), transform: teks2.transform }}>
            <TeksLayar baris={["MELESET"]} />
          </g>
          <g style={{ opacity: teks3.opacity, transform: teks3.transform }}>
            <TeksLayar baris={["GESER"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
