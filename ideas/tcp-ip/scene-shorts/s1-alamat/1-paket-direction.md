Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

Frame pertama Short 1. Tugasnya satu: menaruh satu benda yang dikenal dan satu
pertanyaan yang belum terjawab, dalam tiga detik.

1. kotak kiriman di tengah sepertiga tengah frame, sudah ada sejak frame nol dan
   sudah bergerak — turun sedikit lalu berhenti, seperti baru ditaruh.
   labelnya KOSONG. teks layar: "Mau kirim paket."
   (VO: "Bayangkan kamu ingin mengirim sebuah paket…")

2. dari bawah kotak muncul tiga jalur tegak yang menyebar ke tiga arah,
   ketiganya digambar sama redup — tidak ada yang menyala. teks layar berganti:
   "Ke mana?"
   (VO: "Apa yang dibutuhkan?")

motion:
   - kotak turun: `t()` pada y, `E.backOut(1.1)`, durasi 0,5 dtk — mendarat,
     bukan memudar masuk
   - tiga jalur: `gambarGaris()` ketiganya bersamaan, durasi 0,6
   - teks layar: `masuk()` lalu ditukar dengan `masuk()` kedua

catatan:
   - **labelnya kosong, bukan bertanda tanya.** kosong membuat penonton mencari
     isinya sendiri; tanda tanya sudah menjawab bahwa yang hilang "sesuatu".
   - **ketiga jalur sama redup.** begitu satu di antaranya menyala di sini,
     scene 4 kehilangan satu-satunya kejutannya.
   - frame terakhir: kotak + tiga jalur redup. frame pertama `2-alamat` memakai
     kotak di posisi yang sama persis — labelnya yang berubah.
