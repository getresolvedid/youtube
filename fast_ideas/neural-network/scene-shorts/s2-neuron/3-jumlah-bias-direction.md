# 3-jumlah-bias — payoff

Anggaran: dihitung `npm run gen`. Target peta `0:08–0:17`.

**Frame pertamanya = frame terakhir `2-tiga-masuk`:** tiga angka menggantung di
atas simpul besar, ketebalan sambungan sudah berbeda.

## Di layar

1. ketiga angka bergerak masuk ke pusat simpul dan **melebur jadi satu angka**
   besar: `1,24`.

2. dari kanan meluncur masuk sebuah kapsul **`+ 0,30`**, berwarna beda dari
   angka masukan. ia lenyap ke dalam angka besar itu, dan angkanya berubah jadi
   **`1,54`**. teks layar: **DIJUMLAH + PENGGESER**

## Kamera

Diam. Yang berubah angka, dan angka cuma terbaca berubah kalau bingkainya tidak
ikut bergerak.

## Gerak

- tiga angka ke pusat: `t()` pada x dan y bersamaan, `E.power2out` 0,5 dtk
- angka jumlah: `masuk()` `E.backOut(1.1)` tepat saat ketiganya tiba
- kapsul bias: meluncur mendatar 0,5 dtk lalu memudar di titik leburnya

## Kotak aman

Angka besar di pusat simpul (`y` ±976). Kapsul bias berhenti di dalam `x` 90–920
— ia masuk dari kanan, jadi titik berangkatnya yang harus dijaga, bukan titik
berhentinya.

## Dari unggahan

> **VO:** "It combines those weighted inputs, adds a bias, and calculates a value."
> **Animation:** inputs converge into Σ; bias enters; result appears.
> **Text:** WEIGHTED SUM + BIAS

## Catatan

- **Bias masuk DARI SAMPING, bukan lewat sambungan.** Ia bukan masukan keempat,
  dan itu seluruh bedanya — kalau ia datang seperti yang lain, penonton
  menghitungnya sebagai masukan biasa.
- **Angkanya harus benar-benar berjumlah.** 0,90 + 0,04 + 0,30 = 1,24; 1,24 +
  0,30 = 1,54. `NILAI` dihitung di `panggung-neuron.tsx`, tidak diketik.
- **Kata "bias" tidak diucapkan di sini** — namanya jatuh di Episode 03, yang
  memang seluruhnya tentang bobot dan bias.
