Anggaran: mulai 23,20 dtk · durasi 22,91 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Frame pertamanya = frame terakhir `01-hook-mengetuk` setelah kartu judul lewat:
gedung utuh, garis lantai, ketukan sudah tidak ada. Panggungnya tidak berpindah
sedikit pun — kartu judul menyela, bukan memindahkan.

Tugas scene ini mendirikan **pintu** sebagai benda yang dipakai dua belas scene
berikutnya, dan menutup jalan keluar yang paling malas dengan memperlihatkannya
gagal.

1. kamera mendekat sedikit ke dinding. gedung mengisi lebih banyak frame,
   pintunya belum menyala.
   (VO: "Sekarang lihat dinding luarnya lebih dekat.")

2. permukaan dinding menyala pelan — dari bidang polos jadi bidang yang punya
   detail. belum ada pintu yang terbaca sebagai pintu.
   (VO: "Dindingnya rapat, tapi tidak buta.")

3. delapan pintu tergambar satu per satu, dari kiri bawah ke kanan atas,
   masing-masing dengan nomornya. jeda pendek antar pintu.
   (VO: "Ada banyak pintu di situ, dan tiap pintu punya nomor.")

4. lima pintu meredup dan mendapat gembok kecil di tengah daunnya. yang tersisa
   menyala tinggal tiga: `PINTU_HIDUP`.
   (VO: "Sebagian besar terkunci, tidak ada apa-apa di baliknya.")

5. ketiga pintu yang tersisa menyala penuh, satu tarikan.
   (VO: "Tapi beberapa memang harus bisa diketuk.")

6. tiga kiriman kecil masuk dari kiri, satu-satu, lewat ketiga pintu itu, ke
   arah dalam. bukan ketukan — bentuknya kotak, dan mereka LEWAT.
   (VO: "Lewat situlah halaman datang, pesan masuk, berkas terkirim.")

7. ketiganya ikut digembok. seluruh gedung meredup jadi siluet mati, tanpa satu
   pun pintu menyala. tahan sebentar, lalu ketiganya menyala lagi.
   (VO: "Jadi menutup semuanya sama saja dengan mencabut kabelnya.")

motion:
   - kamera dekat: `kamera({skala})` 1,0 -> 1,12, `E.power2out`, tahan sampai
     akhir scene
   - pintu tergambar: `masuk()` dengan `urutan` 0..7 dan `jeda` 0,1
   - gembok: opasitas + `backOut(1,2)` kecil pada skalanya
   - kiriman lewat: tiga `Kotak` kecil, `t()` pada x, `E.power1out`, saling
     tunda 0,35 dtk
   - siluet mati: satu opasitas turun untuk seluruh grup pintu, `E.power2in`,
     lalu naik lagi di 0,8 dtk terakhir

catatan:
   - **nomor pintunya sengaja satu sampai delapan**, bukan nomor yang benar-benar
     dipakai internet. nomor asli adalah klaim yang butuh baris `sumber:`
     (`naskah.md § Sumber`) dan tidak menambah apa pun di luar "tiap pintu punya
     nomor".
   - **ketiga pintu hidup dipatok di `PINTU_HIDUP`** dan dipakai ulang di scene
     4, 5, 12 dan 14. pintu hidup yang berpindah-pindah antar scene membuat
     penonton mengira jumlahnya berubah.
   - **tahap 7 memperlihatkan kegagalan, bukan menceritakannya.** gedung yang
     jadi siluet mati tidak perlu kalimat penjelas — dan ia yang membuat
     `05-dikunci-semua` nanti terasa seperti pengulangan yang disengaja, bukan
     seperti scene yang lupa sudah pernah dibahas.
   - gembok abu-abu, tidak pernah merah. mengunci bukan kesalahan di scene ini;
     ia cuma tidak cukup.
