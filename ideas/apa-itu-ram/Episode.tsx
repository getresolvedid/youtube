/* T01 · "Di mana data aplikasi saat aplikasi dibuka?" — 16:9

   Berkas ini HANYA merangkai. Isi tiap scene ada di berkasnya sendiri di
   scenes/ — HARD RULE 1 di CLAUDE.md.

   Naskah (sumber kebenaran) : ideas/apa-itu-ram/naskah.md
   Timing                    : timing.gen.ts, digenerate dari naskah itu
   Flow 7 bagian             : docs/02-format-video.md

   KOMPOSISI BISU — belum ada trek VO sampai naskah dibekukan (docs/04 §5).
*/
import type React from "react";
import { Sequence } from "remotion";

import { f } from "../../shared/config.gen";
import { BelumDibuat } from "../../shared/Placeholder";
import { Panggung } from "../../shared/Stage";
import { KartuJudul, TandaBrand } from "../../shared/StandarScenes";
import { SCENES } from "./scenes";
import { TIMING, type Timing } from "./timing.gen";

/** Judul episode, tampil di kartu pembuka (docs/10). Maks 5 kata.
 *
 *  TIDAK BOLEH menyebut "RAM". Kartu ini tayang di detik ~10, sementara kata
 *  RAM baru diperkenalkan di s019 sekitar detik 68 — setelah penonton melihat
 *  benda yang diwakilinya (tangga abstraksi, docs/09). Judul yang menyebutnya
 *  lebih dulu membatalkan enam puluh detik pembangunan itu. */
export const JUDUL = "Di mana data bekerja";

export const isiScene = (t: Timing): React.ReactNode => {
  if (t.id === "opening") return <KartuJudul judul={JUDUL} />;
  if (t.id === "closing") return <TandaBrand />;

  const Komponen = SCENES[t.id];
  if (Komponen) return <Komponen />;

  return (
    <BelumDibuat id={t.id} bagian={t.bagian} durasi={t.durasi} vo={t.vo} />
  );
};

export const Episode: React.FC = () => (
  <Panggung rasio="16x9">
    {TIMING.map((t) => {
      /* Batas frame dihitung dari titik MULAI dua scene berurutan, bukan dari
         durasi masing-masing. Membulatkan durasi sendiri-sendiri bisa
         menyisakan celah satu frame di antara scene — satu frame hitam yang
         tidak akan terlihat saat scrubbing tapi ada di MP4. */
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
        </Sequence>
      );
    })}
  </Panggung>
);
