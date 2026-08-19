# 4-langkah-kecil — payoff kedua

Anggaran: dihitung `npm run gen`. Target peta `0:16–0:23`.

**Frame pertamanya = frame terakhir `3-menurun`:** bola sudah bergeser sedikit
ke arah menurun, garis singgung masih terpasang.

## Di layar

1. bola **melangkah empat kali** menuruni lereng. tiap langkah lebih pendek dari
   yang sebelumnya, karena lerengnya makin landai.

2. di sumbu kiri, **penanda tinggi meleset ikut memendek** tiap langkah, dan
   satu garis putus-putus menghubungkannya ke posisi bola.
   teks layar: **LANGKAH KECIL · BERKALI-KALI**

## Kamera

Diam. Bola sudah bergerak; kamera yang ikut bergerak membuat langkahnya tidak
terukur.

## Gerak

- langkah: posisi bola fungsi murni dari detik, empat tahap `E.power2out`
- jeda kecil antar-langkah — tanpa jeda, empat langkah terbaca sebagai satu
  luncuran
- penanda meleset: panjangnya mengikuti tinggi bola, bukan animasi terpisah

## Kotak aman

Seluruh lintasan bola dan penanda sumbu di dalam `x` 90–920.

## Dari unggahan

> **VO:** "Small steps repeated over and over can bring the loss down."
> **Animation:** ball takes several small steps toward a valley.
> **Text:** SMALL STEPS

## Catatan

- **Langkahnya memendek mendekati dasar.** Itu benar secara mekanisme, dan
  sekaligus yang membuat bola berhenti tanpa direm.
- **Penanda meleset di sumbu adalah buktinya.** Tanpa itu, "melesetnya turun"
  cuma kalimat VO — yang terlihat cuma bola bergerak ke kiri.
