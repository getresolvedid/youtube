Anggaran: mulai 347,88 dtk · durasi 32,60 dtk (estimasi, VO belum jadi).
Sebelas baris VO = sebelas tahap.

Scene penutup. **Titik putus analogi nomor dua** (`naskah.md`) sekaligus kalimat
bawa-pulang episode. Tidak ada babak rangkuman terpisah — kalimatnya jatuh di
sini, lalu langsung tanda brand.

**Kamera mundur untuk ketiga dan terakhir kalinya**, tapi sebelum itu ia MAJU ke
dalam: satu-satunya kali di episode ini sumber gerakan datang dari dalam gedung.

1. ketukan dari luar masih berdatangan seperti scene lalu, lalu semuanya meredup
   sampai hampir hilang.
   (VO: "Ada satu pintu lagi yang jauh lebih sering dipakai.")

2. kamera berbalik menghadap ke dalam gedung. arah pandang seluruh panggung
   berubah, dan penjaganya sekarang terlihat dari belakang.
   (VO: "Bukan dari luar. Dari dalam.")

3. satu permintaan berangkat dari dalam ke luar lewat pintu yang terbuka. kecil,
   biasa, tidak ada yang mencurigakan padanya.
   (VO: "Kamu klik sesuatu, dan kamu sendiri yang memanggil kotaknya masuk.")

4. buku catatan terbuka di tangan penjaga, di halaman yang sama dengan scene 7.
   (VO: "Penjaganya buka bukunya.")

5. barisnya menyala cocok — dan tangan yang menulis baris itu datang dari DALAM
   gedung, bukan dari penjaga.
   (VO: "Ada barisnya. Dan kamu yang menulis baris itu tadi.")

6. penjaganya melangkah minggir satu langkah. kotak pulang lewat pintu, masuk.
   (VO: "Jadi dia minggir, dan kotaknya lewat.")

7. penjaganya tetap berdiri tegak di posnya. tidak ada yang jatuh, tidak ada
   yang miring.
   (VO: "Itu bukan penjaganya kebobolan.")

8. tidak ada satu pun tanda bahaya di layar. daftarnya masih di tempatnya,
   bukunya masih terbuka, semuanya rapi.
   (VO: "Itu penjaganya bekerja persis seperti seharusnya.")

9. kamera MUNDUR ke gedung utuh. deretan pintu terkunci menyala satu demi satu,
   dari kiri bawah ke kanan atas.
   (VO: "Firewall menjaga pintu yang tidak pernah kamu buka.")

10. semuanya menyala tenang, rapat, memenuhi dinding. banyak sekali, dan tidak
    satu pun dari mereka pernah jadi masalah.
    (VO: "Dan itu banyak.")

11. satu per satu meredup, sampai yang tinggal menyala cuma SATU pintu yang
    terbuka — pintu yang sama dengan scene 14. panggungnya menahan diri di situ
    sampai scene habis.
    (VO: "Tapi pintu yang kamu buka sendiri, tetap tanggung jawabmu sendiri.")

motion:
   - kamera berbalik: `scaleX -1` pada seluruh panggung dilarang — teksnya ikut
     terbalik. yang dipakai `hadap` penjaga + arah gerak benda yang dibalik
   - buku terbuka: sama persis dengan tahap 4 scene 7, supaya terbaca sebagai
     benda yang sama dan bukan benda mirip
   - tangan dari dalam: `gambarGaris()` pada baris buku, arah gambarnya dari
     kanan ke kiri — kebalikan arah tulis penjaga di scene 7
   - minggir: `t()` x pada penjaga, kecil, 40 px, lalu tinggal di situ
   - pintu menyala tahap 9 dan 10: `masuk()` dengan `urutan` 0..7, `jeda` 0,09
   - tahap 11: opasitas seluruh pintu turun kecuali `I_PINTU_DIBUKA`

catatan:
   - **tahap 7 dan 8 sengaja memperlihatkan penjaga yang baik-baik saja.** kalau
     di sini ia digambar gagal atau terdesak, seluruh episode berubah jadi cerita
     bahwa firewall itu lemah — padahal isinya justru bahwa ia melakukan tepat
     yang diminta.
   - **frame terakhir episode sebelum tanda brand adalah GAMBAR, bukan teks.**
     satu pintu menyala di dinding yang gelap. kalimat bawa-pulangnya sudah
     diucapkan; menuliskannya lagi di layar berarti tidak percaya pada VO-nya.
   - **tangan yang menulis di tahap 5 datang dari dalam**, dan arah menggambarnya
     berlawanan dengan scene 7. itu satu-satunya pembeda visual antara "penjaga
     mencatat" dan "kamu yang menyuruh", dan seluruh scene ini bergantung padanya.
   - **tidak ada CTA di scene ini.** ajakan berlangganan cuma di tanda brand
     penutup (docs/02).
