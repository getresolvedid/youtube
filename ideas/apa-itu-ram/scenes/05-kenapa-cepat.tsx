/* T01 · scene 5 · kenapa-cepat — bagian 5 [why], 24,84 dtk
   VO:        05-kenapa-cepat-vo.md          ← sumber kalimat & beat
   Direction: 05-kenapa-cepat-direction.md   ← sumber tata letak & koreografi

   Scene yang mengisi bagian 5, yang sebelumnya KOSONG: episode melompat dari
   jawaban (`04-ram-analogy`) langsung ke ukuran (`06-ram-size`), dan lompatan
   itu meninggalkan pertanyaan paling wajar — kenapa lewat meja lebih cepat —
   tanpa jawaban. Pertanyaan yang tidak dijawab tepat waktu berubah jadi
   kecurigaan bahwa jawabannya cuma "karena memang begitu".

   Frame pertamanya = frame terakhir `04-ram-analogy`: lemari di kiri, meja
   berdiri dengan satu berkas di atasnya, prosesor menyala di kanan, jalur
   panjang & tautan pendek sudah tergambar. Tidak ada yang masuk, menepi, atau
   berpindah tempat — koordinatnya dari ../panggung-analogi.tsx, dan frame
   terakhirnya harus mengembalikan ketiganya ke posisi itu juga, karena
   `06-ram-size` membuka dengan mengeluarkan lemari & prosesor dari frame.

   TIGA KEPUTUSAN:

   1. Jaraknya TIDAK digambar ulang. Scene 4 sudah menaruh jalur panjang dan
      tautan pendek berdampingan dengan bobot garis yang sama; scene ini
      mengakuinya dalam satu denyut (tahap 1) lalu pindah ke sebab kedua yang
      belum pernah ditunjukkan — di gudang, isinya masih harus DICARI.

   2. Lamanya pencarian tidak digambar sebagai grafik, angka, atau satuan. Ia
      dibuat terasa dengan memakan waktu di layar: empat perhentian sorot, satu
      per satu, dan yang dicari baru ketemu di perhentian terakhir. Baris ⚠ di
      naskah § Sumber belum ditutup — scene ini tidak boleh mengklaim berapa
      cepatnya, cuma kenapa cepatnya.

   3. Dua raihan di tahap 4 memakai KONSTANTA DURASI YANG SAMA (DUR_RAIH), bukan
      dua angka yang kebetulan sama. Panjang garisnya berbeda jauh, waktunya
      identik, dan dua bilah yang berhenti di panjang yang sama membuktikannya.
      Itulah akses acak — dan namanya sengaja tidak jatuh, di layar maupun di VO
      (HARD RULE 6): kartu judul sudah menulis kepanjangannya, dan menautkannya
      adalah pekerjaan scene bagian 6.

   Indigo tetap milik jawaban: berkas, meja, garis raihan, tautan. Sorot
   pencarian di lemari ABU-ABU — yang disorot di sana masalahnya, bukan
   jawabannya.

   Detik tiap tahap tidak diketik di sini; semuanya dari `beat()` di
   timing.gen.ts (HARD RULE 4).
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Ic } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import {
  antarJemput,
  ASAL,
  BERKAS,
  C_TERBANG,
  D_JALUR,
  dudukDiMeja,
  GARIS,
  Kartu,
  KOTAK_MEJA,
  LACI_SUMBER,
  LEMARI,
  Lemari,
  MEJA,
  MejaNyata,
  napas,
  Prosesor,
  RAIH_CPU,
  RAIH_MEJA,
  SKALA_LEMARI,
  TINGGI_LACI,
  titikLaci,
  TUJUAN,
  X_LEMARI,
  X_MEJA,
  X_PROSESOR,
  Y_MEJA,
} from "../panggung-analogi";
import { beat } from "../timing.gen";

const ID = "kenapa-cepat";

/* --- waktu: satu baris VO = satu tahap ------------------------------------ */

const B_DEKAT = beat(ID, 0); // "Dekatnya memang membantu. Tapi bukan cuma itu."
const B_CARI = beat(ID, 1); // "Di gudang, berkasnya masih harus dicari, ..."
const B_HAMPAR = beat(ID, 2); // "Di meja, semuanya sudah terhampar ..."
const B_RAIH = beat(ID, 3); // "Mau yang paling kiri atau paling kanan, ..."
const B_SEKALI = beat(ID, 4); // "Dan perjalanan jauh tadi cuma terjadi sekali."
const B_RIBUAN = beat(ID, 5); // "Sesudahnya, berkas yang sama dipakai lagi ..."
const B_MUAT = beat(ID, 6); // "Tinggal satu: berapa banyak yang muat di meja itu."

/** Urutan laci yang disorot. MELOMPAT, bukan runut dari atas: yang dicari
 *  letaknya belum diketahui, dan itu justru gagasannya. Perhentian terakhir
 *  adalah LACI_SUMBER — laci yang berkasnya memang ada di sana sejak scene 3. */
const URUT_CARI = [0, 2, 3, LACI_SUMBER] as const;
const T_CARI = B_CARI + 0.25;
const JEDA_CARI = 0.7;
const T_KETEMU = T_CARI + (URUT_CARI.length - 1) * JEDA_CARI;

/** Satu konstanta untuk KEDUA raihan — kiri dan kanan tidak boleh punya angka
 *  sendiri-sendiri, karena "waktunya sama" adalah seluruh isi tahap 4. */
const DUR_RAIH = 0.75;
const T_KIRI = B_RAIH + 0.45;
const T_KANAN = B_RAIH + 2.0;

/* --- geometri khusus scene ini -------------------------------------------- */

/** Deret berkas di permukaan meja. Yang di tengah BUKAN berkas baru: ia salinan
 *  yang mendarat di scene 4, tinggal menyesuaikan ukurannya jadi satu deret. */
const SISI = 104;
const JARAK = 118;
const Y_DERET = dudukDiMeja(SISI);
const xDeret = (k: number): number => TUJUAN.x + k * JARAK;
const DERET = [-2, -1, 0, 1, 2].map((k) => ({ k, x: xDeret(k) }));
const X_PALING_KIRI = xDeret(-2);
const X_PALING_KANAN = xDeret(2);

/** Panjang garis raihan. Dihitung, bukan diketik: yang harus terbaca penonton
 *  adalah dua panjang yang JELAS berbeda dengan waktu yang sama. */
const panjangKe = (x: number): number =>
  Math.hypot(RAIH_CPU.x - x, RAIH_CPU.y - Y_DERET);

/** Bilah waktu — dua-duanya di trek yang sama panjangnya, jadi "penuh" berarti
 *  hal yang sama untuk keduanya. Membandingkan raihan kiri dengan raihan kanan,
 *  BUKAN dengan gudang: perbandingan dengan gudang butuh angka latensi, dan
 *  angka itu masih ⚠ di naskah § Sumber. */
const BILAH = { w: 200, h: 14, y: 250 };

/** Titik tengah lengkung jalur panjang (Bézier kuadratik pada p = 0,5) —
 *  tempat tanda `1x` mendarat. */
const TENGAH_JALUR = {
  x: 0.25 * (ASAL.x + TUJUAN.x) + 0.5 * C_TERBANG.x,
  y: 0.25 * (ASAL.y + TUJUAN.y) + 0.5 * C_TERBANG.y,
};

/** Garis ukur lebar papan meja — jembatan ke `06-ram-size` (HARD RULE 7).
 *  Dipatok ke KOTAK_MEJA, bukan diketik: scene berikutnya membuka permukaan
 *  yang sama jadi kotak-kotak, dan garis yang meleset dari tepinya membuat
 *  pembukaan itu terbaca sebagai benda lain. */
/* Di bawah papan, DI ANTARA kedua kaki — bukan di bawah meja: di sana label
   "meja kerja" yang diwarisi scene 4 sudah menempati barisnya, dan dua benda
   yang bertumpuk terbaca sebagai tata letak yang meleset. */
const Y_UKUR = KOTAK_MEJA.papanBawah + 30;
const D_UKUR = [
  `M${KOTAK_MEJA.kiri} ${Y_UKUR}H${KOTAK_MEJA.kanan}`,
  `M${KOTAK_MEJA.kiri} ${Y_UKUR - 14}V${Y_UKUR + 14}`,
  `M${KOTAK_MEJA.kanan} ${Y_UKUR - 14}V${Y_UKUR + 14}`,
].join("");
const L_UKUR = KOTAK_MEJA.kanan - KOTAK_MEJA.kiri + 56;

const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const KenapaCepat: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: tautan pendek menebal sekali, lalu perhatian pindah --- */
  const tebalTautan = tPP(d, { mulai: B_DEKAT + 0.2, durasi: 0.8, dari: 0, ke: 3.5 });
  /* Redup saat perhatian pindah ke lemari, terang lagi saat prosesor meraih.
     Dijumlahkan, bukan dicabangkan — dua tween yang saling menyusul tetap
     fungsi murni dari frame. */
  const perhatianCPU =
    1 -
    t(d, { mulai: B_CARI, durasi: 0.5, dari: 0, ke: 0.6 }) +
    t(d, { mulai: B_RAIH, durasi: 0.5, dari: 0, ke: 0.6 });

  /* --- tahap 2: sorot menelusuri laci --- */
  const sorotLaci = (i: number): number => {
    const k = (URUT_CARI as readonly number[]).indexOf(i);
    if (k === -1) return 0;
    const mulai = T_CARI + k * JEDA_CARI;
    return (
      t(d, { mulai, durasi: 0.18, dari: 0, ke: 1 }) *
      t(d, { mulai: mulai + 0.52, durasi: 0.18, dari: 1, ke: 0 })
    );
  };
  const denyutKetemu = tPP(d, { mulai: T_KETEMU, durasi: 0.8, dari: 1, ke: 1.25 });

  /* --- tahap 3: deret berkas terhampar --- */
  /** Berkas tengah menyusut dari ukuran pendaratan scene 4 ke ukuran deret. */
  const rapi = t(d, { mulai: B_HAMPAR + 0.1, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 4: dua raihan, waktu yang sama --- */
  const raihan = [
    { mulai: T_KIRI, x: X_PALING_KIRI, label: "paling kiri" },
    { mulai: T_KANAN, x: X_PALING_KANAN, label: "paling kanan" },
  ].map((r) => ({
    ...r,
    p: t(d, { mulai: r.mulai, durasi: DUR_RAIH, dari: 0, ke: 1, ease: E.power2out }),
    /* Riak & tampak-tidaknya titik jangkauan TIDAK dipatok ke `p` atau ke
       nilai easing-nya: `expo.out` berhenti di 0,999, bukan di 1, jadi
       perbandingan seperti `riak < 1` tidak pernah salah — dan titiknya
       tertinggal di layar sampai scene habis. Keduanya dipisah jadi tween
       sendiri yang jelas naik-turunnya. */
    riak: t(d, {
      mulai: r.mulai + DUR_RAIH,
      durasi: 0.6,
      dari: 0,
      ke: 1,
      ease: E.power2out,
    }),
    tampak:
      t(d, { mulai: r.mulai, durasi: 0.12, dari: 0, ke: 1 }) *
      t(d, { mulai: r.mulai + DUR_RAIH, durasi: 0.22, dari: 1, ke: 0 }),
  }));
  /* Bilah & labelnya menyingkir begitu perbandingannya selesai dibaca. */
  const bilahHidup = t(d, { mulai: B_SEKALI, durasi: 0.4, dari: 1, ke: 0 });

  /* --- tahap 5: jalur panjang menyala sekali --- */
  const nyalaJalur = tPP(d, { mulai: B_SEKALI + 0.1, durasi: 1.1, dari: 0, ke: 1 });
  /* 0,55 (warisan scene 4) -> 0,28 jejak redup, lalu berkedip penuh sekali. */
  const opJalur =
    GARIS.opasitas -
    t(d, { mulai: B_CARI, durasi: 0.6, dari: 0, ke: 0.27 }) +
    0.65 * nyalaJalur;

  /* --- tahap 6: pengulangan --- */
  const lompat = antarJemput(d, { mulai: B_RIBUAN + 0.15, siklus: 0.42 });
  const posLompat = {
    x: RAIH_MEJA.x + (RAIH_CPU.x - RAIH_MEJA.x) * lompat.maju,
    y: RAIH_MEJA.y + (RAIH_CPU.y - RAIH_MEJA.y) * lompat.maju,
  };
  /* Melambat di ujung — yang membuat angkanya terbaca "banyak" adalah larinya,
     bukan angka akhirnya. */
  const hitung = Math.round(
    t(d, { mulai: B_RIBUAN + 0.2, durasi: 2.4, dari: 0, ke: 1240, ease: E.power3out }),
  );

  /* --- tahap 7: jembatan ke ram-size --- */
  /* Kedua tanda mundur satu lapis, tidak dibuang: yang dijelaskan scene ini
     masih berlaku, cuma berhenti jadi yang dilihat. */
  const tandaHidup = t(d, { mulai: B_MUAT, durasi: 0.5, dari: 1, ke: 0.34 });
  const ukur = t(d, { mulai: B_MUAT + 0.25, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });
  const nyalaMeja = tPP(d, { mulai: B_MUAT + 0.5, durasi: 1.2, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* jalur panjang gudang -> meja: diwarisi sudah tergambar penuh */}
          <path
            d={D_JALUR}
            fill="none"
            stroke={GARIS.warna}
            strokeWidth={GARIS.tebal + 3 * nyalaJalur}
            strokeLinecap="round"
            opacity={opJalur}
          />

          {/* tautan pendek meja -> prosesor */}
          <path
            d={`M${RAIH_MEJA.x} ${RAIH_MEJA.y}L${RAIH_CPU.x} ${RAIH_CPU.y}`}
            fill="none"
            stroke={GARIS.warna}
            strokeWidth={GARIS.tebal + tebalTautan}
            strokeLinecap="round"
            opacity={GARIS.opasitas * perhatianCPU + 0.1 * tebalTautan}
          />

          {/* dua garis raihan — panjangnya beda jauh, waktunya sama persis.
              Tertinggal di layar supaya perbandingannya bisa dibaca, bukan
              diingat. */}
          {raihan.map((r) => {
            const L = panjangKe(r.x);
            return (
              <g key={r.label}>
                <path
                  d={`M${RAIH_CPU.x} ${RAIH_CPU.y}L${r.x} ${Y_DERET}`}
                  fill="none"
                  stroke={GARIS.warna}
                  strokeWidth={GARIS.tebal}
                  strokeLinecap="round"
                  strokeDasharray={L}
                  strokeDashoffset={L * (1 - r.p)}
                  opacity={GARIS.opasitas}
                />
                {/* Riak jatuh DI BERKASNYA, bukan di prosesor: yang dijangkau
                    berkasnya, dan di situ pula bilah waktunya berhenti. */}
                <circle
                  cx={r.x}
                  cy={Y_DERET}
                  r={30 + 62 * r.riak}
                  fill="none"
                  stroke="var(--accent-ink)"
                  strokeWidth={3}
                  opacity={0.75 * r.riak * (1 - r.riak) * 4}
                />
              </g>
            );
          })}
          {/* garis ukur lebar meja — pertanyaan yang digantung untuk scene 6 */}
          <path
            d={D_UKUR}
            fill="none"
            stroke="var(--accent-ink)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={L_UKUR}
            strokeDashoffset={L_UKUR * (1 - ukur)}
            opacity={0.85 * ukur}
          />
        </svg>

        {/* ---------- meja ---------- */}
        <MejaNyata tumbuh={1} opacity={1} />

        {/* Kilau sekali di permukaan papan, sewarna meja tapi lebih terang —
            menunjuk permukaannya tanpa menambah benda baru di layar. */}
        <div
          style={{
            position: "absolute",
            left: KOTAK_MEJA.kiri,
            top: KOTAK_MEJA.atas,
            width: KOTAK_MEJA.kanan - KOTAK_MEJA.kiri,
            height: KOTAK_MEJA.papanBawah - KOTAK_MEJA.atas,
            borderRadius: 8,
            background: "var(--ink-0)",
            opacity: 0.3 * nyalaMeja,
          }}
        />

        {/* ---------- lemari arsip ---------- */}
        <Kartu x={X_LEMARI} skala={SKALA_LEMARI} label="lemari arsip">
          <Lemari isi={() => 1} sumber={1} denyut={denyutKetemu} />
        </Kartu>

        {/* sorot pencarian — abu-abu, di atas kartunya. Melompat antar-laci,
            tidak menggeser: geseran terbaca sebagai satu benda yang berjalan,
            dan yang dicari bukan bendanya. */}
        {Array.from({ length: LEMARI.n }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: X_LEMARI - (LEMARI.w * SKALA_LEMARI) / 2,
              top: titikLaci(i).y - (TINGGI_LACI * SKALA_LEMARI) / 2,
              width: LEMARI.w * SKALA_LEMARI,
              height: TINGGI_LACI * SKALA_LEMARI,
              borderRadius: 8,
              border: "3px solid var(--ink-0)",
              background: "var(--ink-2)",
              opacity: 0.62 * sorotLaci(i),
            }}
          />
        ))}

        {/* ---------- prosesor ---------- */}
        <Kartu x={X_PROSESOR} label="prosesor">
          <Prosesor nyala={Math.min(1, perhatianCPU)} />
        </Kartu>

        {/* ---------- deret berkas di atas meja ----------
            Yang tengah dibawa dari scene 4 dan cuma menyesuaikan ukuran; empat
            sisanya mendarat di tahap 3, stagger dari tengah ke tepi. */}
        {DERET.map(({ k, x }) => {
          const tengah = k === 0;
          const sisi = tengah ? BERKAS + (SISI - BERKAS) * rapi : SISI;
          const m = tengah
            ? { opacity: 1, transform: "none" }
            : masuk(d, {
                mulai: B_HAMPAR + 0.15 + (Math.abs(k) - 1) * 0.08,
                durasi: 0.45,
                geser: 22,
              });
          const y = tengah ? TUJUAN.y + (Y_DERET - TUJUAN.y) * rapi : Y_DERET;

          return (
            <div
              key={k}
              style={{
                position: "absolute",
                left: (tengah ? TUJUAN.x + (x - TUJUAN.x) * rapi : x) - sisi / 2,
                top: y - sisi / 2 + napas(d, { mulai: B_HAMPAR + 0.6, jauh: 3 }),
                width: sisi,
                height: sisi,
                opacity: m.opacity,
                transform: m.transform,
              }}
            >
              <Ic n="file" warna="c-accent" style={{ width: sisi, height: sisi }} />
            </div>
          );
        })}

        {/* ---------- ujung jangkauan yang berjalan ----------
            Titik, bukan ikon berkas: yang berjalan di sini adalah JANGKAUANNYA,
            dan berkas kedua yang mendarat di atas berkas yang sudah ada terbaca
            sebagai gambar dobel. */}
        {raihan.map((r) => (
          <div
            key={r.label}
            style={{
              position: "absolute",
              left: RAIH_CPU.x + (r.x - RAIH_CPU.x) * r.p - 9,
              top: RAIH_CPU.y + (Y_DERET - RAIH_CPU.y) * r.p - 9,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "var(--accent-ink)",
              opacity: r.tampak,
            }}
          />
        ))}

        {/* ---------- bilah waktu: kiri vs kanan ---------- */}
        {raihan.map((r) => (
          <div key={r.label}>
            <p
              className="t-label"
              style={{
                position: "absolute",
                left: r.x - 150,
                top: BILAH.y - 42,
                width: 300,
                textAlign: "center",
                opacity: Math.min(1, r.p * 3) * bilahHidup,
              }}
            >
              {r.label}
            </p>
            <div
              style={{
                position: "absolute",
                left: r.x - BILAH.w / 2,
                top: BILAH.y,
                width: BILAH.w,
                height: BILAH.h,
                borderRadius: BILAH.h / 2,
                border: "2px solid var(--accent)",
                background: "var(--bg)",
                opacity: Math.min(1, r.p * 3) * bilahHidup,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${100 * r.p}%`,
                  height: "100%",
                  background: "var(--accent-ink)",
                }}
              />
            </div>
          </div>
        ))}

        <p
          className="t-sub"
          style={{
            position: "absolute",
            left: X_MEJA - 250,
            top: BILAH.y + 34,
            width: 500,
            textAlign: "center",
            fontSize: "calc(var(--fs-sub) * 0.72)",
            color: "var(--accent-ink)",
            ...masuk(d, { mulai: T_KANAN + DUR_RAIH, durasi: 0.45, geser: 12 }),
            opacity:
              t(d, { mulai: T_KANAN + DUR_RAIH, durasi: 0.45, dari: 0, ke: 1 }) *
              bilahHidup,
          }}
        >
          sama saja
        </p>

        {/* ---------- tanda 1x di jalur panjang ---------- */}
        <p
          className="t-title"
          style={{
            position: "absolute",
            left: TENGAH_JALUR.x - 150,
            top: TENGAH_JALUR.y - 96,
            width: 300,
            textAlign: "center",
            fontSize: 64,
            color: "var(--accent-ink)",
            ...masuk(d, { mulai: B_SEKALI + 0.35, durasi: 0.5, geser: 18 }),
            opacity:
              t(d, { mulai: B_SEKALI + 0.35, durasi: 0.5, dari: 0, ke: 1 }) * tandaHidup,
          }}
        >
          1×
        </p>

        {/* ---------- penghitung di tautan pendek ---------- */}
        <div
          style={{
            position: "absolute",
            left: 1330 - 150,
            top: 306,
            width: 300,
            textAlign: "center",
            ...masuk(d, { mulai: B_RIBUAN + 0.2, durasi: 0.4, geser: 18 }),
            opacity:
              t(d, { mulai: B_RIBUAN + 0.2, durasi: 0.4, dari: 0, ke: 1 }) * tandaHidup,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1,
              color: "var(--accent-ink)",
            }}
          >
            {rb(hitung)}
          </p>
          <p
            className="t-label"
            style={{
              marginTop: 10,
              ...masuk(d, { mulai: B_RIBUAN + 1.9, durasi: 0.45, geser: 10 }),
            }}
          >
            ribuan kali
          </p>
        </div>

        {/* ---------- lompatan pendek yang berulang ---------- */}
        {lompat.jalan && (
          <div
            style={{
              position: "absolute",
              left: posLompat.x - 22,
              top: posLompat.y - 22,
              width: 44,
              height: 44,
            }}
          >
            <Ic n="file" warna="c-accent" style={{ width: 44, height: 44 }} />
          </div>
        )}

        {/* ---------- label meja: dibawa apa adanya dari scene 4 ----------
            Diam sepanjang scene. Ia bukan bagian dari penjelasan di sini, tapi
            menghilangkannya membuat penonton kehilangan subjek yang sedang
            dibicarakan — dan `06-ram-size` membawanya terus ke scene berikutnya. */}
        <div
          style={{
            position: "absolute",
            left: X_MEJA - 320,
            top: Y_MEJA + MEJA.kaki * MEJA.skala + 22,
            width: 640,
            textAlign: "center",
          }}
        >
          <p
            className="t-sub"
            style={{
              fontSize: "calc(var(--fs-sub) * 0.72)",
              color: "var(--ink-0)",
            }}
          >
            meja kerja
          </p>
          <p
            className="t-title"
            style={{ fontSize: 76, marginTop: 12, color: "var(--accent-ink)" }}
          >
            RAM
          </p>
        </div>
      </div>
    </Scene>
  );
};
