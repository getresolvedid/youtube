/* T16 · scene 10 · gembok-lambat — bagian 6 [explaining], 25,98 dtk
   VO:        10-gembok-lambat-vo.md
   Direction: 10-gembok-lambat-direction.md

   Menjawab pertanyaan yang lahir sendiri di scene 9: kalau kuncinya sudah ada di
   dua meja, gemboknya untuk apa? JAWABANNYA SOAL WAKTU, BUKAN SOAL KEKUATAN.

   ANTREAN YANG MENUMPUK YANG MEMBUAT "LAMBAT" TERASA, bukan kata "lambat".
   Tanpa akibat yang kelihatan, penonton cuma disuruh percaya satu sifat.

   Gembok di tahap 2 sengaja butuh 1,4 dtk untuk menjepit — di scene 4 dan 7
   gerakan yang sama cuma 0,35 dtk. Bedanya itu satu-satunya cara "lambat"
   terbaca.

   INI SATU-SATUNYA SCENE DENGAN ARUS DUA ARAH. Di seluruh episode arahnya kiri
   ke kanan; pengecualian di sini yang membuatnya terbaca sebagai perubahan.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  GELAP,
  Gembok,
  I_GEMBOK_DIAMBIL,
  Jalan,
  Kotak,
  Kunci,
  Meja,
  N_TANGAN,
  Tangan,
  X_GEMBOK,
  X_KIRIM,
  X_LUAR_KANAN,
  X_LUAR_KIRI,
  X_TERIMA,
  Y_GEMBOK,
  Y_JALAN,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "gembok-lambat";

const B_RAPI = beat(ID, 0); // "Kunci yang sama di dua meja itu bukan sekadar rapi."
const B_LAMBAT = beat(ID, 1); // "…tapi dia lambat."
const B_ANTRE = beat(ID, 2); // "…kirimanmu bukan cuma satu kotak."
const B_PEMBUKAAN = beat(ID, 3); // "Jadi gembok cuma dipakai sebentar…"
const B_LETAK = beat(ID, 4); // "…gemboknya diletakkan."
const B_ALIR = beat(ID, 5); // "Sisanya mengalir dengan kunci yang cepat…"

const Y_KUNCI = Y_JALAN - 150;
const Y_GARIS_WAKTU = Y_JALAN + 240;
const X_JEPIT = 700;
const PANJANG = X_LUAR_KANAN - X_LUAR_KIRI;

export const GembokLambat: React.FC = () => {
  const d = useDetik();

  /* --- tahap 2: gembok turun dan menjepit, SENGAJA berat --- */
  const turun = t(d, { mulai: B_LAMBAT, durasi: 1.4, dari: 0, ke: 1, ease: E.sineInOut });
  const jepit = t(d, { mulai: B_LAMBAT + 1.2, durasi: 1.4, dari: 0, ke: 1, ease: E.sineInOut });

  /* --- tahap 3: antrean menumpuk di belakangnya --- */
  const antre = (k: number) =>
    t(d, { mulai: B_ANTRE + k * 0.08, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 4: garis waktu, tanpa satu pun angka --- */
  const garis = gambarGaris(d, PANJANG, { mulai: B_PEMBUKAAN + 0.15, durasi: 0.9 });
  const blok = t(d, { mulai: B_PEMBUKAAN + 0.9, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 5: gembok diletakkan ke tepi --- */
  const letak = t(d, { mulai: B_LETAK, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });
  const kunciNyala = t(d, { mulai: B_LETAK + 0.5, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 6: arus dua arah, tiga kali lebih cepat daripada scene 1 --- */
  const alir = t(d, { mulai: B_ALIR, durasi: 12, dari: 0, ke: 1, ease: E.linear });
  /* Antrean pecah begitu kunci cepat mengambil alih. */
  const pecah = 1 - t(d, { mulai: B_ALIR, durasi: 0.4, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({})}>
            <Jalan />
            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} />
            ))}

            {/* gembok yang masih tergeletak di tepi, dari scene 9 */}
            <g opacity={0.25}>
              {X_GEMBOK.map((x, i) =>
                i === I_GEMBOK_DIAMBIL ? null : (
                  <Gembok key={x} x={x} y={Y_GEMBOK} skala={1.05} terbuka={1} />
                ),
              )}
            </g>

            {/* dua kunci kembar — yang benar-benar mengangkut percakapannya */}
            <Kunci
              x={X_KIRIM}
              y={Y_KUNCI}
              skala={1.3}
              opacity={0.55 + 0.45 * kunciNyala}
            />
            <Kunci
              x={X_TERIMA}
              y={Y_KUNCI}
              skala={1.3}
              opacity={0.55 + 0.45 * kunciNyala}
            />

            {/* antrean yang menumpuk di belakang kotak yang sedang digembok */}
            {[1, 2, 3, 4].map((k) => {
              const p = antre(k);
              return (
                <g key={k} opacity={p * pecah}>
                  <Kotak x={X_JEPIT - k * 150 * p} y={Y_JALAN} skala={0.62} />
                </g>
              );
            })}

            {/* kotak yang digembok pelan-pelan */}
            <g opacity={pecah}>
              <Kotak x={X_JEPIT} y={Y_JALAN} gembok={jepit * (1 - letak)} skala={0.62} />
              <Gembok
                x={X_JEPIT}
                y={Y_JALAN - 300 + 230 * turun - 240 * letak}
                skala={1.1}
                terbuka={1 - jepit}
                opacity={Math.max(1 - jepit, letak)}
              />
            </g>

            {/* garis waktu: cuma potongan paling kiri yang ditandai gembok */}
            <g opacity={t(d, { mulai: B_PEMBUKAAN, durasi: 0.4, dari: 0, ke: 1 })}>
              <path
                d={`M${X_LUAR_KIRI} ${Y_GARIS_WAKTU}h${PANJANG}`}
                stroke={GELAP}
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={garis.strokeDasharray}
                strokeDashoffset={garis.strokeDashoffset}
              />
              <rect
                x={X_LUAR_KIRI}
                y={Y_GARIS_WAKTU - 10}
                width={PANJANG * 0.12 * blok}
                height={20}
                rx={8}
                fill={AKSEN}
              />
            </g>

            {/* arus dua arah — satu-satunya di episode ini */}
            {alir > 0 &&
              [0, 1, 2, 3, 4, 5].map((k) => {
                const maju = (alir * 3 + k * 0.17) % 1;
                const kanan = k % 2 === 0;
                const x = kanan
                  ? X_KIRIM + (X_TERIMA - X_KIRIM) * maju
                  : X_TERIMA - (X_TERIMA - X_KIRIM) * maju;
                return (
                  <Kotak
                    key={k}
                    x={x}
                    y={Y_JALAN - (kanan ? 0 : 96)}
                    skala={0.5}
                    gembok={0}
                    opacity={0.9}
                  />
                );
              })}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
