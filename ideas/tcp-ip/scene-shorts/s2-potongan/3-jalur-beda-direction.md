Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

Payoff Short 2. Yang mengejutkan bukan bahwa potongan berjalan, tapi bahwa
jalannya berbeda-beda — jadi ketiga jalur wajib terlihat sekaligus di frame.

1. di bawah kelompok potongan muncul SATU baris: `semua ke 192.168.1.10`.
   teks layar: "Tujuannya sama."
   (VO: "Setiap kotak diberi informasi tujuan…")

   > **Dikoreksi 2026-08-18 setelah `npm run tumpang`.** Versi pertama memberi
   > label sendiri ke tiap potongan, dan kelima deret angka itu saling menimpa
   > habis — di 9:16 tidak ada ruang mendatar untuk lima `192.168.1.10`
   > berdampingan. Satu kalimat yang menyebut "semua" juga menyampaikan
   > kesamaannya lebih jelas daripada lima salinan yang tertumpuk.

2. kelimanya berangkat turun dan MENYEBAR ke tiga jalur — 1 dan 4 di jalur
   tengah, 2 dan 5 di jalur kiri, 3 di jalur kanan. kecepatannya berbeda-beda,
   jadi urutan tibanya tidak sama dengan urutan nomornya. teks layar berganti:
   "Jalannya beda-beda."
   (VO: "Kotak-kotak tersebut kemudian dapat melewati jalur yang berbeda…")

motion:
   - label: `masuk()` kelimanya dengan `jeda` 0 — bersamaan, sengaja
   - menyebar: `t()` pada x tiap potongan menuju jalurnya, selesai SEBELUM
     turunnya mulai jauh — supaya lintasannya tidak miring dan ketiga jalur
     terbaca sebagai jalan, bukan sebagai arah
   - turun: `t()` pada y dengan durasi berbeda ANTAR-JALUR (2,6 / 3,1 / 2,8 dtk).
     selisihnya yang menghasilkan urutan tiba yang berantakan.
     **yang sejalur wajib punya durasi yang SAMA dan titik berangkat yang
     berbeda** — dikoreksi 2026-08-18 setelah `npm run tumpang`: dua potongan
     sejalur dengan kecepatan berbeda merapat sampai berimpit di ujung
     perjalanan, cacat yang sama persis dengan scene 6 video panjang
   - jarak tempuhnya SAMA untuk kelimanya, bukan titik tujuannya
   - simpul: `nyalaSimpul()` mengikuti potongan TERDEPAN

catatan:
   - **kelimanya wajib menyebar, bukan beriringan.** lima potongan di satu jalur
     terbaca sebagai antrean — dan antrean adalah kebalikan dari isi scene ini.
   - **label tujuannya sama dan masuk bersamaan.** kesamaannya yang jadi isi
     beat 0; label yang datang satu-satu menonjolkan bedanya.
   - **nomornya tidak diperkenalkan ulang** — sudah ada sejak scene 2.
   - frame terakhir: kelima potongan di ketinggian yang berbeda-beda, masih
     turun. frame pertama `4-disusun` melanjutkan dari sebaran itu.
