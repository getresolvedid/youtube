/* T19-S13 · "Kenapa urutan penting buat AI?" — 9:16

   Berkas ini HANYA merangkai. Isi tiap scene ada di berkasnya sendiri —
   HARD RULE 1 di CLAUDE.md.

   TIGA BEDANYA DARI Episode.tsx, dan ketiganya datang dari docs/02:

     1. TIDAK ADA OPENING. Shorts tanpa intro brand — logo cuma muncul di 2 detik
        penutup. `bacaShort()` di tools/baca-episode.mjs yang memastikannya.
     2. Closing memakai `CLOSING_SHORT_SECONDS` (2 dtk), bukan yang 5 dtk.
     3. Panggungnya `rasio="9x16"` — dan itu bukan 16:9 yang diputar: kotak aman
        dan skala tipografinya berbeda (`.r-9x16` di shared/theme.css).

   TREK SUARA per scene diurus <TrekVO>: selama berkas VO scene itu belum ada,
   yang tampil subtitel preview; begitu ada, subtitelnya hilang dan suaranya yang
   bicara. Tidak ada saklar di berkas ini.
*/
import type React from "react";
import { Sequence } from "remotion";

import { f } from "../../../../shared/config.gen";
import { BelumDibuat } from "../../../../shared/Placeholder";
import { Panggung } from "../../../../shared/Stage";
import { TandaBrand } from "../../../../shared/StandarScenes";
import { TrekVO } from "../../../../shared/Vo";
import { SCENES } from "./index";
import { TIMING, type Timing } from "./timing.gen";

export const isiScene = (t: Timing): React.ReactNode => {
  if (t.id === "closing") return <TandaBrand rasio="9x16" />;

  const Komponen = SCENES[t.id];
  if (Komponen) return <Komponen />;

  return (
    <BelumDibuat
      id={t.id}
      bagian={t.bagian}
      durasi={t.durasi}
      vo={t.vo}
      ringkas={t.ringkas}
    />
  );
};

export const Short: React.FC<{ subtitel?: boolean }> = ({ subtitel = true }) => (
  <Panggung rasio="9x16">
    {TIMING.map((t) => {
      /* Batas frame dihitung dari titik MULAI dua scene berurutan, bukan dari
         durasi masing-masing — membulatkan durasi sendiri-sendiri bisa
         menyisakan celah satu frame di antara scene. */
      const dari = f(t.mulai);
      const sampai = f(t.mulai + t.durasi);
      return (
        <Sequence
          key={t.id}
          name={`${t.id} · ${t.bagian}`}
          from={dari}
          durationInFrames={sampai - dari}
          layout="none"
        >
          {isiScene(t)}
          <TrekVO audio={t.voAudio} beat={t.beat} aktif={subtitel} />
        </Sequence>
      );
    })}
  </Panggung>
);
