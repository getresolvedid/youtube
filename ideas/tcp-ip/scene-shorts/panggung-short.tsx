/* Koordinat 9:16 untuk keempat Shorts topik "tcp-ip".

   KENAPA BERKAS SENDIRI, PADAHAL SUDAH ADA ../panggung-jaringan.tsx.
   Yang bisa dipakai ulang lintas rasio cuma KOMPONENNYA — potongan bernomor,
   perangkat, centang, kotak fisik. Koordinatnya tidak: `panggung-jaringan.tsx`
   menaruh tiga jalur MENDATAR dari x 300 ke 1620 di kanvas 1920 x 1080, dan di
   kanvas 1080 x 1920 angka itu keluar frame. Menyalin komponennya ke sini akan
   membuat potongan Short dan potongan video panjang jadi dua benda yang cuma
   mirip; menyalin koordinatnya ke sini akan membuat Short-nya kosong di kanan.

   Jadi: komponen DIIMPOR, koordinat DITULIS ULANG di sini.

   Berkas ini tinggal di `scene-shorts/`, DI LUAR folder scene-nya — `npm run
   sisa` memeriksa setiap `.tsx` di dalam folder scene terhadap daftar kunci
   dari naskah, jadi berkas bantu yang tinggal di sana dilaporkan sebagai nama
   yang tidak dikenal (CLAUDE.md HARD RULE 1).

   ARAHNYA MEMUTAR 90°: di video panjang kiri = pengirim, kanan = penerima. Di
   9:16 tidak ada ruang mendatar untuk itu, jadi jalurnya TEGAK — atas =
   pengirim, bawah = penerima. Perputaran itu disengaja dan konsisten di
   keempat Short; yang tidak boleh cuma satu Short memutar arahnya sendiri.

   TIGA JALUR tetap tiga, sama seperti video panjang — karena Short 2 seluruhnya
   soal potongan yang menempuh jalan berbeda-beda, dan dua jalur tidak cukup
   untuk membuat "berbeda-beda" terbaca.
*/
import type React from "react";

import { SIMPUL_LATAR } from "../panggung-jaringan";

/** Kanvas Short. Dipakai sebagai viewBox di tiap scene. */
export const W = 1080;
export const H = 1920;

/** Tiga jalur TEGAK. Indeks 1 (tengah) adalah jalur "biasa" — dipakai scene
 *  yang cuma butuh satu. */
export const JALUR_X = [280, 540, 800] as const;
export const JALUR_UTAMA = JALUR_X[1];

/** Ujung jalur. Batas atasnya dipatok teks layar (yang tinggal di sepertiga
 *  atas), batas bawahnya oleh 15% paling bawah yang dipakai judul dan tombol
 *  antarmuka YouTube — bukan oleh selera. */
export const Y_ATAS = 700;
export const Y_BAWAH = 1520;

/** Simpul di sepanjang jalur. Jaraknya DITULIS, tidak diacak: `Math.random()`
 *  menghasilkan gambar berbeda tiap frame saat render paralel. */
export const SIMPUL_Y = [880, 1110, 1340] as const;

/** Simpul latar. Diturunkan dari daftar yang sama dengan video panjang lalu
 *  DIPUTAR — bukan ditulis ulang, supaya jaringan latarnya tetap terasa berasal
 *  dari tempat yang sama walau bingkainya berbeda. */
export const LATAR = SIMPUL_LATAR.map((s) => ({
  x: (s.y / 1080) * W,
  y: (s.x / 1920) * H,
}));

/** Kamera 9:16 — sama bentuknya dengan yang di video panjang, tapi titik
 *  tengahnya beda karena kanvasnya beda. Ditulis di sini supaya tidak ada scene
 *  Short yang memanggil versi 16:9-nya dan diam-diam bertumpu di titik salah. */
export const kamera = (skala: number, cx = W / 2, cy = H / 2): string =>
  `translate(${cx} ${cy}) scale(${skala}) translate(${-cx} ${-cy})`;

/** Nyala satu simpul saat potongan melewatinya — fungsi murni dari POSISI
 *  potongan, bukan dari waktu. Simpul menyala karena ada yang lewat, jadi
 *  nyalanya tidak pernah meleset saat satu kalimat VO berubah dan seluruh
 *  timing bergeser. */
export const nyalaSimpul =
  (yPotongan: number) =>
  (i: number): number =>
    Math.max(0, 1 - Math.abs(yPotongan - (SIMPUL_Y[i] ?? -1e9)) / 170);

/** Jaringan tegak. Bentuknya sengaja seiras dengan `JaringLatar` 16:9 — titik
 *  latar, jalur putus-putus, simpul bulat, tanpa satu huruf pun. */
export const JaringanTegak: React.FC<{
  /** Jalur mana saja yang digambar. Baku: ketiganya. */
  jalur?: readonly number[];
  luas?: number;
  nyala?: (i: number) => number;
  opacity?: number;
}> = ({ jalur = [0, 1, 2], luas = 1, nyala, opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <g opacity={0.5 * luas}>
      {LATAR.map((s) => (
        <circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} r={8} fill="var(--line)" />
      ))}
    </g>

    {jalur.map((j) => (
      <line
        key={j}
        x1={JALUR_X[j]}
        y1={Y_ATAS}
        x2={JALUR_X[j]}
        y2={Y_BAWAH}
        stroke="var(--line)"
        strokeWidth={7}
        strokeDasharray="20 24"
        strokeLinecap="round"
      />
    ))}

    {jalur.map((j) =>
      SIMPUL_Y.map((y, i) => {
        const n = nyala ? nyala(i) : 0;
        return (
          <g key={`${j}-${y}`}>
            <circle
              cx={JALUR_X[j]}
              cy={y}
              r={15 + 18 * n}
              fill="var(--accent-ink)"
              opacity={0.28 * n}
            />
            <circle
              cx={JALUR_X[j]}
              cy={y}
              r={15}
              fill={n > 0.5 ? "var(--accent-ink)" : "var(--ink-2)"}
            />
          </g>
        );
      }),
    )}
  </g>
);

/** Teks di layar — WAJIB di Shorts, karena mayoritas penonton menonton tanpa
 *  suara (docs/02 § Aturan Shorts). Ini padanan RINGKAS kalimat VO-nya, bukan
 *  transkrip penuh: transkrip penuh di 9:16 memakan sepertiga tinggi frame.
 *
 *  Ditaruh di SEPERTIGA ATAS, di luar jalur benda utamanya, dan tidak pernah di
 *  15% paling bawah — di situ letak judul dan tombol antarmuka YouTube. */
export const TeksLayar: React.FC<{
  baris: readonly string[];
  y?: number;
  opacity?: number;
  transform?: string;
  warna?: string;
  ukuran?: number;
}> = ({
  baris,
  y = 250,
  opacity = 1,
  transform,
  warna = "var(--ink-0)",
  ukuran = 62,
}) => (
  /* Jarak antarbaris 1,34x, bukan 1,18x: pada 1,18 kotak glif dua baris saling
     mengiris dan `npm run tumpang` melaporkannya — bukan cacat yang terlihat
     mata, tapi ia menandai baris yang memang terlalu rapat untuk dibaca sekilas
     di feed. */
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

/** Perangkat tujuan di ujung BAWAH jalur — bentuk sederhana, bukan `Server`
 *  16:9 yang diperkecil. Di 9:16 ia cuma perlu terbaca sebagai "tempat sampai";
 *  detail rak yang tidak terbaca di layar HP cuma jadi bising. */
export const Tujuan: React.FC<{
  y?: number;
  nyala?: number;
  opacity?: number;
}> = ({ y = 1680, nyala = 0, opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <rect
      x={W / 2 - 170}
      y={y - 130}
      width={340}
      height={230}
      rx={18}
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={6}
    />
    <rect
      x={W / 2 - 130}
      y={y - 90}
      width={260}
      height={150}
      rx={8}
      fill="var(--bg)"
      opacity={0.8}
    />
    <circle cx={W / 2} cy={y - 15} r={26} fill="var(--ok)" opacity={0.25 + 0.75 * nyala} />
  </g>
);

/* ===========================================================================
   Barisan slot penerima — dipakai SELURUH Short 3

   Koordinatnya tinggal di sini, bukan di salah satu berkas scene: kalau ia
   diekspor dari `1-lima-potongan.tsx`, scene 2 sampai 5 harus mengimpor dari
   berkas scene, dan `npm run sisa` memeriksa tiap `.tsx` di folder scene
   terhadap daftar kunci naskah — berkas scene yang jadi pustaka bersama adalah
   dua peran di satu berkas. Slot yang bergeser satu piksel pun antar-scene
   membatalkan seluruh Short 3, jadi angkanya cuma boleh ada di SATU tempat.
   ======================================================================== */

export const N_SLOT = 5;

/** Tinggi barisan slot.
 *
 *  1360, BUKAN 1560. Pada 1560 barisannya jatuh persis di belakang kotak
 *  subtitel preview dan cuma 70 px di atas 15% paling bawah — zona judul dan
 *  tombol antarmuka YouTube (docs/02). `npm run tumpang` tidak menangkapnya
 *  karena subtitel hidup di luar pohon yang diukurnya; yang menemukannya render
 *  still. Barisan ini benda terpenting di Short 3, jadi ia tidak boleh berbagi
 *  ruang dengan apa pun. */
export const Y_SLOT = 1360;
export const LEBAR_SLOT = 190;

export const slotX = (i: number): number =>
  W / 2 + (i - (N_SLOT - 1) / 2) * LEBAR_SLOT;

/** Slot yang belum terisi. Digambar putus-putus supaya lubangnya terbaca
 *  sebagai tempat yang MENUNGGU, bukan sebagai tempat yang tidak ada. */
export const SlotKosong: React.FC<{ i: number; warna?: string }> = ({
  i,
  warna = "var(--line)",
}) => (
  <rect
    x={slotX(i) - 72}
    y={Y_SLOT - 56}
    width={144}
    height={112}
    rx={12}
    fill="none"
    stroke={warna}
    strokeWidth={4}
    strokeDasharray="10 10"
    aria-hidden
  />
);

/** Sumber di ujung ATAS jalur. Sepasang dengan `Tujuan` dan sengaja SEBENTUK
 *  dengannya — yang membedakan keduanya cuma tempatnya di jalur, dan itu yang
 *  membuat arah atas → bawah terbaca tanpa satu panah pun. */
export const Sumber: React.FC<{
  y?: number;
  nyala?: number;
  opacity?: number;
}> = ({ y = 480, nyala = 1, opacity = 1 }) => (
  <g opacity={opacity} aria-hidden>
    <rect
      x={W / 2 - 170}
      y={y - 130}
      width={340}
      height={230}
      rx={18}
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={6}
    />
    <rect
      x={W / 2 - 130}
      y={y - 90}
      width={260}
      height={150}
      rx={8}
      fill="var(--bg)"
      opacity={0.8}
    />
    <circle cx={W / 2} cy={y - 15} r={26} fill="var(--accent)" opacity={0.25 + 0.75 * nyala} />
  </g>
);
