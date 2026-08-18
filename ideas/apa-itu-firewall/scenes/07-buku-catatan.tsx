/* T15 · scene 7 · buku-catatan — bagian 5 [why], 30,39 dtk
   VO:        07-buku-catatan-vo.md
   Direction: 07-buku-catatan-direction.md

   SCENE PALING PENTING DI EPISODE. Ia menjawab hal yang scene 5 nyatakan
   mustahil: membedakan kiriman yang ditunggu dari orang asing, padahal dari luar
   keduanya terlihat sama persis.

   TIGA KEPUTUSAN:

   1. Buku dan daftar WAJIB terbaca sebagai dua benda berbeda. Daftar tegak dan
      berwarna; buku terbuka dua halaman dan abu-abu. Kalau keduanya mirip,
      penonton cuma dapat "penjaganya punya kertas" dan bagian 5 kehilangan
      alasannya.

   2. Daftar TIDAK dihilangkan dari layar, cuma diredupkan. Scene 8
      mengembalikannya ke depan, dan penonton harus tahu ia tidak pernah pergi.

   3. Kiriman di tahap 5 berangkat dari DALAM, jadi arahnya kanan ke kiri —
      satu-satunya benda di scene ini yang melawan arah panggung. Arah itu yang
      menjelaskan seluruh mekanismenya tanpa satu kata pun.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  Buku,
  Daftar,
  GEDUNG,
  Gedung,
  JALUR_Y,
  Ketukan,
  Lantai,
  N_PINTU,
  P_BUKU,
  P_DAFTAR,
  SKALA_DAFTAR_SISI,
  Penjaga,
  X_GEDUNG,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
  kamera,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "buku-catatan";

const B_BELUM = beat(ID, 0); // "Tapi daftar tadi belum menjawab satu hal."
const B_TETAP = beat(ID, 1); // "Kiriman yang kamu tunggu tetap datang dari luar…"
const B_TANGAN = beat(ID, 2); // "Sekarang lihat tangan kirinya."
const B_BUKU = beat(ID, 3); // "Ada buku kecil di situ…"
const B_TULIS = beat(ID, 4); // "Tiap kali kamu mengirim sesuatu keluar…"
const B_ISI = beat(ID, 5); // "Ke mana perginya, dan dari pintu mana…"
const B_PULANG = beat(ID, 6); // "Waktu jawabannya pulang, dia tinggal mencocokkan."
const B_MASUK = beat(ID, 7); // "Ada barisnya, silakan masuk."
const B_BUKAN = beat(ID, 8); // "Tidak ada barisnya, kamu bukan jawaban siapa-siapa."

const X_DINDING = X_GEDUNG - GEDUNG.w / 2;
/** Dua benda identik menunggu di sisi LUAR penjaga, di jalur ketukan — bukan di
 *  sisi buku. Keduanya harus berdampingan dan tidak menyentuh badan penjaga. */
const X_TUNGGU_A = X_PENJAGA - 150;
const X_TUNGGU_B = X_PENJAGA - 290;

const PINTU_TETAP = Array.from({ length: N_PINTU }, () => ({ nyala: 0.35 }));

export const BukuCatatan: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: daftar mundur ke belakang, tidak hilang --- */
  const mundur = t(d, { mulai: B_BELUM, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 2: dua benda identik berdiri lagi --- */
  const berdiri = t(d, { mulai: B_TETAP, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 3: kamera turun ke tangan kiri --- */
  const dekat = t(d, { mulai: B_TANGAN, durasi: 0.9, dari: 0, ke: 1, ease: E.expoOut });
  const balik = t(d, { mulai: B_PULANG - 0.4, durasi: 0.8, dari: 0, ke: 1, ease: E.expoOut });
  const zoom = dekat * (1 - balik);

  /* --- tahap 4: buku terbuka --- */
  const buka = t(d, { mulai: B_BUKU, durasi: 0.6, dari: 0, ke: 1, ease: E.backOut(1.2) });

  /* --- tahap 5: kiriman berangkat dari DALAM ke luar, baris tertulis --- */
  const keluar = t(d, { mulai: B_TULIS, durasi: 1.35, dari: 0, ke: 1, ease: E.power2in });
  const garis1 = gambarGaris(d, 76, { mulai: B_TULIS + 0.25, durasi: 0.8 });
  const garis2 = gambarGaris(d, 76, { mulai: B_ISI + 0.1, durasi: 0.7 });

  /* --- tahap 7 & 8: jawabannya pulang, dicocokkan, lewat --- */
  const pulang = t(d, { mulai: B_PULANG, durasi: 1.3, dari: 0, ke: 1, ease: E.power1out });
  const cocok = t(d, { mulai: B_MASUK - 0.25, durasi: 0.5, dari: 0, ke: 1 });
  const masuk2 = t(d, { mulai: B_MASUK + 0.2, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 9: benda kedua maju, bukunya kosong, ia berbalik --- */
  const maju = t(d, { mulai: B_BUKAN, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });
  const pergi = t(d, { mulai: B_BUKAN + 1.0, durasi: 1.1, dari: 0, ke: 1, ease: E.power2in });

  const xKedua = X_TUNGGU_B + (X_PENJAGA - 130 - X_TUNGGU_B) * maju - 620 * pergi;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ x: P_BUKU.x, y: P_BUKU.y, skala: 1 + 0.42 * zoom })}>
            <Lantai />
            <Gedung pintu={PINTU_TETAP} />
            <Penjaga x={X_PENJAGA} y={Y_LANTAI} hadap={1} />

            {/* daftar: mundur, tapi tetap di layar sepanjang scene */}
            <g opacity={1 - 0.65 * mundur}>
              <Daftar
                x={P_DAFTAR.x}
                y={P_DAFTAR.y}
                skala={SKALA_DAFTAR_SISI - 0.04 * mundur}
                baris={4}
                akhirNyala={0.35}
              />
            </g>

            {/* --- tahap 5: kiriman berangkat dari dalam, melawan arah panggung --- */}
            <Ketukan
              x={X_DINDING - (X_DINDING - X_LUAR) * keluar}
              y={JALUR_Y - 130}
              skala={0.75}
              opacity={keluar > 0 && keluar < 1 ? 1 : 0}
              warna={AKSEN}
            />

            {/* --- tahap 2 & 9: dua benda identik, komponen yang sama --- */}
            <Ketukan
              x={X_TUNGGU_A + (X_LUAR - X_TUNGGU_A) * 0 + pulang * 0}
              y={JALUR_Y}
              skala={0.85}
              opacity={berdiri * (1 - pulang)}
            />
            <Ketukan x={xKedua} y={JALUR_Y + 8} skala={0.85} opacity={berdiri * (1 - pergi)} />

            {/* --- tahap 7 & 8: jawaban pulang lalu lewat ke dalam --- */}
            <Ketukan
              x={X_LUAR + (X_TUNGGU_A - X_LUAR) * pulang + (X_GEDUNG - X_TUNGGU_A) * masuk2}
              y={JALUR_Y}
              skala={0.85}
              opacity={pulang > 0 ? 1 - masuk2 * 0.85 : 0}
            />

            {/* --- tahap 4: buku catatan di tangan kiri --- */}
            <g
              transform={`translate(${P_BUKU.x} ${P_BUKU.y}) scale(${buka} 1) translate(${-P_BUKU.x} ${-P_BUKU.y})`}
            >
              <Buku
                x={P_BUKU.x}
                y={P_BUKU.y}
                skala={0.62}
                opacity={buka}
                baris={0}
                cocok={cocok}
              />
              {/* baris yang DITULIS, bukan yang muncul — dua bagian, dua tahap */}
              <g transform={`translate(${P_BUKU.x} ${P_BUKU.y}) scale(0.62)`}>
                <path
                  d="M-100 -38h76"
                  stroke={cocok > 0 ? AKSEN : "var(--ink-2)"}
                  strokeWidth={7}
                  strokeLinecap="round"
                  {...garis1}
                />
                <path
                  d="M24 -38h76"
                  stroke={cocok > 0 ? AKSEN : "var(--ink-2)"}
                  strokeWidth={7}
                  strokeLinecap="round"
                  {...garis2}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
