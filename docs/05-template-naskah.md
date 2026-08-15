# 05 · Template Naskah

`naskah.md` adalah **sumber kebenaran satu topik**: penjelasan L1, tangga
abstraksi, kamus istilah, sumber fakta, dan **daftar scene** — scene apa saja,
urutannya, dan di bagian flow mana.

Yang **tidak** ada di sini:

| Yang mana | Di mana | Aturan |
|---|---|---|
| Teks VO tiap scene | `scenes/<kunci>-vo.md` | [11 · Rencana VO](11-rencana-vo.md) · HARD RULE 4 |
| Apa yang terjadi di layar | `scenes/<kunci>-direction.md` | HARD RULE 3 |

Dulu ketiganya berdesakan di satu tabel, satu sel per scene. Sel tabel tidak
punya tempat untuk alasan — kenapa kata ini bukan kata itu, kenapa kartunya masuk
dari kiri — dan alasan yang tidak punya tempat akan hilang. Naskah sekarang
menjawab "ada scene apa saja", dua berkas di sebelah scene-nya menjawab "isinya
apa".

Naskah juga yang menentukan biaya: VO baru dibuat setelah naskah **beku**
([pipeline §5](04-pipeline-produksi.md#5-gerbang--bekukan-naskah)).

> **Aturan menulis VO untuk TTS** (batas 18 kata, angka ditulis sesuai
> cara baca, akronim dipisah, tanpa tanda kurung) pindah ke
> [11 · Rencana VO](11-rencana-vo.md#aturan-menulis-vo-untuk-tts) —
> di sanalah kalimatnya sekarang ditulis.

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
naskah_beku:            # tanggal per keluaran saat lolos gerbang (docs/04 §5)
  L:                    #   video panjang
  S1:                   #   Short 1
  S2:                   #   Short 2
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

| # | Bagian | Tangga | Isi | Perkiraan |
|---|---|---|---|---|
| 1 | [question] | L1 | ... | 0:00–0:20 |
| 2 | brand opening | — | scene standar 4,0 dtk (kartu judul) | |
| 3 | [problem] | L1 | ... | 0:22–1:22 |
| 4 | [answer] → [what] | L1→L2 | ... | 1:22–2:07 |
| 5 | [why] | L2 | ... | 2:07–3:32 |
| 6 | [explaining] | L2→L3 | ... | 3:32–6:02 |
| 7 | [case] | L3 | ... | 6:02–7:07 |

### Scene

Daftar isi episode. Teks VO tiap scene ada di `scenes/<kunci>-vo.md`, apa yang
terjadi di layar di `scenes/<kunci>-direction.md`.

| # | Bagian | Ringkas |
|---|---|---|
| 001 | 1 question | Query yang sama, satu sepuluh detik satu tiga milidetik. Bedanya bukan mesinnya. |
| 002 | 3 problem | Tanpa index, setiap baris harus dilihat satu per satu. |

### Timing — estimasi *(langkah 3, gratis)*

Keluaran `node --env-file=.env tools/estimate-timing.mjs <slug>`. Dipakai untuk
membangun komposisi bisu. Opening & closing sudah ikut terhitung.

| # | kunci | kata | durasi | mulai |
|---|---|---|---|---|
| 1 | 1-s001 | 15 | 6.83 | 0.00 |

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

| # | Bagian | Ringkas |
|---|---|---|
| 001 | Hook | ... |

### Timing — estimasi

| # | kunci | kata | durasi | mulai |
|---|---|---|---|---|

### Timing — final

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 2 — T01-S2 · “Jebakan”

**Mitos yang dibantah:** <pernyataan yang banyak dipercaya tapi salah>
**Target:** 40–60 dtk · ~110 kata · 8–14 scene · tangga L1 (+ sedikit L2)

| # | Bagian | Ringkas |
|---|---|---|
| 001 | Mitos | ... |

### Timing — estimasi

| # | kunci | kata | durasi | mulai |
|---|---|---|---|---|

### Timing — final

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Metadata publish

**Pindah ke [`render/publish.md`](render/publish.md).** Judul, deskripsi,
chapter, tag, playlist, brief thumbnail, dan jadwal rilis — untuk video panjang
dan kedua Short — ditulis di sana langsung di fase 3, bukan disalin ke sana
belakangan. Lihat docs/06.
````

> **Catatan format:** `tools/baca-episode.mjs` mengenali tabel scene dari kolom
> berjudul **persis `Bagian`** di bawah heading `### Scene`, dengan id scene di
> kolom pertama (nomor `004` → `s004`, atau nama `hook-question`). Jangan
> mengganti judul kolom itu — tabel timing memakai judul lain supaya tidak ikut
> terbaca.
>
> **Shorts ikut dihitung.** Tabel `### Scene` di bawah `## Short 1` dan
> `## Short 2` dibaca dengan aturan yang sama persis (kolom berjudul `Bagian`,
> id di kolom pertama), dan tiap Short dapat `timing.gen.ts` sendiri di
> `ideas/<slug>/scene-shorts/<short>/`. Penomorannya mulai `01` lagi di tiap
> subfolder, closing tetap dipatok 99, dan opening tidak ada sama sekali —
> [02 § Di mana berkasnya](02-format-video.md#di-mana-berkasnya).

---

## Contoh terisi (potongan)

Dua scene pembuka video panjang untuk topik *"Kenapa query jadi 1000× lebih cepat
dengan index"* — **tiga berkas**, bukan satu baris tabel.

`naskah.md` cuma mendaftar:

| # | Bagian | Ringkas |
|---|---|---|
| 001 | 1 question | Query yang sama, tabel yang sama, satu seribu kali lebih lambat. |
| 002 | 1 question | Mesin databasenya identik; yang berbeda cuma cara barisnya dicari. |

`scenes/1-s001-vo.md` yang memegang kalimatnya:

```markdown
## VO

Query yang sama, tabel yang sama.
Satu selesai dalam sepuluh detik, satu dalam tiga milidetik.
```

`scenes/1-s001-direction.md` yang memegang layarnya:

```markdown
Layar dibagi dua. Kiri: label TANPA INDEX, angka Mono 800 120px.
Kanan: DENGAN INDEX, angka hijau.

motion:
  - counter kiri naik 0 -> 10.000 dalam 2 dtk, power2.out
  - kanan berhenti di 3, pulse --ok
```

**Yang bikin potongan ini lolos standar:**

- VO ≤ 18 kata per kalimat, angka ditulis untuk dibaca ("sepuluh detik", bukan
  "10 dtk") — [docs/11](11-rencana-vo.md#aturan-menulis-vo-untuk-tts).
- Dua baris VO, dua beat: angka kiri dan angka kanan tidak mendarat bersamaan.
- Bahasa L1 di bagian question — tidak ada satu pun istilah teknis.
- Direction menyebut posisi, ukuran, dan warna konkret, plus properti + durasi +
  ease yang bisa langsung diterjemahkan ke helper di
  [`shared/anim.ts`](../shared/anim.ts) tanpa menebak. Nama ease ditulis dengan
  konvensi GSAP (`power3.out`, `back.out(1.6)`, `expo.out`) — padanannya sudah
  tersedia sebagai `E.power3out`, `E.backOut(1.6)`, `E.expoOut`.
