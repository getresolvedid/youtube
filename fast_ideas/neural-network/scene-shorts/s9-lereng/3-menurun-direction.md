# 4-turun — payoff kedua

Anggaran: dihitung `npm run gen`. Target unggahan `0:13–0:20`.

**Frame pertamanya = frame terakhir `3-lereng`:** lereng + bola di kanan atas.

## Di layar

1. **sepotong garis singgung** muncul tepat di bawah bola — pendek, cuma
   sepanjang kaki bolanya, miring mengikuti kemiringan lereng di titik itu.
   teks layar: **YANG TERLIHAT CUMA INI**

2. bola **melangkah menurun** empat kali. tiap langkah: garis singgung berputar
   mengikuti kemiringan baru, lalu bola bergeser. langkahnya **memendek**
   mendekati dasar, karena lerengnya makin landai.

## Kamera

Diam. Bola sudah bergerak; kamera yang ikut bergerak membuat langkahnya tidak
terukur.

## Gerak

- garis singgung: sudutnya dihitung dari turunan kurva di posisi bola — **bukan**
  sudut yang diketik per langkah, supaya ia tidak pernah meleset dari kurvanya
- langkah: posisi bola fungsi murni dari detik, empat langkah `E.power2out`
- jeda kecil (±0,15 dtk) antar-langkah — tanpa jeda, empat langkah terbaca
  sebagai satu luncuran

## Kotak aman

Seluruh lintasan bola di dalam `x` 160–920. Teks layar tetap di `y` 300.

## Catatan

- **Garis singgungnya PENDEK, dan itu inti seluruh Short.** Yang bisa dilihat
  jaringan cuma kemiringan di titik tempatnya berdiri, bukan seluruh lereng.
  Kalau garisnya digambar panjang, penonton menyimpulkan jaringan sudah tahu di
  mana dasarnya — persis kebalikan dari yang benar.
- **Langkah memendek mendekati dasar**, karena kemiringannya mengecil. Itu benar
  secara mekanisme dan sekaligus yang membuat bola berhenti tanpa direm.
