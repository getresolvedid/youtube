/**
 * cocokkan-vo.mjs — cocokkan audio utuh dengan naskahnya, per kata.
 *
 *   node --env-file=.env tools/cocokkan-vo.mjs <slug> --target S1
 *   node --env-file=.env tools/cocokkan-vo.mjs <slug> --target S1 --wav <path> --model <id>
 *
 * MENJAWAB DUA PERTANYAAN DARI SATU LANGKAH:
 *
 *   1. DI MANA batas tiap scene. Sampai sekarang batas ditebak dari senyap, dan
 *      itu gagal karena jeda antar-kalimat DI DALAM scene dan jeda ANTAR scene
 *      secara akustik memang benda yang sama. Dengan cap waktu per kata, batas
 *      tidak lagi dicari: scene 1 berakhir di kata ke-8, titik.
 *
 *   2. APAKAH yang diucapkan sama dengan yang ditulis. Ini lubang yang sejak
 *      awal tidak punya penjaga sama sekali: Gemini itu model bahasa, ia bisa
 *      memparafrase atau menambah kata — sementara naskahnya sudah beku dan
 *      seluruh timing dihitung dari jumlah katanya. Sebelum ini satu-satunya
 *      cara tahu adalah mendengarkan sambil memegang naskah.
 *
 * Alat ini TIDAK memotong dan TIDAK menulis audio apa pun. Ia melapor, dan
 * menulis batasnya ke JSON supaya bikin-vo-utuh.mjs bisa memakainya.
 */

import { readFileSync, writeFileSync } from "node:fs";

import { bacaEpisode, bacaShort, daftarShort } from "./baca-episode.mjs";

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const opt = (n, b) => {
  const i = argv.indexOf(n);
  return i === -1 ? b : argv[i + 1];
};

const TARGET = String(opt("--target", "S1")).toUpperCase();
const MODEL = opt("--model", "gemini-3.7-flash");

if (!slug) {
  console.error("Pakai: node --env-file=.env tools/cocokkan-vo.mjs <slug> --target L|S1|S2 [--wav p] [--model id]");
  process.exit(1);
}

const WAV = opt("--wav", `out/voicetest/${slug}/.utuh-${TARGET}.wav`);

/* --- naskahnya -------------------------------------------------------------- */

const sumber =
  TARGET === "L"
    ? bacaEpisode(slug)
    : bacaShort(slug, daftarShort(slug).find((s) => s.prefiks === TARGET) ?? {});

/** --lewati <n>: n scene pertama TIDAK ada di audio ini.
 *
 *  Dipakai saat bikin-vo-utuh.mjs memisah hook (`--pisah`): hook disintesis
 *  sendiri, jadi aliran utuh yang dicocokkan di sini dimulai dari scene ke-n+1.
 *  Tanpa ini, penyejajaran mencari delapan kata pembuka yang memang tidak
 *  pernah diucapkan di audionya — dan melaporkannya sebagai naskah yang
 *  bergeser, tepat di alat yang tugasnya membuktikan naskah TIDAK bergeser. */
const LEWATI = Number(opt("--lewati", 0));

const scenes = (sumber.timing ?? [])
  .filter((t) => !t.standar && t.vo.trim())
  .slice(LEWATI);

/** Kata dinormalkan sebelum dibandingkan: transkripsi menulis tanda baca dan
 *  besar-kecil huruf sesukanya, dan "belakang." vs "belakang" bukan pergeseran
 *  naskah. Yang dicari pergeseran KATA, bukan pergeseran ejaan. */
const normal = (s) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

/* Urutan kata naskah, tiap kata tahu ia milik scene mana. */
const kataNaskah = [];
scenes.forEach((s, i) => {
  for (const k of normal(s.vo)) kataNaskah.push({ k, scene: i });
});

console.log(`\ncocokkan-vo · ${slug} · ${TARGET} · ${MODEL}`);
console.log(`  ${scenes.length} scene · ${kataNaskah.length} kata di naskah`);
console.log(`  audio: ${WAV}`);

/* --- transkripsi ------------------------------------------------------------ */

const audio = readFileSync(WAV);
console.log(`  ${(audio.length / 1024 / 1024).toFixed(2)} MB · mengirim ke ${MODEL} …\n`);

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
  {
    method: "POST",
    headers: {
      "x-goog-api-key": process.env.GEMINI_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text:
                "Transkripsikan audio bahasa Indonesia ini KATA PER KATA dengan cap waktu detik. " +
                "Kembalikan setiap kata yang benar-benar terdengar, urut waktu. " +
                "Jangan membetulkan, jangan meringkas, jangan menambah kata yang tidak diucapkan. " +
                "Kalau ada kata yang diucapkan dua kali, tulis dua kali. " +
                "`mulai` dan `akhir` dalam detik dari awal audio, dengan dua angka desimal.",
            },
            { inlineData: { mimeType: "audio/wav", data: audio.toString("base64") } },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            kata: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  t: { type: "STRING" },
                  mulai: { type: "NUMBER" },
                  akhir: { type: "NUMBER" },
                },
                required: ["t", "mulai", "akhir"],
              },
            },
          },
          required: ["kata"],
        },
      },
    }),
  },
);

if (!res.ok) {
  console.error(`Gemini menolak (HTTP ${res.status})\n${(await res.text()).slice(0, 400)}`);
  process.exit(1);
}

const data = await res.json();
const mentah = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join("") ?? "";
let transkrip;
try {
  transkrip = JSON.parse(mentah).kata ?? [];
} catch {
  console.error(`Balasan bukan JSON yang bisa dibaca:\n${mentah.slice(0, 300)}`);
  process.exit(1);
}

/* Satu entri transkrip bisa mengandung lebih dari satu kata setelah dinormalkan
   — "apa-apa" jadi dua, "D.N.S" jadi tiga. Mengambil token pertamanya saja
   membuang sisanya, dan yang terbuang itu dilaporkan sebagai "tidak diucapkan"
   padahal ia terdengar jelas. Jadi entrinya dimekarkan, dan cap waktunya dibagi
   rata di dalam rentang entri itu. */
const kataAudio = transkrip.flatMap((w) => {
  const token = normal(w.t);
  if (!token.length) return [];
  const lama = (w.akhir - w.mulai) / token.length;
  return token.map((n, i) => ({
    n,
    mulai: w.mulai + lama * i,
    akhir: w.mulai + lama * (i + 1),
  }));
});

console.log(`  ${kataAudio.length} kata ditranskripsi (naskah: ${kataNaskah.length})\n`);

/* --- cocokkan --------------------------------------------------------------- */

/** Penyejajaran Needleman–Wunsch sederhana. Dipakai alih-alih membandingkan
 *  indeks satu-satu karena satu kata yang hilang menggeser SEMUA kata sesudahnya
 *  — dan laporan "127 kata berbeda" yang sebenarnya berarti "1 kata hilang"
 *  adalah laporan yang tidak dibaca orang. */
const A = kataNaskah.length;
const B = kataAudio.length;
const skor = Array.from({ length: A + 1 }, () => new Int32Array(B + 1));
for (let i = 0; i <= A; i++) skor[i][0] = -i;
for (let j = 0; j <= B; j++) skor[0][j] = -j;
for (let i = 1; i <= A; i++)
  for (let j = 1; j <= B; j++)
    skor[i][j] = Math.max(
      skor[i - 1][j - 1] + (kataNaskah[i - 1].k === kataAudio[j - 1].n ? 1 : -1),
      skor[i - 1][j] - 1,
      skor[i][j - 1] - 1,
    );

const jejak = [];
{
  let i = A;
  let j = B;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && skor[i][j] === skor[i - 1][j - 1] + (kataNaskah[i - 1].k === kataAudio[j - 1].n ? 1 : -1)) {
      jejak.push({ n: kataNaskah[i - 1], a: kataAudio[j - 1] });
      i--; j--;
    } else if (i > 0 && skor[i][j] === skor[i - 1][j] - 1) {
      jejak.push({ n: kataNaskah[i - 1], a: null }); i--;
    } else {
      jejak.push({ n: null, a: kataAudio[j - 1] }); j--;
    }
  }
  jejak.reverse();
}

const cocok = jejak.filter((x) => x.n && x.a && x.n.k === x.a.n).length;
const hilang = jejak.filter((x) => x.n && !x.a);
const tambahan = jejak.filter((x) => !x.n && x.a);
const beda = jejak.filter((x) => x.n && x.a && x.n.k !== x.a.n);

console.log(`Pencocokan naskah vs yang diucapkan:`);
console.log(`  cocok      ${cocok} / ${A} (${((cocok / A) * 100).toFixed(1)}%)`);
console.log(`  tidak diucapkan ${hilang.length}   diucapkan tapi tidak di naskah ${tambahan.length}   berbeda ${beda.length}`);

for (const x of beda.slice(0, 10)) console.log(`    naskah "${x.n.k}" -> terdengar "${x.a.n}"`);
for (const x of hilang.slice(0, 10)) console.log(`    tidak terdengar: "${x.n.k}"`);
for (const x of tambahan.slice(0, 10)) console.log(`    tidak ada di naskah: "${x.a.n}"`);

/* --- batas scene ------------------------------------------------------------ */

/* Batas = akhir kata TERAKHIR scene N yang benar-benar ketemu di audio. Kata
   naskah yang tidak terdengar dilewati, jadi satu kata hilang tidak membatalkan
   seluruh batas. */
const batas = [];
for (let i = 0; i < scenes.length - 1; i++) {
  const terakhir = [...jejak].reverse().find((x) => x.n?.scene === i && x.a);
  const pertamaBerikut = jejak.find((x) => x.n?.scene === i + 1 && x.a);
  if (!terakhir || !pertamaBerikut) {
    console.error(`\n  Scene ${scenes[i].kunci} atau ${scenes[i + 1].kunci} tidak punya satu pun kata yang cocok — batas tidak bisa ditentukan.`);
    process.exit(1);
  }
  /* Di tengah jeda antara kata terakhir scene N dan kata pertama scene N+1. */
  batas.push((terakhir.a.akhir + pertamaBerikut.a.mulai) / 2);
}

const total = kataAudio.at(-1)?.akhir ?? 0;
const tepi = [0, ...batas, total];

console.log(`\nBatas scene dari cap waktu kata:\n`);
scenes.forEach((s, i) => {
  const d = tepi[i + 1] - tepi[i];
  console.log(
    `  ${s.kunci.padEnd(24)} ${tepi[i].toFixed(2).padStart(6)} → ${tepi[i + 1].toFixed(2).padStart(6)} ` +
      `= ${d.toFixed(2).padStart(5)} dtk  ${((s.kata / d) * 60).toFixed(0).padStart(4)} wpm`,
  );
});

const keluar = `out/voicetest/${slug}/batas-${TARGET}.json`;
writeFileSync(
  keluar,
  JSON.stringify({ slug, target: TARGET, wav: WAV, lewati: LEWATI, total, tepi }, null, 2),
);
console.log(`\nBatas ditulis ke ${keluar}`);
console.log(`Pakai: node --env-file=.env tools/bikin-vo-utuh.mjs ${slug} --target ${TARGET} --coba --jalan --pakai-wav --batas ${keluar}\n`);
