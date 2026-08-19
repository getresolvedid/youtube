# 3-ditumpuk — payoff

Anggaran: dihitung `npm run gen`. Target unggahan `0:09–0:15`.

**Frame pertamanya = frame terakhir `2-cuma-garis`:** sebaran titik + garis lurus
yang menyerah, jaringan dua lapis di atasnya.

## Di layar

1. sebaran titik memudar. **satu baris simpul baru turun menyisip** di antara
   baris masukan dan simpul jawaban; sambungan lama putus dan sambungan baru
   tumbuh ke atas dan ke bawah.

2. di atas tiap simpul baru muncul **temuannya** — potongan garis: miring, tegak,
   melengkung. tiga simpul, tiga potongan berbeda.
   teks layar: **LAPIS PERTAMA: POTONGAN**

## Kamera

Diam. Yang bergerak barisan simpul yang menyisip; kamera yang ikut bergerak
membuat sisipannya tidak terbaca sebagai masuk ke tempat kosong.

## Gerak

- baris baru turun: `t()` pada y dari -180, `E.backOut(1.05)` — **mendarat**, dan
  mendaratnya yang membuat "menyisip" terbaca
- sambungan lama: memudar 0,25 dtk sebelum yang baru tumbuh, tidak bersamaan
- sambungan baru: `gambarGaris()` 0,5 dtk, atas dulu lalu bawah

## Kotak aman

Tiga potongan temuan di `y` ±700, tepat di atas simpulnya, dalam `x` 300–780.

## Catatan

- **Potongannya digambar, bukan diberi label.** Garis miring digambar sebagai
  garis miring; menuliskan "tepi miring" di situ mengubah scene jadi daftar.
- **Sambungan lama harus terlihat PUTUS.** Kalau ia cuma tertimpa, penonton
  membaca lapis baru sebagai hiasan yang ditempel, bukan sebagai jalan yang
  sekarang harus dilewati.
