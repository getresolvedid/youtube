Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Empat baris VO = empat tahap.

Scene inti pertama. Tugasnya menanam dua hal yang dipakai scene 7: **potongan
itu bernomor**, dan **jalurnya tidak sama**.

1. satu pesan utuh di tengah, satu bidang panjang berisi tulisan
   `HELLO FROM COMPUTER A`. besar, tunggal, dan diam.
   (VO: "Tapi data yang dikirim melalui jaringan tidak selalu…")

2. bidang itu TERBELAH jadi empat potongan bernomor `01` `02` `03` `04`, yang
   melebar berjarak. bidang aslinya HABIS — tidak ada sisa di belakangnya.
   (VO: "Data dapat dipecah menjadi bagian-bagian kecil…")

3. di bawah tiap potongan muncul label tujuan yang SAMA untuk keempatnya:
   `192.168.1.10`. keempat label masuk bersamaan, bukan berurutan — kesamaannya
   yang jadi isinya.
   (VO: "Setiap paket membawa informasi penting…")

4. keempatnya berangkat ke kanan lewat jalur yang BERBEDA — 01 dan 04 di jalur
   tengah, 02 di jalur atas, 03 di jalur bawah. kecepatannya sedikit berbeda.
   semuanya menuju satu komputer di kanan.
   (VO: "Paket-paket tersebut kemudian bergerak melalui jaringan…")

motion:
   - belah: `t()` pada x tiap potongan dari 0 ke posisi akhirnya, `E.power2out`,
     bersamaan — bukan berurutan. pembelahan itu satu tindakan
   - bidang asli: opacity → 0 di 0,25 dtk pertama pembelahan. ia harus HABIS
   - label tujuan: `masuk()` keempatnya dengan `urutan` 0 dan `jeda` 0 —
     bersamaan, sengaja
   - berangkat: `t()` pada x tiap potongan dengan durasi berbeda 2,0 / 2,4 /
     2,2 / 1,9 dtk. selisihnya kecil, cukup untuk terbaca "tidak seragam"
   - naik/turun ke jalurnya: `t()` pada y, selesai sebelum x-nya mulai jauh

catatan:
   - **pembelahan, bukan penggandaan.** kalau bidang asli masih tinggal di layar
     saat potongannya muncul, yang terbaca "disalin" — dan itu keliru.
   - **nomornya wajib terbaca satu per satu.** seluruh scene 7 bergantung pada
     penonton sudah hafal ada nomor 01 sampai 04. jangan percepat tahap 2.
   - **jalurnya tidak digambar baru di sini.** `JALUR_Y` sudah ada sejak scene 1
     justru supaya tahap 4 tidak perlu memperkenalkan apa pun.
   - **02 sengaja ditaruh di jalur ATAS.** ia yang hilang di scene 7, dan jalur
     yang berbeda dari mayoritas membuat kehilangannya terbaca sebagai akibat
     perjalanan, bukan sebagai kebetulan.
   - frame terakhir: keempat potongan di tengah perjalanan. frame pertama
     `07-peran-tcp` melanjutkan dari posisi itu — sambungan ini KETAT, jangan
     memindahkan komputernya.
