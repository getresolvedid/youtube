/* Lembar kontak — semua figur di folder ini dalam satu frame.
 *
 * Ini yang membuat `shared/figures/` bisa dipercaya. Figur di sini tidak
 * dimiliki episode mana pun, jadi tanpa lembar ini satu-satunya cara melihatnya
 * adalah menempelkannya ke scene sungguhan dulu — dan itu berarti cacatnya baru
 * ketahuan setelah ada yang membangun scene di atasnya.
 *
 *   npx remotion still figur-kontak out/figur.png
 *
 * Diperiksa dengan MATA, bukan oleh tes. `npm run check` cuma membuktikan
 * framenya tidak kosong (CLAUDE.md), dan figur yang proporsinya meleset atau
 * titik tumpunya salah lolos pemeriksaan itu dengan mudah.
 *
 * Setiap figur berdiri di GARIS LANTAI yang sama dan titik tumpunya ditandai
 * silang tipis — dua hal yang paling sering salah dan paling sulit dilihat di
 * dalam scene yang ramai.
 */
import type React from "react";

import { Panggung } from "../Stage";
import { Gembok } from "./Gembok";
import { Lantai } from "./Lantai";
import { Penjaga } from "./Penjaga";
import { Peretas } from "./Peretas";
import { Sosok } from "./Sosok";
import { TanganMemegang } from "./TanganMemegang";
import { lebarPada } from "./normalisasi";
import { HACKER_KOTAK, PERSON_KOTAK, POLICEMAN_KOTAK } from "./sumber-svgrepo";
import { ABU, AKSEN, TEDUH, teksDasar } from "./palet";

const Y = 760;

/** Silang tipis di titik tumpu figur — bukan bagian figurnya. */
const Tumpu: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g opacity={0.5}>
    <path
      d={`M${x - 18} ${y}h36M${x} ${y - 18}v36`}
      stroke={AKSEN}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </g>
);

const Label: React.FC<{ x: number; teks: string }> = ({ x, teks }) => (
  <text {...teksDasar} x={x} y={Y + 70} fontSize={26} fill={TEDUH}>
    {teks}
  </text>
);

const Isi: React.FC = () => (
  <svg viewBox="0 0 1920 1080" width="100%" height="100%">
    <Lantai y={Y} x1={80} x2={1840} />

    {/* --- Tiga figur manusia, tinggi baku yang sama ------------------------
            Berdampingan seperti ini karena yang paling mahal salah bukan
            bentuknya masing-masing melainkan PERBANDINGANNYA: tiga siluet yang
            tingginya sama tapi lebarnya berbeda dua kali lipat tidak terbaca
            sebagai tiga orang. Lebarnya ikut dicetak supaya perbandingan itu
            jadi angka, bukan firasat. ------------------------------------- */}
    <Sosok x={170} y={Y} />
    <Tumpu x={170} y={Y} />
    <Label x={170} teks={`Sosok · ${lebarPada(PERSON_KOTAK)}`} />

    <Penjaga x={350} y={Y} />
    <Tumpu x={350} y={Y} />
    <Label x={350} teks={`Penjaga · ${lebarPada(POLICEMAN_KOTAK)}`} />

    <Peretas x={530} y={Y} />
    <Tumpu x={530} y={Y} />
    <Label x={530} teks={`Peretas · ${lebarPada(HACKER_KOTAK, 69)}`} />

    {/* --- ketiganya pada skala terkecil yang dipakai scene sungguhan.
            0,44 adalah sosok sewaan di scene 13 T15, dan di situlah pembeda
            yang cuma sebesar topi berhenti terbaca. ---------------------- */}
    <Sosok x={690} y={Y} skala={0.44} />
    <Penjaga x={745} y={Y} skala={0.44} />
    <Peretas x={800} y={Y} skala={0.44} />
    <Tumpu x={690} y={Y} />
    <Label x={745} teks="skala 0,44" />

    {/* --- Gembok: tertutup & terbuka --------------------------------------- */}
    <Gembok x={900} y={Y - 40} />
    <Tumpu x={900} y={Y - 40} />
    <Label x={900} teks="Gembok 0" />

    <Gembok x={1040} y={Y - 40} terbuka={1} warna={AKSEN} />
    <Tumpu x={1040} y={Y - 40} />
    <Label x={1040} teks="Gembok 1" />

    {/* --- Tangan: titik tumpunya dasar cekungan telapak.
            Gembok di bawah ini ditaruh di x YANG SAMA, dan y-nya dinaikkan
            setinggi separuh badan gembok — `Gembok` bertumpu di PUSAT badannya,
            bukan di kakinya, jadi `41` adalah jarak pusat ke dasar. Kalau
            gemboknya melayang atau tenggelam, TUMPU di TanganMemegang.tsx yang
            salah, bukan angka di sini. ------------------------------------- */}
    <TanganMemegang x={1290} y={Y - 30} />
    <Gembok x={1290} y={Y - 30 - 41 * 0.7} skala={0.7} isi="none" warna={AKSEN} />
    <Tumpu x={1290} y={Y - 30} />
    <Label x={1290} teks="TanganMemegang" />

    <TanganMemegang x={1650} y={Y - 30} hadap={-1} warna={TEDUH} skala={0.75} />
    <Tumpu x={1650} y={Y - 30} />
    <Label x={1650} teks="hadap -1 · 0.75" />

    <text {...teksDasar} x={960} y={120} fontSize={44} fill={ABU}>
      shared/figures
    </text>
    <text {...teksDasar} x={960} y={172} fontSize={24} fill={TEDUH}>
      silang = titik tumpu · garis = lantai bersama
    </text>
  </svg>
);

export const KontakFigur: React.FC = () => (
  <Panggung>
    <Isi />
  </Panggung>
);
