import type React from "react";
import { ABU, ISI } from "./palet";

/** Gembok. `terbuka` 0..1 mengangkat dan memiringkan sengkangnya.
 *
 *  Sudah lahir dua kali (firewall sebagai penanda pintu terkunci, enkripsi
 *  sebagai benda utama), dan keduanya butuh hal yang sama: bentuk yang terbaca
 *  sebagai "terkunci" pada ukuran sekecil 20px.
 *
 *  Yang membuatnya terbaca bukan badannya melainkan SENGKANGNYA — karena itu
 *  `terbuka` menggerakkan sengkang, bukan mengganti warna. Gembok yang cuma
 *  berubah warna saat dibuka tidak terbaca sebagai terbuka; ia terbaca sebagai
 *  gembok yang disorot.
 *
 *  Titik acuannya PUSAT BADAN, bukan kaki — gembok lebih sering menggantung di
 *  sesuatu daripada berdiri di lantai.
 */
export const Gembok: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  terbuka?: number;
  warna?: string;
  /** Isi badan gembok. `"none"` untuk gembok yang menumpang di atas benda lain. */
  isi?: string;
}> = ({ x, y, skala = 1, opacity = 1, terbuka = 0, warna = ABU, isi = ISI }) => {
  const b = Math.max(0, Math.min(1, terbuka));
  return (
    <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
      <g transform={`translate(${12 * b} ${-12 * b}) rotate(${18 * b} 0 -9)`}>
        <path
          d="M-17 -9v-17a17 17 0 0 1 34 0v17"
          fill="none"
          stroke={warna}
          strokeWidth={6}
          strokeLinecap="round"
        />
      </g>
      <rect
        x={-30}
        y={-9}
        width={60}
        height={50}
        rx={9}
        fill={isi}
        stroke={warna}
        strokeWidth={6}
      />
      <circle cx={0} cy={16} r={6} fill={warna} />
    </g>
  );
};
