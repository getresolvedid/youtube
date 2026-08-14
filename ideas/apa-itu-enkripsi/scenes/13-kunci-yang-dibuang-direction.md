Anggaran: mulai 254,41 dtk · durasi 24,23 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `12-kotak-bisa-ditukar`: kotak bersegel robek
sedang pulang ke kiri, jalan menyala.

**Satu-satunya scene yang bergerak di waktu, bukan di tempat.** Panggungnya tidak
berubah; yang bertambah cuma satu tumpukan di bawah jalan yang terus meninggi.

1. kotak yang pulang keluar frame. jalan kembali normal, kotak-kotak lain
   berjalan seperti biasa — tenang, tidak ada yang aneh.
   (VO: "Satu lagi, dan ini yang paling jarang kelihatan.")

2. satu tangan di tengah tidak melepas kotaknya. bayangan kotak itu jatuh ke
   BAWAH jalan sebagai salinan; kotak aslinya tetap berjalan ke kanan.
   (VO: "Ada yang menyalin kotakmu di jalan, lalu menyimpannya.")

3. salinan mendarat di tumpukan di bawah jalan. tumpukannya tertutup semua,
   tidak ada satu pun yang terbuka.
   (VO: "Dia tidak bisa membukanya hari ini. Dia menunggu.")

4. tumpukan meninggi cepat, salinan demi salinan. lalu satu kunci melayang turun
   ke tumpukan itu dan SEMUA kotaknya terbuka bersamaan.
   (VO: "Kalau kuncinya itu-itu saja, satu hari dia dapat, dan seluruh simpanannya terbuka sekaligus.")

5. adegan diulang dari awal, cepat: kunci dipakai untuk satu percakapan, lalu
   dipatahkan dan dibuang ke luar frame begitu percakapan itu selesai.
   (VO: "Makanya kuncinya dibuang begitu percakapannya selesai.")

6. kunci baru turun ke tumpukan yang sama. dicoba pada beberapa kotak, tidak
   satu pun cocok. tumpukannya tetap tertutup.
   (VO: "Yang tersimpan di gudangnya tinggal tumpukan kotak tanpa kunci yang cocok.")

motion:
   - salinan jatuh: `t()` pada y turun 260 px + opacity 0,55, `E.power1in`
   - tumpukan meninggi: jumlah kotak = `Math.round(t())`, bukan state
   - terbuka bersamaan: satu tween tunggal membuka SEMUA tutup pada waktu yang
     sama persis — kalau di-stagger, ia terbaca sebagai kerja keras, bukan
     sebagai runtuh sekaligus
   - kunci dipatahkan: dua potong path bergerak berlawanan + `E.power2in` keluar
     frame
   - mencoba dan gagal: `getar()` pada kunci di tiap kotak, tiga kali, jauh 5

catatan:
   - **tahap 4 harus terjadi SEBELUM tahap 5.** penonton harus melihat kerugiannya
     dulu; kalau kuncinya langsung digambar dibuang, yang terbaca cuma kebiasaan
     rapi, bukan jawaban atas sesuatu.
   - **tidak ada angka dan tidak ada tanggal di layar.** lamanya menunggu dibaca
     dari tingginya tumpukan; angka apa pun di sini butuh baris `sumber:`.
   - **tumpukannya di BAWAH garis jalan**, di ruang yang belum pernah dipakai
     scene mana pun. jalan tetap milik kiriman yang sedang berjalan.
   - **scene ini yang dipangkas duluan** kalau episode kepanjangan (`naskah.md`).
     karena itu tidak ada nama baru dan tidak ada titik putus analogi di sini,
     dan sambungan scene 12 ke 14 tetap masuk akal tanpa dia.
   - frame terakhir (tumpukan tertutup di bawah jalan, kunci yang tidak cocok)
     adalah frame pertama scene 14 — di sana tumpukannya yang meredup, bukan
     hilang seketika.
