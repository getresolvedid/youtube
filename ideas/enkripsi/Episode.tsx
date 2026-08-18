/* T17 (provisional) · "Enkripsi" — 16:9

   Berkas ini HANYA merangkai. Isi tiap scene ada di berkasnya sendiri di
   scenes/ — HARD RULE 1 di CLAUDE.md.

   Daftar scene              : ideas/enkripsi/naskah.md § Scene
   Teks VO tiap scene        : scenes/<kunci>-vo.md (HARD RULE 4, docs/11)
   Timing                    : timing.gen.ts, digenerate dari keduanya
   Flow 7 bagian             : docs/02-format-video.md

   TREK SUARA per scene diurus <TrekVO>: selama berkas VO scene itu belum ada,
   yang tampil subtitel preview; begitu ada, subtitelnya hilang dan suaranya yang
   bicara (docs/11 § Subtitel preview). Tidak ada saklar di berkas ini.

   EPISODE INI BARU PUNYA SATU SCENE. Sisanya belum ditulis karena sudutnya
   belum diputuskan — lihat kotak peringatan di naskah.md. Scene yang ada di
   naskah tapi belum punya komponen tampil sebagai <BelumDibuat>, kartu kuning
   bergaris, bukan layar hitam.
*/
import type React from "react";
import { Sequence } from "remotion";

import { f } from "../../shared/config.gen";
import { BelumDibuat } from "../../shared/Placeholder";
import { Panggung } from "../../shared/Stage";
import { KartuJudul, TandaBrand } from "../../shared/StandarScenes";
import { TrekVO } from "../../shared/Vo";
import { SCENES } from "./scenes";
import { TIMING, type Timing } from "./timing.gen";

/** Judul episode, tampil di kartu pembuka (docs/10).
 *
 *  Kartu ini tayang di sekitar detik 15, sementara VO baru boleh menamai
 *  `[what]`-nya di bagian 4 — dan itu DISENGAJA. Yang dilarang HARD RULE 6
 *  adalah VO yang menyebut nama sebelum bendanya berdiri, bukan kartu judulnya.
 *
 *  SUBJUDULNYA SENGAJA KOSONG. "Enkripsi" tidak punya kepanjangan, jadi baris
 *  kedua kartu memang tempatnya gambaran L1 — tapi gambaran itu berbeda
 *  tergantung sudut mana yang menang (loker di gudang vs paket di jalur), dan
 *  sudut episode ini belum diputuskan. Mengisinya sekarang berarti memutuskan
 *  sudutnya lewat pintu belakang. Alasan lengkap: `scenes/2-opening-direction.md`. */
export const JUDUL = "Enkripsi";
export const SUBJUDUL = "";

export const isiScene = (t: Timing): React.ReactNode => {
  /* `figur` sengaja TIDAK dikirim: figur kartu judul wajib komponen yang sama
     persis dengan scene-nya (docs/06), dan scene yang melahirkannya belum ada.
     <KartuJudul> memperlakukan figur sebagai opsional, jadi kartunya tetap
     tampil — dengan judul saja. */
  if (t.id === "opening")
    return <KartuJudul judul={JUDUL} subjudul={SUBJUDUL || undefined} />;
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
