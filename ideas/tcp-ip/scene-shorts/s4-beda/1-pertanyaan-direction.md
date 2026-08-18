Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Tiga baris VO = tiga tahap.

Frame nol Short 4. Bentuknya paling sederhana dari keempat Short — yang bekerja
di sini tipografinya, bukan bendanya.

1. dua nama berdiri berdampingan di tengah frame, DEMPET, tanpa jarak:
   `TCP` `IP`. terbaca seperti satu benda. teks layar: "Sering disebut bareng."
   (VO: "TCP dan IP sering disebut bersamaan.")

2. keduanya merenggang ke kiri dan kanan. di ruang yang terbuka di antaranya
   muncul tanda `≠`. teks layar berganti: "Sama?"
   (VO: "Tapi apakah keduanya sama?")

3. satu kata jatuh besar di bawahnya: "Tidak."
   (VO: "Tidak.")

motion:
   - merenggang: `t()` pada x kedua nama, `E.backOut(1.3)` — melewati sedikit
     lalu kembali, supaya terasa terpisah paksa dan bukan bergeser
   - `≠`: `masuk()` dengan `geser` 0, tepat saat renggangnya selesai
   - "Tidak.": `masuk()` durasi 0,25, `geser` 0 — ia jatuh, bukan meluncur

catatan:
   - **nama dipakai di detik nol, dan itu memang bentuknya.** yang dibantah Short
     ini adalah keyakinan yang sudah dipegang penonton tentang dua nama itu;
     menuliskannya ulang tanpa namanya bukan lagi keyakinan yang sama.
   - **beat 0 wajib DEMPET.** kerenggangan di beat 1 baru berarti kalau penonton
     sempat melihat keduanya sebagai satu benda.
   - **jangan menambahkan benda apa pun di scene ini.** paket, jalur, dan simpul
     semuanya baru masuk di scene 2 — di sini layarnya sengaja kosong supaya
     dua nama itu tidak punya saingan.
   - frame terakhir: dua nama renggang + `≠` + "Tidak.". frame pertama
     `2-sisi-ip` memakai nama `IP` di posisi yang sama.
