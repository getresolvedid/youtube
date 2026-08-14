/**
 * bikin-vo.mjs — generate VO ElevenLabs, satu berkas MP3 per scene.
 *
 *   node --env-file=.env tools/bikin-vo.mjs <slug>                 rencana saja (GRATIS)
 *   node --env-file=.env tools/bikin-vo.mjs <slug> --jalan         benar-benar generate
 *   node --env-file=.env tools/bikin-vo.mjs <slug> --scene 01-hook-question --jalan
 *   node --env-file=.env tools/bikin-vo.mjs <slug> --target S1 --jalan
 *   node --env-file=.env tools/bikin-vo.mjs <slug> --scene 06-gudang --target S1 --paksa --jalan
 *
 * Opsi:
 *   --jalan            panggil API sungguhan. TANPA ini skrip cuma mencetak rencana.
 *   --target L|S1|S2   batasi ke satu keluaran (default: ketiganya)
 *   --scene <kunci>    hanya satu scene — inilah cara "generate satu scene uji dulu"
 *   --paksa            timpa berkas MP3 yang sudah ada (generate ulang berbayar)
 *
 * KENAPA DEFAULT-NYA TIDAK JALAN: API ini dibayar per karakter dan tidak bisa
 * dibatalkan setelah terkirim. Perintah yang salah ketik harus berakhir sebagai
 * tabel di layar, bukan sebagai tagihan. docs/04 §6.
 *
 * Yang dijaga skrip ini, semuanya sebelum satu byte pun dikirim:
 *   1. `naskah_beku` di frontmatter naskah wajib terisi (gerbang docs/04 §5).
 *   2. Total karakter topik ≤ ELEVENLABS_MAX_CHARS_PER_TOPIC.
 *   3. Scene yang MP3-nya sudah ada dilewati — kecuali --paksa.
 *   4. Sisa kuota key aktif dicek dulu; kurang = berhenti, bukan setengah jadi.
 *
 * Teks yang dibaca ElevenLabs diambil dari blok `## VO` tiap rencana VO lewat
 * tools/baca-episode.mjs — modul yang sama dengan yang menghitung timing. Tidak
 * ada tempat kedua yang menyimpan kalimatnya (HARD RULE 4).
 */

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";

import { bacaEpisode, bacaShort, daftarShort, wajib } from "./baca-episode.mjs";

/* --- argumen ---------------------------------------------------------------- */

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const flag = (n) => argv.includes(n);
const opt = (n) => {
  const i = argv.indexOf(n);
  return i === -1 ? undefined : argv[i + 1];
};

if (!slug) {
  console.error("Pakai: node --env-file=.env tools/bikin-vo.mjs <slug> [--target L|S1|S2] [--scene <kunci>] [--paksa] [--jalan]");
  process.exit(1);
}

const JALAN = flag("--jalan");
const PAKSA = flag("--paksa");
const TARGET = opt("--target");
const SCENE = opt("--scene");

/* --- setelan, semuanya dari .env (docs/08) ---------------------------------- */

/** `wajib()` dari baca-episode.mjs mengembalikan Number — benar untuk setelan
 *  timing, tapi salah untuk voice id dan nama model. Yang dipakai di sini
 *  teksnya apa adanya; kalau tidak, key dan model diam-diam jadi "NaN" dan yang
 *  ketahuan cuma saat API menolaknya. */
const wajibTeks = (nama) => {
  const v = process.env[nama];
  if (v === undefined || v === "") {
    throw new Error(`${nama} kosong di .env — lihat docs/08-konfigurasi.md.`);
  }
  return v.trim();
};

const API_KEY = wajibTeks("ELEVENLABS_API_KEY");

/* Halaman API key ElevenLabs memperlihatkan DUA nilai: ID key (32/64 karakter
   heksadesimal, boleh dilihat kapan saja) dan key-nya sendiri yang berawalan
   `sk_` dan cuma muncul sekali, saat dibuat atau dirotasi. Yang gampang tersalin
   adalah yang pertama — dan API menolaknya dengan HTTP 400, bukan 401, jadi
   terbaca seperti permintaannya yang salah bentuk. Dicegat di sini supaya
   pesannya menyebut penyebabnya. */
if (!API_KEY.startsWith("sk_")) {
  console.error(
    `\nELEVENLABS_API_KEY di .env tidak berawalan "sk_" (${API_KEY.length} karakter).\n\n` +
      `Itu ID key-nya, bukan key-nya. Key aslinya cuma ditampilkan sekali —\n` +
      `saat dibuat atau dirotasi di https://elevenlabs.io/app/settings/api-keys\n` +
      `Rotasi key itu, salin nilai yang berawalan sk_, lalu:\n\n` +
      `  node tools/elevenlabs-keys.mjs add sk_xxx\n` +
      `  node tools/elevenlabs-keys.mjs rotate      # jadikan aktif\n`,
  );
  process.exit(1);
}
const VOICE_ID = wajibTeks("ELEVENLABS_VOICE_ID");
const MODEL_ID = wajibTeks("ELEVENLABS_MODEL_ID");
const OUTPUT_FORMAT = wajibTeks("ELEVENLABS_OUTPUT_FORMAT");
const MAX_CHARS = wajib("ELEVENLABS_MAX_CHARS_PER_TOPIC");
const VOICE_SETTINGS = {
  stability: wajib("ELEVENLABS_STABILITY"),
  similarity_boost: wajib("ELEVENLABS_SIMILARITY_BOOST"),
  style: wajib("ELEVENLABS_STYLE"),
  use_speaker_boost: wajibTeks("ELEVENLABS_SPEAKER_BOOST") === "true",
};

/* --- gerbang 1: naskah beku, PER KELUARAN ----------------------------------- */

const naskahPath = `ideas/${slug}/naskah.md`;
const naskah = readFileSync(naskahPath, "utf8");

/** Tanggal beku tiap keluaran, dari frontmatter:
 *
 *      naskah_beku:
 *        L:              # belum
 *        S1: 2026-08-14
 *        S2: 2026-08-14
 *
 *  Dipisah per keluaran karena ketiganya memang bisa matang di waktu berbeda:
 *  Shorts sudah sesuai spek sementara video panjangnya masih kurang durasi.
 *  Satu tanggal untuk bertiga memaksa memilih antara menahan yang sudah siap
 *  atau membekukan yang belum — dan pilihan kedua yang selalu diambil orang
 *  yang sedang buru-buru.
 *
 *  Komentar `#` dibuang DULU. Tanpa itu baris `S1:   # BELUM — ...` terbaca
 *  sebagai sudah terisi dengan nilai "#", dan gerbang paling mahal di repo ini
 *  lolos justru karena alasan kenapa ia belum boleh lolos ditulis di sebelahnya. */
const bacaBeku = () => {
  const blok = /^naskah_beku:[^\n]*\n((?:[ \t]+\S[^\n]*\n)*)/m.exec(naskah);
  const peta = new Map();

  if (!blok) {
    /* Bentuk lama: satu tanggal untuk seluruh topik. Tetap didukung — berlaku
       untuk ketiga keluaran sekaligus. */
    const tunggal = /^naskah_beku:([^#\n]*)/m.exec(naskah)?.[1]?.trim();
    if (tunggal) for (const p of ["L", "S1", "S2"]) peta.set(p, tunggal);
    return peta;
  }

  for (const baris of blok[1].split("\n")) {
    const m = /^\s*([A-Za-z0-9]+):([^#\n]*)/.exec(baris);
    if (!m) continue;
    const nilai = m[2].trim();
    if (nilai) peta.set(m[1].toUpperCase(), nilai);
  }
  return peta;
};

const beku = bacaBeku();

const tolakBeku = (prefiks) => {
  console.error(
    `\n${naskahPath}: "${prefiks}" belum punya tanggal di naskah_beku.\n\n` +
      `VO tidak boleh dibuat dari naskah yang belum melewati gerbang langkah 5\n` +
      `(docs/04 §5). Selesaikan checklist gerbangnya untuk keluaran itu, isi\n` +
      `tanggalnya, baru ke sini.\n`,
  );
  process.exit(1);
};

/* --- daftar pekerjaan ------------------------------------------------------- */

/** Ketiga keluaran topik ini: video panjang + tiap Short, masing-masing dengan
 *  prefiks berkasnya sendiri. Prefiks itulah yang memisahkan `01-hook` milik
 *  Short dari `01-hook-question` milik video panjang di satu folder yang sama. */
const keluaran = [
  { prefiks: "L", label: "video panjang", ...bacaEpisode(slug) },
  ...daftarShort(slug).map((s) => ({
    prefiks: s.prefiks,
    label: `Short ${s.nomor} · ${s.folder}`,
    ...bacaShort(slug, s),
  })),
];

const dirVO = `public/vo/${slug}`;

/** Scene yang punya kalimat: bukan scene standar (opening/closing tidak bicara)
 *  dan blok `## VO`-nya tidak kosong. */
const adaSuara = (t) => !t.standar && t.vo.trim().length > 0;

const totalTopik = keluaran.reduce(
  (n, k) => n + k.timing.filter(adaSuara).reduce((m, t) => m + t.chars, 0),
  0,
);

const pekerjaan = [];
for (const k of keluaran) {
  if (TARGET && TARGET.toUpperCase() !== k.prefiks) continue;
  if (!beku.has(k.prefiks)) {
    /* Keluaran yang belum beku dilewati dengan SUARA — kalau ia diam-diam
       dilewati, "cuma dua berkas yang jadi" terbaca sebagai kegagalan skrip. */
    console.log(`  (lewati ${k.label}: belum beku di naskah_beku)`);
    continue;
  }

  const bicara = k.timing.filter(adaSuara);
  bicara.forEach((t, i) => {
    if (SCENE && t.kunci !== SCENE) return;

    const berkas = `${dirVO}/${k.prefiks}-${t.kunci}.mp3`;
    const sudahAda = existsSync(berkas);
    if (sudahAda && !PAKSA) return;

    pekerjaan.push({
      prefiks: k.prefiks,
      label: k.label,
      kunci: t.kunci,
      teks: t.vo,
      chars: t.chars,
      berkas,
      timpa: sudahAda,
      /* Sambungan antar-scene dibawa ke API supaya intonasinya menyambung:
         scene ditulis terpisah tapi ditonton beruntun tanpa jeda (HARD RULE 7).
         Keduanya TIDAK ikut disuarakan dan TIDAK ikut ditagih. */
      sebelum: bicara[i - 1]?.vo ?? "",
      sesudah: bicara[i + 1]?.vo ?? "",
    });
  });
}

if (TARGET && !beku.has(TARGET.toUpperCase())) tolakBeku(TARGET.toUpperCase());

if (SCENE && pekerjaan.length === 0) {
  console.error(
    `Scene "${SCENE}" tidak ketemu, atau MP3-nya sudah ada (pakai --paksa untuk menimpa).`,
  );
  process.exit(1);
}

/* --- rencana ---------------------------------------------------------------- */

const charsSekarang = pekerjaan.reduce((n, p) => n + p.chars, 0);

console.log(`\nVO ${slug} — suara ${VOICE_ID}, model ${MODEL_ID}, ${OUTPUT_FORMAT}`);
console.log(
  `Beku: ${[...beku].map(([p, t]) => `${p} ${t}`).join(" · ")} — gerbang docs/04 §5 lewat.\n`,
);

if (pekerjaan.length === 0) {
  console.log("Semua scene sudah punya berkas VO. Tidak ada yang perlu dibuat.");
  console.log("Generate ulang satu scene: --scene <kunci> --paksa --jalan\n");
  process.exit(0);
}

let target = "";
for (const p of pekerjaan) {
  if (p.label !== target) {
    target = p.label;
    console.log(`  ${target}`);
  }
  console.log(
    `    ${p.prefiks}-${p.kunci}.mp3  ${String(p.chars).padStart(4)} kar` +
      `${p.timpa ? "  ← MENIMPA yang sudah ada" : ""}`,
  );
}

console.log(`\n  ${pekerjaan.length} berkas · ${charsSekarang} karakter dibuat sekarang`);
console.log(`  ${totalTopik} karakter untuk seluruh topik (batas ${MAX_CHARS})`);

if (Number(totalTopik) > Number(MAX_CHARS)) {
  console.error(
    `\nTopik ini ${totalTopik} karakter, di atas ELEVENLABS_MAX_CHARS_PER_TOPIC ` +
      `(${MAX_CHARS}).\nPendekkan naskahnya atau naikkan batasnya di .env dengan sadar — ` +
      `batas itu ada supaya satu topik tidak diam-diam menghabiskan kuota bulanan.\n`,
  );
  process.exit(1);
}

if (!JALAN) {
  console.log(`\nIni baru rencana — belum ada yang dikirim ke ElevenLabs.`);
  console.log(`Jalankan sungguhan dengan menambahkan --jalan\n`);
  console.log(`Disarankan: satu scene uji dulu, DENGARKAN, baru sisanya (docs/04 §6).`);
  console.log(`  node --env-file=.env tools/bikin-vo.mjs ${slug} --scene ${pekerjaan[0].kunci} --target ${pekerjaan[0].prefiks} --jalan\n`);
  process.exit(0);
}

/* --- gerbang 2: kuota -------------------------------------------------------
 *
 * Mulai dari sini semuanya menyentuh jaringan, dan `process.exit()` di tengah
 * fetch yang masih terbuka membuat libuv menjatuhkan assertion — pesan yang
 * terbaca seperti skrip ini rusak, padahal yang terjadi cuma key ditolak. Jadi
 * sisanya hidup di dalam fungsi: keluar = `return`, kodenya lewat exitCode. */
const jalankan = async () => {
const langganan = await fetch("https://api.elevenlabs.io/v1/user/subscription", {
  headers: { "xi-api-key": API_KEY },
});

if (!langganan.ok) {
  const detail = await langganan.text().catch(() => "");
  const kurangIzin = detail.includes("missing_permissions");

  if (!kurangIzin) {
    console.error(
      `\nKey aktif ditolak (${langganan.status}). Cek atau rotasi:\n` +
        `  node tools/elevenlabs-keys.mjs check\n` +
        `  node tools/elevenlabs-keys.mjs rotate --auto\n` +
        `  node tools/elevenlabs-keys.mjs add sk_xxx     (kalau belum ada cadangan)\n\n` +
        `${detail.slice(0, 300)}\n\n` +
        `Nol karakter terpakai — gerbang ini memang berdiri sebelum berkas pertama.\n`,
    );
    process.exitCode = 1;
    return;
  }

  /* Key tanpa izin `user_read` tetap bisa membuat suara — yang tidak bisa cuma
     MELIHAT sisa kuotanya. Menghentikan generate karena pemeriksaannya sendiri
     gagal adalah menukar satu risiko dengan kepastian: yang hilang cuma
     peringatan dini, bukan kemampuan kerjanya. Jadi ini peringatan, bukan
     gerbang — dan disebutkan supaya "kok tidak ada baris kuota" tidak jadi
     misteri di sesi berikutnya. */
  console.log(
    `\n  ⚠ Sisa kuota tidak bisa dibaca — key ini tidak punya izin "user_read".\n` +
      `    Generate tetap jalan (izin text_to_speech terpisah), tapi kalau kuota\n` +
      `    habis di tengah jalan, ketahuannya baru saat satu berkas gagal.\n` +
      `    Scene yang sudah jadi tidak perlu dibuat ulang.`,
  );
} else {
  const d = await langganan.json();
  const sisa = Math.max(0, (d.character_limit ?? 0) - (d.character_count ?? 0));
  console.log(`\n  Sisa kuota key aktif: ${sisa} karakter (tier ${d.tier ?? "?"})`);

  if (sisa < charsSekarang) {
    console.error(
      `\nSisa kuota ${sisa} < ${charsSekarang} yang dibutuhkan. Berhenti sebelum mulai —\n` +
        `setengah episode yang jadi lebih repot daripada nol. Rotasi key dulu:\n` +
        `  node tools/elevenlabs-keys.mjs rotate --auto\n`,
    );
    process.exitCode = 1;
    return;
  }
}

/* --- jalan ------------------------------------------------------------------ */

mkdirSync(dirVO, { recursive: true });

const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`;
let terpakai = 0;
let jadi = 0;

console.log("");
for (const p of pekerjaan) {
  process.stdout.write(`  ${p.prefiks}-${p.kunci} … `);

  const res = await fetch(url, {
    method: "POST",
    headers: { "xi-api-key": API_KEY, "content-type": "application/json" },
    body: JSON.stringify({
      text: p.teks,
      model_id: MODEL_ID,
      voice_settings: VOICE_SETTINGS,
      /* Konteks tetangga: memperbaiki intonasi sambungan, tidak ikut disuarakan. */
      ...(p.sebelum ? { previous_text: p.sebelum } : {}),
      ...(p.sesudah ? { next_text: p.sesudah } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.log(`GAGAL ${res.status}`);
    console.error(`\n${detail.slice(0, 400)}\n`);
    console.error(
      `Berhenti di sini. ${jadi} berkas sudah jadi dan TIDAK perlu dibuat ulang —\n` +
        `jalankan lagi perintah yang sama, scene yang sudah ada akan dilewati.\n`,
    );
    process.exitCode = 1;
    return;
  }

  /* Tulis lewat berkas sementara: kalau proses mati di tengah unduhan, yang
     tertinggal bukan MP3 terpotong yang lolos pemeriksaan "berkasnya ada". */
  const buf = Buffer.from(await res.arrayBuffer());
  const tmp = `${p.berkas}.part`;
  writeFileSync(tmp, buf);
  renameSync(tmp, p.berkas);

  terpakai += p.chars;
  jadi++;
  console.log(`ok · ${(buf.length / 1024).toFixed(0)} KB`);
}

console.log(`\n${jadi} berkas jadi · ${terpakai} karakter terpakai.\n`);
console.log("Berikutnya:");
console.log(`  1. DENGARKAN sendiri — pengucapan istilah teknis tidak bisa dinilai skrip.`);
console.log(`  2. node --env-file=.env tools/vo-durations.mjs ${slug}   (durasi asli tiap berkas)`);
console.log(`  3. npm run sisa   — memastikan tidak ada scene yang masih bersubtitel preview`);
console.log(`  4. Catat ${terpakai} karakter di ${naskahPath} (frontmatter "karakter_terpakai").\n`);
};

await jalankan();
