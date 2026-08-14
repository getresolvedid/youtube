/* T14 · scene 9 · jenis-catatan — bagian 6 [explaining], 35,98 dtk
   VO:        09-jenis-catatan-vo.md
   Direction: 09-jenis-catatan-direction.md

   SCENE YANG PALING BOLEH DIPOTONG kalau episodenya kepanjangan (`naskah.md`).
   Kalau itu terjadi, baris terakhir `08-umur-catatan` harus diganti supaya
   sambungannya ke `10-polos` tidak menganga.

   TIGA KEPUTUSAN:

   1. Jarak antara halaman dan kotak surat harus LEBAR. Kalau keduanya
      berdekatan, penonton tidak merasa kartunya menunjuk ke arah yang
      benar-benar berbeda — dan kejadian di tahap 7–8 kehilangan sebabnya.

   2. Nama teknis kartunya boleh di layar, tidak pernah di VO. Label mono
      terkecil di sudut kartu; yang mencarinya akan menemukannya, yang
      mendengarkan tidak kehilangan apa pun.

   3. Kartu kedua TIDAK DISENTUH siapa pun. Jangan menggambar tangan yang lupa
      memindahkannya — yang terjadi adalah kelalaian karena kartunya memang
      terpisah, bukan kesalahan seseorang yang bisa disalahkan.

   Tahap 10 bukan bagian dari isi scene ini: ia jembatan visual ke `10-polos`,
   dan jalur mendatar itulah panggung scene berikutnya.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Catatan, GARIS, Kartu } from "../panggung-loket";
import { beat, cari } from "../timing.gen";
import { KISI_CATATAN } from "./08-umur-catatan";

const ID = "jenis-catatan";

const B_BUKANSATU = beat(ID, 0); // "Dan yang punya tanggal habis itu bukan cuma satu kartu."
const B_LEBAR = beat(ID, 1); // "Sekarang buka lacinya lebih lebar."
const B_BEBERAPA = beat(ID, 2); // "Satu nama ternyata menyimpan beberapa kartu sekaligus."
const B_HALAMAN = beat(ID, 3); // "Ada kartu yang menunjuk ke halamannya."
const B_SURAT = beat(ID, 4); // "Ada kartu terpisah yang menunjuk ke mana suratnya dikirim."
const B_ALIAS = beat(ID, 5); // "Ada juga kartu yang isinya cuma satu kalimat: ..."
const B_PINDAH = beat(ID, 6); // "Makanya sebuah situs bisa pindah dengan halaman ..."
const B_SURATBERHENTI = beat(ID, 7); // "sementara suratnya berhenti sampai berhari-hari."
const B_KETINGGALAN = beat(ID, 8); // "Yang dipindahkan cuma satu kartu, ..."
const B_TANPAPERIKSA = beat(ID, 9); // "Dan semua kartu itu diantar bolak-balik ..."

/* Laci di kiri, dua tujuan di kanan — dan jarak vertikalnya sengaja lebar
   (keputusan 1): halaman di atas, kotak surat jauh di bawahnya. */
const X_LACI = 470;
const Y_LACI = 560;
const KARTU_Y = [468, 560, 652];

const P_HALAMAN = { x: 1480, y: 320 };
const P_SURAT = { x: 1480, y: 800 };

const LABEL = ["A", "MX", "CNAME"];
const ISI = ["halaman", "surat", "nama lain"];

/** Detik terakhir tahap 10 `08-umur-catatan`, dihitung dari timing yang
 *  digenerate — BUKAN diketik. Bilah umur di frame pertama scene ini harus
 *  sepanjang persis yang ditinggalkan scene sebelumnya, dan panjangnya fungsi
 *  waktu; begitu satu kalimat di scene 8 berubah, angka ini ikut sendiri. */
const JAM_AKHIR_08 = cari("umur-catatan").durasi - beat("umur-catatan", 9);

export const JenisCatatan: React.FC = () => {
  const d = useDetik();

  /* Tahap 1: kisi catatan scene 8 mengecil dan berkumpul ke satu laci. Frame
     pertama scene ini WAJIB frame terakhir scene itu — sebelumnya `kumpul` cuma
     memudarkan laci masuk dari layar kosong, dan potongan kerasnya jatuh di atas
     kedipan hitam yang tidak bisa ditunjuk penonton (ditemukan `npm run jahit`). */
  const kumpul = t(d, { mulai: B_BUKANSATU + 0.15, durasi: 0.85, dari: 0, ke: 1, ease: E.power2in });
  const laciAda = t(d, { mulai: B_BUKANSATU + 0.6, durasi: 0.5, dari: 0, ke: 1 });
  const buka = t(d, { mulai: B_LEBAR, durasi: 0.8, dari: 0, ke: 1, ease: E.expoOut });
  const kartuAda = [
    t(d, { mulai: B_BEBERAPA, durasi: 0.4, dari: 0, ke: 1 }),
    t(d, { mulai: B_BEBERAPA + 0.14, durasi: 0.4, dari: 0, ke: 1 }),
    t(d, { mulai: B_BEBERAPA + 0.28, durasi: 0.4, dari: 0, ke: 1 }),
  ];

  /* Tiap kartu diangkat sedikit dari lacinya saat gilirannya. */
  const angkat = [
    t(d, { mulai: B_HALAMAN, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut }),
    t(d, { mulai: B_SURAT, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut }),
    t(d, { mulai: B_ALIAS, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut }),
  ];

  /* Tahap 7: kartu halaman diganti, dan garisnya BERPINDAH — bukan dipadamkan
     lalu digambar ulang. "Mulus, tanpa putus" itu isinya. */
  const pindah = t(d, { mulai: B_PINDAH + 0.2, durasi: 0.8, dari: 0, ke: 1, ease: E.expoOut });
  const yHalaman = P_HALAMAN.y + 150 * pindah;
  const hijau = t(d, { mulai: B_PINDAH + 0.6, durasi: 0.4, dari: 0, ke: 1 });

  /* Tahap 8: kartu surat memudar di tempatnya, tanpa ada yang menyentuhnya. */
  const pudar = t(d, { mulai: B_SURATBERHENTI, durasi: 0.7, dari: 0, ke: 1 });
  const suratJatuh = t(d, {
    mulai: B_SURATBERHENTI + 0.5,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2in,
  });

  /* Tahap 9: kedua kartu disandingkan, lepas dari lacinya. */
  const sanding = t(d, { mulai: B_KETINGGALAN, durasi: 0.7, dari: 0, ke: 1, ease: E.expoOut });

  /* Tahap 10: jembatan visual ke scene 10 — jalur mendatar, kartu terbuka. */
  const jalur = t(d, { mulai: B_TANPAPERIKSA, durasi: 0.9, dari: 0, ke: 1, ease: E.expoOut });

  const xLaci = X_LACI + 130 * buka;

  const posKartu = (k: number): { x: number; y: number } => {
    const dasar = { x: xLaci, y: (KARTU_Y[k] ?? 560) - 26 * (angkat[k] ?? 0) };
    if (k === 0) {
      const s = sanding;
      return { x: dasar.x + (760 - dasar.x) * s, y: dasar.y + (560 - dasar.y) * s };
    }
    if (k === 1) {
      const s = sanding;
      return { x: dasar.x + (1060 - dasar.x) * s, y: dasar.y + (560 - dasar.y) * s };
    }
    return dasar;
  };

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ---------- warisan frame terakhir 08-umur-catatan ---------- */}
          <g opacity={1 - kumpul}>
            {Array.from({ length: KISI_CATATAN.n }, (_, k) => {
              const p = KISI_CATATAN.pos(k);
              return (
                <Catatan
                  key={k}
                  x={p.x + (X_LACI - p.x) * kumpul}
                  y={p.y + (Y_LACI - p.y) * kumpul}
                  skala={KISI_CATATAN.skala * (1 - 0.72 * kumpul)}
                  sisa={KISI_CATATAN.sisa(k, JAM_AKHIR_08)}
                  nyala={KISI_CATATAN.nyala}
                />
              );
            })}
          </g>

          {/* ---------- laci yang dibuka lebih lebar ---------- */}
          <g opacity={laciAda * (1 - jalur)}>
            <rect
              x={xLaci - 210}
              y={Y_LACI - 150}
              width={420}
              height={300}
              rx={12}
              fill="var(--bg)"
              stroke="var(--ink-1)"
              strokeWidth={6}
            />
            <path
              d={`M${xLaci - 190} ${Y_LACI + 128}h380`}
              stroke="var(--ink-1)"
              strokeWidth={3}
              opacity={0.5}
              strokeLinecap="round"
            />
          </g>

          {/* ---------- tujuan: halaman jauh di atas, kotak surat jauh di bawah ---------- */}
          <g opacity={(1 - jalur) * (angkat[0] ?? 0)}>
            <rect
              x={P_HALAMAN.x - 150}
              y={yHalaman - 90}
              width={300}
              height={180}
              rx={12}
              fill="var(--bg-elev)"
              stroke={hijau > 0 ? "var(--ok)" : "var(--ink-1)"}
              strokeWidth={5}
            />
            <path
              d={`M${P_HALAMAN.x - 100} ${yHalaman - 30}h200M${P_HALAMAN.x - 100} ${
                yHalaman + 10
              }h140`}
              stroke="var(--ink-1)"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <text
              x={P_HALAMAN.x}
              y={yHalaman + 128}
              fontSize={28}
              fontFamily="var(--font-mono)"
              fill="var(--ink-2)"
              textAnchor="middle"
            >
              halamannya
            </text>
          </g>

          <g opacity={(1 - jalur) * (angkat[1] ?? 0)}>
            <rect
              x={P_SURAT.x - 130}
              y={P_SURAT.y - 80}
              width={260}
              height={160}
              rx={12}
              fill="var(--bg-elev)"
              stroke="var(--ink-1)"
              strokeWidth={5}
              opacity={1 - 0.55 * pudar}
            />
            <path
              d={`M${P_SURAT.x - 130} ${P_SURAT.y - 80}L${P_SURAT.x} ${P_SURAT.y - 6}L${
                P_SURAT.x + 130
              } ${P_SURAT.y - 80}`}
              fill="none"
              stroke="var(--ink-1)"
              strokeWidth={5}
              opacity={1 - 0.55 * pudar}
            />
            <text
              x={P_SURAT.x}
              y={P_SURAT.y + 122}
              fontSize={28}
              fontFamily="var(--font-mono)"
              fill="var(--ink-2)"
              textAnchor="middle"
            >
              suratnya
            </text>
            {/* surat yang datang lalu memantul dan jatuh */}
            <g opacity={suratJatuh > 0 ? 1 : 0}>
              <rect
                x={P_SURAT.x - 40}
                y={P_SURAT.y - 180 + 260 * suratJatuh}
                width={80}
                height={54}
                rx={6}
                fill="var(--warn)"
                opacity={1 - suratJatuh}
                transform={`rotate(${34 * suratJatuh} ${P_SURAT.x} ${P_SURAT.y})`}
              />
            </g>
          </g>

          {/* ---------- garis kartu -> tujuan ---------- */}
          <g opacity={1 - jalur}>
            <path
              d={`M${posKartu(0).x + 70} ${posKartu(0).y}L${P_HALAMAN.x - 160} ${yHalaman}`}
              stroke={GARIS.warna}
              strokeWidth={GARIS.tebal}
              strokeLinecap="round"
              opacity={GARIS.opasitas}
              {...gambarGaris(d, 1100, { mulai: B_HALAMAN + 0.1, durasi: 0.6 })}
            />
            <path
              d={`M${posKartu(1).x + 70} ${posKartu(1).y}L${P_SURAT.x - 140} ${P_SURAT.y}`}
              stroke={GARIS.warna}
              strokeWidth={GARIS.tebal}
              strokeLinecap="round"
              opacity={GARIS.opasitas * (1 - pudar)}
              {...gambarGaris(d, 1100, { mulai: B_SURAT + 0.1, durasi: 0.6 })}
            />
            {/* kartu ketiga menunjuk BALIK ke lacinya sendiri */}
            <path
              d={`M${xLaci + 80} ${(KARTU_Y[2] ?? 652)}Q${xLaci + 460} ${(KARTU_Y[2] ?? 652) + 240} ${xLaci + 30} ${
                Y_LACI + 176
              }`}
              fill="none"
              stroke={GARIS.warna}
              strokeWidth={GARIS.tebal}
              strokeLinecap="round"
              opacity={GARIS.opasitas}
              {...gambarGaris(d, 700, { mulai: B_ALIAS + 0.1, durasi: 0.6 })}
            />
          </g>

          {/* ---------- ketiga kartu ---------- */}
          <g opacity={1 - jalur}>
            {[0, 1, 2].map((k) => {
              const p = posKartu(k);
              return (
                <g key={k}>
                  <Kartu
                    x={p.x}
                    y={p.y}
                    teks={ISI[k] ?? ""}
                    skala={0.62}
                    opacity={(kartuAda[k] ?? 0) * (k === 1 ? 1 - 0.55 * pudar : 1)}
                    warna={k === 1 && pudar > 0.5 ? "var(--ink-2)" : "var(--accent-ink)"}
                  />
                  <text
                    x={p.x + 44}
                    y={p.y - 22}
                    fontSize={18}
                    fontFamily="var(--font-mono)"
                    fill="var(--ink-2)"
                    textAnchor="middle"
                    opacity={(kartuAda[k] ?? 0) * 0.9}
                  >
                    {LABEL[k] ?? ""}
                  </text>
                </g>
              );
            })}
          </g>

          {/* ---------- jembatan ke scene 10: jalur mendatar, kartu terbuka ---------- */}
          <g opacity={jalur}>
            <path
              d="M120 560h1800"
              stroke="var(--line)"
              strokeWidth={6}
              strokeLinecap="round"
            />
            {[0, 1, 2].map((k) => (
              <Kartu
                key={k}
                x={520 + k * 400 + 140 * jalur}
                y={560}
                teks={ISI[k] ?? ""}
                skala={0.62}
              />
            ))}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
