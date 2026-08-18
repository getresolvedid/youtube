# Channel YouTube Edukasi Teknologi

Fondasi channel edukasi **teknologi, coding, dan engineering** berbahasa Indonesia.
Repo ini menyimpan **guideline, naskah, dan komposisi video** — bukan aplikasi.

**Kontrak produksi:** setiap topik menghasilkan **3 berkas video**

| Keluaran | Format | Durasi | Kode |
|---|---|---|---|
| 1 video panjang | 16:9 · 1920×1080 | 7–9 menit | `T{nn}-L` |
| 2 video Shorts | 9:16 · 1080×1920 | 40–60 detik | `T{nn}-S1`, `T{nn}-S2` |

**Tooling yang dipakai** (sudah diputuskan):

- **[Remotion](https://www.remotion.dev)** — tulis React/CSS, render jadi MP4. Setiap frame adalah fungsi murni dari nomor frame, jadi render selalu reproducible dan tiap scene bisa di-preview satuan.
- **[Gemini TTS](https://ai.google.dev/gemini-api/docs/speech-generation)** — voice over Bahasa Indonesia. Suara & arahan pembacaan per topik di `ideas/<slug>/vo-gemini-profile.yaml`.
- **Tema visual** — turunan brand [`wargasipil/getresolved`](https://github.com/wargasipil/getresolved) (`branding/guidelines/brand.html`): Indigo `#4F46E5`, Green `#10B981`, Ink `#0F172A`, tipografi Manrope.

**Tiga aturan yang mengikat seluruh alur kerja:**

1. **Satu video, dua lapis penonton.** Khalayak umum harus bertahan sampai babak 4; developer dapat kedalamannya di babak 5. Dijembatani tangga **L1 → L2 → L3** → [09 · Tangga abstraksi](docs/09-tangga-abstraksi.md).
2. **Bahasa anak 5 tahun.** Topik yang belum bisa dijelaskan dalam 60 kata tanpa istilah teknis belum boleh masuk produksi.
3. **VO paling akhir.** TTS berbayar dan tidak deterministik, jadi komposisi dibangun dan ditonton dulu dalam keadaan **bisu** dengan timing perkiraan. VO baru dibuat setelah naskah **beku** → [04 · Pipeline](docs/04-pipeline-produksi.md).

---

## Baca berurutan

| # | Dokumen | Isinya |
|---|---|---|
| 01 | [Positioning](docs/01-positioning.md) | Untuk siapa, janji channel, 5 pilar konten, nada bicara, yang **tidak** kita buat |
| 02 | [Format video](docs/02-format-video.md) | Anatomi video panjang & Shorts, aturan durasi, pacing, retensi |
| 03 | [Tema visual](docs/03-tema-visual.md) | Warna, tipografi, ukuran minimum, safe area, bahasa gerak, kartu brand |
| 04 | [Pipeline produksi](docs/04-pipeline-produksi.md) | Alur 8 langkah: riset → naskah → VO → timing → komposisi → render → QA |
| 05 | [Template naskah](docs/05-template-naskah.md) | Struktur `naskah.md`: materi topik + daftar scene, contoh terisi |
| 06 | [Publishing](docs/06-publishing.md) | Judul, deskripsi, tag, thumbnail, chapter, checklist upload |
| 07 | [Backlog topik](docs/07-backlog-topik.md) | Taksonomi topik + 12 topik pembuka beserta sudut keempat Shorts-nya |
| 08 | [Konfigurasi & secret](docs/08-konfigurasi.md) | Semua setelan & API key jadi satu di `.env`, termasuk rotasi key |
| 09 | [Tangga abstraksi](docs/09-tangga-abstraksi.md) | Aturan "bahasa anak 5 tahun": L1 → L2 → L3. Dibaca bersama 02 dan 05 |
| 10 | [Scene standar](docs/10-scene-standar.md) | Kartu judul (pembuka) & tanda brand (penutup) yang identik di semua episode |
| 11 | [Rencana VO](docs/11-rencana-vo.md) | `scenes/<kunci>-vo.md` — tempat teks VO hidup, beat, aturan menulis untuk TTS, profil Gemini |

Aset pendukung:

| Berkas | Guna |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Aturan framework Remotion — struktur, determinisme, gerbang QA |
| [`shared/theme.css`](shared/theme.css) | Token warna/tipografi/skala + komponen dasar |
| [`shared/figur.css`](shared/figur.css) | Kosakata diagram: sumbu, bar, piramida, kisi, tabel spesifikasi |
| [`shared/Icons.tsx`](shared/Icons.tsx) | Set ikon garis — `<Ic n="ram" />` |
| [`shared/StandarScenes.tsx`](shared/StandarScenes.tsx) | `<KartuJudul>` & `<TandaBrand>` — dipakai apa adanya tiap episode |
| [`shared/anim.ts`](shared/anim.ts) | Helper animasi; setiap nilai fungsi murni dari frame |
| [`shared/Vo.tsx`](shared/Vo.tsx) | `<TrekVO>` — subtitel preview selama berkas VO belum ada, `<Audio>` begitu ada ([docs/11](docs/11-rencana-vo.md)) |
| [`.env.example`](.env.example) | Kontrak konfigurasi; salin jadi `.env` lalu isi |
| [`tools/bangun-config.mjs`](tools/bangun-config.mjs) | `.env` → `shared/config.gen.ts` (daftar putih, tanpa secret) |
| [`tools/baca-episode.mjs`](tools/baca-episode.mjs) | Pembaca bersama: daftar scene (`naskah.md`) + teks VO (`scenes/*-vo.md`) → timing |
| [`tools/bangun-timing.mjs`](tools/bangun-timing.mjs) | Hasil baca-episode → `ideas/<slug>/timing.gen.ts` |
| [`tools/periksa-frame.mjs`](tools/periksa-frame.mjs) | Bukti frame tidak kosong — pembaca PNG tanpa dependensi |
| [`tools/sisa-scene.mjs`](tools/sisa-scene.mjs) | Placeholder + rencana VO/direction yang belum ada + scene yang masih bersubtitel preview |
| [`tools/load-env.ps1`](tools/load-env.ps1) | Muat `.env` ke sesi PowerShell (`. .\tools\load-env.ps1`) |
| [`tools/estimate-timing.mjs`](tools/estimate-timing.mjs) | Perkiraan timing dari rencana VO — **gratis**, dipakai sebelum VO |
| [`tools/vo-durations.mjs`](tools/vo-durations.mjs) | Timing final dari durasi berkas VO (butuh ffprobe) |

## Struktur repo

Satu project Remotion di akar repo, dipakai bersama semua episode. `shared/`
adalah milik semua episode; `ideas/<slug>/` adalah satu episode beserta seluruh
produksinya.

```
youtube/                      ← ROOT PROJECT Remotion
├── README.md                 ← berkas ini
├── CLAUDE.md                 ← aturan kerja agent di repo ini
├── AGENTS.md                 ← aturan framework Remotion
├── .env                      ← SEMUA secret & konfigurasi (tidak di-commit)
├── .env.example              ← kontrak konfigurasi (di-commit)
├── remotion.config.ts        ← setelan CLI
├── tsconfig.json
├── package.json              ← npm run gen / check / sisa / studio / render
├── docs/                     ← guideline (01–11)
├── src/
│   ├── index.ts              ← registerRoot
│   └── Root.tsx              ← DAFTAR KOMPOSISI: episode + satu per scene
├── public/logos/             ← mark & wordmark (salinan brand getresolved)
├── public/vo/<slug>/         ← keluaran TTS, L-<kunci>.mp3 per scene
├── shared/                   ← milik SEMUA episode
│   ├── config.gen.ts         ← ⚙ digenerate dari .env
│   ├── theme.css             ← token warna/tipografi/skala
│   ├── figur.css             ← kosakata diagram bersama
│   ├── scenes.css            ← gaya scene standar
│   ├── Stage.tsx             ← <Panggung> + <Scene>
│   ├── anim.ts               ← helper animasi berbasis frame
│   ├── Icons.tsx             ← set ikon garis
│   ├── StandarScenes.tsx     ← <KartuJudul> + <TandaBrand>
│   ├── Vo.tsx                ← <TrekVO>: subtitel preview / VO asli per scene
│   ├── Placeholder.tsx       ← <BelumDibuat>
│   └── fonts.ts              ← Manrope + JetBrains Mono
├── tools/
│   ├── bangun-config.mjs     ← .env → shared/config.gen.ts
│   ├── baca-episode.mjs      ← naskah.md + scenes/*-vo.md → timing (dipakai bersama)
│   ├── bangun-timing.mjs     ← hasilnya → ideas/<slug>/timing.gen.ts
│   ├── periksa-frame.mjs     ← bukti frame tidak kosong
│   ├── sisa-scene.mjs        ← placeholder + rencana VO/direction + status VO
│   ├── load-env.ps1          ← muat .env ke sesi PowerShell
│   ├── git-setup.ps1         ← init git + hook penolak secret
│   ├── estimate-timing.mjs   ← timing perkiraan dari rencana VO (gratis)
│   ├── vo-durations.mjs      ← timing final dari berkas VO
└── ideas/                    ← SEMUA ide + seluruh produksinya hidup di sini
    ├── README.md             ← alur & template ide
    └── <slug>/
        ├── ide.md            ← ide mentah + uji 4 syarat (selalu ada)
        ├── thumbnail.md      ← ketegangan + pola + ≤4 kata (fase 1, docs/06)
        ├── naskah.md         ← materi topik + DAFTAR scene (docs/05)
        ├── timing.gen.ts     ← ⚙ digenerate dari naskah.md + scenes/*-vo.md
        ├── Episode.tsx       ← merangkai <Sequence>, tanpa isi scene
        ├── scenes/index.ts   ← daftar SCENES: id → komponen
        ├── scenes/01-hook-question-vo.md        ← teks VO (HARD RULE 4, docs/11)
        ├── scenes/01-hook-question-direction.md ← apa di layar (HARD RULE 3)
        ├── scenes/01-hook-question.tsx          ← komposisi (HARD RULE 1)
        └── render/           ← MP4 final + thumbnail + metadata publish
```

⚙ = digenerate, di-ignore git, dibangun ulang `npm run gen`. Sumber kebenarannya
`.env`, `naskah.md`, dan `scenes/*-vo.md`; menyunting berkas generate akan hilang
saat build berikutnya.

## Prasyarat (status di mesin ini, dicek 2026-08-13)

| Kebutuhan | Status | Catatan |
|---|---|---|
| Node.js ≥ 22 | ✅ `v22.21.1` | |
| Google Chrome | ✅ terpasang | Remotion mengunduh Headless Shell-nya sendiri saat render pertama (±113 MB) |
| FFmpeg + ffprobe | ✅ `9.0-full_build` | via `winget install Gyan.FFmpeg`; PATH aktif di terminal baru. Remotion membawa FFmpeg sendiri; ini untuk `tools/vo-durations.mjs` |
| Pipeline render | ✅ **terbukti** | kartu judul & tanda brand sudah dirender jadi PNG 1920×1080 dan diperiksa |
| `.env` terisi | ✅ identitas channel & spesifikasi video terisi | `GEMINI_API_KEY` wajib diisi |

Penyiapan di mesin baru:

```powershell
Copy-Item .env.example .env   # lalu isi nilainya
. .\tools\load-env.ps1 -Show  # cek apa saja yang masih kosong
.\tools\git-setup.ps1         # pasang hook penolak secret — WAJIB
npm install
npm run check                 # tsc + bukti frame tidak kosong
npm run studio                # Remotion Studio
```

Semua konfigurasi ada di satu tempat — lihat [08 · Konfigurasi](docs/08-konfigurasi.md).

## Keputusan yang masih terbuka

Sudah ditetapkan:

| | Nilai |
|---|---|
| Channel | **Get Resolved** — [youtube.com/@GetResolved](https://www.youtube.com/@GetResolved) |
| Website / CTA | [getresolved.id](https://getresolved.id) |
| Voice Gemini | **Charon**, model `gemini-2.5-flash-preview-tts` |
| Audiens | **Khalayak umum + developer** dalam satu video, dijembatani tangga L1→L2→L3 |
| Episode berjalan | **T15 · Apa itu firewall** — [ide](ideas/apa-itu-firewall/ide.md) · [backlog](docs/07-backlog-topik.md) |

Yang masih terbuka:

1. **Musik latar.** Belum ada aset di `shared/`; dibutuhkan sebelum render final
   episode berikutnya.
