# 04 · Pipeline Produksi

Alur dari ide sampai MP4 siap unggah.

**Prinsip yang mengikat seluruh alur: VO adalah langkah terakhir sebelum render.**
API TTS berbayar, jadi kita tidak boleh membuat suara untuk
naskah yang masih mungkin berubah. Komposisi dibangun dan ditonton dulu dalam
keadaan **bisu**, memakai timing perkiraan yang dihitung gratis dari jumlah kata.
Baru setelah naskah dan visual benar-benar cocok, VO dibuat **sekali**.

```
1 Riset → 2 Naskah → 3 Timing estimasi → 4 Komposisi (bisu) → 5 GERBANG: naskah beku
                                                ↑______ iterasi gratis ______|
                                                                    ↓
   9 Publish ← 8 QA ← 7 Re-timing + render final ← 6 VO Gemini (sekali)
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
├── public/vo/<slug>/           <prefiks>-<kunci>.mp3 — keluaran TTS, satu per scene
│                               L = video panjang · S1/S2 = kedua Short
├── shared/                     tema, ikon, figur, scene standar, helper animasi
└── ideas/apa-itu-ram/
    ├── naskah.md               daftar scene + materi topik (docs/05)
    ├── timing.gen.ts           ⚙ digenerate dari naskah.md + scenes/*-vo.md
    ├── Episode.tsx             merangkai <Sequence>
    ├── scenes/index.ts         SCENES: id → komponen
    ├── scenes/01-hook-question-vo.md         teks VO scene itu (docs/11)
    ├── scenes/01-hook-question-direction.md  apa yang terjadi di layar
    ├── scenes/01-hook-question.tsx           komposisinya, turunan dua di atas
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

**Berkas VO ikut tinggal di `public/`**, bukan di dalam `ideas/<slug>/` —
`staticFile()` hanya melayani isi `public/`. Berkas di luar sana harus diimpor
statis satu per satu, dan daftar impor yang ditulis tangan adalah sumber
kebenaran kedua yang meleset dari naskah begitu satu scene disisipkan.
Semuanya sudah di-ignore git (`*.mp3`).

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

## 2 · Naskah + rencana VO + direction

Tiga berkas, ditulis dalam urutan ini:

1. **`naskah.md`** — [template di docs/05](05-template-naskah.md). Materi
   topiknya (penjelasan 5 tahun, tangga, sumber angka) plus **daftar scene**:
   ada scene apa saja, urutannya, di bagian flow mana.
2. **`scenes/<kunci>-vo.md`** — kalimat yang diucapkan tiap scene,
   [docs/11](11-rencana-vo.md). Nomor `<kunci>` didapat dari `npm run gen`.
3. **`scenes/<kunci>-direction.md`** — apa yang terjadi di layar.

VO dan direction lahir **bersamaan** — jangan menulis semua VO dulu lalu
memikirkan visualnya belakangan. Direction yang kosong berarti nanti ada scene
yang dikarang saat membangun komposisi, dan di situlah naskah mulai melenceng
dari video.

Cek sebelum lanjut:

- [ ] Total kata VO panjang: 1.000–1.200 (≈ `VO_WORDS_PER_MINUTE` 140).
- [ ] Hook ≤ 15 detik, bahasa L1, tanpa sapaan.
- [ ] `npm run sisa` tidak melaporkan rencana VO atau direction yang kosong.
- [ ] Setiap direction konkret (bukan "animasi keren").
- [ ] Setiap angka punya sumber.
- [ ] Checklist ELI5 di [09](09-tangga-abstraksi.md#checklist-dipakai-saat-qa-naskah) lolos.
- [ ] Dua Shorts punya insight yang berbeda.

## 3 · Timing estimasi (gratis)

Hitung perkiraan durasi tiap scene dari jumlah kata — tanpa menyentuh API.

```powershell
node --env-file=.env tools/estimate-timing.mjs <slug>
```

Keluarannya tabel timing untuk dibaca manusia, plus **total durasi** dan
**hitungan karakter** (= perkiraan biaya TTS yang nanti terpakai).

Timing yang dipakai komposisi **tidak disalin tangan** dari sini. `npm run gen`
menghitung ulang dari sumber yang sama ke `ideas/<slug>/timing.gen.ts` lewat
modul yang sama (`tools/baca-episode.mjs`), dan `Episode.tsx` membaca berkas itu.
Yang perlu disunting selamanya cuma daftar scene di `naskah.md` dan blok `## VO`
di rencana VO tiap scene.

Rumusnya — per **beat** (satu baris di blok `## VO`), lalu dijumlahkan:

```
durasi_beat      = jumlah_kata / VO_WORDS_PER_MINUTE * 60
durasi_perkiraan = jumlah durasi_beat + VO_PAD_SECONDS
```

Detik tiap beat ikut masuk `timing.gen.ts`, jadi komposisi bisa menjatuhkan
gerakan tepat di kalimat yang bersangkutan lewat `beat("hook-question", 2)`
alih-alih mengetik angka hasil hitungan tangan ([docs/11](11-rencana-vo.md)).

Kalau totalnya meleset jauh dari target ([02](02-format-video.md)), perbaiki
naskahnya **sekarang** — di titik ini memperbaiki masih gratis.

Perkiraan ini cukup akurat untuk menilai ritme dan tata letak, tapi **tidak**
frame-akurat. Jangan pakai untuk animasi yang harus persis jatuh di kata tertentu;
itu diselesaikan di langkah 7.

## 4 · Komposisi bisu + preview

Bangun seluruh komposisi **tanpa audio sama sekali**. Tonton di Studio, dan
iterasi sepuasnya di sini — semua ini gratis.

Bisu, tapi tidak buta: selama berkas VO sebuah scene belum ada, teks VO-nya
tampil sebagai **subtitel preview** yang berganti mengikuti beat, jadi ritme
scene bisa dinilai tanpa membayar satu karakter pun
([docs/11](11-rencana-vo.md#subtitel-preview--sampai-vonya-jadi)). Subtitel itu
hilang sendiri per scene begitu berkas VO-nya ada — tidak ada saklar yang perlu
dimatikan sebelum render final.

Setiap scene satu berkas (HARD RULE 1), dan **rencana VO + direction-nya harus
sudah ada** — `.tsx` adalah turunan keduanya, bukan tebakan yang mendahului.
Dua langkah:

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
- **Jangan pernah menyunting `timing.gen.ts`.** Ubah rencana VO scene itu (atau
  daftar scene di `naskah.md`), lalu `npm run gen`.
- **Jangan mengetik detik VO di dalam `.tsx`.** Pakai `beat("<id>", i)` dari
  `timing.gen.ts` — angka tangan tidak ikut bergeser saat kalimatnya berubah.
- Ikon lewat `<Ic n="..." />`, figur lewat kelas di
  [`shared/figur.css`](../shared/figur.css) — HARD RULE 2.

Audio VO **tidak ditempel tangan**. `<TrekVO>` di `Episode.tsx` memasang
`<Audio>` sendiri untuk setiap scene yang berkas VO-nya sudah ada di
`public/vo/<slug>/`, dan menampilkan subtitel preview untuk yang belum. Musik
latar tetap dipasang manual, volumenya dari `MUSIC_VOLUME` di `.env`.

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
penuh tanpa jeda. Subtitel preview di layar sudah menampilkan kalimat yang
sedang berjalan, jadi kecocokan VO–visual bisa dinilai langsung tanpa membaca
berkas di sebelah. Untuk setiap scene:

- [ ] **Kalimat VO cocok dengan apa yang tampil di layar** pada scene itu — bukan
      scene sebelumnya, bukan sesudahnya.
- [ ] Tidak ada kalimat VO yang menyebut sesuatu yang tidak terlihat di layar.
- [ ] Tidak ada elemen penting di layar yang tidak disebut VO sama sekali.
- [ ] Scene terasa cukup lama untuk dibaca pada timing estimasi (kalau sudah
      terasa sempit sekarang, VO asli biasanya lebih panjang lagi).
- [ ] Urutan scene masuk akal tanpa perlu mengulang.

Lalu cek keseluruhan:

- [ ] Total karakter ≤ `VO_MAX_CHARS_PER_TOPIC`.
- [ ] Ejaan istilah asing sudah disesuaikan untuk TTS
      ([docs/11](11-rencana-vo.md#aturan-menulis-vo-untuk-tts)) —
      **ini penyebab generate ulang nomor satu**, jadi teliti di sini.
- [ ] Angka ditulis sesuai cara baca, bukan sebagai angka.
- [ ] Tidak ada tanda kurung, simbol mentah, atau markdown di blok `## VO`.
- [ ] `npm run sisa` bersih — tidak ada rencana VO yang belum ada atau kosong.
- [ ] Checklist ELI5 lolos ([09](09-tangga-abstraksi.md#checklist-dipakai-saat-qa-naskah)).

Kalau semua tercentang, tandai di frontmatter `naskah.md`:

```yaml
status: vo
naskah_beku:
  L: 2026-08-20
  S1: 2026-08-20
  S2: 2026-08-20
```

**Bekunya per keluaran, bukan per topik.** Video panjang dan kedua Short bisa
matang di waktu berbeda — Shorts sudah sesuai spek sementara video panjangnya
masih kurang durasi, misalnya. Satu tanggal untuk bertiga memaksa memilih antara
menahan yang sudah siap atau membekukan yang belum, dan yang kedua yang selalu
dipilih orang yang sedang buru-buru. `tools/bikin-vo.mjs` melewati keluaran yang
barisnya masih kosong, dan mengatakannya di layar.

Setelah tanggal ini tertulis, **blok `## VO` di rencana VO mana pun tidak boleh
disunting** kecuali dengan keputusan sadar bahwa akan ada biaya generate ulang.
Bagian lain berkas itu — catatan, tabel sinkron — tetap boleh diperbaiki; yang
beku cuma kalimatnya.

## 6 · Voice over Gemini — sekali jalan

### Voice, model & arahan

| | Nilai | Dari |
|---|---|---|
| Voice | **Charon** | `voice` di `ideas/<slug>/vo-gemini-profile.yaml` |
| Model | `gemini-2.5-flash-preview-tts` | `GEMINI_TTS_MODEL` |
| Format | PCM 24 kHz mono, dikonversi ke MP3 oleh ffmpeg | `GEMINI_TTS_MP3_BITRATE` |
| Arahan | profile · style · accent · pace | profil topik ([docs/11](11-rencana-vo.md)) |
| Tempo | pengali `atempo` sesudah audio jadi | `tempo` di profil topik |

**Cuma `voice` yang medan API sungguhan.** Empat medan arahan melebur jadi satu
kalimat di depan teks VO — permintaan, bukan jaminan. Detailnya di
[docs/11 § Profil VO Gemini](11-rencana-vo.md).

### Tiga sifat Gemini yang mengubah cara kerja

1. **Tidak deterministik.** Teks sama, setelan sama, durasi berayun sampai
   **31%** antar-panggilan — lebih besar daripada seluruh jangkauan aman pengali
   `tempo`. Tidak ada setelan yang menghilangkan ini.
2. **Buta terhadap tetangga.** Tidak ada padanan `previous_text`, jadi scene
   yang disintesis sendiri-sendiri tidak menyambung di suaranya. Ditutup dengan
   mensintesis seluruh Short dalam **satu permintaan**
   (`npm run vo:utuh`), lalu memotongnya per scene.
3. **Model bahasa, bukan mesin TTS murni.** Ia bisa memparafrase. Ditutup
   `npm run vo:cocok`, yang mencocokkan transkripsi audio dengan naskah **per
   kata** — di T14 hasilnya 97,3%, dan satu-satunya selisih artefak ejaan.

24 kHz itu bawaan Gemini, bukan pilihan encoding — lebih rendah daripada 44,1 kHz
dan tidak bisa dinaikkan.

### Aturan hemat biaya

1. **Satu berkas audio per scene** — ini bukan cuma soal sinkronisasi. Kalau
   nanti ada satu kalimat yang salah baca, yang digenerate ulang cuma satu scene,
   bukan seluruh episode.
2. **Generate satu scene uji dulu** (biasanya scene pembuka), dengarkan, baru
   lanjut ke sisanya. Biayanya beberapa ratus karakter untuk menghindari
   kesalahan sepuluh ribu karakter.
3. **Jangan generate ulang karena "kurang pas".** Kalau pengucapannya salah,
   perbaiki **ejaannya di rencana VO scene itu** (dan catat di § Kamus
   pengucapan `naskah.md`), lalu generate ulang scene itu saja. Mengulang
   dengan setelan yang sama akan memberi hasil yang hampir sama — itu membakar
   kredit tanpa hasil.
4. **Jangan pernah generate dari naskah yang belum melewati gerbang langkah 5.**
5. Catat total karakter terpakai di `naskah.md` setelah selesai, supaya perkiraan
   biaya episode berikutnya makin akurat.

Penamaan berkas: `public/vo/<slug>/<prefiks>-<kunci>.mp3` — mis.
`public/vo/apa-itu-ram/L-01-hook-question.mp3` untuk video panjang, dan
`S1-01-menunggu.mp3` / `S2-01-mitos.mp3` untuk kedua Short. **Prefiksnya yang
memisahkan ketiga keluaran di satu folder**: tanpa itu `01-hook` milik Short dan
`01-hook-question` milik video panjang berebut ruang nama yang sama. Satu bentuk
nama untuk berkas VO, rencana VO, komposisi, dan ID komposisi Remotion. **Nama inilah saklarnya:**
begitu berkasnya ada dan `npm run gen` dijalankan, scene itu berhenti memakai
subtitel preview dan mulai bicara ([docs/11](11-rencana-vo.md#subtitel-preview--sampai-vonya-jadi)).
Nama yang meleset satu huruf berarti scene tetap bisu — `npm run sisa` yang
memberi tahu, jangan menunggu ketahuan saat menonton hasil render.

### Perintahnya

```powershell
node --env-file=.env tools/bikin-vo.mjs <slug>                    # rencana saja — GRATIS
node --env-file=.env tools/bikin-vo.mjs <slug> --scene 01-hook-question --target L --jalan
node --env-file=.env tools/bikin-vo.mjs <slug> --jalan            # sisanya, setelah didengar
```

**Tanpa `--jalan` skrip itu tidak mengirim apa pun** — ia mencetak daftar berkas
yang akan dibuat beserta hitungan karakternya, lalu berhenti. Default yang tidak
membelanjakan apa-apa adalah satu-satunya default yang benar untuk API berbayar:
perintah yang salah ketik harus berakhir sebagai tabel di layar.

Yang diperiksa sebelum satu byte pun dikirim:

1. `naskah_beku` di frontmatter naskah wajib terisi — inilah gerbang §5 yang
   dijalankan mesin, bukan diingat orang.
2. Total karakter topik ≤ `VO_MAX_CHARS_PER_TOPIC`.
3. Scene yang MP3-nya sudah ada dilewati diam-diam; menimpanya perlu `--paksa`.
4. Sisa kuota key aktif dicek lebih dulu — kurang berarti berhenti sebelum
   mulai, karena setengah episode yang jadi lebih merepotkan daripada nol.

Kalimat tetangga ikut dikirim sebagai `previous_text` / `next_text` (tidak
disuarakan, tidak ditagih) supaya intonasi sambungan antar-scene tidak patah —
scene ditulis terpisah tapi ditonton beruntun (HARD RULE 7).

**Dengarkan hasilnya sendiri.** Claude tidak bisa menilai audio — pengucapan
istilah teknis, nama library, dan akronim wajib dicek manusia.

### Ratakan loudness — satu perintah, jangan dilewati

```powershell
node --env-file=.env tools/rata-vo.mjs <slug>            # rencana
node --env-file=.env tools/rata-vo.mjs <slug> --jalan
```

Keluaran TTS duduk jauh di bawah target siar, beberapa LU di bawah
`TARGET_LUFS`. **YouTube tidak menaikkan yang pelan** — ia hanya menurunkan yang
keras — jadi video yang diunggah sepelan itu akan terdengar pelan di sebelah
video orang lain, selamanya, dan tidak ada yang bisa diperbaiki setelah tayang
selain mengunggah ulang.

Perataannya dikerjakan pada **MP3 di `public/vo/`, bukan pada MP4 hasil render**.
Kalau ditempel di keluaran, MP4 di `render/` berhenti bisa dihasilkan ulang dari
`npm run render` — dan berkas yang tidak bisa dibuat ulang adalah berkas yang
tidak bisa diperbaiki. Metodenya loudnorm dua langkah dengan `linear=true`, jadi
dinamika kalimat tidak dipompa; berkas yang sudah di ±0,5 LU dari target
dilewati, jadi aman dijalankan berkali-kali.

MP4 utuhnya nanti terukur satu-dua LU di bawah target — itu wajar, karena jeda
antar-scene dan closing yang bisu ikut masuk hitungan integrated loudness.

## 7 · Re-timing dengan durasi asli + render final

Sekarang ganti timing perkiraan dengan angka sebenarnya.

```powershell
node --env-file=.env tools/vo-durations.mjs <slug>        # ketiga keluaran
node --env-file=.env tools/vo-durations.mjs <slug> S1     # satu saja
```

Skrip ini menjalankan `ffprobe` untuk tiap berkas dan membandingkan durasi VO
sebenarnya dengan perkiraan yang sedang dipakai komposisi. **Kolom yang penting
adalah "geser menumpuk", bukan selisih per scene** — selisih 0,3 dtk di sepuluh
scene berarti scene terakhir jatuh 3 detik dari tempatnya. Skrip keluar dengan
kode 1 kalau pergeserannya lewat 1,5 dtk. Rumus timing-nya:

```
durasi_scene  = durasi_vo + VO_PAD_SECONDS
start_scene(n) = start_scene(n-1) + durasi_scene(n-1)
```

Lalu:

1. **Perbarui blok `## VO` scene yang bersangkutan** kalau ada perbedaan kata
   (seharusnya tidak ada — naskah sudah beku), lalu `npm run gen`. Timing seluruh episode
   dihitung ulang sekaligus. Tidak ada angka yang disalin tangan, jadi tidak ada
   scene yang tertinggal saat satu durasi bergeser.

   > Perkiraan dari jumlah kata biasanya meleset beberapa persen dari durasi VO
   > asli. Kalau selisihnya menumpuk sampai visual tidak lagi jatuh di kalimat
   > yang benar, tambahkan `tools/bangun-timing.mjs` membaca durasi asli dari
   > `vo/` — jangan menambal `timing.gen.ts` dengan tangan.

2. **Audio VO sudah terpasang sendiri** begitu berkasnya ada di
   `public/vo/<slug>/` dan `npm run gen` dijalankan — `<TrekVO>` yang
   memasangnya, dan subtitel preview scene itu ikut hilang. Yang masih manual
   cuma musik latar:

```tsx
import { Audio, staticFile } from "remotion";

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
  bergaris; kalau ikut masuk MP4 final, itu ketahuan penonton. Perintah yang
  sama juga menyebut scene yang masih memakai **subtitel preview** (berkas VO-nya
  belum ada) dan berkas VO yang namanya tidak cocok dengan kunci mana pun.
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

- [ ] `npm run sisa` melaporkan **nol** placeholder **dan nol scene bersubtitel
      preview** — subtitel oranye berbingkai putus-putus tidak boleh ada di MP4.
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
- Gemini TTS — [speech generation](https://ai.google.dev/gemini-api/docs/speech-generation)
