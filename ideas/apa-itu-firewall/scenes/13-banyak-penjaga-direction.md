Anggaran: mulai 288,41 dtk · durasi 30,84 dtk (estimasi, VO belum jadi).
Sembilan baris VO = sembilan tahap.

**Titik putus analogi nomor tiga** (`naskah.md`). Sepanjang episode penonton
memegang gambaran satu penjaga, dan gambaran itu perlu dilepas sebelum bagian 7.

**Kamera mundur untuk kedua kalinya di episode ini** — yang pertama di scene 1,
mengubah laptop jadi gedung; yang ini mengubah gedung jadi satu bangunan di
antara banyak. Gerakan yang sama, dipakai untuk membalik subjek yang berbeda.

1. penjaga tunggal berdiri di depan gedungnya, persis seperti sejak scene 6.
   penjaga kedua dari scene 12 masih terlihat sekilas di belakang pintu, lalu
   memudar — ia yang dijemput baris pertama.
   (VO: "Dan penjaga kedua tadi bukan pengecualian.")

2. kamera MUNDUR jauh. gedung itu mengecil sampai jadi satu bangunan di antara
   beberapa, semuanya berdiri di garis lantai yang sama.
   (VO: "Mundur sedikit, lihat lebih luas.")

3. sebuah gerbang tergambar di depan seluruh komplek, dengan penjaganya sendiri
   yang berdiri di situ. ukurannya lebih besar, jaraknya lebih jauh ke kiri.
   (VO: "Ada satu di gerbang depan, menjaga semua rumah di komplek itu sekaligus.")

4. kamera masuk sedikit ke gedung asal: penjaga aslinya masih di sana, menempel
   di pintu rumahnya sendiri, ukurannya kecil sekarang.
   (VO: "Ada satu lagi menempel di pintu rumahmu sendiri.")

5. di sebelahnya, satu bangunan bertingkat. tiap kamar punya penjaga kecilnya
   sendiri, berjajar di depan pintunya masing-masing.
   (VO: "Di gedung sewaan, tiap kamar punya penjaganya masing-masing.")

6. tiga daftar terbuka berdampingan, satu untuk tiap penjaga. barisnya jelas
   tidak sama panjang dan tidak sama susunannya.
   (VO: "Mereka tidak saling bertanya, dan daftarnya bisa berbeda.")

7. satu ketukan masuk lewat gerbang dan LEWAT. ketukan yang sama persis ditolak
   di pintu rumah dan berbalik.
   (VO: "Jadi yang satu menolak, yang lain mempersilakan, di gedung yang sama.")

8. ketiga penjaga menyala bersamaan. TIDAK ada satu pun garis yang menghubungkan
   mereka.
   (VO: "Punya penjaga tidak pernah cukup jadi jawaban.")

9. ketiganya tinggal di layar, berjajar, tanpa satu pun ditunjuk sebagai yang
   benar.
   (VO: "Yang mana dulu.")

motion:
   - kamera mundur: `kamera({skala})` 1,0 -> 0,52 dengan `E.expoOut`, satu
     transform untuk seluruh panggung
   - bangunan lain: `masuk()` dengan `urutan`, geser 0 — mereka tidak datang,
     mereka memang sudah ada dan baru terlihat
   - ketukan bercabang di tahap 7: satu `t()` sampai gerbang, lalu DUA tween
     terpisah — satu lanjut, satu berbalik
   - tiga daftar: `masuk()` bersamaan tanpa stagger; mereka dibandingkan, bukan
     dibaca berurutan

catatan:
   - **tahap 8 sengaja TIDAK menggambar garis penghubung.** ketiadaan garis itu
     isi barisnya: mereka tidak saling bertanya. kalau digambar terhubung,
     penonton pulang dengan gambaran satu sistem berlapis yang terkoordinasi —
     kebalikan dari kenyataannya.
   - **ketukan di tahap 7 harus benar-benar benda yang SAMA**, digambar dengan
     komponen yang sama, supaya "diperlakukan berbeda" tidak bisa dibaca sebagai
     "memang dua hal berbeda".
   - **gedung sewaan tidak dinamai** dan tidak diberi label. bentuk bertingkat
     dengan penjaga di tiap kamar sudah cukup.
   - **penjaga asli tidak boleh hilang saat kamera mundur.** ia harus tetap
     terlihat menempel di pintunya, karena scene 14 kembali ke dia.
