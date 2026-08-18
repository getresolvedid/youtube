/* T18-S2 · scene 3 · jalur-beda — payoff
   VO:        3-jalur-beda-vo.md
   Direction: 3-jalur-beda-direction.md

   Yang mengejutkan bukan bahwa potongan berjalan, tapi bahwa jalannya
   berbeda-beda — jadi ketiga jalur wajib terlihat sekaligus di frame.

   DUA KEPUTUSAN:

   1. Kelimanya MENYEBAR ke tiga jalur, bukan beriringan di satu jalur. Lima
      potongan di satu jalur terbaca sebagai antrean, dan antrean adalah
      kebalikan dari isi scene ini.

   2. Kelima label tujuan masuk BERSAMAAN. Kesamaannya yang jadi isi beat 0;
      label yang datang satu-satu justru menonjolkan bedanya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-jaringan";
import {
  JALUR_X,
  JaringanTegak,
  TeksLayar,
  Tujuan,
  W,
  Y_ATAS,
  Y_BAWAH,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "jalur-beda";

const B_LABEL = beat(ID, 0); // "Setiap kotak diberi informasi tujuan…"
const B_JALAN = beat(ID, 1); // "Kotak-kotak tersebut kemudian dapat melewati jalur…"

const ALAMAT = "192.168.1.10";

/** Lima potongan. `jalur` menyebar ke ketiganya; `lama` berbeda ANTAR-JALUR
 *  supaya urutan tibanya tidak sama dengan urutan nomornya.
 *
 *  YANG SEJALUR WAJIB PUNYA `lama` YANG SAMA, dan `mundur` yang berbeda. Dua
 *  potongan sejalur dengan kecepatan berbeda akan merapat sampai berimpit —
 *  cacat yang sama persis dengan scene 6 video panjang, dan ia ketahuan lewat
 *  `npm run tumpang`, bukan lewat mata. Dengan kecepatan yang sama, jarak
 *  awalnya terjaga dari frame nol sampai frame terakhir. */
const POTONGAN = [
  { nomor: 1, jalur: 1, lama: 2.6, mundur: 0 },
  { nomor: 2, jalur: 0, lama: 3.1, mundur: 0 },
  { nomor: 3, jalur: 2, lama: 2.8, mundur: 0 },
  { nomor: 4, jalur: 1, lama: 2.6, mundur: 210 },
  { nomor: 5, jalur: 0, lama: 3.1, mundur: 210 },
] as const;

const Y_AWAL = Y_ATAS - 60;
/** Jarak tempuh, sama untuk kelimanya — bukan titik tujuan yang sama. */
const JARAK = Y_BAWAH - Y_AWAL;

export const JalurBeda: React.FC = () => {
  const d = useDetik();

  const label = masuk(d, { mulai: B_LABEL + 0.2, durasi: 0.5, geser: 14 });
  /* Menyebar dulu, baru turun — supaya lintasannya tidak miring. */
  const sebar = t(d, { mulai: B_JALAN, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  const teks1 = masuk(d, { mulai: B_LABEL + 0.1, durasi: 0.45, geser: 20 });
  const teks2 = masuk(d, { mulai: B_JALAN + 0.3, durasi: 0.45, geser: 20 });

  const maju = (i: number) =>
    t(d, {
      mulai: B_JALAN + 0.5,
      durasi: POTONGAN[i]?.lama ?? 2.8,
      dari: 0,
      ke: 1,
      ease: E.power1out,
    });

  const yDepan = Y_AWAL + JARAK * maju(0);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} nyala={nyalaSimpul(yDepan)} />
          <Tujuan y={1700} nyala={0} />

          {POTONGAN.map((p, i) => {
            const xJalur = JALUR_X[p.jalur] ?? W / 2;
            const xAwal = W / 2 + (i - (POTONGAN.length - 1) / 2) * 44;
            const x = xAwal + (xJalur - xAwal) * sebar;
            const y = Y_AWAL - p.mundur * sebar + JARAK * maju(i);

            return <Paket key={p.nomor} x={x} y={y} nomor={p.nomor} skala={0.84} />;
          })}

          {/* SATU label untuk kelimanya, bukan lima label.
              Lima label `192.168.1.10` di bawah potongan yang masih berimpit
              saling menimpa habis di 9:16 — tidak ada ruang mendatar untuk lima
              deret angka. Satu kalimat yang menyebut "semua" justru menyampaikan
              kesamaannya lebih jelas daripada lima salinan yang tertumpuk. */}
          <g style={{ opacity: label.opacity * (1 - sebar), transform: label.transform }}>
            <text
              x={W / 2}
              y={Y_AWAL + 130}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={38}
              fill="var(--ink-2)"
            >
              {`semua ke ${ALAMAT}`}
            </text>
          </g>

          <g style={{ opacity: teks1.opacity * (1 - teks2.opacity), transform: teks1.transform }}>
            <TeksLayar baris={["Tujuannya sama."]} y={300} />
          </g>
          <g style={{ opacity: teks2.opacity, transform: teks2.transform }}>
            <TeksLayar baris={["Jalannya", "beda-beda."]} y={300} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
