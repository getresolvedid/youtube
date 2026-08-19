/* T19-S1 · scene 2 · belum-tahu — ketegangan
   VO:        2-belum-tahu-vo.md
   Direction: 2-belum-tahu-direction.md

   Frame pertamanya = frame terakhir scene 1: jaringan utuh, denyut baru selesai
   turun. Yang masuk sesudahnya cuma satu benda baru.

   DUA KEPUTUSAN:

   1. Kartu "SEHARUSNYA" muncul TERLAMBAT dari kartu jawaban. Jawabannya harus
      sempat dibaca dulu; dua kartu yang muncul bersamaan dibaca sebagai satu
      perbandingan, bukan sebagai satu kekeliruan.

   2. Kedua kartu ditumpuk TEGAK. Kartu kanan jatuh di balik rail tombol
      YouTube (`x > 920`), dan yang hilang di situ justru kartu yang membuat
      scene ini berarti.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Denyut,
  Jaringan,
  Kartu,
  Kucing,
  TeksLayar,
  W,
  Y_HARUS,
  nyalaLapis,
  yDenyut,
  yJawab,
} from "../panggung-nn";
import { beat } from "./timing.gen";

const ID = "belum-tahu";

const B_BELUM = beat(ID, 0); // "Awalnya dia belum tahu jawabannya."
const B_SALAH = beat(ID, 1); // "Tebakan pertamanya salah."

/** Tinggi kartu kucing saat sudah diam di atas jaringan.
 *
 *  455 dan skala 0,62: di 430 × 0,72 kartunya menyentuh baris teks layar, dan
 *  di 470 ia menyentuh baris simpul teratas. Yang di antara keduanya cuma
 *  serentang ini. */
const Y_KUCING = 455;

export const BelumTahu: React.FC = () => {
  const d = useDetik();

  /* Denyut scene 1 masih di ujung bawah pada frame 0, lalu padam — itu yang
     membuat potongannya terbaca sebagai kelanjutan, bukan layar baru. */
  const sisaDenyut = t(d, { mulai: 0.1, durasi: 0.3, dari: 1, ke: 0 });

  const turunKucing = t(d, {
    mulai: B_BELUM + 0.1,
    durasi: 0.45,
    dari: -260,
    ke: 0,
    ease: E.power1out,
  });

  /* Denyut kedua: tebakan yang sedang dikerjakan. Ia berangkat setelah kucingnya
     mendarat, dan tiba tepat saat jawabannya keluar. */
  const u = t(d, { mulai: B_BELUM + 0.7, durasi: 0.9, dari: 0, ke: 1, ease: E.sineInOut });
  const y = yDenyut(u);
  const denyut2 = t(d, { mulai: B_BELUM + 0.65, durasi: 0.12, dari: 0, ke: 1 });

  const jawab = masuk(d, { mulai: B_SALAH - 0.15, durasi: 0.4, geser: 0 });
  const harus = t(d, { mulai: B_SALAH + 0.35, durasi: 0.4, dari: 0, ke: 1 });
  const teks = masuk(d, { mulai: B_SALAH + 0.5, durasi: 0.4, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jaringan nyala={nyalaLapis(y)} />

          <Denyut y={yDenyut(1)} opacity={sisaDenyut} />
          <Denyut y={y} opacity={denyut2 * (1 - sisaDenyut)} />

          <g transform={`translate(0 ${turunKucing})`}>
            <Kucing y={Y_KUCING} skala={0.62} />
          </g>

          {/* Jawabannya SALAH — dan salahnya digambar, bukan ditulis: jaraknya
              ke kartu "seharusnya" yang mengatakannya. */}
          <Kartu
            y={yJawab(1)}
            teks="ANJING"
            warna="salah"
            opacity={jawab.opacity}
            skala={t(d, { mulai: B_SALAH - 0.15, durasi: 0.4, dari: 0.86, ke: 1, ease: E.backOut(1.05) })}
          />
          <Kartu
            y={Y_HARUS}
            teks="KUCING"
            atas="SEHARUSNYA"
            warna="redup"
            opacity={harus * 0.85}
          />

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["JAWABANNYA SALAH"]} ukuran={54} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
