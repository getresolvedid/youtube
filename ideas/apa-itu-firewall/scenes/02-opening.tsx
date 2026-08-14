/* T15 · scene 2 · opening — kartu judul
   Direction: 02-opening-direction.md

   BUKAN SCENE, dan karena itu TIDAK didaftarkan di `SCENES`. Scene-nya sendiri
   milik `shared/StandarScenes.tsx` (`<KartuJudul>`) dan tidak dibuat ulang di
   episode mana pun (docs/10). Yang tinggal di sini cuma FIGUR benda utama
   episode, yang dikirim `Episode.tsx` lewat prop `figur`.

   Koreografi masuknya milik `shared/`; jangan menganimasikan apa pun di sini.

   PENJAGANYA DIGAMBAR TANPA DAFTAR DAN TANPA BUKU, dan itu keputusan. Kartu
   judul lewat di detik ~21, saat penonton belum tahu apa-apa soal penjaga.
   Bendanya boleh berdiri — ia memang `[what]` episode ini — tapi MEKANISMENYA
   tidak: daftar dan buku catatan adalah isi bagian 4 dan 5, dan figur yang sudah
   memegang keduanya membocorkan jawabannya di bagian 2.
*/
import type React from "react";

import { PINTU } from "../panggung-gedung";

const G = "var(--ink-1)";
const A = "var(--accent-ink)";

export const FigurPenjaga: React.FC = () => (
  <svg
    viewBox="-230 -330 460 360"
    style={{ width: "100%", height: "auto" }}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {/* pintu bernomor — benda yang dijaga, digambar TERTUTUP */}
    <g transform="translate(96 0)">
      <rect
        x={PINTU.w / -2}
        y={-PINTU.h - 60}
        width={PINTU.w}
        height={PINTU.h + 60}
        rx={8}
        stroke={G}
        strokeWidth={7}
      />
      <circle cx={PINTU.w / 2 - 20} cy={-100} r={6} fill={G} />
    </g>

    {/* garis lantai — alas yang sama dengan seluruh episode */}
    <path d="M-210 0H210" stroke={G} strokeWidth={7} opacity={0.6} />

    {/* penjaga: berdiri di depan pintu, menghadap KIRI, tangan kosong */}
    <g transform="translate(-78 0)">
      <circle cx={0} cy={-150} r={40} stroke={G} strokeWidth={7} />
      {/* topi — satu-satunya bagian beraksen, dan satu-satunya pembeda penjaga
          dari sosok biasa di sepanjang episode */}
      <path d="M-44 -181h88M-33 -181v-13a33 33 0 0 1 66 0v13" stroke={A} strokeWidth={7} />
      <path d="M-40 -145h-16" stroke={G} strokeWidth={7} />
      <path d="M-62 0v-42a62 62 0 0 1 124 0V0" stroke={G} strokeWidth={7} />
    </g>
  </svg>
);
