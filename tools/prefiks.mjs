/* prefiks.mjs — awalan id komposisi per slug.
 *
 * CERMIN dari src/Root.tsx, satu-satunya tempat id komposisi benar-benar
 * ditentukan. Berkas ini ada supaya cerminnya cuma SATU: sebelum ini
 * tools/periksa-tumpang.mjs memegang salinannya sendiri, dan alat kedua yang
 * butuh id komposisi berarti dua tempat yang bisa lupa diperbarui saat episode
 * ketiga masuk.
 */

export const PREFIKS = {
  /* PROVISIONAL — topiknya masih `mentah` di ideas/tcp-ip/ide.md dan belum
     masuk docs/07. T18 dipakai karena id komposisi butuh awalan yang stabil
     SEKARANG.

     TIGA KODE DI BAWAHNYA SUDAH TERPAKAI DAN TIDAK PERNAH DIDAUR ULANG, dan
     ketiganya tidak punya berkas lagi di repo ini: T15 (firewall) dan T17
     (enkripsi) TAYANG lalu dikeluarkan 2026-08-18, T16 dibatalkan 2026-08-17. Kode yang didaur ulang
     membuat catatan lama di dokumen, pesan commit, dan id komposisi menunjuk
     topik yang salah — tanpa satu pun tanda. */
  "tcp-ip": "t18",

  /* JALUR CEPAT (fast_ideas/). T19 diambil karena T18 yang tertinggi terpakai;
     T15, T16, dan T17 sudah mati dan tidak pernah didaur ulang. Topik ini tidak
     punya video panjang — nilai di bawah dipakai `prefiksShort()` saja. */
  "neural-network": "t19",
};

/** Awalan untuk video panjang sebuah slug. `null` kalau slug-nya belum dikenal —
 *  pemanggilnya yang memutuskan mau berhenti atau memakai `--prefiks`. */
export const prefiksEpisode = (slug) => (slug in PREFIKS ? PREFIKS[slug] : null);

/** Awalan id scene Short — DUA LAPIS:
 *
 *    t15-s1-01-hook  Short 1 T15
 *
 *  Lapis `s<n>` memisahkan Short dari video panjang; lapis kode topik memisahkan
 *  episode dari episode. Yang kedua bukan hiasan: `09-loop` dan `99-closing` ada
 *  di Short 1 SETIAP episode, jadi tanpa lapis ini `s1-09-loop` bertabrakan —
 *  dan Remotion menolak dua komposisi dengan id yang sama saat RENDER, bukan
 *  saat `tsc`.
 *
 *  Yang lebih halus, dan itu alasan `slug` wajib: tanpa lapis ini, memeriksa
 *  `s1-09-loop` milik satu episode diam-diam memeriksa scene episode lain yang
 *  namanya kebetulan sama — lulus, tanpa satu pun tanda.
 *
 *  Aturannya sama persis dengan scene video panjang (CLAUDE.md HARD RULE 1), dan
 *  sumbernya tetap src/Root.tsx — kalau di sana berbeda, yang benar Root.tsx dan
 *  berkas ini yang menyesuaikan. */
export const prefiksShort = (slug, short) => {
  const p = prefiksEpisode(slug);
  return `${p ? `${p}-` : ""}s${short.nomor}`;
};

/** Pesan berhenti yang seragam untuk slug yang belum terdaftar. */
export const pesanPrefiksHilang = (slug) =>
  `Awalan id komposisi untuk "${slug}" belum dikenal. Tambahkan ke PREFIKS di ` +
  `tools/prefiks.mjs (nilainya ada di src/Root.tsx) atau kirim --prefiks <p>.`;
