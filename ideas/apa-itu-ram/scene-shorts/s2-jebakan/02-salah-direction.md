Anggaran: mulai 2,97 dtk · durasi 3,83 dtk (estimasi, VO belum jadi).
Satu beat. Kesinambungan: kalimat mitos dan batang ram mulai PERSIS di posisi &
ukuran akhir `01-mitos` — potongannya keras, jadi kesinambungan itu satu-satunya
yang menyambungkan keduanya.

1. dicoret:
   - garis tebal `--warn` melintas menutup kalimat mitos, digambar dari kiri ke
     kanan — SATU GARIS PER BARIS, beruntun cepat, bukan satu garis untuk
     seluruh blok (kalimatnya dua baris; garis tunggal jatuh di celah
     antar-baris dan terbaca sebagai garis bawah, bukan coretan — ini koreksi
     dari draft pertama, ketahuan setelah still-nya dibuka)
   - batang ram di belakangnya meredup ke `--ink-2`
   - kalimatnya TIDAK dihapus dan tidak memudar: ia tinggal, tercoret
   (VO: "Sebagian besar waktu, itu tidak benar. Dan gampang dibuktikan.")

teks di layar:
   "sebagian besar waktu" — kecil, `--warn`, tepat di bawah coretan. Frasa ini
   yang menahan Short dari klaim yang terlalu besar, dan ia harus terbaca oleh
   penonton yang menonton tanpa suara.

catatan komposisi:
   - **kalimatnya tinggal di layar, tercoret.** Menghapusnya membuat penonton
     yang baru scroll masuk kehilangan apa yang sedang dibantah — dan di feed
     Shorts, sebagian penonton memang mendarat di detik ketiga.
   - coretannya garis mendatar, bukan silang. Silang berarti "salah total"; ini
     "tidak selalu", dan bentuk coretannya harus sepakat dengan kalimatnya.
   - letak coretan & keterangannya DITURUNKAN dari `MITOS_GEO` di
     `../meja-kerja.tsx`, bukan diketik di scene ini. Draft pertama memakai
     angka tangan: coretannya mendarat di antara dua baris dan keterangannya
     menimpa baris kedua.

motion:
   - coretan: `gambarGaris()`, `power2out`, 0,35 dtk — cepat, sekali tarik
   - batang ram meredup: fade ke opasitas 0,35, 0,4 dtk
   - "sebagian besar waktu": `masuk()` geser 12px, mulai setelah coretan selesai
