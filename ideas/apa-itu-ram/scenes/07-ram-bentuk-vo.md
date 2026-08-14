# 07-ram-bentuk · rencana VO

Bagian 6 [explaining] — scene pertama yang membawa analogi meja **keluar** ke
benda fisik. Sampai sini penonton punya model yang benar tapi belum pernah
melihat bendanya; kalau ia berdiri di depan komputernya sendiri, ia masih tidak
tahu yang mana RAM. Scene ini yang menutup jarak itu.

Yang harus berubah di kepala penonton: **RAM bukan satu bentuk.** Batang panjang
di desktop, batang pendek di laptop, chip yang dipatri di ponsel, dan memori
sendiri di kartu grafis — keempatnya RAM, dan yang berbeda cuma kemasannya.
Kecepatan, kapasitas, dan generasi **tidak** dibahas di sini; generasi dapat
scene sendiri sesudah ini ([`08-ram-generasi`](08-ram-generasi-vo.md)).

Satu baris di blok `## VO` = satu **beat**. Detiknya dihitung
[`tools/baca-episode.mjs`](../../../tools/baca-episode.mjs) dari jumlah kata —
jangan pernah mengetik detik di berkas ini. Formatnya: [docs/11](../../../docs/11-rencana-vo.md).

## VO

Meja itu punya wujud nyata.
Di desktop, ia batang panjang yang ditancapkan ke papan induk.
Di banyak laptop, batangnya lebih pendek.
Di ponsel tidak ada batang sama sekali.
Chipnya dipatri langsung, tidak bisa dilepas.
Kartu grafis malah punya mejanya sendiri.
Wujudnya beda-beda, tugasnya sama persis.

## Sinkron

Urutannya sama dengan blok di atas; koreografinya di
[`07-ram-bentuk-direction.md`](07-ram-bentuk-direction.md).

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Kisi kotak dari scene sebelumnya mengatup jadi satu batang; kaki dan takik tumbuh di bawahnya. |
| 1 | Batang melayang ke kartu pertama dan turun masuk ke slotnya. |
| 2 | Salinan batang muncul di kartu kedua, memendek di tengah jalan, lalu masuk slot yang ikut memendek. |
| 3 | Kartu ketiga: slotnya **tidak** digambar. Batang datang, lalu kakinya rontok. |
| 4 | Batang menyusut jadi chip kecil; titik solder mendarat di keempat sisinya. |
| 5 | Kartu keempat: prosesor grafis di tengah, empat chip memori mengelilinginya. |
| 6 | Kisi kotak yang sama menyala di keempat kartu sekaligus. |

## Catatan

- **Tidak ada undangan membayangkan di sini, dan itu disengaja** (HARD RULE 6).
  Gambarannya masih meja yang sama; scene ini justru kebalikan dari membayangkan
  — ia membawa gambaran yang sudah berdiri keluar ke benda yang bisa dipegang.
  Kalimat pembukanya menunjuk ("Meja itu…"), bukan mengundang, dan menunjuk hanya
  bisa dilakukan ke sesuatu yang sudah ada di kepala penonton.
- **"Meja itu"**, bukan "RAM itu". Kata RAM sudah dipakai dua scene berturut-turut;
  yang menyambung ke scene sebelumnya adalah mejanya, dan justru meja itulah yang
  di sini berubah jadi benda.
- **"papan induk" dan "chip" lolos tanpa kalimat L1 pembuka**, dan itu keputusan,
  bukan kelalaian. Keduanya rangkaian kata sehari-hari yang bendanya sedang
  ditunjuk di layar saat diucapkan — batang masuk ke slot di papannya, chip
  dipatri dengan titik solder yang terlihat. Aturan L1 di HARD RULE 6 menjaga
  penonton dari nama yang tidak punya bentuk; nama yang bentuknya sedang bergerak
  di layar sudah punya kalimat pembukanya, yaitu gambarnya. Bandingkan dengan
  DIMM dan LPDDR di bawah, yang tidak punya bentuk apa pun selain label.
- **"dipatri", bukan "disolder".** Keduanya dipahami, tapi "solder" mengundang TTS
  membacanya dengan bunyi Inggris. Kalau hasil generate ternyata janggal, gantinya
  "menempel permanen" — jangan "disolder".
- **"Di banyak laptop", bukan "di laptop".** Sebagian laptop tipis RAM-nya juga
  dipatri seperti ponsel. Satu kata itu yang menjaga kalimatnya tetap benar tanpa
  menambah satu beat penjelasan yang tidak dibutuhkan di sini.
- **Nama resminya tidak masuk VO.** DIMM, SO-DIMM, LPDDR, GDDR cuma tampil sebagai
  label kecil di layar. Semuanya istilah yang belum punya kalimat L1 pembuka
  (docs/09 aturan 2), dan mengucapkannya berarti tujuh akronim dalam dua puluh
  detik. Yang dibaca VO adalah bendanya; yang ditulis layar adalah namanya, untuk
  penonton yang nanti mencarinya di toko.
- **Angka sengaja tidak ada satu pun.** Tidak ada kapasitas, tidak ada kecepatan,
  tidak ada lebar bus. Baris ⚠ di `naskah.md` § Sumber masih menahan semuanya, dan
  scene ini memang tidak membutuhkannya.
- "Kartu grafis malah punya mejanya sendiri" berhenti persis di situ. **Kenapa** ia
  butuh meja sendiri adalah topik episode lain — begitu dijelaskan di sini, scene
  ini berhenti jadi scene tentang wujud.
