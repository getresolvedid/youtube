Anggaran: mulai 232,89 dtk · durasi 25,99 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Frame kembali utuh setelah scene 10 membelahnya. Panggung tunggal, penjaga di
tempatnya, menghadap kiri seperti sepuluh scene sebelumnya.

Scene ini satu-satunya yang boleh memutar arah hadap penjaga
(`../panggung-gedung.tsx`), dan seluruh artinya bergantung pada arah yang sudah
dipakai sejak scene 1.

1. panggung utuh. semua panah dan semua benda yang bergerak mengarah ke DALAM,
   seperti sejak tadi.
   (VO: "Sampai sini penjaganya selalu kita lihat menghadap ke luar.")

2. penjaganya BERPUTAR di tempat, menghadap gedung. topinya ikut berputar; ia
   tidak berpindah satu piksel pun.
   (VO: "Sekarang putar badannya.")

3. panah kedua tergambar, arahnya keluar. dua arah berdiri berdampingan di depan
   pintu yang sama, sama tebalnya.
   (VO: "Dia berdiri untuk dua arah, dan arah kedua nyaris tidak pernah dilihat orang.")

4. beberapa kiriman berangkat dari dalam ke luar, satu demi satu, tenang.
   arahnya dari kanan ke kiri.
   (VO: "Ada yang keluar dari dalam gedungmu juga, terus-menerus.")

5. sebagian menyala terang saat lewat: ada barisnya di buku catatan, memang kamu
   yang menyuruh. bukunya terbuka sebentar di sisi penjaga.
   (VO: "Sebagian memang kamu yang menyuruh.")

6. satu kiriman berangkat TANPA jejak apa pun di buku. bukunya tetap kosong di
   bagian itu, dan kirimannya tetap berjalan keluar.
   (VO: "Sebagian tidak, dan justru itu yang paling ingin kamu tahu.")

7. di sebelahnya, penjaga versi lama digambar sebagai siluet redup yang
   membelakangi semua itu, sibuk menghadap ketukan dari luar.
   (VO: "Penjaga yang cuma menjaga pintu masuk tidak akan pernah menyadarinya.")

motion:
   - berputar: `scaleX` dari 1 ke -1 lewat `t()`, melewati 0 di tengah — bentuk
     paling sederhana yang terbaca sebagai berbalik badan, dan satu-satunya yang
     tidak butuh gambar kedua
   - panah kedua: `gambarGaris()`, tergambar dari dalam ke luar
   - kiriman keluar: `t()` x dari tepi gedung ke `X_LUAR`, tundaan tetap
   - kiriman tanpa jejak: warnanya SAMA dengan yang lain, cuma bukunya yang tidak
     terisi. bedanya harus ada di buku, bukan di bendanya
   - siluet penjaga lama: opasitas 0,35, tidak beranimasi sama sekali

catatan:
   - **scene ini yang paling mungkin dipangkas kalau episodenya kepanjangan**
     (`naskah.md § Scene`), dan ia sengaja bisa dicabut tanpa memutus apa pun:
     `12-label-bukan-isi` membuka dengan "ke arah mana pun dia menghadap" —
     kalimat yang tetap utuh walau scene ini tidak ada.
   - **kiriman tanpa jejak tidak dijelaskan asalnya, dan tidak diberi warna
     bahaya.** menyebut sumbernya berarti masuk ke topik lain yang butuh
     episodenya sendiri; yang dibutuhkan di sini cuma kesadaran bahwa arah itu
     ada dan tidak diperiksa.
   - **penjaganya tidak berpindah tempat saat berputar.** kalau ia bergeser,
     penonton membacanya sebagai penjaga kedua yang datang.
   - nada scene ini tidak boleh berubah jadi cerita horor. tidak ada bayangan
     yang mengendap, tidak ada warna merah.
