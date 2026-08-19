/* Koordinat & benda bersama seluruh Short seri "neural-network" — 9:16.
 *
 * Berkas ini tinggal di `scene-shorts/`, DI LUAR folder scene-nya: `npm run
 * sisa` memeriksa tiap `.tsx` di dalam folder scene terhadap daftar kunci dari
 * naskah, jadi berkas bantu yang tinggal di sana dilaporkan sebagai nama yang
 * tidak dikenal (CLAUDE.md HARD RULE 1).
 *
 * ARAHNYA MEMUTAR 90°. Diagram jaringan baku mengalir kiri → kanan (unggahan
 * § 18 "Basic representation"), tapi di kanvas 1080 x 1920 sisi `x > 920` adalah
 * rail tombol YouTube — dan di situlah jawaban jaringan akan keluar. Jadi
 * lapisannya ditumpuk: masukan di ATAS, jawaban di BAWAH. Perputaran ini berlaku
 * di seluruh Short seri ini; yang tidak boleh cuma satu scene memutar arahnya
 * sendiri (1-cara-belajar-direction.md).
 *
 * SATU SUMBER UNTUK GEOMETRI. Semua koordinat di bawah dipakai enam scene
 * sekaligus. Jaringan yang bergeser satu piksel antar-scene membatalkan seluruh
 * Short — HARD RULE 3 memakai "frame pertama = frame terakhir scene sebelumnya"
 * sebagai janji, dan `npm run jahit` mengukurnya.
 */
import type React from "react";

/** Kanvas Short. Dipakai sebagai viewBox di tiap scene. */
export const W = 1080;
export const H = 1920;

/* --------------------------------------------------------------------------
   Kotak aman 9:16 — x 90–920, y 240–1480 (guidelines/youtube_shorts_safe_zone).
   Angkanya TIDAK diketik lagi di scene mana pun; yang dipakai turunannya di
   bawah ini. Kalau ada benda penting yang jatuh di luar rentang ini, yang
   digeser bendanya — bukan angkanya.
   -------------------------------------------------------------------------- */
export const AMAN = { x1: 90, x2: 920, y1: 240, y2: 1480 } as const;

/** Baris teks layar. Sepertiga atas kotak aman, di atas jaringan.
 *
 *  300, BUKAN 360: pada 360 baris keduanya menyentuh kartu contoh yang turun di
 *  scene 2 — cacat satu detik yang tidak pernah kebetulan terlihat saat
 *  scrubbing, dan justru itu yang dicari `npm run tumpang`. */
export const Y_TEKS = 300;

/* --- jaringan --------------------------------------------------------------

   Tiga lapis, mengikuti diagram unggahan § 18: tiga simpul masukan, tiga simpul
   tengah, satu simpul keluaran. Bukan lebih: di 1080 px, lapisan berisi lima
   simpul membuat sambungannya jadi anyaman yang tidak bisa diikuti mata di
   layar HP — dan yang harus terbaca di sini cuma "ada jalan dari atas ke
   bawah". */

export const Y_LAPIS = [600, 800, 1000] as const;
export const X_SIMPUL = [380, 540, 700] as const;

/** Simpul lapis ke-`l`. Lapis 2 cuma punya satu simpul, di tengah. */
export const simpul = (l: number, i: number): { x: number; y: number } => ({
  x: l === 2 ? W / 2 : (X_SIMPUL[i] ?? W / 2),
  y: Y_LAPIS[l] ?? Y_LAPIS[0],
});

export const JUMLAH_SIMPUL = [3, 3, 1] as const;

/** Semua sambungan, urut: lapis 0→1 (sembilan), lalu 1→2 (tiga).
 *
 *  Daftarnya dibangun sekali di lingkup modul, bukan dihitung ulang tiap frame —
 *  dan urutannya STABIL, karena scene 3 menunjuk sambungan yang berubah dengan
 *  INDEKS. Indeks yang bergeser berarti sambungan lain yang menebal, tanpa satu
 *  pun tanda di layar. */
export const SAMBUNGAN: readonly {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}[] = [
  ...Array.from({ length: 3 }, (_, a) =>
    Array.from({ length: 3 }, (_, b) => ({
      x1: simpul(0, a).x,
      y1: simpul(0, a).y,
      x2: simpul(1, b).x,
      y2: simpul(1, b).y,
    })),
  ).flat(),
  ...Array.from({ length: 3 }, (_, a) => ({
    x1: simpul(1, a).x,
    y1: simpul(1, a).y,
    x2: simpul(2, 0).x,
    y2: simpul(2, 0).y,
  })),
];

/** Tiga sambungan yang digeser di scene 3 — DIPILIH, bukan diacak.
 *
 *  Ketiganya sambungan lapis pertama yang tidak berada di tepi kanan: sambungan
 *  yang bergeser di balik rail tombol adalah tahap yang hilang tanpa penonton
 *  tahu ada yang hilang (3-tebak-cek-geser-direction.md § Kotak aman). */
export const DIGESER = [0, 4, 6] as const;

/** Di mana denyut berada saat scene 3 dipotong — dan dari mana scene 4
 *  melanjutkannya. Angkanya tinggal di sini, bukan diekspor dari berkas scene:
 *  konstanta bersama yang tinggal di salah satu scene memaksa scene lain
 *  mengimpor dari berkas scene, dan angka yang dipakai dua scene cuma boleh ada
 *  di SATU tempat (HARD RULE 3 — jahitan diukur dari angka ini). */
export const U_SAMBUNG = 0.45;

/** Seberapa jauh denyut sudah turun, 0..1 → posisi y di sepanjang jaringan. */
export const yDenyut = (u: number): number =>
  Y_LAPIS[0] + (Y_LAPIS[2] - Y_LAPIS[0]) * u;

/** Nyala satu simpul saat denyut melewatinya — fungsi murni dari POSISI denyut,
 *  bukan dari detik. Begitu satu kalimat VO berubah dan seluruh timing bergeser,
 *  nyalanya ikut sendiri tanpa satu angka pun disunting. */
export const nyalaLapis =
  (y: number) =>
  (l: number): number =>
    Math.max(0, 1 - Math.abs(y - (Y_LAPIS[l] ?? -1e9)) / 150);

export const Jaringan: React.FC<{
  /** Nyala per lapis, 0..1. Baku: gelap semua. */
  nyala?: (l: number) => number;
  /** Tebal tiap sambungan, 0..1 relatif terhadap tebal baku. Baku: semua 1. */
  tebal?: (i: number) => number;
  /** Opasitas tiap sambungan — dipakai scene 1, tempat jaringannya TUMBUH. */
  tampilSambungan?: (i: number) => number;
  /** Opasitas tiap simpul, per lapis. */
  tampilSimpul?: (l: number) => number;
  opacity?: number;
  /** Simpul keluaran disorot — dipakai scene 6. */
  sorot?: boolean;
}> = ({ nyala, tebal, tampilSambungan, tampilSimpul, opacity = 1, sorot = false }) => (
  <g opacity={opacity} aria-hidden>
    {/* Warnanya --ink-2, BUKAN --line: pada #1E293B di atas #0B1020 sambungannya
        praktis hilang di layar HP, dan jaringan tanpa sambungan yang terlihat
        berhenti terbaca sebagai jaringan. Opasitas 0,55 yang mengembalikan
        kesan "redup" tanpa membuatnya lenyap. */}
    {SAMBUNGAN.map((s, i) => (
      <line
        key={`${s.x1}-${s.y1}-${s.x2}-${s.y2}`}
        x1={s.x1}
        y1={s.y1}
        x2={s.x2}
        y2={s.y2}
        stroke="var(--ink-2)"
        strokeWidth={5 * (tebal ? tebal(i) : 1)}
        opacity={(tampilSambungan ? tampilSambungan(i) : 1) * 0.55}
        strokeLinecap="round"
      />
    ))}

    {Y_LAPIS.map((_, l) =>
      Array.from({ length: JUMLAH_SIMPUL[l] ?? 1 }, (_, i) => {
        const p = simpul(l, i);
        const n = nyala ? nyala(l) : 0;
        const iniSorot = sorot && l === 2;
        return (
          <g key={`${l}-${i}`} opacity={tampilSimpul ? tampilSimpul(l) : 1}>
            <circle
              cx={p.x}
              cy={p.y}
              r={34 + 26 * n}
              fill="var(--accent-ink)"
              opacity={0.3 * n}
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={34}
              fill={n > 0.5 || iniSorot ? "var(--accent)" : "var(--bg-elev)"}
              stroke={n > 0.5 || iniSorot ? "var(--accent-ink)" : "var(--ink-2)"}
              strokeWidth={5}
            />
          </g>
        );
      }),
    )}
  </g>
);

/** Denyut yang turun melewati jaringan. Satu titik, bukan partikel — unggahan
 *  § 18 "Signal: moving dot". */
export const Denyut: React.FC<{ y: number; opacity?: number }> = ({
  y,
  opacity = 1,
}) => (
  <g opacity={opacity} aria-hidden>
    <circle cx={W / 2} cy={y} r={40} fill="var(--accent-soft)" />
    <circle cx={W / 2} cy={y} r={16} fill="var(--accent-ink)" />
  </g>
);

/* --- kartu jawaban ---------------------------------------------------------

   DUA kartu, ditumpuk tegak di tengah — bukan berdampingan kiri-kanan. Kartu
   kanan jatuh di balik rail tombol, dan yang hilang di situ justru kartu yang
   membuat scene 2 berarti.

   Kartu "seharusnya" DIPATOK di Y_HARUS; kartu jawaban yang bergerak, dan
   jaraknya = seberapa meleset. Itu membuat "belajar" jadi satu benda yang bisa
   dilihat mengecil, bukan kata di layar. */

export const Y_HARUS = 1400;
export const JARAK_PENUH = 250;

/** Jarak terdekat dua kartu — tinggi kartunya (112) + 33 px napas.
 *
 *  Tanpa lantai ini, meleset 0,18 di putaran ketiga scene 4 menaruh kartu
 *  jawaban TEPAT di atas kartu "seharusnya": dua kartu yang saling menutupi,
 *  yang terbaca sebagai cacat render, bukan sebagai tebakan yang makin dekat. */
export const JARAK_MIN = 145;

/** Posisi tegak kartu jawaban untuk sebuah nilai meleset 0..1. */
export const yJawab = (meleset: number): number =>
  Y_HARUS - (JARAK_MIN + (JARAK_PENUH - JARAK_MIN) * meleset);

export const Kartu: React.FC<{
  x?: number;
  y: number;
  teks: string;
  warna?: "salah" | "benar" | "redup";
  opacity?: number;
  skala?: number;
  /** Lebar kartu. Dilebarkan HANYA untuk kartu "seharusnya", yang labelnya
   *  panjang — 620 masih di dalam kotak aman (230..850). */
  lebar?: number;
  ukuran?: number;
  /** Kapsi kecil di atas kartu — dipakai kartu "seharusnya".
   *
   *  Labelnya ditaruh DI ATAS, bukan di dalam kartu: "SEHARUSNYA · KUCING" di
   *  dalam satu kartu memaksa kartunya selebar 620 px, dan kartu selebar itu
   *  menabrak batang meleset di x 782. */
  atas?: string;
}> = ({
  x = W / 2,
  y,
  teks,
  warna = "redup",
  opacity = 1,
  skala = 1,
  lebar = 400,
  ukuran = 54,
  atas,
}) => {
  const garis =
    warna === "salah" ? "var(--bad)" : warna === "benar" ? "var(--ok)" : "var(--ink-2)";
  const isi =
    warna === "salah"
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
        y={y - 56}
        width={lebar}
        height={112}
        rx={16}
        fill={isi}
        stroke={garis}
        strokeWidth={5}
      />
      {atas && (
        <text
          x={x}
          y={y - 74}
          fontSize={32}
          fontFamily="var(--font-display)"
          fontWeight={800}
          fill="var(--ink-2)"
          textAnchor="middle"
          letterSpacing={2}
        >
          {atas}
        </text>
      )}
      <text
        x={x}
        y={y + 18}
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

/** Kucing — digambar, bukan difoto dan bukan emoji.
 *
 *  Ia satu-satunya benda di Short ini yang bukan diagram, dan itu tugasnya:
 *  memberi jaringan sesuatu yang nyata untuk ditebak. */
export const Kucing: React.FC<{ x?: number; y: number; skala?: number; opacity?: number }> = ({
  x = W / 2,
  y,
  skala = 1,
  opacity = 1,
}) => (
  <g
    opacity={opacity}
    transform={`translate(${x} ${y}) scale(${skala}) translate(${-x} ${-y})`}
    aria-hidden
  >
    <rect
      x={x - 110}
      y={y - 110}
      width={220}
      height={220}
      rx={20}
      fill="var(--bg-elev)"
      stroke="var(--ink-2)"
      strokeWidth={5}
    />
    {/* telinga */}
    <path
      d={`M ${x - 62} ${y - 40} L ${x - 50} ${y - 92} L ${x - 12} ${y - 56} Z`}
      fill="var(--ink-1)"
    />
    <path
      d={`M ${x + 62} ${y - 40} L ${x + 50} ${y - 92} L ${x + 12} ${y - 56} Z`}
      fill="var(--ink-1)"
    />
    <circle cx={x} cy={y - 4} r={54} fill="var(--ink-1)" />
    <circle cx={x - 20} cy={y - 14} r={7} fill="var(--bg)" />
    <circle cx={x + 20} cy={y - 14} r={7} fill="var(--bg)" />
    <path
      d={`M ${x - 4} ${y + 6} L ${x + 4} ${y + 6} L ${x} ${y + 14} Z`}
      fill="var(--bg)"
    />
    {/* kumis */}
    {[-1, 1].map((s) => (
      <g key={s}>
        <line
          x1={x + s * 26}
          y1={y + 8}
          x2={x + s * 74}
          y2={y - 2}
          stroke="var(--bg)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <line
          x1={x + s * 26}
          y1={y + 16}
          x2={x + s * 74}
          y2={y + 22}
          stroke="var(--bg)"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>
    ))}
  </g>
);

/** Batang "seberapa meleset" — satu-satunya benda di Short ini yang bisa
 *  MEMENDEK, dan memendeknya di scene 4 adalah satu-satunya bukti bahwa
 *  jaringannya belajar (3-tebak-cek-geser-direction.md).
 *
 *  Ditaruh di kanan kedua kartu, tapi tetap di dalam kotak aman: `x` 780 + lebar
 *  label masih di bawah 920. */
export const BatangMeleset: React.FC<{
  meleset: number;
  opacity?: number;
  label?: string;
}> = ({ meleset, opacity = 1, label = "MELESET" }) => {
  const yAtas = yJawab(meleset);
  const x = 782;
  return (
    <g opacity={opacity} aria-hidden>
      <line
        x1={x}
        y1={yAtas}
        x2={x}
        y2={Y_HARUS}
        stroke="var(--bad)"
        strokeWidth={10}
        strokeLinecap="round"
      />
      {[yAtas, Y_HARUS].map((y) => (
        <line
          key={y}
          x1={x - 26}
          y1={y}
          x2={x + 26}
          y2={y}
          stroke="var(--bad)"
          strokeWidth={8}
          strokeLinecap="round"
        />
      ))}
      {/* Anchor END, di KIRI batangnya. Ditaruh di kanan, label 30px ini
          berujung di x 954 — di balik rail tombol, dan yang hilang di situ
          justru nama dari benda yang paling penting di Short ini.

          Labelnya hilang sendiri begitu batangnya pendek: di scene 4 ia sudah
          diperkenalkan scene 3, dan teks yang menempel pada batang sependek itu
          cuma jadi benda yang saling menutupi. */}
      {meleset > 0.25 && label !== "" && (
        <text
          x={x - 46}
          y={(yAtas + Y_HARUS) / 2 + 10}
          fontSize={30}
          fontFamily="var(--font-display)"
          fontWeight={800}
          fill="var(--bad)"
          textAnchor="end"
        >
          {label}
        </text>
      )}
    </g>
  );
};

/** Teks di layar — WAJIB di Shorts, karena mayoritas penonton menonton tanpa
 *  suara (docs/02 § Aturan Shorts). Padanan RINGKAS kalimat VO-nya, bukan
 *  transkripnya: teks yang menyalin VO kata per kata dilarang unggahan § 16.
 *
 *  Jarak antarbaris 1,34x — sama dengan Short topik lain di repo ini; pada 1,18
 *  kotak glif dua baris saling mengiris dan `npm run tumpang` melaporkannya. */
export const TeksLayar: React.FC<{
  baris: readonly string[];
  y?: number;
  opacity?: number;
  transform?: string;
  warna?: string;
  ukuran?: number;
}> = ({ baris, y = Y_TEKS, opacity = 1, transform, warna = "var(--ink-0)", ukuran = 62 }) => (
  <g style={{ opacity, transform }} aria-hidden>
    {baris.map((b, i) => (
      <text
        key={b}
        x={W / 2}
        y={y + i * (ukuran * 1.34)}
        fontSize={ukuran}
        fontFamily="var(--font-display)"
        fontWeight={800}
        fill={warna}
        textAnchor="middle"
      >
        {b}
      </text>
    ))}
  </g>
);

/** Label satu tahap gelung — TEBAK / MELESET / GESER. Dipakai scene 3 dan 4,
 *  dan bentuknya harus sama di keduanya: label yang berubah rupa saat gelungnya
 *  mulai berputar terbaca sebagai benda lain. */
export const LabelTahap: React.FC<{
  x: number;
  y: number;
  teks: string;
  nyala: number;
}> = ({ x, y, teks, nyala }) => (
  <g aria-hidden>
    <rect
      x={x - 130}
      y={y - 38}
      width={260}
      height={76}
      rx={38}
      fill={nyala > 0.5 ? "var(--accent-soft)" : "transparent"}
      stroke={nyala > 0.5 ? "var(--accent-ink)" : "var(--line)"}
      strokeWidth={4}
    />
    <text
      x={x}
      y={y + 14}
      fontSize={38}
      fontFamily="var(--font-display)"
      fontWeight={800}
      fill={nyala > 0.5 ? "var(--ink-0)" : "var(--ink-2)"}
      textAnchor="middle"
    >
      {teks}
    </text>
  </g>
);

/** Kamera 9:16. Bukan kamera sungguhan — `scale` di sekitar satu titik, murni
 *  fungsi frame (CLAUDE.md § Deterministik). Titik tumpunya ditulis di sini
 *  supaya tidak ada scene yang mendorong dari titik yang berbeda dan membuat
 *  jahitan antar-scene melompat. */
export const kamera = (skala: number, cx = W / 2, cy = 980): string =>
  `translate(${cx} ${cy}) scale(${skala}) translate(${-cx} ${-cy})`;

/* --- tata letak "gelung" (scene 4 → 6) --------------------------------------

   Mulai scene 4, jaringan MENGECIL dan BERGESER KE KANAN untuk memberi tempat
   kolom tiga tahap di kiri. Angkanya tinggal di sini, bukan di salah satu
   berkas scene: scene 5 dan 6 membuka dengan frame terakhir scene 4 (HARD RULE
   3), jadi ketiganya harus memakai transform yang sama persis. Satu angka yang
   berbeda di antara ketiganya = kedipan yang tidak bisa ditunjuk penonton.

   KENAPA DIGESER, BUKAN DILINGKARI. Gelung tiga tahap yang benar-benar
   melingkari jaringan menaruh salah satu labelnya di `x > 920` — di balik rail
   tombol YouTube. Yang dikorbankan kalau tetap dipaksa bukan estetika,
   melainkan satu dari tiga tahap yang jadi isi Short ini. */

export const GESER_X = 110;
export const SKALA_GELUNG = 0.85;

/** Titik tumpu kamera — sama untuk `kamera()` dan `titikGelung()`. */
export const CY_KAMERA = 980;

export const petaGelung = (s = SKALA_GELUNG, dx = GESER_X): string =>
  `translate(${dx} 0) ${kamera(s, W / 2, CY_KAMERA)}`;

/** Ke mana sebuah titik jaringan pindah setelah `petaGelung`. Dipakai scene 6
 *  untuk mendorong kamera tepat ke simpul keluaran — kalau titiknya dihitung
 *  ulang dengan tangan di sana, dorongannya meleset dari simpulnya. */
export const titikGelung = (
  x: number,
  y: number,
  s = SKALA_GELUNG,
  dx = GESER_X,
): { x: number; y: number } => ({
  x: W / 2 + (x - W / 2) * s + dx,
  y: CY_KAMERA + (y - CY_KAMERA) * s,
});

/** Kolom tiga tahap di kiri, dan panah yang menyambungkannya kembali ke atas.
 *  Itulah "gelung"-nya: yang membuatnya terbaca berputar bukan bentuk lingkaran,
 *  melainkan panah yang pulang ke tahap pertama. */
export const X_TAHAP = 225;
export const Y_TAHAP = [620, 820, 1020] as const;
export const TAHAP = ["TEBAK", "MELESET", "GESER"] as const;

/** Rantai empat kata scene 5 — dan scene 6 membuka dengan rantai yang sama
 *  persis (HARD RULE 3). Koordinatnya tinggal di sini karena dipakai dua scene;
 *  disalin ke keduanya, ia akan berbeda dalam seminggu.
 *
 *  DUA BARIS, bukan satu baris mendatar: empat label berjajar butuh ±1000 px
 *  sementara kotak amannya 830. Yang dikecilkan tata letaknya, bukan hurufnya. */
export const RANTAI_INTI = [
  { teks: "TEBAK", x: 330, y: 800 },
  { teks: "MELESET", x: 750, y: 800 },
  { teks: "GESER", x: 330, y: 1040 },
  { teks: "BELAJAR", x: 750, y: 1040 },
] as const;

export const PanahPulang: React.FC<{ opacity?: number; nyala?: number }> = ({
  opacity = 1,
  nyala = 0,
}) => {
  const warna = nyala > 0.5 ? "var(--accent-ink)" : "var(--ink-2)";
  return (
    <g opacity={opacity} aria-hidden>
      <path
        d={`M ${X_TAHAP - 130} ${Y_TAHAP[2]} C 95 ${Y_TAHAP[2]} 95 ${Y_TAHAP[0]} ${X_TAHAP - 118} ${Y_TAHAP[0]}`}
        fill="none"
        stroke={warna}
        strokeWidth={6}
        strokeLinecap="round"
      />
      {/* Kepala panahnya yang membuat kolom ini terbaca BERPUTAR, bukan sebagai
          tiga label yang kebetulan bertumpuk. */}
      <path
        d={`M ${X_TAHAP - 130} ${Y_TAHAP[0] - 14} L ${X_TAHAP - 104} ${Y_TAHAP[0]} L ${X_TAHAP - 130} ${Y_TAHAP[0] + 14} Z`}
        fill={warna}
      />
    </g>
  );
};
