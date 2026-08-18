/* T18 · "Apa Itu TCP/IP?" — 16:9

   Berkas ini HANYA merangkai. Isi tiap scene ada di berkasnya sendiri di
   scenes/ — HARD RULE 1 di CLAUDE.md.

   Daftar scene              : ideas/tcp-ip/naskah.md § Scene
   Teks VO tiap scene        : scenes/<kunci>-vo.md (HARD RULE 4, docs/11)
   Timing                    : timing.gen.ts, digenerate dari keduanya
   Storyboard sumber         : ideas/tcp-ip/storyboard-usulan.md

   PENYIMPANGAN dari kontrak repo dicatat di naskah.md § Penyimpangan tercatat.
   Episode ini dibangun dari storyboard usulan atas keputusan user, dan sebagian
   aturan yang mengikat episode lain sengaja tidak berlaku di sini.

   TREK SUARA per scene diurus <TrekVO>: selama berkas VO scene itu belum ada,
   yang tampil subtitel preview; begitu ada, subtitelnya hilang dan suaranya yang
   bicara (docs/11 § Subtitel preview). Tidak ada saklar di berkas ini.
*/
import type React from "react";
import { Sequence } from "remotion";

import { f } from "../../shared/config.gen";
import { BelumDibuat } from "../../shared/Placeholder";
import { Panggung } from "../../shared/Stage";
import { KartuJudul, TandaBrand } from "../../shared/StandarScenes";
import { TrekVO } from "../../shared/Vo";
import { SCENES } from "./scenes";
import { FigurPaket } from "./scenes/02-opening";
import { TIMING, type Timing } from "./timing.gen";

/** Judul episode, tampil di kartu pembuka (docs/10).
 *
 *  Nama "TCP/IP" di kartu ini BUKAN pelanggaran tambahan: VO scene 1 sudah
 *  menyebutnya lebih dulu (naskah.md § Penyimpangan tercatat). Di episode lain
 *  urutannya kebalikan — kartu duluan, VO belakangan.
 *
 *  SUBJUDULNYA BUKAN KEPANJANGAN. Kepanjangan "Transmission Control Protocol"
 *  baru disebut VO di scene 7; baris kedua kartu dipakai untuk menaruh gambaran
 *  L1-nya lebih dulu. */
export const JUDUL = "TCP/IP";
export const SUBJUDUL = "Aturan yang dipakai internet";

export const isiScene = (t: Timing): React.ReactNode => {
  /* Figurnya milik episode ini (scenes/02-opening.tsx), koreografi masuknya
     milik shared/ — docs/10 § Figur episode. */
  if (t.id === "opening")
    return <KartuJudul judul={JUDUL} subjudul={SUBJUDUL} figur={<FigurPaket />} />;
  if (t.id === "closing") return <TandaBrand />;

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

export const Episode: React.FC<{
  /** false = tanpa subtitel preview, apa pun isi SUBTITLE_MODE. Dipakai
   *  tools/periksa-frame.mjs lewat `--props` (lihat shared/Vo.tsx). */
  subtitel?: boolean;
}> = ({ subtitel = true }) => (
  <Panggung rasio="16x9">
    {TIMING.map((t) => {
      /* Batas frame dihitung dari titik MULAI dua scene berurutan, bukan dari
         durasi masing-masing. Membulatkan durasi sendiri-sendiri bisa menyisakan
         celah satu frame di antara scene — satu frame hitam yang tidak akan
         terlihat saat scrubbing tapi ada di MP4. */
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
