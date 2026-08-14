Anggaran: mulai 14,44 dtk · durasi 8,35 dtk (estimasi, VO belum jadi).
Tiga beat — scene terpanjang Short ini, dan memang seharusnya: langkah pertama
tangga adalah satu-satunya yang perlu dijelaskan utuh. Dua langkah sesudahnya
tinggal mengulang polanya.

Frame pertamanya = frame terakhir scene 3: nama sudah pecah, komputer dan tiga
loket siluet sudah di tempatnya, tidak ada yang bergeser.

1. potongan paling kanan (beat 0):
   - penanda mendarat di potongan paling kanan; potongan itu menyala aksen, dua
     lainnya meredup jadi 40%
   - garis tergambar dari potongan itu turun ke jendela loket pertama di atasmu
   - loket itu menyala
   (VO: "Yang ditanya duluan potongan paling kanan.")

2. lacinya kosong (beat 1):
   - laci loket pertama ditarik keluar ke arah penonton — dan tidak ada apa pun
     di dalamnya
   (VO: "Loketnya tidak tahu apa-apa soal situsnya.")

3. dia menunjuk (beat 2):
   - tangan penunjuk keluar dari jendela loket pertama ke arah loket berikutnya,
     lalu **berhenti di tengah jalan**
   (VO: "Cuma tahu siapa yang mengurus akhirannya.")

teks di layar:
   beat 0 → "Yang paling kanan dulu."
   beat 1 → "Lacinya kosong."
   beat 2 → "Dia cuma tahu siapa berikutnya."

catatan komposisi:
   - **laci kosong adalah gambar kuncinya**, dan ia harus DIBUKA di layar, bukan
     cuma tidak digambar isinya. Kekosongan yang tidak pernah ditunjukkan terbaca
     sebagai "belum sempat digambar".
   - **tangan penunjuk berhenti di tengah.** Sisanya milik scene 5; menyelesaikan
     -nya di sini membuat scene berikutnya cuma mengulang.
   - dua loket di atasnya tetap siluet redup. Tidak ada yang boleh menyala
     mendahului urutannya.
   - tidak ada angka jumlah loket di layar — baris ⚠ di `naskah.md § Sumber`.

motion:
   - penanda: dari `xPotonganS(2)` (posisi scene 1 & 2) tetap di tempat; yang
     berubah cuma sorotnya
   - garis: `gambarGaris()` 0,5 dtk, mulai beat 0 + 0,15
   - loket nyala: tween 0→1, 0,4 dtk, mulai beat 0 + 0,2
   - laci: tween 0→1, `expoOut`, 0,7 dtk, mulai beat 1
   - tangan penunjuk: tumbuh 0→45% jarak ke loket berikutnya, `expoOut`, 0,5 dtk,
     mulai beat 2
