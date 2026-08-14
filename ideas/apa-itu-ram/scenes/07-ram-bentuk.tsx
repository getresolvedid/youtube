/* T01 · scene 7 · ram-bentuk — bagian 6 [explaining], 19,68 dtk
   Direction: 07-ram-bentuk-direction.md   ← sumber tata letak & koreografi
   VO:        07-ram-bentuk-vo.md          ← sumber kalimat & beat

   Scene pertama yang membawa analogi meja KELUAR ke benda fisik. Sampai scene
   sebelumnya penonton punya model yang benar tapi belum pernah melihat
   bendanya — kalau ia berdiri di depan komputernya sendiri, ia masih tidak tahu
   yang mana RAM.

   TIDAK ADA DETIK YANG DIKETIK DI SINI. Tiap tahap dipatok ke `beat(...)` dari
   timing.gen.ts (HARD RULE 4), jadi mengubah satu kalimat di rencana VO
   menggeser koreografinya sendiri. Yang boleh berupa angka cuma offset DI DALAM
   satu beat — "kaki mulai rontok 1,5 dtk setelah beatnya mulai" adalah
   keputusan koreografi, bukan hasil menghitung sendiri kapan beat itu mulai.

   TIGA KEPUTUSAN:

   1. Batangnya SATU benda, bukan empat gambar. Ia lahir dari bidang kotak scene
      sebelumnya, mengecil di tempat sampai kartu desktop tumbuh mengelilinginya,
      disalin ke kartu kedua sambil memendek, lalu kehilangan kakinya di kartu
      ketiga. Empat ilustrasi yang berdiri sendiri akan terbaca sebagai katalog;
      satu benda yang terus berubah terbaca sebagai satu pernyataan.

   2. Kisi selnya sama persis di keempat kartu — dan itulah kalimat terakhir
      scene ini, diucapkan oleh bentuk, bukan oleh teks. Prosesor grafis di kartu
      keempat SENGAJA tidak ikut menyala: ia bukan memori, dan kalau ikut,
      "tugasnya sama persis" jadi salah.

   3. Papan keempat kartu di ketinggian yang sama persis (Y_PAPAN). Keempat benda
      di sini dibandingkan, dan pembanding yang garis dasarnya berbeda tidak
      membandingkan apa-apa.

   Kesinambungan dari ram-size: bidang kotak mulai PERSIS di geometri terakhir
   scene 6 (KIRI 570, y 420, 780x390, terbelah 8 kolom x 4 baris), meja di 1080
   skala 1,6, kata RAM kecil di bawahnya. Potongan antar-scene keras, jadi
   kesinambungan itu satu-satunya yang menyambungkan keduanya.

   Nama resmi (DIMM, SO-DIMM, dipatri, memori sendiri) cuma sublabel di layar,
   tidak pernah diucapkan VO — tujuh akronim dalam dua puluh detik, dan tidak
   satu pun punya kalimat L1 pembuka (docs/09).
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Ic } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import {
  Batang,
  Kisi,
  Papan,
  Slot,
  TINGGI_BATANG,
  W_DESKTOP,
  W_PAPAN,
  X_KARTU,
  Y_PAPAN,
  Y_SLOT,
  Y_TANCAP,
} from "../batang-ram";
import { beat } from "../timing.gen";

/* --- waktu: dari rencana VO, tidak pernah diketik --------------------------- */

const B = (i: number) => beat("ram-bentuk", i);

const T_WUJUD = B(0); // kisi mengatup jadi batang
const T_DESKTOP = B(1);
const T_LAPTOP = B(2);
const T_PONSEL = B(3); // batang datang, tidak ada slot
const T_PATRI = B(4); // kaki rontok, batang jadi chip
const T_GPU = B(5);
const T_SAMA = B(6); // kisi menyala di keempatnya

/* --- geometri --------------------------------------------------------------
   SEMUA angka di bawah dalam koordinat BARISAN, bukan koordinat frame. Barisan
   kartu digeser sebagai satu blok supaya isinya selalu terpusat di layar (lihat
   `geser` di bawah), dan menghitung ulang tiap benda terhadap geseran itu
   berarti empat belas angka yang harus dikoreksi bersamaan tiap kali jaraknya
   berubah.

   Kartu pertama ada di 300, dan pada saat ia muncul geserannya +660 — jadi ia
   lahir tepat di tengah layar (960), di tempat batangnya sudah berdiri.
   Kompensasi itulah yang dipakai untuk menempatkan sisa scene 6 di bawah. */

/** Kartu digantung ke Y_PAPAN, bukan diketik: barisannya pernah duduk 80 px
 *  lebih rendah dengan sepertiga tinggi kartunya kosong di atas benda. */
const KARTU = { w: 380, h: 310 };
const Y_KARTU = Y_PAPAN - 200;
const Y_LABEL = Y_PAPAN + 26;
const Y_SUBLABEL = Y_PAPAN + 72;
/** Jarak antar-pusat kartu. Tiap kartu baru menggeser barisan setengahnya. */
const JARAK_KARTU = 440;
const GESER_AWAL = 660;
/** Ke koordinat barisan: benda yang di scene 6 ada di tengah frame ada di sini. */
const K = X_KARTU[0] - 960;

/* --- keadaan akhir 06-ram-size, dibawa apa adanya --- */

const AREA = { x: 570 + K, y: 420, w: 780, h: 390 };
/** Belahan terakhir scene 6: 8 kolom x 4 baris. */
const KOLOM_AKHIR = 8;
const BARIS_AKHIR = 4;
const X_MEJA = 960 + K;
const MEJA_W = 520;
const Y_MEJA = 856;
const SKALA_MEJA = 1.6;

/** Batang saat masih sendirian, sebelum kartunya tumbuh mengelilinginya.
 *  Pusatnya sama dengan pusat bidang kotak dan pusat kartu pertama — ketiganya
 *  segaris, jadi tidak ada satu pun perpindahan mendatar di tahap 1 dan 2. */
const PUSAT = { y: 300, w: 620 };
const Y_LAYANG = Y_TANCAP - 57;

const W_LAPTOP = 190;
const SISI_CHIP = 96;
const Y_CHIP = Y_PAPAN - SISI_CHIP;

/** Kartu grafis — prosesor di tengah, empat chip memori mengelilinginya. */
const GPU = { x: X_KARTU[3], y: Y_PAPAN - 80 };
const SISI_MEM = 62;
const MEM = [
  { x: GPU.x - 110, y: Y_PAPAN - 130 },
  { x: GPU.x + 110, y: Y_PAPAN - 130 },
  { x: GPU.x - 110, y: Y_PAPAN - 40 },
  { x: GPU.x + 110, y: Y_PAPAN - 40 },
] as const;

/* ===========================================================================
   Perabot
   ======================================================================== */

const KartuBenda: React.FC<{
  cx: number;
  m: { opacity: number; transform: string };
  angkat: number;
  label: string;
  sub: string;
  children: React.ReactNode;
}> = ({ cx, m, angkat, label, sub, children }) => (
  <>
    <div
      className="panel"
      style={{
        position: "absolute",
        left: cx - KARTU.w / 2,
        top: Y_KARTU,
        width: KARTU.w,
        height: KARTU.h,
        padding: 0,
        opacity: m.opacity,
        transform: `${m.transform} translateY(${angkat}px)`,
      }}
    />
    {/* Isi kartu digambar DI LUAR panelnya, dalam koordinat barisan — batang
        pertama sudah berdiri jauh sebelum kartunya ada, dan benda yang hidup di
        dalam kotak induknya akan ikut memudar bersama kotak itu. */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: m.opacity,
        transform: `translateY(${angkat}px)`,
      }}
    >
      {children}
      <p
        style={{
          position: "absolute",
          left: cx - KARTU.w / 2,
          top: Y_LABEL,
          width: KARTU.w,
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 32,
          color: "var(--ink-0)",
        }}
      >
        {label}
      </p>
      <p
        className="t-label"
        style={{
          position: "absolute",
          left: cx - KARTU.w / 2,
          top: Y_SUBLABEL,
          width: KARTU.w,
          textAlign: "center",
        }}
      >
        {sub}
      </p>
    </div>
  </>
);

/** Chip memori yang dipatri: kotak berisi kisi sel yang sama dengan isi batang. */
const ChipMemori: React.FC<{
  cx: number;
  cy: number;
  sisi: number;
  nyala: number;
  opacity?: number;
  skala?: number;
}> = ({ cx, cy, sisi, nyala, opacity = 1, skala = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: cx - sisi / 2,
      top: cy - sisi / 2,
      width: sisi,
      height: sisi,
      borderRadius: 8,
      background: "var(--bg-elev)",
      border: "3px solid var(--accent)",
      display: "grid",
      placeItems: "center",
      opacity,
      transform: `scale(${skala})`,
    }}
  >
    <Kisi
      kolom={3}
      baris={3}
      sel={Math.round(sisi * 0.19)}
      jeda={Math.round(sisi * 0.06)}
      nyala={nyala}
    />
  </div>
);

/* ===========================================================================
   Scene
   ======================================================================== */

export const RamBentuk: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: bidang kotak mengatup jadi batang --- */
  const atup = t(d, {
    mulai: T_WUJUD,
    durasi: 0.9,
    dari: 0,
    ke: 1,
    ease: E.power2in,
  });
  const antara = (dari: number, ke: number) => dari + (ke - dari) * atup;
  const pudarKisi = t(d, { mulai: T_WUJUD, durasi: 0.45, dari: 1, ke: 0 });
  const pudarMeja = t(d, { mulai: T_WUJUD, durasi: 0.7, dari: 1, ke: 0 });
  const munculBatang = t(d, { mulai: T_WUJUD + 0.55, durasi: 0.45, dari: 0, ke: 1 });

  /* --- tahap 2: batang mengecil ke ukuran kartu, lalu ditancapkan ---
     Satu benda, bukan dua: yang di tengah dan yang di kartu 1 adalah elemen
     yang sama (keputusan 1). Tidak ada perpindahan mendatar — pusat bidang
     kotak, pusat batang, dan pusat kartu pertama semuanya di titik yang sama. */
  const kecil = t(d, {
    mulai: T_DESKTOP,
    durasi: 0.9,
    dari: 0,
    ke: 1,
    ease: E.power3out,
  });
  const tancap1 = t(d, {
    mulai: T_DESKTOP + 0.95,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const w1 = antara(AREA.w, PUSAT.w) + (W_DESKTOP - PUSAT.w) * kecil;
  const x1 = X_KARTU[0] - w1 / 2;
  const y1 =
    antara(AREA.y, PUSAT.y) +
    (Y_LAYANG - PUSAT.y) * kecil +
    (Y_TANCAP - Y_LAYANG) * tancap1;

  /* --- barisan kartu selalu terpusat ---
     Tiap kartu baru menggeser barisan setengah jaraknya ke kiri: satu kartu di
     tengah, lalu dua, lalu tiga, lalu empat. Pecahan, bukan bilangan bulat —
     geserannya jatuh bersamaan dengan kartu yang sedang masuk, bukan melompat
     di frame kartu itu muncul. */
  const nTampil = [T_DESKTOP, T_LAPTOP, T_PONSEL, T_GPU].reduce(
    (n, m) => n + t(d, { mulai: m, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out }),
    0,
  );
  const geser = GESER_AWAL - (JARAK_KARTU / 2) * Math.max(0, nTampil - 1);

  /* --- tahap 3: salinan di kartu kedua, memendek sambil turun --- */
  const turun2 = t(d, {
    mulai: T_LAPTOP + 0.15,
    durasi: 0.75,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const w2 = W_DESKTOP + (W_LAPTOP - W_DESKTOP) * turun2;
  const y2 = Y_LAYANG + (Y_TANCAP - Y_LAYANG) * turun2;

  /* --- tahap 4: kartu ketiga, tidak ada slot, kaki rontok --- */
  const turun3 = t(d, {
    mulai: T_PONSEL + 0.1,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const y3 = Y_LAYANG - 45 + (Y_TANCAP - Y_LAYANG + 45) * turun3;
  const rontok = (i: number) =>
    1 -
    t(d, {
      mulai: T_PONSEL + 1.5 + i * 0.04,
      durasi: 0.3,
      dari: 0,
      ke: 1,
      ease: E.power1in,
    });

  /* --- tahap 5: batang menyusut jadi chip yang dipatri --- */
  const susut = t(d, { mulai: T_PATRI, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });
  const pudarBatang3 = t(d, { mulai: T_PATRI + 0.15, durasi: 0.35, dari: 1, ke: 0 });
  const w3 = W_LAPTOP + (SISI_CHIP - W_LAPTOP) * susut;
  const chipMasuk = t(d, { mulai: T_PATRI + 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const chipSkala = t(d, {
    mulai: T_PATRI + 0.2,
    durasi: 0.5,
    dari: 0.7,
    ke: 1,
    ease: E.backOut(1.8),
  });
  /** Lingkaran tipis mengembang sekali lalu hilang — "sudah, permanen".
   *  Ukurannya tween biasa, opasitasnya bolak-balik: kalau keduanya tween yang
   *  sama, cincinnya sudah terlihat penuh sebelum mulai mengembang. */
  const cincin = t(d, { mulai: T_PATRI + 1, durasi: 0.75, dari: 0, ke: 1, ease: E.expoOut });
  const cincinPudar = tPP(d, { mulai: T_PATRI + 1, durasi: 0.75, dari: 0, ke: 0.7 });

  /* --- tahap 7: kisi yang sama menyala di keempat kartu --- */
  const nyala = t(d, { mulai: T_SAMA, durasi: 0.5, dari: 0, ke: 1 });
  const angkat = tPP(d, { mulai: T_SAMA + 0.1, durasi: 0.8, dari: 0, ke: -10 });

  const mKartu = (mulai: number) => masuk(d, { mulai, durasi: 0.5, geser: 22 });
  const m1 = mKartu(T_DESKTOP);
  const m2 = mKartu(T_LAPTOP);
  const m3 = mKartu(T_PONSEL);
  const m4 = mKartu(T_GPU);

  return (
    <Scene>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${geser}px)`,
        }}
      >
        {/* ---------- kesinambungan: meja & kata RAM dari scene 6 ---------- */}
        <div
          style={{
            position: "absolute",
            left: X_MEJA - MEJA_W / 2,
            top: Y_MEJA,
            opacity: pudarMeja,
            transform: `scale(${SKALA_MEJA})`,
            transformOrigin: "top center",
          }}
        >
          <div className="meja" style={{ width: MEJA_W }} />
        </div>
        <p
          className="t-title"
          style={{
            position: "absolute",
            left: X_MEJA - 320,
            top: 936,
            width: 640,
            textAlign: "center",
            fontSize: 30,
            letterSpacing: "0.16em",
            color: "var(--accent-ink)",
            opacity: pudarMeja,
          }}
        >
          RAM
        </p>

        {/* ---------- garis pembelah scene 6, luruh saat bidangnya mengatup ---------- */}
        {[
          ...Array.from({ length: KOLOM_AKHIR - 1 }, (_, k) => ({
            tegak: true,
            p: (k + 1) / KOLOM_AKHIR,
          })),
          ...Array.from({ length: BARIS_AKHIR - 1 }, (_, k) => ({
            tegak: false,
            p: (k + 1) / BARIS_AKHIR,
          })),
        ].map((g) => (
          <div
            key={`${g.tegak ? "v" : "h"}-${g.p}`}
            style={{
              position: "absolute",
              left: g.tegak ? AREA.x + g.p * AREA.w - 1.5 : AREA.x,
              top: g.tegak ? AREA.y : AREA.y + g.p * AREA.h - 1.5,
              width: g.tegak ? 3 : AREA.w,
              height: g.tegak ? AREA.h : 3,
              background: "var(--accent)",
              opacity: pudarKisi,
            }}
          />
        ))}

        {/* ---------- bidang yang mengatup jadi badan batang ----------
            Batang <Batang> ditumpuk di atasnya dan baru muncul setelah
            bidangnya selesai menyempit — dua persegi identik di piksel yang
            sama, jadi pergantiannya tidak terlihat sama sekali. */}
        <div
          style={{
            position: "absolute",
            left: x1,
            top: y1,
            width: w1,
            height: antara(AREA.h, TINGGI_BATANG),
            borderRadius: antara(12, 8),
            border: "3px solid var(--accent)",
            background: "var(--accent-soft)",
            opacity: 1 - munculBatang,
          }}
        />

        {/* ---------- kartu 1 · desktop ---------- */}
        <KartuBenda cx={X_KARTU[0]} m={m1} angkat={angkat} label="desktop" sub="DIMM">
          <Papan x={X_KARTU[0] - W_PAPAN / 2} y={Y_PAPAN} w={W_PAPAN} />
          <Slot x={X_KARTU[0] - (W_DESKTOP + 20) / 2} y={Y_SLOT} w={W_DESKTOP + 20} />
        </KartuBenda>

        {/* Batang pertama hidup di luar kartunya: di tahap 1 ia masih di tengah
            layar, dan di tahap 2 ia melintas. Karena itu `angkat` di tahap 7
            harus ditambahkan ke koordinatnya sendiri — kalau tidak, tiga kartu
            naik dan satu batang tertinggal di tempatnya. */}
        <Batang
          x={x1}
          y={y1 + angkat}
          w={w1}
          nChip={8}
          nKaki={28}
          nyala={nyala}
          opacity={munculBatang}
          skala={1 - 0.03 * tPP(d, { mulai: T_DESKTOP + 1.05, durasi: 0.3, dari: 0, ke: 1 })}
        />

        {/* ---------- kartu 2 · laptop ---------- */}
        <KartuBenda cx={X_KARTU[1]} m={m2} angkat={angkat} label="laptop" sub="SO-DIMM">
          <Papan x={X_KARTU[1] - W_PAPAN / 2} y={Y_PAPAN} w={W_PAPAN} />
          <Slot x={X_KARTU[1] - (w2 + 20) / 2} y={Y_SLOT} w={w2 + 20} />
          <Batang
            x={X_KARTU[1] - w2 / 2}
            y={y2}
            w={w2}
            nChip={5}
            nKaki={18}
            nyala={nyala}
          />
        </KartuBenda>

        {/* ---------- kartu 3 · ponsel ----------
            Papan TANPA slot. Yang hilang di kartu ini adalah tempat masuknya,
            dan itu cuma terbaca kalau tidak ada yang menggantikannya. */}
        <KartuBenda cx={X_KARTU[2]} m={m3} angkat={angkat} label="ponsel" sub="dipatri">
          <Papan x={X_KARTU[2] - W_PAPAN / 2} y={Y_PAPAN} w={W_PAPAN} />
          <Batang
            x={X_KARTU[2] - w3 / 2}
            y={y3}
            w={w3}
            nChip={5}
            nKaki={18}
            kaki={rontok}
            nyala={nyala}
            opacity={pudarBatang3}
          />
          <ChipMemori
            cx={X_KARTU[2]}
            cy={Y_CHIP + SISI_CHIP / 2}
            sisi={SISI_CHIP}
            nyala={nyala}
            opacity={chipMasuk}
            skala={chipSkala}
          />
          {/* titik solder — keempat sisinya menempel ke papan */}
          {[-1, 1].map((s) =>
            [0, 1].map((k) => (
              <div
                key={`${s}-${k}`}
                style={{
                  position: "absolute",
                  left: X_KARTU[2] + s * (SISI_CHIP / 2 + 10) - 5,
                  top: Y_CHIP + 22 + k * 44,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--accent-ink)",
                  opacity: t(d, {
                    mulai: T_PATRI + 0.65 + (k * 2 + (s > 0 ? 1 : 0)) * 0.05,
                    durasi: 0.3,
                    dari: 0,
                    ke: 1,
                  }),
                  transform: `scale(${t(d, {
                    mulai: T_PATRI + 0.65 + (k * 2 + (s > 0 ? 1 : 0)) * 0.05,
                    durasi: 0.45,
                    dari: 0.2,
                    ke: 1,
                    ease: E.backOut(2.4),
                  })})`,
                }}
              />
            )),
          )}
          <div
            style={{
              position: "absolute",
              left: X_KARTU[2] - 90,
              top: Y_CHIP + SISI_CHIP / 2 - 90,
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: "3px solid var(--accent-ink)",
              opacity: cincinPudar,
              transform: `scale(${0.35 + 0.75 * cincin})`,
            }}
          />
        </KartuBenda>

        {/* ---------- kartu 4 · kartu grafis ---------- */}
        <KartuBenda
          cx={X_KARTU[3]}
          m={m4}
          angkat={angkat}
          label="kartu grafis"
          sub="memori sendiri"
        >
          <Papan x={X_KARTU[3] - W_PAPAN / 2} y={Y_PAPAN} w={W_PAPAN} />

          {/* tautan chip memori -> prosesor grafis */}
          <svg
            style={{ position: "absolute", inset: 0, width: 1920, height: 1080 }}
            fill="none"
          >
            {MEM.map((m, i) => (
              <line
                key={i}
                x1={m.x}
                y1={m.y}
                x2={GPU.x}
                y2={GPU.y}
                stroke="var(--accent-ink)"
                strokeWidth={3}
                opacity={
                  0.5 *
                  t(d, { mulai: T_GPU + 0.75 + i * 0.07, durasi: 0.3, dari: 0, ke: 1 })
                }
              />
            ))}
          </svg>

          {/* prosesor grafis — TIDAK ikut menyala di tahap 7 (keputusan 2) */}
          <div
            style={{
              position: "absolute",
              left: GPU.x - 60,
              top: GPU.y - 60,
              width: 120,
              height: 120,
              display: "grid",
              placeItems: "center",
              ...masuk(d, { mulai: T_GPU + 0.15, durasi: 0.45, geser: 0 }),
            }}
          >
            <Ic n="chip" warna="c-mute" style={{ width: 120, height: 120 }} />
          </div>

          {MEM.map((m, i) => (
            <ChipMemori
              key={i}
              cx={m.x}
              cy={m.y}
              sisi={SISI_MEM}
              nyala={nyala}
              opacity={t(d, {
                mulai: T_GPU + 0.4 + i * 0.07,
                durasi: 0.3,
                dari: 0,
                ke: 1,
              })}
              skala={t(d, {
                mulai: T_GPU + 0.4 + i * 0.07,
                durasi: 0.5,
                dari: 0.6,
                ke: 1,
                ease: E.backOut(1.8),
              })}
            />
          ))}
        </KartuBenda>
      </div>
    </Scene>
  );
};
