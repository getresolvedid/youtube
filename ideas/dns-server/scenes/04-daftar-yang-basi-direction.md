Anggaran: mulai 40,60 dtk · durasi 23,53 dtk (estimasi, VO belum jadi).
Delapan baris VO = delapan tahap.

Scene yang menutup jalan keluar yang paling jelas — dan menutupnya **di depan
mata penonton**, bukan lewat klaim. Seluruh bebannya ada di tahap 5–7: penonton
harus melihat sendiri daftarnya basi lebih cepat daripada bisa ditulis.

Frame pertamanya mewarisi tahap 6 scene lalu: nama di kiri, nomor di kanan,
ruang kosong di antaranya.

1. nama dan nomor ditarik saling mendekat sampai berdampingan di tengah.
   gerakannya terasa seperti solusi — dua benda yang berjauhan akhirnya bertemu.
   (VO: "Jadi tinggal disimpan saja, kan?")

2. garis vertikal tergambar di antara keduanya; garis horizontal di bawahnya.
   jadi satu baris tabel. rapi, memuaskan.
   (VO: "Satu daftar panjang. Nama di kiri, nomornya di kanan.")

3. barisnya mengecil dan turun masuk ke siluet komputer di kiri bawah —
   siluet yang sama dari scene 3.
   (VO: "Komputermu tinggal membuka daftarnya sendiri.")

4. barisnya keluar lagi, kali ini di tengah frame, dan tabelnya mulai memanjang
   ke bawah: baris demi baris tergambar, cepat, mengisi frame.
   (VO: "Sekarang coba tulis semuanya.")

5. baris paling atas menyala HIJAU sesaat: selesai, benar.
   satu baris saja. penonton harus sempat merasa ini berhasil.
   (VO: "Baris pertama selesai.")

6. beberapa baris di TENGAH berubah nomornya sendiri — angkanya bertukar di
   tempat, tanpa ada yang menyentuhnya. tiga baris, berurutan cepat.
   (VO: "Dan di saat yang sama, nomor di baris lain sudah berganti.")

7. baris yang berubah tadi menyala MERAH dan tetap merah.
   ekor daftar di bawah masih terus memanjang ke bawah, dan tidak pernah
   mencapai ujung frame — ia keluar dari bawah dan terus berjalan.
   merah menular ke baris lain, satu per satu, lebih cepat daripada baris baru
   yang ditulis.
   (VO: "Yang di bawah belum sempat ditulis, yang di atas sudah salah.")

8. SEMUANYA membeku. gerakan berhenti total, satu frame diam.
   di layar: sedikit hijau di atas, merah di mana-mana, ekor yang menggantung.
   (VO: "Daftar itu tidak akan pernah benar.")

motion:
   - mendekat: dua `t()` x simetris, `E.power2out`, 0,7 dtk
   - garis tabel: `gambarGaris()`, cepat, 0,3 dtk
   - masuk ke komputer: `scale` + `y` bersamaan, `E.power2in`
   - tabel memanjang: jumlah baris = `Math.floor(t(...))` — fungsi murni dari
     detik, JANGAN pakai state atau interval
   - nomor bertukar: tiap baris punya `mulai` sendiri yang diturunkan dari
     indeksnya (`i * 0,26`), bukan dari acak. deterministik dan bisa di-seek
   - merah menular: sama, `mulai` per baris dari indeks, laju lebih cepat
     daripada laju baris baru — perbandingan dua laju itu isi tahap 7
   - membeku: tidak ada tween baru setelah `B_TUTUP`; semua `t()` sudah
     terjepit di nilai akhirnya
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **hijau muncul lebih dulu, dan cuma sekali.** tanpa satu detik rasa berhasil
     di tahap 5, kegagalan di tahap 7 tidak terasa sebagai kegagalan — cuma
     sebagai layar merah yang memang begitu dari awal.
   - **ekor daftar tidak boleh punya ujung.** begitu ia berhenti di suatu baris,
     penonton melihat pekerjaan yang bisa selesai. ia harus keluar dari bawah
     frame dan terus berjalan sampai frame terakhir.
   - **laju merah > laju baris baru.** itu satu-satunya angka yang benar-benar
     penting di scene ini, dan ia relatif — tidak perlu sumber, karena yang
     dinyatakan cuma "lebih cepat", bukan berapa.
   - **nomornya berubah sendiri, tanpa pelaku.** jangan menggambar tangan atau
     kursor yang mengubahnya. siapa yang mengubahnya baru dijawab di scene 6
     tahap 11, dan jawaban itu bayarannya.
   - merah dan hijau di sini adalah satu-satunya pemakaian warna status di
     bagian 3. sesudah scene 5, aksen mengambil alih sebagai warna jawaban.
