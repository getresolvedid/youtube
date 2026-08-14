Anggaran: mulai 145,17 dtk · durasi 28,20 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `08-kunci-tidak-pernah-lewat`: dua label
terpasang, lingkaran di meja kanan, gembok terbuka di tepi jalan.

Bagian 5 [why], sebab kedua — dan **titik putus analogi nomor tiga**. Panggungnya
untuk pertama kalinya jadi SIMETRIS: dua meja setara, jalan di antaranya.

1. label-label dari scene lalu memudar. gembok-gembok di tepi jalan MEREDUP di
   tempatnya — dipinggirkan dari perhatian, tidak dipindah dan tidak dihapus.
   (VO: "Tapi gembok bukan satu-satunya jalan keluar.")

2. dua meja tampil sejajar kiri dan kanan, tingginya sama, jalan membentang di
   antaranya. panggung yang simetris untuk pertama kalinya.
   (VO: "Ada cara lain, dan justru itu yang paling sering dipakai sekarang.")

3. satu potongan muncul di tiap meja — bentuknya berbeda satu sama lain. masing-
   masing langsung dikurung garis putus-putus yang tidak pernah diseberangi.
   (VO: "Dua meja sama-sama menahan satu potongan, dan potongan itu tidak pernah dikirim.")

4. barang setengah jadi berangkat dari kiri ke kanan dan dari kanan ke kiri,
   berpapasan di tengah jalan. tangan-tangan memegang keduanya saat lewat.
   (VO: "Yang bolak-balik di jalan cuma barang setengah jadi.")

5. di tiap meja, potongan yang dikurung tadi dipasangkan ke barang yang baru
   datang. keduanya menyatu jadi satu benda utuh.
   (VO: "Lalu di masing-masing meja, potongan yang ditahan tadi dipasangkan ke barang yang datang.")

6. dua kunci utuh berdiri di dua meja, bentuknya SAMA PERSIS. di jalan, satu
   tangan masih memegang barang setengah jadi dan tidak bisa apa-apa dengannya.
   (VO: "Hasilnya sama persis. Kunci yang sama, di dua meja, tanpa pernah lewat jalan.")

motion:
   - gembok dipinggirkan: opacity 1 -> 0,25 saja. TIDAK digeser: menaikkannya
     membuatnya bertumpuk dengan tangan, dan tempatnya harus tetap sama supaya
     scene 11 bisa menunjuk tumpukan yang ITU JUGA
   - potongan dikurung: `gambarGaris()` keliling kecil, 0,5 dtk, per meja
   - berpapasan: dua `t()` berlawanan arah dengan durasi sama, jadi titik temunya
     tepat di tengah jalan — jangan digeser supaya "kebetulan bagus"
   - menyatu: potongan `t()` bergerak ke benda yang datang lalu keduanya
     digambar sebagai satu bentuk; pergantiannya di ambang 0,5, sekali
   - kunci kembar: `masuk()` bersamaan di dua meja, TANPA stagger — kesamaannya
     yang jadi isinya

catatan:
   - **gemboknya dipinggirkan, bukan dihapus.** ia dipanggil lagi di scene 11
     untuk pekerjaan yang berbeda; kalau di sini hilang dari layar, kemunculannya
     nanti terbaca sebagai benda baru.
   - **dua potongan sengaja BERBEDA bentuk, dua kunci hasilnya sengaja SAMA.**
     itu seluruh isi scene ini dalam satu gambar, dan satu-satunya hal yang harus
     terbaca tanpa VO.
   - **jangan menjelaskan cara memasangnya.** tidak ada rumus, tidak ada angka,
     tidak ada tanda hitung di layar. yang perlu terbaca cuma: potongannya tidak
     pernah lewat jalan.
   - **jangan memakai warna yang dicampur.** mencampur cat adalah gambaran lain
     untuk hal yang sama, dan dua gambaran di satu episode dilarang
     ([docs/09](../../../docs/09-tangga-abstraksi.md) aturan 4).
   - **sumbernya belum dibuka** (`naskah.md` § Sumber) — kalau ternyata gembok
     masih dipakai mengantar kunci di versi yang dipakai sekarang, yang berubah
     baris 1 VO dan tahap 1 di sini, bukan sisa scene-nya.
   - frame terakhir (dua kunci kembar di dua meja, tangan memegang barang
     setengah jadi) adalah frame pertama scene 10.
