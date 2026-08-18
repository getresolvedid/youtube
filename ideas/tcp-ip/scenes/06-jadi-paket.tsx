/* T18 · scene 6 · jadi-paket — pemecahan jadi potongan
   VO:        06-jadi-paket-vo.md
   Direction: 06-jadi-paket-direction.md

   Scene inti pertama. Menanam dua hal yang dipakai scene 7: potongan itu
   BERNOMOR, dan jalurnya TIDAK SAMA.

   TIGA KEPUTUSAN:

   1. Pembelahan, bukan penggandaan. Bidang aslinya habis di 0,25 dtk pertama —
      kalau ia masih tinggal di layar, yang terbaca "disalin", dan itu keliru.

   2. Keempat label tujuan masuk BERSAMAAN, bukan berurutan. Kesamaannya yang
      jadi isi tahap 3; label yang datang satu-satu justru menonjolkan bedanya.

   3. Potongan 02 ditaruh di jalur ATAS, berbeda dari mayoritas. Ia yang hilang
      di scene 7, dan jalur yang lain membuat kehilangannya terbaca sebagai
      akibat perjalanan — bukan sebagai kebetulan.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Desktop,
  JALUR_UTAMA,
  JALUR_Y,
  Jalur,
  Paket,
  Simpul,
  X_KANAN,
  X_KIRI,
  X_SIMPUL,
  Y_LANTAI,
} from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "jadi-paket";

const B_BESAR = beat(ID, 0); // "Tapi data … tidak selalu dikirim sebagai satu bagian besar."
const B_PECAH = beat(ID, 1); // "Data dapat dipecah menjadi bagian-bagian kecil…"
const B_LABEL = beat(ID, 2); // "Setiap paket membawa informasi penting…"
const B_JALAN = beat(ID, 3); // "Paket-paket tersebut kemudian bergerak…"

/** Empat potongan. `jalur` mengikat ke scene 7: 02 sendirian di jalur atas.
 *
 *  `lama` sengaja LEBIH PANJANG daripada sisa scene setelah beat 3 — keempatnya
 *  masih di tengah perjalanan saat scene habis, persis seperti yang diminta
 *  direction ("frame terakhir: keempat potongan di tengah perjalanan").
 *  Versi pertama memakai ~2 dtk, dan akibatnya 01 dan 04 — yang sejalur —
 *  sama-sama sampai di ujung lalu berdiri di titik yang sama persis, saling
 *  menimpa 100% selama satu setengah detik terakhir. */
const POTONGAN = [
  { nomor: 1, jalur: 1, lama: 4.2 },
  { nomor: 2, jalur: 0, lama: 5.0 },
  { nomor: 3, jalur: 2, lama: 4.6 },
  { nomor: 4, jalur: 1, lama: 6.1 },
] as const;

const X_PECAH = [560, 740, 920, 1100] as const;

/** Jarak tempuh yang SAMA untuk keempatnya, bukan titik tujuan yang sama.
 *
 *  Dengan titik tujuan yang sama, potongan yang sejalur (01 dan 04) mendekat
 *  terus sampai berimpit — dan yang cepat menabrak yang lambat justru di detik
 *  terakhir scene, saat layar paling lama diam. Dengan jarak yang sama, jarak
 *  antar-potongan tidak pernah menyusut lebih dari selisih kecepatannya. */
const JARAK = 320;
const TUJUAN = "192.168.1.10";

export const JadiPaket: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: pesan utuh --- */
  const utuh = masuk(d, { mulai: B_BESAR + 0.1, durasi: 0.6, geser: 20 });

  /* --- tahap 2: belah. Satu tindakan, bukan empat. --- */
  const belah = t(d, { mulai: B_PECAH, durasi: 0.85, dari: 0, ke: 1, ease: E.power2out });
  /* Bidang asli HABIS — tidak ada sisa di belakang potongannya. */
  const sisaUtuh = t(d, { mulai: B_PECAH, durasi: 0.25, dari: 1, ke: 0 });

  /* --- tahap 3: label tujuan, keempatnya BERSAMAAN --- */
  const label = masuk(d, { mulai: B_LABEL + 0.2, durasi: 0.5, geser: 12 });

  /* --- tahap 4: berangkat, kecepatan sedikit berbeda --- */
  const naikJalur = t(d, { mulai: B_JALAN, durasi: 0.6, dari: 0, ke: 1, ease: E.power1out });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Ketiga jalur sudah ada sejak scene 1 — tahap 4 tidak
              memperkenalkan apa pun. */}
          {JALUR_Y.map((y, i) => (
            <Jalur key={y} y={y} nyala={naikJalur * (i === 1 ? 0.9 : 0.6)} />
          ))}
          {JALUR_Y.map((y) =>
            X_SIMPUL.map((x) => <Simpul key={`${x}-${y}`} x={x} y={y} nyala={0.25} />),
          )}

          <Desktop x={X_KANAN} y={Y_LANTAI} skala={0.74} />
          <text
            x={X_KANAN}
            y={Y_LANTAI - 218}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize={24}
            fontWeight={700}
            fill="var(--ink-0)"
          >
            {TUJUAN}
          </text>

          {/* --- tahap 1: pesan utuh, dan ia HABIS di tahap 2 --- */}
          <g style={{ opacity: utuh.opacity * sisaUtuh, transform: utuh.transform }}>
            <rect
              x={620}
              y={JALUR_UTAMA - 54}
              width={720}
              height={108}
              rx={12}
              fill="var(--bg-elev)"
              stroke="var(--accent)"
              strokeWidth={4}
            />
            <text
              x={980}
              y={JALUR_UTAMA + 14}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={34}
              fontWeight={700}
              fill="var(--ink-0)"
            >
              HELLO FROM COMPUTER A
            </text>
          </g>

          {/* --- tahap 2, 3, 4 --- */}
          {POTONGAN.map((p, i) => {
            const yJalur = JALUR_Y[p.jalur] ?? JALUR_UTAMA;
            /* Naik ke jalurnya dulu, baru berjalan — supaya lintasannya tidak
               miring dan ketiga jalur terbaca sebagai jalan, bukan arah. */
            const y = JALUR_UTAMA + (yJalur - JALUR_UTAMA) * naikJalur;
            const maju = t(d, {
              mulai: B_JALAN + 0.5 + i * 0.08,
              durasi: p.lama,
              dari: 0,
              ke: 1,
              ease: E.power1out,
            });
            const xAwal = X_PECAH[i] ?? 960;
            const x = xAwal + JARAK * maju;

            return (
              <g key={p.nomor} opacity={belah}>
                <Paket
                  x={960 + (x - 960) * belah}
                  y={y}
                  nomor={p.nomor}
                  skala={0.92}
                  label={label.opacity > 0.05 && maju < 0.1 ? TUJUAN : undefined}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </Scene>
  );
};
