# 06 · Publishing

Metadata ditulis di `render/publish.md` **sebelum** membuka halaman unggah
YouTube. Mengarang judul di kolom unggah menghasilkan judul yang buruk.

---

## Judul

**Formula:** `<Hasil konkret / pertanyaan tajam>` + `<pembatas yang bikin spesifik>`

Aturan:

- **≤ 60 karakter** supaya tidak terpotong di ponsel. Info terpenting di 40
  karakter pertama.
- Pakai kata yang dicari orang (istilah teknis asli: *index*, *deadlock*,
  *garbage collector*) — jangan diterjemahkan demi keindahan.
- Angka spesifik boleh, angka mengada-ada tidak. `1000× lebih cepat` hanya boleh
  kalau video benar-benar menunjukkan angka itu.
- **Tanpa** huruf kapital semua, tanpa tanda seru bertumpuk, tanpa "WAJIB TAHU".
- Judul harus ditepati isi video. Hook yang tidak dijawab = penonton kabur di
  menit dua = sinyal buruk yang menempel ke channel.

Tulis **3 kandidat** judul di `publish.md`, pilih satu, simpan sisanya — kalau
performa 48 jam pertama jelek, judul adalah hal pertama yang diganti.

| Bentuk | Contoh |
|---|---|
| Pertanyaan mekanisme | `Kenapa query jadi 1000x lebih cepat dengan index?` |
| Koreksi keyakinan | `Yang kamu tahu soal async JavaScript kemungkinan salah` |
| Hasil konkret | `Debug memory leak Node.js dalam 10 menit` |
| Pembongkaran | `Apa yang sebenarnya terjadi saat kamu ketik git commit` |

**Judul Shorts:** ≤ 40 karakter, satu klaim saja, tanpa nama channel.

## Deskripsi

Template — 3 baris pertama yang paling penting (sisanya tertutup "Selengkapnya"):

```
<Satu kalimat: apa yang penonton dapat dari video ini.>
<Satu kalimat: untuk siapa / prasyaratnya apa.>

⏱ Bab
00:00 Hook
00:15 <Kontrak>
00:45 <Fondasi>
02:30 <Mekanisme>
05:30 <Realita>
07:00 Rangkuman

📌 Yang dibahas
• <poin 1>
• <poin 2>
• <poin 3>

🔗 Sumber & bacaan lanjutan
- <judul sumber> — <url>
- <judul sumber> — <url>

🎬 Video terkait
- <judul> — <url>

Get Resolved — penjelasan teknologi, coding, dan engineering dalam Bahasa Indonesia.
youtube.com/@GetResolved · getresolved.id

#<tag1> #<tag2> #<tag3>
```

Aturan:

- **Chapter wajib** untuk video panjang: minimal 3, yang pertama harus `00:00`,
  jarak antar-chapter minimal 10 detik. Kalau tidak memenuhi syarat itu, YouTube
  tidak menampilkannya sama sekali.
- Cantumkan **sumber**. Ini konten edukasi — sumber adalah bagian dari kredibilitas
  dan sekaligus alasan orang menyimpan videonya.
- Maksimal 3 hashtag di akhir. Lebih dari itu justru diabaikan YouTube.
- Deskripsi Shorts: 1–2 kalimat + `#Shorts` + tautan ke video panjang.

## Tag

10–15 tag, urutan dari paling spesifik ke paling umum:

```
<istilah inti>, <istilah inti bahasa inggris>, <teknologi terkait>,
<pilar>, belajar coding, programming indonesia, software engineering
```

Tag sekadar sinyal pendukung — judul, thumbnail, dan retensi jauh lebih menentukan.

## Thumbnail

| Spesifikasi | Nilai |
|---|---|
| Ukuran | 1280×720 (16:9), < 2 MB, PNG |
| Teks | **maksimal 4 kata**, Manrope 800, tinggi huruf ≥ 90px |
| Warna | latar `--bg` `#0B1020`, aksen Indigo `#4F46E5` atau Green `#10B981` |
| Isi | satu elemen visual dari video (diagram/angka/potongan kode), bukan foto orang |

- Uji keterbacaan pada ukuran **210×118 px** — kalau tidak terbaca di situ,
  ulangi. Itu ukuran nyata di feed ponsel.
- Thumbnail dan judul **tidak mengulang teks yang sama**. Keduanya saling
  melengkapi: judul menjelaskan, thumbnail menarik.
- Konsisten: posisi teks, palet, dan gaya tetap sama antar-episode supaya video
  channel dikenali dari kejauhan di feed.
- Thumbnail bisa dirender dari HyperFrames (`npx hyperframes snapshot`) memakai
  `shared/theme.css` yang sama — hasilnya otomatis sekeluarga dengan videonya.

## Playlist

Satu playlist per pilar (lihat [01 · Positioning](01-positioning.md)):

`Cara Kerja Sehari-hari` · `Di Balik Aplikasi` · `Untuk yang Menulis Kodenya` · `AI & Data` · `Keamanan & Privasi`

Setiap video panjang masuk tepat satu playlist. Shorts tidak dimasukkan playlist pilar.

## Jadwal rilis satu topik

| Hari | Aksi |
|---|---|
| H | Video panjang tayang. |
| H (+2 jam) | **Short 1 (Nugget)** tayang — arahkan ke video panjang di deskripsi. |
| H+3 | **Short 2 (Jebakan)** tayang. |

Alasan jeda: dua Shorts di hari yang sama saling memakan jangkauan.

## Checklist unggah

Video panjang:

- [ ] `render/publish.md` terisi lengkap (judul, deskripsi, chapter, tag, sumber).
- [ ] Judul ≤ 60 karakter dan ditepati isi video.
- [ ] Thumbnail lolos uji 210×118.
- [ ] Chapter valid: mulai `00:00`, ≥ 3 bab, jarak ≥ 10 dtk.
- [ ] Playlist pilar dipilih.
- [ ] End screen dipasang (video terkait + subscribe) — pastikan tidak menutupi
      teks di 5 detik terakhir.
- [ ] Bahasa video: Indonesia. Subtitle Indonesia diunggah (bukan auto-generate) —
      naskah VO sudah jadi transkripnya, tinggal disesuaikan timing-nya.
- [ ] Kategori: *Science & Technology*. Ditandai **bukan konten untuk anak**.
- [ ] Komentar aktif. Siapkan **pinned comment**: satu pertanyaan yang memancing
      diskusi teknis, atau koreksi kalau ada yang meleset.

Shorts:

- [ ] Durasi ≤ 60 dtk, rasio 9:16.
- [ ] Teks di layar patuh safe area dan terbaca tanpa suara.
- [ ] Judul ≤ 40 karakter + `#Shorts` di deskripsi.
- [ ] Tautan ke video panjang di deskripsi.

## Setelah tayang

Yang dipantau, bukan sekadar dilihat:

| Metrik | Ambang sehat | Kalau di bawah |
|---|---|---|
| Average view duration | ≥ 50% | Cek grafik retensi: titik terjun pertama biasanya di babak 3 → terlalu bertele-tele. |
| Retensi 30 detik pertama | ≥ 70% | Hook lemah atau judul tidak sinkron dengan pembuka. |
| CTR impression | 4–8% | Ganti thumbnail dulu, judul kedua. Jangan ganti keduanya sekaligus — nanti tidak tahu mana yang bekerja. |
| Klik Shorts → video panjang | — | Kalau nol, CTA di Shorts terlalu halus atau terlambat. |

Catat hasilnya kembali di `render/publish.md` setelah 7 hari. Itu bahan mentah
untuk memutuskan topik berikutnya.
