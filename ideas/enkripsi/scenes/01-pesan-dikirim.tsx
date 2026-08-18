/* T17 (provisional) · scene 1 · pesan-dikirim — bagian 1 [question]
   VO:        01-pesan-dikirim-vo.md
   Direction: 01-pesan-dikirim-direction.md

   Frame pertama episode.

   TIGA KEPUTUSAN:

   1. TIGA ADEGAN, DUA POTONG KERAS. Beat 0 medium shot di meja, beat 1 dekat ke
      HP, beat 2-3 di jalur. Perpindahannya potong keras — opasitas yang berpindah
      seketika di batas beat, bukan silang-pudar (docs/02).

   2. JARINGANNYA MILIK ../panggung-kiriman.tsx, bukan digambar di sini. Hook ini
      memperlihatkan sekilas panggung yang nanti dijalani pelan-pelan di scene 4;
      kalau jalurnya berbeda, yang terbaca dua tempat, dan bagian 3 kehilangan
      pijakan yang seharusnya sudah dikenal penonton.

   3. SOSOK KEDUA TIDAK DIJELASKAN. Tanpa wajah, tanpa label, tanpa warna
      bahaya — lebih redup dan berdiri DI LUAR jalur. Ia dinamai dan dijelaskan
      baru di scene 5.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  HP_KANAN,
  HP_KIRI,
  JALUR,
  Hp,
  Jaringan,
  PENGAMAT,
  Paket,
  Sosok,
  kamera,
  nyalaDariJarak,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "pesan-dikirim";

/* Empat baris VO = empat beat. Arahan user menulis empat blok berdurasi 2 detik;
   angkanya sengaja tidak disalin (detik tidak pernah diketik tangan), yang
   dipakai urutannya. Kalau blok `## VO` dipecah, SEMUA indeks di bawah ikut
   bergeser dan remap-nya diselesaikan di suntingan yang sama. */
const B_BAYANG = beat(ID, 0); // "Bayangkan kamu ingin mengirim sebuah pesan…"
const B_KETIK = beat(ID, 1); // "Kamu mengetik pesan, lalu menekan tombol kirim."
const B_JALAN = beat(ID, 2); // "Pesan tersebut kemudian dikirim melalui internet…"
const B_TANYA = beat(ID, 3); // "Tapi, bagaimana jika ada orang lain…"

/** Isi gelembung di hook sengaja LEBIH PENDEK dari kalimat episode
 *  ("Halo, apa kabar?"): hook lewat cepat, dan kalimat penuh yang tidak sempat
 *  terbaca cuma jadi bentuk. Kalimat penuhnya diketik pelan-pelan di scene 3. */
const PESAN_HOOK = "Apa kabar?";

/** Paket berhenti di TENGAH jalur — itu isi beat 3, dan tweennya memang
 *  berakhir di situ. */
const X_HENTI = (JALUR.kiri + JALUR.kanan) / 2;

export const PesanDikirim: React.FC = () => {
  const d = useDetik();

  /* --- dua potong keras ---
     Nilainya melompat 0 -> 1 di batas beat, tanpa rentang. Silang-pudar di sini
     akan membuat meja dan HP tumpang tindih satu-dua frame — dan yang terbaca
     bukan potongan, melainkan kesalahan. */
  const diMeja = d < B_KETIK ? 1 : 0;
  const diHp = d >= B_KETIK && d < B_JALAN ? 1 : 0;
  const diJalur = d >= B_JALAN ? 1 : 0;

  /* --- adegan 1: sosok, HP terangkat, layar menyala --- */
  const bangun = masuk(d, { mulai: B_BAYANG + 0.05, durasi: 0.7, geser: 22 });
  const angkat = t(d, {
    mulai: B_BAYANG + 0.55,
    durasi: 0.8,
    dari: 14,
    ke: 0,
    ease: E.expoOut,
  });
  const layarNyala = t(d, { mulai: B_BAYANG + 0.9, durasi: 0.6, dari: 0, ke: 1 });

  /* --- adegan 2: huruf tumbuh, kirim ditekan, gelembung naik, tanda terkirim ---
     Hurufnya tumbuh lewat JUMLAH HURUF yang terlihat, bukan lewat opasitas per
     huruf — yang kedua terbaca sebagai teks berkedip. */
  const nHuruf = Math.floor(
    t(d, {
      mulai: B_KETIK + 0.1,
      durasi: 1.35,
      dari: 0,
      ke: PESAN_HOOK.length,
      ease: E.linear,
    }),
  );
  const tekan = tPP(d, { mulai: B_KETIK + 1.65, durasi: 0.34, dari: 1, ke: 0.86 });
  const naik = t(d, {
    mulai: B_KETIK + 1.85,
    durasi: 0.45,
    dari: 0,
    ke: -26,
    ease: E.expoOut,
  });
  const terkirim = t(d, { mulai: B_KETIK + 2.15, durasi: 0.4, dari: 0, ke: 1 });

  /* --- adegan 3: paket berjalan, lalu berhenti --- */
  const maju = t(d, {
    mulai: B_JALAN + 0.35,
    durasi: 2.6,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });
  const xPaket = JALUR.kiri + (X_HENTI - JALUR.kiri) * maju;

  /* --- beat 3: kamera merapat, yang mengamati terlihat, pertanyaan mendarat ---
     Sosok kedua muncul lewat OPASITAS SAJA, tanpa geser: dia tidak boleh terbaca
     sedang datang. Dia sudah di situ sejak tadi, cuma baru terlihat. */
  const rapat = t(d, {
    mulai: B_TANYA,
    durasi: 1.2,
    dari: 1,
    ke: 1.1,
    ease: E.expoOut,
  });
  const mengamati = t(d, { mulai: B_TANYA + 0.35, durasi: 0.9, dari: 0, ke: 0.5 });
  const tanya = masuk(d, { mulai: B_TANYA + 0.55, durasi: 0.55, geser: 24 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ================= adegan 1 — di meja ================= */}
          <g
            opacity={diMeja * bangun.opacity}
            style={{ transform: bangun.transform }}
          >
            <rect x={300} y={806} width={1320} height={14} rx={7} fill="var(--line)" />
            <rect
              x={1210}
              y={760}
              width={300}
              height={44}
              rx={12}
              fill="var(--bg-elev)"
              stroke="var(--line)"
              strokeWidth={3}
            />

            <Sosok x={720} y={806} />

            <path
              d={`M 800 690 Q 880 700 926 ${664 + angkat}`}
              stroke="var(--ink-1)"
              strokeWidth={30}
              strokeLinecap="round"
              fill="none"
            />

            <g transform={`translate(0 ${angkat})`}>
              <Hp x={928} y={556} w={150} h={262} nyala={layarNyala} />
            </g>
          </g>

          {/* ================= adegan 2 — dekat ke HP ================= */}
          <g opacity={diHp}>
            <Hp x={690} y={92} w={540} h={904} nyala={0.5}>
              <g transform={`translate(0 ${naik})`}>
                <rect
                  x={1150 - 42 - nHuruf * 21}
                  y={470}
                  width={Math.max(28, nHuruf * 21) + 42}
                  height={76}
                  rx={22}
                  fill="var(--accent)"
                  opacity={0.9}
                />
                <text
                  x={1150 - 21}
                  y={512}
                  fontSize={38}
                  fontFamily="var(--font-body)"
                  fontWeight={600}
                  fill="var(--ink-0)"
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {PESAN_HOOK.slice(0, nHuruf)}
                </text>
              </g>

              <g opacity={terkirim} transform={`translate(0 ${naik})`}>
                <path
                  d="M 1104 574 l 12 13 l 24 -27"
                  stroke="var(--ok)"
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>

              <g
                transform={`translate(1120 880) scale(${tekan}) translate(-1120 -880)`}
              >
                <circle cx={1120} cy={880} r={40} fill="var(--accent)" />
                <path
                  d="M 1104 880 h 30 M 1122 868 l 14 12 l -14 12"
                  stroke="var(--ink-0)"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </Hp>
          </g>

          {/* ================= adegan 3 — di jalur ================= */}
          <g opacity={diJalur}>
            <g transform={kamera(rapat)}>
              {/* Jaringan yang sama persis dengan scene 4 — cuma simpul jauhnya
                  belum tampil, karena hook belum menjanjikan luasnya. */}
              <Jaringan luas={0} nyala={(i) => nyalaDariJarak(xPaket, JALUR.kiri + i * 264)} />

              <Hp {...HP_KIRI} nyala={0.6} />
              <Hp {...HP_KANAN} nyala={0.6} />

              <Paket x={xPaket} y={JALUR.y} />

              <Sosok
                x={PENGAMAT.x}
                y={PENGAMAT.alas - 150}
                skala={0.5}
                opacity={mengamati}
              />
            </g>

            <g style={{ opacity: tanya.opacity, transform: tanya.transform }}>
              <text
                x={960}
                y={186}
                fontSize={58}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill="var(--ink-0)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Tapi, apakah pesan itu benar-benar aman?
              </text>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
