# 01-hook-question · rencana VO

Bagian 1 [question] — frame pertama video. Tidak ada sapaan, tidak ada nama
channel; tugasnya cuma menanam satu pertanyaan yang penonton belum bisa jawab
sendiri.

Gambaran pertama episode ini berdiri di sini, jadi baris pertamanya **mengundang**
(HARD RULE 6). Yang diundang bukan analogi gudang-meja — itu milik scene 3 dan 4 —
melainkan adegan yang penonton memang mengalaminya sendiri tiap hari: membuka
aplikasi.

Satu baris di blok `## VO` = satu **beat**. Detiknya dihitung
[`tools/baca-episode.mjs`](../../../tools/baca-episode.mjs) dari jumlah kata —
jangan pernah mengetik detik di berkas ini. Formatnya: [docs/11](../../../docs/11-rencana-vo.md).

## VO

Bayangkan kamu baru saja membuka sebuah aplikasi.
Isinya muncul di layar, satu per satu.
Kelihatannya sepele.
Tapi isi itu tadi diambil dari mana, dan sekarang dikerjakan di mana?

## Sinkron

Urutannya sama dengan blok di atas; koreografinya di
[`01-hook-question-direction.md`](01-hook-question-direction.md).

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Layar A: kursor bergerak, menekan pintasan, jendela peramban tumbuh dari titik yang diklik. |
| 1 | Layar A: isi halaman terisi baris demi baris — "isinya" yang ditanyakan nanti. |
| 2 | Layar A mundur sedikit, pertanyaan besar masuk. |
| 3 | Potongan keras ke layar B tepat di kata "Tapi", lalu tiga kandidat masuk dan ketiganya ditandai salah. |

## Catatan

- **Undangannya beat 0 sendirian**, tidak digabung dengan beat 1. Di layar,
  beat 0 adalah kursor dan jendela yang terbuka; halamannya baru terisi di beat 1.
  Digabung satu baris, keduanya jatuh bersamaan dan tidak ada yang sempat dilihat.
- Beat 3 sengaja satu baris panjang, bukan dipecah dua. Kata "Tapi" dan
  pergantian layar membawa pesan yang sama; kalau baris ini dipecah, pergantian
  layarnya jatuh di batas beat yang salah.
- **"isinya", bukan "datanya".** "Data" ada di daftar larangan kosakata L1
  ([docs/09](../../../docs/09-tangga-abstraksi.md)) — ia terdengar sehari-hari
  buat kita karena kita mengucapkannya tiap hari, tapi orang yang tidak menulis
  kode tidak bisa menggambar satu pun bentuk dari kata itu. "Isinya" menunjuk ke
  benda yang barusan muncul di layar, dan itu bisa digambar.
- **"dikerjakan", bukan "diproses".** Alasan yang sama: "proses" ikut daftar
  larangan yang sama. Kamus pengucapan di `naskah.md` juga mengunci channel ini
  tidak memakai kata CPU sama sekali.
- Tidak ada satu pun nama benda teknis yang jatuh di scene ini — bahasa L1 penuh.
  Kata "prosesor" baru diperkenalkan di `03-bolak-balik`, dan "ram" baru boleh
  muncul di `04-ram-analogy` (HARD RULE 6: `[what]` dinamai di bagian 4).
  Ketiga kandidat di layar B punya label tertulis, dan itu memang cuma di layar —
  VO tidak menyebut satu pun namanya.
