Anggaran: mulai 28,05 dtk · durasi 8,35 dtk (estimasi, VO belum jadi).
Tiga beat. Tangganya sampai di ujung, dan laci yang dua kali kosong akhirnya
berisi. **Ini satu-satunya laci berisi di seluruh Short.**

1. potongan terakhir (beat 0):
   - penanda bergeser ke potongan paling kiri; potongan itu menyala
   - garis tergambar ke jendela loket teratas; loket itu menyala
   (VO: "Begitu terus, sampai potongan paling kiri.")

2. lacinya berisi (beat 1):
   - laci loket teratas ditarik — dan ada kartu di dalamnya
   - loketnya berganti jadi **beraksen**, satu-satunya di layar
   - kartu bernomor berdiri di ruang kosong sebelah kanan tangga, sejajar
     lacinya, dihubungkan garis tipis ke laci itu
   (VO: "Yang di ujung itu memegang nomornya.")

3. pemiliknya (beat 2):
   - sosok netral muncul di sisi KIRI loket teratas, **tanpa label teks**
   (VO: "Karena di situ pemilik situsnya sendiri.")

teks di layar:
   beat 0 → "Sampai potongan paling kiri."
   beat 1 → "Yang ini memang punya nomornya."
   beat 2 → "Pemilik situsnya sendiri."

catatan komposisi:
   - **loket ujung adalah SATU-SATUNYA laci berisi sampai titik ini.** Kalau ada
     laci lain yang pernah digambar berisi sebelumnya, seluruh kontrasnya hilang
     — dan bersamanya seluruh gagasan Short ini.
   - **aksen dipakai sekali saja, di sini.** Warna aksen berarti "yang memang
     punya jawabannya"; menaburkannya ke loket lain membuatnya jadi hiasan.
   - sosoknya **netral, tanpa atribut apa pun** — `<Sosok>` dari
     `../../panggung-loket.tsx`, sama dengan yang dipakai video panjang.
   - sosoknya ditaruh di KIRI, bukan kanan: sisi kanan loket teratas sudah
     dipakai garis ke kartu nomornya.
   - **sosoknya tidak berlabel.** Dulu ada baris "pemilik situsnya" di bawahnya,
     dan pada 9:16 baris itu terjepit antara kaki loket teratas dan atap loket di
     bawahnya — jaraknya tinggal 3px. Yang dikatakannya sudah ditanggung teks di
     layar beat 3, jadi labelnya bukan hilang, cuma pindah ke tempat yang memang
     dibaca penonton tanpa suara.
   - **kartunya TIDAK menempel di sisi loket.** Versi pertama menaruhnya pada
     `laci.x + 210 * skala` dan itu menindih atap loket teratas. Kartu yang
     menempel ke loket terbaca sebagai bagian bangunannya, padahal ia justru ISI
     lacinya — dan itu satu-satunya hal yang dibuktikan scene ini. Posisinya
     sekarang dipatok `KARTU_NOMOR` di `../tangga-tegak.tsx` dan dipakai sama
     persis oleh scene 7, 8, dan 9.
   - nomornya tidak dibacakan VO. Kartu yang terlihat sudah cukup.

motion:
   - penanda: geser ke `xPotonganS(0)`, `power2out`, 0,35 dtk, mulai beat 0
   - garis: `gambarGaris()` 0,45 dtk, mulai beat 0 + 0,1
   - laci: `expoOut`, 0,7 dtk, mulai beat 1
   - kartu nomor: `masuk()` geser 40px dari dalam laci, `expoOut`, 0,5 dtk,
     mulai beat 1 + 0,25
   - sosok: `masuk()` geser 24px, `expoOut`, 0,5 dtk, mulai beat 2
