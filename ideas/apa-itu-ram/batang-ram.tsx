/* Bentuk fisik RAM — dipakai bersama `ram-bentuk` (scene 7), `ram-generasi`
   (scene 8), dan titik serahnya lewat `beda-penyimpanan` (scene 9) ke
   `ram-tugas` (scene 10).

   Dua scene pertama menggambar BENDA YANG SAMA. `ram-bentuk` menancapkannya ke
   empat tempat berbeda; `ram-generasi` mengambil satu di antaranya dan
   mendekatkan kameranya ke deretan kaki. Kalau keduanya menggambar batangnya
   sendiri-sendiri, potongan di antaranya berhenti terbaca sebagai "benda yang
   sama dilihat lebih dekat" dan jadi "dua ilustrasi yang mirip". `ram-tugas`
   meneruskan rantai itu satu langkah lagi: batang yang sama MELEBAR jadi papan
   meja, jadi kotak terakhirnya ikut tinggal di sini (KOTAK_TERTAHAN).

   Berkas ini SENGAJA di luar `scenes/` — `npm run sisa` memeriksa setiap `.tsx`
   di sana terhadap daftar kunci dari naskah (HARD RULE 5), jadi berkas bantu di
   dalamnya akan dilaporkan sebagai nama yang tidak dikenal. Sama seperti
   `panggung-analogi.tsx`.

   POSISI COAKAN DI SINI SKEMATIS. Bahwa posisinya berbeda antar generasi itu
   benar dan itulah gagasan scene 8; angka posisinya belum ditopang sumber primer
   (baris ⚠ JEDEC di naskah.md § Sumber). Ketiganya sengaja dibuat berjauhan
   supaya bedanya terbaca dari kursi penonton — ini bukan gambar teknik, dan VO
   tidak pernah menyebut ukuran, jadi tidak ada klaim angka yang menggantung.

   Jumlah kaki juga jauh lebih sedikit daripada aslinya: menggambar seluruh kaki
   pada lebar 300 px menghasilkan sisir abu-abu yang tidak terbaca sebagai kaki.
*/
import type React from "react";

/** Tinggi deretan kaki di bawah badan batang. */
export const TINGGI_KAKI = 14;
export const TINGGI_BATANG = 78;

/** Posisi coakan tiap generasi, 0..1 pada lebar batang — SKEMATIS, lihat kepala
 *  berkas. Yang benar-benar diklaim scene 8 cuma satu: ketiganya tidak sama. */
export const TAKIK = { ddr3: 0.3, ddr4: 0.45, ddr5: 0.62 } as const;

/* --- titik serah scene 7 -> scene 8 ----------------------------------------
   Frame pertama scene 8 = frame terakhir scene 7, tapi cuma satu bendanya yang
   dibawa: batang di kartu desktop. Koordinatnya tinggal di sini, bukan diketik
   dua kali — dua salinan angka yang wajib sama adalah dua angka yang akan
   berbeda dalam seminggu, dan melesetnya tidak akan terlihat sebagai error,
   cuma sebagai batang yang meloncat sedikit saat scene berganti. */

/** Pusat keempat kartu scene 7. */
export const X_KARTU = [300, 740, 1180, 1620] as const;
/** Garis dasar bersama keempat kartu: papan induk / papan sirkuit.
 *  Seluruh isi kartu digantung ke angka ini — tinggi kartu, tinggi duduknya
 *  batang, letak label, dan letak chip di kartu grafis semuanya turunan
 *  daripadanya, jadi menaik-turunkan barisan cukup mengubah satu angka. */
export const Y_PAPAN = 620;
export const W_PAPAN = 300;
export const TINGGI_SLOT = 28;
export const Y_SLOT = Y_PAPAN - TINGGI_SLOT;
/** Tepi atas badan batang saat sudah duduk di slotnya. Dihitung, bukan diketik:
 *  kalau tinggi kaki berubah, batangnya tetap duduk di mulut slot. */
export const Y_TANCAP = Y_SLOT + TINGGI_SLOT - TINGGI_KAKI - TINGGI_BATANG + 8;
export const W_DESKTOP = 300;

/* --- titik serah ram-generasi -> ram-tugas ---------------------------------
   Alasannya sama persis dengan blok di atas, cuma satu scene lebih jauh: frame
   pertama `ram-tugas` adalah frame terakhir `ram-generasi` — batang DDR5 yang
   tertahan di mulut slot lama — lalu batang itu MELEBAR jadi papan meja. Kalau
   kotak berangkatnya diketik ulang di scene berikutnya, morph-nya mulai
   beberapa piksel dari tempat batangnya berhenti, dan yang terbaca bukan "benda
   yang sama berubah bentuk" melainkan "ada benda lain yang muncul". */

/** Batang yang diperiksa dari dekat: rata kiri, jauh lebih lebar daripada saat
 *  ia masih duduk di kartu desktop. */
export const X_DEKAT = 620;
export const W_DEKAT = 680;
export const Y_SLOT_LAMA = 660;
/** Jarak batang yang tertahan ke mulut slot.
 *
 *  Aslinya nyaris nol — kunci slot cuma setinggi kaki, jadi batang yang salah
 *  berhenti beberapa milimeter di atas dudukannya. Di layar jarak sebesar itu
 *  tidak terbaca sebagai "tertahan", melainkan sebagai "sudah masuk". Angkanya
 *  DILEBIHKAN supaya celahnya terlihat dari kursi penonton; yang diklaim scene
 *  ram-generasi bukan seberapa jauh, melainkan bahwa ia berhenti. */
export const CELAH_TERTAHAN = 28;
/** Mundur kecil sesudah ditahan: ia terpantul balik, tidak menempel di kunci. */
export const MUNDUR_TERTAHAN = 18;
export const Y_TERTAHAN =
  Y_SLOT_LAMA - CELAH_TERTAHAN - TINGGI_KAKI - TINGGI_BATANG;

/** Kotak badan batang di frame TERAKHIR ram-generasi = kotak berangkat morph di
 *  frame PERTAMA ram-tugas. Dihitung dari angka di atas, bukan diketik. */
export const KOTAK_TERTAHAN = {
  kiri: X_DEKAT,
  atas: Y_TERTAHAN - MUNDUR_TERTAHAN,
  lebar: W_DEKAT,
  tinggi: TINGGI_BATANG,
} as const;

/* ===========================================================================
   Kisi sel — motif memori
   ======================================================================== */

/** Kisi kotak kecil: motif yang menandai "ini memori".
 *
 *  Bentuknya diturunkan langsung dari bidang kotak di `06-ram-size`, dan itu
 *  seluruh gunanya: ia muncul di dalam batang, di dalam chip ponsel, dan di
 *  dalam chip kartu grafis, sehingga empat benda yang wujudnya tidak mirip
 *  sama sekali terbaca sebagai benda yang sama. Itu kalimat terakhir scene 7,
 *  dan ia diucapkan oleh bentuk, bukan oleh teks.
 *
 *  `nyala` 0..1 — lapis aksen ditumpuk di atas sel abu-abu, bukan kelas yang
 *  ditukar: kelas cuma bisa hidup-mati, opasitas bisa jadi fungsi frame. */
export const Kisi: React.FC<{
  kolom: number;
  baris: number;
  sel: number;
  jeda?: number;
  nyala?: number;
}> = ({ kolom, baris, sel, jeda = 4, nyala = 0 }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${kolom}, ${sel}px)`,
      gap: jeda,
    }}
  >
    {Array.from({ length: kolom * baris }, (_, i) => (
      <div
        key={i}
        style={{
          position: "relative",
          width: sel,
          height: sel,
          borderRadius: Math.max(2, sel * 0.18),
          /* --line, bukan --bg: di dalam badan batang yang --bg-elev, sel
             sewarna latar terbaca sebagai lubang, bukan sebagai chip. */
          background: "var(--line)",
          border: "1px solid var(--ink-2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: Math.max(2, sel * 0.18),
            background: "var(--accent)",
            opacity: nyala,
          }}
        />
      </div>
    ))}
  </div>
);

/* ===========================================================================
   Batang (modul)
   ======================================================================== */

/** Satu batang RAM: badan berisi deretan chip, kaki di sisi bawah, dan satu
 *  coakan di deretan kaki itu.
 *
 *  Titik acuannya KIRI-ATAS badan, bukan pusatnya — batang di scene 8 dibaca
 *  sebagai deretan yang rata kiri, dan tiga benda yang lebarnya berbeda tidak
 *  pernah rata kalau acuannya pusat. */
export const Batang: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  /** 0..1 pada lebar batang — SKEMATIS. */
  takik?: number;
  nChip?: number;
  nKaki?: number;
  /** Opasitas kaki ke-i. Fungsi, bukan angka: scene 7 merontokkannya satu per
   *  satu saat batang berubah jadi chip yang dipatri. */
  kaki?: (i: number) => number;
  /** 0..1 — sel di dalam chip menyala aksen. */
  nyala?: number;
  opacity?: number;
  /** Skala di sekitar titik acuan; dipakai untuk perbesaran, bukan untuk
   *  mengubah ukuran benda (itu lewat `w`). */
  skala?: number;
  asal?: string;
}> = ({
  x,
  y,
  w,
  h = 78,
  takik = TAKIK.ddr4,
  nChip = 6,
  nKaki = 22,
  kaki = () => 1,
  nyala = 0,
  opacity = 1,
  skala = 1,
  asal = "center",
}) => {
  const lebarTakik = Math.max(12, w * 0.045);
  const xTakik = w * takik;
  const langkah = w / (nKaki + 1);
  const sel = Math.min(26, (w - 34 - (nChip - 1) * 8) / nChip);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        opacity,
        transform: `scale(${skala})`,
        transformOrigin: asal,
      }}
    >
      {/* badan */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 8,
          background: "var(--bg-elev)",
          border: "3px solid var(--accent)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Kisi kolom={nChip} baris={1} sel={sel} jeda={8} nyala={nyala} />
      </div>

      {/* kaki — pendek, banyak, dan sengaja tidak sebanyak aslinya */}
      {Array.from({ length: nKaki }, (_, i) => {
        const xk = (i + 1) * langkah;
        /* Kaki yang jatuh di mulut coakan memang tidak ada. Itu satu-satunya
           alasan coakan terbaca sebagai coakan dan bukan sebagai noda. */
        if (Math.abs(xk - xTakik) < lebarTakik * 0.75) return null;
        const a = kaki(i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: xk - 2,
              top: h - 2,
              width: 4,
              height: TINGGI_KAKI,
              borderRadius: "0 0 2px 2px",
              background: "var(--accent)",
              opacity: 0.55 * a,
              transform: `translateY(${(1 - a) * 16}px)`,
            }}
          />
        );
      })}

      {/* coakan — potongan naik dari tepi bawah badan */}
      <div
        style={{
          position: "absolute",
          left: xTakik - lebarTakik / 2,
          top: h - h * 0.28,
          width: lebarTakik,
          height: h * 0.28 + 3,
          background: "var(--bg)",
          borderLeft: "3px solid var(--accent)",
          borderRight: "3px solid var(--accent)",
          borderTop: "3px solid var(--accent)",
          borderRadius: "4px 4px 0 0",
        }}
      />
    </div>
  );
};

/* ===========================================================================
   Slot & papan
   ======================================================================== */

/** Slot di papan induk. `kunci` 0..1 = posisi tonjolan yang harus bertemu
 *  coakan; kosongkan untuk slot polos. */
export const Slot: React.FC<{
  x: number;
  y: number;
  w: number;
  kunci?: number;
  opacity?: number;
}> = ({ x, y, w, kunci, opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: 28,
      opacity,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 5,
        background: "var(--bg)",
        border: "3px solid var(--ink-2)",
      }}
    />
    {kunci !== undefined && (
      <div
        style={{
          position: "absolute",
          left: w * kunci - 5,
          top: 4,
          width: 10,
          height: 20,
          borderRadius: 3,
          background: "var(--ink-1)",
        }}
      />
    )}
    {/* pengait di kedua ujung — yang mengatup saat batang duduk */}
    {[0, 1].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: i === 0 ? -14 : w + 4,
          top: -10,
          width: 10,
          height: 30,
          borderRadius: 3,
          background: "var(--ink-2)",
        }}
      />
    ))}
  </div>
);

/** Papan induk / papan sirkuit — bilah mendatar yang jadi garis dasar bersama.
 *  Keempat benda di scene 7 dibandingkan, dan pembanding yang garis dasarnya
 *  berbeda tidak membandingkan apa-apa. */
export const Papan: React.FC<{
  x: number;
  y: number;
  w: number;
  opacity?: number;
}> = ({ x, y, w, opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: 16,
      borderRadius: 4,
      background: "var(--line)",
      borderTop: "2px solid var(--ink-2)",
      opacity,
    }}
  />
);
