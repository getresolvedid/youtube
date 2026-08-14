Anggaran: mulai 227,54 dtk · durasi 26,87 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Frame pertamanya = frame terakhir `11-gembok-siapa`: gembok dengan surat pengenal
menempel di sisinya.

Scene yang memisahkan dua hal yang hampir selalu dikira satu: **tidak terbaca**
dan **tidak berubah**. Seluruh beratnya ada di tahap 4 — tiga kotak rusak yang
semuanya masih terkunci rapat.

1. kamera mundur. gembok bersurat pengenal itu terpasang di kotak, dan kotaknya
   berangkat di jalan seperti biasa.
   (VO: "Sekarang gemboknya benar, dan kotaknya terkunci rapat.")

2. gerakannya berhenti di tengah jalan. satu tangan menahan kotak itu. kali ini
   tangannya tidak mencoba membuka.
   (VO: "Tetap ada yang bisa terjadi di jalan.")

3. kotak ditukar dengan kotak lain yang bentuknya sama persis — sama tergembok,
   sama bersurat pengenal. yang asli digeser keluar frame.
   (VO: "Kotak yang tidak bisa dibuka masih bisa ditukar dengan kotak lain.")

4. dua kerusakan lain menyusul cepat, di kotak yang berbeda: satu kotak
   kehilangan potongan sudutnya, satu kotak datang dua kali beruntun.
   (VO: "Bisa dipotong sebagian. Bisa dikirim dua kali.")

5. ketiga kotak berdiri sejajar di tengah frame. semuanya MASIH TERGEMBOK, dan
   semuanya masih tidak bisa dibaca siapa pun.
   (VO: "Terkunci ternyata tidak sama dengan utuh.")

6. pita segel melintang menutup sambungan tutup kotak. di ujung pita ada tanda
   pendek yang menyala bersamaan dengan isi kotaknya — keduanya terhubung.
   (VO: "Jadi kotaknya disegel, dan segelnya ikut menghitung isi kotak itu.")

7. di meja kanan, kotak bersegel robek DIPULANGKAN: berbalik arah dan pergi ke
   kiri tanpa tutupnya pernah tersentuh.
   (VO: "Sampai di ujung, segel yang rusak membuat kotaknya ditolak, tanpa pernah dibuka.")

motion:
   - tukar: kotak asli `t()` keluar ke bawah frame, kotak pengganti masuk dari
     bawah di detik yang sama — pergantiannya tidak boleh punya jeda kosong
   - sudut hilang: satu path kotak diganti path bersudut terpotong pada ambang
     0,5, sekali
   - datang dua kali: kotak kedua `t()` menyusul dengan tundaan 0,45 dtk di
     lintasan yang sama persis
   - segel: `gambarGaris()` melintang 0,5 dtk, lalu tanda di ujungnya `masuk()`
   - segel robek: path pita dipatahkan jadi dua potong + `getar()` sekali
   - pemulangan: `t()` pada x ke kiri, `E.power2in`, tutup TIDAK dianimasikan

catatan:
   - **tahap 5 adalah inti scene ini.** ketiga kotak rusak wajib terlihat masih
     tergembok. kalau salah satunya digambar terbuka, penonton menyimpulkan
     gemboknya gagal, dan bedanya "tidak terbaca" dengan "tidak berubah" hilang
     seluruhnya.
   - **segel digambar sebagai PITA yang bisa robek, bukan gembok kedua.** dua
     gembok terbaca sebagai kunci yang lebih kuat — persis kesimpulan yang salah.
   - **tanda di ujung pita tidak boleh mirip tanda tangan di surat pengenal**
     (scene 11). dua benda berbeda dengan gambar yang sama akan tertukar; bentuk
     tanda tangan bergelombang, tanda segel bergerigi.
   - **tahap 7 tutupnya tidak pernah bergerak.** itu satu-satunya cara "ditolak
     tanpa dibuka" terbaca.
   - frame terakhir (kotak bersegel robek pulang ke kiri, jalan masih menyala)
     adalah frame pertama scene 13.
