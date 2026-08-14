/* periksa-jahitan.mjs — apakah potongan keras antar-scene benar-benar menyambung.
 *
 *   node --env-file=.env tools/periksa-jahitan.mjs <slug> [opsi]
 *
 *     --prefiks <p>   awalan id komposisi scene (mis. t14), lihat tools/prefiks.mjs
 *     --short <fld>   periksa satu Short, mis. s1-nugget
 *     --jahitan <k>   satu sambungan saja: kunci scene SESUDAHNYA, mis. 12-ganti-loket
 *
 * APA YANG DIPERIKSA. Setiap berkas direction di repo ini membuka dengan klausul
 * yang sama: "frame pertamanya = frame terakhir <scene sebelumnya>". Itu yang
 * membuat potong keras terbaca DISENGAJA — docs/02 mematok 95% perpindahan scene
 * tanpa transisi, dan yang menanggungnya cuma dua hal: VO yang menyambung
 * (HARD RULE 7, dicetak `npm run sisa`) dan gambar yang tidak melompat. Yang
 * kedua sampai sekarang cuma klaim di `.md`.
 *
 * Perintah ini merender DUA frame per sambungan — frame terakhir scene N dan
 * frame pertama scene N+1 — lalu membandingkan daftar benda di keduanya:
 *
 *     dipegang   benda yang sama, di tempat yang sama       <- ini jembatannya
 *     bergeser   benda yang sama, pindah lebih dari ambang
 *     hilang     ada di N, tidak ada di N+1
 *     muncul     ada di N+1, tidak ada di N
 *
 * KENAPA BUKAN SELISIH PIKSEL: lihat catatan kepala shared/PeriksaJahitan.tsx.
 * Ringkasnya, angka tanpa nama tidak bisa ditindaklanjuti, dan gradien latar
 * membuatnya bergerak sendiri.
 *
 * DUA TINGKAT, dan cuma yang pertama menggigit.
 *
 *   A · LOMPAT (exit 1)   porsi dipegang di bawah AMBANG_LOMPAT. Praktis tidak
 *                         ada satu pun benda yang menyeberangi potongannya.
 *                         Ini bukan soal selera — direction-nya menjanjikan
 *                         pewarisan frame dan frame-nya tidak diwarisi.
 *
 *   B · TIPIS (dilaporkan) di bawah AMBANG_TIPIS. Mungkin benar — pergantian
 *                         panggung yang dibayar di muka memang menyisakan
 *                         sedikit — jadi yang memutuskan mata, lewat PNG-nya.
 *
 * SAMBUNGAN YANG SENGAJA MENGANGA menulis alasannya di berkas direction scene
 * SESUDAHNYA, satu baris yang dimulai `jahitan: menganga`:
 *
 *     jahitan: menganga — potongan kejut, panggungnya memang berganti total
 *
 * Bentuknya sama dengan `data-tumpang="sengaja"`: keputusannya menetap di berkas
 * yang digarap, bukan di ambang di dalam alat ini. Tanpa baris itu, sesi
 * berikutnya akan "memperbaiki" sambungan yang sudah benar.
 *
 * YANG TIDAK DIPERIKSA. Sambungan yang disela scene standar — hook ke opening,
 * scene terakhir ke closing. Kartu judul memang layar yang sama sekali lain
 * (docs/10), dan jembatan 1 -> 3 di situ murni urusan VO.
 */
import { mkdirSync, readFileSync, existsSync, rmSync } from "node:fs";
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

const KELUARAN = "out/jahitan";
const FPS = wajib("VIDEO_FPS");

/* --- ambang. Angkanya dipilih, bukan diturunkan ----------------------------- */

/** Jarak pusat maksimum, dalam piksel panggung 1920x1080, supaya sebuah benda
 *  dihitung DIPEGANG dan bukan BERGESER. Bukan nol: dua komposisi merender
 *  benda yang sama lewat dua pohon React, dan pembulatan tata letak bisa
 *  menggeser satu-dua piksel. 12 kira-kira batas ketika pergeseran mulai
 *  terlihat sebagai kedutan di potongan keras. */
const AMBANG_GESER = 12;

/** Porsi benda yang dipegang. Di bawah ini potongannya melompat. Rendah dengan
 *  sengaja: yang diburu tingkat A adalah sambungan yang tidak mewarisi apa pun,
 *  bukan sambungan yang mewarisi sedikit. Alat yang keluarannya selalu merah
 *  akan dimatikan orang dalam seminggu. */
const AMBANG_LOMPAT = 0.15;

/** Di bawah ini dilaporkan sebagai tipis, tanpa menggigit. */
const AMBANG_TIPIS = 0.5;

/* --- argumen --------------------------------------------------------------- */

const argv = process.argv.slice(2);
const opsi = (nama) => {
  const i = argv.indexOf(`--${nama}`);
  return i === -1 ? null : argv[i + 1];
};
const slug = argv[0] && !argv[0].startsWith("--") ? argv[0] : "apa-itu-ram";
const folderShort = opsi("short");
const jahitanSatu = opsi("jahitan");
const prefiksArg = opsi("prefiks");

if (prefiksArg === null && !(slug in PREFIKS) && !folderShort) {
  console.error(pesanPrefiksHilang(slug));
  process.exit(1);
}

/* --- sumber ---------------------------------------------------------------- */

const sumber = (() => {
  if (!folderShort) {
    const e = bacaEpisode(slug);
    return {
      nama: `${slug} · video panjang`,
      timing: e.timing,
      dirVO: e.dirVO,
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
  const s = bacaShort(slug, pilih);
  return {
    nama: `${slug} · ${folderShort}`,
    timing: s.timing,
    dirVO: s.dirVO,
    prefiks: prefiksArg ?? prefiksShort(slug, pilih),
  };
})();

const idKomposisi = (kunci) =>
  sumber.prefiks ? `${sumber.prefiks}-${kunci}` : kunci;

/* --- daftar sambungan ------------------------------------------------------ */

/** Pasangan scene yang benar-benar bersentuhan: keduanya bicara, dan tidak ada
 *  scene standar di antaranya. */
const semuaJahitan = [];
for (let i = 0; i < sumber.timing.length - 1; i++) {
  const a = sumber.timing[i];
  const b = sumber.timing[i + 1];
  if (a.standar || b.standar) continue;
  semuaJahitan.push({ a, b });
}

const disela = sumber.timing
  .map((t, i) => ({ t, i }))
  .filter(({ t }) => t.standar)
  .map(({ t, i }) => ({
    kunci: t.kunci,
    sebelum: sumber.timing[i - 1]?.kunci ?? null,
    sesudah: sumber.timing[i + 1]?.kunci ?? null,
  }));

const jahitan = semuaJahitan.filter(
  (j) => !jahitanSatu || j.b.kunci === jahitanSatu,
);
if (jahitanSatu && jahitan.length === 0) {
  console.error(
    `Tidak ada sambungan yang berujung di "${jahitanSatu}". Yang ada:\n  ` +
      semuaJahitan.map((j) => j.b.kunci).join("\n  "),
  );
  process.exit(1);
}

/** Baris `jahitan: menganga …` di berkas direction scene SESUDAHNYA. */
const menganga = (kunci) => {
  const berkas = join(sumber.dirVO, `${kunci}-direction.md`);
  if (!existsSync(berkas)) return null;
  const m = readFileSync(berkas, "utf8").match(/^\s*jahitan:\s*menganga\s*(.*)$/im);
  return m ? (m[1].replace(/^[—–-]\s*/, "").trim() || "tanpa alasan tertulis") : null;
};

/* --- pembandingan ---------------------------------------------------------- */

const pusat = (b) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
const jarak = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);

/** Memasangkan benda frame A dengan benda frame B, satu-ke-satu, per kunci.
 *  Serakah dari pasangan terdekat: dua bilah identik yang bertukar tempat
 *  dipasangkan ke tetangga terdekatnya, bukan disilangkan. */
const bandingkan = (A, B) => {
  const kunciSemua = new Set([...A.map((b) => b.kunci), ...B.map((b) => b.kunci)]);
  const dipegang = [];
  const bergeser = [];
  const hilang = [];
  const muncul = [];

  for (const k of kunciSemua) {
    const a = A.filter((b) => b.kunci === k);
    const b = B.filter((x) => x.kunci === k);

    const pasangan = [];
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        pasangan.push({ i, j, d: jarak(pusat(a[i]), pusat(b[j])) });
      }
    }
    pasangan.sort((x, y) => x.d - y.d);

    const pakaiA = new Set();
    const pakaiB = new Set();
    for (const p of pasangan) {
      if (pakaiA.has(p.i) || pakaiB.has(p.j)) continue;
      pakaiA.add(p.i);
      pakaiB.add(p.j);
      if (p.d <= AMBANG_GESER) dipegang.push({ benda: a[p.i], d: p.d });
      else bergeser.push({ benda: a[p.i], ke: b[p.j], d: p.d });
    }
    a.forEach((x, i) => !pakaiA.has(i) && hilang.push(x));
    b.forEach((x, j) => !pakaiB.has(j) && muncul.push(x));
  }

  const n = Math.max(A.length, B.length);
  return {
    dipegang,
    bergeser,
    hilang,
    muncul,
    porsi: n === 0 ? 0 : dipegang.length / n,
  };
};

/* --- jalankan -------------------------------------------------------------- */

const props = (kunci) => ({ kunci, subtitel: false, periksaJahitan: true });

/* Remotion menggemakan console.log raman ke stdout lebih dulu lewat pemeta
   source map, jadi muatan JSON pengukur — yang justru sedang ditangkap
   onBrowserLog — disaring di sini supaya laporannya bisa dibaca. */
const PENANDA = "JAHITAN::";
const tulisAsli = process.stdout.write.bind(process.stdout);
process.stdout.write = (chunk, ...sisa) =>
  String(chunk).includes(PENANDA) ? true : tulisAsli(chunk, ...sisa);

const dirBukti = join(KELUARAN, folderShort ? `${slug}-${folderShort}` : slug);
rmSync(dirBukti, { recursive: true, force: true });
mkdirSync(dirBukti, { recursive: true });

console.log("Membangun bundle …");
const serveUrl = await bundle({ entryPoint: "./src/index.ts", onProgress: () => {} });

/* gl "angle" menyamai remotion.config.ts — backend gambar lain menggeser ukuran
   teks beberapa piksel, dan perintah ini memutuskan berdasarkan ukuran. */
const browser = await openBrowser("chrome", {
  chromiumOptions: { gl: "angle" },
  logLevel: "error",
});

/** Merender satu frame dan mengembalikan daftar bendanya. */
const ukur = async (kunci, sisi, pilihFrame) => {
  const id = idKomposisi(kunci);
  let komposisi;
  try {
    komposisi = await selectComposition({
      serveUrl,
      id,
      puppeteerInstance: browser,
      inputProps: props(kunci),
      logLevel: "error",
    });
  } catch (e) {
    return { gagal: `komposisi "${id}" tidak ada — ${String(e.message).split("\n")[0]}` };
  }

  const frame = pilihFrame(komposisi.durationInFrames);
  const berkas = join(dirBukti, `${kunci}-${sisi}-f${String(frame).padStart(4, "0")}.png`);
  let benda = null;

  await renderStill({
    composition: komposisi,
    serveUrl,
    output: berkas,
    frame,
    /* subtitel: false — kotak subtitel preview (shared/Vo.tsx) berganti teks di
       SETIAP sambungan, dengan sengaja. Ia tidak ikut ke MP4 begitu VO-nya jadi,
       jadi membiarkannya terukur berarti setiap jahitan melaporkan satu benda
       hilang dan satu muncul yang tidak akan pernah ditonton siapa pun. */
    inputProps: props(kunci),
    puppeteerInstance: browser,
    chromiumOptions: { gl: "angle" },
    imageFormat: "png",
    /* Setengah ukuran: PNG-nya cuma untuk dilihat mata; pengukurannya terjadi di
       DOM ukuran penuh dan tidak terpengaruh. */
    scale: 0.5,
    overwrite: true,
    logLevel: "error",
    onBrowserLog: (log) => {
      const i = log.text.indexOf(PENANDA);
      if (i === -1) return;
      try {
        benda = JSON.parse(log.text.slice(i + PENANDA.length));
      } catch {
        benda = null;
      }
    },
  });

  return { benda, berkas, frame };
};

console.log(`\n=== ${sumber.nama} · ${jahitan.length} sambungan ===\n`);

const laporan = [];
/* DIPISAH dengan sengaja. `lompat` adalah temuan tentang episodenya; `salah`
   adalah perintah ini yang tidak bisa bekerja — awalan id meleset, scene belum
   didaftarkan di src/Root.tsx. Digabung jadi satu penghitung, laporan akhirnya
   pernah bilang "8 sambungan LOMPAT" untuk delapan komposisi yang tidak ada. */
let lompat = 0;
let salah = 0;

for (const j of jahitan) {
  const label = `${j.a.kunci} -> ${j.b.kunci}`;
  process.stdout.write(`  ${label} … `);

  const alasan = menganga(j.b.kunci);

  /* Frame TERAKHIR scene N, frame PERTAMA scene N+1 — persis dua frame yang
     bersentuhan saat episodenya diputar. */
  const kiri = await ukur(j.a.kunci, "akhir", (n) => n - 1);
  const kanan = await ukur(j.b.kunci, "awal", () => 0);

  if (kiri.gagal || kanan.gagal) {
    /* BERHENTI, tidak diteruskan. Komposisi yang tidak ada hampir selalu berarti
       awalan id-nya meleset atau scene-nya belum didaftarkan di src/Root.tsx —
       dan kalau begitu SEMUA sambungan sesudahnya akan gagal dengan sebab yang
       sama. Meneruskan cuma menghasilkan sepuluh salinan pesan yang sama, dan
       raman yang ditinggalkan setengah jalan pernah membuat perintah ini mati
       dengan ProtocolError di `browser.close()` — pesan yang menyembunyikan
       sebab aslinya. */
    console.log("GAGAL");
    console.log(`    ${kiri.gagal ?? kanan.gagal}`);
    console.log(
      "    Cek awalan id di PREFIKS (tools/prefiks.mjs) terhadap src/Root.tsx —\n" +
        "    dan pastikan scene-nya memang sudah didaftarkan di sana.\n" +
        "\n  Perintah ini BERHENTI — bukan temuan tentang episodenya.",
    );
    /* Keluar SEKARANG, tanpa menutup raman dengan rapi. `selectComposition` yang
       gagal meninggalkan halaman yang gagal ditutup, dan penolakan susulannya
       muncul sebagai ProtocolError yang menimpa pesan di atas dengan jejak tumpukan
       puppeteer. Yang perlu dibaca orang adalah dua baris tadi, bukan itu. */
    process.exitCode = 1;
    process.exit(1);
  }

  if (kiri.benda === null || kanan.benda === null) {
    console.log("PENGUKUR TIDAK BERJALAN — <PeriksaJahitan> tidak terpasang di <Panggung>?");
    salah++;
    break;
  }

  const hasil = bandingkan(kiri.benda, kanan.benda);
  const porsi = `${(hasil.porsi * 100).toFixed(0)}%`;

  if (alasan !== null) {
    console.log(`menganga, disengaja (${porsi} dipegang) — ${alasan}`);
    continue;
  }

  const tingkat =
    hasil.porsi < AMBANG_LOMPAT ? "A" : hasil.porsi < AMBANG_TIPIS ? "B" : null;

  if (tingkat === null) {
    console.log(`ok · ${porsi} dipegang (${hasil.dipegang.length} benda)`);
    continue;
  }

  console.log(
    tingkat === "A"
      ? `LOMPAT · cuma ${porsi} dipegang`
      : `tipis · ${porsi} dipegang`,
  );
  if (tingkat === "A") lompat++;
  laporan.push({ label, tingkat, hasil, kiri, kanan });
}

/* Ramannya bisa sudah mati kalau ada komposisi yang gagal dipilih — dan matinya
   `close()` akan menutupi laporan yang justru sudah selesai disusun. */
try {
  await browser.close({ silent: true });
} catch {
  /* sudah tertutup; tidak ada yang perlu dilakukan */
}
process.stdout.write = tulisAsli;

/* --- laporan --------------------------------------------------------------- */

const daftarBenda = (judul, arr, n = 6) => {
  if (!arr.length) return;
  console.log(`    ${judul} (${arr.length}):`);
  for (const b of arr.slice(0, n)) {
    const x = b.benda ?? b;
    /* `ke` cuma ada pada yang BERGESER. Yang dipegang juga membawa `d`, dan
       memakai `d` sebagai penanda pernah membuat perintah ini pecah. */
    console.log(
      `      ${x.nama} di (${x.x}, ${x.y})` +
        (b.ke ? ` -> (${b.ke.x}, ${b.ke.y}), ${Math.round(b.d)}px` : ""),
    );
  }
  if (arr.length > n) console.log(`      … ${arr.length - n} lagi`);
};

for (const l of laporan) {
  console.log(`\n--- ${l.tingkat} · ${l.label} ---`);
  console.log(`    ${l.kiri.berkas}`);
  console.log(`    ${l.kanan.berkas}`);
  console.log(
    `    ${l.hasil.dipegang.length} dipegang · ${l.hasil.bergeser.length} bergeser · ` +
      `${l.hasil.hilang.length} hilang · ${l.hasil.muncul.length} muncul`,
  );
  /* Yang dipegang tidak dirinci — ia yang BENAR, dan mencetak 45 baris benar di
     atas 3 baris yang perlu dilihat adalah cara tercepat membuat laporan ini
     tidak dibaca. */
  daftarBenda("bergeser", l.hasil.bergeser);
  daftarBenda("hilang di frame kedua", l.hasil.hilang);
  daftarBenda("muncul di frame kedua", l.hasil.muncul);
}

for (const s of disela) {
  console.log(
    `\n  ${s.sebelum ?? "—"} -> ${s.kunci} -> ${s.sesudah ?? "—"}  ` +
      `(scene standar, tidak diperiksa: kartu judul & tanda brand memang layar lain — docs/10)`,
  );
}

if (salah) {
  console.error(
    `\nPerintah ini BERHENTI sebelum selesai — bukan temuan tentang episodenya. ` +
      `Betulkan penyebabnya di atas, lalu jalankan lagi.`,
  );
  process.exit(1);
}

if (lompat) {
  console.error(
    `\n${lompat} sambungan LOMPAT. PNG kedua sisinya ada di ${dirBukti}/ — ` +
      `buka berpasangan dan lihat sendiri.\n` +
      `Perbaikannya hampir selalu di frame TERAKHIR scene sebelumnya: tinggalkan ` +
      `sesuatu di layar yang scene berikutnya bisa tumbuh dari situ.\n` +
      `Yang memang sengaja menganga: tulis \`jahitan: menganga — <alasan>\` di ` +
      `berkas direction scene sesudahnya, jangan longgarkan ambang di berkas ini.`,
  );
  process.exit(1);
}

console.log(
  `\n${jahitan.length} sambungan diperiksa, tidak ada yang lompat. ` +
    `Ini memeriksa KOTAK, bukan selera — sambungan yang lolos masih bisa terasa ` +
    `tiba-tiba kalau VO-nya tidak menjembatani (HARD RULE 7, \`npm run sisa\`).`,
);
