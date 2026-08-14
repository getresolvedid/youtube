/* T16 · scene 2 · opening — kartu judul
   Direction: 02-opening-direction.md

   BUKAN SCENE, dan karena itu TIDAK didaftarkan di `SCENES`. Scene-nya sendiri
   milik `shared/StandarScenes.tsx` (`<KartuJudul>`) dan tidak dibuat ulang di
   episode mana pun (docs/10). Yang tinggal di sini cuma FIGUR benda utama
   episode, yang dikirim `Episode.tsx` lewat prop `figur`.

   Koreografi masuknya milik `shared/`; jangan menganimasikan apa pun di sini.

   KOTAKNYA DIGAMBAR TANPA KUNCI DAN TANPA JALAN, dan itu keputusan. Kartu judul
   lewat di detik ~23, jauh sebelum penonton tahu bahwa gembok dan kunci adalah
   dua benda terpisah — dan pemisahan itu seluruh isi bagian 4. Figur yang sudah
   memperlihatkan keduanya membocorkan jawabannya di bagian 2. Jalannya juga
   tidak ada: kotak yang sudah berdiri di atas jalan mengumumkan bahwa
   masalahnya soal perjalanan, dan di detik 23 penonton baru dapat pertanyaannya.
*/
import type React from "react";

const G = "var(--ink-1)";
const A = "var(--accent-ink)";

export const FigurKotak: React.FC = () => (
  <svg
    viewBox="-230 -330 460 360"
    style={{ width: "100%", height: "auto" }}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {/* kotak kiriman — tertutup, tegak, satu-satunya benda di kartu */}
    <rect x={-110} y={-190} width={220} height={180} rx={10} stroke={G} strokeWidth={7} />
    <path d="M-118 -212h236" stroke={G} strokeWidth={7} />
    <path d="M0 -190v180" stroke={G} strokeWidth={7} opacity={0.5} />

    {/* gembok — TERKUNCI, dan beraksen: satu-satunya bagian berwarna */}
    <g transform="translate(0 -232)">
      <rect x={-30} y={-16} width={60} height={48} rx={8} stroke={A} strokeWidth={7} />
      <path d="M-17 -16v-16a17 17 0 0 1 34 0v16" stroke={A} strokeWidth={7} />
    </g>

    {/* garis lantai — alas yang sama dengan seluruh episode */}
    <path d="M-210 0H210" stroke={G} strokeWidth={7} opacity={0.6} />
  </svg>
);
