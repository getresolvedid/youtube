/* Trek suara satu scene: VO asli kalau berkasnya sudah ada, SUBTITEL preview
   kalau belum. Aturan: docs/11-rencana-vo.md § Subtitel preview.

   Kenapa ada. VO dibuat paling akhir dan sekali jalan (docs/04 §5) — jadi
   selama seluruh masa pembangunan komposisi, episode ditonton BISU. Menonton
   bisu berarti menilai timing tanpa tahu kalimat mana yang sedang jalan: scene
   terasa "kepanjangan" padahal kalimatnya memang panjang, atau gerakan terasa
   telat padahal ia jatuh di kata yang benar. Subtitel menutup lubang itu tanpa
   membayar satu karakter pun ke ElevenLabs.

   Saklarnya BUKAN saklar. Yang menentukan preview atau final adalah ada
   tidaknya berkas `public/vo/<slug>/L-<kunci>.mp3` — dideteksi saat
   `npm run gen` dan masuk ke `timing.gen.ts` sebagai `voAudio`. Begitu VO satu
   scene jadi, subtitelnya hilang sendiri di scene itu saja; scene lain tetap
   bersubtitel. Tidak ada nilai yang harus diingat untuk dikembalikan sebelum
   render final — dan itu memang inti masalahnya: saklar yang harus dimatikan
   manual pada akhirnya ikut terbawa ke MP4.

   SUBTITLE_MODE di .env hanya untuk memaksa saat memeriksa:
     auto  (baku) subtitel hanya di scene yang belum punya VO
     off          jangan tampilkan sama sekali — melihat frame apa adanya
     on           tampilkan walau VO-nya sudah ada — memeriksa sinkron VO/teks
*/
import type React from "react";
import { Audio, staticFile } from "remotion";

import { E, t, useDetik } from "./anim";
import { CFG } from "./config.gen";

/** Sengaja dilebarkan ke `string`. `CFG` ditulis `as const`, jadi tipe
 *  CFG.SUBTITLE_MODE adalah literal nilai yang kebetulan ada di .env mesin ini
 *  — dan membandingkannya dengan pilihan lain akan ditolak tsc sebagai
 *  perbandingan yang "tidak mungkin benar". Nilai sahnya dijaga
 *  tools/bangun-config.mjs saat generate, bukan oleh tipe. */
const MODE: string = CFG.SUBTITLE_MODE;

/** Satu baris blok `## VO`. Bentuknya sama dengan `Beat` di timing.gen.ts tiap
 *  episode; ditulis ulang di sini supaya shared/ tidak mengimpor berkas milik
 *  satu episode. */
export type BeatVO = {
  readonly teks: string;
  readonly mulai: number;
  readonly durasi: number;
};

/** Baris VO yang sedang diucapkan di detik ke-`d`, atau null kalau belum ada
 *  satu pun yang mulai.
 *
 *  Fungsi murni dari waktu — tidak ada indeks yang disimpan antar-frame.
 *  Remotion bisa merender frame 1.234 tanpa pernah merender 1.233. */
const barisAktif = (
  beat: readonly BeatVO[],
  d: number,
): { i: number; b: BeatVO } | null => {
  let aktif: { i: number; b: BeatVO } | null = null;
  beat.forEach((b, i) => {
    if (b.mulai <= d) aktif = { i, b };
  });
  return aktif;
};

export const Subtitel: React.FC<{ beat: readonly BeatVO[] }> = ({ beat }) => {
  const d = useDetik();
  const aktif = barisAktif(beat, d);
  const terakhir = beat[beat.length - 1];
  if (!aktif || !terakhir) return null;

  const { i, b } = aktif;
  const akhir = terakhir.mulai + terakhir.durasi;

  /* Muncul cepat di awal barisnya, lalu memudar setelah baris terakhir selesai
     — supaya sisa scene (VO_PAD_SECONDS) terbaca sebagai jeda napas, bukan
     sebagai kalimat yang masih berjalan. */
  const opacity =
    t(d, { mulai: b.mulai, durasi: 0.12, dari: 0, ke: 1, ease: E.linear }) *
    t(d, { mulai: akhir, durasi: 0.25, dari: 1, ke: 0, ease: E.linear });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        /* Di dalam kotak aman, di bawah isi scene. Tidak memakai --safe-bottom
           penuh: ruang itu untuk progress bar pemutar, dan subtitel preview
           tidak ikut ke MP4 final jadi tidak perlu tunduk padanya. */
        bottom: "calc(var(--safe-bottom) * 0.45)",
        padding: "0 var(--safe-x)",
        display: "grid",
        justifyItems: "center",
        gap: 12,
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* Penanda "ini bukan bagian video". Tanpa ini, satu still yang dikirim
          ke orang lain terbaca sebagai keputusan desain — dan channel ini tidak
          memakai subtitel bakar (docs/06: subtitel diunggah terpisah). */}
      <p className="t-label" style={{ color: "var(--warn)" }}>
        subtitel preview · {i + 1}/{beat.length}
      </p>
      <p
        style={{
          maxWidth: "72%",
          margin: 0,
          padding: "16px 32px",
          borderRadius: "var(--radius)",
          border: "1px dashed var(--warn)",
          background: "rgba(11, 16, 32, 0.86)",
          color: "var(--ink-0)",
          fontSize: "calc(var(--fs-body) * 0.95)",
          fontWeight: 600,
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        {b.teks}
      </p>
    </div>
  );
};

/** Dipasang sekali per scene di Episode.tsx (dan di komposisi scene satuan).
 *
 *  `aktif={false}` mematikan subtitel tanpa menyentuh .env — dipakai
 *  tools/periksa-frame.mjs lewat `--props`, karena kotak subtitel menambah
 *  piksel dan bisa membuat scene yang KOSONG lolos pemeriksaan "ada isinya". */
export const TrekVO: React.FC<{
  /** `voAudio` dari timing.gen.ts — path relatif public/, "" kalau belum ada. */
  audio: string;
  beat: readonly BeatVO[];
  aktif?: boolean;
}> = ({ audio, beat, aktif = true }) => {
  const pakaiSubtitel =
    aktif && beat.length > 0 && MODE !== "off" && (MODE === "on" || !audio);

  return (
    <>
      {audio ? <Audio src={staticFile(audio)} /> : null}
      {pakaiSubtitel ? <Subtitel beat={beat} /> : null}
    </>
  );
};
