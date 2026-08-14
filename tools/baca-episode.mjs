/* Membaca satu episode dari dua sumber, dipakai bersama oleh
   tools/bangun-timing.mjs dan tools/estimate-timing.mjs.

     ideas/<slug>/naskah.md                   DAFTAR scene: id, bagian, urutan
     ideas/<slug>/scenes/<kunci>-vo.md        TEKS VO scene itu (HARD RULE 4)

   Kenapa satu modul dan bukan dua skrip yang masing-masing membaca sendiri:
   sebelum ini keduanya menurunkan durasi dari rumus yang sama, ditulis dua kali,
   dan satu-satunya yang menjaga keduanya tetap sama adalah ingatan. Rumus yang
   diketik dua kali cepat atau lambat jadi dua rumus.

   Rumus durasi — dibulatkan DULU per beat, baru diakumulasi. Kalau dibalik,
   pembulatan akhir menggeser semua `mulai` sesudahnya beberapa frame.

     durasi_beat  = kata / VO_WORDS_PER_MINUTE * 60
     durasi_scene = jumlah durasi_beat + VO_PAD_SECONDS

   PERKIRAAN ITU CUMA DIPAKAI SELAMA BERKAS VO-nya BELUM ADA. Begitu MP3 scene
   itu ada di public/vo/, durasinya diambil dari berkasnya lewat ffprobe dan
   beat-nya diregangkan/dirapatkan sepadan. Alasannya bukan kerapian: perkiraan
   dari jumlah kata meleset beberapa persen per scene, dan selisih itu MENUMPUK
   — di Short pertama repo ini pergeserannya sampai +2 detik di scene terakhir,
   yang artinya animasi berhenti jatuh di kalimat yang dimaksud justru di beat
   penutup. Bandingkan kapan saja dengan tools/vo-durations.mjs.

   Tanpa ffprobe di PATH, semuanya jatuh kembali ke perkiraan dan build tetap
   jalan — dengan peringatan, bukan dengan diam.

   Scene yang rencana VO-nya belum ada (atau blok `## VO`-nya masih kosong)
   TIDAK menghentikan build: durasinya diisi VO_PLACEHOLDER_SECONDS supaya
   episode tetap bisa di-scrub, dan `npm run sisa` yang melaporkannya.

   Berkas VO yang SUDAH jadi ikut dideteksi di sini (lihat bacaAudioVO), supaya
   komposisi tahu sendiri scene mana yang sudah bersuara dan scene mana yang
   masih harus menampilkan subtitel preview — tanpa ada saklar yang disetel
   tangan dan lupa dikembalikan.
*/
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";

export const R = (n) => Math.round(n * 100) / 100;

/* --- durasi berkas VO yang sudah jadi --------------------------------------- */

const FFPROBE = process.env.FFPROBE_PATH || "ffprobe";
const cacheDurasi = new Map();
let ffprobeHilang = false;

/** Durasi MP3 dalam detik, atau null kalau berkas/ffprobe tidak ada.
 *
 *  Di-cache karena `npm run gen` membangun episode + kedua Short dalam satu
 *  proses, dan tanpa cache tiap berkas diprobe berkali-kali. */
export const durasiAudio = (path) => {
  if (cacheDurasi.has(path)) return cacheDurasi.get(path);
  if (ffprobeHilang || !existsSync(path)) return null;

  let d = null;
  try {
    const out = execFileSync(
      FFPROBE,
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
      { encoding: "utf8" },
    );
    const n = Number(out.trim());
    if (Number.isFinite(n) && n > 0) d = n;
  } catch (err) {
    if (err.code === "ENOENT") {
      /* Sekali saja: kalau ffprobe tidak ada, ia tidak akan tiba-tiba ada di
         tengah build yang sama. */
      ffprobeHilang = true;
      console.warn(
        "  ⚠ ffprobe tidak ada di PATH — timing memakai PERKIRAAN dari jumlah kata\n" +
          "    walaupun berkas VO-nya sudah ada. Pasang: winget install Gyan.FFmpeg\n" +
          "    (PATH-nya baru aktif di terminal baru), atau set FFPROBE_PATH di .env.",
      );
    }
  }

  cacheDurasi.set(path, d);
  return d;
};

export const wajib = (nama) => {
  const v = process.env[nama];
  if (v === undefined || v === "") {
    throw new Error(`${nama} kosong di .env — lihat docs/08-konfigurasi.md.`);
  }
  return Number(v);
};

/** Closing DIPATOK di 99, tidak ikut nomor urut.
 *
 *  Alasannya: ia selalu scene terakhir, jadi nomor urutnya bergeser setiap kali
 *  satu scene ditambahkan di mana pun — 83-closing, lalu 3-closing, lalu
 *  4-closing, tanpa ada yang berubah pada closing-nya sendiri. Setiap pergeseran
 *  itu mengganti nama berkas direction & rencana VO-nya dan memutus perintah CLI
 *  yang sudah ditulis di dokumen. 99 tidak pernah bergeser dan tetap mengurutkan
 *  paling akhir.
 *
 *  Opening TIDAK dipatok: posisinya memang bermakna (tepat setelah bagian 1),
 *  dan nomor yang bergerak di situ justru memberi tahu bahwa bagian 1 berubah
 *  panjang. */
export const KUNCI_CLOSING = 99;

export const STANDAR = new Set(["opening", "closing"]);

const cells = (l) =>
  l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

/** Buang markdown supaya hitungan kata/karakter mendekati teks yang dikirim ke TTS. */
const polos = (s) =>
  s
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

/* --- daftar scene: naskah.md ----------------------------------------------- */

/** Baris tabel `### Scene` di naskah — urutan tayang, id, dan bagian flow.
 *
 *  Naskah TIDAK lagi memuat teks VO (HARD RULE 4): ia daftar isi episode, bukan
 *  tempat kalimatnya hidup. Tabel dikenali dari kolom berjudul persis `Bagian`.
 *
 *  `bagianRe` membatasi pencarian ke satu bagian `##` saja — dipakai Shorts,
 *  yang tabelnya ada di bawah `## Short 1 — …` di naskah yang sama. Tanpa itu
 *  yang terbaca selalu tabel PERTAMA di berkas, yaitu milik video panjang. */
export const bacaDaftar = (naskahPath, bagianRe = null) => {
  const lines = readFileSync(naskahPath, "utf8").split(/\r?\n/);
  const baris = [];
  let bagianCol = -1;
  let ringkasCol = -1;
  let diScene = false;
  let diBagian = bagianRe === null;

  for (const raw of lines) {
    const line = raw.trim();

    if (bagianRe !== null && /^##\s/.test(line)) {
      /* Bagian berakhir di heading `##` berikutnya. Heading `###` di dalamnya
         (Scene, Timing) tidak menutupnya. */
      if (diBagian) break;
      diBagian = bagianRe.test(line);
      continue;
    }
    if (!diBagian) continue;

    if (/^### Scene\s*$/.test(line)) {
      diScene = true;
      continue;
    }
    if (diScene && /^#{2,3}\s/.test(line)) break;
    if (!diScene || !line.startsWith("|")) continue;

    const cols = cells(line);
    const iBagian = cols.findIndex((c) => c.toLowerCase() === "bagian");
    if (iBagian !== -1) {
      bagianCol = iBagian;
      ringkasCol = cols.findIndex((c) => c.toLowerCase() === "ringkas");
      continue;
    }
    if (bagianCol === -1 || /^-{2,}/.test(cols[0] ?? "")) continue;

    /* Kolom pertama = ID scene. Boleh nomor (`004` → `s004`) atau nama
       (`hook-question`) untuk scene yang digabung atau ditulis tangan. */
    const id0 = cols[0] ?? "";
    if (!/^\d{1,3}$/.test(id0) && !/^[a-z][a-z0-9-]*$/.test(id0)) continue;

    baris.push({
      id: /^\d{1,3}$/.test(id0) ? "s" + id0.padStart(3, "0") : id0,
      bagian: cols[bagianCol] ?? "",
      ringkas: ringkasCol === -1 ? "" : polos(cols[ringkasCol] ?? ""),
    });
  }

  if (baris.length === 0) {
    throw new Error(
      `Tidak ada baris scene terbaca di ${naskahPath}` +
        `${bagianRe ? ` bagian ${bagianRe}` : ""}. Tabel di bawah ` +
        `"### Scene" harus punya kolom berjudul persis "Bagian" dan id scene ` +
        `di kolom pertama — lihat docs/05-template-naskah.md.`,
    );
  }
  return baris;
};

/* --- teks VO: scenes/<kunci>-vo.md ----------------------------------------- */

/** Isi blok `## VO` sebuah rencana VO, satu baris = satu beat.
 *
 *  Hanya blok itu yang dibaca; sisa berkasnya (alasan pilihan kata, catatan
 *  pengucapan, sinkron ke direction) untuk manusia dan tidak pernah ikut
 *  dihitung — supaya menambah catatan tidak diam-diam memperpanjang scene. */
export const bacaVO = (path) => {
  if (!existsSync(path)) return { ada: false, baris: [] };

  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  const baris = [];
  let diVO = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (/^##\s+VO\s*$/i.test(line)) {
      diVO = true;
      continue;
    }
    if (!diVO) continue;
    if (/^#{1,6}\s/.test(line)) break;
    if (!line || line.startsWith("<!--")) continue;

    const teks = polos(line.replace(/^>\s?/, "").replace(/^[-*+]\s+/, ""));
    if (teks) baris.push(teks);
  }

  return { ada: true, baris };
};

/* --- berkas VO jadi: public/vo/<slug>/ -------------------------------------- */

/** `<prefiks>-<kunci>.mp3` — satu berkas per scene (docs/04 §6).
 *
 *  Prefiksnya memisahkan tiga keluaran yang berbagi satu folder `public/vo/<slug>/`:
 *  `L` video panjang, `S1`/`S2` kedua Shorts. Tanpa itu `01-hook` milik Short
 *  dan `01-hook-question` milik video panjang berebut ruang nama yang sama. */
const polaAudio = (prefiks) =>
  new RegExp(`^${prefiks}-(.+)\\.(?:mp3|wav|m4a)$`, "i");

/** Peta kunci scene -> path VO relatif terhadap public/, siap dipakai
 *  `staticFile()`. Kosong selama VO belum dibuat.
 *
 *  Kenapa di public/ dan bukan di ideas/<slug>/vo/: hanya isi public/ yang bisa
 *  dipanggil `staticFile()` dari komposisi. Berkas di ideas/ harus diimpor
 *  statis satu per satu — dan daftar impor yang ditulis tangan adalah sumber
 *  kebenaran kedua yang akan meleset dari naskah dalam sekali sisip scene.
 *
 *  Keberadaan berkasnyalah yang menentukan scene itu sudah "final" atau masih
 *  preview: ada berkas -> <Audio>, belum ada -> subtitel preview (docs/11). */
export const bacaAudioVO = (slug, prefiks = "L") => {
  const dir = `public/vo/${slug}`;
  const peta = new Map();
  if (!existsSync(dir)) return peta;

  const pola = polaAudio(prefiks);
  for (const f of readdirSync(dir).sort()) {
    const m = pola.exec(f);
    if (!m) continue;
    const kunci = m[1];
    if (peta.has(kunci)) {
      throw new Error(
        `${dir}: dua berkas VO untuk scene "${kunci}" ` +
          `(${peta.get(kunci).split("/").pop()} dan ${f}). ` +
          `Sisakan satu — mana yang dipakai tidak boleh bergantung urutan baca.`,
      );
    }
    peta.set(kunci, `vo/${slug}/${f}`);
  }
  return peta;
};

/* --- rumus timing, dipakai video panjang DAN Shorts ------------------------- */

/** Menyusun timing sederet scene dari daftarnya + rencana VO tiap scene.
 *
 *  Satu-satunya tempat rumus durasi hidup. Shorts memakai fungsi yang sama
 *  persis dengan video panjang dan cuma berbeda di tiga hal — tidak ada
 *  opening, closing-nya lebih pendek, dan berkas VO-nya di folder lain —
 *  jadi ketiganya masuk sebagai parameter. Menyalin rumusnya ke pembaca Shorts
 *  akan mengulangi persis kesalahan yang komentar di kepala berkas ini
 *  peringatkan: rumus yang diketik dua kali cepat atau lambat jadi dua rumus.
 *
 *  @param urut  daftar scene urut tayang, scene standar sudah disisipkan
 *  @param o.dirVO  folder rencana VO — `ideas/<slug>/scenes` atau
 *                  `ideas/<slug>/scene-shorts/<short>`
 *  @param o.durasiStandar  detik untuk scene standar, menurut id-nya */
const susunTiming = (urut, o) => {
  const { dirVO, audio, WPM, PAD, DUR_PLACEHOLDER, durasiStandar, label } = o;

  /* Lebar nomor urut mengikuti jumlah scene: 83 scene -> 2 digit. Kalau tidak
     di-pad, `ls scenes/` mengurutkan 1, 10, 11, 2, 20 — dan nomor urut yang
     tidak mengurutkan apa-apa lebih buruk daripada tidak ada nomor. */
  const LEBAR = String(urut.length).length;

  if (urut.length >= KUNCI_CLOSING) {
    throw new Error(
      `${label}: ${urut.length} scene — sudah menyentuh nomor patokan closing ` +
        `(${KUNCI_CLOSING}). Naikkan KUNCI_CLOSING di tools/baca-episode.mjs, ` +
        `jangan biarkan dua scene berebut nomor yang sama.`,
    );
  }

  let t = 0;
  const timing = urut.map((u, i) => {
    /* Kunci = nama berkas tanpa ekstensi = ID komposisi Remotion.
       Satu bentuk untuk keempatnya, supaya `01-hook-question.tsx`,
       `01-hook-question-vo.md`, `npx remotion still 01-hook-question`, dan baris
       di sidebar Studio menyebut hal yang sama persis. */
    const kunci = `${
      u.id === "closing" ? String(KUNCI_CLOSING) : String(i + 1).padStart(LEBAR, "0")
    }-${u.id}`;

    const voPath = `${dirVO}/${kunci}-vo.md`;
    const vo = u.standar ? { ada: false, baris: [] } : bacaVO(voPath);

    /* Beat = satu baris di blok `## VO`. Inilah yang membuat komposisi bisa
       menjatuhkan gerakan tepat di kata tertentu tanpa mengetik detik hasil
       hitungan tangan — begitu satu kalimat diubah, semua beat sesudahnya
       ikut bergeser sendiri. */
    const kataBaris = vo.baris.map((teks) => ({
      teks,
      kata: teks.split(/\s+/).filter(Boolean).length,
    }));

    const perkiraanVO = kataBaris.reduce((n, b) => n + R((b.kata / WPM) * 60), 0);

    /* Path VO relatif public/, atau "" kalau berkasnya belum ada. Inilah
       saklar preview/final tiap scene: kosong -> subtitel, terisi -> suara.
       Ia juga yang menentukan timing scene ini dihitung atau diukur. */
    const voAudio = u.standar ? "" : (audio.get(kunci) ?? "");

    /* Durasi VO sebenarnya, kalau MP3-nya sudah ada. Beat diregangkan sepadan:
       perbandingan antar-baris tetap dari jumlah kata (itu tebakan terbaik yang
       kita punya soal di mana kalimat jatuh di dalam satu scene), tapi TOTALNYA
       persis sepanjang audionya — jadi scene berikutnya tidak pernah mulai
       sebelum atau sesudah suaranya habis. */
    const nyataVO =
      voAudio && perkiraanVO > 0 ? durasiAudio(`public/${voAudio}`) : null;
    const skala = nyataVO ? nyataVO / perkiraanVO : 1;

    let tb = 0;
    const beat = kataBaris.map(({ teks, kata }) => {
      const durasi = R((kata / WPM) * 60 * skala);
      const entri = { teks, kata, mulai: R(tb), durasi };
      tb = R(tb + durasi);
      return entri;
    });

    const kata = beat.reduce((n, b) => n + b.kata, 0);
    const teks = vo.baris.join(" ");

    let durasi;
    if (u.standar) durasi = durasiStandar(u.id);
    else if (beat.length === 0) durasi = DUR_PLACEHOLDER;
    /* Pembulatan tiap beat menumpuk sampai beberapa milidetik dari durasi audio
       aslinya; yang dipakai adalah jumlah beat yang benar-benar dipasang, supaya
       beat terakhir tidak pernah menjorok melewati ujung scene. */
    else durasi = R(Math.max(tb, nyataVO ?? 0) + PAD);

    const entri = {
      id: u.id,
      kunci,
      urut: i + 1,
      bagian: u.bagian,
      ringkas: u.ringkas,
      mulai: R(t),
      durasi,
      standar: u.standar,
      vo: teks,
      beat,
      voAudio,
      /* true = durasi scene ini DIUKUR dari MP3-nya, bukan diperkirakan dari
         jumlah kata. Dipakai `npm run sisa` untuk membedakan scene yang
         timing-nya sudah final. */
      voTerukur: nyataVO !== null,
      kata,
      chars: teks.length,
      /* Bukan bagian dari timing — dipakai `npm run sisa` untuk melaporkan
         rencana VO yang belum ada atau yang blok `## VO`-nya masih kosong. */
      voPath: u.standar ? "" : voPath,
      voAda: vo.ada,
    };
    t = R(t + durasi);
    return entri;
  });

  /* Berkas VO yang tidak cocok dengan satu kunci pun. Hampir selalu berarti
     scene-nya sudah dinomori ulang (HARD RULE 5) setelah VO dibuat: berkasnya
     ada, tapi tidak akan pernah dipanggil, dan scene-nya diam-diam kembali
     bisu + bersubtitel. `npm run sisa` yang menyebutkannya. */
  const kunciSah = new Set(timing.map((x) => x.kunci));
  const audioYatim = [...audio.entries()]
    .filter(([k]) => !kunciSah.has(k))
    .map(([, path]) => path);

  return { timing, TOTAL: R(t), audioYatim };
};

/* --- episode utuh ----------------------------------------------------------- */

export const bacaEpisode = (slug) => {
  const WPM = wajib("VO_WORDS_PER_MINUTE");
  const PAD = wajib("VO_PAD_SECONDS");
  const DUR_OPENING = wajib("OPENING_SECONDS");
  const DUR_CLOSING = wajib("CLOSING_LONG_SECONDS");
  const DUR_PLACEHOLDER = wajib("VO_PLACEHOLDER_SECONDS");

  const naskah = `ideas/${slug}/naskah.md`;
  const dirVO = `ideas/${slug}/scenes`;
  const daftar = bacaDaftar(naskah);

  /* Penempatan scene standar mengikuti docs/10:
       opening — tepat setelah baris terakhir bagian 1 (question)
       closing — paling akhir */
  const iAkhirQuestion = daftar.reduce(
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
  daftar.forEach((b, i) => {
    urut.push({ ...b, standar: false });
    if (i === iAkhirQuestion) {
      urut.push({ id: "opening", bagian: "2 brand", ringkas: "kartu judul", standar: true });
    }
  });
  urut.push({ id: "closing", bagian: "penutup", ringkas: "tanda brand", standar: true });

  const { timing, TOTAL, audioYatim } = susunTiming(urut, {
    dirVO,
    audio: bacaAudioVO(slug),
    WPM,
    PAD,
    DUR_PLACEHOLDER,
    durasiStandar: (id) => (id === "opening" ? DUR_OPENING : DUR_CLOSING),
    label: slug,
  });

  return { slug, naskah, dirVO, WPM, PAD, timing, TOTAL, audioYatim };
};

/* --- Shorts ----------------------------------------------------------------- */

/** Satu subfolder per Short: `ideas/<slug>/scene-shorts/s1-nugget/`.
 *
 *  Keberadaan foldernyalah yang mendefinisikan Short itu ada — tidak ada daftar
 *  kedua di skrip mana pun yang bisa meleset darinya. Nomor di depan namanya
 *  menghubungkannya ke bagian `## Short <n>` di naskah. */
const POLA_SHORT = /^s(\d+)-[a-z0-9-]+$/;

export const daftarShort = (slug) => {
  const dir = `ideas/${slug}/scene-shorts`;
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()
    .map((folder) => {
      const m = POLA_SHORT.exec(folder);
      if (!m) {
        throw new Error(
          `${dir}/${folder}: nama subfolder Short harus berbentuk ` +
            `s<n>-<nama>, mis. "s1-nugget". Nomornya yang menghubungkannya ke ` +
            `bagian "## Short <n>" di naskah.md.`,
        );
      }
      return { folder, nomor: Number(m[1]), prefiks: `S${m[1]}` };
    });
};

/** Timing satu Short. Bedanya dengan episode cuma tiga:
 *
 *    1. TIDAK ada opening — Shorts tanpa intro brand (docs/02 § Aturan Shorts);
 *       logo hanya muncul di closing 2 detik.
 *    2. Closing memakai CLOSING_SHORT_SECONDS.
 *    3. Rencana VO & berkas VO ada di ruang nama Short itu sendiri.
 *
 *  Sisanya — rumus durasi, beat, penomoran, deteksi berkas VO — fungsi yang
 *  sama persis dengan video panjang. */
export const bacaShort = (slug, short) => {
  const WPM = wajib("VO_WORDS_PER_MINUTE");
  const PAD = wajib("VO_PAD_SECONDS");
  const DUR_CLOSING = wajib("CLOSING_SHORT_SECONDS");
  const DUR_PLACEHOLDER = wajib("VO_PLACEHOLDER_SECONDS");
  const MAKS = wajib("SHORT_MAX_SECONDS");

  const naskah = `ideas/${slug}/naskah.md`;
  const dirVO = `ideas/${slug}/scene-shorts/${short.folder}`;
  const bagianRe = new RegExp(`^##\\s+Short\\s+${short.nomor}\\b`);

  const urut = bacaDaftar(naskah, bagianRe).map((b) => ({ ...b, standar: false }));
  urut.push({ id: "closing", bagian: "penutup", ringkas: "tanda brand", standar: true });

  const { timing, TOTAL, audioYatim } = susunTiming(urut, {
    dirVO,
    audio: bacaAudioVO(slug, short.prefiks),
    WPM,
    PAD,
    DUR_PLACEHOLDER,
    durasiStandar: () => DUR_CLOSING,
    label: `${slug}/${short.folder}`,
  });

  /* Dilaporkan, bukan dilempar. Selama rencana VO belum lengkap durasinya masih
     placeholder, dan build yang gagal di tengah penggarapan cuma memaksa
     angka .env diutak-atik supaya "lulus" — persis yang tidak boleh terjadi
     pada batas yang datang dari YouTube, bukan dari kita. */
  return { slug, naskah, dirVO, short, WPM, PAD, timing, TOTAL, audioYatim, MAKS };
};
