# CLAUDE.md

Panduan untuk Claude Code saat bekerja di repo ini.

## Tujuan repo

Produksi konten YouTube edukasi **teknologi / coding / engineering** berbahasa
Indonesia. Bukan codebase aplikasi — isinya guideline, naskah, komposisi
[Remotion](https://remotion.dev), dan aset render. Mulai dari [README.md](README.md).

## HARD RULE — jangan pernah dilanggar

### 1. Satu scene = satu berkas, di `ideas/<slug>/scenes/`

**Dilarang menaruh seluruh scene sebuah episode dalam satu berkas.**
Setiap scene jadi berkas sendiri:

```
ideas/<slug>/scenes/s001.tsx
ideas/<slug>/scenes/s002.tsx
ideas/<slug>/scenes/index.ts   ← daftar SCENES: id → komponen
ideas/<slug>/Episode.tsx       ← hanya merangkai, lewat <Sequence>
```

Alasannya:

- **Bisa di-preview satu per satu.** Setiap scene otomatis jadi komposisi
  sendiri di Studio (`src/Root.tsx`), jadi
  `npx remotion still s-s042 out/s042.png` cukup — tanpa scrubbing enam menit
  untuk memeriksa satu scene.
- **Menahan diri dari melantur.** Satu berkas 83 scene bikin tiap scene ditulis
  sambil lalu. Satu berkas per scene memaksa tiap scene berdiri sendiri.

`Episode.tsx` hanya memetakan timing → komponen. Tidak ada isi scene di sana.

**Nama berkas boleh semantik.** `s001.tsx` untuk scene yang mengikuti nomor
naskah; `hook-question.tsx` untuk scene yang menggabungkan beberapa shot.
Kolom pertama tabel scene di `naskah.md` adalah ID-nya — nomor atau nama,
keduanya sah — dan itu yang jadi kunci di `SCENES`.

**Beberapa shot yang satu beat digabung jadi satu scene.** Hook T01 dulu tiga
scene (001–003) yang isinya satu pertanyaan yang sama; sekarang satu scene tiga
tahap. Pecah berkas itu soal bisa di-preview, bukan alasan memotong satu gagasan
jadi tiga potong yang saling menunggu.

**Opening & closing tidak didaftarkan di `SCENES`.** Keduanya milik `shared/`
([docs/10](docs/10-scene-standar.md)) supaya semua episode identik.

**`check` lulus bukan bukti gambarnya ada.** Di versi HyperFrames repo ini
pernah kehilangan waktu karena panggung setinggi 0 membuat seluruh episode
render hitam polos sementara semua pemeriksaan lulus — tidak ada yang salah,
hanya tidak ada yang terlihat. `<AbsoluteFill>` menutup penyebab spesifik itu,
tapi kelasnya tidak hilang: font gagal muat, aset salah path, teks sewarna
latar. `npm run check` menjalankan `tools/periksa-frame.mjs` yang membuktikan
frame-nya ada isinya, tapi itu smoke test — **tetap render still dan lihat
sendiri** sebelum menyatakan selesai.

### 2. Tidak ada scene yang isinya cuma teks

Setiap scene wajib punya elemen visual: ikon, figur, diagram, ilustrasi, grafik,
atau animasi bentuk. Teks berdiri sendiri di layar penuh = scene itu belum
selesai, bukan pilihan gaya.

Alasannya: ini channel yang menjanjikan penonton **melihat mekanismenya**, bukan
membaca istilahnya. Layar penuh teks adalah slide presentasi, dan penonton
YouTube menutup slide.

Cara memenuhinya:

- Set ikon ada di [`shared/Icons.tsx`](shared/Icons.tsx) — sprite SVG inline,
  dipakai dengan `<Ic n="ram" />` / `<Ic n="chip" ukuran="lg" warna="c-accent" />`.
- Kosakata figur bersama ada di [`shared/figur.css`](shared/figur.css): sumbu
  berlabel, bar pembanding, piramida, kisi sel, tabel spesifikasi, figur
  meja/lemari. Pakai itu dulu sebelum menggambar dari nol.
- Kalau tidak ada ikon yang pas, **buat figur/diagramnya**, atau tambahkan ikon
  baru ke `shared/Icons.tsx` supaya episode lain ikut kebagian.
- Logo getresolved **tetap terbatas** di brand sting dan end card
  ([docs/10](docs/10-scene-standar.md)) — jangan menaburkannya sebagai pengisi.
- Detail ukuran, warna, dan penempatan: [docs/03 § Ikon & figur](docs/03-tema-visual.md#ikon--figur).

## Aturan kerja

- **Balas dalam Bahasa Indonesia** — user berkomunikasi dalam Bahasa Indonesia informal.
- **Guideline adalah kontrak.** Sebelum menulis naskah atau komposisi, baca dokumen
  yang relevan di [`docs/`](docs/). Kalau sebuah keputusan bertentangan dengan
  guideline, ubah guideline-nya dulu secara eksplisit — jangan diam-diam menyimpang.
- **Semua ide posting masuk ke [`ideas/`](ideas/)**, satu berkas per ide, sebelum
  jadi apa pun. Yang lolos 4 syarat naik ke [`docs/07`](docs/07-backlog-topik.md)
  dan dapat kode `T{nn}`; ide yang ditolak tetap disimpan beserta alasannya.
  Jangan menulis ide baru langsung ke backlog.
- **Satu topik = 1 video panjang + 2 Shorts.** Jangan kirim topik setengah jadi.
  Shorts diturunkan dari topik yang sama, tapi **hook-nya ditulis ulang**, bukan
  potongan mentah video panjang.
- **Akurasi teknis di atas gaya.** Ini konten edukasi; klaim yang salah lebih mahal
  daripada video yang kurang keren. Kalau sebuah angka (benchmark, kompleksitas,
  versi, perilaku API) tidak bisa diverifikasi, jangan sebutkan — atau sebutkan
  dengan sumbernya di `naskah.md`. Setiap klaim angka wajib punya baris `sumber:`.
- **Jangan mengarang API.** Remotion, ElevenLabs, dan flag CLI-nya sudah
  didokumentasikan di [docs/04-pipeline-produksi.md](docs/04-pipeline-produksi.md).
  Kalau butuh perilaku yang tidak tercatat di sana, cek dokumentasi resminya dulu
  ([remotion.dev/docs](https://www.remotion.dev/docs)), lalu perbarui dokumen itu.
- **Naskah hidup di `naskah.md`,** bukan hanya di chat. Komposisi adalah
  *turunan* dari naskah — kalau VO berubah, ubah `naskah.md` dulu lalu
  `npm run gen`. Timing tidak pernah disunting tangan.
- **Semua secret & konfigurasi ada di `.env`.** Jangan menulis API key, voice ID,
  atau angka setelan produksi (resolusi, padding VO, track index, LUFS) langsung
  di skrip, komposisi, atau dokumen — baca dari `.env`. Variabel baru wajib ikut
  ditambahkan ke `.env.example` dengan nilai kosong. Aturan lengkap:
  [docs/08-konfigurasi.md](docs/08-konfigurasi.md).
- **Deterministik.** Setiap nilai animasi wajib jadi **fungsi murni dari frame**
  — pakai `useDetik()` + helper di [`shared/anim.ts`](shared/anim.ts). Dilarang
  `Math.random()`, `Date.now()`, `setInterval`, `useState` untuk animasi, atau
  apa pun yang bergantung pada frame sebelumnya. Remotion merender frame 1.234
  tanpa pernah merender 1.233; yang menyimpan state akan pecah saat seek dan
  saat render paralel.
- **Bahasa anak 5 tahun dulu.** Setiap topik wajib punya blok "Penjelasan 5 tahun"
  ≤ 60 kata tanpa istilah teknis sebelum naskah ditulis; istilah teknis tidak
  boleh muncul sebelum benda yang diwakilinya sudah digambarkan.
  → [docs/09](docs/09-tangga-abstraksi.md).
- **VO paling akhir, sekali jalan.** ElevenLabs dibayar per karakter. Bangun
  komposisi bisu dengan timing perkiraan (`tools/estimate-timing.mjs`), cocokkan
  naskah dengan visual, bekukan naskah, **baru** generate VO.
  → [docs/04 §5](docs/04-pipeline-produksi.md#5-gerbang--bekukan-naskah).
- **Opening & closing tidak dibuat ulang.** Pakai `<BrandSting/>` dan
  `<EndCard/>` dari [`shared/StandarScenes.tsx`](shared/StandarScenes.tsx) apa
  adanya; kalau koreografinya perlu berubah, ubah di `shared/` untuk semua
  episode. → [docs/10](docs/10-scene-standar.md).

## Yang tidak perlu dilakukan

- Jangan bikin build system, CI, atau lint config sebelum benar-benar dibutuhkan.
- Jangan menaruh API key di berkas mana pun selain `.env` — termasuk di dokumen,
  pesan commit, dan potongan kode di chat. `.env` dikunci `.gitignore` **dan**
  hook `pre-commit`; jangan pernah menembusnya dengan `--no-verify`.
- Jangan commit MP4/WAV besar tanpa diminta — `render/` dan `vo/` sudah di-ignore.
- Jangan bikin intro bumper panjang, musik latar dominan, atau efek transisi di
  setiap potongan. Alasannya ada di [docs/02](docs/02-format-video.md) dan [docs/03](docs/03-tema-visual.md).

## Perintah yang dipakai

```powershell
npm run gen        # .env → shared/config.gen.ts, naskah.md → timing.gen.ts
npm run check      # tsc + bukti frame tidak kosong (tools/periksa-frame.mjs)
npm run sisa       # berapa scene yang masih placeholder
npm run studio     # Remotion Studio — server panjang, jalankan di background
npm run render     # episode utuh → out/

# satu scene saja — inilah gunanya HARD RULE 1
npx remotion still  s-s042 out/s042.png
npx remotion render s-s042 out/s042.mp4

# VO & timing
. .\tools\load-env.ps1                      # muat .env ke sesi PowerShell
node tools/elevenlabs-keys.mjs status       # cek / rotasi API key ElevenLabs
node --env-file=.env tools/estimate-timing.mjs ideas/<slug>/naskah.md
node --env-file=.env tools/vo-durations.mjs ideas/<slug>/vo L
```

`gen` dijalankan otomatis lewat npm pre-script sebelum `studio`, `render`,
`check`, dan `sisa` — tidak perlu diingat, tapi perlu diketahui kenapa
`shared/config.gen.ts` dan `ideas/*/timing.gen.ts` tidak ada di git: keduanya
turunan `.env` dan `naskah.md`, dan meng-commit-nya berarti dua sumber kebenaran.

**Episode yang sedang digarap didaftarkan di [`src/Root.tsx`](src/Root.tsx).**
Setiap scene otomatis dapat komposisinya sendiri (`s-<id>`) di samping episode
utuhnya. Setelah satu episode selesai dan diunggah, biarkan pendaftarannya —
Remotion tidak keberatan punya banyak komposisi, dan episode lama tetap bisa
dirender ulang.

**Jangan render MP4 final selama `npm run sisa` masih melaporkan placeholder.**
Scene yang belum dibuat tampil sebagai kartu kuning bergaris, bukan layar hitam,
justru supaya tidak lolos tanpa disadari.

Belum ada `npm test` di repo ini — jangan mengarang perintah.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## graphify — catatan repo ini

Bagian `## graphify` di atas **digenerate** oleh `graphify claude install` dan
ditimpa ulang setiap kali dipasang lagi. Catatan khusus repo ini ditaruh di sini,
di bawahnya, supaya tidak ikut hilang.

**Yang perlu dikoreksi dari bagian generate itu:** repo ini **bukan codebase
biasa.** Isinya dokumen guideline, naskah, dan komposisi video. Karena itu:

- **`graphify update .` sekarang lebih berguna daripada dulu** — sejak pindah ke
  Remotion, `shared/*.tsx`, `src/`, dan `ideas/*/scenes/*.tsx` punya graf impor
  sungguhan yang bisa dibaca AST. Jalankan setelah menyunting komposisi.
- Tapi relasi yang paling bernilai di repo ini tetap **bukan impor**:
  `flow.md` → `docs/02` → `ideas/<slug>/naskah.md` → `Episode.tsx`,
  aturan `docs/03` → `shared/theme.css` + `shared/Icons.tsx`,
  `ide.md` → backlog `docs/07`.
  Relasi seperti itu hanya tertangkap ekstraksi doc-aware:

  ```powershell
  graphify extract . --backend claude-cli
  ```

- Jalankan ulang ekstraksi itu setelah **guideline atau naskah** berubah;
  `graphify update .` yang murah cukup untuk perubahan komposisi.
- `graphify-out/` di-ignore git (lihat `.gitignore`), sama seperti di
  `getresolved/` dan `apps/justmart/`.
