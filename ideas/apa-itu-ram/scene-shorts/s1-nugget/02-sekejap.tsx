/* T01-S1 · scene 2 · sekejap — beat hook lanjutan, 6,4 dtk
   Direction: 02-sekejap-direction.md
   VO:        02-sekejap-vo.md

   Kesinambungan dari 01-menunggu: chip mulai persis di posisi & ukuran akhir
   scene sebelumnya, dan hitungan diam melanjutkan angka yang sama. Potongan
   antar-scene keras (docs/02), jadi kesinambungan itu satu-satunya yang
   menyambungkan keduanya jadi satu ruangan.

   Yang di ujung garis panggil TIDAK diperlihatkan — tempatnya baru berdiri di
   03-satu-detik, dan memperlihatkannya di sini membuang undangan scene itu.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Chip,
  HitunganDiam,
  LOMPAT_DIAM,
  T_DIAM,
  TeksAtas,
  X_KOLOM,
  Y_CHIP,
} from "../tiga-tempat";
import { beat, cari } from "./timing.gen";

const ID = "sekejap";

/** Angka yang ditinggalkan 01-menunggu di frame terakhirnya. DITURUNKAN, bukan
 *  diketik: kalau kalimat VO scene 1 berubah panjang, angka ini ikut sendiri —
 *  dan hitungan yang melompat mundur di potongan scene adalah persis jenis
 *  kesalahan yang tidak terlihat saat menggarap satu berkas. */
const AWAL = cari("menunggu").durasi - T_DIAM;

/** Kedua tahap dipatok ke beat VO-nya, bukan ke angka tangan: begitu kalimatnya
 *  diubah, garis panggil dan berhentinya denyut ikut bergeser sendiri. */
const T_PANGGIL = beat(ID, 0);
const T_BERHENTI = beat(ID, 1);

/** Panjang garis panggil: dari bawah chip sampai keluar bingkai bawah. */
const PANJANG = 1920 - (Y_CHIP + 120);

export const Sekejap: React.FC = () => {
  const d = useDetik();

  const garis = gambarGaris(d, PANJANG, {
    mulai: T_PANGGIL + 0.1,
    durasi: 0.5,
    ease: E.power2out,
  });

  /* Hitungan melompat, tidak merayap: merayap terbaca sebagai stopwatch,
     melompat terbaca sebagai "banyak yang terlewat". Lompatannya satu tween
     pendek yang ditambahkan ke jalannya yang normal, jadi nilainya tetap
     fungsi murni dari frame — tidak ada angka yang disimpan antar-frame. */
  const lompat = t(d, { mulai: T_BERHENTI, durasi: 0.12, dari: 0, ke: LOMPAT_DIAM });

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        {d < T_BERHENTI ? (
          "butuh sesuatu yang jauh"
        ) : (
          <span style={{ color: "var(--warn)" }}>berhenti</span>
        )}
      </TeksAtas>

      {/* garis panggil — putus-putus, karena di ujung sana belum ada apa-apa
          yang boleh diperlihatkan */}
      <svg
        style={{
          position: "absolute",
          left: X_KOLOM - 40,
          top: Y_CHIP + 120,
          width: 80,
          height: PANJANG,
          overflow: "visible",
        }}
      >
        <line
          x1={40}
          y1={0}
          x2={40}
          y2={PANJANG}
          stroke="var(--ink-2)"
          strokeWidth={5}
          strokeDasharray={garis.strokeDasharray}
          strokeDashoffset={garis.strokeDashoffset}
        />
      </svg>

      <Chip skala={1} />
      <HitunganDiam nilai={AWAL + d + lompat} />
    </Scene>
  );
};
