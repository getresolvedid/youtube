Anggaran: mulai 202,49 dtk · durasi 30,40 dtk (estimasi, VO belum jadi).
Sepuluh baris VO = sepuluh tahap.

Satu-satunya scene di episode ini yang membelah frame. Alasannya: dua cara
menolak hanya berarti kalau dibandingkan, dan membandingkan dua hal yang tampil
berurutan menuntut penonton mengingat yang pertama.

Kiri dan kanan memakai panggung yang sama persis — penjaga, pintu, jalur ketukan
— dengan satu garis tegak tipis di tengah frame.

1. frame terbelah dua. panggung dan penjaga yang sama berdiri di kiri dan di
   kanan, ukurannya sama, posisinya cermin.
   (VO: "Padahal memilih itu bisa dilakukan dengan dua cara.")

2. sisi kiri menyala. ketukan datang, penjaganya bergerak menjawab.
   (VO: "Yang pertama, dia menjawab.")

3. jawabannya terkirim balik ke arah pengetuk: satu tanda kecil yang bergerak
   dari penjaga ke kiri.
   (VO: "Maaf, tidak boleh.")

4. pengetuk di kiri berbalik pergi. rapi, cepat, tidak ada yang terlihat salah.
   (VO: "Terdengar sopan, dan kelihatannya beres.")

5. sesuatu ikut pulang bersamanya: satu benda kecil di tangannya, yang tadi tidak
   ada.
   (VO: "Tapi yang mengetuk pulang membawa satu hal.")

6. benda itu terbaca sebagai peta. satu titik terisi di dalamnya, tepat di posisi
   pintu yang barusan menjawab.
   (VO: "Sekarang dia tahu pintunya ada, dan ada yang menjaganya.")

7. sisi kanan menyala. ketukan datang, dan TIDAK ada apa pun yang dikirim balik.
   penjaganya tidak bergerak sedikit pun.
   (VO: "Cara kedua, dia tidak menjawab apa pun.")

8. ketukan itu memudar di udara tepat di depan pintu, tanpa mengenai apa pun
   yang menjawab.
   (VO: "Ketukannya jatuh ke ruang kosong.")

9. pengetuk di kanan mengulang, menunggu, mengulang lagi, menunggu lebih lama,
   lalu memudar.
   (VO: "Yang di luar cuma bisa berdiri, mengulang, lalu menyerah.")

10. dua peta disandingkan di bawah masing-masing sisi: yang kiri punya satu titik
    terisi, yang kanan kosong seluruhnya.
    (VO: "Dan dia pulang tanpa tahu ada apa di balik dinding itu.")

motion:
   - belah frame: satu path tegak `gambarGaris()` di tengah, tipis, `--line`
   - sisi yang tidak aktif diredupkan ke 0,3 — tidak dihapus, karena
     perbandingannya hilang kalau salah satu sisi kosong
   - jawaban terkirim: `t()` x dari penjaga ke kiri, `E.power2out`, cepat
   - peta muncul: `masuk()` geser 16 di tangan pengetuk
   - mengulang di tahap 9: TIGA tween terpisah dengan jarak yang MELEBAR
     (0,45 lalu 0,7 lalu 1,1 dtk) — melebarnya itu yang membuat "menunggu"
     terbaca tanpa satu kata pun
   - dua peta di tahap 10: `masuk()` bersamaan, tanpa stagger — mereka harus
     dibandingkan, bukan dibaca berurutan

catatan:
   - **yang menang di scene ini PENGETUK, bukan penjaga.** karena itu tahap 5 dan
     6 mengikuti tangannya pulang, bukan mengikuti penjaganya bekerja. ini yang
     paling mudah hilang saat menggarapnya.
   - **peta tidak pernah dinamai, di VO maupun di layar.** bendanya cukup
     dilihat.
   - **penjaga kanan tidak boleh bergerak sedikit pun di tahap 7.** diam yang
     digambar sebagai gerakan kecil apa pun berubah jadi "mengabaikan", dan
     mengabaikan masih berarti ada yang di sana.
   - **nol angka.** berapa lama yang di luar menunggu sebelum menyerah butuh
     sumber (`naskah.md § Sumber`). yang dipakai jarak antar pengulangan yang
     melebar.
   - insight scene ini dipakai lagi sebagai seluruh isi Short 1 (fase 3). yang
     boleh diwarisi ke sana cuma komponen visualnya, tidak pernah urutan beat-nya
     ([docs/02 § Aturan Shorts](../../../docs/02-format-video.md)).
