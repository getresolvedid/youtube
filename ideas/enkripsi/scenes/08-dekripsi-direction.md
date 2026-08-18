Anggaran: mulai 92,88 dtk · durasi 14,07 dtk (estimasi, VO belum jadi).
Tiga baris VO = tiga tahap.

Bagian 5 [why], sisi keduanya. Scene 7 menunjukkan yang **tidak** bisa membaca;
scene ini menunjukkan yang bisa — dan tanpa scene ini, enkripsi terbaca sebagai
sesuatu yang merusak pesan, bukan yang melindunginya.

Frame pertamanya = frame terakhir scene 7: paket bergembok baru saja masuk ke
HP penerima, dan kamera sekarang berada di dalamnya.

1. di dalam layar HP penerima. yang tampil masih deretan lambang bergembok,
   bukan gelembung chat. penerimanya terlihat di sisi kanan, melihat layarnya,
   belum bereaksi.
   (VO: "Di sisi penerima, data tersebut perlu dikembalikan ke bentuk aslinya.")

2. kotak berlabel DEKRIPSI muncul — BENTUKNYA SAMA PERSIS dengan kotak scene 6,
   cuma labelnya berbeda. lambangnya masuk. satu kunci mendekat dari kanan dan
   menyentuh gemboknya; gemboknya terbuka.
   (VO: "Proses mengembalikan data terenkripsi menjadi bentuk yang dapat dibaca disebut dekripsi.")

3. kotaknya membuka. yang keluar gelembung chat biasa berisi "Halo, apa kabar?"
   — bentuk yang sama persis dengan yang diketik di scene 3. ia mendarat di
   ruang percakapan. bahu penerimanya turun sedikit. kamera mundur dari HP-nya.
   (VO: "Dengan kunci yang tepat, pesan dapat dibaca kembali oleh penerima.")

motion:
   - kotak dekripsi memakai komponen yang sama (`KotakProses`) dan nilai `tutup`
     yang bergerak ke arah SEBALIKNYA dari scene 6: di sana 0 → 1, di sini
     1 → 0. dekripsi harus terbaca sebagai tindakan yang MEMBALIK enkripsi,
     bukan sebagai mesin lain yang kebetulan ada di ujung sana
   - kunci masuk dari KANAN — dari sisi penerima, bukan dari jalur. arahnya
     mengikat: apa pun yang datang dari jalur adalah yang barusan lewat di depan
     orang lain, dan kuncinya bukan itu
   - gembok terbuka: satu nilai `terbuka` 0 → 1 yang mengangkat dan memiringkan
     sengkangnya. badannya tidak bergerak — gembok yang seluruhnya melompat
     terbaca sebagai gembok yang dilepas, bukan dibuka
   - `terkunci` paket 1 → 0 di tahap 3, rentang yang sama dengan kotak yang
     membuka. warna, gembok, dan glif isinya berbalik SEKALIGUS
   - bahu penerima: satu `t()` geser 0 → 5px, durasi 0,7. tidak ada wajah yang
     berubah

catatan:
   - **KUNCINYA LAMBANG, BUKAN KUNCI LOGAM** — arahan user: *"The key should be
     shown as a visual metaphor, not necessarily as a literal physical key."*
     digambar dengan `--ok`, satu-satunya benda hijau di episode ini, supaya ia
     langsung terbaca sebagai "yang membuat ini boleh".
   - **nama "dekripsi" jatuh di tahap 2, setelah tindakannya terlihat** —
     urutannya sama dengan enkripsi di scene 6: bendanya bekerja dulu, namanya
     menyusul.
   - **gelembung yang keluar di tahap 3 BENTUKNYA SAMA PERSIS dengan yang
     diketik di scene 3.** kalau ia digambar sedikit berbeda, seluruh gagasan
     "dikembalikan ke bentuk aslinya" ikut bocor — dan itu satu-satunya hal yang
     scene ini ajarkan.
   - **reaksi penerima kecil.** sosok di episode ini tidak punya wajah
     berdetail (arahan user: *"Avoid excessive facial detail"*), jadi yang
     menyampaikan kelegaan adalah bahu yang turun dan gelembung yang mendarat —
     bukan mulut yang melengkung.
   - **KUNCINYA MUNCUL BEGITU SAJA, dan itu lubang terbesar di episode ini.**
     dari mana ia datang dan kenapa cuma penerima yang punya tidak dijawab di
     mana pun. itu bukan kelalaian — arahan user mengeluarkan kunci
     publik/privat dan pertukaran kunci secara eksplisit. usul satu kalimat yang
     menutupnya tanpa melanggar batas itu ada di `08-dekripsi-vo.md`.
   - **tidak ada yang mengamati di scene ini.** dia sudah selesai perannya di
     scene 7, dan menampilkannya lagi di sini membuat penonton menunggu dia
     berbuat sesuatu.
