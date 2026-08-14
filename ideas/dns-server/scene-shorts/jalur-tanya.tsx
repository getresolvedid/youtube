/* Kosakata visual bersama Short 2 "Jebakan" — 1080x1920.

   Dipakai bersama oleh SEMBILAN scene di s2-jebakan/, dan sengaja ditaruh SATU
   TINGKAT DI ATAS folder scene-nya — alasan yang sama persis dengan
   ../tangga-tegak.tsx dan ../panggung-loket.tsx: `npm run sisa` memeriksa setiap
   .tsx di dalam folder scene terhadap daftar kunci dari naskah.

   BENTUK LOKET, KARTU, SOSOK, DAN PAPAN DIIMPOR dari ../panggung-loket.tsx apa
   adanya. Yang hidup di sini cuma koordinat 9:16-nya, bilah waktu, dan coretan.

   TATA LETAK — kotak aman 9:16 adalah x 90–990 dan y 240–1480 (docs/03).

     y  250– 505  teks di layar (../teks-atas.tsx)
     y  998–1042  bilah waktu satu halaman (scene 4 & 5)
     y 1420       garis lantai: sosok, loket, dan tempat tujuan

   SATU GAMBARAN, TUJUH SCENE. Undangannya cuma jatuh sekali, di scene 3
   (HARD RULE 6 · docs/02 § Aturan Shorts), jadi lantai, sosok, dan loketnya
   HARUS menempati piksel yang sama dari scene 3 sampai scene 9. Potongan keras
   di antaranya baru terbaca sebagai "ruangan yang sama" kalau tidak ada yang
   bergeser saat layarnya berganti.

   LOKETNYA BERDIRI DEKAT SOSOKNYA, BUKAN DI TENGAH JALUR, dan itu bukan soal
   komposisi: seluruh Short ini bertumpu pada loket yang ditanya SEBELUM
   berangkat dan ditinggalkan sesudahnya. Loket yang digambar di tengah jalur
   membatalkan scene 4 dan 5 sekaligus.
*/
import type React from "react";

/* --- panggung -------------------------------------------------------------- */

export const VIEWBOX_S2 = "0 0 1080 1920";

export const Y_LANTAI_S2 = 1420;

/** LOKETNYA DI POJOK KIRI, DI BELAKANG SOSOKNYA — bukan di antara sosok dan
 *  tujuannya. Ini bukan soal komposisi: seluruh Short bertumpu pada loket yang
 *  ditanya SEBELUM berangkat lalu ditinggalkan. Loket yang berdiri di tengah
 *  jalur akan dilewati sosoknya di scene 4, dan gambar itu mengatakan persis
 *  kebalikan dari kalimatnya. */
export const X_LOKET_S2 = 300;
export const SKALA_LOKET_S2 = 0.72;

/** Sosok berangkat dari 520 dan berhenti di 740 — tidak sampai menyentuh tempat
 *  tujuannya (tepi kirinya di 808). Sosok yang menempel ke bangunan terbaca
 *  sebagai sudah sampai, dan scene 4 justru soal perjalanan yang masih jalan. */
export const X_SOSOK_S2 = 520;
export const X_SOSOK_AKHIR_S2 = 740;
export const SKALA_SOSOK_S2 = 0.85;

/** Tempat tujuan — jauh di kanan, di lantai yang sama. Kecil karena jauh, bukan
 *  karena tidak penting: yang harus terbaca adalah jarak antara sosok dan
 *  tujuannya, dan loket di pojok kiri BUKAN perhentian di jalur itu.
 *
 *  Ia MEMUDAR mulai scene 8: di sana loket lama berdiri di kanan, dan keduanya
 *  memperebutkan piksel yang sama. Yang dibahas dari scene 8 juga bukan lagi
 *  perjalanannya, melainkan apa yang loketnya lihat. */
export const X_TUJUAN_S2 = 895;
export const SKALA_TUJUAN_S2 = 0.46;

/** Loket pembanding di scene 8 — loket lama, berdiri di kanan. */
export const X_LOKET_LAMA_S2 = 780;

/* --- bilah waktu ----------------------------------------------------------- */

/** Bilah waktu satu halaman. `tanya` = porsi paling depan yang dihabiskan untuk
 *  bertanya nama.
 *
 *  ANGKANYA BUKAN KLAIM TERUKUR. Berapa lama bertanya nama dan berapa besar
 *  porsinya dari seluruh pemuatan halaman adalah baris ⚠ di `naskah.md §
 *  Sumber`. Yang dibuktikan gambar ini cuma PERBANDINGAN PANJANG — potongan
 *  pendek lawan sisa yang panjang — dan itu benar tanpa satu angka pun. Karena
 *  itu tidak ada satu label angka pun di bilah ini, dan jangan ditambahkan
 *  sebelum pengukurannya jadi. */
export const BILAH = { x0: 120, x1: 960, y: 880, h: 44, tanya: 0.13 } as const;

export const xBilah = (p: number): number =>
  BILAH.x0 + (BILAH.x1 - BILAH.x0) * p;

/** Bilah waktu. `gambar` 0..1 menggambarnya dari kiri; `sorotTanya` menyalakan
 *  potongan bertanya; `nyalaSisa` menyalakan sisanya. */
export const BilahWaktu: React.FC<{
  gambar?: number;
  sorotTanya?: number;
  nyalaSisa?: number;
  opacity?: number;
}> = ({ gambar = 1, sorotTanya = 0, nyalaSisa = 0, opacity = 1 }) => {
  const lebar = (BILAH.x1 - BILAH.x0) * Math.max(0, Math.min(1, gambar));
  const xTanya = xBilah(BILAH.tanya);
  return (
    <g opacity={opacity}>
      {/* dasar bilah — selalu digambar utuh sejauh `gambar` */}
      <rect
        x={BILAH.x0}
        y={BILAH.y}
        width={lebar}
        height={BILAH.h}
        rx={BILAH.h / 2}
        fill="var(--bg-elev)"
        stroke="var(--ink-2)"
        strokeWidth={4}
      />
      {/* sisa perjalanan — menyala tanpa pernah berubah panjang */}
      {nyalaSisa > 0 && lebar > xTanya - BILAH.x0 && (
        <rect
          x={xTanya}
          y={BILAH.y}
          width={BILAH.x0 + lebar - xTanya}
          height={BILAH.h}
          rx={BILAH.h / 2}
          fill="var(--ink-1)"
          opacity={0.45 * nyalaSisa}
        />
      )}
      {/* potongan bertanya — satu-satunya yang beraksen */}
      {sorotTanya > 0 && (
        <rect
          x={BILAH.x0}
          y={BILAH.y}
          width={xTanya - BILAH.x0}
          height={BILAH.h}
          rx={BILAH.h / 2}
          fill="var(--accent-ink)"
          opacity={sorotTanya}
        />
      )}
      {/* pemisah tepat di batas keduanya */}
      {gambar > BILAH.tanya && (
        <path
          d={`M${xTanya} ${BILAH.y - 14}v${BILAH.h + 28}`}
          stroke="var(--ink-0)"
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.8}
        />
      )}
    </g>
  );
};

/* --- papan catatan (scene 8 & 9) -------------------------------------------- */

/** Papan catatan yang tumbuh di atas sebuah loket. Angkanya di sini, bukan di
 *  dua berkas scene: scene 8 menyandingkan DUA papan dan seluruh maksudnya
 *  adalah keduanya SAMA PENUH. Dua salinan `5` di dua berkas adalah dua angka
 *  yang akan berbeda dalam seminggu — dan begitu berbeda, Short ini berubah jadi
 *  rekomendasi memilih loket. */
export const Y_PAPAN_S2 = 950;
export const SKALA_PAPAN_S2 = 0.6;
export const BARIS_PAPAN_PENUH = 5;

/** Tali tipis dari kaki papan ke atap loketnya.
 *
 *  Tanpa ini papannya menggantung di tengah layar tanpa jangkar, dan penonton
 *  membacanya sebagai benda ketiga — bukan sebagai catatan MILIK loket itu.
 *  Di scene 8 label "loket baru"/"loket lama" masih menambatnya; di scene 9
 *  labelnya tidak ada, dan di situlah ia terlihat mengambang. */
export const TaliPapan: React.FC<{ x: number; opacity?: number }> = ({
  x,
  opacity = 1,
}) => {
  const dariY = Y_PAPAN_S2 + 130 * SKALA_PAPAN_S2;
  const keY = Y_LANTAI_S2 - (260 + 46) * SKALA_LOKET_S2;
  return (
    <path
      d={`M${x} ${dariY}V${keY}`}
      stroke="var(--ink-2)"
      strokeWidth={3}
      strokeDasharray="8 10"
      opacity={0.6 * opacity}
    />
  );
};

/* --- coretan --------------------------------------------------------------- */

/** Coretan yang menembus sebuah kalimat. Bentuk dan sudutnya dipatok di sini
 *  karena scene 7 harus memakai coretan yang SAMA PERSIS dengan scene 2 — itu
 *  yang membuatnya terbaca sebagai janji yang ditagih, bukan sebagai coretan
 *  baru yang kebetulan mirip.
 *
 *  Digambar dengan `p` 0..1, tidak pernah muncul jadi: garis yang tiba-tiba ada
 *  terbaca sebagai hiasan, garis yang ditarik terbaca sebagai keputusan. */
export const SUDUT_CORET = -2.5;

export const Coret: React.FC<{
  x0: number;
  x1: number;
  y: number;
  p: number;
  tebal?: number;
}> = ({ x0, x1, y, p, tebal = 10 }) => {
  if (p <= 0) return null;
  const x = x0 + (x1 - x0) * Math.min(1, p);
  return (
    <g transform={`rotate(${SUDUT_CORET} ${(x0 + x1) / 2} ${y})`}>
      <path
        d={`M${x0} ${y}H${x}`}
        stroke="var(--bad)"
        strokeWidth={tebal}
        strokeLinecap="round"
      />
    </g>
  );
};

/* --- label kecil ----------------------------------------------------------- */

/** Label mono di bawah sebuah benda. Ukuran & warnanya dipatok supaya sembilan
 *  scene tidak masing-masing memilih sendiri. */
export const Label: React.FC<{
  x: number;
  y: number;
  children: string;
  opacity?: number;
  warna?: string;
  anchor?: "start" | "middle" | "end";
}> = ({ x, y, children, opacity = 1, warna = "var(--ink-1)", anchor = "middle" }) => (
  <text
    x={x}
    y={y}
    fontSize={32}
    fontFamily="var(--font-mono)"
    fontWeight={700}
    fill={warna}
    textAnchor={anchor}
    opacity={opacity}
  >
    {children}
  </text>
);

/* --- tanda centang & silang ------------------------------------------------ */

/** Dipakai scene 6 (kartu dijawab salah vs benar) dan scene 9 (dua label).
 *  Satu bentuk untuk keduanya supaya perbandingannya tetap berlaku. */
export const Tanda: React.FC<{
  x: number;
  y: number;
  jenis: "ok" | "bad";
  skala?: number;
  opacity?: number;
}> = ({ x, y, jenis, skala = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <path
      d={jenis === "ok" ? "M-22 0l14 16 30-34" : "M-20 -20l40 40M20 -20l-40 40"}
      fill="none"
      stroke={jenis === "ok" ? "var(--ok)" : "var(--bad)"}
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

/* --- mitos (scene 1 & 7) ---------------------------------------------------- */

/** Kalimat mitosnya, dipecah per kata supaya bisa masuk bertahap, dan dipatah
 *  jadi DUA BARIS di tempat yang dipilih sendiri — bukan diserahkan ke pembungkus
 *  otomatis. Patahan yang berpindah saat font berubah akan memindahkan coretan
 *  di scene 2 dan 7 juga, dan ketiganya harus jatuh di tempat yang sama.
 *
 *  "D N S" dieja per huruf di VO (naskah.md § Kamus pengucapan) tapi ditulis
 *  utuh di layar — yang dibaca mata bukan yang dibaca ElevenLabs. */
export const BARIS_MITOS = [
  ["Ganti", "DNS,"],
  ["internet", "jadi", "kencang."],
] as const;

export const KATA_MITOS = BARIS_MITOS.flat();

export const FS_MITOS = 72;
/** y garis tengah kedua baris mitos. Keduanya di dalam pita teks atas
 *  (y 250–505), jadi mitosnya menempati tempat yang sama dengan teks di layar
 *  scene lain — tidak ada yang melompat saat scene berganti.
 *
 *  JARAKNYA 100px, BUKAN 84. Pada `FS_MITOS` 72 kotak barisnya sekitar 94px,
 *  jadi 84 membuat kedua baris beririsan 15px — `npm run tumpang` yang
 *  menemukannya, dan itu jenis cacat yang tidak pernah kebetulan terlihat saat
 *  scrubbing karena ia cuma soal ekor huruf yang saling menyenggol. Kalau
 *  `FS_MITOS` diubah, angka ini ikut. */
export const Y_MITOS = [304, 404] as const;

/** Rentang x coretan per baris. Diperkirakan dari panjang barisnya pada
 *  `FS_MITOS`, bukan diukur — SVG tidak bisa mengukur teks saat render, dan
 *  angka yang meleset sedikit di sini cuma membuat coretannya sedikit lebih
 *  panjang daripada katanya. Yang tidak boleh: coretan yang lebih PENDEK
 *  daripada kalimatnya, karena itu terbaca sebagai coretan yang gagal. */
export const CORET_MITOS = [
  { x0: 330, x1: 750 },
  { x0: 150, x1: 930 },
] as const;

/** Kalimat mitosnya. `kata(i)` mengembalikan opasitas kata ke-i (urut baca,
 *  lintas baris) — dipakai scene 1 untuk memasukkannya bertahap dan scene 2
 *  untuk menampilkannya utuh (`() => 1`). */
export const Mitos: React.FC<{
  kata?: (i: number) => number;
  opacity?: number;
}> = ({ kata = () => 1, opacity = 1 }) => {
  let n = -1;
  return (
    <g opacity={opacity}>
      {BARIS_MITOS.map((baris, b) => (
        <text
          key={baris.join(" ")}
          x={540}
          y={Y_MITOS[b]}
          fontSize={FS_MITOS}
          fontFamily="var(--font-display)"
          fontWeight={800}
          fill="var(--ink-0)"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {baris.map((k, i) => {
            n += 1;
            return (
              <tspan key={k} opacity={kata(n)}>
                {i === 0 ? k : ` ${k}`}
              </tspan>
            );
          })}
        </text>
      ))}
    </g>
  );
};

/** Bilah kecepatan yang naik — yang DIJANJIKAN mitosnya, bukan yang benar.
 *  Warnanya sengaja netral, bukan aksen: aksen di Short ini dipakai untuk yang
 *  benar, dan mitosnya tidak boleh tampil sebagai kesimpulan. */
export const BilahJanji: React.FC<{ naik: number; opacity?: number }> = ({
  naik,
  opacity = 1,
}) => (
  <g opacity={opacity}>
    {[0, 1, 2, 3, 4].map((i) => {
      const h = 70 + i * 60;
      const p = Math.max(0, Math.min(1, naik * 5 - i));
      return (
        <rect
          key={i}
          x={330 + i * 90}
          y={1180 - h * p}
          width={58}
          height={h * p}
          rx={8}
          fill="var(--ink-1)"
          opacity={0.5}
        />
      );
    })}
    <path
      d="M300 1180H800"
      stroke="var(--ink-2)"
      strokeWidth={5}
      strokeLinecap="round"
    />
  </g>
);
