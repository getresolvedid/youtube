/* T16 · scene 1 · hook-banyak-tangan — bagian 1 [question], 23,34 dtk
   VO:        01-hook-banyak-tangan-vo.md
   Direction: 01-hook-banyak-tangan-direction.md

   Scene yang MENETAPKAN panggung seluruh episode: jalan mendatar, kiri ke kanan,
   dengan kotak yang berjalan di atasnya. Semua koordinatnya milik
   `../panggung-kiriman.tsx`, bukan berkas ini.

   DUA KEPUTUSAN:

   1. Kotaknya TIDAK tergembok di sini. Gembok baru masuk di scene 4; kalau ia
      sudah menempel sejak hook, seluruh bagian 3 kehilangan pertanyaannya.

   2. Tulisan di tahap 1 harus benar-benar terbaca. Ia satu-satunya bukti bahwa
      isi kotak itu ada, dan tahap 6 bertumpu pada penonton mengingat bahwa ia
      tadi sempat terlihat.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  ABU,
  AKSEN,
  Jalan,
  Kotak,
  Meja,
  N_TANGAN,
  Surat,
  TEDUH,
  Tangan,
  X_KIRIM,
  Y_JALAN,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "hook-banyak-tangan";

const B_KETIK = beat(ID, 0); // "Kamu baru saja mengetik sesuatu…"
const B_MUNDUR = beat(ID, 1); // "…kamu tidak pernah melihat jalannya."
const B_TANGAN = beat(ID, 2); // "Di jalan itu ada tangan."
const B_JALAN = beat(ID, 3); // "Kotak kecilmu berpindah…"
const B_ASING = beat(ID, 4); // "Semuanya asing."
const B_TUTUP = beat(ID, 5); // "…tidak satu pun tahu isinya."
const B_TANYA = beat(ID, 6); // "Kenapa tidak?"

/** Tempat kotak berhenti — tengah jalan, dan tetap jadi titik acuan scene 3. */
const X_BERHENTI = 960;

export const HookBanyakTangan: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: baris tulisan terketik di layar --- */
  const ketik = t(d, { mulai: B_KETIK + 0.15, durasi: 1.1, dari: 0, ke: 1 });
  const kotakLahir = t(d, { mulai: B_KETIK + 1.0, durasi: 0.5, dari: 0, ke: 1, ease: E.backOut(1.4) });

  /* --- tahap 2: kamera mundur dari layar ke jalan penuh --- */
  const skala = t(d, {
    mulai: B_MUNDUR,
    durasi: 1.1,
    dari: 2.2,
    ke: 1,
    ease: E.power2out,
  });

  /* --- tahap 3: tangan muncul dari kiri ke kanan --- */
  const tangan = (i: number) => masuk(d, { mulai: B_TANGAN + i * 0.12, durasi: 0.5, geser: 26 });

  /* --- tahap 4: kotak berjalan, berpindah tangan --- */
  const maju = t(d, {
    mulai: B_JALAN,
    durasi: B_TUTUP - B_JALAN,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });
  const xKotak = X_KIRIM + (X_BERHENTI - X_KIRIM) * maju;
  /* Lompatan serah terima: fungsi murni dari x, jadi ia otomatis jatuh di tiap
     tangan tanpa satu pun tundaan yang harus dijaga tetap sama. */
  const lompat = 18 * Math.abs(Math.sin(((xKotak - X_KIRIM) / 220) * Math.PI)) * maju;

  /* --- tahap 5: tangan yang sedang memegang menyala --- */
  const nyalaTangan = (i: number) => {
    if (d < B_ASING) return 0;
    const jarak = Math.abs(xKotak - posTangan(i));
    return jarak < 110 ? 1 : 0;
  };

  /* --- tahap 7: pertanyaannya menggantung --- */
  const tanya = masuk(d, { mulai: B_TANYA + 0.1, durasi: 0.55, geser: 30 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ x: X_KIRIM, y: Y_JALAN - 90, skala })}>
            <Jalan opacity={0.35 + 0.65 * t(d, { mulai: B_MUNDUR, durasi: 0.8, dari: 0, ke: 1 })} />
            <Meja x={X_KIRIM} />

            {/* Layarnya MELAYANG di atas meja, bukan berdiri di permukaannya:
                di permukaan ia berebut piksel dengan kotak yang lahir di sana,
                dan dua benda yang saling menutupi di frame pertama episode
                adalah hal pertama yang dilihat penonton. */}
            <g opacity={1 - t(d, { mulai: B_JALAN, durasi: 0.6, dari: 0, ke: 0.65 })}>
              <rect
                x={X_KIRIM - 150}
                y={Y_JALAN - 400}
                width={300}
                height={200}
                rx={12}
                fill="var(--bg-elev)"
                stroke={ABU}
                strokeWidth={6}
              />
              <path
                d={`M${X_KIRIM} ${Y_JALAN - 200}v186`}
                stroke={ABU}
                strokeWidth={8}
                strokeLinecap="round"
              />
              <path
                d={`M${X_KIRIM - 110} ${Y_JALAN - 330}h${170 * ketik}`}
                stroke={TEDUH}
                strokeWidth={9}
                strokeLinecap="round"
              />
              <path
                d={`M${X_KIRIM - 110} ${Y_JALAN - 290}h${120 * Math.max(0, ketik * 1.6 - 0.6)}`}
                stroke={TEDUH}
                strokeWidth={9}
                strokeLinecap="round"
              />
            </g>

            {Array.from({ length: N_TANGAN }, (_, i) => {
              const m = tangan(i);
              return (
                <g key={i} style={{ opacity: m.opacity, transform: m.transform }}>
                  <Tangan x={posTangan(i)} nyala={nyalaTangan(i)} />
                </g>
              );
            })}

            {/* surat yang sempat terbaca, lalu masuk ke kotak dan tidak
                terlihat lagi sampai scene 4 */}
            <g opacity={kotakLahir * (1 - t(d, { mulai: B_KETIK + 1.35, durasi: 0.4, dari: 0, ke: 1 }))}>
              <Surat x={X_KIRIM} y={Y_JALAN - 62} skala={0.7} />
            </g>

            <g opacity={kotakLahir}>
              <Kotak
                x={xKotak}
                y={Y_JALAN - lompat}
                skala={0.72 + 0.28 * kotakLahir}
              />
            </g>

            <g style={{ opacity: tanya.opacity, transform: tanya.transform }}>
              <text
                x={X_BERHENTI}
                y={Y_JALAN - 310}
                fontSize={132}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill={AKSEN}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ?
              </text>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
