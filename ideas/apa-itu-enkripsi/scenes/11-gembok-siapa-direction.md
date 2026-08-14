Anggaran: mulai 199,35 dtk · durasi 28,19 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Frame pertamanya = frame terakhir `10-gembok-lambat`: arus kotak dua arah di
jalan, gembok tergeletak di tepi.

**Titik putus analogi nomor satu — yang terbesar.** Sampai sini penonton punya
gambaran yang rapi dan salah di satu tempat: ia mengira gembok terbuka
membuktikan pemiliknya. Scene ini juga membayar pertanyaan yang digantung sejak
scene 6.

1. arus kotak berhenti dan meredup. gembok dari tepi kembali ke tengah frame,
   sendirian, besar.
   (VO: "Tapi ada satu pertanyaan yang belum pernah ditanyakan.")

2. garis penelusuran mundur dari gembok itu ke tumpukan gembok di sisi jalan —
   tempat ia diambil di scene 7. tumpukannya masih di posisi yang sama.
   (VO: "Gembok terbuka tadi, kamu ambil dari mana?")

3. kamera masuk ke badan gembok. permukaannya polos: tidak ada tulisan, tidak
   ada tanda, tidak ada apa pun yang menyebut siapa pemiliknya.
   (VO: "Dia tergeletak di depan umum, dan tidak ada nama di badannya.")

4. sosok kedua — netral, tanpa wajah, sama seperti sosok mana pun di episode ini
   — menaruh gemboknya SENDIRI di tumpukan yang sama. bentuknya identik.
   (VO: "Siapa pun bisa menaruh gemboknya sendiri di situ, sambil mengaku toko itu.")

5. kotakmu terkunci dengan gembok itu, berjalan, lalu belok ke meja sosok kedua
   dan terbuka MULUS di sana. tenang, tanpa kejut, tanpa retak.
   (VO: "Kotakmu akan terkunci rapat. Rapat untuk dia.")

6. adegan mundur ke titik pengambilan gembok. kali ini gemboknya tidak sendirian
   di tumpukan itu.
   (VO: "Makanya gembok tidak pernah datang sendirian.")

7. surat pengenal menempel di sisi gembok. ada nama di atasnya dan tanda tangan
   di sudut bawahnya; tanda tangannya menyala terakhir.
   (VO: "Dia datang bersama surat pengenal, ditandatangani pihak yang sudah kamu percaya duluan.")

motion:
   - penelusuran mundur: `gambarGaris()` berjalan dari gembok ke tumpukan,
     `E.power2out`, 0,8 dtk
   - kamera masuk: `kamera({x, y, skala: 2,4})` ke badan gembok, 1,0 dtk
   - sosok kedua: `masuk()` geser 22 — muncul, tidak menyelinap
   - belok ke meja salah: `t()` pada x lalu `t()` pada y, dua tween berurutan
     bukan satu diagonal — beloknya harus terbaca sebagai keputusan
   - terbuka mulus: rotasi tutup `E.power2out`, TANPA `getar()`
   - surat pengenal: `masuk()` geser 20, tanda tangan `gambarGaris()` 0,6 dtk

catatan:
   - **tahap 5 harus terasa TENANG.** tidak ada yang dipatahkan, tidak ada yang
     gagal: kotaknya terkunci dengan benar dan terbuka dengan benar, cuma di meja
     yang salah. digambar sebagai serangan, penonton menyimpulkan gemboknya
     jebol — kebalikan dari isi scene ini.
   - **sosok kedua tidak diberi tanda jahat.** tanpa tudung, tanpa warna bahaya,
     ukuran sama dengan penerima asli. justru kemiripannya yang jadi soal.
   - **kata "sertifikat" tidak muncul di layar maupun di VO.** yang tertulis di
     surat pengenal cuma bentuk garis, bukan huruf yang bisa dibaca — teks yang
     terbaca membuat penonton berhenti mendengarkan dan mulai membaca.
   - **jangan menjelaskan siapa yang menandatangani.** itu episode lain; yang
     perlu berdiri cuma bahwa kepercayaannya datang dari sebelum kotak ini
     dikirim.
   - frame terakhir (gembok dengan surat pengenal menempel) adalah frame pertama
     scene 12.
