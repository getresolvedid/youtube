Anggaran: mulai 46,11 dtk · durasi 22,90 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Panggung sama persis dengan scene 3, kamera kembali ke skala 1: gedung utuh,
tiga pintu menyala, lima tergembok. Yang bertambah cuma penghuninya.

Tugasnya menetapkan **siapa** yang mengetuk — dan jawabannya harus terasa
sebagai "bukan siapa-siapa", bukan sebagai "penjahat".

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
   - **pengetuknya tidak punya wajah, tudung, atau warna bahaya.** intinya justru
     bahwa siapa pun yang kebetulan lewat bisa melakukannya. begitu ia digambar
     sebagai penjahat, masalahnya berubah jadi masalah orang lain.
   - **ketukan juga mendarat di pintu yang TERGEMBOK**, dan itu penting: yang
     mengetuk tidak tahu mana yang terkunci sebelum mencoba. ini yang membuat
     `10-diam` nanti masuk akal.
   - **nol angka.** berapa ketukan per malam adalah angka paling menggoda di
     episode ini dan sumbernya belum ada. yang dipakai gambarnya: banyak, terus,
     tanpa dihitung.
   - tahap 7 memulangkan penonton ke frame scene 1 dengan sengaja. ketenangan di
     dalam itu yang dibayar di scene 5.
