# CLAUDE.md

Panduan untuk Claude Code saat bekerja di repo ini.

## Tujuan repo

Produksi konten YouTube edukasi **teknologi / coding / engineering** berbahasa
Indonesia. Bukan codebase aplikasi — isinya guideline, naskah, komposisi
[Remotion](https://remotion.dev), dan aset render. Mulai dari [README.md](README.md).

## Fase kerja satu topik

Satu topik dikerjakan dalam lima fase, **berurutan**. Jangan meloncat ke fase
berikutnya selama fase sebelumnya belum tuntas.

1. **Rencanakan thumbnail** — ketegangan topiknya, polanya, dan ≤ 4 katanya,
   ditulis di `ideas/<slug>/thumbnail.md`
   ([docs/06 § Thumbnail](docs/06-publishing.md#thumbnail)). Belum menggambar
   apa pun.
2. **Rencanakan & bangun video panjang** — naskah, rencana VO, direction, dan
   komposisi scene di `ideas/<slug>/scenes/`.
3. **Rencanakan & bangun Shorts** — 4 Short di `ideas/<slug>/scene-shorts/<short>/`,
   hook ditulis ulang dari nol ([docs/02 § Anatomi Shorts](docs/02-format-video.md#anatomi-shorts)).
4. **Rencanakan judul & deskripsi** — untuk video panjang **dan** keempat Short;
   di fase ini juga `thumb.tsx` dan kedua kover Short akhirnya dibangun.
5. **Rilis** — generate VO, render produksi video panjang & Shorts, lalu unggah.

VO berbayar dan render itu mahal waktunya, jadi keduanya baru terjadi di fase 5:
fase 1–4 dikerjakan bisu dengan timing perkiraan
([docs/04 §5](docs/04-pipeline-produksi.md#5-gerbang--bekukan-naskah)).

**Kenapa thumbnail didahulukan padahal ia yang paling belakangan dipakai.**
Karena ia penyaring topik yang paling murah yang kita punya. Topik yang tidak
bisa dijadikan satu kartu yang bikin orang berhenti menggulir hampir selalu
kurang **ketegangan**, bukan kurang desain — dan itu jauh lebih murah diketahui
sekarang daripada setelah delapan puluh scene jadi. Empat syarat di
[docs/07](docs/07-backlog-topik.md) menyaring apakah topiknya layak; fase ini
menyaring apakah topiknya bisa **dijual dalam seperempat detik**.

**Fase 1 mengikat fase 2.** [docs/06](docs/06-publishing.md) melarang thumbnail
menjanjikan gambar yang tidak ada di videonya — CTR naik, retensi turun, dan
YouTube menghitung yang kedua. Selama thumbnail dibuat belakangan, larangan itu
cuma bisa ditegakkan dengan disiplin. Dibuat duluan, ia berbalik jadi pesanan:
gambaran yang ditulis di `thumbnail.md` adalah scene yang **wajib** benar-benar
ada di videonya.

**Judul tetap di fase 4, dan itu disengaja.** docs/06 mensyaratkan judul dan
thumbnail tidak berbagi kata — yang satu menjelaskan, yang satu menarik. Yang
ruangnya paling sempit yang harus dibekukan duluan: thumbnail cuma punya empat
kata dan tidak bisa mengelak, judul punya enam puluh karakter untuk menghindari
kata yang sudah terpakai.

**Yang TIDAK dikerjakan di fase 1: menggambar.** Figur thumbnail wajib komponen
yang sama persis dengan scene-nya (docs/06), dan komponen itu baru lahir di
fase 2. Karena itu `thumb.tsx` dibangun di fase 4, dari `thumbnail.md` —
arahnya satu, sama seperti direction → komposisi (HARD RULE 3).

## HARD RULE — jangan pernah dilanggar

### 1. Satu scene = satu berkas, di `ideas/<slug>/scenes/`

**Dilarang menaruh seluruh scene sebuah episode dalam satu berkas.**
Setiap scene jadi berkas sendiri:

```
ideas/<slug>/scenes/01-hook-question-vo.md         ← rencana VO   (HARD RULE 4)
ideas/<slug>/scenes/01-hook-question-direction.md  ← direction    (HARD RULE 3)
ideas/<slug>/scenes/01-hook-question.tsx           ← komposisi
ideas/<slug>/scenes/index.ts   ← daftar SCENES: id → komponen
ideas/<slug>/Episode.tsx       ← hanya merangkai, lewat <Sequence>
```

Tiga berkas per scene, nama identik. Yang dua di atas ditulis lebih dulu;
`.tsx` adalah turunannya.

Alasannya:

- **Bisa di-preview satu per satu.** Setiap scene otomatis jadi komposisi
  sendiri di Studio (`src/Root.tsx`), jadi
  `npx remotion still 15-s016 out/s016.png` cukup — tanpa scrubbing enam menit
  untuk memeriksa satu scene.
- **Menahan diri dari melantur.** Satu berkas 83 scene bikin tiap scene ditulis
  sambil lalu. Satu berkas per scene memaksa tiap scene berdiri sendiri.

`Episode.tsx` hanya memetakan timing → komponen. Tidak ada isi scene di sana.

**Nama berkas boleh semantik.** `s001.tsx` untuk scene yang mengikuti nomor
naskah; `hook-question.tsx` untuk scene yang menggabungkan beberapa shot.
Kolom pertama tabel scene di `naskah.md` adalah ID-nya — nomor atau nama,
keduanya sah — dan itu yang jadi kunci di `SCENES`.

**Beberapa shot yang satu beat digabung jadi satu scene.** Hook yang dulu tiga
scene berisi satu pertanyaan yang sama lebih baik jadi satu scene tiga tahap.
Pecah berkas itu soal bisa di-preview, bukan alasan memotong satu gagasan jadi
tiga potong yang saling menunggu.

**Opening & closing tidak didaftarkan di `SCENES`.** Keduanya milik `shared/`
([docs/10](docs/10-scene-standar.md)) supaya semua episode identik.

**Id komposisi scene berprefiks kode topik** — `t15-05-dikunci-semua`, bukan
`05-dikunci-semua`. Alasannya sama persis dengan prefiks `s1-`/`s2-` di Shorts:
`02-opening` dan `99-closing` ada di **setiap** episode, dan Remotion menolak dua
komposisi dengan id yang sama — saat **render**, bukan saat `tsc`. Nama
**berkasnya** tidak berubah (`scenes/05-dikunci-semua.tsx`); yang berprefiks cuma id di
`src/Root.tsx`.

**Shorts tinggal di `ideas/<slug>/scene-shorts/<short>/`, satu subfolder per
Short.** Aturan ini berlaku utuh di dalamnya — tiga berkas per scene, nama
identik, `index.ts`, dan satu berkas perangkai:

```
ideas/<slug>/scene-shorts/s1-nugget/01-hook-vo.md
ideas/<slug>/scene-shorts/s1-nugget/01-hook-direction.md
ideas/<slug>/scene-shorts/s1-nugget/01-hook.tsx
ideas/<slug>/scene-shorts/s1-nugget/index.ts   ← SCENES Short ini
ideas/<slug>/scene-shorts/s1-nugget/Short.tsx  ← perangkai, seperti Episode.tsx
ideas/<slug>/scene-shorts/s2-jebakan/…
```

**Penomoran mulai dari `01` lagi di tiap subfolder.** Empat Short adalah empat
urutan tayang yang berdiri sendiri, bukan satu daftar panjang — dan HARD RULE 5
berlaku di dalam masing-masing, tidak pernah menyeberang. Id komposisinya
berprefiks nama subfolder supaya tidak pernah bertabrakan dengan scene video
panjang: `s1-01-hook`, `s2-01-mitos`, dan Short utuhnya `<slug>-s1`. Ukurannya
9:16 — `<Panggung rasio="9x16">`, `SHORT_WIDTH`/`SHORT_HEIGHT` dari `.env`.

Isi dan beat-nya milik [docs/02 § Anatomi Shorts](docs/02-format-video.md#anatomi-shorts):
hook ditulis ulang dari nol, teks di layar wajib, berhenti di L1/L2, tanpa
brand sting pembuka. **Yang boleh diwarisi dari video panjang cuma komponen
visualnya**, tidak pernah kalimat hook atau urutan beat-nya.

`npm run gen` membangun `timing.gen.ts` tiap Short, `npm run sisa` memeriksa
kedua folder dengan pemeriksaan yang sama persis dengan video panjang, dan
`npm run check` menyampel satu frame tiap Short — panggung 9:16 punya skala
tipografi dan kotak aman sendiri, jadi episode yang lolos tidak membuktikan
apa pun tentang keduanya.

**Berkas bantu Short tinggal di `scene-shorts/`, di luar folder scene-nya** —
`../tiga-tempat.tsx`, `../meja-kerja.tsx`, `../teks-atas.tsx`. Sama seperti
`../panggung-analogi.tsx` di video panjang: `npm run sisa` memeriksa setiap
`.tsx` di dalam folder scene terhadap daftar kunci naskah, jadi berkas bantu
yang tinggal di sana dilaporkan sebagai nama yang tidak dikenal.

**`check` lulus bukan bukti gambarnya ada.** Di versi HyperFrames repo ini
pernah kehilangan waktu karena panggung setinggi 0 membuat seluruh episode
render hitam polos sementara semua pemeriksaan lulus — tidak ada yang salah,
hanya tidak ada yang terlihat. `<AbsoluteFill>` menutup penyebab spesifik itu,
tapi kelasnya tidak hilang: font gagal muat, aset salah path, teks sewarna
latar. `npm run check` menjalankan `tools/periksa-frame.mjs` yang membuktikan
frame-nya ada isinya, tapi itu smoke test — **tetap render still dan lihat
sendiri** sebelum menyatakan selesai.

**`npm run tumpang` menutup satu kelas yang tidak terlihat dari `check`:** dua
benda yang saling menutupi. Ia mengukur kotak elemen di dalam raman (bukan
piksel — dari PNG, "bertumpuk" dan "memang berbentuk begitu" identik) di
titik-titik tenang tiap beat, dan yang dihitung cuma yang bisa RUGI kalau
tertutupi: teks, `<text>` di dalam figur, dan ikon. Permukaan — kartu, panel,
kanvas SVG figur — tidak, karena label memang ditaruh di atasnya. **Yang memang
sengaja bertumpuk ditandai `data-tumpang="sengaja"` di berkas scene-nya**, bukan
dengan melonggarkan ambang di `tools/periksa-tumpang.mjs`. Ini menemukan cacat
yang paling sering lolos ke MP4: ia cuma terjadi selama satu detik, jadi tidak
pernah kebetulan terlihat saat scrubbing.

**`npm run jahit` memeriksa satu frame yang tidak diperiksa keduanya: potongan
antar-scene.** Tiap berkas direction membuka dengan klaim yang sama — "frame
pertamanya = frame terakhir *scene sebelumnya*" (HARD RULE 3) — dan sampai
sekarang klaim itu cuma hidup di `.md`. Perintah ini merender **frame terakhir
scene N dan frame pertama scene N+1**, lalu membandingkan daftar bendanya:
berapa yang **dipegang** (benda sama, tempat sama), yang **bergeser**, yang
**hilang**, dan yang **muncul**. Berbeda dengan `tumpang`, di sini `path` dan
`rect` ikut diukur — yang membuat potong keras terbaca disengaja justru benda
besar yang tidak bergerak, dan kalau bentuk dibuang yang tersisa cuma label
yang memang berganti tiap scene.

Dua tingkat, dan cuma yang pertama menggigit: **LOMPAT** (praktis tidak ada
yang menyeberangi potongannya, exit 1) dan **tipis** (dilaporkan, yang menilai
mata lewat PNG-nya di `out/jahitan/`). **Sambungan yang sengaja menganga
menulis `jahitan: menganga — <alasan>` di berkas direction scene sesudahnya**,
bentuk yang sama dengan `data-tumpang="sengaja"` — bukan dengan melonggarkan
ambang di `tools/periksa-jahitan.mjs`. Sambungan yang disela scene standar
tidak diperiksa: kartu judul memang layar lain ([docs/10](docs/10-scene-standar.md)),
dan jembatan 1 → 3 di situ murni urusan VO.

Kelasnya sama dengan `tumpang` dan justru lebih tersembunyi: cacatnya ada di
**satu frame**, tepat di sambungannya. Scene yang frame pertamanya kosong
terbaca sebagai kedipan hitam yang tidak bisa ditunjuk penonton — dan `check`
lulus, karena ia menyampel frame di tempat lain.

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
- Logo getresolved **tetap terbatas** di kartu judul dan tanda brand
  ([docs/10](docs/10-scene-standar.md)) — jangan menaburkannya sebagai pengisi.
- Detail ukuran, warna, dan penempatan: [docs/03 § Ikon & figur](docs/03-tema-visual.md#ikon--figur).

### 3. Setiap scene punya berkas direction

Di samping tiap scene ada berkas direction dengan nama yang sama persis:

```
ideas/<slug>/scenes/01-hook-question.tsx              ← komposisi
ideas/<slug>/scenes/01-hook-question-direction.md     ← direction
```

**Direction ditulis Claude, user merevisi lewat chat.** Claude yang menyusun
draft-nya dari arahan user; user membaca, mengoreksi, dan meminta perubahan di
chat — dan **Claude yang menuliskan koreksi itu balik ke berkasnya**. Yang
dilarang cuma satu: direction yang tidak pernah ditulis ke berkas dan cuma hidup
di riwayat chat.

**Arahnya satu:** direction → komposisi. `.tsx` dibangun dari direction, jadi
scene yang direction-nya masih kosong belum boleh dibangun. Kalau `.tsx` sudah
berjalan tapi terasa meleset dari direction, yang benar adalah direction-nya —
ubah komposisinya, jangan ubah direction supaya cocok dengan kode.

Alasannya: naskah menetapkan *apa yang dikatakan*, direction menetapkan *apa
yang terjadi di layar*. Yang kedua selalu hidup di kepala dan di chat, lalu
hilang begitu sesi ditutup — dan scene berikutnya ditebak ulang dari nol.
Direction adalah tempatnya menetap. Berkasnya, bukan chat-nya, yang jadi
keputusan; kalau keduanya berbeda, berkas yang salah dan harus diperbarui.

**Opening & closing ikut punya direction** (`02-opening-direction.md`,
`99-closing-direction.md`) walaupun komponennya milik `shared/`. Justru keduanya
yang paling perlu — kalau koreografinya berubah, **semua** episode ikut berubah.

### 4. Setiap scene punya rencana VO, dan di situlah teks VO hidup

Berkas ketiga, nama sama persis:

```
ideas/<slug>/scenes/01-hook-question-vo.md            ← rencana VO  (apa yang DIKATAKAN)
ideas/<slug>/scenes/01-hook-question-direction.md     ← direction   (apa yang TERJADI di layar)
ideas/<slug>/scenes/01-hook-question.tsx              ← komposisi   (turunan keduanya)
```

**Rencana VO adalah sumber teks VO — bukan `naskah.md`.** Kalimat yang dibaca
Gemini diambil dari blok `## VO` di berkas ini. `naskah.md` tinggal jadi
daftar isi episode: scene apa saja, urutannya, dan di bagian flow mana. Format
lengkapnya: [docs/11](docs/11-rencana-vo.md).

**Satu baris = satu beat.** `tools/baca-episode.mjs` menghitung detik tiap baris
dari jumlah katanya, dan komposisi memanggilnya lewat `beat("hook-question", 2)`
dari `timing.gen.ts`. **Jangan pernah mengetik detik di berkas rencana VO**, dan
jangan menghitung detik dengan tangan di dalam `.tsx` — begitu satu kalimat
berubah, semua beat sesudahnya ikut bergeser sendiri.

**Ditulis Claude, direvisi user lewat chat** — sama seperti direction.

**Arahnya satu:** rencana VO + direction → komposisi. Scene yang blok `## VO`-nya
masih kosong belum boleh dibangun; durasinya sementara memakai
`VO_PLACEHOLDER_SECONDS` dan `npm run sisa` menyebutnya satu per satu.

**Selama berkas VO belum ada, teks VO tampil sebagai subtitel preview** — dan
begitu `public/vo/<slug>/L-<kunci>.mp3` ada, subtitel scene itu hilang sendiri
dan suaranya yang bicara. Pergantiannya per scene, ditentukan keberadaan
berkasnya (dideteksi `npm run gen`, dipasang `shared/Vo.tsx`), **bukan oleh
saklar** — saklar yang harus dimatikan tangan pada akhirnya ikut terbawa ke MP4.
Jangan menempel `<Audio>` VO sendiri di komposisi. → [docs/11](docs/11-rencana-vo.md#subtitel-preview--sampai-vonya-jadi).

Alasannya: sebelum ini VO tinggal di satu sel tabel naskah, satu baris panjang
tanpa tempat untuk mencatat kenapa kalimatnya begitu — kenapa "disalin" bukan
"dipindah", kenapa "D N S" dieja, kenapa satu kalimat sengaja dipotong dua
baris supaya animasinya punya waktu. Semua itu keputusan yang dibayar mahal kalau
hilang: VO yang salah baca berarti generate ulang berbayar, dan VO yang berubah
kata berarti seluruh timing scene bergeser. Sekarang keputusan itu menempel di
sebelah kalimatnya, di berkas yang sama dengan scene-nya.

**Opening & closing tidak punya rencana VO.** Keduanya memang tidak bicara
(docs/10); durasinya dari `.env`.

**Blok `## VO` punya EMPAT pembaca**, dan mesin TTS cuma satu di antaranya:
penghitung timing, subtitel preview, daftar sambungan yang dicetak
`npm run sisa`, dan nanti berkas subtitel penonton. Dua akibatnya mengikat, dan
keduanya **tidak bergantung model**:

- **Audio tag (`[slow]`, `[long pause]`) dan `<break>` dilarang di sana** —
  walaupun Gemini memahaminya. Ia terhitung sebagai kata, muncul di subtitel,
  dan mengotori daftar sambungan. `npm run vo-script-audit` menolaknya sebagai
  tingkat A. Tempatnya di batas TTS: `bikin-vo-utuh.mjs` yang menyuntikkannya.
- **Ejaan fonetik (`D N S`) sah, tapi hanya untuk istilah yang terdaftar** di
  tabel `## Kamus pengucapan` di `naskah.md`. Gemini tidak punya kamus
  pengucapan, jadi tidak ada lagi jalan ketiga — tapi tabel itu tetap berdiri
  sebagai daftar periksa saat mendengarkan, dan `vo-script-audit` memakainya
  untuk invarian yang masih tajam: **akronim boleh ada jika dan hanya jika ada
  barisnya di tabel.** → [docs/11](docs/11-rencana-vo.md).

### 5. Memecah atau menyisipkan scene = menomori ulang semua scene sesudahnya

Satu scene terasa kepanjangan dan dipecah dua — scene 3 jadi **scene 3 dan scene
4** — atau ada scene baru disisipkan di tengah. Begitu itu terjadi, **semua scene
sesudahnya bergeser nomor**, dan pergeserannya wajib diselesaikan sampai tuntas
di langkah yang sama. Bukan nanti.

Urutannya mengikat:

1. **Tambah/pecah barisnya di tabel `### Scene` di `naskah.md`**, di posisi
   tayangnya. Urutan baris tabel **adalah** urutan tayang — tidak ada kolom nomor
   yang bisa disetel terpisah.
2. **`npm run gen`**, lalu baca `kunci` yang baru di `ideas/<slug>/timing.gen.ts`.
   Nomor dihitung `tools/baca-episode.mjs`, tidak pernah diketik tangan.
3. **Ganti nama berkas semua scene yang bergeser — tiga berkas per scene:**
   `<kunci>.tsx`, `<kunci>-vo.md`, `<kunci>-direction.md`. Ketiganya, bukan
   `.tsx`-nya saja.
4. **Perbarui impor di `scenes/index.ts`.** Kunci di `SCENES` adalah **id**, jadi
   ia tidak ikut berubah — yang berubah cuma jalur impornya.
5. **`npm run sisa` sampai bersih.** Ia membandingkan nama berkas dengan kunci
   dari naskah dan **keluar dengan kode 1** kalau ada yang meleset, lengkap
   dengan nama yang seharusnya.

**Memecah scene berarti membelah isinya, bukan menyalinnya.** Rencana VO dan
direction scene lama ikut dibelah jadi dua berkas: beat yang pindah ke scene baru
**dipindah**, bukan digandakan. Dua berkas yang isinya sama adalah dua sumber
kebenaran yang akan berbeda dalam seminggu.

**Dilarang menambal nomor.** Tidak ada `3b`, `3-2`, atau `3.5`, dan tidak boleh
membiarkan nomor lama "karena cuma geser satu". Nomor yang bohong lebih buruk
daripada tidak ada nomor.

**Lebar nomor ikut berubah** saat jumlah scene menyeberang kelipatan 10: scene
ke-10 mengubah `01-hook-question` jadi `01-hook-question` — **semua** berkas, bukan
yang baru saja. `npm run sisa` yang menyebutkannya satu per satu.

Alasannya: nomor berkas bukan hiasan. Ia sekaligus **id komposisi Remotion** dan
**urutan tayang**, dan itulah yang membuat `npx remotion still t15-06-penjaga` bisa
dipercaya. Begitu satu scene disisipi tanpa menomori ulang, `ls scenes/` diam-diam
berhenti berarti urutan tayang, dan perintah `still` yang sudah tertulis di
dokumen mulai menunjuk scene yang keliru — tanpa error, tanpa tanda apa pun.
Opening ikut terhitung dalam penomoran walaupun komponennya milik `shared/`;
closing dipatok di 99 justru supaya ia satu-satunya yang **tidak** ikut bergeser.

### 6. VO mengundang membayangkan dulu, menamai belakangan

Penonton tidak dilempar ke tengah adegan. **Scene yang membuka sebuah gambaran
baru dimulai dengan mengundang penonton masuk ke gambaran itu**, baru adegannya
berjalan:

```
Bayangkan kamu baru saja membuka sebuah aplikasi.   <- undangan
Isinya muncul di layar, satu per satu.              <- adegannya jalan
```

**Frasanya bebas, dan memang harus bervariasi** — "Bayangkan…", "Coba
bayangkan…", "Anggap saja…", "Sekarang lihat…", "Kamu lagi…". Yang wajib
undangannya, bukan katanya. Dua puluh scene yang semuanya dibuka dengan kata
"Bayangkan" berhenti jadi undangan dan jadi tic.

**Scene lanjutan tidak mengundang ulang.** Kalau gambarannya masih yang sama —
gudang yang sama, meja yang sama — penonton sudah berdiri di dalamnya.
Mengundang lagi justru mengeluarkannya, dan membuat scene itu terasa memulai
dari nol padahal ia meneruskan. **Undangan baru = gambaran baru**, tidak pernah
sekadar scene baru.

**Nama benda menyusul, tidak pernah mendahului.** Selama bendanya belum berdiri
dan belum dipakai di layar, ia disebut dengan kata sehari-hari, bukan namanya.
Yang paling dilarang: kalimat VO yang **membuka dengan namanya**. "D N S itu
sistem penerjemah nama" adalah definisi kamus, dan penonton belum punya apa pun
untuk menggantungkannya.

Dua batas yang mengikat:

- **`[what]` episode dinamai tepat satu kali, di bagian 4 [answer]** — setelah
  bendanya berdiri, dipakai, dan menyelesaikan masalah yang terasa di bagian 3
  ([docs/02 § Aturan flow](docs/02-format-video.md)). Menyebut namanya lebih
  awal, sekali saja, membakar seluruh bagian 3: begitu penonton punya nama, ia
  berhenti merasakan masalahnya dan mulai menunggu definisinya.
- **Istilah teknis lain punya satu kalimat L1 di kemunculan pertamanya**, di
  scene yang sama, sebelum namanya jatuh ([docs/09](docs/09-tangga-abstraksi.md)
  aturan 2). Kalimat itu ditulis di blok `## VO` — bukan cuma dijanjikan di
  `## Catatan`, dan bukan cuma digambar di layar. Yang di layar tidak terbaca
  penonton yang sedang mendengarkan.

**Kosakata L1 adalah daftar larangan, bukan saran** ([docs/09 § Kosakata
L1](docs/09-tangga-abstraksi.md)). *data*, *proses*, *memori*, *request* adalah
kata teknis yang menyamar jadi kata sehari-hari karena kita mengucapkannya tiap
hari — padahal orang yang tidak menulis kode tidak bisa menggambar satu pun dari
keempatnya. Pakai "isinya", "dikerjakan", "tempat menaruh", "permintaan".

Alasannya: undangan itu bukan basa-basi, ia yang memindahkan penonton dari mode
*sedang dijelaskan* ke mode *sedang membayangkan* — dan analogi hanya menempel
di mode kedua. Kalimat yang langsung menyebut bendanya menyuruh penonton
menghafal; kalimat yang mengundang menyuruhnya menggambar, dan gambar yang ia
buat sendiri itulah yang bertahan sampai bagian 6. Nama yang datang sebelum
gambarannya berdiri bukan sekadar sia-sia, ia merugikan: begitu istilah asing
jatuh, penonton berhenti membayangkan dan mulai menebak apakah ia seharusnya
sudah tahu — dan itu titik ia menutup video.

Aturan ini juga kendali mutu yang sama dengan [docs/09](docs/09-tangga-abstraksi.md):
scene yang tidak bisa dibuka dengan ajakan membayangkan hampir selalu scene yang
gambarannya belum kita punya. Yang akan ditulis di situ adalah definisi, dan
definisi selalu lolos tanpa terasa salah.

**Diperiksa dengan membaca, bukan oleh tes.** `npm run sisa` mencetak baris
pembuka VO tiap scene berurutan — undangan yang hilang dan nama yang datang
terlalu awal keduanya terlihat dari daftar itu, tapi yang menilainya tetap
manusia. Format berkasnya: [docs/11](docs/11-rencana-vo.md).

### 7. Tiap sambungan antar-scene dijembatani di VO

Scene ditulis satu per satu di berkasnya sendiri (HARD RULE 1), tapi
**ditonton berurutan tanpa jeda.** Yang sampai ke penonton bukan sepuluh
berkas, melainkan satu kalimat panjang — dan seluruh sambungannya cuma dua
baris:

```
baris TERAKHIR  scenes/05-loket-vo.md   "Ya, loket itu D N S."
baris PERTAMA   scenes/06-tangga-vo.md  "Dekatnya memang membantu. Tapi bukan cuma itu."
```

**Setiap sambungan wajib dijembatani salah satu dari dua baris itu.** Bentuk
yang paling kuat: baris terakhir scene N meninggalkan celah — pertanyaan,
akibat, atau janji yang belum lunas — dan baris pertama scene N+1 menutupnya.
Kata sambung yang menopang berat: *jadi*, *tapi*, *makanya*, *bukan cuma itu*,
*masalahnya*, *sekarang lihat*.

**Jembatan bukan pengumuman.** Yang dilarang adalah kalimat yang membicarakan
**videonya**, bukan bendanya:

```
Nah, sekarang kita bahas umur catatan.    <- daftar isi yang dibacakan
Oke, lanjut ke bagian berikutnya.         <- nol isi, cuma penanda
Sebelum itu, mari kita lihat dulu…        <- menunda tanpa membayar
Di scene ini kita akan…                   <- menyebut scene (dilarang docs/11)
```

Kalimat seperti itu bukan cuma kosong, ia **merugikan**: ia memberi tahu
penonton bahwa satu bagian baru saja selesai — dan bagian yang selesai adalah
tempat orang merasa boleh berhenti.

**Sambungan yang lompat itu hening, bukan salah.** Tidak ada yang error, tidak
ada yang jelek di layar; scene berikutnya cuma terasa "kok tiba-tiba" dan
penonton tidak bisa menunjuk kenapa. Yang paling sering bocor adalah scene yang
ditulis belakangan atau disisipi kemudian (HARD RULE 5) — ia lahir tanpa
tetangga, dan tetangganya tidak pernah dibuka lagi.

**Ini yang membuat potong keras bekerja.** [docs/02](docs/02-format-video.md)
mematok 95% perpindahan scene = potong keras, tanpa transisi. Gambar yang
berganti mendadak hanya terbaca **disengaja** kalau suaranya tidak ikut
berganti mendadak — VO yang menyambung itulah transisinya, dan itu sebabnya
`shared/anim.ts` tidak perlu menyediakan transisi antar-scene.

**Sambungan antar-bagian flow yang paling mahal** — terutama 3 → 4, tempat
`[what]` akhirnya dinamai (HARD RULE 6). Di situ celahnya memang paling lebar,
dan justru di situ ia harus terasa seperti jawaban, bukan seperti bab baru.

**Sambungan boleh melewati kartu judul.** Opening tidak bicara ([docs/10](docs/10-scene-standar.md)),
jadi jembatan scene 1 → scene 3 tetap jembatan langsung: pertanyaan hook
digantung, kartu judul lewat, gambaran pertama menjawabnya.

**Diperiksa dengan membaca.** `npm run sisa` mencetak tiap sambungan
berpasangan — baris terakhir scene N tepat di atas baris pertama scene N+1,
sesuatu yang tidak pernah terjadi sendiri karena tiap berkas dibuka
sendiri-sendiri saat digarap. Sambungan yang sengaja dibiarkan menganga
(potongan kejut) menulis alasannya di `## Catatan`, satu baris — kalau tidak,
sesi berikutnya akan "memperbaikinya". Detail & contoh:
[docs/11 § Sambungan antar-scene](docs/11-rencana-vo.md#sambungan-antar-scene--hard-rule-7).

## Aturan kerja

- **Balas dalam Bahasa Indonesia** — user berkomunikasi dalam Bahasa Indonesia informal.
- **Guideline adalah kontrak.** Sebelum menulis naskah atau komposisi, baca dokumen
  yang relevan di [`docs/`](docs/). Kalau sebuah keputusan bertentangan dengan
  guideline, ubah guideline-nya dulu secara eksplisit — jangan diam-diam menyimpang.
- **Semua ide posting masuk ke [`ideas/`](ideas/)**, satu berkas per ide, sebelum
  jadi apa pun. Yang lolos 4 syarat naik ke [`docs/07`](docs/07-backlog-topik.md)
  dan dapat kode `T{nn}`; ide yang ditolak tetap disimpan beserta alasannya.
  Jangan menulis ide baru langsung ke backlog.
- **Satu topik = 1 video panjang + 4 Shorts.** Jangan kirim topik setengah jadi.
  Shorts diturunkan dari topik yang sama, tapi **hook-nya ditulis ulang**, bukan
  potongan mentah video panjang.
- **Akurasi teknis di atas gaya.** Ini konten edukasi; klaim yang salah lebih mahal
  daripada video yang kurang keren. Kalau sebuah angka (benchmark, kompleksitas,
  versi, perilaku API) tidak bisa diverifikasi, jangan sebutkan — atau sebutkan
  dengan sumbernya di `naskah.md`. Setiap klaim angka wajib punya baris `sumber:`.
- **Jangan mengarang API.** Remotion, Gemini, dan flag CLI-nya sudah
  didokumentasikan di [docs/04-pipeline-produksi.md](docs/04-pipeline-produksi.md).
  Kalau butuh perilaku yang tidak tercatat di sana, cek dokumentasi resminya dulu
  ([remotion.dev/docs](https://www.remotion.dev/docs)), lalu perbarui dokumen itu.
- **Naskah hidup di berkas, bukan di chat.** Daftar scene di `naskah.md`, teks VO
  di `scenes/<kunci>-vo.md`, apa yang di layar di `scenes/<kunci>-direction.md`.
  Komposisi adalah *turunan* ketiganya — kalau VO berubah, ubah rencana VO-nya
  dulu lalu `npm run gen`. Timing tidak pernah disunting tangan.
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
  boleh muncul sebelum benda yang diwakilinya sudah digambarkan. Di level VO
  aturan ini mengikat sebagai **HARD RULE 6** — undangan dulu, nama belakangan.
  → [docs/09](docs/09-tangga-abstraksi.md) · [docs/11](docs/11-rencana-vo.md).
- **VO paling akhir, sekali jalan.** Gemini berbayar dan tidak deterministik. Bangun
  komposisi bisu dengan timing perkiraan (`tools/estimate-timing.mjs`), cocokkan
  rencana VO dengan visual, bekukan naskah, **baru** generate VO.
  → [docs/04 §5](docs/04-pipeline-produksi.md#5-gerbang--bekukan-naskah) ·
  [docs/11](docs/11-rencana-vo.md).
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
npm run gen        # .env → config.gen.ts · naskah.md + scenes/*-vo.md → timing.gen.ts
npm run check      # tsc + bukti frame tidak kosong (tools/periksa-frame.mjs)
npm run sisa       # placeholder + rencana VO/direction yang belum ada
                   # + scene yang masih pakai subtitel preview (VO belum ada)
                   # + nama berkas yang nomornya meleset (HARD RULE 5, exit 1)
npm run tumpang:semua                      # figur yang saling menutupi (exit 1)
npm run tumpang -- <slug>                  # satu keluaran saja
npm run tumpang -- <slug> --kunci 05-loket # satu scene saja, saat menggarapnya
npm run tumpang -- <slug> --short s1-nugget

npm run jahit:semua                              # potongan antar-scene yang lompat (exit 1)
npm run jahit -- <slug>
npm run jahit -- <slug> --jahitan 06-penjaga     # satu sambungan saja: kunci scene SESUDAHNYA
npm run jahit -- <slug> --short s1-nugget
npm run studio     # Remotion Studio — server panjang, jalankan di background
npm run render:t15     # episode utuh → out/   (satu skrip per topik, `:t<nn>`)

# Short & thumbnail baru punya skrip/komposisi setelah topiknya sampai ke fase
# 3 dan fase 4 — belum ada satu pun sekarang. Bentuk perintahnya saat lahir:
#   npm run render:t15:s1                          # Short 1 utuh (9:16) → out/
#   npx remotion still T15-thumb    ideas/apa-itu-firewall/render/thumb.png     # 16:9 1280x720
#   npx remotion still T15-thumb-s1 ideas/apa-itu-firewall/render/thumb-s1.png  # 9:16 2160x3840
#   npx remotion still t15-s1-01-hook out/s1-hook.png   # scene Short: id BERPREFIKS

# satu scene saja — inilah gunanya HARD RULE 1
npx remotion still  t15-05-dikunci-semua out/dikunci.png
npx remotion render t15-05-dikunci-semua out/dikunci.mp4

# VO & timing — mesinnya Gemini (docs/11)
. .\tools\load-env.ps1                      # muat .env ke sesi PowerShell
node --env-file=.env tools/estimate-timing.mjs <slug>

# JALUR BAKU untuk Short: satu permintaan untuk seluruh Short, lalu dipotong.
npm run vo:utuh -- <slug> --target S1                     # rencana — gratis
npm run vo:utuh -- <slug> --target S1 --coba --jalan      # ke out/voicetest/
npm run vo:utuh -- <slug> --target S1 --jalan --pisah 1   # hook dipisah, ke public/vo/
npm run vo:utuh -- <slug> --target S1 --jalan --pakai-wav # potong ulang, nol biaya

# JALUR BAKU untuk video panjang: beberapa permintaan (batch), lalu dipotong.
# Batasnya ditaruh di batas BAGIAN FLOW — jangan pernah di sambungan 3 → 4.
npm run vo:utuh -- <slug> --target L --pecah-di 06-penjaga,09-dari-atas
npm run vo:utuh -- <slug> --target L --batch 4            # jalan cepat, buat mencoba

npm run vo:cocok -- <slug> --target S1   # transkripsi vs naskah, per kata
npm run vo:coba  -- <slug> --scene <kunci> --voice A,B --model X,Y   # banding suara

# per scene — untuk menambal satu scene, bukan untuk membuat Short dari nol
node --env-file=.env tools/bikin-vo.mjs <slug>          # RENCANA saja — gratis
node --env-file=.env tools/bikin-vo.mjs <slug> --jalan  # baru ini yang membayar

node --env-file=.env tools/rata-vo.mjs <slug> --jalan   # ratakan ke TARGET_LUFS
node --env-file=.env tools/vo-durations.mjs <slug>      # durasi asli vs perkiraan
```

**Satu Short = satu permintaan, bukan sembilan.** Gemini dipanggil per scene itu
buta terhadap tetangganya, dan terukur: teks sama, setelan sama, durasi mentahnya
berayun **31%** antar-panggilan. Sembilan potongan jatuh di tempo yang acak satu
sama lain, dan pencerita yang berganti kecepatan tanpa sebab di tiap potongan
adalah lawan dari terdengar wajar. Dikirim sekaligus, kesembilan scene dibaca
sebagai satu pertunjukan — dan sambungan HARD RULE 7 tersambung di **suaranya**,
bukan cuma di naskahnya.

Batasnya lalu dibaca dari **cap waktu per kata** (`vo:cocok`), bukan ditebak dari
senyap: jeda antar-kalimat di dalam scene dan jeda antar-scene secara akustik
adalah benda yang sama. Pencocokan itu sekaligus membuktikan **Gemini
mengucapkan naskahnya, bukan parafrasenya** — satu-satunya penjaga yang kita
punya terhadap sifat Gemini sebagai model bahasa.

**Hook Short dipisah (`--pisah 1`).** Bacaan utuh membeli keseragaman dengan
membayar jangkauan dinamis: hook jadi rata bersama yang lain. Beat pertama
Nugget adalah klaim yang berdiri sendiri (docs/02), jadi memisahnya mengikuti
bentuk naskahnya, bukan mengakalinya.

**Video panjang dibatch, bukan dikirim sekaligus dan bukan per scene.** Satu
permintaan untuk 5 menit dipenggal Gemini tanpa mengeluh — naskah L T14 kembali
sebagai 50,31 dtk dari 5,4 menit yang diminta. Tapi jatuh ke jalan per scene
membayar lebih mahal lagi: VO T14 yang lahir dari sebelas panggilan berayun
**119–161 wpm (36%)**, lebih buruk daripada 31% yang jadi alasan `vo:utuh`
dibuat. `--pecah-di <kunci,…>` menaruh batas permintaan di **batas bagian flow**,
dan di dalam tiap batch semuanya tetap satu tarikan napas. Yang paling tidak
boleh dilewati batas batch: **sambungan 3 → 4**, tempat `[what]` dinamai
(HARD RULE 6) — di situ pergantian tempo membatalkan seluruh bagian 3.
Penggalan sekarang ditangkap penjaganya sendiri (`wpm > 2× VO_WORDS_PER_MINUTE`),
dan satu batch gagal berarti **nol berkas** untuk seluruh keluaran.

**Arahan pembacaan per topik ada di `ideas/<slug>/vo-gemini-profile.yaml`** —
`voice`, `profile`, `style`, `accent`, `pace`, `tempo`, bisa ditimpa per keluaran
(L/S1–S4). Dari keenamnya **cuma `voice` yang medan API sungguhan**; empat medan
arahan melebur jadi satu kalimat prompt dan boleh diabaikan model, dan `tempo`
pengali ffmpeg sesudah audionya jadi. → [docs/11](docs/11-rencana-vo.md).

`gen` dijalankan otomatis lewat npm pre-script sebelum `studio`, `render`,
`check`, dan `sisa` — tidak perlu diingat, tapi perlu diketahui kenapa
`shared/config.gen.ts` dan `ideas/*/timing.gen.ts` tidak ada di git: keduanya
turunan `.env`, `naskah.md`, dan `scenes/*-vo.md`, dan meng-commit-nya berarti
dua sumber kebenaran.

**Episode yang sedang digarap didaftarkan di [`src/Root.tsx`](src/Root.tsx).**
Setiap scene otomatis dapat komposisinya sendiri (bernomor urut, mis. `15-s016`) di samping episode
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
  `flow.md` → `docs/02` → `ideas/<slug>/naskah.md` →
  `scenes/<kunci>-vo.md` + `scenes/<kunci>-direction.md` → `scenes/<kunci>.tsx`,
  aturan `docs/03` → `shared/theme.css` + `shared/Icons.tsx`,
  `ide.md` → backlog `docs/07`.
  Relasi seperti itu hanya tertangkap ekstraksi doc-aware:

  ```powershell
  graphify extract . --backend claude-cli --mode deep
  graphify cluster-only . --backend claude-cli
  ```

- **Dua perintah, bukan satu.** `extract` berhenti di `graph.json`; `GRAPH_REPORT.md`
  dan nama komunitas baru lahir dari `cluster-only`. Tanpa langkah kedua, laporannya
  memakai label `Community N` — atau tidak ada sama sekali.
- Jalankan ulang ekstraksi itu setelah **guideline atau naskah** berubah;
  `graphify update .` yang murah cukup untuk perubahan komposisi.
- **`extract` yang diulang bisa membuat graf lebih buruk.** Ekstraksinya lewat LLM,
  jadi tidak deterministik: jalan kedua di repo ini pernah turun dari 301 ke 251 node
  dan menghapus HARD RULE 5 dari graf. Setelah mengulang, **buktikan** aturan yang
  baru ditulis benar-benar masuk:

  ```powershell
  graphify explain "HARD RULE 5 · Memecah scene = menomori ulang"
  ```

- **Kalau perlu ekstraksi ulang benar-benar bersih, hapus `graphify-out/`.**
  `extract` itu incremental dan memakai `manifest.json` + `graph.json` sebagai
  baseline — menghapus `cache/semantic` atau `cache/stat-index.json` **tidak**
  memaksanya mengulang; ia tetap melaporkan `0 re-extracted`. Aman dihapus: seluruh
  isinya turunan dan sudah di-ignore git.
- `graphify-out/` di-ignore git (lihat `.gitignore`), sama seperti di
  `getresolved/` dan `apps/justmart/`.
