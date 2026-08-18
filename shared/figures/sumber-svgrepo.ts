/* Geometri mentah tiga figur manusia, disalin apa adanya dari SVG Repo.
 *
 * SUMBERNYA DITARUH TERPISAH DARI KOMPONENNYA dengan sengaja. Path di bawah ini
 * bukan sesuatu yang boleh disunting tangan: ia keluaran mesin, ratusan angka
 * tanpa satu pun yang berarti sendirian, dan satu digit yang berubah tidak akan
 * pernah terbaca sebagai kesalahan — cuma sebagai figur yang bahunya agak aneh.
 * Yang boleh disetel adalah angka penormalan di berkas komponennya, dan angka
 * itu sedikit serta punya nama.
 *
 *   person-silhouette  https://www.svgrepo.com/svg/483875/person-silhouette
 *   policeman          https://www.svgrepo.com/svg/483471/policeman
 *   hacker             https://www.svgrepo.com/svg/483652/hacker
 *
 * Ketiganya dari koleksi yang sama, dan itu bukan kebetulan yang boleh dibuang:
 * bahu, kepala, dan tebal bentuknya digambar tangan yang sama, jadi ketiganya
 * berdiri berdampingan tanpa terlihat dipungut dari tiga tempat. Kalau nanti ada
 * figur manusia keempat, ambil dari koleksi `_x32_` yang sama.
 *
 * SEMUANYA DI SISTEM KOORDINAT ASLINYA — viewBox 0 0 512 512, sumbu y ke bawah,
 * dan tidak satu pun sudah digeser ke titik tumpu. Penormalan itu tugas
 * komponennya, dan `KOTAK` di bawah tiap path adalah yang dipakainya.
 */

/** Kotak isi sebuah figur di koordinat aslinya: batas yang dipakai menormalkan.
 *
 *  `dasar` bukan selalu `bawah`. Untuk figur yang dipotong sebatas dada, `dasar`
 *  adalah garis potongnya — dan itu yang jadi titik tumpu, bukan ujung bawah
 *  gambar aslinya. */
export type KotakFigur = {
  /** Sumbu tengah badan. Ketiga figur ini kebetulan 256 — jangan diandaikan. */
  tengah: number;
  /** y paling atas yang ada isinya (ubun-ubun, atau puncak topi/tudung). */
  atas: number;
  /** y yang jadi garis lantai figur ini. */
  dasar: number;
  /** Lebar isi di sekitar `dasar`, buat memeriksa proporsi antar figur. */
  lebar: number;
};

/* ===========================================================================
   person-silhouette — orang biasa
   ======================================================================== */

/** Bust: kepala, leher, bahu yang melebar sampai tepi bawah viewBox. */
export const PERSON_D =
  "M359.51,367.614c-19.106-7.148-40.877-18.276-40.877-32.676c0-9.533,0-21.444,0-37.782" +
  "c6.996-19.393,17.51-20.781,22.768-50.546c12.254-4.379,19.258-11.384,28.009-42.026" +
  "c6.574-23.064-3.112-29.254-9.382-30.905c0.128-1.229,0.256-2.466,0.359-3.917" +
  "c2.369-34.543,22.425-137.078-47.012-149.332c-18.38-14.296-30.043-20.774-69.437-18.38" +
  "C219.001,2.042,200.046,7.547,173.632,0c-35.245,29.565-25.561,126.66-20.63,173.504" +
  "c-6.199,1.388-16.889,7.148-10.052,31.08c8.744,30.641,15.748,37.646,28.001,42.026" +
  "c5.258,29.765,21.252,39.322,22.417,50.546c0,16.338,0,28.248,0,37.782" +
  "c0,14.4-23.494,26.55-40.877,32.676C119.058,379.397,25.911,414.275,34.073,512h443.856" +
  "C486.09,414.275,392.712,380.035,359.51,367.614z";

/** Dipakai UTUH sampai 512, dan itu keputusan yang sempat salah sekali.
 *
 *  Percobaan pertama memotongnya di 350 supaya lebarnya sama dengan bahu
 *  `Sosok` versi garis yang digantikannya. Yang terjadi: bahu figur ini baru
 *  mulai melebar di 367, jadi potongan itu membuang SELURUH bahunya dan
 *  menyisakan kepala di atas tunggul. Bust ini memang digambar melebar sampai
 *  tepi bawah gambarnya — itu bentuk bakunya, bukan kelebihan yang perlu
 *  dipangkas. */
export const PERSON_KOTAK: KotakFigur = { tengah: 256, atas: 0, dasar: 512, lebar: 444 };

/* ===========================================================================
   policeman — petugas
   ======================================================================== */

/** Topi berpuncak: bagian yang menjorok ke depan. Digambar TERPISAH dari
 *  badannya di sumber aslinya, dan dibiarkan terpisah di sini — ia satu-satunya
 *  bagian yang perlu ikut tercermin waktu `hadap` dibalik. */
export const POLICEMAN_TOPI_D =
  "M294.372,42.341L308.071,16.925L265.736,0L209.683,23.644L216.648,42.341Z";

/** Kepala + pita topi. */
export const POLICEMAN_KEPALA_D =
  "M219.317,54.007l-0.584,17.537c0,20.809,16.865,37.67,37.674,37.67" +
  "c20.809,0,37.678-16.861,37.678-37.67h12.259l-15.185-17.537H219.317z";

/** Badan: bahu, dasi, sabuk, kaki. Kakinya ikut disalin walau nanti terpotong —
 *  memangkas path-nya di sini berarti menyunting keluaran mesin, dan potongan
 *  itu urusan `dasar` di kotaknya. */
export const POLICEMAN_BADAN_D =
  "M294.51,125.957h-11.989l-26.519,26.63l-26.515-26.63h-11.994" +
  "c-28.953,0-52.423,24.979-52.423,55.787v160.418h35.439V512h34.302l21.19-154.732" +
  "L277.192,512h34.302V342.162h35.435V181.744C346.93,150.936,323.464,125.957,294.51,125.957z" +
  "M303.728,216.253c1.489,10.238-11.282,18.331-16.381,18.331c-4.027,0-17.87-8.093-16.377-18.331" +
  "c1.068-7.323,3.173-5.433,0.493-17.783l15.884-3.24l15.892,3.24" +
  "C300.55,210.82,302.663,208.93,303.728,216.253z" +
  "M311.494,297.431v16.266h-55.492H200.51v-16.266h55.492H311.494z";

/** Dipotong di 250, di bawah sabuknya. Ini figur badan penuh sampai kaki,
 *  satu-satunya dari ketiganya yang begitu — dipakai utuh, ia berdiri setinggi
 *  dua setengah kali yang lain di lantai yang sama. Potongannya menyisakan dasi
 *  (195–234) dan sabuk (297 terpotong), dua penanda yang membuatnya terbaca
 *  sebagai petugas dan bukan sekadar orang bertopi. */
export const POLICEMAN_KOTAK: KotakFigur = { tengah: 256, atas: 0, dasar: 250, lebar: 182 };

/* ===========================================================================
   hacker — sosok bertudung
   ======================================================================== */

/** Tudung: puncaknya, lalu tepi lebar yang sekaligus jadi bahunya. */
export const HACKER_TUDUNG_D =
  "M378.625,209.465c-6.531-38.344-13.672-80-15.844-91.844" +
  "c-5.313-28.906-43.375-45.063-71.656-24.234c-14.828,10.938-28.094,11.719-35.125,11.719" +
  "s-14.828,1.563-35.125-11.719c-29.391-19.219-66.344-4.672-71.656,24.234" +
  "c-2.172,11.844-9.313,53.5-15.844,91.844C53.906,219.418,0,238.778,0,261.012" +
  "c0,32.438,114.625,58.719,256,58.719c141.391,0,256-26.281,256-58.719" +
  "C512,238.778,458.094,219.418,378.625,209.465z";

/** Wajah di bawah tepi tudung, dengan dua lensa kacamata sebagai lubangnya.
 *  Dua lensa itu yang membuat bentuk ini terbaca dalam seperempat detik; tanpa
 *  keduanya yang tersisa cuma orang berjaket. */
export const HACKER_WAJAH_D =
  "M109.125,330.45l7.547,86.515c39.563,6.719,79.734,10.219,119.703,11.078" +
  "L256,401.278l19.625,26.765c39.969-0.859,80.141-4.359,119.703-11.078l7.547-86.515" +
  "c-48.375,9.359-97.906,13.5-146.875,13.5C207.016,343.95,157.516,339.809,109.125,330.45z" +
  "M186.688,401.997c-33.469-1.578-35.563-41.766-35.563-41.766l75.125,14.672" +
  "C226.25,374.903,220.156,403.59,186.688,401.997z" +
  "M360.875,360.231c0,0-2.094,40.188-35.563,41.766c-33.469,1.594-39.563-27.094-39.563-27.094" +
  "L360.875,360.231z";

/** Satu-satunya dari ketiganya yang aslinya SUDAH sebatas dada, jadi `dasar`-nya
 *  ujung bawah gambarnya sendiri. `atas` 93 bukan 0: viewBox-nya punya ruang
 *  kosong di atas puncak tudung, dan memakai 0 membuat figur ini duduk lebih
 *  rendah dari dua lainnya tanpa alasan yang terlihat. */
export const HACKER_KOTAK: KotakFigur = { tengah: 256, atas: 93, dasar: 428, lebar: 512 };
