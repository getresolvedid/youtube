/* Kosakata visual bersama Short 1 "Nugget" — 1080x1920.

   Dipakai bersama oleh SEMBILAN scene di s1-nugget/, dan sengaja ditaruh SATU
   TINGKAT DI ATAS folder scene-nya. Alasannya sama dengan ../panggung-loket.tsx
   di video panjang: `npm run sisa` memeriksa setiap .tsx di dalam folder scene
   terhadap daftar kunci dari naskah, jadi berkas bantu yang tinggal di sana akan
   dilaporkan sebagai nama yang tidak dikenal.

   BENTUK LOKETNYA DIIMPOR, BUKAN DIGAMBAR ULANG. `Loket`, `Kartu`, `Sosok`, dan
   `NamaSitus` datang dari ../panggung-loket.tsx apa adanya — ketiganya sudah
   menerima x/y/skala, jadi tidak ada yang bergantung pada viewBox 16:9. Yang
   hidup di berkas ini cuma KOORDINAT 9:16-nya. Menggambar ulang loketnya di
   sini berarti dua gambar berbeda untuk benda yang sama, dan penonton yang
   menonton episode lalu Short-nya akan melihat dua benda.

   TATA LETAK — kotak aman 9:16 adalah x 90–990 dan y 240–1480 (docs/03).

     y  250– 505  teks di layar (../teks-atas.tsx), sampai tiga baris
     y  600       nama situs, dipecah jadi tiga potongan
     y  810–1470  tangga loket, naik ke ATAS dan ke KIRI

   ARAH TANGGANYA MENGIKAT, dan sama persis dengan video panjang: bawah = kamu,
   atas = pemilik situs. `posLoket(0)` yang bertanya untukmu, `posLoket(3)` yang
   memegang jawabannya. Membalik arahnya memutus scene 4, 5, 6, 7 sekaligus.

   KENAPA MIRING KE KIRI, bukan lurus menumpuk: garis dari potongan nama di atas
   ke loketnya masing-masing tidak boleh menyilang. Potongan paling kanan turun
   ke loket terendah, potongan paling kiri ke loket tertinggi — dan jangkauan x
   ketiga garis itu memang tidak beririsan (830→620, 540→460, 250→300). Tangga
   yang lurus membuat ketiganya berimpit di satu koridor sempit.
*/
import type React from "react";

import { LOKET, POTONGAN } from "../panggung-loket";

/* --- panggung -------------------------------------------------------------- */

/** viewBox seluruh scene Short ini. Semua koordinat di berkas ini px pada
 *  frame 1080x1920 — sama angka, sama satuan, tanpa penskalaan tersembunyi. */
export const VIEWBOX = "0 0 1080 1920";

/* --- nama situs ------------------------------------------------------------ */

/** y garis tengah nama. 600 adalah kompromi yang diikat dua sisi: teks di layar
 *  berhenti sekitar 505, dan atap loket teratas mulai sekitar 676. */
export const Y_NAMA_S = 600;
export const X_NAMA_S = 540;
/** Jarak antar titik tengah potongan.
 *
 *  250, BUKAN 290. Potongan pertama "www." pada `FS_NAMA` 64 lebarnya sekitar
 *  180px, jadi pada 290 tepi kirinya mendarat di x 160 — tepat di atas gembok
 *  bilah alamat. Bergesernya cuma 20px dan tidak pernah terlihat dari
 *  `npm run tumpang`: gembok itu BENTUK, bukan teks, dan yang diperiksa cuma
 *  yang bisa rugi kalau tertutupi. Yang menemukannya mata, bukan alat. */
export const W_POTONGAN_S = 250;
export const FS_NAMA = 64;

/** Titik tengah potongan ke-i pada frame 9:16. */
export const xPotonganS = (i: number): number =>
  X_NAMA_S + (i - (POTONGAN.length - 1) / 2) * W_POTONGAN_S;

/** Tepi bawah huruf nama — pangkal garis ke loket. */
export const Y_NAMA_BAWAH = Y_NAMA_S + FS_NAMA / 2;

/* --- tangga ---------------------------------------------------------------- */

/** Empat anak tangga. Loket 0 berdiri di kanan bawah (paling dekat penonton),
 *  loket 3 di kiri atas (paling jauh). Skalanya menyusut ke atas — itu yang
 *  membuat "lebih jauh" terbaca tanpa satu garis perspektif pun. */
export const TANGGA_S = {
  n: 4,
  x0: 780,
  y0: 1470,
  dx: -160,
  dy: -205,
  skala0: 0.62,
  dSkala: -0.035,
} as const;

export type PosLoketS = { x: number; y: number; skala: number };

export const posLoketS = (i: number): PosLoketS => ({
  x: TANGGA_S.x0 + i * TANGGA_S.dx,
  y: TANGGA_S.y0 + i * TANGGA_S.dy,
  skala: TANGGA_S.skala0 + i * TANGGA_S.dSkala,
});

/** Indeks loket yang memegang jawabannya. */
export const I_PEMILIK_S = TANGGA_S.n - 1;

/** Potongan nama yang membuka loket ke-i (i >= 1). Loket 0 tidak membuka
 *  potongan mana pun — dialah yang bertanya. Dibaca dari belakang, jadi loket
 *  pertama di atasmu memakai potongan PALING KANAN. */
export const iPotonganUntukLoketS = (i: number): number => POTONGAN.length - i;

/** Titik jendela loket ke-i — tempat garis dari potongan mendarat. */
export const jendelaLoketS = (i: number): { x: number; y: number } => {
  const p = posLoketS(i);
  return { x: p.x, y: p.y + (LOKET.jendela.y + LOKET.jendela.h / 2) * p.skala };
};

/** Titik laci loket ke-i. */
export const laciLoketS = (i: number): { x: number; y: number } => {
  const p = posLoketS(i);
  return { x: p.x, y: p.y + (LOKET.laci.y - LOKET.laci.h / 2) * p.skala };
};

/** Kartu nomor milik loket teratas — SATU-SATUNYA kartu di Short ini, dan
 *  posisinya dipakai scene 6, 7, 8, dan 9.
 *
 *  Ia sengaja TIDAK menempel di sisi loket. Versi pertama menaruhnya pada
 *  `laci.x + 210 * skala`, dan pada skala 0,5 itu jatuh di 392 — menindih atap
 *  loket teratas yang membentang sampai 391. Yang benar: ia berdiri di ruang
 *  kosong sebelah kanan tangga, di ketinggian lacinya, dengan garis pandang
 *  yang jelas. Kartu yang menempel ke loket terbaca sebagai bagian bangunannya,
 *  padahal ia justru ISI lacinya. */
export const KARTU_NOMOR = { x: 620, skala: 0.52 };

/** Sosok pemilik situs, di KIRI loket teratas — sisi kanannya sudah dipakai
 *  garis ke kartunya.
 *
 *  Tanpa label teks. Dulu ada baris "pemilik situsnya" di bawahnya, dan pada
 *  9:16 baris itu terjepit antara kaki loket teratas dan atap loket di
 *  bawahnya — jaraknya tinggal 3px. Yang dikatakannya sudah ditanggung teks di
 *  layar scene 6 ("Pemilik situsnya sendiri."), jadi labelnya bukan hilang,
 *  cuma pindah ke tempat yang memang dibaca penonton tanpa suara. */
export const SOSOK_PEMILIK = { x: 150, skala: 0.52 };

/** Garis penghubung — tebal, warna, dan opasitas yang sama di semua scene.
 *  Jarak dibandingkan lewat PANJANGNYA; begitu dua garis beda bobot, yang
 *  dibandingkan penonton bukan lagi panjangnya. */
export const GARIS_S = { warna: "var(--accent-ink)", tebal: 5, opasitas: 0.55 };

/* --- bentuk ---------------------------------------------------------------- */

const teksDasar = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  textAnchor: "middle" as const,
  dominantBaseline: "middle" as const,
};

/** Nama situs 9:16, dipecah jadi potongan yang bisa disorot satu per satu.
 *
 *  Sengaja BUKAN <NamaSitus> dari panggung-loket: yang di sana memakai koordinat
 *  1920x1080 dan fontSize 72. Yang dipakai bersama antara episode dan Short ini
 *  adalah NAMANYA (`POTONGAN`), bukan tata letaknya — nama yang sama itulah yang
 *  membuat penonton mengenali benda yang sama. */
export const NamaSitusS: React.FC<{
  /** 0 = satu kata utuh, 1 = garis pemisah antar potongan tergambar penuh. */
  pecah?: number;
  /** Indeks potongan yang sedang menyala; -1 = tidak ada. */
  sorot?: number;
  opacity?: number;
}> = ({ pecah = 0, sorot = -1, opacity = 1 }) => (
  <g opacity={opacity}>
    {POTONGAN.map((p, i) => (
      <text
        key={p}
        {...teksDasar}
        x={xPotonganS(i)}
        y={Y_NAMA_S}
        fontSize={FS_NAMA}
        fill={sorot === i ? "var(--accent-ink)" : "var(--ink-0)"}
        opacity={sorot === -1 || sorot === i ? 1 : 0.4}
      >
        {i === POTONGAN.length - 1 ? p : `${p}.`}
      </text>
    ))}
    {pecah > 0 &&
      POTONGAN.slice(1).map((p, i) => {
        const x = (xPotonganS(i) + xPotonganS(i + 1)) / 2;
        return (
          <path
            key={p}
            d={`M${x} ${Y_NAMA_S - 56}v${112 * pecah}`}
            stroke={GARIS_S.warna}
            strokeWidth={3}
            opacity={0.6 * pecah}
            strokeDasharray="10 10"
          />
        );
      })}
  </g>
);

/** Penanda segitiga yang bergerak dari kanan ke kiri di atas nama.
 *
 *  Arah masuknya dari kanan itu WAJIB — ia yang membuat "dibaca dari belakang"
 *  terasa sebelum VO selesai mengucapkannya. Dipakai scene 1, 4, 5, 6, dan 9;
 *  scene 9 memakainya dengan gerakan yang sama persis seperti scene 1, karena
 *  di situlah loop Short ini menyambung. */
export const PenandaS: React.FC<{ x: number; opacity?: number }> = ({
  x,
  opacity = 1,
}) => (
  <g transform={`translate(${x} ${Y_NAMA_S - 78})`} opacity={opacity}>
    <path d="M-24 -28h48l-24 36z" fill="var(--accent-ink)" />
  </g>
);

/** x penanda saat masih di luar frame kanan. */
export const X_PENANDA_LUAR = 1160;

/** Bilah alamat peramban yang membungkus namanya — dipakai scene 1, 2, dan 9.
 *
 *  Ada dua alasan ia bukan hiasan. Pertama, HARD RULE 2: scene 1 dan 2 belum
 *  punya loket, dan nama yang berdiri sendiri di layar adalah scene yang isinya
 *  cuma teks. Kedua, VO scene 1 berbunyi "nama situs yang KAMU KETIK" — bilah
 *  alamat yang menampungnya adalah satu-satunya hal di layar yang mengatakan
 *  di mana nama itu diketik.
 *
 *  Ia MENGHILANG begitu namanya dipecah (scene 3): setelah itu yang dibahas
 *  bentuk namanya, bukan tempat mengetiknya. Dan ia KEMBALI di scene 9, karena
 *  di situlah loop-nya menyambung ke frame pertama. */
/** Tepi bilah alamat — DIPATOK di kotak aman, tidak diturunkan dari lebar
 *  namanya. Sebelumnya ia `xPotonganS(0) - 150`, dan itu berarti tepi kiri
 *  bilah (dan gemboknya) ikut bergerak setiap kali `W_POTONGAN_S` disetel:
 *  ruang untuk gembok jadi sisa pembagian, bukan angka yang dipilih. */
export const BILAH_ALAMAT = { x0: 100, x1: 980, x_gembok: 152 };

export const BilahAlamat: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <g opacity={opacity}>
    <rect
      x={BILAH_ALAMAT.x0}
      y={Y_NAMA_S - 62}
      width={BILAH_ALAMAT.x1 - BILAH_ALAMAT.x0}
      height={124}
      rx={62}
      fill="var(--bg-elev)"
      stroke="var(--ink-2)"
      strokeWidth={4}
    />
    {/* Gembok kecil di ujung kiri — tanda ini bilah alamat, bukan kotak biasa.
        Jaraknya ke huruf pertama "www." sekitar 34px pada W_POTONGAN_S 250;
        kalau salah satu dari keduanya diubah, periksa lagi dengan mata. */}
    <g transform={`translate(${BILAH_ALAMAT.x_gembok} ${Y_NAMA_S})`}>
      <rect x={-14} y={-4} width={28} height={22} rx={4} fill="var(--ink-2)" />
      <path
        d="M-8 -4v-8a8 8 0 0 1 16 0v8"
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth={4}
      />
    </g>
  </g>
);

/** Kamera mundur di scene 7, dan TETAP di situ sampai scene 8.
 *
 *  Angkanya di sini, bukan diketik di dua scene: dua salinan angka yang wajib
 *  sama adalah dua angka yang akan berbeda dalam seminggu, dan melesetnya tidak
 *  akan terlihat sebagai error — cuma sebagai tangga yang melompat sedikit saat
 *  scene berganti. */
export const SKALA_MUNDUR = 0.94;

/** transform grup tangga saat kamera mundur `p` (0..1). Titik jangkarnya pusat
 *  bawah panggung, supaya yang menjauh terasa naik, bukan mengecil di tempat. */
export const mundurKamera = (p: number): string =>
  `translate(${540 * (1 - (1 + (SKALA_MUNDUR - 1) * p))} ${
    1500 * (1 - (1 + (SKALA_MUNDUR - 1) * p))
  }) scale(${1 + (SKALA_MUNDUR - 1) * p})`;

/** Garis bawah yang menunjukkan ARAH BACA, dipakai scene 2 saja.
 *  `maju` menggambarnya dari kiri, `mundur` menghapusnya dari kanan — dua
 *  gerakan yang tidak boleh jalan bersamaan (lihat 02-kamu-kiri-direction.md). */
export const GarisBaca: React.FC<{
  /** 0..1, seberapa jauh garis tergambar dari KIRI. */
  maju: number;
  /** 0..1, seberapa jauh ujung KANAN-nya ditarik balik. */
  mundur: number;
}> = ({ maju, mundur }) => {
  const x0 = xPotonganS(0) - 100;
  const x1 = xPotonganS(POTONGAN.length - 1) + 90;
  const kiri = x0;
  const kanan = x0 + (x1 - x0) * maju - (x1 - x0) * mundur;
  if (kanan <= kiri) return null;
  return (
    <path
      d={`M${kiri} ${Y_NAMA_BAWAH + 26}H${kanan}`}
      stroke={GARIS_S.warna}
      strokeWidth={6}
      strokeLinecap="round"
      opacity={0.8}
    />
  );
};
