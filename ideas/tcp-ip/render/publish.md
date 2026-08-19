# publish.md — tcp-ip (T18 provisional)

**Fase 4 & 5.** Judul & deskripsi untuk video panjang dan keempat Short, plus kelima
kartu yang sudah dirender di folder ini.

> **SIAP DIUNGGAH — 2026-08-18.** Gerbang docs/04 §5 terbuka (enam dokumen
> primer dibuka, `naskah.md § Sumber`), naskah beku untuk kelima keluaran, VO
> jadi dan diratakan ke −14 LUFS, dan kelima MP4 sudah dirender di folder ini.
>
> **Yang tersisa manual dan tidak bisa diotomatiskan repo ini:** mengunggah.
> Tidak ada integrasi YouTube API di `tools/`. Yang disiapkan repo cuma
> bahannya — MP4, lima PNG, dan teks di bawah yang tinggal disalin ke kolomnya.

## Kartu yang sudah jadi

| Berkas | Ukuran | Komposisi | Brief |
|---|---|---|---|
| `T18-tcp-ip.mp4` | 1920×1080 · 4:40 · 16,2 MB | `T18-tcp-ip` | — |
| `T18-tcp-ip-s1.mp4` | 1080×1920 · 0:49 | `T18-tcp-ip-s1` | — |
| `T18-tcp-ip-s2.mp4` | 1080×1920 · 0:52 | `T18-tcp-ip-s2` | — |
| `T18-tcp-ip-s3.mp4` | 1080×1920 · 0:42 | `T18-tcp-ip-s3` | — |
| `T18-tcp-ip-s4.mp4` | 1080×1920 · 0:44 | `T18-tcp-ip-s4` | — |
| `thumb.png` | 1280×720 · 240 KB | `T18-thumb` | [thumbnail.md](../thumbnail.md) |
| `thumb-s1.png` | 2160×3840 | `T18-thumb-s1` | idem |
| `thumb-s2.png` | 2160×3840 | `T18-thumb-s2` | idem |
| `thumb-s3.png` | 2160×3840 | `T18-thumb-s3` | idem |
| `thumb-s4.png` | 2160×3840 | `T18-thumb-s4` | idem |

Dirender ulang kapan saja: `npm run render:t18` (+ `:s1`..`:s4`) untuk MP4,
`npm run thumb:t18` untuk kelima PNG.

**Kelima MP4 bersuara** (aac, 2 kanal) — diperiksa dengan `ffprobe`, bukan
diasumsikan. MP4 di-ignore git (`*.mp4`); PNG dan berkas ini tidak.

**Uji 210×118 belum dilakukan** — itu ukuran nyatanya di feed ponsel, dan tidak
ada pemeriksaan yang bisa menggantikannya. Kecilkan `thumb.png` dan lihat
sendiri sebelum mengunggah. Yang paling mungkin gagal di situ **nomor di dalam
kotaknya**, bukan teksnya.

---

## Video panjang · 4 mnt 40 dtk

### Judul — 3 kandidat

| # | Judul | Karakter | Bentuk |
|---|---|---|---|
| **1** ✅ | `Apa itu TCP/IP? Begini data berpindah di internet` | 48 | pertanyaan + janji mekanisme |
| 2 | `Kenapa data kamu dipecah sebelum dikirim?` | 40 | pertanyaan mekanisme |
| 3 | `TCP/IP: alamat, potongan, dan kiriman ulang` | 43 | daftar isi |

**Dipilih #1.** Ia memakai kata yang benar-benar diketik orang di kolom
pencarian ("apa itu TCP/IP") sekaligus menjanjikan sesuatu yang lebih dari
definisi. Kandidat 2 lebih tajam tapi membocorkan isi bagian tengahnya, dan
kandidat 3 adalah daftar isi — daftar isi tidak menarik siapa pun.

**Tidak berbagi satu kata pun dengan thumbnail** (`SATU HILANG, TETAP UTUH`) —
syarat docs/06: judul menjelaskan, thumbnail menarik. Kalau #1 diganti, periksa
lagi: kata *satu*, *hilang*, *tetap*, dan *utuh* semuanya terlarang di judul.

### Deskripsi

```
Data yang kamu kirim tidak berangkat utuh dalam satu jalan. Ia dipecah, tiap potongan mencari jalannya sendiri, dan yang tidak sampai diminta lagi — semuanya tanpa kamu tahu.
Untuk siapa pun yang pakai internet. Tidak perlu tahu apa pun soal coding.

⏱ Bab
00:00 Pertanyaannya
00:26 Apa itu TCP/IP
00:43 Analogi paket kiriman
01:07 Alamat tujuan
01:22 Dipecah jadi potongan
01:45 Kalau ada yang tidak sampai
02:06 Sepuluh kotak
02:23 Dua tugas yang berbeda
02:42 Bukan cuma TCP dan IP
03:15 Saat membuka sebuah website
03:49 Ringkasan
04:18 Penutup
#tcpip #jaringan #internet #belajarcoding
```

---

## Short 1 · 49 dtk · `T18-tcp-ip-s1`

**Judul:** `Bagaimana internet tahu data harus ke mana?`
**Kover:** `thumb-s1.png` — `ADA ALAMAT, ADA JALAN`

```
Sebuah kotak tanpa alamat tidak ke mana-mana. Di internet juga begitu.
#tcpip #jaringan #internet #Shorts
```

Judul tidak memakai *ada*, *alamat*, atau *jalan* — keempat kata kovernya.

## Short 2 · 52 dtk · `T18-tcp-ip-s2`

**Judul:** `Data kamu tidak dikirim sekaligus`
**Kover:** `thumb-s2.png` — `SATU FILE, LIMA KOTAK`

```
Yang bergerak di internet bukan satu benda besar, tapi banyak potongan kecil.
#tcpip #jaringan #internet #Shorts
```

Judul tidak memakai *satu*, *file*, *lima*, atau *kotak*.

## Short 3 · 42 dtk · `T18-tcp-ip-s3`

**Judul:** `Kalau ada bagian yang tidak sampai, apa yang terjadi?`
**Kover:** `thumb-s3.png` — `NOMOR TIGA KE MANA?`

```
Kehilangan di jalan itu normal. Yang tidak normal adalah kalau tidak ada yang menagihnya.
#tcpip #jaringan #internet #Shorts
```

Judul tidak memakai *nomor*, *tiga*, *ke*, atau *mana*.

## Short 4 · 44 dtk · `T18-tcp-ip-s4`

**Judul:** `Apa bedanya TCP dan IP?`
**Kover:** `thumb-s4.png` — `DUA NAMA, DUA TUGAS`

```
Namanya selalu disebut bersamaan, tapi pekerjaannya tidak sama.
#tcpip #jaringan #internet #Shorts
```

Judul tidak memakai *dua*, *nama*, atau *tugas*.

---

## Catatan

- **Keempat Short akhirnya mendarat di 42–52 dtk**, di dalam patokan docs/02
  (40–60). Sebelum VO ada, perkiraan dari jumlah kata menaruh S3 dan S4 di 36
  dan 35 dtk — di bawah patokan. Yang mengubahnya bukan naskah melainkan
  **tempo baca sungguhan**: Gemini membacakan keempatnya di 78–98 wpm, jauh di
  bawah patokan 136 wpm di `.env`. Ini contoh persis kenapa docs/04 melarang
  membekukan timing dari perkiraan.

- **TIGA BATCH VO GAGAL SEBELUM BERHASIL, dan penjaganya tidak menangkapnya.**
  `tools/bikin-vo-utuh.mjs` menolak batch yang **terlalu cepat**
  (`wpm > 2× VO_WORDS_PER_MINUTE`) karena itu tanda aliran terpenggal. Yang
  terjadi di sini kebalikannya: batch dikembalikan **terlalu lambat** — 69, 60,
  lalu 8 wpm — dan yang 8 wpm itu 655 detik untuk 84 kata, praktis sebelas
  menit sampah. Ketiganya lolos penjaga wpm dan baru tertangkap oleh
  **pencocokan per kata** (`vo:cocok`), yang melaporkan 29,7%, 82,6%, dan 3,6%.

  Yang menyelamatkan biayanya: `--pakai-wav`. WAV tiap batch disimpan, jadi
  batch yang sudah bagus dipotong ulang tanpa satu pun permintaan baru — cuma
  batch yang WAV-nya dihapus yang disintesis lagi. Tanpa itu, tiap percobaan
  berarti membayar ulang keempat batch.

  **Kalau batch gagal lagi di sesi berikutnya:** pecah lebih kecil lewat
  `--pecah-di`, jangan menaikkan ambang. Yang gagal di sini selalu batch
  terpanjang (206 kata), dan setelah dipecah jadi 122 + 84 keduanya lolos.

  Ambang bawah untuk wpm belum ada di alatnya. Menambahkannya akan menghemat
  tiga permintaan berbayar per topik — tapi itu perubahan `tools/` yang
  mengikat semua topik, jadi tidak dilakukan diam-diam dari sini.
- **Keempat judul Short sengaja berbentuk pertanyaan atau klaim pendek**, bukan
  "TCP/IP Part 1/4". Penonton Shorts mendarat dari feed satu per satu, hampir
  tidak pernah berurutan (docs/02) — judul bernomor memberi tahu penonton bahwa
  ia terlambat, dan penonton yang merasa terlambat menggeser.
- **Deskripsi Short sengaja satu kalimat.** Di layar Shorts deskripsi terpotong
  setelah satu baris; kalimat kedua tidak dibaca siapa pun.
- **`#Shorts` cuma di keempat Short**, tidak di video panjang.
- **Unggahnya manual.** Tidak ada integrasi YouTube API di `tools/`; yang
  disiapkan repo cuma bahannya.
