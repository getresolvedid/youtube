# 5-bertingkat — tutup

Anggaran: dihitung `npm run gen`. Target unggahan `0:21–0:26`.

**Frame pertamanya = frame terakhir `4-jadi-bentuk`:** kucing utuh di tengah.

Scene ini **membuang**, tidak menambah.

## Di layar

1. kucing dan jaringan memudar jadi siluet.

2. tinggal **tangga tiga anak**, muncul berurutan dari bawah ke atas:
   **POTONGAN → BENTUK → KUCING**. tiap anak tangga lebih tinggi dari yang
   sebelumnya.

## Kamera

Diam.

## Gerak

- tangga: `masuk()` bertahap dari anak terbawah, jeda 0,2 dtk
- siluet: opasitas turun ke 0,08 bersamaan dengan anak tangga pertama

## Kotak aman

Tangga di `x` 200–880, `y` 700–1200. Anak tangga teratas tidak boleh melewati
`y 640` — di atas itu baris teks layar.

## Catatan

- **Tangganya NAIK, bukan mendatar.** Yang harus terbaca "makin lama makin
  besar", dan arah tegak membawa arti itu tanpa satu kata pun (docs/03 §
  Bahasa gerak).
- **Kata "berlapis" jatuh di VO, bukan di layar.** Yang di layar tiga kata
  tangganya — teks yang menyalin VO dilarang unggahan § 16.
