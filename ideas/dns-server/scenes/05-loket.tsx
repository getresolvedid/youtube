/* T14 · scene 5 · loket — bagian 4 [answer] → [what], 18,82 dtk
   VO:        05-loket-vo.md
   Direction: 05-loket-direction.md

   Scene yang MENAMAI subjek episode. Frame pertamanya = frame terakhir
   `04-daftar-yang-basi`: daftar merah yang membeku, ekornya masih menggantung.

   TIGA KEPUTUSAN:

   1. Loketnya berdiri PERSIS di tempat daftar itu runtuh. Kalau ia muncul di
      tempat lain, hubungan sebab-akibatnya hilang dan penonton cuma mendapat
      dua gambar yang kebetulan berurutan.

   2. Laci kosong adalah inti scene ini, bukan detail — ia dapat dua tahap
      sendiri. Ia yang membedakan jawaban ini dari daftar yang barusan gagal:
      kalau lacinya berisi, penonton cuma dapat "daftarnya dipindah ke tempat
      lain", dan seluruh bagian 5 kehilangan alasannya. Dasar lacinya digambar
      supaya kekosongannya terbaca sebagai fakta.

   3. Nama resmi muncul PALING AKHIR dan SENDIRIAN — tidak ada elemen lain yang
      bergerak di tahap itu. Kartu judul sudah menulis "DNS" di detik ~19; kalau
      nama ini datang bersama gerakan lain, ia terbaca sebagai pengulangan judul
      dan bukan sebagai penegasan (HARD RULE 6).

   Tidak ada orang di balik loket. Sosok baru muncul di scene 6, saat pemilik
   situsnya perlu punya wajah — loket yang sudah berpenghuni sejak awal membuat
   pertanyaan "siapa yang menjawab" di scene 10 kehilangan tenaganya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Kartu,
  Loket,
  LOKET,
  NOMOR_LAMA,
  POTONGAN,
  SKALA_LOKET,
  X_LOKET,
  Y_LANTAI,
} from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "loket";

const B_TIDAK = beat(ID, 0); // "Makanya nomornya memang tidak disimpan."
const B_TANYA = beat(ID, 1); // "Ia ditanyakan, tiap kali dibutuhkan."
const B_TUGAS = beat(ID, 2); // "Ada satu loket yang tugasnya cuma itu."
const B_SEBUT = beat(ID, 3); // "Kamu sebut namanya, dia sebut nomornya."
const B_LACI = beat(ID, 4); // "Dan sekarang lihat lacinya."
/* "Kosong." berdiri sebagai beat sendiri sejak 2026-08-14: laci yang terbuka
   adalah tahap animasi tersendiri di direction (tahap 6), dan satu kata yang
   mendarat tepat di situ jauh lebih kuat daripada kata yang lewat di tengah
   kalimat. Pemecahan itu menggeser SEMUA indeks sesudahnya — B_NAMA dulu 6. */
const B_KOSONG = beat(ID, 5); // "Kosong."
const B_DAFTAR = beat(ID, 6); // "Loket itu tidak memegang daftar apa pun."
const B_NAMA = beat(ID, 7); // "Ya, loket itu namanya D N S server."

const NAMA = POTONGAN.join(".");

/** Titik laci pada loket tunggal — pusat zoom kamera di tahap 5. */
const P_LACI = {
  x: X_LOKET,
  y: Y_LANTAI + (LOKET.laci.y - LOKET.laci.h / 2) * SKALA_LOKET,
};

const T_MASUK = B_SEBUT + 0.15;
const T_KELUAR = T_MASUK + 0.9;

export const LoketScene: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: daftar runtuh, meninggalkan lantai kosong --- */
  const runtuh = t(d, { mulai: B_TIDAK, durasi: 0.8, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 2: loket tumbuh dari garis lantai --- */
  const tumbuh = t(d, {
    mulai: B_TANYA,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.backOut(1.4),
  });

  /* --- tahap 3: detail menyala berurutan --- */
  const detail = t(d, { mulai: B_TUGAS, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 4: nama masuk, nomor keluar. Sekali, bersih, tidak dramatis --- */
  const pMasuk = t(d, { mulai: T_MASUK, durasi: 0.55, dari: 0, ke: 1, ease: E.power2out });
  const pKeluar = t(d, { mulai: T_KELUAR, durasi: 0.55, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 5 & 6: kamera turun, laci ditarik, dan kosong --- */
  const kamera = t(d, { mulai: B_LACI, durasi: 0.8, dari: 0, ke: 1, ease: E.expoOut });
  /* Lacinya sudah terbuka penuh TEPAT saat kata "Kosong." jatuh — bukan sesudah.
     Kata yang mendarat di laci yang masih bergerak terbaca sebagai keterangan;
     yang mendarat di laci yang sudah diam terbaca sebagai temuan. */
  const tarik = t(d, { mulai: B_KOSONG - 0.55, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 7: kamera mundur, lalu namanya mendarat sendirian ---
     Mundurnya jatuh di kalimat yang MENJELASKAN lacinya, bukan menempel ke
     penamaan — supaya beat terakhir benar-benar cuma namanya. */
  const balik = t(d, { mulai: B_DAFTAR + 0.35, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const zoom = kamera * (1 - balik);

  const skalaKamera = 1 + 0.75 * zoom;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ---------- daftar yang runtuh keluar frame ---------- */}
          <g opacity={1 - runtuh} transform={`translate(0 ${520 * runtuh})`}>
            {Array.from({ length: 8 }, (_, k) => (
              <g key={k} transform={`translate(0 ${250 + k * 62}) rotate(${(k - 4) * 0.4})`}>
                <rect
                  x={510}
                  y={-25}
                  width={900}
                  height={50}
                  rx={8}
                  fill="var(--bad-soft)"
                />
                <path
                  d="M960 -18v36"
                  stroke="var(--line)"
                  strokeWidth={3}
                />
              </g>
            ))}
          </g>

          {/* ---------- garis lantai: satu-satunya yang tidak ikut runtuh ---------- */}
          <path
            d="M120 830h1680"
            stroke="var(--line)"
            strokeWidth={5}
            strokeLinecap="round"
          />

          {/* ---------- kamera ---------- */}
          <g
            transform={`translate(${P_LACI.x} ${P_LACI.y}) scale(${skalaKamera}) translate(${-P_LACI.x} ${-P_LACI.y})`}
          >
            <g transform={`translate(${X_LOKET} ${Y_LANTAI}) scale(1 ${tumbuh}) translate(${-X_LOKET} ${-Y_LANTAI})`}>
              <Loket
                x={X_LOKET}
                y={Y_LANTAI}
                skala={SKALA_LOKET}
                nyala={0.35 + 0.65 * detail}
                laci={tarik}
                isi={0}
              />
            </g>

            {/* kartu nama masuk lewat jendela */}
            <Kartu
              x={X_LOKET - 520 + 470 * pMasuk}
              y={Y_LANTAI + (LOKET.jendela.y + LOKET.jendela.h / 2) * SKALA_LOKET}
              teks={NAMA}
              skala={0.72}
              warna="var(--ink-0)"
              opacity={pMasuk * (1 - pKeluar)}
            />
            {/* kartu nomor keluar */}
            <Kartu
              x={X_LOKET - 50 - 470 * pKeluar}
              y={Y_LANTAI + (LOKET.jendela.y + LOKET.jendela.h / 2) * SKALA_LOKET}
              teks={NOMOR_LAMA}
              skala={0.72}
              opacity={pKeluar}
            />
          </g>

          {/* ---------- penamaan [what] — sendirian, tanpa gerakan lain ---------- */}
          <g
            style={{
              opacity: masuk(d, { mulai: B_NAMA + 0.12, durasi: 0.5, geser: 0 }).opacity,
            }}
          >
            <text
              x={X_LOKET}
              /* 920 + separuh tinggi huruf masih di atas y=960, batas
                 --safe-bottom. Angka ini dan Y_LANTAI saling mengunci. */
              y={920}
              fontSize={68}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--accent-ink)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              DNS server
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
