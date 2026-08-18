# 04-lewat-internet · rencana VO

Bagian 3 [problem]. Yang harus berubah di kepala penonton: pesannya **tidak
melompat**. Ia menempuh jalan, dan jalan itu punya banyak tempat singgah yang
bukan milik pengirim maupun penerima.

Belum ada ancaman di sini. Scene ini cuma menyiapkan panggungnya — dan
panggung yang sama persis dipakai lagi di `07-terkunci-di-jalan`.

## VO

Pesan tersebut diubah menjadi data, lalu dikirim melalui jaringan internet.
Data ini dapat melewati beberapa perangkat dan jaringan sebelum mencapai tujuan.
Dan di sinilah muncul pertanyaan penting.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Jaringannya tersingkap: mula-mula tiga simpul, lalu makin banyak, lalu simpul-simpul jauh muncul di latar. Paket masuk dari kiri. |
| 1 | Paket menyusuri simpul satu per satu. Tiap simpul menyala sebentar saat dilewati, lalu redup lagi. |
| 2 | HP penerima muncul di ujung kanan. Kamera melambat, paket mendekat, lalu berhenti — dan pertanyaannya mendarat di layar. |

## Catatan

- **Tiga baris, bukan empat.** Arahan user menaruh satu jeda hening ~0,5 detik
  sebelum teks pertanyaannya muncul, **tanpa narasi**. Rencana VO tidak punya
  cara menuliskan hening: satu baris kosong bukan beat. Jedanya dibayar dari
  `VO_PAD_SECONDS` di ekor scene, dan teks pertanyaannya dijatuhkan di ekor beat
  2 di `.tsx`-nya — bukan sebagai beat sendiri.
- **Teks di layar beat 2 BERBEDA dari kalimat VO**, dan itu arahan user:
  narasi berbunyi *"Dan di sinilah muncul pertanyaan penting"*, layar menulis
  *"Bagaimana jika data itu dilihat oleh orang lain?"*. Di sini keduanya tidak
  bertabrakan — kalimat VO-nya justru **memperkenalkan** teksnya, jadi penonton
  membaca yang satu tepat setelah mendengar yang lain. Bentuk ini yang seharusnya
  dipakai juga di `01-pesan-dikirim`, tempat keduanya masih jatuh bersamaan.
- **Kata "data" muncul dua kali di baris pertama dan kedua, dan itu masalah
  yang belum diputuskan.** Ia ada di daftar larangan kosakata L1
  ([docs/09](../../../docs/09-tangga-abstraksi.md)): kata teknis yang menyamar
  jadi kata sehari-hari karena kita mengucapkannya tiap hari — padahal orang yang
  tidak menulis kode tidak bisa menggambarnya. Begitu juga "perangkat" dan
  "jaringan internet". Usulan, kalau mau: *"Pesannya keluar dari HP-mu, dan mulai
  berjalan. Ia lewat banyak tempat dulu sebelum sampai."* **Belum diubah** —
  kalimatnya keputusan user, dan kata "data" muncul di tujuh scene, jadi
  mengubahnya di sini saja justru bikin tidak konsisten.
