Anggaran: mulai 11,91 dtk · durasi 6,4 dtk (estimasi, VO belum jadi).
Dua beat. Scene ini memasang IRAMA yang jadi alat ukur seluruh Short — irama
yang sama dipakai lagi di scene 5, lalu patah di scene 7.

1. masih muat:
   - keempat berkas tetap di tempatnya
   - ruang kosong di kanan meja disorot tipis (`--accent-soft`), sekali saja
   (VO: "Selama semuanya masih muat, mejanya bukan penghambat.")

2. tangan bekerja:
   - penanda tangan bergerak dari berkas ke berkas dengan JEDA TETAP
   - tiap kali ia mendarat di sebuah berkas, berkas itu berkedip sekali
   - iramanya metronom: tidak melambat, tidak menunggu, tidak melompat
   (VO: "Kerjamu secepat tanganmu, bukan secepat lebar mejanya.")

teks di layar:
   beat 0 → "masih muat"
   beat 1 → "secepat tanganmu"   (potong keras, bukan crossfade)

catatan komposisi:
   - **IRAMA TANGAN adalah konstanta bersama**, ditulis sekali di
     `../meja-kerja.tsx` dan dipakai scene 4, 5, dan 7. Mengetiknya ulang di
     salah satu scene akan membuat perbandingan yang jadi seluruh bukti Short
     ini diam-diam meleset — dan meleset beberapa frame sudah cukup.
   - tangannya cukup penanda sederhana (lingkaran + garis), bukan gambar tangan.
     Yang harus terbaca iramanya, dan bentuk yang detail justru menarik mata ke
     bentuknya.
   - sorotan ruang kosong muncul SEKALI dan tinggal. Berkedip berulang akan
     terbaca sebagai peringatan, padahal di scene ini kosong itu kabar baik.

motion:
   - sorotan: fade + `scaleX 0,9 → 1`, `expoOut`, 0,4 dtk
   - tangan: `t()` per lompatan, `power2out` 0,18 dtk, jeda tetap dari konstanta
   - kedip berkas: `tPP` opasitas, 0,2 dtk, jatuh tepat saat tangan mendarat
