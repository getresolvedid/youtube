Anggaran: mulai 0 dtk · durasi 5,25 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

Frame pertama seri. **Tiga detik pertama menentukan sisanya** — di feed, yang
tidak bergerak di frame nol tidak pernah ditonton. Karena itu pengetikan sudah
berjalan sejak frame pertama, bukan menunggu kamera selesai merapat.

1. HP mengisi sebagian besar frame, percakapan terbuka: nama "Teman" di atas,
   ruang kosong, kolom ketik di bawah. "Halo, apa kabar?" tumbuh huruf demi
   huruf di kolomnya. kamera merapat pelan sepanjang tahap ini. latar di luar
   HP sederhana dan redup.
   (VO: "Pernah penasaran apa yang sebenarnya terjadi setelah kamu menekan tombol kirim?")
   TEKS LAYAR: "Setelah kamu tekan kirim…"

motion:
   - teks tumbuh: satu `t()` pada JUMLAH HURUF yang terlihat, bukan opasitas per
     huruf — yang kedua terbaca sebagai teks berkedip, bukan sebagai teks yang
     sedang diketik
   - merapat: `kamera({skala})` 1,0 → 1,12 dengan `E.expoOut`, dipakai SELURUH
     grup. pelan dan sedikit — di 9:16 push-in besar cepat terasa gelisah
   - tidak ada gerakan lain di frame. satu hal bergerak, dan itu hurufnya

catatan:
   - **belum ada jaringan, belum ada pengamat, belum ada gembok.** arahan user:
     penonton harus fokus ke tindakan yang sudah ia kenal.
   - **teks layarnya menggantung, bukan merangkum.** ia mengulang setengah
     pertanyaan VO-nya supaya penonton tanpa suara ikut menggantung.
   - **HP-nya komponen `Hp` dari `../../panggung-kiriman.tsx`** — badan, bezel,
     lubang suara, kamera, bilah geser, tombol sisi. bentuk yang sama dipakai di
     video panjang dan keempat Short (arahan user § Character Continuity).
   - isi percakapannya ditaruh relatif terhadap `layarHp()`, bukan terhadap tepi
     badan HP — bezelnya membuat dua tepi itu tidak berjarak sama.
