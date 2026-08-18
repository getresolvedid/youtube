# 09-ringkasan · rencana VO

Bagian 6 [explaining]. Seluruh rantainya dikumpulkan jadi satu gambar yang bisa
dipegang penonton — lalu satu perbandingan terakhir yang membuatnya menempel.

Yang harus berubah di kepala penonton: **tidak ada yang baru.** Scene ini tidak
mengajarkan apa pun yang belum ditunjukkan; ia menyusun ulang yang sudah
ditonton supaya bisa diingat sebagai satu bentuk, bukan sebagai lima adegan.

## VO

Singkatnya, pesan diubah menjadi data terenkripsi, dikirim melalui internet, lalu dikembalikan menjadi pesan asli di perangkat penerima.
Jadi, enkripsi membantu menjaga agar isi data tidak mudah dibaca oleh pihak yang tidak berhak.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Rantainya dibangun sepotong demi sepotong dari kiri: HALO → ENKRIPSI → lambang → jaringan → DEKRIPSI → HALO. Tidak pernah tampil sekaligus. |
| 1 | Layar terbelah dua. Kiri: layar yang mengamati, isinya lambang. Kanan: HP penerima, isinya kalimatnya. Ditahan lama. |

## Catatan

- **Dua baris untuk enam langkah, dan itu perlu diketahui saat membangunnya.**
  Baris pertama memikul seluruh rantai — enam potong yang menurut arahan user
  harus muncul berurutan, bukan sekaligus. Keenamnya dijatuhkan sebagai pecahan
  di dalam satu beat di `.tsx`-nya, diturunkan dari `beat(…, 0)` dan durasi
  barisnya, bukan dari detik yang diketik. Kalau baris ini dipecah dua nanti,
  indeks beat sesudahnya ikut bergeser.
- **Beat 1 adalah frame terpenting di seluruh episode**, dan arahan user
  menyebutnya begitu: *"Hold it long enough for the viewer to make the
  connection: same data → different visibility depending on access to the proper
  key."* Ia tidak boleh lewat cepat, dan tidak boleh ada gerakan lain di layar
  saat ia tampil.
- **Rantainya dibaca kiri ke kanan, dan arahnya sama dengan seluruh episode** —
  kiri pengirim, kanan penerima. Rantai yang dibangun dari arah lain akan
  membatalkan orientasi yang sudah dipasang enam scene.
- **HALO muncul dua kali di rantai itu, di kedua ujungnya, dan itu intinya.**
  Bentuk yang sama di awal dan akhir; yang berbeda cuma apa yang terjadi di
  tengah. Kalau yang di ujung kanan digambar sedikit berbeda, seluruh gagasan
  "dikembalikan ke bentuk aslinya" ikut bocor.
