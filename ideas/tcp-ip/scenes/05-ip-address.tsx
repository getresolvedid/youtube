/* T18 · scene 5 · ip-address — alamat
   VO:        05-ip-address-vo.md
   Direction: 05-ip-address-direction.md

   Membongkar separuh kiri label scene 4. Bentuknya sama: dunia fisik dulu, lalu
   berubah jadi jaringan DI TEMPAT YANG SAMA.

   DUA KEPUTUSAN:

   1. Rumah dan komputer menempati x yang sama persis, dan perubahannya opacity
      silang — bukan potong. Bendanya berubah, tidak berganti.

   2. Potongan tanpa alamat di tahap 4 memakai komponen `Paket` yang SAMA,
      cuma tanpa prop `label`. Seluruh tahap itu bergantung pada keduanya
      identik kecuali labelnya.
*/
import type React from "react";

import { E, getar, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Desktop,
  JALUR_Y,
  Jalur,
  Paket,
  Rumah,
  Simpul,
  X_KANAN,
  X_KIRI,
  Y_LANTAI,
} from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "ip-address";

const B_MULAI = beat(ID, 0); // "Kita mulai dari IP."
const B_SETIAP = beat(ID, 1); // "Setiap perangkat yang berkomunikasi…"
const B_SEPERTI = beat(ID, 2); // "IP address berfungsi seperti alamat rumah."
const B_TANPA = beat(ID, 3); // "Tanpa alamat tujuan…"

const RUMAH_X = [560, 960, 1360] as const;
const NOMOR = ["01", "02", "03"] as const;
const ALAMAT = ["192.168.1.8", "192.168.1.10", "192.168.1.12"] as const;

export const IpAddress: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 2: rumah berdiri, papan nomornya menyala berurutan --- */
  const berdiri = t(d, { mulai: B_MULAI, durasi: 0.7, dari: 0, ke: 1 });
  const nyala = (i: number) =>
    t(d, { mulai: B_SETIAP + i * 0.18, durasi: 0.4, dari: 0, ke: 1 });

  /* Potongan menyusuri ketiganya — pelan dan ragu, bukan terarah. */
  const cari = t(d, {
    mulai: B_SETIAP + 0.3,
    durasi: 2.6,
    dari: 0,
    ke: 1,
    ease: E.sineInOut,
  });

  /* --- tahap 3: rumah -> komputer, di titik yang sama --- */
  const jadiKomputer = t(d, { mulai: B_SEPERTI, durasi: 0.9, dari: 0, ke: 1 });
  const turun = t(d, { mulai: B_SEPERTI + 0.8, durasi: 0.8, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 4: potongan tanpa alamat, dan ia tidak sampai ke mana pun --- */
  const masukPolos = t(d, { mulai: B_TANPA, durasi: 1.6, dari: 0, ke: 1, ease: E.power1out });
  const bingung = getar(d, { mulai: B_TANPA + 1.5, durasi: 0.9, jauh: 14, putaran: 2 });
  const padam = t(d, { mulai: B_TANPA + 2.2, durasi: 0.8, dari: 1, ke: 0.32 });

  const xCari = RUMAH_X[0] + (RUMAH_X[2] - RUMAH_X[0]) * cari;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jalur y={JALUR_Y[0]} dari={X_KIRI - 200} ke={X_KANAN + 200} nyala={0.35} />
          <Simpul x={760} y={JALUR_Y[0]} nyala={masukPolos > 0.9 ? 0.8 : 0.2} />

          {/* --- rumah dan komputer di TITIK YANG SAMA --- */}
          {RUMAH_X.map((x, i) => (
            <g key={x} opacity={berdiri}>
              <g opacity={1 - jadiKomputer}>
                <Rumah x={x} y={Y_LANTAI} nomor={NOMOR[i] ?? ""} skala={0.86} nyala={nyala(i)} />
              </g>
              <g opacity={jadiKomputer}>
                <Desktop x={x} y={Y_LANTAI} skala={0.74} />
                <text
                  x={x}
                  y={Y_LANTAI - 218}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize={i === 1 ? 26 : 20}
                  fontWeight={i === 1 ? 700 : 400}
                  fill={i === 1 ? "var(--ink-0)" : "var(--ink-2)"}
                >
                  {ALAMAT[i]}
                </text>
              </g>
            </g>
          ))}

          {/* --- potongan yang mencocokkan, lalu turun ke yang tengah --- */}
          <Paket
            x={xCari + (RUMAH_X[1] - xCari) * turun}
            y={JALUR_Y[0] + (Y_LANTAI - 300 - JALUR_Y[0]) * turun}
            skala={0.85}
            warna={turun > 0.9 ? "ok" : "biasa"}
            opacity={t(d, { mulai: B_SETIAP + 0.3, durasi: 0.4, dari: 0, ke: 1 })}
            label={turun > 0.2 ? undefined : "192.168.1.10"}
          />

          {/* --- tahap 4: potongan yang sama, TANPA label alamat --- */}
          <g opacity={masukPolos > 0 ? padam : 0}>
            <Paket
              x={X_KIRI - 120 + (760 - (X_KIRI - 120)) * masukPolos + bingung}
              y={JALUR_Y[0]}
              skala={0.85}
              warna="hilang"
            />
            <text
              x={760}
              y={JALUR_Y[0] + 92}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={22}
              fill="var(--bad)"
              opacity={masukPolos > 0.9 ? 1 : 0}
            >
              ?
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
