/* T14 · scene 6 · tangga — bagian 5 [why], 36,82 dtk
   VO:        06-tangga-vo.md
   Direction: 06-tangga-direction.md

   Scene terpanjang di episode, dan memang seharusnya: di sinilah utang bagian 3
   dibayar. Frame pertamanya = frame terakhir `05-loket`.

   ARAH TANGGANYA MENGIKAT: bawah = kamu, atas = pemilik situs. Koordinatnya di
   ../panggung-loket.tsx (`posLoket`), dipakai bersama scene 7, 8, 9 dan 12.

   EMPAT KEPUTUSAN:

   1. Penanda MASUK DARI KANAN dan bergerak ke kiri. Seluruh gagasan scene ini
      adalah arah bacanya; penanda yang masuk dari kiri lalu melompat ke kanan
      mengajarkan kebalikannya di detik pertama.

   2. Laci kosong diulang di tahap 6 dengan bentuk yang SAMA PERSIS seperti
      scene 5 — komponen `Loket` yang sama, bukan gambar yang mirip. Ini kutipan
      visual: penonton mengenali laci yang baru saja dilihatnya, dan mengenali
      berarti "oh, yang ini pun tidak menyimpan".

   3. Loket teratas adalah SATU-SATUNYA laci berisi sampai titik ini, dan karena
      itu ia diberi aksen penuh. Kalau ada laci lain yang pernah digambar berisi
      sebelum ini, seluruh kontrasnya hilang.

   4. Tahap 12 adalah bayaran `04-daftar-yang-basi`: di sana nomor berubah
      sendiri tanpa pelaku, di sini pelakunya punya wajah dan punya hak. Loket
      lain yang DIAM TOTAL adalah bagian dari pernyataannya — jangan menyalakan
      apa pun di sana "supaya tidak sepi".
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  GARIS,
  I_PEMILIK,
  iPotonganUntukLoket,
  jendelaLoket,
  Kartu,
  laciLoket,
  Loket,
  NamaSitus,
  NOMOR_BARU,
  NOMOR_LAMA,
  Penanda,
  posLoket,
  SKALA_LOKET,
  Sosok,
  TANGGA,
  X_LOKET,
  xPotongan,
  Y_LANTAI,
  Y_NAMA,
} from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "tangga";

const B_MENJAWAB = beat(ID, 0); // "Tidak memegang daftar, tapi tetap bisa menjawab."
const B_SENDIRI = beat(ID, 1); // "Caranya, dia tidak menjawab sendirian."
const B_BELAKANG = beat(ID, 2); // "Sekarang lihat namanya lagi, dan baca dari belakang."
const B_KANAN = beat(ID, 3); // "Potongan paling kanan dulu."
const B_PERTAMA = beat(ID, 4); // "Potongan itu yang membuka loket pertama."
const B_TIDAKTAHU = beat(ID, 5); // "Loket pertama tidak tahu apa-apa ..."
const B_MENGURUS = beat(ID, 6); // "Dia cuma tahu siapa yang mengurus akhiran itu."
const B_BERIKUT = beat(ID, 7); // "Lalu potongan berikutnya, dan loket berikutnya."
const B_TERUS = beat(ID, 8); // "Begitu terus, sampai loket paling ujung."
const B_MEMEGANG = beat(ID, 9); // "Yang itu memang memegang jawabannya."
const B_PEMILIK = beat(ID, 10); // "Karena yang duduk di situ pemilik situsnya sendiri."
const B_GANTI = beat(ID, 11); // "Makanya dia bisa mengganti nomornya kapan saja, ..."

/** Kapan tiap loket di atasmu menyala. Tahap 9 DIPERCEPAT: jarak `mulai`-nya
 *  yang dipersempit, bukan durasi tween-nya — melambatkan tween akan terbaca
 *  sebagai gerakan yang beda, bukan sebagai ritme yang beda. */
const NYALA = [0, B_PERTAMA, B_BERIKUT, B_TERUS + 0.55];
/** Tangan penunjuk dari loket i ke loket i+1. */
const TUNJUK = [0, B_MENGURUS, B_BERIKUT + 0.7];

const P0 = posLoket(0);
const P_PEMILIK = posLoket(I_PEMILIK);

export const Tangga: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: loket scene 5 turun jadi anak tangga terbawah --- */
  const pindah = t(d, {
    mulai: B_MENJAWAB + 0.1,
    durasi: 0.85,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const x0 = X_LOKET + (P0.x - X_LOKET) * pindah;
  const y0 = Y_LANTAI + (P0.y - Y_LANTAI) * pindah;
  const s0 = SKALA_LOKET + (P0.skala - SKALA_LOKET) * pindah;

  /* --- tahap 2: yang lain masuk sebagai siluet, makin ke atas makin samar --- */
  const siluet = t(d, { mulai: B_SENDIRI, durasi: 0.7, dari: 0, ke: 1 });

  /* --- tahap 3 & 4: nama dipecah, penanda masuk dari KANAN --- */
  const pecah = t(d, { mulai: B_BELAKANG + 0.15, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const masukPen = t(d, {
    mulai: B_KANAN,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.backOut(1.3),
  });
  const kePotongan1 = t(d, { mulai: B_BERIKUT, durasi: 0.35, dari: 0, ke: 1, ease: E.power2out });
  const kePotongan0 = t(d, {
    mulai: B_TERUS + 0.45,
    durasi: 0.35,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const xPen =
    1880 +
    (xPotongan(2) - 1880) * masukPen +
    (xPotongan(1) - xPotongan(2)) * kePotongan1 +
    (xPotongan(0) - xPotongan(1)) * kePotongan0;

  const sorot =
    d >= B_TERUS + 0.45 ? 0 : d >= B_BERIKUT ? 1 : d >= B_KANAN ? 2 : -1;

  /* --- tahap 6: laci loket pertama, kosong seperti punyamu --- */
  const tarik1 = t(d, { mulai: B_TIDAKTAHU, durasi: 0.7, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 10: laci pemilik — satu-satunya yang berisi --- */
  const tarikP = t(d, { mulai: B_MEMEGANG, durasi: 0.7, dari: 0, ke: 1, ease: E.expoOut });
  const aksenP = d >= B_MEMEGANG;

  /* --- tahap 11 & 12: pemilik, lalu kartunya diganti --- */
  const sosok = t(d, { mulai: B_PEMILIK, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const keluarKartu = t(d, { mulai: B_GANTI + 0.35, durasi: 0.5, dari: 0, ke: 1, ease: E.power2in });
  const masukKartu = t(d, { mulai: B_GANTI + 0.5, durasi: 0.55, dari: 0, ke: 1, ease: E.expoOut });
  const sedangTukar = keluarKartu > 0 && masukKartu < 1;

  const pLaci = laciLoket(I_PEMILIK);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ---------- nama, dipecah jadi potongan ---------- */}
          <NamaSitus pecah={pecah} sorot={sorot} />
          <Penanda x={xPen} opacity={masukPen} />

          {/* ---------- garis potongan -> loket ---------- */}
          {[1, 2, 3].map((i) => {
            const j = jendelaLoket(i);
            const xp = xPotongan(iPotonganUntukLoket(i));
            const yp = Y_NAMA + 62;
            const panjang = Math.hypot(j.x - xp, j.y - yp);
            return (
              <path
                key={i}
                d={`M${xp} ${yp}L${j.x} ${j.y}`}
                stroke={GARIS.warna}
                strokeWidth={GARIS.tebal}
                strokeLinecap="round"
                opacity={GARIS.opasitas}
                {...gambarGaris(d, panjang, { mulai: NYALA[i] ?? 0, durasi: 0.5 })}
              />
            );
          })}

          {/* ---------- tangan penunjuk: dari loket i KE ATAS ke loket i+1 ---------- */}
          {[1, 2].map((i) => {
            const a = jendelaLoket(i);
            const b = jendelaLoket(i + 1);
            const p = t(d, { mulai: TUNJUK[i] ?? 0, durasi: 0.45, dari: 0, ke: 1, ease: E.expoOut });
            const ux = (b.x - a.x) / Math.hypot(b.x - a.x, b.y - a.y);
            const uy = (b.y - a.y) / Math.hypot(b.x - a.x, b.y - a.y);
            const px = a.x + ux * 150 * p;
            const py = a.y + uy * 150 * p;
            return (
              <g key={i} opacity={p}>
                <path
                  d={`M${a.x} ${a.y}L${px} ${py}`}
                  stroke="var(--ink-1)"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
                <circle cx={px} cy={py} r={9} fill="var(--ink-1)" />
              </g>
            );
          })}

          {/* ---------- loket di atasmu ---------- */}
          {[1, 2, 3].map((i) => {
            const p = posLoket(i);
            const nyala = t(d, { mulai: NYALA[i] ?? 0, durasi: 0.4, dari: 0, ke: 1 });
            const pemilik = i === I_PEMILIK;
            return (
              <Loket
                key={i}
                x={p.x}
                y={p.y}
                skala={p.skala}
                nyala={nyala}
                opacity={siluet}
                aksen={pemilik && aksenP}
                laci={i === 1 ? tarik1 : pemilik ? tarikP : 0}
                isi={pemilik && aksenP && !sedangTukar ? 1 : 0}
              />
            );
          })}

          {/* ---------- loketmu sendiri, turun dari scene 5 ---------- */}
          <Loket x={x0} y={y0} skala={s0} nyala={1} laci={1} isi={0} />

          {/* ---------- pemilik situsnya ----------
              Ditaruh di KIRI loket teratas: sisi kanannya sudah dipakai anak
              tangga berikutnya, dan sosok yang berdiri di situ menempel ke
              loket lain — persis kesalahan yang tidak terlihat sampai
              still-nya dirender. */}
          <g opacity={sosok}>
            <Sosok
              x={P_PEMILIK.x - 210 * P_PEMILIK.skala}
              y={P_PEMILIK.y}
              skala={P_PEMILIK.skala * 0.92}
            />
            <text
              x={P_PEMILIK.x - 210 * P_PEMILIK.skala}
              y={P_PEMILIK.y + 48}
              fontSize={26}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              fill="var(--ink-1)"
              textAnchor="middle"
            >
              pemilik situsnya
            </text>
          </g>

          {/* ---------- kartunya diganti; tangga di bawahnya tidak bergerak ----------
              Kartunya naik KELUAR di atas loket, bukan bertukar di dalam laci:
              di dalam laci ukurannya terlalu kecil untuk terbaca, dan yang
              harus terlihat justru bahwa nomornya BERGANTI. */}
          <Kartu
            x={pLaci.x + 210 * P_PEMILIK.skala}
            y={pLaci.y - 90 * keluarKartu}
            teks={NOMOR_LAMA}
            skala={0.5}
            opacity={keluarKartu > 0 ? 1 - keluarKartu : 0}
          />
          <Kartu
            x={pLaci.x + 210 * P_PEMILIK.skala}
            y={pLaci.y + 90 * (1 - masukKartu)}
            teks={NOMOR_BARU}
            skala={0.5}
            opacity={masukKartu}
          />

          {/* Baris kecil yang menegaskan: tidak ada loket lain yang diberi tahu. */}
          <g
            style={masuk(d, { mulai: B_GANTI + 1.5, durasi: 0.5, geser: 12 })}
          >
            <text
              x={TANGGA.x0 - 40}
              y={946}
              fontSize={28}
              fontFamily="var(--font-mono)"
              fill="var(--ink-2)"
              textAnchor="end"
            >
              tidak ada yang diberi tahu
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
