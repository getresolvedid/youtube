/* T19-S2 · scene 1 · satu-simpul — hook
   VO:        1-satu-simpul-vo.md
   Direction: 1-satu-simpul-direction.md

   DUA KEPUTUSAN:

   1. Jaringannya komponen yang SAMA dengan Short 1 (`Jaringan` di panggung-nn),
      bukan gambar mirip. Penonton yang menonton keduanya harus merasa berada di
      dunia yang sama (unggahan § 24 "Series Continuity").

   2. Simpulnya KOSONG di dalam. Isi yang sudah tergambar di detik nol membuat
      empat scene sesudahnya cuma memberi label pada yang sudah terlihat.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Jaringan, TeksLayar, W, simpul } from "../panggung-nn";
import { SimpulBesar } from "../panggung-neuron";
import { beat, cari } from "./timing.gen";

const ID = "satu-simpul";

const B_RIBUAN = beat(ID, 0); // "Di dalam AI ada ribuan simpul kecil."
const B_APA = beat(ID, 1); // "Apa kerja satu simpul?"
const DUR = cari(ID).durasi;

/** Simpul yang didekati: lapis tengah, tengah. Titik tumpu dorongan kamera. */
const TUMPU = simpul(1, 1);

export const SatuSimpul: React.FC = () => {
  const d = useDetik();

  const nyalaSatu = t(d, { mulai: 0.2, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut });

  /* Mendekat, bukan mendarat. Dorongannya besar: Short ini terjadi DI DALAM
     benda yang Short 1 tunjukkan dari luar. */
  const dorong = t(d, {
    mulai: B_RIBUAN + 0.6,
    durasi: Math.max(0.8, DUR - B_RIBUAN - 1.9),
    dari: 1,
    ke: 2.2,
    ease: E.sineInOut,
  });

  /* Jaringan kecil ditukar simpul besar tepat saat dorongannya selesai — ukuran
     keduanya sama di titik tukar, jadi pertukarannya tidak terlihat. */
  const tukar = t(d, { mulai: B_APA - 0.5, durasi: 0.4, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_APA + 0.15, durasi: 0.4, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g
            transform={`translate(${TUMPU.x} ${TUMPU.y}) scale(${dorong}) translate(${-TUMPU.x} ${-TUMPU.y})`}
            opacity={1 - tukar}
          >
            <Jaringan
              nyala={(l) => (l === 1 ? nyalaSatu : 0)}
              opacity={0.9}
            />
          </g>

          {/* Simpul besar mengambil alih di tempat yang sama, ukuran yang sama —
              `R_NEURON` dikalikan `tukar` supaya ia tumbuh dari ukuran simpul
              kecil yang barusan didekati, bukan muncul begitu saja. */}
          <g opacity={tukar}>
            <SimpulBesar skala={0.35 + 0.65 * tukar} />
          </g>

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["APA ISI", "SATU SIMPUL?"]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
