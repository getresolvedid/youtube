/**
 * tts-gemini.mjs — mesin TTS channel ini.
 *
 *     suarakan({ teks, prefiks })    -> Buffer MP3, siap ditulis
 *     suarakanPCM({ teks, prefiks }) -> PCM mentah, untuk yang mau memotong
 *     jadikanMp3(pcm, laju, {tempo}) -> pangkas senyap tepi + tempo + encode
 *
 * Arahan pembacaan per topik dari `ideas/<slug>/vo-gemini-profile.yaml`
 * (docs/11). Dari enam medan di sana cuma `voice` yang medan API sungguhan;
 * `profile`/`style`/`accent`/`pace` melebur jadi satu kalimat arahan, dan
 * `tempo` berlaku sesudah audionya jadi.
 *
 * MP3, bukan WAV — walaupun Gemini mengembalikan PCM mentah. Alasannya bukan
 * selera: `bacaAudioVO()` di baca-episode.mjs melempar kalau satu kunci scene
 * punya dua berkas, dan `S1-01-dari-belakang.wav` di sebelah `.mp3` lama persis
 * itu bentuknya. Konversi di sini menutup seluruh kelas itu.
 *
 * DUA HAL YANG TIDAK ADA DI GEMINI, dan bagaimana keduanya ditutup:
 *
 *   konteks tetangga     Tidak ada medan untuk mengirim kalimat scene sebelum
 *                        dan sesudah, dan menaruhnya di prompt berarti ia ikut
 *                        DIBACA. Ditutup dari arah lain: tools/bikin-vo-utuh.mjs
 *                        mensintesis seluruh Short dalam satu permintaan, jadi
 *                        sambungannya bukan konteks yang dibisikkan melainkan
 *                        satu tarikan napas yang sama.
 *
 *   kamus pengucapan     Tidak ada. Kendalinya tinggal `accent`/`style` di
 *                        profil, dan ejaan di blok `## VO` itu sendiri.
 *                        Pengucapan yang meleset TIDAK tertangkap mesin —
 *                        tools/cocokkan-vo.mjs memeriksa KATA, bukan bunyinya.
 *
 * Sisa kuota juga tidak bisa dibaca (tidak ada endpoint langganan), jadi satu-
 * satunya rem otomatis adalah VO_MAX_CHARS_PER_TOPIC — yang mengukur panjang
 * naskah, bukan tagihan.
 *
 * Dokumen resmi: https://ai.google.dev/gemini-api/docs/speech-generation
 */

import { execFileSync } from "node:child_process";

import { bacaProfilVO, susunArahan } from "./baca-profil-vo.mjs";

/* --- setelan, semuanya dari .env (docs/08) ---------------------------------- */

const wajibTeks = (nama, baku) => {
  const v = process.env[nama] ?? baku;
  if (v === undefined || v === "") {
    throw new Error(`${nama} kosong di .env — lihat docs/08-konfigurasi.md.`);
  }
  return String(v).trim();
};

const FFMPEG = process.env.FFMPEG_PATH?.trim() || "ffmpeg";

/** Endpoint `:generateContent` — bukan `/v1beta/interactions` yang streaming.
 *  Satu permintaan, satu balasan JSON, audionya utuh di dalamnya: untuk berkas
 *  VO per scene (puluhan detik, bukan percakapan) streaming cuma menambah
 *  bagian yang bisa gagal di tengah tanpa menambah apa pun yang berguna. */
const url = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

/** Pengali tempo, dipasang setelah audionya jadi. Gemini tidak punya medan
 *  numerik untuk ini — di sana tempo diminta dengan kalimat (`pace`), dan
 *  kalimat dijawab berbeda tiap kali: empat generate teks yang sama terukur
 *  berayun 24% dari ujung ke ujung. Angka di sini tidak.
 *
 *  Ia sengaja PENGALI, bukan target wpm. Menyetel tiap scene ke satu angka akan
 *  meratakan justru yang tidak boleh rata: VO T14 yang sudah tayang bergerak
 *  antara 115 dan 167 wpm karena hook memang dibaca cepat dan kalimat
 *  penjelasan memang dibaca pelan (gabungannya 137 wpm). Pengali menggeser
 *  semuanya sekaligus dan membiarkan selisih antar-scene apa adanya. */
const bacaTempo = (profil) => {
  const t = Number(profil.tempo ?? 1);
  if (!Number.isFinite(t) || t < 0.5 || t > 2) {
    throw new Error(
      `tempo "${profil.tempo}" di luar jangkauan (${profil.ada ? profil.path : ".env"}) — ` +
        `atempo menerima 0.5–2.0. Di luar 0.9–1.15 suaranya mulai terdengar diproses.`,
    );
  }
  return t;
};

/** Menyiapkan mesin: baca setelan, kembalikan kontrak yang dipakai bikin-vo.mjs.
 *
 *  @param slug topik yang sedang dibuat — profilnya dibaca dari
 *              `ideas/<slug>/vo-gemini-profile.yaml`, per keluaran. */
export const siapkan = (slug, timpa = {}) => {
  const API_KEY = wajibTeks("GEMINI_API_KEY");
  const MODEL = timpa.model ?? wajibTeks("GEMINI_TTS_MODEL");
  const BITRATE = wajibTeks("GEMINI_TTS_MP3_BITRATE", "128k");
  const PANGKAS = (process.env.GEMINI_TTS_TRIM_SILENCE ?? "true").trim() !== "false";

  /* Profil dibaca sekali per keluaran, bukan sekali per scene: berkasnya sama
     untuk kesembilan scene sebuah Short, dan peringatan medan salah ketik yang
     tercetak sembilan kali berhenti dibaca orang. */
  const cache = new Map();
  const profilUntuk = (prefiks = "L", kunci = "") => {
    const k = `${prefiks.toUpperCase()}|${kunci}`;
    if (!cache.has(k)) {
      /* `timpa` menang atas profil DAN atas .env. Ia cuma dipakai
         tools/coba-suara.mjs, yang memang tugasnya menjalankan satu scene lewat
         banyak setelan sekaligus — dan itu mustahil kalau satu-satunya sumber
         setelan adalah berkas yang harus disunting tiap percobaan. */
      const p = { ...bacaProfilVO(slug, prefiks, kunci), ...timpa };
      if (!p.voice) {
        throw new Error(
          `voice kosong — isi di ideas/${slug}/vo-gemini-profile.yaml ` +
            `atau GEMINI_TTS_VOICE di .env.`,
        );
      }
      cache.set(k, { ...p, tempoAngka: bacaTempo(p), arahan: susunArahan(p) });
    }
    return cache.get(k);
  };

  /* Dipanggil sekarang juga supaya profil yang rusak ketahuan sebelum satu byte
     pun terkirim — bukan di tengah scene kelima. */
  const dasar = profilUntuk("L");

  /* Diberi nama supaya `suarakan` bisa memanggil `suarakanPCM` dan `jadikanMp3`
     milik objek yang sama — ketiganya satu mesin, dan yang membedakan cuma di
     mana potongannya dipotong. */
  const mesinIni = {
    nama: "gemini",
    deskripsi:
      `suara ${dasar.voice}, model ${MODEL}, mp3 ${BITRATE}` +
      (dasar.tempoAngka !== 1 ? `, tempo ${dasar.tempoAngka}` : "") +
      (dasar.ada ? `\n  profil ${dasar.path}` : `\n  profil: belum ada — memakai .env`) +
      (dasar.arahan ? `\n  arahan "${dasar.arahan}"` : ""),

    /** Profil yang sudah digabung untuk satu keluaran — dipakai bikin-vo.mjs
     *  untuk memperlihatkan arahan tiap keluaran di rencana, sebelum membayar. */
    profil: profilUntuk,

    /** Teks -> PCM mentah, apa adanya dari Gemini. Belum dipangkas, belum
     *  ditempo, belum jadi MP3.
     *
     *  Dipakai tools/bikin-vo-utuh.mjs, yang mensintesis seluruh Short dalam
     *  SATU permintaan lalu memotongnya per scene: pemotongnya mencari senyap,
     *  dan mencari senyap di MP3 yang senyap tepinya sudah dibuang adalah
     *  mencari sesuatu yang sudah dihapus. */
    suarakanPCM: async ({ teks, prefiks, kunci }) => {
      const profil = profilUntuk(prefiks, kunci);
      const VOICE = profil.voice;

      /* Bentuk "<arahan>: <teks>" adalah yang dipakai contoh resmi
         ("Say cheerfully: Have a wonderful day!"). Arahannya TIDAK ikut
         disuarakan — tapi ia memang bagian dari prompt yang sama, jadi kalau
         suatu saat ia terdengar di MP3, tersangkanya berkas ini, bukan naskah. */
      const isi = profil.arahan ? `${profil.arahan}: ${teks}` : teks;

      const res = await fetch(url(MODEL), {
        method: "POST",
        headers: { "x-goog-api-key": API_KEY, "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: isi }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } },
            },
          },
        }),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Gemini menolak (HTTP ${res.status})\n\n${detail.slice(0, 400)}`);
      }

      const data = await res.json();
      const part = data?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);

      /* Gemini itu model bahasa, bukan mesin TTS murni: permintaan yang ditolak
         filter, atau yang entah kenapa dijawab dengan TEKS, tetap pulang HTTP
         200. Tanpa pemeriksaan ini yang tertulis ke berkas adalah MP3 nol byte
         yang lolos "berkasnya ada" — persis kegagalan senyap yang dijaga
         penulisan lewat berkas .part di bikin-vo.mjs. */
      if (!part) {
        const alasan = data?.candidates?.[0]?.finishReason ?? "tidak disebutkan";
        const teksBalasan = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        throw new Error(
          `Gemini menjawab tanpa audio (finishReason: ${alasan}).` +
            (teksBalasan ? `\nIa menjawab teks: ${teksBalasan.slice(0, 200)}` : ""),
        );
      }

      /* Laju cuplik dibaca dari mimeType (`audio/L16;codec=pcm;rate=24000`),
         tidak dipatok 24000. Dokumennya menyebut 24 kHz sebagai BAKU, dan baku
         adalah sesuatu yang berubah. Salah laju tidak error — ia menghasilkan
         suara yang kecepatannya meleset, dan itu ketahuan setelah 9 berkas
         terlanjur dibayar. */
      const mime = part.inlineData.mimeType ?? "";
      const laju = Number(/rate=(\d+)/.exec(mime)?.[1] ?? 24000);
      if (!Number.isFinite(laju) || laju <= 0) {
        throw new Error(`Laju cuplik tidak terbaca dari mimeType "${mime}".`);
      }

      const pcm = Buffer.from(part.inlineData.data, "base64");
      if (pcm.length === 0) throw new Error("Gemini mengembalikan audio kosong.");

      return { pcm, laju, profil };
    },

    /** Teks -> Buffer MP3, siap ditulis ke public/vo/. Melempar dengan pesan
     *  yang menyebut penyebabnya; yang memanggil menghentikan prosesnya. */
    suarakan: async ({ teks, prefiks, kunci }) => {
      const { pcm, laju, profil } = await mesinIni.suarakanPCM({ teks, prefiks, kunci });
      return mesinIni.jadikanMp3(pcm, laju, { tempo: profil.tempoAngka });
    },

    /** PCM -> MP3, dengan pangkas senyap tepi dan pengali tempo.
     *
     *  Terpisah dari `suarakan` karena bikin-vo-utuh.mjs memakainya pada
     *  POTONGAN — sembilan kali, dari satu PCM yang cuma sekali dibayar. */
    jadikanMp3: (pcm, laju, { tempo = 1 } = {}) => {
      /* PCM 16-bit little-endian, mono -> MP3. ffmpeg dipanggil langsung dengan
         pipa: berkas sementara di sini berarti satu berkas lagi yang bisa
         tertinggal saat proses mati di tengah. */
      /* Gemini membuka dan menutup tiap berkas dengan senyap — terukur ~0,39 dtk
         di depan dan ~0,24 dtk di belakang. Keduanya dibuang, masing-masing
         karena alasannya sendiri:

           depan     scene mulai tepat di frame nol. Hook Short justru yang
                     paling rusak: "frame pertama sudah bergerak" jadi bohong
                     kalau suaranya baru datang empat persepuluh detik kemudian.
           belakang  `susunTiming()` SUDAH menambahkan VO_PAD_SECONDS di ujung
                     tiap scene. Senyap bawaan di berkasnya menggandakan pad itu
                     — dan yang kedua tidak terlihat di mana pun, karena ia
                     bagian dari "durasi audio" yang justru dipercaya pipeline.

         Jeda di TENGAH kalimat tidak disentuh: itu pembawaan, bukan cacat.
         `areverse` dipakai dua kali karena silenceremove hanya bisa memangkas
         dari depan. */
      const saring = [
        ...(PANGKAS
          ? [
              "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-35dB:detection=peak",
              "areverse",
              "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-35dB:detection=peak",
              "areverse",
            ]
          : []),
        /* Sesudah pangkas, supaya angkanya berlaku pada bicaranya — bukan pada
           senyap yang toh akan dibuang. `atempo` menahan nada; mengubah laju
           cuplik akan menaikkannya dan itu mengganti suaranya, bukan temponya. */
        ...(tempo !== 1 ? [`atempo=${tempo}`] : []),
      ];

      try {
        return execFileSync(
          FFMPEG,
          [
            "-hide_banner", "-loglevel", "error",
            "-f", "s16le", "-ar", String(laju), "-ac", "1",
            "-i", "pipe:0",
            ...(saring.length ? ["-af", saring.join(",")] : []),
            "-codec:a", "libmp3lame", "-b:a", BITRATE,
            "-f", "mp3", "pipe:1",
          ],
          { input: pcm, maxBuffer: 64 * 1024 * 1024 },
        );
      } catch (err) {
        if (err.code === "ENOENT") {
          throw new Error(
            `ffmpeg tidak ada di PATH — PCM Gemini tidak bisa dijadikan MP3.\n` +
              `Pasang: winget install Gyan.FFmpeg (PATH-nya baru aktif di terminal baru),\n` +
              `atau set FFMPEG_PATH di .env.`,
          );
        }
        throw new Error(`ffmpeg gagal: ${err.stderr?.toString().slice(0, 300) ?? err.message}`);
      }
    },
  };

  return mesinIni;
};
