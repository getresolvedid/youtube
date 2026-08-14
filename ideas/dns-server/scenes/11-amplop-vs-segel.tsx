/* T14 · scene 11 · amplop-vs-segel — bagian 6 [explaining], 34,68 dtk
   VO:        11-amplop-vs-segel-vo.md
   Direction: 11-amplop-vs-segel-direction.md

   Seluruh scene berdiri di DUA KOLOM YANG SETARA, dan tata letaknya itu sendiri
   adalah argumennya. VO bilang keduanya tidak saling menggantikan; kolom yang
   berat sebelah membantahnya di layar sambil VO menyangkal.

   TIGA KEPUTUSAN:

   1. Kedua kolom setara di setiap ukuran yang bisa diukur: lebar, tinggi ikon,
      jumlah tahap, opasitas. Ini bukan estetika — ini isi scene-nya.

   2. Tahap 3 dan 7 adalah PASANGAN, dan keduanya kelemahan. Papan kosong di
      kiri lalu papan terisi di kanan: struktur "ini bagusnya, ini yang tidak
      dia selesaikan" dipakai dua kali berturut-turut supaya terbaca sebagai
      pembandingan yang adil, bukan promosi salah satu.

   3. Sosok di tepi jalur TIDAK PERNAH diusir dari kedua kolom. Ia tetap berdiri
      di kiri maupun kanan; yang berubah cuma apa yang bisa dia dapat.
      Mengusirnya di salah satu kolom menjanjikan hal yang tidak dijanjikan
      tambalan mana pun.

   4. Tahap 10 adalah JEMBATAN, bukan penutup. Kedua ikon meredup sama banyak —
      beda opasitas di situ membantah keputusan 1 di baris terakhir — lalu jalur
      tergambar di y=900 dan kartu pertanyaan berhenti tepat di `TANGGA.x0`.
      Koordinat itu bukan pilihan estetika: di situ loket terdekat tumbuh di
      frame pertama `12-ganti-loket`, jadi potongan kerasnya jatuh di atas dua
      benda yang tidak bergerak. Kalau `TANGGA` di panggung-loket digeser,
      yang ikut bergeser bukan cuma scene 12.

   Segel digambar sebagai LILIN, bukan gembok. Gembok berarti tertutup, dan
   tertutup persis yang TIDAK dilakukan segel — itu kolom sebelahnya.
*/
import type React from "react";

import { E, gambarGaris, getar, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Kartu, NOMOR_BARU, Papan, Sosok, TANGGA } from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "amplop-vs-segel";

const B_DUA = beat(ID, 0); // "Ada dua tambalan untuk itu. Dan keduanya sering dikira ..."
const B_AMPLOP = beat(ID, 1); // "Yang pertama, pertanyaannya dimasukkan ke amplop."
const B_TIDAKBACA = beat(ID, 2); // "Orang di tepi jalur tidak bisa lagi membaca ..."
const B_TAPIBUKTI = beat(ID, 3); // "Tapi amplop tidak membuktikan apa pun ..."
const B_SEGEL = beat(ID, 4); // "Yang kedua, jawabannya diberi segel oleh yang menulisnya."
const B_KETAHUAN = beat(ID, 5); // "Segelnya bisa diperiksa, ..."
const B_TERBACA = beat(ID, 6); // "Tapi segel tidak menutupi apa-apa. ..."
const B_SATUSATU = beat(ID, 7); // "Satu menyembunyikan. Satu membuktikan."
const B_TIDAKGANTI = beat(ID, 8); // "Dan yang satu tidak pernah menggantikan yang lain."
const B_TETAPTAHU = beat(ID, 9); // "Yang kamu tanyai tetap tahu semuanya. ..."

/** Dua kolom, jarak ke garis tengah SAMA. Lihat keputusan 1. */
const KOL = [490, 1430] as const;
const Y_JALUR = 430;

export const AmplopVsSegel: React.FC = () => {
  const d = useDetik();

  const belah = gambarGaris(d, 640, { mulai: B_DUA + 0.2, durasi: 0.5 });
  const kolomAda = t(d, { mulai: B_DUA + 0.3, durasi: 0.6, dari: 0, ke: 1 });

  /* --- kolom kiri: amplop --- */
  const amplop = t(d, { mulai: B_AMPLOP + 0.1, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const kiriJalan = t(d, { mulai: B_AMPLOP + 0.5, durasi: 2.2, dari: 0, ke: 1, ease: E.linear });
  const kiriTanya = t(d, { mulai: B_TAPIBUKTI + 0.3, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });

  /* --- kolom kanan: segel --- */
  const stempel = t(d, { mulai: B_SEGEL + 0.2, durasi: 0.4, dari: 1.6, ke: 1, ease: E.power3out });
  const stempelAda = t(d, { mulai: B_SEGEL + 0.2, durasi: 0.25, dari: 0, ke: 1 });
  const getarStempel = getar(d, { mulai: B_SEGEL + 0.58, durasi: 0.4, jauh: 5, putaran: 2 });
  const kananJalan = t(d, { mulai: B_SEGEL + 0.7, durasi: 2.0, dari: 0, ke: 1, ease: E.linear });
  const periksa = t(d, { mulai: B_KETAHUAN + 0.2, durasi: 0.7, dari: 0, ke: 1, ease: E.expoOut });
  const tolak = t(d, { mulai: B_KETAHUAN + 0.7, durasi: 0.7, dari: 0, ke: 1, ease: E.power2in });
  const kananBaris = t(d, { mulai: B_TERBACA, durasi: 1.6, dari: 0, ke: 4, ease: E.linear });

  /* --- tahap 8 & 9: disederhanakan jadi dua ikon, ukuran SAMA PERSIS --- */
  const p = t(d, { mulai: B_SATUSATU - 0.2, durasi: 0.7, dari: 0, ke: 1, ease: E.expoOut });
  const rumit = kolomAda * (1 - p);
  const rapat = t(d, { mulai: B_TIDAKGANTI, durasi: 0.7, dari: 0, ke: 1, ease: E.expoOut });
  /* Jarak akhirnya 600px, bukan 400: dua kata sepanjang "menyembunyikan" dan
     "membuktikan" bersentuhan di 400 — dan dua kata yang menempel terbaca
     sebagai satu kata. */
  const xIkon = [KOL[0] + (660 - KOL[0]) * rapat, KOL[1] - (KOL[1] - 1260) * rapat];

  /* --- tahap 10: jalur ke loket yang kamu tanyai — lihat keputusan 4 --------- */
  const jalurAda = t(d, { mulai: B_TETAPTAHU + 0.05, durasi: 0.3, dari: 0, ke: 1 });
  const jalurGambar = gambarGaris(d, 1760, { mulai: B_TETAPTAHU + 0.05, durasi: 0.8 });
  const kartuJalan = t(d, {
    mulai: B_TETAPTAHU + 0.55,
    durasi: 1.5,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const kartuAda = t(d, { mulai: B_TETAPTAHU + 0.5, durasi: 0.3, dari: 0, ke: 1 });
  /* Kedua ikon meredup SAMA BANYAK, dari SATU nilai — dua tween terpisah adalah
     dua tempat untuk meleset, dan beda opasitas di sini membantah keputusan 1.
     Dua tahap: redup selagi kalimatnya jatuh, lalu habis sebelum scene tutup,
     supaya frame terakhir cuma jalur + kartu — persis frame pertama scene 12. */
  const ikonRedup =
    (1 - t(d, { mulai: B_TETAPTAHU + 0.2, durasi: 0.6, dari: 0, ke: 0.48 })) *
    (1 - t(d, { mulai: B_TETAPTAHU + 3.3, durasi: 0.7, dari: 0, ke: 1 }));

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <path d="M960 220v640" stroke="var(--line)" strokeWidth={4} {...belah} opacity={1 - p} />

          {/* ================= kolom kiri: amplop ================= */}
          <g opacity={rumit}>
            <path
              d={`M${KOL[0] - 340} ${Y_JALUR}h680`}
              stroke="var(--line)"
              strokeWidth={7}
              strokeLinecap="round"
            />
            <rect
              x={KOL[0] + 250}
              y={Y_JALUR - 100}
              width={140}
              height={200}
              rx={10}
              fill="var(--bg-elev)"
              stroke="var(--ink-1)"
              strokeWidth={5}
            />
            <Kartu
              x={KOL[0] - 260 + 480 * kiriJalan}
              y={Y_JALUR}
              teks="?"
              skala={0.56}
              beramplop={amplop > 0.5}
            />
            <Sosok x={KOL[0] - 60} y={760} skala={0.8} />
            {/* papannya KOSONG, dan tetap kosong — tanpa tween sama sekali */}
            <Papan x={KOL[0] + 250} y={720} baris={0} skala={0.62} />
            {/* jawabannya keluar tanpa segel apa pun */}
            <g opacity={kiriTanya}>
              <Kartu x={KOL[0] + 320} y={Y_JALUR + 190} teks={NOMOR_BARU} skala={0.46} />
              <text
                x={KOL[0] + 320}
                y={Y_JALUR + 290}
                fontSize={56}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill="var(--warn)"
                textAnchor="middle"
              >
                ?
              </text>
            </g>
          </g>

          {/* ================= kolom kanan: segel ================= */}
          <g opacity={rumit}>
            <path
              d={`M${KOL[1] - 340} ${Y_JALUR}h680`}
              stroke="var(--line)"
              strokeWidth={7}
              strokeLinecap="round"
            />
            <rect
              x={KOL[1] + 250}
              y={Y_JALUR - 100}
              width={140}
              height={200}
              rx={10}
              fill="var(--bg-elev)"
              stroke="var(--ink-1)"
              strokeWidth={5}
            />
            {/* kartu bersegel — terbuka, isinya tetap terbaca */}
            <g transform={`translate(${getarStempel} 0)`}>
              <Kartu
                x={KOL[1] - 260 + 480 * kananJalan}
                y={Y_JALUR}
                teks={NOMOR_BARU}
                skala={0.56 * (stempelAda > 0 ? stempel : 1)}
                bersegel={stempelAda > 0.5}
              />
            </g>
            {/* yang tanpa segel: diperiksa, lalu ditolak dan jatuh */}
            <g opacity={periksa * (1 - 0.2 * tolak)}>
              <circle
                cx={KOL[1] + 250}
                cy={Y_JALUR}
                r={40 + 60 * periksa}
                fill="none"
                stroke="var(--ok)"
                strokeWidth={4}
                opacity={0.8 * (1 - periksa)}
              />
              <Kartu
                x={KOL[1] + 120 - 120 * tolak}
                y={Y_JALUR + 330 * tolak}
                teks={NOMOR_BARU}
                skala={0.46}
                rot={36 * tolak}
                opacity={periksa}
              />
            </g>
            <Sosok x={KOL[1] - 60} y={760} skala={0.8} />
            {/* papannya TERISI — isinya tetap terbaca sepanjang jalan */}
            <Papan x={KOL[1] + 250} y={720} baris={kananBaris} skala={0.62} />
          </g>

          {/* ============ tahap 10: jalur ke loket yang kamu tanyai ============ */}
          <g opacity={jalurAda}>
            <path
              d="M160 900H1920"
              stroke="var(--line)"
              strokeWidth={6}
              strokeLinecap="round"
              {...jalurGambar}
            />
            {/* Berhenti TEPAT di TANGGA.x0: di situ loket terdekat tumbuh di
                frame pertama scene 12. Tidak ada penanda tambahan — kartu yang
                berhenti di titik kosong sudah menunjuk sendiri. */}
            <Kartu
              x={700 + (TANGGA.x0 - 700) * kartuJalan}
              y={900}
              teks="?"
              skala={0.5}
              opacity={kartuAda}
            />
          </g>

          {/* ================= dua ikon, ukuran sama persis ================= */}
          <g opacity={p * ikonRedup}>
            {/* amplop */}
            <g transform={`translate(${xIkon[0]} 480)`}>
              <rect
                x={-150}
                y={-100}
                width={300}
                height={200}
                rx={12}
                fill="var(--bg-elev)"
                stroke="var(--ink-1)"
                strokeWidth={7}
              />
              <path d="M-150 -100 0 12 150 -100" fill="none" stroke="var(--ink-1)" strokeWidth={7} />
              <text
                x={0}
                y={190}
                fontSize={46}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill="var(--ink-0)"
                textAnchor="middle"
              >
                menyembunyikan
              </text>
              <text
                x={0}
                y={246}
                fontSize={26}
                fontFamily="var(--font-mono)"
                fill="var(--ink-2)"
                textAnchor="middle"
              >
                pertanyaannya
              </text>
            </g>

            {/* segel — lilin, bukan gembok */}
            <g transform={`translate(${xIkon[1]} 480)`}>
              <rect
                x={-150}
                y={-100}
                width={300}
                height={200}
                rx={12}
                fill="var(--bg-elev)"
                stroke="var(--ink-1)"
                strokeWidth={7}
              />
              <path d="M-96 -46h140M-96 0h192M-96 46h110" stroke="var(--ink-1)" strokeWidth={6} strokeLinecap="round" />
              <circle cx={112} cy={62} r={38} fill="var(--bad)" opacity={0.92} />
              <text
                x={0}
                y={190}
                fontSize={46}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill="var(--ink-0)"
                textAnchor="middle"
              >
                membuktikan
              </text>
              <text
                x={0}
                y={246}
                fontSize={26}
                fontFamily="var(--font-mono)"
                fill="var(--ink-2)"
                textAnchor="middle"
              >
                jawabannya
              </text>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
