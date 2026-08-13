/* Daftar komposisi Remotion.

   Selain episode utuh, SETIAP scene didaftarkan sebagai komposisi sendiri.
   Itulah inti HARD RULE 1: satu scene bisa dibuka, di-scrub, dan dirender
   satuan — tanpa menggulir enam menit untuk memeriksa satu scene.

     npx remotion studio                          -> semua komposisi di sidebar
     npx remotion still  s-s042 out/s042.png      -> satu frame scene 042
     npx remotion render s-s042 out/s042.mp4      -> satu scene saja
     npx remotion render T01-apa-itu-ram          -> episode utuh
*/
import type React from "react";
import { Composition } from "remotion";

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
const SceneSolo: React.FC<{ id: string }> = ({ id }) => (
  <Panggung rasio="16x9">{isiScene(cari(id))}</Panggung>
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

    {TIMING.map((t) => (
      <Composition
        key={t.id}
        id={`s-${t.id}`}
        component={SceneSolo}
        defaultProps={{ id: t.id }}
        durationInFrames={Math.max(1, f(t.durasi))}
        fps={FPS}
        {...UKURAN_16x9}
      />
    ))}
  </>
);
