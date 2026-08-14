/* T01 · scene 2 · opening — bagian 2 [brand], 4,0 dtk
   Direction: 02-opening-direction.md   ← sumber tata letak & koreografi

   BERKAS INI BUKAN SCENE-NYA. Kartu judul milik shared/StandarScenes.tsx dan
   dipakai identik di semua episode (docs/10) — yang ada di sini cuma bagian
   yang memang milik T01: figur bendanya.

   Direction minta tiga hal:
     1. judul "RAM (Random Access Memory)"  -> JUDUL + SUBJUDUL di Episode.tsx
     2. brand getresolved                   -> mark + wordmark, sudah di shared/
     3. figur RAM                           -> <FigurRam/> di bawah ini

   Karena itu ia TIDAK didaftarkan di scenes/index.ts: `SCENES` isinya scene
   milik episode, dan opening bukan salah satunya. Episode.tsx yang
   mengirimkannya ke <KartuJudul figur={...}>.

   Yang digambar adalah satu modul DIMM dilihat lurus dari depan: papan, delapan
   keping memori, dan tepi kontak bertakik. Bukan ikon `ram` dari shared/Icons —
   pada kartu judul yang cuma tampil ~1,5 dtk, ikon garis 260px terbaca sebagai
   simbol kecil di sebelah judul 96px; benda yang digambar utuh terbaca sebagai
   benda. Geometrinya inline di sini, bukan di shared/figur.css, karena sejauh
   ini cuma episode ini yang memakainya (docs/03 § Ikon & figur).

   Bagian yang bergerak cuma satu: kepingnya menyala berurutan kiri->kanan,
   1,60–2,69 dtk. Itu sengaja — "tempat yang dipakai satu per satu" adalah
   gagasan seluruh episode, dan di sini ia lewat sekali sebagai bayangan, tanpa
   dijelaskan. Sesudah 2,69 tidak ada lagi yang datang; jeda itu bagian dari
   koreografinya, bukan sisa waktu.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";

/* Semua koordinat dalam sistem viewBox di bawah, bukan px frame. Papan digambar
   pada 560x210 lalu diskalakan lewat lebar SVG-nya. */
const VB = { w: 560, h: 210 };

/** Papan: tepi atas 16, tepi bawah 168. Sisa ke bawah milik pin kontak. */
const PAPAN = { x: 12, y: 16, w: 536, h: 152, r: 10 };

/** Delapan keping — jumlah yang memang ada di satu sisi DIMM. */
const KEPING = { n: 8, w: 52, h: 66, y: 44, jarak: 13 };
const KEPING_X0 =
  PAPAN.x + (PAPAN.w - (KEPING.n * KEPING.w + (KEPING.n - 1) * KEPING.jarak)) / 2;

/** Tepi kontak: bilah di kaki papan, dipotong takik. Takik inilah yang membuat
 *  modul cuma bisa masuk satu arah — detail kecil yang membuat gambarnya
 *  terbaca sebagai barang nyata, bukan persegi panjang berisi kotak. */
const KONTAK = { y: 138, h: 30 };
const TAKIK = { x: 206, w: 26 };

/* Nyala keping — angkanya ditentukan dari BELAKANG, bukan dari depan.
   Kartu memudar di 3,72 (4,0 dtk dikurangi 0,28 dtk pudar, docs/10), dan
   sebelum memudar harus ada saat semua sudah ada di tempatnya dan tidak ada
   yang bergerak.

   Kartu naik dari 2,5 ke 4,0 dtk, dan tambahan 1,5 dtk itu TIDAK dipakai untuk
   menahan gambar lebih lama di ujung — nyalanya sendiri yang diperlambat:
   jeda antar keping 0,08 -> 0,11 dan pudar tiap keping 0,26 -> 0,32. Delapan
   keping jadi terbaca sebagai delapan kejadian, bukan sebagai satu gelombang
   yang lewat. Sisanya, ~1 dtk, memang jeda — dan figurnya bernapas di situ
   (NAPAS di shared/StandarScenes.tsx) supaya jeda tidak jadi frame beku. */
const T_NYALA = 1.6;
const JEDA_NYALA = 0.11; // keping ke-i tertunda i x ini
const DUR_NYALA = 0.32;

/** Pin kontak: garis tegak berjarak tetap, melompati takik. Dihitung, bukan
 *  ditulis satu per satu — 40-an <rect> yang diketik tangan adalah 40-an tempat
 *  untuk salah ketik. */
const pin = (): number[] => {
  const keluar: number[] = [];
  for (let x = PAPAN.x + 12; x < PAPAN.x + PAPAN.w - 12; x += 12) {
    if (x > TAKIK.x - 8 && x < TAKIK.x + TAKIK.w + 2) continue;
    keluar.push(x);
  }
  return keluar;
};

const PIN = pin();

export const FigurRam: React.FC = () => {
  const d = useDetik();

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      style={{ width: "100%", height: "auto", overflow: "visible" }}
      aria-hidden
    >
      {/* papan */}
      <rect
        x={PAPAN.x}
        y={PAPAN.y}
        width={PAPAN.w}
        height={PAPAN.h}
        rx={PAPAN.r}
        fill="var(--bg-elev)"
        stroke="var(--accent)"
        strokeWidth={3}
      />

      {/* jalur sablon di atas keping — satu garis tipis, cukup untuk membuat
          papannya tidak terbaca sebagai kotak kosong */}
      <path
        d={`M${PAPAN.x + 22} 32H${PAPAN.x + PAPAN.w - 22}`}
        stroke="var(--line)"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* tepi kontak + takik */}
      <path
        d={`M${PAPAN.x + 6} ${KONTAK.y}H${TAKIK.x}M${TAKIK.x + TAKIK.w} ${
          KONTAK.y
        }H${PAPAN.x + PAPAN.w - 6}`}
        stroke="var(--line)"
        strokeWidth={3}
      />
      {PIN.map((x) => (
        <rect
          key={x}
          x={x}
          y={KONTAK.y + 6}
          width={6}
          height={KONTAK.h - 8}
          rx={2}
          fill="var(--ink-2)"
        />
      ))}
      {/* takik: KERATAN di tepi bawah papan, bukan kotak yang ditempel di
          atasnya. Karena itu ia digambar sebagai tiga sisi (naik–menyeberang–
          turun) yang berhenti tepat di tepi papan; sisi keempatnya memang tidak
          ada — di situlah papannya terpotong. */}
      <path
        d={`M${TAKIK.x} ${PAPAN.y + PAPAN.h}V${KONTAK.y - 4}H${
          TAKIK.x + TAKIK.w
        }V${PAPAN.y + PAPAN.h}Z`}
        fill="var(--bg)"
      />
      <path
        d={`M${TAKIK.x} ${PAPAN.y + PAPAN.h}V${KONTAK.y - 4}H${
          TAKIK.x + TAKIK.w
        }V${PAPAN.y + PAPAN.h}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* delapan keping memori — menyala berurutan kiri ke kanan */}
      {Array.from({ length: KEPING.n }, (_, i) => {
        const x = KEPING_X0 + i * (KEPING.w + KEPING.jarak);
        const nyala = t(d, {
          mulai: T_NYALA + i * JEDA_NYALA,
          durasi: DUR_NYALA,
          dari: 0,
          ke: 1,
          ease: E.power2out,
        });

        return (
          <g key={x}>
            <rect
              x={x}
              y={KEPING.y}
              width={KEPING.w}
              height={KEPING.h}
              rx={6}
              fill="var(--bg)"
              stroke="var(--line)"
              strokeWidth={3}
            />
            {/* lapis nyala ditumpuk di atas lapis padam, bukan menggantikannya:
                warnanya variabel CSS, dan yang bisa dianimasikan sebagai fungsi
                murni dari frame adalah opasitasnya.

                Isian dan garisnya punya opasitas SENDIRI. Satu `opacity` untuk
                keduanya memaksa isian ikut sekuat garis — pada latar segelap
                ini keping jadi blok indigo pekat, dan delapan blok pekat
                berdempetan menghapus kepingnya sebagai benda terpisah. */}
            <rect
              x={x}
              y={KEPING.y}
              width={KEPING.w}
              height={KEPING.h}
              rx={6}
              fill="var(--accent)"
              fillOpacity={0.34 * nyala}
              stroke="var(--accent-ink)"
              strokeOpacity={nyala}
              strokeWidth={3}
            />
            {/* penanda pin 1 — pojok yang sama di setiap keping, seperti aslinya */}
            <circle
              cx={x + 11}
              cy={KEPING.y + 11}
              r={3.5}
              fill="var(--ink-2)"
              opacity={1 - 0.4 * nyala}
            />
          </g>
        );
      })}
    </svg>
  );
};
