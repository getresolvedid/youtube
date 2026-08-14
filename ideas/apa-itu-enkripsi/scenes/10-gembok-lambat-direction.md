Anggaran: mulai 173,37 dtk · durasi 25,98 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `09-rahasia-berdua`: dua kunci kembar di dua
meja, jalan di antaranya.

Bagian 6 [explaining], scene pertamanya. Ia menjawab pertanyaan yang lahir
sendiri di scene 9: kalau kuncinya sudah ada di dua meja, gemboknya untuk apa?
**Jawabannya soal waktu, bukan soal kekuatan.**

1. dua kunci kembar tetap di tempatnya. tidak ada yang berubah dulu.
   (VO: "Kunci yang sama di dua meja itu bukan sekadar rapi.")

2. gembok kembali dari tepi atas dan menjepit satu kotak. gerakannya SENGAJA
   berat: turunnya lambat, menutupnya lambat.
   (VO: "Gembok tadi memang bekerja, tapi dia lambat.")

3. di belakang kotak itu, antrean kotak lain menumpuk dan berhenti. ekornya
   sampai keluar tepi kiri frame.
   (VO: "Mengunci dan membuka dengannya makan waktu, dan kirimanmu bukan cuma satu kotak.")

4. garis waktu tipis tergambar di bawah jalan, dari kiri ke kanan. cuma potongan
   paling kiri yang ditandai gembok; sisanya kosong. TIDAK ADA ANGKA di garis itu.
   (VO: "Jadi gembok cuma dipakai sebentar, di pembukaan.")

5. gembok diangkat dari kotak dan diletakkan ke tepi. dua kunci kembar di dua
   meja menyala sebentar sebagai gantinya.
   (VO: "Begitu kunci yang sama sudah ada di dua meja, gemboknya diletakkan.")

6. antrean pecah. kotak-kotak mengalir cepat DUA ARAH di jalan yang sama,
   dikunci dan dibuka dengan kunci kembar itu, sampai jalannya penuh gerak.
   (VO: "Sisanya mengalir dengan kunci yang cepat, dua arah, sampai percakapannya habis.")

motion:
   - gembok berat: `t()` durasi 1,4 dtk (di scene 4 dan 7 durasinya 0,4) —
     bedanya harus terasa, dan itu satu-satunya cara "lambat" terbaca
   - antrean: kotak-kotak `t()` pada x dengan berhenti di jarak tetap satu sama
     lain, stagger 0,08
   - garis waktu: `gambarGaris()` sekali, lalu satu blok aksen di 0..12 persen
     panjangnya
   - arus dua arah: dua kelompok kotak, arah berlawanan, `E.linear`, kecepatan
     3x kecepatan kotak di scene 1

catatan:
   - **antrean yang menumpuk yang membuat "lambat" terasa**, bukan kata
     "lambat". tanpa akibat yang kelihatan, penonton cuma disuruh percaya satu
     sifat.
   - **garis waktunya tidak berangka**, dan itu mengikat: begitu ada angka di
     situ ia jadi klaim yang butuh baris `sumber:` (`naskah.md` § Sumber). yang
     perlu terbaca cuma perbandingan panjang.
   - **ini satu-satunya scene dengan arus dua arah.** di seluruh episode arahnya
     kiri ke kanan; pengecualian di sini yang membuat "dua arah" terbaca sebagai
     perubahan, bukan sebagai kelalaian.
   - **gemboknya diletakkan ke tepi, tetap terlihat.** ia dipanggil lagi di
     scene 11, dan di sana pertanyaannya justru dari mana ia diambil.
   - scene ini yang **dipangkas kedua** kalau episode kepanjangan — karena itu
     tidak ada titik putus analogi yang dititipkan di sini.
   - frame terakhir (arus kotak dua arah, gembok tergeletak di tepi) adalah
     frame pertama scene 11.
