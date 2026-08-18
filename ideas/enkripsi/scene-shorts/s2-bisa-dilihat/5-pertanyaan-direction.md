Anggaran: durasi ±6,6 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

**Potong keras, dan panggungnya jadi kosong.** Setelah empat scene yang penuh,
kekosongan inilah yang membuat pertanyaannya terdengar. Satu benda tertinggal di
latar sudah cukup untuk membuat mata penonton mampir, dan kalimatnya lewat
begitu saja.

1. seluruh isi scene 4 lenyap sekaligus. tinggal "HALO, APA KABAR?" di tengah,
   di atas latar bersih. lalu satu garis mulai MENGGAMBAR DIRINYA di sekeliling
   kalimat itu — bentuk gembok, tapi sengkangnya belum turun.
   (VO: "Jadi, bagaimana caranya agar orang lain tidak mudah memahami data yang sedang kita kirim?")
   TEKS LAYAR: "Supaya tidak terbaca?"

motion:
   - lenyapnya scene 4: POTONG KERAS, bukan pudar (docs/02)
   - garis: `gambarGaris()` — ia menggambar diri, bukan muncul. `mulai`
     diturunkan dari `beat(…)` + pecahan durasi barisnya, supaya ia tetap jatuh
     di kata yang sama kalau kalimatnya berubah panjang
   - kalimatnya DIAM. ini satu-satunya scene di Short ini yang boleh benar-benar
     diam, dan diamnya yang bekerja

catatan:
   - **gemboknya GARIS di sini, bukan bentuk pejal.** yang pejal datang di scene
     6 saat ia menutup — garis yang berubah jadi pejal terbaca sebagai "yang
     tadi baru gagasan, sekarang jadi".
   - **jangan menaruh ikon kunci.** kunci baru muncul di Short 4, di sisi
     penerima, tempat ia benar-benar dipakai.
   - kalimatnya huruf besar semua supaya terbaca sebagai BENDA yang sedang
     dibicarakan, bukan sebagai gelembung chat yang sedang berlangsung.
