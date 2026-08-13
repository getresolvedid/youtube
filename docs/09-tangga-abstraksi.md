# 09 · Tangga Abstraksi — aturan "bahasa anak 5 tahun"

**Aturan utama channel:** kalau sebuah topik tidak bisa dijelaskan dengan bahasa
anak 5 tahun, topik itu belum boleh masuk produksi.

Ini bukan berarti channel kita untuk anak-anak. Ini alat kendali mutu: kemampuan
menjelaskan sesuatu tanpa jargon adalah bukti bahwa kita benar-benar paham
mekanismenya. Kalau penjelasan kita bergantung pada istilah teknis untuk terdengar
masuk akal, artinya kita sedang memindahkan istilah — bukan memindahkan pemahaman.

Dibaca bersama [02 · Format](02-format-video.md) dan [05 · Template naskah](05-template-naskah.md).

---

## Tiga anak tangga

Setiap topik dijelaskan dengan menaiki tangga, **selalu dari L1**, tidak pernah
melompat.

| | Tangga | Kosakata | Tugasnya |
|---|---|---|---|
| **L1** | **Anak 5 tahun** | Benda sehari-hari, kata kerja konkret. **Nol istilah teknis.** | Menanam gambaran di kepala. Penonton harus bisa "melihat"-nya. |
| **L2** | **Developer** | Istilah teknis asli (*index*, *cache*, *thread*) | Menamai apa yang tadi sudah dilihat, dan menunjukkan mekanisme sebenarnya. |
| **L3** | **Presisi** | Angka, batas, edge case | Kapan gambaran L1 rusak, berapa harganya, apa yang tidak berlaku. |

Urutannya mengikat: **L1 → L2 → L3**. Istilah teknis (L2) tidak boleh muncul
sebelum benda yang diwakilinya sudah muncul di L1.

### Contoh satu topik menaiki tangga

Topik: **index database**

> **L1** — Bayangkan buku telepon setebal sepuluh ribu halaman. Kalau nama-namanya
> ditulis acak, kamu harus membuka satu per satu sampai ketemu. Kalau diurutkan
> dari A sampai Z, kamu langsung buka di tengah, lihat hurufnya, lalu lompat ke
> arah yang benar. Beberapa kali lompat, ketemu.
>
> **L2** — Itulah index. Database menyimpan salinan kolom yang sudah terurut dalam
> struktur bernama B-Tree. Setiap lompatan turun satu level pohon, dan satu level
> memangkas ruang cari jadi sepersekian ratus.
>
> **L3** — Untuk sepuluh juta baris, tingginya cuma tiga sampai empat level —
> sekitar empat kali baca disk, bukan sepuluh juta. Harganya: setiap `INSERT`
> ikut memperbarui pohonnya, dan satu fungsi di kolom `WHERE` membuat index itu
> diabaikan sepenuhnya.

Perhatikan tiga hal: L1 tidak menyebut satu pun istilah teknis, L2 dimulai dengan
**"Itulah ..."** yang menyambungkan gambaran ke nama resminya, dan L3 menyebut
**harga** — bukan cuma keunggulan.

## Aturan wajib

1. **Blok "Penjelasan 5 tahun" ditulis sebelum naskah.** Maksimal 60 kata, tanpa
   satu pun istilah teknis. Kalau blok ini tidak bisa ditulis, riset belum
   selesai — jangan lanjut ke naskah. Tempatnya di `naskah.md`, wajib ada.
2. **Setiap istilah teknis punya satu kalimat L1 di kemunculan pertama.** Tidak
   ada pengecualian, termasuk istilah yang "semua orang juga sudah tahu".
3. **Setiap analogi wajib punya titik putus yang disebutkan.** Analogi selalu
   bocor. Sebutkan di mana bocornya, dengan kalimat eksplisit:
   *"Bedanya dengan buku telepon: databasenya tidak perlu menggeser semua halaman
   waktu ada nama baru."* Analogi tanpa titik putus melahirkan salah kaprah baru
   — dan itu lebih buruk daripada tidak menjelaskan sama sekali.
4. **Satu analogi per topik.** Dua analogi untuk satu konsep membuat penonton
   sibuk menyambungkan keduanya, bukan memahami barangnya.
5. **Sederhana ≠ salah.** Kalau sebuah penyederhanaan membuat penjelasannya jadi
   keliru, cari penyederhanaan lain. Jangan pernah menyederhanakan sampai salah,
   lalu diam. Kalau memang perlu memangkas, katakan: *"Ini gambaran kasarnya —
   detail yang saya lewati tidak mengubah intinya."*
6. **Turun tangga itu boleh, melompat tidak.** Kapan pun penjelasan mulai berat,
   kembali sebentar ke L1 dengan kalimat jembatan: *"Balik ke buku telepon tadi..."*

## Kosakata L1

**Pakai:** kotak, rak, buku, laci, kartu, antrean, loket, kunci, pintu, jalan,
tukang pos, alamat, catatan, tumpukan, keranjang, meja, lampu, tombol, jembatan,
peta. Kata kerja: menaruh, mengambil, mencari, menunggu, membuang, mengantre,
menumpuk, membuka, menutup, menghitung.

**Jangan pakai di L1:** semua istilah teknis dan serapannya (*proses, memori,
data, server, request, thread, buffer, node, query*), akronim apa pun, angka
lebih dari dua digit, dan satuan teknis (ms, KB, ops/detik). Angka besar dan
satuan adalah bahan L3.

**Uji cepat:** kalau satu kalimat L1 dibacakan ke orang yang tidak pernah menulis
kode dan mereka bisa menggambarkannya ulang dengan kalimat sendiri — lolos.
Kalau mereka mengangguk tapi tidak bisa mengulangi, itu belum lolos.

## Pemetaan ke struktur video

| Bagian | Tangga | Catatan |
|---|---|---|
| Hook (0:00–0:15) | **L1** | Hook selalu bahasa manusia. Jangan pernah membuka dengan istilah teknis. |
| Kontrak (0:15–0:45) | L1 | Janji ditulis sebagai hasil yang bisa dibayangkan, bukan daftar materi. |
| Fondasi (0:45–2:30) | **L1 → L2** | Inilah tempat analogi utama dibangun lalu dinamai. Titik putus disebut di sini. |
| Mekanisme (2:30–5:30) | **L2** | Boleh turun ke L1 sebentar tiap kali ada konsep baru. |
| Realita (5:30–7:00) | **L3** | Angka, trade-off, kegagalan. Bagian yang membedakan kita dari artikel blog. |
| Rangkuman | **L1** | Rangkuman kembali ke bahasa paling sederhana. Kalimat bawa-pulang selalu L1. |
| Shorts | **L1 (+ sedikit L2)** | Shorts tidak pernah sampai L3. Tidak cukup waktu, dan bukan tempatnya. |

## Yang bukan ELI5

Aturan ini sering disalahartikan. Yang **tidak** kita lakukan:

- **Merendahkan penonton.** "Gampang kok", "anak kecil juga bisa" — dilarang.
  Bahasa yang sederhana, nadanya tetap setara.
- **Cadel-cadelan atau nada bercerita ke balita.** Kita memakai *kesederhanaan*
  bahasa anak 5 tahun, bukan *gaya bicara* ke anak 5 tahun.
- **Menghindari istilah teknis selamanya.** Justru sebaliknya: kita
  memperkenalkannya dengan benar supaya penonton bisa membaca dokumentasi asli
  setelahnya. L1 adalah pintu masuk, bukan tujuan akhir.
- **Membuang kedalaman.** L3 tetap wajib ada di video panjang. Sederhana di awal,
  presisi di akhir.

## Checklist (dipakai saat QA naskah)

- [ ] Ada blok **Penjelasan 5 tahun** ≤ 60 kata, nol istilah teknis.
- [ ] Setiap istilah teknis punya kalimat L1 di kemunculan pertamanya.
- [ ] Analogi utama punya **titik putus** yang disebutkan di VO, bukan hanya di catatan.
- [ ] Tidak ada lompatan L1 → L3 tanpa melewati L2.
- [ ] Hook dan kalimat bawa-pulang keduanya L1.
- [ ] Tidak ada penyederhanaan yang membuat pernyataannya jadi salah.
- [ ] Shorts berhenti di L1/L2 — tidak memaksakan L3.
