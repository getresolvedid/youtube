Anggaran: mulai 319,25 dtk · durasi 28,63 dtk (estimasi, VO belum jadi).
Sembilan baris VO = sembilan tahap.

Bagian 7 [case] dibuka dengan memulangkan panggung ke gedung tunggal — kamera
maju lagi dari komplek di scene 13 ke satu gedung, satu penjaga, seperti scene 6
sampai 12.

Tugasnya satu: memperlihatkan bahwa membuka satu pintu untuk satu orang itu tidak
mungkin.

1. kembali ke satu gedung, satu penjaga, pintu-pintu di tempatnya. panggung yang
   sama persis dengan scene 12.
   (VO: "Dan penjaga yang mana pun tetap menuruti satu orang.")

2. penjaganya menoleh KELUAR FRAME, ke arah penonton. yang menentukan daftarnya
   tidak digambar sama sekali.
   (VO: "Kamu.")

3. sebuah kamera kecil menyala di dalam gedung, terlihat lewat salah satu pintu.
   (VO: "Kamera rumah, biar bisa dilihat dari kantor.")

4. sosok di gedung seberang, jauh di kiri, berdiri menunggu satu pintu terbuka.
   sosok biasa, tanpa topi penjaga.
   (VO: "Atau satu pintu dibuka biar teman bisa ikut main.")

5. satu baris baru ditulis di daftar penjaga. pintu `I_PINTU_DIBUKA` menyala
   terbuka, dan bukaannya tinggal terbuka.
   (VO: "Kamu tunjuk pintunya, dan tamunya diantar ke sana.")

6. tamu yang dimaksud lewat pintu itu ke dalam. semuanya berjalan persis seperti
   yang diinginkan, tidak ada yang salah di layar.
   (VO: "Penjaganya menurut. Itu memang yang kamu tulis di daftarnya.")

7. kamera mundur sedikit. pintu yang sama sekarang terlihat dari SELURUH arah
   luar, bukan cuma dari arah tamunya datang.
   (VO: "Tapi pintu itu sekarang terbuka buat semua orang.")

8. ketukan mulai berdatangan ke pintu itu saja, dari segala ketinggian.
   (VO: "Bukan cuma buat temanmu.")

9. rapatnya jauh melebihi pintu mana pun sebelumnya di episode ini, dan tidak ada
   satu pun yang berhenti.
   (VO: "Dan yang paling rajin mengetuk di situ bukan temanmu.")

motion:
   - kamera maju: `kamera({skala})` 0,52 -> 1,0, kebalikan persis dari scene 13
   - menoleh keluar frame: rotasi kecil pada grup kepala + `hadap` tetap
   - baris baru di daftar: `gambarGaris()` seperti tahap 5 scene 7 — tangan yang
     sama menulis, cuma di benda yang berbeda
   - pintu terbuka: `buka` 0 -> 1 pada `Pintu`, `E.power2out`, dan TIDAK pernah
     ditutup lagi sampai akhir scene
   - ketukan tahap 8 dan 9: kerapatan naik lewat jumlah tween yang lebih banyak
     dengan tundaan yang MENGECIL — tundaannya tetap konstanta, bukan acak

catatan:
   - **pintu yang dibuka adalah salah satu dari `PINTU_HIDUP`, bukan pintu baru.**
     yang berubah di bagian 7 adalah siapa yang boleh mengetuknya, bukan jumlah
     pintunya. pintu yang muncul dari ketiadaan akan terbaca sebagai lubang baru
     yang dibuat, dan itu hal yang berbeda.
   - **tahap 7 sampai 9 TIDAK menggambarkan kebobolan.** tidak ada yang jebol dan
     tidak ada tanda bahaya. yang berubah cuma siapa saja yang sekarang boleh
     mencoba — menggambar kebobolan mengubah scene ini jadi ancaman, dan ancaman
     membuat orang menutup video, bukan memeriksa daftarnya.
   - **sosok di tahap 4 tanpa topi.** ia bukan penjaga, dan bedanya harus terlihat
     sekilas — itu sebabnya topi beraksen dipatok sejak scene 6.
   - tidak ada merek dan tidak ada satu pun angka di layar.
