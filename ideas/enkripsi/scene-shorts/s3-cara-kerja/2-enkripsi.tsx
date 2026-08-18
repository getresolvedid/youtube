/* T17-S3 · scene 2 · enkripsi — pusat Short 3
   VO:        2-enkripsi-vo.md
   Direction: 2-enkripsi-direction.md

   `[what]` DINAMAI DI SINI (HARD RULE 6) — bendanya sudah berdiri: penonton baru
   saja melihat kalimatnya dan sosok yang mengamatinya.

   PERUBAHAN HURUFNYA TIDAK BERPASANGAN SATU-SATU. Arahan user meminta morf
   bertahap per huruf; bentuk itu menggambarkan SANDI SUBSTITUSI, dan penonton
   yang menangkapnya akan menyimpulkan ia bisa dipecahkan dengan menebak
   pasangan huruf — model yang keliru untuk enkripsi. Yang dipertahankan:
   hasilnya X7K9@2#L8$Q, mulus bukan glitch, ±1,7 dtk. Yang diubah cuma caranya:
   seluruh baris berganti sekaligus, dan keluarannya lebih panjang dari
   masukannya. Alasan lengkap: 2-enkripsi-vo.md.
*/
import type React from "react";

import { E, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { KotakProses, Paket, SANDI_PANJANG } from "../../panggung-kiriman";
import { TeksLayar, W, kamera } from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "enkripsi";
const B_NAMA = beat(ID, 0);
const B_BERUBAH = beat(ID, 1);

export const KOTAK = { x: W / 2, y: 1000, w: 860, h: 360 } as const;

export const Enkripsi: React.FC = () => {
  const d = useDetik();

  const kotak = t(d, { mulai: 0.15, durasi: 0.6, dari: 0, ke: 1 });
  const masukKotak = t(d, {
    mulai: 0.7,
    durasi: 0.8,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const tutup = t(d, {
    mulai: 1.5,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const rapat = t(d, {
    mulai: 0.4,
    durasi: 1.4,
    dari: 1,
    ke: 1.06,
    ease: E.expoOut,
  });

  /* Kotaknya membuka sedikit supaya perubahannya terlihat terjadi. */
  const buka = t(d, {
    mulai: B_BERUBAH,
    durasi: 0.5,
    dari: 1,
    ke: 0.3,
    ease: E.power2out,
  });
  /* DUA OPASITAS BERLAWANAN DI RENTANG YANG SAMA — bukan morf per huruf. */
  const tukar = t(d, { mulai: B_BERUBAH + 0.5, durasi: 1.7, dari: 0, ke: 1 });
  /* Barisnya MELAR: lambangnya menyusul sampai lebih panjang dari kalimatnya.
     Itu yang membuat "berubah bentuk" tidak terbaca sebagai "huruf ditukar". */
  const nSandi = Math.floor(
    t(d, {
      mulai: B_BERUBAH + 0.9,
      durasi: 1.4,
      dari: 4,
      ke: SANDI_PANJANG.length,
      ease: E.linear,
    }),
  );

  const nama = t(d, { mulai: B_NAMA + 0.5, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(rapat, KOTAK.x, KOTAK.y)} opacity={kotak}>
            <KotakProses {...KOTAK} label="ENKRIPSI" tutup={tutup * buka}>
              <g data-tumpang="sengaja">
                <text
                  x={KOTAK.x}
                  y={KOTAK.y}
                  fontSize={52}
                  fontFamily="var(--font-display)"
                  fontWeight={800}
                  fill="var(--ink-0)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={masukKotak * (1 - tukar)}
                >
                  HALO, APA KABAR?
                </text>
                <text
                  x={KOTAK.x}
                  y={KOTAK.y}
                  fontSize={52}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill="var(--accent-ink)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={tukar}
                  letterSpacing={3}
                >
                  {SANDI_PANJANG.slice(0, nSandi)}
                </text>
              </g>
            </KotakProses>

            {/* paket bergembok, siap berangkat di scene 3 */}
            <g opacity={tukar}>
              <Paket x={KOTAK.x} y={KOTAK.y + KOTAK.h / 2 + 120} terkunci={1} skala={1.5} />
            </g>
          </g>

          <TeksLayar
            baris={["ENKRIPSI"]}
            y={300}
            opacity={nama}
            warna="var(--accent-ink)"
            ukuran={78}
          />
        </svg>
      </div>
    </Scene>
  );
};
