/* Menyalin setelan produksi dari .env ke berkas TypeScript yang bisa diimpor
   komposisi Remotion — shared/config.gen.ts.

   Kenapa perlu perantara. Komposisi Remotion di-bundle untuk browser, dan
   `process.env` di sana tidak berisi .env kita; Remotion hanya meneruskan
   variabel berawalan REMOTION_. Menamai ulang semua variabel spesifikasi jadi
   REMOTION_* akan memutus tools/*.mjs yang sudah membacanya, jadi .env tetap
   satu-satunya sumber dan berkas ini yang jadi jembatannya.

   Kenapa daftar putih, bukan salin semua. .env berisi API key ElevenLabs dan
   kelak token YouTube. Bundle Remotion dikirim ke browser dan bisa ikut masuk
   ke berkas render — apa pun yang tersalin ke sini sama saja dengan dibocorkan.
   Hanya nama yang tercantum di IZIN yang boleh lewat, dan setiap nilai masih
   dilewatkan penjaga pola di bawah.

   Jalankan:  node --env-file=.env tools/bangun-config.mjs
   Otomatis lewat npm pre-script (studio / render / build).
   Keluarannya di-ignore git — dibangun ulang, bukan disimpan.
*/
import { writeFileSync } from "node:fs";

const IZIN = {
  angka: [
    "VIDEO_FPS",
    "LONG_WIDTH",
    "LONG_HEIGHT",
    "LONG_TARGET_SECONDS",
    "SHORT_WIDTH",
    "SHORT_HEIGHT",
    "SHORT_MAX_SECONDS",
    "THUMB_WIDTH",
    "THUMB_HEIGHT",
    "VO_PAD_SECONDS",
    "VO_WORDS_PER_MINUTE",
    "OPENING_SECONDS",
    "CLOSING_LONG_SECONDS",
    "CLOSING_SHORT_SECONDS",
  ],
  teks: [
    "CHANNEL_NAME",
    "CHANNEL_HANDLE",
    "CHANNEL_URL",
    "CTA_TEXT",
    "CTA_URL",
  ],
};

/* Nilai yang hanya boleh salah satu dari daftar. Divalidasi di sini, bukan di
   komposisi: salah ketik yang baru ketahuan saat render adalah salah ketik yang
   ketahuan enam menit terlambat. */
const PILIHAN = {
  SUBTITLE_MODE: ["auto", "on", "off"],
};

/* Penjaga terakhir. Kalau suatu saat ada yang menambahkan nama bernuansa
   rahasia ke IZIN, skrip berhenti alih-alih menuliskannya. */
const BERBAHAYA = /KEY|SECRET|TOKEN|PASSWORD|CLIENT_ID|CREDENTIAL/i;

const ambil = (nama) => {
  if (BERBAHAYA.test(nama)) {
    throw new Error(
      `tools/bangun-config.mjs: "${nama}" kelihatan seperti secret dan tidak ` +
        `boleh masuk bundle. Hapus dari IZIN.`,
    );
  }
  const v = process.env[nama];
  if (v === undefined || v === "") {
    throw new Error(
      `tools/bangun-config.mjs: ${nama} kosong di .env. ` +
        `Isi dulu — lihat .env.example dan docs/08-konfigurasi.md.`,
    );
  }
  return v;
};

const angka = (nama) => {
  const v = Number(ambil(nama));
  if (!Number.isFinite(v)) {
    throw new Error(`tools/bangun-config.mjs: ${nama} bukan angka.`);
  }
  return v;
};

const pilihan = (nama, sah) => {
  const v = ambil(nama);
  if (!sah.includes(v)) {
    throw new Error(
      `tools/bangun-config.mjs: ${nama}="${v}" tidak dikenal. ` +
        `Pilihannya: ${sah.join(" | ")}. Lihat .env.example.`,
    );
  }
  return v;
};

const baris = [
  ...IZIN.angka.map((n) => `  ${n}: ${angka(n)},`),
  ...IZIN.teks.map((n) => `  ${n}: ${JSON.stringify(ambil(n))},`),
  ...Object.entries(PILIHAN).map(
    ([n, sah]) => `  ${n}: ${JSON.stringify(pilihan(n, sah))},`,
  ),
];

const isi = `/* DIGENERATE oleh tools/bangun-config.mjs — jangan disunting tangan.
   Sumbernya .env; ubah di sana lalu bangun ulang. Berkas ini di-ignore git. */

export const CFG = {
${baris.join("\n")}
} as const;

export const FPS = CFG.VIDEO_FPS;

/** Detik -> frame. Semua durasi di naskah ditulis dalam detik; Remotion
 *  menghitung dalam frame. Pembulatan dilakukan di satu tempat saja supaya
 *  scene tidak pernah meleset setengah frame dari yang berikutnya. */
export const f = (detik: number): number => Math.round(detik * FPS);
`;

writeFileSync("shared/config.gen.ts", isi);
console.log(
  `shared/config.gen.ts ditulis — ${
    IZIN.angka.length + IZIN.teks.length + Object.keys(PILIHAN).length
  } nilai, 0 secret.`,
);
