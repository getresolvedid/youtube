Anggaran: durasi ±12,3 dtk (estimasi, VO belum jadi).
Dua baris VO = dua tahap.

Scene terakhir seluruh seri.

1. panggung bersih. gembok besar di tengah, MENUTUP di sekeliling satu ikon isi.
   lalu judul "APA ITU ENKRIPSI?" dan definisinya mendarat di bawahnya. gembok
   mundur ke belakang — memudar dan mengecil, tapi TIDAK dihapus.
   (VO: "Singkatnya, enkripsi adalah proses mengubah data menjadi bentuk yang tidak mudah dibaca tanpa kunci yang tepat.")
   TEKS LAYAR: "APA ITU ENKRIPSI?" + definisinya

2. definisinya memudar. gembok kembali ke depan. ikon-ikon sehari-hari muncul
   mengelilinginya — gelembung chat, aplikasi, halaman, dokumen. satu baris
   terakhir mendarat. frame terakhir ditahan tanpa gerakan.
   (VO: "Itulah cara enkripsi membantu melindungi informasi kita di dunia digital.")
   TEKS LAYAR: "ENKRIPSI = MELINDUNGI DATA"

motion:
   - gembok menutup: nilai `terbuka` 1 → 0, sengkangnya turun. ia menutup DI
     ATAS ikon isinya — tanpa isi di dalamnya, gembok yang menutup tidak menutup
     apa-apa
   - mundur: opasitas 1 → 0,45 dan skala 1 → 0,8 di rentang yang sama, lalu
     kembali penuh di tahap 2
   - ikon: `masuk()` dengan `urutan`, jeda 0,1 — berdatangan berurutan. posisinya
     DITULIS di larik, bukan dihitung acak
   - tidak ada gerakan sama sekali di detik terakhir

catatan:
   - **HARD RULE 2 dipenuhi gembok + ikonnya, bukan teksnya.** layar penuh teks
     di detik terakhir adalah slide, dan slide di feed Shorts adalah tempat orang
     menggeser. karena itu gemboknya tidak pernah dihapus saat definisinya
     mendarat — ia cuma mundur.
   - **ikonnya dari `shared/Icons.tsx`** lewat `<use href="#ic-…">`, bukan
     digambar ulang. belum ada ikon "HP" dan "laptop" di sprite itu; sementara
     dipakai `app` dan `browser`.
   - **tidak ada logo getresolved di scene ini** — ia terbatas di tanda brand,
     yang datang tepat sesudahnya (docs/10).
   - **frame terakhir benar-benar diam.** di feed, satu detik diam memberi
     penonton waktu memutuskan mengulang — dan yang mengulang itu yang dihitung.
