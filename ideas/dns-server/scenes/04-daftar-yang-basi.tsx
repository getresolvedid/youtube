/* T14 · scene 4 · daftar-yang-basi — bagian 3 [problem], 23,53 dtk
   VO:        04-daftar-yang-basi-vo.md
   Direction: 04-daftar-yang-basi-direction.md

   Scene yang menutup jalan keluar paling jelas — dan menutupnya DI DEPAN MATA
   penonton, bukan lewat klaim. VO tidak pernah bilang "daftar itu mustahil";
   yang dikatakan cuma apa yang terjadi di layar, berurutan.

   TIGA KEPUTUSAN:

   1. Hijau datang lebih dulu, dan cuma dua baris. Tanpa satu detik rasa
      berhasil, kegagalan di tahap 7 tidak terasa sebagai kegagalan — cuma
      sebagai layar merah yang memang begitu dari awal.

   2. LAJU_BASI < LAJU_TULIS. Itu satu-satunya angka yang benar-benar penting di
      scene ini, dan ia relatif: yang dinyatakan "lebih cepat", bukan berapa.
      Merah harus menyusul baris baru, bukan mengejar selamanya.

   3. Ekor daftarnya tidak pernah punya ujung. Ia keluar dari bawah frame dan
      terus berjalan sampai frame terakhir; begitu ia berhenti di suatu baris,
      penonton melihat pekerjaan yang bisa selesai.

   Nomornya berubah SENDIRI, tanpa pelaku. Siapa yang mengubahnya baru dijawab
   di `06-tangga` tahap 12, dan jawaban itu bayarannya.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Komputer, NOMOR_LAMA, POTONGAN } from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "daftar-yang-basi";

const B_SIMPAN = beat(ID, 0); // "Jadi tinggal disimpan saja, kan?"
const B_TABEL = beat(ID, 1); // "Satu daftar panjang. Nama di kiri, ..."
const B_BUKA = beat(ID, 2); // "Komputermu tinggal membuka daftarnya sendiri."
const B_TULIS = beat(ID, 3); // "Sekarang coba tulis semuanya."
const B_SELESAI = beat(ID, 4); // "Baris pertama selesai."
const B_GANTI = beat(ID, 5); // "Dan di saat yang sama, nomor di baris lain ..."
const B_SALAH = beat(ID, 6); // "Yang di bawah belum sempat ditulis, ..."
const B_TUTUP = beat(ID, 7); // "Daftar itu tidak akan pernah benar."

const NAMA = POTONGAN.join(".");

/* --- geometri daftar ------------------------------------------------------- */

const H_BARIS = 62;
const Y_ATAS = 250;
const X_TABEL = 960;
const W_TABEL = 900;
/** Berapa baris yang muat sebelum daftarnya mulai menggulir. */
const MUAT = 9;
const N_AKHIR = 30;

/** Kolom baris tabel. Baris tunggal tahap 1–2 memakai kolom yang SAMA dengan
 *  baris-baris di tahap 4, cuma lebih besar: nama rata kiri, nomor rata kanan,
 *  pemisah tepat di tengah. Kalau keduanya beda tata letak, tahap 4 terbaca
 *  sebagai layar baru dan bukan sebagai baris tadi yang berulang.
 *
 *  Dulu baris tunggalnya dipusatkan di `X_TABEL - 210` / `X_TABEL + 230` dengan
 *  pemisah di `X_TABEL` — dan di font display 62px, tepi kanan namanya jatuh di
 *  ~975, jadi pemisahnya lewat memotong huruf terakhir. */
const X_KOL_NAMA = X_TABEL - W_TABEL / 2 + 28;
const X_KOL_NOMOR = X_TABEL + W_TABEL / 2 - 28;
const Y_BARIS_1 = 540;
/** Ukuran huruf baris tunggal. 46 dipilih supaya nama terpanjang berhenti jauh
 *  sebelum pemisah: ~0,56 x ukuran x 13 huruf ≈ 335px dari `X_KOL_NAMA`. */
const F_BARIS_1 = 46;
/** Tinggi pemisah baris tunggal — sebanding satu baris, bukan sekolom halaman. */
const H_PISAH_1 = 104;

/** Dua baris teratas tidak pernah jadi merah — merekalah "sedikit hijau di
 *  atas" yang membuat sisanya terbaca sebagai kegagalan. */
const AMAN = 2;
/** Detik per baris. Merah lebih cepat daripada tulis; lihat keputusan 2. */
const LAJU_BASI = 0.34;

/** Nomor baris ke-i. Turunan aritmetika dari indeksnya — deterministik, jadi
 *  frame 1.234 bisa dirender tanpa pernah merender 1.233 (CLAUDE.md). */
const nomorBaris = (i: number, basi: boolean): string => {
  const a = ((i * 37 + (basi ? 613 : 0)) % 90) + 10;
  const b = ((i * 91 + (basi ? 271 : 0)) % 900) + 100;
  const c = ((i * 53 + (basi ? 787 : 0)) % 900) + 100;
  return `${a} ${b} ${c}`;
};

const namaBaris = (i: number): string => (i === 0 ? NAMA : `situs-${i}.id`);

export const DaftarYangBasi: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 2: nama dan nomor bertemu, jadi satu baris --- */
  const dekat = t(d, { mulai: B_SIMPAN + 0.2, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });
  /* Pemisah dulu, alas baris menyusul — dua garis yang tergambar bersamaan
     terbaca sebagai bingkai, bukan sebagai baris yang sedang dibentuk. */
  const garisTabel = gambarGaris(d, H_PISAH_1, { mulai: B_TABEL + 0.1, durasi: 0.3 });
  const garisAlas = gambarGaris(d, W_TABEL, { mulai: B_TABEL + 0.35, durasi: 0.35 });

  /* --- tahap 3: baris masuk ke komputer, lalu keluar lagi sebagai daftar --- */
  const masukKomputer = t(d, { mulai: B_BUKA, durasi: 0.6, dari: 0, ke: 1, ease: E.power2in });
  const keluar = t(d, { mulai: B_TULIS - 0.15, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 4: daftar memanjang, dan tidak pernah selesai --- */
  const tulis = t(d, {
    mulai: B_TULIS,
    durasi: Math.max(0.1, B_TUTUP - B_TULIS),
    dari: 1,
    ke: N_AKHIR,
    ease: E.linear,
  });
  const nTulis = Math.floor(tulis);
  const gulir = Math.max(0, tulis - MUAT) * H_BARIS;

  const daftarAda = Math.min(masukKomputer < 1 ? 0 : 1, keluar);
  const barisTunggal = 1 - masukKomputer;

  /* Baris pertama menyala hijau — dan bertahan hijau sampai akhir. */
  const hijau = t(d, { mulai: B_SELESAI, durasi: 0.35, dari: 0, ke: 1 });

  const iAwal = Math.max(0, Math.floor(gulir / H_BARIS) - 1);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <Komputer x={300} y={830} skala={0.92} opacity={0.55} />

          {/* ---------- tahap 1–2: satu baris yang terbentuk ----------
              Seluruh barisnya turun sebagai satu benda di tahap 3 — garisnya
              ikut, karena yang masuk ke komputer adalah BARISNYA, bukan
              teksnya saja. */}
          <g opacity={barisTunggal} transform={`translate(0 ${masukKomputer * 260})`}>
            <text
              x={263 + (X_KOL_NAMA - 263) * dekat}
              y={Y_BARIS_1}
              fontSize={F_BARIS_1}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              dominantBaseline="middle"
            >
              {NAMA}
            </text>
            <text
              x={1589 - (1589 - X_KOL_NOMOR) * dekat}
              y={Y_BARIS_1}
              fontSize={F_BARIS_1}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              fill="var(--ink-0)"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {NOMOR_LAMA}
            </text>
            {/* pemisah kolom — di tengah, sama seperti tiap baris tahap 4 */}
            <path
              d={`M${X_TABEL} ${Y_BARIS_1 - H_PISAH_1 / 2}v${H_PISAH_1}`}
              stroke="var(--line)"
              strokeWidth={4}
              opacity={0.9}
              {...garisTabel}
            />
            {/* alas baris — tanpa ini bentuknya tidak pernah terbaca sebagai
                satu baris tabel, seberapa pun pemisahnya dirapikan */}
            <path
              d={`M${X_TABEL - W_TABEL / 2} ${Y_BARIS_1 + H_PISAH_1 / 2}h${W_TABEL}`}
              stroke="var(--line)"
              strokeWidth={4}
              strokeLinecap="round"
              opacity={0.9}
              {...garisAlas}
            />
          </g>

          {/* ---------- tahap 4–8: daftar yang tidak pernah benar ---------- */}
          <g opacity={daftarAda}>
            {Array.from({ length: Math.min(nTulis + 1 - iAwal, MUAT + 3) }, (_, k) => {
              const i = iAwal + k;
              if (i > nTulis) return null;
              const y = Y_ATAS + i * H_BARIS - gulir;
              if (y < Y_ATAS - H_BARIS || y > 1010) return null;

              const tBasi = B_GANTI + LAJU_BASI * (i - AMAN);
              const basi = i >= AMAN && d >= tBasi;
              const warna = basi ? "var(--bad)" : i < AMAN ? "var(--ok)" : "var(--ink-1)";
              const kuat = basi ? 1 : i < AMAN ? hijau : 0;

              return (
                <g key={i} transform={`translate(0 ${y})`}>
                  <rect
                    x={X_TABEL - W_TABEL / 2}
                    y={-H_BARIS / 2 + 4}
                    width={W_TABEL}
                    height={H_BARIS - 8}
                    rx={8}
                    fill={basi ? "var(--bad-soft)" : i < AMAN ? "var(--ok-soft)" : "transparent"}
                    opacity={kuat}
                  />
                  <text
                    x={X_TABEL - W_TABEL / 2 + 28}
                    y={0}
                    fontSize={30}
                    fontFamily="var(--font-mono)"
                    fill={warna}
                    dominantBaseline="middle"
                  >
                    {namaBaris(i)}
                  </text>
                  <text
                    x={X_TABEL + W_TABEL / 2 - 28}
                    y={0}
                    fontSize={30}
                    fontFamily="var(--font-mono)"
                    fontWeight={700}
                    fill={warna}
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {nomorBaris(i, basi)}
                  </text>
                  <path
                    d={`M${X_TABEL} ${-H_BARIS / 2 + 8}v${H_BARIS - 16}`}
                    stroke="var(--line)"
                    strokeWidth={3}
                  />
                </g>
              );
            })}

            {/* ekor yang tidak pernah punya ujung — keluar dari bawah frame */}
            <rect
              x={X_TABEL - W_TABEL / 2}
              y={Y_ATAS + (nTulis + 1) * H_BARIS - gulir - H_BARIS / 2}
              width={W_TABEL}
              height={Math.max(0, 1080 - (Y_ATAS + (nTulis + 1) * H_BARIS - gulir))}
              fill="var(--line)"
              opacity={0.18}
            />
          </g>

          {/* Baris "yang di bawah belum sempat ditulis" — kabut di kaki frame,
              supaya ekornya terbaca berlanjut, bukan terpotong bingkai. */}
          <rect
            x={0}
            y={980}
            width={1920}
            height={100}
            fill="var(--bg)"
            opacity={daftarAda * t(d, { mulai: B_SALAH, durasi: 0.5, dari: 0, ke: 0.85 })}
          />
        </svg>
      </div>
    </Scene>
  );
};
