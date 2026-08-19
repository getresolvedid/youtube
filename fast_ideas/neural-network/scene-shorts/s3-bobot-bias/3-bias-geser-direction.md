# 3-bias-geser — payoff

Anggaran: `npm run gen`. Target peta `0:08–0:16`.

**Frame pertamanya = frame terakhir `2-pengaruh`.**

## Di layar

1. di bawah simpul muncul **garis bilangan** mendatar dengan penanda hasil
   berdiri di tengahnya.

2. sebuah **kapsul penggeser** muncul di samping simpul, angkanya naik lalu
   turun — dan **penanda hasil ikut bergeser** ke kanan lalu ke kiri.
   teks layar: **PENGGESER**

## Kamera

Diam. Yang harus terbaca perpindahan relatif terhadap garis; kamera yang bergerak
membuat perpindahan itu tidak terukur.

## Gerak

- garis bilangan: `gambarGaris()` 0,4 dtk
- kapsul: angkanya berubah `tPP()` sekali — naik lalu kembali
- penanda: posisinya **fungsi dari angka kapsulnya**, bukan tween terpisah

## Kotak aman

Garis bilangan `x` 180–900; penanda tidak pernah keluar dari rentang itu.

## Dari unggahan

> **VO:** "A bias gives the neuron an adjustable starting point."
> **Animation:** number line shifts as bias changes. **Text:** BIAS = OFFSET

## Catatan

- **Yang bergerak penandanya, bukan garisnya.** Garis yang ikut bergeser
  menghilangkan patokan, dan tanpa patokan "bergeser" tidak berarti apa-apa.
- **Kapsulnya bentuk yang sama dengan kapsul bias di Episode 02.**
