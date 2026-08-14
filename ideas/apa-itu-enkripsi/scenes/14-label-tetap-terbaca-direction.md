Anggaran: mulai 278,64 dtk · durasi 21,57 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `13-kunci-yang-dibuang`: tumpukan tertutup di
bawah jalan, kunci yang tidak cocok masih di sana. Tumpukannya meredup pelan di
tahap 1, tidak dihapus seketika.

**Titik putus analogi nomor dua**, dan sambungan diam-diam ke T15: penjaga di
sana membaca label dan tidak pernah membuka kotaknya — di sini penonton tahu
kenapa labelnya memang harus ada di luar.

1. tumpukan meredup. kamera mendekat ke satu kotak yang sedang berjalan, ke sisi
   yang selama ini tidak pernah disorot.
   (VO: "Tapi ada satu bagian kotak yang sengaja dibiarkan terbaca.")

2. label menyala di sisi kotak. bidang isinya tetap gelap. satu kata, satu beat,
   satu benda — tidak ada gerakan lain di tahap ini.
   (VO: "Labelnya.")

3. labelnya ditutup sebentar. kotaknya langsung BERHENTI di tengah jalan, dan
   tangan yang memegangnya diam — tidak tahu harus dibawa ke mana.
   (VO: "Tanpa label, kurirnya tidak tahu harus membawa kotak itu ke mana.")

4. label kembali. kotaknya jalan lagi, dan garis lintasannya tergambar terang di
   sepanjang jalan sampai meja kanan.
   (VO: "Jadi ke mana kotakmu pergi, tetap terlihat dari jalan.")

5. di sisi jalan, tiga kotak berukuran berbeda berjajar. di atas jalur itu,
   pengulangan kirimannya ditandai sebagai deretan penanda kecil yang berjarak.
   (VO: "Sebesar apa kotaknya, dan sesering apa kamu mengirim, juga tetap terlihat.")

6. layar terbelah dua bidang: bidang isi yang GELAP, dan bidang jalur yang
   TERANG. keduanya milik kotak yang sama.
   (VO: "Isinya memang tertutup. Perjalanannya tidak pernah tertutup.")

motion:
   - kamera mendekat: `kamera({x, y, skala: 1,9})` ke sisi kotak, 1,0 dtk
   - label menyala: `masuk()` geser 14 + garis-garis label `gambarGaris()`
   - label ditutup: satu bidang gelap menutupinya, `E.power2in` 0,3 dtk
   - kotak berhenti: laju x dikalikan tween 1 -> 0, bukan dipotong mendadak
   - lintasan: `gambarGaris()` sepanjang jalan, 1,1 dtk
   - dua bidang: `masuk()` bersamaan, opacity isi 0,2 dan jalur 1

catatan:
   - **tahap 2 sengaja cuma satu kata VO.** labelnya harus sempat menyala
     sendirian sebelum kalimat berikutnya menjelaskan gunanya.
   - **tahap 3 yang membuat label terasa WAJIB**, bukan kalimatnya. kurir yang
     berhenti karena labelnya hilang adalah bukti; tanpa gambar itu ia cuma
     klaim yang harus dipercaya.
   - **isi label bukan huruf yang bisa dibaca**, cuma bentuk garis — sama seperti
     surat pengenal di scene 11. yang perlu terbaca bahwa ada tulisan di sana,
     bukan tulisannya.
   - **tidak ada angka di tahap 5.** ukuran dibaca dari besar kotaknya, kekerapan
     dari jaraknya. begitu ada angka, ia butuh baris `sumber:`.
   - **jangan menyebut T15 di layar.** penonton yang belum menonton firewall
     tidak boleh merasa ketinggalan; yang menonton keduanya mengenalinya sendiri.
   - frame terakhir (dua bidang: isi gelap, jalur terang) adalah frame pertama
     scene 15, tempat bidang isi yang gelap itu akhirnya dibuka.
