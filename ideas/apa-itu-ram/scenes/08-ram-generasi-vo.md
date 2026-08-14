# 08-ram-generasi · rencana VO

Bagian 6 [explaining] — pasangan langsung [`07-ram-bentuk`](07-ram-bentuk-vo.md).
Scene sebelumnya menjawab "yang mana bendanya"; scene ini menjawab angka kedua
yang tertulis di kotaknya dan yang membuat orang salah beli.

Yang harus berubah di kepala penonton: **angka DDR itu generasi, bukan merek atau
kualitas** — dan generasinya tidak bisa saling tukar karena batangnya memang tidak
sebentuk. Satu coakan kecil di deretan kaki yang digeser tiap generasi. Bukan
aturan di kertas: kalau tidak cocok, ia benar-benar tidak masuk.

Satu baris di blok `## VO` = satu **beat**. Detiknya dihitung
[`tools/baca-episode.mjs`](../../../tools/baca-episode.mjs) dari jumlah kata —
jangan pernah mengetik detik di berkas ini. Formatnya: [docs/11](../../../docs/11-rencana-vo.md).

## VO

Di batangnya ada angka lain.
D D R empat.
D D R lima.
Itu generasinya.
Tiap generasi mengubah cara meja bicara dengan prosesor.
Dan menggeser satu coakan kecil di kaki batangnya.
Jadi batang baru tidak masuk ke slot lama.

## Sinkron

Urutannya sama dengan blok di atas; koreografinya di
[`08-ram-generasi-direction.md`](08-ram-generasi-direction.md).

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Batang dari scene sebelumnya naik ke tengah dan membesar; dua salinannya turun di atas dan di bawahnya. |
| 1 | Label DDR4 menyala di batang tengah. |
| 2 | Label DDR5 menyala di batang bawah. DDR3 tetap redup di atas — ia tidak diucapkan. |
| 3 | Kurung tegak merangkul ketiganya; kata "generasi" muncul di sisinya. |
| 4 | Garis dari tiap batang ke prosesor digambar bergantian, ritmenya beda-beda. |
| 5 | Ketiga batang mencondong ke coakannya; garis putus-putus turun ke bilah pembanding, jelas tidak segaris. |
| 6 | Batang terbaru diturunkan ke slot lama, tertahan, bergetar, lalu naik lagi. Tanda silang. |

## Catatan

- **Tidak ada undangan membayangkan, dan itu benar** (HARD RULE 6). Ini scene
  paling "zoom in" di episode: benda yang dibicarakan adalah batang yang sama
  yang penonton baru saja lihat ditancapkan di scene 7. Mengundang lagi berarti
  menyuruhnya melepaskan benda itu dan membayangkan yang baru.
- **"Di batangnya", bukan "Di kotaknya".** Dua alasan, dan keduanya sendirian
  sudah cukup. Pertama, "kotak" sudah dipakai enam kali di `06-ram-size` untuk
  sel di permukaan meja; memakainya lagi untuk kardus di toko membuat satu kata
  menunjuk dua benda yang tidak berhubungan, dua scene berselang. Kedua,
  kardusnya **tidak ada di layar** — yang ada cuma batang, dan label DDR mendarat
  di batang itu. Kamus istilah di `naskah.md` juga sudah menulisnya begitu:
  "Angka generasi yang tertulis di batangnya."
- **Akronim di baris VO, dan itu pengecualian yang sadar** (HARD RULE 6 melarang
  akronim di kalimat L1). Yang dilarang aturan itu adalah nama yang tidak punya
  bentuk; di sini bentuknya justru subjek scene-nya — labelnya mendarat di batang
  yang sudah berdiri di layar, dan baris pertama menunjuk bendanya lebih dulu
  ("Di batangnya ada angka lain") sebelum satu huruf pun disebut. Nama sesudah
  gambaran, persis urutan yang diminta aturannya. Kalau nama ini dihindari, scene
  ini kehilangan satu-satunya alasan ia ada: penonton di toko membaca DDR4 dan
  DDR5 di kardus, bukan "generasi keempat".
- **"D D R empat", dieja per huruf** — TTS membaca "DDR" sebagai satu kata yang
  tidak berbunyi apa-apa. Angkanya ditulis sebagai kata supaya tidak dibaca
  "empat" versi ordinal. Sudah masuk kamus pengucapan di `naskah.md`.
- **Kedua nama itu baris sendiri-sendiri**, walaupun bersama kalimat sebelumnya
  ia satu tarikan napas. Label di layar menyala tepat saat namanya disebut, dan
  itu cuma bisa dipatok kalau tiap nama punya beat sendiri — kalau ketiganya
  satu baris, komposisi harus menebak sendiri kapan "D D R lima" jatuh di dalam
  beat lima setengah detik. Jeda yang muncul di antaranya justru diinginkan:
  dua nama yang diucapkan beruntun tanpa jeda terdengar seperti satu nama.
- **DDR3 tidak diucapkan, cuma tampil di layar.** Tiga akronim berturut-turut di
  satu kalimat terdengar seperti daftar; dua sudah cukup untuk membentuk deret,
  dan yang ketiga tetap terbaca di layar bagi yang mesinnya memang seumuran itu.
- **"coakan", bukan "takik" atau "notch".** Takik ada di kamus istilah `naskah.md`
  untuk dipakai sebagai label layar; yang diucapkan adalah kata yang tidak perlu
  dijelaskan lebih dulu.
- **Tidak ada satu angka kecepatan pun** — bukan lupa. Semua angka bandwidth dan
  latensi DDR masih ⚠ di `naskah.md` § Sumber, jadi VO berhenti di "mengubah cara
  meja bicara dengan prosesor", yang benar tanpa perlu ditopang angka.
- **"tidak masuk", bukan "tidak kompatibel".** Kalimat terakhir sengaja fisik: yang
  diingat penonton di toko adalah bahwa batangnya benar-benar tidak muat, bukan
  bahwa ada aturan yang melarangnya.
- Posisi coakan di layar **skematis**, sengaja dibuat berjauhan supaya bedanya
  terlihat. Angka posisi yang sebenarnya menunggu baris ⚠ JEDEC di `naskah.md`
  § Sumber; VO tidak pernah menyebut ukuran, jadi tidak ada klaim yang menggantung
  di sana.
