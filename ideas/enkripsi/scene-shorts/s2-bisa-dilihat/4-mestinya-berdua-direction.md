Anggaran: durasi ±5,3 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

1. kamera MUNDUR sampai ketiganya terlihat sekaligus: HP pengirim di atas, yang
   mengamati beserta layarnya di samping tengah, HP penerima di bawah. layar
   yang mengamati MASIH menampilkan "Halo, apa kabar?" — kecil sekarang, tapi
   terbaca. satu garis tipis menyala dari jalur ke layarnya.
   (VO: "Padahal, pesan itu seharusnya hanya dapat dibaca oleh pihak yang berhak.")
   TEKS LAYAR: "Padahal cuma buat berdua."

motion:
   - mundur: `kameraKe()` yang sama, dibalik — skalanya kembali ke 1,0 dan
     jangkarnya ikut pulang sendiri karena panningnya turunan dari skala
   - garis dari jalur ke layar: `gambarGaris()`, menggambar diri dari jalur ke
     layarnya. INI SATU-SATUNYA benda baru di scene ini, dan ia yang menyatakan
     "dia mengambilnya dari sana"
   - kalimat di layarnya tidak memudar. ia tetap terbaca sampai scene habis

catatan:
   - **kalimat di layar pengamat TIDAK dihapus saat kamera mundur.** kalau ia
     hilang, scene ini cuma jadi peta; yang bikin gelisah justru bahwa ia masih
     terbaca dari jauh.
   - **garisnya redup dan tipis**, bukan panah merah. yang digambarkan bukan
     serangan, melainkan bahwa jalurnya memang lewat situ.
   - **tidak ada label "PENGIRIM"/"PENERIMA" di layar.** dua HP di dua ujung
     jalur sudah mengatakannya; label mengubah gambar yang berbicara jadi
     diagram yang harus dibaca.
