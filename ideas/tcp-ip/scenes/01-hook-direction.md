Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Tiga baris VO = tiga tahap.

Scene pembuka. Tugasnya satu: memindahkan penonton dari benda yang dikenal
(laptop di meja) ke ruang yang jadi panggung sepuluh scene berikutnya (jaringan).
Perpindahannya lewat **kamera**, bukan lewat potong — supaya ruangnya terbaca
sebagai tempat yang sama, cuma dilihat dari jarak yang berbeda.

1. laptop di tengah, layarnya menyala dan sebuah halaman sedang dimuat (bilah
   pemuatan berjalan). kamera mendekat perlahan, skala 1 → 1,22.
   (VO: "Pernahkah kamu berpikir, bagaimana sebuah pesan bisa dikirim…")

2. dari laptop keluar titik-titik cahaya kecil ke kanan sepanjang jalur tengah.
   titik pertama membesar jadi satu potongan kiriman. kamera masih mendekat.
   (VO: "Bagaimana saat kamu membuka sebuah website…")

3. kamera MUNDUR CEPAT, skala 1,22 → 0,58. laptop mengecil jadi satu benda kecil
   di kiri. jaring jaringan mekar dari tengah ke tepi, menyala bertahap. nama
   topiknya muncul di tengah jaring.
   (VO: "…aturan komunikasi yang disebut TCP/IP.")

motion:
   - dorong masuk: `t()` pada skala kamera, `E.sineInOut`, pelan dan panjang —
     ia harus tidak disadari sampai tahap 3 membalikkannya
   - mundur cepat: `t()` durasi 1,1 dtk dengan `E.expoOut`. kontras kecepatannya
     yang bikin tahap 3 terasa seperti "membuka mata", bukan sekadar zoom keluar
   - titik cahaya: enam titik dengan `mulai` berselang 0,12 dtk, x-nya `t()`
     linear ke kanan, opacity memudar di ujung jalur
   - jaring: `JaringLatar` dengan `maju` 0 → 1, tiap rusuk menyala menurut
     indeksnya — bukan sekaligus, supaya terbaca "menyebar"
   - nama topik: `masuk()` dengan `geser` 22, tertunda 0,45 dtk setelah mundurnya
     berhenti

catatan:
   - **jaringnya deterministik** (`SIMPUL_LATAR`, `RUSUK_LATAR` di
     `panggung-jaringan.tsx`). posisi acak dilarang: Remotion merender frame
     1.234 tanpa pernah merender 1.233, jadi jaring acak berkedip beda tiap
     frame dan pecah total saat render paralel.
   - **laptop tidak hilang saat kamera mundur.** ia mengecil dan tetap di kiri,
     karena scene 11 kembali ke laptop yang sama — kalau ia menghilang di sini,
     kepulangan itu terbaca sebagai benda baru.
   - frame terakhir scene ini adalah frame pertama `02-opening`: kartu judul
     mengambil alih layar penuh. jahitan: menganga — kartu judul memang layar
     lain (docs/10).
   - SFX diminta storyboard tapi tidak dibangun; catatannya di berkas VO.
