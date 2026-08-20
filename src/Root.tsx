/* Daftar komposisi Remotion.

   Selain episode utuh, SETIAP scene didaftarkan sebagai komposisi sendiri.
   Itulah inti HARD RULE 1: satu scene bisa dibuka, di-scrub, dan dirender
   satuan — tanpa menggulir enam menit untuk memeriksa satu scene.

   ID komposisi scene = NAMA BERKASNYA, persis (berprefiks kode topik):

     ideas/tcp-ip/scenes/06-jadi-paket.tsx
     npx remotion still t18-06-jadi-paket out/paket.png

   Satu bentuk untuk berkas, id komposisi, dan baris di sidebar Studio. Nomornya
   dihitung tools/bangun-timing.mjs dari urutan di naskah dan dipakai apa adanya
   di sini — tidak ada tempat kedua yang bisa salah hitung.

   Opening & closing ikut dapat komposisi walaupun komponennya milik shared/;
   keduanya justru yang paling perlu diperiksa satuan, karena kalau rusak SEMUA
   episode ikut rusak.

   SHORTS & THUMBNAIL didaftarkan di sini juga, tapi baru lahir di fase 3 dan
   fase 4 sebuah topik (CLAUDE.md § Fase kerja) — jadi selama belum ada topik
   yang sampai ke sana, tidak ada satu pun di berkas ini. Bentuknya saat kembali:
   satu `<Folder>` Studio per Short, id scene BERPREFIKS `<kode>-s1-`/`-s2-`
   supaya tidak berebut ruang nama dengan scene video panjang, dan ukurannya 9:16
   — bukan 16:9 yang diputar, karena kotak aman dan skala tipografinya berbeda
   (`.r-9x16` di shared/theme.css). Thumbnail 16:9 dan kover Short 9:16 masing-
   masing komposisi tersendiri, ukurannya dari `CFG.THUMB_*`.

     npx remotion studio                         -> semua komposisi di sidebar
     npx remotion render t18-06-jadi-paket       -> satu scene saja
     npx remotion render T18-tcp-ip              -> episode utuh (npm run render:t18)
*/
import type React from "react";
import { Composition, Folder } from "remotion";

import { CFG, FPS, f } from "../shared/config.gen";
import { Panggung, type Rasio } from "../shared/Stage";
import { KontakFigur } from "../shared/figures/Kontak";
import { TrekVO } from "../shared/Vo";

import {
  Episode as EpisodeT18,
  isiScene as isiSceneT18,
} from "../ideas/tcp-ip/Episode";
import {
  TIMING as TIMING_T18,
  TOTAL as TOTAL_T18,
  cari as cariT18,
  type Timing,
} from "../ideas/tcp-ip/timing.gen";
import {
  Short as ShortT18S1,
  isiScene as isiSceneT18S1,
} from "../ideas/tcp-ip/scene-shorts/s1-alamat/Short";
import {
  TIMING as TIMING_T18S1,
  TOTAL as TOTAL_T18S1,
  cari as cariT18S1,
} from "../ideas/tcp-ip/scene-shorts/s1-alamat/timing.gen";
import {
  Short as ShortT18S2,
  isiScene as isiSceneT18S2,
} from "../ideas/tcp-ip/scene-shorts/s2-potongan/Short";
import {
  TIMING as TIMING_T18S2,
  TOTAL as TOTAL_T18S2,
  cari as cariT18S2,
} from "../ideas/tcp-ip/scene-shorts/s2-potongan/timing.gen";
import {
  Short as ShortT18S3,
  isiScene as isiSceneT18S3,
} from "../ideas/tcp-ip/scene-shorts/s3-hilang/Short";
import {
  TIMING as TIMING_T18S3,
  TOTAL as TOTAL_T18S3,
  cari as cariT18S3,
} from "../ideas/tcp-ip/scene-shorts/s3-hilang/timing.gen";
import {
  Short as ShortT18S4,
  isiScene as isiSceneT18S4,
} from "../ideas/tcp-ip/scene-shorts/s4-beda/Short";
import {
  TIMING as TIMING_T18S4,
  TOTAL as TOTAL_T18S4,
  cari as cariT18S4,
} from "../ideas/tcp-ip/scene-shorts/s4-beda/timing.gen";
import { ThumbT18 } from "../ideas/tcp-ip/thumb";
import { ThumbS1 } from "../ideas/tcp-ip/scene-shorts/thumb-s1";
import { ThumbS2 } from "../ideas/tcp-ip/scene-shorts/thumb-s2";
import { ThumbS3 } from "../ideas/tcp-ip/scene-shorts/thumb-s3";
import { ThumbS4 } from "../ideas/tcp-ip/scene-shorts/thumb-s4";

const UKURAN_16x9 = {
  width: CFG.LONG_WIDTH,
  height: CFG.LONG_HEIGHT,
} as const;

/** 9:16 untuk Shorts. BUKAN 16:9 yang diputar — kotak aman dan skala
 *  tipografinya berbeda (`.r-9x16` di shared/theme.css). */
const UKURAN_9x16 = {
  width: CFG.SHORT_WIDTH,
  height: CFG.SHORT_HEIGHT,
} as const;

/** Kartu thumbnail — ukurannya BUKAN ukuran videonya (docs/06): 1280x720 untuk
 *  16:9, dan 2160x3840 untuk kover Short, angka yang disebut halaman bantuan
 *  YouTube. Keduanya dari .env lewat CFG.THUMB_*. */
const UKURAN_THUMB = {
  width: CFG.THUMB_WIDTH,
  height: CFG.THUMB_HEIGHT,
} as const;
const UKURAN_THUMB_SHORT = {
  width: CFG.THUMB_SHORT_WIDTH,
  height: CFG.THUMB_SHORT_HEIGHT,
} as const;

/** Pabrik komponen "satu scene berdiri sendiri di panggung penuh".
 *
 *  Dipanggil di lingkup modul, jadi tiap komponen yang dihasilkan identitasnya
 *  STABIL — bukan arrow function yang dibuat ulang tiap render, yang akan
 *  membuat Studio me-remount scene setiap kali daftar komposisi dihitung ulang.
 *
 *  Trek suaranya sama persis dengan yang dipakai di keluaran utuh — subtitel
 *  preview selama berkas VO scene itu belum ada, suaranya begitu ada. Kalau
 *  di sini beda, memeriksa scene satuan berhenti membuktikan apa pun tentang
 *  scene yang sama di dalam episode. */
const buatSceneSolo = (
  isi: (t: Timing) => React.ReactNode,
  cariScene: (kunci: string) => Timing,
  rasio: Rasio,
): React.FC<{ kunci: string; subtitel?: boolean }> => {
  const Solo: React.FC<{ kunci: string; subtitel?: boolean }> = ({
    kunci,
    subtitel = true,
  }) => {
    const t = cariScene(kunci);
    return (
      <Panggung rasio={rasio}>
        {isi(t)}
        <TrekVO audio={t.voAudio} beat={t.beat} aktif={subtitel} />
      </Panggung>
    );
  };
  return Solo;
};

const SceneSoloT18 = buatSceneSolo(isiSceneT18, cariT18, "16x9");
const SceneSoloT18S1 = buatSceneSolo(isiSceneT18S1, cariT18S1, "9x16");
const SceneSoloT18S2 = buatSceneSolo(isiSceneT18S2, cariT18S2, "9x16");
const SceneSoloT18S3 = buatSceneSolo(isiSceneT18S3, cariT18S3, "9x16");
const SceneSoloT18S4 = buatSceneSolo(isiSceneT18S4, cariT18S4, "9x16");

/* SHORTS — belum ada satu pun yang terdaftar: T15 masih di fase 2.
   Bentuknya saat kembali (dipakai T14 sampai ia tayang) adalah satu daftar
   `{ id, folder, prefiks, Komponen, TIMING, TOTAL, Solo }`, di-`map` jadi
   `<Folder>` berisi Short utuh + tiap scene-nya, ukuran UKURAN_9x16, dan
   `Solo: buatSceneSolo(isiScene…, cari…, "9x16")`.

   PREFIKS ID KOMPOSISI BUKAN HIASAN, dan ia punya DUA lapis:

     t15-s1-09-loop        Short 1 T15
     t15-05-dikunci-semua  scene video panjang T15

   Lapis pertama (`s1`/`s2`) memisahkan Short dari video panjang — tanpa itu
   `01-hook` milik Short dan `01-hook-question` milik episode berebut ruang nama
   yang sama. Lapis kedua (`t15`) memisahkan episode dari episode: `09-loop` dan
   `99-closing` ada di Short 1 SETIAP episode, dan Remotion menolak dua komposisi
   dengan id yang sama — saat render, bukan saat tsc. Alasan yang sama persis
   dengan prefiks `t15-` pada scene video panjangnya.

   Nama folder Studio hanya boleh a-z A-Z 0-9 dan tanda hubung — Remotion
   menolak spasi dan titik tengah, dan menolaknya saat RENDER, bukan saat tsc.

   Konvensinya: CLAUDE.md HARD RULE 1 · docs/02 § Di mana berkasnya. */

export const RemotionRoot: React.FC = () => (
  <>
    {/* ---------- Lembar kontak shared/figures ----------
        Bukan milik episode mana pun. Figur bersama tidak punya scene yang bisa
        dipakai memeriksanya, jadi tanpa komposisi ini cacat proporsi atau titik
        tumpu baru ketahuan setelah ada yang membangun scene di atasnya.

          npx remotion still figur-kontak out/figur.png                     */}
    <Composition
      id="figur-kontak"
      component={KontakFigur}
      durationInFrames={1}
      fps={FPS}
      {...UKURAN_16x9}
    />


    {/* ---------- T18 · Apa Itu TCP/IP? ----------

        KODE T18 MASIH PROVISIONAL. Topiknya masih `mentah` di
        ideas/tcp-ip/ide.md dan belum masuk docs/07; T18 dipakai karena id
        komposisi butuh awalan yang stabil SEKARANG. BUKAN T16 (dibatalkan
        2026-08-17) dan BUKAN T17 (enkripsi — tayang lalu dikeluarkan
        2026-08-18); keduanya sudah terpakai dan kodenya
        tidak pernah dipakai ulang.

        EPISODE INI DIBANGUN DARI STORYBOARD USULAN, atas keputusan user
        2026-08-18. Sebagian aturan yang mengikat episode lain sengaja tidak
        berlaku di sini — daftarnya di ideas/tcp-ip/naskah.md § Penyimpangan
        tercatat. Jangan "merapikannya" tanpa keputusan baru.

        Shorts-nya belum ada: keempatnya fase 3, dan subfolder
        scene-shorts/ belum dibuat. Selama belum ada, `npm run gen` tidak
        membaca bagian Short di naskah sama sekali. */}
    <Composition
      id="T18-tcp-ip"
      component={EpisodeT18}
      defaultProps={{ subtitel: true }}
      durationInFrames={f(TOTAL_T18)}
      fps={FPS}
      {...UKURAN_16x9}
    />

    <Folder name="scene-t18">
      {TIMING_T18.map((t) => (
        <Composition
          key={t.kunci}
          id={`t18-${t.kunci}`}
          component={SceneSoloT18}
          defaultProps={{ kunci: t.kunci, subtitel: true }}
          durationInFrames={Math.max(1, f(t.durasi))}
          fps={FPS}
          {...UKURAN_16x9}
        />
      ))}
    </Folder>

    {/* ---------- T18 · Shorts ----------

        Keempatnya lahir di fase 3, setelah video panjangnya tuntas
        (CLAUDE.md § Fase kerja satu topik). Ukurannya 9:16 — BUKAN 16:9 yang
        diputar: kotak aman dan skala tipografinya berbeda (`.r-9x16`).

        Id scene berprefiks DUA LAPIS (`t18-s3-`): lapis `s3` memisahkan Short
        dari video panjang, lapis `t18` memisahkan topik dari topik. `99-closing`
        ada di SETIAP Short setiap topik, dan Remotion menolak dua komposisi
        dengan id yang sama — saat RENDER, bukan saat tsc. */}
    {(
      [
        { n: 1, judul: "alamat", Komponen: ShortT18S1, TIMING: TIMING_T18S1, TOTAL: TOTAL_T18S1, Solo: SceneSoloT18S1 },
        { n: 2, judul: "potongan", Komponen: ShortT18S2, TIMING: TIMING_T18S2, TOTAL: TOTAL_T18S2, Solo: SceneSoloT18S2 },
        { n: 3, judul: "hilang", Komponen: ShortT18S3, TIMING: TIMING_T18S3, TOTAL: TOTAL_T18S3, Solo: SceneSoloT18S3 },
        { n: 4, judul: "beda", Komponen: ShortT18S4, TIMING: TIMING_T18S4, TOTAL: TOTAL_T18S4, Solo: SceneSoloT18S4 },
      ] as const
    ).map((s) => (
      <Folder key={s.n} name={`t18-s${s.n}-${s.judul}`}>
        <Composition
          id={`T18-tcp-ip-s${s.n}`}
          component={s.Komponen}
          defaultProps={{ subtitel: true }}
          durationInFrames={f(s.TOTAL)}
          fps={FPS}
          {...UKURAN_9x16}
        />
        {s.TIMING.map((t) => (
          <Composition
            key={t.kunci}
            id={`t18-s${s.n}-${t.kunci}`}
            component={s.Solo}
            defaultProps={{ kunci: t.kunci, subtitel: true }}
            durationInFrames={Math.max(1, f(t.durasi))}
            fps={FPS}
            {...UKURAN_9x16}
          />
        ))}
      </Folder>
    ))}

    {/* ---------- T18 · thumbnail & kover ----------
        Brief: ideas/tcp-ip/thumbnail.md (fase 1). ARAHNYA SATU: brief -> kartu.
        Durasinya 1 frame — ini kartu diam, bukan video.

        Ukurannya BUKAN ukuran videonya (docs/06): 1280x720 untuk 16:9 dan
        2160x3840 untuk kover Short, keduanya dari .env lewat CFG.THUMB_*. */}

    <Composition
      id="T18-thumb"
      component={ThumbT18}
      durationInFrames={1}
      fps={FPS}
      {...UKURAN_THUMB}
    />
    <Folder name="thumb-t18-shorts">
      <Composition
        id="T18-thumb-s1"
        component={ThumbS1}
        durationInFrames={1}
        fps={FPS}
        {...UKURAN_THUMB_SHORT}
      />
      <Composition
        id="T18-thumb-s2"
        component={ThumbS2}
        durationInFrames={1}
        fps={FPS}
        {...UKURAN_THUMB_SHORT}
      />
      <Composition
        id="T18-thumb-s3"
        component={ThumbS3}
        durationInFrames={1}
        fps={FPS}
        {...UKURAN_THUMB_SHORT}
      />
      <Composition
        id="T18-thumb-s4"
        component={ThumbS4}
        durationInFrames={1}
        fps={FPS}
        {...UKURAN_THUMB_SHORT}
      />
    </Folder>






  </>
);
