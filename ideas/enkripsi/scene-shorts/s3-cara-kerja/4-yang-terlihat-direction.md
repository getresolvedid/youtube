Anggaran: durasi ±4,8 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

**Frame ini harus identik dengan Short 2 scene 3, kecuali isi layarnya.** Itu
seluruh kerja Short 3, dan ia gagal kalau ada satu benda yang bergeser.

1. pengamat yang sama tersingkap di samping jalur, di depan layarnya. kamera
   merapat dengan gerakan yang sama persis dengan Short 2: yang tampil di
   layarnya `X7K9@2#L8$Q`, bukan kalimat. ia diam sebentar, lalu bahunya turun
   sedikit dan kepalanya miring.
   (VO: "Ketika pihak lain melihatnya, yang terlihat bukan lagi pesan aslinya.")
   TEKS LAYAR: "Bukan pesannya lagi."

motion:
   - push-in: `kameraKe(…, RAPAT_MONITOR)` dengan nilai dan `ease` yang SAMA
     PERSIS dengan Short 2 scene 3. `mulai`-nya boleh berbeda karena baris
     VO-nya beda panjang; sisanya tidak
   - reaksi: satu `t()` pada rotasi 0 → 6° dan geser bahu 0 → 5px, durasi 0,9.
     TIDAK ADA getar, tanda seru, atau perubahan warna
   - paket TERUS berjalan di latar selama scene ini

catatan:
   - **letak, ukuran layar, dan tempat duduknya dari `../panggung-short.tsx`** —
     tidak boleh ada satu angka pun yang ditulis ulang di sini.
   - **yang di layar `SANDI_PANJANG`, bukan `SANDI`.** layar penuh yang isinya
     sependek badan paket terbaca sebagai label, bukan sebagai isi yang panjang
     dan tidak terbaca.
   - **dia tidak memudar di akhir scene.** dia tetap di sana sampai scene 5
     mengambil alih.
