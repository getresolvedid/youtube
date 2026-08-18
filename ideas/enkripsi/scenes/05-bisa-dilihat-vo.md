# 05-bisa-dilihat · rencana VO

Bagian 3 [problem], dan **di sinilah masalahnya lahir.** Dua scene sebelumnya
cuma menyiapkan panggung; scene ini yang membuat penonton peduli.

Yang harus berubah di kepala penonton: bukan "pengirimannya berbahaya",
melainkan **"kalimatku terbaca orang lain"**. Arahan user menegaskannya:
*"The problem is not sending the message. The problem is someone else being able
to read it."*

## VO

Jika data tidak dilindungi dengan baik, pihak yang tidak berhak bisa saja mencoba melihatnya.
Misalnya, pesan yang seharusnya hanya untuk temanmu bisa terbaca oleh pihak lain.
Karena itu, kita membutuhkan cara untuk melindungi data.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Jaringan yang sama, paket masih berjalan. Sosok ketiga muncul di depan layar mejanya, di luar jalur. Ia menoleh ke layarnya. |
| 1 | Kamera merapat ke layar itu. Mula-mula yang tampil paketnya; lalu isinya terbuka, dan "Halo, apa kabar?" terbaca utuh. Ditahan. |
| 2 | Kamera mundur. Ketiganya terlihat sekaligus — pengirim, jaringan, penerima — dengan yang mengamati berdiri di antaranya, dan kalimatnya masih terbaca. |

## Catatan

- **Yang mengamati digambar sebagai orang biasa, dan itu arahan user yang
  eksplisit:** bukan sosok bertudung, bukan ruang gelap, bukan penjahat yang
  dilebih-lebihkan. Alasannya bukan sopan santun — sosok bertudung memindahkan
  scene ini dari "begini cara kerjanya" ke "kamu sedang diincar", dan penonton
  yang merasa ditakut-takuti menutup video sebelum bagian 4. Ini kekeliruan yang
  sama persis yang dijaga `01-hook-mengetuk-direction.md` di T15.
- **Komponennya sama dengan pengirim** (`Sosok` di `../panggung-kiriman.tsx`).
  Yang membedakan cuma tempat, ukuran, dan terangnya — bukan bentuknya. Sosok
  yang bentuknya berbeda terbaca sebagai jenis makhluk yang berbeda.
- **Kalimat aslinya ditahan lama di layar**, dan itu arahan user. Ini
  satu-satunya frame di episode ini yang isinya "kalimatmu, di layar orang lain"
  — kalau ia lewat cepat, seluruh bagian 5 kehilangan bandingannya.
- **Beat 2 tidak mengulang beat 1.** Beat 1 soal APA yang terbaca, beat 2 soal
  DI MANA ia berdiri — di antara kamu dan temanmu, bukan di ujung. Kalau
  keduanya digabung, yang hilang adalah letaknya, dan `07-terkunci-di-jalan`
  kehilangan tempat berpijak.
- **Baris terakhir menggantung dengan sengaja**, dan itu jembatan ke scene 6
  (HARD RULE 7): "kita membutuhkan cara untuk melindungi data" adalah janji yang
  belum lunas, dan baris pertama scene 6 melunasinya — *"Salah satu caranya
  adalah dengan menggunakan enkripsi."* Ini sambungan 3 → 4, yang paling mahal
  di seluruh episode.
- **"Pihak yang tidak berhak" itu bahasa dokumen, bukan bahasa lisan.** Ia lolos
  begitu saja saat dibaca, tapi tidak ada penonton yang mengucapkannya. Usulan:
  *"orang lain yang kebetulan lewat di jalan yang sama"*. **Belum diubah.**
