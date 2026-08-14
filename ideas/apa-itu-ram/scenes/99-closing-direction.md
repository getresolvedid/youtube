# Direction · 99-closing — tanda tangan brand

Komponennya milik `shared/` (`<TandaBrand/>`), jadi **apa pun yang ditulis di
sini berlaku untuk semua episode**. Ubah di `shared/StandarScenes.tsx` +
`shared/scenes.css`, jangan disalin ke episode. Aturan lengkap:
[docs/10](../../../docs/10-scene-standar.md).

- 5 detik (16:9). Bukan angka selera — end screen YouTube baru bisa diklik
  kalau tayang minimal 5 detik.
- Konten di **paruh kiri**. Paruh kanan dikosongkan untuk end screen; kalau
  diisi, elemennya menimpa teks kita.
- Tidak ada judul episode di sini. Judul milik pembuka.

## Yang di layar, berurutan

1. Mark getresolved besar (200px) masuk, lalu **membangun dirinya**: cincin
   putih menggambar diri, titik hijau muncul terakhir.
2. Wordmark disingkap dari kiri.
3. Garis aksen indigo→hijau menggambar diri.
4. Handle channel (`CHANNEL_HANDLE` dari `.env`, mono, tebal).
5. **Satu baris ajakan.**
6. Mark bernapas `y ±6px` sampai habis — lima detik tidak boleh jadi layar diam.

## Baris terakhir = ajakan, bukan deskripsi channel

Sampai 2026-08-13 baris itu berbunyi *"Penjelasan teknologi, coding, dan
engineering dalam Bahasa Indonesia."* Itu keterangan tentang kami, dan siapa pun
yang sudah bertahan tujuh menit tidak perlu diberi tahu lagi — kalimatnya tidak
meminta penonton melakukan apa pun. Sekarang:

```
Masih penasaran cara kerja yang lain? Subscribe, lalu lanjut ke video di sebelah.
```

Yang mengikat bukan kalimatnya:

- **Satu kalimat, maksimal dua baris tayang.** (Yang sekarang membungkus jadi
  dua baris pada lebar `--measure`, dan itu masih sah.) Ini baris terakhir
  video, bukan paragraf penutup — lebih dari itu tidak selesai dibaca dalam
  sisa waktu yang ada.
- **Arahnya ke paruh kanan.** "di sebelah" = end screen YouTube, satu-satunya
  benda yang bisa diklik selama scene ini. Kalau kalimatnya diganti, penunjuk
  arah itu ikut dijaga.
- **Terbaca setara handle**, bukan abu-abu keterangan kaki: `--ink-0`, berat
  600. Isinya permintaan, jadi ia tidak boleh terlihat seperti catatan kaki.
- **Ini satu-satunya CTA di seluruh video.** [docs/02](../../../docs/02-format-video.md)
  melarang "jangan lupa like dan subscribe" di tengah video — jatahnya cuma di
  sini, jadi jangan dipakai untuk memperkenalkan diri.

Boleh diganti per episode lewat prop `sub` kalau ada lanjutan yang spesifik
(mis. "Bagian dua: kenapa ram cepat penuh"). Yang tidak boleh: mengembalikannya
jadi kalimat deskripsi channel.

## Yang tidak ada di sini

Musik sting terpisah, whoosh, tagline, alamat website, animasi partikel, judul
episode, dan tombol subscribe gambar-sendiri (end screen YouTube yang asli jauh
lebih bisa diklik daripada gambar tombol).

## 9:16 (Shorts)

2 detik, konten di tengah, **tanpa baris ajakan** — tidak cukup waktu untuk dua
blok teks. CTA Shorts ditaruh di VO penutup, bukan di layar.
