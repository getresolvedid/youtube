/* T14-S1 · "Nugget" — nama situs itu dibaca dari belakang.
   9:16 · 1080x1920 · target 40–60 dtk (docs/02 § Anatomi Shorts)

   Berkas ini HANYA merangkai. Isi tiap scene ada di berkasnya sendiri di folder
   yang sama — HARD RULE 1 di CLAUDE.md.

   Daftar scene          : ideas/dns-server/naskah.md § Short 1
   Teks VO tiap scene    : <kunci>-vo.md (HARD RULE 4, docs/11)
   Apa di layar          : <kunci>-direction.md (HARD RULE 3)
   Timing                : timing.gen.ts, digenerate dari keduanya

   BEDANYA DENGAN Episode.tsx cuma tiga, dan ketiganya keputusan docs/02:

     1. TIDAK ADA KARTU JUDUL. Shorts tanpa intro brand — logo cuma muncul di
        2 detik terakhir. Jadi tidak ada cabang `opening` di isiScene().
     2. Panggungnya 9:16, yang mengganti skala tipografi dan kotak aman
        (`.r-9x16` di shared/theme.css).
     3. Closing memakai <TandaBrand rasio="9x16" />, 2 dtk.

   TREK SUARA per scene diurus <TrekVO>: selama berkas VO scene itu belum ada,
   yang tampil subtitel preview; begitu ada, subtitelnya hilang dan suaranya
   yang bicara. Tidak ada saklar di berkas ini.
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

export const Short: React.FC<{
  /** false = tanpa subtitel preview, apa pun isi SUBTITLE_MODE. Dipakai
   *  tools/periksa-frame.mjs lewat `--props` (lihat shared/Vo.tsx). */
  subtitel?: boolean;
}> = ({ subtitel = true }) => (
  <Panggung rasio="9x16">
    {TIMING.map((t) => {
      /* Batas frame dihitung dari titik MULAI dua scene berurutan, bukan dari
         durasi masing-masing — membulatkan durasi sendiri-sendiri bisa
         menyisakan celah satu frame di antara scene. Di Short, satu frame hitam
         lebih mahal daripada di video panjang: ia jatuh di tengah 55 detik yang
         ditonton berulang-ulang. */
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
