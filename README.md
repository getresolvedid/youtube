# Channel YouTube Edukasi Teknologi

Fondasi channel edukasi **teknologi, coding, dan engineering** berbahasa Indonesia.
Repo ini menyimpan **guideline, naskah, dan komposisi video** — bukan aplikasi.

**Kontrak produksi:** setiap topik menghasilkan **3 berkas video**

| Keluaran | Format | Durasi | Kode |
|---|---|---|---|
| 1 video panjang | 16:9 · 1920×1080 | 7–9 menit | `T{nn}-L` |
| 2 video Shorts | 9:16 · 1080×1920 | 40–60 detik | `T{nn}-S1`, `T{nn}-S2` |

**Tooling yang dipakai** (sudah diputuskan):

- **[HyperFrames](https://github.com/heygen-com/hyperframes)** — tulis HTML/CSS/GSAP, render jadi MP4. Cocok untuk motion graphic, diagram, dan animasi kode.
- **[ElevenLabs](https://elevenlabs.io/docs/overview/models)** — voice over Bahasa Indonesia, voice **George**, model `eleven_multilingual_v2`.
- **Tema visual** — turunan brand [`wargasipil/getresolved`](https://github.com/wargasipil/getresolved) (`branding/guidelines/brand.html`): Indigo `#4F46E5`, Green `#10B981`, Ink `#0F172A`, tipografi Manrope.

**Dua aturan yang mengikat seluruh alur kerja:**

1. **Bahasa anak 5 tahun.** Topik yang belum bisa dijelaskan dalam 60 kata tanpa istilah teknis belum boleh masuk produksi → [09 · Tangga abstraksi](docs/09-tangga-abstraksi.md).
2. **VO paling akhir.** ElevenLabs dibayar per karakter, jadi komposisi dibangun dan ditonton dulu dalam keadaan **bisu** dengan timing perkiraan. VO baru dibuat setelah naskah **beku** → [04 · Pipeline](docs/04-pipeline-produksi.md).

---

## Baca berurutan

| # | Dokumen | Isinya |
|---|---|---|
| 01 | [Positioning](docs/01-positioning.md) | Untuk siapa, janji channel, 5 pilar konten, nada bicara, yang **tidak** kita buat |
| 02 | [Format video](docs/02-format-video.md) | Anatomi video panjang & Shorts, aturan durasi, pacing, retensi |
| 03 | [Tema visual](docs/03-tema-visual.md) | Warna, tipografi, ukuran minimum, safe area, bahasa gerak, kartu brand |
| 04 | [Pipeline produksi](docs/04-pipeline-produksi.md) | Alur 8 langkah: riset → naskah → VO → timing → komposisi → render → QA |
| 05 | [Template naskah](docs/05-template-naskah.md) | Struktur `naskah.md`, aturan menulis VO untuk ElevenLabs, contoh terisi |
| 06 | [Publishing](docs/06-publishing.md) | Judul, deskripsi, tag, thumbnail, chapter, checklist upload |
| 07 | [Backlog topik](docs/07-backlog-topik.md) | Taksonomi topik + 12 topik pembuka beserta sudut kedua Shorts-nya |
| 08 | [Konfigurasi & secret](docs/08-konfigurasi.md) | Semua setelan & API key jadi satu di `.env`, termasuk rotasi key |
| 09 | [Tangga abstraksi](docs/09-tangga-abstraksi.md) | Aturan "bahasa anak 5 tahun": L1 → L2 → L3. Dibaca bersama 02 dan 05 |
| 10 | [Scene standar](docs/10-scene-standar.md) | Opening (brand sting) & closing (end card) yang identik di semua episode |

Aset pendukung:

| Berkas | Guna |
|---|---|
| [`shared/theme.css`](shared/theme.css) | Token tema siap pakai untuk komposisi HyperFrames |
| [`shared/scenes.html`](shared/scenes.html) · [`.css`](shared/scenes.css) · [`.js`](shared/scenes.js) | Scene opening & closing standar — salin apa adanya |
| [`.env.example`](.env.example) | Kontrak konfigurasi; salin jadi `.env` lalu isi |
| [`tools/load-env.ps1`](tools/load-env.ps1) | Muat `.env` ke sesi PowerShell (`. .\tools\load-env.ps1`) |
| [`tools/estimate-timing.mjs`](tools/estimate-timing.mjs) | Perkiraan timing dari naskah — **gratis**, dipakai sebelum VO |
| [`tools/vo-durations.mjs`](tools/vo-durations.mjs) | Timing final dari durasi berkas VO (butuh ffprobe) |
| [`tools/elevenlabs-keys.mjs`](tools/elevenlabs-keys.mjs) | Kelola & rotasi API key ElevenLabs |

## Struktur repo

**Seluruh repo adalah satu project HyperFrames.** Komposisi tidak boleh menunjuk
aset di atas root project, jadi root-nya harus di akar repo supaya `shared/`
bisa dipakai semua episode.

```
youtube/                      ← ROOT PROJECT HyperFrames
├── README.md                 ← berkas ini
├── CLAUDE.md                 ← aturan kerja agent di repo ini
├── AGENTS.md                 ← aturan HyperFrames (bawaan scaffold)
├── .env                      ← SEMUA secret & konfigurasi (tidak di-commit)
├── .env.example              ← kontrak konfigurasi (di-commit)
├── hyperframes.json          ← paths.assets → "shared"
├── package.json              ← npm run dev / check / render
├── index.html                ← komposisi uji scene standar (uji regresi visual)
├── docs/                     ← guideline (01–10)
├── compositions/             ← satu berkas per episode per format
│   └── T01-long.html · T01-short-1.html · T01-short-2.html
├── shared/
│   ├── theme.css             ← token warna/tipografi/skala
│   ├── scenes.html/.css/.js  ← scene opening & closing standar
│   └── assets/logos/         ← mark & wordmark (salinan brand getresolved)
├── tools/
│   ├── load-env.ps1          ← muat .env ke sesi PowerShell
│   ├── git-setup.ps1         ← init git + hook penolak secret
│   ├── estimate-timing.mjs   ← timing perkiraan dari naskah (gratis)
│   ├── vo-durations.mjs      ← timing final dari berkas VO
│   └── elevenlabs-keys.mjs   ← kelola & rotasi API key
└── topics/T01-<slug>/
    ├── naskah.md             ← sumber kebenaran: outline + VO + visual per scene
    ├── vo/                   ← keluaran ElevenLabs, satu berkas per scene
    └── render/               ← MP4 final + thumbnail + metadata publish
```

Path di dalam komposisi selalu relatif ke akar repo, tanpa `../`:
`shared/theme.css`, `topics/T01-slug/vo/L-001.mp3`.

## Prasyarat (status di mesin ini, dicek 2026-08-13)

| Kebutuhan | Status | Catatan |
|---|---|---|
| Node.js ≥ 22 | ✅ `v22.21.1` | |
| Google Chrome | ✅ terpasang | HyperFrames juga mengunduh Chrome-nya sendiri saat render pertama |
| FFmpeg + ffprobe | ✅ `9.0-full_build` | via `winget install Gyan.FFmpeg`; PATH aktif di terminal baru |
| Pipeline render | ✅ **terbukti** | `index.html` sudah dirender jadi MP4 10,5 dtk |
| `.env` terisi | ❔ identitas channel masih kosong | `CHANNEL_NAME`, `CHANNEL_HANDLE`, `CTA_TEXT` |

Penyiapan di mesin baru:

```powershell
Copy-Item .env.example .env   # lalu isi nilainya
. .\tools\load-env.ps1 -Show  # cek apa saja yang masih kosong
.\tools\git-setup.ps1         # pasang hook penolak secret — WAJIB
npm run check                 # validasi komposisi uji
```

Semua konfigurasi ada di satu tempat — lihat [08 · Konfigurasi](docs/08-konfigurasi.md).

## Keputusan yang masih terbuka

Ini yang belum ditentukan dan **memblokir** produksi episode pertama. Tiga dari
empat cukup diisi ke `.env`:

1. **Nama channel + handle** → `CHANNEL_NAME`, `CHANNEL_HANDLE`.
2. **Voice ElevenLabs** → `ELEVENLABS_VOICE_ID`. Pilih satu lalu kunci; ganti voice di tengah jalan merusak konsistensi channel. Lihat [pipeline §3](docs/04-pipeline-produksi.md#3-voice-over-elevenlabs).
3. **CTA** → `CTA_URL` + `CTA_TEXT`: mengarah ke `getresolved.id` atau ke aset channel sendiri (newsletter/Discord/repo contoh).
4. **Topik T01** — kandidat ada di [backlog](docs/07-backlog-topik.md); tinggal pilih.
