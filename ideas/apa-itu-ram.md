---
judul: Apa itu RAM
diusulkan: 2026-08-13
pilar: P1 · Cara Kerja Sehari-hari
lapis: umum
status: lolos → T01
---

# Apa itu RAM

## Ide mentah

> "apa itu ram"

## Penjelasan 5 tahun (draf)

> RAM itu meja kerja, hard disk itu lemari arsip. Kamu tidak membaca dokumen di
> dalam lemari — kamu ambil, taruh di meja, baru kerjakan. Meja lebih besar
> berarti lebih banyak yang terbuka sekaligus tanpa bolak-balik. Kalau meja
> penuh, berkas mulai ditumpuk di lantai.

*(54 kata, nol istilah teknis.)*

**Titik putus analogi:** meja tetap berisi saat kamu pulang; RAM kosong total
begitu listrik mati. Dan CPU tidak mengambil langsung dari meja — ada meja jauh
lebih kecil yang menempel di CPU, namanya cache. Keduanya **wajib** disebut di
VO, bukan cuma dicatat di sini.

## Uji 4 syarat

| Syarat | Lolos? | Catatan |
|---|---|---|
| 1 Bahasa anak 5 tahun | ✅ | Analogi meja–lemari, 54 kata |
| 2 Dua lapis (L1 + L3) | ✅ | L1: meja kerja. L3: hierarki cache, angka latensi, locality, kapan tambah RAM tidak berguna |
| 3 Ada mekanisme | ✅ | Data berpindah antar tingkat, meja penuh → swap, refresh DRAM — semuanya bergerak dan enak dianimasikan |
| 4 Bisa diverifikasi | ⚠ | **Angka latensi masih perlu sumber primer** — lihat catatan di bawah |

## Sudut video panjang

Kenapa komputer butuh **dua** tempat penyimpanan yang berbeda, bukan satu yang
besar. Alurnya:

1. **Hook (L1)** — kamu buka aplikasi, kenapa yang pertama lambat dan yang kedua
   langsung muncul?
2. **Fondasi (L1→L2)** — meja & lemari, lalu dinamai: RAM & penyimpanan. Titik
   putus analogi disebut di sini.
3. **Mekanisme (L2)** — hierarki register → cache → RAM → SSD, dengan skala waktu
   yang dibuat bisa dibayangkan manusia. Lalu apa yang terjadi saat meja penuh
   (swap), dan kenapa RAM harus disegarkan ribuan kali per detik hanya untuk
   mengingat — itu sebabnya ia lupa saat listrik mati.
4. **Realita (L3)** — kapan menambah RAM benar-benar membantu dan kapan sama
   sekali tidak; indikator mana yang harus dilihat sebelum membeli (bukan
   "RAM terpakai", tapi aktivitas swap/paging).

## Sudut dua Shorts

- **Nugget — skala waktu dibuat manusiawi.** Kalau mengambil data dari cache itu
  terasa 1 detik, dari RAM sekitar satu menit, dan dari hard disk berputar
  sekitar dua bulan. Satu animasi, satu insight, berdiri sendiri tanpa perlu
  menonton video panjangnya.
- **Jebakan — "RAM lebih besar = komputer lebih cepat."** Hanya benar sampai
  mejanya cukup besar untuk pekerjaanmu; setelah itu tambahan RAM tidak memberi
  apa-apa. Tunjukkan indikator yang benar sebelum membeli.

Keduanya berbeda insight, tidak saling menggantikan.

## Catatan

**Yang belum beres — angka latensi.** Rasio antar tingkat (cache ≈ nanodetik,
RAM ≈ puluhan nanodetik, SSD ≈ puluhan mikrodetik, HDD ≈ milidetik) itu urutan
besaran yang aman, tapi angka spesifik yang akan disebut di layar **belum punya
sumber primer**. Pencarian awal hanya menemukan sumber sekunder.

Sebelum naskah dibekukan, angkanya harus ditopang salah satu dari:

- manual optimasi resmi Intel/AMD,
- datasheet JEDEC untuk DDR5,
- atau pengukuran sendiri di mesin ini (`mlc`, `lmbench`) — hasilnya dicatat
  sebagai "diukur di <spesifikasi mesin>", bukan diklaim sebagai angka universal.

Opsi ketiga justru paling jujur dan paling enak untuk video: angka yang diukur
sendiri, dengan mesinnya disebutkan.

**Peluang visual yang kuat:** seluruh hierarki digambar sebagai jarak fisik —
cache di meja, RAM di rak sebelah, SSD di gudang lantai bawah, HDD di kota lain.
Skala jaraknya dibuat proporsional dengan latensi sungguhan.
