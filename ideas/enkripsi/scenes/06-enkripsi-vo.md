# 06-enkripsi · rencana VO

Bagian 4 [answer] → **`[what]` DINAMAI DI SINI, TEPAT SEKALI** (HARD RULE 6).
Sebelum scene ini kata "enkripsi" tidak boleh terdengar sama sekali; sesudahnya
ia boleh dipakai bebas.

Yang harus berubah di kepala penonton: masalah yang baru saja terasa di scene 5
punya jalan keluar, dan jalan keluarnya **mengubah bentuk kalimatnya**, bukan
mengubah jalannya.

## VO

Salah satu caranya adalah dengan menggunakan enkripsi.
Enkripsi mengubah data yang dapat dibaca menjadi bentuk lain.
Menjadi bentuk yang sulit dipahami tanpa kunci yang tepat.
Jadi, orang yang melihat data tersebut tidak langsung dapat memahami isi aslinya.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Latar bersih. "HALO" besar di tengah, terbaca. Satu gembok muncul di sebelahnya — berdampingan, belum mengunci apa pun. |
| 1 | Kotak berlabel ENKRIPSI muncul. "HALO" bergerak masuk, dan kedua daun kotaknya menutup di belakangnya. |
| 2 | Di dalam kotak, hurufnya berubah satu per satu jadi lambang lain, lalu beberapa lambang tambahan menyusul. |
| 3 | Kotaknya membuka. Yang keluar paket dengan gembok di badannya, isinya bukan kalimat lagi. |

## Catatan

- **Namanya jatuh di beat 0, dan itu benar menurut HARD RULE 6** — bendanya
  sudah berdiri: penonton baru saja melihat kalimatnya terbaca di layar orang
  lain, dan merasakan kenapa itu masalah. Kalimat ini penegasan atas benda yang
  sudah ada, bukan perkenalan istilah.
- **Gembok muncul SEBELUM mengunci, dan itu arahan user:** *"Do not immediately
  lock the message. Let the audience see the relationship between the message and
  the lock."* Gembok yang langsung menutup terbaca sebagai efek; gembok yang
  berdiri di sebelahnya dulu terbaca sebagai alat.
- **Baris 2 dan 3 aslinya satu kalimat yang dipotong titik-titik** di arahan
  user. Kupisah jadi dua baris karena keduanya punya visual sendiri — kotak yang
  menutup, lalu huruf yang berubah — dan satu baris untuk dua gerakan membuat
  yang kedua jatuh di tengah kalimat.
- **Tidak ada nama algoritma, tidak ada kunci publik/privat, tidak ada
  matematika.** Arahan user mengeluarkannya secara eksplisit. Akibatnya untuk
  L3 dicatat di [naskah.md](../naskah.md) — bukan di sini.

### Satu hal yang perlu diputuskan user, dan ini yang paling mahal

**"HALO → X7K9@2" mengajarkan model yang keliru, dan arahan animasinya membuat
kekeliruan itu eksplisit.** Arahan user meminta morf huruf per huruf:
H→X, A→7, L→K, O→9. Yang digambarkan bentuk itu adalah **sandi substitusi** —
tiap huruf punya pasangan tetapnya sendiri — dan itu justru yang enkripsi
modern *bukan*: satu huruf yang berubah mengubah seluruh keluarannya, dan
panjangnya pun tidak mengikuti panjang aslinya huruf per huruf.

Kenapa ini mahal, bukan cuma tidak rapi: penonton yang menangkap "tiap huruf
diganti huruf lain" akan menyimpulkan sendiri bahwa enkripsi bisa dipecahkan
dengan menebak pasangannya — dan kesimpulan itu **benar untuk sandi substitusi**.
Kita bukan menyederhanakan; kita mengajarkan hal yang salah dengan bentuk yang
mudah diingat. "Akurasi teknis di atas gaya" (CLAUDE.md).

Yang tetap benar dan tidak mahal: **hasilnya tidak terbaca.** Yang keliru cuma
cara ia sampai ke sana. Jadi ongkos memperbaikinya kecil — cukup morfnya
**tidak** berpasangan satu-satu:

- keluarannya lebih panjang dari masukannya, dan panjangnya tidak sebanding;
- hurufnya tidak berpindah di tempat, melainkan seluruh baris berganti sekaligus;
- tidak ada satu frame pun yang memperlihatkan H sejajar dengan X.

**Belum diubah** — komposisinya sekarang mengikuti arahan user apa adanya, dan
`06-enkripsi-direction.md` mencatat titik mana persis yang harus disentuh kalau
keputusannya berubah.
