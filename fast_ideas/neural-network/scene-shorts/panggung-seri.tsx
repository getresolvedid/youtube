/* Kosakata visual bersama SELURUH seri — 9:16.
 *
 * Peta 15 episode § Remotion implementation menamai komponen yang ia harapkan:
 * `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`,
 * `Comparison`, `FeatureMap`, `Token`, `AttentionLink`. Empat yang pertama sudah
 * ada di `panggung-nn.tsx` (Jaringan, simpul, SAMBUNGAN, Denyut, LabelTahap);
 * sisanya di sini.
 *
 * KENAPA SATU BERKAS UNTUK LIMA BELAS EPISODE. Peta § Global direction menuntut
 * "consistent visual vocabulary across the series". Kosakata yang disalin per
 * episode akan berbeda dalam seminggu — dan penonton yang menonton dua episode
 * berturut-turut adalah orang yang paling cepat merasakannya.
 *
 * Berkas ini tinggal di `scene-shorts/`, DI LUAR folder scene (HARD RULE 1).
 */
import type React from "react";

import { W } from "./panggung-nn";

/* --- kapsul & label --------------------------------------------------------- */

/** Kapsul berisi satu angka atau satu kata. Bentuk yang sama dipakai untuk nilai
 *  masukan, skor kesalahan, dan potongan kata — yang membedakan cuma warnanya. */
export const Pil: React.FC<{
  x: number;
  y: number;
  teks: string;
  warna?: "biasa" | "aksen" | "salah" | "benar" | "ingat";
  lebar?: number;
  ukuran?: number;
  opacity?: number;
  skala?: number;
}> = ({ x, y, teks, warna = "biasa", lebar = 240, ukuran = 44, opacity = 1, skala = 1 }) => {
  const garis =
    warna === "aksen"
      ? "var(--accent-ink)"
      : warna === "salah"
        ? "var(--bad)"
        : warna === "benar"
          ? "var(--ok)"
          : warna === "ingat"
            ? "var(--warn)"
            : "var(--ink-2)";
  const isi =
    warna === "aksen"
      ? "var(--accent-soft)"
      : warna === "salah"
        ? "var(--bad-soft)"
        : warna === "benar"
          ? "var(--ok-soft)"
          : "var(--bg-elev)";
  return (
    <g
      opacity={opacity}
      transform={`translate(${x} ${y}) scale(${skala}) translate(${-x} ${-y})`}
      aria-hidden
    >
      <rect
        x={x - lebar / 2}
        y={y - 40}
        width={lebar}
        height={80}
        rx={40}
        fill={isi}
        stroke={garis}
        strokeWidth={5}
      />
      <text
        x={x}
        y={y + 14}
        fontSize={ukuran}
        fontFamily="var(--font-display)"
        fontWeight={800}
        fill="var(--ink-0)"
        textAnchor="middle"
      >
        {teks}
      </text>
    </g>
  );
};

/* --- panah ------------------------------------------------------------------ */

/** Panah lurus dengan kepala. `arah` dalam derajat: 0 = ke kanan, 90 = ke bawah.
 *  Dipakai untuk aliran maju, aliran mundur, dan penunjuk arah perubahan. */
export const Panah: React.FC<{
  x: number;
  y: number;
  panjang: number;
  arah?: number;
  warna?: string;
  tebal?: number;
  opacity?: number;
}> = ({ x, y, panjang, arah = 0, warna = "var(--ink-2)", tebal = 7, opacity = 1 }) => {
  const a = (arah * Math.PI) / 180;
  const dx = Math.cos(a) * panjang;
  const dy = Math.sin(a) * panjang;
  return (
    <g opacity={opacity} aria-hidden>
      <line
        x1={x}
        y1={y}
        x2={x + dx * 0.86}
        y2={y + dy * 0.86}
        stroke={warna}
        strokeWidth={tebal}
        strokeLinecap="round"
      />
      <g transform={`translate(${x + dx} ${y + dy}) rotate(${arah})`}>
        <path d="M -22 -16 L 10 0 L -22 16 Z" fill={warna} />
      </g>
    </g>
  );
};

/* --- perbandingan ----------------------------------------------------------- */

/** Dua kartu bertumpuk tegak + selisih di antaranya. Bentuk yang sama dipakai
 *  Episode 01 (tebakan vs seharusnya) dan Episode 07 (tebakan vs sasaran) —
 *  karena keduanya memang benda yang sama, dilihat dari dua episode. */
export const Perbandingan: React.FC<{
  yAtas: number;
  yBawah: number;
  atas: string;
  bawah: string;
  labelAtas?: string;
  labelBawah?: string;
  selisih?: number;
  opacity?: number;
}> = ({ yAtas, yBawah, atas, bawah, labelAtas, labelBawah, selisih = 0, opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    {labelAtas && (
      <text
        x={W / 2}
        y={yAtas - 62}
        fontSize={30}
        fontFamily="var(--font-display)"
        fontWeight={800}
        fill="var(--ink-2)"
        textAnchor="middle"
        letterSpacing={2}
      >
        {labelAtas}
      </text>
    )}
    <Pil x={W / 2} y={yAtas} teks={atas} warna="salah" lebar={320} ukuran={48} />
    {labelBawah && (
      <text
        x={W / 2}
        y={yBawah - 62}
        fontSize={30}
        fontFamily="var(--font-display)"
        fontWeight={800}
        fill="var(--ink-2)"
        textAnchor="middle"
        letterSpacing={2}
      >
        {labelBawah}
      </text>
    )}
    <Pil x={W / 2} y={yBawah} teks={bawah} warna="benar" lebar={320} ukuran={48} />

    {selisih > 0 && (
      <g>
        <line
          x1={782}
          y1={yAtas}
          x2={782}
          y2={yBawah}
          stroke="var(--bad)"
          strokeWidth={10}
          strokeLinecap="round"
          opacity={selisih}
        />
        {[yAtas, yBawah].map((y) => (
          <line
            key={y}
            x1={756}
            y1={y}
            x2={808}
            y2={y}
            stroke="var(--bad)"
            strokeWidth={8}
            strokeLinecap="round"
            opacity={selisih}
          />
        ))}
      </g>
    )}
  </g>
);

/* --- meter ------------------------------------------------------------------ */

/** Meter mendatar 0..1 — dipakai Episode 07 untuk skor kesalahan.
 *  Angkanya dicetak di kanan meter, tetap di dalam kotak aman. */
export const Meter: React.FC<{
  y: number;
  nilai: number;
  label?: string;
  opacity?: number;
}> = ({ y, nilai, label, opacity = 1 }) => {
  const x1 = 180;
  const x2 = 760;
  return (
    <g opacity={opacity} aria-hidden>
      <rect x={x1} y={y - 26} width={x2 - x1} height={52} rx={26} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={4} />
      <rect
        x={x1 + 4}
        y={y - 22}
        width={Math.max(0, (x2 - x1 - 8) * Math.min(1, Math.max(0, nilai)))}
        height={44}
        rx={22}
        fill="var(--bad)"
        opacity={0.85}
      />
      {label && (
        <text
          x={x1}
          y={y - 52}
          fontSize={30}
          fontFamily="var(--font-display)"
          fontWeight={800}
          fill="var(--ink-2)"
          letterSpacing={2}
        >
          {label}
        </text>
      )}
      <text
        x={x2 + 24}
        y={y + 14}
        fontSize={40}
        fontFamily="var(--font-mono)"
        fontWeight={700}
        fill="var(--bad)"
        textAnchor="start"
      >
        {nilai.toFixed(2).replace(".", ",")}
      </text>
    </g>
  );
};

/* --- kisi & peta ciri ------------------------------------------------------- */

/** Kisi titik — gambar mentah di Episode 12. `isi(i,j)` mengembalikan 0..1. */
export const Kisi: React.FC<{
  x: number;
  y: number;
  n: number;
  sel: number;
  isi: (i: number, j: number) => number;
  warna?: string;
  opacity?: number;
}> = ({ x, y, n, sel, isi, warna = "var(--ink-1)", opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    {Array.from({ length: n }, (_, j) =>
      Array.from({ length: n }, (_, i) => (
        <rect
          key={`${i}-${j}`}
          x={x + i * sel}
          y={y + j * sel}
          width={sel - 4}
          height={sel - 4}
          rx={4}
          fill={warna}
          opacity={0.12 + 0.88 * isi(i, j)}
        />
      )),
    )}
  </g>
);

/* --- potongan kata & perhatian ---------------------------------------------- */

/** Satu potongan kata. Episode 13–15. */
export const Potongan: React.FC<{
  x: number;
  y: number;
  teks: string;
  nyala?: number;
  opacity?: number;
}> = ({ x, y, teks, nyala = 0, opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <rect
      x={x - 92}
      y={y - 38}
      width={184}
      height={76}
      rx={14}
      fill={nyala > 0.5 ? "var(--accent-soft)" : "var(--bg-elev)"}
      stroke={nyala > 0.5 ? "var(--accent-ink)" : "var(--ink-2)"}
      strokeWidth={4}
    />
    <text
      x={x}
      y={y + 13}
      fontSize={38}
      fontFamily="var(--font-display)"
      fontWeight={800}
      fill={nyala > 0.5 ? "var(--ink-0)" : "var(--ink-1)"}
      textAnchor="middle"
    >
      {teks}
    </text>
  </g>
);

/** Garis perhatian antar-potongan. Tebal dan terangnya = besar perhatiannya —
 *  itulah seluruh isi Episode 14, jadi keduanya harus ikut satu angka. */
export const GarisPerhatian: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kuat: number;
  opacity?: number;
}> = ({ x1, y1, x2, y2, kuat, opacity = 1 }) => (
  <path
    d={`M ${x1} ${y1} C ${x1} ${y1 - 120} ${x2} ${y2 - 120} ${x2} ${y2}`}
    fill="none"
    stroke="var(--accent-ink)"
    strokeWidth={2 + 12 * kuat}
    strokeLinecap="round"
    opacity={opacity * (0.15 + 0.85 * kuat)}
    aria-hidden
  />
);

/* --- sumbu & kurva ---------------------------------------------------------

   Dipakai Episode 03 (garis bilangan yang digeser bias) dan Episode 04 (garis
   lurus vs garis yang dilengkungkan aktivasi). Keduanya benda yang sama dilihat
   dari dua episode, jadi keduanya lahir dari satu pasang komponen. */

export const Sumbu: React.FC<{
  x: number;
  y: number;
  lebar: number;
  tinggi: number;
  opacity?: number;
}> = ({ x, y, lebar, tinggi, opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <line x1={x} y1={y} x2={x + lebar} y2={y} stroke="var(--ink-2)" strokeWidth={5} strokeLinecap="round" />
    <line x1={x + lebar / 2} y1={y - tinggi / 2} x2={x + lebar / 2} y2={y + tinggi / 2} stroke="var(--ink-2)" strokeWidth={5} strokeLinecap="round" />
  </g>
);

/** Kurva dari sebuah fungsi murni f(u) dengan u ∈ [-1, 1] dan hasil ∈ [-1, 1].
 *  Disampel 48 titik — cukup mulus di 1080 px, murah dihitung tiap frame. */
export const jalurKurva = (
  f: (u: number) => number,
  x: number,
  y: number,
  lebar: number,
  tinggi: number,
): string => {
  let d = "";
  for (let i = 0; i <= 48; i += 1) {
    const u = -1 + (2 * i) / 48;
    const px = x + lebar / 2 + (u * lebar) / 2;
    const py = y - (Math.max(-1, Math.min(1, f(u))) * tinggi) / 2;
    d += `${i === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)} `;
  }
  return d.trim();
};

export const Kurva: React.FC<{
  d: string;
  warna?: string;
  tebal?: number;
  opacity?: number;
}> = ({ d, warna = "var(--accent-ink)", tebal = 8, opacity = 1 }) => (
  <path d={d} fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" opacity={opacity} aria-hidden />
);

/** Lengkungan aktivasi baku seri ini — bentuk S, dipakai Episode 03 (bayangan
 *  di gantungan) dan Episode 04 (isi pokoknya). Satu bentuk untuk dua episode:
 *  kalau berbeda, penonton membacanya sebagai dua benda. */
export const AKTIVASI = (u: number): number => Math.tanh(u * 2.2);

/** Kotak grafik seri — dipakai seluruh Short 4 (dan Short 11 untuk batas
 *  pemisah). Angkanya tinggal di sini, bukan diekspor dari berkas scene:
 *  konstanta bersama yang tinggal di salah satu scene memaksa scene lain
 *  mengimpor dari berkas scene, dan angka yang dipakai empat scene cuma boleh
 *  ada di SATU tempat (HARD RULE 3 — jahitan diukur dari angka ini). */
export const GRAFIK = { x: 180, y: 950, lebar: 720, tinggi: 520 } as const;

/** Garis lurus baku Short 4 — hasil simpul yang cuma menjumlah. */
export const D_LURUS = jalurKurva(
  (u) => u * 0.8,
  GRAFIK.x,
  GRAFIK.y,
  GRAFIK.lebar,
  GRAFIK.tinggi,
);

/** Lengkungan aktivasi di kotak grafik yang sama. */
export const D_LENGKUNG = jalurKurva(
  AKTIVASI,
  GRAFIK.x,
  GRAFIK.y,
  GRAFIK.lebar,
  GRAFIK.tinggi,
);

/** Tiga angka masukan seri ini. Nilainya sama dengan `MASUK` di panggung-neuron
 *  karena masukannya memang benda yang sama, dilihat dari episode lain — dan
 *  angka yang berbeda antar-episode membuat penonton mengira ia benda lain. */
export const MASUKAN = ["0,9", "0,2", "0,5"] as const;

/** Andil tiap sambungan pada kesalahan — Episode 08. DITULIS, tidak diacak:
 *  `Math.random()` menghasilkan gambar berbeda tiap frame saat render paralel
 *  (CLAUDE.md § Deterministik).
 *
 *  Nilainya berbeda-beda dengan sengaja. Kalau semua sama, yang terbaca
 *  "semuanya salah" — padahal isi Episode 08 justru bahwa andilnya tidak sama.
 *  Panjang panah dan terang sambungan sama-sama dihitung dari angka ini, bukan
 *  dari dua nilai terpisah yang kebetulan mirip. */
export const ANDIL: readonly number[] = [
  0.85, 0.2, 0.45, 0.1, 0.7, 0.3, 0.55, 0.15, 0.35, 0.9, 0.25, 0.6,
];

/** Empat tahap gelung latihan, tersusun melingkar. Dipakai DUA episode: sebagai
 *  gantungan di akhir Episode 09, dan sebagai isi pokok Episode 10.
 *
 *  Koordinatnya di sini, bukan di salah satu berkas scene: gantungan yang
 *  bentuknya berbeda dari episode yang dijanjikannya membuat penonton mengira
 *  ia benda lain — dan itu persis yang dijaga peta § Series Continuity. */
export const GELUNG = [
  { teks: "TEBAK", x: 300, y: 760 },
  { teks: "UKUR", x: 740, y: 760 },
  { teks: "MUNDUR", x: 740, y: 1080 },
  { teks: "SETEL", x: 300, y: 1080 },
] as const;

/* --- gambar & penyaring (Episode 12) ---------------------------------------

   Isi kisi adalah FUNGSI MURNI dari posisi, bukan angka acak: `Math.random()`
   menghasilkan gambar berbeda tiap frame saat render paralel (CLAUDE.md
   § Deterministik). Ketiga hasil penyaring diturunkan dari gambar yang SAMA —
   kalau gambarnya juga beda, yang terbaca "tiga gambar", bukan "tiga
   penyaring". */

export const N_KISI = 8;

/** Gambar mentah: sesuatu yang bulat di tengah, seperti kepala. */
export const GAMBAR = (i: number, j: number): number => {
  const r = Math.hypot(i - 3.5, j - 3.5);
  return Math.max(0, Math.min(1, 1.15 - r / 3.2));
};

/** Tiga penyaring: tepi tegak, tepi mendatar, dan pusat terang. */
export const PENYARING: readonly ((i: number, j: number) => number)[] = [
  (i, j) => Math.min(1, Math.abs(GAMBAR(i + 1, j) - GAMBAR(i - 1, j)) * 2.4),
  (i, j) => Math.min(1, Math.abs(GAMBAR(i, j + 1) - GAMBAR(i, j - 1)) * 2.4),
  (i, j) => Math.max(0, GAMBAR(i, j) - 0.45) * 1.8,
];

export const NAMA_PENYARING = ["TEPI TEGAK", "TEPI DATAR", "PUSAT"] as const;

/* --- kalimat contoh (Episode 13–15) ----------------------------------------

   SATU kalimat untuk tiga episode. Tiga episode yang memakai kalimat berbeda
   terbaca sebagai tiga contoh, bukan sebagai satu benda yang dilihat dari tiga
   sudut — dan itu persis yang dijaga peta § Series Continuity.

   Empat potongan adalah batasnya: lima sudah tidak muat di kotak aman pada
   ukuran yang masih terbaca di layar HP. */
export const KALIMAT = ["DIA", "MAKAN", "NASI", "GORENG"] as const;
export const X_KATA: readonly number[] = [180, 400, 620, 840];
export const Y_KATA = 900;

/** Besar perhatian dari potongan ke-`dari` ke potongan ke-`ke`.
 *
 *  DITULIS sebagai tabel, bukan diacak, dan isinya masuk akal untuk kalimatnya:
 *  "GORENG" paling memperhatikan "NASI", "MAKAN" paling memperhatikan "DIA".
 *  Perhatian yang acak akan terbaca sebagai hiasan — dan Episode 14 seluruhnya
 *  berdiri di atas klaim bahwa angkanya berarti. */
export const PERHATIAN: readonly (readonly number[])[] = [
  [0.1, 0.2, 0.1, 0.1],
  [0.85, 0.1, 0.35, 0.1],
  [0.3, 0.7, 0.1, 0.2],
  [0.15, 0.3, 0.9, 0.1],
];
