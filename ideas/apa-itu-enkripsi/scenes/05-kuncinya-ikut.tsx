/* T16 · scene 5 · kuncinya-ikut — bagian 3 [problem], 19,38 dtk
   VO:        05-kuncinya-ikut-vo.md
   Direction: 05-kuncinya-ikut-direction.md

   Scene yang MEROBOHKAN jawaban scene 4, dan seluruh episode bertumpu pada satu
   gambar di tahap 4: kunci berjalan berdampingan dengan kotaknya, melewati
   tangan yang sama persis.

   Kalau penonton cuma MENDENGAR "kuncinya juga harus dikirim" tanpa melihatnya
   melewati tangan yang sama, seluruh bagian 4 nanti menjawab pertanyaan yang
   tidak pernah terasa.

   KUNCINYA TIDAK DIGAMBAR MENCURIGAKAN — tanpa warna bahaya, tanpa getar. Yang
   salah bukan kuncinya, tapi bahwa jalannya cuma satu.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Jalan,
  Kotak,
  Kunci,
  Meja,
  N_TANGAN,
  Tangan,
  X_KIRIM,
  X_TERIMA,
  Y_JALAN,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "kuncinya-ikut";

const B_INGAT = beat(ID, 0); // "Sampai kamu ingat siapa yang harus membukanya."
const B_TIDAK = beat(ID, 1); // "Yang di ujung sana tidak punya kuncinya."
const B_IKUT = beat(ID, 2); // "Jadi kuncinya harus ikut berangkat."
const B_SAMA = beat(ID, 3); // "Lewat jalan yang sama…"
const B_SEBELAH = beat(ID, 4); // "…kuncinya menempel di sebelahnya."
const B_KECIL = beat(ID, 5); // "Masalahnya tidak hilang…"

const X_MULAI = posTangan(N_TANGAN - 1);
/** Kunci berhenti di sebelah kotak, bukan di atasnya — jarak tetap 150 px. */
const X_KUNCI_BERHENTI = X_TERIMA - 150;

export const KuncinyaIkut: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: kamera menyusuri jalan ke ujung kanan --- */
  const dekat = t(d, { mulai: B_INGAT, durasi: 1.2, dari: 1, ke: 1.25, ease: E.power2out });
  const mundur = t(d, { mulai: B_SEBELAH, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });
  const skala = dekat - 0.25 * mundur;

  /* --- tahap 2: kotak tiba di meja dan tidak bisa diapa-apakan --- */
  const tiba = t(d, { mulai: B_INGAT + 0.5, durasi: 1.3, dari: 0, ke: 1, ease: E.power2out });
  const xKotak = X_MULAI + (X_TERIMA - X_MULAI) * tiba;

  /* --- tahap 3: kunci muncul di meja kiri lalu turun ke jalan --- */
  const lahir = t(d, { mulai: B_IKUT, durasi: 0.5, dari: 0, ke: 1, ease: E.backOut(1.4) });
  const turun = t(d, { mulai: B_IKUT + 0.55, durasi: 0.5, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 4: kunci menyusuri jalan yang sama, tangan yang sama --- */
  const jalanKunci = t(d, {
    mulai: B_SAMA,
    durasi: B_SEBELAH - B_SAMA,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });
  const xKunci = X_KIRIM + (X_KUNCI_BERHENTI - X_KIRIM) * jalanKunci;
  const lompatKunci =
    16 * Math.abs(Math.sin(((xKunci - X_KIRIM) / 220) * Math.PI)) * jalanKunci * (1 - jalanKunci) * 4;

  /* --- tahap 6: masalahnya menyusut, tidak hilang --- */
  const menyusut = t(d, { mulai: B_KECIL + 0.2, durasi: 0.8, dari: 1, ke: 0.42, ease: E.power2out });

  const nyala = (i: number) =>
    Math.abs(xKunci - posTangan(i)) < 110 && d > B_SAMA ? 1 : 0;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ x: X_TERIMA, y: Y_JALAN - 60, skala })}>
            <Jalan />
            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} sorot={t(d, { mulai: B_TIDAK, durasi: 0.5, dari: 0, ke: 0.6 })} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} nyala={nyala(i)} />
            ))}

            <Kotak x={xKotak} y={Y_JALAN} gembok={1} skala={menyusut} />

            <g opacity={lahir}>
              <Kunci
                x={X_KIRIM + (xKunci - X_KIRIM) * turun}
                y={Y_JALAN - 150 + 116 * turun - lompatKunci}
                skala={1.1}
              />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
