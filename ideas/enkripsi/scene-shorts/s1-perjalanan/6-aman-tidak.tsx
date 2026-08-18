/* T17-S1 · scene 6 · aman-tidak — tutup + jembatan ke Short 2
   VO:        6-aman-tidak-vo.md
   Direction: 6-aman-tidak-direction.md

   URUTANNYA MENGIKAT DAN TIDAK BOLEH DITUKAR: puas dulu, baru gelisah. Penonton
   harus sempat merasa ceritanya selesai sebelum sesuatu membatalkannya — jadi
   kamera mundur dan panggungnya diam LEBIH DULU, baru sosoknya muncul.

   YANG MENGAMATI TIDAK DIJELASKAN (arahan user). Tanpa nama, tanpa wajah, tanpa
   warna bahaya, dan `--bad` tidak dipakai sama sekali. Yang bekerja justru
   ketidakjelasannya.

   Tidak ada gembok, kunci, atau kata "enkripsi" di Short 1 — sama sekali.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, Sosok } from "../../panggung-kiriman";
import {
  HP_PENERIMA,
  HP_PENGIRIM,
  JaringanTegak,
  PENGAMAT,
  TeksLayar,
  W,
  kamera,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "aman-tidak";
const B_TANYA = beat(ID, 0);

export const AmanTidak: React.FC = () => {
  const d = useDetik();

  /* Seluruh jalur harus muat sekaligus, dan di 9:16 itu berarti MENGECIL —
     bukan menggeser. */
  const mundur = t(d, {
    mulai: 0,
    durasi: 1.2,
    dari: 1,
    ke: 0.82,
    ease: E.expoOut,
  });

  /* Opasitas SAJA, tanpa geser: dia tidak sedang datang, dia sudah di situ
     sejak tadi — kita yang baru cukup mundur untuk melihatnya. */
  const hadir = t(d, { mulai: 1.3, durasi: 0.9, dari: 0, ke: 0.55 });

  /* Jeda sebelum pertanyaannya dibayar GAMBAR, bukan tanda baca di naskah. */
  const tanya = masuk(d, { mulai: B_TANYA + 1.9, durasi: 0.6, geser: 26 });
  const cta = t(d, { mulai: B_TANYA + 2.6, durasi: 0.5, dari: 0, ke: 0.75 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Titik tumpunya DI BAWAH tengah frame, bukan di tengah. Mengecil ke arah
              tengah menarik HP pengirim naik sampai ia menabrak teks pertanyaannya
              (ketahuan dari render still); bertumpu lebih rendah, sepertiga atas
              tetap kosong untuk teksnya. */}
          <g transform={kamera(mundur, W / 2, 1250)}>
            <JaringanTegak luas={1} />

            <Hp {...HP_PENGIRIM} nyala={0.5} />
            <Hp {...HP_PENERIMA} nyala={0.5} />

            {/* Di SAMPING jalur, bukan di atasnya — di jalur ia terbaca sebagai
                bagian dari jalannya, sesuatu yang memang harus dilewati. */}
            <Sosok x={PENGAMAT.x} y={PENGAMAT.alas} skala={0.62} opacity={hadir} />
          </g>

          <TeksLayar
            baris={["APAKAH DATA KITA", "AMAN?"]}
            y={150}
            opacity={tanya.opacity}
            transform={tanya.transform}
          />

          {/* CTA kecil, dan ia BONUS — bukan syarat paham (docs/02 § SERIAL).
              Short ini harus utuh bagi penonton yang berhenti di sini. */}
          <text
            x={W / 2}
            y={1745}
            fontSize={34}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill="var(--ink-1)"
            textAnchor="middle"
            letterSpacing={2}
            opacity={cta}
          >
            Lanjut ke Short 2
          </text>
        </svg>
      </div>
    </Scene>
  );
};
