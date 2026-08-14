Anggaran: mulai 278,63 dtk · durasi 43,69 dtk (estimasi, VO belum jadi).
Dua belas baris VO = dua belas tahap. Scene terakhir yang bicara.

Frame pertamanya = frame terakhir `11-amplop-vs-segel`: dua ikon yang sudah redup
di atas, satu jalur di garis 900, dan kartu pertanyaan yang berhenti di titik
kosong tepat di `TANGGA.x0`. **Loket terdekat tumbuh dari titik itu** — jalur dan
kartunya tidak bergerak sama sekali saat potongan keras jatuh, dan itu satu-satunya
alasan mundurnya kamera di tahap 1 terbaca sebagai mundur, bukan sebagai layar
baru. Panggungnya sama dengan scene 6 dan 7, `../panggung-loket.tsx`
(`TANGGA`, `posLoket(i)`).

**Bukan rangkuman.** Tidak ada daftar poin, tidak ada "tadi kita sudah belajar".
Yang terjadi di sini satu keputusan nyata, dibedah.

1. jalur dan kartu dari scene lalu masih di sana, tidak bergerak. loket terdekat
   TUMBUH dari titik tempat kartu berhenti — di situ, bukan di tempat lain — dan
   kartunya masuk ke jendelanya. lalu kamera mundur dan sisa tangganya muncul,
   seluruhnya, dari jauh; jalurnya memudar bersamaan.
   ini kali terakhir tangganya terlihat penuh.
   (VO: "Sekarang mundur sedikit, dan lihat tangganya utuh lagi.")

2. loket TERBAWAH — yang paling dekat penonton — menyala. sisa tangga meredup
   sampai tinggal siluet.
   (VO: "Dari semua loket itu, ada satu yang bisa kamu ganti sendiri.")

3. label kecil mendarat di bawah loket itu: yang bertanya untukmu.
   garis pendek menghubungkannya ke siluet komputer di kiri bawah — siluet yang
   sama dari scene 3 dan 4.
   (VO: "Yang paling dekat denganmu. Yang selama ini bertanya untukmu.")

4. loket itu ditukar: yang lama keluar ke kiri, yang baru masuk dari kanan.
   di atasnya muncul kalimat "lebih kencang", ditulis seperti kutipan.
   (VO: "Orang menggantinya, lalu bilang internetnya jadi lebih kencang.")

5. bilah waktu MENDATAR tergambar melintang di bawah frame — seluruh lebar layar
   adalah waktu memuat satu halaman. potongan paling kiri, sangat pendek,
   disorot: itu bagian bertanya nama.
   (VO: "Yang berubah sebenarnya cuma satu. Waktu bertanya nama, sekali, di awal.")

6. sisa bilah di kanan menyala dengan warna yang SAMA PERSIS seperti sebelum
   penukaran. tidak ada satu piksel pun yang berubah di sana.
   perbandingan panjangnya itulah buktinya.
   (VO: "Setelah nomornya ketemu, jalurnya sama persis seperti sebelumnya.")

7. kalimat "lebih kencang" di atas DICORET.
   (VO: "Yang benar-benar berubah biasanya hal lain.")

8. satu nama muncul di sisi lain. di loket lama ia dijawab dengan tanda silang;
   di loket baru, nama yang sama dijawab dengan nomor.
   tidak ada penjelasan siapa yang membuatnya begitu.
   (VO: "Situs yang tadinya dijawab salah, sekarang dijawab benar.")

9. kata "terbuka" mendarat besar; kata "kencang" yang tercoret melayang keluar
   frame.
   (VO: "Itu terbuka. Bukan kencang.")

10. papan catatan muncul di sebelah loket BARU — bentuk, ukuran, dan posisi
    SAMA PERSIS dengan papan sosok di tepi jalur di scene 10.
    barisnya terisi satu per satu.
    (VO: "Dan loket barunya tetap melihat semua yang kamu tanyakan.")

11. semua figur padam. yang tersisa satu loket sendirian di tengah, dan satu
    pertanyaan masuk lewat jendelanya.
    (VO: "Sebelum kamu sampai ke mana pun, ada yang ditanya dulu.")

12. kalimat bawa-pulang mendarat di bawah loket. dua baris, tenang.
    lalu potong keras ke tanda brand — tanpa fade, tanpa jeda tambahan.
    (VO: "Ganti loketnya boleh. Yang berubah cuma siapa yang menjawab.")

motion:
   - ikon menyusut & tangga kembali: satu `p` untuk keduanya, `E.expoOut`
   - loket terbawah menyala: opasitas sisa tangga -> 0,22 lewat satu `t()`
   - penukaran loket: keluar `E.power2in`, masuk `E.expoOut`, tumpang tindih
     0,2 dtk — sama dengan pergantian kartu di scene 6 dan 9
   - bilah waktu: `gambarGaris()` kiri ke kanan, lalu potongan pertama diberi
     `scaleX` sorot dari `transformOrigin: left`
   - coretan: `gambarGaris()`, 0,3 dtk, sama seperti coretan di scene 8
   - papan terisi: jumlah baris = `Math.floor(t(...))` — sama persis dengan
     papan di scene 10, komponen yang SAMA dipanggil ulang
   - padam tahap 11: satu `t()` opasitas untuk seluruh grup, bukan per elemen
   - kalimat bawa-pulang: `masuk()` geser 22, `jeda` 0,1 antar baris
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **tahap 10 adalah tahap yang paling penting dan paling gampang hilang saat
     memotong durasi.** tanpa dia, episode berakhir dengan saran terselubung
     untuk mengganti loket — padahal yang barusan dijelaskan justru bahwa loket
     melihat semua yang ditanyakan. papannya WAJIB komponen yang sama dengan
     scene 10, bukan yang mirip: kesamaan itu yang membuatnya mendarat tanpa
     perlu dijelaskan lagi.
   - **bilah waktu di tahap 5 tanpa angka.** yang membuktikan klaimnya adalah
     panjang relatif, bukan bilangan — dan panjang relatif tidak butuh sumber.
     kalau pengukuran di `naskah.md § Sumber` nanti jadi, angka boleh masuk ke
     LAYAR di tahap ini; jangan pernah masuk ke VO.
   - **tahap 8 tidak menyebut siapa yang memblokir, dan tidak menggambarkannya.**
     tidak ada lambang, tidak ada seragam, tidak ada bendera. yang digambar cuma
     dua jawaban berbeda untuk nama yang sama. begitu scene ini menyebut lembaga,
     ia jadi video lain yang tidak bisa ditonton dua tahun lagi.
   - **tanda silang di tahap 8 adalah satu-satunya tanda status di scene ini.**
     jangan menambahkan hijau di jawaban yang benar — yang benar itu nomor, dan
     nomor sudah punya arti sendiri sejak scene 3.
   - kalimat bawa-pulang diambil apa adanya dari `naskah.md § Satu kalimat
     bawa-pulang`. kalau ia berubah di sini, ubah di naskah dulu.
   - tidak ada ajakan subscribe di scene ini. itu milik tanda brand penutup
     ([docs/02](../../../docs/02-format-video.md)).
