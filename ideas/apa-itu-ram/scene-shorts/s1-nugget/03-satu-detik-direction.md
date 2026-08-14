Anggaran: mulai 9,37 dtk · durasi 8,11 dtk (estimasi, VO belum jadi).
Dua beat, dua tahap. Scene terpanjang Short ini, dan satu-satunya yang membangun
panggung — tiga scene sesudahnya cuma menyalakan apa yang berdiri di sini.

1. angka aslinya lewat:
   - deret angka kecil melintas cepat di tengah layar dan langsung menyusut
     hilang — dibaca sebagai "terlalu kecil", bukan sebagai informasi
   - tidak ada satuan, tidak ada label: kalau penonton sempat membacanya,
     tahap ini gagal
   (VO: "Berapa lama? Angka aslinya terlalu kecil buat dibayangkan.")

2. panggung berdiri — TIGA TEMPAT, dari atas ke bawah:
   - tempat 1 menempel di sisi chip (kotak kecil, `--accent`)
   - tempat 2 meja kerja di bawahnya (`.meja`)
   - tempat 3 lemari arsip paling bawah (`.lemari`, 4 laci)
   - garis tegak tipis menghubungkan ketiganya: itulah jaraknya, dan
     panjangnya di layar sebanding dengan jauhnya
   - jam besar muncul di bawah, jarumnya masih DIAM di angka 12
   (VO: "Jadi bayangkan tiga tempat menaruh berkas, dan kita besarkan waktunya.")

teks di layar:
   beat 0 → "angkanya terlalu kecil"
   beat 1 → "kita besarkan"   (di dekat jam, bukan di dekat tiga tempat —
            yang dibesarkan waktunya, bukan tempatnya)

catatan komposisi:
   - ketiga tempat masuk BERURUTAN dari atas ke bawah, stagger, supaya jaraknya
     terbaca sebagai perjalanan turun. Masuk bersamaan = tiga benda, bukan tiga
     jarak.
   - **TUMPUKANNYA RENGGANG, dan itu keputusan, bukan sisa ruang.** Yang menempel
     di chip memang rapat — itu artinya "menempel". Dua celah sesudahnya lebar
     dan sengaja SAMA besar; keduanya memakai seluruh tinggi yang tersisa antara
     teks dan alat ukur. Versi pertama menaruh keempatnya berdekatan dan hasilnya
     terbaca sebagai tumpukan benda, bukan sebagai jarak — padahal jarak itulah
     seluruh isi Short ini. Koordinatnya di `../tiga-tempat.tsx`; menggeser satu
     berarti menghitung ulang semuanya.
   - celahnya sama besar karena skala sesungguhnya TIDAK bisa digambar (tiga bulan
     berbanding satu detik adalah lima juta kali). Yang digambar urutannya;
     besarannya dipikul angka di kolom kanan.
   - jam sengaja berdiri sebelum dipakai. Kalau ia baru muncul di scene 4
     bersamaan dengan jarum yang bergerak, penonton menghabiskan beat itu untuk
     mengenali jamnya, bukan untuk membaca gerakannya.
   - belum ada label nama di tempat mana pun — labelnya milik `07-namanya`.

motion:
   - angka lewat: `translateY` naik + `scale 1 → 0,2`, `power2in`, 0,45 dtk
   - tiap tempat: `masuk()` geser 40px, stagger 0,18 dtk, `expoOut`
   - garis penghubung: `gambarGaris()` dari atas ke bawah, 0,6 dtk, mulai
     setelah tempat ketiga mendarat
   - jam: fade + `scale 0,8 → 1`, `backOut(1.4)`
