/* Gerbang "ada yang terlihat, tidak?" — pengganti sebagian `hyperframes check`.

   Kenapa ada. Pemeriksaan tipe lulus bukan bukti gambarnya ada. Di versi
   HyperFrames repo ini pernah kehilangan waktu karena panggung setinggi 0
   membuat SELURUH episode render hitam polos sementara semua pemeriksaan
   lulus — tidak ada yang salah, hanya tidak ada yang terlihat. Remotion
   menutup penyebab spesifik itu (<AbsoluteFill> selalu seukuran komposisi),
   tapi kelasnya tidak hilang: font gagal muat, aset salah path, scene keburu
   memudar, warna teks sama dengan latar.

   Yang diperiksa per frame:
     1. Tidak seragam        — lebih dari satu warna di layar
     2. Bukan cuma latar     — cukup piksel yang berbeda dari warna dasar
     3. Ada terang & gelap   — ada kontras, bukan gradient rata

   Ini SMOKE TEST, bukan QA visual. Ia menangkap "kosong", bukan "jelek".
   Kontras teks, kotak aman, dan kepadatan gerak tetap harus dilihat mata.

   Jalankan:  npm run check
*/
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { inflateSync } from "node:zlib";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

import { PREFIKS } from "./prefiks.mjs";

const KELUARAN = "out/periksa";
/* Lewat package.json karena berkas bin-nya tidak diekspor lewat "exports",
   jadi resolve() langsung ke path-nya ditolak Node. */
const CLI = (() => {
  const req = createRequire(import.meta.url);
  const pkg = req.resolve("@remotion/cli/package.json");
  return join(dirname(pkg), req("@remotion/cli/package.json").bin.remotion);
})();

/* Frame yang diperiksa. Scene standar dipilih karena keduanya milik shared/ —
   kalau salah satu rusak, SEMUA episode ikut rusak.

   Tidak ada yang menyampel frame 0. Gerak masuk baku mulai di detik 0,05
   (shared/anim.ts), jadi 1-2 frame pertama tiap scene memang sengaja kosong;
   memeriksanya di sana akan selalu merah tanpa ada yang rusak. */
/* ID komposisi scene = field `kunci` di timing.gen.ts, yang memuat nomor urut.
   Nomor itu bergeser begitu naskah disisipi scene baru, jadi ia dibaca dari
   sana — bukan ditulis "02-opening" di sini lalu jadi salah diam-diam.

   Awalannya (`t18-`) ikut dipasang di sini: sejak episode kedua, id komposisi
   scene berprefiks kode topik (src/Root.tsx · tools/prefiks.mjs).

   SLUG-NYA MENUNJUK TOPIK YANG SEDANG DIGARAP, dan itu perlu diganti tiap kali
   topik lama dikeluarkan. Dulu "apa-itu-firewall"; ia tayang dan dikeluarkan
   2026-08-18, dan berkas ini ikut pecah karena slug-nya disimpan keras di sini.
   Kalau tcp-ip nanti tayang juga, baris di bawah yang pertama harus diganti —
   `npm run check` mati total kalau tidak, dan matinya di readFileSync, bukan di
   pemeriksaan yang ia jaga. */
const kunci = (() => {
  const slug = "tcp-ip";
  const src = readFileSync(`ideas/${slug}/timing.gen.ts`, "utf8");
  const peta = new Map(
    [...src.matchAll(/"id":\s*"([^"]+)",\s*"kunci":\s*"([^"]+)"/g)].map((m) => [
      m[1],
      m[2],
    ]),
  );
  return (id) => {
    const k = peta.get(id);
    if (!k) throw new Error(`Scene "${id}" tidak ada di timing.gen.ts.`);
    return `${PREFIKS[slug]}-${k}`;
  };
})();

/* `subtitel: false` mematikan subtitel preview (shared/Vo.tsx). Kotaknya
   menambah warna, piksel terang, dan area gelap — persis tiga hal yang diukur
   di bawah — jadi tanpa ini scene yang benar-benar KOSONG bisa lolos hanya
   karena subtitelnya terlihat. Pemeriksaan yang isinya sebagian dirinya sendiri
   tidak membuktikan apa-apa. */
const TITIK = [
  { komposisi: kunci("opening"), frame: 40, nama: "kartu judul, setelah judul masuk" },
  { komposisi: kunci("closing"), frame: 60, nama: "tanda brand, setelah semua masuk" },
  /* Tiap episode disampel sendiri. Episode yang lolos tidak membuktikan apa pun
     tentang episode lain: panggung, koordinat, dan berkas bantunya beda — dan
     yang paling sering kosong justru episode yang paling baru. */
  {
    komposisi: "T18-tcp-ip",
    frame: 60,
    nama: "T18 · episode 2 dtk, scene hook",
    props: { subtitel: false },
  },
  /* SHORT & THUMBNAIL T18 sudah terdaftar di src/Root.tsx tapi BELUM disampel
     di sini. Begitu digarap, keduanya WAJIB masuk:

       { komposisi: "T18-tcp-ip-s1", frame: 60, props: { subtitel: false } }
       { komposisi: "t18-s1-99-closing", frame: 40 }
       { komposisi: "T18-thumb",         frame: 0 }

     Short: panggung 9:16 punya skala tipografi dan kotak aman sendiri
     (`.r-9x16`), jadi episode yang lolos TIDAK membuktikan apa pun tentangnya —
     dan Short justru yang paling gampang kosong: isi scene yang disusun untuk
     1920x1080 mendarat di luar bingkai 1080x1920 tanpa satu pun error.

     Thumbnail: ia yang paling mahal kalau kosong. MP4 yang gelap ketahuan saat
     ditonton sebelum diunggah, tapi thumbnail cuma dilihat sekali — waktu
     dipilih di kolom unggah — dan sesudah itu tidak ada yang membukanya lagi.
     Ukurannya juga sendiri (1280x720), jadi episode yang lolos tidak
     membuktikan apa pun tentangnya. */
];

/* --- pembaca PNG minimal ---------------------------------------------------
   Cukup untuk yang dikeluarkan Remotion: 8-bit, non-interlaced, RGB/RGBA. */

function bacaPng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("bukan PNG");

  let pos = 8;
  let ihdr = null;
  const idat = [];

  while (pos < buf.length) {
    const panjang = buf.readUInt32BE(pos);
    const jenis = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + panjang);
    if (jenis === "IHDR") {
      ihdr = {
        lebar: data.readUInt32BE(0),
        tinggi: data.readUInt32BE(4),
        kedalaman: data[8],
        jenisWarna: data[9],
        interlace: data[12],
      };
    } else if (jenis === "IDAT") {
      idat.push(data);
    } else if (jenis === "IEND") {
      break;
    }
    pos += 12 + panjang;
  }

  if (!ihdr) throw new Error("IHDR tidak ada");
  if (ihdr.kedalaman !== 8 || ihdr.interlace !== 0) {
    throw new Error(
      `PNG ${ihdr.kedalaman}-bit interlace=${ihdr.interlace} tidak didukung ` +
        `pembaca ini. Remotion biasanya mengeluarkan 8-bit non-interlaced.`,
    );
  }

  const kanal = { 0: 1, 2: 3, 4: 2, 6: 4 }[ihdr.jenisWarna];
  if (!kanal) throw new Error(`colorType ${ihdr.jenisWarna} tidak didukung`);

  const mentah = inflateSync(Buffer.concat(idat));
  const bpp = kanal;
  const perBaris = ihdr.lebar * bpp;
  const piksel = Buffer.alloc(ihdr.tinggi * perBaris);

  /* Buka filter per baris (spesifikasi PNG §9). Tanpa ini nilai piksel adalah
     selisih terhadap tetangganya, dan "warna" yang terbaca jadi omong kosong. */
  for (let y = 0; y < ihdr.tinggi; y++) {
    const filter = mentah[y * (perBaris + 1)];
    const masuk = mentah.subarray(
      y * (perBaris + 1) + 1,
      y * (perBaris + 1) + 1 + perBaris,
    );
    const keluar = piksel.subarray(y * perBaris, (y + 1) * perBaris);
    const atas = y > 0 ? piksel.subarray((y - 1) * perBaris, y * perBaris) : null;

    for (let x = 0; x < perBaris; x++) {
      const a = x >= bpp ? keluar[x - bpp] : 0;
      const b = atas ? atas[x] : 0;
      const c = atas && x >= bpp ? atas[x - bpp] : 0;
      let v = masuk[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      keluar[x] = v & 0xff;
    }
  }

  return { ...ihdr, kanal, piksel, perBaris };
}

/* --- ukuran isi frame ------------------------------------------------------ */

function ukur(png) {
  const { lebar, tinggi, kanal, piksel, perBaris } = png;
  const hitung = new Map();
  let terang = 0;
  let gelap = 0;
  let n = 0;

  /* Disampel tiap 4 piksel di kedua sumbu — 1/16 dari 2 juta piksel sudah
     jauh lebih dari cukup untuk membedakan "kosong" dari "ada isinya". */
  for (let y = 0; y < tinggi; y += 4) {
    for (let x = 0; x < lebar; x += 4) {
      const i = y * perBaris + x * kanal;
      const r = piksel[i];
      const g = piksel[i + 1] ?? r;
      const b = piksel[i + 2] ?? r;
      const kunci = (r << 16) | (g << 8) | b;
      hitung.set(kunci, (hitung.get(kunci) ?? 0) + 1);
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (luma > 140) terang++;
      if (luma < 40) gelap++;
      n++;
    }
  }

  let dominan = 0;
  for (const c of hitung.values()) if (c > dominan) dominan = c;

  return {
    warna: hitung.size,
    /* Porsi piksel yang BUKAN warna paling umum — di frame kosong nilainya
       mendekati nol karena semuanya latar. */
    isi: 1 - dominan / n,
    terang: terang / n,
    gelap: gelap / n,
  };
}

/* --- jalankan -------------------------------------------------------------- */

rmSync(KELUARAN, { recursive: true, force: true });
mkdirSync(KELUARAN, { recursive: true });

let gagal = 0;

for (const titik of TITIK) {
  const berkas = `${KELUARAN}/${titik.komposisi}-${titik.frame}.png`;
  process.stdout.write(`  ${titik.komposisi} @${titik.frame} … `);

  try {
    /* CLI-nya dipanggil sebagai skrip Node, bukan lewat `npx`. Di Windows,
       execFileSync menolak menjalankan npx.cmd (EINVAL) tanpa shell:true, dan
       menyalakan shell membuat argumen harus di-escape sendiri. */
    execFileSync(
      process.execPath,
      [
        CLI,
        "still",
        titik.komposisi,
        berkas,
        "--frame",
        String(titik.frame),
        ...(titik.props ? ["--props", JSON.stringify(titik.props)] : []),
        "--log",
        "error",
      ],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
  } catch (e) {
    console.log("GAGAL RENDER");
    console.log(String(e.stderr ?? e.message).trim().split("\n").slice(-8).join("\n"));
    gagal++;
    continue;
  }

  const m = ukur(bacaPng(readFileSync(berkas)));
  const alasan = [];
  if (m.warna < 12) alasan.push(`cuma ${m.warna} warna`);
  if (m.isi < 0.02) alasan.push(`isi ${(m.isi * 100).toFixed(1)}% (nyaris semua latar)`);
  if (m.terang < 0.001) alasan.push("tidak ada piksel terang — teks/ikon hilang?");
  if (m.gelap < 0.05) alasan.push("tidak ada area gelap — latar hilang?");

  if (alasan.length) {
    console.log(`KOSONG — ${alasan.join("; ")}`);
    console.log(`    ${titik.nama} · lihat ${berkas}`);
    gagal++;
  } else {
    console.log(
      `ok (${m.warna} warna, isi ${(m.isi * 100).toFixed(1)}%, terang ${(m.terang * 100).toFixed(1)}%)`,
    );
  }
}

if (gagal) {
  console.error(
    `\n${gagal} frame tidak lolos. Buka PNG-nya di ${KELUARAN}/ dan lihat sendiri — ` +
      `angka di atas cuma memberi tahu ADA sesuatu, bukan bahwa itu benar.`,
  );
  process.exit(1);
}
console.log(`\n${TITIK.length} frame ada isinya. Tetap lihat sendiri sebelum render final.`);
