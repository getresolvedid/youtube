Anggaran: mulai 0 dtk · durasi 18,84 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertama episode. Tidak ada yang masuk dari luar, tidak ada fade in:
peramban sudah ada di sana sejak frame nol, dan yang pertama bergerak adalah
kursor. Penonton harus merasa dia menyusul sesuatu yang sedang berjalan, bukan
menunggu sesuatu dimulai.

Panggungnya milik `../panggung-loket.tsx` (`Peramban`, `X_LAYAR`) — scene 3
mewarisi koordinat yang sama supaya nama yang diketik di sini tetap di tempatnya
saat kamera masuk.

1. peramban di tengah, bilah alamatnya kosong dan menyala.
   kursor teks berkedip; nama diketik huruf demi huruf, kecepatan tetap.
   badan halaman di bawahnya kosong — abu-abu rata, tanpa placeholder skeleton.
   (VO: "Kamu ketik satu nama, lalu tekan enter.")

2. halaman terisi SEKALIGUS, satu frame. bukan bertahap, bukan memudar masuk.
   kecepatannya yang jadi isinya: penonton harus merasa ini instan.
   (VO: "Halaman itu muncul.")

3. seluruh frame mundur — halaman kembali kosong, huruf terhapus mundur.
   di bawah frame muncul bilah waktu tipis dengan kepala pemutar yang bergerak
   ke kiri. inilah satu-satunya elemen di episode ini yang mengakui adanya
   "rekaman"; ia dipakai sekali dan tidak pernah kembali.
   (VO: "Sekarang putar pelan bagian yang barusan lewat.")

4. mundurnya BERHENTI di antara ketikan dan halaman.
   dua penanda vertikal turun ke bilah waktu, menjepit celah sempit.
   celah itu lalu melebar mendorong sisa bilah ke kiri dan ke kanan.
   (VO: "Ada satu jeda kecil di situ, sebelum apa pun tampil.")

5. isi celahnya: nama yang tadi diketik, sendirian, besar, di tengah.
   di sebelahnya tanda tanya tumbuh.
   perambannya masih ada tapi tinggal garis luar tipis — konteks, bukan subjek.
   (VO: "Di jeda itu, komputermu belum tahu harus pergi ke mana.")

6. tanda tanya membesar sekali, aksen, lalu menetap.
   TIDAK ada yang menjawab di scene ini. layar diam dengan pertanyaannya
   sampai potongan keras ke kartu judul.
   (VO: "Jadi dari mana akhirnya dia tahu?")

motion:
   - ketikan: satu huruf per 0,08 dtk, `E.linear`. jangan di-ease — mengetik
     tidak melambat di ujung, dan yang melambat terbaca sebagai animasi
   - halaman terisi: TANPA tween. `opacity` 0 -> 1 di satu frame, dijaga
     perbandingan `d >= T_ISI`
   - mundur: `t()` dengan `E.power1in`, 1,1 dtk, semua elemen dipetakan dari
     `p` yang SAMA supaya huruf, halaman, dan kepala pemutar bergerak sebagai
     satu benda
   - celah melebar: `E.expoOut`, dua sisi simetris dari titik tengah
   - nama di celah: `masuk()` baku, geser 22
   - tanda tanya: `t()` skala 0,7 -> 1 `E.backOut(2.1)`, lalu `napas()` pelan
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`,
     dilarang random/state

catatan:
   - **peramban digambar netral.** tanpa logo, tanpa warna khas, tanpa tab
     bertumpuk. begitu ia terbaca sebagai peramban tertentu, penonton mulai
     memikirkan perambannya, dan yang dibahas episode ini bukan itu.
   - **nama situsnya fiktif dan netral** — bukan merek yang ada. merek nyata
     menarik perhatian ke mereknya, dan di scene 8 nanti nama yang sama harus
     bisa "pindah nomor" tanpa ada yang tersinggung.
   - **badan halaman sengaja kosong abu-abu**, bukan gambar situs sungguhan.
     yang penting di sini kejadiannya (muncul), bukan isinya.
   - aksen dipakai HANYA untuk tanda tanya di tahap 6. sisanya abu-abu. ini
     satu-satunya scene di bagian 1, jadi warna aksen belum boleh berarti
     "jawaban" — di sini ia berarti "yang belum dijawab".
   - bilah waktu di tahap 3 tidak boleh terlihat seperti pemutar video YouTube.
     tipis, tanpa tombol, tanpa angka.
