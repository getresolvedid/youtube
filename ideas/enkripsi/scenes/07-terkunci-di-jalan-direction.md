Anggaran: mulai 78,80 dtk · durasi 14,08 dtk (estimasi, VO belum jadi).
Tiga baris VO = tiga tahap.

**Scene terpenting di episode ini, dan ia bekerja tanpa menjelaskan apa pun.**
Yang mengajarkan bukan kalimat VO-nya, melainkan fakta bahwa penonton sudah
pernah melihat frame ini — dengan isi yang berbeda.

**Semua koordinatnya diambil apa adanya dari `../panggung-kiriman.tsx`.** Tidak
ada satu angka pun yang boleh ditulis ulang di berkas scene ini: jaringan, letak
simpul, tempat berdiri yang mengamati, dan ukuran layarnya harus identik dengan
scene 4 dan 5. Perbedaan kecil yang tidak disengaja akan terbaca penonton
sebagai perubahan yang berarti — dan yang mereka bandingkan bukan lagi bentuk
paketnya.

1. HP pengirim di kiri. paket keluar darinya — kali ini SUDAH bergembok sejak
   frame pertama — dan mulai menyusuri simpul, sama seperti scene 4. simpul
   menyala satu per satu saat dilewati.
   (VO: "Sekarang, data tersebut dikirim melalui internet dalam bentuk yang sudah terenkripsi.")

2. yang mengamati muncul lagi, di tempat yang sama persis. kamera merapat ke
   layarnya dengan gerakan yang sama seperti scene 5. yang tampil di sana
   deretan lambang — X7K9@2#L8$Q — bukan kalimat. ia diam sebentar, lalu
   bahunya turun sedikit dan ia berpaling.
   (VO: "Jika ada pihak lain yang melihatnya, data tersebut tidak langsung terlihat sebagai pesan asli.")

3. kamera mundur ke jalur. paket melanjutkan jalannya ke kanan, sampai di HP
   penerima, dan masuk ke dalamnya. layar HP itu menyala saat menerimanya.
   (VO: "Data kemudian sampai ke perangkat penerima.")

motion:
   - seluruh koreografi tahap 1 dan 2 MENGULANG scene 4 dan 5: `mulai` boleh
     berbeda (baris VO-nya berbeda panjang), tapi `ease`, jarak, dan durasinya
     sama. gerak kamera yang berbeda membuat penonton mengira ia melihat tempat
     lain
   - nyala simpul: `nyalaDariJarak()` yang sama persis dengan scene 4
   - `terkunci` paket DIPATOK 1 sepanjang scene — tidak ada tween. ia sudah
     terkunci sebelum scene ini mulai, dan menganimasikannya lagi di sini
     mengulang temuan scene 6
   - reaksi yang mengamati: satu `t()` pada geser bahu 0 → 6px, durasi 0,8,
     dan satu opasitas kepala yang berputar sedikit. TIDAK ADA getar, tidak ada
     tanda seru, tidak ada perubahan warna
   - paket masuk HP tahap 3: opasitas paket turun sementara nyala layar HP naik,
     rentang yang sama — ia MASUK, bukan menghilang lalu HP-nya menyala

catatan:
   - **PENGULANGANNYA ADALAH ISI SCENE INI**, bukan penghematan. arahan user:
     *"This visual repetition is intentional. It allows the audience to compare:
     before encryption readable data, after encryption unreadable data."*
   - **reaksinya ditahan kecil**, arahan user: *"Keep the reaction subtle."* dia
     melihat, berhenti, lalu terlihat tidak yakin. reaksi besar mengubah scene
     ini jadi kemenangan atas seseorang; yang dimaksud cuma bahwa isinya tidak
     terbaca. dan penonton yang menikmati kekalahan orang lain berhenti belajar.
   - **dia TIDAK pergi dari frame.** dia tetap di sana, tetap bisa melihat
     paketnya lewat. enkripsi tidak mengusirnya — itu titik yang paling sering
     salah dipahami, dan gambar yang mengusirnya akan mengajarkannya.
   - **yang di layar pengamat lebih panjang dari yang di badan paket**
     (`SANDI_PANJANG` vs `SANDI`), arahan user. layar penuh yang isinya sependek
     label terbaca sebagai label, bukan sebagai isi yang panjang dan tak terbaca.
   - **tidak ada teks "AMAN", tidak ada centang hijau, tidak ada perisai.** satu
     saja dari ketiganya mengubah scene ini dari pengamatan jadi iklan.
   - jahitan ke `08-dekripsi` rapat: paket masuk ke HP di tahap 3, dan scene 8
     membuka DI DALAM HP yang sama.
