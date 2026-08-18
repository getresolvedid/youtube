Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

1. kamera merapat ke barisan slot, memusat ke lubang ketiga. keempat slot yang
   terisi MEREDUP; lubangnya tetap terang. teks layar: "Yang nomor tiga?"
   (VO: "Apa yang terjadi?")

2. nama pekerjaannya jatuh besar di sepertiga atas: `TCP`.
   (VO: "Di sinilah TCP menjadi penting.")

motion:
   - merapat: `kamera()` skala 1 → 1,25 dengan titik pusat di lubangnya,
     `E.expoOut`, durasi 0,9
   - meredup: `t()` pada opacity keempat slot terisi 1 → 0,3
   - nama: `masuk()` dengan `geser` 26, durasi 0,5

catatan:
   - **meredupkan yang lain lebih kuat daripada menyorot yang satu.** empat slot
     yang menggelap membuat lubangnya jadi satu-satunya yang tersisa terang —
     tanpa tanda panah, tanpa lingkaran, tanpa satu elemen tambahan pun.
   - **nama TCP jatuh SETELAH masalahnya terlihat**, dan ini satu-satunya tempat
     di keempat Short yang urutannya kebetulan sesuai HARD RULE 6. jangan
     memindahkannya lebih awal "supaya penonton tahu ini soal apa".
   - frame terakhir: lubang terang + nama di atas. frame pertama `4-minta-lagi`
     melanjutkan dari kamera yang sama.
