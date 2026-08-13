# 01 · Positioning

Dokumen ini menjawab satu pertanyaan: **kenapa orang harus menonton channel ini
dan bukan sepuluh channel tech lain?** Semua keputusan naskah dan visual di
dokumen berikutnya turun dari sini.

**Channel:** Get Resolved — [youtube.com/@GetResolved](https://www.youtube.com/@GetResolved)
**Website:** [getresolved.id](https://getresolved.id)

---

## Janji channel

> Teknologi yang kamu pakai tiap hari — dijelaskan sampai kamu benar-benar
> **melihat cara kerjanya**, bukan cuma hafal istilahnya. Cukup sederhana untuk
> siapa pun, cukup dalam untuk yang menulis kodenya.

Tiga kata kunci: **mekanisme**, **presisi**, **Bahasa Indonesia**.

## Dua lapis penonton — dan cara melayani keduanya

Channel ini untuk **khalayak umum dan developer sekaligus**. Itu terdengar
seperti dua channel yang ditempel, dan biasanya memang gagal — kecuali kalau
strukturnya sengaja dirancang untuk itu.

Mekanismenya sudah ada: **tangga abstraksi** ([09](09-tangga-abstraksi.md)).

| Lapis | Siapa | Dapat apa | Ada di babak |
|---|---|---|---|
| **L1** | Khalayak umum — siapa pun yang penasaran | Gambaran yang bisa dibayangkan, tanpa satu pun istilah teknis | Hook, Kontrak, Fondasi, Rangkuman |
| **L2** | Yang sudah akrab teknologi | Nama resmi dari benda yang tadi sudah dilihat + mekanisme sebenarnya | Fondasi, Mekanisme |
| **L3** | Developer & praktisi | Angka, batas, trade-off, kapan model L1 rusak | Realita |

**Kontrak yang mengikat setiap video:**

1. **Penonton awam harus bisa bertahan sampai babak 4** tanpa merasa tertinggal.
   Kalau sebuah kalimat mensyaratkan pengetahuan yang belum diberikan di video
   ini, kalimat itu salah tempat.
2. **Developer harus dapat sesuatu yang tidak ada di artikel blog** — itulah
   babak 5 (Realita). Babak ini tidak pernah dipangkas demi durasi.
3. **Yang berhenti di menit lima tetap merasa utuh.** Rangkuman L1 di akhir
   adalah jaring pengaman, bukan formalitas.

Yang **tidak** kita lakukan: membuat dua versi video untuk dua audiens, atau
menaruh peringatan "bagian ini khusus programmer". Satu video, satu alur,
kedalaman bertambah seiring durasi.

## Kenapa berbeda

Lanskap konten tech berbahasa Indonesia mayoritas berisi **screencast** ("ikuti
saya mengetik"), **talking head**, dan **berita gadget**. Celah yang kita isi:

1. **Visual mekanis.** Request mengalir lewat diagram, sinyal memantul, memori
   berubah di layar — animasi menjelaskan, bukan menghias. Ini yang membuat satu
   video bisa dipahami awam *dan* tetap akurat bagi developer.
2. **Padat, tanpa lemak.** Tidak ada intro 20 detik, tidak ada "halo teman-teman
   balik lagi", tidak ada basa-basi di menit pertama.
3. **Akurat dan berani menyebut batas.** Kalau jawabannya "tergantung", kita
   sebut variabelnya. Kalau kita tidak yakin, kita bilang tidak yakin.
4. **Bahasa Indonesia dengan istilah asing yang dipertahankan.** Kita bilang
   *cache*, *bandwidth*, *enkripsi* — bukan terjemahan paksa yang justru
   memutus kaitan ke dokumentasi asli. Tapi setiap istilah diperkenalkan dulu
   dengan bahasa L1.

## Lima pilar konten

Setiap topik wajib masuk salah satu pilar. Pilar juga jadi **playlist** di channel.
Porsi disusun supaya mayoritas video bisa dinikmati khalayak umum, sementara
developer tetap punya alasan tetap berlangganan.

| Kode | Pilar | Untuk | Cakupan | Porsi |
|---|---|---|---|---|
| **P1** | **Cara Kerja Sehari-hari** | Umum | Wi-Fi, internet, GPS, QR code, kamera & kompresi video, sinyal seluler, baterai, layar. | 30% |
| **P2** | **Di Balik Aplikasi** | Umum → dev | Apa yang terjadi saat kamu klik: DNS, HTTP, database & index, cache, kenapa aplikasi terasa lambat. Jembatan dua audiens. | 25% |
| **P3** | **Untuk yang Menulis Kodenya** | Dev | Event loop, Git internals, konkurensi, arsitektur, praktik engineering. Paling dalam, porsinya paling terkendali. | 20% |
| **P4** | **AI & Data** | Umum + dev | Cara kerja LLM, embedding, rekomendasi, apa artinya "dilatih dari data". | 15% |
| **P5** | **Keamanan & Privasi** | Umum | Password & hashing, HTTPS, penipuan digital, izin aplikasi, enkripsi. | 10% |

P3 sengaja bukan pilar terbesar. Konten developer punya penonton paling sedikit
tapi paling loyal — cukup untuk menjaga identitas teknis channel, tidak cukup
untuk mengunci pertumbuhan.

## Nada bicara

**Seperti orang yang paham betul, menjelaskan ke teman yang penasaran** — santai
tapi tidak cerewet, percaya diri tapi tidak menggurui.

Lakukan:

- Kalimat pendek. Satu ide per kalimat.
- **Mulai selalu dari bahasa paling sederhana**, baru naik ke istilah teknis —
  tidak pernah sebaliknya. Aturannya di [09](09-tangga-abstraksi.md).
- Analogi konkret dan sekali pakai — lalu **kembali ke mekanisme sebenarnya**,
  dan sebutkan di mana analoginya berhenti berlaku.
- Angka eksplisit: "sekitar 100 milidetik" lebih baik daripada "sangat cepat".
- Akui trade-off. Setiap solusi punya harga; sebutkan harganya.
- Sapa penonton dengan "kamu", bukan "kalian" atau "teman-teman".

Hindari:

- Clickbait yang tidak ditepati isi video ("RAHASIA yang disembunyikan…").
- Hype dan superlatif: "mengubah segalanya", "game changer", "wajib tahu!!".
- Merendahkan penonton: "gampang banget kok", "masa gini aja nggak paham".
- Perang bahasa/framework. Kita membahas trade-off, bukan memihak.
- Humor yang mengganggu alur. Konten padat sudah cukup jadi daya tarik.

## Yang tidak kita buat

- Berita harian / drama tech.
- Review gadget, laptop, atau keyboard.
- Tutorial "ikuti saya ketik baris per baris" — nilai kita ada di *mental model*.
- Konten "10 aplikasi terbaik" dan sejenisnya.
- Kursus berbayar terselubung di dalam video gratis.

## Hubungan dengan getresolved.id

Channel ini **adalah** channel brand getresolved. Website-nya menjual CCTV,
internet, build up computer, kasir, gudang, dan absensi ke UMKM.

Konsekuensinya nyata dan sudah diperhitungkan: sebagian penonton datang sebagai
**calon pelanggan atau pelanggan**, bukan sebagai penonton edukasi. Positioning
"khalayak umum + developer" justru memanfaatkan itu — topik P1 dan P5 (Wi-Fi,
kamera, jaringan, keamanan) beririsan wajar dengan dunia produk getresolved
tanpa perlu menjual apa pun.

Aturan yang tetap mengikat:

- **Video edukasi tidak menjual apa pun.** Tidak ada demo produk, tidak ada harga.
- Penyebutan produk hanya boleh di **deskripsi** (satu baris) dan di **end card**
  sebagai identitas pembuat.
- Video yang memang tentang produk ditandai jelas dan ditaruh di **playlist
  terpisah**, di luar lima pilar di atas.

Kalau sebuah topik terasa dipilih karena mendekatkan penonton ke penjualan —
bukan karena penonton butuh memahaminya — topik itu masuk playlist produk, bukan
pilar edukasi.

## Ukuran keberhasilan

Bukan subscriber. Yang kita pantau, berurutan prioritas:

1. **Average view duration ≥ 50%** untuk video panjang — bukti materinya memang menahan.
2. **Retensi di babak 4–5.** Kalau penonton awam berguguran tepat saat masuk L2,
   berarti jembatan L1→L2 di babak 3 kurang kuat. Ini metrik paling penting untuk
   membuktikan positioning dua lapis benar-benar jalan.
3. **Rasio komentar substantif** (pertanyaan/koreksi teknis) dibanding komentar kosong.
4. Klik dari Shorts ke video panjang.
5. Subscriber — indikator yang paling lambat dan paling tidak informatif.
