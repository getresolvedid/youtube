/* Teks besar di sepertiga atas layar — dipakai KEDUA Short.

   WAJIB ada di tiap scene Short: mayoritas penonton Shorts menonton tanpa suara
   (docs/02 § Aturan Shorts), jadi setiap kalimat VO punya padanan teksnya di
   layar — ringkas, bukan transkrip penuh.

   Posisinya dipatok di sini, sekali, supaya ia TIDAK bergeser antar-scene. Teks
   yang melompat tiap potongan terbaca sebagai kesalahan, bukan sebagai
   penekanan — dan di Short, potongannya datang tiap tiga detik.

   Top 250 = tepat di bawah batas kotak aman atas 9:16 (240px, docs/03).
*/
import type React from "react";

export const TeksAtas: React.FC<{
  children: React.ReactNode;
  opacity?: number;
  /** Dipakai bersama `masuk()`: `<TeksAtas {...masuk(d)} />`. */
  transform?: string;
  warna?: string;
}> = ({ children, opacity = 1, transform, warna = "var(--ink-0)" }) => (
  <div
    style={{
      position: "absolute",
      left: 90,
      right: 90,
      top: 250,
      textAlign: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      /* Sedikit di bawah --fs-title. Pada 96px penuh, kalimat tiga baris
         menabrak isi scene di 9:16 — dan tiga baris memang bentuk yang wajar
         di sini, karena teksnya menirukan kalimat VO. Diturunkan sekali di
         sini, bukan ditambal per scene. */
      fontSize: "calc(var(--fs-title) * 0.78)",
      lineHeight: 1.12,
      color: warna,
      opacity,
      transform,
    }}
  >
    {children}
  </div>
);
