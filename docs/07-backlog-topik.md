# 07 · Backlog Topik

Daftar topik beserta **sudut untuk kedua Shorts-nya**. Satu topik hanya boleh
masuk daftar ini kalau lolos tiga syarat di bagian bawah.

**Konstanta produksi** (nama channel, voice ID, model TTS, spesifikasi video)
tidak ditulis di sini — semuanya ada di `.env`. Lihat
[08 · Konfigurasi](08-konfigurasi.md).

---

## Papan status

| Kode | Topik | Pilar | Status |
|---|---|---|---|
| T01 | Index database & B-Tree | P1 | belum mulai |
| T02 | Perjalanan satu URL | P1 | belum mulai |
| T03 | Hash map dari dalam | P1 | belum mulai |
| T04 | Event loop JavaScript | P2 | belum mulai |
| T05 | Git internals: `git commit` | P2 | belum mulai |
| T06 | Caching & invalidasi | P3 | belum mulai |
| T07 | Garbage collector | P1 | belum mulai |
| T08 | Rate limiting | P3 | belum mulai |
| T09 | Docker layer & ukuran image | P2 | belum mulai |
| T10 | Debugging sistematis | P4 | belum mulai |
| T11 | Embedding & kenapa RAG meleset | P5 | belum mulai |
| T12 | Isolation level & bug saat ramai | P3 | belum mulai |

Status: `belum mulai → riset → naskah → vo → komposisi → render → publish`.

---

## T01 · Index database & B-Tree — P1

**Video panjang.** Dari full table scan ke B-Tree: kenapa mencari satu baris di
tabel sepuluh juta baris bisa selesai dalam tiga milidetik. Bedah struktur
pohonnya, hitung jumlah lompatan disk, lalu tunjukkan `EXPLAIN` sebelum-sesudah.
Babak realita: biaya tulis, index yang tidak pernah dipakai, dan kenapa
`WHERE lower(email) = ...` membuang index yang sudah kamu buat.

- **Short 1 — Nugget:** kenapa tinggi B-Tree cuma 3–4 level untuk jutaan baris,
  divisualkan sebagai pohon yang melebar bukan memanjang.
- **Short 2 — Jebakan:** "tambah index = query pasti cepat" — tunjukkan satu
  fungsi di kolom `WHERE` yang membatalkan seluruh index.

## T02 · Perjalanan satu URL — P1

**Video panjang.** Kamu mengetik alamat lalu menekan Enter. Bedah rantainya:
resolusi DNS, TCP handshake, TLS handshake, request HTTP, respons, render.
Setiap langkah diberi angka latensi nyata sehingga penonton tahu mana yang
benar-benar mahal.

- **Short 1 — Nugget:** kenapa koneksi pertama ke sebuah situs selalu lebih
  lambat — tiga perjalanan bolak-balik sebelum satu byte konten pun terkirim.
- **Short 2 — Jebakan:** "situs lambat karena servernya lemot" — sebagian besar
  waktu justru habis sebelum server tersentuh.

## T03 · Hash map dari dalam — P1

**Video panjang.** Kenapa lookup bisa O(1), apa itu collision, bagaimana
resizing bekerja, dan kapan O(1) berubah jadi O(n). Visual: bucket, fungsi hash,
rantai collision, rehash saat load factor terlampaui.

- **Short 1 — Nugget:** animasi satu operasi resize — kenapa satu `insert` yang
  biasanya instan tiba-tiba jadi operasi termahal di programmu.
- **Short 2 — Jebakan:** "hash map selalu O(1)" — tunjukkan input bermusuhan
  yang membuat semua kunci jatuh ke satu bucket.

## T04 · Event loop JavaScript — P2

**Video panjang.** Satu thread, tapi tidak pernah menunggu. Call stack,
task queue, microtask queue, dan urutan eksekusi yang bikin `Promise` selalu
mendahului `setTimeout(0)`. Ditutup dengan kasus nyata: kode yang membekukan UI.

- **Short 1 — Nugget:** tebak urutan output dari lima baris kode — jawabannya
  dianimasikan lewat antrean yang sebenarnya.
- **Short 2 — Jebakan:** "`async` bikin kode jalan paralel" — asinkron bukan
  paralel, dan ini bedanya.

## T05 · Git internals: `git commit` — P2

**Video panjang.** Git bukan penyimpan diff, tapi penyimpan snapshot yang
diberi alamat berdasarkan isinya. Bedah blob → tree → commit, kenapa hash-nya
berubah kalau satu byte berubah, dan apa artinya branch (ternyata cuma satu
berkas berisi satu baris).

- **Short 1 — Nugget:** branch itu cuma pointer 41 byte — tunjukkan isi berkasnya
  langsung.
- **Short 2 — Jebakan:** "git menyimpan perubahan" — tunjukkan objek snapshot
  utuh di `.git/objects`.

## T06 · Caching & invalidasi — P3

**Video panjang.** Cache-aside, write-through, TTL, dan masalah yang sebenarnya:
invalidasi. Termasuk cache stampede dan cara mencegahnya. Realita: data basi
yang diam-diam tampil ke pengguna selama berjam-jam.

- **Short 1 — Nugget:** cache stampede divisualkan — satu key kedaluwarsa,
  seribu request menghantam database bersamaan.
- **Short 2 — Jebakan:** "tinggal pasang Redis biar cepat" — cache yang salah
  invalidasi lebih berbahaya daripada tanpa cache.

## T07 · Garbage collector — P1

**Video panjang.** Kenapa aplikasi tiba-tiba diam sepersekian detik. Mark and
sweep, generational hypothesis, stop-the-world pause. Visual: heap yang terisi,
objek yang ditandai, pause yang muncul di grafik latensi p99.

- **Short 1 — Nugget:** kenapa objek berumur pendek justru hampir gratis —
  generational hypothesis dalam 45 detik.
- **Short 2 — Jebakan:** "ada GC berarti tidak mungkin memory leak" — tunjukkan
  listener yang tidak pernah dilepas.

## T08 · Rate limiting — P3

**Video panjang.** Token bucket vs leaky bucket vs sliding window. Kenapa fixed
window bocor tepat di batas jendela. Bagaimana memilih angka limit yang tidak
asal, dan apa yang dikembalikan ke klien (`429` + `Retry-After`).

- **Short 1 — Nugget:** animasi token bucket — kenapa burst pendek boleh lewat
  tapi banjir konstan ditahan.
- **Short 2 — Jebakan:** "limit 100 per menit" dengan fixed window sebenarnya
  mengizinkan 200 request dalam dua detik.

## T09 · Docker layer & ukuran image — P2

**Video panjang.** Kenapa image-mu 1,2 GB padahal aplikasinya 8 MB. Layer,
copy-on-write, urutan instruksi yang membunuh cache build, dan multi-stage build
yang memangkas 90%. Realita: berkas yang terhapus di layer atas tetap ikut terbawa.

- **Short 1 — Nugget:** urutan `COPY` dan `RUN` yang benar — satu baris ditukar,
  build 4 menit jadi 8 detik.
- **Short 2 — Jebakan:** "`RUN rm -rf` mengecilkan image" — layer sebelumnya
  tetap ada di dalam.

## T10 · Debugging sistematis — P4

**Video panjang.** Dari menebak ke metode: reproduksi stabil, bisection,
mempersempit ruang cari, dan mencatat hipotesis. Studi kasus satu bug nyata yang
dibongkar langkah demi langkah.

- **Short 1 — Nugget:** aturan bisection — setiap percobaan harus memotong ruang
  cari jadi separuh, kalau tidak, itu bukan debugging tapi menebak.
- **Short 2 — Jebakan:** "bug-nya tidak bisa direproduksi" — biasanya artinya
  ada variabel yang belum kamu kunci.

## T11 · Embedding & kenapa RAG meleset — P5

**Video panjang.** Bagaimana teks jadi vektor, apa arti "dekat" di ruang vektor,
dan kenapa pencarian semantik mengambil dokumen yang salah. Chunking, ukuran
potongan, dan kenapa pencarian kata kunci kadang tetap menang.

- **Short 1 — Nugget:** visual dua kalimat berbeda kata tapi berdekatan di ruang
  vektor — dan satu pasangan yang justru menipu.
- **Short 2 — Jebakan:** "chunk lebih besar = konteks lebih baik" — tunjukkan
  bagaimana potongan gemuk mengaburkan sinyal.

## T12 · Isolation level & bug saat ramai — P3

**Video panjang.** Bug yang tidak pernah muncul di laptop tapi rutin muncul jam
delapan malam. Dirty read, non-repeatable read, phantom, lost update — masing-masing
dengan dua transaksi yang dianimasikan berdampingan di garis waktu.

- **Short 1 — Nugget:** lost update dalam 40 detik: dua transaksi membaca saldo
  yang sama, satu pembayaran hilang.
- **Short 2 — Jebakan:** "pakai transaksi berarti aman" — transaksi tanpa level
  isolasi yang tepat tetap kehilangan data.

---

## Syarat sebuah topik masuk backlog

1. **Bisa dijelaskan dengan bahasa anak 5 tahun.** Tulis dulu blok "Penjelasan 5
   tahun" ≤ 60 kata tanpa satu pun istilah teknis
   ([09](09-tangga-abstraksi.md)). Kalau blok itu tidak bisa ditulis, topiknya
   belum dipahami cukup dalam untuk difilmkan — apa pun jam terbangnya.
2. **Ada mekanisme untuk ditunjukkan.** Kalau penjelasannya cuma daftar poin,
   itu artikel blog, bukan video kita. Harus ada sesuatu yang *bergerak*:
   data mengalir, state berubah, pohon dijelajahi.
3. **Cukup untuk dua sudut Shorts yang berbeda.** Kalau Short 1 dan Short 2 bisa
   saling menggantikan, topiknya terlalu tipis — gabung dengan topik lain.
4. **Bisa diverifikasi.** Setiap klaim bisa ditelusuri ke dokumentasi, spesifikasi,
   atau kode sumber. Topik yang jawabannya "kata orang" tidak masuk.

Tambahan yang bagus tapi tidak wajib: topiknya sering muncul di code review,
sering salah dipahami, atau sering ditanya pemula-menengah di komunitas.

## Urutan rilis yang disarankan

Enam episode pertama menentukan persepsi channel. Urutan ini menyebar pilar,
membuka dengan topik yang paling luas peminatnya, dan menaruh topik teknis berat
setelah penonton percaya.

**T01 → T04 → T02 → T05 → T06 → T03**, lalu bebas mengikuti data retensi.
