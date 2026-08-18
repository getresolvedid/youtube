Anggaran: mulai 46,11 dtk · durasi 22,90 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Panggung sama persis dengan scene 3, kamera kembali ke skala 1: gedung utuh,
tiga pintu menyala, lima tergembok. Yang bertambah cuma penghuninya.

Tugasnya menetapkan **siapa** yang mengetuk, dan jawabannya digambar: satu
`Peretas` berdiri di tepi kiri, di titik lahirnya ketukan, sejak baris pertama
sampai penanda nomor mulai menyusuri pintu.

**Ini pembalikan keputusan yang berdiri sampai revisi ini, dan pembalikannya
disengaja.** Versi sebelumnya sengaja tidak menggambar pengetuknya sama sekali —
yang terlihat cuma gelombangnya, supaya masalahnya terasa "bukan siapa-siapa"
dan bukan "penjahat", karena penjahat memindahkan masalahnya jadi masalah orang
lain. Yang membuatnya dibalik: tanpa siapa pun di belakangnya, gelombang itu
terbaca sebagai cuaca — sesuatu yang memang begitu adanya — dan cuaca tidak
membuat orang memeriksa pintunya.

Yang menahan efek samping lamanya ada tiga, dan ketiganya mengikat:

- **ia tidak bergerak dan tidak pernah mendekat.** yang bekerja di scene ini
  kerapatan ketukannya; figur yang ikut berjalan maju merebut perhatian dari
  satu-satunya hal yang perlu terbaca — bahwa ketukannya tidak berhenti.
- **tanpa warna bahaya.** `warna` yang sama dengan figur lain di panggung
  (docs/03 § Figur manusia). merah di figur ini mengubah scene jadi peringatan.
- **ketukannya tetap seragam.** semua digambar identik, dan keseragaman itu yang
  masih membawa "siapa pun, tanpa perlu tahu namamu" di tahap 4 dan 5.

1. satu ketukan masuk dari tepi kiri di ketinggian `JALUR_Y`, mendarat di salah
   satu pintu yang menyala. pelan, jelas, satu-satunya yang bergerak.
   (VO: "Masalahnya, pintu yang bisa diketuk bisa diketuk siapa saja.")

2. ketukan kedua masuk dari ketinggian yang sama sekali berbeda, jauh di atas.
   (VO: "Bukan cuma orang yang kamu tunggu.")

3. ketukan mulai berdatangan dari banyak ketinggian, mendarat di pintu-pintu
   yang berbeda, termasuk yang tergembok.
   (VO: "Siapa pun, dari mana pun, boleh datang dan mencoba.")

4. semua ketukan digambar identik: bentuk sama, warna sama, ukuran sama. tidak
   ada satu pun yang bertanda.
   (VO: "Tidak perlu tahu namamu.")

5. tidak ada satu pun garis atau panah yang menghubungkan ketukan ke gedung ini
   secara khusus — mereka menyentuhnya karena kebetulan ada di situ.
   (VO: "Tidak perlu punya urusan denganmu.")

6. satu penanda berjalan CEPAT menyusuri nomor pintu, dari pintu satu ke pintu
   delapan, berhenti sepersekian detik di tiap nomor.
   (VO: "Mereka cuma menyusuri nomor pintu sampai ada yang membuka.")

7. kamera masuk ke dalam gedung lewat salah satu pintu yang menyala: di dalam
   sunyi, dan layar di dalam tetap tenang seperti frame pertama episode.
   (VO: "Dan itu berjalan sepanjang malam, tanpa terdengar dari dalam.")

motion:
   - ketukan: `t()` pada x, `E.power1out`, tiap ketukan `mulai`-nya diturunkan
     dari beat + kelipatan tetap. DILARANG `Math.random()` — nilai yang berbeda
     tiap render akan pecah saat render paralel
   - ketinggian ketukan: deret tetap yang ditulis sebagai konstanta di scene,
     bukan hasil hitungan acak
   - penanda nomor: satu `t()` linear atas urutan pintu, `E.linear`, cepat
   - masuk ke dalam: `kamera({x: pintu, skala})` 1,0 -> 2,4 dengan `E.expoOut`,
     lalu isi layar tenang menyala di baliknya

catatan:
   - **pengetuknya punya tudung, tapi tetap tanpa wajah dan tanpa warna bahaya.**
     `Peretas` adalah siluet tanpa mata dan tanpa mulut — dua lensanya bagian
     bentuk yang membuatnya dikenali, bukan ekspresi. begitu ia punya wajah,
     penonton mulai membaca perasaannya dan ia jadi tokoh; begitu ia merah,
     scene ini jadi peringatan.
   - **satu ketukan berangkat dari dalam siluetnya** selama kurang dari sedetik,
     dan itu ditandai `data-tumpang="sengaja"` di berkas scene-nya. di situlah
     ia terbaca sebagai ketukan ORANG ITU dan bukan gelombang yang kebetulan
     lewat — jadi tumpangnya isi, bukan cacat.
   - **ketukan juga mendarat di pintu yang TERGEMBOK**, dan itu penting: yang
     mengetuk tidak tahu mana yang terkunci sebelum mencoba. ini yang membuat
     `10-diam` nanti masuk akal.
   - **nol angka.** berapa ketukan per malam adalah angka paling menggoda di
     episode ini dan sumbernya belum ada. yang dipakai gambarnya: banyak, terus,
     tanpa dihitung.
   - tahap 7 memulangkan penonton ke frame scene 1 dengan sengaja. ketenangan di
     dalam itu yang dibayar di scene 5.
