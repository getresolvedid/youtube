---
kode: T01
slug: apa-itu-ram
pilar: P1 · Cara Kerja Sehari-hari
fase: 3 · judul & deskripsi — SELESAI
tanggal_tayang:
---

# T01 · Metadata publish

Keluaran **fase 3** ([CLAUDE.md § Fase kerja](../../../CLAUDE.md)). Aturannya:
[docs/06](../../../docs/06-publishing.md). Daftar scene, VO, dan direction-nya
ada di [`../naskah.md`](../naskah.md) dan [`../scenes/`](../scenes/).

Ini berkas yang dibuka di sebelah halaman unggah YouTube — teks di blok kode
disalin apa adanya, tidak diketik ulang.

> **SIAP UNGGAH — 2026-08-14.** Ketiga MP4 sudah jadi di folder ini, VO
> terpasang, nol subtitel preview, detik bab final dari VO sungguhan, dan blok
> 🔗 Sumber terisi dari datasheet vendor + pengukuran sendiri.
>
> **Satu pemeriksaan tersisa dan hanya bisa dikerjakan manusia:** tonton
> ketiganya sampai habis, dengarkan pengucapan "kesh", "ram", "hardisk",
> "D D R empat". Angka Short 1 berubah sebelum VO dibuat: **"dua bulan" jadi
> "tiga bulan"** (`../naskah.md` § Perubahan setelah verifikasi).

---

## Video panjang — T01-L

**Durasi:** 3 mnt 22 dtk (202,09 dtk) — **final**, diukur dari VO sungguhan.
Berkas: `T01-L.mp4`.

Lebih pendek dari patokan 7–9 menit, dan itu keputusan sadar: batas keras
dicabut di [docs/02](../../../docs/02-format-video.md#durasi-itu-patokan-bukan-batas-keras--diubah-2026-08-14)
pada 2026-08-14 karena memanjangkan topik yang sudah tuntas justru menurunkan
metrik yang dikejarnya.

### Judul

| # | Kandidat | Karakter | Bentuk |
|---|---|---|---|
| **1** ✅ | **Apa itu RAM? Kenapa isinya harus disalin dulu** | 45 | pertanyaan mekanisme |
| 2 | Kenapa isi aplikasi harus disalin ke RAM dulu? | 46 | pertanyaan mekanisme |
| 3 | RAM itu meja kerja, bukan tempat menyimpan | 42 | koreksi keyakinan |

**Dipakai: #1.** Kata yang dicari orang (*RAM*) jatuh di karakter 9, jauh di
dalam 40 karakter pertama yang terbaca di ponsel. Pembatasnya — "kenapa isinya
harus disalin dulu" — persis pertanyaan yang dijawab scene `bolak-balik` →
`ram-analogy` → `kenapa-cepat`, jadi janjinya ditepati sebelum menit kedua.

Kandidat 2 menaruh "RAM" di karakter 38, terlalu mepet batas potong. Kandidat 3
paling tajam tapi menjanjikan koreksi keyakinan yang di video ini baru datang di
scene terakhir — simpan sebagai **judul pengganti** kalau CTR 48 jam pertama
jelek.

### Deskripsi

```
Saat kamu buka aplikasi, isinya tidak dikerjakan di tempat asalnya — disalin dulu ke RAM. Video ini menunjukkan kenapa, lewat satu gambaran: gudang arsip dan meja kerja.
Untuk siapa pun yang memakai komputer tiap hari. Tidak perlu tahu apa-apa soal hardware.

⏱ Bab
00:00 Isinya tadi diambil dari mana?
00:16 Prosesor yang lebih banyak menunggu
00:38 Meja kerja itu RAM
00:52 Kenapa lewat meja jauh lebih cepat
01:18 Kenapa ukurannya selalu 8, 16, 32
01:38 Wujudnya: desktop, laptop, ponsel, kartu grafis
01:58 DDR4, DDR5, dan takik yang digeser
02:15 Bedanya dengan hardisk dan SSD
02:42 Yang bukan tugas RAM

📌 Yang dibahas
• Kenapa komputer punya dua tempat yang berbeda, bukan satu yang besar
• Kenapa isi berkas disalin dulu, dan aslinya tetap di penyimpanan
• Kenapa kapasitas RAM selalu kelipatan dua
• Kenapa batang DDR generasi berbeda tidak bisa saling tukar
• Kenapa RAM kosong total begitu listrik dicabut, sementara hardisk tidak
• Kenapa RAM yang lebih besar tidak membuat komputer lebih cepat

🔗 Sumber & bacaan lanjutan
Semua angka di video ini diukur sendiri atau diambil dari datasheet resmi:
- Latensi tiap tingkat di mesin yang dipakai (Core i7-11700F) — diukur dengan skrip di repo channel ini, bisa kamu jalankan sendiri
- Hardisk 7200 rpm, seek 8,5 ms + latensi putaran 4,16 ms — Seagate Desktop HDD Product Manual 100686584 Rev. AA §2.6: https://www.seagate.com/content/dam/seagate/migrated-assets/www-content/product-content/barracuda-fam/desktop-hdd/barracuda-7200-14/en-us/docs/100686584aa.pdf
- Kenapa ukuran RAM kelipatan dua, dan kenapa 24 GB jadi pengecualian — Micron 24Gb DDR5 SDRAM Die Rev C: https://www.farnell.com/datasheets/4594004.pdf
- Batang desktop 133,35 mm vs batang laptop 69,6 mm — Micron 288-Pin DDR5 UDIMM Core & 262-Pin DDR5 SODIMM Core: https://www.farnell.com/datasheets/4530576.pdf
- RAM ponsel dipatri sebagai chip, bukan batang — Micron LPDDR5 (441-ball TFBGA): https://www.farnell.com/datasheets/3761269.pdf
- Standar modul DDR5 — JEDEC JESD308: https://www.jedec.org/standards-documents/docs/jesd308b
- Kenapa penyimpanan tidak lupa — Micron NAND, data retention 10 tahun: https://www.micron.com

🎬 Video terkait
- <belum ada — T01 episode pertama>

Get Resolved — penjelasan teknologi, coding, dan engineering dalam Bahasa Indonesia.
youtube.com/@GetResolved · getresolved.id

#RAM #HardwareKomputer #GetResolved
```

**Chapter valid:** 9 bab, mulai `00:00`, jarak terpendek 13,9 dtk (00:38 → 00:52)
— di atas syarat 10 dtk YouTube. Batasnya mengikuti awal tiap scene di
`../timing.gen.ts`; **kartu judul (00:12–00:16) sengaja tidak jadi batas bab**
karena durasinya 4 dtk dan akan membatalkan seluruh daftar bab.

> Detik di atas **final** — disalin dari `../timing.gen.ts` setelah VO jadi,
> waktu timing berhenti memakai perkiraan jumlah kata dan mulai diukur dari MP3
> aslinya (2026-08-14). Kalau satu kalimat VO diubah, semuanya bergeser lagi:
> `npm run gen`, lalu salin ulang — jangan diketik tangan.

### Tag

```
ram, apa itu ram, random access memory, memori komputer, ddr4, ddr5,
ram vs hardisk, ssd, cara kerja komputer, hardware komputer,
belajar komputer, teknologi indonesia, belajar coding, programming indonesia
```

### Playlist

`Cara Kerja Sehari-hari` (P1). Kedua Short **tidak** dimasukkan playlist pilar.

### Thumbnail

Teks: **MEJA, BUKAN GUDANG** (3 kata). Tidak mengulang satu kata pun dari judul
— judul menjelaskan *kenapa disalin*, thumbnail menaruh gambarannya.

Isi: figur meja kerja (berkas terhampar) di kiri, lemari arsip gudang di kanan,
panah salin di antaranya — kelas `.meja` dan `.lemari` yang sama dengan scene
`04-ram-analogy`. Latar `--bg`, aksen Indigo. Meja terang, lemari redup: ini
kartu **koreksi**, dan yang dibaca dalam seperempat detik adalah kontrasnya,
bukan panahnya.

**Sudah jadi** — `thumb.png` di sebelah berkas ini, 1280×720, 230 KB.

```powershell
npx remotion still T01-thumb ideas/apa-itu-ram/render/thumb.png
```

Sumbernya [`../thumb.tsx`](../thumb.tsx) (kata & figur) di atas
[`shared/Thumbnail.tsx`](../../../shared/Thumbnail.tsx) (tata letak channel).
Kalau kata-katanya diganti, render ulang perintah di atas — jangan menyunting
PNG-nya.

**Uji 210×118: lolos.** Tinggi huruf kapital 95px (syarat ≥ 90). Panahnya
sengaja panjang dari tepi lemari sampai tepi meja — versi pendeknya terbaca
sebagai tanda, bukan sebagai jarak, padahal jarak itulah isi videonya.

### Pinned comment

> Ada satu hal yang sengaja tidak masuk video ini biar tidak kepanjangan: di
> antara prosesor dan RAM masih ada meja yang jauh lebih kecil dan jauh lebih
> dekat — namanya cache. Mau dibedah di episode sendiri?

---

## Short 1 — T01-S1 · “Nugget”

**Durasi:** 47,96 dtk (di bawah batas 60 dtk) — **final**, diukur dari VO
sungguhan. Berkas: `T01-S1.mp4`, −15,6 LUFS, puncak −4,3 dBFS.

### Judul

| # | Kandidat | Karakter |
|---|---|---|
| **1** ✅ | **Prosesormu lebih sering menunggu** | 32 |
| 2 | Kalau 1 langkah prosesor = 1 detik | 34 |
| 3 | Cache, RAM, hardisk dalam skala manusia | 39 |

**Dipakai: #1** — satu klaim, dan klaim itu persis kalimat frame pertama
(`01-menunggu`), jadi judul dan detik pertama tidak bertengkar.

### Deskripsi

```
Kalau satu langkah prosesor kita besarkan jadi satu detik, meja kerjanya sekitar satu menit jauhnya — dan gudangnya tiga bulan. Itu alasan komputer menyalin dulu sebelum mengerjakan.

Penjelasan utuhnya: <url video panjang>

#Shorts
```

---

## Short 2 — T01-S2 · “Jebakan”

**Durasi:** 56,55 dtk (di bawah batas 60 dtk) — **final**, diukur dari VO
sungguhan. Berkas: `T01-S2.mp4`, −15,6 LUFS, puncak −4,7 dBFS.

### Judul

| # | Kandidat | Karakter |
|---|---|---|
| **1** ✅ | **Nambah RAM belum tentu bikin cepat** | 34 |
| 2 | RAM lebih besar = komputer lebih cepat? | 39 |
| 3 | Meja lebih lebar, tangan tetap sama | 35 |

**Dipakai: #1** — koreksi keyakinan, satu klaim, dan ditepati scene `beli`.
Kandidat 2 mengulang mitosnya tanpa membantah; di feed itu terbaca seolah Short
ini **mendukung** mitosnya.

### Deskripsi

```
Meja dua kali lebih lebar tidak membuat tanganmu lebih cepat. Yang perlu kamu lihat bukan angka RAM terpakai, tapi apakah komputermu sudah mulai bolak-balik ke penyimpanan.

Penjelasan utuhnya: <url video panjang>

#Shorts
```

---

## Jadwal rilis

| Hari | Aksi |
|---|---|
| H | Video panjang tayang. |
| H (+2 jam) | Short 1 “Nugget” tayang. |
| H+3 | Short 2 “Jebakan” tayang. |

Kedua Short menautkan video panjang di deskripsi; video panjang **tidak**
menautkan Short.

---

## Checklist unggah

Salinan [docs/06 § Checklist unggah](../../../docs/06-publishing.md#checklist-unggah)
— dicentang di berkas ini, bukan di kepala.

Video panjang:

- [x] Blok 🔗 Sumber terisi (gerbang ⚠ di `../naskah.md` § Sumber sudah lewat,
      2026-08-14).
- [x] Detik bab disalin ulang dari `../timing.gen.ts` setelah VO jadi.
- [x] VO terpasang di seluruh 9 scene bicara, nol subtitel preview.
- [ ] **Tonton utuh & dengarkan pengucapannya** — tidak bisa diwakilkan skrip.
- [x] Thumbnail lolos uji 210×118 (`thumb.png`, dirender dari `T01-thumb`).
- [ ] Playlist pilar dipilih.
- [ ] End screen dipasang, tidak menutupi teks di 5 detik terakhir.
- [ ] Subtitle Indonesia diunggah (dari `../scenes/*-vo.md`, bukan auto-generate).
- [ ] Kategori *Science & Technology*, ditandai bukan konten untuk anak.
- [ ] Pinned comment dipasang.

Shorts — **MP4 sudah jadi, tinggal ditonton lalu diunggah:**

- [x] Durasi ≤ 60 dtk, rasio 9:16. *(47,96 dtk & 56,55 dtk — diukur dari MP4
      final, bukan estimasi.)*
- [x] VO terpasang, nol subtitel preview, loudness −15,6 LUFS (target −14).
- [ ] **Tonton keduanya utuh dan dengarkan pengucapannya** — "kesh", "ram",
      "hardisk", "D D R". Ini satu-satunya pemeriksaan yang tidak bisa
      diwakilkan ke skrip.
- [ ] Teks di layar patuh safe area dan terbaca tanpa suara.
- [ ] `<url video panjang>` diganti URL sungguhan di kedua deskripsi — **dan
      sampai video panjangnya tayang, baris itu belum bisa diisi.** Pilihannya:
      tahan Shorts sampai video panjang siap, atau unggah tanpa baris itu dan
      suntingkan deskripsinya nanti.

---

## Hasil 7 hari

Diisi setelah tayang ([docs/06 § Setelah tayang](../../../docs/06-publishing.md#setelah-tayang)).

| Metrik | Ambang sehat | Hasil |
|---|---|---|
| Average view duration | ≥ 50% | |
| Retensi 30 detik pertama | ≥ 70% | |
| CTR impression | 4–8% | |
| Klik Shorts → video panjang | — | |
