# 04 · Pipeline Produksi

Alur dari ide sampai MP4 siap unggah.

**Prinsip yang mengikat seluruh alur: VO adalah langkah terakhir sebelum render.**
API ElevenLabs dibayar per karakter, jadi kita tidak boleh membuat suara untuk
naskah yang masih mungkin berubah. Komposisi dibangun dan ditonton dulu dalam
keadaan **bisu**, memakai timing perkiraan yang dihitung gratis dari jumlah kata.
Baru setelah naskah dan visual benar-benar cocok, VO dibuat **sekali**.

```
1 Riset → 2 Naskah → 3 Timing estimasi → 4 Komposisi (bisu) → 5 GERBANG: naskah beku
                                                ↑______ iterasi gratis ______|
                                                                    ↓
   9 Publish ← 8 QA ← 7 Re-timing + render final ← 6 VO ElevenLabs (sekali)
```

Iterasi terjadi di langkah 3–4 dan tidak berbiaya. Setelah melewati gerbang di
langkah 5, setiap perubahan naskah berarti membayar ulang.

---

## 0 · Prasyarat

| Kebutuhan | Perintah cek | Status di mesin ini (2026-08-13) |
|---|---|---|
| Node.js ≥ 22 | `node -v` | ✅ v22.21.1 |
| FFmpeg + ffprobe | `ffmpeg -version` | ✅ 9.0-full_build (via winget) |
| Google Chrome | — | ✅ terpasang; HyperFrames juga mengunduh Chrome-nya sendiri saat render pertama |
| `.env` terisi | `. .\tools\load-env.ps1 -Show` | ❔ identitas channel masih kosong |

FFmpeg dipasang lewat `winget install Gyan.FFmpeg`. PATH-nya baru aktif di
**terminal baru** — kalau `ffmpeg -version` gagal padahal sudah terpasang, tutup
terminal lalu buka lagi.

Konfigurasi & secret semuanya di `.env`, tidak ada di tempat lain. Muat ke sesi
terminal sebelum menjalankan `npx hyperframes` (perhatikan **titik di depan**):

```powershell
Copy-Item .env.example .env   # sekali saja, lalu isi nilainya
. .\tools\load-env.ps1
```

Untuk skrip Node pakai flag bawaan Node 22: `node --env-file=.env tools/skrip.mjs`.
Daftar variabel dan aturannya: [08 · Konfigurasi](08-konfigurasi.md).

## Struktur project

**Seluruh repo adalah SATU project HyperFrames**, bukan satu project per episode.
Ini bukan pilihan gaya — komposisi HyperFrames **tidak boleh menunjuk aset di atas
root project** (`../../` ditolak lint dan 404 di Studio). Supaya `shared/` bisa
dipakai bersama semua episode, root project harus berada di akar repo.

```
youtube/                        ← ROOT PROJECT HyperFrames
├── hyperframes.json            paths.assets → "shared"
├── package.json                skrip dev/check/render (versi CLI dipatok)
├── meta.json · AGENTS.md       bawaan scaffold — jangan dihapus
├── index.html                  komposisi uji scene standar (regresi visual)
├── compositions/
│   ├── T01-long.html           1920×1080
│   ├── T01-short-1.html        1080×1920
│   └── T01-short-2.html
├── shared/                     tema, scene standar, logo
└── topics/T01-cara-kerja-index-database/
    ├── naskah.md               sumber kebenaran (lihat docs/05)
    ├── vo/L-001.mp3 …          satu berkas per scene
    └── render/
        ├── T01-L.mp4 · T01-S1.mp4 · T01-S2.mp4
        ├── thumb.png
        └── publish.md          judul/deskripsi/tag final (lihat docs/06)
```

**Semua path di dalam komposisi ditulis relatif terhadap root project**, tanpa
`../`:

```html
<link rel="stylesheet" href="shared/theme.css">
<img src="shared/assets/logos/getresolved-mark.svg">
<audio src="topics/T01-cara-kerja-index-database/vo/L-001.mp3">
```

**Penamaan:** `T{nn}-{slug-kebab}`. Kode episode `T01-L`, `T01-S1`, `T01-S2`
dipakai konsisten di nama berkas, judul commit, dan metadata.

---

## 1 · Riset

Sebelum menulis satu kalimat pun:

- Kumpulkan **sumber primer** — dokumentasi resmi, spesifikasi/RFC, kode sumber,
  paper. Blog pihak ketiga hanya untuk mencari sudut pandang, bukan untuk fakta.
- Catat setiap angka beserta sumbernya di blok `sumber:` pada `naskah.md`.
- Tentukan **satu kalimat bawa-pulang** yang harus penonton ingat seminggu
  kemudian — dan tulis dalam bahasa L1 (lihat [09 · Tangga abstraksi](09-tangga-abstraksi.md)).
- **Tulis blok "Penjelasan 5 tahun" sekarang, bukan nanti.** Kalau topiknya belum
  bisa dijelaskan dalam 60 kata tanpa istilah teknis, riset belum selesai.
- Cek apakah materinya cukup untuk 8 menit **dan** untuk dua sudut Shorts yang
  berbeda. Kalau tidak, gabung dengan topik lain atau turunkan jadi Shorts saja.

## 2 · Naskah

Tulis `naskah.md` mengikuti [template di docs/05](05-template-naskah.md). VO dan
deskripsi visual lahir **bersamaan** di satu tabel — jangan menulis VO dulu lalu
memikirkan visualnya belakangan. Kolom visual yang kosong berarti nanti ada scene
yang dikarang saat membangun komposisi, dan di situlah naskah mulai melenceng
dari video.

Cek sebelum lanjut:

- [ ] Total kata VO panjang: 1.000–1.200 (≈ `VO_WORDS_PER_MINUTE` 140).
- [ ] Hook ≤ 15 detik, bahasa L1, tanpa sapaan.
- [ ] Setiap scene punya kolom visual yang konkret (bukan "animasi keren").
- [ ] Setiap angka punya sumber.
- [ ] Checklist ELI5 di [09](09-tangga-abstraksi.md#checklist-dipakai-saat-qa-naskah) lolos.
- [ ] Dua Shorts punya insight yang berbeda.

## 3 · Timing estimasi (gratis)

Hitung perkiraan durasi tiap scene dari jumlah kata — tanpa menyentuh API.

```powershell
node --env-file=.env tools/estimate-timing.mjs topics/T01-slug/naskah.md
```

Keluarannya tabel `data-start` / `data-duration` yang siap disalin ke komposisi,
plus **total durasi** dan **hitungan karakter** (= perkiraan kredit ElevenLabs
yang nanti terpakai). Rumusnya:

```
durasi_perkiraan = jumlah_kata / VO_WORDS_PER_MINUTE * 60 + VO_PAD_SECONDS
```

Kalau totalnya meleset jauh dari target ([02](02-format-video.md)), perbaiki
naskahnya **sekarang** — di titik ini memperbaiki masih gratis.

Perkiraan ini cukup akurat untuk menilai ritme dan tata letak, tapi **tidak**
frame-akurat. Jangan pakai untuk animasi yang harus persis jatuh di kata tertentu;
itu diselesaikan di langkah 7.

## 4 · Komposisi bisu + preview

Buat berkas baru di `compositions/` — **jangan** `npx hyperframes init` lagi,
project-nya sudah ada satu di root repo. Cara tercepat: salin `index.html`
(komposisi uji scene standar) sebagai titik mulai.

Bangun seluruh komposisi memakai timing estimasi, **tanpa track VO sama sekali**.
Tonton di Studio, dan iterasi sepuasnya di sini — semua ini gratis.

Kerangka wajib tiap komposisi:

```html
<link rel="stylesheet" href="shared/theme.css">
<link rel="stylesheet" href="shared/scenes.css">

<div id="root" class="hf-stage hf-16x9" data-composition-id="t01l"
     data-start="0" data-duration="480" data-width="1920" data-height="1080">

  <div class="scene clip" id="s1" data-start="0" data-duration="4.6"
       data-track-index="0" style="visibility:hidden;">
    <div class="scene-content">
      <h1 id="s1-title" class="t-title">Judul scene</h1>
    </div>
  </div>

  <!-- Track VO baru ditambahkan di langkah 7, setelah berkas audionya ada. -->
</div>
```

Yang wajib dan paling mudah terlewat:

- Wrapper memakai kelas **`hf-stage`** + `hf-16x9` (atau `hf-9x16`) — itu yang
  menyalakan tema.
- `data-composition-id` bebas, tapi **harus sama persis** dengan kunci di
  `window.__timelines`.
- Wrapper juga butuh `data-duration` = total durasi komposisi.
- Setiap elemen bertiming wajib `class="clip"` + `data-start` + `data-duration`
  + `data-track-index`.
- Path aset **tanpa `../`** — lihat [Struktur project](#struktur-project).

```javascript
const tl = gsap.timeline({ paused: true });

tl.set("#s1", { autoAlpha: 1 }, 0);
tl.from("#s1-title", { opacity: 0, y: 24, duration: 0.5, ease: "power3.out" }, 0.2);
tl.set("#s1", { autoAlpha: 0 }, 4.6);

window.__timelines = window.__timelines || {};
window.__timelines.t01l = tl;
```

Konvensi track index channel ini — angkanya ada di `.env`
(`TRACK_VO`, `TRACK_MUSIC`, `MUSIC_VOLUME`):

| Track | Isi |
|---|---|
| `0` | scene utama |
| `1–3` | overlay (lower third, chapter card, highlight) |
| `4–7` | media (video/gambar) bila ada |
| `8` | **voice over** — kosong sampai langkah 7 |
| `9` | musik latar |

Impor tema dan scene standar di setiap komposisi:

```html
<link rel="stylesheet" href="shared/theme.css">
<link rel="stylesheet" href="shared/scenes.css">
<script src="shared/scenes.js"></script>
```

**Opening dan closing tidak dibuat sendiri.** Salin dari
[`shared/scenes.html`](../shared/scenes.html) dan panggil koreografinya —
aturan penempatan, durasi, dan apa yang boleh diubah ada di
[10 · Scene standar](10-scene-standar.md). Keduanya memakan durasi (1,5 dtk +
5,0 dtk) yang harus ikut dihitung di tabel timing.

Aturan scene, `autoAlpha`, anchor shader, dan determinisme ada di
[03 · Tema visual](03-tema-visual.md#catatan-teknis-hyperframes) — patuhi semuanya.

Opsional, sekali di awal: `npx hyperframes skills update` memasang skill agent
bawaan HyperFrames, berguna saat Claude menulis komposisi.

## 5 · GERBANG — bekukan naskah

**Ini titik tidak bisa mundur.** Setelah langkah ini, setiap perbaikan kalimat
berarti membayar generate ulang. Jangan lewati satu pun baris di bawah.

Baca naskah **sambil menonton preview bisu**, dari awal sampai akhir, satu kali
penuh tanpa jeda. Untuk setiap scene:

- [ ] **Kalimat VO cocok dengan apa yang tampil di layar** pada scene itu — bukan
      scene sebelumnya, bukan sesudahnya.
- [ ] Tidak ada kalimat VO yang menyebut sesuatu yang tidak terlihat di layar.
- [ ] Tidak ada elemen penting di layar yang tidak disebut VO sama sekali.
- [ ] Scene terasa cukup lama untuk dibaca pada timing estimasi (kalau sudah
      terasa sempit sekarang, VO asli biasanya lebih panjang lagi).
- [ ] Urutan scene masuk akal tanpa perlu mengulang.

Lalu cek keseluruhan:

- [ ] Total karakter ≤ `ELEVENLABS_MAX_CHARS_PER_TOPIC`.
- [ ] Ejaan istilah asing sudah disesuaikan untuk TTS
      ([docs/05](05-template-naskah.md#aturan-menulis-vo-untuk-elevenlabs)) —
      **ini penyebab generate ulang nomor satu**, jadi teliti di sini.
- [ ] Angka ditulis sesuai cara baca, bukan sebagai angka.
- [ ] Tidak ada tanda kurung, simbol mentah, atau markdown di kolom VO.
- [ ] Checklist ELI5 lolos ([09](09-tangga-abstraksi.md#checklist-dipakai-saat-qa-naskah)).

Kalau semua tercentang, tandai di frontmatter `naskah.md`:

```yaml
status: vo
naskah_beku: 2026-08-20
```

Setelah tanggal ini tertulis, **kolom VO tidak boleh disunting** kecuali dengan
keputusan sadar bahwa akan ada biaya generate ulang.

## 6 · Voice over ElevenLabs — sekali jalan

### Voice & model

| | Nilai | Dari |
|---|---|---|
| Voice | **George** — pria, hangat, gaya pencerita | `ELEVENLABS_VOICE_ID` |
| Model | `eleven_multilingual_v2` | `ELEVENLABS_MODEL_ID` |
| Format | `mp3_44100_128` | `ELEVENLABS_OUTPUT_FORMAT` |
| Setelan | stability `0.45` · similarity `0.75` · style `0.0` · speaker boost on | `ELEVENLABS_*` |

Pilihan model:

| Model | Kapan dipakai |
|---|---|
| **`eleven_multilingual_v2`** | **Default channel.** Narasi rapi dan stabil, 29 bahasa termasuk Indonesia. Paling konsisten antar-episode — dan konsistensi suara itu identitas channel. |
| `eleven_v3` | Kalau butuh ekspresi lebih kaya. Mendukung audio tag seperti `[excited]`. Lebih ekspresif, lebih sulit dijaga konsisten, **dan lebih mahal untuk dicoba-coba**. |
| `eleven_flash_v2_5` | **Jangan** untuk produksi final — model latensi rendah untuk aplikasi real-time. |

> **Catatan tentang George:** ini voice berbahasa Inggris (aksen Britania).
> Dipakai untuk narasi Bahasa Indonesia lewat `eleven_multilingual_v2`, hasilnya
> tetap terbaca tapi biasanya membawa warna aksen asing. Dengarkan satu scene
> pendek dulu sebelum generate seluruh episode — kalau warnanya tidak cocok,
> menggantinya sekarang jauh lebih murah daripada setelah 70 berkas jadi.

### Aturan hemat biaya

1. **Satu berkas audio per scene** — ini bukan cuma soal sinkronisasi. Kalau
   nanti ada satu kalimat yang salah baca, yang digenerate ulang cuma satu scene,
   bukan seluruh episode.
2. **Generate satu scene uji dulu** (biasanya scene pembuka), dengarkan, baru
   lanjut ke sisanya. Biayanya beberapa ratus karakter untuk menghindari
   kesalahan sepuluh ribu karakter.
3. **Jangan generate ulang karena "kurang pas".** Kalau pengucapannya salah,
   perbaiki **ejaannya di naskah**, lalu generate ulang scene itu saja. Mengulang
   dengan setelan yang sama akan memberi hasil yang hampir sama — itu membakar
   kredit tanpa hasil.
4. **Jangan pernah generate dari naskah yang belum melewati gerbang langkah 5.**
5. Catat total karakter terpakai di `naskah.md` setelah selesai, supaya perkiraan
   biaya episode berikutnya makin akurat.

Penamaan berkas: `vo/L-001.mp3`, nomornya sama persis dengan nomor scene di
`naskah.md`. Nomor yang tidak sinkron akan merusak langkah 7.

**Dengarkan hasilnya sendiri.** Claude tidak bisa menilai audio — pengucapan
istilah teknis, nama library, dan akronim wajib dicek manusia.

## 7 · Re-timing dengan durasi asli + render final

Sekarang ganti timing perkiraan dengan angka sebenarnya.

```powershell
node --env-file=.env tools/vo-durations.mjs topics/T01-slug/vo L
```

Skrip ini menjalankan `ffprobe` untuk tiap berkas dan mengeluarkan tabel timing
final. Rumusnya:

```
durasi_scene  = durasi_vo + VO_PAD_SECONDS
start_scene(n) = start_scene(n-1) + durasi_scene(n-1)
```

Lalu:

1. Salin `data-start` / `data-duration` baru ke komposisi — **seluruh scene**,
   bukan hanya yang berubah. Satu durasi bergeser berarti semua scene sesudahnya
   ikut bergeser.
2. Geser juga semua waktu di timeline GSAP (`tl.set`, `tl.from`, transisi shader).
3. Tambahkan track VO, satu elemen per scene, dengan durasi **asli** (tanpa padding):

```html
<audio data-start="0" data-duration="4.2" data-track-index="8" data-volume="1.0"
       src="topics/T01-slug/vo/L-001.mp3"></audio>

<audio data-start="0" data-duration="480" data-track-index="9" data-volume="0.12"
       src="shared/music/tenang.mp3"></audio>
```

4. Render:

```powershell
npm run check                    # lint + runtime + layout + motion + kontras
npm run dev                      # Studio (server panjang — jalankan di background)

npx hyperframes render -c compositions/T01-long.html -o topics/T01-slug/render/T01-L.mp4 --quality draft
npx hyperframes render -c compositions/T01-long.html -o topics/T01-slug/render/T01-L.mp4
```

- **Selalu `npm run check` sebelum render** — sekali jalan sudah mencakup lint,
  runtime, layout, motion, dan kontras WCAG. Jauh lebih murah daripada menunggu
  render selesai baru ketahuan salah.
- `-c` memilih komposisi mana yang dirender. Tanpa `-c`, yang dirender `index.html`.
- `--quality draft` untuk semua iterasi. Render final hanya sekali di akhir.
- `--workers 1` (`HYPERFRAMES_WORKERS`) kalau komposisi berat media dan render
  tidak stabil.
- `npm run dev` adalah server yang berjalan terus — jalankan di background,
  jangan sebagai perintah biasa.

**Peringatan lint yang memang dibiarkan:** `google_fonts_import`. Manrope dan
JetBrains Mono diambil dari Google Fonts, dan compiler HyperFrames sudah
menyuntik `@font-face` deterministik plus menyimpannya ke cache lokal saat
render pertama. Risikonya tinggal render pertama di mesin baru yang butuh
internet. Kalau nanti perlu render sepenuhnya offline, unduh `.woff2`-nya ke
`shared/fonts/` dan ganti `@import` di `shared/theme.css` dengan `@font-face`.

## 8 · QA

Wajib dilewati sebelum publish. Jangan tandai selesai kalau ada yang belum dicek.

**Teknis**

- [ ] Durasi total sesuai target ([02](02-format-video.md)); Shorts ≤ 60 dtk.
- [ ] Tidak ada celah/tumpang tindih antar scene (frame hitam berkedip).
- [ ] Semua scene muncul — tidak ada yang tetap tersembunyi (bug `autoAlpha`).
- [ ] VO sinkron dengan visual **di seluruh video**, bukan hanya di awal —
      pergeseran timing menumpuk ke belakang.
- [ ] Loudness ≈ `TARGET_LUFS`; musik tidak menutupi VO.
- [ ] Tidak ada teks terpotong di tepi; Shorts patuh safe area.
- [ ] Ukuran font memenuhi minimum — cek dengan menonton di layar ponsel.

**Isi**

- [ ] Setiap klaim angka masih cocok dengan `sumber:` di naskah.
- [ ] Checklist ELI5 lolos: tidak ada istilah yang dipakai sebelum dijelaskan,
      analogi punya titik putus ([09](09-tangga-abstraksi.md)).
- [ ] Pengucapan VO benar untuk semua istilah teknis (**dengarkan sendiri**).
- [ ] Hook menepati janjinya.
- [ ] Kode di layar benar dan bisa dijalankan (kalau memang kode utuh).

## 9 · Publish

Lihat [06 · Publishing](06-publishing.md). Isi `render/publish.md` sebelum
mengunggah, bukan mengarang metadata di kolom unggah YouTube.

---

## Referensi

- HyperFrames — [repo](https://github.com/heygen-com/hyperframes) ·
  [panduan authoring untuk agent](https://github.com/heygen-com/hyperframes/blob/main/docs/guides/claude-design-hyperframes.md) ·
  [cloud rendering](https://developers.heygen.com/hyperframes)
- ElevenLabs — [daftar model](https://elevenlabs.io/docs/overview/models) ·
  [text to speech](https://elevenlabs.io/docs/overview/capabilities/text-to-speech)
