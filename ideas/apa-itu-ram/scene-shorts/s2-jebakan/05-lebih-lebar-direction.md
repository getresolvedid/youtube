Anggaran: mulai 18,31 dtk · durasi 7,26 dtk (estimasi, VO belum jadi).
Dua beat. Bantahan utama Short ini — dan seluruhnya dipikul oleh satu hal yang
TIDAK berubah: irama tangan.

1. meja dilebarkan:
   - meja melebar ke kanan sampai dua kali panjang semula
   - keempat berkas TIDAK bergeser, TIDAK bertambah, TIDAK ikut melebar
   - angka pembanding kecil muncul di bawah meja: "2×" — satu-satunya angka di
     Short ini, dan ia menghitung lebar meja, bukan kecepatan apa pun
   (VO: "Ganti dengan meja dua kali lebih lebar.")

2. tidak ada yang berubah:
   - tangan meneruskan irama yang SAMA PERSIS, di area yang sama
   - separuh kanan meja disorot: kosong, dan tetap kosong sampai scene habis
   (VO: "Tanganmu tidak jadi lebih cepat. Sisi kanannya cuma kosong.")

teks di layar:
   beat 0 → "2× lebih lebar"
   beat 1 → "kecepatan sama"   — ditaruh tepat di atas tangan, bukan di atas
            meja: yang dibicarakan tangannya

catatan komposisi:
   - **irama tangan dibaca dari konstanta yang sama dengan scene 4**, tidak
     diketik ulang. Kalau di sini iramanya beda beberapa frame saja, mata
     penonton akan membacanya sebagai "jadi lebih cepat" — dan kalimat VO-nya
     langsung terdengar bohong.
   - melebarnya meja jangan pakai `scale` pada seluruh grup: berkas akan ikut
     membesar. Yang melebar cuma lebar mejanya (`width`), isinya tetap.
   - sorotan separuh kanan pakai `--ink-2`, bukan `--warn`. Kosong di sini belum
     masalah — ia baru jadi masalah di scene 9, dan warna yang mendahului
     kesimpulannya akan mendahului kalimatnya juga.

motion:
   - meja melebar: `width` di-tween, `power3out`, 0,6 dtk
   - "2×": `backOut(1.6)`, jatuh saat pelebaran selesai
   - tangan: konstanta irama yang sama dengan scene 4, tanpa perubahan apa pun
