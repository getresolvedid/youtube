# 4-dilatih — payoff kedua

Anggaran: `npm run gen`. Target peta `0:16–0:23`.

**Frame pertamanya = frame terakhir `3-bias-geser`:** garis bilangan + kapsul di
posisi terakhirnya.

## Di layar

1. sepasang kartu **tebakan vs sasaran** muncul dengan jarak yang jelas —
   komponen yang sama dengan Episode 01 dan 07.

2. ketebalan sambungan berubah dan kapsul penggeser bergeser; **jarak kedua
   kartu mengecil**. teks layar: **DISETEL SAAT LATIHAN**

## Kamera

Diam.

## Gerak

- kartu: `masuk()`
- perubahan tebal + geseran kapsul + mengecilnya jarak: **satu tween yang sama**,
  karena ketiganya satu peristiwa
- jarak: memakai `Perbandingan` dengan `selisih` yang menyusut

## Kotak aman

Kedua kartu ditumpuk tegak di tengah; batang selisih di `x` 782, di luar kartu.

## Dari unggahan

> **VO:** "During training, the network changes these values to improve its
> predictions." **Text:** LEARNED VALUES

## Catatan

- **Satu tween untuk tiga perubahan.** Kalau ketiganya animasi terpisah, penonton
  membacanya sebagai tiga kejadian yang kebetulan berdekatan — padahal justru
  hubungannya yang jadi isi scene ini.
