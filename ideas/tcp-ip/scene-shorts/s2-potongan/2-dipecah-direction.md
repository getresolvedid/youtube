Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Tiga baris VO = tiga tahap.

Scene yang membayar hook: yang tadi tidak muat sekarang muat.

1. bidang besar dari scene 1 TERBELAH jadi lima potongan bernomor `1`–`5`,
   melebar berjarak. bidang aslinya HABIS — tidak ada sisa di belakangnya.
   teks layar: "Dipecah kecil-kecil."
   (VO: "Data dapat dipecah menjadi bagian-bagian kecil…")

2. kelimanya menyusut dan merapat ke tengah, sampai lebar barisannya jelas lebih
   sempit daripada mulut jalur. dua tiang mulut jalur tetap di tempat yang sama
   persis — yang berubah bendanya, bukan lubangnya.
   (VO: "Bayangkan kamu ingin mengirim sebuah buku yang sangat tebal.")

3. kelimanya berbaris rapi tepat di atas mulut jalur, diam, menunggu giliran.
   (VO: "Daripada mengirim seluruh buku sebagai satu paket besar…")

motion:
   - belah: `t()` pada x tiap potongan dari 0 ke posisinya, BERSAMAAN — satu
     tindakan, bukan lima
   - bidang asli: opacity → 0 di 0,25 dtk pertama pembelahan
   - menyusut: `t()` pada skala 1 → 0,62 dan pada jarak antar-potongan
   - berbaris: `t()` pada y, sedikit saja, `E.backOut(1.1)` supaya mendarat

catatan:
   - **bidang aslinya wajib HABIS.** kalau ia masih tinggal saat potongannya
     muncul, yang terbaca "disalin" — dan itu keliru.
   - **mulut jalurnya TIDAK boleh melebar.** seluruh isi scene ini adalah
     bendanya yang mengecil; lubang yang ikut membesar membatalkan hook-nya.
   - frame terakhir: lima potongan berbaris di atas mulut jalur. frame pertama
     `3-jalur-beda` melanjutkan dari barisan itu.
