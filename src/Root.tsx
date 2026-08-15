/* Daftar komposisi Remotion.

   Selain episode utuh, SETIAP scene didaftarkan sebagai komposisi sendiri.
   Itulah inti HARD RULE 1: satu scene bisa dibuka, di-scrub, dan dirender
   satuan — tanpa menggulir enam menit untuk memeriksa satu scene.

   ID komposisi scene = NAMA BERKASNYA, persis:

     ideas/apa-itu-ram/scenes/01-hook-question.tsx
     npx remotion still 01-hook-question out/hook.png

   Satu bentuk untuk berkas, id komposisi, dan baris di sidebar Studio. Nomornya
   dihitung tools/bangun-timing.mjs dari urutan di naskah dan dipakai apa adanya
   di sini — tidak ada tempat kedua yang bisa salah hitung.

   Opening & closing ikut dapat komposisi walaupun komponennya milik shared/;
   keduanya justru yang paling perlu diperiksa satuan, karena kalau rusak SEMUA
   episode ikut rusak.

   SHORTS ikut di sini, satu folder Studio per Short, dan id scene-nya BERPREFIKS
   (`s1-`, `s2-`) supaya tidak berebut ruang nama dengan scene video panjang.
   Ukurannya 9:16, bukan 16:9 yang diputar — kotak aman dan skala tipografinya
   berbeda (`.r-9x16` di shared/theme.css).

     npx remotion studio                          -> semua komposisi di sidebar
     npx remotion render 01-hook-question         -> satu scene saja
     npx remotion render T01-apa-itu-ram          -> episode utuh
     npx remotion still  s1-01-menunggu           -> satu scene Short 1
     npx remotion render T01-apa-itu-ram-s1       -> Short 1 utuh (npm run render:s1)
     npx remotion still  t14-s1-01-dari-belakang  -> satu scene Short 1 T14
     npx remotion render T14-dns-server-s1        -> Short 1 T14 (npm run render:t14:s1)
*/
import type React from "react";
import { Composition, Folder } from "remotion";

import { CFG, FPS, f } from "../shared/config.gen";
import { Panggung, type Rasio } from "../shared/Stage";
import { TrekVO } from "../shared/Vo";
import { Episode, isiScene } from "../ideas/apa-itu-ram/Episode";
import { Thumb } from "../ideas/apa-itu-ram/thumb";
import { ThumbS1 } from "../ideas/apa-itu-ram/scene-shorts/thumb-s1";
import { ThumbS2 } from "../ideas/apa-itu-ram/scene-shorts/thumb-s2";
import { TIMING, TOTAL, cari } from "../ideas/apa-itu-ram/timing.gen";
import {
  Short as ShortS1,
  isiScene as isiSceneS1,
} from "../ideas/apa-itu-ram/scene-shorts/s1-nugget/Short";
import {
  TIMING as TIMING_S1,
  TOTAL as TOTAL_S1,
  cari as cariS1,
  type Timing as TimingS1,
} from "../ideas/apa-itu-ram/scene-shorts/s1-nugget/timing.gen";
import {
  Short as ShortS2,
  isiScene as isiSceneS2,
} from "../ideas/apa-itu-ram/scene-shorts/s2-jebakan/Short";
import {
  TIMING as TIMING_S2,
  TOTAL as TOTAL_S2,
  cari as cariS2,
} from "../ideas/apa-itu-ram/scene-shorts/s2-jebakan/timing.gen";
import {
  Episode as EpisodeT14,
  isiScene as isiSceneT14,
} from "../ideas/dns-server/Episode";
import {
  TIMING as TIMING_T14,
  TOTAL as TOTAL_T14,
  cari as cariT14,
} from "../ideas/dns-server/timing.gen";
import {
  Episode as EpisodeT15,
  isiScene as isiSceneT15,
} from "../ideas/apa-itu-firewall/Episode";
import {
  TIMING as TIMING_T15,
  TOTAL as TOTAL_T15,
  cari as cariT15,
} from "../ideas/apa-itu-firewall/timing.gen";
import {
  Episode as EpisodeT16,
  isiScene as isiSceneT16,
} from "../ideas/apa-itu-enkripsi/Episode";
import {
  TIMING as TIMING_T16,
  TOTAL as TOTAL_T16,
  cari as cariT16,
} from "../ideas/apa-itu-enkripsi/timing.gen";
import { Thumb as ThumbT14 } from "../ideas/dns-server/thumb";
import { ThumbS1 as ThumbT14S1 } from "../ideas/dns-server/scene-shorts/thumb-s1";
import { ThumbS2 as ThumbT14S2 } from "../ideas/dns-server/scene-shorts/thumb-s2";
import {
  Short as ShortT14S1,
  isiScene as isiSceneT14S1,
} from "../ideas/dns-server/scene-shorts/s1-nugget/Short";
import {
  TIMING as TIMING_T14_S1,
  TOTAL as TOTAL_T14_S1,
  cari as cariT14S1,
} from "../ideas/dns-server/scene-shorts/s1-nugget/timing.gen";
import {
  Short as ShortT14S2,
  isiScene as isiSceneT14S2,
} from "../ideas/dns-server/scene-shorts/s2-jebakan/Short";
import {
  TIMING as TIMING_T14_S2,
  TOTAL as TOTAL_T14_S2,
  cari as cariT14S2,
} from "../ideas/dns-server/scene-shorts/s2-jebakan/timing.gen";

const UKURAN_16x9 = {
  width: CFG.LONG_WIDTH,
  height: CFG.LONG_HEIGHT,
} as const;

/** Shorts 1080x1920 — bukan 16:9 yang diputar. Kotak amannya jauh lebih ketat
 *  dan skala tipografinya beda (`.r-9x16` di shared/theme.css). */
const UKURAN_9x16 = {
  width: CFG.SHORT_WIDTH,
  height: CFG.SHORT_HEIGHT,
} as const;

/** Thumbnail 1280x720 — syarat YouTube, bukan turunan LONG_WIDTH. Sengaja
 *  komposisi tersendiri dan bukan frame yang dipetik dari episode: teksnya
 *  tidak boleh mengulang judul (docs/06), jadi ia memang bukan salah satu
 *  frame videonya. */
const UKURAN_THUMB = {
  width: CFG.THUMB_WIDTH,
  height: CFG.THUMB_HEIGHT,
} as const;

/** Kover Short — 2160x3840, angka yang disebut halaman bantuan YouTube untuk
 *  thumbnail 9:16. Tiga kali lebih besar daripada Short-nya sendiri
 *  (1080x1920): kover diperbesar di halaman pencarian dan di kisi channel,
 *  frame videonya tidak. */
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
  isi: (t: TimingS1) => React.ReactNode,
  cariScene: (kunci: string) => TimingS1,
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

const SceneSolo = buatSceneSolo(isiScene, cari, "16x9");
const SceneSoloT14 = buatSceneSolo(isiSceneT14, cariT14, "16x9");
const SceneSoloT15 = buatSceneSolo(isiSceneT15, cariT15, "16x9");
const SceneSoloT16 = buatSceneSolo(isiSceneT16, cariT16, "16x9");

/** Semua Short dari semua episode. Nama folder Studio hanya boleh a-z A-Z 0-9
 *  dan tanda hubung — Remotion menolak spasi dan titik tengah, dan menolaknya
 *  saat RENDER, bukan saat tsc.
 *
 *  PREFIKS ID KOMPOSISI BUKAN HIASAN, dan sejak episode kedua ia punya DUA
 *  lapis:
 *
 *    s1-09-loop        Short 1 T01
 *    t14-s1-09-loop    Short 1 T14
 *
 *  Lapis pertama (`s1`/`s2`) memisahkan Short dari video panjang — tanpa itu
 *  `01-hook` milik Short dan `01-hook-question` milik episode berebut ruang nama
 *  yang sama. Lapis kedua (`t14`) memisahkan episode dari episode: `09-loop` dan
 *  `99-closing` ada di Short 1 KEDUA episode, dan Remotion menolak dua komposisi
 *  dengan id yang sama — saat render, bukan saat tsc. Alasan yang sama persis
 *  dengan prefiks `t14-` pada scene video panjangnya.
 *
 *  T01 dibiarkan tanpa prefiks episode supaya perintah `still` yang sudah
 *  tertulis di dokumennya tidak putus.
 *
 *  Konvensinya: CLAUDE.md HARD RULE 1 · docs/02 § Di mana berkasnya. */
const SHORTS = [
  {
    id: "T01-apa-itu-ram-s1",
    folder: "short-1-nugget",
    prefiks: "s1",
    Komponen: ShortS1,
    TIMING: TIMING_S1,
    TOTAL: TOTAL_S1,
    Solo: buatSceneSolo(isiSceneS1, cariS1, "9x16"),
  },
  {
    id: "T01-apa-itu-ram-s2",
    folder: "short-2-jebakan",
    prefiks: "s2",
    Komponen: ShortS2,
    TIMING: TIMING_S2,
    TOTAL: TOTAL_S2,
    Solo: buatSceneSolo(isiSceneS2, cariS2, "9x16"),
  },
  {
    id: "T14-dns-server-s1",
    folder: "t14-short-1-nugget",
    prefiks: "t14-s1",
    Komponen: ShortT14S1,
    TIMING: TIMING_T14_S1,
    TOTAL: TOTAL_T14_S1,
    Solo: buatSceneSolo(isiSceneT14S1, cariT14S1, "9x16"),
  },
  {
    id: "T14-dns-server-s2",
    folder: "t14-short-2-jebakan",
    prefiks: "t14-s2",
    Komponen: ShortT14S2,
    TIMING: TIMING_T14_S2,
    TOTAL: TOTAL_T14_S2,
    Solo: buatSceneSolo(isiSceneT14S2, cariT14S2, "9x16"),
  },
] as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="T01-apa-itu-ram"
      component={Episode}
      defaultProps={{ subtitel: true }}
      durationInFrames={f(TOTAL)}
      fps={FPS}
      {...UKURAN_16x9}
    />

    {/* Satu frame saja — ini gambar, bukan video:
        npx remotion still T01-thumb    ideas/apa-itu-ram/render/thumb.png
        npx remotion still T01-thumb-s1 ideas/apa-itu-ram/render/thumb-s1.png
        npx remotion still T01-thumb-s2 ideas/apa-itu-ram/render/thumb-s2.png */}
    <Composition
      id="T01-thumb"
      component={Thumb}
      durationInFrames={1}
      fps={FPS}
      {...UKURAN_THUMB}
    />
    <Composition
      id="T01-thumb-s1"
      component={ThumbS1}
      durationInFrames={1}
      fps={FPS}
      {...UKURAN_THUMB_SHORT}
    />
    <Composition
      id="T01-thumb-s2"
      component={ThumbS2}
      durationInFrames={1}
      fps={FPS}
      {...UKURAN_THUMB_SHORT}
    />

    {/* Folder Studio — 83 scene di daftar yang sama dengan episode akan
        mengubur episodenya. Sidebar tetap urut tayang karena nomornya. */}
    <Folder name="scene">
      {TIMING.map((t) => (
        <Composition
          key={t.kunci}
          id={t.kunci}
          component={SceneSolo}
          defaultProps={{ kunci: t.kunci, subtitel: true }}
          durationInFrames={Math.max(1, f(t.durasi))}
          fps={FPS}
          {...UKURAN_16x9}
        />
      ))}
    </Folder>

    {/* ---------- T14 · Apa itu DNS server ---------- */}
    <Composition
      id="T14-dns-server"
      component={EpisodeT14}
      defaultProps={{ subtitel: true }}
      durationInFrames={f(TOTAL_T14)}
      fps={FPS}
      {...UKURAN_16x9}
    />

    {/* Thumbnail & kover T14 — dibangun di fase 4 dari brief fase 1 (thumbnail.md):
        npx remotion still T14-thumb    ideas/dns-server/render/thumb.png
        npx remotion still T14-thumb-s1 ideas/dns-server/render/thumb-s1.png
        npx remotion still T14-thumb-s2 ideas/dns-server/render/thumb-s2.png */}
    <Composition
      id="T14-thumb"
      component={ThumbT14}
      durationInFrames={1}
      fps={FPS}
      {...UKURAN_THUMB}
    />
    <Composition
      id="T14-thumb-s1"
      component={ThumbT14S1}
      durationInFrames={1}
      fps={FPS}
      {...UKURAN_THUMB_SHORT}
    />
    <Composition
      id="T14-thumb-s2"
      component={ThumbT14S2}
      durationInFrames={1}
      fps={FPS}
      {...UKURAN_THUMB_SHORT}
    />

    {/* Id scene BERPREFIKS `t14-`, alasan yang sama persis dengan prefiks
        `s1-`/`s2-` di Shorts: `02-opening` dan `99-closing` ada di SETIAP
        episode, dan Remotion menolak dua komposisi dengan id yang sama — saat
        RENDER, bukan saat tsc. Begitu episode kedua didaftarkan, ruang nama
        tanpa prefiks berhenti cukup. T01 dibiarkan tanpa prefiks supaya
        perintah `still` yang sudah tertulis di dokumennya tidak putus. */}
    <Folder name="scene-t14">
      {TIMING_T14.map((t) => (
        <Composition
          key={t.kunci}
          id={`t14-${t.kunci}`}
          component={SceneSoloT14}
          defaultProps={{ kunci: t.kunci, subtitel: true }}
          durationInFrames={Math.max(1, f(t.durasi))}
          fps={FPS}
          {...UKURAN_16x9}
        />
      ))}
    </Folder>

    {/* ---------- T15 · Apa itu firewall ---------- */}
    <Composition
      id="T15-apa-itu-firewall"
      component={EpisodeT15}
      defaultProps={{ subtitel: true }}
      durationInFrames={f(TOTAL_T15)}
      fps={FPS}
      {...UKURAN_16x9}
    />

    <Folder name="scene-t15">
      {TIMING_T15.map((t) => (
        <Composition
          key={t.kunci}
          id={`t15-${t.kunci}`}
          component={SceneSoloT15}
          defaultProps={{ kunci: t.kunci, subtitel: true }}
          durationInFrames={Math.max(1, f(t.durasi))}
          fps={FPS}
          {...UKURAN_16x9}
        />
      ))}
    </Folder>

    {/* ---------- T16 · Apa itu enkripsi ---------- */}
    <Composition
      id="T16-apa-itu-enkripsi"
      component={EpisodeT16}
      defaultProps={{ subtitel: true }}
      durationInFrames={f(TOTAL_T16)}
      fps={FPS}
      {...UKURAN_16x9}
    />

    <Folder name="scene-t16">
      {TIMING_T16.map((t) => (
        <Composition
          key={t.kunci}
          id={`t16-${t.kunci}`}
          component={SceneSoloT16}
          defaultProps={{ kunci: t.kunci, subtitel: true }}
          durationInFrames={Math.max(1, f(t.durasi))}
          fps={FPS}
          {...UKURAN_16x9}
        />
      ))}
    </Folder>

    {SHORTS.map((s) => (
      <Folder key={s.prefiks} name={s.folder}>
        <Composition
          id={s.id}
          component={s.Komponen}
          defaultProps={{ subtitel: true }}
          durationInFrames={f(s.TOTAL)}
          fps={FPS}
          {...UKURAN_9x16}
        />
        {s.TIMING.map((t) => (
          <Composition
            key={t.kunci}
            id={`${s.prefiks}-${t.kunci}`}
            component={s.Solo}
            defaultProps={{ kunci: t.kunci, subtitel: true }}
            durationInFrames={Math.max(1, f(t.durasi))}
            fps={FPS}
            {...UKURAN_9x16}
          />
        ))}
      </Folder>
    ))}
  </>
);
