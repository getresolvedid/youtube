Anggaran: mulai 140,74 dtk · durasi 35,12 dtk (estimasi, VO belum jadi).
Sepuluh baris VO = sepuluh tahap.

Scene pertama bagian 6, dan scene yang **membunuh satu salah kaprah yang dipakai
sehari-hari**. Frame pertamanya = frame terakhir `07-dicatat`: tangga utuh,
catatan menempel di tiap loket, cuma anak tangga terbawah menyala.

Tahap 4–6 memakai layar terbelah dua. Itu satu-satunya kali di episode ini
panggungnya dibelah, dan alasannya ada di catatan.

1. catatan yang menempel di tiap loket MENYALA bersamaan — semuanya, sekali.
   perhatian pindah dari tangga ke helai-helai kecil itu.
   (VO: "Cuma, catatan itu tidak berlaku selamanya.")

2. satu catatan diperbesar ke tengah frame. di kakinya ada bilah tipis mendatar,
   penuh, yang mulai MENYUSUT dari kanan.
   label kecil di sebelah bilahnya boleh ditulis; jangan diucapkan.
   (VO: "Tiap catatan ditulis dengan tanggal habisnya sendiri.")

3. garis pendek tergambar dari loket ujung ke bilah itu.
   yang menyetel panjang bilahnya datang dari sana, bukan dari loket tempat
   catatannya menempel.
   (VO: "Dan yang menentukan tanggal itu pemilik namanya.")

4. catatan mengecil kembali ke tempatnya. layar TERBELAH dua kolom.
   (VO: "Sekarang lihat apa yang terjadi kalau sebuah situs pindah nomor.")
   kartu di laci loket ujung diganti di kedua kolom — kejadian yang sama,
   dilihat dua orang.

5. KIRI — kamu. jalurmu tidak punya catatan (bilahnya sudah kosong).
   pertanyaan naik sampai ujung, turun membawa nomor BARU.
   halaman kecil di bawah menyala dengan tempat yang baru.
   (VO: "Kamu membuka namanya, dan kamu sampai ke tempat yang baru.")

6. KANAN — temanmu. catatan di loket bawahnya masih hidup.
   pertanyaannya berbalik di tengah, membawa nomor LAMA.
   halaman kecil di bawah menyala dengan tempat yang lama.
   kedua kolom berjalan BERSAMAAN, tidak bergantian.
   (VO: "Temanmu membuka nama yang sama, dan dia masih sampai ke tempat lama.")

7. bilah umur di kolom kanan disorot: masih tersisa, belum kosong.
   di kolom kiri, bilah yang sepadan sudah kosong. keduanya terlihat sekaligus.
   (VO: "Catatan di jalurnya belum habis umurnya.")

8. layar menyatu lagi. kata "menyebar" muncul besar di tengah, dengan panah-panah
   yang melebar keluar ke segala arah dari satu titik.
   (VO: "Orang biasanya bilang perubahannya sedang menyebar pelan-pelan.")

9. panah-panahnya PADAM SERENTAK. katanya dicoret satu garis.
   (VO: "Padahal tidak ada yang menyebar ke mana-mana.")

10. yang tersisa: deretan bilah umur di banyak loket sekaligus, masing-masing
    menyusut dengan laju SENDIRI-SENDIRI, habis di waktu yang berbeda-beda.
    tidak ada gelombang, tidak ada urutan, tidak ada arah.
    (VO: "Yang lama cuma sedang menunggu kedaluwarsa, satu per satu.")

motion:
   - catatan menyala: satu `t()` dipakai semua helai — serentak, bukan bergiliran
   - catatan diperbesar: `scale` + `x`/`y` ke tengah, `E.expoOut`
   - bilah menyusut: `scaleX 1->0`, `transformOrigin: right`, `E.linear` —
     waktu tidak melambat di ujung, dan yang di-ease terbaca sebagai animasi
   - layar terbelah: garis vertikal `gambarGaris()` dari atas, lalu kedua kolom
     `t()` x sedikit menjauh
   - kedua kolom: dipetakan dari `d` yang SAMA, tanpa offset — kebersamaan itu
     seluruh isi tahap 5–7
   - panah menyebar: `scaleX` per panah dengan `mulai` dari indeksnya,
     `E.power2out`; padamnya satu `t()` untuk semua
   - coretan: `gambarGaris()` kiri ke kanan, 0,3 dtk
   - bilah tahap 10: laju tiap bilah = fungsi dari indeksnya (mis. `0,6 + i*0,17`),
     BUKAN acak — deterministik dan tetap terlihat tidak seragam
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **tahap 5 dan 6 wajib berjalan bersamaan, bukan bergantian.** kalau kiri
     dijalankan dulu lalu kanan, yang terbaca "sebelum dan sesudah" — dan itu
     justru model salah yang sedang dibantah scene ini. yang benar: dua jawaban
     berbeda hidup di detik yang sama.
   - **kolom kanan bukan versi yang salah.** jangan diberi merah, jangan diberi
     tanda silang. titik putus analogi kedua (`naskah.md`) menyatakan yang lama
     belum tentu salah — ia cuma belum kedaluwarsa. mewarnainya merah membuat
     penonton pulang mengira ada yang rusak.
   - **urutan tahap 8 lalu 9 mengikat: kutip dulu, bantah kemudian.** membantah
     lebih dulu membuat penonton yang selama ini memakai kata itu merasa ditegur
     sebelum tahu soal apa.
   - **tahap 10 tidak boleh punya arah.** begitu bilah-bilahnya habis berurutan
     dari satu sisi ke sisi lain, ia menggambar penyebaran — persis yang baru
     saja dicoret di tahap 9.
   - label "T T L" boleh ditulis kecil di tahap 2 dan tidak pernah diucapkan.
     yang mencari akan menemukannya; yang mendengarkan tidak kehilangan apa pun.
   - satu-satunya kali panggung dibelah di episode ini. karena itu garis
     pembelahnya digambar, bukan tiba-tiba ada — penonton harus melihat
     panggungnya dibelah, supaya menyatu lagi di tahap 8 juga terbaca.
