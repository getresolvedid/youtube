# 11-buka-website · rencana VO

Perjalanan utuh. Diambil apa adanya dari
[`storyboard-usulan.md`](../storyboard-usulan.md) § Scene 10.

## VO

Sekarang bayangkan kamu mengetik sebuah alamat website di browser.
Browser membutuhkan alamat server tujuan.
DNS membantu menemukan alamat IP dari nama website tersebut.
Setelah mengetahui tujuan, data dikirim melalui jaringan menggunakan protokol yang sesuai.
TCP dapat membantu memastikan data diterima dengan benar, sementara IP membantu mengarahkan paket menuju server.
Server kemudian mengirimkan data kembali ke perangkatmu.
Semua proses ini terjadi dalam waktu yang sangat singkat.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Alamat diketik huruf demi huruf di bilah peramban. |
| 1 | Peramban berhenti — ia belum tahu ke mana harus pergi. |
| 2 | Nama dikirim ke satu simpul dan kembali sebagai deret angka. |
| 3 | Permintaan berubah jadi potongan-potongan yang berangkat. |
| 4 | Potongan melewati persimpangan berurutan menuju server. |
| 5 | Server menjawab; potongan pulang ke kiri. |
| 6 | Halaman tampil utuh; kamera mundur. |

## Catatan

- **Scene terpanjang, dan satu-satunya yang menyambung semua yang sudah
  ditunjukkan.** Tujuh beat, tapi ia satu gerakan tanpa jeda — bukan tujuh
  adegan.
- **Scene ini melewati batas T05** (naskah.md § Penyimpangan tercatat). Ia
  adalah "perjalanan satu alamat web" hampir utuh.
- **Beat 1 penting dan gampang hilang.** Jeda sesaat di mana peramban tidak
  bisa melanjutkan itulah yang membuat beat 2 terasa sebagai jawaban. Kalau
  peramban langsung jalan, DNS cuma jadi langkah tambahan.
- **Beat 5 memakai arah kanan → kiri**, arah yang sejak scene 7 hanya dipakai
  untuk "sesuatu yang kembali". Ia bekerja gratis di sini karena penonton sudah
  dilatih.
- Alamat di layar `contoh.com` dan `93.184.0.10` — contoh bentuk, bukan klaim.
