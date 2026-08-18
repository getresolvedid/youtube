/* T18 · scene 1 · hook — bagian 1 [question]
   VO:        01-hook-vo.md
   Direction: 01-hook-direction.md

   Tugasnya memindahkan penonton dari benda yang dikenal (laptop di meja) ke
   ruang yang jadi panggung sepuluh scene berikutnya (jaringan) — lewat KAMERA,
   bukan lewat potong, supaya keduanya terbaca sebagai tempat yang sama.

   DUA KEPUTUSAN:

   1. Dorongan masuk sengaja pelan dan hampir tidak disadari; mundurnya cepat.
      Kontras kecepatan itu yang membuat tahap 3 terasa seperti membuka mata dan
      bukan sekadar zoom keluar.

   2. Laptopnya TIDAK hilang saat kamera mundur — ia mengecil dan tinggal di
      kiri. Scene 11 kembali ke laptop yang sama; kalau ia lenyap di sini,
      kepulangan itu terbaca sebagai benda baru.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  JALUR_UTAMA,
  JaringLatar,
  Label,
  Laptop,
  Paket,
  X_KIRI,
  Y_LANTAI,
  kamera,
} from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "hook";

const B_TANYA = beat(ID, 0); // "Pernahkah kamu berpikir…"
const B_JALAN = beat(ID, 1); // "Bagaimana saat kamu membuka sebuah website…"
const B_NAMA = beat(ID, 2); // "…aturan komunikasi yang disebut TCP/IP."

/** Enam titik cahaya yang keluar dari laptop. Jaraknya tetap — bukan acak. */
const TITIK = [0, 1, 2, 3, 4, 5] as const;

export const Hook: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 3: kamera. Satu nilai skala, dua tween yang saling menimpa --- */
  const dorong = t(d, {
    mulai: B_TANYA,
    durasi: Math.max(0.8, B_NAMA - B_TANYA),
    dari: 1,
    ke: 1.22,
    ease: E.sineInOut,
  });
  const mundur = t(d, { mulai: B_NAMA, durasi: 1.1, dari: 0, ke: 1, ease: E.expoOut });
  const skala = dorong - (dorong - 0.58) * mundur;

  /* Laptop bergeser ke kiri saat kamera mundur, supaya tengah layar kosong
     untuk namanya. */
  const geserKiri = t(d, { mulai: B_NAMA, durasi: 1.1, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 1: halaman sedang dimuat di layar --- */
  const muat = t(d, { mulai: B_TANYA + 0.3, durasi: 3.2, dari: 0, ke: 0.85 });

  /* --- tahap 2: titik cahaya keluar, yang pertama jadi potongan kiriman --- */
  const titik = TITIK.map((i) =>
    t(d, { mulai: B_JALAN + i * 0.12, durasi: 2.4, dari: 0, ke: 1, ease: E.linear }),
  );
  const jadiPaket = t(d, { mulai: B_JALAN + 0.9, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 3: jaring mekar lalu namanya jatuh --- */
  const jaring = t(d, { mulai: B_NAMA, durasi: 1.8, dari: 0, ke: 1, ease: E.power1out });
  const nama = masuk(d, { mulai: B_NAMA + 0.55, durasi: 0.6, geser: 22 });

  const xLaptop = X_KIRI + 660 - 660 * geserKiri;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala })}>
            <JaringLatar maju={jaring} opacity={0.85 * jaring} />

            {/* --- laptop: benda yang dikenal, dan ia tidak pernah hilang --- */}
            <Laptop
              x={xLaptop}
              y={Y_LANTAI}
              skala={1 - 0.42 * geserKiri}
              nyala={1}
              layar={
                <>
                  <rect x={-104} y={-156} width={208} height={16} rx={8} fill="var(--ink-2)" opacity={0.45} />
                  <rect
                    x={-104}
                    y={-128}
                    width={208 * muat}
                    height={10}
                    rx={5}
                    fill="var(--accent)"
                  />
                  <rect x={-104} y={-108} width={150} height={10} rx={5} fill="var(--ink-2)" opacity={0.3} />
                  <rect x={-104} y={-88} width={182} height={10} rx={5} fill="var(--ink-2)" opacity={0.3} />
                </>
              }
            />

            {/* --- tahap 2: titik cahaya keluar dari laptop --- */}
            {TITIK.map((i) => {
              const u = titik[i] ?? 0;
              if (u <= 0 || u >= 1) return null;
              const x = xLaptop + 160 + u * 900;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={JALUR_UTAMA + (i % 2 === 0 ? 0 : -34)}
                  r={7}
                  fill="var(--accent)"
                  opacity={(1 - u) * 0.9}
                />
              );
            })}

            {/* Titik pertama yang membesar jadi potongan kiriman — perkenalan
                bendanya, jauh sebelum scene 6 menamainya. */}
            <Paket
              x={xLaptop + 420}
              y={JALUR_UTAMA - 34}
              skala={0.5 + 0.5 * jadiPaket}
              opacity={jadiPaket * (1 - mundur)}
            />

            {/* --- tahap 3: namanya jatuh di tengah jaring --- */}
            <g style={{ opacity: nama.opacity, transform: nama.transform }}>
              <Label x={960} y={540} teks="TCP/IP" sub="aturan yang dipakai internet" besar />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
