# 06 · Publishing

Metadata ditulis di `ideas/<slug>/render/publish.md` — satu berkas per episode,
di sebelah MP4 dan thumbnail-nya ([docs/04](04-pipeline-produksi.md)) — dan
ditulis **sebelum** membuka halaman unggah YouTube. Mengarang judul di kolom
unggah menghasilkan judul yang buruk.

Berkasnya lahir di **fase 4**, jauh sebelum ada MP4-nya. `naskah.md` cuma
menyimpan penunjuk ke sana; judul dan deskripsi tidak pernah hidup di dua
tempat.

**Thumbnail bukan salah satunya.** Ia direncanakan di **fase 1** — sebelum
naskahnya ada — dan tinggal di `ideas/<slug>/thumbnail.md`, bukan di sini.
Alasannya di [CLAUDE.md § Fase kerja](../CLAUDE.md) dan di § Thumbnail bawah.

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

### Direncanakan di fase 1 — `thumbnail.md`

Thumbnail adalah **keluaran pertama** sebuah topik, bukan yang terakhir. Sebelum
satu baris naskah ditulis, `ideas/<slug>/thumbnail.md` sudah berisi tiga hal,
urut:

**1. Ketegangannya, satu kalimat.** Bukan topiknya — *apa yang penonton kira
benar tapi ternyata tidak*, atau apa yang ia rasa aneh tapi tidak bisa jelaskan.
"Video tentang caching" adalah topik dan nol tarikan; "kenapa halaman yang sama
lambat cuma di rumah kamu" adalah ketegangan. Kartu ini menggambarkan kalimat
kedua. **Kalau kalimat ini tidak ketemu, topiknya berhenti di sini** — jangan
naik ke fase 2 sambil berharap ketegangannya muncul sendiri saat menulis naskah.

**2. Polanya, dipilih dari daftar — bukan dari kanvas kosong.** Satu saja,
jangan dicampur:

| Pola | Bentuknya | Paling cocok untuk |
|---|---|---|
| **Koreksi** | yang benar terang, yang salah redup + dicoret | keyakinan yang salah |
| **Sebelum → sesudah** | dua keadaan bersebelahan, bedanya mencolok | perbaikan / dampak |
| **Anomali** | benda familiar di tempat yang salah | hal yang terasa janggal |
| **Proses terpotong** | mekanismenya kelihatan, ujungnya belum | "gimana caranya" |
| **Angka mengagetkan** | satu angka besar + satu benda | klaim terukur |

Dua episode pertama keduanya **koreksi** (`MEJA, BUKAN GUDANG` ·
`LOKET, BUKAN DAFTAR`) dan itu bukan kebetulan: channel ini menjelaskan benda
yang penonton kira sudah ia pahami.

**3. Kata-katanya (≤ 4) dan gambaran yang dijanjikan.** Gambarannya ditulis
sebagai **benda**, bukan sebagai suasana — "dua loket yang saling menunjuk",
bukan "kesan berlapis". Bedanya penting karena baris ini adalah **pesanan ke
fase 2**: benda itu wajib benar-benar jadi scene di videonya. Itu yang membuat
larangan "jangan menjanjikan gambar yang tidak ada di videonya" jadi mustahil
dilanggar, bukan sekadar terlarang.

Fase 1 berhenti di situ. **Tidak ada `.tsx` yang ditulis** — figurnya wajib
komponen yang sama dengan scene-nya, dan komponen itu baru ada setelah fase 2.
Kover keempat Short menyusul di `thumbnail.md` yang sama pada fase 3, setelah
hook masing-masing Short ditulis ulang dari nol.

### Dirender dari Remotion, bukan digambar terpisah

Tiap episode punya satu komposisi thumbnail sendiri:

```
ideas/<slug>/thumbnail.md     keputusannya — ketegangan, pola, kata (fase 1)
ideas/<slug>/thumb.tsx        kata-katanya + figurnya (milik episode, fase 4)
shared/Thumbnail.tsx          tata letak, ukuran huruf, posisi teks (milik channel)
src/Root.tsx                  id komposisi "T<nn>-thumb", 1280x720 dari .env

npx remotion still T15-thumb ideas/apa-itu-firewall/render/thumb.png
```

**Arahnya satu: `thumbnail.md` → `thumb.tsx`**, sama seperti direction →
komposisi (HARD RULE 3). Kalau kartunya sudah dirender tapi terasa meleset dari
briefnya, yang benar briefnya — ubah komposisinya, jangan menulis ulang brief
supaya cocok dengan yang terlanjur digambar.

**Yang milik episode cuma dua: kata-katanya dan figurnya.** Sisanya —
posisi teks di kiri bawah, ukuran huruf, palet, marjin — hidup di
`shared/Thumbnail.tsx` dan dipakai bersama. Syarat thumbnail yang paling sulit
dipenuhi bukan "bagus" melainkan **sama**: video channel dikenali di feed dari
kejauhan lewat tata letak yang tidak berubah, dan itu tidak bertahan kalau tiap
episode menyalin lalu menggesernya sedikit.

Figurnya **wajib dari videonya sendiri** — komponen dan kelas CSS yang sama
dengan scene-nya, bukan gambar baru yang mirip. Thumbnail yang menjanjikan
gambar yang tidak ada di videonya menaikkan CTR dan menurunkan retensi, dan
YouTube menghitung yang kedua.

Batas 4 kata **dijaga kode**: `shared/Thumbnail.tsx` melempar error kalau
dilanggar. Peringatan di terminal akan terlewat; render yang gagal tidak.

**Sudut kanan bawah tidak dipakai** — di situ YouTube menempelkan badge durasi.

### Kover Short — 9:16, dan bacalah batasnya

Kedua Short punya kover sendiri, ukuran **2160×3840** (rasio 9:16, angka yang
disebut halaman bantuan YouTube untuk thumbnail Shorts):

```
ideas/<slug>/scene-shorts/thumb-s1.tsx     di LUAR folder scene-nya
ideas/<slug>/scene-shorts/thumb-s2.tsx     (npm run sisa memeriksa isi folder scene)

npx remotion still T15-thumb-s1 ideas/apa-itu-firewall/render/thumb-s1.png
npx remotion still T15-thumb-s2 ideas/apa-itu-firewall/render/thumb-s2.png
```

**Yang perlu diketahui sebelum berharap:** halaman bantuan YouTube menyatakan
*"You can't upload a custom thumbnail for Shorts like you can with long form
videos. You can select a frame from your Short to use as the thumbnail"* —
sementara di bagian ukuran, halaman yang sama menyebut *"For Shorts or Shorts
ads, upload a thumbnail with an aspect ratio of 9:16 (2160 x 3840 pixels
resolution)"*. Keduanya tertulis di
[satu halaman yang sama](https://support.google.com/youtube/answer/72431).
Jalur unggahnya berbeda-beda menurut perangkat dan pengguna.

Jadi: **PNG-nya dibuat, dan dipakai kalau kolom unggahnya menerimanya.** Kalau
yang tersedia cuma pilih-frame, pilih frame tempat gambaran kunci Short itu
mendarat — bukan frame pertama yang masih kosong.

**Jangan menempelkan kartu kover sebagai frame pertama Short.** Itu jalan
pintas yang sering dipakai orang supaya frame-nya bisa dipilih, dan ia membayar
dengan satu-satunya detik yang menentukan hidup-matinya sebuah Short
([docs/02 § Anatomi Shorts](02-format-video.md#anatomi-shorts)). Kover yang
tidak terpasang lebih murah daripada hook yang tertunda satu detik.

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
| H+5 | **Short 3 (Beda tipis)** tayang. |
| H+7 | **Short 4 (Coba sendiri)** tayang. |

**Alasan jeda: dua Shorts di hari yang sama saling memakan jangkauan** — dan
sejak naik jadi empat (2026-08-17), itu berhenti jadi soal kerapian. Empat Short
yang dilepas berdekatan bukan empat kali jangkauan, melainkan satu jangkauan
yang dibagi empat: feed menahan berapa banyak yang ia tunjukkan dari satu kanal
ke orang yang sama.

**Jarak minimalnya 48 jam antar-Short**, dan urutannya bukan selera:
Nugget duluan karena dialah yang dioptimalkan untuk jangkauan dan menarik
penonton baru; Coba sendiri paling belakang karena ia yang paling berguna bagi
penonton yang **sudah** mengenal kanalnya.

**Satu topik sekarang menempati sembilan hari.** Kalau jadwal rilis topik
berikutnya lebih rapat dari itu, yang bertabrakan Short topik lama dengan video
panjang topik baru — dan yang kalah selalu Short-nya.

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
