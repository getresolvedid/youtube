/* Panggung bersama seluruh episode T14 — loket, tangganya, dan benda-benda yang
   berpindah di antaranya.

   SEMBILAN scene memakai ruang yang sama, dan itu gagasan utamanya, bukan
   kebetulan: scene 5 mendirikan satu loket, scene 6 memperlihatkan bahwa ia
   cuma anak tangga terbawah, scene 7 menempelkan catatan di tiap anak tangga,
   scene 8 merusak catatan itu, scene 9 membuka lacinya, dan scene 12 mundur ke
   tangga yang sama untuk terakhir kalinya. Supaya potongan keras di antaranya
   terbaca sebagai "ruangan yang sama, kelanjutan yang sama" dan bukan sebagai
   "layar berganti", loket-loketnya harus menempati piksel yang sama persis.

   Karena itu koordinatnya tinggal di sini, bukan diketik ulang di tiap scene.
   Dua salinan angka yang wajib sama adalah dua angka yang akan berbeda dalam
   seminggu — dan melesetnya tidak akan terlihat sebagai error, cuma sebagai
   loket yang bergeser sedikit saat scene berganti.

   ARAH TANGGANYA MENGIKAT: bawah = kamu, atas = pemilik situs.
   VO memakai kata "naik" berkali-kali (`07-dicatat`), jadi pertanyaan selalu
   bergerak KE ATAS dan jawaban turun. `posLoket(0)` adalah loket yang bertanya
   untukmu; `posLoket(TANGGA.n - 1)` yang memegang jawabannya. Membalik arah ini
   di satu scene memutus scene 6, 7, 8, 9 dan 12 sekaligus.

   Berkas ini SENGAJA di luar `scenes/`. `npm run sisa` memeriksa setiap `.tsx`
   di dalam `scenes/` terhadap daftar kunci dari naskah (HARD RULE 5), jadi
   berkas bantu di sana akan dilaporkan sebagai nama yang tidak dikenal. Di
   tingkat episode, di samping Episode.tsx, ia memang bukan scene.
*/
import type React from "react";

/* ===========================================================================
   Koordinat — px pada frame 1920x1080
   ======================================================================== */

/** Nama situs episode ini, sudah dipecah jadi potongan — urutan TAYANG, kiri ke
 *  kanan. Dibaca dari BELAKANG: indeks terakhir lebih dulu (scene 6).
 *
 *  Sengaja fiktif dan netral. Merek nyata menarik perhatian ke mereknya, dan di
 *  scene 8 nama ini harus bisa "pindah nomor" tanpa ada yang tersinggung. */
export const POTONGAN = ["www", "tokoku", "id"] as const;

/** Nomor tempatnya. SENGAJA bukan empat kelompok bertitik: bentuk itu langsung
 *  dibaca sebagian penonton sebagai "I P", dan episode ini tidak pernah menyebut
 *  istilah itu (`naskah.md § Kamus pengucapan`). Yang dibutuhkan cuma kesan
 *  "sederet angka yang tidak mungkin dihafal". */
export const NOMOR_LAMA = "48 217 903 6";
export const NOMOR_BARU = "51 640 772 3";

export const X_NAMA = 960;
export const Y_NAMA = 168;
/** Lebar tiap potongan di layar; dipakai penanda scene 6 untuk berhenti tepat. */
export const W_POTONGAN = 300;

/** Titik tengah potongan ke-i, koordinat frame. */
export const xPotongan = (i: number): number =>
  X_NAMA + (i - (POTONGAN.length - 1) / 2) * W_POTONGAN;

/* --- peramban (scene 1) ---------------------------------------------------- */

export const PERAMBAN = { w: 1160, h: 600 };
export const X_LAYAR = 960;
/** Tepi ATAS bingkai peramban. */
export const Y_LAYAR = 300;
export const H_BILAH = 96;

/* --- loket ----------------------------------------------------------------- */

/** Satu loket pada skala 1. Semua bagiannya relatif terhadap titik pusat bawah
 *  (kaki loket), supaya menaruhnya di lantai cuma butuh satu koordinat. */
export const LOKET = {
  w: 300,
  h: 260,
  /** Atap/kanopi yang menjorok di atas badan. INI yang membuat bendanya terbaca
   *  sebagai loket dan bukan sebagai layar: badan berbingkai + bukaan gelap +
   *  bilah mendatar di bawahnya adalah gambar sebuah laptop, dan itulah yang
   *  keluar di render pertama repo ini. Kanopi memutusnya di detik nol. */
  atap: { w: 352, tinggi: 46, tarik: 34 },
  /** Bukaan jendela di badan atas. */
  jendela: { w: 196, h: 92, y: -232 },
  /** Ambang meja yang menjorok KELUAR dari badan, kiri dan kanan. */
  meja: { w: 264, h: 18, y: -140 },
  /** Laci di bawah meja — bagian yang paling sering dianimasikan. */
  laci: { w: 168, h: 58, y: -70 },
  /** Sejauh mana laci ditarik, pada skala 1. Ke BAWAH, ke arah penonton —
   *  laci yang bergeser ke samping terbaca sebagai panel yang menggeser.
   *
   *  Dibatasi supaya laci yang tertarik penuh TIDAK menembus garis lantai:
   *  `laci.y + tarik` harus tetap negatif. Laci yang menembus lantai terbaca
   *  sebagai gambar yang salah, bukan sebagai laci yang terbuka. */
  tarik: 46,
} as const;

/** Loket tunggal scene 5 — berdiri di tengah, lebih besar daripada di tangga.
 *
 *  Garis lantainya 830, bukan 880, dan itu ditentukan kotak aman bawah: nama
 *  resmi `[what]` mendarat DI BAWAH loket di scene 5, dan `--safe-bottom` 120px
 *  menyisakan ruang sampai y=960. Lantai di 880 mendorong namanya ke zona
 *  progress bar. Scene 3 dan 4 memakai garis yang sama supaya lantainya tidak
 *  melompat saat potongan keras. */
export const X_LOKET = 960;
export const Y_LANTAI = 830;
export const SKALA_LOKET = 1.35;

/* --- tangga (scene 6, 7, 8, 9, 12) ----------------------------------------- */

/** Empat anak tangga, naik ke KIRI supaya garis dari potongan nama di atas tidak
 *  pernah saling menyilang: potongan paling kanan turun ke loket terendah,
 *  potongan paling kiri ke loket tertinggi. */
export const TANGGA = {
  n: 4,
  x0: 1430,
  y0: 900,
  dx: -272,
  dy: -160,
  skala0: 1,
  dSkala: -0.1,
} as const;

export type PosLoket = { x: number; y: number; skala: number };

/** Anak tangga ke-i. 0 = loket yang bertanya untukmu (bawah, terdekat);
 *  `TANGGA.n - 1` = yang memegang jawabannya (atas, terjauh). */
export const posLoket = (i: number): PosLoket => ({
  x: TANGGA.x0 + i * TANGGA.dx,
  y: TANGGA.y0 + i * TANGGA.dy,
  skala: TANGGA.skala0 + i * TANGGA.dSkala,
});

/** Indeks loket yang memegang jawabannya. */
export const I_PEMILIK = TANGGA.n - 1;

/** Potongan nama yang membuka loket ke-i (i >= 1). Loket 0 tidak membuka
 *  potongan mana pun — dialah yang bertanya. Dibaca dari belakang, jadi loket
 *  pertama di atasmu memakai potongan PALING KANAN. */
export const iPotonganUntukLoket = (i: number): number => POTONGAN.length - i;

/** Titik jendela loket ke-i — tempat kartu masuk dan keluar. */
export const jendelaLoket = (i: number): { x: number; y: number } => {
  const p = posLoket(i);
  return { x: p.x, y: p.y + (LOKET.jendela.y + LOKET.jendela.h / 2) * p.skala };
};

/** Titik laci loket ke-i. */
export const laciLoket = (i: number): { x: number; y: number } => {
  const p = posLoket(i);
  return { x: p.x, y: p.y + (LOKET.laci.y - LOKET.laci.h / 2) * p.skala };
};

/** Garis penghubung — tebal, warna, dan opasitas yang sama di semua scene.
 *  Jarak dibandingkan lewat PANJANGNYA; begitu dua garis beda bobot, yang
 *  dibandingkan penonton bukan lagi panjangnya. */
export const GARIS = { warna: "var(--accent-ink)", tebal: 4, opasitas: 0.55 };

export const ABU = "var(--ink-1)";
export const GELAP = "var(--line)";

/* ===========================================================================
   Bentuk — semua mengembalikan <g>, dipasang di dalam satu <svg viewBox>
   ======================================================================== */

const teksDasar = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  textAnchor: "middle" as const,
  dominantBaseline: "middle" as const,
};

/** Loket. Titik acuannya kaki bawah, jadi `y` adalah garis lantainya.
 *
 *  `laci` 0..1 = seberapa jauh lacinya ditarik. `isi` = jumlah kartu di dalam
 *  laci; nol berarti benar-benar kosong, dan kekosongan itu harus terbaca
 *  sebagai fakta — karena itu dasar lacinya selalu digambar. */
export const Loket: React.FC<{
  x: number;
  y: number;
  skala?: number;
  /** 0 = siluet redup, 1 = menyala penuh. */
  nyala?: number;
  laci?: number;
  isi?: number;
  /** Loket yang memegang jawabannya digambar beraksen, bukan sekadar terang. */
  aksen?: boolean;
  opacity?: number;
}> = ({ x, y, skala = 1, nyala = 1, laci = 0, isi = 0, aksen = false, opacity = 1 }) => {
  const w = LOKET.w;
  const h = LOKET.h;
  const garis = aksen ? "var(--accent-ink)" : ABU;
  const tebal = aksen ? 7 : 6;
  const isiWarna = aksen ? "var(--accent-soft)" : "var(--bg-elev)";
  const tarik = laci * LOKET.tarik;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${skala})`}
      opacity={opacity * (0.28 + 0.72 * nyala)}
    >
      {/* badan */}
      <rect
        x={-w / 2}
        y={-h}
        width={w}
        height={h}
        rx={10}
        fill={isiWarna}
        stroke={garis}
        strokeWidth={tebal}
      />

      {/* kanopi — lihat catatan di LOKET.atap */}
      <path
        d={`M${LOKET.atap.w / -2} ${-h}H${LOKET.atap.w / 2}L${
          LOKET.atap.w / 2 - LOKET.atap.tarik
        } ${-h - LOKET.atap.tinggi}H${LOKET.atap.w / -2 + LOKET.atap.tarik}Z`}
        fill={isiWarna}
        stroke={garis}
        strokeWidth={tebal}
        strokeLinejoin="round"
      />

      {/* bukaan jendela — tempat pertanyaan masuk dan jawaban keluar */}
      <rect
        x={LOKET.jendela.w / -2}
        y={LOKET.jendela.y}
        width={LOKET.jendela.w}
        height={LOKET.jendela.h}
        rx={6}
        fill="var(--bg)"
        stroke={garis}
        strokeWidth={tebal}
      />

      {/* ambang meja: MENJOROK keluar badan di kiri dan kanan */}
      <rect
        x={LOKET.meja.w / -2}
        y={LOKET.meja.y}
        width={LOKET.meja.w}
        height={LOKET.meja.h}
        rx={5}
        fill={garis}
        opacity={0.95}
      />

      {/* laci — ditarik KE BAWAH, ke arah penonton. Dasarnya selalu digambar
          supaya kekosongannya terbaca sebagai fakta, bukan sebagai laci yang
          belum sempat digambar isinya. */}
      <g transform={`translate(0 ${tarik})`}>
        <rect
          x={LOKET.laci.w / -2}
          y={LOKET.laci.y - LOKET.laci.h}
          width={LOKET.laci.w}
          height={LOKET.laci.h}
          rx={5}
          fill={isiWarna}
          stroke={garis}
          strokeWidth={tebal - 1}
        />
        {/* dasar laci — garis dalam yang membuktikan ia berongga */}
        <path
          d={`M${LOKET.laci.w / -2 + 14} ${LOKET.laci.y - 12}h${LOKET.laci.w - 28}`}
          stroke={garis}
          strokeWidth={3}
          opacity={0.5}
          strokeLinecap="round"
        />
        {/* pegangan */}
        <path
          d={`M-26 ${LOKET.laci.y - LOKET.laci.h / 2}h52`}
          stroke={garis}
          strokeWidth={6}
          strokeLinecap="round"
        />
        {Array.from({ length: isi }, (_, k) => (
          <rect
            key={k}
            x={-30 + k * 26}
            y={LOKET.laci.y - LOKET.laci.h + 10}
            width={20}
            height={LOKET.laci.h - 22}
            rx={3}
            fill="var(--accent-ink)"
          />
        ))}
      </g>
    </g>
  );
};

/** Kartu yang berpindah — nama, nomor, atau jawaban. Satu komponen untuk
 *  semuanya, dan itu wajib: di scene 10 kartu asli dan kartu palsu HARUS tidak
 *  bisa dibedakan, dan dua komponen berbeda cepat atau lambat jadi dua gambar
 *  berbeda. */
export const Kartu: React.FC<{
  x: number;
  y: number;
  teks: string;
  skala?: number;
  warna?: string;
  opacity?: number;
  rot?: number;
  /** Amplop tertutup — isinya tidak terbaca dari luar (scene 11). */
  beramplop?: boolean;
  /** Segel lilin di sudutnya (scene 11). */
  bersegel?: boolean;
}> = ({
  x,
  y,
  teks,
  skala = 1,
  warna = "var(--accent-ink)",
  opacity = 1,
  rot = 0,
  beramplop = false,
  bersegel = false,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-92}
      y={-56}
      width={184}
      height={112}
      rx={10}
      fill={beramplop ? ABU : "var(--bg-elev)"}
      stroke={beramplop ? ABU : warna}
      strokeWidth={5}
    />
    {beramplop ? (
      <path d="M-92 -56 0 6 92 -56" fill="none" stroke="var(--bg)" strokeWidth={5} />
    ) : (
      /* Ukuran huruf menyusut mengikuti panjang teksnya. Kartu nomor
         ("48 217 903 6") dan kartu tanya ("?") memakai komponen yang sama —
         wajib, karena scene 10 bertumpu pada keduanya tidak bisa dibedakan —
         jadi ukurannya tidak boleh dipatok satu angka. Tanpa ini, nomornya
         terpotong di tepi kartu. */
      <text
        {...teksDasar}
        y={2}
        fontSize={Math.min(38, 300 / Math.max(1, teks.length))}
        fill={warna}
      >
        {teks}
      </text>
    )}
    {bersegel && <circle cx={72} cy={40} r={22} fill="var(--bad)" opacity={0.9} />}
  </g>
);

/** Catatan kecil yang menempel di sisi loket (scene 7), lengkap dengan bilah
 *  umurnya (scene 8). Bentuk dan posisinya tetap di sini karena scene 8 merusak
 *  apa yang scene 7 tempelkan. */
export const Catatan: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** 1 = umurnya masih penuh, 0 = habis. -1 = jangan gambar bilahnya sama
   *  sekali (scene 7, sebelum umurnya jadi bahasan). */
  sisa?: number;
  nyala?: number;
}> = ({ x, y, skala = 1, opacity = 1, sisa = -1, nyala = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-46}
      y={-40}
      width={92}
      height={80}
      rx={6}
      fill="var(--bg-elev)"
      stroke="var(--accent-ink)"
      strokeWidth={4}
      opacity={0.55 + 0.45 * nyala}
    />
    <path
      d="M-28 -16h56M-28 0h56M-28 16h34"
      stroke="var(--accent-ink)"
      strokeWidth={3}
      strokeLinecap="round"
      opacity={0.75}
    />
    {sisa >= 0 && (
      <>
        <rect x={-46} y={44} width={92} height={10} rx={5} fill={GELAP} />
        <rect
          x={-46}
          y={44}
          width={92 * Math.max(0, sisa)}
          height={10}
          rx={5}
          fill={sisa > 0.15 ? "var(--ok)" : "var(--warn)"}
        />
      </>
    )}
  </g>
);

/** Sosok netral — pemilik situs (scene 6) dan orang di tepi jalur (scene 10).
 *
 *  SENGAJA sama untuk keduanya, dan sengaja tanpa atribut apa pun: tanpa tudung,
 *  tanpa topeng, tanpa warna bahaya. Inti scene 10 justru bahwa siapa pun yang
 *  kebetulan ada di jalur bisa melakukannya, tanpa perlu jadi siapa-siapa. */
export const Sosok: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** Rotasi kepala, derajat — dipakai scene 10 untuk mengikuti kartu yang lewat. */
  hadap?: number;
}> = ({ x, y, skala = 1, opacity = 1, hadap = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <g transform={`rotate(${hadap})`}>
      <circle cx={0} cy={-104} r={30} fill="none" stroke={ABU} strokeWidth={6} />
    </g>
    <path
      d="M-46 0v-30a46 46 0 0 1 92 0V0"
      fill="none"
      stroke={ABU}
      strokeWidth={6}
      strokeLinecap="round"
    />
  </g>
);

/** Papan catatan — apa yang dilihat orang di tepi jalur (scene 10), dan apa yang
 *  tetap dilihat loket baru (scene 12).
 *
 *  Komponen yang SAMA dipakai di kedua scene, dan itu seluruh gunanya: kesamaan
 *  gambarnya yang membuat scene 12 mendarat tanpa perlu dijelaskan lagi. */
export const Papan: React.FC<{
  x: number;
  y: number;
  baris: number;
  skala?: number;
  opacity?: number;
}> = ({ x, y, baris, skala = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-110}
      y={-130}
      width={220}
      height={260}
      rx={10}
      fill="var(--bg-elev)"
      stroke={ABU}
      strokeWidth={5}
    />
    {Array.from({ length: Math.max(0, Math.min(5, Math.floor(baris))) }, (_, k) => (
      <g key={k} transform={`translate(0 ${-92 + k * 46})`}>
        <path d="M-84 0h96" stroke="var(--ink-0)" strokeWidth={5} strokeLinecap="round" />
        <path d="M28 0h56" stroke="var(--ink-2)" strokeWidth={5} strokeLinecap="round" />
      </g>
    ))}
  </g>
);

/** Siluet komputer — yang bertanya. Muncul di scene 3 dan 4; posisinya tetap
 *  supaya keduanya terasa memakai mesin yang sama.
 *
 *  Titik acuannya KAKI BAWAH, sama seperti `Loket` dan `Bangunan`: `y` adalah
 *  garis lantainya, dan tidak ada bagian yang digambar di bawah 0. Dulu alasnya
 *  ada di +24, jadi garis lantai lewat memotong lehernya dan kakinya menggantung
 *  22px di bawah lantai — komputernya terbaca amblas ke dalam lantai. */
export const X_KOMPUTER = 300;
export const Y_KOMPUTER = Y_LANTAI;

export const Komputer: React.FC<{
  x?: number;
  y?: number;
  skala?: number;
  opacity?: number;
}> = ({ x = X_KOMPUTER, y = Y_KOMPUTER, skala = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-110}
      y={-184}
      width={220}
      height={150}
      rx={12}
      fill="var(--bg-elev)"
      stroke={ABU}
      strokeWidth={6}
    />
    <path d="M-40 -34v30M-78 -4h156" stroke={ABU} strokeWidth={6} strokeLinecap="round" />
  </g>
);

/** Bangunan yang dituju — papan namanya dicopot di scene 3, dan nomornya yang
 *  tersisa jadi satu-satunya cara mencapainya. */
export const Bangunan: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** 1 = papan nama masih terpasang, 0 = sudah lepas. */
  papan?: number;
  /** Rotasi & jatuhnya papan saat lepas. */
  papanJatuh?: { rot: number; dy: number };
  nomor?: string;
  nomorMuncul?: number;
}> = ({
  x,
  y,
  skala = 1,
  opacity = 1,
  papan = 1,
  papanJatuh = { rot: 0, dy: 0 },
  nomor = "",
  nomorMuncul = 0,
}) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-170}
      y={-330}
      width={340}
      height={330}
      rx={12}
      fill="var(--bg-elev)"
      stroke={ABU}
      strokeWidth={6}
    />
    <rect x={-46} y={-150} width={92} height={150} rx={6} fill="var(--bg)" stroke={ABU} strokeWidth={5} />
    {nomorMuncul > 0 && (
      <text
        {...teksDasar}
        y={-262}
        fontSize={44}
        fontFamily="var(--font-mono)"
        fill="var(--ink-0)"
        opacity={nomorMuncul}
      >
        {nomor}
      </text>
    )}
    {papan > 0 && (
      <g
        transform={`translate(0 ${papanJatuh.dy}) rotate(${papanJatuh.rot})`}
        opacity={papan}
      >
        <rect
          x={-150}
          y={-292}
          width={300}
          height={62}
          rx={8}
          fill="var(--bg)"
          stroke={ABU}
          strokeWidth={5}
        />
        <text {...teksDasar} y={-260} fontSize={34} fill="var(--ink-0)">
          {POTONGAN.join(".")}
        </text>
      </g>
    )}
  </g>
);

/** Nama situs di atas panggung, dipecah jadi potongan yang bisa disorot satu per
 *  satu (scene 3 memakai `pecah = 0`, scene 6 memecahnya). */
export const NamaSitus: React.FC<{
  y?: number;
  /** 0 = satu kata utuh, 1 = garis pemisah antar potongan tergambar penuh. */
  pecah?: number;
  /** Indeks potongan yang sedang menyala; -1 = tidak ada. */
  sorot?: number;
  opacity?: number;
  skala?: number;
}> = ({ y = Y_NAMA, pecah = 0, sorot = -1, opacity = 1, skala = 1 }) => (
  <g transform={`translate(${X_NAMA} ${y}) scale(${skala})`} opacity={opacity}>
    {POTONGAN.map((p, i) => (
      <text
        key={p}
        {...teksDasar}
        x={xPotongan(i) - X_NAMA}
        fontSize={72}
        fill={sorot === i ? "var(--accent-ink)" : "var(--ink-0)"}
        opacity={sorot === -1 || sorot === i ? 1 : 0.45}
      >
        {i === POTONGAN.length - 1 ? p : `${p}.`}
      </text>
    ))}
    {pecah > 0 &&
      POTONGAN.slice(1).map((p, i) => {
        const x = (xPotongan(i) + xPotongan(i + 1)) / 2 - X_NAMA;
        return (
          <path
            key={p}
            d={`M${x} -62v${124 * pecah}`}
            stroke={GARIS.warna}
            strokeWidth={3}
            opacity={0.6 * pecah}
            strokeDasharray="10 10"
          />
        );
      })}
  </g>
);

/** Penanda segitiga yang bergerak dari kanan ke kiri di atas nama (scene 6).
 *  Arah masuknya dari kanan itu wajib — ia yang membuat "dibaca dari belakang"
 *  terasa sebelum VO menyebut arahnya. */
export const Penanda: React.FC<{ x: number; y?: number; opacity?: number }> = ({
  x,
  y = Y_NAMA - 92,
  opacity = 1,
}) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <path d="M-22 -26h44l-22 34z" fill="var(--accent-ink)" />
  </g>
);
