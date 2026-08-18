Anggaran: mulai 106,95 dtk · durasi 14,52 dtk (estimasi, VO belum jadi).
Dua baris VO = dua tahap — tapi tahap 1 punya ENAM potong (lihat motion).

Bagian 6 [explaining]. Scene ini tidak mengajarkan apa pun yang belum
ditunjukkan; ia menyusun ulang yang sudah ditonton supaya bisa diingat sebagai
**satu bentuk**, bukan sebagai lima adegan.

Panggungnya bersih, seperti scene 6. Tidak ada meja, tidak ada sosok.

1. rantainya dibangun SEPOTONG DEMI SEPOTONG dari kiri, tidak pernah tampil
   sekaligus:

     HALO  →  [ENKRIPSI]  →  X7K9@2  →  (jaringan)  →  [DEKRIPSI]  →  HALO

   tiap potong muncul, panah menyambung ke potong berikutnya, lalu potong
   berikutnya muncul. yang sudah muncul TIDAK memudar — di akhir tahap ini
   seluruh rantainya berdiri utuh di layar.
   (VO: "Singkatnya, pesan diubah menjadi data terenkripsi, dikirim melalui internet, lalu dikembalikan menjadi pesan asli di perangkat penerima.")

2. rantainya memudar. layar TERBELAH DUA oleh satu garis tegak. kiri: layar
   meja yang mengamati, isinya X7K9@2#L8$Q. kanan: HP penerima, isinya
   "Halo, apa kabar?". keduanya muncul bersamaan, lalu DITAHAN.
   (VO: "Jadi, enkripsi membantu menjaga agar isi data tidak mudah dibaca oleh pihak yang tidak berhak.")

motion:
   - ENAM POTONG DI DALAM SATU BEAT. `mulai` tiap potong diturunkan dari
     `beat("ringkasan", 0)` ditambah pecahan dari DURASI baris itu — bukan dari
     detik yang diketik. begitu kalimatnya berubah panjang, keenamnya ikut
     merapat atau merenggang sendiri
   - tiap potong: `masuk()` geser 18 + `munculSkala()`. panah di antaranya
     `gambarGaris()` — ia menggambar diri dari kiri ke kanan, jadi arah bacanya
     ikut terbawa
   - belah layar tahap 2: garis tegak `scaleY` 0 → 1 dari tengah, `E.expoOut`.
     kedua sisi masuk BERSAMAAN, bukan berurutan — yang muncul belakangan akan
     terbaca sebagai akibat dari yang pertama
   - tidak ada gerakan apa pun selama tahap 2 ditahan. napas kecil pun tidak

catatan:
   - **arahnya kiri → kanan, sama dengan seluruh episode.** rantai yang dibangun
     dari arah lain membatalkan orientasi yang sudah dipasang enam scene.
   - **HALO MUNCUL DUA KALI di rantai itu, di kedua ujungnya, dan itu intinya.**
     bentuk yang sama persis di awal dan akhir; yang berbeda cuma apa yang
     terjadi di tengah. kalau yang di ujung kanan digambar sedikit berbeda,
     seluruh gagasan "dikembalikan ke bentuk aslinya" ikut bocor.
   - **kotak ENKRIPSI dan DEKRIPSI di rantai memakai komponen yang sama** dengan
     scene 6 dan 8, cuma lebih kecil. bentuk baru di scene ringkasan memaksa
     penonton mencocokkan dua gambar alih-alih mengenali satu.
   - **TAHAP 2 ADALAH FRAME TERPENTING DI SELURUH EPISODE**, dan arahan user
     menyebutnya begitu: *"Hold it long enough for the viewer to make the
     connection: same data → different visibility depending on access to the
     proper key."* jangan menaruh gerakan apa pun di sana, dan jangan
     memendekkannya kalau episode ini perlu dipotong.
   - **tidak ada label "SEBELUM"/"SESUDAH" di tahap 2.** dua layar yang isinya
     berbeda sudah mengatakannya; label mengubah gambar yang berbicara jadi
     diagram yang harus dibaca.
   - **kalau episode perlu dipangkas, SCENE INILAH yang pertama dipotong** —
     docs/02 mematok `[explaining]` sebagai yang pertama. tapi tahap 2-nya
     dipindah ke scene 10, tidak ikut dibuang.
