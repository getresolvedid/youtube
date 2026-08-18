/* T18-S3 · scene 1 · lima-potongan — hook
   VO:        1-lima-potongan-vo.md
   Direction: 1-lima-potongan-direction.md

   DUA KEPUTUSAN:

   1. Lima slot di bawah sudah tergambar sejak frame nol. Slot yang muncul
      belakangan akan mencuri perhatian dari yang akan hilang; slot yang sudah
      berdiri membuat lubangnya terbaca sendiri di scene 2, tanpa ditunjuk.

   2. Tidak ada simpul yang menyala di sini. Simpul yang berkedip menarik mata
      ke jalur, padahal yang harus dihafal penonton adalah kelima nomornya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Paket } from "../../panggung-jaringan";
import {
  JALUR_UTAMA,
  JaringanTegak,
  N_SLOT,
  SlotKosong,
  TeksLayar,
  W,
  Y_ATAS,
  Y_SLOT,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "lima-potongan";
const B_LIMA = beat(ID, 0); // "Sekarang bayangkan kamu mengirim lima bagian data."

const N = N_SLOT;

/** Titik berangkat potongan TERDEPAN (nomor 1, paling bawah).
 *
 *  KELIMANYA SUDAH DI DALAM FRAME DI FRAME NOL, seluruhnya di bawah zona teks
 *  layar. Versi pertama menaruh keretanya di atas layar lalu menurunkannya, dan
 *  tiap potongan menyeberangi baris teks dalam perjalanannya — `npm run tumpang`
 *  melaporkannya, dan menggeser teksnya tidak menolong karena yang menyeberang
 *  lima benda berturut-turut selama dua detik penuh.
 *
 *  Kebetulan ini juga lebih setia ke direction-nya: "sudah dalam perjalanan
 *  sejak frame nol" lebih terbaca kalau kelimanya memang sudah terlihat. */
const Y_DEPAN = 1000;

/** Jarak antar-potongan di keretanya.
 *
 *  140, dan itu batas atas — bukan selera. Dengan 180, potongan PALING BELAKANG
 *  (nomor 5) berdiri di 280 px dan mengiris baris teks layar di frame nol.
 *  Kereta lima gerbong harus muat seluruhnya antara teks dan barisan slot;
 *  140 x 4 = 560, jadi yang paling belakang mendarat di 440 — bersih. */
const JARAK_GERBONG = 140;

/** Jarak tempuh, sama untuk kelimanya — bukan titik tujuan yang sama.
 *  Berhenti tepat di atas barisan slot, tidak menyentuhnya: yang mengisi slot
 *  itu pekerjaan scene 2. */
const JARAK = 180;

export const LimaPotongan: React.FC = () => {
  const d = useDetik();

  /* Jaraknya dibuat lewat TITIK BERANGKAT yang berbeda, bukan lewat penundaan.
     Dengan `mulai` berselang 0,1 dtk pada perjalanan 3,4 dtk, kelima potongan
     cuma berjarak beberapa piksel dan saling menimpa sepanjang scene —
     `npm run tumpang` melaporkannya. Titik berangkat yang berjarak tetap
     menjaga jaraknya konstan dari frame nol sampai frame terakhir. */
  const turun = t(d, { mulai: 0, durasi: 3.4, dari: 0, ke: 1, ease: E.linear });

  const teks = masuk(d, { mulai: 0.25, durasi: 0.45, geser: 20 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak jalur={[1]} luas={1} />

          {/* Slot sudah berdiri di frame nol. */}
          {Array.from({ length: N }, (_, i) => (
            <SlotKosong key={i} i={i} />
          ))}

          {Array.from({ length: N }, (_, i) => {
            /* Berjarak tetap 180 px sejak frame nol — kereta, bukan tumpukan.
               JARAK TEMPUHNYA sama untuk kelimanya, bukan titik tujuannya:
               tujuan yang sama membuat kelimanya merapat sampai berimpit di
               ujung perjalanan, cacat yang sama persis dengan scene 6 video
               panjang. */
            const yAwal = Y_DEPAN - i * JARAK_GERBONG;
            return (
              <Paket
                key={i}
                x={JALUR_UTAMA}
                y={yAwal + JARAK * turun}
                nomor={i + 1}
                skala={0.9}
              />
            );
          })}

          <g style={{ opacity: teks.opacity, transform: teks.transform }}>
            <TeksLayar baris={["Lima bagian", "dikirim."]} y={300} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
