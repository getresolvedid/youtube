Anggaran: mulai 0,0 dtk · durasi 3,93 dtk (estimasi, VO belum jadi).
Satu beat. Frame pertama sudah bergerak — dan yang bergerak adalah penandanya,
masuk dari tepi kanan (docs/02 § Short 1: "Frame pertama sudah bergerak").

Panggung 1080×1920, kotak aman x 90–990 · y 240–1480 (docs/03 § Safe area Shorts).
Koordinat bersama seluruh Short ini ada di [`../tangga-tegak.tsx`](../tangga-tegak.tsx);
jangan menulis ulang angkanya di scene mana pun.

1. namanya sudah di layar sejak frame nol:
   - bilah alamat peramban di y 600, nama `www.tokoku.id` utuh di dalamnya,
     ketiga potongan sama terang — belum ada yang disorot
   - tidak ada gerakan masuk untuk bilah maupun namanya: keduanya sudah ada
     sebelum penonton sempat berkedip
   - penanda segitiga masuk dari luar frame kanan (x 1160) dan berhenti tepat di
     atas potongan paling kanan
   (VO: "Nama situs yang kamu ketik dibaca dari belakang.")

teks di layar:
   "Nama situs itu dibaca dari belakang."
   Posisinya `../teks-atas.tsx`, y 250 — sama di sembilan scene, tidak pernah
   bergeser.

catatan komposisi:
   - **bilah alamatnya bukan hiasan.** Tanpa dia scene ini isinya cuma teks
     (HARD RULE 2), dan VO-nya berbunyi "yang kamu ketik" — bilah itu satu-satunya
     hal di layar yang mengatakan di mana namanya diketik.
   - nama situsnya `POTONGAN` dari `../../panggung-loket.tsx`, nama yang sama
     persis dengan video panjang. Contoh baru akan membuat penonton yang menonton
     keduanya melihat dua benda.
   - **gembok bilah alamat harus punya jarak ke huruf pertama "www."** Versi
     pertama menaruh tepi bilah pada `xPotonganS(0) - 150`, jadi ruang untuk
     gembok adalah sisa pembagian — dan gemboknya mendarat menempel di huruf w.
     Sekarang tepinya dipatok (`BILAH_ALAMAT` di `../tangga-tegak.tsx`) dan
     `W_POTONGAN_S` 250 yang menyisakan ~34px. **`npm run tumpang` tidak akan
     menangkap ini**: gembok itu bentuk, bukan teks, dan yang diperiksa cuma yang
     bisa rugi kalau tertutupi. Kalau salah satu angka itu diubah, periksa lagi
     dengan mata.
   - tidak ada loket di scene ini. Loketnya berdiri di scene 3, setelah
     undangannya jatuh; loket yang muncul di sini membuat scene 3 tidak punya apa
     pun untuk didirikan.
   - jangan menyorot potongan mana pun. Sorotan pertama milik scene 4.

motion:
   - penanda: `masuk()` dari x 1160 ke `xPotonganS(2)`, `expoOut`, 0,7 dtk,
     mulai 0,25 dtk — mendarat tepat saat kata "belakang" jatuh
   - tidak ada gerak keluar; potongan ke scene 2 keras
