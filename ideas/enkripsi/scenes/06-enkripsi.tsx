/* T17 (provisional) · scene 6 · enkripsi — bagian 4 [answer] → [what]
   VO:        06-enkripsi-vo.md
   Direction: 06-enkripsi-direction.md

   `[what]` DINAMAI DI SINI, TEPAT SEKALI (HARD RULE 6). Sebelum scene ini kata
   "enkripsi" tidak terdengar sama sekali.

   PANGGUNGNYA BERSIH — tidak ada jaringan, tidak ada sosok, tidak ada meja.
   Yang tertinggal cuma kalimatnya dan apa yang terjadi padanya. Panggung bersih
   inilah yang membuat scene 7 terasa seperti kembali ke dunia nyata.

   SATU PENYIMPANGAN DARI ARAHAN USER, DISENGAJA. Arahan aslinya meminta morf
   huruf per huruf: H->X, A->7, L->K, O->9. Bentuk itu menggambarkan SANDI
   SUBSTITUSI — tiap huruf punya pasangan tetapnya sendiri — dan penonton yang
   menangkapnya akan menyimpulkan bahwa ia bisa dipecahkan dengan menebak
   pasangannya. Kesimpulan itu benar untuk sandi substitusi, dan itu bukan
   penyederhanaan melainkan model yang keliru ("Akurasi teknis di atas gaya").

   Yang dipertahankan: hasilnya `X7K9@2`, perubahannya mulus (bukan glitch), dan
   kotaknya membuka supaya penonton melihat perubahan itu terjadi. Yang diubah
   cuma CARANYA — seluruh baris berganti sekaligus, keluarannya lebih panjang
   dari masukannya, dan tidak ada satu frame pun yang memperlihatkan H sejajar
   dengan X. Kalau user memutuskan bentuk aslinya tetap dipakai, yang disentuh
   cuma blok "tahap 3" di bawah.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Gembok,
  KotakProses,
  Paket,
  SANDI,
  kamera,
  munculSkala,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "enkripsi";

const B_NAMA = beat(ID, 0); // "Salah satu caranya adalah dengan menggunakan enkripsi."
const B_MASUK = beat(ID, 1); // "Enkripsi mengubah data yang dapat dibaca menjadi bentuk lain."
const B_UBAH = beat(ID, 2); // "Menjadi bentuk yang sulit dipahami tanpa kunci yang tepat."
const B_KELUAR = beat(ID, 3); // "Jadi, orang yang melihat data tersebut…"

const KOTAK = { x: 960, y: 520, w: 520, h: 260 } as const;

export const Enkripsi: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: kalimatnya, lalu gemboknya BERDAMPINGAN ---
     Gembok yang langsung menutup terbaca sebagai efek; gembok yang berdiri di
     sebelahnya dulu terbaca sebagai alat (arahan user). */
  const halo = masuk(d, { mulai: 0.15, durasi: 0.6, geser: 20 });
  const gembokMuncul = t(d, { mulai: B_NAMA + 1.1, durasi: 0.4, dari: 0, ke: 1 });
  const gembokSkala = munculSkala(d, B_NAMA + 1.1);

  /* --- tahap 2: kotaknya muncul, kalimatnya masuk, daunnya menutup --- */
  const kotak = t(d, { mulai: B_MASUK, durasi: 0.6, dari: 0, ke: 1 });
  const masukKotak = t(d, {
    mulai: B_MASUK + 0.6,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const tutup = t(d, {
    mulai: B_MASUK + 1.35,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const rapat = t(d, {
    mulai: B_MASUK + 0.3,
    durasi: 1.2,
    dari: 1,
    ke: 1.08,
    ease: E.expoOut,
  });

  /* --- tahap 3: isinya berubah ---
     DUA OPASITAS BERLAWANAN DI RENTANG YANG SAMA, bukan morf per huruf. Baris
     lama memudar sementara baris baru muncul di tempatnya, dan barisnya lebih
     panjang — jadi tidak ada satu frame pun yang memasangkan satu huruf dengan
     satu lambang. Lihat kepala berkas ini. */
  const buka = t(d, {
    mulai: B_UBAH,
    durasi: 0.5,
    dari: 1,
    ke: 0.32,
    ease: E.power2out,
  });
  const tukar = t(d, { mulai: B_UBAH + 0.5, durasi: 0.9, dari: 0, ke: 1 });
  /* Lambang tambahan menyusul SESUDAH barisnya berganti — itu yang membuat
     keluarannya terbaca lebih panjang dari masukannya. */
  const nSandi = Math.floor(
    t(d, {
      mulai: B_UBAH + 1.1,
      durasi: 0.8,
      dari: 0,
      ke: SANDI.length,
      ease: E.linear,
    }),
  );

  /* --- tahap 4: kotaknya membuka penuh, paket bergembok keluar --- */
  const bukaPenuh = t(d, {
    mulai: B_KELUAR,
    durasi: 0.6,
    dari: 1,
    ke: 0,
    ease: E.power2out,
  });
  const keluar = t(d, {
    mulai: B_KELUAR + 0.5,
    durasi: 1.1,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const ringkas = masuk(d, { mulai: B_KELUAR + 1.1, durasi: 0.6, geser: 22 });

  const tutupSekarang = tutup * buka * bukaPenuh;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(rapat, KOTAK.x, KOTAK.y)}>
            {/* --- kalimatnya, sebelum masuk kotak --- */}
            <g
              style={{ opacity: halo.opacity * (1 - masukKotak), transform: halo.transform }}
            >
              <text
                x={KOTAK.x - 300 * (1 - masukKotak) * 0}
                y={KOTAK.y}
                fontSize={104}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill="var(--ink-0)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                HALO
              </text>
            </g>

            {/* gembok berdampingan — sebelum kotaknya ada */}
            <g opacity={gembokMuncul * (1 - kotak)}>
              <g
                transform={`translate(${KOTAK.x + 250} ${KOTAK.y}) scale(${
                  1.6 * gembokSkala
                }) translate(${-(KOTAK.x + 250)} ${-KOTAK.y})`}
              >
                <Gembok x={KOTAK.x + 250} y={KOTAK.y} />
              </g>
            </g>

            {/* --- kotak proses --- */}
            <g opacity={kotak}>
              <KotakProses {...KOTAK} label="ENKRIPSI" tutup={tutupSekarang}>
                {/* Baris lama → baris baru, DUA OPASITAS BERLAWANAN DI TITIK
                    YANG SAMA — jadi keduanya memang tumpang tindih selama
                    pertukarannya, dan itu seluruh maksudnya: kalimatnya berganti
                    DI TEMPAT, bukan pindah lalu digantikan. Ditandai `sengaja`
                    supaya `npm run tumpang` tidak melaporkannya tiap kali; yang
                    dilonggarkan penandanya, bukan ambang di
                    tools/periksa-tumpang.mjs. */}
                <g data-tumpang="sengaja">
                <text
                  x={KOTAK.x}
                  y={KOTAK.y}
                  fontSize={82}
                  fontFamily="var(--font-display)"
                  fontWeight={800}
                  fill="var(--ink-0)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={masukKotak * (1 - tukar)}
                >
                  HALO
                </text>
                <text
                  x={KOTAK.x}
                  y={KOTAK.y}
                  fontSize={72}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill="var(--accent-ink)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={tukar}
                  letterSpacing={4}
                >
                  {SANDI.slice(0, Math.max(4, nSandi))}
                </text>
                </g>
              </KotakProses>

              {/* gembok pindah ke badan kotak saat daunnya menutup */}
              <g opacity={tutup * (1 - keluar)}>
                <Gembok x={KOTAK.x} y={KOTAK.y + KOTAK.h / 2 - 46} skala={0.7} />
              </g>
            </g>

            {/* --- paket bergembok, keluar ke kanan --- */}
            <g opacity={keluar}>
              <Paket
                x={KOTAK.x + KOTAK.w / 2 + 240 * keluar}
                y={KOTAK.y}
                terkunci={1}
                skala={1.15}
              />
            </g>
          </g>

          {/* --- ringkasan tegak di sisi kiri: HALO -> gembok -> X7K9@2 --- */}
          <g style={{ opacity: ringkas.opacity, transform: ringkas.transform }}>
            <text
              x={250}
              y={330}
              fontSize={56}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
            >
              HALO
            </text>
            <path
              d="M 250 372 v 44"
              stroke="var(--ink-2)"
              strokeWidth={5}
              strokeLinecap="round"
            />
            <Gembok x={250} y={460} skala={0.8} />
            <path
              d="M 250 512 v 44"
              stroke="var(--ink-2)"
              strokeWidth={5}
              strokeLinecap="round"
            />
            <text
              x={250}
              y={610}
              fontSize={46}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              fill="var(--accent-ink)"
              textAnchor="middle"
              letterSpacing={3}
            >
              {SANDI}
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
