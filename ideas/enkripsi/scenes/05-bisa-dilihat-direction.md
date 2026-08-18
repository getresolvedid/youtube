Anggaran: mulai 46,68 dtk · durasi 15,40 dtk (estimasi, VO belum jadi).
Tiga baris VO = tiga tahap.

**Di sinilah masalahnya lahir.** Dua scene sebelumnya menyiapkan panggung; scene
ini yang membuat penonton peduli — dan seluruh bagian 4 sampai 6 bergantung pada
satu perasaan yang harus benar-benar tumbuh di sini: *itu kalimatku, dan dia
membacanya.*

Nadanya naik dibanding scene 4, **tapi tidak menakutkan.** Arahan user
eksplisit: bukan sosok bertudung, bukan ruang gelap, bukan penjahat yang
dilebih-lebihkan.

1. jaringan yang sama, paket yang sama, masih berjalan. sosok ketiga muncul di
   bawah jalur, di depan layar mejanya — DI LUAR jalur, bukan di atasnya. ia
   menoleh ke layarnya.
   (VO: "Jika data tidak dilindungi dengan baik, pihak yang tidak berhak bisa saja mencoba melihatnya.")

2. kamera merapat pelan ke layar itu sampai layarnya mengisi sebagian besar
   frame. mula-mula yang tampil paketnya; lalu isinya terbuka dan
   "Halo, apa kabar?" terbaca UTUH, besar, jelas. DITAHAN.
   (VO: "Misalnya, pesan yang seharusnya hanya untuk temanmu bisa terbaca oleh pihak lain.")

3. kamera mundur pelan. ketiganya terlihat sekaligus: pengirim di kiri,
   jaringan di tengah, penerima di kanan — dan yang mengamati berdiri di
   antaranya, layarnya masih menampilkan kalimat itu.
   (VO: "Karena itu, kita membutuhkan cara untuk melindungi data.")

motion:
   - sosok ketiga masuk lewat OPASITAS SAJA, tanpa geser. dia tidak boleh
     terbaca sedang datang — dia sudah di situ, cuma baru terlihat
   - merapat tahap 2: `kamera({skala, cx, cy})` dengan titik tumpu di layarnya,
     bukan di tengah panggung. `E.expoOut`, durasi panjang — ini push-in lambat,
     bukan zoom
   - kalimat di layar: `masuk()` opasitas, TANPA geser dan tanpa mengetik ulang
     huruf per huruf. ia sudah ada di sana; yang berubah cuma kita jadi bisa
     melihatnya
   - mundur tahap 3: satu `kamera({skala})` balik ke 1,0 dengan `E.expoOut`,
     dipakai SELURUH grup
   - paketnya TERUS BERJALAN pelan sepanjang tiga tahap. panggung yang benar-
     benar beku di scene sepanjang ini terbaca sebagai gambar diam

catatan:
   - **YANG MENGAMATI MEMAKAI KOMPONEN `Sosok` YANG SAMA dengan pengirim.**
     yang membedakan cuma tempat, ukuran, dan terangnya. bentuk yang berbeda
     terbaca sebagai jenis makhluk yang berbeda — dan begitu ia terbaca sebagai
     "penjahat", scene ini berhenti mengajarkan apa pun.
   - **tidak ada warna bahaya. tidak ada merah.** `--bad` tidak dipakai sama
     sekali di scene ini. yang menaikkan taruhannya kalimat VO dan fakta bahwa
     kalimatnya terbaca — bukan palet.
   - **layarnya `Monitor`, bukan `Hp`**, dan bedanya perlu: dia tidak sedang
     berkirim pesan, dia sedang melihat yang lewat.
   - **kalimat aslinya ditahan lama**, arahan user. ini satu-satunya frame di
     episode yang isinya "kalimatmu, di layar orang lain". kalau ia lewat cepat,
     scene 7 kehilangan bandingannya dan seluruh bagian 5 jadi klaim kosong.
   - **letak yang mengamati di tahap 1 DIPATOK**, dan dipakai lagi di scene 7 di
     koordinat yang sama persis (`X_PENGAMAT` di `../panggung-kiriman.tsx`).
     bergeser sedikit pun, penonton membacanya sebagai orang yang berbeda.
   - **tahap 3 bukan pengulangan tahap 2.** tahap 2 soal APA yang terbaca,
     tahap 3 soal DI MANA dia berdiri — di antara kamu dan temanmu, bukan di
     ujung. kalau keduanya digabung, yang hilang letaknya.
   - **belum ada gembok dan belum ada kotak proses.** keduanya lahir di scene 6,
     dan baris terakhir scene ini justru yang menjanjikannya.
