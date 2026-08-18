Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Tiga baris VO = tiga tahap.

Scene penguat. **Yang baru di sini cuma satu: urutan.** Scene 7 memperlihatkan
yang hilang; scene ini memperlihatkan yang tidak berurutan. Kalau tahap 2 tidak
jelas berantakan, scene ini tidak menambah apa pun.

1. sepuluh kotak bernomor `01`–`10` berbaris rapi di kiri, urut, lalu berangkat
   bersamaan ke kanan.
   (VO: "Bayangkan kamu mengirim sepuluh kotak kepada seseorang.")

2. mereka tiba di kanan dengan urutan BERANTAKAN — `01 04 02 03 07 05 …`.
   barisan tibanya digambar dari kiri ke kanan sesuai urutan kedatangan, bukan
   sesuai nomornya. `06` tidak ada di barisan itu.
   (VO: "Kotak-kotak tersebut mungkin tidak semuanya tiba dalam urutan yang sama.")

3. kotak-kotak itu bergeser ke tempatnya masing-masing sampai urut menaik.
   lubang di posisi `06` tinggal menganga; muncul tanda `SEND 06 AGAIN`, lalu
   `06` masuk ke lubangnya dan barisannya lengkap.
   (VO: "TCP membantu memastikan semua bagian tersebut diperiksa…")

motion:
   - berangkat: `t()` pada x kesepuluhnya bersamaan, durasi berbeda-beda per
     kotak — selisih durasinya yang MENGHASILKAN keberantakan, bukan posisi
     awal yang diacak. dengan begitu tahap 1 tetap rapi dan tahap 2 tetap kacau,
     dan keduanya lahir dari satu tabel angka yang sama
   - susun ulang: `t()` pada x tiap kotak menuju slot nomornya, `E.power2out`,
     `urutan` berselang 0,05 dtk supaya terbaca sebagai penyusunan
   - `06`: `masuk()` dari atas ke slotnya, setelah kesembilan lainnya diam

catatan:
   - **durasi tempuh yang berbeda, bukan posisi awal yang diacak.** kalau
     keberantakan dibuat dengan mengacak titik berangkatnya, tahap 1 tidak
     pernah terlihat rapi — dan justru kontras rapi → kacau → rapi yang jadi
     seluruh isi scene ini.
   - **angkanya tetap, bukan acak.** `Math.random()` dilarang di komposisi;
     tabel `TEMPUH` di berkasnya yang menentukan siapa tiba duluan.
   - **sepuluh, bukan empat.** jumlah yang berbeda dari scene 7 membuatnya
     terbaca sebagai contoh lain, bukan pengulangan adegan yang sama.
   - kalau episode harus dipangkas, **scene ini yang pertama dibuang.**
   - frame terakhir: sepuluh kotak urut rapi. frame pertama `09-tcp-plus-ip`
     membelah layar — jahitan: menganga, dan disengaja: bagian rangkuman memang
     memulai bidang baru.
