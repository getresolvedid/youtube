/* periksa-tumpang.mjs — apakah ada figur yang saling menutupi.
 *
 *   node --env-file=.env tools/periksa-tumpang.mjs <slug> [opsi]
 *
 *     --prefiks <p>   awalan id komposisi scene (mis. t14). Lihat catatan di
 *                     PREFIKS di tools/prefiks.mjs — sumbernya src/Root.tsx.
 *     --short <fld>   periksa satu Short, mis. s1-nugget (prefiksnya ikut)
 *     --kunci <k>     satu scene saja — dipakai saat menggarap scene itu
 *     --simpan        simpan SEMUA frame sampel, bukan cuma yang bertumpuk
 *
 * KENAPA BUKAN DARI PIKSEL. Dari PNG, "dua benda bertumpuk" dan "satu benda
 * yang memang berbentuk begitu" terlihat sama persis. Yang membedakan cuma ada
 * di DOM: kotak siapa, seluas apa. Jadi yang mengukur adalah
 * shared/PeriksaTumpang.tsx, di dalam raman, saat frame-nya dirender; berkas
 * ini cuma memilih FRAME MANA yang diperiksa dan menangkap hasilnya lewat
 * `onBrowserLog`.
 *
 * KENAPA LEWAT API NODE, BUKAN CLI. `remotion still` membangun bundle dan
 * menyalakan raman baru setiap kali dipanggil. Perintah ini menyampel ratusan
 * frame, jadi bundle-nya dibangun sekali dan ramannya dipakai ulang — bedanya
 * menit lawan jam. tools/periksa-frame.mjs tetap lewat CLI karena ia cuma
 * sepuluh frame dan tidak sebanding menyeret dua paket lagi ke sana.
 *
 * FRAME MANA YANG DISAMPEL. Tumpang-tindih itu bergantung waktu: benda masuk,
 * benda lain keluar, dan di antara keduanya mereka memang berbagi ruang dengan
 * sengaja. Yang diperiksa karena itu bukan frame acak melainkan titik TENANG —
 * sesaat setelah gerak masuk satu beat selesai, dan sesaat sebelum beat
 * berikutnya mengubah layar. Beat-nya dari tools/baca-episode.mjs, modul yang
 * sama dengan yang menghitung timing dan mengirim ke mesin TTS.
 *
 * SATU TINGKAT SAJA, dan ia menggigit (exit 1). Beda dengan vo-script-audit
 * yang punya tingkat B: "dua kotak beririsan 40%" bukan sesuatu yang perlu
 * dinilai selera. Yang memang sengaja bertumpuk menandai dirinya sendiri di
 * berkas scene dengan `data-tumpang="sengaja"` — dan itu keputusan yang menetap
 * di komposisinya, bukan di kepala orang yang membaca laporannya.
 */
import { existsSync, mkdirSync, readdirSync, rmSync, unlinkSync } from "node:fs";
import { join } from "node:path";

import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";

import { bacaEpisode, bacaShort, daftarShort, wajib } from "./baca-episode.mjs";
import {
  pesanPrefiksHilang,
  PREFIKS,
  prefiksEpisode,
  prefiksShort,
} from "./prefiks.mjs";

const KELUARAN = "out/tumpang";
const FPS = wajib("VIDEO_FPS");

/* Awalan id komposisi datang dari tools/prefiks.mjs — satu cermin src/Root.tsx
   untuk semua alat. Kalau meleset, perintah ini BERHENTI dengan daftar id yang
   sebenarnya ada, bukan diam-diam memeriksa scene yang keliru. */

/* Titik tenang, dalam detik relatif terhadap awal beat. 0,7 dtk cukup untuk
   gerak masuk baku di shared/anim.ts (mulai 0,05 · durasi ~0,55) selesai; 0,15
   dtk sebelum beat berikutnya adalah frame terakhir yang masih "keadaan jadi"
   beat ini. Angkanya dipilih, bukan diturunkan — tapi ia cuma menentukan DI
   MANA melihat, bukan apa yang dianggap cacat. */
const SETELAH_MASUK = 0.7;
const SEBELUM_GANTI = 0.15;

/** Batas sampel per scene. Scene dengan sepuluh beat menghasilkan dua puluh
 *  frame, dan sesudah beberapa titik pertama nilai tambahnya turun tajam —
 *  yang bertumpuk di detik 4 hampir selalu masih bertumpuk di detik 5. */
const MAKS_SAMPEL = 12;

/* --- argumen --------------------------------------------------------------- */

const argv = process.argv.slice(2);
const opsi = (nama) => {
  const i = argv.indexOf(`--${nama}`);
  return i === -1 ? null : argv[i + 1];
};
const slug = argv[0] && !argv[0].startsWith("--") ? argv[0] : "apa-itu-ram";
const folderShort = opsi("short");
const kunciSatu = opsi("kunci");
const simpanSemua = argv.includes("--simpan");

const prefiksArg = opsi("prefiks");
if (prefiksArg === null && !(slug in PREFIKS) && !folderShort) {
  console.error(pesanPrefiksHilang(slug));
  process.exit(1);
}

/* --- daftar scene yang diperiksa ------------------------------------------- */

const sumber = (() => {
  if (!folderShort) {
    const e = bacaEpisode(slug);
    return {
      nama: `${slug} · video panjang`,
      timing: e.timing,
      prefiks: prefiksArg ?? prefiksEpisode(slug),
    };
  }

  const daftar = daftarShort(slug);
  const pilih = daftar.find((s) => s.folder === folderShort);
  if (!pilih) {
    console.error(
      `Short "${folderShort}" tidak ada. Yang ada: ` +
        daftar.map((s) => s.folder).join(", "),
    );
    process.exit(1);
  }
  /* bacaShort menerima OBJEK dari daftarShort, bukan nama foldernya — ia butuh
     `.nomor` untuk menemukan bagian "## Short N" di naskah.md. */
  const s = bacaShort(slug, pilih);
  /* Awalan id Short DUA LAPIS: kode topik + nomor subfoldernya —
     `s1-01-hook` (T01, tanpa kode topik) dan `t14-s1-01-dari-belakang`
     (src/Root.tsx · tools/prefiks.mjs). Slug-nya wajib ikut: tanpa itu,
     memeriksa `09-loop` milik T14 diam-diam memeriksa scene T01 yang namanya
     kebetulan sama — dan lulus. */
  return {
    nama: `${slug} · ${folderShort}`,
    timing: s.timing,
    prefiks: prefiksArg ?? prefiksShort(slug, pilih),
  };
})();

const idKomposisi = (kunci) =>
  sumber.prefiks ? `${sumber.prefiks}-${kunci}` : kunci;

const scenes = sumber.timing.filter((t) => !kunciSatu || t.kunci === kunciSatu);
if (kunciSatu && scenes.length === 0) {
  console.error(
    `Scene "${kunciSatu}" tidak ada di ${sumber.nama}. Yang ada:\n  ` +
      sumber.timing.map((t) => t.kunci).join("\n  "),
  );
  process.exit(1);
}

/** Detik-detik yang disampel untuk satu scene. Scene standar (opening/closing)
 *  tidak punya beat karena memang tidak bicara — ia disampel di tiga titik
 *  sepanjang durasinya. */
const titikSampel = (t) => {
  const beats = t.beat ?? [];
  const detik = beats.length
    ? beats.flatMap((b) => [
        b.mulai + SETELAH_MASUK,
        b.mulai + b.durasi - SEBELUM_GANTI,
      ])
    : [0.25, 0.55, 0.85].map((p) => t.durasi * p);

  const frame = [
    ...new Set(
      detik
        .filter((d) => d >= 0 && d < t.durasi)
        .map((d) => Math.round(d * FPS)),
    ),
  ].sort((a, b) => a - b);

  if (frame.length <= MAKS_SAMPEL) return frame;
  /* Ditipiskan merata, bukan dipotong di ujung: memotong ujung berarti separuh
     akhir setiap scene panjang tidak pernah diperiksa sama sekali. */
  const langkah = frame.length / MAKS_SAMPEL;
  return Array.from(
    { length: MAKS_SAMPEL },
    (_, i) => frame[Math.floor(i * langkah)],
  );
};

/* --- jalankan -------------------------------------------------------------- */

/** Input props yang sama persis dipakai di DUA tempat. `selectComposition`
 *  yang MENYELESAIKAN props komponen (defaultProps + inputProps); yang dikirim
 *  ke `renderStill` sesudahnya cuma mengubah `getInputProps()`. Kalau di sini
 *  beda, `subtitel: false` tidak pernah sampai ke komponennya — kotak subtitel
 *  ikut terukur dan setiap scene melaporkan tumpang palsu. */
const props = (kunci) => ({ kunci, subtitel: false, periksaTumpang: true });

/* Remotion menggemakan `console.log` dari raman ke stdout, dan itu tidak bisa
   dimatikan lewat logLevel karena barisnya melewati pemeta source map lebih
   dulu. Yang digemakan di sini adalah muatan JSON pengukur — yang justru
   sedang kita tangkap lewat onBrowserLog — jadi ia disaring di sini supaya
   laporannya bisa dibaca. Log raman yang LAIN tetap lewat. */
const PENANDA = "TUMPANG::";
const tulisAsli = process.stdout.write.bind(process.stdout);
process.stdout.write = (chunk, ...sisa) =>
  String(chunk).includes(PENANDA) ? true : tulisAsli(chunk, ...sisa);

/* Satu subfolder per sasaran. Kalau semuanya menumpuk di satu folder, mengaudit
   T01 menghapus bukti PNG T14 yang laporannya baru saja menyuruh dibuka. */
const dirBukti = join(KELUARAN, folderShort ? `${slug}-${folderShort}` : slug);
rmSync(dirBukti, { recursive: true, force: true });
mkdirSync(dirBukti, { recursive: true });

console.log(`Membangun bundle …`);
const serveUrl = await bundle({
  entryPoint: "./src/index.ts",
  /* Sama dengan remotion.config.ts — bundle-nya dibangun sekali di sini, jadi
     setelan CLI di berkas itu tidak berlaku dan harus disebut ulang. */
  onProgress: () => {},
});

/* gl "angle" menyamai remotion.config.ts. Kalau ramannya menggambar dengan
   backend lain, ukuran teks bisa berbeda beberapa piksel — dan perintah ini
   memutuskan berdasarkan ukuran. */
const browser = await openBrowser("chrome", {
  chromiumOptions: { gl: "angle" },
  logLevel: "error",
});

let gagal = 0;
let diperiksa = 0;
const laporan = [];

console.log(`\n=== ${sumber.nama} · ${scenes.length} scene ===\n`);

for (const t of scenes) {
  const id = idKomposisi(t.kunci);
  const frames = titikSampel(t);
  process.stdout.write(`  ${id} · ${frames.length} frame … `);

  let komposisi;
  try {
    komposisi = await selectComposition({
      serveUrl,
      id,
      puppeteerInstance: browser,
      inputProps: props(t.kunci),
      logLevel: "error",
    });
  } catch (e) {
    console.log("KOMPOSISI TIDAK ADA");
    console.log(
      `    ${String(e.message).split("\n")[0]}\n` +
        `    Cek awalan id di PREFIKS (tools/prefiks.mjs) terhadap src/Root.tsx.`,
    );
    gagal++;
    continue;
  }

  const temuanScene = [];

  for (const frame of frames) {
    if (frame >= komposisi.durationInFrames) continue;
    const berkas = join(dirBukti, `${id}-f${String(frame).padStart(4, "0")}.png`);
    let temuan = null;

    await renderStill({
      composition: komposisi,
      serveUrl,
      output: berkas,
      frame,
      /* subtitel: false — kotak subtitel preview (shared/Vo.tsx) menempel di
         bawah layar dan akan beririsan dengan isi scene di hampir semua frame.
         Ia tidak ikut ke MP4 begitu VO-nya jadi, jadi melaporkannya berarti
         melaporkan sesuatu yang tidak akan pernah ditonton siapa pun. */
      inputProps: props(t.kunci),
      puppeteerInstance: browser,
      chromiumOptions: { gl: "angle" },
      imageFormat: "png",
      /* Setengah ukuran: cukup untuk dilihat mata saat menelusuri temuan, dan
         pengukurannya sendiri terjadi di DOM ukuran penuh — tidak terpengaruh. */
      scale: 0.5,
      overwrite: true,
      logLevel: "error",
      onBrowserLog: (log) => {
        const i = log.text.indexOf("TUMPANG::");
        if (i === -1) return;
        try {
          temuan = JSON.parse(log.text.slice(i + "TUMPANG::".length));
        } catch {
          temuan = null;
        }
      },
    });

    diperiksa++;

    if (temuan === null) {
      console.log("\n    PENGUKUR TIDAK BERJALAN — <PeriksaTumpang> tidak terpasang?");
      gagal++;
      break;
    }

    if (temuan.length) {
      temuanScene.push({ frame, berkas, temuan });
    } else if (!simpanSemua) {
      unlinkSync(berkas);
    }
  }

  if (temuanScene.length) {
    const total = temuanScene.reduce((n, f) => n + f.temuan.length, 0);
    console.log(`${total} tumpang di ${temuanScene.length} frame`);
    laporan.push({ id, kunci: t.kunci, frames: temuanScene });
    gagal += total;
  } else {
    console.log("ok");
  }
}

await browser.close({ silent: true });
process.stdout.write = tulisAsli;

/* --- laporan --------------------------------------------------------------- */

for (const s of laporan) {
  console.log(`\n--- ${s.id} ---`);
  for (const f of s.frames) {
    console.log(`  frame ${f.frame} (${(f.frame / FPS).toFixed(2)} dtk) · ${f.berkas}`);
    for (const t of f.temuan) {
      console.log(`    ${(t.rasio * 100).toFixed(0)}% · ${t.a}`);
      console.log(`             x ${t.b}`);
      console.log(
        `             irisan ${t.kotak.w}x${t.kotak.h} di (${t.kotak.x}, ${t.kotak.y})`,
      );
    }
  }
}

const sisaBerkas = existsSync(dirBukti) ? readdirSync(dirBukti).length : 0;

if (gagal) {
  console.error(
    `\n${gagal} tumpang-tindih di ${diperiksa} frame yang diperiksa. ` +
      `${sisaBerkas} PNG tersimpan di ${dirBukti}/ — BUKA DAN LIHAT sebelum ` +
      `mengubah komposisinya.\n` +
      `Yang memang disengaja: tandai elemennya \`data-tumpang="sengaja"\` di ` +
      `berkas scene-nya, jangan longgarkan ambang di tools/periksa-tumpang.mjs.`,
  );
  process.exit(1);
}

console.log(
  `\n${diperiksa} frame diperiksa, tidak ada yang bertumpuk. ` +
    `Ini memeriksa KOTAK, bukan selera — frame yang lolos masih bisa jelek.`,
);
