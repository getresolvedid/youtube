Anggaran: mulai 62,08 dtk · durasi 16,72 dtk (estimasi, VO belum jadi).
Empat baris VO = empat tahap.

**Scene bagian 4 — `[what]` dinamai di sini, tepat sekali** (HARD RULE 6).
Panggungnya sengaja BERSIH: tidak ada jaringan, tidak ada sosok, tidak ada meja.
Yang tertinggal cuma kalimatnya dan apa yang terjadi padanya.

Arahan user menegaskan kameranya diam: *"Static. Do not move the camera
unnecessarily."* Satu-satunya gerakan kamera di scene ini merapat sedikit ke
kotak di tahap 2.

1. latar bersih. "HALO" besar di tengah, terbaca jelas. satu gembok muncul DI
   SEBELAHNYA — berdampingan, tidak menyentuh, belum mengunci apa pun.
   (VO: "Salah satu caranya adalah dengan menggunakan enkripsi.")

2. kotak berlabel ENKRIPSI muncul di tengah. "HALO" bergerak masuk ke dalamnya,
   lalu dua daun kotaknya menutup dari kiri dan kanan sampai isinya tidak
   terlihat lagi. gembok pindah ke badan kotaknya.
   (VO: "Enkripsi mengubah data yang dapat dibaca menjadi bentuk lain.")

3. kotaknya membuka sedikit — cukup untuk melihat ke dalam. di dalamnya
   hurufnya berubah jadi lambang lain, lalu beberapa lambang tambahan menyusul
   sampai barisnya lebih panjang dari kalimat aslinya.
   (VO: "Menjadi bentuk yang sulit dipahami tanpa kunci yang tepat.")

4. kotaknya membuka penuh. yang keluar paket bergembok — warnanya lebih dalam,
   bergaris tepi, dan tiga bilah putih di dalamnya sudah tidak ada. di sisi
   kiri, ringkasannya berdiri tegak: HALO → gembok → X7K9@2.
   (VO: "Jadi, orang yang melihat data tersebut tidak langsung dapat memahami isi aslinya.")

motion:
   - gembok tahap 1 masuk dengan `munculSkala()` — mengembang sedikit lewat
     target lalu mendarat. ia BERDAMPINGAN dulu, tidak pernah langsung menutup
     (arahan user: "Let the audience see the relationship between the message
     and the lock")
   - daun kotak tahap 2: satu nilai `tutup` 0 → 1 menggerakkan kedua daun
     sekaligus. yang di dalamnya tertutup SUNGGUHAN oleh dua bidang, bukan
     diberi selubung gelap — selubung terbaca sebagai kabut, bukan sebagai
     tertutup
   - merapat tahap 2: `kamera({skala})` 1,0 → 1,08 saja. lebih dari itu dan
     panggung bersih ini terasa goyah
   - perubahan huruf tahap 3: opasitas dua baris teks yang BERLAWANAN di rentang
     yang sama — baris lama memudar sementara baris baru muncul di tempatnya.
     BUKAN morf per huruf (lihat catatan)
   - paket keluar tahap 4: satu nilai `terkunci` 0 → 1 mengubah warna, gembok,
     dan glif isinya SEKALIGUS. tiga tween terpisah membuat salah satunya
     selesai lebih dulu, dan bentuk antaranya terbaca sebagai bentuk ketiga

catatan:
   - **NAMANYA JATUH DI TAHAP 1, DAN CUMA DI SITU.** sebelum scene ini kata
     "enkripsi" tidak terdengar sama sekali; sesudahnya ia boleh dipakai bebas.
     bendanya sudah berdiri — penonton baru saja melihat kalimatnya di layar
     orang lain — jadi kalimat ini penegasan, bukan perkenalan.
   - **PERUBAHAN HURUFNYA TIDAK BERPASANGAN SATU-SATU, dan itu penyimpangan
     dari arahan user yang disengaja — satu-satunya di seluruh berkas ini.**
     arahan aslinya meminta morf H→X, A→7, L→K, O→9. bentuk itu menggambarkan
     **sandi substitusi**, bukan enkripsi: tiap huruf punya pasangan tetapnya
     sendiri, dan penonton yang menangkapnya akan menyimpulkan bahwa ia bisa
     dipecahkan dengan menebak pasangannya — kesimpulan yang benar untuk sandi
     substitusi. itu bukan menyederhanakan, itu mengajarkan yang salah dengan
     bentuk yang mudah diingat ("Akurasi teknis di atas gaya", CLAUDE.md).

     yang dipertahankan dari arahan: hasil akhirnya `X7K9@2`, perubahannya
     mulus dan bukan glitch acak, dan kotaknya membuka supaya penonton melihat
     perubahan itu terjadi. yang diubah cuma **caranya**: seluruh baris berganti
     sekaligus, keluarannya lebih panjang dari masukannya, dan tidak ada satu
     frame pun yang memperlihatkan H sejajar dengan X.

     kalau user memutuskan bentuk aslinya tetap dipakai, yang disentuh cuma
     bagian `tahap 3` di `06-enkripsi.tsx` — tidak ada bagian lain yang
     bergantung padanya. alasan lengkapnya di `06-enkripsi-vo.md`.
   - **tidak ada nama algoritma, tidak ada kunci publik/privat, tidak ada
     matematika** — arahan user, dan akibatnya untuk L3 dicatat di
     [naskah.md](../naskah.md), bukan di sini.
   - **kuncinya BELUM muncul di scene ini** walaupun VO menyebutnya ("tanpa
     kunci yang tepat"). ia digambar pertama kali di scene 8, tempat ia benar-
     benar dipakai. kunci yang sudah tergambar di sini memakai dua scene untuk
     satu temuan yang sama.
   - **jangan ada jaringan di latar.** panggung bersih inilah yang membuat scene
     7 terasa seperti kembali ke dunia nyata.
