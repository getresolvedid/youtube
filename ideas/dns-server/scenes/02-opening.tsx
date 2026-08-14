/* T14 · scene 2 · opening — kartu judul, 2,5 dtk
   Direction: 02-opening-direction.md

   BUKAN SCENE, dan karena itu TIDAK didaftarkan di `SCENES`. Scene-nya sendiri
   milik `shared/StandarScenes.tsx` (`<KartuJudul>`) dan tidak dibuat ulang di
   episode mana pun (docs/10). Yang tinggal di sini cuma FIGUR benda utama
   episode, yang dikirim `Episode.tsx` lewat prop `figur` — docs/10 § Figur
   episode.

   Koreografi masuknya milik `shared/`; jangan menganimasikan apa pun di sini.
   Kalau koreografinya perlu berubah, ubah di `shared/` untuk semua episode.

   LOKETNYA DIGAMBAR KOSONG DAN TERTUTUP, dan itu keputusan. Kartu judul lewat di
   detik ~19, saat penonton belum tahu apa-apa soal loket; figur yang sudah
   bekerja akan membocorkan jawaban bagian 4 di bagian 2. Lacinya baru berisi di
   `06-tangga`, dan itu pun cuma satu, di loket paling atas.
*/
import type React from "react";

import { LOKET } from "../panggung-loket";

const G = "var(--ink-1)";
const A = "var(--accent-ink)";

export const FigurLoket: React.FC = () => (
  <svg
    viewBox="-200 -330 400 370"
    style={{ width: "100%", height: "auto" }}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {/* badan */}
    <rect
      x={LOKET.w / -2}
      y={-LOKET.h}
      width={LOKET.w}
      height={LOKET.h}
      rx={10}
      stroke={G}
      strokeWidth={7}
    />
    {/* kanopi — yang membuat bendanya terbaca sebagai loket dan bukan layar */}
    <path
      d={`M${LOKET.atap.w / -2} ${-LOKET.h}H${LOKET.atap.w / 2}L${
        LOKET.atap.w / 2 - LOKET.atap.tarik
      } ${-LOKET.h - LOKET.atap.tinggi}H${LOKET.atap.w / -2 + LOKET.atap.tarik}Z`}
      stroke={G}
      strokeWidth={7}
    />
    {/* bukaan jendela — satu-satunya yang beraksen, karena di situlah
        pertanyaan masuk dan jawaban keluar */}
    <rect
      x={LOKET.jendela.w / -2}
      y={LOKET.jendela.y}
      width={LOKET.jendela.w}
      height={LOKET.jendela.h}
      rx={8}
      stroke={A}
      strokeWidth={7}
    />
    {/* meja yang menjorok */}
    <path
      d={`M${LOKET.meja.w / -2} ${LOKET.meja.y}h${LOKET.meja.w}`}
      stroke={G}
      strokeWidth={9}
    />
    {/* laci — TERTUTUP, dan kosong */}
    <rect
      x={LOKET.laci.w / -2}
      y={LOKET.laci.y - LOKET.laci.h}
      width={LOKET.laci.w}
      height={LOKET.laci.h}
      rx={7}
      stroke={G}
      strokeWidth={6}
    />
    <path d="M-30 -105h60" stroke={G} strokeWidth={6} />
  </svg>
);
