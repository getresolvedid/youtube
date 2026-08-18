# 01-pesan-dikirim · rencana VO

Bagian 1 [question]. Frame pertama sudah pertanyaannya — tanpa salam, tanpa
perkenalan ([docs/02](../../../docs/02-format-video.md)).

Yang harus berubah di kepala penonton: pesan yang dikirim itu **tidak berpindah
langsung** dari tangan ke tangan — ia menempuh jalan, dan di jalan itu ada yang
lain. Dia belum boleh tahu siapa yang mengamati, dan belum boleh tahu apa yang
melindunginya; dia cuma perlu merasa bahwa ada yang perlu dilindungi.

## VO

Bayangkan kamu ingin mengirim sebuah pesan kepada temanmu.
Kamu mengetik pesan, lalu menekan tombol kirim.
Pesan tersebut kemudian dikirim melalui internet menuju perangkat temanmu.
Tapi, bagaimana jika ada orang lain yang mencoba melihatnya?

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Sosok duduk di meja, HP di tangan, layarnya menyala. Nyaris tidak ada yang bergerak. |
| 1 | Potong ke dekat. Gelembung "Apa kabar?" tumbuh huruf demi huruf, lalu naik sedikit dan dapat tanda terkirim. |
| 2 | Gelembung itu keluar dari HP, mengeras jadi paket, dan berjalan di sepanjang jalur bertitik ke HP kedua di ujung kanan. |
| 3 | Paket berhenti di tengah jalur. Semuanya diam. Di kejauhan, di luar jalur, satu sosok berdiri menghadapnya. |

## Catatan

- **Sumbernya arahan user 2026-08-17**, ditulis apa adanya ke berkas ini sesuai
  HARD RULE 4 — narasi tidak pernah tinggal di berkas direction. Empat kalimat
  narasi yang user tulis jadi empat baris di sini, dan empat baris itulah yang
  jadi empat beat.
- **Undangan ada di beat 0** — "Bayangkan kamu ingin mengirim sebuah pesan"
  adalah bentuk baku HARD RULE 6, dan ia mendirikan gambaran yang dipakai scene
  berikutnya. Beat 1–3 tidak mengundang ulang: gambarannya masih yang sama.
- **Nama "enkripsi" tidak muncul, dan memang tidak boleh** — `[what]` dinamai
  tepat sekali di bagian 4 (HARD RULE 6). Begitu juga "kunci", "gembok", dan
  "sandi": tidak satu pun boleh terdengar di scene 1.
- **Kata "data" tidak dipakai di VO, dan itu bukan kebetulan.** Ia ada di daftar
  larangan kosakata L1 ([docs/09](../../../docs/09-tangga-abstraksi.md)) —
  kata teknis yang menyamar jadi kata sehari-hari. Arahan user memakai "paket
  data" untuk **benda di layar**, dan di layar ia memang cuma kotak tanpa label,
  jadi tidak ada bentrokan. Yang harus dijaga: kata itu tidak boleh merembes ke
  VO scene mana pun.

### Yang belum diputuskan user — tiga hal

- **Anggaran 8 detik tidak akan tercapai, dan itu urusan berkas ini.** Empat
  kalimat itu 33 kata; pada `VO_WORDS_PER_MINUTE=136` panjangnya **±15 detik**,
  hampir dua kali lipat. Detiknya tidak diketik di mana pun — `npm run gen`
  yang menghitung — jadi tidak ada yang perlu diperbaiki secara mekanis. Tapi
  kalau hook memang dimaksudkan 8 detik, yang dipotong **kalimatnya**, bukan
  angkanya.
- **Registernya lebih formal daripada suara channel.** "Pesan tersebut kemudian
  dikirim melalui internet menuju perangkat temanmu" adalah kalimat tulis;
  episode lain berbunyi seperti orang bicara ("Laptopmu lagi nyala, halamannya
  terbuka"). Usulan, kalau mau: *"Pesannya keluar dari HP-mu, jalan sendiri,
  sampai ke HP temanmu."* — 11 kata, tanpa "perangkat", tanpa "tersebut".
  **Belum diubah** karena kalimatnya keputusan user.
- **Empat baris untuk enam gerakan.** Catatan penyutradaraan user sendiri
  mematok satu kalimat = satu visual utama, lalu menyebut enam tahap: karakter →
  mengetik → mengirim → paket berjalan → muncul yang mengamati → pertanyaan.
  Beat 1 sekarang memikul tiga gerakan sekaligus (mengetik, kirim, tanda
  terkirim) dan beat 3 memikul dua (paket berhenti, sosok muncul). Usulan
  pecahan tujuh baris, kalau mau:

  ```
  Bayangkan kamu ingin mengirim sebuah pesan kepada temanmu.
  Kamu ketik satu kalimat pendek.
  Lalu kamu tekan kirim.
  Pesannya keluar dari HP-mu.
  Jalan sendiri, sampai ke HP temanmu.
  Tapi di tengah jalan, dia berhenti.
  Ada orang lain yang sedang melihatnya.
  ```

  **Belum dipakai.** Kalau dipakai, indeks beat di `01-pesan-dikirim.tsx` ikut
  bergeser — dan .tsx-nya memang belum ada, jadi sekarang justru waktu paling
  murah untuk memutuskannya.
