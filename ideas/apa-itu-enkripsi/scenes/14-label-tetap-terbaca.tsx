/* T16 · scene 14 · label-tetap-terbaca — bagian 6 [explaining], 21,57 dtk
   VO:        14-label-tetap-terbaca-vo.md
   Direction: 14-label-tetap-terbaca-direction.md

   TITIK PUTUS ANALOGI NOMOR DUA, dan sambungan diam-diam ke T15: penjaga di
   sana membaca label dan tidak pernah membuka kotaknya — di sini penonton tahu
   kenapa labelnya memang harus ada di luar.

   TAHAP 3 YANG MEMBUAT LABEL TERASA WAJIB, bukan kalimatnya. Kurir yang berhenti
   karena labelnya hilang adalah bukti; tanpa gambar itu ia cuma klaim.

   Isi label bentuk garis, bukan huruf — sama seperti surat pengenal di scene 11.
   Yang perlu terbaca bahwa ada tulisan di sana, bukan tulisannya.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  ABU,
  AKSEN,
  GELAP,
  Jalan,
  Kotak,
  Meja,
  N_TANGAN,
  Tangan,
  X_KIRIM,
  X_TERIMA,
  Y_JALAN,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "label-tetap-terbaca";

const B_TERBACA = beat(ID, 0); // "Tapi ada satu bagian kotak yang sengaja dibiarkan terbaca."
const B_LABEL = beat(ID, 1); // "Labelnya."
const B_TANPA = beat(ID, 2); // "Tanpa label, kurirnya tidak tahu…"
const B_KEMANA = beat(ID, 3); // "Jadi ke mana kotakmu pergi, tetap terlihat…"
const B_SEBESAR = beat(ID, 4); // "Sebesar apa kotaknya…"
const B_DUA = beat(ID, 5); // "Isinya memang tertutup…"

const X_DEKAT = 900;

export const LabelTetapTerbaca: React.FC = () => {
  const d = useDetik();

  const tumpukanPudar = 1 - t(d, { mulai: B_TERBACA, durasi: 0.8, dari: 0, ke: 1 });

  const dekat = t(d, { mulai: B_TERBACA, durasi: 1.0, dari: 0.86, ke: 1.9, ease: E.power2out });
  const jauh = t(d, { mulai: B_KEMANA, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });
  const skala = dekat - 0.9 * jauh;

  const label = t(d, { mulai: B_LABEL, durasi: 0.45, dari: 0, ke: 1 });

  /* --- tahap 3: labelnya ditutup, dan kotaknya langsung berhenti --- */
  const tutupLabel = t(d, { mulai: B_TANPA + 0.4, durasi: 0.3, dari: 0, ke: 1, ease: E.power2in });
  const bukaLabel = t(d, { mulai: B_KEMANA, durasi: 0.3, dari: 0, ke: 1 });
  const labelKini = label * (1 - tutupLabel + bukaLabel);

  /* Kotak jalan lagi begitu labelnya kembali — lajunya dikalikan, bukan
     dipotong: kotak yang berhenti mendadak terbaca sebagai tabrakan. */
  const laju = t(d, { mulai: B_KEMANA + 0.2, durasi: 2.6, dari: 0, ke: 1, ease: E.power1out });
  const xKotak = X_DEKAT + (X_TERIMA - X_DEKAT) * laju;

  const lintasan = gambarGaris(d, X_TERIMA - X_KIRIM, { mulai: B_KEMANA + 0.3, durasi: 1.1 });

  const contoh = t(d, { mulai: B_SEBESAR + 0.2, durasi: 0.6, dari: 0, ke: 1 });
  const bidang = t(d, { mulai: B_DUA + 0.2, durasi: 0.6, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ x: X_DEKAT, y: Y_JALAN - 60, skala })}>
            <Jalan />
            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} nyala={Math.abs(xKotak - posTangan(i)) < 110 ? 1 : 0} />
            ))}

            {/* tumpukan scene lalu, meredup */}
            <g opacity={tumpukanPudar * 0.5}>
              {[0, 1, 2, 3].map((k) => (
                <Kotak
                  key={k}
                  x={posTangan(2) - 150 + (k % 3) * 150}
                  y={960 - Math.floor(k / 3) * 84}
                  skala={0.55}
                  gembok={1}
                />
              ))}
            </g>

            <Kotak x={xKotak} y={Y_JALAN} gembok={1} label={labelKini} bayang={0} />

            {/* penutup label — sengaja bidang polos, bukan coretan */}
            <rect
              x={xKotak - 52}
              y={Y_JALAN - 92}
              width={58}
              height={38}
              rx={5}
              fill={GELAP}
              opacity={tutupLabel * (1 - bukaLabel)}
            />

            {/* lintasan yang terbaca dari jalan */}
            <path
              d={`M${X_KIRIM} ${Y_JALAN + 34}h${X_TERIMA - X_KIRIM}`}
              stroke={AKSEN}
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={lintasan.strokeDasharray}
              strokeDashoffset={lintasan.strokeDashoffset}
              opacity={0.85}
            />

            {/* sebesar apa, dan sesering apa — dibaca dari bentuk, tanpa angka */}
            <g opacity={contoh}>
              {[0.42, 0.62, 0.86].map((s, i) => (
                <Kotak key={s} x={420 + i * 190} y={Y_JALAN - 300} skala={s} gembok={1} label={1} />
              ))}
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <circle
                  key={k}
                  cx={1120 + k * 74}
                  cy={Y_JALAN - 330}
                  r={11}
                  fill={AKSEN}
                  opacity={0.8}
                />
              ))}
            </g>

            {/* dua bidang: isi yang gelap, jalur yang terang */}
            <g opacity={bidang}>
              <rect
                x={560}
                y={Y_JALAN - 540}
                width={360}
                height={200}
                rx={16}
                fill="var(--bg-elev)"
                stroke={ABU}
                strokeWidth={5}
                opacity={0.35}
              />
              <rect
                x={1000}
                y={Y_JALAN - 540}
                width={360}
                height={200}
                rx={16}
                fill="var(--accent-soft)"
                stroke={AKSEN}
                strokeWidth={5}
              />
              <Kotak x={740} y={Y_JALAN - 460} skala={0.5} gembok={1} opacity={0.35} />
              <path
                d={`M1060 ${Y_JALAN - 520}h240`}
                stroke={AKSEN}
                strokeWidth={6}
                strokeLinecap="round"
              />
              <circle cx={1180} cy={Y_JALAN - 470} r={14} fill={AKSEN} />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
