/* T15 · scene 10 · diam — bagian 6 [explaining], 30,40 dtk
   VO:        10-diam-vo.md
   Direction: 10-diam-direction.md

   SATU-SATUNYA scene di episode ini yang membelah frame. Alasannya: dua cara
   menolak hanya berarti kalau dibandingkan, dan membandingkan dua hal yang
   tampil berurutan menuntut penonton mengingat yang pertama.

   TIGA KEPUTUSAN:

   1. Yang menang di scene ini PENGETUK, bukan penjaga. Karena itu tahap 5 dan 6
      mengikuti tangannya pulang, bukan mengikuti penjaganya bekerja.

   2. Penjaga di sisi kanan TIDAK BERGERAK SEDIKIT PUN di tahap 7. Diam yang
      digambar sebagai gerakan kecil apa pun berubah jadi "mengabaikan", dan
      mengabaikan masih berarti ada yang di sana.

   3. Jarak antar pengulangan di tahap 9 MELEBAR (0,45 lalu 0,7 lalu 1,1 dtk).
      Melebarnya itu yang membuat "menunggu" terbaca tanpa satu angka pun —
      berapa lama yang di luar menunggu adalah angka yang belum punya sumber.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  GELAP,
  Ketukan,
  Lantai,
  PINTU,
  Peta,
  Pintu,
  Sosok,
  Y_LANTAI,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "diam";

const B_DUA = beat(ID, 0); // "Padahal memilih itu bisa dilakukan dengan dua cara."
const B_JAWAB = beat(ID, 1); // "Yang pertama, dia menjawab."
const B_MAAF = beat(ID, 2); // "Maaf, tidak boleh."
const B_SOPAN = beat(ID, 3); // "Terdengar sopan, dan kelihatannya beres."
const B_BAWA = beat(ID, 4); // "Tapi yang mengetuk pulang membawa satu hal."
const B_TAHU = beat(ID, 5); // "Sekarang dia tahu pintunya ada…"
const B_KEDUA = beat(ID, 6); // "Cara kedua, dia tidak menjawab apa pun."
const B_KOSONG = beat(ID, 7); // "Ketukannya jatuh ke ruang kosong."
const B_MENYERAH = beat(ID, 8); // "Yang di luar cuma bisa berdiri, mengulang…"
const B_PULANG = beat(ID, 9); // "Dan dia pulang tanpa tahu ada apa di balik dinding itu."

/* Dua panggung kembar. Sengaja BUKAN cermin: kalau salah satu dibalik, arah
   "luar ada di kiri" pecah di separuh layar, dan seluruh episode memakai arah
   itu. Yang dibedakan cuma posisinya di frame. */
const SISI = [
  { x0: 560, pintu: 780 },
  { x0: 1360, pintu: 1580 },
] as const;

const Y_PINTU = Y_LANTAI - 120;
const Y_JALUR = Y_PINTU - PINTU.h / 2;

/** Sepotong dinding di belakang tiap pintu. Tanpa itu, yang berdiri di layar
 *  cuma satu persegi melayang — dan pintu yang tidak menempel pada apa pun
 *  berhenti terbaca sebagai pintu. Ia juga yang mengisi separuh frame yang
 *  tadinya kosong di kedua sisi. */
const DINDING_SISI = { w: 320, h: 400 };

/** Peta yang dibandingkan di tahap 10 — DI ATAS masing-masing sisi, bukan di
 *  bawah. Di bawah sudah ada penjaga yang berdiri di garis lantai, dan petanya
 *  mendarat tepat di badannya. */
const Y_PETA = 380;

export const Diam: React.FC = () => {
  const d = useDetik();

  const belah = gambarGaris(d, 700, { mulai: B_DUA, durasi: 0.8 });
  const kiriNyala = t(d, { mulai: B_JAWAB, durasi: 0.5, dari: 0.3, ke: 1 });
  const kananNyala = t(d, { mulai: B_KEDUA, durasi: 0.5, dari: 0.3, ke: 1 });
  const kiriRedup = t(d, { mulai: B_KEDUA, durasi: 0.5, dari: 1, ke: 0.42 });

  /* --- sisi kiri: ketukan datang, dijawab, pulang membawa peta --- */
  const datangKiri = t(d, { mulai: B_JAWAB, durasi: 1.0, dari: 0, ke: 1, ease: E.power1out });
  const jawab = t(d, { mulai: B_MAAF, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const balikKiri = t(d, { mulai: B_SOPAN, durasi: 1.2, dari: 0, ke: 1, ease: E.power2in });
  const bawa = masuk(d, { mulai: B_BAWA + 0.15, durasi: 0.5, geser: 16 });
  const terbaca = t(d, { mulai: B_TAHU, durasi: 0.6, dari: 0, ke: 1 });

  /* --- sisi kanan: ketukan datang, tidak dijawab, mengulang, menyerah --- */
  const ulang = [0, 0.45, 1.15, 2.25].map((tunda) =>
    t(d, { mulai: B_KOSONG + tunda, durasi: 0.9, dari: 0, ke: 1, ease: E.power1out }),
  );
  const datangKanan = t(d, { mulai: B_KEDUA, durasi: 1.0, dari: 0, ke: 1, ease: E.power1out });
  const menyerah = t(d, { mulai: B_MENYERAH + 1.6, durasi: 1.1, dari: 0, ke: 1 });

  /* --- tahap 10: dua peta disandingkan, bersamaan --- */
  const peta = masuk(d, { mulai: B_PULANG + 0.1, durasi: 0.55, geser: 18 });

  const xKiriKetuk =
    SISI[0].x0 - 300 + (SISI[0].pintu - 150 - (SISI[0].x0 - 300)) * datangKiri - 460 * balikKiri;
  const xKananKetuk = SISI[1].x0 - 300 + (SISI[1].pintu - 150 - (SISI[1].x0 - 300)) * datangKanan;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Lantai opacity={0.6} />
          <path
            d={`M960 190v700`}
            stroke={GELAP}
            strokeWidth={3}
            {...belah}
          />

          {/* ---------------- sisi kiri: menjawab ---------------- */}
          <g opacity={kiriNyala * kiriRedup}>
            <rect
              x={SISI[0].pintu - DINDING_SISI.w / 2}
              y={Y_LANTAI - DINDING_SISI.h}
              width={DINDING_SISI.w}
              height={DINDING_SISI.h}
              rx={12}
              fill="var(--bg-elev)"
              stroke={GELAP}
              strokeWidth={5}
            />
            <Pintu x={SISI[0].pintu} y={Y_PINTU} nomor={3} nyala={1} nomorTampil={1} />
            <Sosok x={SISI[0].pintu - 260} y={Y_LANTAI} topi hadap={1} skala={0.8} />
            <Ketukan x={xKiriKetuk} y={Y_JALUR} skala={0.72} opacity={1 - balikKiri * 0.2} />

            {/* jawaban yang terkirim balik ke pengetuk */}
            <g opacity={jawab * (1 - balikKiri)}>
              <path
                d={`M${SISI[0].pintu - 320} ${Y_JALUR - 70}h${-150 * jawab}`}
                stroke="var(--bad)"
                strokeWidth={6}
                strokeLinecap="round"
              />
              <path
                d={`M${SISI[0].pintu - 470} ${Y_JALUR - 70}l26 -16v32z`}
                fill="var(--bad)"
                opacity={jawab > 0.85 ? 1 : 0}
              />
            </g>

            {/* yang ikut pulang di tangannya */}
            <g style={{ opacity: bawa.opacity, transform: bawa.transform }}>
              <Peta
                x={xKiriKetuk - 10}
                y={Y_JALUR - 190}
                skala={0.42}
                terisi={terbaca > 0.5 ? [2] : []}
              />
            </g>
          </g>

          {/* ---------------- sisi kanan: diam ---------------- */}
          <g opacity={kananNyala}>
            <rect
              x={SISI[1].pintu - DINDING_SISI.w / 2}
              y={Y_LANTAI - DINDING_SISI.h}
              width={DINDING_SISI.w}
              height={DINDING_SISI.h}
              rx={12}
              fill="var(--bg-elev)"
              stroke={GELAP}
              strokeWidth={5}
            />
            <Pintu x={SISI[1].pintu} y={Y_PINTU} nomor={3} nyala={1} nomorTampil={1} />
            <Sosok
              x={SISI[1].pintu - 260}
              y={Y_LANTAI}
              topi
              hadap={1}
              skala={0.8}
              opacity={1}
            />
            <Ketukan
              x={xKananKetuk}
              y={Y_JALUR}
              skala={0.72}
              opacity={(1 - menyerah) * (datangKanan > 0 ? 1 : 0)}
            />

            {/* ketukan yang memudar di udara, berkali-kali, jaraknya MELEBAR */}
            {ulang.map((u, i) => (
              <Ketukan
                key={i}
                x={xKananKetuk + 60 + 110 * u}
                y={Y_JALUR}
                skala={0.62}
                opacity={u > 0 && u < 1 ? (1 - u) * 0.9 * (1 - menyerah) : 0}
                warna={AKSEN}
              />
            ))}
          </g>

          {/* ---------------- tahap 10: dua peta, dibandingkan ---------------- */}
          <g style={{ opacity: peta.opacity, transform: peta.transform }}>
            <Peta x={SISI[0].pintu} y={Y_PETA} skala={0.78} terisi={[2]} />
            <Peta x={SISI[1].pintu} y={Y_PETA} skala={0.78} terisi={[]} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
