/* Menyusun timeline → ideas/<slug>/timing.gen.ts (video panjang)
                     → ideas/<slug>/scene-shorts/<short>/timing.gen.ts (Shorts)

   Dua sumber, dibaca tools/baca-episode.mjs:

     naskah.md                      daftar scene — id, bagian, urutan
     <folder scene>/<kunci>-vo.md   teks VO scene itu (HARD RULE 4)

   Durasi tiap scene dihitung dari jumlah kata di blok `## VO` rencana VO-nya;
   scene standar (opening/closing) tidak punya VO jadi durasinya diambil dari
   .env. Tidak ada berkas timing perantara yang disunting tangan — berkas
   seperti itu selalu jadi basi tanpa ada yang sadar.

   Shorts ikut dibangun di sini, satu berkas timing per Short, dan yang
   menentukan Short mana yang ada adalah SUBFOLDER di scene-shorts/ — bukan
   daftar di skrip ini. Daftar kedua yang ditulis tangan akan meleset dari
   isi folder dalam sekali tambah Short.

   Jalankan:  node --env-file=.env tools/bangun-timing.mjs apa-itu-ram
   Otomatis lewat npm pre-script (studio / render / check / sisa).
*/
import { writeFileSync } from "node:fs";

import { bacaEpisode, bacaShort, daftarShort, wajib } from "./baca-episode.mjs";

const slug = process.argv[2] ?? "apa-itu-ram";

/* Yang ditulis ke TS hanya yang dipakai komposisi. `kata`, `chars`, dan letak
   berkas rencana VO milik `npm run sisa`, bukan milik Remotion. */
const ringkas = (timing) =>
  timing.map((t) => ({
    id: t.id,
    kunci: t.kunci,
    urut: t.urut,
    bagian: t.bagian,
    ringkas: t.ringkas,
    mulai: t.mulai,
    durasi: t.durasi,
    standar: t.standar,
    vo: t.vo,
    beat: t.beat.map((b) => ({ teks: b.teks, mulai: b.mulai, durasi: b.durasi })),
    voAudio: t.voAudio,
  }));

/** Satu bentuk berkas timing untuk video panjang dan Shorts. Keduanya dibaca
 *  komposisi dengan cara yang sama persis (`cari`, `beat`), jadi keduanya harus
 *  lahir dari pencetak yang sama — bukan dari dua template yang mirip. */
const tulisTiming = ({ tujuan, sumberVO, judul, timing, TOTAL, WPM, PAD }) => {
  const keluar = ringkas(timing);
  const menit = Math.floor(TOTAL / 60);

  const isi = `/* DIGENERATE oleh tools/bangun-timing.mjs dari ideas/${slug}/naskah.md
   (daftar scene) + ${sumberVO}/<kunci>-vo.md (teks VO).
   Jangan disunting tangan — ubah sumbernya lalu bangun ulang.
   Berkas ini di-ignore git.

   ${judul} — ${keluar.length} scene · total ${TOTAL} dtk (${menit} mnt ${Math.round(TOTAL % 60)} dtk)
   Durasi = (kata / ${WPM} wpm) x 60 + ${PAD} dtk napas. */

export type Beat = {
  /** Satu baris di blok \`## VO\` rencana VO. */
  readonly teks: string;
  /** Detik mulai, relatif terhadap awal SCENE — bukan awal episode. */
  readonly mulai: number;
  readonly durasi: number;
};

export type Timing = {
  /** ID dari kolom pertama tabel scene di naskah.md. */
  readonly id: string;
  /** \`<urutan>-<id>\` — nama berkas scene, rencana VO, direction, DAN id komposisi Remotion. */
  readonly kunci: string;
  /** Posisi di urutan tayang, 1-based. Scene standar ikut terhitung. */
  readonly urut: number;
  /** Bagian flow (docs/02) — mis. "3 problem" di video panjang, "payoff" di Shorts. */
  readonly bagian: string;
  /** Satu baris ringkas dari naskah: apa yang scene ini kerjakan. */
  readonly ringkas: string;
  /** Detik mulai, relatif terhadap awal keluaran ini. */
  readonly mulai: number;
  readonly durasi: number;
  /** true untuk opening & closing — komponennya milik shared/, bukan episode. */
  readonly standar: boolean;
  /** Seluruh teks VO scene ini, satu baris; kosong kalau rencana VO belum ada. */
  readonly vo: string;
  /** Teks VO per baris + detiknya. Dipakai komposisi untuk menjatuhkan gerakan
   *  tepat di kalimat yang bersangkutan, tanpa mengetik hasil hitungan tangan. */
  readonly beat: readonly Beat[];
  /** Path berkas VO relatif terhadap public/ — kosong selama berkasnya belum ada.
   *
   *  Inilah saklar preview/final tiap scene, dan ia tidak pernah disetel tangan:
   *  kosong -> scene tampil dengan SUBTITEL preview, terisi -> subtitelnya hilang
   *  dan suaranya yang bicara (shared/Vo.tsx, docs/11). */
  readonly voAudio: string;
};

export const TIMING: readonly Timing[] = ${JSON.stringify(keluar, null, 2)} as const;

export const TOTAL = ${TOTAL};

/** Cari timing satu scene menurut ID atau kunci. Melempar kalau tidak ada di
 *  naskah — lebih baik gagal saat build daripada scene diam-diam berdurasi 0. */
export const cari = (idAtauKunci: string): Timing => {
  const t = TIMING.find(
    (x) => x.id === idAtauKunci || x.kunci === idAtauKunci,
  );
  if (!t) {
    throw new Error(
      \`Scene "\${idAtauKunci}" tidak ada di ${judul} (ideas/${slug}/naskah.md).\`,
    );
  }
  return t;
};

/** Detik mulai beat ke-i sebuah scene, relatif terhadap awal scene itu.
 *
 *  Dipakai di dalam komposisi: \`t(d, { mulai: beat("hook-question", 2), ... })\`.
 *  Melempar kalau beat-nya tidak ada — scene yang menunggu kalimat yang sudah
 *  dihapus dari rencana VO harus gagal saat build, bukan diam-diam animasi di
 *  detik 0. */
export const beat = (idAtauKunci: string, i: number): number => {
  const b = cari(idAtauKunci).beat[i];
  if (!b) {
    throw new Error(
      \`Scene "\${idAtauKunci}" tidak punya beat ke-\${i} — \` +
        \`lihat blok "## VO" di rencana VO-nya.\`,
    );
  }
  return b.mulai;
};
`;

  writeFileSync(tujuan, isi);
};

/** Baris laporan yang sama untuk episode & tiap Short. */
const lapor = (nama, timing, TOTAL) => {
  const tanpaVO = timing.filter((t) => !t.standar && t.beat.length === 0);
  const bicara = timing.filter((t) => !t.standar);
  const bersuara = bicara.filter((t) => t.voAudio);

  console.log(
    `${nama} — ${timing.length} scene, total ${TOTAL} dtk ` +
      `(${Math.floor(TOTAL / 60)} mnt ${Math.round(TOTAL % 60)} dtk).`,
  );
  const terukur = bicara.filter((t) => t.voTerukur);
  console.log(
    `  ${bersuara.length}/${bicara.length} scene sudah punya berkas VO` +
      (bersuara.length === bicara.length
        ? `, semuanya bersuara.`
        : `; ${bicara.length - bersuara.length} sisanya tampil dengan subtitel preview.`),
  );
  console.log(
    terukur.length === bicara.length
      ? `  Timing DIUKUR dari MP3 — bukan lagi perkiraan dari jumlah kata.`
      : `  Timing ${bicara.length - terukur.length} scene masih perkiraan dari jumlah kata.`,
  );
  if (tanpaVO.length) {
    console.log(
      `  ${tanpaVO.length} scene memakai durasi placeholder — rencana VO belum ada. ` +
        `Rinciannya: npm run sisa`,
    );
  }
};

/* --- video panjang ---------------------------------------------------------- */

const ep = bacaEpisode(slug);
tulisTiming({
  tujuan: `ideas/${slug}/timing.gen.ts`,
  sumberVO: `ideas/${slug}/scenes`,
  judul: `video panjang ${slug}`,
  timing: ep.timing,
  TOTAL: ep.TOTAL,
  WPM: ep.WPM,
  PAD: ep.PAD,
});
lapor(`ideas/${slug}/timing.gen.ts`, ep.timing, ep.TOTAL);

/* --- Shorts ----------------------------------------------------------------- */

for (const short of daftarShort(slug)) {
  const s = bacaShort(slug, short);
  const tujuan = `${s.dirVO}/timing.gen.ts`;

  tulisTiming({
    tujuan,
    sumberVO: s.dirVO,
    judul: `Short ${short.nomor} ${slug}`,
    timing: s.timing,
    TOTAL: s.TOTAL,
    WPM: s.WPM,
    PAD: s.PAD,
  });
  lapor(tujuan, s.timing, s.TOTAL);

  /* Batas 60 detik datang dari YouTube, bukan dari kita: video 61 detik
     kehilangan sebagian penempatan feed (docs/02). Dilaporkan keras di sini
     karena ia melar diam-diam — satu kalimat ditambahkan di satu scene, dan
     yang bertambah panjang adalah keluarannya, bukan berkas yang barusan
     disunting. */
  if (s.TOTAL > s.MAKS) {
    console.error(
      `  LEWAT BATAS: ${s.TOTAL} dtk > SHORT_MAX_SECONDS ${s.MAKS} dtk. ` +
        `Potong kalimat di rencana VO-nya, jangan naikkan angka di .env.`,
    );
    process.exitCode = 1;
  }
}
