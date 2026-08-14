Anggaran: mulai 300,21 dtk · durasi 31,28 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Frame pertamanya = frame terakhir `14-label-tetap-terbaca`: dua bidang, isi gelap
dan jalur terang. Bidang isi yang gelap itulah yang dibuka di tahap 1.

Bagian 7 [case], scene paling berguna di episode ini: ia memberi penonton
**pertanyaan yang harus ia tanyakan** ke layanan mana pun, dan pertanyaannya
bukan "terkunci atau tidak".

1. dua bidang menyatu kembali jadi satu kotak yang sedang berjalan. isinya masih
   gelap.
   (VO: "Dan isinya sendiri cuma tertutup sampai satu titik.")

2. kotak tiba di ujung kanan dan TERBUKA. isinya terbaca lagi — pertama kalinya
   sejak scene 7. penonton harus sempat membacanya.
   (VO: "Kotak selalu dibuka di suatu tempat. Kalau tidak, kirimannya tidak berguna.")

3. jalan digambar utuh dari kiri ke kanan sebagai satu garis bersih. satu penanda
   melayang di atasnya, belum mendarat di titik mana pun.
   (VO: "Jadi pertanyaannya bukan terkunci atau tidak. Pertanyaannya, dibuka di mana.")

4. jalur PERTAMA, di bagian atas: kotak melintas utuh melewati semua tangan dan
   satu bangunan di tengah, lalu baru terbuka di rumah paling ujung. penandanya
   mendarat di ujung itu.
   (VO: "Ada yang cuma terbuka di rumah orang yang kamu kirimi.")

5. nama jalur itu mendarat di bawahnya, sendirian — tidak ada elemen lain yang
   bergerak di tahap ini.
   (VO: "Itu namanya ujung ke ujung.")

6. jalur KEDUA, di bagian bawah: kotak terbuka di bangunan di tengah jalan,
   isinya terbaca di sana, tutupnya menutup lagi, dan kotaknya lanjut ke kanan.
   (VO: "Ada yang dibuka di ruang antara, dibaca di sana, lalu dikunci lagi untuk lanjut jalan.")

7. dua jalur berdampingan, sejajar. LABEL YANG SAMA menempel di keduanya, dan
   satu-satunya bedanya titik tempat kotaknya terbuka.
   (VO: "Dua-duanya boleh menyebut diri terkunci. Dua-duanya tidak berarti hal yang sama.")

motion:
   - membuka di tahap 2: rotasi tutup `E.power2out` 0,5 dtk, lalu baris isi
     `masuk()` stagger 0,06 — isinya digambar ulang, bukan sekadar dinyalakan
   - dua jalur: jalur atas `t()` pada y -150, jalur bawah +150, bersamaan
   - penanda: `masuk()` geser 22, mendarat tepat di titik buka jalur itu
   - nama jalur: `masuk()` geser 24, durasi 0,5, mulai `beat + 0,12` — bentuk
     yang sama persis dengan penamaan di scene 7
   - label kembar tahap 7: `masuk()` bersamaan di dua jalur, TANPA stagger

catatan:
   - **tahap 2 wajib memperlihatkan isinya terbaca lagi.** sejak scene 7 penonton
     tidak pernah melihat isi kotak; kalau di sini tidak dibuka, "dibuka di
     ujung" cuma jadi kalimat.
   - **bangunan di tengah jalan tidak digambar sebagai penjahat.** membuka di
     tengah jalan itu pilihan rancangan yang punya alasan; scene ini memisahkan
     dua hal, bukan menuduh salah satunya. bentuknya netral, tanpa warna bahaya.
   - **label yang sama di tahap 7 adalah seluruh isi scene ini.** kalau salah
     satu diberi tanda buruk, penonton pulang dengan kesimpulan yang salah — dan
     kesimpulan yang benar justru bahwa keduanya berhak memakai kata itu.
   - **tidak ada nama aplikasi di layar maupun di VO** sampai dokumennya dibuka
     (`naskah.md` § Sumber).
   - **nama "ujung ke ujung" di tahap 5 muncul sendirian**, alasan yang sama
     dengan penamaan `enkripsi` di scene 7.
   - frame terakhir (dua jalur berdampingan dengan label kembar) adalah frame
     pertama scene 16 — di sana jalur atas yang tinggal dan kotaknya kembali ke
     tengah.
