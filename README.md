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

**Tiga aturan yang mengikat seluruh alur kerja:**

1. **Satu video, dua lapis penonton.** Khalayak umum harus bertahan sampai babak 4; developer dapat kedalamannya di babak 5. Dijembatani tangga **L1 → L2 → L3** → [09 · Tangga abstraksi](docs/09-tangga-abstraksi.md).
2. **Bahasa anak 5 tahun.** Topik yang belum bisa dijelaskan dalam 60 kata tanpa istilah teknis belum boleh masuk produksi.
3. **VO paling akhir.** ElevenLabs dibayar per karakter, jadi komposisi dibangun dan ditonton dulu dalam keadaan **bisu** dengan timing perkiraan. VO baru dibuat setelah naskah **beku** → [04 · Pipeline](docs/04-pipeline-produksi.md).

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
├── index.html                ← KOMPOSISI EPISODE YANG SEDANG DIGARAP
├── docs/                     ← guideline (01–10)
├── compositions/             ← satu berkas per episode per format
│   └── uji-scene-standar.html · episode yang sudah selesai
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
└── ideas/                    ← SEMUA ide + seluruh produksinya hidup di sini
    ├── README.md             ← alur & template ide
    └── <slug>/
        ├── ide.md            ← ide mentah + uji 4 syarat (selalu ada)
        ├── naskah.md         ← sumber kebenaran: outline + VO + visual per scene
        ├── vo/               ← keluaran ElevenLabs, satu berkas per scene
        └── render/           ← MP4 final + thumbnail + metadata publish
```

Path di dalam komposisi selalu relatif ke akar repo, tanpa `../`:
`shared/theme.css`, `ideas/<slug>/vo/L-001.mp3`.

## Prasyarat (status di mesin ini, dicek 2026-08-13)

| Kebutuhan | Status | Catatan |
|---|---|---|
| Node.js ≥ 22 | ✅ `v22.21.1` | |
| Google Chrome | ✅ terpasang | HyperFrames juga mengunduh Chrome-nya sendiri saat render pertama |
| FFmpeg + ffprobe | ✅ `9.0-full_build` | via `winget install Gyan.FFmpeg`; PATH aktif di terminal baru |
| Pipeline render | ✅ **terbukti** | komposisi uji scene standar sudah dirender jadi MP4 |
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

Sudah ditetapkan:

| | Nilai |
|---|---|
| Channel | **Get Resolved** — [youtube.com/@GetResolved](https://www.youtube.com/@GetResolved) |
| Website / CTA | [getresolved.id](https://getresolved.id) |
| Voice ElevenLabs | **George** (`JBFqnCBsd6RMkjVDRZzb`), model `eleven_multilingual_v2` |
| Audiens | **Khalayak umum + developer** dalam satu video, dijembatani tangga L1→L2→L3 |
| Episode pertama | **T01 · Apa itu RAM** — [ide](ideas/apa-itu-ram/ide.md) · [backlog](docs/07-backlog-topik.md) |

Yang masih terbuka:

1. **Angka latensi untuk T01** belum punya sumber primer. Opsi paling jujur:
   ukur sendiri di mesin ini dan sebutkan spesifikasinya di video. Detailnya di
   [ideas/apa-itu-ram/ide.md](ideas/apa-itu-ram/ide.md#catatan).
2. **Musik latar.** Belum ada aset di `shared/`; dibutuhkan sebelum render final
   episode pertama.
