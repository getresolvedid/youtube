# T19 · Metadata unggah — 15 Short

**Aturan yang mengikat daftar ini:** [docs/06](../../../docs/06-publishing.md)
mensyaratkan **judul dan thumbnail tidak berbagi kata** — yang satu menjelaskan,
yang satu menarik. Kata thumbnail sudah dibekukan di
[`../thumbnail.md`](../thumbnail.md), jadi kolom "kata terlarang" di bawah bukan
saran: itu daftar yang sudah dipakai kartunya.

Judul juga yang memikul beban pencarian. Thumbnail menang di feed; judul menang
di hasil pencarian, dan di situ istilah aslinya (*loss*, *backpropagation*,
*gradient descent*, *attention*) justru harus muncul — itu yang diketik orang.

| # | Judul (≤ 60 kar.) | Kata terlarang (dipakai kartunya) |
|---|---|---|
| 01 | Bagaimana AI belajar tanpa pernah diprogram | ditegur · ribuan · kali |
| 02 | Cara kerja neuron buatan, dilihat dari dalam | isi · satu · simpul |
| 03 | Bobot dan bias di neural network, 30 detik | bukan · sama · kuat |
| 04 | Kenapa neural network butuh fungsi aktivasi | lurus · jadi · belok |
| 05 | Alasan jaringan saraf disusun bertingkat | satu · lapis · tak · cukup |
| 06 | Forward propagation dijelaskan sederhana | masuk · lalu · apa |
| 07 | Fungsi loss: cara AI mengukur kekeliruan | seberapa · salah |
| 08 | Backpropagation dijelaskan tanpa rumus | berjalan · mundur |
| 09 | Gradient descent dijelaskan pakai lereng | turun · ke · mana |
| 10 | Apa yang terjadi saat model AI dilatih | empat · tahap · diulang |
| 11 | Overfitting dijelaskan dalam 30 detik | hafal · bukan · paham |
| 12 | Cara CNN mengenali isi sebuah gambar | sepetak · demi · petak |
| 13 | Cara AI memproses deret dan konteks | urutan · mengubah |
| 14 | Attention di transformer, dijelaskan pelan | kata · mana · yang · kuat |
| 15 | Hubungan neural network dengan ChatGPT | dari · satu · simpul |

## Deskripsi

**Baku untuk kelimabelasnya** — dua baris pertama yang terbaca sebelum "lebih
banyak", jadi di situ isinya, bukan basa-basi:

```
<satu kalimat isi episode ini>
Bagian <n> dari 15 — seri neural network dari nol, tanpa rumus.

Seri lengkapnya:
01 Bagaimana AI belajar · 02 Neuron buatan · 03 Bobot & bias
04 Fungsi aktivasi · 05 Lapisan · 06 Forward propagation
07 Loss · 08 Backpropagation · 09 Gradient descent
10 Latihan · 11 Overfitting · 12 CNN
13 Deret & konteks · 14 Attention · 15 ChatGPT

#neuralnetwork #AI #machinelearning #belajarAI
```

Kalimat pertama per episode:

| # | Kalimat isi |
|---|---|
| 01 | Jaringannya menebak, ditegur, lalu menggeser dirinya sendiri — tanpa satu pun aturan yang pernah dituliskan manusia. |
| 02 | Masukan dikalikan, dijumlah, ditambah satu angka penggeser — itu seluruh kerja satu neuron. |
| 03 | Bobot mengatur seberapa besar pengaruh sebuah masukan; bias menggeser hasilnya. |
| 04 | Tanpa fungsi aktivasi, berapa pun lapisannya, jaringan tetap berlaku seperti satu aturan sederhana. |
| 05 | Lapis awal menemukan potongan sederhana; lapis berikutnya menyusunnya jadi bentuk. |
| 06 | Perjalanan sebuah masukan dari lapis pertama sampai keluar jadi tebakan. |
| 07 | Loss mengubah selisih antara tebakan dan jawaban benar jadi satu angka yang bisa diukur. |
| 08 | Kesalahannya ditelusuri mundur sampai ketahuan andil tiap sambungan. |
| 09 | Yang terlihat cuma kemiringan di tempat berdiri — dan itu cukup untuk tahu arah turun. |
| 10 | Tebak, ukur, telusuri mundur, setel — satu gelung yang diulang untuk ribuan contoh. |
| 11 | Nilai nyaris sempurna di data latih tidak berarti apa-apa kalau gagal di data baru. |
| 12 | Jendela kecil menyapu gambar; penyaring berbeda menanggapi tepi dan tekstur yang berbeda. |
| 13 | Apa yang datang lebih dulu mengubah arti yang datang kemudian. |
| 14 | Tiap kata memberi perhatian berbeda-beda ke kata lain — itu dasar transformer. |
| 15 | Simpul sederhana di episode kedua adalah awal dari yang menjalankan ChatGPT. |

## Urutan tayang

**Berurutan 01 → 15, satu per hari.** Bukan sekaligus: tiap Short menggantung
episode berikutnya di dua detik terakhirnya, dan gantungan yang dijawab di menit
yang sama berhenti jadi gantungan.

**Tapi tiap Short tetap berdiri sendiri** (docs/02 § bentuk serial) — sepuluh
detik pertamanya memperkenalkan ulang bendanya, dan tidak satu pun membuka
dengan "di episode sebelumnya". Penonton yang mendarat di Ep 09 dari feed tidak
perlu menonton delapan yang lain dulu.

## Status berkas

**Kelima belas MP4 di `out/` sudah BERSUARA** (2026-08-20) — trek AAC, subtitel
preview hilang sendiri begitu MP3-nya ada. Yang tersisa sebelum unggah cuma satu
dan itu tidak bisa diwakilkan: **dengarkan kelimabelasnya.** Pencocokan kata
100% membuktikan Gemini membaca naskahnya, bukan memparafrasenya — ia tidak
membuktikan pengucapannya enak didengar.

Perhatikan khusus: **S15 dibaca per-scene**, jadi temponya bisa terasa berbeda
dari empat belas yang lain; dan **S9 & S14** menjatuhkan istilah Inggris
(gradient descent, transformer) di kalimat terakhir.

<!-- Catatan lama, ditinggalkan sebagai jejak:
**Kelima belas MP4 di `out/` masih BISU dan bersubtitel preview.** Kotak oranye
"SUBTITEL PREVIEW" di bawah layar adalah penanda bahwa VO-nya belum ada — ia
hilang sendiri begitu `public/vo/neural-network/<kunci>.mp3` ada
([docs/11](../../../docs/11-rencana-vo.md)), tanpa saklar yang perlu dimatikan
tangan. Jangan unggah sebelum itu. -->
