Anggaran: durasi 3,49 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap, dua gerakan berurutan.

1. ibu jari menekan tombol kirim. gelembung "Halo, apa kabar?" naik dari kolom
   ketik ke ruang percakapan. lalu ia bergerak ke TEPI layar, dan tepat saat
   menyeberanginya ia MENGERAS jadi paket — sudutnya menajam, lebarnya menyusut,
   warnanya tetap. kamera ikut paketnya keluar; HP-nya bergeser keluar bingkai.
   (VO: "Pesanmu tidak langsung muncul di ponsel temanmu.")
   TEKS LAYAR: "Ia jalan dulu."

motion:
   - tekan: `tPP()` pada skala tombol, 1 → 0,84 → 1, durasi 0,32
   - gelembung naik: `masuk()` geser -26, `E.expoOut`
   - gelembung → paket: SATU nilai untuk radius sudut DAN lebar, rentang yang
     sama. dua tween terpisah membuat sudutnya selesai lebih dulu dari
     lebarnya, dan bentuk antaranya terbaca sebagai bentuk ketiga
   - kamera ikut: `translate` pada grup, bukan `scale` — besarnya benda tidak
     berubah, cuma bagian panggung yang terlihat

catatan:
   - **PERUBAHANNYA TERJADI TEPAT DI TEPI LAYAR**, bukan sebelum atau sesudahnya.
     itu yang membuat "berubah jadi kiriman" terbaca sebagai akibat dari keluar,
     bukan sebagai efek yang kebetulan jalan.
   - **warnanya TIDAK berubah.** bentuk boleh berubah, warna tidak — itu yang
     menjaga penonton membacanya sebagai benda yang sama. perubahan warna baru
     terjadi di Short 3, saat ia dikunci.
   - **paketnya `Paket` dari `../../panggung-kiriman.tsx`**, dengan tiga bilah
     putih di dalamnya = kalimat yang masih terbaca. bilah itu yang nanti hilang
     di Short 3.
