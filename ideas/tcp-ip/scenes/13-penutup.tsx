/* T18 · scene 13 · penutup
   VO:        13-penutup-vo.md
   Direction: 13-penutup-direction.md

   Scene terakhir yang bicara. Sesudahnya 99-closing — tanda brand standar,
   tanpa VO (docs/10).

   DUA KEPUTUSAN:

   1. Menyusutnya cepat, mekarnya lebih lambat. Asimetri itu yang membuat
      gerakannya terbaca "membuka" dan bukan "berkedip".

   2. Setelah kalimat terakhir tidak ada elemen baru — yang bergerak cuma
      kamera, dan frame terakhirnya DIAM. Scene yang masih bergerak di frame
      terakhir membuat potongan ke closing terbaca sebagai terpotong.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  JaringLatar,
  Label,
  Laptop,
  Paket,
  Ponsel,
  Server,
  Y_LANTAI,
  kamera,
} from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "penutup";

const B_SETIAP = beat(ID, 0); // "Jadi, setiap kali kamu membuka website…"
const B_FONDASI = beat(ID, 1); // "Dan salah satu fondasi terpenting…"

export const Penutup: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: menyusut cepat, mekar lambat --- */
  const susut = t(d, { mulai: B_SETIAP, durasi: 0.55, dari: 1, ke: 0.02, ease: E.power2in });
  const mekar = t(d, { mulai: B_SETIAP + 0.55, durasi: 1.5, dari: 0.02, ke: 1, ease: E.expoOut });
  const skalaIsi = susut > 0.03 ? susut : mekar;

  const jaring = t(d, { mulai: B_SETIAP + 0.7, durasi: 1.8, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 2: kamera menjauh, lalu semuanya diam --- */
  const jauh = t(d, { mulai: B_FONDASI, durasi: 3.0, dari: 1, ke: 0.74, ease: E.sineInOut });
  const kartu = masuk(d, { mulai: B_FONDASI + 0.4, durasi: 0.7, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala: jauh })}>
            <JaringLatar maju={jaring} opacity={0.5 * jaring} />

            {/* Peta perangkat — mekar dari satu titik. */}
            <g
              transform={`translate(960 540) scale(${skalaIsi}) translate(-960 -540)`}
              opacity={skalaIsi > 0.05 ? 1 : 0}
            >
              <Ponsel x={420} y={Y_LANTAI - 40} skala={0.7} />
              <Laptop x={780} y={Y_LANTAI} skala={0.5} nyala={0.7} />
              <Server x={1180} y={Y_LANTAI} skala={0.5} nyala={0.6} />
              <Paket x={980} y={430} nomor={1} skala={0.6} />
              <Paket x={1180} y={370} nomor={2} skala={0.6} warna="ok" />
              <Paket x={700} y={370} nomor={3} skala={0.6} />
              {/* awan */}
              <g transform="translate(1480 330)">
                <ellipse cx={0} cy={0} rx={110} ry={54} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={4} />
                <ellipse cx={-56} cy={14} rx={64} ry={38} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={4} />
                <ellipse cx={58} cy={16} rx={58} ry={34} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={4} />
              </g>
            </g>

            {/* Kartu akhir — muncul sekali, lalu DIAM. */}
            <g style={{ opacity: kartu.opacity, transform: kartu.transform }}>
              <Label
                x={960}
                y={560}
                teks="TCP/IP"
                sub="fondasi komunikasi jaringan"
                besar
              />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
