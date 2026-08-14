/* T01 · scene 9 · beda-penyimpanan — bagian 6 [explaining], 25,69 dtk
   VO:        09-beda-penyimpanan-vo.md          ← sumber kalimat & beat
   Direction: 09-beda-penyimpanan-direction.md   ← sumber tata letak & koreografi

   Scene yang akhirnya menaruh benda KEDUA di layar. Sepanjang episode "gudang"
   cuma hidup sebagai analogi; di sini ia jadi barang yang ada di komputer yang
   sama, dan tiga bedanya dengan batang ditunjukkan berurutan: muatnya, cara
   mengambil isinya, dan apa yang terjadi waktu listriknya dicabut.

   Scene ini menyerap rencana scene `ram-lupa` di naskah.md. Volatilitas tidak
   berdiri sendiri sebagai gagasan — ia baru punya arti di sebelah sesuatu yang
   TIDAK hilang, dan pembandingnya sudah berdiri di layar di sini.

   TIGA HAL YANG MENGIKAT:

   1. BATANGNYA TIDAK PERNAH BERGERAK. `10-ram-tugas` membuka dengan melebarkan
      batang di KOTAK_TERTAHAN jadi papan meja — satu tween, tanpa potongan.
      Menggeser batang di sini barang sedikit membuat morph itu mulai dari tempat
      yang salah, dan yang terbaca bukan "benda yang sama berubah bentuk"
      melainkan "ada benda lain yang muncul". Yang datang di scene ini benda
      kedua, dan ia masuk dari KIRI — kira-kira ke tempat lemari arsip mendarat
      di scene berikutnya, jadi keduanya terbaca sebagai benda yang sama berganti
      kostum.

   2. Gudangnya ABU-ABU, batangnya indigo. Indigo cuma milik jawaban episode ini
      sejak scene 4, dan jawabannya bukan gudang. Satu-satunya merah di scene ini
      adalah silang di simbol daya.

   3. Kisi gudang TIDAK BERGEMING di tahap 8 — tidak berkedip, tidak meredup,
      tidak bergerak satu piksel pun sementara isi batang lenyap satu per satu.
      Diamnya itu separuh isi tahapnya; begitu ia ikut "hidup sedikit supaya
      tidak kaku", perbandingannya hilang.

   Tidak ada satu angka pun di layar: baris ⚠ untuk latensi DAN untuk volatilitas
   dua-duanya masih terbuka di naskah.md § Sumber.

   Detik tiap tahap tidak diketik di sini; semuanya dari `beat()` di
   timing.gen.ts (HARD RULE 4).
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Ic, type NamaIkon } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import {
  Batang,
  KOTAK_TERTAHAN,
  Papan,
  Slot,
  TAKIK,
  TINGGI_SLOT,
  W_DEKAT,
  X_DEKAT,
  Y_SLOT_LAMA,
} from "../batang-ram";
import { lengkung } from "../panggung-analogi";
import { beat } from "../timing.gen";

/* --- waktu: satu baris VO = satu tahap ------------------------------------- */

const B = (i: number) => beat("beda-penyimpanan", i);

const T_TETAP = B(0); // "Batang ini bukan satu-satunya tempat berkasmu berada."
const T_MASUK = B(1); // "Ada benda lain di komputer yang sama."
const T_ISI = B(2); // "Dia yang memegang berkasmu waktu komputernya mati."
const T_NAMA = B(3); // "Namanya hardisk, atau S S D."
const T_PETA = B(4); // "Kalau batang tadi mejanya, yang ini gudangnya."
const T_JEMPUT = B(5); // "Gudang muat jauh lebih banyak, tapi isinya harus dijemput."
const T_CABUT = B(6); // "Bedanya yang paling besar kelihatan kalau listriknya dicabut."
const T_KOSONG = B(7); // "Meja langsung kosong. Gudang tidak berubah sama sekali."

/* --- geometri (px pada frame 1920x1080) ------------------------------------ */

/** Slot lama dari `08-ram-generasi` — dibawa apa adanya, cuma untuk keluar. */
const X_SLOT = X_DEKAT - 10;
const W_SLOT = W_DEKAT + 20;

/** Gudang: kotak besar di kiri. Tingginya lebih dari empat kali badan batang,
 *  dan itu pernyataan pertama scene ini — besarnya sampai duluan sebelum satu
 *  kata pun tentang muatnya diucapkan. */
const GUDANG = { x: 140, y: 300, w: 330, h: 400 };
const X_GUDANG = GUDANG.x + GUDANG.w / 2;

/** Kisi berkas di badan gudang. Sel-nya digambar sendiri, bukan lewat `Kisi` di
 *  ../batang-ram.tsx: yang itu punya satu `nyala` untuk seluruh kisi, sementara
 *  di sini tiap sel perlu waktunya sendiri (terisi bertahap, lalu disorot satu
 *  per satu saat dicari). */
const KISI = { kolom: 6, baris: 6, sel: 34, jeda: 6 };
const W_KISI = KISI.kolom * KISI.sel + (KISI.kolom - 1) * KISI.jeda;
const KISI_X = X_GUDANG - W_KISI / 2;
const KISI_Y = 452;
const titikSel = (i: number): { x: number; y: number } => ({
  x: KISI_X + (i % KISI.kolom) * (KISI.sel + KISI.jeda) + KISI.sel / 2,
  y: KISI_Y + Math.floor(i / KISI.kolom) * (KISI.sel + KISI.jeda) + KISI.sel / 2,
});

/** Urutan sel yang disorot saat dicari — MELOMPAT, sama seperti pencarian laci
 *  di `05-kenapa-cepat`: yang dicari letaknya belum diketahui. Sel terakhir yang
 *  jadi sumber berkas yang berangkat. */
const URUT_CARI = [7, 26, 14, 21] as const;
const SEL_KETEMU = URUT_CARI[URUT_CARI.length - 1];
const JEDA_CARI = 0.5;
const T_CARI = T_JEMPUT + 0.3;
const T_BERANGKAT = T_CARI + URUT_CARI.length * JEDA_CARI;
const DUR_JEMPUT = 1.5;

/** Isi batang: berkas kecil yang duduk di atas badannya. Enam, sejumlah chipnya
 *  — bukan angka kapasitas, cuma "beberapa" di sebelah kisi gudang yang penuh. */
const N_ISI = 6;
const ISI = 42;
const Y_ISI = KOTAK_TERTAHAN.atas - 52;
const xIsi = (i: number): number =>
  KOTAK_TERTAHAN.kiri + ((i + 0.5) * KOTAK_TERTAHAN.lebar) / N_ISI;

/** Tujuan berkas yang dijemput: tempat kosong paling kiri di atas batang. */
const TUJUAN_JEMPUT = { x: xIsi(0), y: Y_ISI + ISI / 2 };

/** Simbol daya, di celah antara gudang dan batang — DI BAWAH lengkung jemputan,
 *  bukan di tengahnya: jalur yang ditinggalkan tahap 6 melintas persis di
 *  ketinggian badan gudang, dan simbol yang ditumpuk di atas garis terbaca
 *  sebagai coretan. */
const DAYA = { x: 545, y: 700 };

/* --- perabot --------------------------------------------------------------- */

/** Label kecil yang menempelkan benda di layar ke kata yang dipakai analogi
 *  sejak scene 3. Ikonnya `desk` / `cabinet` — bentuk yang sama yang penonton
 *  lihat sepanjang bagian 3 sampai 5, dan itu yang membuat sambungannya terbaca
 *  tanpa perlu dijelaskan. */
const Tanda: React.FC<{
  x: number;
  y: number;
  ikon: NamaIkon;
  teks: string;
  muncul: React.CSSProperties;
}> = ({ x, y, ikon, teks, muncul }) => (
  <div
    style={{
      position: "absolute",
      left: x - 130,
      top: y,
      width: 260,
      display: "flex",
      gap: 12,
      alignItems: "center",
      justifyContent: "center",
      ...muncul,
    }}
  >
    <Ic n={ikon} warna="c-mute" style={{ width: 38, height: 38 }} />
    <p className="t-sub" style={{ fontSize: 34 }}>
      {teks}
    </p>
  </div>
);

/* ===========================================================================
   Scene
   ======================================================================== */

export const BedaPenyimpanan: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: slot lama keluar, batang diam --- */
  const slotPergi = t(d, { mulai: T_TETAP + 0.2, durasi: 0.6, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 2: gudang masuk dari kiri --- */
  const masukGudang = t(d, {
    mulai: T_MASUK,
    durasi: 0.7,
    dari: -(GUDANG.x + GUDANG.w + 40),
    ke: 0,
    ease: E.expoOut,
  });

  /* --- tahap 3: piringan berputar, kisi terisi penuh --- */
  const putar = t(d, { mulai: T_ISI + 0.1, durasi: 0.9, dari: 0, ke: 360, ease: E.power2out });
  const selTerisi = (i: number): number =>
    t(d, {
      mulai: T_ISI + 0.35 + Math.floor(i / KISI.kolom) * 0.09,
      durasi: 0.32,
      dari: 0,
      ke: 1,
    });

  /* --- tahap 6: dicari, lalu dijemput --- */
  const sorotSel = (i: number): number => {
    const k = (URUT_CARI as readonly number[]).indexOf(i);
    if (k === -1) return 0;
    const mulai = T_CARI + k * JEDA_CARI;
    return (
      t(d, { mulai, durasi: 0.14, dari: 0, ke: 1 }) *
      t(d, { mulai: mulai + 0.34, durasi: 0.14, dari: 1, ke: 0 })
    );
  };
  const p = t(d, {
    mulai: T_BERANGKAT,
    durasi: DUR_JEMPUT,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const asalJemput = titikSel(SEL_KETEMU ?? 0);
  /* Diangkat dulu sebelum turun: perjalanan mendatar lurus terbaca sebagai benda
     yang digeser, bukan dibawa — alasan yang sama dengan `04-ram-analogy`. */
  const kendali = { x: (asalJemput.x + TUJUAN_JEMPUT.x) / 2, y: 250 };
  const posJemput = lengkung(p, asalJemput, kendali, TUJUAN_JEMPUT);
  const L_JALUR = 700;
  const adaJemput = t(d, { mulai: T_BERANGKAT, durasi: 0.1, dari: 0, ke: 1 });
  /* Berkas yang terbang padam tepat saat berkas di atas batang menyala: dua ikon
     yang sama di titik yang sama terbaca sebagai gambar dobel, bukan sebagai
     satu benda yang sampai. */
  const mendarat = t(d, {
    mulai: T_BERANGKAT + DUR_JEMPUT,
    durasi: 0.12,
    dari: 0,
    ke: 1,
  });

  /* --- tahap 7: listriknya dicabut --- */
  const daya = t(d, { mulai: T_CABUT + 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const padam = t(d, { mulai: T_CABUT + 1.5, durasi: 0.35, dari: 0, ke: 1 });
  /* Sekali kedip gelap di seluruh panggung — satu tarikan, bukan kedip berulang. */
  const tirai = tPP(d, { mulai: T_CABUT + 1.5, durasi: 0.5, dari: 0, ke: 0.55 });

  /* --- tahap 8: yang kosong dan yang tidak --- */
  const isiHilang = (i: number): number =>
    t(d, { mulai: T_KOSONG + 0.15 + i * 0.12, durasi: 0.35, dari: 1, ke: 0 });
  /* Sel di dalam chip batang ikut mati, sedikit di belakang berkasnya: bendanya
     masih ada, isinya tidak. */
  const nyalaBatang =
    t(d, { mulai: T_TETAP, durasi: 0.5, dari: 0.55, ke: 0.75 }) *
    t(d, { mulai: T_KOSONG + 0.5, durasi: 0.8, dari: 1, ke: 0 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* ---------- slot lama: warisan scene 8, cuma untuk keluar ---------- */}
        <div
          style={{
            opacity: 1 - slotPergi,
            transform: `translateY(${slotPergi * 24}px)`,
          }}
        >
          <Papan x={X_SLOT - 40} y={Y_SLOT_LAMA + TINGGI_SLOT} w={W_SLOT + 80} />
          <Slot x={X_SLOT} y={Y_SLOT_LAMA} w={W_SLOT} kunci={TAKIK.ddr4} />
        </div>

        {/* ---------- gudang ---------- */}
        <div style={{ transform: `translateX(${masukGudang}px)` }}>
          <div
            className="panel"
            style={{
              position: "absolute",
              left: GUDANG.x,
              top: GUDANG.y,
              width: GUDANG.w,
              height: GUDANG.h,
              padding: 0,
            }}
          />

          {/* piringan — SKEMATIS: hardisk punya piringan, S S D tidak, dan VO
              menyebut keduanya sebagai satu benda. Dipakai karena ia satu-satunya
              bentuk yang langsung terbaca "tempat menyimpan" dari kursi
              penonton (direction § catatan akurasi). */}
          <div
            style={{
              position: "absolute",
              left: X_GUDANG - 45,
              top: GUDANG.y + 30,
              width: 90,
              height: 90,
              transform: `rotate(${putar}deg)`,
            }}
          >
            <Ic n="disk" warna="c-mute" style={{ width: 90, height: 90 }} />
          </div>

          {/* kisi berkas — penuh, dan di tahap 8 tidak bergeming */}
          {Array.from({ length: KISI.kolom * KISI.baris }, (_, i) => {
            const s = titikSel(i);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: s.x - KISI.sel / 2,
                  top: s.y - KISI.sel / 2,
                  width: KISI.sel,
                  height: KISI.sel,
                  borderRadius: 6,
                  border: "1px solid var(--ink-2)",
                  background: "var(--line)",
                  opacity: 0.35 + 0.65 * selTerisi(i),
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 3,
                    borderRadius: 4,
                    background: "var(--ink-1)",
                    opacity: 0.5 * selTerisi(i) * (i === SEL_KETEMU ? 1 - p : 1),
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -3,
                    borderRadius: 8,
                    border: "3px solid var(--ink-0)",
                    opacity: 0.85 * sorotSel(i),
                  }}
                />
              </div>
            );
          })}

          <p
            className="t-label"
            style={{
              position: "absolute",
              left: GUDANG.x,
              top: GUDANG.y + GUDANG.h + 18,
              width: GUDANG.w,
              textAlign: "center",
              fontSize: 24,
              ...masuk(d, { mulai: T_NAMA + 0.1, durasi: 0.45, geser: 12 }),
            }}
          >
            hardisk · SSD
          </p>

          <Tanda
            x={X_GUDANG}
            y={GUDANG.y + GUDANG.h + 62}
            ikon="cabinet"
            teks="gudang"
            muncul={masuk(d, { mulai: T_PETA + 1.4, durasi: 0.5, geser: 14 })}
          />
        </div>

        {/* ---------- batang: tidak bergerak sedetik pun ---------- */}
        <Batang
          x={KOTAK_TERTAHAN.kiri}
          y={KOTAK_TERTAHAN.atas}
          w={KOTAK_TERTAHAN.lebar}
          h={KOTAK_TERTAHAN.tinggi}
          takik={TAKIK.ddr5}
          nChip={6}
          nyala={nyalaBatang}
        />

        <Tanda
          x={KOTAK_TERTAHAN.kiri + KOTAK_TERTAHAN.lebar / 2}
          y={KOTAK_TERTAHAN.atas + KOTAK_TERTAHAN.tinggi + 34}
          ikon="desk"
          teks="meja"
          muncul={masuk(d, { mulai: T_PETA + 0.35, durasi: 0.5, geser: 14 })}
        />

        {/* ---------- isi batang ---------- */}
        {Array.from({ length: N_ISI }, (_, i) => {
          const m = masuk(d, {
            mulai: T_TETAP + 0.1,
            urutan: i,
            jeda: 0.07,
            durasi: 0.4,
            geser: 16,
          });
          /* Berkas paling kiri baru datang saat dijemput di tahap 6 — sebelum itu
             tempatnya memang kosong, dan itu yang membuat perjalanannya punya
             tujuan yang terlihat. */
          const ada = i === 0 ? t(d, { mulai: T_BERANGKAT + DUR_JEMPUT, durasi: 0.1, dari: 0, ke: 1 }) : m.opacity;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: xIsi(i) - ISI / 2,
                top: Y_ISI,
                width: ISI,
                height: ISI,
                opacity: ada * isiHilang(i),
                transform: `${i === 0 ? "none" : m.transform} translateY(${
                  (1 - isiHilang(i)) * 10
                }px)`,
              }}
            >
              <Ic n="file" warna="c-accent" style={{ width: ISI, height: ISI }} />
            </div>
          );
        })}

        {/* ---------- jalur jemputan & berkas yang dijemput ---------- */}
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <path
            d={`M${asalJemput.x + masukGudang} ${asalJemput.y} Q${kendali.x} ${kendali.y} ${TUJUAN_JEMPUT.x} ${TUJUAN_JEMPUT.y}`}
            fill="none"
            stroke="var(--ink-2)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={L_JALUR}
            strokeDashoffset={L_JALUR * (1 - p)}
            /* Jalurnya ikut padam waktu listriknya dicabut — frame terakhir
               scene ini cuma boleh berisi dua benda dan bedanya. */
            opacity={0.5 * adaJemput * (1 - daya)}
          />
        </svg>

        {adaJemput > 0 && (
          <div
            style={{
              position: "absolute",
              left: posJemput.x - 20,
              top: posJemput.y - 20,
              width: 40,
              height: 40,
              opacity: adaJemput * (1 - mendarat),
            }}
          >
            <Ic n="file" warna="c-mute" style={{ width: 40, height: 40 }} />
          </div>
        )}

        {/* ---------- simbol daya ---------- */}
        <div
          style={{
            position: "absolute",
            left: DAYA.x - 44,
            top: DAYA.y - 44,
            width: 88,
            height: 88,
            opacity: daya,
          }}
        >
          <Ic
            n="bolt"
            warna="c-accent"
            style={{ width: 88, height: 88, opacity: 1 - padam }}
          />
          <div style={{ position: "absolute", inset: 0, opacity: padam }}>
            <Ic n="bolt" warna="c-mute" style={{ width: 88, height: 88 }} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 46,
              top: 40,
              width: 62,
              height: 62,
              opacity: padam,
              transform: `scale(${t(d, {
                mulai: T_CABUT + 1.5,
                durasi: 0.45,
                dari: 0.4,
                ke: 1,
                ease: E.backOut(2),
              })})`,
            }}
          >
            {/* Silang di atas petirnya — satu lambang "listrik putus", bukan dua
                benda yang kebetulan bertabrakan. */}
            <Ic n="x" warna="c-bad" tumpang="sengaja" style={{ width: 62, height: 62 }} />
          </div>
        </div>

        {/* kedip gelap sekali — bukan kedip berulang */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--bg)",
            opacity: tirai,
            pointerEvents: "none",
          }}
        />
      </div>
    </Scene>
  );
};
