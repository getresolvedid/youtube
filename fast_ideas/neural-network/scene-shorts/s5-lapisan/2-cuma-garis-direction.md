# 2-cuma-garis — ketegangan

Anggaran: dihitung `npm run gen`. Target unggahan `0:03–0:09`.

**Frame pertamanya = frame terakhir `1-satu-lapis`:** jaringan dua lapis, diam.

## Di layar

1. jaringannya menepi ke atas, dan di bawahnya muncul **sebaran titik dua
   warna** — biru dan merah, tersusun sedemikian rupa sehingga tidak ada satu
   garis lurus pun yang bisa memisahkan keduanya.

2. satu **garis lurus** muncul dan berputar mencari posisi. di tiap posisi selalu
   ada titik yang salah sisi; yang salah itu berkedip.
   teks layar: **SELALU ADA YANG SALAH**

## Kamera

Diam. Garis yang berputar sudah jadi gerak utama; kamera yang ikut bergerak
membuat penonton tidak tahu mana yang berubah.

## Gerak

- sebaran titik: `masuk()` bertahap 0,04 dtk antar-titik — cepat, supaya terbaca
  sebagai satu kelompok, bukan sebagai dua puluh benda
- garis berputar: sudutnya `t()` melalui tiga posisi, berhenti di posisi ketiga
- titik salah: opasitas `tPP()` sekali, tidak berulang — kedip berulang terbaca
  sebagai rusak

## Kotak aman

Sebaran titik di `x` 240–840, `y` 900–1340. Titik terluar tidak boleh melebihi
`x 880`: di situ ia masuk rail tombol, dan justru titik terluar yang menentukan
apakah garisnya gagal.

## Catatan

- **Sebarannya harus benar-benar tidak terpisahkan garis lurus** (pola XOR: dua
  kelompok di sudut berseberangan). Kalau sebenarnya bisa dipisah dan cuma
  digambar seolah tidak, seluruh Short ini bohong.
- **Garisnya berhenti, tidak berputar terus.** Berputar sampai scene habis
  terbaca sebagai animasi latar; berhenti terbaca sebagai menyerah.
