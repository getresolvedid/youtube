# CLAUDE.md

Panduan untuk Claude Code saat bekerja di repo ini.

## Tujuan repo

Produksi konten YouTube edukasi **teknologi / coding / engineering** berbahasa
Indonesia. Bukan codebase aplikasi — isinya guideline, naskah, komposisi
HyperFrames, dan aset render. Mulai dari [README.md](README.md).

## HARD RULE — jangan pernah dilanggar

**Tidak ada scene yang isinya cuma teks.** Setiap scene wajib punya elemen
visual: ikon, figur, diagram, ilustrasi, grafik, atau animasi bentuk. Teks
berdiri sendiri di layar penuh = scene itu belum selesai, bukan pilihan gaya.

Alasannya: ini channel yang menjanjikan penonton **melihat mekanismenya**, bukan
membaca istilahnya. Layar penuh teks adalah slide presentasi, dan penonton
YouTube menutup slide.

Cara memenuhinya:

- Set ikon ada di [`shared/icons.js`](shared/icons.js) — sprite SVG inline,
  dipakai dengan `<svg class="ic"><use href="#ic-ram"/></svg>`.
- Kalau tidak ada ikon yang pas, **buat figur/diagramnya**, atau tambahkan ikon
  baru ke `shared/icons.js` supaya episode lain ikut kebagian.
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
- **Jangan mengarang API.** HyperFrames, ElevenLabs, dan flag CLI-nya sudah
  didokumentasikan di [docs/04-pipeline-produksi.md](docs/04-pipeline-produksi.md).
  Kalau butuh perilaku yang tidak tercatat di sana, cek dokumentasi resminya dulu,
  lalu perbarui dokumen itu.
- **Naskah hidup di `naskah.md`,** bukan hanya di chat. Komposisi HTML adalah
  *turunan* dari naskah — kalau VO berubah, ubah `naskah.md` dulu.
- **Semua secret & konfigurasi ada di `.env`.** Jangan menulis API key, voice ID,
  atau angka setelan produksi (resolusi, padding VO, track index, LUFS) langsung
  di skrip, komposisi, atau dokumen — baca dari `.env`. Variabel baru wajib ikut
  ditambahkan ke `.env.example` dengan nilai kosong. Aturan lengkap:
  [docs/08-konfigurasi.md](docs/08-konfigurasi.md).
- **Deterministik.** Komposisi HyperFrames dilarang memakai `Math.random()`,
  `Date.now()`, `setInterval`, atau `repeat: -1` — render harus reproducible.
- **Bahasa anak 5 tahun dulu.** Setiap topik wajib punya blok "Penjelasan 5 tahun"
  ≤ 60 kata tanpa istilah teknis sebelum naskah ditulis; istilah teknis tidak
  boleh muncul sebelum benda yang diwakilinya sudah digambarkan.
  → [docs/09](docs/09-tangga-abstraksi.md).
- **VO paling akhir, sekali jalan.** ElevenLabs dibayar per karakter. Bangun
  komposisi bisu dengan timing perkiraan (`tools/estimate-timing.mjs`), cocokkan
  naskah dengan visual, bekukan naskah, **baru** generate VO.
  → [docs/04 §5](docs/04-pipeline-produksi.md#5-gerbang--bekukan-naskah).
- **Opening & closing tidak dibuat ulang.** Pakai `shared/scenes.*` apa adanya;
  kalau koreografinya perlu berubah, ubah di `shared/` untuk semua episode.
  → [docs/10](docs/10-scene-standar.md).

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
. .\tools\load-env.ps1                      # muat .env dulu (perhatikan titik di depan)
node tools/elevenlabs-keys.mjs status       # cek / rotasi API key ElevenLabs
node --env-file=.env tools/estimate-timing.mjs ideas/<slug>/naskah.md
node --env-file=.env tools/vo-durations.mjs ideas/<slug>/vo L

npm run check                               # lint + runtime + layout + motion + kontras
npm run dev                                 # Studio — server panjang, jalankan di background
npx hyperframes render -o ideas/<slug>/render/T01-L.mp4          # index.html = episode aktif
npx hyperframes render -c compositions/uji-scene-standar.html -o render/uji-scene-standar.mp4
```

**Repo ini adalah satu project HyperFrames** — root-nya di akar repo. Jangan
`npx hyperframes init` lagi per episode, dan jangan menulis path aset dengan
`../` (ditolak lint).

**Episode yang sedang digarap selalu di `index.html`.** `check`, `lint`, `dev`,
dan `render` tanpa `-c` semuanya bekerja pada berkas itu; komposisi yang disimpan
di `compositions/` tidak tersentuh gerbang QA. Setelah episode selesai,
pindahkan ke `compositions/T{nn}-*.html` dan isi `index.html` dengan episode
berikutnya.

Aturan framework-nya ada di [AGENTS.md](AGENTS.md); **selalu `npm run check`
setelah menyunting komposisi.**

Belum ada `npm test` / `make build` di repo ini — jangan mengarang perintah.

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

**Yang perlu dikoreksi dari bagian generate itu:** repo ini **bukan codebase.**
Isinya dokumen guideline, naskah, dan satu komposisi HTML. Karena itu:

- **`graphify update .` hampir tidak berguna di sini.** Ia AST-only, jadi yang
  terlihat cuma `tools/*.mjs` — bagian yang paling tidak butuh peta.
- Relasi yang bernilai di repo ini semuanya **bukan import**:
  `flow.md` → `docs/02` → `ideas/<slug>/naskah.md` → `index.html`,
  aturan `docs/03` → `shared/theme.css` + `shared/icons.js`,
  `ide.md` → backlog `docs/07`.
  Relasi seperti itu hanya tertangkap ekstraksi doc-aware:

  ```powershell
  graphify extract . --backend claude-cli
  ```

- Jalankan ulang ekstraksi itu setelah **guideline atau naskah** berubah —
  bukan setelah menyunting komposisi. Yang bergerak di repo ini adalah aturan
  dan naskah, bukan kode.
- `graphify-out/` di-ignore git (lihat `.gitignore`), sama seperti di
  `getresolved/` dan `apps/justmart/`.
