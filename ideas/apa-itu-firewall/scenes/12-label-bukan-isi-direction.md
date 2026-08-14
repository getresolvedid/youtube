Anggaran: mulai 258,88 dtk · durasi 29,53 dtk (estimasi, VO belum jadi).
Sembilan baris VO = sembilan tahap.

**Titik putus analogi nomor satu** (`naskah.md`), dan batas terpenting yang harus
dibawa pulang penonton. Ini juga fondasi Short 2 nanti.

Panggung menyempit: penjaga, satu pintu, dan satu kotak. Semua yang tidak
dibutuhkan dilepas dari layar supaya yang tersisa cuma pertanyaan "apa yang
dilihat penjaga".

1. panah dua arah dari scene lalu memudar. penjaganya kembali menghadap kiri.
   yang tinggal di layar cuma dia dan satu pintu.
   (VO: "Tapi ada satu hal yang tidak dia lakukan, ke arah mana pun dia menghadap.")

2. sebuah kotak masuk dari kiri dan berhenti di depan penjaga.
   (VO: "Lihat waktu sebuah kotak sampai di depannya.")

3. pandangan penjaga turun ke sisi kotak. kepalanya sedikit menunduk.
   (VO: "Dia baca labelnya.")

4. label di sisi kotak MENYALA: dua keterangan saja, asal di baris atas dan nomor
   pintu tujuan di baris bawah.
   (VO: "Dari mana, dan mau ke pintu nomor berapa.")

5. label dicocokkan ke daftar yang muncul sebentar di sisi kanan. cocok. pintu
   terbuka, kotak bergerak masuk.
   (VO: "Cocok dengan daftarnya, kotaknya lewat.")

6. sepanjang perjalanannya, pita perekat di tutup kotak tetap utuh. tidak pernah
   tersentuh, tidak pernah terangkat.
   (VO: "Kotaknya sendiri tidak pernah dibuka.")

7. isi kotaknya digambar sekilas sebagai bayangan yang menembus dindingnya —
   terlihat oleh PENONTON, tidak pernah oleh penjaga. lalu redup lagi.
   (VO: "Isinya memang bukan urusan dia.")

8. di belakang pintu, penjaga kedua muncul: bertopi berbeda, punya meja periksa,
   dan di mejanya satu kotak yang TERBUKA.
   (VO: "Makanya ada penjaga jenis lain yang tugasnya justru membuka kotak.")

9. antrean di belakang meja periksa memanjang. kotak-kotak menumpuk, dan yang
   lewat di situ jalannya jelas lebih pelan daripada yang lewat penjaga pertama.
   (VO: "Dan membuka kotak itu pekerjaan yang jauh lebih lambat.")

motion:
   - kotak masuk: `t()` x, `E.power2out`, berhenti di `X_PENJAGA - 150`
   - kepala menunduk: rotasi kecil pada grup kepala, 0 -> 8 derajat, `E.power2out`
   - label menyala: `masuk()` tanpa geser, cuma opasitas — label yang bergerak
     terbaca sebagai ditempel, padahal ia memang sudah ada di situ
   - bayangan isi: opasitas naik lalu turun dalam satu `tPP()`, pelan
   - antrean: kotak-kotak dengan tundaan tetap dan jarak antar-kotak yang MENYEMPIT
     — itu gambar dari antrean yang menumpuk

catatan:
   - **tahap 7 memperlihatkan isinya ke PENONTON, bukan ke penjaga.** itu seluruh
     ketegangan scene ini: kita tahu ada isinya, dan penjaganya tidak akan pernah
     tahu. kalau isinya tidak pernah digambar, batasnya berubah jadi keterangan
     teknis dan berhenti terasa.
   - **isi kotaknya netral**, bukan tengkorak dan bukan warna bahaya. bukan semua
     kotak yang tidak diperiksa itu jahat — yang jadi soal justru bahwa
     perbedaannya tidak pernah terlihat dari luar.
   - **BARIS 9 BERGANTUNG PADA SUMBER YANG BELUM ADA.** "jauh lebih lambat" satu-
     satunya klaim tanpa sumber di episode ini (`naskah.md § Sumber`). kalau
     sampai gerbang dibuka sumbernya belum ketemu, baris VO terakhir dicoret dan
     TAHAP 9 DI SINI IKUT DICABUT. sisa scene tetap utuh tanpanya.
   - **penjaga kedua tidak dinamai** dan tidak dijelaskan lebih jauh. ia cuma
     perlu ada sebagai bukti bahwa membuka kotak itu pekerjaan yang berbeda.
