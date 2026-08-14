/* Kosakata visual bersama Short 2 "Jebakan" — 1080x1920.

   Dipakai bersama oleh SEMBILAN scene di s2-jebakan/, dan sengaja ditaruh SATU
   TINGKAT DI ATAS folder scene-nya — alasannya sama dengan ../panggung-analogi.tsx
   di video panjang: `npm run sisa` memeriksa setiap .tsx di dalam folder scene
   terhadap daftar kunci dari naskah, jadi berkas bantu yang tinggal di sana akan
   dilaporkan sebagai nama yang tidak dikenal.

   YANG PALING PENTING DI BERKAS INI ADALAH IRAMA TANGAN.

   Scene 4 dan 5 memasang irama tetap, scene 7 mematahkannya — dan patahnya itu
   satu-satunya bukti yang dipunya Short ini. Karena itu iramanya hidup di SATU
   konstanta di sini dan dibaca ketiga scene. Mengetiknya ulang di salah satu
   scene akan membuat perbandingan itu meleset beberapa frame, dan beberapa
   frame sudah cukup: mata penonton akan membaca "jadi lebih cepat" dan kalimat
   VO-nya langsung terdengar bohong.
*/
import type React from "react";

import { E, t } from "../../../shared/anim";
import { Ic } from "../../../shared/Icons";

/* --- koordinat ------------------------------------------------------------- */

export const X_TENGAH = 540;

/** Permukaan meja. Berkas berdiri DI ATAS garis ini. */
export const Y_MEJA = 1000;

/** Lebar meja: normal dan setelah dilebarkan 2x. 840 masih muat di kotak aman
 *  x 90–990 (docs/03); lebih dari itu terpotong UI YouTube. */
export const MEJA = { w: 420, h: 26, wLebar: 840 };

export const BERKAS = { w: 76, h: 104 };

/** Empat berkas keadaan "longgar", di paruh kiri meja. Sisa ruang di kanan
 *  kira-kira selebar satu berkas — itu yang disorot scene 4 sebagai "masih
 *  muat", dan yang tinggal kosong di scene 5 setelah mejanya dilebarkan. */
export const X_BERKAS = [375, 460, 545, 630] as const;

/** Sudut miring tiap berkas — KONSTANTA, bukan acak. `Math.random()` dilarang
 *  (CLAUDE.md § Deterministik): ia akan berbeda tiap frame yang dirender, dan
 *  Remotion merender frame 1.234 tanpa pernah merender 1.233. */
export const MIRING = [-3, 2, -1.5, 3.5] as const;

/** Keadaan "penuh": delapan berkas rapat memenuhi meja selebar MEJA.w.
 *  Lebarnya DITURUNKAN dari lebar meja, bukan diketik — kalau MEJA.w berubah,
 *  kerapatannya ikut. Dipakai scene 6, 7, dan 9. */
export const N_PENUH = 8;
const SELA = 6;
export const W_PENUH = (MEJA.w - SELA * (N_PENUH + 1)) / N_PENUH;
export const X_PENUH = Array.from(
  { length: N_PENUH },
  (_, i) => X_TENGAH - MEJA.w / 2 + SELA + W_PENUH / 2 + i * (W_PENUH + SELA),
);

/** Gudang mengintip di tepi bawah. Ia sudah ada sejak scene 3 dan cuma belum
 *  dipakai — tanpa itu, gudang di scene 7 datang entah dari mana. */
export const Y_GUDANG = 1330;
export const Y_GUDANG_NAIK = 1180;
export const GUDANG = { w: 220, h: 240, n: 4 };

/* --- irama tangan ---------------------------------------------------------- */

/** Jeda antar-lompatan tangan, detik. Metronom: tidak melambat, tidak menunggu.
 *  Scene 7 menambahkan jeda tunggu DI ATAS irama ini, bukan menggantinya. */
export const IRAMA = 0.42;
/** Lama satu lompatan. */
export const LOMPAT = 0.18;

/** Urutan berkas yang dikerjakan tangan. Bolak-balik, bukan berputar satu arah:
 *  yang digambarkan orang bekerja, bukan mesin yang menyapu. Sama untuk scene
 *  4, 5, dan 7 — bagian dari irama yang jadi alat ukur itu. */
export const URUTAN = [0, 1, 2, 3, 2, 1] as const;

/** Indeks berkas yang sedang dituju tangan pada detik `d`, beserta pecahan
 *  perjalanannya. Fungsi murni dari waktu — tidak ada indeks yang disimpan
 *  antar-frame. */
export const langkahTangan = (
  d: number,
  mulai: number,
  urutan: readonly number[],
): { dari: number; ke: number; u: number } => {
  const lewat = Math.max(0, d - mulai);
  const i = Math.floor(lewat / IRAMA);
  const dalam = lewat - i * IRAMA;
  const u = t(dalam, { mulai: 0, durasi: LOMPAT, dari: 0, ke: 1, ease: E.power2out });

  const n = urutan.length;
  const dari = urutan[i % n] ?? 0;
  const ke = urutan[(i + 1) % n] ?? 0;
  return { dari, ke, u };
};

/* --- hitungan bolak-balik -------------------------------------------------- */

/** Satu putaran bolak-balik, detik. */
export const PERIODE_BALIK = 1.1;

/** Berapa kali sudah bolak-balik setelah `lewat` detik. Turunan murni dari
 *  waktu — tidak ada penghitung yang menyimpan state.
 *
 *  Dipakai scene 7 (kecil di sudut) dan scene 8 (besar di tengah). Angka yang
 *  muncul di scene 8 wajib kelanjutan dari scene 7, bukan angka baru yang
 *  kebetulan mirip — jadi keduanya membaca fungsi yang sama. */
export const hitungBalik = (lewat: number): number =>
  Math.max(1, Math.floor(Math.max(0, lewat) / PERIODE_BALIK) + 1);

/* --- bagian panggung ------------------------------------------------------- */

export const Meja: React.FC<{
  lebar?: number;
  opacity?: number;
  geser?: number;
}> = ({ lebar = MEJA.w, opacity = 1, geser = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: X_TENGAH - lebar / 2,
      top: Y_MEJA,
      opacity,
      transform: `translateY(${geser}px)`,
    }}
  >
    {/* .meja membawa kakinya sendiri lewat ::after (shared/figur.css) */}
    <div className="meja" style={{ width: lebar, height: MEJA.h }} />
  </div>
);

export const Berkas: React.FC<{
  x: number;
  w?: number;
  miring?: number;
  opacity?: number;
  /** Geser tegak dari permukaan meja — dipakai berkas yang menggantung. */
  angkat?: number;
  terang?: boolean;
}> = ({ x, w = BERKAS.w, miring = 0, opacity = 1, angkat = 0, terang = false }) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: Y_MEJA - BERKAS.h - angkat,
      width: w,
      height: BERKAS.h,
      borderRadius: 8,
      border: `3px solid ${terang ? "var(--accent)" : "var(--ink-1)"}`,
      background: terang ? "var(--accent-soft)" : "var(--bg-elev)",
      opacity,
      transform: `rotate(${miring}deg)`,
      transformOrigin: "bottom center",
    }}
  />
);

/** Penanda tangan — lingkaran + tangkai. Sengaja sederhana: yang harus terbaca
 *  IRAMANYA, dan bentuk yang detail justru menarik mata ke bentuknya. */
export const Tangan: React.FC<{ x: number; opacity?: number }> = ({
  x,
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: x - 26,
      top: Y_MEJA - BERKAS.h - 130,
      width: 52,
      opacity,
    }}
  >
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "5px solid var(--ok)",
      }}
    />
    <div
      style={{
        margin: "0 auto",
        width: 5,
        height: 46,
        background: "var(--ok)",
        borderRadius: 3,
      }}
    />
  </div>
);

export const Gudang: React.FC<{ y?: number; opacity?: number }> = ({
  y = Y_GUDANG,
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: X_TENGAH - GUDANG.w / 2,
      top: y,
      opacity,
    }}
  >
    <div className="lemari" style={{ width: GUDANG.w, height: GUDANG.h }}>
      {Array.from({ length: GUDANG.n }, (_, i) => (
        <div key={i} className="laci" />
      ))}
    </div>
    <p
      className="t-label"
      style={{
        marginTop: 12,
        textAlign: "center",
        fontFamily: "var(--font-mono)",
        color: "var(--ink-2)",
      }}
    >
      gudang
    </p>
  </div>
);

/* --- kalimat mitosnya ------------------------------------------------------ */

/** Kalimat yang dibantah Short ini, beserta batang ram yang bertambah di
 *  belakangnya. Dipakai scene 1 (masuk), 2 (dicoret), dan 3 (keluar) — jadi ia
 *  hidup di sini, bukan disalin tiga kali.
 *
 *  Warnanya netral, BUKAN aksen. Aksen di Short ini dipakai untuk yang benar;
 *  mitosnya tidak boleh tampil sebagai kesimpulan. */
export const KATA_MITOS = ["RAM", "lebih besar", "=", "lebih cepat"] as const;

/** Geometri kalimat mitos, dipakai 02-salah untuk menaruh coretan dan
 *  keterangannya. DIEKSPOR, bukan ditebak ulang di sana: versi pertama scene 2
 *  memakai angka tangan, dan coretannya mendarat di antara dua baris sementara
 *  keterangannya menimpa baris kedua — kesalahan yang lolos tsc dan lolos
 *  `check`, dan cuma terlihat setelah still-nya dibuka. */
export const MITOS_GEO = {
  /** Tepi atas baris pertama. 300 (atas blok) + 160 (tinggi ikon ram) + 30. */
  yTeks: 490,
  tinggiBaris: 96,
  baris: 2,
  xKiri: 140,
  lebar: 800,
} as const;

export const Mitos: React.FC<{
  /** Opasitas per kata, 0..1 — dipakai scene 1 untuk memasukkannya per kata. */
  kata?: (i: number) => number;
  opacity?: number;
  geser?: number;
  redup?: number;
}> = ({ kata = () => 1, opacity = 1, geser = 0, redup = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: 90,
      right: 90,
      top: 300,
      opacity,
      transform: `translateY(${geser}px)`,
    }}
  >
    {/* Batang ram bertambah di belakang kalimatnya — itu yang dijanjikan
        mitosnya, dan ia harus terlihat sebelum dibantah.

        Ikon `ram` dari shared/Icons.tsx, BUKAN persegi panjang kosong: versi
        pertama scene ini memakai kotak polos, dan hasilnya scene yang isinya
        cuma teks + empat kotak — pelanggaran HARD RULE 2 yang cuma ketahuan
        setelah still-nya dibuka. */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 4,
        marginBottom: 30,
        opacity: redup,
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            opacity: kata(i),
            transform: `translateY(${(1 - kata(i)) * 24}px)`,
          }}
        >
          <Ic n="ram" warna={i === 3 ? "c-accent" : "c-mute"} />
        </div>
      ))}
    </div>

    <p
      style={{
        textAlign: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        /* Diturunkan dari --fs-display penuh: pada 120px kalimatnya pecah jadi
           tiga baris dan tanda "=" jatuh sendirian di awal baris. */
        fontSize: "calc(var(--fs-display) * 0.72)",
        lineHeight: 1.12,
        color: "var(--ink-0)",
      }}
    >
      {KATA_MITOS.map((w, i) => (
        <span key={w} style={{ opacity: kata(i) }}>
          {w}
          {i === 1 ? <br /> : " "}
        </span>
      ))}
    </p>
  </div>
);

export { TeksAtas } from "./teks-atas";
