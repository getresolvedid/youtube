Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Satu baris VO = satu tahap.

Frame nol Short 3, dan ia sudah bergerak.

1. lima potongan bernomor `1`–`5` turun beriringan di jalur tengah, berjarak
   rata 140 px, dan **kelimanya sudah terlihat di dalam frame sejak frame nol** —
   seluruhnya di bawah zona teks layar dan di atas barisan slot. di bawahnya, **lima slot kosong berjajar
   mendatar** sudah tergambar — belum ada isinya.
   teks layar: "Lima bagian dikirim."
   (VO: "Sekarang bayangkan kamu mengirim lima bagian data.")

motion:
   - turun: `t()` pada y kelimanya, `E.linear` — kecepatan tetap, karena scene
     ini belum punya kejadian. **jaraknya dibuat lewat TITIK BERANGKAT yang
     berbeda (180 px), bukan lewat penundaan mulai.** dikoreksi 2026-08-18
     setelah `npm run tumpang`: dengan penundaan 0,1 dtk pada perjalanan 3,4 dtk,
     kelima potongan cuma berjarak beberapa piksel dan saling menimpa sepanjang
     scene. titik berangkat yang berjarak tetap menjaga jaraknya konstan dari
     frame nol sampai frame terakhir
   - slot: sudah ada di frame nol, opacity penuh. TIDAK dianimasikan masuk
   - teks: `masuk()` dengan `geser` 20

catatan:
   - **slotnya sudah ada sejak frame nol.** slot yang muncul belakangan akan
     mencuri perhatian dari yang akan hilang; slot yang sudah berdiri membuat
     lubangnya terbaca sendiri di scene 2, tanpa perlu ditunjuk.
   - **jangan menyalakan simpul di scene ini.** simpul yang berkedip menarik
     mata ke jalur, padahal yang harus dihafal penonton adalah kelima nomornya.
   - **keretanya mulai DI DALAM frame, bukan di atas layar** — dikoreksi
     2026-08-18 setelah `npm run tumpang`. versi pertama menurunkannya dari luar
     frame, dan tiap potongan menyeberangi baris teks layar dalam perjalanannya;
     menggeser teksnya tidak menolong karena yang menyeberang lima benda
     berturut-turut selama dua detik penuh. kebetulan versi yang sekarang juga
     lebih setia ke maksudnya: "sudah dalam perjalanan sejak frame nol" lebih
     terbaca kalau kelimanya memang sudah terlihat.
   - frame terakhir: kelima potongan di tengah perjalanan, slot masih kosong.
     frame pertama `2-satu-hilang` melanjutkan dari posisi itu.
