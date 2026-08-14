Anggaran: mulai 40,92 dtk · durasi 3,4 dtk (estimasi, VO belum jadi).
Satu beat. Tugas scene ini bukan merangkum — ia **menyiapkan pendaratan** untuk
penonton yang akan mengulang Short ini dari detik nol.

1. kembali ke awal:
   - sambaran berhenti; tiga tempat, label, dan kolom angka memudar keluar
   - chip kembali ke posisi & ukuran PERSIS seperti `01-menunggu`
   - denyut dua kali, lalu berhenti — pola yang sama
   - hitungan diam muncul lagi di tempat yang sama dan mulai berjalan lagi
   (VO: "Dan yang tidak sempat disalin, ya ditunggu.")

teks di layar:
   "yang tidak sempat disalin" di atas chip, lalu di bawahnya, kecil dan redup:
   "cara kerjanya → video panjang" — inilah CTA-nya, dan ia TIDAK diucapkan
   (lihat `09-loop-vo.md` § Catatan).

catatan komposisi:
   - **frame terakhir scene ini = frame pertama `01-menunggu`.** Itu bukan
     kemiripan gaya, itu syarat: loop YouTube Shorts memotong keras dari frame
     terakhir ke frame pertama, dan dua susunan yang berbeda membuat putaran
     kedua terasa sebagai video lain. Kalau posisi chip di salah satunya
     digeser, geser keduanya.
   - yang memudar keluar cuma tiga tempat dan angkanya. Latar, chip, dan
     hitungan TIDAK ikut memudar — merekalah yang harus sudah pada tempatnya
     saat frame terakhir tiba.
   - CTA sengaja kecil dan redup. Ia harus terbaca oleh yang mencarinya, tanpa
     menarik mata keluar dari chip di detik terakhir.

motion:
   - tiga tempat & angka keluar: fade + geser 20px turun, `power1in`, 0,4 dtk
   - chip kembali: `power2out`, 0,5 dtk, selesai sebelum denyut mulai
   - denyut & berhenti: parameter identik dengan `01-menunggu` — dibaca dari
     konstanta yang sama di `../tiga-tempat.tsx`, tidak diketik ulang
