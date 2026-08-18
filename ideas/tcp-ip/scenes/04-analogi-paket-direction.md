Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Lima baris VO = lima tahap.

Scene yang memindahkan episode dari abstrak ke benda. Puncaknya di tahap 4:
**match cut** dari dunia fisik ke jaringan.

1. buku dari scene sebelumnya menyusut jadi sebuah kotak kiriman di tengah.
   labelnya masih kosong.
   (VO: "Bayangkan kamu ingin mengirim sebuah paket…")

2. label ditempel di kotaknya — `FROM: A` di baris atas, `TO: B` di baris bawah,
   `TO: B` masuk belakangan dan lebih tebal.
   (VO: "Kamu membutuhkan alamat tujuan…")

3. kendaraan masuk dari kiri, berhenti di sebelah kotaknya. kotak bergeser masuk
   ke bak. kendaraan berangkat ke kanan melewati dua persimpangan yang menyala
   saat dilewati.
   (VO: "Setelah itu, kamu membutuhkan sistem pengiriman…")

4. **MATCH CUT.** kendaraan dan jalan memudar; di titik yang SAMA PERSIS dengan
   kotaknya muncul satu potongan data, dan garis jalan berubah jadi jalur
   jaringan yang sudah dikenal dari scene 1.
   (VO: "Dalam jaringan komputer, konsepnya kurang lebih seperti ini.")

5. dua label berdampingan, kiri dan kanan, jatuh berurutan mengikuti kalimatnya:
   `IP = WHERE SHOULD IT GO?` lalu `TCP = DID IT ARRIVE CORRECTLY?`
   (VO: "IP menentukan ke mana data harus pergi, sedangkan TCP…")

motion:
   - kotak dari buku: `t()` pada skala, bukan `masuk()` — bendanya BERUBAH,
     tidak datang baru
   - label alamat: `masuk()` dengan `geser` 10, dua tahap terpisah
   - kendaraan: `t()` pada x, `E.power1out` masuk lalu `E.power2in` berangkat
   - persimpangan: `nyala` tiap `Simpul` dipicu saat x kendaraan melewatinya —
     dihitung dari posisi, bukan dari detik terpisah, supaya tidak pernah
     meleset kalau durasinya berubah
   - match cut: opacity silang di titik yang sama, durasi 0,5 dtk, TANPA geser

catatan:
   - **tahap 4 wajib berimpit.** kotak fisik dan potongan data menempati x dan y
     yang sama persis (`X_KOTAK`, `JALUR_UTAMA`). dua titik yang berdekatan
     masih terbaca sebagai dua benda; satu titik yang isinya berubah terbaca
     sebagai satu benda yang berubah.
   - **jalannya jangan digambar ulang.** garis jalan di tahap 3 memakai `JALUR_Y`
     yang sama dengan jalur jaringan, jadi di tahap 4 yang berubah cuma warnanya.
   - dua label tahap 5 berbahasa Inggris, mengikuti storyboard.
   - frame terakhir: potongan data di jalur tengah + dua label. frame pertama
     `05-ip-address` mengambil alih dengan rumah bernomor — jahitan: menganga —
     panggungnya memang berganti ke dunia fisik lagi, dan storyboard memintanya
     begitu.
