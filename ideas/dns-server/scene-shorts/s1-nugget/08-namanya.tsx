/* T14-S1 · scene 8 · namanya — tutup 2 dari 3, 3,93 dtk
   Direction: 08-namanya-direction.md
   VO:        08-namanya-vo.md

   DI SINILAH NAMANYA JATUH, dan cuma di sini — setelah loketnya berdiri,
   dipakai tiga kali, dan menyelesaikan sesuatu (HARD RULE 6).

   GAMBARNYA TIDAK BOLEH BERUBAH SAAT NAMANYA JATUH. Kalau tangganya ikut
   beranimasi, penonton membaca "ada benda baru"; yang dimaksud justru "yang
   barusan kamu lihat, itu namanya". Karena itu satu-satunya yang bergerak di
   scene ini adalah tiga hurufnya.

   Kamera tetap di posisi mundur scene 7 — `mundurKamera(1)`, bukan angka yang
   diketik ulang.
*/
import type React from "react";

import { E, masuk, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kartu, Komputer, Loket, NOMOR_BARU, Sosok } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  I_PEMILIK_S,
  KARTU_NOMOR,
  laciLoketS,
  mundurKamera,
  posLoketS,
  SOSOK_PEMILIK,
  VIEWBOX,
} from "../tangga-tegak";

const P0 = posLoketS(0);
const P3 = posLoketS(I_PEMILIK_S);
const pLaci = laciLoketS(I_PEMILIK_S);

export const Namanya: React.FC = () => {
  const d = useDetik();

  return (
    <Scene tengah={false}>
      <TeksAtas>Susunan ini namanya DNS.</TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <g transform={mundurKamera(1)}>
          <Komputer x={P0.x} y={P0.y} skala={P0.skala} />
          {[1, 2, 3].map((i) => {
            const p = posLoketS(i);
            const pemilik = i === I_PEMILIK_S;
            return (
              <Loket
                key={i}
                x={p.x}
                y={p.y}
                skala={p.skala}
                nyala={1}
                laci={1}
                isi={pemilik ? 1 : 0}
                aksen={pemilik}
              />
            );
          })}
          <Sosok x={SOSOK_PEMILIK.x} y={P3.y} skala={SOSOK_PEMILIK.skala} />
          <path
            d={`M${pLaci.x + 90 * P3.skala} ${pLaci.y}H${KARTU_NOMOR.x - 100}`}
            stroke="var(--accent-ink)"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.5}
          />
          <Kartu
            x={KARTU_NOMOR.x}
            y={pLaci.y}
            teks={NOMOR_BARU}
            skala={KARTU_NOMOR.skala}
          />
        </g>

        {/* Satu-satunya yang bergerak. Ruang ini memang kosong sejak nama situs
            padam di scene 7 — kalau ukurannya diubah, periksa ulang jaraknya ke
            atap loket teratas. */}
        {/* `masuk()` tidak menerima ease — gerak masuknya baku untuk seluruh repo
            (shared/anim.ts), justru supaya semua scene muncul dengan cara yang
            sama. Yang butuh lonjakan sendiri memakai `t()` + `E.backOut()`. */}
        <g style={masuk(d, { mulai: 0.2, durasi: 0.5, geser: 28 })}>
          <text
            x={700}
            y={700}
            fontSize={130}
            fontFamily="var(--font-display)"
            fontWeight={800}
            fill="var(--accent-ink)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            DNS
          </text>
        </g>
      </svg>
    </Scene>
  );
};
