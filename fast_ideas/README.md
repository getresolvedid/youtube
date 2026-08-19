# fast_ideas/ — jalur cepat, direction datang dari user

Sama seperti [`ideas/`](../ideas/): satu topik, satu folder, seluruh produksinya
hidup di dalamnya. Yang berbeda **cuma titik masuknya** — di sini direction
tidak ditulis dari nol, melainkan **diunggah user**, dan tiga fase sesudahnya
mengikuti dari situ.

```
fase 1  direction masuk   ← user mengunggah; Claude memecahnya jadi berkas per scene
fase 2  bangun thumbnail  ← brief + kartunya, dari direction yang sudah beku
fase 3  bangun video      ← naskah.md, scenes/*.tsx, VO menyusul, render
```

Bandingkan dengan lima fase `ideas/` di [CLAUDE.md](../CLAUDE.md#fase-kerja-satu-topik):
di sana thumbnail didahulukan justru untuk **menyaring** apakah topiknya punya
ketegangan, dan direction lahir belakangan sebagai turunan naskah. Di sini
urutannya berbalik karena penyaringan itu **sudah terjadi di kepala user**
sebelum berkasnya diunggah. Yang tidak berbalik: direction tetap yang mengikat
komposisi, tidak pernah sebaliknya (HARD RULE 3).

## Bentuk folder

```
fast_ideas/<slug>/
├── direction-masuk/   ← fase 1: unggahan user APA ADANYA, format bebas
├── naskah.md          ← fase 1: tabel scene (urutan tayang) + kamus pengucapan
├── thumbnail.md       ← fase 2: ketegangan + pola + ≤ 4 kata
├── thumb.tsx          ← fase 2: kartunya
├── scenes/            ← <kunci>-direction.md + <kunci>-vo.md + <kunci>.tsx
├── Episode.tsx        ← hanya merangkai, lewat <Sequence>
├── scene-shorts/      ← kalau topiknya sampai ke Shorts
└── render/            ← MP4 + thumbnail + publish.md
```

**`direction-masuk/` tidak pernah disunting.** Ia arsip mentah: apa yang
sebenarnya diminta user, sebelum ditafsirkan. Begitu ia ikut dirapikan, tidak
ada lagi tempat untuk memeriksa apakah tafsirnya meleset.

## Fase 1 — direction masuk

User menaruh berkasnya di `direction-masuk/` — storyboard, catatan, gambar,
tempelan chat, apa pun bentuknya. Claude mengerjakan **dua** hal, dan tidak
lebih:

1. **Tabel `### Scene` di `naskah.md`** — id, bagian flow, ringkasan satu baris.
   Urutan barisnya **adalah** urutan tayang (HARD RULE 5).
2. **`scenes/<kunci>-direction.md`** per scene — dipecah dari unggahan, satu
   berkas per scene, nama identik dengan `.tsx`-nya nanti.

**Yang dilarang di fase ini: menambah gagasan.** Direction yang diunggah adalah
keputusan yang sudah diambil; memecahnya jadi berkas per scene adalah pekerjaan
menata, bukan menulis. Kalau ada scene yang terasa bolong, **tanyakan ke user**
dan tulis jawabannya ke berkas direction-nya — jangan diisi sendiri lalu
diam-diam jadi kanon.

Kalau unggahannya tidak menyebut sebuah beat sama sekali, berkas direction-nya
tetap dibuat dengan bagian yang kosong ditandai `TODO:` — supaya `npm run sisa`
punya sesuatu untuk dilaporkan, bukan supaya ditebak.

## Fase 2 — bangun thumbnail

`thumbnail.md` dulu (ketegangan, pola, ≤ 4 kata — [docs/06 § Thumbnail](../docs/06-publishing.md#thumbnail)),
lalu `thumb.tsx`.

Di `ideas/` kartunya baru dibangun di fase 4 karena figurnya wajib **komponen
yang sama persis** dengan scene-nya, dan komponen itu belum lahir. Di sini
larangan yang sama tetap berlaku, tapi bisa dipenuhi lebih awal: direction sudah
beku sejak fase 1, jadi figur yang dijanjikan kartunya sudah tertulis. Cara
memenuhinya:

- **Figur thumbnail lahir sebagai komponen topik**, di `fast_ideas/<slug>/figur-*.tsx`
  atau [`shared/figures/`](../shared/figures/) — bukan di dalam `thumb.tsx`.
- **Scene fase 3 mengimpor komponen itu**, tidak menggambar ulang yang mirip.
  Yang dilarang docs/06 adalah thumbnail yang menjanjikan gambar yang tidak ada
  di videonya, dan dua gambar mirip yang digambar terpisah akan berbeda dalam
  seminggu.

Judul & deskripsi tetap belakangan (fase 3), dengan alasan yang sama seperti di
`ideas/`: thumbnail cuma punya empat kata dan tidak bisa mengelak, judul punya
enam puluh karakter untuk menghindari kata yang sudah terpakai.

## Fase 3 — bangun video

Turunan biasa: `scenes/<kunci>.tsx` dari direction-nya, `scenes/index.ts`,
`Episode.tsx`, pendaftaran di [`src/Root.tsx`](../src/Root.tsx), lalu
`npm run gen` → `check` → `sisa` → `tumpang` → `jahit` → render.

**VO menyusul, dan itu disengaja.** Timing scene dihitung dari
`scenes/<kunci>-vo.md`; selama blok `## VO`-nya belum ada, durasinya memakai
`VO_PLACEHOLDER_SECONDS` dan `npm run sisa` menyebutkannya satu per satu. Video
bisu dengan subtitel preview sudah cukup untuk memeriksa gambarnya —
generate VO tetap paling akhir, sekali jalan ([docs/11](../docs/11-rencana-vo.md)).

## Yang tetap berlaku, tanpa kecuali

Seluruh **HARD RULE 1–7** di [CLAUDE.md](../CLAUDE.md#hard-rule--jangan-pernah-dilanggar)
berlaku persis sama di sini — satu scene satu berkas, tidak ada scene yang
isinya cuma teks, direction → komposisi, rencana VO sebagai sumber teks VO,
penomoran ulang saat menyisipkan scene, undangan sebelum nama, dan setiap
sambungan dijembatani di VO.

Yang **tidak** berlaku cuma dua, dan keduanya soal gerbang masuk:

- **Tidak ada `ide.md` dan tidak ada uji 4 syarat.** Topik di sini tidak melamar
  masuk; ia sudah dipesan.
- **Direction ditulis user, bukan Claude.** Revisi tetap lewat chat dan tetap
  **Claude yang menuliskannya balik ke berkasnya** — direction yang cuma hidup
  di riwayat chat tetap dilarang.

**Kode topik `T{nn}` tetap dipakai**, walaupun tidak lewat
[docs/07](../docs/07-backlog-topik.md). Bukan urusan administrasi: id komposisi
Remotion berprefiks kode itu (`t19-05-…`), dan `99-closing` ada di **setiap**
episode — dua komposisi dengan id sama ditolak Remotion saat **render**, bukan
saat `tsc`. Ambil nomor berikutnya yang belum pernah terpakai; nomor yang sudah
mati (dibatalkan atau sudah tayang) tidak pernah dipakai ulang.

## Bagaimana perkakasnya menemukan folder ini

Sudah tersambung, sejak topik cepat pertama sampai ke fase 3 (2026-08-18).
`npm run gen`, `sisa`, `tumpang`, `jahit`, dan skrip VO membaca `fast_ideas/`
maupun `ideas/` lewat **satu** resolver — [`tools/lokasi.mjs`](../tools/lokasi.mjs),
bukan salinan skrip yang kedua:

- **`dirTopik(slug)`** mencari slug di `fast_ideas/` lalu `ideas/`, dan
  **menolak** slug yang ada di keduanya. Satu slug di dua akar berarti dua
  naskah yang akan berbeda diam-diam.
- **`punyaEpisode(slug)`** menjawab apakah topiknya punya video panjang, dari
  keberadaan folder `scenes/` — pola yang sama dengan `daftarShort()`, yang
  membaca subfolder alih-alih daftar yang ditulis tangan. Seri Shorts (satu
  episode satu Short) memang tidak punya, dan sebelum ini seluruh perkakas
  berhenti di pesan tentang "bagian 1 (question)" yang tidak ada hubungannya
  dengan sebabnya.
- **`npm run tumpang`/`jahit` tanpa `--short` menjalankan diri sendiri sekali
  per Short** di topik seperti itu. Daftarnya dari isi folder `scene-shorts/`,
  bukan dari daftar di `package.json` — daftar kedua meleset satu hari setelah
  Short kelima lahir.

Yang masih hidup di `package.json` per topik: baris `gen`, `sisa`, `jahit:semua`,
`tumpang:semua`, dan skrip render — sama seperti topik di `ideas/`.

## Template `naskah.md`

Salin ke `fast_ideas/<slug>/naskah.md`:

```markdown
---
kode: T{nn}
judul:
sumber_direction: direction-masuk/<berkas>   # unggahan yang jadi dasarnya
diunggah: YYYY-MM-DD
naskah_beku:        # tanggal; diisi saat VO boleh digenerate
---

# <Judul>

## Ringkas

> <Satu paragraf: topiknya apa, dan apa yang penonton lihat bergerak.>

## Penjelasan 5 tahun

> <≤ 60 kata, nol istilah teknis.>

### Scene

| id | bagian | ringkas |
|---|---|---|
| hook-question | 1 question | <satu baris> |
| … | | |

## Kamus pengucapan

| tertulis | dibaca |
|---|---|

## Sumber

## Catatan
```

## Template `<kunci>-direction.md`

```markdown
# <kunci> — <ringkas>

**Frame pertama = frame terakhir scene sebelumnya.** <apa yang dipegang>

## Di layar

- <benda, tempatnya, dan apa yang berubah>

## Gerak

- <detik ke berapa apa terjadi — beat, bukan angka frame>

## Dari unggahan

> <kutipan mentah dari direction-masuk/, apa adanya>

## Catatan
```
