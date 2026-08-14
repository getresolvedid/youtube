Anggaran: mulai 3,93 dtk · durasi 4,81 dtk (estimasi, VO belum jadi).
Dua beat. Frame pertamanya = frame terakhir scene 1: bilah alamat, nama, dan
penanda di posisi yang sama persis. Potongannya keras, dan hanya terbaca
disengaja kalau tidak ada satu benda pun yang bergeser.

1. arah bacamu sendiri (beat 0):
   - garis tebal tergambar di bawah nama, dari KIRI ke kanan, sepanjang namanya
   - penanda scene 1 memudar keluar selagi garis itu jalan
   (VO: "Kamu membacanya dari kiri.")

2. arah yang sebenarnya (beat 1):
   - garis yang sama DIHAPUS balik dari kanan ke kiri — ujung kanannya ditarik
     mundur, bukan garis baru yang digambar ke arah lain
   - penanda masuk lagi dari kanan mengikuti ujung yang menyusut
   (VO: "Yang mengantarmu ke sana membacanya terbalik.")

teks di layar:
   beat 0 → "Kamu membacanya dari kiri."
   beat 1 → "Yang mengantarmu, terbalik."
   Bergantinya keras, tanpa fade silang — teks yang menyilang di 9:16 terbaca
   sebagai dua kalimat yang saling menumpuk.

catatan komposisi:
   - **dua arah TIDAK BOLEH muncul bersamaan.** Kalimatnya perbandingan
     berurutan; dua garis yang jalan bareng membuat penonton membandingkan
     panjang, bukan arah.
   - menghapus balik, bukan menggambar garis kedua. Garis kedua akan terbaca
     sebagai dua hal yang berbeda; garis yang sama ditarik mundur terbaca sebagai
     hal yang sama, dibaca terbalik — dan itu persis kalimatnya.
   - bilah alamat masih ada. Ia baru menghilang di scene 3, saat namanya dipecah.
   - jangan menyorot potongan mana pun.

motion:
   - garis maju: `gambarGaris`-style tween 0→1, `power2out`, 0,9 dtk, mulai
     beat 0 + 0,15
   - penanda keluar: opacity 1→0, 0,3 dtk, mulai beat 0
   - garis mundur: tween 0→1, `power2in`, 0,8 dtk, mulai beat 1 + 0,1
   - penanda masuk lagi: mengikuti ujung kanan garis, opacity 0→1 dalam 0,25 dtk
