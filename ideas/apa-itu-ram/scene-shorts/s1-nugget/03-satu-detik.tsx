/* T01-S1 · scene 3 · satu-detik — beat ketegangan → payoff, 8,12 dtk
   Direction: 03-satu-detik-direction.md
   VO:        03-satu-detik-vo.md

   Scene terpanjang Short ini dan satu-satunya yang MEMBANGUN panggung: empat
   scene sesudahnya cuma menyalakan apa yang berdiri di sini, dan tidak satu pun
   dari mereka menggambar ulang tempatnya.

   ANGKA ASLINYA SENGAJA TIDAK PERNAH LENGKAP. Yang melintas adalah "0,00000000…"
   tanpa satuan dan tanpa ujung — bukan sebuah nilai. Menuliskan angka yang utuh
   di sini akan mengklaim sesuatu yang baris ⚠ di naskah.md § Sumber belum bisa
   menopang, dan tahap ini justru bekerja karena angkanya TIDAK terbaca sebagai
   informasi.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Chip,
  Jam,
  TeksAtas,
  TigaTempat,
  X_KOLOM,
  Y_CHIP,
} from "../tiga-tempat";
import { beat } from "./timing.gen";

const ID = "satu-detik";

const T_ANGKA = beat(ID, 0);
const T_BERDIRI = beat(ID, 1);

/** Ketiga tempat masuk berurutan dari atas ke bawah — jaraknya harus terbaca
 *  sebagai perjalanan turun. Masuk bersamaan = tiga benda, bukan tiga jarak. */
const JEDA_TEMPAT = 0.18;

export const SatuDetik: React.FC = () => {
  const d = useDetik();

  /** Angka yang tak terbaca: naik sambil mengecil, selesai dalam 0,45 dtk. */
  const angkaNaik = t(d, {
    mulai: T_ANGKA + 0.15,
    durasi: 0.45,
    dari: 0,
    ke: 1,
    ease: E.power2in,
  });

  const mTempat = (i: number) =>
    t(d, {
      mulai: T_BERDIRI + i * JEDA_TEMPAT,
      durasi: 0.45,
      dari: 0,
      ke: 1,
      ease: E.expoOut,
    });

  /* Garis penghubung baru digambar setelah tempat ketiga mendarat — ia jaraknya,
     dan jarak belum ada sebelum kedua ujungnya berdiri. */
  const garis = t(d, {
    mulai: T_BERDIRI + 2 * JEDA_TEMPAT + 0.3,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  const mJam = t(d, {
    mulai: T_BERDIRI + 0.9,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.backOut(1.4),
  });

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        {d < T_BERDIRI ? "angkanya terlalu kecil" : "kita besarkan"}
      </TeksAtas>

      {/* angka yang tidak boleh sempat dibaca — tanpa satuan, tanpa ujung */}
      <p
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: Y_CHIP + 40,
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: 72,
          color: "var(--ink-1)",
          opacity: (1 - angkaNaik) * t(d, { mulai: T_ANGKA, durasi: 0.15, dari: 0, ke: 1 }),
          transform: `translateY(${-260 * angkaNaik}px) scale(${1 - 0.8 * angkaNaik})`,
        }}
      >
        0,00000000…
      </p>

      <Chip redup />

      <TigaTempat
        m={mTempat}
        garis={garis}
        terang={() => false}
      />

      <Jam sudut={0} opacity={mJam} skala={0.8 + 0.2 * mJam} />
    </Scene>
  );
};
