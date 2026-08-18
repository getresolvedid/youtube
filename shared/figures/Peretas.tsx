import type React from "react";
import { ABU } from "./palet";
import {
  HACKER_KOTAK,
  HACKER_TUDUNG_D,
  HACKER_WAJAH_D,
  PERSON_D,
  PERSON_KOTAK,
} from "./sumber-svgrepo";
import { TINGGI_FIGUR, normalisasi } from "./normalisasi";

/* ---------------------------------------------------------------------------
   Penyetelan. Tiga angka, dan cuma ketiganya yang boleh disetel dengan mata.
   ------------------------------------------------------------------------ */

/** Batas atas badan di koordinat sumber `person-silhouette`: kepala orangnya
 *  dibuang dari sini ke atas, dan tudungnya yang menggantikan. */
const BAHU_ATAS = 210;

/** Tinggi tudung pada `tinggi` baku.
 *
 *  Disetel supaya lebar tepinya (105) tetap DI BAWAH lebar bahunya (127).
 *  Tudung yang lebih lebar dari bahu berhenti terbaca sebagai tudung dan mulai
 *  terbaca sebagai topi bertepi — perbedaan yang tidak kelihatan waktu figurnya
 *  besar dan langsung kelihatan waktu ia kecil. */
const TUDUNG_TINGGI = 69;

/** Dagu tudung, relatif titik tumpu. Sengaja MENINDIH pangkal bahu beberapa
 *  satuan — tudung yang dagunya pas menyentuh bahu meninggalkan garis rambut
 *  seukuran satu piksel yang berkedip waktu figurnya bergerak. */
const TUDUNG_DASAR_Y = -78;

/** Lihat catatan id di [Sosok.tsx](./Sosok.tsx) — tetap, bukan diacak. */
const KLIP_BADAN = "figur-peretas-badan";

/** Peretas — sosok bertudung berkacamata gelap.
 *
 *  DUA SUMBER, satu figur: badannya `person-silhouette` yang sama persis dengan
 *  `Sosok`, kepalanya tudung dari `hacker`. Bukan karena tanggung — siluet
 *  `hacker` di SVG Repo memang cuma kepala bertudung, terpotong di dagu, tanpa
 *  satu pun bahu. Dipakai sendirian ia melayang; ditumpangkan ke badan `Sosok`
 *  ia jadi orang yang sama dengan orang lain di panggung, yang membedakan cuma
 *  kepalanya. Dan itu justru yang benar untuk episode ini: yang mengetuk pintu
 *  bukan makhluk lain, ia orang biasa yang tidak mau dikenali.
 *
 *  Yang membuatnya terbaca dalam seperempat detik cuma dua hal: tepi tudung
 *  yang jauh lebih lebar dari bahunya, dan dua lensa terang di wajah yang gelap.
 *  Keduanya bertahan sampai skala kecil; tanpa lensanya yang tersisa cuma orang
 *  berjaket.
 *
 *  TIDAK ADA WARNA BAHAYA. Ia digambar dengan `warna` yang sama dengan figur
 *  lain — merah pada figur ini akan mengubah setiap scene yang memuatnya jadi
 *  peringatan, dan peringatan membuat orang menutup video, bukan memeriksa
 *  daftarnya (docs/03 § Do/Don't, dan catatan yang sama di direction scene 14
 *  T15).
 *
 *  Titik acuannya KAKI (aturan 2 di README).
 */
export const Peretas: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** Arah hadap: 1 ke kanan, -1 ke kiri. Cerminan, BUKAN derajat. Pecahan di
   *  antaranya adalah animasi berbalik badan — lihat catatan lengkapnya di
   *  [Sosok.tsx](./Sosok.tsx).
   *
   *  Seperti `Sosok`, tudungnya menghadap penonton — `hadap` ada supaya ketiga
   *  figur manusia punya prop yang sama, bukan karena gambarnya berubah. */
  hadap?: number;
  /** Miring tudung, derajat. Badannya tidak ikut. */
  miring?: number;
  /** Tinggi pada `skala` 1 — lihat catatan yang sama di `Sosok`. */
  tinggi?: number;
  warna?: string;
}> = ({
  x,
  y,
  skala = 1,
  opacity = 1,
  hadap = 1,
  miring = 0,
  tinggi = TINGGI_FIGUR,
  warna = ABU,
}) => {
  const skalaBadan = tinggi / TINGGI_FIGUR;
  return (
    <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
      <g transform={`scale(${hadap} 1)`}>
        {/* --- badan: `Sosok` yang kepalanya dibuang ------------------------ */}
        <g transform={normalisasi(PERSON_KOTAK, tinggi)}>
          <defs>
            <clipPath id={KLIP_BADAN}>
              <rect x={0} y={BAHU_ATAS} width={512} height={PERSON_KOTAK.dasar - BAHU_ATAS} />
            </clipPath>
          </defs>
          <path d={PERSON_D} fill={warna} clipPath={`url(#${KLIP_BADAN})`} />
        </g>

        {/* --- tudung: dagunya jadi titik tumpunya sendiri ------------------- */}
        <g
          transform={`translate(0 ${TUDUNG_DASAR_Y * skalaBadan}) rotate(${miring}) ${normalisasi(
            HACKER_KOTAK,
            TUDUNG_TINGGI * skalaBadan,
          )}`}
        >
          <path d={HACKER_TUDUNG_D} fill={warna} />
          {/* evenodd yang membuat dua lensanya jadi LUBANG, bukan dua bercak
              yang lebih gelap. Dengan nonzero bawaan, arah putar subpath-nya
              menentukan hasilnya — dan arah putar keluaran mesin bukan sesuatu
              yang boleh diandalkan. */}
          <path d={HACKER_WAJAH_D} fill={warna} fillRule="evenodd" />
        </g>
      </g>
    </g>
  );
};
