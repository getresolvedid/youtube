Anggaran: mulai 118,30 dtk · durasi 26,87 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Frame pertamanya = frame terakhir `07-gembok-terbuka`: kotak terkunci di meja
kiri dengan nama "enkripsi" di bawahnya, kunci diam di meja kanan.

Bagian 5 [why], sebab pertama. Yang harus terbukti di layar: **yang berbahaya di
scene 5 bukan kuncinya, melainkan perjalanannya.** Karena itu scene ini hampir
tidak punya gerakan — bendanya justru dibuktikan dengan DIAM.

1. nama "enkripsi" memudar. gembok di badan kotak diredupkan sampai hampir
   sewarna kotaknya — perhatian ditarik menjauh dari benda yang barusan jadi
   bintang.
   (VO: "Yang membuatnya bekerja bukan gemboknya.")

2. kamera geser ke meja kanan. kuncinya masih persis di titik yang sama dengan
   scene 7, tidak bergeser satu piksel pun.
   (VO: "Yang membuatnya bekerja, kuncinya tidak ikut ke mana-mana.")

3. lingkaran tipis putus-putus tergambar mengelilingi meja kanan. kunci di
   dalamnya. lingkarannya tidak pernah dipotong apa pun sampai scene habis.
   (VO: "Dia tinggal di meja pemiliknya, dan tidak pernah keluar dari situ.")

4. kamera mundur ke jalan penuh. dua benda yang pernah melintas ditandai: satu
   gembok terbuka bergerak ke kiri, satu kotak tertutup bergerak ke kanan.
   tidak ada benda ketiga.
   (VO: "Yang lewat jalan cuma dua. Gembok terbuka, dan kotak yang sudah tertutup.")

5. di meja kiri, tangan pengirim mencoba membuka kotaknya SENDIRI. tutupnya
   tidak bergerak. dicoba sekali lagi, tetap tidak.
   (VO: "Bahkan kamu, yang barusan mengunci, sekarang ikut terkunci di luar.")

6. label kecil mendarat di gembok terbuka yang ada di tepi jalan.
   (VO: "Gembok terbuka yang dibagikan itu namanya kunci publik.")

7. label kedua mendarat di kunci yang ada di dalam lingkaran di meja kanan.
   (VO: "Yang tinggal di mejanya, kunci pribadi.")

motion:
   - gembok meredup: opacity 1 -> 0,35, `E.power1out`
   - lingkaran: `gambarGaris()` keliling penuh, 0,9 dtk, `strokeDasharray`
     putus-putus tetap sesudahnya
   - tahap 4: dua benda contoh bergerak pelan berlawanan arah, `E.sineInOut`,
     bolak-balik dua kali lewat `tPP()` supaya layar tidak diam
   - mencoba membuka: `getar()` pada tutup, jauh 6, dua kali, tanpa perpindahan
     permanen
   - label: `masuk()` geser 18, durasi 0,45, satu per tahap

catatan:
   - **tahap 5 adalah beat terpenting scene ini.** pengirim yang gagal membuka
     kotaknya sendiri terlihat seperti kerugian, dan justru itu buktinya: kalau
     dia masih bisa membuka, berarti masih ada kunci kedua yang beredar di jalan.
   - **kuncinya tidak boleh dianimasikan sama sekali** di scene ini. diamnya
     adalah isi scene ini; satu gerakan kecil saja membuat lingkaran di tahap 3
     kehilangan arti.
   - **dua label di tahap 6 dan 7 sengaja jatuh terpisah.** digabung, label kedua
     mendarat sebelum penonton selesai membaca yang pertama — dan keduanya harus
     terbaca sebagai NAMA untuk benda yang sudah berdiri, bukan sebagai
     penjelasan.
   - **teks label dipasang di dalam `<svg>` sebagai `<text>`**, dan keduanya
     ditaruh di ruang kosong: label gembok di bawah tepi jalan, label kunci di
     bawah meja kanan. `npm run tumpang` memeriksa keduanya.
   - frame terakhir (dua label terpasang, lingkaran di meja kanan, gembok di
     tepi jalan) adalah frame pertama scene 9.
