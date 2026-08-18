/* T17-S4 · scene 6 · definisi — penutup seluruh seri
   VO:        6-definisi-vo.md
   Direction: 6-definisi-direction.md

   HARD RULE 2 dipenuhi gembok + ikonnya, bukan teksnya. Layar penuh teks di
   detik terakhir adalah slide, dan slide di feed Shorts adalah tempat orang
   menggeser — karena itu gemboknya tidak pernah dihapus saat definisinya
   mendarat; ia cuma mundur.

   Definisinya cuma diucapkan SEKALI di seluruh seri, dan di sini. Di Short 1–3
   yang ada cuma tindakannya, ditunjukkan tiga kali.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Gembok } from "../../panggung-kiriman";
import { TeksLayar, W } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "definisi";
const B_DEF = beat(ID, 0);
const B_TUTUP = beat(ID, 1);

const PUSAT = { x: W / 2, y: 720 } as const;

/** Posisinya DITULIS, bukan dihitung acak — `Math.random()` menghasilkan gambar
 *  berbeda tiap frame saat render paralel. */
const IKON = [
  { n: "comment", x: W / 2, y: 380 },
  { n: "app", x: W / 2 + 300, y: 620 },
  { n: "browser", x: W / 2 + 250, y: 950 },
  { n: "file", x: W / 2 - 250, y: 950 },
  { n: "stack", x: W / 2 - 300, y: 620 },
] as const;

export const Definisi: React.FC = () => {
  const d = useDetik();

  const gembok = t(d, { mulai: 0.15, durasi: 0.5, dari: 0, ke: 1 });
  /* Menutup DI ATAS ikon isinya — tanpa isi, gembok yang menutup tidak menutup
     apa-apa. Satu angkatan pendek lalu turun lagi terbaca sebagai MENGUNCI. */
  const kunciGerak = tPP(d, { mulai: 0.5, durasi: 0.9, dari: 0, ke: 1 });

  const mundur = t(d, {
    mulai: B_DEF + 1.4,
    durasi: 0.8,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const judul = masuk(d, { mulai: B_DEF + 1.6, durasi: 0.55, geser: 24 });
  const definisi = masuk(d, { mulai: B_DEF + 1.95, durasi: 0.55, geser: 20 });

  const teksPudar = t(d, { mulai: B_TUTUP, durasi: 0.5, dari: 1, ke: 0 });
  const kembali = t(d, {
    mulai: B_TUTUP + 0.2,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const ikon = t(d, { mulai: B_TUTUP + 0.5, durasi: 0.8, dari: 0, ke: 1 });
  const akhir = masuk(d, { mulai: B_TUTUP + 1.4, durasi: 0.6, geser: 22 });

  const depan = 1 - 0.55 * mundur + 0.55 * kembali * mundur;
  const besar = 1 - 0.2 * mundur + 0.2 * kembali * mundur;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g opacity={depan * ikon}>
            {IKON.map((ik, i) => {
              const m = masuk(d, { mulai: B_TUTUP + 0.5 + i * 0.1, durasi: 0.5, geser: 16 });
              return (
                <g key={ik.n} style={{ opacity: m.opacity, transform: m.transform }}>
                  <use
                    href={`#ic-${ik.n}`}
                    x={ik.x - 56}
                    y={ik.y - 56}
                    width={112}
                    height={112}
                    style={{ color: "var(--ink-1)" }}
                  />
                </g>
              );
            })}
          </g>

          <g opacity={gembok * depan}>
            <g
              transform={`translate(${PUSAT.x} ${PUSAT.y}) scale(${
                3.0 * besar
              }) translate(${-PUSAT.x} ${-PUSAT.y})`}
            >
              <g opacity={0.9} data-tumpang="sengaja">
                <rect
                  x={PUSAT.x - 20}
                  y={PUSAT.y + 4}
                  width={40}
                  height={5}
                  rx={2.5}
                  fill="var(--bg)"
                />
                <rect
                  x={PUSAT.x - 20}
                  y={PUSAT.y + 16}
                  width={28}
                  height={5}
                  rx={2.5}
                  fill="var(--bg)"
                />
              </g>
              <Gembok x={PUSAT.x} y={PUSAT.y} terbuka={kunciGerak} />
            </g>
          </g>

          <g opacity={teksPudar}>
            <TeksLayar
              baris={["APA ITU ENKRIPSI?"]}
              y={1220}
              opacity={judul.opacity}
              transform={judul.transform}
              ukuran={66}
            />
            <TeksLayar
              baris={["Mengubah isi jadi bentuk", "yang tidak mudah dibaca", "tanpa kunci yang tepat."]}
              y={1340}
              opacity={definisi.opacity}
              transform={definisi.transform}
              warna="var(--ink-1)"
              ukuran={42}
            />
          </g>

          <TeksLayar
            baris={["ENKRIPSI =", "MELINDUNGI DATA"]}
            y={1260}
            opacity={akhir.opacity}
            transform={akhir.transform}
            warna="var(--accent-ink)"
            ukuran={62}
          />
        </svg>
      </div>
    </Scene>
  );
};
