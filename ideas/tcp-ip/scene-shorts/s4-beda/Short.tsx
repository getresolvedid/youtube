/* T18-S4 · "Apa bedanya TCP dan IP?" — 9:16

   Berkas ini HANYA merangkai. Isi tiap scene ada di berkasnya sendiri —
   HARD RULE 1 di CLAUDE.md. Bentuknya sama persis dengan Short 1; tiga bedanya
   dari Episode.tsx dijelaskan di sana (tanpa opening, closing 2 dtk, 9:16).
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
