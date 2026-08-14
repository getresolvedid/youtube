Anggaran: mulai 36,40 dtk · durasi 6,58 dtk (estimasi, VO belum jadi).
Dua beat. Bagian yang membuat Short ini **berdiri sendiri**: bukan *bagaimana*
tangganya jalan, tapi **apa yang dibeli** dengan membacanya terbalik. Tanpa
scene ini, Short ini cuma demo animasi.

1. tangganya utuh (beat 0):
   - nama dan semua garis ke loket memudar keluar — yang tersisa cuma tangganya
   - kamera mundur sedikit; seluruh tangga muat utuh di layar
   - petak tergambar mengelilingi tiap loket, satu per satu: tiap loket punya
     bagiannya sendiri, dan tidak ada garis yang bertemu di satu titik mana pun
   (VO: "Makanya tidak ada yang harus tahu semuanya.")

2. nomornya diganti (beat 1):
   - kartu di laci teratas naik keluar dan memudar; kartu bernomor lain masuk
     dari bawah menggantikannya
   - **loket lain tidak bergerak sama sekali**
   (VO: "Dan tidak ada daftar yang harus diperbarui.")

teks di layar:
   beat 0 → "Tidak ada yang tahu semuanya."
   beat 1 → "Tidak ada daftar yang diperbarui."

catatan komposisi:
   - **loket lain yang DIAM TOTAL adalah bagian dari pernyataannya.** Jangan
     menyalakan apa pun di sana "supaya tidak sepi" — kalau ada yang berkedip
     saat kartunya ditukar, kalimatnya terbantah di layar oleh gambarnya sendiri.
   - **tidak ada garis yang bertemu di satu titik.** Petak itu satu-satunya cara
     menggambar "tidak terpusat" tanpa memakai kata "pusat", yang termasuk
     kosakata terlarang (docs/09 § Kosakata L1).
   - **petaknya TIDAK putus-putus, dan itu keputusan, bukan kelalaian
     (2026-08-14).** Direction ini sempat meminta dua hal yang tidak bisa hidup
     berdampingan di satu elemen: pola putus-putus *dan* `gambarGaris()` — yang
     kedua bekerja dengan cara menyetel `strokeDasharray`, jadi salah satunya
     pasti menimpa yang lain tanpa peringatan (`tsc` menangkapnya sebagai TS2783).
     Yang dipertahankan gerak menggambarnya: "satu per satu" itulah yang
     menunjukkan tiap loket punya bagiannya sendiri, sementara putus-putusnya
     cuma tekstur. Kalau nanti putus-putusnya yang dianggap lebih penting,
     tukar keduanya di sini dulu — jangan pasang dua-duanya lagi.
   - kartunya ditukar **di luar laci**, di samping loket: di dalam laci ukurannya
     terlalu kecil untuk terbaca, dan yang harus terlihat justru bahwa nomornya
     BERGANTI.
   - kamera mundurnya kecil (0,94) dan **hanya menyentuh grup tangga**, bukan
     namanya. Nama dan bilah alamat tidak pernah diskalakan di Short ini —
     itu yang menjamin frame terakhir scene 9 identik dengan frame pertama
     scene 1.

motion:
   - nama & garis: opacity 1→0, 0,45 dtk, mulai beat 0
   - kamera mundur: tween 0→1, `power2out`, 0,8 dtk, mulai beat 0 + 0,1 —
     dan **tetap di situ sampai scene 8 habis**
   - petak: `gambarGaris()` per loket, 0,35 dtk, stagger 0,1 dtk dari bawah
   - kartu lama keluar: geser −90px + opacity 1→0, `power2in`, 0,5 dtk,
     mulai beat 1 + 0,25
   - kartu baru masuk: geser +90px → 0 + opacity 0→1, `expoOut`, 0,55 dtk,
     mulai beat 1 + 0,4
