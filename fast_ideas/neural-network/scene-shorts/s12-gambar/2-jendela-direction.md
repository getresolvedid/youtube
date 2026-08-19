# 2-jendela — ketegangan

Anggaran: `npm run gen`. Target peta `0:03–0:08`.

**Frame pertamanya = frame terakhir scene sebelumnya.**

## Di layar

1. satu sel disorot sendirian, lalu sorotannya **dibatalkan** — itu cara yang
   salah.

2. kotak jendela 3×3 menyapu kisi, **sepetak demi sepetak**, dari kiri atas ke
   kanan bawah. teks layar: **SEPETAK DEMI SEPETAK**

## Kamera

Diam. Kisi adalah benda yang harus dibaca posisinya; kamera yang bergerak
membuat sapuan jendela tidak terukur.

## Gerak

- sapuan: posisi jendela `Math.floor` dari detik — melompat per petak, bukan
  meluncur mulus

## Kotak aman

Kisi gambar dan ketiga kisi hasil di dalam `x` 90–920 dan `y` 240–1480. Kisi
hasil yang terkanan tidak melewati `x 880`.

## Dari unggahan

> **VO:** "Instead of treating every pixel as a complete idea, a convolution
> looks at local regions." **Text:** LOCAL FEATURES

## Catatan

- **Sapuannya harus terlihat SEPETAK DEMI SEPETAK.** Yang dijelaskan justru
  bahwa ia membaca daerah kecil satu per satu; luncuran mulus menghapusnya.
