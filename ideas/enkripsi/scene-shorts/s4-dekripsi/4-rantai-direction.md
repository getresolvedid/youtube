Anggaran: durasi ±8,3 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap, dengan ENAM potong di dalamnya.

1. panggung bersih. rantainya dibangun sepotong demi sepotong dari ATAS:

     HALO  →  [ENKRIPSI]  →  X7K9@2#L8$Q  →  (jaringan)  →  [DEKRIPSI]  →  HALO

   tiap potong muncul, panah tegak menyambung ke potong berikutnya, lalu potong
   berikutnya muncul. yang sudah muncul TIDAK memudar — di akhir tahap ini
   seluruh rantainya berdiri utuh.
   (VO: "Jadi, pesan diubah menjadi data terenkripsi, dikirim melalui internet, lalu dikembalikan menjadi pesan asli di perangkat penerima.")
   TEKS LAYAR: tidak ada — rantainya sendiri yang jadi teksnya

motion:
   - ENAM POTONG DI DALAM SATU BEAT. `mulai` tiap potong = `beat("rantai", 0)` +
     pecahan DURASI baris itu, bukan detik yang diketik
   - tiap potong: `masuk()` geser 16 + `munculSkala()`
   - panah di antaranya: `gambarGaris()` menggambar diri dari atas ke bawah,
     jadi arah bacanya ikut terbawa

catatan:
   - **RANTAINYA TEGAK, bukan mendatar** — arahan user menulisnya mendatar
     (bentuk 16:9); di 9:16 enam potong mendatar memaksa tiap potong mengecil
     sampai tidak terbaca. arah atas→bawah juga sudah benar: seluruh seri
     mengalir begitu.
   - **kotak ENKRIPSI dan DEKRIPSI memakai komponen yang sama** dengan Short 3
     dan scene 3, cuma lebih kecil. bentuk baru di scene ringkasan memaksa
     penonton mencocokkan dua gambar alih-alih mengenali satu.
   - **HALO MUNCUL DUA KALI, di kedua ujung.** bentuknya harus sama persis —
     kalau yang bawah sedikit berbeda, "dikembalikan ke bentuk aslinya" bocor.
   - **tidak ada teks layar tambahan.** rantainya sendiri sudah jadi teks untuk
     penonton tanpa suara.
