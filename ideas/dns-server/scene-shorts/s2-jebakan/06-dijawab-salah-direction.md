Anggaran: mulai 29,36 dtk · durasi 6,58 dtk (estimasi, VO belum jadi).
Dua beat. Yang ditukar bukan cuma bantahan, melainkan **hadiahnya**: penonton
datang mencari kecepatan dan pulang membawa sesuatu yang lebih berguna. Ini yang
dijanjikan scene 2.

1. bukan itu yang berubah (beat 0):
   - bilah waktu dan label-labelnya memudar keluar; lantai, sosok, loket baru,
     dan tujuan tetap
   - satu kartu nama masuk ke jendela loket dari arah sosoknya
   (VO: "Yang benar-benar berubah biasanya hal lain.")

2. dijawab salah, lalu dijawab benar (beat 1):
   - dua kartu naik **bersamaan** di tengah layar, berdampingan
   - yang kiri berlabel "loket lama" dan isinya tanda silang; yang kanan berlabel
     "loket baru" dan isinya nomor
   (VO: "Nama yang tadinya dijawab salah, sekarang dijawab benar.")

teks di layar:
   beat 0 → "Yang berubah hal lain."
   beat 1 → "Dijawab salah → dijawab benar."

catatan komposisi:
   - **pemblokiran tidak disebut dengan namanya, dan tidak disebut siapa yang
     memblokir.** Yang digambar cuma mekanismenya. Ini video mekanisme; begitu ia
     menyebut lembaga, ia jadi video lain yang tidak bisa ditonton dua tahun lagi.
   - **dua kartu berdiri BERSAMAAN**, bukan bergantian. Kalimatnya perbandingan;
     menampilkannya berurutan mengubahnya jadi dua pernyataan, dan yang kedua
     akan terbaca sebagai satu-satunya yang benar.
   - **kartu silang dan kartu nomor memakai `<Kartu>` yang sama** — bedanya cuma
     isinya. Dua komponen berbeda cepat atau lambat jadi dua gambar berbeda, dan
     perbandingannya berhenti berlaku.
   - tanda silangnya memakai `<Tanda>` dari `../jalur-tanya.tsx`, bentuk yang
     sama dengan yang dipakai scene 9.

motion:
   - bilah & label: opacity 1→0, 0,45 dtk, mulai beat 0
   - kartu nama: sosok → jendela loket, `power2inout`, 0,6 dtk, mulai beat 0 + 0,5
   - dua kartu hasil: `masuk()` geser 36px, `expoOut`, 0,55 dtk, **mulai
     bersamaan** di beat 1 + 0,15 — tanpa stagger, itu bagian dari maksudnya
   - tanda silang & label: opacity 0→1, 0,3 dtk, mulai beat 1 + 0,5
