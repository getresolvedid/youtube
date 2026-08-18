Anggaran: mulai 69,01 dtk · durasi 28,19 dtk (estimasi, VO belum jadi).
Delapan baris VO = delapan tahap.

Scene penutup bagian 3, dan scene yang paling menentukan apakah bagian 4 terasa
sebagai jawaban atau sebagai definisi. **Jalan keluar yang paling masuk akal
dicoba di depan penonton, lalu gagal di depan penonton** — peran yang sama dengan
`04-daftar-yang-basi` di T14.

Panggung sama, kamera skala 1.

1. semua pintu digembok berurutan dari kiri ke kanan, cepat, termasuk ketiga
   yang tadi menyala. dindingnya jadi rata.
   (VO: "Jadi kunci saja semuanya, dan urusannya selesai.")

2. ketukan berdatangan dan MEMANTUL di dinding, berbalik ke kiri. tidak ada satu
   pun yang masuk. terasa seperti kemenangan.
   (VO: "Sekarang tidak ada satu pun ketukan yang tembus.")

3. kamera bergeser ke satu titik di luar yang sejak tadi tidak diperhatikan:
   ruang kosong di kiri, jauh dari dinding.
   (VO: "Tapi lihat apa lagi yang ikut tertahan di luar.")

4. dari DALAM gedung, satu permintaan kecil berangkat ke luar lewat celah pintu
   yang masih sempat terbuka. ia mengecil ke kiri dan hilang.
   (VO: "Halaman yang kamu buka sendiri, jawabannya juga datang dari luar.")

5. jawabannya pulang dari kiri, menempuh jalur yang SAMA PERSIS dengan jalur
   ketukan orang asing, dan ikut memantul di gembok.
   (VO: "Lewat pintu yang sama, dari arah yang sama.")

6. dua benda berdiri berdampingan di luar pintu: jawaban yang ditunggu dan
   ketukan orang asing. digambar identik, tanpa satu pun pembeda.
   (VO: "Dari sini, jawabanmu dan orang asing terlihat sama persis.")

7. satu tanda centang muncul di atas yang kiri, satu tanda silang di atas yang
   kanan.
   (VO: "Yang satu harus masuk, yang satu tidak boleh.")

8. kedua tanda itu MEMUDAR lagi. yang tersisa dua benda yang sama persis, diam
   di depan pintu yang tergembok.
   (VO: "Dan keduanya cuma ketukan.")

motion:
   - gembok berurutan: `masuk()` dengan `urutan` 0..7 dan `jeda` 0,06 — cepat,
     supaya terbaca sebagai satu tindakan dan bukan delapan tindakan
   - pantulan: `t()` pada x sampai tepi dinding lalu `t()` kedua balik ke kiri,
     dengan `getar()` kecil di titik sentuhnya
   - permintaan keluar: `t()` x ke kiri + skala mengecil, `E.power2in`
   - dua benda identik: SATU komponen `Ketukan` dipakai untuk keduanya. dua
     komponen berbeda cepat atau lambat jadi dua gambar berbeda, dan seluruh
     scene ini bergantung pada keduanya tidak bisa dibedakan
   - tanda centang & silang: `masuk()` lalu `keluar()`-nya sendiri di tahap 8

catatan:
   - **`Peretas` PADAM di B_LIHAT, bersama pantulannya.** sisa scene ini milik
     permintaan yang berangkat dari dalam dan jawaban yang pulang — dua benda
     yang bukan miliknya. figur yang dibiarkan berdiri di situ akan terbaca
     sebagai pengirimnya, dan itu membalik seluruh arti tahap 4 dan 5.
   - **ini satu-satunya tempat "dinding tertutup" jadi gambaran utama di seluruh
     episode**, dan ia muncul sebagai jalan yang DITUTUP (`naskah.md § Analogi
     utama`). nama "firewall" memang berarti dinding, tapi dinding tidak memilih.
   - **tahap 8 wajib mencabut kembali tandanya.** kalau tanda centang dan silang
     tinggal di layar, penonton pulang dengan kesan keduanya memang bisa
     dibedakan dari luar — kebalikan persis dari isi scene ini.
   - **jalur jawaban dan jalur ketukan harus BERIMPIT**, bukan sekadar sejajar.
     dua garis yang berdekatan masih terbaca sebagai dua jalan; satu garis yang
     dilewati dua benda terbaca sebagai satu jalan.
   - frame terakhir scene ini adalah frame pertama `06-penjaga`: dua benda diam
     di depan pintu tergembok. penjaganya berdiri PERSIS di ruang kosong antara
     keduanya dan dinding.
