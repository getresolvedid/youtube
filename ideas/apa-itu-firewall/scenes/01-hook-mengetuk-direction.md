Anggaran: mulai 0 dtk · durasi 30,85 dtk (estimasi, VO belum jadi).
Sebelas baris VO = sebelas tahap.

Frame pertama episode, dan **tempat satu-satunya analogi episode ini didirikan**:
laptop = gedung, isimu di dalam, dindingnya menghadap ke luar. Yang harus terjadi
di sini dua hal — penonton menerima pemetaan itu, lalu menerima bahwa sisi
luarnya ramai.

**Layar dan dinding gedung SEUKURAN, dan itu inti scene ini.** `Layar` di
`../panggung-gedung.tsx` menggambar bidang `GEDUNG.w x GEDUNG.h` yang sama persis
dengan dinding, di koordinat yang sama persis. Jadi laptop tidak digantikan
gedung — ia **jadi** gedung, tanpa satu benda pun berpindah tempat. Kalau
ukurannya dibedakan, yang terbaca dua gambar yang saling menggantikan, dan
penonton kehilangan bahwa keduanya benda yang sama.

1. layar laptop mengisi frame, kamera dekat. halamannya biasa: bilah jendela,
   beberapa baris isi. tidak ada apa pun yang mencurigakan.
   (VO: "Laptopmu lagi nyala, halamannya terbuka, semuanya biasa saja.")

2. kamera MUNDUR. bidang layar mengecil ke ukuran sebenarnya di panggung, kaki
   laptop memudar, dinding dan atap gedung tergambar di bidang yang sama.
   garis lantai muncul di bawahnya.
   PEMETAANNYA JATUH DI SINI, di kalimat dan di gambar sekaligus.
   (VO: "Sekarang anggap saja laptop itu sebuah gedung.")

3. isi halaman tadi tidak hilang: ia menyusut jadi beberapa bilah redup di
   dalam gedung, di ruang kosong di atas deretan pintu. ia masih di sana,
   cuma sekarang di dalam.
   (VO: "Semua yang kamu pakai ada di dalamnya.")

4. bilah-bilah itu memudar. pandangan berpindah ke luar: yang tersisa dinding
   luarnya, dengan deretan pintu yang belum bernomor.
   (VO: "Coba tengok dinding luarnya sebentar.")

5. satu ketukan lahir di tepi kiri dan bergerak ke kanan sampai menyentuh
   dinding. pelan, jelas, satu-satunya benda yang bergerak.
   (VO: "Ada yang mengetuk di luar sana.")

6. ketukan itu TIDAK berbalik pergi. ia tinggal menempel di dinding.
   satu detik diam, dan diamnya yang bikin janggal.
   (VO: "Bukan mau menyapa.")

7. daun pintu di dinding mulai BERGETAR satu per satu, kiri ke kanan — pendek,
   kering, seperti gagang yang ditarik dari luar lalu dilepas lagi. tidak ada
   satu pun yang terbuka.
   (VO: "Mereka lagi cari pintu yang lupa dikunci.")

8. ketukan berikutnya menyusul dari ketinggian berbeda, lalu berikutnya lagi.
   tiga sampai lima sekaligus di layar, saling susul, tidak berhenti.
   (VO: "Terus-menerus, sejak tadi, dan bukan cuma malam ini.")

9. dinding tetap utuh. tidak ada satu pun tanda ketukan yang menembus, dan
   tidak ada satu pun pintu yang terbuka.
   (VO: "Tidak satu pun dari mereka sampai ke layarmu.")

10. SEMUA ketukan membeku di tempatnya, serentak, di tengah jalur. panggungnya
    mendadak diam.
    (VO: "Tidak satu pun.")

11. pertanyaannya mendarat di ruang kosong sebelah kiri atas, di atas jalur
    ketukan yang membeku. tidak ada elemen lain yang bergerak.
    (VO: "Jadi siapa yang menahan mereka di luar?")

motion:
   - kamera mundur: satu `kamera({skala})` dari 1,55 ke 1,0 dengan `E.expoOut`,
     dipakai SELURUH grup — bukan tiap elemen sendiri-sendiri, kalau tidak yang
     terbaca elemen berpencar
   - layar -> gedung: dua opasitas berlawanan di rentang yang sama, tanpa geser
   - ketukan: `t()` pada x dari `X_LUAR` ke tepi dinding, `E.power1out`; tiap
     ketukan punya `mulai` sendiri yang diturunkan dari beat, bukan dari acak
   - bilah isi tahap 3: `masuk()` dengan `urutan`, lalu satu opasitas turun di
     tahap 4 — mereka MEMUDAR, tidak menyusut lagi. menyusut dua kali berturut
     terbaca sebagai dua benda berbeda
   - getar pintu tahap 7: `getar()` per pintu dengan `mulai` bertingkat, jauh 7px,
     durasi 0,5 — ia meluruh sendiri ke nol, jadi tiap pintu berhenti persis di
     tempatnya semula
   - beku di tahap 10: seluruh tween ketukan `mulai`-nya lewat, jadi nilainya
     menjepit sendiri di ujung — tidak ada state yang disimpan
   - pertanyaan: `masuk()` geser 24, durasi 0,5

catatan:
   - **`Peretas` muncul bersama ketukan pertama, dan ini kali pertama penonton
     melihatnya di seluruh episode.** ia berdiri di titik lahirnya ketukan, tidak
     bergerak, dan ikut membeku waktu `dBeku` berhenti di B_TIDAK2 — pertanyaan
     penutup hook jatuh di atas gambar yang benar-benar diam. alasan lengkap
     kenapa pengetuknya sekarang digambar: `04-siapa-pun-mengetuk-direction.md`.
   - **BIDANG LAYAR DAN DINDING SEUKURAN, dan tahap 2 sekarang menjelaskan
     kenapa.** Perubahannya sudah kuat sebagai gambar, tapi gambar yang kuat
     tidak sama dengan gambar yang dimengerti: tanpa kalimat "anggap saja laptop
     itu sebuah gedung", penonton menonton tiga belas scene berikutnya sebagai
     cerita tentang gedung, bukan tentang mesinnya sendiri. (arahan user
     2026-08-14.)
   - **bilah isi di tahap 3 memakai warna yang sama dengan isi layar di tahap 1**,
     dan itu wajib — ia harus terbaca sebagai benda yang SAMA yang berpindah ke
     dalam, bukan sebagai isi baru.
   - **NOMOR pintu belum muncul sama sekali di sini** — `nomorTampil` nol. pintunya
     boleh terlihat sebagai pintu, tapi "tiap pintu punya nomor" adalah temuan
     scene 3, dan nomor yang sudah terbaca samar di scene 1 membuat scene 3
     tinggal mengulang.
   - **tidak ada penjaga di layar, sama sekali.** dia baru berdiri di scene 6.
     satu siluet penjaga di sini akan menjawab pertanyaan hook sebelum bagian 3
     sempat membuat masalahnya terasa.
   - **maksud mereka disebut di VO (tahap 4 dan 5), jadi GAMBARNYA tidak ikut
     menaikkan nada.** ketukan tetap abu-abu, tanpa wajah, tanpa warna bahaya;
     yang ditambahkan cuma getar pintu, dan getar itu kering — bukan guncangan.
     kalau kata dan gambar sama-sama naik, hook-nya berubah jadi iklan antivirus,
     dan penonton yang merasa ditakut-takuti menutup video sebelum bagian 3.
     (arahan user 2026-08-14: konteksnya harus jelas bahwa mereka mencoba masuk.
     yang dinaikkan kalimatnya, bukan warnanya.)
   - **tidak ada pintu yang boleh terbuka di tahap 5.** getarnya berhenti di
     tempat semula, tiap kali. pintu yang terbuka di scene 1 membunuh seluruh
     bagian 3.
   - **gembok belum boleh muncul.** VO menyebut "lupa dikunci", tapi gemboknya
     sendiri baru digambar di scene 3 tahap 4. menggambarnya di sini memakai dua
     scene untuk satu temuan yang sama.
   - tahap 8 adalah satu-satunya detik sunyi di scene ini, dan ia dibayar dari
     jatah VO — bukan dari padding. jangan diisi gerakan apa pun.
