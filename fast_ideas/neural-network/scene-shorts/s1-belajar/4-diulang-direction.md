# 4-diulang — payoff kedua: gelungnya berputar

Anggaran: dihitung `npm run gen`. Target unggahan `0:17–0:24`.

**Frame pertamanya = frame terakhir `3-tebak-cek-geser`:** jaringan dengan tiga
sambungan yang sudah berubah, denyut baru mulai berjalan. Scene ini **meneruskan
denyut itu**, tidak memulai denyut baru.

Tugasnya: mengubah tiga tahap tadi jadi satu **gelung** yang jelas berputar, dan
membuat penonton melihat gelung itu jadi makin benar tiap putaran.

## Di layar

1. jaringan **mengecil (0,85) dan bergeser ke kanan**; di kiri yang kosong
   muncul gelung tiga tahap sebagai **kolom** — **TEBAK / MELESET / GESER** —
   dengan panah yang pulang dari tahap ketiga ke tahap pertama.

   **Kolom, bukan lingkaran.** Gelung yang benar-benar melingkari jaringan
   menaruh salah satu labelnya di `x > 920`, di balik rail tombol; yang
   dikorbankan kalau tetap dipaksa bukan estetikanya, melainkan satu dari tiga
   tahap yang jadi isi Short ini. Yang membuatnya terbaca berputar bukan bentuk
   lingkarannya, melainkan **kepala panah yang pulang ke atas**.

2. gelung berputar. tiap putaran: denyut lewat, batang "meleset" muncul, lalu
   **memendek dibanding putaran sebelumnya**. tiga putaran cukup — putaran
   keempat tidak menambah apa pun, cuma memakan detik.

3. putaran terakhir: batangnya tinggal sisa, kartu "seharusnya" memudar, dan
   kartu jawaban yang keluar akhirnya **KUCING** berwarna benar. teks layar:
   **MENANGKAP POLA**

   **Jaraknya tidak pernah nol selagi kedua kartu ada.** Ada lantai 145 px —
   tinggi kartunya plus napas. Tanpa itu, putaran ketiga menaruh kartu jawaban
   tepat di atas kartu "seharusnya", dan dua kartu yang saling menutupi terbaca
   sebagai cacat render, bukan sebagai tebakan yang makin dekat.

## Kamera

Ditarik mundur pelan di 0,6 detik pertama (`scale` 1,0 → 0,85, sekaligus
bergeser +110 px ke kanan) — yang dijelaskannya:
yang tadi dilihat dari dekat ternyata satu putaran dari banyak putaran. Berhenti
bergerak sebelum kartu **KUCING** muncul, supaya kejutan terakhirnya dibaca di
frame yang diam.

## Gerak

- gelung berputar: satu putaran ≈ sepertiga anggaran scene, ketiga putaran
  identik kecepatannya — **percepatan tiap putaran itu godaan yang harus
  ditolak**; yang berubah panjang batangnya, bukan temponya
- batang meleset: panjangnya turun bertahap tiap putaran (mis. 100% → 55% → 15%),
  murni fungsi frame — tidak ada state yang dibawa antar-putaran
  (CLAUDE.md § Deterministik)
- kartu KUCING: `masuk()` `E.backOut(1.1)`, satu-satunya gerak di detik itu
- jaringan "jadi rapi": jitter posisi simpul diinterpolasi ke nol, `E.inOutQuad`

## Kotak aman

Gelung tiga tahapnya **melingkari** jaringan, jadi label "GESER" gampang jatuh di
`x > 920`. Kalau lingkarannya tidak muat di kotak aman, yang dikecilkan
lingkarannya — bukan labelnya, dan bukan kotak amannya.

## Dari unggahan

> **VO:** "Repeat that process again and again, and the network gradually learns
> patterns."
> **VO Direction:** Slightly increase energy during "again and again." Slow down
> slightly on "gradually learns patterns."
> **Animation:** Repeat: PREDICT → ERROR → ADJUST. The prediction becomes
> progressively more accurate. The final pass produces the correct result. The
> network becomes visually organized and stable.
> **Camera:** Slow pull back to reveal the entire network.
> **On-Screen Text:** LEARN PATTERNS

## Catatan

- **Nilai melesetnya 1 → 0,6 → 0,25 → 0**, memendek di ekor tiap putaran
  (menahan dulu, baru mengecil) supaya "tiap putaran" terbaca sebagai langkah,
  bukan sebagai luncuran mulus.
- **Tiga putaran, bukan lima.** Anggarannya tujuh detik; putaran keempat memakan
  waktu tanpa menambah pemahaman, dan Short yang kehabisan detik di sini akan
  memotong `5-intinya` — satu-satunya scene yang menyebut namanya.
- **Yang membuktikan "belajar" adalah batang yang memendek**, bukan kata
  "belajar" di layar. Kalau batangnya dihapus, scene ini cuma animasi berputar.
- Frame terakhir: jaringan rapi + kartu **KUCING** + gelung tiga tahap masih
  terlihat. `5-intinya` menyederhanakan frame ini, tidak menggantinya.
