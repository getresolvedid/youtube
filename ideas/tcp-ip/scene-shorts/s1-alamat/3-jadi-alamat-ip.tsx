/* T18-S1 · scene 3 · jadi-alamat-ip
   VO:        3-jadi-alamat-ip-vo.md
   Direction: 3-jadi-alamat-ip-direction.md

   Scene terpendek Short ini. Yang harus tertangkap penonton cuma satu hal:
   benda yang tadi dipegang tangan sekarang jadi benda yang berjalan di jaringan.

   DUA KEPUTUSAN:

   1. Perubahannya DI TEMPAT — tanpa geser, tanpa skala. Kalau bendanya
      berpindah sedikit pun, yang terbaca dua benda yang saling menggantikan.

   2. Label berganti TERTUNDA dari badannya. Dua perubahan berurutan terbaca
      sebagai dua hal; dua perubahan serentak terbaca sebagai satu kedipan.
*/
import type React from "react";

import { t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kotak, Paket } from "../../panggung-jaringan";
import { JaringanTegak, TeksLayar, W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "jadi-alamat-ip";
const B_SETIAP = beat(ID, 0); // "Setiap perangkat memiliki alamat…"

const Y_KOTAK = 900;
const ALAMAT = "192.168.1.10";

export const JadiAlamatIp: React.FC = () => {
  const d = useDetik();

  const digital = t(d, { mulai: B_SETIAP + 0.2, durasi: 0.45, dari: 0, ke: 1 });
  /* Tertunda dari badannya — dua kejadian, bukan satu kedipan. */
  const angka = t(d, { mulai: B_SETIAP + 0.5, durasi: 0.4, dari: 0, ke: 1 });
  const denyut = tPP(d, { mulai: B_SETIAP + 1.1, durasi: 1.0, dari: 1, ke: 1.08 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} />

          {/* Titik yang sama persis untuk keduanya. */}
          <g opacity={1 - digital}>
            <Kotak x={W / 2} y={Y_KOTAK} skala={2.0} ke="TO: B" />
          </g>
          <g opacity={digital}>
            {/* Skalanya dipilih supaya potongan digital seukuran kotak fisiknya:
                match cut yang bendanya melompat ukuran terbaca sebagai dua benda
                yang saling menggantikan, bukan satu benda yang berubah. */}
            <Paket
              x={W / 2}
              y={Y_KOTAK}
              nomor={1}
              skala={2.6 * denyut}
              label={angka > 0.5 ? ALAMAT : "TO: B"}
            />
          </g>

          <TeksLayar baris={["Alamatnya", "jadi angka."]} y={310} opacity={digital} />
        </svg>
      </div>
    </Scene>
  );
};
