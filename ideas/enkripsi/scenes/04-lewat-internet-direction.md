Anggaran: mulai 34,37 dtk · durasi 12,31 dtk (estimasi, VO belum jadi).
Tiga baris VO = tiga tahap.

Panggung yang dibangun di sini **dipakai lagi apa adanya di
`07-terkunci-di-jalan`**, dan itu bukan penghematan — seluruh pelajaran episode
ini ada di perbandingan kedua scene itu. Karena itu semua koordinatnya milik
`../panggung-kiriman.tsx`, bukan berkas ini.

Yang harus terjadi: penonton menerima bahwa pesannya **menempuh jalan**, dan
jalan itu punya banyak tempat singgah yang bukan milik siapa-siapa yang ia kenal.

1. paket masuk dari kiri. jaringannya tersingkap bertahap — mula-mula tiga
   simpul di jalur, lalu sisanya, lalu simpul-simpul jauh muncul di atas dan
   di bawah jalur, lebih redup. jaringan yang terasa jauh lebih besar daripada
   satu garis.
   (VO: "Pesan tersebut diubah menjadi data, lalu dikirim melalui jaringan internet.")

2. paket menyusuri simpul satu per satu, dari kiri ke kanan. tiap simpul
   MENYALA sebentar saat paketnya sampai, lalu redup lagi. kamera bergerak
   mendatar mengikuti paketnya.
   (VO: "Data ini dapat melewati beberapa perangkat dan jaringan sebelum mencapai tujuan.")

3. HP penerima muncul di ujung kanan jalur. kamera MELAMBAT, paket mendekat,
   lalu berhenti sebelum sampai. panggungnya diam sesaat. lalu pertanyaannya
   mendarat di ruang kosong di atas jalur.
   (VO: "Dan di sinilah muncul pertanyaan penting.")
   TEKS LAYAR: "Bagaimana jika data itu dilihat oleh orang lain?"

motion:
   - jaringan tersingkap: satu nilai `luas` 0 → 1 dengan `E.expoOut`, dipakai
     simpul jauh sekaligus. simpul jalur muncul lewat `masuk()` dengan `urutan`,
     jadi mereka berdatangan berurutan dari kiri
   - NYALA SIMPUL DITURUNKAN DARI POSISI PAKET, bukan dari waktu —
     `nyalaDariJarak(xPaket, xSimpul)` di `../panggung-kiriman.tsx`. simpul
     menyala karena ADA YANG LEWAT, jadi nyalanya tidak pernah meleset saat satu
     kalimat VO berubah dan seluruh timing bergeser
   - kamera mendatar: `translate` pada grup, bukan `scale`. besarnya benda tidak
     boleh berubah di scene ini — yang berubah cuma bagian jaringan yang terlihat
   - kamera melambat di tahap 3: `E.expoOut` pada tween paket yang durasinya
     lebih panjang dari dua tahap sebelumnya
   - teks pertanyaan: `masuk()` geser 24, `mulai` di EKOR tahap 3 — sesudah
     panggungnya diam, bukan bersamaan dengan berhentinya paket

catatan:
   - **jeda hening sebelum teksnya muncul dibayar dari `VO_PAD_SECONDS`**, bukan
     dari beat sendiri. rencana VO tidak punya cara menuliskan hening (satu baris
     kosong bukan beat), jadi teksnya dijatuhkan di ekor beat 2 di `.tsx`.
   - **tidak ada kabel, tidak ada ikon perangkat, tidak ada tulisan teknis** —
     arahan user: *"Do not show actual physical cables everywhere. The network
     should feel digital and abstract."* dan tidak ada kata "server", "IP", atau
     "router" di layar. jalurnya garis putus-putus dengan simpul bulat, titik.
   - **CUMA SATU PAKET DI LAYAR**, dan itu arahan user: *"Do not have multiple
     identical packets moving at once."* paket kedua membuat penonton kehilangan
     yang mana yang pesannya.
   - **belum ada yang mengamati di scene ini.** jaringannya harus terbaca netral
     dulu; sosok ketiga yang sudah berdiri di sini membuat tahap 1 dan 2 terasa
     seperti pengintaian, dan scene 5 tinggal mengulang.
   - **HP penerima muncul PERTAMA KALI di tahap 3**, dan ia dipakai ulang di
     scene 7 dan 8 di koordinat yang sama persis.
   - **jangan menambah animasi di simpul yang tidak dilewati.** jaringan yang
     seluruhnya berkedip terbaca sebagai latar dekoratif, dan mata penonton
     berhenti mengikuti paketnya.
