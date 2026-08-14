Anggaran: mulai 25,84 dtk · durasi 20,69 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `01-hook-banyak-tangan`: jalan mendatar, lima
tangan, kotak berhenti di tengah. Tanda tanya scene 1 sudah tidak ada — kartu
judul menyela di antaranya, dan yang menyambung dua scene ini VO-nya.

Scene ini **menutup satu jalan keluar yang tidak pernah diucapkan penonton**:
harapan bahwa ada jalur khusus untuk kirimannya.

1. jalan yang sama, kotak masih di tengah. tidak ada yang bergerak dulu selama
   setengah detik pertama — pandangan penonton diberi waktu mendarat.
   (VO: "Bukan karena jalannya sepi.")

2. kotak-kotak lain bermunculan dari kedua tepi dan mengalir di jalan yang sama.
   ukurannya berbeda-beda, arahnya bercampur. kotakmu ikut terbawa arus.
   (VO: "Jalannya justru ramai, dan memang dipakai ramai-ramai.")

3. satu jalur bersih tergambar di atas jalan — garis lurus dari meja kiri ke
   tepi kanan, kosong, tanpa tangan. lalu ia PADAM. jalur itu tidak pernah ada.
   (VO: "Tidak ada jalur khusus yang cuma dilewati kirimanmu.")

4. kotakmu disorot di tengah keramaian. tangan-tangan yang dilewatinya menyala
   berurutan, dan tidak satu pun dari mereka pernah dipilih siapa-siapa.
   (VO: "Tiap kotak lewat tangan yang tidak pernah kamu pilih sendiri.")

5. semua gerakan MELAMBAT sampai hampir berhenti. jalannya tetap ramai, tetap
   begitu bentuknya, dan tidak ada yang rusak di layar.
   (VO: "Itu bukan kerusakan. Memang begitu bentuk jalannya.")

6. jalan dan kotak-kotak lain meredup. kotakmu tetap terang, sendirian di tengah.
   (VO: "Jadi kalau jalannya tidak bisa dibersihkan, kotaknya yang harus diapa-apakan.")

motion:
   - kotak lain: `t()` pada x, kecepatan berbeda per kotak (indeks dipakai
     sebagai pengali tetap — bukan acak, `Math.random()` dilarang)
   - jalur bersih: `gambarGaris()` menggambar dari kiri ke kanan, lalu opacity
     turun `E.power2in` — muncul untuk dipadamkan
   - melambat di tahap 5: satu tween tunggal `laju` 1 -> 0,12 yang mengalikan
     seluruh perpindahan x; jangan menghentikan tiap kotak sendiri-sendiri
   - meredup: opacity jalan + kotak lain 1 -> 0,25, kotakmu tetap 1

catatan:
   - **jalur bersih di tahap 3 wajib sempat terlihat utuh** sebelum dipadamkan.
     kalau ia langsung hilang, penonton menyimpan harapannya sendiri sampai
     bagian 6 dan mengukur semua jawaban terhadap harapan yang tak pernah
     dibantah.
   - **jangan menggambar kotak lain sebagai milik orang jahat.** yang harus
     terbaca cuma bahwa jalannya milik bersama.
   - **tidak ada gembok di scene ini.** kotaknya masih polos, sama seperti scene 1.
   - tahap 6 menyiapkan jahitan ke scene 4: frame terakhirnya kotak terang
     sendirian di tengah jalan yang redup, dan scene 4 memulai dari gambar itu.
