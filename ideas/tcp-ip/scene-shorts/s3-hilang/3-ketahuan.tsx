/* T18-S3 · scene 3 · ketahuan
   VO:        3-ketahuan-vo.md
   Direction: 3-ketahuan-direction.md

   SATU KEPUTUSAN: meredupkan yang lain, bukan menyorot yang satu. Empat slot
   yang menggelap membuat lubangnya jadi satu-satunya yang tersisa terang —
   tanpa tanda panah, tanpa lingkaran, tanpa satu elemen tambahan pun.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Label, Paket } from "../../panggung-jaringan";
import {
  JaringanTegak,
  N_SLOT,
  SlotKosong,
  TeksLayar,
  W,
  Y_SLOT,
  kamera,
  slotX,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "ketahuan";

const B_APA = beat(ID, 0); // "Apa yang terjadi?"
const B_TCP = beat(ID, 1); // "Di sinilah TCP menjadi penting."

const HILANG = 3;

export const Ketahuan: React.FC = () => {
  const d = useDetik();

  const rapat = t(d, { mulai: B_APA, durasi: 0.9, dari: 1, ke: 1.25, ease: E.expoOut });
  const redup = t(d, { mulai: B_APA + 0.3, durasi: 0.8, dari: 1, ke: 0.3 });

  const teks = masuk(d, { mulai: B_APA + 0.2, durasi: 0.45, geser: 20 });
  const nama = masuk(d, { mulai: B_TCP + 0.15, durasi: 0.5, geser: 26 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(rapat, slotX(HILANG - 1), Y_SLOT)}>
            <JaringanTegak jalur={[1]} luas={1} opacity={redup} />

            {Array.from({ length: N_SLOT }, (_, i) => {
              const nomor = i + 1;
              if (nomor === HILANG) {
                /* Lubangnya TIDAK meredup — ia satu-satunya yang tersisa terang. */
                return <SlotKosong key={nomor} i={i} warna="var(--bad)" />;
              }
              return (
                <g key={nomor} opacity={redup}>
                  <Paket x={slotX(i)} y={Y_SLOT} nomor={nomor} skala={0.9} warna="ok" />
                </g>
              );
            })}
          </g>

          <g style={{ opacity: teks.opacity * (1 - nama.opacity), transform: teks.transform }}>
            <TeksLayar baris={["Yang nomor tiga?"]} y={300} />
          </g>
          <g style={{ opacity: nama.opacity, transform: nama.transform }}>
            <Label x={W / 2} y={330} teks="TCP" besar />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
