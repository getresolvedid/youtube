Anggaran: mulai 175,86 dtk · durasi 35,98 dtk (estimasi, VO belum jadi).
Sepuluh baris VO = sepuluh tahap.

**Scene yang paling boleh dipotong kalau episodenya kepanjangan** (`naskah.md`).
Kalau itu terjadi, baris terakhir `08-umur-catatan` harus diganti supaya
sambungannya ke `10-polos` tidak menganga.

Frame pertamanya = frame terakhir `08-umur-catatan`: kisi catatan dengan bilah
umurnya masing-masing, menyusut sendiri-sendiri. **Geometrinya diimpor**
(`KISI_CATATAN` dari `08-umur-catatan.tsx`), bukan digambar ulang dari angka —
termasuk panjang tiap bilahnya, yang dihitung dari detik terakhir scene itu.

1. seluruh kisi catatan mengecil dan berkumpul ke satu titik — tempat laci
   dibuka di tahap 2 — lalu habis. laci muncul dari titik yang sama.
   (VO: "Dan yang punya tanggal habis itu bukan cuma satu kartu.")

2. kamera turun ke laci loket itu. lacinya ditarik keluar, lebih lebar daripada
   di scene 5 — bukaannya sendiri yang jadi berita.
   (VO: "Sekarang buka lacinya lebih lebar.")

3. di dalamnya bukan satu kartu: TIGA kartu berdiri berjajar, tinggi sama,
   warna berbeda. label kecil di sudut tiap kartu boleh ditulis, tidak diucapkan.
   (VO: "Satu nama ternyata menyimpan beberapa kartu sekaligus.")

4. kartu pertama diangkat sedikit dari laci. garis dari kartu itu berjalan ke
   sebuah halaman di kanan atas. halaman itu menyala.
   (VO: "Ada kartu yang menunjuk ke halamannya.")

5. kartu kedua diangkat. garisnya pergi ke arah yang BERBEDA SAMA SEKALI — ke
   kotak surat di kanan bawah. jarak antara kedua tujuan itu harus lebar.
   (VO: "Ada kartu terpisah yang menunjuk ke mana suratnya dikirim.")

6. kartu ketiga diangkat. isinya bukan tujuan melainkan sebuah NAMA lain,
   dan garisnya menunjuk BALIK ke laci itu sendiri — melengkung, kembali.
   (VO: "Ada juga kartu yang isinya cuma satu kalimat: tanya nama lain saja.")

7. kartu pertama dicabut dan diganti kartu baru.
   garis ke halaman berpindah ke halaman yang lain, mulus, tanpa putus.
   halaman baru menyala hijau sesaat: baik-baik saja.
   (VO: "Makanya sebuah situs bisa pindah dengan halaman yang baik-baik saja,")

8. kartu kedua TIDAK disentuh. ia memudar jadi abu-abu di tempatnya.
   garisnya ke kotak surat memudar; kotak suratnya berhenti menerima —
   surat yang datang memantul dan jatuh.
   (VO: "sementara suratnya berhenti sampai berhari-hari.")

9. kedua kartu disandingkan berdampingan di tengah, dilepas dari lacinya:
   satu terang dan sudah pindah, satu abu-abu dan tertinggal.
   (VO: "Yang dipindahkan cuma satu kartu, dan kartu satunya ketinggalan.")

10. kamera mundur. ketiga kartu keluar dari laci dan berjalan di jalur mendatar,
    terbuka, tanpa amplop. isinya terbaca dari luar sepanjang perjalanan.
    frame terakhir: kartu-kartu di jalur, dan jalur itu memanjang keluar frame.
    (VO: "Dan semua kartu itu diantar bolak-balik tanpa satu pun pemeriksaan.")

motion:
   - kisi berkumpul: `x`/`y` ke titik laci + `scale` mengecil, `E.power2in`,
     lalu opasitasnya habis. lacinya baru menyala SETELAH kisinya hampir hilang
     — dua gerakan yang bersilangan di titik yang sama membuat titik itu terbaca
     sebagai tempat, bukan sebagai kebetulan
   - laci ditarik: sama dengan scene 5 tapi `dari`/`ke` lebih jauh — pengulangan
     gerakan yang sama dengan jarak berbeda, supaya "lebih lebar" terbaca
   - kartu diangkat: `y` -18px + bayangan menguat, `E.expoOut`, satu per satu
   - garis tujuan: `gambarGaris()`, lengkung untuk kartu ketiga (`Q` di path)
   - kartu diganti (tahap 7): kartu lama `y` keluar `E.power2in`, kartu baru
     masuk `E.expoOut`, tumpang tindih 0,15 dtk — SAMA persis dengan scene 6
     tahap 12, karena kejadiannya memang kejadian yang sama
   - garis berpindah: interpolasi titik ujung path, bukan garis lama dipadamkan
     lalu garis baru digambar — "mulus, tanpa putus" itu isinya
   - surat memantul: `y` naik lalu turun `E.power2in` + rotasi kecil
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **kisi warisan itu WAJIB, dan sempat tidak ada sama sekali (2026-08-14).**
     Komposisinya dulu membuka dari layar kosong — `kumpul` cuma memudarkan laci
     masuk, dan tahap 1 di direction ini tidak pernah dibangun. Akibatnya
     potongan keras dari scene 8 jatuh di atas kedipan hitam sepersekian detik:
     tidak ada yang error, `npm run check` lulus, dan penonton cuma merasa
     scene ini "tiba-tiba" tanpa bisa menunjuk kenapa. Ditemukan `npm run jahit`
     — 48% benda dipegang; sesudah dibetulkan 97%. Jangan menghapus kisinya
     "karena tahap 1 kelihatan cuma transisi": ia SATU-SATUNYA yang menyambungkan
     scene ini ke sebelumnya di layar.
   - **`KISI_CATATAN` diimpor dari `08-umur-catatan.tsx`, tidak disalin.** Posisi,
     skala, dan rumus panjang bilahnya milik scene 8; scene ini cuma membacanya
     pada detik terakhir scene itu (`cari()` + `beat()` dari `timing.gen.ts`,
     bukan angka yang diketik). Begitu satu kalimat VO scene 8 berubah, panjang
     bilah di frame pertama scene ini ikut sendiri.
   - **jarak antara halaman dan kotak surat harus lebar.** kalau keduanya
     berdekatan, penonton tidak merasa kartunya menunjuk ke arah yang benar-benar
     berbeda — dan seluruh kejadian di tahap 7–8 kehilangan sebabnya.
   - **kartu ketiga ditaruh terakhir karena ia yang paling aneh.** kartu yang
     isinya menyuruh bertanya lagi butuh waktu cerna; di tengah, penonton masih
     mengunyahnya saat kartu berikutnya datang.
   - **nama teknis kartunya boleh di layar, tidak pernah di VO.** label kecil di
     sudut kartu, ukuran mono terkecil. yang mencarinya akan menemukannya.
   - **tahap 8: kartu kedua tidak disentuh siapa pun.** jangan menggambar tangan
     yang lupa memindahkannya. yang terjadi adalah kelalaian karena kartunya
     memang terpisah — bukan kesalahan seseorang yang bisa disalahkan.
   - **tahap 10 bukan bagian dari isi scene ini** — ia jembatan visual ke
     `10-polos`, dan jalur mendatar itulah panggung scene berikutnya. tanpa
     tahap ini, scene 10 mulai dari layar yang tidak dikenal.
   - hijau di tahap 7 dipakai sekali dan sebentar. ia satu-satunya warna status
     di bagian 6, dan gunanya cuma menegaskan bahwa halamannya memang tidak
     bermasalah — supaya kegagalan suratnya terasa ganjil.
