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
| Google Chrome | — | ✅ terpasang; Remotion mengunduh Headless Shell-nya sendiri (±113 MB) saat render pertama |
| `.env` terisi | `. .\tools\load-env.ps1 -Show` | ✅ identitas channel & spesifikasi video terisi |

FFmpeg dipasang lewat `winget install Gyan.FFmpeg`. PATH-nya baru aktif di
**terminal baru** — kalau `ffmpeg -version` gagal padahal sudah terpasang, tutup
terminal lalu buka lagi. Remotion membawa FFmpeg-nya sendiri untuk render;
yang butuh `ffprobe` di PATH adalah `tools/vo-durations.mjs`.

Konfigurasi & secret semuanya di `.env`, tidak ada di tempat lain:

```powershell
Copy-Item .env.example .env   # sekali saja, lalu isi nilainya
. .\tools\load-env.ps1        # untuk sesi PowerShell (perhatikan titik di depan)
```

Untuk skrip Node pakai flag bawaan Node 22: `node --env-file=.env tools/skrip.mjs`.
Daftar variabel dan aturannya: [08 · Konfigurasi](08-konfigurasi.md).

## Struktur project

**Seluruh repo adalah SATU project Remotion**, bukan satu project per episode —
supaya `shared/` (tema, ikon, scene standar) dipakai bersama semua episode.

```
youtube/                        ← ROOT PROJECT Remotion
├── remotion.config.ts          setelan CLI
├── package.json                gen/check/sisa/studio/render (versi dipatok tepat)
├── src/Root.tsx                DAFTAR KOMPOSISI: episode + satu per scene
├── public/logos/               aset — lewat staticFile()
├── shared/                     tema, ikon, figur, scene standar, helper animasi
└── ideas/apa-itu-ram/
    ├── naskah.md               sumber kebenaran (lihat docs/05)
    ├── timing.gen.ts           ⚙ digenerate dari naskah.md
    ├── Episode.tsx             merangkai <Sequence>
    ├── scenes/index.ts         SCENES: id → komponen
    ├── scenes/15-s016.tsx      satu scene = satu berkas, bernomor urut
    ├── vo/L-001.mp3 …          satu berkas per scene
    └── render/
        ├── T01-L.mp4 · T01-S1.mp4 · T01-S2.mp4
        ├── thumb.png
        └── publish.md          judul/deskripsi/tag final (lihat docs/06)
```

**Aset diakses lewat `staticFile()`**, bukan path string:

```tsx
import { staticFile } from "remotion";
<img src={staticFile("logos/getresolved-mark.svg")} />
```

**Penamaan:** `T{nn}-{slug-kebab}`. Kode episode `T01-L`, `T01-S1`, `T01-S2`
dipakai konsisten di nama berkas, judul commit, dan metadata. ID komposisi
Remotion: `T01-apa-itu-ram` untuk episode, `s-<id>` untuk scene satuan.

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
node --env-file=.env tools/estimate-timing.mjs ideas/<slug>/naskah.md
```

Keluarannya tabel timing untuk dibaca manusia, plus **total durasi** dan
**hitungan karakter** (= perkiraan kredit ElevenLabs yang nanti terpakai).

Timing yang dipakai komposisi **tidak disalin tangan** dari sini. `npm run gen`
menghitung ulang dari naskah yang sama ke `ideas/<slug>/timing.gen.ts` dengan
rumus identik, dan `Episode.tsx` membaca berkas itu. Yang perlu disunting
selamanya cuma `naskah.md`.

Rumusnya:

```
durasi_perkiraan = jumlah_kata / VO_WORDS_PER_MINUTE * 60 + VO_PAD_SECONDS
```

Kalau totalnya meleset jauh dari target ([02](02-format-video.md)), perbaiki
naskahnya **sekarang** — di titik ini memperbaiki masih gratis.

Perkiraan ini cukup akurat untuk menilai ritme dan tata letak, tapi **tidak**
frame-akurat. Jangan pakai untuk animasi yang harus persis jatuh di kata tertentu;
itu diselesaikan di langkah 7.

## 4 · Komposisi bisu + preview

Bangun seluruh komposisi **tanpa audio sama sekali**. Tonton di Studio, dan
iterasi sepuasnya di sini — semua ini gratis.

Setiap scene satu berkas (HARD RULE 1). Dua langkah:

```tsx
// ideas/apa-itu-ram/scenes/15-s016.tsx
import type React from "react";
import { Ic } from "../../../shared/Icons";
import { masuk, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";

export const S042: React.FC = () => {
  const d = useDetik();
  return (
    <Scene>
      <Ic n="refresh" />
      <h1 className="big c-accent" style={masuk(d, { urutan: 0 })}>ribuan×</h1>
      <p className="t-sub" style={masuk(d, { urutan: 1 })}>
        setiap detik, selama komputer menyala
      </p>
    </Scene>
  );
};
```

```ts
// ideas/apa-itu-ram/scenes/index.ts
import { S042 } from "./s042";
export const SCENES = { s042: S042 };
```

Begitu terdaftar, scene itu otomatis masuk episode pada timing dari naskah,
**dan** jadi komposisi sendiri di Studio:

```powershell
npm run studio                       # server panjang — jalankan di background
npx remotion still 15-s016 out/s016.png --frame 15
```

Yang wajib dan paling mudah terlewat:

- **Isi scene dibungkus `<Scene>`**, bukan `<div>` biasa — itu yang memberi
  kotak aman dan tata letaknya.
- **Setiap nilai animasi fungsi murni dari `useDetik()`.** Tidak ada `useState`,
  tidak ada `Math.random()`, tidak ada `Date.now()`. Alasannya di
  [AGENTS.md](../AGENTS.md#aturan-yang-mengikat).
- **Jangan tulis durasi scene di dalam scene.** Durasinya dari naskah, dipasang
  `Episode.tsx` lewat `<Sequence>`. Scene hanya tahu detik ke berapa dirinya
  sedang berjalan.
- **Jangan pernah menyunting `timing.gen.ts`.** Ubah `naskah.md`, lalu
  `npm run gen`.
- Ikon lewat `<Ic n="..." />`, figur lewat kelas di
  [`shared/figur.css`](../shared/figur.css) — HARD RULE 2.

Audio ditambahkan di langkah 7, memakai `<Audio>` Remotion di dalam
`<Sequence>` scene yang bersangkutan. Volume musik latar dari `MUSIC_VOLUME`
di `.env`.

**Opening dan closing tidak dibuat sendiri.** `Episode.tsx` sudah memasang
`<KartuJudul judul={...}/>` dan `<TandaBrand/>` dari
[`shared/StandarScenes.tsx`](../shared/StandarScenes.tsx) pada ID `opening` dan
`closing`. Penempatan, durasi, dan apa yang boleh diubah:
[10 · Scene standar](10-scene-standar.md). Keduanya sudah ikut dihitung
`tools/bangun-timing.mjs`.

Sebelum menyatakan selesai:

```powershell
npm run sisa      # masih ada scene placeholder?
npm run check     # tsc + bukti frame tidak kosong
```

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
node --env-file=.env tools/vo-durations.mjs ideas/<slug>/vo L
```

Skrip ini menjalankan `ffprobe` untuk tiap berkas dan mengeluarkan tabel durasi
VO sebenarnya. Rumus timing-nya:

```
durasi_scene  = durasi_vo + VO_PAD_SECONDS
start_scene(n) = start_scene(n-1) + durasi_scene(n-1)
```

Lalu:

1. **Perbarui kolom VO di `naskah.md`** kalau ada perbedaan kata (seharusnya
   tidak ada — naskah sudah beku), lalu `npm run gen`. Timing seluruh episode
   dihitung ulang sekaligus. Tidak ada angka yang disalin tangan, jadi tidak ada
   scene yang tertinggal saat satu durasi bergeser.

   > Perkiraan dari jumlah kata biasanya meleset beberapa persen dari durasi VO
   > asli. Kalau selisihnya menumpuk sampai visual tidak lagi jatuh di kalimat
   > yang benar, tambahkan `tools/bangun-timing.mjs` membaca durasi asli dari
   > `vo/` — jangan menambal `timing.gen.ts` dengan tangan.

2. Tambahkan audio, satu `<Audio>` per scene, di dalam `<Sequence>` scene itu:

```tsx
import { Audio, staticFile } from "remotion";

<Audio src={staticFile("vo/apa-itu-ram/L-042.mp3")} />
<Audio src={staticFile("music/tenang.mp3")} volume={CFG.MUSIC_VOLUME} />
```

3. Render:

```powershell
npm run check                    # tsc + bukti frame tidak kosong
npm run sisa                     # WAJIB nol placeholder sebelum render final
npm run studio                   # Studio (server panjang — jalankan di background)

npm run render -- --out ideas/<slug>/render/T01-L.mp4
```

- **Selalu `npm run check` sebelum render.** Jauh lebih murah daripada menunggu
  render enam menit baru ketahuan salah.
- **`npm run sisa` harus nol.** Scene placeholder tampil sebagai kartu kuning
  bergaris; kalau ikut masuk MP4 final, itu ketahuan penonton.
- `--concurrency 1` kalau render tidak stabil di komposisi berat media.
- `npm run studio` adalah server yang berjalan terus — jalankan di background,
  jangan sebagai perintah biasa.
- Render satu scene untuk memeriksa cepat:
  `npx remotion render 15-s016 out/s016.mp4`.

**Font.** Manrope dan JetBrains Mono dimuat lewat `@remotion/google-fonts` di
[`shared/fonts.ts`](../shared/fonts.ts), yang menahan render sampai fontnya
benar-benar terpasang. Render pertama di mesin baru butuh internet untuk
mengunduhnya; setelah itu tersimpan di cache. Ini sengaja tidak dilakukan lewat
`@import` di CSS — dengan `@import`, render bisa menangkap frame sebelum font
siap, dan seluruh tata letak meleset tanpa ada yang gagal.

## 8 · QA

Wajib dilewati sebelum publish. Jangan tandai selesai kalau ada yang belum dicek.

**Teknis**

- [ ] `npm run sisa` melaporkan **nol** placeholder.
- [ ] Durasi total sesuai target ([02](02-format-video.md)); Shorts ≤ 60 dtk.
- [ ] Tidak ada celah/tumpang tindih antar scene (frame hitam berkedip).
- [ ] Semua scene muncul — cek dengan menggulir folder `scene` di sidebar Studio,
      bukan hanya dengan scrubbing episode utuh.
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

- Remotion — [dokumentasi](https://www.remotion.dev/docs) ·
  [`interpolate`](https://www.remotion.dev/docs/interpolate) ·
  [`Easing`](https://www.remotion.dev/docs/easing) ·
  [`Sequence`](https://www.remotion.dev/docs/sequence) ·
  [`Audio`](https://www.remotion.dev/docs/audio) ·
  [lisensi](https://www.remotion.dev/docs/license) — gratis untuk individu;
  perusahaan di atas ambang tertentu butuh lisensi berbayar, cek sendiri sebelum
  channel ini jadi entitas berbadan hukum
- Aturan framework di repo ini: [AGENTS.md](../AGENTS.md)
- ElevenLabs — [daftar model](https://elevenlabs.io/docs/overview/models) ·
  [text to speech](https://elevenlabs.io/docs/overview/capabilities/text-to-speech)
