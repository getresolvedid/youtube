# 07-peran-tcp · rencana VO

Kelengkapan & kirim ulang. Diambil apa adanya dari
[`storyboard-usulan.md`](../storyboard-usulan.md) § Scene 06.

## VO

Di sinilah TCP berperan.
TCP, atau Transmission Control Protocol, bertugas membuat komunikasi menjadi lebih andal.
TCP dapat memastikan data diterima dengan lengkap dan dalam urutan yang benar.
Jika ada bagian data yang hilang dalam perjalanan, TCP dapat meminta bagian tersebut dikirim kembali.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Keempat potongan masih dalam perjalanan, meneruskan scene 6. |
| 1 | Tiga tiba. Nomor dua memudar di tengah jalan dan tidak pernah sampai. |
| 2 | Papan penerima menyala: tiga tanda centang, satu lubang. |
| 3 | Permintaan berjalan balik ke kiri; nomor dua dikirim ulang dan tiba; semua tanda jadi centang. |

## Catatan

- **Scene inti kedua, dan puncak episode.** Kalau harus dipotong, ini yang
  paling terakhir disentuh.
- **Beat 1 tidak boleh "menghancurkan" potongan yang hilang.** Storyboard
  memintanya memudar dari jalur, dan itu benar: ledakan akan terbaca sebagai
  kerusakan luar biasa, padahal hilangnya potongan itu peristiwa biasa.
- **Lubang di papan penerima yang bekerja, bukan tanda tanyanya.** Yang membuat
  penonton mengerti bukan simbol `?`, tapi barisan yang tidak rapat — mata
  menemukan lubangnya sendiri sebelum VO menyebutkannya.
- **Permintaan balik adalah satu-satunya gerakan kanan → kiri di seluruh
  episode**, selain jawaban server di scene 11. Justru karena sepuluh scene lain
  konsisten kiri → kanan, gerakan ini langsung terbaca sebagai "sesuatu yang
  kembali".
- Kepanjangan "Transmission Control Protocol" cuma disebut di sini, sekali.
