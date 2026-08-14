/* Panggung — pembungkus terluar setiap komposisi.

   Tugasnya empat: memuat font, memuat CSS tema, memasang sprite ikon, dan
   memasang kelas rasio yang menentukan skala tipografi + kotak aman.

   Ukurannya TIDAK diatur di sini. <AbsoluteFill> selalu seukuran komposisi,
   dan ukuran komposisi datang dari .env lewat src/Root.tsx. Ini yang dulu jadi
   sumber bug paling mahal di versi HyperFrames: tinggi panggung harus ditulis
   manual, dan kalau lupa, seluruh episode render hitam polos sementara
   pemeriksaan tetap lulus karena tidak ada yang salah — hanya tidak ada yang
   terlihat.
*/
import type React from "react";
import { AbsoluteFill } from "remotion";

import "./fonts";
import "./theme.css";
import "./figur.css";
import "./scenes.css";
import { SpriteIkon } from "./Icons";
import { PeriksaJahitan } from "./PeriksaJahitan";
import { PeriksaTumpang } from "./PeriksaTumpang";

export type Rasio = "16x9" | "9x16";

export const Panggung: React.FC<{
  children: React.ReactNode;
  rasio?: Rasio;
  /** Menggambar batas kotak aman dan zona end screen. Untuk diperiksa di
   *  Studio — jangan dinyalakan saat render. */
  debug?: boolean;
}> = ({ children, rasio = "16x9", debug = false }) => (
  <AbsoluteFill
    className={[
      "panggung",
      `r-${rasio}`,
      debug ? "debug-safe debug-endscreen" : "",
    ]
      .filter(Boolean)
      .join(" ")}
  >
    <SpriteIkon />
    {children}
    {/* Keduanya TIDUR kecuali input prop-nya dikirim — tidak merender apa pun
        dan tidak menyentuh frame. tools/periksa-tumpang.mjs dan
        tools/periksa-jahitan.mjs yang menyalakannya, satu per satu. */}
    <PeriksaTumpang />
    <PeriksaJahitan />
  </AbsoluteFill>
);

/** Satu scene. Isinya otomatis dibungkus .scene-content supaya kotak amannya
 *  seragam — tidak ada scene yang boleh menulis padding-nya sendiri.
 *
 *  Scene tidak mengatur kapan dirinya muncul; itu urusan <Sequence> di
 *  Episode.tsx. Di sini hanya tata letaknya. */
export const Scene: React.FC<{
  children: React.ReactNode;
  /** Kelas tambahan di .scene — mis. "sc-open", "sc-close". */
  kelas?: string;
  /** Isi ditaruh di tengah dan rata tengah. Baku untuk sebagian besar scene. */
  tengah?: boolean;
}> = ({ children, kelas, tengah = true }) => (
  <div className={["scene", kelas].filter(Boolean).join(" ")}>
    <div className={["scene-content", tengah ? "center" : ""].filter(Boolean).join(" ")}>
      {children}
    </div>
  </div>
);
