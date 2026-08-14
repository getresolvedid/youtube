/* T14-S2 · scene 3 · tanya-dulu — undangan + panggung berdiri, 7,46 dtk
   Direction: 03-tanya-dulu-direction.md
   VO:        03-tanya-dulu-vo.md

   SCENE YANG MENDIRIKAN PANGGUNG. Enam scene sesudahnya memakai lantai, sosok,
   dan loket yang sama persis — koordinatnya di ../jalur-tanya.tsx, tidak diketik
   ulang di mana pun. Undangannya cuma jatuh di sini (HARD RULE 6).

   LOKETNYA DI POJOK KIRI, DI BELAKANG SOSOKNYA. Seluruh Short bertumpu pada
   loket yang ditanya sebelum berangkat lalu ditinggalkan; loket yang berdiri di
   tengah jalur akan dilewati sosoknya di scene 4, dan gambar itu mengatakan
   persis kebalikan dari kalimatnya.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Bangunan, Kartu, LOKET, Loket, NOMOR_LAMA, Sosok } from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  SKALA_LOKET_S2,
  SKALA_SOSOK_S2,
  SKALA_TUJUAN_S2,
  VIEWBOX_S2,
  X_LOKET_S2,
  X_SOSOK_S2,
  X_TUJUAN_S2,
  Y_LANTAI_S2,
} from "../jalur-tanya";
import { beat } from "./timing.gen";

const ID = "tanya-dulu";

const B_BERANGKAT = beat(ID, 0); // "Coba bayangkan sebelum berangkat ke sebuah tempat."
const B_TANYA = beat(ID, 1); // "Kamu tanya alamatnya dulu ke loket di pojok jalan."

/** Jendela loket — tempat kartu masuk dan keluar. Dihitung dari `LOKET`, bukan
 *  diketik: kalau bentuk loketnya berubah, titik ini ikut. */
const Y_JENDELA =
  Y_LANTAI_S2 + (LOKET.jendela.y + LOKET.jendela.h / 2) * SKALA_LOKET_S2;
const Y_KARTU = Y_JENDELA;

export const TanyaDulu: React.FC = () => {
  const d = useDetik();

  const lantai = gambarGaris(d, 900, { mulai: B_BERANGKAT, durasi: 0.5 });

  const naikLoket = t(d, {
    mulai: B_TANYA,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });

  const pergi = t(d, {
    mulai: B_TANYA + 0.5,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.sineInOut,
  });
  const pulang = t(d, {
    mulai: B_TANYA + 1.45,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_TANYA ? "Sebelum berangkat…" : "…kamu tanya alamatnya dulu."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <path
          d={`M90 ${Y_LANTAI_S2}H990`}
          stroke="var(--line)"
          strokeWidth={5}
          strokeLinecap="round"
          {...lantai}
        />

        <g style={masuk(d, { mulai: B_BERANGKAT + 0.15, durasi: 0.5, geser: 28 })}>
          <Sosok x={X_SOSOK_S2} y={Y_LANTAI_S2} skala={SKALA_SOSOK_S2} />
        </g>
        <g style={masuk(d, { mulai: B_BERANGKAT + 0.27, durasi: 0.5, geser: 28 })}>
          <Bangunan
            x={X_TUJUAN_S2}
            y={Y_LANTAI_S2}
            skala={SKALA_TUJUAN_S2}
            papan={0}
          />
        </g>

        <g opacity={naikLoket} transform={`translate(0 ${60 * (1 - naikLoket)})`}>
          <Loket
            x={X_LOKET_S2}
            y={Y_LANTAI_S2}
            skala={SKALA_LOKET_S2}
            nyala={1}
          />
        </g>

        {/* kartu tanya: sosok -> jendela, memudar tepat di titik masuknya */}
        {pergi > 0 && pergi < 1 && (
          <Kartu
            x={X_SOSOK_S2 + (X_LOKET_S2 - X_SOSOK_S2) * pergi}
            y={Y_KARTU}
            teks="?"
            skala={0.45}
            opacity={1 - Math.max(0, (pergi - 0.75) / 0.25)}
          />
        )}

        {/* kartu nomor: jendela -> sosok */}
        {pulang > 0 && (
          <Kartu
            x={X_LOKET_S2 + (X_SOSOK_S2 - X_LOKET_S2) * pulang}
            y={Y_KARTU}
            teks={NOMOR_LAMA}
            skala={0.45}
            opacity={Math.min(1, pulang / 0.25)}
          />
        )}
      </svg>
    </Scene>
  );
};
