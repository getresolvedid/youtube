Anggaran: durasi 4,81 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

**Panggung yang dibangun di sini dipakai ulang apa adanya di Short 2, 3, dan 4.**
Itu bukan penghematan: seluruh perbandingan seri ini — kalimat terbaca di Short
2 vs lambang di Short 3 — bertumpu pada jaringannya terlihat identik. Karena itu
tidak ada satu koordinat pun yang ditulis di berkas ini; semuanya dari
`../panggung-short.tsx`.

1. jaringannya tersingkap bertahap: mula-mula beberapa simpul di jalur TEGAK,
   lalu sisanya, lalu simpul-simpul jauh di latar — lebih redup, di kiri dan
   kanan jalur. paket masuk dari atas dan simpul pertama MENYALA saat dilewati,
   lalu redup lagi.
   (VO: "Pesan tersebut diubah menjadi data, lalu dikirim melalui jaringan internet.")
   TEKS LAYAR: "Lewat internet."

motion:
   - simpul jalur muncul lewat `masuk()` dengan `urutan` — berdatangan dari
     atas, bukan serentak
   - simpul jauh: satu nilai `luas` 0 → 1 untuk seluruh lapisan, jadi mereka
     datang sebagai satu lapisan latar, bukan sembilan benda berjadwal sendiri
   - NYALA SIMPUL DITURUNKAN DARI POSISI PAKET, bukan dari waktu —
     `nyalaSimpul(yPaket)` di `../panggung-short.tsx`. simpul menyala karena ADA
     YANG LEWAT, jadi nyalanya tidak pernah meleset saat satu kalimat VO berubah
     dan seluruh timing bergeser

catatan:
   - **JALURNYA TEGAK**: atas = pengirim, bawah = penerima. di 9:16 tidak ada
     ruang mendatar untuk jalur bersimpul, dan perputaran 90° itu berlaku di
     keempat Short.
   - **tidak ada kabel dan tidak ada satu huruf pun** — tanpa "server", tanpa
     alamat. arahan user: jaringannya terasa digital dan abstrak, bukan akurat.
   - **cuma satu paket di layar** (arahan user). paket kedua membuat penonton
     kehilangan yang mana pesannya.
