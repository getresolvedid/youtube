/* T14-S1 · scene 9 · loop — tutup + loop, 5,70 dtk
   Direction: 09-loop-direction.md
   VO:        09-loop-vo.md

   LOOP-NYA VISUAL, BUKAN CUMA KALIMAT. Frame terakhir scene ini disusun semirip
   mungkin dengan frame pertama 01-dari-belakang: posisi nama, ukuran huruf,
   bilah alamat, arah masuk penanda.

   Timing masuk penandanya DIBACA dari berkas scene 1 (`MASUK_PENANDA`), bukan
   diketik ulang. Dua salinan angka yang wajib sama adalah dua angka yang akan
   berbeda dalam seminggu — dan melesetnya tidak akan terlihat sebagai error,
   cuma sebagai loop yang terasa "hampir".

   Tidak merangkum. "Jadi intinya…" akan memberi tahu penonton bahwa videonya
   selesai — dan bagian yang selesai adalah tempat orang merasa boleh berhenti.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Kartu, Komputer, Loket, NOMOR_BARU, Sosok } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  BilahAlamat,
  I_PEMILIK_S,
  KARTU_NOMOR,
  laciLoketS,
  mundurKamera,
  NamaSitusS,
  PenandaS,
  posLoketS,
  SOSOK_PEMILIK,
  VIEWBOX,
  X_PENANDA_LUAR,
  xPotonganS,
} from "../tangga-tegak";
import { MASUK_PENANDA } from "./01-dari-belakang";
import { beat } from "./timing.gen";

const ID = "loop";

const B_KETIK = beat(ID, 0); // "Jadi lain kali kamu mengetik nama."
const B_KANAN = beat(ID, 1); // "Yang dibaca duluan titik paling kanannya."

const P0 = posLoketS(0);
const P3 = posLoketS(I_PEMILIK_S);
const pLaci = laciLoketS(I_PEMILIK_S);

export const Loop: React.FC = () => {
  const d = useDetik();

  const padam = t(d, { mulai: B_KETIK, durasi: 0.4, dari: 1, ke: 0 });
  const kembali = t(d, { mulai: B_KETIK + 0.2, durasi: 0.45, dari: 0, ke: 1 });

  /* Gerakan yang sama persis dengan scene 1, cuma digeser ke beat 1. */
  const masukPen = t(d, {
    mulai: B_KANAN + MASUK_PENANDA.mulai,
    durasi: MASUK_PENANDA.durasi,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const xPen = X_PENANDA_LUAR + (xPotonganS(2) - X_PENANDA_LUAR) * masukPen;

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_KANAN
          ? "Lain kali kamu mengetik nama…"
          : "…yang dibaca duluan paling kanan."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        {/* tangga scene 8 memudar keluar, masih di posisi kamera mundurnya */}
        <g transform={mundurKamera(1)} opacity={padam}>
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

        {/* dan kembali ke frame pertama — tanpa skala, tanpa pecah, tanpa sorot */}
        <g opacity={kembali}>
          <BilahAlamat />
          <NamaSitusS />
        </g>
        <PenandaS x={xPen} opacity={masukPen} />

        {/* CTA tidak diucapkan; ia cuma ada di layar (docs/02 § Aturan Shorts) */}
        <g style={masuk(d, { mulai: B_KANAN + 0.8, durasi: 0.4, geser: 16 })}>
          <text
            x={540}
            y={1380}
            fontSize={34}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill="var(--ink-2)"
            textAnchor="middle"
          >
            versi lengkapnya di video panjang
          </text>
        </g>
      </svg>
    </Scene>
  );
};
