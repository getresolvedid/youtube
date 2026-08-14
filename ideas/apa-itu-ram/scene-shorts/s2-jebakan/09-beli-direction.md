Anggaran: mulai 47,77 dtk · durasi 4,69 dtk (estimasi, VO belum jadi).
Satu beat. Kalimat keputusan, dan layar harus memperlihatkan KEDUA jawabannya
sekaligus.

1. layar terbelah dua, dari atas ke bawah:
   - KIRI — meja yang penuh (dari scene 6) dilebarkan: berkas yang menggantung
     langsung mendarat, bolak-balik berhenti, hitungannya membeku dan meredup
   - KANAN — meja yang longgar (dari scene 4) dilebarkan: berkasnya tetap
     empat, tangan tetap seirama, separuh kanan tetap kosong
   - keduanya berdiri BERSAMAAN sampai scene habis
   (VO: "Kalau iya, nambah ram membantu. Kalau tidak, tidak sama sekali.")

teks di layar:
   kiri  → "penuh → nambah membantu"        (`--accent`)
   kanan → "belum penuh → tidak ngefek"     (`--ink-2`)
   bawah, kecil dan redup → "cara kerjanya → video panjang"
           ← inilah CTA-nya, dan ia TIDAK diucapkan (`09-beli-vo.md` § Catatan)

catatan komposisi:
   - **dua sisi muncul bersamaan, bukan bergantian.** Kalimatnya perbandingan;
     berurutan mengubahnya jadi dua pernyataan, dan yang kedua akan terbaca
     sebagai yang benar.
   - di 9:16, "terbelah dua" berarti ATAS dan BAWAH, bukan kiri dan kanan —
     tapi keduanya harus tetap muat di kotak aman y 240–1480. Tiap sisi dapat
     sekitar 560px; mejanya digambar lebih kecil, dan itu satu-satunya scene
     yang boleh mengubah skala meja.
   - hitungan bolak-balik di sisi atas yang MEMBEKU adalah pembayaran scene 7
     dan 8. Ia harus masih terbaca angkanya, bukan hilang.
   - CTA kecil dan redup, di bawah kedua sisi, di dalam kotak aman bawah
     (y ≤ 1480 — di bawah itu tertutup UI YouTube, docs/03).

motion:
   - belahan masuk: keduanya `expoOut` 0,5 dtk, mulai di frame yang sama
   - berkas menggantung mendarat: `backOut(1.4)`, jatuh 0,2 dtk setelah belahan
   - hitungan membeku: berhenti keras, lalu fade ke opasitas 0,5
