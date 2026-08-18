/* Nama peran warna & gaya teks untuk figur SVG.
 *
 * Ketiga `panggung-*.tsx` yang ada menuliskan empat baris yang sama persis di
 * kepalanya. Yang dinamai di sini BUKAN warnanya — warnanya milik
 * `theme.css` (docs/03) — melainkan PERANNYA di dalam sebuah figur, supaya
 * sebuah bentuk bisa pindah episode tanpa membawa keputusan warna ikut.
 */

/** Garis benda biasa: badan, tepi, apa pun yang cuma perlu terlihat. */
export const ABU = "var(--ink-1)";

/** Garis yang sengaja mundur: lantai, jalan, benda yang bukan subjek. */
export const GELAP = "var(--line)";

/** Satu-satunya warna yang menarik mata. Dipakai untuk benda yang sedang
 *  dibicarakan VO saat itu — bukan untuk "yang penting", karena kalau tiga
 *  benda beraksen sekaligus tidak ada satu pun yang beraksen. */
export const AKSEN = "var(--accent-ink)";

/** Lebih redup dari ABU: bayangan, benda yang jauh, benda yang sudah lewat. */
export const TEDUH = "var(--ink-2)";

/** Isi permukaan yang berdiri di atas latar — kartu, papan, badan benda. */
export const ISI = "var(--bg-elev)";

/** Isi yang harus terbaca BERLUBANG di atas permukaan: pintu, jendela, layar. */
export const LUBANG = "var(--bg)";

/** Isi permukaan saat ia sedang beraksen. */
export const ISI_AKSEN = "var(--accent-soft)";

/** Gaya dasar `<text>` di dalam figur: rata tengah pada titik jangkarnya, dua
 *  sumbu sekaligus. Tanpa ini tiap label harus menebak offset baselinenya
 *  sendiri, dan tebakan itu berbeda-beda di tiap scene.
 *
 *  `fontSize` dan `fill` SENGAJA tidak ada di sini — keduanya keputusan per
 *  label, dan bawaan yang salah lebih mahal daripada tidak ada bawaan. */
export const teksDasar = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  textAnchor: "middle" as const,
  dominantBaseline: "middle" as const,
};

/** Varian angka: bentuk yang sama, tapi huruf mono supaya deret angka yang
 *  berubah (nomor, ukuran, hitungan) tidak bergoyang lebarnya tiap frame. */
export const teksAngka = {
  ...teksDasar,
  fontFamily: "var(--font-mono)",
};
