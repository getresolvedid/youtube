Anggaran: mulai 35,94 dtk · durasi 2,16 dtk (estimasi, VO belum jadi).
Satu beat, dan **scene terpendek Short ini**. Empat kata, dan inilah kalimat yang
dibawa pulang penonton.

Frame pertamanya = frame terakhir scene 6, dikurangi dua kartu hasilnya: lantai,
loket baru, sosok, dan tujuan tetap di piksel yang sama, cuma diredupkan.

1. dua kata, dua kata:
   - "terbuka" mendarat besar dan beraksen di tengah layar
   - "kencang" muncul di bawahnya dalam ukuran yang sama, lalu **dicoret dengan
     coretan yang sama persis seperti scene 2** dan memudar keluar
   (VO: "Itu terbuka. Bukan kencang.")

teks di layar:
   kedua kata besar ITU teksnya. Tidak ada kalimat tambahan di pita atas —
   scene 2,16 detik tidak punya ruang untuk dua tempat baca.

catatan komposisi:
   - **coretan pada "kencang" adalah coretan yang sama dari scene 2**, bentuk dan
     sudutnya sama persis (`SUDUT_CORET` di `../jalur-tanya.tsx`). Itu yang
     membuatnya terbaca sebagai janji yang ditagih, bukan sebagai coretan baru
     yang kebetulan mirip.
   - **kedua kata berukuran sama.** Kalau "terbuka" digambar lebih besar,
     perbandingannya berubah jadi penekanan, dan kalimatnya berhenti jadi
     koreksi.
   - lantai dan bendanya **diredupkan, bukan dihapus**. Menghapusnya membuat
     scene 8 harus mendirikan panggungnya lagi, dan itu undangan kedua yang
     dilarang HARD RULE 6.
   - **tidak ada kata "diblokir" dan tidak ada kata "bebas".** Yang pertama
     menyeret ke soal siapa; yang kedua menjanjikan lebih dari yang benar — dan
     scene 8 justru membatasinya.

motion:
   - "terbuka": `masuk()` geser 30px, 0,4 dtk, mulai 0,1 dtk
   - "kencang": opacity 0→1, 0,3 dtk, mulai 0,55 dtk
   - coret: tween 0→1, `power3out`, 0,28 dtk, mulai 0,95 dtk
   - "kencang" + coretnya memudar keluar: opacity 1→0, 0,35 dtk, mulai 1,55 dtk
