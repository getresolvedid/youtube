/* T16 · scene 15 · dibuka-di-ujung — bagian 7 [case], 31,28 dtk
   VO:        15-dibuka-di-ujung-vo.md
   Direction: 15-dibuka-di-ujung-direction.md

   Scene paling berguna di episode ini: ia memberi penonton PERTANYAAN YANG
   HARUS IA TANYAKAN ke layanan mana pun, dan pertanyaannya bukan "terkunci atau
   tidak" melainkan "dibuka di mana".

   TAHAP 2 WAJIB MEMPERLIHATKAN ISINYA TERBACA LAGI. Sejak scene 7 penonton tidak
   pernah melihat isi kotak; kalau di sini tidak dibuka, "dibuka di ujung" cuma
   jadi kalimat.

   LABEL YANG SAMA DI TAHAP 7 ADALAH SELURUH ISI SCENE INI. Kalau salah satu
   jalur diberi tanda buruk, penonton pulang dengan kesimpulan yang salah —
   kesimpulan yang benar justru bahwa keduanya berhak memakai kata itu.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  Bangunan,
  Jalan,
  Kotak,
  Meja,
  N_TANGAN,
  Tangan,
  X_ANTARA,
  X_KIRIM,
  X_TERIMA,
  Y_JALAN,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "dibuka-di-ujung";

const B_TITIK = beat(ID, 0); // "Dan isinya sendiri cuma tertutup sampai satu titik."
const B_SELALU = beat(ID, 1); // "Kotak selalu dibuka di suatu tempat."
const B_DIMANA = beat(ID, 2); // "…Pertanyaannya, dibuka di mana."
const B_RUMAH = beat(ID, 3); // "Ada yang cuma terbuka di rumah orang yang kamu kirimi."
const B_NAMA = beat(ID, 4); // "Itu namanya ujung ke ujung."
const B_ANTARA = beat(ID, 5); // "Ada yang dibuka di ruang antara…"
const B_DUADUANYA = beat(ID, 6); // "Dua-duanya boleh menyebut diri terkunci."

/** Dua jalur yang disandingkan — atas dan bawah garis jalan aslinya. */
/** Rumah di ujung digeser ke KANAN dari titik henti kotak: keduanya di titik
 *  yang sama membuat kotaknya menutupi rumahnya, dan yang terbaca cuma satu
 *  benda aneh. */
const X_RUMAH = X_TERIMA + 150;
const X_HENTI = X_TERIMA - 60;

const DY_ATAS = -190;
const DY_BAWAH = 190;

export const DibukaDiUjung: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 2: kotak berjalan, lalu terbuka di ujung --- */
  const maju = t(d, { mulai: B_TITIK, durasi: B_SELALU - B_TITIK + 0.8, dari: 0, ke: 1, ease: E.linear });
  const xKotak = 900 + (X_TERIMA - 900) * maju;
  const bukaUjung = t(d, { mulai: B_SELALU + 0.9, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 3: jalan digambar bersih, penanda belum mendarat --- */
  const bersih = t(d, { mulai: B_DIMANA, durasi: 0.6, dari: 0, ke: 1 });
  const penanda = masuk(d, { mulai: B_DIMANA + 0.5, durasi: 0.5, geser: 22 });

  /* --- tahap 4 & 6: dua jalur dipisahkan ke atas dan ke bawah --- */
  const pisah = t(d, { mulai: B_RUMAH, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const jalurAtas = t(d, { mulai: B_RUMAH + 0.5, durasi: 2.2, dari: 0, ke: 1, ease: E.linear });
  const bukaRumah = t(d, { mulai: B_RUMAH + 2.6, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  const nama = masuk(d, { mulai: B_NAMA + 0.12, durasi: 0.5, geser: 24 });

  const jalurBawah1 = t(d, { mulai: B_ANTARA, durasi: 1.2, dari: 0, ke: 1, ease: E.linear });
  const bukaAntara = t(d, { mulai: B_ANTARA + 1.2, durasi: 0.45, dari: 0, ke: 1, ease: E.power2out });
  const tutupAntara = t(d, { mulai: B_ANTARA + 2.0, durasi: 0.4, dari: 0, ke: 1, ease: E.power2in });
  const jalurBawah2 = t(d, { mulai: B_ANTARA + 2.4, durasi: 1.4, dari: 0, ke: 1, ease: E.linear });

  const labelKembar = t(d, { mulai: B_DUADUANYA + 0.2, durasi: 0.5, dari: 0, ke: 1 });

  const xAtas = X_KIRIM + (X_HENTI - X_KIRIM) * jalurAtas;
  const xBawah =
    X_KIRIM +
    (X_ANTARA - X_KIRIM) * jalurBawah1 +
    (X_HENTI - X_ANTARA) * jalurBawah2;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala: 1 - 0.14 * pisah })}>
            {/* panggung asli — menyingkir begitu dua jalur berdiri */}
            <g opacity={1 - pisah}>
              <Jalan />
              <Meja x={X_KIRIM} />
              <Meja x={X_TERIMA} />
              {Array.from({ length: N_TANGAN }, (_, i) => (
                <Tangan key={i} x={posTangan(i)} nyala={Math.abs(xKotak - posTangan(i)) < 110 ? 1 : 0} />
              ))}
              <Kotak x={xKotak} y={Y_JALAN} gembok={1 - bukaUjung} buka={bukaUjung} label={1} />
              <g style={{ opacity: penanda.opacity * bersih, transform: penanda.transform }}>
                <text
                  x={960}
                  y={Y_JALAN - 300}
                  fontSize={96}
                  fontFamily="var(--font-display)"
                  fontWeight={800}
                  fill={AKSEN}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  ?
                </text>
              </g>
            </g>

            {/* --- jalur pertama: baru terbuka di rumah paling ujung --- */}
            <g opacity={pisah} transform={`translate(0 ${DY_ATAS * pisah})`}>
              <Jalan />
              {Array.from({ length: N_TANGAN }, (_, i) => (
                <Tangan key={i} x={posTangan(i)} skala={0.7} />
              ))}
              <Bangunan x={X_ANTARA} y={Y_JALAN} skala={0.62} />
              <Bangunan x={X_RUMAH} y={Y_JALAN} skala={0.62} rumah />
              <Kotak
                x={xAtas}
                y={Y_JALAN}
                skala={0.62}
                gembok={1 - bukaRumah}
                buka={bukaRumah}
                label={labelKembar}
              />
              <g style={{ opacity: nama.opacity, transform: nama.transform }}>
                <text
                  x={960}
                  y={Y_JALAN + 120}
                  fontSize={52}
                  fontFamily="var(--font-display)"
                  fontWeight={800}
                  fill={AKSEN}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  ujung ke ujung
                </text>
              </g>
            </g>

            {/* --- jalur kedua: dibuka di ruang antara, lalu dikunci lagi --- */}
            <g
              opacity={t(d, { mulai: B_ANTARA - 0.4, durasi: 0.5, dari: 0, ke: 1 })}
              transform={`translate(0 ${DY_BAWAH * pisah})`}
            >
              <Jalan />
              {Array.from({ length: N_TANGAN }, (_, i) => (
                <Tangan key={i} x={posTangan(i)} skala={0.7} />
              ))}
              <Bangunan x={X_ANTARA} y={Y_JALAN} skala={0.62} nyala={bukaAntara - tutupAntara} />
              <Bangunan x={X_RUMAH} y={Y_JALAN} skala={0.62} rumah />
              <Kotak
                x={xBawah}
                y={Y_JALAN}
                skala={0.62}
                gembok={1 - (bukaAntara - tutupAntara)}
                buka={bukaAntara - tutupAntara}
                label={labelKembar}
              />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
