Anggaran: mulai 0,0 dtk · durasi 2,97 dtk (estimasi, VO belum jadi).
Satu beat, satu tahap. Frame pertama SUDAH bergerak (docs/02 § Anatomi Shorts).

Panggung 1080×1920, kotak aman x 90–990 · y 240–1480 (docs/03 § Safe area Shorts).
Koordinat bersama seluruh Short ini ada di [`../tiga-tempat.tsx`](../tiga-tempat.tsx);
jangan menulis ulang angkanya di scene mana pun.

1. chip di tengah atas (Y_CHIP), ukuran xl:
   - berdenyut dua kali — cepat, teratur, seperti sedang bekerja
   - lalu BERHENTI, dan diam sampai scene habis
   - hitungan "diam 0,0 dtk" muncul di bawahnya dan terus berjalan
     (angkanya turunan frame, bukan penghitung yang menyimpan state)
   (VO: "Prosesormu lebih sering menunggu daripada bekerja.")

teks di layar (WAJIB di Shorts — mayoritas menonton tanpa suara):
   "lebih sering MENUNGGU" — dua baris, kata MENUNGGU pakai `--warn`,
   di atas chip, di dalam kotak aman atas (y ≥ 240)

catatan komposisi:
   - hitungan diam adalah SATU-SATUNYA benda yang bergerak setelah detik 1,
     dan itu disengaja: layar yang berhenti bersama chip-nya membuat "menunggu"
     terasa, bukan cuma terbaca. Ia tidak melanggar "tidak ada layar diam > 4
     dtk" (docs/02) justru karena ia bergerak.
   - JANGAN memakai ikon jam di sini. Jam milik `03-satu-detik` ke atas sebagai
     alat ukur skala; memakainya lebih awal membuat penonton mengira Short ini
     tentang jam.

motion:
   - denyut chip: `tPP` dua kali, `sineInOut`, amplitudo kecil (scale 1 → 1,04)
   - berhentinya keras — tidak ada pelambatan, tidak ada fade
   - teks masuk: `masuk()` baku, stagger 0,07 dtk
   - semua nilai fungsi murni dari frame (`useDetik()` + `shared/anim.ts`)

loop:
   frame pertama scene ini adalah frame yang didarati penonton saat Short
   mengulang. Susunannya dijaga identik dengan frame TERAKHIR `09-loop` —
   posisi chip, posisi hitungan, ukurannya. Kalau salah satu digeser, geser
   keduanya.
