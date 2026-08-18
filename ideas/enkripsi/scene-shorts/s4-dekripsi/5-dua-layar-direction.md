Anggaran: durasi ±6,6 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

**Bayaran seluruh seri.** Setelah ini tidak ada lagi yang perlu dibuktikan —
scene 6 cuma menamai apa yang sudah terlihat.

1. potong keras ke panggung bersih. layar TERBELAH MENDATAR. bagian atas: layar
   meja yang mengamati, isinya `X7K9@2#L8$Q`, dengan label kecil "YANG MENGINTIP".
   bagian bawah: HP penerima, isinya "Halo, apa kabar?" sebagai gelembung chat,
   dengan label kecil "YANG DITUJU". keduanya masuk BERSAMAAN, lalu DITAHAN.
   (VO: "Orang yang tidak memiliki akses yang tepat tidak langsung dapat memahami isi data tersebut.")
   TEKS LAYAR: labelnya sendiri

motion:
   - garis pembelah: `scaleX` 0 → 1 dari tengah, `E.expoOut`
   - kedua sisi: `masuk()` dengan `mulai` yang SAMA — keduanya setara, dan yang
     muncul belakangan terbaca sebagai akibat dari yang pertama
   - setelah keduanya berdiri: NOL gerakan sampai scene habis

catatan:
   - **belahnya MENDATAR**, alasan yang sama dengan Short 3 scene 5: di 9:16 dua
     kolom sempit memaksa isinya mengecil sampai tidak terbaca di ponsel.
   - **kedua layar memakai komponen aslinya** — `Monitor` dan `Hp` dari
     `../../panggung-kiriman.tsx`, di ukuran yang dikecilkan tapi bentuk yang
     sama. penonton harus mengenali keduanya, bukan mencocokkannya.
   - **labelnya kecil dan redup.** dua layar yang isinya berbeda sudah
     mengatakannya.
   - **kalau Short 4 harus dipendekkan, SCENE INI YANG TERAKHIR DISENTUH.**
