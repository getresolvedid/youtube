# 6-berikutnya — gantungan ke Episode 10

Anggaran: dihitung `npm run gen`. Target peta `0:28–0:30`.

**Frame pertamanya = frame terakhir `5-dasar`:** bola diam di dasar, lereng
tinggal siluet, nama GRADIENT DESCENT masih terbaca.

**SCENE INI BARU 2026-08-19** — versi lama Short ini menutup seri tanpa
gantungan (naskah § Bentrok tercatat 3).

## Di layar

1. seluruh lereng **menyusut** dan bergeser ke pojok, jadi satu kotak kecil.

2. tiga kotak lain muncul mengelilinginya — **TEBAK · UKUR · MUNDUR · SETEL** —
   dan lereng tadi menempati kotak keempat. teks layar: **BERIKUTNYA · LATIHAN**

## Kamera

Tidak ada gerak kamera; yang menyusut bendanya. Kamera yang ikut menarik mundur
membuat penyusutannya tidak terbaca sebagai "ini bagian dari yang lebih besar".

## Gerak

- susut: `E.sineInOut` 0,7 dtk, sekaligus bergeser — satu gerakan, bukan dua
- empat kotak: `masuk()` bertahap 0,12 dtk

## Kotak aman

Keempat kotak di dalam `x` 90–920 dan `y` 240–1480.

## Dari unggahan

> **VO:** "Put it all together, and you get training."
> **Text:** NEXT: TRAINING

## Catatan

- **Yang digantung benda di layar** — empat kotak yang baru muncul — bukan
  episodenya (HARD RULE 7).
- **Lereng jadi SATU dari empat kotak**, bukan hilang. Itu yang membuat Episode
  10 terasa merangkum, bukan mengganti topik.
