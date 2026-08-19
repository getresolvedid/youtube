# 3-tebak-cek-geser — payoff, tiga tahap

Anggaran: dihitung `npm run gen`. Target unggahan `0:07–0:17` — scene terpanjang
di Short ini, dan satu-satunya yang punya tiga tahap.

**Frame pertamanya = frame terakhir `2-belum-tahu`:** dua kartu jawaban masih di
tempat, jaringan di belakangnya.

Satu kalimat VO, tiga tahap visual. Tiap tahap punya satu gerak utama — tidak
pernah dua benda bergerak bersamaan (unggahan § 14 "One Main Motion at a Time",
sejalan docs/03).

## Di layar

### Tahap 1 — tebak

denyut berjalan lagi dari atas ke bawah melewati jaringan, kali ini lebih
terlihat: sambungan yang dilewatinya menyala sesaat. dua kartu jawaban tetap di
tempat, cuma diredupkan — kalau keduanya keluar, jarak yang jadi tulang punggung
scene ini ikut hilang. teks layar: **TEBAK**

### Tahap 2 — meleset

kedua kartu kembali terang — kartu jawaban **ANJING** dan kartu **KUCING**
berkapsi **SEHARUSNYA** — dan **jarak tegak di antara keduanya** ditandai
batang beserta ujung atas-bawahnya, di kanan kedua kartu (x 782) — inilah
"seberapa meleset". batang inilah satu-satunya benda di Short ini yang bisa
memendek, dan memendeknya di `4-diulang` adalah satu-satunya bukti bahwa
jaringannya belajar.
teks layar: **MELESET**

### Tahap 3 — geser

kamera tidak pindah; yang berubah **tiga sambungan** di dalam jaringan: yang satu
menebal, yang dua menipis. perubahannya kecil dan bersamaan, sekali saja.
teks layar: **GESER**

Sesudah tahap 3, denyut mulai berjalan lagi dari kiri — **tidak selesai**. Itu
sambungan ke scene berikutnya, dan di situlah scene ini dipotong.

## Kamera

Diam sepanjang tahap 1–2. Dorongan sangat halus masuk di tahap 3, hanya ke area
sambungan yang berubah (`scale` 1,00 → 1,04) — yang dijelaskannya: yang berubah
itu **kecil**, dan tanpa didekatkan penonton tidak akan melihatnya. Ditarik balik
ke 1,00 sebelum scene selesai supaya jahitan ke `4-diulang` tidak melompat.

## Gerak

- denyut: sama persis dengan `1-cara-belajar` — jalur, kecepatan, dan easing yang
  sama. denyut yang berubah bentuk membuat penonton mengira ia benda lain
- batang meleset: tumbuh dari nol, `E.outQuad` 0,35 dtk, warna aksen peringatan
- sambungan menebal/menipis: `stroke-width` diinterpolasi, `E.inOutQuad` 0,5 dtk,
  ketiganya **bersamaan** — ini satu peristiwa, bukan tiga
- teks tahap: yang lama keluar sebelum yang baru masuk, tidak pernah dua sekaligus

## Kotak aman

Batang "meleset" dan ketiga label tahap tinggal di kotak aman. Sambungan yang
berubah **tidak boleh** yang paling kanan — kalau yang bergeser tersembunyi di
balik rail tombol, seluruh tahap 3 hilang tanpa penonton tahu ada yang hilang.

## Dari unggahan

> **VO:** "It makes a prediction, checks how wrong it was, and adjusts itself."
> **VO Direction:** Use three distinct vocal beats: "makes a prediction" /
> "checks how wrong it was" / "adjusts itself." Slight pauses between each beat.
> **Beat 1:** Signal moves through the network. Text: PREDICT
> **Beat 2:** Output appears next to the expected answer. Text: ERROR.
> Visually show the difference.
> **Beat 3:** A few network connections subtly change. Text: ADJUST
> **Beat 4:** Signal begins another pass.

## Catatan

- **Tiga tahap = tiga baris di `-vo.md`, bukan satu kalimat panjang** (HARD RULE 4).
  Satu baris satu beat; itu yang membuat `beat("tebak-cek-geser", 1)` menunjuk
  tahap yang benar tanpa detik diketik tangan.
- **Batang "meleset" adalah benda yang paling penting di Short ini.** Ia satu-
  satunya hal yang bisa mengecil, dan mengecilnya batang itulah yang membuat
  "belajar" terlihat di `4-diulang`. Jangan diganti angka.
- **Belum ada nama apa pun di sini.** Bukan "error", bukan "loss", bukan "bobot".
  Sambungan yang menebal cukup disebut "sambungannya digeser sedikit".
- Frame terakhir: jaringan dengan tiga sambungan yang sudah berubah + denyut yang
  baru mulai berjalan. `4-diulang` melanjutkan denyut itu, bukan memulai yang baru.
