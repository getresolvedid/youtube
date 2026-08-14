/**
 * ukur-dns.mjs — mengukur waktu bertanya nama di mesin ini.
 *
 *   node tools/ukur-dns.mjs
 *
 * Dipakai untuk T14 "Apa itu DNS server": angka yang tampil di video harus
 * angka yang benar-benar diukur di mesin yang disebutkan, bukan kutipan dari
 * sumber sekunder yang tidak bisa ditelusuri. Padanan tools/ukur-latensi.mjs
 * milik T01.
 *
 * YANG DIUKUR: selisih antara pertanyaan yang harus MENEMPUH TANGGA dan
 * pertanyaan yang BERHENTI DI CATATAN — dua hal yang dijelaskan `06-tangga` dan
 * `07-dicatat`.
 *
 * METODE. Dipakai `dns.Resolver` (c-ares), bukan `dns.lookup`: yang kedua lewat
 * getaddrinfo dan ikut memakai cache sistem operasi, jadi yang terukur bukan
 * perjalanan ke loketnya melainkan pembacaan cache Windows. c-ares tidak punya
 * cache sendiri, jadi setiap panggilan benar-benar dikirim ke loket yang
 * dikonfigurasi di mesin ini.
 *
 * Dua pasang pengukuran, dan keduanya membandingkan HAL YANG SAMA dua kali —
 * bukan dua jalur kode yang berbeda:
 *
 *   A. nama acak   Label acak di bawah domain nyata. Tanya pertama memaksa
 *                  loketnya menempuh tangga sampai ke pemilik namanya; tanya
 *                  kedua dijawab dari catatan (negative caching, RFC 2308).
 *   B. nama nyata  Domain populer. Tanya pertama BELUM TENTU menempuh tangga —
 *                  loketnya mungkin sudah punya catatannya karena orang lain
 *                  baru saja menanyakannya. Karena itu A yang jadi angka
 *                  utamanya, dan B disertakan sebagai pembanding jujur.
 *
 * KETERBATASAN YANG WAJIB DISEBUT KALAU ANGKANYA DIPAKAI:
 * - Ini mengukur waktu ke loket yang dikonfigurasi di mesin ini, lewat sambungan
 *   internet yang dipakai saat mengukur. Angkanya milik mesin + sambungan itu,
 *   bukan milik "DNS" secara umum.
 * - Pada kasus A yang diukur adalah jawaban NEGATIF (nama itu memang tidak ada).
 *   Perjalanan tangganya sama — akar, tingkat akhiran, lalu pemilik namanya —
 *   tapi jawaban positif untuk nama yang benar-benar baru bisa sedikit berbeda.
 * - Label acaknya memakai Math.random dengan sengaja. Larangan Math.random di
 *   repo ini berlaku untuk KOMPOSISI Remotion, yang wajib jadi fungsi murni dari
 *   frame; di sini justru kebalikannya yang dibutuhkan — label yang sama di
 *   jalan kedua akan dijawab dari catatan, dan pengukurannya batal.
 */
import { Resolver, lookup } from "node:dns/promises";
import { getServers } from "node:dns";

/** Domain yang dipakai sebagai induk label acak. Sengaja beberapa akhiran yang
 *  berbeda supaya yang terukur bukan kebetulan satu tingkat akhiran yang lambat. */
const INDUK = ["wikipedia.org", "kernel.org", "debian.org", "python.org", "gnu.org"];

/** Nama nyata untuk pembanding. */
const NYATA = ["wikipedia.org", "kernel.org", "debian.org", "python.org", "gnu.org"];

const ULANG = 5;

const label = () => `t14-${Math.random().toString(36).slice(2, 10)}`;

/** Satu pertanyaan, dalam milidetik. `null` kalau gagal karena jaringan. */
const tanya = async (resolver, nama) => {
  const t0 = process.hrtime.bigint();
  try {
    await resolver.resolve4(nama);
  } catch (err) {
    /* NXDOMAIN / NODATA adalah JAWABAN, bukan kegagalan — dan justru itu yang
       diukur pada kasus A. Yang bukan jawaban cuma timeout dan mati jaringan. */
    if (!["ENOTFOUND", "ENODATA"].includes(err.code)) return null;
  }
  return Number(process.hrtime.bigint() - t0) / 1e6;
};

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const fmt = (n) => `${n.toFixed(1)} ms`;

const ukur = async (resolver, buatNama, judul) => {
  const pertama = [];
  const kedua = [];

  for (let i = 0; i < ULANG; i++) {
    for (const induk of INDUK) {
      const nama = buatNama(induk);
      const a = await tanya(resolver, nama);
      const b = await tanya(resolver, nama);
      if (a === null || b === null) continue;
      pertama.push(a);
      kedua.push(b);
    }
  }

  if (pertama.length === 0) {
    console.log(`\n${judul}\n  GAGAL — tidak ada jawaban. Cek sambungan internet.`);
    return null;
  }

  const p = median(pertama);
  const k = median(kedua);
  console.log(`\n${judul}   (${pertama.length} pasang)`);
  console.log(`  tanya pertama (menempuh tangga) : ${fmt(p)}   min ${fmt(Math.min(...pertama))}  maks ${fmt(Math.max(...pertama))}`);
  console.log(`  tanya kedua   (dari catatan)    : ${fmt(k)}   min ${fmt(Math.min(...kedua))}  maks ${fmt(Math.max(...kedua))}`);
  console.log(`  selisih median                  : ${fmt(p - k)}  (${(p / k).toFixed(1)}x)`);
  return { p, k };
};

/** C · catatan di MESIN SENDIRI. `lookup` lewat getaddrinfo, jadi ia memakai
 *  cache sistem operasi — persis "catatan pertama di jalan pulang" yang
 *  dijelaskan `07-dicatat`. Inilah pembanding yang benar untuk perjalanan ke
 *  loket: bukan cache milik loketnya, melainkan cache milik mesinmu. */
const ukurLokal = async () => {
  const jauh = [];
  const dekat = [];
  const resolver = new Resolver();

  for (let i = 0; i < ULANG; i++) {
    for (const nama of NYATA) {
      const a = await tanya(resolver, nama); // selalu ke loket, c-ares tanpa cache
      const t0 = process.hrtime.bigint();
      try {
        await lookup(nama); // lewat cache sistem operasi
      } catch {
        continue;
      }
      const b = Number(process.hrtime.bigint() - t0) / 1e6;
      if (a === null) continue;
      jauh.push(a);
      dekat.push(b);
    }
  }

  if (jauh.length === 0) {
    console.log("\nC · GAGAL — tidak ada jawaban.");
    return;
  }
  const p = median(jauh);
  const k = median(dekat);
  console.log(`\nC · ke loket vs catatan di mesin ini   (${jauh.length} pasang)`);
  console.log(`  bertanya ke loket   : ${fmt(p)}   min ${fmt(Math.min(...jauh))}  maks ${fmt(Math.max(...jauh))}`);
  console.log(`  dari catatan sendiri: ${fmt(k)}   min ${fmt(Math.min(...dekat))}  maks ${fmt(Math.max(...dekat))}`);
  console.log(`  selisih median      : ${fmt(p - k)}  (${(p / Math.max(k, 0.001)).toFixed(0)}x)`);
};

const main = async () => {
  const resolver = new Resolver();
  const loket = getServers();

  console.log("ukur-dns.mjs — waktu bertanya nama di mesin ini");
  console.log(`  loket yang dipakai: ${loket.join(", ")}`);
  console.log(`  ${ULANG} putaran x ${INDUK.length} nama, dilaporkan sebagai median`);

  await ukur(resolver, (induk) => `${label()}.${induk}`, "A · nama acak — belum pernah ditanyakan siapa pun");
  await ukur(resolver, (induk) => induk, "B · nama nyata — loketnya mungkin sudah punya catatannya");
  await ukurLokal();

  console.log(
    "\nAngka ini milik mesin + sambungan yang dipakai saat mengukur, bukan milik\n" +
      '"DNS" secara umum. Kalau dipakai di video atau deskripsi, sebut begitu.',
  );
};

await main();
