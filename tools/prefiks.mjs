/* prefiks.mjs — awalan id komposisi per slug.
 *
 * CERMIN dari src/Root.tsx, satu-satunya tempat id komposisi benar-benar
 * ditentukan. Berkas ini ada supaya cerminnya cuma SATU: sebelum ini
 * tools/periksa-tumpang.mjs memegang salinannya sendiri, dan alat kedua yang
 * butuh id komposisi berarti dua tempat yang bisa lupa diperbarui saat episode
 * ketiga masuk.
 *
 * T01 sengaja tanpa awalan — lihat komentar di src/Root.tsx: perintah `still`
 * yang sudah tertulis di dokumen T01 tidak boleh putus.
 */

export const PREFIKS = {
  "apa-itu-ram": "",
  "dns-server": "t14",
  /* T15 sudah punya folder `ideas/` dan sudah masuk skrip npm, tapi BELUM
     didaftarkan di src/Root.tsx. Nilainya di sini mengikuti aturan yang sama
     (kode topik, CLAUDE.md HARD RULE 1); kalau nanti Root.tsx memakai yang lain,
     yang benar Root.tsx dan baris ini yang menyesuaikan — bukan sebaliknya. */
  "apa-itu-firewall": "t15",
  "apa-itu-enkripsi": "t16",
};

/** Awalan untuk video panjang sebuah slug. `null` kalau slug-nya belum dikenal —
 *  pemanggilnya yang memutuskan mau berhenti atau memakai `--prefiks`. */
export const prefiksEpisode = (slug) => (slug in PREFIKS ? PREFIKS[slug] : null);

/** Awalan id scene Short — DUA LAPIS sejak Shorts T14 didaftarkan (2026-08-14):
 *
 *    s1-01-menunggu        Short 1 T01   (slug tanpa awalan episode)
 *    t14-s1-01-dari-belakang  Short 1 T14
 *
 *  Lapis `s<n>` memisahkan Short dari video panjang; lapis kode topik memisahkan
 *  episode dari episode. Yang kedua dulu ditulis di sini sebagai utang yang akan
 *  jatuh tempo, dan memang jatuh: `09-loop` dan `99-closing` ada di Short 1 KEDUA
 *  episode, jadi tanpa lapis ini `s1-09-loop` bertabrakan — dan Remotion menolak
 *  dua komposisi dengan id yang sama saat RENDER, bukan saat `tsc`.
 *
 *  Yang lebih halus, dan itu alasan `slug` sekarang wajib: sebelum lapis ini
 *  dipasang, memeriksa `s1-09-loop` milik T14 diam-diam memeriksa scene T01 yang
 *  namanya kebetulan sama — lulus, tanpa satu pun tanda bahwa yang diperiksa
 *  scene episode lain.
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
