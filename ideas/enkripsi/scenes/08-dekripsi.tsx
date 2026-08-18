/* T17 (provisional) · scene 8 · dekripsi — bagian 5 [why], sisi keduanya
   VO:        08-dekripsi-vo.md
   Direction: 08-dekripsi-direction.md

   Scene 7 menunjukkan yang TIDAK bisa membaca; scene ini menunjukkan yang bisa.
   Tanpa scene ini, enkripsi terbaca sebagai sesuatu yang merusak pesan.

   TIGA KEPUTUSAN:

   1. KOTAKNYA KOMPONEN YANG SAMA dengan scene 6, dan `tutup`-nya bergerak ke
      arah SEBALIKNYA (di sana 0→1, di sini 1→0). Dekripsi harus terbaca sebagai
      tindakan yang MEMBALIK enkripsi, bukan sebagai mesin lain yang kebetulan
      ada di ujung sana.

   2. KUNCI MASUK DARI KANAN — dari sisi penerima, bukan dari jalur. Arahnya
      mengikat: apa pun yang datang dari jalur adalah yang barusan lewat di depan
      orang lain, dan kuncinya bukan itu.

   3. GELEMBUNG YANG KELUAR BENTUKNYA SAMA PERSIS dengan yang diketik di scene 3.
      Kalau ia digambar sedikit berbeda, gagasan "dikembalikan ke bentuk aslinya"
      ikut bocor — dan itu satu-satunya hal yang scene ini ajarkan.

   KUNCINYA MUNCUL BEGITU SAJA, dan itu lubang terbesar di episode ini: dari mana
   ia datang dan kenapa cuma penerima yang punya tidak dijawab di mana pun.
   Bukan kelalaian — arahan user mengeluarkan pertukaran kunci secara eksplisit.
   Usul satu kalimat yang menutupnya ada di 08-dekripsi-vo.md.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Gembok,
  KotakProses,
  Kunci,
  PESAN,
  SANDI,
  Sosok,
  kamera,
  munculSkala,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "dekripsi";

const B_TERIMA = beat(ID, 0); // "Di sisi penerima, data tersebut perlu dikembalikan…"
const B_PROSES = beat(ID, 1); // "Proses mengembalikan… disebut dekripsi."
const B_BACA = beat(ID, 2); // "Dengan kunci yang tepat, pesan dapat dibaca kembali…"

const KOTAK = { x: 880, y: 520, w: 520, h: 240 } as const;

/** Kunci mendekat DARI KANAN — dari sisi penerima, bukan dari jalur. Berhenti
 *  tepat di sebelah gembok yang menempel di tepi kanan kotak, tanpa menimpanya:
 *  kunci yang berhenti jauh dari gemboknya tidak pernah terbaca sebagai kunci
 *  yang membuka, dan kunci yang menindihnya jadi satu gumpalan. */
const X_KUNCI = (maju: number): number =>
  KOTAK.x + KOTAK.w / 2 + 300 - 190 * maju;

export const Dekripsi: React.FC = () => {
  const d = useDetik();

  /* Frame pertamanya = frame terakhir scene 7: kita sekarang DI DALAM HP
     penerima, jadi tidak ada yang perlu "masuk" — yang tampil sudah di sana. */
  const hadir = t(d, { mulai: 0.1, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 2: kotak DEKRIPSI, kunci mendekat dari KANAN, gembok terbuka --- */
  const kotak = t(d, { mulai: B_PROSES, durasi: 0.6, dari: 0, ke: 1 });
  const masukKotak = t(d, {
    mulai: B_PROSES + 0.5,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const kunci = t(d, {
    mulai: B_PROSES + 1.2,
    durasi: 0.8,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const kunciSkala = munculSkala(d, B_PROSES + 1.2);
  /* Sengkangnya terangkat; badan gemboknya TIDAK bergerak. Gembok yang
     seluruhnya melompat terbaca sebagai gembok yang dilepas, bukan dibuka. */
  const terbuka = t(d, {
    mulai: B_PROSES + 1.9,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  /* --- tahap 3: kotaknya membuka, kalimatnya kembali utuh ---
     `tutup` bergerak 1 → 0: kebalikan persis dari scene 6. */
  const buka = t(d, {
    mulai: B_BACA,
    durasi: 0.7,
    dari: 1,
    ke: 0,
    ease: E.power2out,
  });
  const tukar = t(d, { mulai: B_BACA + 0.3, durasi: 0.7, dari: 0, ke: 1 });
  const mendarat = masuk(d, { mulai: B_BACA + 0.9, durasi: 0.6, geser: 26 });
  const lega = t(d, { mulai: B_BACA + 1.3, durasi: 0.8, dari: 0, ke: 1 });
  const jauh = t(d, {
    mulai: B_BACA + 1.6,
    durasi: 1.4,
    dari: 1.06,
    ke: 1,
    ease: E.expoOut,
  });

  const tutupSekarang = masukKotak * buka;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera(jauh, KOTAK.x, KOTAK.y)} opacity={hadir}>
            {/* --- yang tampil sebelum kotaknya ada: lambang + gembok --- */}
            <g opacity={1 - kotak}>
              <text
                x={KOTAK.x}
                y={KOTAK.y}
                fontSize={76}
                fontFamily="var(--font-mono)"
                fontWeight={700}
                fill="var(--accent-ink)"
                textAnchor="middle"
                dominantBaseline="middle"
                letterSpacing={4}
              >
                {SANDI}
              </text>
              <Gembok x={KOTAK.x} y={KOTAK.y + 108} skala={0.8} />
            </g>

            {/* --- kotak DEKRIPSI --- */}
            <g opacity={kotak}>
              <KotakProses {...KOTAK} label="DEKRIPSI" tutup={tutupSekarang}>
                <text
                  x={KOTAK.x}
                  y={KOTAK.y}
                  fontSize={68}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill="var(--accent-ink)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  letterSpacing={4}
                  opacity={1 - tukar}
                >
                  {SANDI}
                </text>
              </KotakProses>

              {/* Gembok DI SISI KANAN kotak, bukan di bawahnya — kuncinya
                  datang dari kanan, dan kunci yang berhenti jauh dari gemboknya
                  tidak pernah terbaca sebagai kunci yang MEMBUKA. Ketahuan dari
                  render still. */}
              <g opacity={1 - tukar}>
                <Gembok
                  x={KOTAK.x + KOTAK.w / 2}
                  y={KOTAK.y}
                  skala={0.8}
                  terbuka={terbuka}
                />
              </g>

              {/* kunci — dari KANAN, dari sisi penerima */}
              <g opacity={kunci}>
                <g
                  transform={`translate(${X_KUNCI(kunci)} ${
                    KOTAK.y
                  }) scale(${1.5 * kunciSkala}) translate(${-X_KUNCI(kunci)} ${-KOTAK.y})`}
                >
                  <Kunci x={X_KUNCI(kunci)} y={KOTAK.y} />
                </g>
              </g>
            </g>

            {/* --- kalimatnya kembali, sebagai gelembung chat biasa --- */}
            <g style={{ opacity: mendarat.opacity, transform: mendarat.transform }}>
              <rect
                x={KOTAK.x - 250}
                y={KOTAK.y - 46}
                width={500}
                height={92}
                rx={26}
                fill="var(--accent)"
              />
              <text
                x={KOTAK.x}
                y={KOTAK.y + 2}
                fontSize={46}
                fontFamily="var(--font-body)"
                fontWeight={700}
                fill="var(--ink-0)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {PESAN}
              </text>
            </g>
          </g>

          {/* --- penerimanya, di sisi kanan. bahunya turun sedikit; tidak ada
                 wajah yang berubah (arahan user: avoid excessive facial detail) --- */}
          <g opacity={hadir}>
            <Sosok x={1610} y={1010 + 5 * lega} skala={0.72} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
