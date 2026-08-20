/* Kelima belas kover Short — 9:16 · 2160×3840.
 *
 * Brief: ../thumbnail.md. Satu berkas untuk kelimabelasnya, bukan lima belas
 * berkas: yang menyatukan seri di feed justru KEKONSISTENANNYA, dan lima belas
 * berkas terpisah adalah lima belas tempat gaya bisa berbeda diam-diam.
 *
 * TIAP FIGUR MENGIMPOR KOMPONEN SCENE-NYA SENDIRI. docs/06 melarang thumbnail
 * menjanjikan gambar yang tidak ada di videonya; di sini larangan itu jadi
 * mustahil dilanggar, bukan sekadar terlarang — kalau figurnya tidak ada di
 * episodenya, ia tidak bisa diimpor dari mana pun.
 *
 * Di luar folder scene (HARD RULE 1): `npm run sisa` memeriksa tiap `.tsx` di
 * dalam folder scene terhadap daftar kunci naskah.
 *
 *   npx remotion still T19-thumb-s1 fast_ideas/neural-network/render/thumb-s01.png
 */
import type React from "react";

import { KartuThumbnail } from "../../../shared/Thumbnail";
import { Jaringan, Kartu, SAMBUNGAN, simpul } from "./panggung-nn";
import { SambunganMasuk, SimpulBesar, TEBAL } from "./panggung-neuron";
import { BATAS_HAFAL, KOTAK, Sebaran, TITIK_BARU } from "./panggung-lapis";
import { Bola, Lereng } from "./panggung-lereng";
import { BlokTransformer, KotakTahap, PanahGelung } from "./panggung-gelung";
import {
  AKTIVASI,
  GAMBAR,
  GarisPerhatian,
  KALIMAT,
  Kisi,
  Kurva,
  N_KISI,
  PERHATIAN,
  Panah,
  Potongan,
  jalurKurva,
} from "./panggung-seri";

/** Pita figur kartu 9:16: 1860 × 2100 (shared/Thumbnail.tsx). Semua figur di
 *  bawah menggambar di dalam viewBox ini. */
const W = 1860;
const H = 2100;

/** Pembungkus sama untuk kelimabelasnya — satu tempat kalau viewBox berubah. */
const Pita: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-hidden>
    {children}
  </svg>
);

/** Menaruh satu titik figur (`cx`, `cy` di koordinat SCENE-nya) tepat di tengah
 *  pita, lalu memperbesarnya `s` kali.
 *
 *  Ada karena transform yang dihitung tangan per kover meleset diam-diam: kover
 *  pertama lahir dengan figur menumpuk di kiri-atas dan sepertiga tengah kartu
 *  kosong — lolos semua pemeriksaan, dan baru ketahuan saat PNG-nya dibuka.
 *  Dengan pemusat ini, yang perlu diputuskan tiap kover cuma dua hal yang memang
 *  keputusan: BENDA MANA yang jadi pusatnya, dan seberapa besar. */
const Fokus: React.FC<{ cx: number; cy: number; s: number; children: React.ReactNode }> = ({
  cx,
  cy,
  s,
  children,
}) => (
  <g transform={`translate(${W / 2 - cx * s} ${H / 2 - cy * s}) scale(${s})`}>{children}</g>
);

/** Figur jaringan dipakai empat kover (01, 06, 08, 15). Skalanya disamakan di
 *  sini supaya keempatnya terbaca sebagai jaringan yang sama. */
const JaringPita: React.FC<{ opacity?: number }> = ({ opacity = 0.55 }) => (
  <Fokus cx={540} cy={800} s={1.75}>
    <Jaringan opacity={opacity} />
  </Fokus>
);

/* ---------- 01 · belajar — proses terpotong ------------------------------- */
export const ThumbS1: React.FC = () => (
  <KartuThumbnail baris={["DITEGUR", "RIBUAN KALI"]} rasio="9x16">
    <Pita>
      <Fokus cx={540} cy={1150} s={1.45}>
        <Kartu y={900} teks="ANJING" warna="salah" />
        <Kartu y={1400} teks="KUCING" atas="SEHARUSNYA" warna="benar" />
        <line x1={782} y1={900} x2={782} y2={1400} stroke="var(--bad)" strokeWidth={14} strokeLinecap="round" />
        {[900, 1400].map((y) => (
          <line key={y} x1={744} y1={y} x2={820} y2={y} stroke="var(--bad)" strokeWidth={12} strokeLinecap="round" />
        ))}
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 02 · neuron — proses terpotong -------------------------------- */
export const ThumbS2: React.FC = () => (
  <KartuThumbnail baris={["ISI SATU", "SIMPUL"]} rasio="9x16">
    <Pita>
      <Fokus cx={540} cy={800} s={1.55}>
        <SambunganMasuk tebal={(i) => TEBAL[i] ?? 1} />
        <SimpulBesar />
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 03 · bobot & bias — koreksi ----------------------------------- */
export const ThumbS3: React.FC = () => (
  <KartuThumbnail baris={["BUKAN SAMA", "KUAT"]} rasio="9x16">
    <Pita>
      <Fokus cx={540} cy={760} s={1.7}>
        <SambunganMasuk tebal={(i) => TEBAL[i] ?? 1} nyala={(i) => (i === 0 ? 1 : 0)} />
        <SimpulBesar />
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 04 · aktivasi — sebelum → sesudah ----------------------------- */
export const ThumbS4: React.FC = () => (
  <KartuThumbnail baris={["LURUS JADI", "BELOK"]} rasio="9x16">
    <Pita>
      <Kurva d={jalurKurva((u) => u * 0.8, 120, 700, 760, 620)} warna="var(--ink-2)" tebal={18} />
      <Panah x={950} y={700} panjang={200} tebal={16} />
      <Kurva d={jalurKurva(AKTIVASI, 1180, 700, 620, 620)} tebal={22} />
      <g transform="translate(0 700)">
        <Kurva d={jalurKurva(AKTIVASI, 500, 700, 900, 900)} tebal={26} />
      </g>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 05 · lapisan — koreksi ---------------------------------------- */
export const ThumbS5: React.FC = () => (
  <KartuThumbnail baris={["SATU LAPIS", "TAK CUKUP"]} rasio="9x16">
    <Pita>
      <Fokus cx={540} cy={1105} s={1.7}>
        <Sebaran />
        <line
          x1={KOTAK.x1 - 40}
          y1={KOTAK.y1 + 40}
          x2={KOTAK.x2 + 40}
          y2={KOTAK.y2 - 40}
          stroke="var(--ink-0)"
          strokeWidth={12}
          strokeLinecap="round"
        />
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 06 · maju — proses terpotong ---------------------------------- */
export const ThumbS6: React.FC = () => (
  <KartuThumbnail baris={["MASUK,", "LALU APA?"]} rasio="9x16">
    <Pita>
      <JaringPita opacity={0.5} />
      <Fokus cx={540} cy={800} s={1.75}>
        <circle cx={540} cy={800} r={72} fill="var(--accent-soft)" />
        <circle cx={540} cy={800} r={30} fill="var(--accent-ink)" />
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 07 · loss — angka mengagetkan --------------------------------- */
export const ThumbS7: React.FC = () => (
  <KartuThumbnail baris={["SEBERAPA", "SALAH?"]} rasio="9x16">
    <Pita>
      <Fokus cx={540} cy={1105} s={1.5}>
        <Kartu y={880} teks="0,2" warna="salah" />
        <Kartu y={1330} teks="1,0" warna="benar" />
        <line x1={782} y1={880} x2={782} y2={1330} stroke="var(--bad)" strokeWidth={14} strokeLinecap="round" />
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 08 · mundur — anomali ----------------------------------------- */
export const ThumbS8: React.FC = () => {
  const s = SAMBUNGAN[9];
  return (
    <KartuThumbnail baris={["BERJALAN", "MUNDUR"]} rasio="9x16">
      <Pita>
        <JaringPita opacity={0.4} />
        <Fokus cx={540} cy={790} s={1.75}>
          {s && (
            <line
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="var(--bad)"
              strokeWidth={14}
              strokeLinecap="round"
            />
          )}
          <circle cx={540} cy={760} r={62} fill="var(--bad-soft)" />
          <circle cx={540} cy={760} r={26} fill="var(--bad)" />
          <path d="M 500 700 L 540 640 L 580 700 Z" fill="var(--bad)" />
        </Fokus>
      </Pita>
    </KartuThumbnail>
  );
};

/* ---------- 09 · lereng — proses terpotong -------------------------------- */
export const ThumbS9: React.FC = () => (
  <KartuThumbnail baris={["TURUN,", "KE MANA?"]} rasio="9x16">
    <Pita>
      <Fokus cx={540} cy={1010} s={1.6}>
        <Lereng />
        <Bola u={0.86} />
        {[-1, 1].map((arah) => (
          <g key={arah}>
            <line
              x1={860 + arah * 70}
              y1={700}
              x2={860 + arah * 170}
              y2={700}
              stroke="var(--ink-0)"
              strokeWidth={12}
              strokeLinecap="round"
            />
            <path
              d={`M ${860 + arah * 160} ${676} L ${860 + arah * 210} ${700} L ${860 + arah * 160} ${724} Z`}
              fill="var(--ink-0)"
            />
          </g>
        ))}
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 10 · latihan — proses terpotong ------------------------------- */
export const ThumbS10: React.FC = () => (
  <KartuThumbnail baris={["EMPAT TAHAP", "DIULANG"]} rasio="9x16">
    <Pita>
      <Fokus cx={520} cy={920} s={1.6}>
        {[0, 1, 2, 3].map((i) => (
          <KotakTahap key={i} i={i} nyala={i === 0 ? 1 : 0} />
        ))}
        <PanahGelung tampil={() => 1} />
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 11 · hafalan — koreksi ---------------------------------------- */
export const ThumbS11: React.FC = () => (
  <KartuThumbnail baris={["HAFAL,", "BUKAN PAHAM"]} rasio="9x16">
    <Pita>
      <Fokus cx={540} cy={1105} s={1.7}>
        <Sebaran />
        <Kurva
          d={jalurKurva(
            BATAS_HAFAL,
            KOTAK.x1,
            (KOTAK.y1 + KOTAK.y2) / 2,
            KOTAK.x2 - KOTAK.x1,
            KOTAK.y2 - KOTAK.y1,
          )}
          warna="var(--ink-0)"
          tebal={12}
        />
        {TITIK_BARU.map((p) => (
          <circle
            key={`${p.x}-${p.y}`}
            cx={p.x}
            cy={p.y}
            r={26}
            fill="none"
            stroke={p.biru ? "var(--accent-ink)" : "var(--bad)"}
            strokeWidth={9}
          />
        ))}
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 12 · gambar — proses terpotong -------------------------------- */
export const ThumbS12: React.FC = () => {
  const sel = 190;
  const x0 = W / 2 - (N_KISI * sel) / 2;
  const y0 = 260;
  return (
    <KartuThumbnail baris={["SEPETAK", "DEMI PETAK"]} rasio="9x16">
      <Pita>
        <Kisi x={x0} y={y0} n={N_KISI} sel={sel} isi={GAMBAR} />
        <rect
          x={x0 + 2 * sel - 12}
          y={y0 + 2 * sel - 12}
          width={sel * 3 + 4}
          height={sel * 3 + 4}
          rx={18}
          fill="var(--accent-soft)"
          stroke="var(--accent-ink)"
          strokeWidth={16}
        />
      </Pita>
    </KartuThumbnail>
  );
};

/* ---------- 13 · urutan — sebelum → sesudah ------------------------------- */
export const ThumbS13: React.FC = () => (
  <KartuThumbnail baris={["URUTAN", "MENGUBAH"]} rasio="9x16">
    <Pita>
      <Fokus cx={435} cy={910} s={1.7}>
        <Potongan x={230} y={760} teks={KALIMAT[2] ?? ""} nyala={1} />
        <Potongan x={640} y={760} teks={KALIMAT[1] ?? ""} />
        <Potongan x={230} y={1060} teks={KALIMAT[0] ?? ""} />
        <Potongan x={640} y={1060} teks={KALIMAT[3] ?? ""} nyala={1} />
        <path
          d="M 300 860 C 420 960 460 960 580 960"
          fill="none"
          stroke="var(--accent-ink)"
          strokeWidth={10}
          strokeLinecap="round"
        />
      </Fokus>
    </Pita>
  </KartuThumbnail>
);

/* ---------- 14 · perhatian — anomali -------------------------------------- */
export const ThumbS14: React.FC = () => {
  const baris = PERHATIAN[3] ?? [];
  return (
    <KartuThumbnail baris={["KATA MANA", "YANG KUAT?"]} rasio="9x16">
      <Pita>
        <Fokus cx={510} cy={880} s={1.65}>
          {KALIMAT.map((_, ke) => {
            if (ke === 3) return null;
            return (
              <GarisPerhatian
                key={ke}
                x1={840}
                y1={860}
                x2={180 + ke * 220}
                y2={860}
                kuat={Math.max(0.08, baris[ke] ?? 0.15)}
              />
            );
          })}
          {KALIMAT.map((k, i) => (
            <Potongan key={k} x={180 + i * 220} y={900} teks={k} nyala={i === 3 ? 1 : 0} />
          ))}
        </Fokus>
      </Pita>
    </KartuThumbnail>
  );
};

/* ---------- 15 · chatgpt — sebelum → sesudah ------------------------------ */
export const ThumbS15: React.FC = () => (
  <KartuThumbnail baris={["DARI SATU", "SIMPUL"]} rasio="9x16">
    <Pita>
      <Fokus cx={620} cy={820} s={1.45}>
        <circle
          cx={simpul(1, 0).x}
          cy={simpul(1, 0).y}
          r={70}
          fill="var(--accent)"
          stroke="var(--accent-ink)"
          strokeWidth={12}
        />
        <Panah x={simpul(1, 0).x + 110} y={simpul(1, 0).y} panjang={190} tebal={14} />
        <g transform="translate(300 100)">
          <BlokTransformer y={simpul(1, 0).y} tampil={1} />
        </g>
      </Fokus>
    </Pita>
  </KartuThumbnail>
);
