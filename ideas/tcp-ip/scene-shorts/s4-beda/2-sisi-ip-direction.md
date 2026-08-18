Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

Sisi pertama pembandingnya. Nama `IP` dari scene 1 tinggal di layar; yang datang
di sini buktinya.

1. nama `TCP` memudar keluar; nama `IP` bergeser ke tengah atas dan tinggal.
   di bawahnya muncul satu potongan di titik percabangan, dengan tiga tujuan
   berjajar di bawahnya — `A`, `B`, `C`. teks layar: "IP: ke mana?"
   (VO: "Bayangkan kamu mengirim sebuah paket.")

2. tujuan `B` menyala; jalur ke sana menyala. potongan menempuhnya dan sampai.
   dua tujuan lain TETAP terlihat, tetap redup.
   (VO: "IP membantu menentukan alamat dan ke mana paket tersebut harus pergi.")

motion:
   - `TCP` keluar: `t()` pada opacity → 0 sambil x bergerak keluar kiri
   - `IP` ke tengah: `t()` pada x menuju W/2
   - tujuan menyala: `t()` pada opacity kotak `B` dan garis ke sana
   - potongan menempuh: `t()` pada x dan y menuju `B`, `E.power1out`

catatan:
   - **dua tujuan yang tidak dipilih tetap terlihat.** kalau keduanya hilang,
     yang terbaca "cuma ada satu jalan" dan memilih berhenti jadi memilih. ini
     kesalahan yang sama yang sudah diperbaiki di scene 9 video panjang dan
     dijaga di Short 1 scene 4.
   - **gerakannya sengaja daur ulang** dari Short 1 scene 4. penonton Short 4
     mungkin belum menonton Short 1, tapi yang sudah akan mengenalinya — dan
     keduanya menunjuk hal yang sama.
   - frame terakhir: potongan di tujuan `B`, nama `IP` di atas. frame pertama
     `3-sisi-tcp` menukar namanya dan mengganti isi bawahnya.
