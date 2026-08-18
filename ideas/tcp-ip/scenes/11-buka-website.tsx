/* T18 · scene 11 · buka-website — perjalanan utuh
   VO:        11-buka-website-vo.md
   Direction: 11-buka-website-direction.md

   Scene terpanjang, dan satu-satunya yang memakai semua yang sudah ditunjukkan.
   Tujuh beat, tapi SATU gerakan tanpa jeda.

   TIGA KEPUTUSAN:

   1. Tahap 2 adalah KEHENINGAN — tidak ada satu tween pun yang berjalan. Jeda di
      mana peramban tidak bisa melanjutkan itulah yang membuat tahap 3 terasa
      sebagai jawaban. Kalau peramban langsung jalan, simpul DNS cuma jadi
      langkah tambahan yang tidak jelas gunanya.

   2. Tahap 6 memakai arah KANAN → KIRI, arah yang sejak scene 7 hanya dipakai
      untuk "sesuatu yang kembali". Ia bekerja gratis karena penonton sudah
      dilatih.

   3. Hurufnya benar-benar bertambah satu per satu (`slice`), bukan bidang teks
      yang melebar. Yang kedua terbaca sebagai tirai, bukan sebagai mengetik.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Centang,
  JALUR_UTAMA,
  Jalur,
  Paket,
  Peramban,
  Server,
  Simpul,
  X_KANAN,
  X_SIMPUL,
  Y_LANTAI,
} from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "buka-website";

const B_KETIK = beat(ID, 0); // "Sekarang bayangkan kamu mengetik…"
const B_BUTUH = beat(ID, 1); // "Browser membutuhkan alamat server tujuan."
const B_DNS = beat(ID, 2); // "DNS membantu menemukan alamat IP…"
const B_KIRIM = beat(ID, 3); // "Setelah mengetahui tujuan, data dikirim…"
const B_LEWAT = beat(ID, 4); // "TCP dapat membantu memastikan…"
const B_BALIK = beat(ID, 5); // "Server kemudian mengirimkan data kembali…"
const B_SINGKAT = beat(ID, 6); // "Semua proses ini terjadi dalam waktu yang sangat singkat."

const ALAMAT_NAMA = "contoh.com";
const ALAMAT_ANGKA = "93.184.0.10";

const X_PERAMBAN = 480;
const Y_PERAMBAN = 560;
const N_PAKET = 3;

/** Baris teratas tempat potongan berlabuh di depan server. Sengaja DI ATAS
 *  jalur: centang yang ditaruh setinggi jalur akan tertimpa garisnya. */
const Y_DOK = 560;

export const BukaWebsite: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: mengetik. Huruf bertambah satu per satu, bukan bidang melebar. */
  const ketik = t(d, { mulai: B_KETIK + 0.3, durasi: 1.6, dari: 0, ke: 1, ease: E.linear });
  const nHuruf = Math.floor(ketik * ALAMAT_NAMA.length);
  const kursor = tPP(d, { mulai: B_KETIK, durasi: 0.9, dari: 0, ke: 1 });

  /* --- tahap 2: KEHENINGAN. Tidak ada tween di sini, dan itu isinya. --- */

  /* --- tahap 3: nama pergi ke simpul, kembali sebagai angka --- */
  const pergi = t(d, { mulai: B_DNS + 0.2, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const pulangNama = t(d, { mulai: B_DNS + 1.3, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const jadiAngka = t(d, { mulai: B_DNS + 1.3, durasi: 0.4, dari: 0, ke: 1 });
  const muat = t(d, { mulai: B_DNS + 2.1, durasi: 3.5, dari: 0.05, ke: 1 });

  /* --- tahap 4 & 5: potongan berangkat, lewat persimpangan, masuk server --- */
  const berangkat = (i: number) =>
    t(d, { mulai: B_KIRIM + 0.4 + i * 0.12, durasi: 2.6, dari: 0, ke: 1, ease: E.power1out });
  const centang = (i: number) =>
    t(d, { mulai: B_LEWAT + 1.4 + i * 0.18, durasi: 0.4, dari: 0, ke: 1 });
  const serverNyala = t(d, { mulai: B_LEWAT + 1.6, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 6: pulang. Arah kanan -> kiri, dan itu miliknya. --- */
  const pulang = (i: number) =>
    t(d, { mulai: B_BALIK + 0.3 + i * 0.12, durasi: 2.2, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 7: halaman terisi, kamera mundur --- */
  const isi = (i: number) => masuk(d, { mulai: B_SINGKAT + 0.1, urutan: i, jeda: 0.1, geser: 14 });

  const xLuarPeramban = X_PERAMBAN + 320;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Jalur y={JALUR_UTAMA + 260} dari={xLuarPeramban} ke={X_KANAN - 120} nyala={0.7} />

          {/* Persimpangan menyala menurut POSISI potongan — sama seperti scene 4. */}
          {X_SIMPUL.map((x) => {
            const xP = xLuarPeramban + (X_KANAN - 200 - xLuarPeramban) * berangkat(0);
            return (
              <Simpul
                key={x}
                x={x}
                y={JALUR_UTAMA + 260}
                nyala={xP > x - 70 && xP < x + 180 ? 1 : 0.25}
              />
            );
          })}

          <Server x={X_KANAN} y={Y_LANTAI} skala={0.68} nyala={serverNyala} />

          {/* --- simpul penerjemah nama, di atas --- */}
          <Simpul x={960} y={210} nyala={pergi > 0.8 && pulangNama < 0.2 ? 1 : 0.3} />

          {/* Nama yang terbang ke simpul lalu kembali sebagai angka. */}
          {pergi > 0 && pulangNama < 1 && (
            <text
              x={X_PERAMBAN + (960 - X_PERAMBAN) * pergi - (960 - X_PERAMBAN) * pulangNama}
              y={Y_PERAMBAN - 170 + (210 - (Y_PERAMBAN - 170)) * pergi
                - (210 - (Y_PERAMBAN - 170)) * pulangNama}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={26}
              fill="var(--accent)"
            >
              {jadiAngka > 0.5 ? ALAMAT_ANGKA : ALAMAT_NAMA}
            </text>
          )}

          {/* --- peramban --- */}
          <Peramban
            x={X_PERAMBAN}
            y={Y_PERAMBAN}
            alamat={
              jadiAngka > 0.5
                ? ALAMAT_ANGKA
                : ALAMAT_NAMA.slice(0, nHuruf) + (kursor > 0.5 && ketik < 1 ? "|" : "")
            }
            muat={muat}
          >
            {/* Halaman yang akhirnya terisi. */}
            <g style={{ opacity: isi(0).opacity, transform: isi(0).transform }}>
              <rect x={-270} y={-110} width={300} height={26} rx={6} fill="var(--ink-1)" />
            </g>
            <g style={{ opacity: isi(1).opacity, transform: isi(1).transform }}>
              <rect x={-270} y={-64} width={540} height={96} rx={8} fill="var(--accent-soft)" />
            </g>
            <g style={{ opacity: isi(2).opacity, transform: isi(2).transform }}>
              <rect x={-270} y={52} width={540} height={14} rx={7} fill="var(--ink-2)" opacity={0.45} />
            </g>
            <g style={{ opacity: isi(3).opacity, transform: isi(3).transform }}>
              <rect x={-270} y={82} width={430} height={14} rx={7} fill="var(--ink-2)" opacity={0.45} />
            </g>
          </Peramban>

          {/* --- tahap 4, 5, 6 ---

              SATU benda per potongan sepanjang ketiga tahap: berangkat →
              berlabuh di depan server → pulang. Tiga komponen terpisah akan
              membuat potongan lenyap di antara tahapnya, dan layar kanan kosong
              justru selama server sedang mengerjakan permintaannya. */}
          {Array.from({ length: N_PAKET }, (_, i) => {
            const pergi = berangkat(i);
            const balik = pulang(i);
            if (pergi <= 0) return null;

            /* Seperempat terakhir perjalanan dipakai untuk naik ke tempat
               berlabuh — sejajar dengan centangnya sendiri. */
            const naik = Math.min(1, Math.max(0, (pergi - 0.75) * 4));
            const turun = Math.min(1, Math.max(0, balik * 4));

            const yDok = Y_DOK + i * 64;
            const xDok = X_KANAN - 340;
            const xJalur = xLuarPeramban + (xDok - xLuarPeramban) * pergi;

            /* Berangkat di jalur, naik ke dok, lalu turun lagi dan pulang. */
            const x =
              balik > 0
                ? xDok - (xDok - xLuarPeramban) * balik
                : xJalur;
            const y =
              balik > 0
                ? yDok + (JALUR_UTAMA + 260 - yDok) * turun
                : JALUR_UTAMA + 260 + (yDok - (JALUR_UTAMA + 260)) * naik;

            if (balik >= 1) return null;

            return (
              <g key={`paket-${i}`}>
                <Paket
                  x={x}
                  y={y}
                  nomor={i + 1}
                  warna={balik > 0 ? "ok" : naik > 0.9 ? "ok" : "biasa"}
                  skala={0.7}
                />
                {/* Centang menempel di sebelah kanan tempat berlabuh — bukan di
                    atas jalur, tempat ia akan tertimpa garis. */}
                <Centang x={xDok + 92} y={yDok} skala={1} opacity={centang(i) * (1 - balik * 4)} />
              </g>
            );
          })}
        </svg>
      </div>
    </Scene>
  );
};
