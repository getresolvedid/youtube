/* T15 · scene 4 · siapa-pun-mengetuk — bagian 3 [problem], 22,90 dtk
   VO:        04-siapa-pun-mengetuk-vo.md
   Direction: 04-siapa-pun-mengetuk-direction.md

   Panggung sama persis dengan scene 3, kamera kembali ke skala 1.

   SEMUA KETUKAN DIGAMBAR IDENTIK, dan itu keputusan: intinya justru bahwa siapa
   pun yang kebetulan lewat bisa melakukannya, tanpa perlu jadi siapa-siapa.
   Ketukan yang digambar sebagai penjahat mengubah masalahnya jadi masalah orang
   lain.

   Ketukan juga mendarat di pintu yang TERGEMBOK — yang mengetuk tidak tahu mana
   yang terkunci sebelum mencoba, dan itu yang membuat `10-diam` masuk akal.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  GEDUNG,
  Gedung,
  Ketukan,
  Lantai,
  Layar,
  N_PINTU,
  PINTU_HIDUP,
  PINTU,
  Peretas,
  X_GEDUNG,
  X_LUAR,
  X_PERETAS,
  Y_LANTAI,
  AKSEN,
  kamera,
  posPintu,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "siapa-pun-mengetuk";

const B_SIAPA = beat(ID, 0); // "Masalahnya, pintu yang bisa diketuk…"
const B_BUKAN = beat(ID, 1); // "Bukan cuma orang yang kamu tunggu."
const B_BANYAK = beat(ID, 2); // "Siapa pun, dari mana pun…"
const B_NAMA = beat(ID, 3); // "Tidak perlu tahu namamu."
const B_URUSAN = beat(ID, 4); // "Tidak perlu punya urusan denganmu."
const B_SUSUR = beat(ID, 5); // "Mereka cuma menyusuri nomor pintu…"
const B_MALAM = beat(ID, 6); // "Dan itu berjalan sepanjang malam…"

const X_DINDING = X_GEDUNG - GEDUNG.w / 2;

const hidup = (i: number) => PINTU_HIDUP.includes(i as (typeof PINTU_HIDUP)[number]);

/** Ketukan: tundaan, ketinggian, dan pintu tujuannya semuanya DITULIS.
 *  Sebagian sengaja menuju pintu yang tergembok. */
const KETUK = [
  { tunda: 0.0, y: 700 },
  { tunda: 1.6, y: 430 },
  { tunda: 2.5, y: 800 },
  { tunda: 3.0, y: 560 },
  { tunda: 3.5, y: 660 },
  { tunda: 4.0, y: 470 },
  { tunda: 4.45, y: 745 },
  { tunda: 4.9, y: 600 },
  { tunda: 5.3, y: 520 },
  { tunda: 5.7, y: 690 },
] as const;

const PINTU_TETAP = Array.from({ length: N_PINTU }, (_, i) => ({
  nyala: hidup(i) ? 1 : 0.2,
  gembok: hidup(i) ? 0 : 1,
}));

export const SiapaPunMengetuk: React.FC = () => {
  const d = useDetik();

  /* --- tahap 6: penanda menyusuri nomor pintu, cepat --- */
  const susur = t(d, {
    mulai: B_SUSUR,
    durasi: 2.1,
    dari: 0,
    ke: N_PINTU,
    ease: E.linear,
  });
  const iSusur = Math.min(N_PINTU - 1, Math.floor(susur));
  const pSusur = t(d, { mulai: B_SUSUR - 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const susurPadam = t(d, { mulai: B_MALAM - 0.3, durasi: 0.4, dari: 1, ke: 0 });

  /* --- yang mengetuk: berdiri sejak ketukan pertama, padam bersama ketukan ---
     Ia tidak pernah bergerak dan tidak pernah mendekat. Yang bekerja di scene
     ini kerapatan ketukannya, dan figur yang ikut berjalan maju akan merebut
     perhatian dari satu-satunya hal yang perlu terbaca: bahwa ketukannya tidak
     berhenti-henti. */
  const hadirPeretas = t(d, { mulai: B_SIAPA - 0.3, durasi: 0.7, dari: 0, ke: 1 });
  const padamKetuk = t(d, { mulai: B_SUSUR - 0.4, durasi: 0.5, dari: 1, ke: 0 });

  /* --- tahap 7: kamera masuk lewat salah satu pintu yang hidup --- */
  const pMasuk = t(d, { mulai: B_MALAM, durasi: 1.6, dari: 0, ke: 1, ease: E.expoOut });
  const pTuju = posPintu(PINTU_HIDUP[0]);
  const dalam = t(d, { mulai: B_MALAM + 0.55, durasi: 0.9, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g
            transform={kamera({
              x: pTuju.x,
              y: pTuju.y - PINTU.h / 2,
              skala: 1 + 1.4 * pMasuk,
            })}
          >
            <Lantai opacity={1 - pMasuk} />

            {/* Layar tenang di dalam gedung — muncul di balik pintu saat kamera
                masuk. Ia frame yang sama dengan detik nol episode, dan memang
                harus terbaca begitu. */}
            <g opacity={dalam}>
              <Layar isi={1} opacity={0.9} />
            </g>

            <Gedung pintu={PINTU_TETAP} opacity={1 - 0.15 * dalam} />

            {/* Ketukan yang paling rendah berangkat dari dalam siluetnya
                selama kurang dari sedetik, dan memang harus begitu — di situlah
                ia terbaca sebagai ketukan ORANG ITU, bukan gelombang yang
                kebetulan lewat. */}
            <g data-tumpang="sengaja" opacity={hadirPeretas * padamKetuk * (1 - pMasuk)}>
              <Peretas x={X_PERETAS} y={Y_LANTAI} skala={0.92} />
            </g>

            {KETUK.map((k, i) => {
              const mulai = (i === 0 ? B_SIAPA : i === 1 ? B_BUKAN : B_BANYAK) + k.tunda;
              const maju = t(d, {
                mulai,
                durasi: 1.45,
                dari: 0,
                ke: 1,
                ease: E.power1out,
              });
              const padam = padamKetuk;
              return (
                <Ketukan
                  key={i}
                  x={X_LUAR + (X_DINDING - X_LUAR) * maju}
                  y={k.y}
                  skala={0.9}
                  opacity={(maju > 0 ? 1 : 0) * padam}
                />
              );
            })}

            {/* --- tahap 4 & 5: tidak ada yang ditambahkan ---
                B_NAMA dan B_URUSAN sengaja tidak memicu elemen baru. Yang
                mengisi keduanya adalah ketukan yang terus berdatangan dengan
                bentuk yang persis sama — dan keseragaman itu memang isinya. */}

            {/* --- tahap 6: penanda di nomor pintu --- */}
            <g opacity={pSusur * susurPadam}>
              {(() => {
                const p = posPintu(iSusur);
                return (
                  <rect
                    x={p.x - PINTU.w / 2 - 8}
                    y={p.y - PINTU.h - 8}
                    width={PINTU.w + 16}
                    height={PINTU.h + 16}
                    rx={10}
                    fill="none"
                    stroke={AKSEN}
                    strokeWidth={5}
                  />
                );
              })()}
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
