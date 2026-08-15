/**
 * baca-profil-vo.mjs — profil VO Gemini per topik.
 *
 *     ideas/<slug>/vo-gemini-profile.yaml
 *
 * KENAPA PER TOPIK, BUKAN DI .env: `.env` memegang identitas channel dan setelan
 * produksi — hal-hal yang sama di semua episode. Arahan pembacaan tidak begitu.
 * Episode tentang enkripsi tidak dibacakan dengan tempo yang sama dengan Short
 * yang hooknya harus menampar di detik nol, dan keduanya bukan varian dari satu
 * angka. Menaruhnya di `.env` berarti menyetel ulang berkas global tiap kali
 * pindah topik, lalu lupa mengembalikannya — saklar yang harus dimatikan tangan,
 * persis yang dihindari subtitel preview (docs/11).
 *
 * LIMA MEDAN, SATU YANG NYATA. Gemini cuma punya SATU medan API di antara
 * kelimanya:
 *
 *     voice     -> prebuiltVoiceConfig.voiceName    medan sungguhan
 *     profile   ─┐
 *     style      ├─ melebur jadi satu kalimat arahan di depan teks VO
 *     accent     │  — permintaan, bukan jaminan. Model boleh mengabaikannya.
 *     pace      ─┘
 *
 * Dan `pace` di situ TIDAK sama dengan `tempo`. Yang pertama kata-kata untuk
 * model dan hasilnya berayun sampai 24% antar-generate; yang kedua pengali
 * ffmpeg yang berlaku setelah audionya jadi, dan itu pasti. Keduanya ada karena
 * yang satu mengatur pembawaan dan yang satu mengatur durasi — menghapus salah
 * satunya berarti kehilangan salah satu dari keduanya.
 *
 * Profil boleh tidak ada. Tanpa berkasnya, semuanya jatuh ke `.env` seperti
 * sebelum profil ini ada.
 */

import { existsSync, readFileSync } from "node:fs";

/** Pembaca YAML seadanya — cukup untuk bentuk yang dipakai berkas profil:
 *  `kunci: nilai` di kolom nol, plus satu blok `keluaran:` dengan dua tingkat
 *  indentasi di bawahnya. Ditulis sendiri, bukan memakai js-yaml, karena
 *  js-yaml cuma hadir di node_modules sebagai bawaan Remotion — dependensi yang
 *  tidak pernah kita minta bisa hilang di install berikutnya tanpa ada yang
 *  mengubah package.json. */
const BLOK = new Set(["keluaran", "scene"]);

const bacaYamlDatar = (teks) => {
  const akar = {};
  let blok = null; // "keluaran" | "scene" | null
  let induk = null; // nama di dalam blok itu — "S1", atau kunci scene

  for (const baris of teks.split(/\r?\n/)) {
    const tanpaKomentar = baris.replace(/(^|\s)#.*$/, "");
    if (!tanpaKomentar.trim()) continue;

    const indent = tanpaKomentar.length - tanpaKomentar.trimStart().length;
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(tanpaKomentar.trim());
    if (!m) continue;

    const [, kunci, mentah] = m;
    const nilai = mentah.trim().replace(/^["'](.*)["']$/, "$1");

    if (indent === 0) {
      induk = null;
      if (BLOK.has(kunci)) {
        blok = kunci;
        akar[kunci] = akar[kunci] ?? {};
      } else {
        blok = null;
        akar[kunci] = nilai;
      }
      continue;
    }

    /* Di dalam `keluaran:` / `scene:` — tingkat pertama namanya, tingkat kedua
       medan yang menimpa. Kunci scene TIDAK di-uppercase: ia nama berkas
       (`01-dari-belakang`), bukan prefiks keluaran. */
    if (!blok) continue;
    if (nilai === "") {
      induk = blok === "keluaran" ? kunci.toUpperCase() : kunci;
      akar[blok][induk] = akar[blok][induk] ?? {};
    } else if (induk) {
      akar[blok][induk][kunci] = nilai;
    }
  }

  return akar;
};

const MEDAN = ["voice", "profile", "style", "accent", "pace", "tempo"];

/** Profil topik, sudah digabung dengan `.env` sebagai lapis terbawah.
 *
 *  Urutan menang: scene > keluaran (S1/S2/L) > akar profil > .env > baku.
 *
 *  Lapis `scene` ada karena `--pisah` di bikin-vo-utuh.mjs: scene yang
 *  disintesis SENDIRI menerima arahan yang sama utuh pada satu baris pendek,
 *  sementara di bacaan gabungan arahan itu tersebar ke sembilan kalimat dan
 *  encer. Terukur di T14: `style: "seperti membuka rahasia kecil"` hampir tidak
 *  terdengar di bacaan gabungan, tapi membuat hook 8 kata terdengar gembira —
 *  padahal hook itu justru harus terdengar seperti sesuatu yang ganjil.
 *
 *  Jadi scene yang dipisah pantas punya arahannya sendiri. Yang tidak dipisah
 *  tidak perlu: arahannya toh melebur.
 *
 *  @param slug     nama folder di ideas/
 *  @param prefiks  "L" | "S1" | "S2" — keluaran yang sedang dibuat
 *  @param kunci    kunci scene, kalau arahannya khusus scene itu */
export const bacaProfilVO = (slug, prefiks = "L", kunci = "") => {
  const path = `ideas/${slug}/vo-gemini-profile.yaml`;

  const dariEnv = {
    voice: process.env.GEMINI_TTS_VOICE?.trim() || "",
    tempo: process.env.GEMINI_TTS_TEMPO?.trim() || "1",
    profile: "",
    style: "",
    accent: "",
    pace: "",
  };

  /* Tanpa berkas profil, GEMINI_TTS_STYLE_PROMPT di .env dipakai sebagai arahan
     UTUH — bukan disuntikkan ke medan `style`. Isinya kalimat perintah lengkap
     ("Bacakan dalam bahasa Indonesia…"), dan memberinya label `gaya:` seperti
     medan profil menghasilkan "gaya: Bacakan…", yang bukan kalimat. */
  if (!existsSync(path)) {
    return {
      ...dariEnv,
      ada: false,
      path,
      prefiks,
      arahanMentah: process.env.GEMINI_TTS_STYLE_PROMPT?.trim() || "",
    };
  }

  const y = bacaYamlDatar(readFileSync(path, "utf8"));
  const timpaKeluaran = y.keluaran?.[prefiks.toUpperCase()] ?? {};
  const timpaScene = (kunci && y.scene?.[kunci]) || {};

  const hasil = { ada: true, path, prefiks, kunci };
  for (const k of MEDAN)
    hasil[k] = timpaScene[k] ?? timpaKeluaran[k] ?? y[k] ?? dariEnv[k];

  const takDikenal = Object.keys(y)
    .filter((k) => !BLOK.has(k) && !MEDAN.includes(k))
    .concat(
      [...Object.values(y.keluaran ?? {}), ...Object.values(y.scene ?? {})]
        .flatMap((o) => Object.keys(o))
        .filter((k) => !MEDAN.includes(k)),
    );

  /* Medan salah ketik diam-diam tidak berlaku, dan yang paling mahal justru
     `voice` — salah eja berarti seluruh topik dibacakan suara yang salah tanpa
     satu pun pesan. Disebut di sini, bukan didiamkan. */
  if (takDikenal.length) {
    console.log(
      `  ⚠ ${path}: medan tidak dikenal diabaikan — ${[...new Set(takDikenal)].join(", ")}\n` +
        `    Yang dikenal: ${MEDAN.join(", ")}`,
    );
  }

  return hasil;
};

/** Empat medan naratif -> satu kalimat arahan di depan teks VO.
 *
 *  Bentuknya "<arahan>: <teks>", sama dengan contoh resmi Gemini
 *  ("Say cheerfully: Have a wonderful day!"). Yang kosong dilewati, jadi profil
 *  yang cuma mengisi `style` menghasilkan kalimat pendek, bukan kalimat penuh
 *  koma menggantung. */
export const susunArahan = (profil) => {
  if (profil.arahanMentah) return profil.arahanMentah;

  const bagian = [];
  if (profil.profile) bagian.push(profil.profile);
  if (profil.style) bagian.push(`gaya: ${profil.style}`);
  if (profil.accent) bagian.push(`aksen: ${profil.accent}`);
  if (profil.pace) bagian.push(`tempo: ${profil.pace}`);

  /* Dirangkai titik koma, bukan koma. Medan-medannya sendiri sudah berisi koma
     ("tenang, yakin, tidak menggurui"), dan koma di sambungannya membuat batas
     antar-medan hilang — arahan jadi satu kalimat panjang yang harus ditebak
     modelnya sendiri di mana gaya berhenti dan aksen mulai. */
  return bagian.join("; ");
};
