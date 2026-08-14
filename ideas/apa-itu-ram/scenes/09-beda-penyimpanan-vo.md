# 09-beda-penyimpanan · rencana VO

Bagian 6 [explaining]. Tiga scene sebelumnya membedah batangnya makin dekat —
ukurannya, wujudnya, angka generasinya — dan sampai di sini penonton punya satu
benda yang ia kenal betul. Yang belum ia punya adalah **pembandingnya**: di
komputer yang sama ada benda kedua yang juga memegang berkas, dan sepanjang
episode ia cuma hadir sebagai analogi ("gudang"), tidak pernah sebagai barang.

Yang harus berubah di kepala penonton: **gudang di analogi itu benda nyata, dan
bedanya dengan meja ada tiga** — muatnya, cara mengambil isinya, dan apa yang
terjadi waktu listriknya putus. Yang ketiga adalah beda yang paling menentukan
dan satu-satunya yang tidak bisa ditebak dari analogi meja: meja sungguhan tetap
berisi waktu kamu pulang.

**Scene ini menyerap rencana scene `ram-lupa`** yang tercatat di `naskah.md`.
Volatilitas tidak berdiri sendiri sebagai gagasan — ia baru punya arti kalau
disandingkan dengan sesuatu yang **tidak** hilang, dan pembandingnya sudah
berdiri di layar di scene ini.

**Tidak ada undangan membayangkan, dan itu disengaja** (HARD RULE 6). Bendanya
sudah di layar sejak scene 7; yang datang di sini benda kedua, bukan gambaran
kedua. Baris pertamanya menunjuk balik ke batang yang barusan gagal masuk slot,
jadi ia tidak bisa dibaca sendirian (HARD RULE 7).

Satu baris di blok `## VO` = satu **beat**. Detiknya dihitung
[`tools/baca-episode.mjs`](../../../tools/baca-episode.mjs) dari jumlah kata —
jangan pernah mengetik detik di berkas ini. Formatnya: [docs/11](../../../docs/11-rencana-vo.md).

## VO

Batang ini bukan satu-satunya tempat berkasmu berada.
Ada benda lain di komputer yang sama.
Dia yang memegang berkasmu waktu komputernya mati.
Namanya hardisk, atau S S D.
Kalau batang tadi mejanya, yang ini gudangnya.
Gudang muat jauh lebih banyak, tapi isinya harus dijemput.
Bedanya yang paling besar kelihatan kalau listriknya dicabut.
Meja langsung kosong. Gudang tidak berubah sama sekali.

## Sinkron

Urutannya sama dengan blok di atas; koreografinya di
[`09-beda-penyimpanan-direction.md`](09-beda-penyimpanan-direction.md).

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Batang tetap di kotak tempat ia tertahan; slot & papan di bawahnya memudar keluar. |
| 1 | Kotak kedua masuk dari kiri dan berhenti — jauh lebih besar daripada batangnya. |
| 2 | Piringan berputar sekali di dalamnya; kisi berkas di badannya terisi penuh. |
| 3 | Label "hardisk · S S D" mendarat di bawah kotak itu. |
| 4 | Dua label kecil menyala berurutan: "meja" di batang, "gudang" di kotak. |
| 5 | Sorot menelusuri kisi gudang mencari satu berkas, lalu berkas itu berangkat ke batang. |
| 6 | Simbol daya menyala di antara keduanya, lalu padam dengan tanda silang. |
| 7 | Isi batang lenyap satu per satu sampai kosong; kisi gudang tidak bergeming. |

## Catatan

- **Baris terakhir sengaja dua kalimat dalam satu baris.** Keduanya satu
  kejadian: satu benda kehilangan isinya justru pada detik benda di sebelahnya
  tidak berubah. Dipecah dua beat, penonton melihat mejanya kosong lebih dulu,
  lalu menunggu tiga detik untuk diberi tahu bahwa yang satunya baik-baik saja —
  dan perbandingannya jadi dua kejadian, bukan satu.
- **Nama benda datang di beat 3, sesudah kerjanya digambarkan di beat 2**
  (HARD RULE 6 · [docs/09](../../../docs/09-tangga-abstraksi.md) aturan 2).
  "Dia yang memegang berkasmu waktu komputernya mati" adalah kalimat L1-nya, dan
  ia jatuh lebih dulu — akronim tanpa gambaran adalah persis titik penonton
  berhenti membayangkan.
- **"hardisk", bukan "hard disk".** Ditulis sesuai lafal Indonesia supaya TTS
  tidak mengejanya sebagai dua kata Inggris; "S S D" dieja per huruf. Keduanya
  sudah masuk kamus pengucapan di `naskah.md`.
- **Beat 4 adalah jembatan analogi ke benda nyata**, dan itu tugas yang cuma bisa
  dikerjakan di sini. Sampai scene ini "gudang" hidup di analogi dan "batang"
  hidup di meja komponen; satu kalimat yang menempelkan keduanya menghemat
  seluruh scene yang seharusnya menjelaskan bahwa keduanya bicara tentang hal
  yang sama.
- **"harus dijemput", bukan "lebih lambat".** Angka latensi masih ⚠ di
  `naskah.md` § Sumber, dan kalimatnya tetap benar tanpa angka — yang dijual
  mekanismenya (dijemput dulu, dicari dulu), persis seperti di `05-kenapa-cepat`.
  Kata "dijemput" itu sendiri panggilan balik ke `03-bolak-balik`.
- **"listriknya dicabut", bukan "daya diputus" atau "power off".** Yang dilakukan
  penonton di dunia nyata adalah mencabut, dan kata itu tidak butuh penjelasan.
- **Tidak ada kata "volatil", "permanen", atau "non-volatile"** — ketiganya nama
  untuk hal yang barusan ia lihat terjadi di layar, dan menamainya di sini tidak
  menambah apa pun yang bisa dibayangkan. Baris ⚠ di `naskah.md` § Sumber untuk
  klaim ini sudah ditambahkan dan belum ditutup.
- **Scene ini tidak menyentuh kenapa isinya hilang** (muatan listrik yang harus
  disegarkan terus-menerus). Itu L3, satu tangga di atas episode ini
  ([docs/09](../../../docs/09-tangga-abstraksi.md)), dan barisnya juga masih ⚠.
  Yang diklaim di sini cuma yang terlihat: kosong, dan tidak kosong.
