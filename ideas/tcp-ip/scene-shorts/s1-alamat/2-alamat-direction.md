Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

1. kotak yang SAMA dengan scene 1, di titik yang sama persis. sebuah label
   meluncur masuk dari kanan dan menempel di badannya: `TO: B`. teks layar:
   "Butuh alamat."
   (VO: "Tentu saja alamat tujuan.")

2. titik-titik jaringan menyala di latar, dan ketiga jalur redup dari scene 1
   berubah jadi jalur putus-putus yang sudah dikenal. kotaknya BELUM berubah.
   (VO: "Di internet, konsepnya juga seperti itu.")

motion:
   - label: `t()` pada x dari +260 ke 0 dengan `E.backOut(1.2)`, plus opacity —
     ia ditempel, bukan muncul
   - latar: `JaringanTegak` dengan `luas` 0 → 1
   - jalur: opacity silang antara garis lurus scene 1 dan jalur putus-putus

catatan:
   - **kotaknya tidak pindah dan tidak diganti.** kotak yang muncul ulang akan
     terbaca sebagai kiriman kedua, dan seluruh Short ini soal satu kiriman.
   - **latar duluan, benda belakangan.** perpindahan dunia nyata → jaringan
     dipecah dua supaya scene 3 punya kejutannya sendiri; kalau keduanya
     berubah sekaligus di sini, scene 3 tinggal mengulang.
   - frame terakhir: kotak berlabel di atas jaringan. frame pertama
     `3-jadi-alamat-ip` memakai titik yang sama untuk potongan digitalnya.
