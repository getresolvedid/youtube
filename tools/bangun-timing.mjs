/* Menyusun timeline episode dari naskah.md → ideas/<slug>/timing.gen.ts

   Naskah adalah sumber kebenaran. Durasi tiap scene dihitung dari jumlah kata
   kolom VO; scene standar (opening/closing) tidak punya VO jadi durasinya
   diambil dari .env. Tidak ada berkas timing perantara yang disunting tangan —
   berkas seperti itu selalu jadi basi tanpa ada yang sadar.

   Rumus durasi identik dengan tools/estimate-timing.mjs: dibulatkan DULU per
   scene, baru diakumulasi. Kalau dibalik, pembulatan akhir menggeser semua
   `mulai` sesudahnya beberapa frame.

   Penempatan scene standar mengikuti docs/10:
     opening — tepat setelah baris terakhir bagian 1 (question)
     closing — paling akhir

   Jalankan:  node --env-file=.env tools/bangun-timing.mjs apa-itu-ram
   Otomatis lewat npm pre-script (studio / render / build).
*/
import { readFileSync, writeFileSync } from "node:fs";

const slug = process.argv[2] ?? "apa-itu-ram";
const naskah = `ideas/${slug}/naskah.md`;

const R = (n) => Math.round(n * 100) / 100;
const wajib = (nama) => {
  const v = process.env[nama];
  if (v === undefined || v === "") {
    throw new Error(`${nama} kosong di .env — lihat docs/08-konfigurasi.md.`);
  }
  return Number(v);
};

const WPM = wajib("VO_WORDS_PER_MINUTE");
const PAD = wajib("VO_PAD_SECONDS");
const DUR_OPENING = wajib("OPENING_SECONDS");
const DUR_CLOSING = wajib("CLOSING_LONG_SECONDS");

/* --- baca tabel scene ------------------------------------------------------ */

const cells = (l) =>
  l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

const baris = [];
{
  const lines = readFileSync(naskah, "utf8").split(/\r?\n/);
  let voCol = -1;
  let bagianCol = -1;
  let inScene = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (/^### Scene\s*$/.test(line)) {
      inScene = true;
      continue;
    }
    if (inScene && /^#{2,3}\s/.test(line)) break;
    if (!inScene || !line.startsWith("|")) continue;

    const cols = cells(line);
    const iVo = cols.findIndex((c) => c.toUpperCase() === "VO");
    if (iVo !== -1) {
      voCol = iVo;
      bagianCol = cols.findIndex((c) => c.toLowerCase() === "bagian");
      continue;
    }
    if (voCol === -1 || /^-{2,}/.test(cols[0] ?? "")) continue;

    /* Kolom pertama = ID scene. Boleh nomor (`004` → `s004`) atau nama
       (`hook-question`) untuk scene yang digabung atau ditulis tangan. */
    const id0 = cols[0] ?? "";
    if (!/^\d{1,3}$/.test(id0) && !/^[a-z][a-z0-9-]*$/.test(id0)) continue;

    const teks = (cols[voCol] ?? "")
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\*\*([^*]*)\*\*/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    if (!teks || teks === "...") continue;

    const kata = teks.split(/\s+/).filter(Boolean).length;
    baris.push({
      id: /^\d{1,3}$/.test(id0) ? "s" + id0.padStart(3, "0") : id0,
      bagian: bagianCol === -1 ? "" : (cols[bagianCol] ?? ""),
      durasi: R((kata / WPM) * 60 + PAD),
      /* VO ikut dibawa supaya scene yang belum dibuat bisa menampilkan
         kalimatnya sendiri di Studio — tahu apa yang harus digambar tanpa
         membuka naskah di jendela lain. */
      vo: teks,
      kata,
    });
  }
}

if (baris.length === 0) {
  throw new Error(`Tidak ada baris scene terbaca di ${naskah}.`);
}

/* --- sisipkan scene standar ------------------------------------------------ */

const iAkhirQuestion = baris.reduce(
  (akhir, b, i) => (/^1\b/.test(b.bagian) ? i : akhir),
  -1,
);
if (iAkhirQuestion === -1) {
  throw new Error(
    `Tidak ada scene bagian 1 (question) di ${naskah}. ` +
      `Opening harus ditempatkan setelahnya (docs/10).`,
  );
}

const urut = [];
baris.forEach((b, i) => {
  urut.push({ id: b.id, bagian: b.bagian, vo: b.vo, durasi: b.durasi, standar: false });
  if (i === iAkhirQuestion) {
    urut.push({ id: "opening", bagian: "2 brand", vo: "", durasi: DUR_OPENING, standar: true });
  }
});
urut.push({ id: "closing", bagian: "penutup", vo: "", durasi: DUR_CLOSING, standar: true });

/* --- akumulasi ------------------------------------------------------------- */

let t = 0;
const timing = urut.map((u) => {
  const entri = {
    id: u.id,
    bagian: u.bagian,
    mulai: R(t),
    durasi: u.durasi,
    standar: u.standar,
    vo: u.vo,
  };
  t = R(t + u.durasi);
  return entri;
});
const TOTAL = R(t);

/* --- tulis ----------------------------------------------------------------- */

const isi = `/* DIGENERATE oleh tools/bangun-timing.mjs dari ideas/${slug}/naskah.md.
   Jangan disunting tangan — ubah naskahnya lalu bangun ulang.
   Berkas ini di-ignore git.

   ${timing.length} scene · total ${TOTAL} dtk (${Math.floor(TOTAL / 60)} mnt ${Math.round(TOTAL % 60)} dtk)
   Durasi = (kata / ${WPM} wpm) x 60 + ${PAD} dtk napas. */

export type Timing = {
  readonly id: string;
  /** Bagian flow 7 langkah (docs/02) — mis. "3 problem". */
  readonly bagian: string;
  /** Detik mulai, relatif terhadap awal episode. */
  readonly mulai: number;
  readonly durasi: number;
  /** true untuk opening & closing — komponennya milik shared/, bukan episode. */
  readonly standar: boolean;
  /** Baris VO dari naskah; kosong untuk scene standar. */
  readonly vo: string;
};

export const TIMING: readonly Timing[] = ${JSON.stringify(timing, null, 2)} as const;

export const TOTAL = ${TOTAL};

/** Cari timing satu scene menurut ID. Melempar kalau ID-nya tidak ada di
 *  naskah — lebih baik gagal saat build daripada scene diam-diam berdurasi 0. */
export const cari = (id: string): Timing => {
  const t = TIMING.find((x) => x.id === id);
  if (!t) throw new Error(\`Scene "\${id}" tidak ada di ideas/${slug}/naskah.md.\`);
  return t;
};
`;

writeFileSync(`ideas/${slug}/timing.gen.ts`, isi);
console.log(
  `ideas/${slug}/timing.gen.ts — ${timing.length} scene, total ${TOTAL} dtk ` +
    `(${Math.floor(TOTAL / 60)} mnt ${Math.round(TOTAL % 60)} dtk).`,
);
