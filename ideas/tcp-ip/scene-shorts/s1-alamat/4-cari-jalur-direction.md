Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

Payoff Short 1, dan bayaran atas pertanyaan yang digantung scene 1.

1. potongan bergerak turun sedikit ke titik percabangan. satu dari tiga jalur
   MENYALA — jalur tengah. dua sisanya tetap tergambar, tetap redup.
   teks layar: "Alamatnya yang memilih jalan."
   (VO: "Ketika kamu mengirim data, informasi tentang alamat tujuan…")

2. potongan menuruni jalur yang menyala. tiap simpul yang dilewatinya membesar
   dan terang sebentar, lalu kembali. teks layar berganti: "Lewat banyak tangan."
   (VO: "Data kemudian bergerak melalui berbagai perangkat jaringan…")

motion:
   - jalur menyala: `t()` pada opacity garis terpilih; dua lainnya TETAP di
     opacity semula, tidak diturunkan
   - potongan turun: `t()` pada y dari titik cabang ke ujung bawah, `E.power1out`
   - simpul: `nyalaSimpul(yPotongan)` — fungsi POSISI, bukan waktu

catatan:
   - **dua jalur yang tidak dipilih wajib tetap terlihat.** kalau keduanya
     hilang, yang terbaca "cuma ada satu jalan" — dan pilihan berhenti jadi
     pilihan. ini kesalahan yang sama yang sudah diperbaiki di scene 9 video
     panjang; jangan diulang di sini.
   - **yang memilih bukan potongannya, melainkan alamatnya.** karena itu label
     angkanya tetap terbaca sepanjang scene — ia sebabnya, bukan hiasan.
   - frame terakhir: potongan di ujung bawah jalur, tepat di atas tujuan. frame
     pertama `5-sampai` melanjutkan dari titik itu.
