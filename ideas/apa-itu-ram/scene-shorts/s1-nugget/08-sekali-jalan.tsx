/* T01-S1 · scene 8 · sekali-jalan — beat tutup, 7,26 dtk
   Direction: 08-sekali-jalan-direction.md
   VO:        08-sekali-jalan-vo.md

   Di sinilah seluruh Short membayar dirinya: penonton MELIHAT kenapa menyalin
   masuk akal, bukan diberi tahu bahwa ia masuk akal.

   DUA KEPUTUSAN yang tidak boleh diubah tanpa mengubah direction-nya:

   1. Berkasnya DISALIN, bukan dipindah — aslinya wajib tetap terlihat di
      lemari. Animasi yang mengosongkan lemari mengajarkan model mental yang
      salah tanpa satu kata pun diucapkan.
   2. Hitungan diam BERHENTI bertambah selama sambaran berlangsung. Ia angka
      yang sama yang naik sejak scene 1; kalau di sini ia masih naik, seluruh
      Short ini membantah dirinya sendiri.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Ic } from "../../../../shared/Icons";
import { Scene } from "../../../../shared/Stage";
import {
  Chip,
  HitunganDiam,
  Jam,
  Kalender,
  LOMPAT_DIAM,
  T_DIAM,
  TeksAtas,
  TigaTempat,
  X_KOLOM,
  Y_CHIP,
  Y_LEMARI,
  Y_MEJA,
} from "../tiga-tempat";
import { beat, cari } from "./timing.gen";

const ID = "sekali-jalan";

const T_BERANGKAT = beat(ID, 0) + 0.2;
/** Sengaja lebih lambat daripada gerak apa pun di Short ini. Perjalanan ini
 *  memang mahal — itu isi kalimatnya. */
const DUR_JALAN = 1.8;
const T_SAMBAR = beat(ID, 1);

/** Angka yang dibekukan: kelanjutan hitungan diam dari scene 1 dan 2, seluruhnya
 *  DITURUNKAN dari timing — tidak ada satu pun yang diketik. */
const DIAM_BEKU =
  cari("menunggu").durasi - T_DIAM + cari("sekejap").durasi + LOMPAT_DIAM;

/** Sambaran meja → chip. Jedanya memendek; yang membuatnya terbaca "ribuan"
 *  adalah jarak antar-sambaran, bukan cacahnya. */
const JEDA = [0, 0.26, 0.46, 0.61, 0.72, 0.8, 0.86, 0.91, 0.95];
const SAMBAR = JEDA.map((j) => T_SAMBAR + 0.15 + j * 1.9);

const Y_ATAS_MEJA = Y_MEJA - 60;

export const SekaliJalan: React.FC = () => {
  const d = useDetik();

  /** Perjalanan naik lemari → meja. Satu tween, dipakai untuk posisi sekaligus
   *  untuk menjalankan kalender. */
  const jalan = t(d, {
    mulai: T_BERANGKAT,
    durasi: DUR_JALAN,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });

  const y = Y_LEMARI + (Y_ATAS_MEJA - Y_LEMARI) * jalan;

  /* Kalender berjalan SELAMA berkas bergerak dan berhenti saat ia mendarat —
     tiga bulan itu perjalanannya, bukan hitungan yang jalan sendiri. */
  const mUkur = t(d, { mulai: T_SAMBAR, durasi: 0.4, dari: 0, ke: 1, ease: E.power2out });

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        {d < T_SAMBAR ? (
          "sekali jalan"
        ) : (
          <span style={{ color: "var(--accent-ink)" }}>ribuan kali</span>
        )}
      </TeksAtas>

      <Chip redup={d < T_SAMBAR} />
      <TigaTempat terang={(x) => (d < T_SAMBAR ? x === "lemari" : x === "meja")} />

      {/* alat ukur turun lagi dari kalender ke jam: yang diukur bukan lagi
          perjalanannya, melainkan pemakaiannya */}
      <Kalender lembar={2 * jalan} opacity={1 - mUkur} />
      <Jam sudut={366 * mUkur} skala={0.6 + 0.4 * mUkur} opacity={mUkur} />

      {/* berkas ASLI — tidak pernah meninggalkan lemari */}
      <div style={{ position: "absolute", left: X_KOLOM - 30, top: Y_LEMARI - 30 }}>
        <Ic n="file" ukuran="sm" warna="c-mute" />
      </div>

      {/* salinannya, naik ke meja */}
      <div
        style={{
          position: "absolute",
          left: X_KOLOM - 30,
          top: y - 30,
          opacity: t(d, { mulai: T_BERANGKAT, durasi: 0.2, dari: 0, ke: 1 }),
        }}
      >
        <Ic n="file" ukuran="sm" warna="c-accent" />
      </div>

      {/* sambaran meja → chip */}
      {SAMBAR.map((m) => {
        const u = t(d, { mulai: m, durasi: 0.12, dari: 0, ke: 1, ease: E.linear });
        const habis = t(d, { mulai: m + 0.12, durasi: 0.1, dari: 1, ke: 0 });
        return (
          <div
            key={m}
            style={{
              position: "absolute",
              left: X_KOLOM - 3,
              top: Y_ATAS_MEJA - (Y_ATAS_MEJA - (Y_CHIP + 110)) * u,
              width: 6,
              height: 44,
              borderRadius: 3,
              background: "var(--ok)",
              opacity: u > 0 ? habis : 0,
            }}
          />
        );
      })}

      <HitunganDiam
        nilai={DIAM_BEKU}
        opacity={0.55 + 0.45 * (1 - mUkur)}
      />
    </Scene>
  );
};
