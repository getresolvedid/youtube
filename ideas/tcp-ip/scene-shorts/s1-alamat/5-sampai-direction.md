Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

Tutup Short 1, dan sambungan loop-nya.

1. potongan turun sedikit lagi dan MASUK ke tujuan — bidangnya menyala hijau
   sekali. di bawahnya muncul rangkuman satu baris:
   `IP = alamat & jalur`.
   (VO: "Jadi, kalau internet adalah sebuah kota besar…")

2. dari atas masuk potongan KEDUA, **tanpa label alamat**. ia sampai di
   persimpangan pertama, berhenti, bergoyang sekali, lalu meredup — tidak ada
   jalur yang menyala untuknya. teks layar: "Tanpa alamat, mentok."
   (VO: "Tanpa alamat tujuan, jaringan tidak akan tahu…")

motion:
   - masuk tujuan: `t()` pada y + `t()` pada opacity potongan → 0 saat menyentuh
   - nyala tujuan: `t()` 0 → 1, durasi 0,35
   - rangkuman: `masuk()` dengan `geser` 22
   - potongan kedua: `t()` pada y, lalu `getar()` kecil, lalu opacity → 0,3

catatan:
   - **potongan kedua wajib komponen `Paket` yang sama**, cuma tanpa prop
     `label`. seluruh beat ini bergantung pada keduanya identik kecuali
     labelnya — bentuk yang sama persis dipakai scene 5 video panjang.
   - **beat 1 adalah loop-nya.** potongan yang mati di persimpangan
     mengembalikan penonton ke pertanyaan frame pertama ("ke mana?"), jadi
     perulangan Short terasa menyambung.
   - **jangan menambah CTA yang menyuruh.** rangkumannya sendiri yang jadi
     ajakan; Short ini berdiri sendiri.
   - frame terakhir: tujuan menyala + potongan kedua yang redup di persimpangan.
     sesudahnya `99-closing` — tanda brand 2 dtk.
