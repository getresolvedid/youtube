Anggaran: mulai 0 dtk · durasi ±15 dtk (estimasi dari 33 kata VO; angka
sebenarnya keluar dari `npm run gen`, tidak pernah diketik di sini).
Empat baris VO = empat tahap.

Sumbernya arahan user 2026-08-17, ditulis ulang ke bentuk baku repo. Yang
berubah cuma bentuknya, bukan isinya — yang berubah isi ditandai di `catatan:`.

Frame pertama episode. Yang harus terjadi dua hal berurutan: penonton menerima
bahwa pesan itu **menempuh jalan**, lalu menerima bahwa **ada yang lain di jalan
itu**. Tidak lebih. Tidak ada gembok, tidak ada kunci, tidak ada kotak terkunci
di scene ini — semuanya milik scene sesudahnya.

**Satu kalimat = satu gerakan utama, dan itu arahan user sendiri.** Kalau dua
benda bergerak bersamaan di satu tahap, yang kedua kalah dan penonton awam
kehilangan urutannya. Urutan yang harus terbaca: sosok → mengetik → mengirim →
paket berjalan → yang mengamati → pertanyaan.

1. meja kerja sederhana, laptop tertutup di belakang. satu sosok duduk,
   memegang HP. medium shot, seluruh sosok terlihat sampai pinggang.
   gerakannya nyaris nol: HP terangkat sedikit, layarnya menyala. tidak ada
   yang lain yang bergerak di frame.
   (VO: "Bayangkan kamu ingin mengirim sebuah pesan kepada temanmu.")

2. POTONG KERAS ke dekat — HP mengisi frame, mejanya hilang. gelembung chat
   "Apa kabar?" tumbuh huruf demi huruf di dalam layar. setelah kalimatnya
   utuh, tombol kirim menekan sekali, gelembung naik sedikit, dan satu tanda
   terkirim muncul di sudut bawahnya.
   (VO: "Kamu mengetik pesan, lalu menekan tombol kirim.")

3. kamera mengikuti gelembung KELUAR dari bidang layar. di luar layar ia
   mengeras jadi kotak kecil bersudut tegas — bentuknya berubah, warnanya
   tidak, supaya terbaca sebagai benda yang SAMA. kotak itu berjalan ke kanan
   di sepanjang jalur bertitik menuju HP kedua di ujung.
   (VO: "Pesan tersebut kemudian dikirim melalui internet menuju perangkat temanmu.")

4. kotak BERHENTI persis di tengah jalur. seluruh panggung diam. kamera merapat
   pelan. lalu di kejauhan, di luar jalur dan lebih redup, satu sosok kedua
   berdiri menghadap kotak itu — tidak bergerak, tidak mendekat, tidak
   dijelaskan siapa. pertanyaannya mendarat di ruang kosong di atas jalur.
   (VO: "Tapi, bagaimana jika ada orang lain yang mencoba melihatnya?")

motion:
   - potong tahap 1 → 2: POTONG KERAS, bukan zoom. docs/02 mematok 95%
     perpindahan tanpa transisi, dan yang menyambungnya VO (HARD RULE 7)
   - teks tumbuh tahap 2: satu `t()` pada jumlah huruf yang terlihat, bukan
     opasitas per huruf — yang kedua terbaca sebagai teks berkedip
   - gelembung naik: `masuk()` geser -16, durasi 0,35, sesudah kalimat utuh
   - gelembung → kotak tahap 3: satu tween pada radius sudut dan satu pada
     lebar, RENTANG YANG SAMA, tanpa opasitas. kalau ia memudar lalu muncul
     lagi, yang terbaca dua benda yang saling menggantikan
   - kotak berjalan: `t()` pada x dengan `E.power1out`, berhenti sendiri di
     tengah karena tweennya memang berakhir di situ — bukan state yang disimpan
   - kamera merapat tahap 4: satu `kamera({skala})` 1,0 → 1,12, `E.expoOut`,
     dipakai SELURUH grup
   - sosok kedua: `masuk()` opasitas saja, tanpa geser. dia tidak boleh terbaca
     sedang datang — dia sudah di situ sejak tadi, cuma baru terlihat
   - pertanyaan: `masuk()` geser 24, durasi 0,5

catatan:
   - **SOSOK KEDUA TIDAK DIJELASKAN, dan itu arahan user yang eksplisit.** tidak
     ada label, tidak ada wajah, tidak ada warna bahaya. dia berdiri di luar
     jalur dan lebih redup dari benda lain. presedennya `Peretas` di scene 1
     T15: sosok yang muncul di hook tanpa nama bekerja, sosok yang diberi nama
     di hook membunuh bagian 3.
   - **tidak ada istilah teknis di layar** — arahan user: tidak ada tulisan
     server, alamat, atau paket. jalurnya cuma garis bertitik dengan beberapa
     simpul bulat, tanpa satu huruf pun.
   - **kata "data" tidak dipakai di berkas ini** walaupun arahan user memakainya
     ("paket data"). ia ada di daftar larangan kosakata L1
     ([docs/09](../../../docs/09-tangga-abstraksi.md)), dan bendanya di layar
     memang cuma kotak tanpa label — jadi menyebutnya "paket" saja tidak
     kehilangan apa-apa dan menutup satu jalan kata itu merembes ke VO.
   - **DETIKNYA TIDAK DIKETIK, dan blok 0–2 / 2–4 / 4–6 / 6–8 di arahan user
     sengaja tidak disalin.** durasi tiap tahap dihitung `tools/baca-episode.mjs`
     dari jumlah kata baris VO-nya, dan komposisi memanggilnya lewat
     `beat("pesan-dikirim", n)`. begitu satu kalimat berubah, semua tahap
     sesudahnya bergeser sendiri — yang tidak akan terjadi kalau detiknya
     dipatok tangan. keempat blok itu tetap utuh sebagai **urutan**, cuma
     kehilangan angkanya.
   - **anggaran 8 detik tidak tercapai dengan naskah yang sekarang: ±15 detik.**
     yang memutuskan apakah itu masalah user, dan yang dipotong kalimatnya —
     lihat `01-pesan-dikirim-vo.md`.
   - **TEKS LAYAR TAHAP 4 BELUM DIPUTUSKAN.** arahan user menaruh
     "Tapi, apakah pesan itu benar-benar aman?" di layar sementara VO berbunyi
     "Tapi, bagaimana jika ada orang lain yang mencoba melihatnya?" — dua
     kalimat berbeda, jatuh bersamaan. penonton membaca yang satu sambil
     mendengar yang lain, dan yang menang biasanya yang dibaca. tiga jalan
     keluarnya: pakai kalimat yang sama persis, pendekkan yang di layar jadi
     dua-tiga kata ("Benar-benar aman?"), atau buang teksnya dan biarkan VO
     yang bertanya. **belum dipilih** — teks layar tetap tergambar sesuai
     arahan sampai user memutuskan.
   - **jahitan ke scene berikutnya lewat kartu judul**, dan itu sah
     ([docs/11](../../../docs/11-rencana-vo.md)). pertanyaan tahap 4 digantung,
     opening lewat tanpa suara, scene 3 menjawabnya tanpa mengulang
     pertanyaannya.
   - **sudut scene ini belum cocok dengan [ide.md](../ide.md)**, dan itu harus
     beres sebelum scene 3 ditulis. ide.md membuka dengan tombol "Lupa
     password?" dan memakai loker di gudang sewaan; scene ini membuka dengan
     paket yang berjalan di jalur. keduanya sudut yang sah, tapi satu episode
     cuma boleh punya satu analogi. tabel bandingannya di
     [`naskah.md`](../naskah.md#-dua-sudut-yang-sedang-bertabrakan--belum-diputuskan).
