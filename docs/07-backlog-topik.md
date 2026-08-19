# 07 · Backlog Topik

Daftar topik beserta **sudut untuk keempat Shorts-nya**. Satu topik hanya boleh
masuk daftar ini kalau lolos empat syarat di bagian bawah.

> **Ide baru tidak ditulis di sini.** Semua ide masuk lewat
> [`ideas/`](../ideas/) dulu — satu berkas per ide, bebas seberapa mentah.
> Yang lolos empat syarat baru naik ke halaman ini dan dapat kode `T{nn}`.
> Alurnya: [`ideas/README.md`](../ideas/README.md).

Komposisi mengikuti porsi pilar di [01 · Positioning](01-positioning.md): mayoritas
bisa dinikmati khalayak umum, sebagian untuk developer, dan setiap topik menaiki
tangga L1 → L2 → L3.

**Konstanta produksi** (nama channel, voice ID, model TTS, spesifikasi video)
tidak ditulis di sini — semuanya ada di `.env`. Lihat
[08 · Konfigurasi](08-konfigurasi.md).

---

## Papan status

| Kode | Topik | Pilar | Lapis utama | Status |
|---|---|---|---|---|
| T13 | Sinyal penuh tapi internet lambat | P1 | umum | belum mulai |
| T02 | Bagaimana HP tahu posisi kamu | P1 | umum | belum mulai |
| T03 | Kenapa rekaman video jadi buram | P1 | umum | belum mulai |
| T04 | Apa isi sebuah QR code | P1 | umum | belum mulai |
| T05 | Perjalanan satu alamat web | P2 | umum → dev | belum mulai — dipersempit, DNS sudah tayang sendiri di T14 |
| T06 | Index database | P2 | umum → dev | belum mulai |
| T07 | Cache: cepat, tapi kadang salah | P2 | umum → dev | belum mulai |
| T08 | Event loop JavaScript | P3 | dev | belum mulai |
| T09 | Apa yang terjadi saat `git commit` | P3 | dev | belum mulai |
| T10 | Kenapa AI bisa menjawab tapi kadang ngarang | P4 | umum | belum mulai |
| T11 | Kenapa rekomendasi tahu selera kamu | P4 | umum → dev | belum mulai |
| T12 | Apa yang terjadi saat password bocor | P5 | umum | belum mulai |

Status: `belum mulai → riset → naskah → vo → komposisi → render → publish`.
Topik yang sudah **tayang** dikeluarkan dari papan ini beserta seluruh berkas
produksinya — arsipnya ada di riwayat git, bukan di repo yang sedang digarap.
Topik yang **dibatalkan** dikeluarkan dengan cara yang sama, tapi kodenya
disimpan sebagai catatan di pilarnya supaya tidak pernah dipakai ulang —
lihat [T16](#t16--apa-itu-enkripsi--dibatalkan).

---

## P1 · Cara Kerja Sehari-hari

### T13 · Sinyal penuh tapi internet lambat

**L1:** Batang sinyal cuma memberi tahu seberapa dekat kamu ke pemancar — bukan
berapa banyak orang yang sedang antre memakai pemancar yang sama.

**Video panjang.** Beda antara *kekuatan sinyal* dan *kapasitas*. Bagaimana satu
akses poin dibagi ke banyak perangkat, apa itu bandwidth vs latensi, kenapa jam
delapan malam lebih lambat. Babak realita: angka nyata — berapa perangkat yang
realistis per akses poin, dan kenapa menambah repeater kadang justru memperburuk.

- **Short 1 — Nugget:** batang sinyal ≠ kecepatan, divisualkan sebagai jalan lebar
  yang penuh mobil.
- **Short 2 — Jebakan:** "pasang repeater biar kencang" — repeater membagi dua
  kapasitas yang sama, bukan menambahnya.

### T02 · Bagaimana HP tahu posisi kamu

**L1:** Empat satelit meneriakkan jam mereka. HP-mu mendengar keempatnya, lalu
menghitung posisinya dari selisih waktu tibanya.

**Video panjang.** Trilaterasi, kenapa butuh minimal empat satelit, kenapa di
dalam gedung meleset, dan bagaimana Wi-Fi + menara seluler menambal kekurangan
GPS. Realita: akurasi nyata dalam meter, dan kenapa jam atom di satelit harus
dikoreksi karena relativitas.

- **Short 1 — Nugget:** kenapa butuh satelit keempat — tiga hanya menentukan
  posisi, yang keempat membetulkan jam HP-mu.
- **Short 2 — Jebakan:** "GPS memancarkan posisi kamu" — GPS cuma mendengarkan;
  yang mengirim posisimu adalah aplikasi.

### T03 · Kenapa rekaman video jadi buram

**L1:** Video tidak menyimpan semua gambar. Ia menyimpan satu gambar utuh, lalu
hanya mencatat apa yang berubah — dan saat banyak yang berubah sekaligus,
catatannya tidak cukup.

**Video panjang.** Keyframe vs delta frame, bitrate, kenapa adegan bergerak cepat
lebih hancur daripada adegan diam, dan beda resolusi vs ketajaman nyata. Realita:
menghitung kebutuhan penyimpanan, dan kenapa menaikkan resolusi tanpa menaikkan
bitrate justru memperburuk gambar.

- **Short 1 — Nugget:** dua rekaman 1080p, satu jernih satu hancur — bedanya
  bitrate, divisualkan sebagai jatah tinta per detik.
- **Short 2 — Jebakan:** "beli kamera resolusi tinggi biar wajah terbaca" —
  tanpa bitrate dan pencahayaan yang cukup, piksel tambahan terbuang.

### T04 · Apa isi sebuah QR code

**L1:** Kotak hitam-putih itu sebenarnya tulisan. Tiga kotak besar di sudutnya
memberi tahu kamera mana atas dan mana bawah.

**Video panjang.** Bagaimana data jadi modul hitam-putih, fungsi finder pattern,
dan koreksi kesalahan Reed–Solomon yang membuat QR tetap terbaca walau sebagian
tertutup. Realita: berapa banyak kerusakan yang masih tertoleransi, dan kenapa
QR bisa dipakai menipu.

- **Short 1 — Nugget:** QR disobek sebagian dan tetap terbaca — koreksi kesalahan
  divisualkan langsung.
- **Short 2 — Jebakan:** "QR code aman karena cuma gambar" — isinya alamat, dan
  alamat bisa dipalsukan; tunjukkan cara memeriksanya sebelum menekan.

## P2 · Di Balik Aplikasi

### T05 · Perjalanan satu alamat web

**L1:** Sebelum satu huruf pun muncul, ada tiga percakapan bolak-balik: mencari
alamat, menyapa, lalu bersalaman rahasia.

**Video panjang.** DNS → TCP handshake → TLS handshake → HTTP → render, setiap
langkah dengan angka latensi nyata. Realita: mana yang benar-benar mahal, dan
kenapa koneksi kedua jauh lebih cepat daripada yang pertama.

> **Batas dengan TCP/IP dipatok 2026-08-18 — T05 tetap berdiri, tidak dilebur.**
> Ada ide TCP/IP di [`ideas/tcp-ip/`](../ideas/tcp-ip/ide.md) yang belum masuk
> papan ini (masih `mentah`), dan ia bertabrakan di salaman. Batasnya sudah
> diputuskan sekarang, sebelum salah satunya digarap: **T05 memakai salaman
> sebagai ONGKOS** — berapa kali bolak-balik sebelum satu huruf konten terkirim
> — dan tidak pernah menjelaskan kenapa salamannya tiga langkah atau apa yang
> disepakati di situ. Yang **dilarang masuk T05**: nomor urut, kabar "sudah
> sampai", kirim ulang, gerombolan kirim, dan pembuangan potongan saat jalan
> penuh. Sebaliknya DNS, TLS, dan pertanyaan "kenapa kunjungan pertama lebih
> lambat" dilarang masuk topik TCP/IP. Peleburan ditolak karena keduanya
> menjawab pertanyaan yang berbeda — keandalan vs ongkos — dan episode yang
> menjawab dua sekaligus tidak menjawab keduanya dengan baik.
>
> **Dipersempit 2026-08-14 — DNS pindah ke T14, yang sekarang sudah tayang.**
> Di sini DNS tinggal satu beat: perjalanan bolak-balik pertama, yang mahalnya
> diukur bersama TCP dan TLS. Tangga loket, umur catatan, dan babak keamanannya
> **tidak** dibahas lagi di episode ini — dua episode yang sama-sama membuka DNS
> akan saling memakan, dan yang kalah selalu yang tayang belakangan. Sudut T05
> tetap utuh tanpa itu: pertanyaannya bukan "bagaimana nama jadi nomor",
> melainkan "kenapa kunjungan pertama selalu lebih lambat".

- **Short 1 — Nugget:** kenapa kunjungan pertama ke sebuah situs selalu lebih
  lambat — tiga perjalanan bolak-balik sebelum satu byte konten terkirim.
- **Short 2 — Jebakan:** "situs lambat karena servernya lemot" — sebagian besar
  waktu habis sebelum server tersentuh.

### T06 · Index database

**L1:** Buku telepon sepuluh ribu halaman. Kalau acak, kamu buka satu per satu.
Kalau urut, beberapa kali lompat sudah ketemu.

**Video panjang.** Full table scan → B-Tree, jumlah lompatan disk, `EXPLAIN`
sebelum-sesudah. Realita: biaya tulis, index yang tidak pernah dipakai, dan satu
fungsi di kolom `WHERE` yang membuang index yang sudah dibuat.

- **Short 1 — Nugget:** tinggi B-Tree cuma 3–4 level untuk jutaan baris — pohon
  yang melebar, bukan memanjang.
- **Short 2 — Jebakan:** "tambah index = query pasti cepat".

### T07 · Cache: cepat, tapi kadang salah

**L1:** Menyimpan jawaban di meja supaya tidak perlu bolak-balik ke gudang —
sampai isi gudangnya berubah dan jawabanmu jadi basi.

**Video panjang.** Cache-aside, TTL, dan masalah yang sebenarnya: invalidasi.
Termasuk cache stampede. Realita: data basi yang diam-diam tampil ke pengguna
selama berjam-jam, dan cara mendeteksinya.

- **Short 1 — Nugget:** cache stampede — satu key kedaluwarsa, seribu permintaan
  menghantam database bersamaan.
- **Short 2 — Jebakan:** "tinggal pasang Redis biar cepat" — cache yang salah
  invalidasi lebih berbahaya daripada tanpa cache.

## P3 · Untuk yang Menulis Kodenya

### T08 · Event loop JavaScript

**L1:** Satu pelayan untuk seluruh restoran — tapi tidak pernah berdiri diam
menunggu makanan matang.

**Video panjang.** Call stack, task queue, microtask queue, dan kenapa `Promise`
selalu mendahului `setTimeout(0)`. Realita: kode yang membekukan UI, dan cara
mengenalinya di profiler.

- **Short 1 — Nugget:** tebak urutan output dari lima baris kode — jawabannya
  dianimasikan lewat antrean yang sebenarnya.
- **Short 2 — Jebakan:** "`async` bikin kode jalan paralel" — asinkron bukan paralel.

### T09 · Apa yang terjadi saat `git commit`

**L1:** Git tidak mencatat perubahan. Ia memotret seluruh isi folder, lalu memberi
foto itu nama dari isinya sendiri.

**Video panjang.** Blob → tree → commit, kenapa hash berubah kalau satu byte
berubah, dan apa itu branch sebenarnya. Realita: kenapa `git push --force`
berbahaya, dan bagaimana commit "hilang" masih bisa ditemukan.

- **Short 1 — Nugget:** branch cuma pointer 41 byte — tunjukkan isi berkasnya.
- **Short 2 — Jebakan:** "git menyimpan perubahan" — tunjukkan objek snapshot
  utuh di `.git/objects`.

## P4 · AI & Data

### T10 · Kenapa AI bisa menjawab tapi kadang ngarang

**L1:** Ia tidak mencari jawaban. Ia menebak kata berikutnya, terus-menerus, dari
pola yang pernah dibacanya.

**Video panjang.** Token, probabilitas kata berikutnya, kenapa model tidak punya
"database fakta", dan apa arti temperature. Realita: bentuk-bentuk halusinasi
yang paling sering muncul, dan kenapa jawaban yang salah justru terdengar paling
meyakinkan.

- **Short 1 — Nugget:** satu kalimat dilanjutkan token demi token dengan
  probabilitas terlihat di layar.
- **Short 2 — Jebakan:** "AI mencari di internet lalu menjawab" — tunjukkan
  bedanya model yang menebak dan model yang benar-benar mencari.

### T11 · Kenapa rekomendasi tahu selera kamu

**L1:** Setiap tontonan menaruh kamu di satu titik pada peta. Yang direkomendasikan
adalah tontonan orang-orang yang berdiri di dekatmu.

**Video panjang.** Embedding, kemiripan vektor, collaborative filtering, dan
umpan balik yang memperkuat dirinya sendiri. Realita: filter bubble sebagai
konsekuensi matematis, bukan konspirasi.

- **Short 1 — Nugget:** dua judul berbeda kata tapi berdekatan di peta — kemiripan
  makna divisualkan.
- **Short 2 — Jebakan:** "algoritma membaca mikrofon kamu" — jelaskan kenapa
  data tontonan saja sudah cukup menjelaskan kebetulan yang terasa seram.

## P5 · Keamanan & Privasi

### T16 · Apa itu enkripsi — dibatalkan

> **Dibatalkan 2026-08-17**, saat video panjangnya sudah sampai fase komposisi —
> 16 scene, naskah dan rencana VO lengkap, Shorts belum dimulai. Seluruh
> berkasnya dikeluarkan dari repo: folder `ideas/apa-itu-enkripsi/` beserta
> pendaftarannya di `src/Root.tsx`, `package.json`, `tools/prefiks.mjs`, dan
> `tools/periksa-frame.mjs`. Arsipnya ada di riwayat git.
>
> **Kode T16 tidak dipakai ulang** — topik berikutnya mengambil T17. Kode yang
> didaur ulang membuat catatan lama di dokumen, pesan commit, dan id komposisi
> menunjuk topik yang salah, tanpa satu pun tanda.
>
> **Batas yang ikut batal:** kunci, gembok, dan segalanya yang bisa dibuka lagi
> dulu dicoret dari sudut T12 karena T16 yang memegangnya. Dengan T16 batal,
> T12 bebas memakai pembedaan sidik jari vs kotak berkunci sejauh yang ia
> butuhkan — lihat catatan di T12 di bawah.

### T12 · Apa yang terjadi saat password bocor

**L1:** Situs yang benar tidak menyimpan passwordmu. Ia menyimpan sidik jarinya —
dan sidik jari tidak bisa dibalik jadi jari.

**Video panjang.** Salt, kenapa MD5 sudah mati, dan apa yang sebenarnya dijual
saat sebuah database bocor. Realita: berapa cepat password lemah dipecahkan hari
ini, dan kenapa password manager mengubah perhitungannya.

> **BATAS INI SUDAH DINEGOSIASI DUA KALI — dan yang berlaku catatan kedua.**
>
> ~~*2026-08-17:* "Hashing vs enkripsi" boleh kembali sepenuhnya ke T12, karena
> T16 dibatalkan dan tidak ada lagi episode yang akan memakannya.~~
>
> **2026-08-18 — enkripsi TAYANG sebagai T17**, dan catatan di atas gugur
> bersamanya. Yang sudah diambil T17 dan **tidak boleh diulang** di T12:
> enkripsi, dekripsi, kunci sebagai benda yang membuka, dan seluruh gambaran
> "kalimat yang dikunci lalu dibuka lagi di ujung". Berkasnya sudah dikeluarkan
> dari repo (arsipnya di riwayat git), tapi videonya sudah ditonton orang —
> dan itu yang menentukan batas, bukan ada-tidaknya berkas.
>
> **Yang tersisa untuk T12, dan justru itu sudutnya yang paling tajam:** sidik
> jari yang **tidak dimaksudkan untuk dibalik**. T17 seluruhnya soal benda yang
> memang dirancang bisa dibuka lagi; T12 soal benda yang sengaja tidak bisa.
> Pembedaan itu sekarang punya video yang bisa dirujuk — satu kalimat "ini bukan
> seperti yang di video enkripsi" mengerjakan lebih banyak daripada penjelasan
> panjang, dan itu keuntungan yang tidak dipunyai T12 kemarin.

- **Short 1 — Nugget:** satu huruf diubah, seluruh hash berubah total — efek
  longsoran divisualkan.
- **Short 2 — Jebakan:** "password saya kuat, ada angka dan simbol" — panjang
  mengalahkan kerumitan; tunjukkan perbandingan waktu pemecahannya.

---

## Syarat sebuah topik masuk backlog

1. **Bisa dijelaskan dengan bahasa anak 5 tahun.** Tulis dulu blok "Penjelasan 5
   tahun" ≤ 60 kata tanpa satu pun istilah teknis ([09](09-tangga-abstraksi.md)).
   Kalau blok itu tidak bisa ditulis, topiknya belum dipahami cukup dalam untuk
   difilmkan — apa pun jam terbangnya.
2. **Punya lapisan untuk dua audiens.** Harus ada versi L1 yang berdiri sendiri
   **dan** L3 yang memberi developer sesuatu yang tidak ada di artikel blog.
   Topik yang hanya punya salah satunya bukan topik channel ini.
3. **Ada mekanisme untuk ditunjukkan.** Kalau penjelasannya cuma daftar poin, itu
   artikel blog. Harus ada sesuatu yang *bergerak*: data mengalir, sinyal
   memantul, state berubah.
4. **Bisa diverifikasi.** Setiap klaim bisa ditelusuri ke dokumentasi, spesifikasi,
   atau kode sumber. Topik yang jawabannya "kata orang" tidak masuk.

**Ada satu saringan lagi sesudah keempatnya, dan tempatnya bukan di sini.**
Topik yang masuk backlog belum tentu bisa dijual dalam seperempat detik — itu
diuji di **fase 1**, dengan menulis `ideas/<slug>/thumbnail.md` sebelum satu
baris naskah pun ada ([06 § Thumbnail](06-publishing.md#direncanakan-di-fase-1--thumbnailmd)).
Kalau ketegangannya tidak ketemu di situ, topiknya berhenti dan tetap di
backlog — jangan naik ke fase 2 sambil berharap ketegangannya muncul sendiri
saat menulis naskah.

## Urutan rilis yang disarankan

Enam episode pertama menentukan persepsi channel — dan untuk channel baru,
sinyal audiens yang konsisten lebih berharga daripada variasi. Karena itu
**buka dengan P1** (jangkauan paling luas), baru turunkan kedalamannya perlahan
lewat P2, dan sisipkan P3 setelah ada penonton yang bertahan.

**T13 → T03 → T10 → T06**, lalu masuk P3 (T08/T09) dan
sesuaikan dengan data retensi. T14, T15, dan T17 sudah tayang; ketiganya
membuka urutan ini.
**T05 tetap di belakang T14**: sekarang penonton sudah tahu apa yang terjadi
saat satu nama ditanyakan, jadi "kenapa kunjungan pertama lebih lambat" punya
satu dari tiga perjalanannya yang sudah dikenal — urutan sebaliknya akan memaksa
T05 menjelaskan DNS sambil lalu, persis yang dihindari.

> **Tiga episode P5 sudah tayang berturut-turut — dan T13 sekarang menagih
> hutangnya, 2026-08-18.** Urutan yang benar-benar tayang jadi T14 → T15 → T17,
> dan ketiganya "umum → dev" di pilar yang berdekatan: DNS, firewall, enkripsi.
> Rencana lama menaruh T13 di belakang T15 justru supaya lapisnya turun kembali
> ke "umum"; yang terjadi malah T17 menyisip di antaranya.
>
> Akibatnya bukan soal kerapian daftar: penonton yang datang dari ketiganya
> sudah tersaring ke satu jenis, dan episode keempat yang sejenis lagi akan
> menyempitkan kanal alih-alih melebarkannya. **T13 (sinyal penuh tapi internet
> lambat) sekarang berdiri paling depan tanpa saingan** — P1, lapis "umum", dan
> tidak bersinggungan sama sekali dengan tiga yang barusan tayang.

Alasan T13 (sinyal) dan T03 (video buram) berdiri paling depan di antara sisa
P1: keduanya pertanyaan yang benar-benar ditanyakan orang sehari-hari — saat
internet lemot, saat rekaman tidak terbaca. T05 menyusul sebagai jembatan
pertama ke materi yang lebih dalam tanpa kehilangan penonton awam.
