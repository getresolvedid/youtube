Anggaran: mulai 148,29 dtk · durasi 24,23 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Scene 7 menjelaskan bagaimana yang benar bisa masuk; scene ini menjelaskan kenapa
yang tidak disebut sama sekali tidak bisa. Bendanya sudah ada di layar sejak
scene 6 — yang berubah cuma ke mana penonton melihat.

1. buku catatan menutup dan mengecil kembali ke tangan penjaga. daftar maju ke
   depan, kali ini UTUH sampai baris paling bawah.
   (VO: "Dan yang paling menentukan justru baris paling bawah daftarnya.")

2. kamera turun menyusuri daftar, dari baris teratas sampai ke baris terakhir.
   (VO: "Isinya cuma satu kalimat pendek.")

3. baris terakhir menyala sendirian. warnanya berbeda dari semua baris di
   atasnya, dan garis pemisah di atasnya ikut terbaca.
   (VO: "Selain yang di atas, tidak boleh.")

4. sederet ketukan asing datang dan berhenti di baris itu, satu per satu, TANPA
   diperiksa satu pun. mereka tidak pernah menyentuh baris di atasnya.
   (VO: "Itu yang bikin penjaganya berarti.")

5. ruang di sebelah kanan daftar sengaja dibiarkan kosong dan ditunjuk sekilas:
   tidak ada daftar kedua berisi nama-nama yang dilarang.
   (VO: "Dia tidak perlu hafal siapa saja yang harus ditolak.")

6. baris-baris atas menyala singkat berurutan, lalu baris terakhir menyala lagi
   dan tinggal menyala.
   (VO: "Cukup tahu siapa yang boleh, sisanya urusan baris terakhir.")

7. warna baris terakhir BERUBAH dari merah ke hijau. daftarnya tidak berubah
   sedikit pun, tapi seluruh ketukan langsung mengalir masuk ke pintu.
   (VO: "Balik baris itu jadi selain itu boleh, dan penjaganya tinggal patung.")

motion:
   - daftar maju: kebalikan persis dari tahap 1 scene 7 — opasitas dan skala yang
     sama, arah terbalik, supaya terbaca sebagai benda yang sama kembali
   - kamera turun: `kamera({y, skala})` dengan titik tumpu di baris terakhir,
     `E.expoOut`
   - ketukan berhenti: `t()` x berhenti tepat di tepi kiri daftar; tundaan tetap
     antar ketukan, bukan acak
   - ruang kosong ditunjuk: bingkai putus-putus `gambarGaris()` yang tergambar
     lalu memudar
   - aliran masuk di tahap 7: seluruh ketukan `t()` x menembus ke pintu, cepat,
     `E.power1out`, tanpa satu pun berhenti

catatan:
   - **tahap 5 menggambarkan sesuatu yang TIDAK ada.** ruang kosong di sebelah
     daftar adalah gambar dari "tidak ada daftar orang jahat". tanpa itu,
     sebagian penonton tetap pulang dengan gambaran firewall sebagai benda yang
     mengenali serangan.
   - **tahap 7 memperlihatkan kebalikannya, bukan menceritakannya.** satu warna
     yang berubah dan seluruh gedung langsung terbuka adalah bukti yang tidak
     butuh kalimat penjelas.
   - **penjaganya tetap berdiri di tahap 7, tidak jatuh dan tidak menghilang.**
     "tinggal patung" berarti ia masih di sana dan tidak melakukan apa-apa —
     justru itu gambarannya. penjaga yang lenyap akan terbaca sebagai "firewall
     dimatikan", dan itu hal yang berbeda.
   - warna hijau di tahap 7 sengaja terasa "benar" padahal ia yang salah. itu
     bagian dari kejutannya; jangan diganti jadi merah supaya "jelas".
