# 01-hook-mengetuk · rencana VO

Bagian 1 [question]. Frame pertama sudah pertanyaannya — tanpa salam, tanpa
perkenalan ([docs/02](../../../docs/02-format-video.md)).

Yang harus berubah di kepala penonton: layar yang tenang itu ternyata punya
**sisi luar**, dan sisi luar itu ramai — dan yang ramai di situ **sedang mencoba
masuk**. Dia belum boleh tahu siapa yang menahan mereka; dia cuma perlu kaget
bahwa ada yang perlu ditahan, dan bahwa mereka tidak sedang lewat.

## VO

Laptopmu lagi nyala, halamannya terbuka, semuanya biasa saja.
Sekarang anggap saja laptop itu sebuah gedung.
Semua yang kamu pakai ada di dalamnya.
Coba tengok dinding luarnya sebentar.
Ada yang mengetuk di luar sana.
Bukan mau menyapa.
Mereka lagi cari pintu yang lupa dikunci.
Terus-menerus, sejak tadi, dan bukan cuma malam ini.
Tidak satu pun dari mereka sampai ke layarmu.
Tidak satu pun.
Jadi siapa yang menahan mereka di luar?

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Layar laptop memenuhi frame. Halaman biasa, diam, tidak ada apa-apa yang mencurigakan. |
| 1 | Kamera mundur. Bidang layar TIDAK berpindah — ia berubah jadi dinding luar sebuah gedung di tempat yang sama, berdiri di garis lantai. |
| 2 | Isi halaman tadi menyusut jadi beberapa bilah redup di dalam gedung. Ia masih di sana, cuma sekarang di dalam. |
| 3 | Bilah-bilah itu memudar. Yang tersisa dinding luarnya, dengan deretan pintu. |
| 4 | Ketukan pertama masuk dari tepi kiri dan mendarat di dinding. |
| 5 | Ketukan itu tidak berbalik. Ia tinggal di situ. |
| 6 | Daun pintu di dinding mulai bergetar satu per satu — ada yang mencoba membukanya dari luar. |
| 7 | Ketukan datang dari beberapa arah sekaligus, saling susul, tidak berhenti. |
| 8 | Dinding tetap utuh. Tidak satu pun tanda ketukan menembus ke dalam. |
| 9 | Semua ketukan membeku di udara sekaligus. Layarnya mendadak sunyi. |
| 10 | Pertanyaannya menggantung di atas gedung yang diam. |

## Catatan

- **Undangan ada di beat 1, dan ia MENAMAI analoginya.** "Anggap saja laptop itu
  sebuah gedung" adalah bentuk andaian ([docs/11 § Bentuk undangan](../../../docs/11-rencana-vo.md)),
  dan ia mendirikan gambaran yang dipakai empat belas scene berikutnya. Beat 0
  sengaja bukan undangan: ia adegan yang memang sedang dialami penonton saat
  menonton, jadi tidak ada yang perlu dibayangkan.
- **Beat 2 memetakan analoginya, dan tanpa itu perubahannya cuma trik gambar.**
  Ditambahkan 2026-08-14 atas arahan user: sebelumnya laptop berubah jadi gedung
  di layar tanpa satu kata pun yang bilang kenapa, dan penonton yang tidak
  menangkap pemetaannya akan menonton tiga belas scene berikutnya sebagai cerita
  tentang gedung, bukan tentang mesinnya sendiri. Yang dipetakan cukup satu hal —
  isimu ada di dalam — karena pintunya baru jadi bahasan di scene 3.
- **Beat 3 bukan undangan kedua.** "Coba tengok dinding luarnya" adalah arahan
  pandang di dalam gambaran yang barusan berdiri, dan bentuk itu memang yang
  dipakai untuk berpindah di dalam satu gambaran. Dua ajakan membayangkan dalam
  satu scene dilarang (docs/11), dan yang di sini cuma satu.
- **Kata "firewall" tidak muncul, dan kata "penjaga" juga belum.** Yang berdiri
  di scene ini cuma gedung, pintu, dan ketukan. Penjaganya baru masuk di scene 6
  — dan kalau dia sudah terlihat di sini, bagian 3 kehilangan seluruh tekanannya
  (HARD RULE 6).
- **"Laptopmu" bukan "komputermu".** Yang kedua terdengar seperti benda umum di
  ruang kelas; yang pertama adalah benda yang kemungkinan besar sedang dipakai
  penonton saat itu juga.
- **Beat 5 dan 6 menyebut MAKSUDNYA, dan tanpa keduanya scene ini kehilangan
  taruhannya.** "Ada yang mengetuk" saja terbaca sebagai bunyi di luar — tetangga,
  tukang paket, apa saja. Yang membuat penonton peduli bukan ketukannya, melainkan
  bahwa yang mengetuk sedang mencari satu pintu yang lupa dikunci. Ditambahkan
  2026-08-14 atas arahan user, dan penambahan itu menggeser SEMUA indeks beat
  sesudahnya di `01-hook-mengetuk.tsx` (`B_TIDAK` dulu 4, sekarang 6).
- **Kata "meretas", "hacker", dan "serangan" tetap tidak dipakai** — semuanya
  istilah, dan ketiganya menyuruh penonton menghafal alih-alih membayangkan
  ([docs/09](../../../docs/09-tangga-abstraksi.md)). "Cari pintu yang lupa
  dikunci" mengatakan hal yang sama persis, bisa digambar, dan tidak menuntut
  penonton sudah tahu apa-apa. (`B_TIDAK` sekarang beat 8 — indeksnya bergeser
  dua kali, dan tiap pergeseran diselesaikan di suntingan yang sama dengan
  `.tsx`-nya.)
- **Maksudnya disebut di VO, jadi gambarnya TIDAK ikut menaikkan nada.** Ketukan
  tetap abu-abu, tetap tanpa wajah, tetap tanpa warna bahaya. Kalau keduanya
  naik bersamaan, hook-nya berubah jadi iklan antivirus — dan penonton yang
  merasa sedang ditakut-takuti menutup video sebelum bagian 3.
- **"Tidak satu pun." berdiri sebagai beat sendiri.** Ia pengulangan, dan itu
  seluruh gunanya: di beat itu semua ketukan membeku sekaligus, dan hook ini
  butuh satu detik sunyi sebelum pertanyaannya jatuh ([docs/02 § Pacing](../../../docs/02-format-video.md)).
  Digabung ke beat sebelumnya, pembekuannya lewat di tengah kalimat.
- **Hook ini ±31 detik, lebih panjang dari patokan 5% di
  [docs/02](../../../docs/02-format-video.md), dan itu dibeli sadar.** Ia bukan
  cuma bertanya; ia juga mendirikan satu-satunya analogi yang dipakai seluruh
  episode. Analogi yang didirikan di scene 3 akan datang setelah penonton
  terlanjur menonton dua scene tanpa tahu ia sedang melihat apa.
- Beat 8 sengaja menyebut yang **tidak** terjadi. Itu yang membuat beat 5 jadi
  pertanyaan, bukan keluhan: ada yang bekerja di sini, dan kita belum tahu apa.
- **Sambungan ke `03-pintu-bernomor` melewati kartu judul**, dan itu sah
  ([docs/11 § Sambungan](../../../docs/11-rencana-vo.md)). Pertanyaan di beat 5
  digantung, kartu judul lewat tanpa suara, lalu scene 3 mendekat ke dindingnya
  tanpa menjawab dulu.
