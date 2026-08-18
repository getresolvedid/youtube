Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

Payoff Short 3, dan satu-satunya gerakan ke ATAS di seluruh Short ini.

1. kamera mundur ke skala 1. barisan lima slot terlihat utuh lagi — empat terisi,
   satu berlubang. keempat slot yang tadi meredup kembali terang.
   teks layar: "Lengkap dan urut."
   (VO: "TCP membantu memastikan data diterima secara lengkap…")

2. dari lubang di slot ketiga, satu tanda kecil berjalan **NAIK** menyusuri jalur
   sampai keluar dari tepi atas frame. warnanya beda dari potongan — ia bukan
   kiriman, ia permintaan. teks layar berganti: "Minta lagi yang hilang."
   (VO: "Jika sebuah bagian yang dibutuhkan tidak diterima…")

motion:
   - mundur: `kamera()` skala 1,25 → 1, `E.power2out`, durasi 0,7
   - terang lagi: `t()` pada opacity 0,3 → 1
   - naik: `t()` pada y dari `Y_SLOT` ke luar tepi atas, `E.power1out`,
     durasi 1,4. bentuknya lingkaran kecil `--accent`, bukan kotak bernomor

catatan:
   - **arah naik itu miliknya sendiri.** sebelas beat sebelum ini semuanya turun;
     justru karena itu satu gerakan naik langsung terbaca sebagai "sesuatu yang
     kembali", tanpa perlu label. jangan memakai arah ini untuk apa pun lain di
     Short ini.
   - **permintaannya berangkat DARI LUBANG**, bukan dari tepi bawah frame.
     asalnya yang membuat penonton tahu apa yang diminta.
   - **bentuknya harus beda dari potongan.** kalau ia kotak bernomor, yang
     terbaca potongan yang salah arah.
   - frame terakhir: barisan dengan lubang, permintaan sudah keluar frame. frame
     pertama `5-lengkap` melanjutkan dari situ.
