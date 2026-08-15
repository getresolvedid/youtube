# 07 · Backlog Topik

Daftar topik beserta **sudut untuk kedua Shorts-nya**. Satu topik hanya boleh
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
| **T01** | **Apa itu RAM** | P1 | umum | **riset** ← episode pertama |
| T13 | Sinyal penuh tapi internet lambat | P1 | umum | belum mulai |
| T02 | Bagaimana HP tahu posisi kamu | P1 | umum | belum mulai |
| T03 | Kenapa rekaman video jadi buram | P1 | umum | belum mulai |
| T04 | Apa isi sebuah QR code | P1 | umum | belum mulai |
| **T14** | **Apa itu DNS server** | P2 | umum → dev | **naskah** |
| T05 | Perjalanan satu alamat web | P2 | umum → dev | belum mulai — dipersempit, lihat T14 |
| T06 | Index database | P2 | umum → dev | belum mulai |
| T07 | Cache: cepat, tapi kadang salah | P2 | umum → dev | belum mulai |
| T08 | Event loop JavaScript | P3 | dev | belum mulai |
| T09 | Apa yang terjadi saat `git commit` | P3 | dev | belum mulai |
| T10 | Kenapa AI bisa menjawab tapi kadang ngarang | P4 | umum | belum mulai |
| T11 | Kenapa rekomendasi tahu selera kamu | P4 | umum → dev | belum mulai |
| **T15** | **Apa itu firewall** | P5 | umum → dev | **naskah** |
| **T16** | **Apa itu enkripsi** | P5 | umum → dev | **komposisi** ← video panjang jadi |
| T12 | Apa yang terjadi saat password bocor | P5 | umum | belum mulai |

Status: `belum mulai → riset → naskah → vo → komposisi → render → publish`.

---

## P1 · Cara Kerja Sehari-hari

### T01 · Apa itu RAM ← episode pertama

**L1:** RAM itu meja kerja, hard disk itu lemari arsip. Kamu tidak membaca
dokumen di dalam lemari — kamu ambil, taruh di meja, baru kerjakan. Meja lebih
besar berarti lebih banyak yang terbuka sekaligus tanpa bolak-balik. Kalau meja
penuh, berkas mulai ditumpuk di lantai.

**Titik putus analogi:** meja tetap berisi saat kamu pulang; RAM kosong total
begitu listrik mati. Dan CPU tidak mengambil langsung dari meja — ada meja kecil
yang jauh lebih dekat, namanya cache.

**Video panjang.** Kenapa komputer butuh dua tempat penyimpanan yang berbeda,
bukan satu yang besar. Bedah hierarkinya dari register → cache → RAM → SSD, dengan
skala waktu yang dibuat bisa dibayangkan manusia. Lalu: apa yang sebenarnya
terjadi saat RAM penuh (swap), dan kenapa RAM harus disegarkan ribuan kali per
detik hanya untuk mengingat. Realita: kapan menambah RAM benar-benar membantu dan
kapan sama sekali tidak, dibaca dari indikator yang tepat.

- **Short 1 — Nugget:** skala waktu dibuat manusiawi. Kalau mengambil data dari
  cache itu 1 detik, dari RAM sekitar satu menit, dan dari hard disk sekitar dua
  bulan. Satu animasi, satu insight, berdiri sendiri.
- **Short 2 — Jebakan:** "RAM lebih besar = komputer lebih cepat." Hanya benar
  sampai mejanya cukup besar; setelah itu tambahan RAM tidak memberi apa-apa.
  Tunjukkan indikator mana yang harus dilihat sebelum membeli.

**Kenapa ini episode pertama:** pertanyaan yang benar-benar ditanyakan orang saat
membeli HP atau laptop, mekanismenya mudah dianimasikan, dan babak realitanya
cukup dalam untuk developer (hierarki cache dan locality). Lolos keempat syarat
di bawah tanpa dipaksakan.

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

### T14 · Apa itu DNS server

**L1:** Setiap tempat di internet punya nomor, bukan nama. Kamu cuma hafal
namanya. Jadi sebelum berangkat, komputermu bertanya dulu ke loket: nomor tempat
ini berapa? Loketnya tidak tahu semua, tapi ia tahu harus bertanya ke siapa.

**Titik putus analogi:** loketnya tidak memegang buku — ia cuma menunjuk loket
berikutnya. Catatan jawabannya punya umur, jadi dua orang bisa mendapat jawaban
berbeda untuk nama yang sama di detik yang sama. Dan tidak ada yang memeriksa
identitas loket: siapa pun di jalur bisa menjawab duluan.

**Video panjang.** Kenapa satu nama harus ditanyakan dulu sebelum satu huruf pun
terkirim, dan kenapa jawabannya sengaja **tidak** disimpan di satu tempat. Nama
dibaca dari kanan ke kiri; pertanyaannya naik tangga loket sampai ke pemilik
situsnya, lalu jawabannya dicatat di sepanjang jalan pulang. Realita: umur
catatan yang membuat pergantian alamat terasa "belum merata", pemblokiran yang
bekerja dengan membuat loket menjawab salah, dan pertanyaan yang terkirim polos
— beserta dua tambalan yang sering dikira satu barang.

- **Short 1 — Nugget:** nama situs itu dibaca dari belakang. Titik paling kanan
  lebih dulu; tiap potongan membuka satu loket berikutnya.
- **Short 2 — Jebakan:** "ganti DNS biar internet kencang." Yang berubah cuma
  waktu bertanya alamat, sekali di awal. Situs yang jadi terbuka itu **terbuka**,
  bukan **kencang**.

**Batasnya dengan T05:** DNS berdiri sendiri di sini — tangga loket, umur
catatan, dan babak keamanannya tidak muat sebagai satu langkah di dalam T05.
Yang tinggal di T05 cuma perannya sebagai perjalanan bolak-balik pertama.

### T05 · Perjalanan satu alamat web

**L1:** Sebelum satu huruf pun muncul, ada tiga percakapan bolak-balik: mencari
alamat, menyapa, lalu bersalaman rahasia.

**Video panjang.** DNS → TCP handshake → TLS handshake → HTTP → render, setiap
langkah dengan angka latensi nyata. Realita: mana yang benar-benar mahal, dan
kenapa koneksi kedua jauh lebih cepat daripada yang pertama.

> **Dipersempit 2026-08-14 — DNS pindah ke [T14](#t14--apa-itu-dns-server).**
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

### T15 · Apa itu firewall

**L1:** Rumahmu punya banyak pintu. Supaya bisa menerima kiriman, sebagian harus
bisa diketuk — dan siapa pun boleh mengetuk. Jadi ditaruh satu penjaga di depan,
dengan daftar siapa yang boleh lewat. Ia juga mencatat tiap kiriman yang kamu
pesan sendiri, supaya cuma jawaban yang kamu tunggu yang boleh masuk.

**Titik putus analogi:** penjaganya tidak pernah membuka kotaknya — ia cuma
membaca label. Buku catatannya cuma berisi percakapan yang kamu mulai sendiri,
jadi apa pun yang kamu undang sudah punya barisnya di sana. Dan penjaganya bukan
satu orang: ada beberapa, berlapis, dan yang satu bisa mengizinkan apa yang
ditolak yang lain.

**Video panjang.** Kenapa mesin yang sedang kamu pakai harus bisa dihubungi siapa
pun supaya berguna sama sekali — dan bagaimana satu buku catatan kecil
menyelesaikan hal yang terlihat mustahil: membedakan jawaban yang kamu tunggu
dari orang asing, padahal keduanya datang dari arah yang sama lewat pintu yang
sama. Lalu daftarnya dibedah: dibaca dari atas dan berhenti di baris pertama yang
cocok, baris terakhirnya berbunyi "selain itu, tidak", dan penjaganya berdiri dua
arah. Realita: firewall gagal bukan karena ditembus, tapi karena kita sendiri
yang menyuruhnya minggir — satu pintu dibuka untuk kamera rumah, satu kotak
diundang masuk dan labelnya memang benar.

- **Short 1 — Nugget:** cara paling aman menjawab ketukan adalah tidak menjawab.
  Pintu yang bilang "tidak" sudah membocorkan bahwa pintunya ada; pintu yang diam
  memulangkan pengetuknya dengan peta kosong.
- **Short 2 — Jebakan:** "sudah ada firewall, jadi aman dari virus." Penjaganya
  membaca label, tidak pernah membuka kotaknya — dan kotak yang paling sering
  jadi masalah adalah yang kamu pesan sendiri.

**Batasnya dengan T12:** sama-sama P5 dan tidak bersinggungan. T12 soal apa yang
terjadi pada rahasia yang sudah diberikan; T15 soal siapa yang boleh mengetuk
sejak awal. **Dengan T05:** T05 memakai pintu bernomor sebagai *tujuan yang
dituju*, T15 sebagai *yang dijaga* — tidak ada scene T15 yang menjelaskan salaman
TCP.

### T16 · Apa itu enkripsi

**L1:** Kamu menitipkan surat lewat banyak tangan. Supaya tidak dibaca di jalan,
suratnya ditaruh di kotak yang dikunci. Masalahnya, kuncinya lewat jalan yang
sama. Jadi orang yang kamu kirimi membagikan gembok terbukanya ke siapa saja.
Siapa pun bisa mengunci — tapi cuma dia yang punya kunci pembukanya.

**Titik putus analogi:** gembok terbuka tidak membuktikan siapa pemiliknya —
siapa pun bisa menyodorkan gemboknya sambil mengaku toko itu. Kotak terkunci
menyembunyikan isi, bukan pengirimannya: ke mana, sebesar apa, dan sesering apa
tetap terbaca. Dan gemboknya tidak benar-benar dipakai mengantar kunci — di
praktik sekarang keduanya menyusun kunci yang sama di dua meja sekaligus.

**Video panjang.** Bukan "bagaimana tulisan diacak" — itu bagian yang paling
mudah dan paling tidak penting. Pertanyaannya: bagaimana dua pihak yang **belum
pernah bertemu** menyepakati satu rahasia di jalan yang semua orang dengarkan,
saat kuncinya harus ikut lewat jalan yang sama dengan kotaknya. Lalu dibedah:
kenapa gembok yang bagus cuma dipakai di menit pembukaan, kenapa terkunci belum
berarti utuh, kenapa kuncinya dibuang setelah dipakai, dan kenapa labelnya
justru harus tetap terbaca. Realita: yang jebol hampir tidak pernah gemboknya —
kotaknya dibuka di ujung, dan ujungnya bukan yang kamu kira.

- **Short 1 — Nugget:** ada kotak yang bisa kamu kunci tapi tidak bisa kamu buka
  lagi. Gembok yang mengunci dan kunci yang membuka adalah dua benda berbeda,
  dan yang pertama boleh ditaruh di depan umum.
- **Short 2 — Jebakan:** "ada gemboknya, berarti situsnya aman." Gemboknya
  menjanjikan tepat dua hal — tidak ada yang membaca di jalan, dan namanya
  cocok. Bahwa nama itu jujur, tidak pernah termasuk.

**Batasnya dengan T12:** T16 memegang **kotak yang memang dirancang untuk dibuka
lagi**; T12 memegang **sidik jari yang tidak bisa dibalik**. **Dengan T05:** T05
memakai salaman rahasia sebagai *ongkos* satu perjalanan bolak-balik, T16
memegang isi salamannya — dan tidak ada scene T16 yang menghitung waktu.
**Dengan T15:** bersambung, tidak bertabrakan — penjaga T15 membaca label dan
tidak pernah membuka kotaknya, dan T16 menjelaskan kenapa labelnya memang harus
tetap terbaca.

### T12 · Apa yang terjadi saat password bocor

**L1:** Situs yang benar tidak menyimpan passwordmu. Ia menyimpan sidik jarinya —
dan sidik jari tidak bisa dibalik jadi jari.

**Video panjang.** Salt, kenapa MD5 sudah mati, dan apa yang sebenarnya dijual
saat sebuah database bocor. Realita: berapa cepat password lemah dipecahkan hari
ini, dan kenapa password manager mengubah perhitungannya.

> **"Hashing vs enkripsi" dicoret dari sudut T12 — 2026-08-14.** Kunci, gembok,
> dan segalanya yang bisa dibuka lagi milik [T16](#t16--apa-itu-enkripsi), yang
> tayang lebih dulu. Yang tinggal di T12 satu kalimat pembeda: sidik jari tidak
> punya kunci, dan memang tidak dimaksudkan untuk dibalik. Dua episode yang
> sama-sama menjelaskan kunci akan saling memakan, dan yang kalah selalu yang
> tayang belakangan.

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

**T01 → T14 → T15 → T16 → T13 → T03 → T10 → T06**, lalu masuk P3 (T08/T09) dan
sesuaikan dengan data retensi. **T05 turun ke belakang T14**: setelah penonton tahu apa
yang terjadi saat satu nama ditanyakan, "kenapa kunjungan pertama lebih lambat"
punya satu dari tiga perjalanannya yang sudah dikenal — dan urutan sebaliknya
memaksa T05 menjelaskan DNS sambil lalu, persis yang baru saja dihindari.

> **T15 naik ke posisi ketiga — diputuskan 2026-08-14.** Bukan karena ia lebih
> penting daripada T13, tapi karena ia menempel rapat ke T14 yang tayang tepat
> sebelumnya: T14 menutup dengan pertanyaan yang dikirim polos dan siapa pun di
> jalur bisa menjawabnya duluan, dan T15 justru soal siapa yang berdiri di jalur
> itu. Dua episode berturut-turut di lapis "umum → dev" adalah risikonya, dan
> itu diterima sadar — T13 turun satu posisi, bukan dicoret.

> **T16 menyusul tepat di belakang T15 — diputuskan 2026-08-14.** Alasannya satu
> kalimat: T15 menutup dengan penjaga yang **cuma membaca label dan tidak pernah
> membuka kotaknya**, dan T16 membuka dengan pertanyaan siapa yang bisa membaca
> isinya. Konsekuensinya **tiga episode berturut-turut di lapis "umum → dev"**
> (T14 → T15 → T16), dan itu risiko yang diambil sadar, bukan kelalaian: yang
> ditukar adalah keragaman lapis dengan sambungan antar-episode yang tidak akan
> pernah sekuat ini lagi. Kalau data retensi T15 turun tajam, yang disisipkan di
> antaranya T13 — bukan T16 yang dipindah ke belakang.

Alasan tiga yang pertama: T01 (RAM), T13 (sinyal), dan T03 (video buram) adalah
pertanyaan yang benar-benar ditanyakan orang sehari-hari — saat membeli HP,
saat internet lemot, saat rekaman tidak terbaca. T05 menyusul sebagai jembatan
pertama ke materi yang lebih dalam tanpa kehilangan penonton awam.
