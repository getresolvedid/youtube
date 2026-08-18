Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Tiga baris VO = tiga tahap.

Payoff Short 4.

**DI 9:16 LAYAR DIBELAH ATAS–BAWAH, BUKAN KIRI–KANAN.** Storyboard menulis
"screen split menjadi dua" dengan sisi kiri dan kanan, tapi itu bentuk 16:9. Di
bingkai tegak, dua kolom sempit membuat teksnya tidak terbaca di layar HP.
Perputaran ini sejalan dengan arah jalur yang juga sudah diputar 90°
(`../panggung-short.tsx`).

1. satu garis mendatar turun di tengah frame dan membelahnya jadi dua bidang.
   bidang ATAS terisi: `IP` / `alamat & jalur`, dengan satu potongan yang
   memilih arah di persimpangan kecil.
   (VO: "Jadi, IP lebih berhubungan dengan alamat dan perjalanan.")

2. bidang BAWAH terisi: `TCP` / `lengkap & urut`, dengan empat potongan berbaris
   urut dan bercentang.
   (VO: "TCP lebih berhubungan dengan keandalan komunikasi.")

3. garis pemisah memudar. kedua bidang bergerak SALING MENDEKAT ke tengah —
   bukan salah satu mendatangi yang lain.
   (VO: "Mereka memiliki tugas berbeda, tetapi bekerja bersama.")

motion:
   - garis belah: `gambarGaris()` dari kiri ke kanan
   - dua bidang: `masuk()` masing-masing di beat-nya sendiri
   - menyatu: `t()` pada y kedua bidang menuju tengah, jaraknya sama — kalau
     salah satu bergerak lebih jauh, yang terbaca satu ditelan yang lain

catatan:
   - **keduanya bergerak sejauh yang sama.** yang disampaikan kalimatnya adalah
     kerja sama, bukan penggabungan; bidang yang diam sementara yang lain
     mendatanginya membalik artinya.
   - **isi kedua bidang daur ulang dari scene 2 dan 3**, diperkecil. rangkuman
     yang memperkenalkan gerakan baru bukan rangkuman.
   - frame terakhir: dua bidang berdempetan di tengah, tanpa garis pemisah.
     frame pertama `5-namanya` menyatukan keduanya jadi satu tulisan.
