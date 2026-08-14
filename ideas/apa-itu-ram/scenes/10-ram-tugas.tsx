/* T01 · scene 10 · ram-tugas — bagian 7 [case], 34,68 dtk
   VO:        10-ram-tugas-vo.md          ← sumber kalimat & beat
   Direction: 10-ram-tugas-direction.md   ← sumber tata letak & koreografi

   SCENE PENUTUP EPISODE. Kameranya mundur dari meja yang barusan kosong di
   `09-beda-penyimpanan` ke panggung utuh, mengurung bendanya — ini yang
   dikerjakan meja, ini yang bukan tugasnya — lalu menaruh kalimat bawa-pulang
   dan berhenti.

   INI TETAP BUKAN BABAK RANGKUMAN. docs/02 § Aturan flow melarang babak
   "rangkuman" terpisah, dan larangan itu tetap berlaku: tujuh beat pertamanya
   menetapkan BATAS bendanya, tidak mengulang isi episode dari awal. Dua beat
   terakhirnya adalah kalimat bawa-pulang, yang oleh aturan yang sama memang
   ditempatkan "sebagai penutup [case], lalu langsung tanda brand" — dan itulah
   sebabnya bagian scene ini "7 case", bukan "6 explaining".

   TIGA HAL YANG MEMBUAT SCENE INI BEKERJA, DAN GAMPANG HILANG SAAT DISUNTING:

   1. Frame pertamanya = frame terakhir `08-ram-generasi`. Batang DDR5 yang
      tertahan di mulut slot MELEBAR jadi papan meja — satu benda, satu tween,
      tanpa potongan. Kotak berangkatnya dari KOTAK_TERTAHAN di ../batang-ram.tsx,
      bukan diketik ulang di sini.

   2. Tahap 4 meja DIAM TOTAL. Tidak ada napas, tidak ada denyut, tidak ada
      berkas yang bergerak — sementara prosesor justru menyala dan berpercik.
      Diamnya itu isi tahapnya; begitu mejanya ikut bergerak "supaya hidup",
      kalimat "meja tidak mengerjakan apa pun" kehilangan buktinya.

   3. Tahap 6 lompatan meja<->prosesor berjalan dengan siklus TETAP, sebelum dan
      sesudah mejanya melebar. Jangan pernah mempercepat atau menjeda lompatan
      itu: satu-satunya cara penonton melihat bahwa mejanya yang berubah dan
      bukan kecepatannya adalah ritme yang tidak berubah satu frame pun.

   Kolom bawah cuma catatan. Tiap baris mendarat SETELAH panggung membuktikannya,
   tidak pernah sebelum — kalau ada baris yang muncul tanpa ada yang terjadi di
   atas, baris itu salah tempat.

   Detik tiap tahap tidak diketik di sini; semuanya dari `beat()` di
   timing.gen.ts (HARD RULE 4).
*/
import type React from "react";

import { E, gambarGaris, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Ic, type NamaIkon } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import { Batang, KOTAK_TERTAHAN, TAKIK } from "../batang-ram";
import {
  antarJemput,
  GARIS,
  Kartu,
  KOTAK_MEJA,
  LACI_SUMBER,
  Lemari,
  MejaNyata,
  napas,
  Prosesor,
  P_PROSESOR,
  SKALA_LEMARI,
  titikLaci,
  X_LEMARI,
  X_MEJA,
  X_PROSESOR,
  Y_MEJA,
} from "../panggung-analogi";
import { beat } from "../timing.gen";

/* --- waktu: satu baris VO = satu tahap ------------------------------------- */

const B = (i: number) => beat("ram-tugas", i);

const T_MUNDUR = B(0); // "Sekarang mundur sedikit, lihat mejanya utuh lagi."
const T_TUGAS = B(1); // "Tugas meja cuma satu. Menaruh yang sedang dipakai, ..."
const T_BELAH = B(2); // "Selebihnya bukan tugasnya."
const T_KERJA = B(3); // "Meja tidak mengerjakan apa pun. ..."
const T_SIMPAN = B(4); // "Meja juga tidak menyimpan. ..."
const T_LEBAR = B(5); // "Dan meja yang lebih lebar tidak membuat prosesor ..."
const T_MUAT = B(6); // "Ia cuma memuat lebih banyak sekaligus."
const T_BAWA = B(7); // "Jadi yang sedang dipakai ada di ram. Sisanya tetap ..."
const T_PENUH = B(8); // "Dan ram yang lebih besar cuma menolong kalau ..."

/* --- geometri: panggung ---------------------------------------------------- */

/** Kotak papan meja — tujuan morph, dan acuan letak berkas di atasnya. */
const PAPAN = {
  kiri: KOTAK_MEJA.kiri,
  atas: KOTAK_MEJA.atas,
  lebar: KOTAK_MEJA.kanan - KOTAK_MEJA.kiri,
  tinggi: KOTAK_MEJA.papanBawah - KOTAK_MEJA.atas,
};

/** Melebarnya meja di tahap 6 — KE KIRI SAJA, bertumpu di tepi kanan papan.
 *
 *  Dua alasan, dan dua-duanya mengikat. Pertama, jarak meja ke prosesor adalah
 *  pernyataan tersendiri sejak scene 4 ("jauh lebih dekat, bukan menempel" —
 *  yang menempel itu cache, dan cache belum datang); meja yang melebar ke kanan
 *  akan merapat ke kartu prosesor dan diam-diam membatalkannya. Kedua, kalau
 *  tepi kanannya bergerak, lompatan meja<->prosesor jadi lebih pendek — dan
 *  lompatan yang jaraknya berubah tidak bisa lagi membuktikan bahwa ritmenya
 *  tidak berubah, yang justru seluruh isi tahap ini. */
const LEBAR_LEBIH = 1.35;

const BERKAS = 72;
/** Gambar `file` mengisi y 12..84 dari viewBox 96 dan garisnya setebal 6, jadi
 *  sisi bawahnya ada di 90,6% tinggi kotaknya. Itu yang dikurangkan supaya
 *  berkasnya duduk DI ATAS papan, bukan melayang beberapa piksel di udara —
 *  8 px terakhir sengaja masuk ke papannya, karena tepi papan yang membulat
 *  membuat berkas yang persis menyentuhnya tetap terbaca menggantung. */
const Y_BERKAS = Y_MEJA - BERKAS * 0.906 + 8;
/** Empat berkas yang sudah di meja sejak tahap 2, dan dua yang baru muat
 *  sesudah mejanya melebar. Yang lama TIDAK ikut bergeser: mejanya melebar ke
 *  luar, dan yang bertambah adalah ruangnya, bukan jarak antar berkas.
 *
 *  Keduanya di sisi kiri karena ke situlah mejanya tumbuh (lihat LEBAR_LEBIH). */
const SLOT_AWAL = [-225, -75, 75, 225] as const;
const SLOT_TAMBAH = [-390, -490] as const;
/** Beat 8: sisa ruang meja diisi sampai tidak ada celah lagi. Titiknya jatuh di
 *  TENGAH-TENGAH slot yang sudah ada, jadi jaraknya menyempit jadi separuh dan
 *  mejanya terbaca penuh — bukan sekadar "ada beberapa berkas lagi". */
const SLOT_PENUH = [-307, -150, 0, 150] as const;

/** Berkas asli di laci — sumber riak tahap 5, titik yang sama persis dengan
 *  yang dipakai `04-ram-analogy`. */
const ASAL = titikLaci(LACI_SUMBER, { skala: SKALA_LEMARI, x: X_LEMARI });

/** Tautan pendek meja -> prosesor. Pangkalnya TIDAK pernah bergerak: tepi kanan
 *  papan adalah tumpuan melebarnya meja, jadi panjang lompatan ini sama persis
 *  sebelum dan sesudah tahap 6. */
const RAIH_KE = { x: X_PROSESOR - 165, y: P_PROSESOR.y + 55 };
const X_PANGKAL = KOTAK_MEJA.kanan;
const Y_PANGKAL = KOTAK_MEJA.atas + 18;
const PANJANG_RAIH = Math.hypot(RAIH_KE.x - X_PANGKAL, RAIH_KE.y - Y_PANGKAL);

/** Siklus lompatan meja <-> prosesor. Angka yang sama dengan `04-ram-analogy`,
 *  dan TETAP di kedua sisi tahap 6 — itu seluruh isi bantahannya. */
const SIKLUS = 0.62;

/* --- geometri: dua kolom di bawah ------------------------------------------ */

const KOLOM = { kiri: 210, kanan: 1010 };
const GARIS_BELAH = { x: 960, atas: 696, bawah: 912 };
const Y_JUDUL = 704;
const Y_KIRI = [760, 852] as const;
const Y_KANAN = [760, 816, 872] as const;

/* --- perabot kolom --------------------------------------------------------- */

const JudulKolom: React.FC<{
  x: number;
  teks: string;
  muncul: React.CSSProperties;
}> = ({ x, teks, muncul }) => (
  <p
    className="t-label"
    style={{ position: "absolute", left: x, top: Y_JUDUL, fontSize: 26, ...muncul }}
  >
    {teks}
  </p>
);

/** Satu baris catatan: ikon, kalimatnya, dan keterangan opsional di bawahnya.
 *
 *  Warnanya tidak pernah jadi satu-satunya pembeda (docs/03 § Aturan pakai
 *  warna) — ada ikonnya, ada judul kolomnya, dan ada posisinya. */
const Baris: React.FC<{
  x: number;
  y: number;
  ikon: NamaIkon;
  warna: string;
  teks: string;
  sub?: string;
  muncul: React.CSSProperties;
  pop: number;
}> = ({ x, y, ikon, warna, teks, sub, muncul, pop }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      display: "flex",
      gap: 22,
      alignItems: "flex-start",
      ...muncul,
    }}
  >
    <div style={{ transform: `scale(${pop})`, transformOrigin: "center", marginTop: 4 }}>
      <Ic n={ikon} warna={warna} style={{ width: 44, height: 44 }} />
    </div>
    <div>
      <p className="t-sub" style={{ fontSize: 34 }}>
        {teks}
      </p>
      {sub && (
        <p style={{ margin: "8px 0 0", fontSize: 27, fontWeight: 500, color: "var(--ink-1)" }}>
          {sub}
        </p>
      )}
    </div>
  </div>
);

/* ===========================================================================
   Scene
   ======================================================================== */

export const RamTugas: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: batang -> papan meja, panggung berdiri lagi --- */
  const morf = t(d, {
    mulai: T_MUNDUR + 0.15,
    durasi: 0.75,
    dari: 0,
    ke: 1,
    ease: E.power3out,
  });
  const antara = (dari: number, ke: number) => dari + (ke - dari) * morf;
  /* Kakinya rontok duluan: benda ini berhenti jadi sesuatu yang ditancapkan
     sebelum ia jadi sesuatu yang ditaruhi. */
  const kakiPudar = t(d, { mulai: T_MUNDUR + 0.15, durasi: 0.3, dari: 1, ke: 0 });
  /* Batang padam dan meja menyala di kotak yang sama — dua opasitas yang saling
     menutup, bukan potongan. */
  const serah = t(d, { mulai: T_MUNDUR + 0.62, durasi: 0.28, dari: 0, ke: 1 });

  const mLemari = masuk(d, { mulai: T_MUNDUR + 0.5, durasi: 0.5, geser: 0 });
  const mProsesor = masuk(d, { mulai: T_MUNDUR + 0.62, durasi: 0.5, geser: 0 });
  const geserLemari = t(d, {
    mulai: T_MUNDUR + 0.5,
    durasi: 0.5,
    dari: -70,
    ke: 0,
    ease: E.expoOut,
  });
  const geserProsesor = t(d, {
    mulai: T_MUNDUR + 0.62,
    durasi: 0.5,
    dari: 70,
    ke: 0,
    ease: E.expoOut,
  });

  /* --- tahap 2: berkas terhampar + tautan pendek --- */
  const berkasAwal = (i: number) =>
    masuk(d, { mulai: T_TUGAS + 0.15, urutan: i, jeda: 0.09, durasi: 0.42, geser: 22 });
  const gambarRaih = t(d, {
    mulai: T_TUGAS + 1.15,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const denyutRaih = tPP(d, { mulai: T_TUGAS + 1.75, durasi: 0.7, dari: 1, ke: 1.9 });

  /* --- tahap 3: layar dibelah dua --- */
  const belah = t(d, {
    mulai: T_BELAH + 0.05,
    durasi: 0.45,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  /* --- tahap 4: yang mengerjakan tetap prosesor --- */
  const lompatSekali = t(d, {
    mulai: T_KERJA + 0.5,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const adaLompatSekali = d > T_KERJA + 0.5 && d < T_KERJA + 1.5;
  const nyalaDasar = t(d, { mulai: T_MUNDUR + 0.7, durasi: 0.5, dari: 0, ke: 0.78 });
  const denyutProsesor = tPP(d, { mulai: T_KERJA + 1.0, durasi: 1.1, dari: 0, ke: 0.22 });
  const percik =
    tPP(d, { mulai: T_KERJA + 1.05, durasi: 0.34, dari: 0, ke: 1 }) +
    tPP(d, { mulai: T_KERJA + 1.62, durasi: 0.34, dari: 0, ke: 1 });

  /* Napas berkas di meja — dimatikan sepanjang tahap 4, dan itu disengaja
     (lihat kepala berkas). Dua tween yang saling mengurangi, bukan `if`: batas
     yang mendadak akan terlihat sebagai berkas yang tersentak. */
  const diam =
    t(d, { mulai: T_KERJA - 0.3, durasi: 0.3, dari: 0, ke: 1 }) -
    t(d, { mulai: T_SIMPAN - 0.3, durasi: 0.3, dari: 0, ke: 1 });
  const goyangBerkas = napas(d, { mulai: T_TUGAS + 0.6, periode: 3.1, jauh: 4 }) * (1 - diam);

  /* --- tahap 5: aslinya tetap di gudang --- */
  const sumber = t(d, { mulai: T_SIMPAN + 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const denyutAsli = tPP(d, { mulai: T_SIMPAN + 0.25, durasi: 0.8, dari: 1, ke: 1.22 });
  const riak = t(d, { mulai: T_SIMPAN + 0.35, durasi: 0.9, dari: 0, ke: 1, ease: E.expoOut });
  /* Riaknya belum ada sebelum tahap 5, dan itu harus dikatakan terpisah:
     lingkaran ber-radius 16 dengan opasitas 0,75 di detik nol bukan "riak yang
     belum jalan", melainkan cincin kecil yang nongkrong di layar sepanjang
     empat tahap pertama. */
  const adaRiak = t(d, { mulai: T_SIMPAN + 0.3, durasi: 0.15, dari: 0, ke: 1 });
  /* Garis tepi putus-putus di keempat berkas meja: yang di atas meja salinan,
     dan aslinya barusan berdenyut di seberang sana. */
  const tandaSalinan = tPP(d, { mulai: T_SIMPAN + 1.0, durasi: 1.9, dari: 0, ke: 0.9 });

  /* --- tahap 6: lebih lebar, bukan lebih cepat --- */
  const lebar =
    1 +
    (LEBAR_LEBIH - 1) *
      t(d, { mulai: T_LEBAR + 1.15, durasi: 0.85, dari: 0, ke: 1, ease: E.power2out });
  /* Lompatannya sudah berjalan sejak ekor tahap 5 dan tidak pernah berubah
     ritme sesudahnya. Siklusnya TETAP — lihat kepala berkas. */
  const T_RITME = T_LEBAR - 1.0;
  const lompat = antarJemput(d, { mulai: T_RITME, siklus: SIKLUS });
  const ayun = napas(d, { mulai: T_RITME, periode: SIKLUS, jauh: 26 });
  const munculMetronom = t(d, { mulai: T_RITME, durasi: 0.4, dari: 0, ke: 1 });

  const titikRaih = (p: number) => ({
    x: X_PANGKAL + (RAIH_KE.x - X_PANGKAL) * p,
    y: Y_PANGKAL + (RAIH_KE.y - Y_PANGKAL) * p,
  });

  /* --- tahap 7: yang memang bertambah --- */
  const berkasTambah = (i: number) =>
    masuk(d, { mulai: T_MUAT + 0.1, urutan: i, jeda: 0.16, durasi: 0.45, geser: 26 });

  /* --- tahap 8: kalimat bawa-pulang --- */
  /* Dua kolom mundur jadi latar. Tidak dibuang: yang mereka catat masih berlaku,
     cuma berhenti jadi yang dibaca. */
  const kolomHidup = t(d, { mulai: T_BAWA, durasi: 0.6, dari: 1, ke: 0.28 });
  /* "Yang sedang dipakai" dan "sisanya" ditunjuk bergantian, bukan bersamaan:
     kalimatnya menyebut dua tempat berurutan, dan dua denyut yang jatuh bersama
     membuat keduanya terbaca sebagai satu tempat. */
  const denyutMeja = tPP(d, { mulai: T_BAWA + 0.4, durasi: 0.9, dari: 0, ke: 1 });
  const denyutGudang = tPP(d, { mulai: T_BAWA + 2.4, durasi: 0.9, dari: 1, ke: 1.24 });

  /* --- tahap 9: mejanya penuh --- */
  const berkasPenuh = (i: number) =>
    masuk(d, { mulai: T_PENUH + 0.5, urutan: i, jeda: 0.13, durasi: 0.4, geser: 20 });
  const mPenuh = masuk(d, { mulai: T_PENUH + 1.5, durasi: 0.5, geser: 14 });

  /* --- dua kolom --- */
  const pop = (mulai: number) =>
    t(d, { mulai, durasi: 0.45, dari: 0.3, ke: 1, ease: E.backOut(2) });
  const naik = (mulai: number) => masuk(d, { mulai, durasi: 0.45, geser: 14 });

  const T_KIRI = [T_TUGAS + 2.8, T_MUAT + 1.05] as const;
  const T_KANAN = [T_KERJA + 2.4, T_SIMPAN + 2.7, T_LEBAR + 3.1] as const;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* ---------- meja: batang yang melebar, lalu mejanya ---------- */}
        <Batang
          x={antara(KOTAK_TERTAHAN.kiri, PAPAN.kiri)}
          y={antara(KOTAK_TERTAHAN.atas, PAPAN.atas)}
          w={antara(KOTAK_TERTAHAN.lebar, PAPAN.lebar)}
          h={antara(KOTAK_TERTAHAN.tinggi, PAPAN.tinggi)}
          /* DDR5 — batang yang tertahan di frame terakhir scene sebelumnya,
             bukan batang generasi lain yang kebetulan mirip. */
          takik={TAKIK.ddr5}
          nChip={6}
          kaki={() => kakiPudar}
          opacity={1 - serah}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scaleX(${lebar})`,
            /* Bertumpu di tepi KANAN papan: mejanya tumbuh ke kiri, sisi yang
               menghadap prosesor tidak bergerak sedikit pun. */
            transformOrigin: `${KOTAK_MEJA.kanan}px ${Y_MEJA}px`,
          }}
        >
          <MejaNyata tumbuh={1} opacity={serah} />
        </div>

        {/* ---------- lemari arsip ---------- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: mLemari.opacity,
            transform: `translateX(${geserLemari}px)`,
          }}
        >
          <Kartu x={X_LEMARI} skala={SKALA_LEMARI} label="lemari arsip">
            <Lemari isi={() => 1} sumber={sumber} denyut={denyutAsli * denyutGudang} />
          </Kartu>
        </div>

        {/* ---------- prosesor ---------- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: mProsesor.opacity,
            transform: `translateX(${geserProsesor}px)`,
          }}
        >
          <Kartu x={X_PROSESOR} label="prosesor">
            <Prosesor nyala={Math.min(1, nyalaDasar + denyutProsesor)} />
          </Kartu>
        </div>

        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* tautan pendek meja -> prosesor */}
          <path
            d={`M${X_PANGKAL} ${Y_PANGKAL}L${RAIH_KE.x} ${RAIH_KE.y}`}
            fill="none"
            stroke={GARIS.warna}
            strokeWidth={GARIS.tebal}
            strokeLinecap="round"
            opacity={GARIS.opasitas * gambarRaih * denyutRaih}
            {...gambarGaris(d, PANJANG_RAIH, { mulai: T_TUGAS + 1.15, durasi: 0.5 })}
          />

          {/* riak dari berkas asli — "masih di sini" */}
          <circle
            cx={ASAL.x}
            cy={ASAL.y}
            r={16 + 86 * riak}
            fill="none"
            stroke="var(--accent-ink)"
            strokeWidth={3}
            opacity={0.75 * (1 - riak) * adaRiak}
          />

          {/* garis pemisah dua kolom */}
          <path
            d={`M${GARIS_BELAH.x} ${GARIS_BELAH.atas}V${GARIS_BELAH.bawah}`}
            fill="none"
            stroke="var(--line)"
            strokeWidth={3}
            {...gambarGaris(d, GARIS_BELAH.bawah - GARIS_BELAH.atas, {
              mulai: T_BELAH + 0.05,
              durasi: 0.45,
            })}
            opacity={belah}
          />

          {/* tanda salinan di berkas meja — cuma menyala sekali di tahap 5 */}
          {SLOT_AWAL.map((sx, i) => (
            <rect
              key={i}
              x={X_MEJA + sx - BERKAS / 2 - 6}
              y={Y_BERKAS + 6}
              width={BERKAS + 12}
              height={BERKAS - 10}
              rx={8}
              fill="none"
              stroke="var(--accent-ink)"
              strokeWidth={2}
              strokeDasharray="8 8"
              opacity={tandaSalinan * 0.8}
            />
          ))}
        </svg>

        {/* ---------- berkas di atas meja ---------- */}
        {SLOT_AWAL.map((sx, i) => {
          const m = berkasAwal(i);
          return (
            <div
              key={`awal-${i}`}
              style={{
                position: "absolute",
                left: X_MEJA + sx - BERKAS / 2,
                top: Y_BERKAS + goyangBerkas,
                width: BERKAS,
                height: BERKAS,
                opacity: m.opacity,
                transform: m.transform,
              }}
            >
              <Ic
                n="file"
                warna="c-accent"
                style={{
                  width: BERKAS,
                  height: BERKAS,
                  /* Beat 7 menunjuk "yang sedang dipakai": keempat berkas
                     pertama berdenyut bersamaan, satu kali. */
                  transform: `scale(${1 + 0.12 * denyutMeja})`,
                }}
              />
            </div>
          );
        })}

        {SLOT_TAMBAH.map((sx, i) => {
          const m = berkasTambah(i);
          return (
            <div
              key={`tambah-${i}`}
              style={{
                position: "absolute",
                left: X_MEJA + sx - BERKAS / 2,
                top: Y_BERKAS + goyangBerkas,
                width: BERKAS,
                height: BERKAS,
                opacity: m.opacity,
                transform: m.transform,
              }}
            >
              <Ic n="file" warna="c-accent" style={{ width: BERKAS, height: BERKAS }} />
            </div>
          );
        })}

        {SLOT_PENUH.map((sx, i) => {
          const m = berkasPenuh(i);
          return (
            <div
              key={`penuh-${i}`}
              style={{
                position: "absolute",
                left: X_MEJA + sx - BERKAS / 2,
                top: Y_BERKAS + goyangBerkas,
                width: BERKAS,
                height: BERKAS,
                opacity: m.opacity,
                transform: m.transform,
              }}
            >
              <Ic n="file" warna="c-accent" style={{ width: BERKAS, height: BERKAS }} />
            </div>
          );
        })}

        {/* "penuh" — satu kata, di atas meja yang sudah tidak punya celah lagi.
            Tanpa satuan dan tanpa angka: yang diklaim keadaannya, bukan
            berapa banyak yang muat. */}
        <p
          className="t-label"
          style={{
            position: "absolute",
            left: X_MEJA - 552,
            top: 386,
            width: 440,
            textAlign: "center",
            fontSize: 26,
            color: "var(--accent-ink)",
            ...mPenuh,
          }}
        >
          penuh
        </p>

        {/* ---------- lompatan meja <-> prosesor ---------- */}
        {adaLompatSekali && (
          <div
            style={{
              position: "absolute",
              left: titikRaih(lompatSekali).x - 22,
              top: titikRaih(lompatSekali).y - 22,
              width: 44,
              height: 44,
            }}
          >
            <Ic n="file" warna="c-accent" style={{ width: 44, height: 44 }} />
          </div>
        )}

        {lompat.jalan && (
          <div
            style={{
              position: "absolute",
              left: titikRaih(lompat.maju).x - 22,
              top: titikRaih(lompat.maju).y - 22,
              width: 44,
              height: 44,
              /* Padam saat ia sedang di pangkalnya: berkas paling kanan di meja
                 berdiri persis di situ, dan dua ikon yang sama bertumpuk
                 terbaca sebagai gambar dobel, bukan sebagai berkas yang siap
                 berangkat. */
              opacity: Math.min(1, lompat.maju * 12),
            }}
          >
            <Ic n="file" warna="c-accent" style={{ width: 44, height: 44 }} />
          </div>
        )}

        {/* percikan di sisi prosesor — pekerjaannya terjadi DI SINI */}
        <div
          style={{
            position: "absolute",
            left: X_PROSESOR + 84,
            top: P_PROSESOR.y - 96,
            width: 64,
            height: 64,
            opacity: Math.min(1, percik),
          }}
        >
          <Ic n="bolt" warna="c-accent" style={{ width: 64, height: 64 }} />
        </div>

        {/* metronom: ketukan yang tidak berubah waktu mejanya melebar.
            TANPA satuan apa pun — begitu ada angkanya, ia jadi klaim. */}
        <div
          style={{
            position: "absolute",
            left: X_PROSESOR - 90,
            top: 686,
            width: 180,
            height: 4,
            borderRadius: 2,
            background: "var(--line)",
            opacity: munculMetronom,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 84 + ayun,
              top: -6,
              width: 12,
              height: 16,
              borderRadius: 3,
              background: "var(--accent)",
            }}
          />
        </div>

        {/* ---------- dua kolom ---------- */}
        <div style={{ opacity: kolomHidup }}>
        <JudulKolom x={KOLOM.kiri} teks="yang dikerjakan meja" muncul={naik(T_TUGAS + 2.55)} />
        <JudulKolom x={KOLOM.kanan} teks="yang bukan tugasnya" muncul={naik(T_BELAH + 0.35)} />

        <Baris
          x={KOLOM.kiri}
          y={Y_KIRI[0]}
          ikon="check"
          warna="c-ok"
          teks="menaruh yang sedang dipakai"
          sub="dekat, dan semuanya terhampar"
          muncul={naik(T_KIRI[0])}
          pop={pop(T_KIRI[0])}
        />
        <Baris
          x={KOLOM.kiri}
          y={Y_KIRI[1]}
          ikon="check"
          warna="c-ok"
          teks="memuat lebih banyak sekaligus"
          muncul={naik(T_KIRI[1])}
          pop={pop(T_KIRI[1])}
        />

        <Baris
          x={KOLOM.kanan}
          y={Y_KANAN[0]}
          ikon="x"
          warna="c-bad"
          teks="mengerjakan berkasnya"
          muncul={naik(T_KANAN[0])}
          pop={pop(T_KANAN[0])}
        />
        <Baris
          x={KOLOM.kanan}
          y={Y_KANAN[1]}
          ikon="x"
          warna="c-bad"
          teks="menyimpan aslinya"
          muncul={naik(T_KANAN[1])}
          pop={pop(T_KANAN[1])}
        />
        <Baris
          x={KOLOM.kanan}
          y={Y_KANAN[2]}
          ikon="x"
          warna="c-bad"
          teks="membuat prosesor lebih cepat"
          muncul={naik(T_KANAN[2])}
          pop={pop(T_KANAN[2])}
        />
        </div>
      </div>
    </Scene>
  );
};
