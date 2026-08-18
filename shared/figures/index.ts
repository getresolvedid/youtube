/* Figur SVG lintas episode. Aturan isi folder ini: ./README.md
 *
 * Dipakai dari `panggung-*.tsx` topik atau langsung dari scene:
 *
 *   import { Sosok, Lantai, ABU } from "../../../shared/figures";
 *
 * Semuanya mengembalikan `<g>` — pasang di dalam `<svg viewBox>` milik scene,
 * bukan berdiri sendiri.
 */

export { ABU, AKSEN, GELAP, ISI, ISI_AKSEN, LUBANG, TEDUH, teksAngka, teksDasar } from "./palet";
export { buatKamera, type Kamera } from "./kamera";
export { Gembok } from "./Gembok";
export { Lantai } from "./Lantai";
export { TanganMemegang } from "./TanganMemegang";

/* Tiga figur manusia. Satu koleksi siluet, satu tinggi baku, prop yang sama —
   scene boleh menukar yang satu dengan yang lain tanpa menata ulang apa pun.
   → ./sumber-svgrepo.ts untuk asal geometrinya. */
export { Sosok } from "./Sosok";
export { Penjaga } from "./Penjaga";
export { Peretas } from "./Peretas";
export { TINGGI_FIGUR, lebarPada, normalisasi } from "./normalisasi";
export {
  HACKER_KOTAK,
  PERSON_KOTAK,
  POLICEMAN_KOTAK,
  type KotakFigur,
} from "./sumber-svgrepo";
