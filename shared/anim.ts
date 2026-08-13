/* Koreografi — pengganti GSAP.
   Aturan pakai: docs/03-tema-visual.md § Gerak

   Perbedaan pokok dari timeline GSAP yang dipakai sebelumnya: di sini tidak ada
   timeline yang "dijalankan". Setiap nilai animasi adalah FUNGSI MURNI dari
   detik ke berapa frame ini berada. Remotion merender frame 1.234 tanpa pernah
   merender 1.233, jadi apa pun yang bergantung pada state sebelumnya akan
   pecah — dan sebaliknya, seek ke titik mana pun selalu benar.

   Waktu di seluruh berkas ini dalam DETIK, bukan frame. Naskah, tabel timing,
   dan docs semuanya bicara detik; konversi ke frame terjadi sekali saja di
   shared/config.gen.ts (`f()`) dan di batas <Sequence>.
*/
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/** Detik ke berapa frame yang sedang dirender berada, relatif terhadap awal
 *  <Sequence> terdekat. */
export const useDetik = (): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

/* Padanan easing GSAP yang dipakai di komposisi lama. Namanya dipertahankan
   supaya koreografi yang sudah diuji (docs/10) bisa dibaca berdampingan dengan
   versi GSAP-nya tanpa menerjemahkan dalam kepala.

   GSAP power1/2/3 = kuadrat/kubik/pangkat-4. */
export const E = {
  linear: Easing.linear,
  power1out: Easing.out(Easing.quad),
  power2out: Easing.out(Easing.cubic),
  power3out: Easing.out(Easing.poly(4)),
  power1in: Easing.in(Easing.quad),
  power2in: Easing.in(Easing.cubic),
  expoOut: Easing.out(Easing.exp),
  sineInOut: Easing.inOut(Easing.sin),
  /** `back.out(s)` GSAP — s adalah besar lonjakan lewat target (default 1,7). */
  backOut: (s = 1.70158) => Easing.out(Easing.back(s)),
} as const;

export type Tween = {
  /** Detik mulai, relatif terhadap awal scene. */
  mulai: number;
  durasi: number;
  dari: number;
  ke: number;
  ease?: (t: number) => number;
};

/** Satu tween skalar. Di luar rentangnya nilainya dijepit — sebelum `mulai`
 *  tetap `dari`, sesudah selesai tetap `ke`. Tanpa penjepitan ini scene yang
 *  di-seek ke detik akhir akan menampilkan nilai ekstrapolasi yang liar. */
export const t = (detik: number, o: Tween): number =>
  interpolate(detik, [o.mulai, o.mulai + o.durasi], [o.dari, o.ke], {
    easing: o.ease ?? E.power2out,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Bolak-balik sekali: `dari` -> `ke` -> `dari`, masing-masing separuh durasi.
 *  Padanan `yoyo: true, repeat: 1` di GSAP. Dipakai untuk gerak kecil di
 *  tengah scene panjang supaya layarnya tidak benar-benar diam. */
export const tPP = (detik: number, o: Tween): number => {
  const h = o.durasi / 2;
  return interpolate(
    detik,
    [o.mulai, o.mulai + h, o.mulai + o.durasi],
    [o.dari, o.ke, o.dari],
    {
      easing: o.ease ?? E.sineInOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
};

/* --------------------------------------------------------------------------
   Masuk & keluar scene

   Scene TIDAK mengatur visibilitas dirinya sendiri (dulu lewat `autoAlpha`) —
   itu tugas <Sequence>. Yang diatur di sini hanya cara isinya muncul.
   -------------------------------------------------------------------------- */

export type Masuk = {
  /** Urutan elemen dalam satu scene. Elemen ke-i tertunda i x jeda. */
  urutan?: number;
  mulai?: number;
  durasi?: number;
  jeda?: number;
  /** Jarak naik saat muncul, dalam px. */
  geser?: number;
};

/** Muncul dari bawah sambil memudar masuk — gerak baku setiap elemen scene.
 *  Padanan `tl.from("[data-anim]", {opacity:0, y:18, ease:"expo.out",
 *  stagger:0.07})` di komposisi HyperFrames. */
export const masuk = (
  detik: number,
  o: Masuk = {},
): { opacity: number; transform: string } => {
  const mulai = (o.mulai ?? 0.05) + (o.urutan ?? 0) * (o.jeda ?? 0.07);
  const durasi = o.durasi ?? 0.45;
  const geser = o.geser ?? 18;
  return {
    opacity: t(detik, { mulai, durasi, dari: 0, ke: 1, ease: E.expoOut }),
    transform: `translateY(${t(detik, {
      mulai,
      durasi,
      dari: geser,
      ke: 0,
      ease: E.expoOut,
    })}px)`,
  };
};

/** Memudar keluar di ekor scene. Dipakai untuk scene yang perlu menutup diri
 *  (brand sting), bukan untuk scene biasa — potongan keras antar-scene adalah
 *  gaya channel ini (docs/03), jadi jangan ditaburkan ke mana-mana. */
export const keluar = (
  detik: number,
  durasiScene: number,
  panjang = 0.28,
): number =>
  t(detik, {
    mulai: durasiScene - panjang,
    durasi: panjang,
    dari: 1,
    ke: 0,
    ease: E.power1in,
  });

/** Garis SVG yang menggambar diri. `keliling` = panjang path, dipakai sebagai
 *  dasharray sekaligus offset awal. */
export const gambarGaris = (
  detik: number,
  keliling: number,
  o: { mulai: number; durasi: number; ease?: (t: number) => number },
): { strokeDasharray: number; strokeDashoffset: number } => ({
  strokeDasharray: keliling,
  strokeDashoffset: t(detik, {
    mulai: o.mulai,
    durasi: o.durasi,
    dari: keliling,
    ke: 0,
    ease: o.ease ?? E.power2out,
  }),
});
