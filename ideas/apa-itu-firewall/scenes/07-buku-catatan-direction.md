Anggaran: mulai 117,90 dtk · durasi 30,39 dtk (estimasi, VO belum jadi).
Sembilan baris VO = sembilan tahap.

**Scene paling penting di episode.** Ia menjawab hal yang scene 5 nyatakan
mustahil. Kalau satu scene di episode ini boleh dapat waktu paling panjang, ini
scene-nya — mekanismenya punya empat langkah yang harus terlihat BERURUTAN:
berangkat, dicatat, pulang, dicocokkan.

Panggung sama dengan scene 6. Penjaga, daftar, dinding, semuanya di tempatnya.

1. daftar di sisi kanan penjaga MEREDUP — bukan hilang, cuma mundur ke belakang.
   ia masih di layar sepanjang scene ini.
   (VO: "Tapi daftar tadi belum menjawab satu hal.")

2. dua benda identik dari scene 5 berdiri lagi di depan penjaga, sama-sama
   menunggu. sama persis, tanpa pembeda.
   (VO: "Kiriman yang kamu tunggu tetap datang dari luar, sama seperti yang lain.")

3. kamera turun ke tangan kiri penjaga. sesuatu yang sejak tadi ada di situ
   mulai terbaca.
   (VO: "Sekarang lihat tangan kirinya.")

4. buku catatan TERBUKA. dua halaman, bergaris, dan kosong. bentuknya sengaja
   tidak mirip daftar.
   (VO: "Ada buku kecil di situ, dan isinya bukan aturan.")

5. satu kiriman berangkat dari DALAM gedung ke luar. bersamaan dengan itu, satu
   baris tertulis di halaman kiri buku.
   (VO: "Tiap kali kamu mengirim sesuatu keluar, dia menulis satu baris.")

6. baris itu terisi dua bagian: tujuannya di kiri, nomor pintu keberangkatannya
   di kanan.
   (VO: "Ke mana perginya, dan dari pintu mana kamu berangkat.")

7. jawabannya pulang dari kiri. penjaga menahannya dengan satu tangan, dan
   pandangannya turun ke buku.
   (VO: "Waktu jawabannya pulang, dia tinggal mencocokkan.")

8. baris di buku MENYALA cocok, tanda centang tergambar. pintu terbuka,
   kirimannya lewat ke dalam.
   (VO: "Ada barisnya, silakan masuk.")

9. benda kedua maju. buku dibuka lagi di halaman yang sama, dan di bagian itu
   kosong. benda itu berbalik ke kiri.
   (VO: "Tidak ada barisnya, kamu bukan jawaban siapa-siapa.")

motion:
   - daftar mundur: opasitas 1 -> 0,35 + skala 1 -> 0,92, `E.power2out`
   - kamera ke tangan: `kamera({x, y, skala})` 1,0 -> 1,45 dengan titik tumpu di
     tangan kiri penjaga, `E.expoOut` — SATU transform untuk seluruh grup
   - buku terbuka: `scaleX 0 -> 1` dari garis tengahnya + `backOut(1,2)`
   - baris tertulis: `gambarGaris()` pada dua path baris, mengikuti keberangkatan
   - jawaban pulang: `t()` x dari `X_LUAR` ke depan penjaga, `E.power1out`
   - centang: `gambarGaris()` juga, bukan opasitas — ia harus terbaca sebagai
     ditulis, bukan sebagai muncul

catatan:
   - **buku dan daftar wajib terbaca sebagai dua benda berbeda.** daftar tegak,
     bertepi keras, barisnya berwarna. buku terbuka dua halaman, bergaris tipis,
     abu-abu. kalau keduanya mirip, penonton cuma dapat "penjaganya punya kertas"
     dan seluruh bagian 5 kehilangan alasannya.
   - **daftar TIDAK dihilangkan dari layar.** ia harus tetap terlihat meredup di
     belakang, karena scene 8 mengembalikannya ke depan dan penonton harus tahu
     ia tidak pernah pergi.
   - **kiriman yang berangkat di tahap 5 datang dari DALAM**, jadi arahnya dari
     kanan ke kiri — satu-satunya benda di scene ini yang bergerak berlawanan
     dengan seluruh panggung. arah itu yang menjelaskan seluruh mekanismenya
     tanpa satu kata pun.
   - **benda kedua tidak digambar ditolak dengan kasar.** ia cuma berbalik. yang
     dibawa pulang penonton harus alasannya, bukan hasilnya.
