# 2-belum-tahu — ketegangan

Anggaran: dihitung `npm run gen`. Target unggahan `0:03–0:07`.

**Frame pertamanya = frame terakhir `1-cara-belajar`:** jaringan redup di posisi
yang sama, denyut baru saja habis. Yang masuk sesudahnya cuma satu benda baru.

Tugas scene ini: membuat penonton **melihat** salahnya, bukan diberi tahu bahwa
ada yang salah.

## Di layar

1. satu contoh masuk **dari atas** — kartu kecil bergambar kucing, digambar
   sederhana, bukan foto. ia turun dan berhenti **di antara** baris teks layar
   dan baris simpul teratas; ruangnya sempit (y 391–523), dan itu yang menentukan
   ukurannya, bukan selera.

2. denyut lewat ke bawah, jaringannya menyala sebentar, lalu satu jawaban keluar
   **di bawah jaringan**: kartu bertuliskan **ANJING**.

3. di bawahnya lagi muncul kartu kedua, lebih redup: **KUCING**, dengan kapsi
   kecil **SEHARUSNYA** di atasnya — bukan satu kartu panjang berisi keduanya.
   kartu selebar itu (620 px) menabrak batang meleset yang masuk di scene 3.
   di antara keduanya menganga **jarak** yang jelas terlihat — jarak itulah yang
   nanti mengecil di scene 4. teks layar: **JAWABANNYA SALAH**

## Kamera

Diam. Penonton sedang membaca dua kartu dan membandingkannya — dorongan kamera
di sini justru menariknya keluar dari perbandingan itu (docs/03; unggahan § 15
"Hold the Camera When: the viewer needs to read text").

## Gerak

- kartu masuk: turun, `E.power1out`, 0,4 dtk. docs/03 memasangkan "mengalir"
  dengan gerak mendatar — di sini alirannya sendiri yang diputar 90° (scene 1),
  jadi turun **adalah** mendatarnya
- jawaban keluar: `masuk()` pop kecil, `E.backOut(1.05)`
- kartu "seharusnya": `masuk()` 0,25 dtk sesudahnya — **terlambat sedikit**,
  supaya jawabannya sempat dibaca dulu sebelum dibandingkan
- selisihnya: garis penghubung pendek antara dua kartu, `gambarGaris()` 0,3 dtk

## Kotak aman

Dua kartu jawaban ditumpuk **vertikal di tengah**, bukan berdampingan kiri-kanan.
Kartu kanan akan jatuh di balik rail tombol (`x > 920`), dan yang hilang di situ
justru kartu yang membuat scene ini berarti. Kartu terbawah tetap di atas
`y 1480` — di bawah itu judul dan nama channel.

## Dari unggahan

> **VO:** "It doesn't start by knowing the answer."
> **VO Direction:** Calm, explanatory. Emphasize "doesn't start."
> **Animation:** A simple input enters the network. The network produces an
> incorrect output. Show: INPUT → NETWORK → WRONG ANSWER. Do not introduce
> technical terms such as weights or backpropagation yet.
> **Camera:** Hold mostly steady so the viewer can understand the sequence.
> **On-Screen Text:** WRONG PREDICTION

## Catatan

- **Yang dilarang unggahan di scene ini sama dengan yang dilarang HARD RULE 6:**
  tidak ada "bobot", tidak ada "backpropagation", tidak ada "prediksi". Kata
  sehari-hari dulu — "jawaban", "tebakan", "salah".
- **Salahnya harus terlihat, bukan tertulis.** Kalau teks "JAWABANNYA SALAH"
  dihapus dan penonton masih tahu ada yang meleset, scene ini benar.
- Frame terakhir: dua kartu berdampingan vertikal + jaringan di belakangnya.
  `3-tebak-cek-geser` membuka dengan keduanya masih di tempat.
