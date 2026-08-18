Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Empat baris VO = empat tahap.

Scene inti kedua, dan puncak episode. Semua yang ditanam scene 6 dipakai di sini:
nomornya, dan jalurnya yang tidak sama.

1. keempat potongan masih dalam perjalanan, meneruskan posisi akhir scene 6.
   panggungnya identik — komputer tujuan di kanan tidak bergeser satu piksel pun.
   (VO: "Di sinilah TCP berperan.")

2. 01, 03, dan 04 berjalan ke kanan dan **BERLABUH** — di seperempat terakhir
   perjalanannya masing-masing berbelok ke barisnya sendiri di papan penerima,
   lalu diam di situ sampai scene habis. **02 MEMUDAR di tengah jalur atas** —
   tidak meledak, tidak pecah, cuma pelan-pelan tidak ada. jalur atas ikut
   meredup, dan di titik ia lenyap tinggal satu lingkaran putus-putus.
   (VO: "TCP, atau Transmission Control Protocol…")

3. papan penerima muncul di kanan, empat baris berjajar ke bawah:
   `01 ✓` `02 ?` `03 ✓` `04 ✓`. baris 02 sengaja RENGGANG dari tetangganya —
   lubangnya harus terlihat sebagai jarak, bukan cuma sebagai simbol.
   (VO: "TCP dapat memastikan data diterima dengan lengkap…")

4. dari papan, satu tanda kecil berjalan **BALIK KE KIRI** sepanjang jalur atas
   sampai ke pengirim. begitu sampai, 02 berangkat lagi dari kiri, menempuh
   jalur atas yang sama, dan tiba. baris `02 ?` berubah jadi `02 ✓`, lalu
   keempat baris merapat.
   (VO: "Jika ada bagian data yang hilang dalam perjalanan…")

motion:
   - tiba: `t()` pada x tiap potongan, selesai berurutan 01 → 03 → 04
   - 02 memudar: `t()` pada opacity 1 → 0 dengan `E.power1in`, di x sekitar
     tengah jalur. TIDAK ada `getar()`, tidak ada skala mengecil
   - papan: `masuk()` tiap baris dengan `urutan` 0..3, `jeda` 0,1
   - permintaan balik: `t()` pada x dari papan ke pengirim, `E.power1out`,
     warnanya `--accent` supaya beda dari potongan
   - kirim ulang: `Paket` warna `ulang`, jalur atas, `E.power1out`
   - merapat: `t()` pada y tiap baris, hanya setelah 02 jadi centang

catatan:
   - **potongan yang sudah tiba TIDAK boleh lenyap** — dikoreksi 2026-08-18
     setelah melihat still-nya. versi pertama membuat potongan hilang begitu
     sampai, dan dua pertiga layar kiri kosong selama sepuluh detik terakhir
     scene ini, yaitu justru selama bagian paling pentingnya. sekarang tiap
     potongan berlabuh **tepat di sebelah kiri barisnya di papan**; pemasangan
     itu sekaligus yang membuat papan terbaca sebagai catatan tentang benda yang
     barusan lewat, bukan sebagai tabel yang berdiri sendiri.
   - **lingkaran putus-putus di titik 02 lenyap** tinggal sampai ia dikirim
     ulang. tanpa itu kehilangannya cuma peristiwa sesaat yang lewat, dan
     penonton yang berkedip melewatkannya.
   - **jangan menghancurkan 02.** ledakan terbaca sebagai kerusakan luar biasa;
     hilangnya potongan itu peristiwa biasa, dan seluruh scene ini soal betapa
     biasanya ia sampai-sampai ada mekanisme tetap untuk itu.
   - **yang bekerja adalah LUBANGNYA, bukan tanda tanyanya.** baris 02 renggang
     dari tetangganya supaya mata menemukan lubangnya sendiri sebelum VO
     menyebutkannya. kalau keempat baris rapat, `?` cuma jadi hiasan.
   - **permintaan balik satu-satunya gerakan kanan → kiri** di episode ini
     selain jawaban server di scene 11. arah itu miliknya; jangan dipakai untuk
     apa pun yang lain.
   - **komputer tujuan tidak bergeser** dari scene 6. sambungannya ketat, dan
     satu-satunya yang membuat potong keras di antaranya terbaca sebagai
     kelanjutan adalah bendanya menempati piksel yang sama.
   - frame terakhir: empat baris centang rapat + potongan yang sudah masuk.
