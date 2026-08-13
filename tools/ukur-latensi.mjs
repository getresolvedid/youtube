/**
 * ukur-latensi.mjs — mengukur latensi akses memori di mesin ini.
 *
 *   node tools/ukur-latensi.mjs
 *
 * Dipakai untuk T01 "Apa itu RAM": angka yang tampil di video harus angka yang
 * benar-benar diukur di mesin yang disebutkan, bukan kutipan dari sumber
 * sekunder yang tidak bisa ditelusuri.
 *
 * Metode: pointer chasing. Array berisi indeks berikutnya dalam urutan acak
 * tetap (seeded, deterministik). Setiap baca bergantung pada hasil baca
 * sebelumnya, jadi CPU tidak bisa menjalankannya paralel atau menebak duluan
 * lewat prefetch — yang terukur mendekati latensi sesungguhnya, bukan bandwidth.
 *
 * Keterbatasan yang harus disebut kalau angkanya dipakai:
 * - Dijalankan di atas JIT JavaScript, jadi ada overhead beberapa nanodetik.
 *   Angkanya SAH sebagai perbandingan antar tingkat, dan sedikit lebih tinggi
 *   daripada latensi murni perangkat kerasnya.
 * - Ukuran array menentukan tingkat mana yang teruji, tapi batas antar tingkat
 *   tidak pernah setajam angka di brosur.
 */

const MB = 1024 * 1024;

// PRNG deterministik (mulberry32) — tanpa Math.random, hasil bisa diulang.
function rng(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Rantai pointer acak yang melewati SETIAP slot tepat sekali (siklus penuh). */
function buatRantai(n) {
  const urutan = new Int32Array(n);
  for (let i = 0; i < n; i++) urutan[i] = i;

  const acak = rng(12345);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(acak() * (i + 1));
    const t = urutan[i]; urutan[i] = urutan[j]; urutan[j] = t;
  }

  const next = new Int32Array(n);
  for (let i = 0; i < n; i++) next[urutan[i]] = urutan[(i + 1) % n];
  return next;
}

function ukur(bytes) {
  const n = Math.floor(bytes / 4);        // Int32Array: 4 byte per slot
  const next = buatRantai(n);
  const langkah = Math.max(n * 4, 2_000_000);

  let p = 0;
  for (let i = 0; i < Math.min(n, 200_000); i++) p = next[p];   // pemanasan

  const t0 = process.hrtime.bigint();
  for (let i = 0; i < langkah; i++) p = next[p];
  const t1 = process.hrtime.bigint();

  if (p < 0) throw new Error("mustahil");  // cegah loop dioptimasi habis
  return Number(t1 - t0) / langkah;         // nanodetik per akses
}

const ujian = [
  { label: "16 KB   (L1)",       bytes: 16 * 1024 },
  { label: "256 KB  (L2)",       bytes: 256 * 1024 },
  { label: "2 MB    (L2/L3)",    bytes: 2 * MB },
  { label: "8 MB    (L3)",       bytes: 8 * MB },
  { label: "64 MB   (RAM)",      bytes: 64 * MB },
  { label: "512 MB  (RAM)",      bytes: 512 * MB },
];

console.log("Latensi akses memori — pointer chasing (nanodetik per akses)\n");
console.log("| Ukuran kerja | ns/akses |");
console.log("|---|---|");

const hasil = [];
for (const u of ujian) {
  // tiga kali, ambil yang tercepat — buang gangguan proses lain
  const s = [ukur(u.bytes), ukur(u.bytes), ukur(u.bytes)].sort((a, b) => a - b)[0];
  hasil.push({ ...u, ns: s });
  console.log(`| ${u.label} | ${s.toFixed(2)} |`);
}

const l1 = hasil[0].ns;
const ram = hasil[hasil.length - 1].ns;
console.log(`\nRasio RAM : L1  =  ${(ram / l1).toFixed(1)}×`);
console.log("\nCatatan: diukur lewat JIT JavaScript, jadi ada overhead beberapa ns.");
console.log("Sah sebagai perbandingan antar tingkat; bukan angka murni perangkat keras.");
