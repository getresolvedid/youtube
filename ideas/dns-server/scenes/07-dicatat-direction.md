Anggaran: mulai 119,77 dtk · durasi 20,97 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `06-tangga`: tangga loket utuh, kartu baru di
laci ujung. Tidak ada yang masuk atau menepi — panggungnya sudah berdiri, dan
scene ini menambahkan satu lapis di atasnya.

Tangganya dari `../panggung-loket.tsx` (`TANGGA`, `posLoket(i)`), sama persis
dengan scene 6.

1. jalur naik dari bawah ke loket ujung MENYALA PENUH — seluruh tangga, dari
   anak tangga terbawah sampai teratas. inilah ongkos yang sedang dikeluhkan.
   (VO: "Tapi naik tangga begitu tiap kali jelas lebih lambat daripada daftar tadi.")

2. kartu jawaban lepas dari laci loket ujung dan mulai bergerak TURUN.
   arahnya turun, dan itu harus terbaca sejak gerakan pertama.
   (VO: "Makanya jawabannya tidak dibuang begitu saja.")

3. di tiap loket yang dilewatinya, sehelai catatan kecil tertinggal dan menempel
   di sisi loket. warnanya sama dengan kartu jawabannya, ukurannya lebih kecil.
   kartunya terus turun, tidak berhenti untuk menempelkan.
   (VO: "Di sepanjang jalan pulang, tiap loket menuliskannya.")

4. pertanyaan KEDUA masuk dari bawah. bentuknya sama dengan yang pertama,
   warnanya beda supaya bisa dibedakan.
   (VO: "Pertanyaan yang sama besok tidak perlu naik lagi.")

5. baru sampai loket TERBAWAH, catatan yang menempel di situ menyala dan
   pertanyaannya BERBALIK turun. sisa tangga di atasnya tetap gelap — tidak
   sedetik pun menyala.
   (VO: "Dia berhenti di catatan pertama yang ditemuinya.")

6. kamera mundur. seluruh tangga terlihat utuh dalam satu frame.
   cuma anak tangga terbawah yang menyala; sisanya gelap dan diam.
   frame ini ditahan sampai potongan keras.
   (VO: "Jadi tangganya memang ada. Jarang benar-benar dinaiki.")

motion:
   - jalur menyala: `gambarGaris()` dari bawah ke atas, `E.power2out`, cepat
   - kartu turun: satu `p` dari 0 ke 1, posisinya dipetakan ke `posLoket()`
     terbalik — dan catatan yang menempel dipicu dari `p` yang SAMA, jadi
     helainya tidak pernah muncul sebelum kartunya lewat
   - catatan menempel: `scale 0->1` + sedikit rotasi tetap per indeks (bukan
     acak), `E.backOut(1,6)`
   - pertanyaan kedua: `t()` y naik, lalu tween KEDUA yang membalikkannya —
     dua tween berurutan, bukan satu `tPP()`, karena naik dan turunnya tidak
     simetris
   - kamera mundur: `scale` grup 1 -> 0,78 + `y`, `E.expoOut`, 0,9 dtk
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **arah turun harus terbaca di gerakan pertama tahap 2.** kalau kartunya
     sempat bergerak mendatar dulu, "jalan pulang" hilang, dan tahap 5 jadi tidak
     punya sebab.
   - **catatan tertinggal tanpa kartunya berhenti.** kartu yang berhenti di tiap
     loket untuk menempelkan catatan akan terbaca sebagai perjalanan yang makin
     lambat — kebalikan dari yang dimaksud scene ini.
   - **sisa tangga di tahap 5 tidak boleh berkedip sama sekali.** satu kilau
     kecil saja dan penonton menyimpulkan pertanyaannya tetap naik, cuma lebih
     cepat. yang benar: ia tidak naik.
   - **tahap 6 adalah gambar yang dibawa pulang penonton dari bagian 5**, dan ia
     harus diam. setelah dua scene penuh gerakan naik, satu frame tenang dengan
     cuma satu anak tangga menyala adalah kontras yang mengunci gagasannya.
   - **catatan yang menempel di sini akan dirusak scene 8.** bentuk dan
     posisinya karena itu harus tetap — `../panggung-loket.tsx` yang memegangnya,
     bukan scene ini.
   - tidak ada angka di layar. bukan "sembilan dari sepuluh", bukan persen.
     yang membuktikan klaimnya adalah satu anak tangga menyala di antara tangga
     yang gelap.
