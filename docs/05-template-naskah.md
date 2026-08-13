# 05 · Template Naskah

`naskah.md` adalah **sumber kebenaran** satu topik. VO, visual, timing, sumber
fakta, dan penjelasan L1 hidup di satu berkas. Komposisi HTML dan berkas VO
adalah turunan — kalau ada yang berubah, ubah naskah dulu.

Naskah juga yang menentukan biaya: VO baru dibuat setelah naskah **beku**
([pipeline §5](04-pipeline-produksi.md#5-gerbang--bekukan-naskah)), jadi kualitas
berkas ini yang menentukan berapa kali kita membayar ElevenLabs.

---

## Aturan menulis VO untuk ElevenLabs

Naskah yang bagus dibaca ≠ naskah yang bagus disintesis. Aturan berikut khusus
supaya keluaran ElevenLabs terdengar wajar dan pengucapannya benar **pada
percobaan pertama** — setiap kesalahan di sini berarti generate ulang berbayar.

**Struktur kalimat**

- Maksimal **18 kata per kalimat**. Kalimat panjang bikin intonasi TTS melantur.
- Satu paragraf = satu scene = satu berkas VO. Jangan menggabung dua ide.
- Hindari anak kalimat bertingkat ("yang mana, ketika, sehingga…"). Pecah jadi
  dua kalimat.
- Akhiri kalimat dengan titik. Tanda seru dipakai hemat — TTS menaikkan energi
  cukup banyak untuk itu.

**Jeda dan ritme**

- Koma menghasilkan jeda pendek; titik jeda sedang; paragraf baru jeda panjang.
  Manfaatkan itu, jangan mengandalkan tag khusus.
- Jeda dramatis sebelum kalimat kunci diatur di **timing scene** (padding), bukan
  di dalam teks VO.

**Angka dan istilah** — ini penyebab generate ulang nomor satu

- Tulis angka sesuai cara baca: `"seratus milidetik"`, bukan `"100 ms"`.
  Kecuali angka besar yang memang dibaca sebagai angka: `"dua ribu dua puluh enam"`.
- Akronim yang dieja per huruf tulis dengan pemisah: `"H T T P"`, `"S Q L"`,
  `"A P I"`. Yang dibaca sebagai kata biarkan utuh: `"cache"`, `"JSON"`.
- Istilah Inggris di kalimat Indonesia sering salah baca. Kalau hasilnya keliru,
  **tulis fonetik Indonesia** di naskah VO dan simpan bentuk aslinya di kolom
  visual. Contoh: `cache → kesh`, `queue → kyu`, `deadlock → dedlok`,
  `schema → skima`.
- Kumpulkan perbaikan pengucapan di bagian **Kamus pengucapan** naskah supaya
  konsisten antar-episode — dan supaya kesalahan yang sama tidak dibayar dua kali.

**Yang dihindari**

- Tanda kurung — TTS sering membacanya sebagai jeda aneh. Jadikan kalimat terpisah.
- Simbol mentah: `→`, `&`, `%`, `/`. Tulis: "menjadi", "dan", "persen", "atau".
- Emoji dan markdown (`**tebal**`) di dalam teks VO.
- Menyebut nomor scene, timecode, atau instruksi visual di dalam teks VO.

**Audio tag** (hanya `eleven_v3`): `[excited]`, `[whispers]`, dan sejenisnya.
Jangan dipakai di `eleven_multilingual_v2` — tag akan ikut dibaca sebagai teks.

---

## Template `naskah.md`

Salin blok di bawah ke `ideas/<slug>/naskah.md`.

````markdown
---
kode: T01
slug: cara-kerja-index-database
judul_kerja: Kenapa query jadi 1000x lebih cepat dengan index
pilar: P2 · Di Balik Aplikasi
lapis: umum → dev        # umum | umum → dev | dev
status: riset | naskah | vo | komposisi | render | publish
naskah_beku:            # diisi tanggal saat lolos gerbang (docs/04 §5)
karakter_terpakai:      # diisi setelah VO dibuat, untuk kalibrasi biaya
tanggal_target: YYYY-MM-DD
---

# T01 · <Judul kerja>

## Penjelasan 5 tahun  ← WAJIB, ditulis sebelum naskah

> <Maksimal 60 kata. Nol istilah teknis. Kalau blok ini tidak bisa ditulis,
> riset belum selesai — jangan lanjut. Lihat docs/09.>

**Analogi utama:** <satu analogi, dipakai konsisten sepanjang video>
**Titik putus analogi:** <di mana analogi ini berhenti berlaku — WAJIB disebut di VO>

## Satu kalimat bawa-pulang

> <Satu kalimat, bahasa L1, yang harus penonton ingat seminggu kemudian.>

## Naik tangga

| Tangga | Isi |
|---|---|
| L1 anak 5 tahun | ... |
| L2 developer | ... |
| L3 presisi | ... |

## Kamus istilah → L1

Setiap istilah teknis yang muncul di video, beserta kalimat L1 yang
memperkenalkannya di kemunculan pertama.

| Istilah | Kalimat L1 pembuka | Muncul di scene |
|---|---|---|
| index | ... | 012 |

## Sumber

| Klaim / angka | Sumber |
|---|---|
| ... | ... |

## Kamus pengucapan

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| kesh | cache | default TTS baca "kaks" |

---

## Video panjang — T01-L

**Target:** 7–9 menit · ~1.100 kata · 55–90 scene

### Outline babak

| Babak | Tangga | Isi | Perkiraan |
|---|---|---|---|
| 1 Hook | L1 | ... | 0:00–0:15 |
| 2 Kontrak | L1 | ... | 0:15–0:45 |
| 3 Fondasi | L1→L2 | ... | 0:45–2:30 |
| 4 Mekanisme | L2 | ... | 2:30–5:30 |
| 5 Realita | L3 | ... | 5:30–7:00 |
| 6 Rangkuman + CTA | L1 | ... | 7:00–8:00 |

### Scene

| # | Babak | VO | Visual | Motion | Aset |
|---|---|---|---|---|---|
| 001 | 1 Hook | Query yang sama. Satu jalan sepuluh detik, satu jalan tiga milidetik. | Dua panel gelap berdampingan, angka besar Mono 800 di masing-masing. | Counter naik ke 10.000 ms di kiri; kanan berhenti di 3 ms lalu pulse hijau. | — |
| 002 | 1 Hook | Bedanya bukan mesinnya. Bedanya cara data itu dicari. | Panel menyatu jadi satu, teks judul masuk dari bawah. | fade + y 24→0, power3.out | — |

### Timing — estimasi *(langkah 3, gratis)*

Keluaran `node --env-file=.env tools/estimate-timing.mjs`. Dipakai untuk
membangun komposisi bisu.

| # | kata | estimasi VO | data-duration | data-start |
|---|---|---|---|---|
| 001 | 15 | 6.43 | 6.83 | 0.00 |

### Timing — final *(langkah 7, setelah VO jadi)*

Keluaran `node --env-file=.env tools/vo-durations.mjs`. **Ini yang dipakai di
render final.**

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|
| 001 | vo/L-001.mp3 | 4.20 | 4.60 | 0.00 |

---

## Short 1 — T01-S1 · “Nugget”

**Insight yang diambil:** <satu insight utuh, berdiri sendiri>
**Target:** 40–60 dtk · ~110 kata · 8–14 scene · tangga L1 (+ sedikit L2)

| # | Beat | VO | Teks layar | Visual | Motion |
|---|---|---|---|---|---|
| 001 | Hook | ... | ... | ... | ... |

### Timing — estimasi

| # | kata | estimasi VO | data-duration | data-start |
|---|---|---|---|---|

### Timing — final

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 2 — T01-S2 · “Jebakan”

**Mitos yang dibantah:** <pernyataan yang banyak dipercaya tapi salah>
**Target:** 40–60 dtk · ~110 kata · 8–14 scene · tangga L1 (+ sedikit L2)

| # | Beat | VO | Teks layar | Visual | Motion |
|---|---|---|---|---|---|
| 001 | Mitos | ... | ... | ... | ... |

### Timing — estimasi

| # | kata | estimasi VO | data-duration | data-start |
|---|---|---|---|---|

### Timing — final

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Metadata publish

Diisi menjelang unggah, lalu disalin ke `render/publish.md`. Lihat docs/06.
````

> **Catatan format:** `tools/estimate-timing.mjs` mengenali tabel scene dari
> kolom yang berjudul **persis `VO`**, dan nomor scene di kolom pertama. Jangan
> mengganti judul kolom itu — tabel timing memakai judul lain (`Berkas VO`,
> `Durasi VO`) supaya tidak ikut terbaca.

---

## Contoh terisi (potongan)

Tiga scene pembuka video panjang untuk topik *"Kenapa query jadi 1000× lebih
cepat dengan index"*.

| # | Babak | VO | Visual | Motion |
|---|---|---|---|---|
| 001 | 1 Hook | Query yang sama, tabel yang sama. Satu selesai dalam sepuluh detik, satu dalam tiga milidetik. | Layar dibagi dua. Kiri: label `TANPA INDEX`, angka Mono 800 120px. Kanan: `DENGAN INDEX`, angka hijau. | Counter kiri naik 0→10.000 dalam 2 dtk (`power2.out`); kanan berhenti di 3, pulse `--ok`. |
| 002 | 1 Hook | Mesin databasenya sama persis. Yang berbeda cuma satu hal: cara barisnya dicari. | Dua panel menyatu jadi satu panel gelap; judul masuk dari bawah. | `y 24→0` + fade, `power3.out`, 0.2 dtk setelah scene mulai. |
| 003 | 2 Kontrak | Delapan menit ke depan kamu akan tahu persis apa yang terjadi di dalam. Kenapa index bisa secepat itu, dan kenapa kadang justru diabaikan. | Peta tiga babak: `B-Tree` → `Jalur query` → `Kapan gagal`. Brand sting 1,5 dtk sebelum peta. | Tiga kartu masuk stagger 0.12 dtk; garis penghubung SVG tergambar `power2.out`. |

**Yang bikin baris-baris ini lolos standar:**

- Kolom VO ≤ 18 kata per kalimat, angka ditulis untuk dibaca ("sepuluh detik",
  bukan "10 dtk").
- Bahasa L1 di babak Hook — tidak ada satu pun istilah teknis di scene 001–002.
- Kolom visual menyebut posisi, ukuran, dan warna konkret.
- Kolom motion menyebut properti + durasi + ease yang bisa langsung diterjemahkan
  ke GSAP tanpa menebak.
