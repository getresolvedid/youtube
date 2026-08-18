Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Empat baris VO = empat tahap, dan ritmenya yang bekerja: tiga kedatangan datar
lalu satu yang tidak.

1. potongan `1` turun ke slot pertama dan MASUK — slot putus-putusnya berubah
   jadi kotak penuh bergaris hijau.
   (VO: "Bagian pertama sampai.")

2. potongan `2` masuk ke slotnya dengan cara yang sama persis. sengaja
   membosankan — pengulangan itu yang membuat tahap 3 patah.
   (VO: "Bagian kedua juga.")

3. potongan `3` turun, lalu MEMUDAR di tengah jalur. tidak meledak, tidak pecah.
   slot ketiga tinggal putus-putus, dan garisnya berubah merah.
   (VO: "Bagian ketiga... hilang.")

4. potongan `4` dan `5` masuk berurutan, cepat. sekarang lubang di slot ketiga
   jadi satu-satunya yang tersisa di barisan.
   teks layar: "Satu tidak sampai."
   (VO: "Bagian keempat dan kelima sampai dengan selamat.")

motion:
   - masuk slot: `t()` pada y sampai titik slot, lalu slot berganti dari
     putus-putus ke penuh (opacity silang, 0,2 dtk)
   - memudar: `t()` pada opacity 1 → 0, `E.power1in`, di sekitar tengah jalur.
     TANPA `getar()`, TANPA skala mengecil
   - slot ketiga: warna garis `t()` dari `--line` ke `--bad` — dilakukan dengan
     dua `<rect>` yang saling menimpa opacity, bukan dengan menginterpolasi warna
   - teks: `masuk()` di tahap 4, bukan di tahap 3 — biar lubangnya dulu yang
     terbaca, kalimatnya menyusul

catatan:
   - **tahap 4 yang bekerja, bukan tahap 3.** saat 4 dan 5 masuk dengan selamat,
     lubang nomor 3 jadi satu-satunya yang tersisa — dan mata menemukannya
     sendiri. kalau scene berhenti di tahap 3, yang terbaca cuma "ada yang
     hilang", bukan "ada lubang di barisan".
   - **jangan menghancurkan potongan 3.** ledakan terbaca sebagai kerusakan luar
     biasa; hilangnya potongan itu peristiwa biasa, dan seluruh Short ini soal
     betapa biasanya ia sampai-sampai ada mekanisme tetap untuk itu.
   - frame terakhir: empat slot terisi, satu lubang merah. frame pertama
     `3-ketahuan` memakai barisan yang sama persis.
