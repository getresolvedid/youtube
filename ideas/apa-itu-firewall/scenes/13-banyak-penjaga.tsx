/* T15 · scene 13 · banyak-penjaga — bagian 6 [explaining], 30,84 dtk
   VO:        13-banyak-penjaga-vo.md
   Direction: 13-banyak-penjaga-direction.md

   TITIK PUTUS ANALOGI NOMOR TIGA (`naskah.md`): sepanjang episode penonton
   memegang gambaran satu penjaga, dan gambaran itu perlu dilepas sebelum
   bagian 7.

   KAMERA MUNDUR UNTUK KEDUA KALINYA di episode ini — yang pertama di scene 1,
   mengubah laptop jadi gedung; yang ini mengubah gedung jadi satu bangunan di
   antara banyak. Gerakan yang sama, membalik subjek yang berbeda.

   TAHAP 8 SENGAJA TIDAK MENGGAMBAR GARIS PENGHUBUNG antar penjaga. Ketiadaan
   garis itu isi barisnya: mereka tidak saling bertanya. Kalau digambar
   terhubung, penonton pulang dengan gambaran satu sistem berlapis yang
   terkoordinasi — kebalikan dari kenyataannya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  ABU,
  Daftar,
  GEDUNG,
  Gedung,
  JALUR_Y,
  Ketukan,
  Lantai,
  N_PINTU,
  Penjaga,
  X_GEDUNG,
  X_LUAR,
  X_PENJAGA,
  Y_LANTAI,
  kamera,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "banyak-penjaga";

const B_TIDAK1 = beat(ID, 0); // "Dan penjaga kedua tadi bukan pengecualian."
const B_MUNDUR = beat(ID, 1); // "Mundur sedikit, lihat lebih luas."
const B_GERBANG = beat(ID, 2); // "Ada satu di gerbang depan…"
const B_RUMAH = beat(ID, 3); // "Ada satu lagi menempel di pintu rumahmu sendiri."
const B_SEWAAN = beat(ID, 4); // "Di gedung sewaan, tiap kamar punya penjaganya…"
const B_BEDA = beat(ID, 5); // "Mereka tidak saling bertanya…"
const B_JADI = beat(ID, 6); // "Jadi yang satu menolak, yang lain mempersilakan…"
const B_CUKUP = beat(ID, 7); // "Punya penjaga tidak pernah cukup jadi jawaban."
const B_MANA = beat(ID, 8); // "Yang mana dulu."

const X_GERBANG = 300;
const X_SEWAAN = 1720;

const PINTU_TETAP = Array.from({ length: N_PINTU }, () => ({ nyala: 0.4 }));

export const BanyakPenjaga: React.FC = () => {
  const d = useDetik();

  /* --- tahap 2: kamera mundur jauh --- */
  const mundur = t(d, { mulai: B_MUNDUR, durasi: 1.4, dari: 0, ke: 1, ease: E.expoOut });
  /* Mundurnya berhenti di 0,68, bukan di 0,52. Di 0,52 semua bangunan menyusut
     sampai cuma mengisi sepertiga tinggi frame dan panggungnya jadi pita tipis
     di atas garis lantai — ruang kosongnya lebih besar daripada isinya. */
  const skala = 1 - 0.32 * mundur;

  /* --- tahap 3: gerbang komplek, dengan penjaganya sendiri --- */
  const gerbang = masuk(d, { mulai: B_GERBANG, durasi: 0.7, geser: 0 });

  /* --- tahap 4: penjaga asli, tetap di pintunya --- */
  const rumah = t(d, { mulai: B_RUMAH, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 5: gedung sewaan, penjaga di tiap kamar --- */
  const sewaan = t(d, { mulai: B_SEWAAN, durasi: 0.9, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 6: tiga daftar berdampingan, bersamaan --- */
  const daftar = masuk(d, { mulai: B_BEDA, durasi: 0.6, geser: 14 });

  /* --- tahap 7: satu ketukan lewat gerbang, ditolak di pintu rumah --- */
  const lewatGerbang = t(d, { mulai: B_JADI, durasi: 1.1, dari: 0, ke: 1, ease: E.power1out });
  const ditolak = t(d, { mulai: B_JADI + 1.2, durasi: 1.0, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 8 & 9: ketiganya menyala, lalu tinggal begitu --- */
  const nyala = t(d, { mulai: B_CUKUP, durasi: 0.6, dari: 0, ke: 1 });
  const tahan = t(d, { mulai: B_MANA, durasi: 0.5, dari: 0, ke: 1 });

  const xKetuk =
    X_GERBANG + (X_PENJAGA - 200 - X_GERBANG) * lewatGerbang - 420 * ditolak;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Titik tumpu kamera ada di GARIS LANTAI, bukan di tengah dinding:
              yang mengecil harus gedungnya, bukan lantainya. Dengan tumpu di
              tengah dinding, seluruh panggung ikut naik dan menyisakan separuh
              frame bawah kosong — ketahuan di render still, bukan dari
              pemeriksaan mana pun. */}
          <g transform={kamera({ x: 960, y: Y_LANTAI, skala })}>
            <Lantai />
            <Gedung pintu={PINTU_TETAP} />

            {/* penjaga kedua dari scene 12, masih terlihat sekilas lalu memudar
                — dialah yang dijemput baris pertama VO scene ini */}
            <Penjaga
              x={X_GEDUNG + 330}
              y={Y_LANTAI}
              hadap={1}
              skala={0.86}
              opacity={0.55 * t(d, { mulai: B_TIDAK1 + 0.6, durasi: 0.9, dari: 1, ke: 0 })}
            />

            {/* penjaga asli — TIDAK boleh hilang saat kamera mundur, karena
                scene 14 kembali ke dia */}
            <Penjaga
              x={X_PENJAGA}
              y={Y_LANTAI}
              hadap={1}
              opacity={0.55 + 0.45 * Math.max(rumah, 1 - mundur)}
            />

            {/* --- tahap 3: gerbang komplek --- */}
            <g style={{ opacity: gerbang.opacity }}>
              <path
                d={`M${X_GERBANG - 130} ${Y_LANTAI}v-330h260v330`}
                fill="none"
                stroke={ABU}
                strokeWidth={7}
                strokeLinejoin="round"
              />
              <Penjaga x={X_GERBANG} y={Y_LANTAI} hadap={1} skala={1.05} />
            </g>

            {/* --- tahap 5: gedung sewaan, penjaga di tiap kamar --- */}
            <g opacity={sewaan}>
              <rect
                x={X_SEWAAN - 150}
                y={Y_LANTAI - 620}
                width={300}
                height={620}
                rx={12}
                fill="var(--bg-elev)"
                stroke={ABU}
                strokeWidth={6}
              />
              {/* Tiap kamar digeser lewat SATU transform. Menaruh `-k * 200` di
                  transform DAN di `y` menggandakan pergeserannya, dan penjaga
                  kamar teratas melayang di atas atap — ketahuan di render still,
                  bukan dari pemeriksaan mana pun. */}
              {[0, 1, 2].map((k) => (
                <g key={k} transform={`translate(0 ${-k * 200})`}>
                  <path
                    d={`M${X_SEWAAN - 150} ${Y_LANTAI - 200}h300`}
                    stroke={ABU}
                    strokeWidth={4}
                    opacity={0.5}
                  />
                  <Penjaga x={X_SEWAAN - 60} y={Y_LANTAI - 30} hadap={1} skala={0.44} />
                </g>
              ))}
            </g>

            {/* --- tahap 6: tiga daftar, jelas tidak sama --- */}
            <g style={{ opacity: daftar.opacity, transform: daftar.transform }}>
              <Daftar x={X_GERBANG} y={Y_LANTAI - 400} skala={0.34} baris={2} akhirNyala={0.6} />
              <Daftar x={X_PENJAGA} y={Y_LANTAI - 400} skala={0.34} baris={4} akhirNyala={0.6} />
              <Daftar x={X_SEWAAN} y={Y_LANTAI - 660} skala={0.34} baris={3} akhirNyala={0.6} />
            </g>

            {/* --- tahap 7: ketukan yang SAMA, diperlakukan berbeda --- */}
            <Ketukan
              x={xKetuk}
              y={JALUR_Y}
              skala={0.78}
              opacity={lewatGerbang > 0 ? 1 : 0}
            />

            {/* --- tahap 8 & 9: ketiganya menyala. Tidak ada garis penghubung. --- */}
            <g opacity={0.5 * nyala * (0.6 + 0.4 * tahan)}>
              {[X_GERBANG, X_PENJAGA, X_SEWAAN - 60].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={Y_LANTAI - 116 - (i === 2 ? 30 : 0)}
                  r={64}
                  fill="none"
                  stroke="var(--accent-ink)"
                  strokeWidth={5}
                />
              ))}
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
