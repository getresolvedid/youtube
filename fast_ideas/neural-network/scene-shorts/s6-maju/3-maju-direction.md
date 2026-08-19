# 3-maju — payoff

Anggaran: `npm run gen`. Target peta `0:08–0:16`.

**Frame pertamanya = frame terakhir `2-masuk`:** lapis pertama menyala.

## Di layar

1. denyut berjalan dari lapis pertama ke lapis tengah; simpul yang dilewatinya
   menyala, yang ditinggalkan meredup. teks layar: **MAJU**

2. denyut berlanjut ke simpul keluaran dengan **tempo yang sama**.

## Kamera

Diam.

## Gerak

- denyut: `E.sineInOut`, satu tween menyeberangi dua lapis — bukan dua tween
  yang disambung, supaya temponya tidak patah di tengah
- nyala simpul: fungsi POSISI denyut (`nyalaLapis`), bukan fungsi detik

## Kotak aman

Jaringan, angka, dan kartu di dalam `x` 90–920 dan `y` 240–1480.

## Dari unggahan

> **VO:** "Each neuron calculates a value and passes it to the next layer."
> **Animation:** signals propagate layer by layer. **Text:** FORWARD

## Catatan

- **Temponya TETAP.** Perjalanan yang makin cepat terbaca sebagai "dipercepat",
  bukan sebagai "lapis demi lapis".
