/* T15 · scene 14 · pintu-dibuka-sendiri — bagian 7 [case], 28,63 dtk
   VO:        14-pintu-dibuka-sendiri-vo.md
   Direction: 14-pintu-dibuka-sendiri-direction.md

   Bagian 7 dibuka dengan memulangkan panggung ke gedung tunggal: kamera maju
   lagi dari komplek di scene 13, kebalikan persis dari gerakan di sana.

   TIGA KEPUTUSAN:

   1. Pintu yang dibuka adalah salah satu dari `PINTU_HIDUP` (`I_PINTU_DIBUKA`),
      bukan pintu baru. Yang berubah di bagian 7 adalah siapa yang boleh
      mengetuknya, bukan jumlah pintunya.

   2. Tidak ada yang jebol dan tidak ada tanda bahaya. Yang berubah cuma siapa
      saja yang sekarang boleh mencoba — menggambar kebobolan mengubah scene ini
      jadi ancaman, dan ancaman membuat orang menutup video.

   3. Sosok di tahap 4 TANPA topi. Ia bukan penjaga, dan bedanya harus terlihat
      sekilas — itu sebabnya topi beraksen dipatok sejak scene 6.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  ABU,
  Daftar,
  GEDUNG,
  Gedung,
  I_PINTU_DIBUKA,
  Ketukan,
  Lantai,
  N_PINTU,
  PINTU_HIDUP,
  P_DAFTAR,
  SKALA_DAFTAR_SISI,
  Penjaga,
  Peretas,
  Sosok,
  X_GEDUNG,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
  kamera,
  posPintu,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "pintu-dibuka-sendiri";

const B_MENURUTI = beat(ID, 0); // "Dan penjaga yang mana pun tetap menuruti satu orang."
const B_KAMU = beat(ID, 1); // "Kamu."
const B_KAMERA = beat(ID, 2); // "Kamera rumah, biar bisa dilihat dari kantor."
const B_TEMAN = beat(ID, 3); // "Atau satu pintu dibuka biar teman bisa ikut main."
const B_TUNJUK = beat(ID, 4); // "Kamu tunjuk pintunya, dan tamunya diantar ke sana."
const B_MENURUT = beat(ID, 5); // "Penjaganya menurut…"
const B_SEMUA = beat(ID, 6); // "Tapi pintu itu sekarang terbuka buat semua orang."
const B_BUKAN = beat(ID, 7); // "Bukan cuma buat temanmu."
const B_RAJIN = beat(ID, 8); // "Dan yang paling rajin mengetuk di situ bukan temanmu."

const X_DINDING = X_GEDUNG - GEDUNG.w / 2;
const P_BUKA = posPintu(I_PINTU_DIBUKA);

const hidup = (i: number) => PINTU_HIDUP.includes(i as (typeof PINTU_HIDUP)[number]);

/** Ketukan tahap 8 dan 9: tundaannya MENGECIL, jadi kerapatannya naik tanpa
 *  satu pun nilai acak. */
const RAPAT = [0, 0.5, 0.92, 1.26, 1.54, 1.78, 1.98, 2.16, 2.32, 2.46, 2.58, 2.68] as const;

export const PintuDibukaSendiri: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: kamera maju lagi, kebalikan scene 13 --- */
  /* Mulai dari 0,68 — skala tempat `13-banyak-penjaga` berhenti. Kalau kedua
     angka ini berbeda, potongan kerasnya terbaca sebagai lompatan ukuran. */
  const maju = t(d, { mulai: B_MENURUTI, durasi: 1.2, dari: 0.68, ke: 1, ease: E.expoOut });

  /* --- tahap 2: penjaga menoleh keluar frame --- */
  const noleh = t(d, { mulai: B_KAMU, durasi: 0.5, dari: 0, ke: -12 });

  /* --- tahap 3: kamera kecil menyala di dalam gedung --- */
  const kamRumah = t(d, { mulai: B_KAMERA, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 4: sosok di gedung seberang, tanpa topi --- */
  const teman = t(d, { mulai: B_TEMAN, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 5: satu baris baru ditulis, pintunya terbuka dan TETAP terbuka --- */
  const tulis = gambarGaris(d, 150, { mulai: B_TUNJUK + 0.2, durasi: 0.8 });
  const daftar = t(d, { mulai: B_TUNJUK, durasi: 0.5, dari: 0, ke: 1 });
  const buka = t(d, { mulai: B_TUNJUK + 0.6, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 6: tamunya lewat --- */
  const tamu = t(d, { mulai: B_MENURUT, durasi: 1.5, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 7: kamera mundur sedikit, pintunya terlihat dari seluruh arah --- */
  const luas = t(d, { mulai: B_SEMUA, durasi: 1.0, dari: 0, ke: 1, ease: E.expoOut });

  const pintu = Array.from({ length: N_PINTU }, (_, i) => ({
    nyala: hidup(i) ? 0.9 : 0.25,
    gembok: hidup(i) ? 0 : 0.85,
    buka: i === I_PINTU_DIBUKA ? buka : 0,
    sorot: i === I_PINTU_DIBUKA ? buka : 0,
  }));

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala: maju - 0.12 * luas })}>
            <Lantai />
            <Gedung pintu={pintu} />

            {/* --- tahap 3: kamera rumah, di dalam, terlihat lewat pintu --- */}
            <g opacity={kamRumah}>
              <rect
                x={X_GEDUNG + 150}
                y={Y_LANTAI - 470}
                width={96}
                height={58}
                rx={8}
                fill="var(--bg)"
                stroke={ABU}
                strokeWidth={5}
              />
              <circle cx={X_GEDUNG + 198} cy={Y_LANTAI - 441} r={16} fill="none" stroke="var(--accent-ink)" strokeWidth={5} />
            </g>

            {/* --- penjaga: menoleh keluar frame --- */}
            <g transform={`rotate(${noleh} ${X_PENJAGA} ${Y_LANTAI - 116})`}>
              <Penjaga x={X_PENJAGA} y={Y_LANTAI} hadap={1} />
            </g>

            {/* --- tahap 4: sosok di gedung seberang. TANPA topi. --- */}
            <g opacity={teman}>
              <rect
                x={X_LUAR - 40}
                y={Y_LANTAI - 300}
                width={230}
                height={300}
                rx={12}
                fill="var(--bg-elev)"
                stroke={ABU}
                strokeWidth={5}
                opacity={0.7}
              />
              <Sosok x={X_LUAR + 75} y={Y_LANTAI} hadap={-1} skala={0.78} />
            </g>

            {/* --- tahap 5: baris baru di daftar penjaga --- */}
            <g opacity={daftar}>
              <Daftar
                x={P_DAFTAR.x}
                y={P_DAFTAR.y}
                skala={SKALA_DAFTAR_SISI}
                baris={4}
                sorot={3}
              />
              <path
                d={`M${P_DAFTAR.x - 75} ${P_DAFTAR.y - 46}h150`}
                stroke="var(--accent-ink)"
                strokeWidth={7}
                strokeLinecap="round"
                {...tulis}
              />
            </g>

            {/* --- tahap 6: tamunya lewat pintu yang dibuka --- */}
            <Ketukan
              x={X_LUAR + 120 + (P_BUKA.x - X_LUAR - 120) * tamu}
              y={P_BUKA.y - 66}
              skala={0.72}
              opacity={tamu > 0 && tamu < 0.97 ? 1 : 0}
              warna="var(--accent-ink)"
            />

            {/* --- tahap 9: yang paling rajin mengetuk ---
                Ia berdiri di sebelah temannya, BUKAN menggantikannya: temannya
                tetap di tempat, tetap `Sosok` biasa, dan itu justru isi baris
                terakhirnya. Kalau temannya menghilang waktu ia datang, yang
                terbaca "ternyata temanmu jahat" — kebalikan persis dari
                kalimatnya.

                Ia juga tidak melakukan apa pun selain berdiri. Tahap 7–9 tidak
                menggambarkan kebobolan (lihat catatan direction): yang berubah
                cuma siapa saja yang sekarang boleh mencoba. */}
            <g data-tumpang="sengaja">
              <Peretas
                x={X_LUAR - 30}
                y={Y_LANTAI}
                skala={0.78}
                opacity={t(d, { mulai: B_RAJIN - 0.2, durasi: 0.8, dari: 0, ke: 1 })}
              />
            </g>

            {/* --- tahap 8 & 9: ketukan berdatangan ke pintu itu saja --- */}
            {RAPAT.map((tunda, i) => {
              const a = t(d, {
                mulai: B_BUKAN + tunda,
                durasi: 1.25,
                dari: 0,
                ke: 1,
                ease: E.power1out,
              });
              /* Ketinggian datang: deret tetap, bukan acak, dan semuanya
                 mengerucut ke satu pintu. */
              const yAwal = 300 + ((i * 137) % 560);
              return (
                <Ketukan
                  key={i}
                  x={X_LUAR + (P_BUKA.x - 90 - X_LUAR) * a}
                  y={yAwal + (P_BUKA.y - 66 - yAwal) * a}
                  skala={0.62}
                  opacity={a > 0 && a < 0.98 ? 1 : 0}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
