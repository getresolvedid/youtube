# 6-intinya — tutup

Anggaran: `npm run gen`. Target peta `0:24–0:28`.

**Frame pertamanya = frame terakhir scene sebelumnya.**

## Di layar

1. gelung berputar cepat; sorotan berpindah dari kotak ke kotak berkali-kali.

2. kartu contoh berganti-ganti masuk ke kotak pertama. teks layar: **RIBUAN CONTOH**

## Kamera

Diam sepanjang Short ini. Gelung yang berputar sudah jadi gerak utama; kamera
yang ikut bergerak membuat putarannya tidak terbaca.

## Gerak

- putaran: sorotan berpindah dengan `Math.floor` dari detik — fungsi murni,
  tanpa state antar-putaran

## Kotak aman

Keempat kotak gelung di `x` 170–870 dan `y` 720–1120 — seluruhnya di dalam kotak
aman, termasuk saat kartu contoh masuk dari atas.

## Dari unggahan

> **VO:** "Training is this loop repeated across many examples."
> **Animation:** example cards cycle through the loop.

## Catatan

- **"ribuan" sengaja kabur** — jumlah contoh berbeda-beda per model, dan angka
  pasti butuh baris `sumber:` (CLAUDE.md § Aturan kerja).
