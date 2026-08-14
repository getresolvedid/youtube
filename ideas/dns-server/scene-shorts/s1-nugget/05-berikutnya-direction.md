Anggaran: mulai 22,79 dtk · durasi 5,26 dtk (estimasi, VO belum jadi).
Dua beat, dan sengaja **paling pendek di antara ketiga payoff**. Begitu pola
"menunjuk, bukan menjawab" terbaca sekali di scene 4, mengulanginya panjang-panjang
justru membuang detik yang dibutuhkan scene 6.

1. tangannya sampai (beat 0):
   - tangan penunjuk yang berhenti di tengah pada scene 4 melanjutkan sisanya
     dan mendarat di loket berikutnya — bukan tangan baru, lanjutan yang sama
   (VO: "Jadi dia tidak menjawab. Dia menunjuk.")

2. loket berikutnya (beat 1):
   - penanda bergeser ke potongan tengah; potongan itu menyala, yang kanan
     kembali meredup
   - garis tergambar dari potongan tengah ke jendela loket kedua; loket itu
     menyala dan lacinya ditarik — kosong lagi
   (VO: "Potongan berikutnya membuka loket berikutnya.")

teks di layar:
   beat 0 → "Dia menunjuk, bukan menjawab."
   beat 1 → "Potongan berikutnya, loket berikutnya."

catatan komposisi:
   - **laci kedua kosong dengan bentuk yang sama persis** seperti scene 4 —
     komponen `Loket` yang sama, bukan gambar yang mirip. Ini kutipan visual:
     penonton mengenali laci yang baru saja dilihatnya, dan mengenali berarti
     "oh, yang ini pun tidak menyimpan".
   - **laci loket pertama tetap terbuka.** Menutupnya membuat penonton mengira
     keadaannya sudah selesai; yang dimaksud justru bahwa keduanya kosong pada
     saat yang sama.
   - ritmenya dipercepat dengan **memperpendek jarak antar kejadian**, bukan
     dengan melambatkan tween-nya. Tween yang dilambatkan terbaca sebagai
     gerakan yang beda, bukan sebagai ritme yang beda.
   - loket ketiga masih siluet.

motion:
   - tangan penunjuk: dari 45% ke 100% jarak, `power2out`, 0,4 dtk, mulai beat 0
   - penanda: geser ke `xPotonganS(1)`, `power2out`, 0,3 dtk, mulai beat 1
   - garis: `gambarGaris()` 0,4 dtk, mulai beat 1 + 0,1
   - laci kedua: `expoOut`, 0,55 dtk, mulai beat 1 + 0,35
