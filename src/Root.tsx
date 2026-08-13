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

     npx remotion studio                          -> semua komposisi di sidebar
     npx remotion render 01-hook-question         -> satu scene saja
     npx remotion render T01-apa-itu-ram          -> episode utuh
*/
import type React from "react";
import { Composition, Folder } from "remotion";

import { CFG, FPS, f } from "../shared/config.gen";
import { Panggung } from "../shared/Stage";
import { Episode, isiScene } from "../ideas/apa-itu-ram/Episode";
import { TIMING, TOTAL, cari } from "../ideas/apa-itu-ram/timing.gen";

const UKURAN_16x9 = {
  width: CFG.LONG_WIDTH,
  height: CFG.LONG_HEIGHT,
} as const;

/** Satu scene berdiri sendiri di panggung penuh. Komponennya stabil (bukan
 *  arrow function yang dibuat ulang tiap render) supaya Studio tidak
 *  me-remount scene setiap kali daftar komposisi dihitung ulang. */
const SceneSolo: React.FC<{ kunci: string }> = ({ kunci }) => (
  <Panggung rasio="16x9">{isiScene(cari(kunci))}</Panggung>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="T01-apa-itu-ram"
      component={Episode}
      durationInFrames={f(TOTAL)}
      fps={FPS}
      {...UKURAN_16x9}
    />

    {/* Folder Studio — 83 scene di daftar yang sama dengan episode akan
        mengubur episodenya. Sidebar tetap urut tayang karena nomornya. */}
    <Folder name="scene">
      {TIMING.map((t) => (
        <Composition
          key={t.kunci}
          id={t.kunci}
          component={SceneSolo}
          defaultProps={{ kunci: t.kunci }}
          durationInFrames={Math.max(1, f(t.durasi))}
          fps={FPS}
          {...UKURAN_16x9}
        />
      ))}
    </Folder>
  </>
);
