Anggaran: mulai 33,66 dtk · durasi 7,26 dtk (estimasi, VO belum jadi).
Dua beat. Di sinilah seluruh Short membayar dirinya: penonton melihat KENAPA
menyalin itu masuk akal, bukan diberi tahu bahwa ia masuk akal.

1. perjalanan mahal, sekali:
   - satu berkas berangkat dari lemari, menyusuri garis tegak ke atas, dan
     mendarat di meja
   - perjalanannya LAMBAT — hampir dua detik penuh untuk satu berkas
   - kalender ikut berjalan selama ia bergerak, dan berhenti saat ia mendarat
   - berkas aslinya TETAP di lemari (tidak hilang dari sana)
   (VO: "Makanya isinya disalin dulu ke meja, sebelum dikerjakan.")

2. dibayar berkali-kali:
   - dari meja ke chip: sambaran-sambaran pendek yang beruntun, makin cepat,
     sampai terbaca sebagai aliran
   - kalender berhenti dan meredup; jam kembali besar dan jarumnya bergetar
     cepat — alat ukurnya turun lagi ke detik
   - hitungan diam di chip TIDAK bertambah lagi selama sambaran berlangsung
   (VO: "Sekali jalan tiga bulan, lalu dipakai ribuan kali.")

teks di layar:
   beat 0 → "sekali"
   beat 1 → "ribuan kali"  (menggantikan yang pertama, potong keras)

catatan komposisi:
   - **berkasnya DISALIN, bukan dipindah** — aslinya wajib tetap terlihat di
     lemari. Ini keputusan seluruh topik T01; animasi yang mengosongkan lemari
     mengajarkan model mental yang salah tanpa satu kata pun diucapkan.
   - jumlah sambaran tidak perlu banyak; yang membuatnya terbaca "ribuan" adalah
     jaraknya yang memendek, bukan cacahnya.
   - hitungan diam yang BERHENTI bertambah adalah bukti visual kalimatnya. Ia
     angka yang sama yang naik terus sejak scene 1 — kalau di sini ia masih
     naik, seluruh Short ini membantah dirinya sendiri.

motion:
   - berkas naik: `power1out`, 1,8 dtk — sengaja lebih lambat daripada gerak
     apa pun di Short ini
   - sambaran: deret `t()` dengan jeda memendek (0,26 · 0,20 · 0,15 · 0,11 …),
     tiap sambaran 0,12 dtk, `linear` — cepat dan keras, bukan meluncur
   - jam membesar balik: `backOut(1.4)`, 0,4 dtk
