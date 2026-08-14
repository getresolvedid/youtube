/* Kosakata visual bersama Short 1 "Nugget" — 1080x1920.

   Dipakai bersama oleh SEMBILAN scene di s1-nugget/, dan sengaja ditaruh SATU
   TINGKAT DI ATAS folder scene-nya. Alasannya sama dengan ../panggung-analogi.tsx
   di video panjang: `npm run sisa` memeriksa setiap .tsx di dalam folder scene
   terhadap daftar kunci dari naskah, jadi berkas bantu yang tinggal di sana akan
   dilaporkan sebagai nama yang tidak dikenal.

   Yang hidup di sini cuma yang dipakai LEBIH DARI SATU scene: koordinat panggung,
   ketiga tempat, jam, kalender, dan hitungan diam. Koreografi tiap scene tetap
   di berkas scene-nya masing-masing.

   TATA LETAK — kotak aman 9:16 adalah x 90-990 dan y 240-1480 (docs/03).
   Ketiga tempat berdiri di satu sumbu TEGAK karena di 9:16 jarak dibaca dari
   atas ke bawah; kolom angka berdiri di kanannya supaya ketiga waktunya bisa
   ada di layar bersamaan (itu insight Short ini — lihat 04-meja-nempel-direction.md).
*/
import type React from "react";

import { E, t, tPP } from "../../../shared/anim";
import { Ic } from "../../../shared/Icons";

/* --- koordinat ------------------------------------------------------------- */

/** Sumbu tegak tempat ketiga tempat berdiri. Digeser ke kiri dari tengah, tapi
 *  TIDAK sampai mepet: di kiri masih harus muat kolom nama (07-namanya) dan di
 *  kanan kolom angka. Ketiganya berbagi lebar 900px kotak aman, jadi menggeser
 *  sumbu ini berarti memeriksa ulang kedua kolom itu. */
export const X_KOLOM = 480;

/* JARAK ANTAR-TEMPAT ADALAH ISI SHORT INI, jadi tumpukan tegaknya memakai
   seluruh tinggi yang tersisa — bukan sekadar muat.

   Anggarannya: teks berhenti sekitar y 420 (dua baris), alat ukur mengambil
   pojok kiri bawah, dan sisanya milik ketiga tempat. Yang menempel di chip
   memang harus rapat (itu artinya "menempel"); dua celah sesudahnya yang lebar,
   dan keduanya sengaja SAMA — urutannya yang digambar, besarannya dipikul angka
   di kolom kanan. Skala sesungguhnya tidak bisa digambar: tiga bulan berbanding
   satu detik adalah hampir sembilan juta kali (naskah.md § Sumber).

   Versi pertama menaruh keempatnya dalam 680px dan hasilnya terbaca sebagai
   tumpukan, bukan sebagai jarak. */
export const Y_CHIP = 520;
export const Y_NEMPEL = 655;
export const Y_MEJA = 900;
export const Y_LEMARI = 1150;

export const NEMPEL = { sisi: 110 };
/** Meja sengaja lebih sempit daripada versi awalnya (420): tepi kirinya harus
 *  menyisakan ruang untuk label nama di 07-namanya. */
export const MEJA = { w: 360, h: 28 };
export const LEMARI = { w: 200, h: 220, n: 4 };

/** Kolom angka: 1 detik · 1 menit · 3 bulan, sejajar dengan tempatnya. */
export const X_ANGKA = 700;
export const Y_ANGKA = [Y_NEMPEL, Y_MEJA, Y_LEMARI] as const;

/** Alat ukur. Jam dan kalender menempati titik yang sama — yang satu menggantikan
 *  yang lain di 06-gudang, dan itu keputusan direction, bukan tata letak. */
/** Alat ukur berdiri di KIRI bawah, bukan di bawah kolom angka: lembar kalender
 *  yang terbalik menjulur ~190px ke atas dari kartunya, dan di kolom kanan itu
 *  mendarat tepat di atas angka "3 bulan". */
export const X_UKUR = 250;
export const Y_UKUR = 1380;
export const R_JAM = 95;

/** Hitungan diam, di SEBELAH KANAN chip — bukan di bawahnya. Di bawah chip ada
 *  tempat pertama yang menempel padanya (Y_NEMPEL), dan scene 8 menampilkan
 *  keduanya sekaligus. Posisinya dipakai scene 1, 2, 8, dan 9; scene 9 wajib
 *  mendaratkannya di tempat yang sama persis dengan scene 1, karena di situlah
 *  loop Short ini menyambung (09-loop-direction.md). */
export const Y_HITUNG = Y_CHIP - 22;
export const X_HITUNG = X_KOLOM + 140;

/* --- chip ------------------------------------------------------------------ */

/** Denyut dua kali lalu BERHENTI. Pola yang sama dipakai scene 1 dan scene 9;
 *  keduanya membacanya dari sini supaya frame pertama dan frame terakhir Short
 *  benar-benar identik, bukan cuma mirip. */
export const denyutChip = (d: number, mulai: number): number =>
  1 +
  tPP(d, { mulai, durasi: 0.34, dari: 0, ke: 0.05 }) +
  tPP(d, { mulai: mulai + 0.42, durasi: 0.34, dari: 0, ke: 0.05 });

export const Chip: React.FC<{ skala?: number; redup?: boolean }> = ({
  skala = 1,
  redup = false,
}) => (
  <div
    style={{
      position: "absolute",
      left: X_KOLOM - 120,
      top: Y_CHIP - 120,
      width: 240,
      height: 240,
      display: "grid",
      placeItems: "center",
      transform: `scale(${skala})`,
      transformOrigin: "center",
    }}
  >
    <Ic n="chip" ukuran="lg" warna={redup ? "c-mute" : "c-accent"} />
  </div>
);

/** Detik ke berapa di dalam 01-menunggu hitungan diam mulai berjalan. Dibaca
 *  juga oleh scene 2 untuk melanjutkan angkanya, dan oleh scene 9 untuk
 *  mendaratkannya kembali — supaya tidak ada satu pun scene yang menebak angka
 *  awal tetangganya. */
export const T_DIAM = 0.9;

/** Lompatan hitungan diam di 02-sekejap. Dibaca juga oleh 08-sekali-jalan untuk
 *  menurunkan angka yang dibekukannya — supaya angka yang muncul lagi di sana
 *  adalah kelanjutan yang sama, bukan angka baru yang kebetulan mirip. */
export const LOMPAT_DIAM = 18;

/** Hitungan detik diam. `nilai` dihitung scene-nya sendiri sebagai fungsi murni
 *  dari frame — tidak ada penghitung yang menyimpan state, dan membekukannya
 *  (08-sekali-jalan) cukup dengan berhenti menaikkan nilainya. */
export const HitunganDiam: React.FC<{
  nilai: number;
  opacity?: number;
}> = ({ nilai, opacity = 1 }) => (
  <p
    className="t-label"
    style={{
      position: "absolute",
      left: X_HITUNG,
      top: Y_HITUNG,
      width: 990 - X_HITUNG,
      textAlign: "left",
      fontFamily: "var(--font-mono)",
      color: "var(--warn)",
      opacity,
    }}
  >
    diam {Math.max(0, nilai).toFixed(1)} dtk
  </p>
);

/* --- tiga tempat ----------------------------------------------------------- */

export type Tempat = "nempel" | "meja" | "lemari";

const warnaTempat = (nyala: boolean) => (nyala ? "var(--accent)" : "var(--ink-2)");

/** Satu tempat + garis jarak ke tempat di bawahnya.
 *
 *  `m` (0..1) mengatur masuknya — dipakai 03-satu-detik untuk memunculkan
 *  ketiganya berurutan dari atas ke bawah; scene sesudahnya memberi 1.
 *  `terang` menentukan mana yang sedang dibicarakan; scene 7 menyalakan semua. */
export const TigaTempat: React.FC<{
  m?: (i: number) => number;
  terang: (t: Tempat) => boolean;
  /** Panjang garis penghubung, 0..1. */
  garis?: number;
  /** Membubarkan seluruh kelompok (09-loop). Prop, bukan pembungkus
   *  ber-transform — alasannya sama dengan <Jam>. */
  opacity?: number;
  geser?: number;
}> = ({ m = () => 1, terang, garis = 1, opacity = 1, geser = 0 }) => (
  <div style={{ position: "absolute", inset: 0, opacity }}>
    {/* garis jarak — digambar duluan supaya ia di belakang ketiga tempat */}
    <div
      style={{
        position: "absolute",
        left: X_KOLOM - 2,
        top: Y_NEMPEL + NEMPEL.sisi / 2,
        width: 4,
        height: (Y_LEMARI - LEMARI.h / 2 - (Y_NEMPEL + NEMPEL.sisi / 2)) * garis,
        background: "var(--ink-2)",
        opacity: 0.7,
      }}
    />

    {/* 1 · menempel di chip */}
    <div
      style={{
        position: "absolute",
        left: X_KOLOM - NEMPEL.sisi / 2,
        top: Y_NEMPEL - NEMPEL.sisi / 2,
        width: NEMPEL.sisi,
        height: NEMPEL.sisi,
        borderRadius: 14,
        border: `4px solid ${warnaTempat(terang("nempel"))}`,
        background: terang("nempel") ? "var(--accent-soft)" : "transparent",
        opacity: m(0),
        transform: `translateY(${(1 - m(0)) * 40 + geser}px)`,
      }}
    />

    {/* 2 · meja kerja */}
    <div
      style={{
        position: "absolute",
        left: X_KOLOM - MEJA.w / 2,
        top: Y_MEJA - MEJA.h / 2,
        opacity: m(1),
        transform: `translateY(${(1 - m(1)) * 40 + geser}px)`,
      }}
    >
      <div
        className="meja"
        style={{
          width: MEJA.w,
          height: MEJA.h,
          background: warnaTempat(terang("meja")),
        }}
      />
    </div>

    {/* 3 · lemari arsip di gudang */}
    <div
      style={{
        position: "absolute",
        left: X_KOLOM - LEMARI.w / 2,
        top: Y_LEMARI - LEMARI.h / 2,
        opacity: m(2),
        transform: `translateY(${(1 - m(2)) * 40 + geser}px)`,
      }}
    >
      <div
        className="lemari"
        style={{
          width: LEMARI.w,
          height: LEMARI.h,
          borderColor: warnaTempat(terang("lemari")),
        }}
      >
        {Array.from({ length: LEMARI.n }, (_, i) => (
          <div key={i} className="laci" />
        ))}
      </div>
    </div>
  </div>
);

/* --- alat ukur ------------------------------------------------------------- */

/** Muka jam dengan satu jarum. Sudut dalam derajat, 0 = jam dua belas. */
export const Jam: React.FC<{
  sudut: number;
  skala?: number;
  opacity?: number;
  /** Geseran dari titik alat ukur. DIJADIKAN PROP, bukan pembungkus ber-transform:
   *  elemen ber-transform menjadi containing block untuk anak yang
   *  position:absolute, jadi <Jam> di dalamnya akan berpindah ke koordinat
   *  pembungkusnya — dan itu bug yang lolos tsc, lolos `check`, dan cuma
   *  terlihat kalau still-nya dibuka. */
  dx?: number;
  dy?: number;
}> = ({ sudut, skala = 1, opacity = 1, dx = 0, dy = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: X_UKUR - R_JAM + dx,
      top: Y_UKUR - R_JAM + dy,
      width: R_JAM * 2,
      height: R_JAM * 2,
      borderRadius: "50%",
      border: "5px solid var(--ink-1)",
      opacity,
      transform: `scale(${skala})`,
      transformOrigin: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: R_JAM - 3,
        top: 18,
        width: 6,
        height: R_JAM - 22,
        borderRadius: 3,
        background: "var(--accent-ink)",
        transformOrigin: "50% 100%",
        transform: `rotate(${sudut}deg)`,
      }}
    />
    <i
      style={{
        position: "absolute",
        left: R_JAM - 7,
        top: R_JAM - 7,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: "var(--ink-0)",
      }}
    />
  </div>
);

/** Kalender yang membalik lembar. `lembar` pecahan: 0 = lembar pertama utuh,
 *  3 = tiga lembar sudah terbalik. Dipakai HANYA di 06-gudang dan 08-sekali-jalan
 *  — jam diganti kalender justru supaya "di luar skala tadi" terbaca sebagai
 *  ganti alat ukur, bukan sebagai putaran jam yang kesekian. */
export const Kalender: React.FC<{ lembar: number; opacity?: number }> = ({
  lembar,
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: X_UKUR - 90,
      top: Y_UKUR - 100,
      width: 180,
      height: 200,
      opacity,
    }}
  >
    {[0, 1, 2, 3].map((i) => {
      /* Lembar i terbalik saat `lembar` melewati i. Tiap lembar fungsi murni
         dari nilainya, jadi seek ke frame mana pun benar. */
      const u = Math.min(1, Math.max(0, lembar - i));
      return (
        <div
          key={i}
          /* Keempat lembar memang bertumpuk di titik yang sama — itulah bentuk
             kalender sobek. Yang terlihat cuma yang paling atas. */
          data-tumpang="sengaja"
          style={{
            position: "absolute",
            inset: 0,
            /* Lembar yang paling awal terbalik harus paling ATAS — kalau tidak,
               balikannya terjadi di belakang lembar terakhir dan tidak
               kelihatan sama sekali. */
            zIndex: 10 - i,
            borderRadius: 14,
            border: "4px solid var(--ink-1)",
            background: "var(--bg-elev)",
            transformOrigin: "50% 0%",
            transform: `perspective(600px) rotateX(${-160 * u}deg)`,
            opacity: 1 - u * 0.9,
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 64,
            color: "var(--ink-1)",
          }}
        >
          {/* Lembar yang terlihat menunjukkan sudah berapa bulan berlalu — jadi
              setelah tiga balikan yang terbaca "3". */}
          {i}
        </div>
      );
    })}
  </div>
);

/* --- kolom angka ----------------------------------------------------------- */

export const ANGKA = ["1 detik", "1 menit", "3 bulan"] as const;

/** Ketiga waktu, sejajar dengan tempatnya masing-masing.
 *
 *  Angkanya MENUMPUK, tidak saling menggantikan: insight Short ini adalah
 *  selisih ketiganya, dan selisih tidak bisa dibaca kalau angkanya tidak pernah
 *  ada di layar bersamaan. */
export const KolomAngka: React.FC<{ d: number; mulai: readonly number[] }> = ({
  d,
  mulai,
}) => (
  <>
    {ANGKA.map((teks, i) => {
      const m = mulai[i];
      const y = Y_ANGKA[i];
      if (m === undefined || y === undefined) return null;
      return (
        <p
          key={teks}
          style={{
            position: "absolute",
            left: X_ANGKA,
            top: y - 34,
            width: 290,
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1.2,
            color: "var(--accent-ink)",
            opacity: t(d, { mulai: m, durasi: 0.3, dari: 0, ke: 1 }),
            transform: `scale(${t(d, {
              mulai: m,
              durasi: 0.4,
              dari: 0.6,
              ke: 1,
              ease: E.backOut(1.6),
            })})`,
            transformOrigin: "left center",
          }}
        >
          {teks}
        </p>
      );
    })}
  </>
);

/* --- teks di layar --------------------------------------------------------- */

/* Teks besar sepertiga atas dipakai KEDUA Short, jadi ia tinggal di berkasnya
   sendiri — lihat ./teks-atas.tsx untuk alasan posisinya. Diekspor ulang di sini
   supaya scene Short 1 tetap punya satu pintu impor. */
export { TeksAtas } from "./teks-atas";
