Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Satu baris VO = satu tahap.

1. potongan `3` masuk dari tepi ATAS frame — nomor sama, bentuk sama, warnanya
   saja yang beda sebagai penanda kiriman kedua. ia turun menyusuri jalur, lalu
   bergeser ke slot ketiga dan MASUK. slot merahnya berubah jadi kotak penuh
   hijau. keempat slot lain TIDAK bergerak sama sekali.

   sesudah lengkap, kelima slot berdenyut sekali bersamaan.
   teks layar: "Lengkap."
   (VO: "Setelah bagian yang hilang diterima, data dapat disusun kembali.")

motion:
   - turun: `t()` pada y dari −160 ke `Y_SLOT`, `E.power1out`, durasi 1,6
   - geser ke slot: `t()` pada x, selesai di seperempat terakhir turunnya
   - slot berganti: opacity silang putus-putus → penuh, 0,25 dtk
   - denyut: `tPP()` pada skala kelima potongan, satu kali, 0,7 dtk

catatan:
   - **potongan yang kembali adalah potongan YANG SAMA.** nomor sama, bentuk
     sama. kalau ia digambar beda, yang terbaca kiriman pengganti — dan itu
     keliru: yang dikirim ulang persis bagian yang sama.
   - **lubangnya yang menutup, bukan barisan yang dibangun ulang.** keempat slot
     lain diam total; satu-satunya yang berubah di layar adalah lubang itu
     terisi. barisan yang seluruhnya bergerak mengaburkan apa yang diperbaiki.
   - frame terakhir: lima slot terisi, semuanya hijau, diam. frame pertama
     `6-namanya` memakai barisan itu apa adanya.
