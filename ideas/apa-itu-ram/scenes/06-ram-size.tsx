/* T01 · scene 6 · ram-size — bagian 6 [explaining], 17,54 dtk
   Direction: 06-ram-size-direction.md   ← sumber tata letak & koreografi
   VO:        06-ram-size-vo.md                       ← sumber kalimat & beat

   Scene terpanjang episode ini, dan satu-satunya yang menjawab pertanyaan yang
   penonton bawa sendiri dari toko: kenapa angkanya selalu itu-itu saja.

   Titik waktunya dipatok ke VO, dihitung pada 140 wpm:
     0,00–4,71   "Pernah sadar ukuran ram selalu    -> lemari & prosesor keluar,
                  delapan, enam belas, tiga puluh      meja ke tengah, tiga angka
                  dua?"                                mendarat di atasnya
     4,71–6,86   "Itu bukan angka pilihan pabrik."  -> angka mengecil & naik jadi
                                                       jejak; permukaan meja
                                                       terbuka jadi bidang
     6,86–9,86   "Setiap kotak di meja itu punya    -> bidang terbelah dua
                  nomor,"
     9,86–13,29  "dan nomornya cuma ditulis dengan  -> 0 dan 1 masuk, lalu
                  nol dan satu."                       bergantian disorot
     13,29–17,14 "Tambah satu digit, jumlah         -> empat belahan beruntun,
                  kotaknya langsung dua kali            makin cepat; 8, 16, 32
                  lipat."                               menyala saat dicapai
     17,14–…     "Sejauh ini, meja itu masih ada   -> semua mundur & mengecil,
                  di kepala kita saja."                bingkai putus-putus muncul
                                                       (jembatan — HARD RULE 7)

   TIGA KEPUTUSAN:

   1. Bidangnya DIBELAH, bukan diisi ulang. Tiap tingkat menambah garis pemisah
      ke bidang yang luasnya tidak pernah berubah — 2 kotak jadi 4 dengan satu
      garis, bukan dengan mengganti dua kotak dengan empat kotak yang lebih
      kecil. Itu bedanya "melipat" dan "menambah": penonton harus melihat satu
      garis baru menghasilkan dua kali lipat, dan pergantian kumpulan kotak
      justru menyembunyikan sebabnya.

   2. Angka 8 · 16 · 32 tidak pernah pakai satuan. Naskah sengaja menyebutnya
      telanjang, dan tabel Sumber masih menahan klaim kapasitas (baris ⚠). Di
      layar ia jumlah kotak; giga-nya urusan scene lain. Ketiganya menyala tepat
      saat jumlah kotaknya mencapai angka itu — jadi yang diklaim cuma "angka
      ini lahir dari melipat", yang memang benar apa adanya.

   3. Nomor kotak berhenti ditulis setelah delapan kotak. Nomor lima digit di
      kotak 97px terbaca sebagai noda, bukan angka; yang meneruskan gagasan
      "tambah satu digit" adalah deret slot di atas bidang, yang ukurannya
      tidak ikut mengecil.

   Kesinambungan dari ram-analogy: lemari, prosesor, meja, dan kata RAM mulai
   PERSIS di posisi terakhir scene 5 (X_LEMARI 280, X_PROSESOR 1660, meja di
   1080 skala 1,25). Potongan antar-scene keras, jadi kesinambungan itu satu-
   satunya yang menyambungkan keduanya jadi satu ruangan.

   Tata letaknya seluruhnya absolut, alasannya sama seperti scene 1 dan 3.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Ic } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import { beat } from "../timing.gen";

const ID = "ram-size";

/* --- waktu ---------------------------------------------------------------- */

const T_BERES = 0.1; // lemari & prosesor keluar, meja ke tengah
const T_ANGKA = 1.45;
const JEDA_ANGKA = 0.24;
const T_NAIK = 4.8; // angka mengecil & naik jadi jejak
const T_AREA = 5.35; // permukaan meja terbuka

/** Kelima belahan. Jedanya memendek — 6,70 · 0,80 · 0,70 · 0,60 — supaya
 *  pelipatan terasa memburu di ujung, persis seperti yang dikatakan VO. */
const T_B1 = 7.05;
const T_B2 = 13.75;
const T_B3 = 14.55;
const T_B4 = 15.25;
const T_B5 = 15.85;

/** Tahap 5 — jembatan ke `07-ram-bentuk` (HARD RULE 7). Ini satu-satunya waktu
 *  di berkas ini yang dibaca dari `beat()`, dan itu disengaja: ia beat TERAKHIR,
 *  jadi ia satu-satunya yang tidak ikut menggeser koreografi di atasnya kalau
 *  kalimatnya berubah. Angka-angka di atas dipatok tangan ke VO pada 140 wpm
 *  (lihat kepala berkas) — utang lama, dan bukan alasan untuk menambah satu
 *  angka tangan lagi di sini. */
const T_KEPALA = beat(ID, 6);

const T_NOL = 10.1;
const T_SATU = 10.75;
/** Slot digit pertama muncul bersama "nomornya"; sisanya mendahului belahannya
 *  0,12 dtk — digitnya ditambahkan dulu, kotaknya membelah sesudahnya. */
const T_SLOT = 10.4;

/* --- geometri (px pada frame 1920x1080) ----------------------------------- */

const KARTU = { w: 300, h: 330 };
const Y_KARTU = 560;
/** Posisi akhir kedua kartu di ram-analogy — titik berangkatnya di sini. */
const X_LEMARI_AWAL = 280;
const X_PROSESOR_AWAL = 1660;
const SKALA_LEMARI = 0.86;
const LEMARI = { w: 220, h: 240, atas: 24, n: 4 };

/** Meja: dari keadaan akhir ram-analogy ke tengah panggung. */
const MEJA_W = 520;
const X_MEJA_AWAL = 1080;
const Y_MEJA_AWAL = 600;
const SKALA_MEJA_AWAL = 1.25;
const X_MEJA = 960;
const Y_MEJA = 856;
const SKALA_MEJA = 1.6;

/** Bidang kotak di atas meja. 780x390 = 2:1, jadi tiap belahan menghasilkan
 *  kotak yang bergantian persegi dan setengah — 390x390, 390x195, 195x195,
 *  195x97, 97x97. Luas totalnya tidak pernah berubah (keputusan 1). */
const AREA = { y: 420, w: 780, h: 390 };
const KIRI = X_MEJA - AREA.w / 2;

/** Baris slot digit. Slot pertama yang PALING KANAN, dan yang baru masuk di
 *  KIRI — digit ditambahkan di depan, seperti menulis angka.
 *
 *  Derenya selalu center, jadi slot yang sudah ada bergeser ke kanan tiap kali
 *  satu digit masuk. Pergeseran itu bukan efek samping: persis begitulah angka
 *  yang bertambah panjang berperilaku, dan versi pertama scene ini memakai lima
 *  posisi tetap — hasilnya satu kotak menggantung di kanan layar selama tiga
 *  detik, terbaca sebagai tata letak yang meleset. */
const SLOT = { sisi: 52, jeda: 14, y: 300 };
const LANGKAH_SLOT = SLOT.sisi + SLOT.jeda;

/* --- data ----------------------------------------------------------------- */

/** Satu belahan = satu generasi garis pemisah. `bagi` adalah jumlah kolom
 *  (atau baris) SESUDAH belahan ini; garisnya jatuh di kelipatan ganjil. */
const BELAH = [
  { arah: "v", bagi: 2, mulai: T_B1 },
  { arah: "h", bagi: 2, mulai: T_B2 },
  { arah: "v", bagi: 4, mulai: T_B3 },
  { arah: "h", bagi: 4, mulai: T_B4 },
  { arah: "v", bagi: 8, mulai: T_B5 },
] as const;

const GARIS = BELAH.flatMap(({ arah, bagi, mulai }) =>
  Array.from({ length: bagi / 2 }, (_, k) => ({
    arah,
    p: (2 * k + 1) / bagi,
    mulai,
  })),
);

const T_BELAH = BELAH.map((b) => b.mulai);

type Label = {
  teks: string;
  x: number;
  y: number;
  font: number;
  mulai: number;
  habis: number;
};

/** Nomor di dalam kotak, satu tingkat sekaligus. Nomornya BUKAN hiasan: ia
 *  ditulis biner sepanjang jumlah digit tingkat itu, jadi "tambah satu digit"
 *  benar-benar terlihat sebagai satu karakter yang bertambah. */
const nomorTingkat = (
  kolom: number,
  baris: number,
  font: number,
  waktu: (i: number) => number,
  habis: number,
): Label[] =>
  Array.from({ length: kolom * baris }, (_, i) => {
    const w = AREA.w / kolom;
    const h = AREA.h / baris;
    return {
      teks: i.toString(2).padStart(Math.round(Math.log2(kolom * baris)), "0"),
      x: KIRI + ((i % kolom) + 0.5) * w,
      y: AREA.y + (Math.floor(i / kolom) + 0.5) * h,
      font,
      mulai: waktu(i),
      habis,
    };
  });

/* Berhenti di delapan kotak — keputusan 3. */
const LABEL: Label[] = [
  ...nomorTingkat(2, 1, 148, (i) => (i === 0 ? T_NOL : T_SATU), T_B2),
  ...nomorTingkat(2, 2, 82, () => T_B2 + 0.16, T_B3),
  ...nomorTingkat(4, 2, 54, () => T_B3 + 0.16, T_B4),
];

/** Tiga angka dari judul toko. `nyala` = detik jumlah kotak mencapai angkanya. */
const ANGKA = [
  { teks: "8", dx: -320, dxKecil: -260, nyala: T_B3 },
  { teks: "16", dx: 0, dxKecil: 0, nyala: T_B4 },
  { teks: "32", dx: 320, dxKecil: 260, nyala: T_B5 },
] as const;

const T_SLOTS = [T_SLOT, T_B2 - 0.12, T_B3 - 0.12, T_B4 - 0.12, T_B5 - 0.12];

/* --------------------------------------------------------------------------
   Kartu — dua benda yang dibawa dari ram-analogy, cuma untuk keluar frame.
   Bentuknya disederhanakan: keduanya sudah lewat 1 dtk dan tidak pernah jadi
   subjek scene ini.
   -------------------------------------------------------------------------- */

const Kartu: React.FC<{
  x: number;
  skala: number;
  label: string;
  children: React.ReactNode;
}> = ({ x, skala, label, children }) => (
  <div
    className="panel"
    style={{
      position: "absolute",
      left: x - KARTU.w / 2,
      top: Y_KARTU - KARTU.h / 2,
      width: KARTU.w,
      height: KARTU.h,
      padding: 0,
      transform: `scale(${skala})`,
      transformOrigin: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: LEMARI.atas,
        height: LEMARI.h,
        display: "grid",
        placeItems: "center",
      }}
    >
      {children}
    </div>
    <p
      className="t-sub"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 22,
        textAlign: "center",
        fontSize: "calc(var(--fs-sub) * 0.72)",
        color: "var(--ink-0)",
      }}
    >
      {label}
    </p>
  </div>
);

/* ===========================================================================
   Scene
   ======================================================================== */

export const RamSize: React.FC = () => {
  const d = useDetik();

  /* --- kesinambungan: kedua kartu keluar, meja ke tengah --- */
  const pergi = (dari: number, ke: number) =>
    t(d, { mulai: T_BERES, durasi: 0.85, dari, ke, ease: E.power2in });
  const ke = (dari: number, tujuan: number) =>
    t(d, { mulai: T_BERES, durasi: 0.9, dari, ke: tujuan, ease: E.power3out });

  const xMeja = ke(X_MEJA_AWAL, X_MEJA);
  const yMeja = ke(Y_MEJA_AWAL, Y_MEJA);
  const skalaMeja = ke(SKALA_MEJA_AWAL, SKALA_MEJA);

  /* --- angka: besar di tengah, lalu mengecil jadi jejak di atas --- */
  const naik = t(d, { mulai: T_NAIK, durasi: 0.75, dari: 0, ke: 1, ease: E.power3out });

  /* --- bidang kotak --- */
  const mArea = t(d, { mulai: T_AREA, durasi: 0.55, dari: 0, ke: 1, ease: E.expoOut });
  /* Denyut tipis tiap kali membelah — dijumlahkan, bukan dicabangkan, supaya
     tetap fungsi murni dari frame walau lima belahan saling berdekatan. */
  const denyut = T_BELAH.reduce(
    (n, tb) => n + tPP(d, { mulai: tb, durasi: 0.34, dari: 0, ke: 0.02 }),
    0,
  );

  /* --- sorot bergantian antara kotak 0 dan kotak 1 ---
     Mengisi 3 dtk antara nomor selesai ditulis dan belahan kedua. Tanpa ini
     layarnya benar-benar diam selama VO mengucapkan kalimat terpanjangnya
     (docs/02 § pacing, tidak ada layar diam > 4 dtk). Gelombangnya kosinus
     murni; kuatnya yang dijepit tween, jadi tidak ada batas keras. */
  const gelombang = (1 + Math.cos(((d - T_SATU - 0.35) * 2 * Math.PI) / 1.6)) / 2;
  const kuat =
    t(d, { mulai: T_SATU + 0.35, durasi: 0.45, dari: 0, ke: 1 }) *
    t(d, { mulai: T_B2 - 0.5, durasi: 0.5, dari: 1, ke: 0 });

  /* --- jumlah kotak sekarang --- */
  const tingkat = T_BELAH.filter((tb) => d >= tb).length;

  /* Jumlah slot yang sudah mendarat, PECAHAN — dipakai untuk menggeser deretnya
     supaya tetap center selagi satu slot baru tumbuh. Bilangan bulat akan
     membuat deretnya melompat setengah kotak di frame slot itu muncul. */
  const nSlot = T_SLOTS.reduce(
    (n, m) => n + t(d, { mulai: m, durasi: 0.42, dari: 0, ke: 1, ease: E.power2out }),
    0,
  );
  const geserSlot = ((nSlot - 1) * LANGKAH_SLOT) / 2;

  /* --- tahap 5: gambarnya dibingkai, bukan dibubarkan ---
     Seluruh isi mundur satu langkah dan sebuah bingkai putus-putus muncul
     mengelilinginya. Yang dikatakan VO di sini bukan fakta baru, melainkan
     pengakuan bahwa lima scene terakhir seluruhnya gambaran — jadi gerakannya
     harus MEMBINGKAI, bukan menghapus: tidak ada yang memudar ke hitam, dan
     scene 7 memotong keras dari sini ke benda aslinya.

     Bingkainya cuma fade, tidak digambar berkeliling: garis yang merambat
     menarik mata mengikuti ujungnya, dan di beat penutup mata seharusnya diam
     di tengah, bukan berlari di tepi. */
  const mundur = t(d, {
    mulai: T_KEPALA,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  return (
    <Scene>
      {/* Bingkai lebih dulu di DOM supaya ia di belakang isinya; posisinya
          menempel ke tepi gambar yang sudah mengecil (skala 0,9 pada frame
          1920x1080 = 96px di kiri-kanan, 54px di atas-bawah), diberi kelonggaran
          sedikit supaya garisnya tidak menyentuh isi. */}
      <div
        style={{
          position: "absolute",
          top: 40,
          bottom: 40,
          left: 82,
          right: 82,
          border: "3px dashed var(--ink-2)",
          borderRadius: 32,
          opacity: t(d, { mulai: T_KEPALA + 0.25, durasi: 0.5, dari: 0, ke: 0.7 }),
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${18 * mundur}px) scale(${1 - 0.1 * mundur})`,
          transformOrigin: "center",
        }}
      >
        {/* ---------- lemari arsip & prosesor: keluar frame ---------- */}
        <Kartu x={pergi(X_LEMARI_AWAL, -330)} skala={SKALA_LEMARI} label="lemari arsip">
          <div className="lemari" style={{ width: LEMARI.w, height: LEMARI.h }}>
            {Array.from({ length: LEMARI.n }, (_, i) => (
              <div key={i} className="laci" style={{ background: "var(--bg)" }} />
            ))}
          </div>
        </Kartu>

        <Kartu x={pergi(X_PROSESOR_AWAL, 2250)} skala={1} label="prosesor">
          <Ic n="chip" ukuran="lg" warna="c-mute" />
        </Kartu>

        {/* ---------- meja ---------- */}
        <div
          style={{
            position: "absolute",
            left: xMeja - MEJA_W / 2,
            top: yMeja,
            transform: `scale(${skalaMeja})`,
            transformOrigin: "top center",
          }}
        >
          <div className="meja" style={{ width: MEJA_W }} />
        </div>

        {/* ---------- kata RAM: menyusut jadi tanda meja ----------
            Dibawa dari ram-analogy, tempatnya di sana persis. Ia mengecil,
            tidak hilang: bidang kotak di atas meja ini adalah RAM itu, dan
            scene akan kehilangan subjeknya kalau namanya ikut pergi. */}
        <div
          style={{
            position: "absolute",
            left: ke(X_MEJA_AWAL, X_MEJA) - 320,
            top: ke(802, 936),
            width: 640,
            textAlign: "center",
          }}
        >
          <p
            className="t-title"
            style={{
              fontSize: ke(76, 30),
              letterSpacing: `${ke(-0.02, 0.16)}em`,
              color: "var(--accent-ink)",
            }}
          >
            RAM
          </p>
        </div>

        {/* ---------- bidang kotak ---------- */}
        <div
          style={{
            position: "absolute",
            left: KIRI,
            top: AREA.y,
            width: AREA.w,
            height: AREA.h,
            borderRadius: 12,
            border: "3px solid var(--accent)",
            background: "var(--accent-soft)",
            opacity: mArea,
            transform: `scaleY(${0.08 + 0.92 * mArea}) scale(${1 + denyut})`,
            transformOrigin: "bottom center",
          }}
        />

        {/* sorot bergantian — kotak kiri lalu kotak kanan */}
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: KIRI + (i * AREA.w) / 2,
              top: AREA.y,
              width: AREA.w / 2,
              height: AREA.h,
              background: "var(--accent)",
              opacity: (i === 0 ? gelombang : 1 - gelombang) * kuat * 0.3,
            }}
          />
        ))}

        {/* garis pemisah — satu generasi per belahan */}
        {GARIS.map((g) => {
          const m = t(d, { mulai: g.mulai, durasi: 0.34, dari: 0, ke: 1, ease: E.expoOut });
          const tegak = g.arah === "v";
          return (
            <div
              key={`${g.arah}-${g.p}`}
              style={{
                position: "absolute",
                left: tegak ? KIRI + g.p * AREA.w - 1.5 : KIRI,
                top: tegak ? AREA.y : AREA.y + g.p * AREA.h - 1.5,
                width: tegak ? 3 : AREA.w,
                height: tegak ? AREA.h : 3,
                background: "var(--accent)",
                opacity: Math.min(1, m * 3),
                transform: tegak ? `scaleY(${m})` : `scaleX(${m})`,
              }}
            />
          );
        })}

        {/* nomor kotak — 0/1, lalu dua digit, lalu tiga */}
        {LABEL.map((l) => (
          <div
            key={`${l.font}-${l.teks}`}
            style={{
              position: "absolute",
              left: l.x - 160,
              top: l.y - l.font / 2,
              width: 320,
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: l.font,
              lineHeight: 1,
              color: "var(--accent-ink)",
              opacity:
                t(d, { mulai: l.mulai, durasi: 0.3, dari: 0, ke: 1 }) *
                t(d, { mulai: l.habis, durasi: 0.2, dari: 1, ke: 0 }),
              transform: `scale(${t(d, {
                mulai: l.mulai,
                durasi: 0.4,
                dari: 0.6,
                ke: 1,
                ease: E.backOut(1.6),
              })})`,
            }}
          >
            {l.teks}
          </div>
        ))}

        {/* ---------- slot digit ---------- */}
        <p
          className="t-label"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 238,
            textAlign: "center",
            ...masuk(d, { mulai: T_SLOT, durasi: 0.4, geser: 10 }),
          }}
        >
          digit nomor
        </p>

        {T_SLOTS.map((mulai, i) => (
          <div
            key={mulai}
            style={{
              position: "absolute",
              left: X_MEJA + geserSlot - i * LANGKAH_SLOT - SLOT.sisi / 2,
              top: SLOT.y - SLOT.sisi / 2,
              width: SLOT.sisi,
              height: SLOT.sisi,
              borderRadius: 10,
              border: "2px solid var(--accent)",
              background: "var(--accent-soft)",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 26,
              color: "var(--accent-ink)",
              opacity: t(d, { mulai, durasi: 0.24, dari: 0, ke: 1 }),
              transform: `scale(${t(d, {
                mulai,
                durasi: 0.42,
                dari: 0.4,
                ke: 1,
                ease: E.backOut(2),
              })})`,
            }}
          >
            {/* Slot, bukan nilai. Menuliskan angka tertentu di sini berarti
                mengarang alamat yang tidak pernah dibicarakan naskah. */}
            <i
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--accent-ink)",
                opacity: 0.55,
              }}
            />
          </div>
        ))}

        {/* jumlah kotak sekarang */}
        <p
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 352,
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 40,
            color: "var(--ink-1)",
            opacity: t(d, { mulai: T_B1 + 0.24, durasi: 0.4, dari: 0, ke: 1 }),
            transform: `scale(${1 + denyut * 2})`,
          }}
        >
          <span style={{ color: "var(--accent-ink)" }}>{2 ** Math.max(1, tingkat)}</span> kotak
        </p>

        {/* ---------- 8 · 16 · 32 ---------- */}
        {ANGKA.map((a, i) => {
          const m = masuk(d, {
            mulai: T_ANGKA + i * JEDA_ANGKA,
            durasi: 0.5,
            geser: 28,
          });
          const x = a.dx + (a.dxKecil - a.dx) * naik;
          const y = 585 + (132 - 585) * naik;
          const font = 132 + (84 - 132) * naik;
          const nyala = t(d, { mulai: a.nyala, durasi: 0.32, dari: 0, ke: 1 });
          /* Denyut sekali saat menyala, lalu tenang — bukan kedip berulang. */
          const pop = tPP(d, { mulai: a.nyala, durasi: 0.44, dari: 1, ke: 1.14 });

          return (
            <div
              key={a.teks}
              style={{
                position: "absolute",
                left: X_MEJA + x - 200,
                top: y - font / 2,
                width: 400,
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: font,
                lineHeight: 1,
                opacity: m.opacity,
                transform: `${m.transform} scale(${pop})`,
              }}
            >
              {/* Dua salinan bertumpuk: putih yang meredup jadi jejak, dan
                  indigo yang menyala saat jumlah kotaknya sampai. Warna tidak
                  bisa di-tween langsung, opasitas bisa. */}
              <span style={{ color: "var(--ink-0)", opacity: 1 - 0.55 * naik }}>{a.teks}</span>
              <span
                data-tumpang="sengaja"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  color: "var(--accent-ink)",
                  opacity: nyala,
                }}
              >
                {a.teks}
              </span>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};
