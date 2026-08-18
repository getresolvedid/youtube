# 06-jadi-paket · rencana VO

Pemecahan jadi potongan. Diambil apa adanya dari
[`storyboard-usulan.md`](../storyboard-usulan.md) § Scene 05.

## VO

Tapi data yang dikirim melalui jaringan tidak selalu dikirim sebagai satu bagian besar.
Data dapat dipecah menjadi bagian-bagian kecil yang disebut packet atau paket data.
Setiap paket membawa informasi penting, termasuk alamat tujuan.
Paket-paket tersebut kemudian bergerak melalui jaringan menuju perangkat tujuan.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Satu pesan utuh berdiri sendiri di tengah, besar. |
| 1 | Pesan terbelah jadi empat potongan bernomor. |
| 2 | Tiap potongan mendapat label tujuan yang sama. |
| 3 | Keempatnya berangkat lewat jalur yang berbeda-beda, menuju satu tujuan. |

## Catatan

- **Ini scene inti pertama dari dua** (yang kedua `07-peran-tcp`). Kalau episode
  ini harus dipotong, keduanya yang terakhir disentuh.
- **Beat 1 adalah pembelahan, bukan penggandaan.** Pesannya harus terlihat
  HABIS jadi empat potongan — kalau pesan aslinya masih tinggal di layar,
  yang terbaca "disalin", dan itu keliru.
- **Beat 3 memakai tiga jalur yang sudah dikenal sejak scene 1.** Jalurnya tidak
  digambar baru di sini; ia sudah ada sejak awal justru supaya beat ini tidak
  perlu memperkenalkan apa pun.
- **Nomornya wajib terbaca satu per satu.** Seluruh scene 7 bergantung pada
  penonton sudah hafal bahwa ada nomor 01 sampai 04.
- Kata "packet" diucapkan "paket" (naskah.md § Kamus pengucapan).
