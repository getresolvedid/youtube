Anggaran: mulai 80,87 dtk · durasi 20,70 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `05-kuncinya-ikut`: kotak kecil dan kunci
berdampingan di jalan, meja penerima di kanan frame.

Scene terakhir bagian 3. Ia menutup jalan keluar terakhir — "ya sudah, kuncinya
disepakati dulu sebelumnya" — dan berakhir dengan rumusan masalah yang terdengar
mustahil. Bagian 4 hanya bekerja kalau tahap 5 benar-benar terasa buntu.

1. gambar yang sama, tidak bergerak. kotak kecil dan kunci masih berdampingan.
   (VO: "Dan itu belum bagian yang paling sulit.")

2. kamera MENDEKAT ke meja kanan. mejanya membesar; jalan dan kunci tetap
   terlihat di tepi kiri frame, tidak pernah hilang.
   (VO: "Lihat lagi siapa yang kamu kirimi.")

3. satu sosok berdiri di belakang meja kanan. TANPA WAJAH, tanpa nama, netral —
   bentuk yang sama dengan sosok mana pun di episode ini.
   (VO: "Toko yang baru kamu buka pagi tadi.")

4. garis putus-putus keluar dari meja kiri dan meja kanan ke KIRI-ATAS — ke ruang
   kosong di atas jalan, tempat waktu yang sudah lewat. keduanya bertemu di satu
   titik dan berhenti di sana. tidak menyentuh apa pun.
   (VO: "Kamu belum pernah bertemu dia. Tidak sekali pun.")

5. di ruang kosong itu, kotak-kotak hari berjajar seperti kalender. semua
   kosong. lalu garis putus-putus dan kalender itu padam bersamaan.
   (VO: "Jadi tidak pernah ada hari kemarin untuk menyepakati kunci.")

6. kamera mundur ke tampilan penuh. kedua meja disorot bersamaan, dan SELURUH
   tangan di jalan menyala sekaligus — semuanya sedang mendengarkan.
   (VO: "Rahasianya harus disepakati sekarang, di depan semua yang mendengarkan.")

motion:
   - kamera mendekat: `kamera({x: X_TERIMA, skala: 1,45})`, `E.power2out`, 1,1 dtk
   - sosok muncul: `masuk()` geser 22 — muncul di tempat, tidak berjalan masuk
   - garis waktu: `gambarGaris()` ke arah KIRI-ATAS keluar dari kedua meja,
     bertemu di satu titik kosong di atas jalan, lalu opacity turun bersama
     kalender. ruang di bawah jalan sudah milik tangan dan tumpukan scene 13
   - kalender: enam kotak, `masuk()` stagger 0,05, semuanya kosong
   - tahap 6: `kamera({skala: 1})` kembali + opacity semua tangan 0,35 -> 1
     serentak, bukan bergiliran

catatan:
   - **sosok penerima tidak boleh diberi wajah, senyum, atau papan nama.** ia
     harus tetap terasa asing sampai scene 11, tempat pertanyaan "ini benar dia
     atau bukan" akhirnya ditanyakan. wajah ramah di sini menjawab pertanyaan itu
     sepuluh menit terlalu awal.
   - **kalender, bukan jam.** yang tidak pernah terjadi adalah pertemuan
     sebelumnya, dan satuannya hari — bukan detik.
   - **tahap 6 satu-satunya kali seluruh tangan menyala serentak di episode ini.**
     efeknya bergantung pada kelangkaan itu; jangan memakainya lagi di scene lain.
   - **tidak ada gembok terbuka di layar.** jawabannya milik scene 7, dan
     kemunculannya di sana harus terasa datang dari luar dugaan.
   - frame terakhir (dua meja tersorot, semua tangan menyala, kunci masih di
     jalan) adalah frame pertama scene 7.
