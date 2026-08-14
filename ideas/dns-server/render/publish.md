---
kode: T14
slug: dns-server
pilar: P2 · Di Balik Aplikasi
fase: 4 · VO jadi, tinggal render & unggah
tanggal_tayang:
---

# T14 · Metadata publish

Keluaran **fase 3**, dilanjutkan **fase 4** ([CLAUDE.md § Fase kerja](../../../CLAUDE.md)). Aturannya:
[docs/06](../../../docs/06-publishing.md). Daftar scene, VO, dan direction-nya
ada di [`../naskah.md`](../naskah.md), [`../scenes/`](../scenes/), dan
[`../scene-shorts/`](../scene-shorts/).

Ini berkas yang dibuka di sebelah halaman unggah YouTube — teks di blok kode
disalin apa adanya, tidak diketik ulang.

> **VO SUDAH JADI — 2026-08-14.** Gerbang ⚠ di
> [`../naskah.md` § Sumber](../naskah.md#sumber) dibuka lebih dulu (keenam
> barisnya), naskah dibekukan, lalu 29 berkas VO digenerate sekali jalan:
> **6.285 karakter, nol generate ulang**. Loudness diratakan ke −14 LUFS,
> `npm run sisa` melaporkan **nol subtitel preview**, dan seluruh detik bab di
> bawah sudah disalin ulang dari MP3 aslinya. Ketiga gambar juga jadi.
>
> **Ketiga MP4 sudah dirender** dan ada di folder ini, lengkap dengan trek suara.
>
> **Yang tersisa, dan keduanya cuma bisa dikerjakan manusia:**
>
> 1. **DENGARKAN ketiganya sampai habis.** Pengucapan "D N S" (dieja per huruf,
>    tiga tempat: `05-loket`, `s1/08-namanya`, `s2/01-mitos`) tidak bisa dinilai
>    skrip mana pun. Kalau melesat, perbaikannya generate ulang yang berbayar.
> 2. **Uji thumbnail 210×118** — kecilkan `thumb.png` ke ukuran itu dan lihat
>    sendiri.
>
> **Satu temuan audit yang sengaja dibiarkan, dan sekarang sudah terkunci:**
> ritme Short 1 datar (cv 0.16 vs 0.33 di S2, `npm run vo-script-audit`).
> Membenahinya sekarang berarti mengubah baris VO → generate ulang berbayar.
> Diputuskan jalan terus pada 2026-08-14.

---

## Video panjang — T14-L

**Durasi:** 5 mnt 35 dtk (334,78 dtk) — **final**, diukur dari VO sungguhan.
Berkas: `T14-L.mp4` — 24,1 MB, 1920×1080, −15,4 LUFS integrated.

Di dalam patokan 7–9 menit? Belum — tapi patokan itu memang bukan gerbang
([docs/02](../../../docs/02-format-video.md#durasi-itu-patokan-bukan-batas-keras--diubah-2026-08-14)).
Ketujuh bagian flow lengkap dan setiap `[explaining]` yang dijanjikan tabel flow
punya scene-nya, jadi yang mengikat sudah dipenuhi.

### Judul

| # | Kandidat | Karakter | Bentuk |
|---|---|---|---|
| **1** ✅ | **Apa itu DNS? Kenapa satu nama harus ditanya dulu** | 48 | pertanyaan mekanisme |
| 2 | Dari mana komputermu tahu harus pergi ke mana? | 46 | pertanyaan mekanisme |
| 3 | DNS itu bukan buku alamat, tapi deretan loket | 45 | koreksi keyakinan |

**Dipakai: #1.** Kata yang dicari orang (*DNS*) jatuh di karakter 9 — jauh di
dalam 40 karakter pertama yang terbaca di ponsel. Pembatasnya, "kenapa satu nama
harus ditanya dulu", persis pertanyaan yang dijawab `03-nomor-bukan-nama` →
`04-daftar-yang-basi` → `05-loket`, jadi janjinya ditepati sebelum menit kedua.

Kandidat 2 adalah judul kerja di `../naskah.md` dan kalimatnya paling enak
dibaca — tapi ia **tidak memuat satu pun kata yang dicari orang**. Tidak ada
yang mengetik "dari mana komputerku tahu" di kolom pencarian. Ditolak karena itu,
bukan karena bunyinya.

Kandidat 3 paling tajam, dan sengaja disimpan sebagai **judul pengganti** kalau
CTR 48 jam pertama jelek — ia memakai bahasa gambarannya, jadi bisa ditukar
tanpa menyentuh thumbnail.

### Deskripsi

```
Sebelum satu huruf pun terkirim, komputermu bertanya dulu: nama ini nomornya berapa? Video ini membongkar siapa yang ditanya — deretan loket yang saling menunjuk, dan tidak satu pun di antaranya tahu semuanya.
Untuk siapa pun yang memakai internet tiap hari. Tidak perlu tahu apa-apa soal jaringan.

⏱ Bab
00:00 Dari mana dia tahu harus ke mana?
00:20 Namanya tidak dikenal siapa pun di sana
00:38 Kenapa satu daftar tidak akan pernah selesai
01:00 Loket yang ditanya nama, menjawab nomor
01:20 Dibaca dari belakang, satu loket per potongan
01:57 Kenapa jawabannya dicatat di jalan pulang
02:19 Tiap catatan punya tanggal habis
02:53 Satu nama, beberapa kartu berbeda
03:31 Pertanyaannya berjalan terbuka
04:03 Amplop dan segel: dua hal yang berbeda
04:43 Yang berubah saat kamu ganti loket

📌 Yang dibahas
• Kenapa tempat di internet punya nomor, sementara kamu cuma hafal namanya
• Kenapa satu daftar berisi semua nama tidak akan pernah selesai dibuat
• Bagaimana satu nama diselesaikan dari kanan ke kiri, satu loket per potongan
• Kenapa tidak ada satu pun loket yang perlu tahu semuanya — dan apa untungnya
• Kenapa "menunggu propagasi DNS" itu nama yang salah untuk apa yang terjadi
• Kenapa satu nama memegang lebih dari satu jenis catatan
• Kenapa siapa pun di jalur bisa menjawab duluan, dan apa dua tambalannya
• Apa yang benar-benar berubah saat kamu mengganti nomor loket di setelan

🔗 Sumber & bacaan lanjutan
Mekanismenya bersumber dari spesifikasi terbuka, bukan dari "kata orang". Angkanya diukur sendiri di mesin ini:
- Nama diselesaikan bertingkat dari akar ke bawah, dan umur catatan ditentukan pemilik namanya — RFC 1034 §3.6, §4.2.1, §5.3.3: https://www.rfc-editor.org/rfc/rfc1034
- Jenis-jenis catatan (A, NS, CNAME, MX, TXT…) dan pengiriman polos lewat port 53 — RFC 1035 §3.2.1, §3.2.2, §4.2: https://www.rfc-editor.org/rfc/rfc1035
- Catatan alamat bentuk baru (AAAA) — RFC 3596: https://www.rfc-editor.org/info/rfc3596
- Menyamarkan pertanyaannya: DNS over TLS — RFC 7858: https://www.rfc-editor.org/info/rfc7858
- Menyamarkan pertanyaannya: DNS over HTTPS — RFC 8484: https://www.rfc-editor.org/info/rfc8484
- Menandatangani jawabannya: DNSSEC — RFC 9364 (BCP 237), intinya RFC 4033/4034/4035: https://www.rfc-editor.org/info/rfc9364
- Loket akar: 13 huruf A–M, 12 organisasi pengelola, 2.003 mesin operasional (dibaca 14 Agustus 2026) — https://root-servers.org
- Waktu bertanya nama, diukur di mesin ini lewat loket 8.8.8.8: 26,5 ms ke loket vs 1,1 ms dari catatan di mesin sendiri (median 25 pasang) — skripnya ada di repo channel ini, bisa kamu jalankan sendiri

🎬 Video terkait
- Apa itu RAM? Kenapa isinya harus disalin dulu — <url T01, belum tayang>

Get Resolved — penjelasan teknologi, coding, dan engineering dalam Bahasa Indonesia.
youtube.com/@GetResolved · getresolved.id

#DNS #JaringanKomputer #GetResolved
```

**Chapter valid:** 11 bab, mulai `00:00`, jarak terpendek 17,4 dtk
(00:20 → 00:38) — jauh di atas syarat 10 dtk YouTube. Batasnya mengikuti awal
tiap scene di `../timing.gen.ts`; **kartu judul (00:18–00:20) sengaja tidak jadi
batas bab** karena durasinya 2,5 dtk dan satu bab yang lebih pendek dari 10 dtk
membatalkan seluruh daftar.

> **Detik di atas FINAL** — disalin dari `../timing.gen.ts` setelah VO jadi,
> waktu timing berhenti memakai perkiraan jumlah kata dan mulai diukur dari MP3
> aslinya (2026-08-14). Kalau satu kalimat VO diubah, semuanya bergeser lagi:
> `npm run gen`, lalu salin ulang — jangan diketik tangan.

### Dua hal yang harus dijaga saat menyunting blok 🔗 Sumber

Tabel penuhnya di [`../naskah.md` § Sumber](../naskah.md#sumber); yang disalin ke
sini cuma dua jebakan yang paling gampang dirusak orang yang menyunting
deskripsi di kolom unggah.

**1. Loket akar punya TIGA angka, dan mereka bukan hal yang sama.** 13 =
huruf/alamat · 12 = organisasi pengelola · 2.003 = mesin operasional
(root-servers.org, 14 Agustus 2026). Hampir semua artikel populer menyebut yang
pertama seolah yang ketiga. Kalau baris itu diringkas jadi "13 server", ia jadi
kesalahan yang justru sedang dikoreksi episode ini.

**2. Angka pengukurannya milik mesin + sambungan ini, bukan milik "DNS".**
Baris itu wajib tetap menyebut "diukur di mesin ini". Dan yang terukur adalah
loket vs **catatan di mesin sendiri** — bukan catatan milik loketnya, yang
selisihnya justru hilang di derau (lihat `../naskah.md`).

**Jangan menambahkan angka ke scene mana pun** hanya karena gerbangnya sudah
lewat. Seluruh rencana VO episode ini ditulis tanpa satu angka pun dengan
sengaja — angka di bagian 3–6 memang tidak bisa dibayangkan siapa pun
([docs/09](../../../docs/09-tangga-abstraksi.md)).

### Tag

```
dns, apa itu dns, dns server, domain name system, cara kerja dns,
ganti dns, dns record, ttl dns, dnssec, doh dot,
jaringan komputer, cara kerja internet, teknologi indonesia,
belajar coding, programming indonesia
```

### Playlist

`Di Balik Aplikasi` (P2). Kedua Short **tidak** dimasukkan playlist pilar.

### Thumbnail

Teks: **LOKET, BUKAN DAFTAR** (3 kata). Nol kata yang sama dengan judul — judul
menjelaskan *kenapa harus ditanya dulu*, thumbnail menaruh **gambarannya**, dan
sekaligus jalan buntu yang ditutup episode ini.

> **Brief pertama menulis "BUKAN BUKU", dan itu keliru.** Jalan buntu di
> `04-daftar-yang-basi` digambar sebagai **tabel** — nama di kiri, nomor di
> kanan — bukan sebagai buku. Kartu yang menjanjikan buku akan menjanjikan
> gambar yang tidak ada di videonya: menaikkan CTR sambil menurunkan retensi,
> dan YouTube menghitung yang kedua
> ([docs/06](../../../docs/06-publishing.md#dirender-dari-remotion-bukan-digambar-terpisah)).

Isi: dua loket yang saling menunjuk di kiri (lacinya terbuka, yang atas berisi
dan beraksen), tabel nama→nomor yang redup dan tercoret di kanan. Loketnya
komponen `Loket` dari [`../panggung-loket.tsx`](../panggung-loket.tsx) — benda
yang sama dengan yang dilihat penonton di `05-loket` dan `06-tangga`, bukan
gambar baru yang mirip. Latar `--bg`, aksen Indigo. Loket terang, tabel redup:
ini kartu **koreksi**, dan yang dibaca dalam seperempat detik adalah
kontrasnya — coretannya cuma menegaskan.

**Sudah jadi** — `thumb.png` di sebelah berkas ini, 1280×720, 247 KB.

```powershell
npx remotion still T14-thumb ideas/dns-server/render/thumb.png
```

Sumbernya [`../thumb.tsx`](../thumb.tsx) (kata & figur) di atas
[`shared/Thumbnail.tsx`](../../../shared/Thumbnail.tsx) (tata letak channel).
Kalau kata-katanya diganti, render ulang perintah di atas — jangan menyunting
PNG-nya.

Tinggi huruf kapital 95px (syarat ≥ 90, dihitung `TINGGI_KAPITAL` di
`shared/Thumbnail.tsx`). **Uji 210×118 belum dikerjakan** — itu pemeriksaan
mata, bukan angka: kecilkan PNG-nya ke ukuran itu dan lihat sendiri. Kalau tidak
terbaca, ulangi; jangan diloloskan.

### Pinned comment

> Satu hal yang sengaja tidak masuk video ini biar tidak kepanjangan: loket yang
> bertanya untukmu itu biasanya bukan milikmu — ia milik yang menyediakan
> sambungan internetmu, dan itu sebabnya nomor yang sama bisa dijawab berbeda di
> dua rumah yang bersebelahan. Mau dibedah di episode sendiri?

---

## Short 1 — T14-S1 · “Nugget”

**Durasi:** 54,22 dtk (di bawah batas 60 dtk) — **final**, diukur dari VO sungguhan.
Berkas: `T14-S1.mp4` — 3,2 MB, 1080×1920, −15,5 LUFS integrated.

> **Sisanya cuma 5,4 dtk.** Perkiraan dari jumlah kata biasanya meleset beberapa
> persen, dan VO Bahasa Indonesia cenderung lebih lambat daripada 136 kata/menit
> saat ada jeda. Kalau setelah VO jadi angkanya menyeberang 60 dtk, yang dipotong
> **bukan** beat penutup `09-loop` — loop-nya yang membuat Short ini ditonton dua
> kali. Yang paling longgar: baris kedua `07-tidak-ada-yang-tahu`.

### Judul

| # | Kandidat | Karakter |
|---|---|---|
| **1** ✅ | **Nama situs dibaca dari belakang** | 31 |
| 2 | Titik paling kanan yang dibaca duluan | 37 |
| 3 | Kenapa alamat web dibaca terbalik | 33 |

**Dipakai: #1** — satu klaim, dan klaim itu **persis kalimat frame pertama**
(`01-dari-belakang`), jadi judul dan detik pertama tidak bertengkar.

Kandidat 2 lebih spesifik tapi memakai kata "titik" yang tanpa gambar di
depannya terbaca sebagai titik koordinat, bukan tanda baca.

### Deskripsi

```
Kamu membacanya dari kiri. Yang mengantarmu ke sana membacanya terbalik — potongan paling kanan dulu, dan tiap potongan membuka satu loket berikutnya. Makanya tidak ada satu pun yang harus tahu semuanya.

Penjelasan utuhnya: <url video panjang>

#Shorts
```

### Kover

Teks: **KANAN DULUAN** (2 kata). Nol kata yang sama dengan judul: judul menyebut
*arahnya* ("dari belakang"), kover menyebut *urutannya*.

> **Brief pertama menulis "KANAN DULU, KIRI TERAKHIR" dan ditolak sebelum
> render.** Kartu 9:16 cuma muat **11 huruf per baris** pada 260px, dan "Kiri
> Terakhir" 13 huruf — penjaga panjang baris di `shared/Thumbnail.tsx`
> melemparnya, persis seperti "TANGAN SAMA" di
> [T01](../../apa-itu-ram/render/publish.md). Yang dipendekkan **katanya**,
> bukan hurufnya: mengecilkan huruf melanggar syarat tinggi kapital docs/06, dan
> baris yang melipat jadi kartu tiga baris yang tidak terbaca di feed.

Figur: nama situs terpecah tiga di atas dengan potongan paling kanan menyala dan
dua lainnya redup, penanda segitiga di atasnya, tiga loket menurun ke
bawah-kanan — yang **terendah** beraksen, karena dialah yang dibuka potongan
paling kanan. Komponen `Loket` dari [`../panggung-loket.tsx`](../panggung-loket.tsx),
susunan yang sama dengan `06-ujung`. Kelebihan tinggi kartu 9:16 dipakai untuk
hal yang isinya memang ketinggian: tangganya.

> Garis penghubungnya **berhenti di atap loket**, bukan diteruskan ke jendelanya.
> Tiap loket duduk tepat di bawah potongannya, jadi garisnya persis tegak — dan
> garis tegak yang masuk ke dalam badan loket berhenti terbaca sebagai
> penghubung, mulai terbaca sebagai **tali gantungan**. Ketahuan dari still-nya,
> tidak dari kode.

**Sudah jadi** — `thumb-s1.png`, 2160×3840, 1,7 MB.

```powershell
npx remotion still T14-thumb-s1 ideas/dns-server/render/thumb-s1.png
```

Sumbernya [`../scene-shorts/thumb-s1.tsx`](../scene-shorts/thumb-s1.tsx).

Batasnya di [docs/06 § Kover Short](../../../docs/06-publishing.md#kover-short--916-dan-bacalah-batasnya)
— kalau kolom unggah cuma menawarkan pilih-frame, pilih frame tempat tangganya
sudah berdiri utuh (sekitar detik 30–36), dan **jangan** menempelkan kartu ini
sebagai frame pertama Short.

---

## Short 2 — T14-S2 · “Jebakan”

**Durasi:** 51,11 dtk (di bawah batas 60 dtk) — **final**, diukur dari VO sungguhan.
Berkas: `T14-S2.mp4` — 3,1 MB, 1080×1920, −15,8 LUFS integrated.

### Judul

| # | Kandidat | Karakter |
|---|---|---|
| **1** ✅ | **Ganti DNS tidak bikin internet cepat** | 36 |
| 2 | Ganti DNS biar kencang? Bukan itu | 33 |
| 3 | Yang berubah bukan kecepatannya | 31 |

**Dipakai: #1** — koreksi keyakinan, satu klaim, dan kata yang dicari orang
(*DNS*) ada di dalamnya. Ditepati `05-sisanya-sama` dan `07-terbuka`.

Kandidat 2 mengutip mitosnya sebagai pertanyaan, dan di feed itu berisiko
terbaca seolah Short ini **mendukung** mitosnya — kesalahan yang sama sudah
ditolak di [T01-S2](../../apa-itu-ram/render/publish.md). Kandidat 3 tidak
memuat "DNS" sama sekali, jadi tidak akan ketemu siapa pun yang mencarinya.

### Deskripsi

```
Bertanya alamat itu cuma sekali, di paling awal. Setelah nomornya ketemu, sisa perjalanannya lewat jalur yang sama persis. Yang benar-benar berubah biasanya hal lain: nama yang tadinya dijawab salah jadi dijawab benar. Itu terbuka, bukan kencang — dan loket barunya tetap melihat semua yang kamu tanyakan.

Penjelasan utuhnya: <url video panjang>

#Shorts
```

### Kover

Teks: **SEKALI, DI AWAL** (3 kata). Judul membantah ("Ganti DNS tidak bikin
internet cepat"); kover menaruh **buktinya** — bagian yang berubah itu potongan
paling depan, dan cuma itu. Nol kata yang sama.

> **Brief pertama menulis "TERBUKA, BUKAN KENCANG" dan ditolak sebelum render.**
> "Bukan Kencang" 13 huruf pada kartu yang muat 11. Memendekkannya jadi "Bukan
> Cepat" akan **mengulang kata dari judulnya**, jadi yang diambil sudut lain:
> bukan kesimpulannya, melainkan gambar yang membawanya. Kesimpulan "terbuka,
> bukan kencang" tetap hidup di VO `07-terbuka` dan di deskripsi.

Figur: bilah waktu satu halaman melintang — potongan bertanya di paling depan
beraksen, sisanya panjang dan abu — di atas lantai dengan loket di pojok kiri,
sosok berjalan, dan tempat tujuan jauh di kanan. Porsi `tanya` sama persis
dengan `BILAH.tanya` di
[`../scene-shorts/jalur-tanya.tsx`](../scene-shorts/jalur-tanya.tsx); kover yang
memakai porsi berbeda menjanjikan perbandingan yang tidak ada di videonya.
Lantainya bukan hiasan — ia yang membuat bilah di atasnya terbaca sebagai
**waktu perjalanan**, bukan sebagai bilah pemuatan biasa.

**Perbandingan panjangnya yang jadi argumen**, dan ia tidak butuh satu angka
pun — penting justru karena angka itu masih baris ⚠ di `../naskah.md § Sumber`.

**Sudah jadi** — `thumb-s2.png`, 2160×3840, 1,6 MB.

```powershell
npx remotion still T14-thumb-s2 ideas/dns-server/render/thumb-s2.png
```

Sumbernya [`../scene-shorts/thumb-s2.tsx`](../scene-shorts/thumb-s2.tsx).

---

## Jadwal rilis

| Hari | Aksi |
|---|---|
| H | Video panjang tayang. |
| H (+2 jam) | Short 1 “Nugget” tayang. |
| H+3 | Short 2 “Jebakan” tayang. |

Kedua Short menautkan video panjang di deskripsi; video panjang **tidak**
menautkan Short.

**Urutannya terhadap T01 belum diputuskan.** T01 sudah siap unggah tapi belum
tayang, dan `../ide.md` mencatat T14 naik ke posisi kedua di urutan rilis
([docs/07](../../../docs/07-backlog-topik.md)). Baris 🎬 Video terkait di atas
mengandaikan T01 tayang lebih dulu; kalau urutannya dibalik, baris itu ikut
dibalik.

---

## Checklist unggah

Salinan [docs/06 § Checklist unggah](../../../docs/06-publishing.md#checklist-unggah)
— dicentang di berkas ini, bukan di kepala.

Video panjang:

- [x] Judul ≤ 60 karakter (48) dan ditepati isi video.
- [x] Deskripsi, bab, tag, playlist, dan brief thumbnail tertulis.
- [x] **Blok 🔗 Sumber terisi** — gerbang ⚠ dibuka 2026-08-14, keenam barisnya.
- [x] `naskah_beku` diisi (L/S1/S2 = 2026-08-14), VO digenerate sekali jalan:
      6.285 karakter, nol generate ulang.
- [x] Detik bab disalin ulang dari `../timing.gen.ts` **setelah VO jadi**.
- [x] VO terpasang di seluruh 11 scene bicara, nol subtitel preview.
- [x] MP4 dirender: `T14-L.mp4`, 24,1 MB, −15,4 LUFS.
- [x] `../thumb.tsx` dibuat, didaftarkan di `src/Root.tsx`, dirender (`thumb.png`).
- [ ] **Uji 210×118 pada `thumb.png`** — pemeriksaan mata, belum dikerjakan.
- [ ] Tonton utuh & dengarkan pengucapan "D N S" (dieja per huruf — ditulis utuh
      akan dibaca "dens", lihat `../naskah.md` § Kamus pengucapan).
- [ ] Playlist pilar dipilih (`Di Balik Aplikasi`).
- [ ] End screen dipasang, tidak menutupi teks di 5 detik terakhir.
- [ ] Subtitle Indonesia diunggah (dari `../scenes/*-vo.md`, bukan auto-generate).
- [ ] Kategori *Science & Technology*, ditandai bukan konten untuk anak.
- [ ] Pinned comment dipasang.

Shorts:

- [x] Judul ≤ 40 karakter (31 & 36), deskripsi + `#Shorts` tertulis.
- [x] Durasi ≤ 60 dtk, rasio 9:16 — **54,25 dtk & 51,14 dtk**, diukur dari MP4
      final (bukan estimasi), 1080×1920.
- [x] `tumpang` & `jahit` bersih di kedua Short (74 frame, 16 sambungan).
- [x] VO terpasang, nol subtitel preview, −15,5 & −15,8 LUFS (target −14; jeda
      antar-scene menarik nilai integrated turun, sama seperti T01 yang rilis
      di −15,6).
- [x] Kover 9:16 dibuat (`thumb-s1.tsx`, `thumb-s2.tsx`) dan dirender
      (`thumb-s1.png`, `thumb-s2.png`).
- [ ] Kover dipasang **kalau** kolom unggahnya menerima berkas; kalau cuma
      pilih-frame, pilih frame yang gambarannya sudah berdiri (docs/06).
- [ ] Teks di layar patuh safe area dan terbaca tanpa suara — **baru 7 dari 20
      scene yang benar-benar dilihat mata.**
- [ ] `<url video panjang>` diganti URL sungguhan di kedua deskripsi — dan
      sampai video panjangnya tayang, baris itu belum bisa diisi.

**Temuan audit yang sekarang terkunci.** `npm run vo-script-audit` melaporkan
ritme Short 1 datar (cv 0.16, rata 6,2 kata/baris; bandingkan Short 2 yang 0.33)
dengan nol temuan tingkat A. Jendela untuk membenahinya adalah **sebelum** VO
digenerate, dan jendela itu sudah lewat pada 2026-08-14 — diputuskan jalan
terus. Kalau nanti tetap ingin diperbaiki, harganya generate ulang Short 1
(738 karakter) plus menggeser indeks `beat(ID, i)` di berkas `.tsx`-nya.

---

## Hasil 7 hari

Diisi setelah tayang ([docs/06 § Setelah tayang](../../../docs/06-publishing.md#setelah-tayang)).

| Metrik | Ambang sehat | Hasil |
|---|---|---|
| Average view duration | ≥ 50% | |
| Retensi 30 detik pertama | ≥ 70% | |
| CTR impression | 4–8% | |
| Klik Shorts → video panjang | — | |
