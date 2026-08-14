/* T14 · scene 8 · umur-catatan — bagian 6 [explaining], 35,12 dtk
   VO:        08-umur-catatan-vo.md
   Direction: 08-umur-catatan-direction.md

   Scene yang membunuh satu salah kaprah yang dipakai sehari-hari bahkan oleh
   orang yang menjual jasa: "tunggu propagasinya". Frame pertamanya = frame
   terakhir `07-dicatat`.

   EMPAT KEPUTUSAN:

   1. Tahap 5 dan 6 WAJIB berjalan bersamaan, bukan bergantian — kedua kolom
      dipetakan dari `d` yang sama, tanpa offset. Kalau kiri dijalankan dulu lalu
      kanan, yang terbaca "sebelum dan sesudah", dan itu justru model salah yang
      sedang dibantah.

   2. Kolom kanan BUKAN versi yang salah. Tanpa merah, tanpa tanda silang. Titik
      putus analogi kedua (`naskah.md`) menyatakan yang lama belum tentu salah —
      ia cuma belum kedaluwarsa. Mewarnainya merah membuat penonton pulang
      mengira ada yang rusak.

   3. Urutan tahap 8 lalu 9 mengikat: kutip dulu, bantah kemudian. Membantah
      lebih dulu membuat penonton yang selama ini memakai kata itu merasa
      ditegur sebelum tahu soal apa.

   4. Tahap 10 tidak boleh punya ARAH. Begitu bilah-bilahnya habis berurutan
      dari satu sisi ke sisi lain, ia menggambar penyebaran — persis yang baru
      saja dicoret.

   Bilah umur memakai E.linear: waktu tidak melambat di ujung, dan yang di-ease
   terbaca sebagai animasi alih-alih sebagai waktu berjalan.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Catatan,
  GARIS,
  I_PEMILIK,
  jendelaLoket,
  Kartu,
  Loket,
  NOMOR_BARU,
  NOMOR_LAMA,
  posLoket,
  TANGGA,
} from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "umur-catatan";

const B_SELAMANYA = beat(ID, 0); // "Cuma, catatan itu tidak berlaku selamanya."
const B_TANGGAL = beat(ID, 1); // "Tiap catatan ditulis dengan tanggal habisnya sendiri."
const B_SIAPA = beat(ID, 2); // "Dan yang menentukan tanggal itu pemilik namanya."
const B_PINDAH = beat(ID, 3); // "Sekarang lihat apa yang terjadi kalau ..."
const B_KAMU = beat(ID, 4); // "Kamu membuka namanya, dan kamu sampai ke tempat yang baru."
const B_TEMAN = beat(ID, 5); // "Temanmu membuka nama yang sama, ..."
const B_BELUM = beat(ID, 6); // "Catatan di jalurnya belum habis umurnya."
const B_MENYEBAR = beat(ID, 7); // "Orang biasanya bilang perubahannya sedang menyebar ..."
const B_TIDAK = beat(ID, 8); // "Padahal tidak ada yang menyebar ke mana-mana."
const B_SATU = beat(ID, 9); // "Yang lama cuma sedang menunggu kedaluwarsa, satu per satu."

const titikCatatan = (i: number): { x: number; y: number } => {
  const p = posLoket(i);
  return { x: p.x - 214 * p.skala, y: p.y - 150 * p.skala };
};

/* --- kolom kembar (tahap 4–7) ---------------------------------------------- */

const KOL = [560, 1360] as const;
const xKol = (k: number): number => (k === 0 ? KOL[0] : KOL[1]);
const Y_MINI = 760;
const DY_MINI = -128;
const S_MINI = 0.46;

const posMini = (kol: number, i: number): { x: number; y: number } => ({
  x: xKol(kol),
  y: Y_MINI + i * DY_MINI,
});

/* --- kisi catatan tahap 10 -------------------------------------------------- */

/** Kisi catatan di tahap 10 adalah frame TERAKHIR scene ini — dan karena itu
 *  frame PERTAMA `09-jenis-catatan` (HARD RULE 3). Diekspor supaya kedua scene
 *  membaca SATU geometri, bukan dua salinan angka yang akan berbeda dalam
 *  sebulan. Sambungannya diuji `npm run jahit`.
 *
 *  Lajunya turunan indeks — deterministik, dan sengaja TIDAK berurutan
 *  posisinya, supaya tidak ada gelombang yang terbaca sebagai satu gerakan. */
export const KISI_CATATAN = {
  n: 12,
  skala: 0.92,
  nyala: 0.5,
  pos: (k: number): { x: number; y: number } => ({
    x: 520 + (k % 4) * 300,
    y: 360 + Math.floor(k / 4) * 210,
  }),
  /** Sisa umur catatan ke-`k` pada detik `jam` sejak tahap 10 mulai. */
  sisa: (k: number, jam: number): number =>
    Math.max(0, 1 - ((k * 5) % 7) * 0.06 - jam * (0.055 + ((k * 7) % 11) * 0.012)),
} as const;

/** Satu kolom: tangga kecil, pertanyaan yang naik, dan halaman yang dituju. */
const Kolom: React.FC<{
  kol: number;
  judul: string;
  /** 0..1 posisi pertanyaan di tangga mini. */
  u: number;
  /** Sampai anak tangga ke berapa jalurnya menyala. */
  sampai: number;
  nomor: string;
  hasil: number;
  /** -1 = tanpa bilah umur. */
  sisa: number;
  sorotBilah: number;
}> = ({ kol, judul, u, sampai, nomor, hasil, sisa, sorotBilah }) => {
  const a = posMini(kol, 0);
  const b = posMini(kol, TANGGA.n - 1);
  const p = { x: a.x, y: a.y + (b.y - a.y) * Math.max(0, Math.min(1, u)) };

  return (
    <g>
      <text
        x={xKol(kol)}
        y={250}
        fontSize={34}
        fontFamily="var(--font-mono)"
        fontWeight={700}
        fill="var(--ink-1)"
        textAnchor="middle"
      >
        {judul}
      </text>

      <path
        d={`M${a.x} ${a.y}L${b.x} ${b.y}`}
        stroke={GARIS.warna}
        strokeWidth={GARIS.tebal}
        strokeLinecap="round"
        opacity={GARIS.opasitas}
        strokeDasharray={Math.abs(b.y - a.y)}
        strokeDashoffset={Math.abs(b.y - a.y) * (1 - sampai)}
      />

      {Array.from({ length: TANGGA.n }, (_, i) => {
        const q = posMini(kol, i);
        return (
          <Loket
            key={i}
            x={q.x}
            y={q.y}
            skala={S_MINI}
            nyala={i === 0 ? 1 : 0.5}
            aksen={i === TANGGA.n - 1}
            isi={i === TANGGA.n - 1 ? 1 : 0}
          />
        );
      })}

      {/* catatan di anak tangga terbawah — cuma kolom kanan yang punya */}
      {sisa >= 0 && (
        <g transform={`scale(${1 + 0.12 * sorotBilah}) translate(${(xKol(kol) - 120) * (1 - 1 / (1 + 0.12 * sorotBilah))} 0)`}>
          <Catatan
            x={xKol(kol) - 120}
            y={posMini(kol, 0).y - 96}
            skala={0.72}
            sisa={sisa}
            nyala={sorotBilah}
          />
        </g>
      )}

      <Kartu x={p.x + 96} y={p.y} teks="?" skala={0.3} warna="var(--ok)" opacity={u > 0 ? 1 : 0} />

      {/* halaman yang akhirnya dibuka */}
      <g opacity={hasil}>
        <rect
          x={xKol(kol) - 130}
          y={848}
          width={260}
          height={96}
          rx={10}
          fill="var(--bg-elev)"
          stroke="var(--accent-ink)"
          strokeWidth={4}
        />
        <text
          x={xKol(kol)}
          y={902}
          fontSize={32}
          fontFamily="var(--font-mono)"
          fontWeight={700}
          fill="var(--ink-0)"
          textAnchor="middle"
        >
          {nomor}
        </text>
      </g>
    </g>
  );
};

export const UmurCatatan: React.FC = () => {
  const d = useDetik();

  /* --- babak A: tangga penuh, catatan menyala, satu diperbesar --- */
  const nyala = t(d, { mulai: B_SELAMANYA, durasi: 0.5, dari: 0, ke: 1 });
  const besar = t(d, { mulai: B_TANGGAL, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const sisaZoom = t(d, {
    mulai: B_TANGGAL + 0.5,
    durasi: Math.max(0.1, B_PINDAH - B_TANGGAL - 0.5),
    dari: 1,
    ke: 0.35,
    ease: E.linear,
  });
  const garisSiapa = gambarGaris(d, 620, { mulai: B_SIAPA, durasi: 0.6 });

  const babakA = 1 - t(d, { mulai: B_PINDAH - 0.2, durasi: 0.6, dari: 0, ke: 1 });

  /* --- babak B: dua kolom, BERSAMAAN --- */
  const babakB =
    t(d, { mulai: B_PINDAH, durasi: 0.6, dari: 0, ke: 1 }) *
    (1 - t(d, { mulai: B_MENYEBAR - 0.4, durasi: 0.5, dari: 0, ke: 1 }));
  const belah = gambarGaris(d, 700, { mulai: B_PINDAH + 0.1, durasi: 0.5 });

  /* Kedua kolom dipetakan dari `d` yang SAMA — lihat keputusan 1. */
  const naik = t(d, { mulai: B_KAMU, durasi: 1.5, dari: 0, ke: 1, ease: E.power2out });
  const naikKanan = t(d, { mulai: B_KAMU, durasi: 0.5, dari: 0, ke: 0.34, ease: E.power2out });
  const balikKanan = t(d, { mulai: B_TEMAN, durasi: 0.6, dari: 0, ke: -0.34, ease: E.power2in });
  const hasilKiri = t(d, { mulai: B_KAMU + 1.7, durasi: 0.4, dari: 0, ke: 1 });
  const hasilKanan = t(d, { mulai: B_TEMAN + 0.8, durasi: 0.4, dari: 0, ke: 1 });
  const sorotBilah = t(d, { mulai: B_BELUM, durasi: 0.5, dari: 0, ke: 1 });

  /* --- babak C: kata yang dikutip, lalu dicoret --- */
  const babakC = t(d, { mulai: B_MENYEBAR - 0.3, durasi: 0.5, dari: 0, ke: 1 });
  const panahAda = t(d, { mulai: B_MENYEBAR + 0.2, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const panahPadam = t(d, { mulai: B_TIDAK, durasi: 0.35, dari: 1, ke: 0 });
  const coret = gambarGaris(d, 560, { mulai: B_TIDAK + 0.15, durasi: 0.35 });
  const kataPergi = t(d, { mulai: B_SATU - 0.3, durasi: 0.5, dari: 1, ke: 0 });

  /* --- tahap 10: banyak bilah, laju sendiri-sendiri, TANPA arah --- */
  const bilahAda = t(d, { mulai: B_SATU, durasi: 0.6, dari: 0, ke: 1 });
  const jam = Math.max(0, d - B_SATU);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ================= babak A ================= */}
          <g opacity={babakA}>
            {Array.from({ length: TANGGA.n }, (_, i) => {
              const p = posLoket(i);
              return (
                <Loket
                  key={i}
                  x={p.x}
                  y={p.y}
                  skala={p.skala}
                  nyala={0.5}
                  aksen={i === I_PEMILIK}
                  isi={i === I_PEMILIK ? 1 : 0}
                />
              );
            })}

            {Array.from({ length: TANGGA.n }, (_, i) => {
              const c = titikCatatan(i);
              /* Catatan pertama diperbesar ke tengah; sisanya tetap di tempat. */
              const ke = { x: 620, y: 520 };
              const f = i === 0 ? besar : 0;
              return (
                <Catatan
                  key={i}
                  x={c.x + (ke.x - c.x) * f}
                  y={c.y + (ke.y - c.y) * f}
                  skala={posLoket(i).skala * (1 + 2.1 * f)}
                  nyala={nyala}
                  sisa={i === 0 && besar > 0.5 ? sisaZoom : -1}
                />
              );
            })}

            {/* yang menyetel tanggalnya datang dari loket pemilik */}
            <path
              d={`M${jendelaLoket(I_PEMILIK).x} ${jendelaLoket(I_PEMILIK).y}L700 470`}
              stroke={GARIS.warna}
              strokeWidth={GARIS.tebal}
              strokeLinecap="round"
              opacity={GARIS.opasitas * besar}
              {...garisSiapa}
            />
            <text
              x={620}
              y={664}
              fontSize={26}
              fontFamily="var(--font-mono)"
              fill="var(--ink-2)"
              textAnchor="middle"
              opacity={besar}
            >
              tanggal habis
            </text>
          </g>

          {/* ================= babak B ================= */}
          <g opacity={babakB}>
            <path
              d="M960 240v700"
              stroke="var(--line)"
              strokeWidth={4}
              {...belah}
            />
            <Kolom
              kol={0}
              judul="kamu"
              u={naik}
              sampai={naik}
              nomor={NOMOR_BARU}
              hasil={hasilKiri}
              sisa={-1}
              sorotBilah={0}
            />
            <Kolom
              kol={1}
              judul="temanmu"
              u={naikKanan + balikKanan}
              sampai={Math.max(naikKanan + balikKanan, 0.34)}
              nomor={NOMOR_LAMA}
              hasil={hasilKanan}
              sisa={0.55}
              sorotBilah={sorotBilah}
            />
          </g>

          {/* ================= babak C ================= */}
          <g opacity={babakC * kataPergi}>
            {Array.from({ length: 12 }, (_, k) => {
              const a = (k / 12) * Math.PI * 2;
              const r = 180 + 210 * panahAda;
              return (
                <path
                  key={k}
                  d={`M${960 + Math.cos(a) * 170} ${520 + Math.sin(a) * 170}L${
                    960 + Math.cos(a) * r
                  } ${520 + Math.sin(a) * r}`}
                  stroke="var(--ink-2)"
                  strokeWidth={5}
                  strokeLinecap="round"
                  opacity={panahAda * panahPadam}
                />
              );
            })}
            <text
              x={960}
              y={520}
              fontSize={92}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              menyebar
            </text>
            <path
              d="M680 524h560"
              stroke="var(--bad)"
              strokeWidth={9}
              strokeLinecap="round"
              {...coret}
            />
          </g>

          {/* ---------- tahap 10: laju sendiri-sendiri, tanpa arah ---------- */}
          <g opacity={bilahAda}>
            {Array.from({ length: KISI_CATATAN.n }, (_, k) => {
              const p = KISI_CATATAN.pos(k);
              return (
                <Catatan
                  key={k}
                  x={p.x}
                  y={p.y}
                  skala={KISI_CATATAN.skala}
                  sisa={KISI_CATATAN.sisa(k, jam)}
                  nyala={KISI_CATATAN.nyala}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
