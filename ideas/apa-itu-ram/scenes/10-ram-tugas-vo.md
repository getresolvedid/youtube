# 10-ram-tugas · rencana VO

Bagian 7 [case] — **scene penutup episode**, dan satu-satunya scene bagian 7
yang sudah ada (scene isinya — mesin nyata, ponsel, server — masih utang, dan
tempatnya SEBELUM scene ini). Lima scene sebelumnya membedah
mejanya makin dekat — ukurannya, wujudnya, angka di batangnya, lalu bedanya
dengan gudang — dan yang terakhir (`09-beda-penyimpanan`) berhenti pada meja yang
kosong begitu listriknya dicabut. Scene ini menarik
kameranya mundur ke panggung yang sama seperti bagian 3–5, lalu mengurung
bendanya: **ini yang dikerjakan meja, dan ini yang bukan tugasnya.**

Yang harus berubah di kepala penonton: batas bendanya. Sampai sini ia tahu meja
itu berguna; yang belum ia punya adalah tepiannya — bahwa yang mengerjakan tetap
prosesor, bahwa aslinya tidak pernah pindah dari gudang, dan bahwa meja yang
lebih lebar memuat lebih banyak, bukan bekerja lebih cepat. Ketiganya adalah
salah paham yang paling sering dibawa orang ke toko.

**Ini tetap bukan babak rangkuman.** [docs/02 § Aturan flow](../../../docs/02-format-video.md)
melarang babak "rangkuman" terpisah, dan larangan itu tetap berlaku: scene ini
tidak mengulang isi episode dari awal. Yang dikerjakan enam beat pertamanya
adalah menetapkan **batas** bendanya, dan dua beat terakhirnya menaruh **kalimat
bawa-pulang** — yang oleh aturan yang sama memang ditempatkan "sebagai penutup
[case], lalu langsung tanda brand". Itu sebabnya bagian scene ini pindah dari
"6 explaining" ke "7 case": bukan karena isinya berubah, tapi karena di sinilah
episode ditutup.

Satu baris di blok `## VO` = satu **beat**. Detiknya dihitung
[`tools/baca-episode.mjs`](../../../tools/baca-episode.mjs) dari jumlah kata —
jangan pernah mengetik detik di berkas ini. Formatnya: [docs/11](../../../docs/11-rencana-vo.md).

## VO

Sekarang mundur sedikit, lihat mejanya utuh lagi.
Tugas meja cuma satu. Menaruh yang sedang dipakai, dekat dan terhampar.
Selebihnya bukan tugasnya.
Meja tidak mengerjakan apa pun. Yang mengerjakan tetap prosesor.
Meja juga tidak menyimpan. Aslinya tetap di gudang sejak tadi.
Dan meja yang lebih lebar tidak membuat prosesor jadi lebih cepat.
Ia cuma memuat lebih banyak sekaligus.
Jadi yang sedang dipakai ada di ram. Sisanya tetap di gudang.
Dan ram yang lebih besar cuma menolong kalau mejamu memang sudah penuh.

## Sinkron

Urutannya sama dengan blok di atas; koreografinya di
[`10-ram-tugas-direction.md`](10-ram-tugas-direction.md).

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Batang yang tertahan di scene sebelumnya melebar dan menipis jadi papan meja; lemari dan prosesor masuk kembali ke tempatnya yang lama. |
| 1 | Berkas terhampar di permukaan meja, tautan pendek ke prosesor berdenyut. Baris pertama mendarat di kolom kiri dengan tanda centang. |
| 2 | Kolom kanan dibuka: garis pemisah tegak tergambar, judulnya muncul. |
| 3 | Prosesor menyala dan berdenyut, percikan kecil di sisinya. Meja diam total. Tanda silang pertama. |
| 4 | Riak keluar dari laci lemari — berkas aslinya masih di sana. Tanda silang kedua. |
| 5 | Meja melebar; lompatan meja ke prosesor berjalan dengan ritme yang sama persis seperti sebelum melebar. Tanda silang ketiga. |
| 6 | Berkas tambahan mendarat di ruang meja yang baru. Baris kedua di kolom kiri, tanda centang. |
| 7 | Dua kolom meredup. Berkas di meja berdenyut bersamaan, lalu laci lemari ikut berdenyut sekali. |
| 8 | Meja terisi sampai tidak ada ruang tersisa; kata "penuh" mendarat di tepinya. |

## Catatan

- **Tidak ada undangan membayangkan, dan itu disengaja** (HARD RULE 6). Panggung
  ini sudah berdiri sejak scene 3 dan tidak pernah dibongkar; scene 8 cuma
  mendekatkan kamera ke salah satu bendanya. "Sekarang mundur sedikit" adalah
  **arahan pandang** di dalam gambaran yang sama ([docs/11 § Bentuk undangan](../../../docs/11-rencana-vo.md)),
  bukan ajakan membayangkan sesuatu yang baru. Mengundang lagi di sini akan
  membuat penonton menaruh mejanya dan menunggu benda lain datang.
- **Jembatan dari `08-ram-generasi` bentuknya "mundur sejenak"** (HARD RULE 7).
  Baris terakhir scene sebelumnya menutup dengan benda yang gagal masuk ke slot
  ("Jadi batang baru tidak masuk ke slot lama."), dan baris pertama di sini
  tidak bisa dibaca sendirian: "mundur" dari apa, "utuh lagi" sesudah apa —
  keduanya cuma punya jawaban kalau scene sebelumnya masih terdengar. Scene ini
  scene terakhir sebelum closing, jadi ia tidak punya sambungan ke bawah.
- **Tidak ada satu nama baru pun di scene ini.** "ram" sudah dinamai di scene 4,
  "prosesor" di scene 3, dan keduanya dipakai apa adanya. Kata "meja" sengaja
  dipakai sepanjang scene, bukan "ram", karena yang sedang dibatasi adalah
  bendanya — dan bendanya yang penonton lihat di layar memang meja.
- **"terhampar" adalah panggilan balik ke `5-kenapa-cepat`**, kata yang sama
  persis. Tugas meja di beat 1 bukan cuma "dekat": tanpa "terhampar", separuh
  isi bagian 5 hilang dari daftar tugasnya.
- **Beat 1 dua kalimat dalam satu baris.** "Tugas meja cuma satu" tidak berdiri
  sendiri — ia janji yang harus langsung ditebus di napas yang sama, dan
  memecahnya jadi dua beat meninggalkan layar menunggu dengan janji yang belum
  dibayar.
- **Beat 5 dan 6 satu gagasan yang dipotong dua baris**, dan itu yang membuat
  bantahannya bekerja. Mejanya harus sudah selesai melebar sebelum "cuma memuat
  lebih banyak" diucapkan; kalau digabung, penonton mendengar kesimpulannya
  sementara mejanya masih bergerak.
- **"Meja lupa saat listrik mati" sudah dikerjakan `09-beda-penyimpanan`**, tepat
  sebelum scene ini, dan karena itu ia TIDAK diulang sebagai baris keempat "bukan
  tugasnya". Alasannya bukan kehabisan tempat: di sana ia sebuah **beda** yang
  dibuktikan dengan gudang yang tidak ikut kosong di sebelahnya; dipindah ke sini
  ia jadi satu baris daftar tanpa pembanding, dan kehilangan seluruh isinya.
  Beat 4 di sini ("Meja juga tidak menyimpan") sudah memikul akibatnya.
- **"tidak membuat prosesor jadi lebih cepat" adalah klaim mekanisme, bukan
  saran beli** — dan beat 8 sengaja berhenti di batas yang sama. "Cuma menolong
  kalau mejamu memang sudah penuh" menyebut SYARATNYA, bukan berapa banyak yang
  harus dibeli; angka dan mesin nyata milik scene [case] yang belum ditulis, dan
  milik Short 2 yang menulis ulang hook-nya dari nol
  ([docs/02 § Aturan Shorts](../../../docs/02-format-video.md)). Karena tidak ada
  satu angka pun di scene ini, tidak ada baris `sumber:` baru yang perlu ditutup
  di `naskah.md`.
- **Beat 7 dan 8 adalah kalimat bawa-pulang `naskah.md`**, diterjemahkan ke
  kosakata yang sudah dipakai sepanjang episode: "penyimpanan" jadi "gudang",
  karena itu kata yang penonton lihat bendanya. Kata "ram" dipakai di sini —
  bukan "meja" seperti enam beat sebelumnya — justru karena kalimat ini yang ia
  bawa keluar dari video: yang tertulis di rak toko adalah RAM, bukan meja.
- **Dua beat itu tidak boleh digabung jadi satu baris.** Yang pertama menutup
  gambarannya (dua tempat, dua isi), yang kedua menutup keputusannya (kapan
  menambah berguna) — dan di layar keduanya butuh kejadian yang berbeda: meja
  yang penuh baru boleh terlihat setelah "sisanya tetap di gudang" selesai
  diucapkan.
- **"memuat", bukan "menampung".** Yang sedang dibandingkan adalah berapa banyak
  yang bisa terbuka sekaligus, dan "memuat" itu kata yang dipakai orang untuk
  meja, bukan untuk wadah.
- Tidak ada kata dari daftar larangan L1 ([docs/09](../../../docs/09-tangga-abstraksi.md)):
  bukan "data" tapi "berkas" yang di layar, bukan "menyimpan data" tapi "aslinya
  tetap di gudang".
