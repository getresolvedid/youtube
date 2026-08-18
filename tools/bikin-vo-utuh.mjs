/**
 * bikin-vo-utuh.mjs — satu Short disintesis dalam SATU permintaan, lalu dipotong
 * jadi satu MP3 per scene.
 *
 *   node --env-file=.env tools/bikin-vo-utuh.mjs <slug> --target S1            rencana
 *   node --env-file=.env tools/bikin-vo-utuh.mjs <slug> --target S1 --jalan    jalan
 *   node --env-file=.env tools/bikin-vo-utuh.mjs <slug> --target S1 --coba     ke out/
 *
 * KENAPA ADA:
 *
 * bikin-vo.mjs memanggil Gemini sekali per scene, dan tiap panggilan buta
 * terhadap tetangganya. Akibatnya terukur: teks yang sama, setelan yang sama,
 * durasi mentahnya berayun 31% antar-panggilan — lebih besar daripada seluruh
 * jangkauan aman pengali `tempo`. Sembilan potongan Short jadi jatuh di tempo
 * yang acak satu sama lain, dan pencerita yang berganti kecepatan tanpa sebab di
 * tiap potongan justru lawan dari terdengar wajar.
 *
 * Di sini kesembilan scene dikirim sebagai satu naskah. Model membacanya sebagai
 * satu pertunjukan: temponya konsisten dengan sendirinya, dan sambungan antar-scene
 * (HARD RULE 7) benar-benar tersambung di suaranya — bukan cuma di naskahnya.
 * Ini juga yang menggantikan `previous_text`/`next_text` yang hilang bersama
 * mesin lama, dan menggantikannya dengan cara yang lebih kuat: bukan konteks
 * yang dibisikkan, melainkan satu tarikan napas yang sama.
 *
 * YANG DITUKAR: potongannya dicari, bukan diketahui. Gemini menaruh jeda di
 * tengah kalimat juga, jadi "senyap" saja bukan bukti batas scene. Penjaganya
 * ada di § POTONG di bawah, dan semuanya menggigit: gagal = NOL berkas ditulis,
 * bukan sembilan berkas yang batasnya meleset.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";

import { bacaEpisode, bacaShort, daftarShort, wajib } from "./baca-episode.mjs";
import { siapkan } from "./tts-gemini.mjs";

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const flag = (n) => argv.includes(n);
const opt = (n, b) => {
  const i = argv.indexOf(n);
  return i === -1 ? b : argv[i + 1];
};

const TARGET = String(opt("--target", "S1")).toUpperCase();
const JALAN = flag("--jalan");
const COBA = flag("--coba");
const PAKSA = flag("--paksa");

if (!slug) {
  console.error(
    "Pakai: node --env-file=.env tools/bikin-vo-utuh.mjs <slug> --target L|S1|S2|S3|S4 [--coba] [--jalan]",
  );
  process.exit(1);
}

const FFMPEG = process.env.FFMPEG_PATH?.trim() || "ffmpeg";
const MAX_CHARS = wajib("VO_MAX_CHARS_PER_TOPIC");

const durasiDari = (f) =>
  Number(
    execFileSync(
      process.env.FFPROBE_PATH?.trim() || "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
      { encoding: "utf8" },
    ).trim(),
  );

/* --- scene-nya -------------------------------------------------------------- */

const sumber =
  TARGET === "L"
    ? bacaEpisode(slug)
    : bacaShort(slug, daftarShort(slug).find((s) => s.prefiks === TARGET) ?? {});

const scenes = (sumber.timing ?? []).filter((t) => !t.standar && t.vo.trim());
if (scenes.length < 2) {
  console.error(`${slug} ${TARGET}: cuma ${scenes.length} scene bicara — tidak ada yang perlu dipotong.`);
  process.exit(1);
}

/* Gerbang naskah beku — sama dengan bikin-vo.mjs. Dilewati saat --coba, karena
   percobaan suara memang harus bisa jalan sebelum naskahnya dibekukan. */
if (!COBA) {
  const naskah = readFileSync(`ideas/${slug}/naskah.md`, "utf8");
  const blok = /^naskah_beku:[^\n]*\n((?:[ \t]+\S[^\n]*\n)*)/m.exec(naskah);
  const beku = new Map();
  for (const baris of blok?.[1]?.split("\n") ?? []) {
    const m = /^\s*([A-Za-z0-9]+):([^#\n]*)/.exec(baris);
    if (m?.[2]?.trim()) beku.set(m[1].toUpperCase(), m[2].trim());
  }
  if (!beku.has(TARGET)) {
    console.error(
      `\nideas/${slug}/naskah.md: "${TARGET}" belum punya tanggal di naskah_beku.\n` +
        `VO tidak dibuat dari naskah yang belum lewat gerbang docs/04 §5.\n` +
        `Untuk percobaan suara sebelum beku, pakai --coba.\n`,
    );
    process.exit(1);
  }
}

/* --- naskah gabungan --------------------------------------------------------
 *
 * Dipisah baris kosong, bukan spasi. Batas scene harus punya alasan untuk
 * dijeda model — tanpa itu ia membaca sembilan kalimat sebagai satu paragraf
 * rapat, dan pemotongnya kehilangan satu-satunya penanda yang ia punya. */
/* Pemisahnya audio tag `[long pause]`, disuntikkan DI SINI — bukan diketik ke
   blok `## VO`. Ini persis pembagian yang sama dengan kamus pengucapan: naskah
   menyimpan apa yang DIKATAKAN, dan hal-hal yang cuma dimengerti mesin TTS
   ditempelkan di batasnya. Blok `## VO` tetap bersih untuk keempat pembacanya.

   Kenapa perlu: tanpa penanda, batas scene harus DITEBAK dari panjang jeda —
   dan terukur di Short ini, jeda antar-scene (0,65–0,99 dtk) tumpang tindih
   dengan jeda di tengah kalimat (0,52–0,65 dtk). Tidak ada ambang yang
   memisahkan keduanya, jadi satu batas salah pilih dan semua sesudahnya ikut
   bergeser. Tag ini membuat batasnya dibuat, bukan dicari. */
const PEMISAH = opt("--pemisah", "[long pause]");

/** --pisah <n>: n scene PERTAMA disintesis sendiri-sendiri, sisanya menyatu.
 *
 *  Ada karena bacaan utuh membeli keseragaman dengan membayar jangkauan
 *  dinamis. Terukur di Short T14: VO lama membaca hook 22% lebih cepat
 *  daripada rata-rata Short-nya; bacaan satu-permintaan cuma 6% — hook-nya rata
 *  bersama yang lain, karena model membaca kesembilan kalimat sebagai satu
 *  paragraf.
 *
 *  Untuk Nugget itu justru yang paling mahal hilangnya: beat pertamanya adalah
 *  KLAIM yang berdiri sendiri, bukan kelanjutan apa pun (docs/02 § Anatomi
 *  Shorts) — dan `01-dari-belakang-vo.md` sudah menulis di `## Catatan` bahwa
 *  ketiadaan undangan di situ disengaja. Jadi memisahnya bukan kompromi
 *  teknis; ia mengikuti bentuk naskahnya.
 *
 *  Sambungan yang memang harus tersambung di suaranya (HARD RULE 7) semuanya
 *  ada di scene ke-2 dan sesudahnya, dan itu tetap satu tarikan napas. */
const PISAH = Number(opt("--pisah", 0));
if (!Number.isInteger(PISAH) || PISAH < 0 || PISAH > scenes.length - 2) {
  console.error(
    `\n--pisah ${opt("--pisah")} tidak masuk akal — harus 0..${scenes.length - 2}, ` +
      `karena yang menyatu harus tersisa minimal 2 scene.\n`,
  );
  process.exit(1);
}

const sendiri = scenes.slice(0, PISAH);
const gabung = scenes.slice(PISAH);

const dirOut = COBA ? `out/voicetest/${slug}` : `public/vo/${slug}`;

/** --batch <n>: paling banyak n scene per permintaan. 0 = semuanya sekaligus.
 *
 *  ADA KARENA SATU PERMINTAAN PUNYA LANGIT-LANGIT, dan langit-langit itu tidak
 *  mengumumkan diri. Video panjang T14 (955 kata) dikirim utuh dan Gemini
 *  mengembalikan 50,3 detik — sekitar seperenam naskahnya — tanpa error, tanpa
 *  potongan yang ditandai, cuma aliran yang berhenti. Pemotongnya lalu tidak
 *  bisa jalan sama sekali, dan yang tersisa adalah jalan per scene: sebelas
 *  panggilan buta satu sama lain, temponya berayun 119–161 wpm (36%), dan
 *  hook-nya terdengar seperti pencerita yang lain.
 *
 *  Batch itu jalan tengah yang jujur, bukan yang terbaik: yang terbaik tetap
 *  satu permintaan, dan itulah sebabnya bakunya masih 0. Yang dibeli batch cuma
 *  ini — SEDIKIT sambungan yang menyeberangi permintaan, bukan nol. Di dalam
 *  satu batch, tempo dan pembawaannya tetap satu tarikan napas.
 *
 *  Karena itu batasnya dipilih mengikuti BAGIAN FLOW (docs/02), bukan angka
 *  bulat: sambungan yang paling mahal (3 → 4, tempat `[what]` dinamai — HARD
 *  RULE 6) harus jatuh DI DALAM satu batch, tidak pernah di antara dua. */
const BATCH = Number(opt("--batch", 0));
if (!Number.isInteger(BATCH) || BATCH < 0 || (BATCH > 0 && BATCH < 2)) {
  console.error(
    `\n--batch ${opt("--batch")} tidak masuk akal — harus 0 (semua sekaligus) atau ≥ 2.\n` +
      `Batch berisi 1 scene tidak punya batas untuk dicari, dan itu sama saja\n` +
      `dengan jalan per scene yang justru sedang dihindari.\n`,
  );
  process.exit(1);
}

/** --pecah-di <kunci,kunci>: batch BARU dimulai tepat di scene-scene ini.
 *
 *  Ini bentuk yang benar untuk keluaran sungguhan, dan --batch <n> tinggal
 *  jalan cepat untuk mencoba-coba. Alasannya ada di komentar --batch di atas:
 *  batas batch adalah satu-satunya tempat tempo boleh bergeser, jadi ia harus
 *  ditaruh di sambungan yang paling tahan digeser — batas BAGIAN FLOW — dan
 *  bukan di tempat yang kebetulan jatuh saat scene dihitung berempat.
 *
 *  Yang paling tidak boleh: sambungan 3 → 4, tempat `[what]` akhirnya dinamai
 *  (HARD RULE 6). Di situ celahnya paling lebar dan justru harus terdengar
 *  seperti jawaban — pencerita yang berganti tempo persis di situ membatalkan
 *  seluruh bagian 3. */
const PECAH_DI = String(opt("--pecah-di", ""))
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (PECAH_DI.length && BATCH > 0) {
  console.error(`\n--pecah-di dan --batch tidak bisa dipakai bersama — pilih satu.\n`);
  process.exit(1);
}

for (const k of PECAH_DI) {
  const i = gabung.findIndex((s) => s.kunci === k);
  if (i < 0) {
    console.error(
      `\n--pecah-di "${k}": tidak ada scene menyatu dengan kunci itu.\n` +
        `Yang ada: ${gabung.map((s) => s.kunci).join(", ")}\n`,
    );
    process.exit(1);
  }
  if (i === 0) {
    console.error(
      `\n--pecah-di "${k}": itu scene PERTAMA yang menyatu — memecah di situ\n` +
        `menghasilkan batch kosong. Batas batch ditaruh di scene yang MEMULAI\n` +
        `batch berikutnya.\n`,
    );
    process.exit(1);
  }
}

/** Sisa yang cuma 1 scene dilebur ke batch sebelumnya, tidak pernah berdiri
 *  sendiri — batch berisi satu scene adalah panggilan per scene dengan nama
 *  lain, dan ia akan mendarat di tempo yang acak terhadap tetangganya. */
const batches = [];
if (PECAH_DI.length) {
  const titik = new Set(PECAH_DI);
  let kini = [];
  for (const s of gabung) {
    if (titik.has(s.kunci) && kini.length) {
      batches.push(kini);
      kini = [];
    }
    kini.push(s);
  }
  batches.push(kini);
} else if (BATCH === 0) {
  batches.push(gabung);
} else {
  for (let i = 0; i < gabung.length; i += BATCH) batches.push(gabung.slice(i, i + BATCH));
}

/* Berlaku untuk kedua cara membagi: batch berisi satu scene dilebur ke
   tetangganya, karena ia panggilan per scene dengan nama lain. */
for (let i = batches.length - 1; i > 0; i--) {
  if (batches[i].length === 1) batches[i - 1].push(...batches.splice(i, 1)[0]);
}
if (batches.length > 1 && batches[0].length === 1) {
  batches[1].unshift(...batches.shift());
}

/** Tiap batch tahu di mana ia duduk di dalam daftar scene yang bicara — dipakai
 *  cocokkan-vo.mjs lewat --lewati/--sampai untuk menyejajarkan naskah batch ini
 *  saja, bukan seluruh keluaran. */
const rencanaBatch = [];
{
  let mulai = PISAH;
  batches.forEach((b, i) => {
    rencanaBatch.push({
      nomor: i + 1,
      daftar: b,
      lewati: mulai,
      sampai: mulai + b.length,
      naskah: b.map((s) => s.vo).join(`\n\n${PEMISAH}\n\n`),
      kata: b.reduce((n, s) => n + s.kata, 0),
      /* Nama WAV-nya TIDAK berubah saat tidak dibatch — supaya --pakai-wav dan
         berkas rujukan yang sudah ada di folder VO tetap berlaku apa adanya. */
      wav: `${dirOut}/.utuh-${TARGET}${batches.length > 1 ? `-b${i + 1}` : ""}.wav`,
      batasJson:
        `out/voicetest/${slug}/batas-${TARGET}${batches.length > 1 ? `-b${i + 1}` : ""}.json`,
    });
    mulai += b.length;
  });
}

const naskahGabung = gabung.map((s) => s.vo).join(`\n\n${PEMISAH}\n\n`);
const totalKata = gabung.reduce((n, s) => n + s.kata, 0);
const totalChars = naskahGabung.length + sendiri.reduce((n, s) => n + s.chars, 0);

const mesin = siapkan(slug);
const profil = mesin.profil(TARGET);

const permintaan = sendiri.length + batches.length;

console.log(
  `\nbikin-vo-utuh · ${slug} · ${TARGET} · ` +
    (PISAH
      ? `${PISAH} scene sendiri + ${gabung.length} scene menyatu`
      : `${gabung.length} scene menyatu`) +
    ` · ${permintaan} permintaan`,
);
console.log(`  suara ${profil.voice} · tempo ${profil.tempoAngka}`);
if (profil.arahan) console.log(`  arahan "${profil.arahan}"`);
console.log(`  ${totalKata} kata · ${totalChars} karakter · tujuan ${dirOut}/\n`);

const baris = (s, tanda) =>
  console.log(
    `    ${tanda}${TARGET}-${s.kunci}  ${String(s.kata).padStart(3)} kata  ` +
      `"${s.vo.slice(0, 48)}${s.vo.length > 48 ? "…" : ""}"`,
  );

for (const s of sendiri) baris(s, "sendiri ");

for (const b of rencanaBatch) {
  /* Batas antar-batch dicetak sebagai garis, bukan cuma sebagai nomor: inilah
     satu-satunya tempat di seluruh keluaran ini yang tempo boleh bergeser, dan
     ia harus terlihat SEBELUM dibayar — bukan ketahuan saat mendengarkan. */
  if (batches.length > 1) {
    console.log(
      `    ${"─".repeat(6)} batch ${b.nomor}/${batches.length} · ` +
        `${b.daftar.length} scene · ${b.kata} kata · 1 permintaan ${"─".repeat(6)}`,
    );
  }
  for (const s of b.daftar) baris(s, "        ");
}

if (batches.length > 1) {
  console.log(
    `\n  ${batches.length - 1} sambungan menyeberangi batas permintaan: ` +
      rencanaBatch
        .slice(0, -1)
        .map((b, i) => `${b.daftar.at(-1).kunci} → ${rencanaBatch[i + 1].daftar[0].kunci}`)
        .join(", "),
  );
  console.log(`  Di situ tempo boleh bergeser. Dengarkan sambungan itu lebih dulu.`);
}

if (Number(totalChars) > Number(MAX_CHARS)) {
  console.error(`\n${totalChars} karakter di atas pagar ${MAX_CHARS}.`);
  process.exit(1);
}

if (!JALAN) {
  console.log(`\nIni baru rencana — belum ada yang dikirim. Tambahkan --jalan.`);
  console.log(`Percobaan yang tidak menyentuh public/vo/: tambahkan --coba juga.\n`);
  process.exit(0);
}

/* --- sintesis: satu permintaan PER BATCH ------------------------------------ */

mkdirSync(dirOut, { recursive: true });

/* Scene yang dipisah: satu permintaan masing-masing, langsung jadi MP3 — tidak
   lewat pemotong sama sekali, karena tidak ada yang perlu dipotong. Batasnya
   sudah pasti: berkasnya memang cuma berisi scene itu. */
for (const s of sendiri) {
  const berkasAda = `${dirOut}/${TARGET}-${s.kunci}.mp3`;
  /* Scene yang dipisah adalah scene yang paling sering diulang sampai jatuh
     di tempo dan nada yang disetujui — dan Gemini tidak deterministik, jadi
     render yang disetujui TIDAK bisa dibuat ulang. Melewatinya adalah baku;
     menimpanya harus diminta. */
  if (existsSync(berkasAda) && !PAKSA) {
    console.log(`  ${TARGET}-${s.kunci} (sendiri) … sudah ada, dilewati (--paksa untuk menimpa)`);
    continue;
  }
  const pr = mesin.profil(TARGET, s.kunci);
  if (pr.kunci && pr.arahan) console.log(`    arahan khusus: "${pr.arahan}"`);
  process.stdout.write(`  ${TARGET}-${s.kunci} (sendiri) … `);
  const buf = await mesin.suarakan({ teks: s.vo, prefiks: TARGET, kunci: s.kunci });
  const berkas = `${dirOut}/${TARGET}-${s.kunci}.mp3`;
  writeFileSync(`${berkas}.part`, buf);
  renameSync(`${berkas}.part`, berkas);
  const d = durasiDari(berkas);
  console.log(`ok · ${d.toFixed(2)} dtk · ${((s.kata / d) * 60).toFixed(0)} wpm`);
}

/* Penjaga tabrakan dipindah KE DEPAN, sebelum satu permintaan pun dikirim.
   Dulu ia duduk di dalam potongDanTulis, dan itu cukup selama cuma ada satu
   aliran. Dengan batch ia jadi jebakan: batch 1 dan 2 dibayar, lalu batch 3
   berhenti karena berkasnya sudah ada — dan yang sudah dibayar tidak bisa
   dikembalikan. Yang diperiksa SELURUH scene menyatu, bukan per batch. */
{
  const sudahAda = gabung
    .map((s) => `${dirOut}/${TARGET}-${s.kunci}.mp3`)
    .filter((f) => existsSync(f));
  if (sudahAda.length && !PAKSA) {
    console.error(
      `\n  ${sudahAda.length} berkas potongan sudah ada di ${dirOut}/.\n` +
        `  Tambahkan --paksa kalau memang mau menimpanya — Gemini tidak\n` +
        `  deterministik, jadi yang tertimpa tidak bisa dikembalikan.\n`,
    );
    process.exit(1);
  }
}

/** Satu permintaan untuk satu batch, lalu ditempo — mengisi `b.total`. */
async function sintesisBatch(b) {
  const nama = batches.length > 1 ? `batch ${b.nomor}/${batches.length}` : "1 permintaan";

  /* --pakai-wav: pakai lagi aliran utuh yang sudah ada, jangan sintesis ulang.
     Menyetel pemotong butuh puluhan percobaan, dan tiap percobaan yang membayar
     ulang membuat penyetelannya berhenti sebelum benar — padahal bahan yang
     diperiksa persis sama. Yang disetel pemotongnya, bukan bacaannya. */
  /* --pakai-wav dengan WAV yang HILANG mensintesis batch itu saja.
     Ini yang membuat "ulangi batch 3 karena ia sendirian membaca lebih cepat"
     jadi satu perintah, bukan membayar ulang keempat batch. Bukan kelonggaran:
     yang tidak ada memang tidak bisa dipakai ulang, dan menolak seluruh
     perintahnya cuma memaksa orang membayar tiga aliran yang sudah bagus. */
  if (flag("--pakai-wav") && existsSync(b.wav)) {
    console.log(`\n  ${nama}: memakai ulang ${b.wav} — nol permintaan, nol karakter.`);
  } else {
    if (flag("--pakai-wav")) {
      console.log(`\n  ${nama}: ${b.wav} tidak ada — batch INI saja yang disintesis ulang.`);
    }
    console.log(`\n  Mengirim ${nama} · ${b.daftar.length} scene · ${b.kata} kata … `);
    const { pcm, laju } = await mesin.suarakanPCM({ teks: b.naskah, prefiks: TARGET });

    /* Tempo dipasang SEKARANG, ke seluruh aliran — sebelum dipotong. Kalau tiap
       potongan ditempo sendiri-sendiri, keseragaman yang baru saja dibeli dengan
       satu permintaan langsung dibuang lagi. */
    execFileSync(
      FFMPEG,
      [
        "-hide_banner", "-loglevel", "error",
        "-f", "s16le", "-ar", String(laju), "-ac", "1", "-i", "pipe:0",
        ...(profil.tempoAngka !== 1 ? ["-af", `atempo=${profil.tempoAngka}`] : []),
        "-y", b.wav,
      ],
      { input: pcm, maxBuffer: 256 * 1024 * 1024 },
    );
  }

  b.total = durasiDari(b.wav);
  b.wpm = (b.kata / b.total) * 60;
  console.log(`  ${b.total.toFixed(2)} dtk · ${b.wpm.toFixed(0)} wpm`);

  /* PENJAGA PEMENGGALAN. Inilah yang tidak ada saat T14 dibuat: aliran L
     kembali 50,3 dtk untuk naskah 955 kata dan tidak ada satu pun yang
     menyebutnya aneh — kegagalannya hening, dan yang tersisa cuma jalan per
     scene. Perkiraan wpm-nya ada di .env (VO_WORDS_PER_MINUTE); bacaan yang
     kurang dari separuh sepelan itu bukan bacaan yang lambat, ia bacaan yang
     berhenti di tengah.

     Diperiksa DI SINI, bukan di pemotong, karena pemotong akan melaporkannya
     sebagai "batas tidak ketemu" — gejala, bukan sebabnya. */
  const wpmHarap = Number(wajib("VO_WORDS_PER_MINUTE"));
  if (b.wpm > wpmHarap * 2) {
    gagal(
      `${nama} kembali ${b.total.toFixed(2)} dtk untuk ${b.kata} kata ` +
        `(${b.wpm.toFixed(0)} wpm, perkiraan ${wpmHarap}). Aliran ini terpenggal — ` +
        `Gemini berhenti sebelum naskahnya habis.\n` +
        `      Pecah batch ini lebih kecil: ` +
        (PECAH_DI.length
          ? `tambahkan satu kunci lagi ke --pecah-di, di dalam ${b.daftar[0].kunci}..${b.daftar.at(-1).kunci}.`
          : BATCH > 0
            ? `--batch ${Math.max(2, Math.floor(b.daftar.length / 2))} (sekarang ${BATCH}).`
            : `pakai --pecah-di atau --batch — sekarang seluruhnya satu permintaan.`),
      b,
    );
  }
}

/* --- POTONG ----------------------------------------------------------------
 *
 * Batasnya TIDAK dicari sebagai "delapan senyap terpanjang". Jeda di tengah
 * kalimat bisa lebih panjang daripada jeda antar-scene, dan sekali satu batas
 * salah pilih, semua batas sesudahnya ikut bergeser.
 *
 * Yang dipakai: kita TAHU kira-kira di detik ke berapa tiap batas seharusnya —
 * dari jumlah kata kumulatifnya. Jadi tiap batas mencari senyap yang PALING
 * DEKAT dengan tempat yang diharapkan, bukan yang paling panjang. */

/* --batas <json>: batas dari tools/cocokkan-vo.mjs — cap waktu per kata, bukan
   tebakan dari senyap. Ini jalur yang benar; heuristik senyap di bawah tinggal
   sebagai cadangan untuk audio yang belum sempat dicocokkan.

   Kenapa jauh lebih kuat: jeda antar-kalimat DI DALAM scene dan jeda ANTAR scene
   secara akustik adalah benda yang sama, jadi tidak ada ambang yang memisahkan
   keduanya. Cap waktu kata tidak perlu memisahkan apa pun — scene 1 berakhir di
   kata ke-8, dan kata ke-8 punya alamat. */
const berkasBatasManual = opt("--batas");
if (berkasBatasManual && batches.length > 1) {
  console.error(
    `\n--batas cuma berlaku untuk satu aliran, sementara ini ${batches.length} batch.\n` +
      `Tiap batch punya berkas batasnya sendiri (batas-${TARGET}-b1.json, -b2.json, …),\n` +
      `jadi satu berkas tidak bisa mewakili semuanya.\n`,
  );
  process.exit(1);
}

/** Berkas .part dari SEMUA batch, supaya kegagalan di batch terakhir tetap
 *  meninggalkan nol berkas — bukan dua batch pertama yang sudah mendarat. */
const partSemua = [];

function gagal(pesan, b) {
  for (const p of partSemua) if (existsSync(p)) unlinkSync(p);
  console.error(`\n  POTONG GAGAL — ${pesan}\n`);
  console.error(`  Nol berkas ditulis${partSemua.length ? ` (${partSemua.length} .part dibuang)` : ""}.`);
  if (b) console.error(`  Yang utuh ada di ${b.wav} — dengarkan sendiri;`);
  console.error(`  kalau bacaannya bagus, yang perlu disetel pemotongnya, bukan naskahnya.\n`);
  process.exit(1);
}

/** Batas scene di dalam satu batch — cap waktu per kata, atau heuristik senyap. */
function cariBatas(b) {
  /* --batas <json>: batas dari tools/cocokkan-vo.mjs — cap waktu per kata, bukan
     tebakan dari senyap. Ini jalur yang benar; heuristik senyap di bawah tinggal
     sebagai cadangan untuk audio yang belum sempat dicocokkan.

     Kenapa jauh lebih kuat: jeda antar-kalimat DI DALAM scene dan jeda ANTAR scene
     secara akustik adalah benda yang sama, jadi tidak ada ambang yang memisahkan
     keduanya. Cap waktu kata tidak perlu memisahkan apa pun — scene 1 berakhir di
     kata ke-8, dan kata ke-8 punya alamat. */
  let berkasBatas = berkasBatasManual;

  /* Baku: batas dicari lewat cap waktu per kata, bukan lewat senyap. Dijalankan
     sebagai proses anak alih-alih diimpor — cocokkan-vo.mjs tetap berguna berdiri
     sendiri (ia juga yang membuktikan naskahnya diucapkan utuh), dan dua alat yang
     masing-masing bisa dijalankan sendiri lebih mudah didiagnosis daripada satu
     alat yang cuma bisa dijalankan seluruhnya.

     --lewati DAN --sampai: batch ini cuma berisi sebagian naskah keluaran, jadi
     penyejajarannya harus dibatasi di kedua ujung. Tanpa --sampai, pencocokan
     mencari SELURUH scene sesudahnya di audio yang memang tidak memuatnya, dan
     melaporkannya sebagai naskah yang bergeser — tepat di alat yang tugasnya
     membuktikan naskah TIDAK bergeser.

     --senyap mengembalikan heuristik lama. Ia dipertahankan bukan karena setara,
     melainkan karena ia satu-satunya jalan saat transkripsi gagal — dan saat itu
     terjadi, "tidak ada jalan sama sekali" lebih buruk daripada "jalan yang harus
     diperiksa penjaganya". */
  /* Batas yang sudah dihitung dipakai lagi bersama --pakai-wav. Transkripsi itu
     panggilan berbayar juga, dan --pakai-wav ada persis supaya menyetel
     pemotong tidak membayar apa pun — memakai ulang aliran tapi menranskripsi
     ulang tiap percobaan cuma memindahkan ongkosnya, tidak menghapusnya.
     Aman karena keduanya turunan dari aliran yang sama: selama WAV-nya tidak
     berubah, batasnya juga tidak. Hapus JSON-nya untuk memaksa hitung ulang. */
  if (!berkasBatas && flag("--pakai-wav") && existsSync(b.batasJson)) {
    console.log(`  Memakai ulang ${b.batasJson} — nol transkripsi.`);
    berkasBatas = b.batasJson;
  }

  if (!berkasBatas && !flag("--senyap")) {
    console.log(`  Mencari batas lewat cap waktu kata …\n`);
    const anak = spawnSync(
      process.execPath,
      [
        "tools/cocokkan-vo.mjs", slug,
        "--target", TARGET,
        "--wav", b.wav,
        "--lewati", String(b.lewati),
        "--sampai", String(b.sampai),
        "--keluar", b.batasJson,
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] },
    );
    process.stdout.write(
      (anak.stdout ?? "")
        .split("\n")
        .filter((l) => /cocok|tidak diucapkan|naskah "|tidak terdengar|tidak ada di naskah/.test(l))
        .map((l) => `  ${l.trim()}`)
        .join("\n") + "\n",
    );
    if (anak.status !== 0) {
      gagal(
        `pencocokan gagal untuk batch ${b.nomor}. Ulangi dengan --senyap untuk memakai\n` +
          `      heuristik jeda, atau jalankan tools/cocokkan-vo.mjs sendiri untuk melihat kenapa.`,
        b,
      );
    }
    berkasBatas = b.batasJson;
  }

  if (berkasBatas) {
    const j = JSON.parse(readFileSync(berkasBatas, "utf8"));
    if (j.tepi?.length !== b.daftar.length + 1) {
      gagal(
        `${berkasBatas}: ${j.tepi?.length ?? 0} tepi untuk ${b.daftar.length} scene — ` +
          `butuh ${b.daftar.length + 1}. Jalankan ulang cocokkan-vo.mjs.`,
        b,
      );
    }
    console.log(`  Batas dari ${berkasBatas} (cap waktu per kata)\n`);
    return j.tepi;
  }

  /* --- heuristik senyap ---------------------------------------------------- */

  const senyap = [];
  {
    /* silencedetect menulis temuannya ke STDERR, di level `info`. Dua jebakan
       sekaligus: `execFileSync` cuma mengembalikan stdout (jadi hasilnya string
       kosong yang terbaca sebagai "tidak ada jeda"), dan `-loglevel error`
       membuang barisnya sebelum sempat ditulis. Karena itu spawnSync, dan level
       lognya dibiarkan apa adanya. */
    const jalan = spawnSync(
      FFMPEG,
      ["-hide_banner", "-i", b.wav, "-af", "silencedetect=noise=-35dB:d=0.12", "-f", "null", "-"],
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
    );
    const teks = jalan.stderr ?? "";
    let mulai = null;
    for (const baris of teks.split(/\r?\n/)) {
      const a = /silence_start:\s*([\d.]+)/.exec(baris);
      const c = /silence_end:\s*([\d.]+)/.exec(baris);
      if (a) mulai = Number(a[1]);
      if (c && mulai !== null) {
        senyap.push({
          mulai,
          akhir: Number(c[1]),
          tengah: (mulai + Number(c[1])) / 2,
          lama: Number(c[1]) - mulai,
        });
        mulai = null;
      }
    }
  }

  const total = b.total;
  const daftar = b.daftar;

  /* Senyap di tepi tidak pernah jadi batas antar-scene. */
  const kandidat = senyap.filter((s) => s.tengah > 0.25 && s.tengah < total - 0.25);
  if (kandidat.length < daftar.length - 1) {
    gagal(
      `cuma ${kandidat.length} jeda terdeteksi, butuh ${daftar.length - 1}. ` +
        `Model membaca terlalu rapat — naikkan jeda di naskah gabungan atau turunkan ambang.`,
      b,
    );
  }

  /* Posisi yang diharapkan tiap batas, dari jumlah kata kumulatif. */
  const harap = [];
  {
    let k = 0;
    for (let i = 0; i < daftar.length - 1; i++) {
      k += daftar[i].kata;
      harap.push((k / b.kata) * total);
    }
  }

  /* Pemilihan GLOBAL, bukan serakah kiri-ke-kanan.
   *
   * Versi serakah memilih tiap batas sendiri-sendiri, dan itu gagal dengan cara
   * yang mahal: di Short ini batas ke-5 kalah 0,56 dtk melawan jeda di TENGAH
   * scene 05 — lalu scene 05 terpotong jadi 2,0 dtk dan semua batas sesudahnya
   * ikut bergeser. Satu kekalahan tipis menyeret delapan keputusan lain.
   *
   * Di sini semua batas dipilih sekaligus dengan program dinamis, memaksimalkan
   * satu skor: dekat dengan tempat yang diharapkan, DAN jedanya panjang. Jeda
   * panjang penting karena `[long pause]` di pemisah memang menaikkan sebagian —
   * tapi tidak semuanya, jadi ia bukti yang menambah keyakinan, bukan yang
   * memutuskan sendirian. */
  const skor = (s, i) => -(((s.tengah - harap[i]) / total) ** 2) * 40 + s.lama;

  const N = kandidat.length;
  const B = daftar.length - 1;
  if (N < B) gagal(`cuma ${N} jeda kandidat, butuh ${B}`, b);

  /* terbaik[i][j] = skor terbaik memilih batas 0..i dengan batas ke-i di kandidat j */
  const terbaik = Array.from({ length: B }, () => new Array(N).fill(-Infinity));
  const dari = Array.from({ length: B }, () => new Array(N).fill(-1));

  for (let j = 0; j < N; j++) terbaik[0][j] = skor(kandidat[j], 0);
  for (let i = 1; i < B; i++) {
    let argmax = -1;
    for (let j = 0; j < N; j++) {
      /* Batas harus maju: kandidat sebelumnya selalu berindeks lebih kecil. */
      if (j > 0 && terbaik[i - 1][j - 1] > (argmax === -1 ? -Infinity : terbaik[i - 1][argmax]))
        argmax = j - 1;
      if (argmax === -1) continue;
      terbaik[i][j] = terbaik[i - 1][argmax] + skor(kandidat[j], i);
      dari[i][j] = argmax;
    }
  }

  let akhirJ = -1;
  for (let j = 0; j < N; j++)
    if (terbaik[B - 1][j] > (akhirJ === -1 ? -Infinity : terbaik[B - 1][akhirJ])) akhirJ = j;
  if (akhirJ === -1) gagal("tidak ada rangkaian batas yang sah", b);

  const pilihan = new Array(B);
  for (let i = B - 1, j = akhirJ; i >= 0; j = dari[i][j], i--) pilihan[i] = kandidat[j];

  /* Penjaga 1: tidak ada batas yang boleh jauh dari tempat yang diharapkan.
     Longgar (20% durasi) karena jumlah kata cuma perkiraan kasar posisi. */
  const batas = [];
  pilihan.forEach((s, i) => {
    const meleset = Math.abs(s.tengah - harap[i]);
    if (meleset > total * 0.2)
      gagal(
        `batas ke-${i + 1} (${daftar[i + 1].kunci}) meleset ${meleset.toFixed(2)} dtk ` +
          `dari perkiraan ${harap[i].toFixed(2)} dtk — jeda terpilih di ${s.tengah.toFixed(2)} dtk`,
        b,
      );
    batas.push(s.tengah);
  });

  return [0, ...batas, total];
}

/* --- jalankan: sintesis → batas → potong, batch demi batch ------------------ */

const siapSemua = [];
for (const b of rencanaBatch) {
  await sintesisBatch(b);
  /* Apa pun yang meledak di dalam sini tetap keluar lewat gagal(), supaya
     aturan "nol berkas" berlaku juga untuk kegagalan yang TIDAK kita duga —
     bukan cuma untuk yang sudah punya penjaganya. Yang mengajarkan ini ffmpeg
     yang menolak tepi menurun: exception mentahnya melewati semua pembersihan
     dan meninggalkan 10 .part di folder VO. */
  try {
    siapSemua.push(...potong(cariBatas(b), b));
  } catch (e) {
    /* gagal() sendiri keluar lewat process.exit, jadi yang sampai ke sini
       memang cuma yang tidak terduga. */
    gagal(`batch ${b.nomor} meledak saat dipotong — ${e?.message?.split("\n")[0] ?? e}`, b);
  }
}

/* Baru DI SINI berkasnya dinamai — setelah batch terakhir lolos penjaganya.
   Alasannya sama dengan yang sudah tertulis di potongDanTulis, cuma cakupannya
   naik: memotong sebagian dari satu aliran lalu menyisakan sisanya dari aliran
   lama menghasilkan keluaran yang separuhnya dari dua pertunjukan berbeda, dan
   dengan batch "aliran lama" itu bisa berarti batch yang gagal tadi. */
tulisSemua(siapSemua);

/* --- tulis ------------------------------------------------------------------ */

/** Memotong satu aliran menurut `tepi` dan MENGUKUR hasilnya — tanpa menamai
 *  satu berkas pun. Yang dikembalikan daftar `.part` yang siap dinamai.
 *
 *  Dipakai kedua sumber batas: cap waktu per kata (--batas) dan heuristik
 *  senyap. Penjaganya sama untuk keduanya, karena yang dijaga sama — dan sumber
 *  batas yang lebih dipercaya bukan alasan untuk memeriksanya lebih longgar. */
function potong(tepi, b) {
  const daftar = b.daftar;
  const totalKataBatch = b.kata;

  /* Penjaga 0: tepi wajib menaik. Sumber batas mana pun bisa mengembalikan
     urutan yang kacau — cocokkan-vo punya penjaganya sendiri, tapi --batas yang
     ditunjuk tangan tidak lewat sana sama sekali. Tanpa ini, tepi yang menurun
     baru meledak di dalam ffmpeg sebagai "-to value smaller than -ss": pesan
     yang tidak menyebut satu pun nama scene, dan yang melempar exception mentah
     alih-alih lewat gagal() — jadi .part batch sebelumnya tertinggal di folder
     VO justru saat aturannya bilang nol berkas. */
  for (let i = 1; i < tepi.length; i++) {
    if (!(tepi[i] > tepi[i - 1])) {
      gagal(
        `batas tidak menaik di ${daftar[i - 1]?.kunci ?? `tepi ${i}`}: ` +
          `${tepi[i - 1]?.toFixed(2)} → ${tepi[i]?.toFixed(2)} dtk`,
        b,
      );
    }
  }

  const potongan = daftar.map((s, i) => ({
    scene: s,
    mulai: tepi[i],
    akhir: tepi[i + 1],
    durasi: tepi[i + 1] - tepi[i],
  }));

/* Dipotong ke .part dulu, DIUKUR, baru dinamai. Sebelumnya penjaga rasio
   menilai potongan sebelum tepinya dipangkas — dan yang ditulis ke berkas justru
   yang sesudahnya. Satu potongan lolos di 2,51 dtk lalu mendarat di 2,00 dtk
   untuk 11 kata (330 wpm, mustahil) tanpa satu pun peringatan. Penjaga yang
   memeriksa angka yang bukan angka yang ditulis adalah penjaga yang tidak ada. */
  console.log(`  ${tepi.length - 2} batas. Memotong, lalu mengukur hasilnya:\n`);
  const siap = [];
  for (const p of potongan) {
  const berkas = `${dirOut}/${TARGET}-${p.scene.kunci}.mp3`;
  const tmp = `${berkas}.part`;

  /* Dipotong dari WAV yang sudah bertempo, lalu tepinya dipangkas — jeda antar-scene
     memang milik sambungannya, bukan milik salah satu scene. */
  execFileSync(
    FFMPEG,
    [
      "-hide_banner", "-loglevel", "error",
      "-ss", String(p.mulai), "-to", String(p.akhir), "-i", b.wav,
      "-af",
      "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-35dB:detection=peak," +
        "areverse," +
        "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-35dB:detection=peak," +
        "areverse",
      "-codec:a", "libmp3lame", "-b:a", process.env.GEMINI_TTS_MP3_BITRATE?.trim() || "128k",
      /* Formatnya disebut, tidak ditebak: berkasnya ditulis sebagai `.part`
         dulu (supaya proses yang mati di tengah tidak meninggalkan MP3
         terpotong), dan dari akhiran itu ffmpeg tidak bisa menyimpulkan apa pun. */
      "-f", "mp3",
      "-y", tmp,
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  );
  siap.push({ ...p, tmp, berkas, jadi: durasiDari(tmp) });
  partSemua.push(tmp);
}

  /* Penjaga 3, dan satu-satunya yang mengukur apa yang benar-benar akan ditulis.
   Ambangnya lebih ketat daripada penjaga 2 (0,6–1,7 vs 0,5–2,0) karena di sini
   tebakannya sudah tidak ada: ini durasi berkasnya. */
  /* Pembandingnya jumlah durasi SESUDAH dipangkas, bukan `total` yang mentah.
     Jeda antar-scene milik sambungannya dan dibuang dari kedua tepi, jadi di
     S1 T14 ia 13 dtk dari 47,6 — 27% yang tidak pernah mendarat di berkas mana
     pun. Diukur terhadap total mentah, SETIAP potongan terlihat kependekan
     ~27%, dan dua yang jedanya paling lebar jatuh lewat ambang tanpa ada yang
     salah pada bacaannya. Ambangnya sendiri tidak berubah.

     Dibandingkan DI DALAM batch-nya sendiri, bukan lintas batch: tiap batch
     bacaan yang berdiri sendiri dengan tempo sendiri, dan mengukur potongan
     batch 3 terhadap rata-rata seluruh keluaran akan menghukum batch yang
     kebetulan dibaca lebih pelan — padahal tidak ada yang salah padanya. */
  const totalJadi = siap.reduce((n, p) => n + p.jadi, 0);
  const rusak = siap
  .map((p) => ({ p, rasio: p.jadi / ((p.scene.kata / totalKataBatch) * totalJadi) }))
  .filter(({ rasio }) => rasio < 0.6 || rasio > 1.7);

  if (rusak.length) {
  gagal(
    `${rusak.length} potongan meleset setelah dipangkas:\n` +
      rusak
        .map(
          ({ p, rasio }) =>
            `      ${p.scene.kunci} — ${p.jadi.toFixed(2)} dtk untuk ${p.scene.kata} kata ` +
            `(${((p.scene.kata / p.jadi) * 60).toFixed(0)} wpm, ${rasio.toFixed(2)}x perkiraan)`,
        )
        .join("\n"),
    b,
  );
}

  return siap;
}

/** Menamai semua `.part` — dipanggil sekali, setelah batch TERAKHIR lolos. */
function tulisSemua(siap) {
  for (const p of siap) {
    renameSync(p.tmp, p.berkas);
    console.log(
      `    ${TARGET}-${p.scene.kunci.padEnd(22)} ${p.jadi.toFixed(2).padStart(6)} dtk ` +
        `${((p.scene.kata / p.jadi) * 60).toFixed(0).padStart(4)} wpm`,
    );
  }

  console.log(
    `\n  ${siap.length + sendiri.length} berkas di ${dirOut}/ · ${totalChars} karakter` +
      (sendiri.length ? ` (${sendiri.length} sendiri + ${siap.length} dari potongan)` : ""),
  );

  if (batches.length > 1) {
    /* wpm tiap batch dicetak berdampingan justru karena inilah yang dibayar
       dengan memecah permintaan: batas batch adalah satu-satunya tempat tempo
       boleh bergeser, jadi besarnya pergeseran itu harus jadi angka, bukan
       kesan saat mendengarkan.

       DIHITUNG DARI POTONGAN YANG SUDAH DIPANGKAS, bukan dari durasi aliran
       mentah. Aliran mentah ikut memuat jeda antar-scene, dan jumlah jedanya
       mengikuti jumlah scene — jadi batch berisi 2 scene selalu terlihat lebih
       cepat daripada batch berisi 4 tanpa ada yang benar-benar lebih cepat.
       Diukur di T14, perbedaannya bukan main-main: aliran mentah melaporkan
       ayunan 30% di tempat potongan terpangkas melaporkan 17%. */
    const perBatch = rencanaBatch.map((b) => {
      const milik = siap.filter((p) => b.daftar.includes(p.scene));
      const detik = milik.reduce((n, p) => n + p.jadi, 0);
      return { nomor: b.nomor, wpm: (b.kata / detik) * 60 };
    });
    const w = perBatch.map((x) => x.wpm);
    console.log(
      `\n  Tempo per batch: ` +
        perBatch.map((x) => `b${x.nomor} ${x.wpm.toFixed(0)}`).join(" · ") +
        ` wpm  (ayunan ${(((Math.max(...w) - Math.min(...w)) / Math.min(...w)) * 100).toFixed(0)}%)`,
    );
    console.log(
      `  Batch yang meleset sendirian bisa diulang SENDIRI: hapus WAV-nya lalu\n` +
        `  jalankan lagi dengan --pakai-wav — yang lain tidak ikut dibayar ulang.`,
    );
    console.log(`  Aliran utuhnya: ${rencanaBatch.map((b) => b.wav).join(", ")}`);
  } else {
    console.log(`  Yang utuh disimpan di ${rencanaBatch[0].wav} — itu rujukan kalau potongannya diragukan.`);
  }

  if (!COBA) console.log(`\n  Berikutnya: npm run gen, lalu DENGARKAN berurutan.\n`);
  else console.log(`\n  --coba: public/vo/ tidak disentuh.\n`);
}
