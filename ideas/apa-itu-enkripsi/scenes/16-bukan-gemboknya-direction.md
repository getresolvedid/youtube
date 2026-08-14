Anggaran: mulai 331,49 dtk · durasi 29,07 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Frame pertamanya = frame terakhir `15-dibuka-di-ujung`: dua jalur berdampingan
dengan label kembar. Jalur bawah turun keluar frame di tahap 1 dan kotaknya
kembali ke tengah, ke posisi yang sama dengan scene 4 dan 12.

Scene penutup. **Tidak ada benda baru sama sekali** — ketiga sebabnya sudah
pernah terlihat, dan yang baru cuma urutannya. Itu juga yang membuat penutup ini
terasa sebagai kesimpulan, bukan sebagai bagian tambahan.

1. dua jalur menyatu kembali jadi satu kotak tergembok di tengah frame. sorotan
   pindah MENJAUH dari gemboknya, ke ruang di sekitarnya.
   (VO: "Jadi kalau ada yang bocor, gemboknya justru curiga terakhir.")

2. meja kanan muncul lagi di posisi tetapnya. kuncinya kali ini tergeletak DI
   LUAR meja, di lantai, di luar lingkaran yang digambar scene 8.
   (VO: "Yang lebih sering, kuncinya ditaruh di tempat yang bisa diambil orang.")

3. bangunan di tengah jalan dari scene 15 menyala sebentar. isi kotak terbaca di
   dalamnya, dan tidak ada tanda tanya di mana pun.
   (VO: "Atau kotaknya memang dibuka di ruang antara, dan tidak ada yang pernah bertanya di mana.")

4. surat pengenal dari scene 11 ditampilkan dekat. namanya benar; gemboknya di
   sebelahnya bukan gembok yang kamu maksud.
   (VO: "Atau kamu sendiri yang membukakan, karena nama di surat pengenalnya kelihatan benar.")

5. ketiganya berdiri sejajar di layar. di tengah mereka, gemboknya sendiri tetap
   UTUH dan tetap terkunci.
   (VO: "Gemboknya bekerja.")

6. ketiga sebab tadi meredup. yang tersisa terang cuma gemboknya, sendirian.
   (VO: "Dia cuma tidak pernah menjanjikan hal-hal itu.")

7. kamera mundur ke jalan penuh. jalannya menyala terang dari kiri ke kanan,
   lalu bagian tengahnya meredup dan cuma KEDUA UJUNGNYA yang tetap terang.
   (VO: "Yang dijaga gembok adalah jalannya. Ujungnya, tetap urusan kita.")

motion:
   - jalur bawah keluar: `t()` pada y +320 + opacity 0, `E.power2in`
   - tiga sebab: masing-masing `masuk()` geser 20 dan TETAP di layar sampai
     tahap 6 — mereka harus sempat berdiri bersama di tahap 5
   - tahap 6: opacity ketiganya 1 -> 0,15 serentak, gembok tetap 1
   - tahap 7: `kamera({skala: 1})` + jalan `gambarGaris()` penuh, lalu bagian
     tengah opacity turun sementara dua ujung tetap

catatan:
   - **tahap 5 wajib memperlihatkan gemboknya tetap utuh.** seluruh kalimat
     bawa-pulang bergantung padanya; gembok yang digambar retak menyampaikan
     kebalikan dari yang dikatakan.
   - **ketiga sebab memakai benda yang persis sama** dengan scene 8, 15, dan 11 —
     posisi, ukuran, dan bentuknya. benda baru di scene penutup membuat penonton
     mengira ada bahan yang belum dijelaskan.
   - **tidak ada teks kesimpulan di layar.** kalimat bawa-pulang milik VO;
     menulisnya juga di layar membuatnya terbaca sebagai slide penutup.
   - **tahap 7 adalah gambar terakhir episode**, langsung disusul tanda brand
     tanpa transisi. jangan menutupnya dengan fade — potongan keras itu
     gayanya (docs/03), dan `<TandaBrand>` punya koreografi masuknya sendiri.
   - jahitan ke `99-closing` tidak diperiksa `npm run jahit`: scene standar
     menyela, dan tanda brand memang layar lain (docs/10).
