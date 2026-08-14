/* T01 · scene 8 · ram-generasi — bagian 6 [explaining], 17,11 dtk
   Direction: 08-ram-generasi-direction.md   ← sumber tata letak & koreografi
   VO:        08-ram-generasi-vo.md          ← sumber kalimat & beat

   Pasangan langsung scene 7. Yang itu menjawab "yang mana bendanya"; yang ini
   menjawab angka kedua di kotaknya — angka yang membuat orang salah beli.

   TIDAK ADA DETIK YANG DIKETIK DI SINI. Tiap tahap dipatok ke `beat(...)` dari
   timing.gen.ts (HARD RULE 4). "D D R empat" dan "D D R lima" sengaja jadi dua
   baris sendiri di rencana VO supaya labelnya bisa menyala tepat saat namanya
   disebut; kalau ketiganya satu baris, komposisi harus menebak sendiri kapan
   nama kedua jatuh di dalam beat lima setengah detik.

   TIGA KEPUTUSAN:

   1. Posisi coakan SKEMATIS, dan itu ditulis di ../batang-ram.tsx. Yang diklaim
      scene ini cuma bahwa ketiganya TIDAK SAMA — itu benar, dan itu satu-satunya
      yang perlu benar supaya kalimat terakhirnya berdiri. Angka posisi yang
      sebenarnya menunggu baris ⚠ JEDEC di naskah.md § Sumber, dan VO tidak
      pernah menyebut ukuran, jadi tidak ada klaim yang menggantung.

   2. Perbedaan generasi ditunjukkan lewat RITME titik di garis ke prosesor,
      bukan lewat angka. Semua angka bandwidth dan latensi DDR masih ⚠ di naskah
      § Sumber; yang diucapkan VO cuma "mengubah cara meja bicara dengan
      prosesor", yang benar tanpa perlu ditopang angka.

   3. Scene berakhir pada kegagalan. Tidak ada penutup "yang benar begini":
      penonton yang sudah melihat batangnya tertahan tidak perlu diberi
      jawabannya lagi, dan beat untuk itu memang tidak ada di rencana VO.

   Kesinambungan dari ram-bentuk: batang mulai PERSIS di slot kartu desktop
   scene 7 — koordinatnya dari "titik serah" di ../batang-ram.tsx, bukan diketik
   ulang di sini.
*/
import type React from "react";

import { E, gambarGaris, getar, masuk, t, useDetik } from "../../../shared/anim";
import { Ic } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import {
  Batang,
  CELAH_TERTAHAN,
  MUNDUR_TERTAHAN,
  Papan,
  Slot,
  TAKIK,
  TINGGI_BATANG,
  TINGGI_KAKI,
  TINGGI_SLOT,
  W_DEKAT,
  W_DESKTOP,
  W_PAPAN,
  X_DEKAT,
  X_KARTU,
  Y_PAPAN,
  Y_SLOT,
  Y_SLOT_LAMA,
  Y_TANCAP,
  Y_TERTAHAN,
} from "../batang-ram";
import { beat } from "../timing.gen";

/* --- waktu: dari rencana VO, tidak pernah diketik --------------------------- */

const B = (i: number) => beat("ram-generasi", i);

const T_DERET = B(0); // batang naik, dua salinan turun
const T_DDR4 = B(1);
const T_DDR5 = B(2);
const T_GENERASI = B(3); // kurung + kata "generasi"
const T_BICARA = B(4); // garis ke prosesor, ritmenya beda-beda
const T_COAKAN = B(5);
const T_TOLAK = B(6);

/* --- geometri -------------------------------------------------------------- */

/** Titik berangkat: slot kartu desktop di scene 7. */
const X_AWAL = X_KARTU[0] - W_DESKTOP / 2;

/* Lebar & tepi kirinya milik ../batang-ram.tsx: kotak batang di frame terakhir
   scene ini adalah kotak berangkat morph di frame pertama `ram-tugas`. */
const X_KIRI = X_DEKAT;
const W_BATANG = W_DEKAT;
const X_KANAN = X_KIRI + W_BATANG;

/** Rata KIRI, bukan rata tengah: tiga benda yang lebarnya sama dibandingkan
 *  posisi coakannya, dan pembanding itu runtuh kalau acuannya bergeser. */
const GENERASI = [
  { nama: "DDR3", y: 250, takik: TAKIK.ddr3, redup: 0.45, titik: 2, periode: 1.4 },
  { nama: "DDR4", y: 430, takik: TAKIK.ddr4, redup: 1, titik: 3, periode: 1 },
  { nama: "DDR5", y: 610, takik: TAKIK.ddr5, redup: 1, titik: 5, periode: 0.7 },
] as const;

const IDX_DDR5 = 2;
const Y_TENGAH = GENERASI[1].y;

/** Kolom kiri: kata "generasi", kurungnya, lalu ketiga nama — dari luar ke
 *  dalam. Ketiganya diketik sebagai satu deret angka supaya jarak antarnya
 *  terlihat di satu tempat, bukan tersebar di tiga blok gaya. */
const X_GENERASI = { kiri: 40, lebar: 190 };
const X_KURUNG = 260;
const X_LABEL = { kiri: 306, lebar: 240 };

const PROSESOR = { x: 1560, y: Y_TENGAH + TINGGI_BATANG / 2 };

/** Bilah pembanding tempat ketiga garis coakan mendarat. */
const Y_BILAH = 838;

/* --- tahap 5: slot lama --------------------------------------------------- */

/* Slotnya, celah tertahannya, dan mundur kecil sesudahnya ada di
   ../batang-ram.tsx — scene berikutnya berangkat dari kotak yang sama. */
const W_SLOT_LAMA = W_BATANG + 20;
const X_SLOT_LAMA = X_KIRI - 10;
const Y_ANGKAT = 400;

/** Sumbu tegak coakan batang DDR5 dan kunci slot DDR4 — dua angka yang
 *  seharusnya bertemu dan tidak pernah bertemu. */
const X_COAKAN_DDR5 = X_KIRI + W_BATANG * TAKIK.ddr5;
const X_KUNCI_LAMA = X_SLOT_LAMA + W_SLOT_LAMA * TAKIK.ddr4;

/* ===========================================================================
   Scene
   ======================================================================== */

export const RamGenerasi: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: satu batang jadi tiga --- */
  const naik = t(d, { mulai: T_DERET, durasi: 0.95, dari: 0, ke: 1, ease: E.power3out });
  const pisah = t(d, {
    mulai: T_DERET + 0.95,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const pudarKartu = t(d, { mulai: T_DERET, durasi: 0.4, dari: 1, ke: 0 });

  const xBatang = X_AWAL + (X_KIRI - X_AWAL) * naik;
  const wBatang = W_DESKTOP + (W_BATANG - W_DESKTOP) * naik;

  /* --- tahap 4: garis ke prosesor --- */
  const gambar = (i: number) =>
    t(d, {
      mulai: T_BICARA + 0.15 + i * 0.6,
      durasi: 0.4,
      dari: 0,
      ke: 1,
      ease: E.power2out,
    });
  const pudarBicara = t(d, { mulai: T_COAKAN, durasi: 0.3, dari: 1, ke: 0 });

  /* --- tahap 5: coakan ---
     Condongnya dikembalikan ke 1 di tahap 6: batang yang masih membesar 12%
     akan lebih lebar daripada slotnya, dan "tidak masuk" jadi terbaca sebagai
     kesalahan gambar, bukan sebagai kunci yang tidak cocok. */
  const tegakLagi = t(d, { mulai: T_TOLAK, durasi: 0.4, dari: 1, ke: 0 });
  /* 7%, bukan 12%: skalanya bertumpu di coakan supaya posisi coakan tidak ikut
     bergeser (kalau bergeser, seluruh perbandingan scene ini bohong) — dan
     konsekuensinya tepi kiri ketiga batang jadi tidak lagi rata. Di 12% itu
     terbaca sebagai tata letak yang meleset, di 7% terbaca sebagai mencondong. */
  const condong = (i: number) =>
    1 +
    0.07 *
      tegakLagi *
      t(d, { mulai: T_COAKAN + 0.2 + i * 0.12, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });
  const turunGaris = (i: number) =>
    t(d, {
      mulai: T_COAKAN + 0.6 + i * 0.12,
      durasi: 0.45,
      dari: 0,
      ke: 1,
      ease: E.power2out,
    });

  /* --- tahap 6: tidak masuk --- */
  const pudarLain = t(d, { mulai: T_TOLAK, durasi: 0.4, dari: 1, ke: 0 });
  const munculSlot = t(d, { mulai: T_TOLAK + 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const angkatDulu = t(d, {
    mulai: T_TOLAK,
    durasi: 0.45,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  /* Turun dengan `power2.in` lalu BERHENTI — tanpa easing keluar. Ia ditahan
     benda keras, bukan diletakkan pelan-pelan. */
  const turun = t(d, {
    mulai: T_TOLAK + 0.7,
    durasi: 0.45,
    dari: 0,
    ke: 1,
    ease: E.power2in,
  });
  const mundur = t(d, {
    mulai: T_TOLAK + 1.7,
    durasi: 0.35,
    dari: 0,
    ke: -MUNDUR_TERTAHAN,
  });
  const silang = t(d, { mulai: T_TOLAK + 1.55, durasi: 0.45, dari: 0, ke: 1 });
  const sumbu = t(d, { mulai: T_TOLAK + 1.5, durasi: 0.4, dari: 0, ke: 1 });

  const mSatu = masuk(d, { mulai: T_BICARA, durasi: 0.45, geser: 14 });
  const mGenerasi = masuk(d, { mulai: T_GENERASI + 0.1, durasi: 0.4, geser: 12 });

  const yDdr5 =
    GENERASI[IDX_DDR5].y +
    (Y_ANGKAT - GENERASI[IDX_DDR5].y) * angkatDulu +
    (Y_TERTAHAN - Y_ANGKAT) * turun +
    mundur;

  /** Getarnya mendatar — batang yang tertahan tidak amblas ke bawah. */
  const goyang = getar(d, { mulai: T_TOLAK + 1.15, durasi: 0.55, jauh: 14, putaran: 4 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* ---------- kesinambungan: papan & slot kartu desktop scene 7 ---------- */}
        <Papan
          x={X_KARTU[0] - W_PAPAN / 2}
          y={Y_PAPAN}
          w={W_PAPAN}
          opacity={pudarKartu}
        />
        <Slot
          x={X_KARTU[0] - (W_DESKTOP + 20) / 2}
          y={Y_SLOT}
          w={W_DESKTOP + 20}
          opacity={pudarKartu}
        />

        {/* ---------- garis ke prosesor ---------- */}
        <svg
          style={{ position: "absolute", inset: 0, width: 1920, height: 1080 }}
          fill="none"
          opacity={pudarBicara}
        >
          {GENERASI.map((g, i) => {
            const y = g.y + TINGGI_BATANG / 2;
            const panjang = Math.hypot(PROSESOR.x - X_KANAN, PROSESOR.y - y);
            return (
              <line
                key={g.nama}
                x1={X_KANAN}
                y1={y}
                x2={PROSESOR.x}
                y2={PROSESOR.y}
                stroke="var(--accent-ink)"
                strokeWidth={3}
                opacity={0.55}
                {...gambarGaris(d, panjang, {
                  mulai: T_BICARA + 0.15 + i * 0.6,
                  durasi: 0.4,
                })}
              />
            );
          })}
        </svg>

        {/* Titik yang berjalan di tiap garis. Rapatnya berbeda per generasi, dan
            itu SATU-SATUNYA cara scene ini menyatakan "lebih cepat" — angka
            bandwidth masih ⚠ di naskah § Sumber (keputusan 2). */}
        {GENERASI.map((g, i) =>
          Array.from({ length: g.titik }, (_, k) => {
            const y = g.y + TINGGI_BATANG / 2;
            const p = (((d - T_BICARA) / g.periode + k / g.titik) % 1 + 1) % 1;
            return (
              <div
                key={`${g.nama}-${k}`}
                style={{
                  position: "absolute",
                  left: X_KANAN + (PROSESOR.x - X_KANAN) * p - 6,
                  top: y + (PROSESOR.y - y) * p - 6,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "var(--accent-ink)",
                  opacity: gambar(i) * pudarBicara * 0.9,
                }}
              />
            );
          }),
        )}

        {/* ---------- prosesor ---------- */}
        <div
          style={{
            position: "absolute",
            left: PROSESOR.x - 80,
            top: PROSESOR.y - 80,
            width: 160,
            height: 160,
            display: "grid",
            placeItems: "center",
            /* Opasitas masuk DIKALIKAN dengan pudarnya, bukan ditumpuk lewat
               spread: `...masuk()` menulis `opacity` sendiri dan akan menimpa
               nilai sebelumnya, jadi prosesornya tidak akan pernah pergi. */
            transform: mSatu.transform,
            opacity: mSatu.opacity * pudarBicara,
          }}
        >
          <Ic n="chip" ukuran="lg" warna="c-mute" />
        </div>

        {/* ---------- kurung "generasi" ----------
            Kurungnya di KIRI label, bukan di antara label dan batang: kurung
            yang berdiri di sebelah kanan label terbaca sebagai merangkul
            batangnya, dan yang dirangkul di sini adalah ketiga namanya. */}
        <div
          style={{
            position: "absolute",
            left: X_KURUNG,
            top: GENERASI[0].y - 10,
            width: 22,
            height: GENERASI[2].y + TINGGI_BATANG + 10 - (GENERASI[0].y - 10),
            borderLeft: "4px solid var(--ink-2)",
            borderTop: "4px solid var(--ink-2)",
            borderBottom: "4px solid var(--ink-2)",
            opacity: pudarLain,
            transform: `scaleY(${t(d, {
              mulai: T_GENERASI,
              durasi: 0.35,
              dari: 0,
              ke: 1,
              ease: E.expoOut,
            })})`,
          }}
        />
        <p
          className="t-label"
          style={{
            position: "absolute",
            left: X_GENERASI.kiri,
            top: Y_TENGAH + 20,
            width: X_GENERASI.lebar,
            textAlign: "right",
            color: "var(--ink-1)",
            transform: mGenerasi.transform,
            opacity: mGenerasi.opacity * pudarLain,
          }}
        >
          generasi
        </p>

        {/* ---------- bilah pembanding & garis coakan ---------- */}
        <div
          style={{
            position: "absolute",
            left: X_KIRI - 60,
            top: Y_BILAH,
            width: W_BATANG + 120,
            height: 3,
            background: "var(--ink-2)",
            opacity: turunGaris(0) * pudarLain,
          }}
        />
        {GENERASI.map((g, i) => {
          const x = X_KIRI + W_BATANG * g.takik;
          const dari = g.y + TINGGI_BATANG + TINGGI_KAKI;
          return (
            <div
              key={`sumbu-${g.nama}`}
              style={{
                position: "absolute",
                left: x - 1.5,
                top: dari,
                width: 3,
                height: (Y_BILAH - dari) * turunGaris(i),
                backgroundImage:
                  "repeating-linear-gradient(180deg, var(--accent-ink) 0 10px, transparent 10px 20px)",
                opacity: 0.8 * pudarLain,
              }}
            />
          );
        })}

        {/* ---------- ketiga batang ---------- */}
        {GENERASI.map((g, i) => {
          const ddr5 = i === IDX_DDR5;
          const dibawa = i === 1;
          /* Yang tengah adalah batang yang DIBAWA dari scene 7: ia berangkat
             dari slot kartu desktop dan tumbuh di tempatnya. Dua lainnya
             salinan yang memisahkan diri darinya, jadi keduanya berangkat dari
             posisi batang tengah — bukan muncul begitu saja di tempatnya. */
          const yDeret = dibawa
            ? Y_TANCAP + (Y_TENGAH - Y_TANCAP) * naik
            : Y_TENGAH + (g.y - Y_TENGAH) * pisah;
          const y = ddr5 ? yDdr5 : yDeret;

          return (
            <div key={g.nama}>
              <Batang
                x={(dibawa ? xBatang : X_KIRI) + (ddr5 ? goyang : 0)}
                y={y}
                w={dibawa ? wBatang : W_BATANG}
                takik={g.takik}
                nChip={8}
                nKaki={28}
                opacity={(dibawa ? 1 : pisah) * g.redup * (ddr5 ? 1 : pudarLain)}
                skala={condong(i)}
                asal={`${g.takik * 100}% bottom`}
              />
              {/* Label menyala tepat saat namanya disebut — itu sebabnya
                  "D D R empat" dan "D D R lima" jadi dua baris sendiri di
                  rencana VO. DDR3 tidak pernah disebut, jadi ia mendarat
                  bersama deretnya dan tetap redup. */}
              <p
                style={{
                  position: "absolute",
                  left: X_LABEL.kiri,
                  top: y + 14,
                  width: X_LABEL.lebar,
                  textAlign: "right",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: 44,
                  color: i === 0 ? "var(--ink-2)" : "var(--accent-ink)",
                  opacity:
                    g.redup *
                    (ddr5 ? 1 : pudarLain) *
                    t(d, {
                      mulai: i === 0 ? T_DERET + 1.2 : dibawa ? T_DDR4 : T_DDR5,
                      durasi: 0.35,
                      dari: 0,
                      ke: 1,
                    }),
                }}
              >
                {g.nama}
              </p>
            </div>
          );
        })}

        {/* ---------- slot lama ---------- */}
        <div style={{ opacity: munculSlot }}>
          <Papan
            x={X_SLOT_LAMA - 40}
            y={Y_SLOT_LAMA + TINGGI_SLOT}
            w={W_SLOT_LAMA + 80}
          />
          <Slot
            x={X_SLOT_LAMA}
            y={Y_SLOT_LAMA}
            w={W_SLOT_LAMA}
            kunci={TAKIK.ddr4}
          />
          <p
            className="t-label"
            style={{
              position: "absolute",
              left: X_SLOT_LAMA,
              top: Y_SLOT_LAMA + 74,
              width: W_SLOT_LAMA,
              textAlign: "center",
            }}
          >
            slot DDR4
          </p>
        </div>

        {/* ---------- kunci vs coakan: dua sumbu yang tidak pernah bertemu ---------- */}
        {[X_COAKAN_DDR5, X_KUNCI_LAMA].map((x, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 1.5,
              top: Y_TERTAHAN + TINGGI_BATANG,
              width: 3,
              height: (Y_SLOT_LAMA + 24 - (Y_TERTAHAN + TINGGI_BATANG)) * sumbu,
              backgroundImage:
                "repeating-linear-gradient(180deg, var(--bad) 0 9px, transparent 9px 18px)",
              opacity: 0.9 * sumbu,
            }}
          />
        ))}
        {/* Selisihnya digambar sebagai jarak, bukan cuma sebagai dua garis:
            dua sumbu tegak berdampingan masih bisa dibaca sebagai "kira-kira
            sejajar", satu ruas mendatar di antaranya tidak bisa. */}
        <div
          style={{
            position: "absolute",
            left: Math.min(X_COAKAN_DDR5, X_KUNCI_LAMA),
            top: Y_SLOT_LAMA - CELAH_TERTAHAN / 2,
            width: Math.abs(X_COAKAN_DDR5 - X_KUNCI_LAMA) * sumbu,
            height: 3,
            background: "var(--bad)",
            opacity: sumbu,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: X_SLOT_LAMA + W_SLOT_LAMA + 60,
            top: Y_SLOT_LAMA - 60,
            opacity: silang,
            transform: `scale(${t(d, {
              mulai: T_TOLAK + 1.55,
              durasi: 0.5,
              dari: 0.4,
              ke: 1,
              ease: E.backOut(2),
            })})`,
          }}
        >
          <Ic n="x" warna="c-bad" />
        </div>
      </div>
    </Scene>
  );
};
