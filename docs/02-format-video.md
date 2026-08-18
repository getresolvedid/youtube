# 02 · Format Video

Satu topik = **1 video panjang + 4 Shorts**. Dokumen ini mengunci durasi,
struktur, dan pacing kelimanya.

> **Naik dari 2 jadi 4 pada 2026-08-17**, atas keputusan user. Yang bertambah
> bukan cuma jumlahnya: dua peran lama (Nugget, Jebakan) sudah menghabiskan
> tugasnya masing-masing, jadi dua peran baru harus punya **pekerjaan** yang
> berbeda — bukan sekadar sudut yang berbeda. Kalau Short ketiga cuma "Nugget
> kedua", ia akan memakan jangkauan Short pertama alih-alih menambahnya.
> Empat peran di bawah dipilih supaya tidak ada dua yang bisa saling
> menggantikan.

---

## Ringkasan angka

| | Video panjang | Shorts |
|---|---|---|
| Rasio · resolusi | 16:9 · 1920×1080 | 9:16 · 1080×1920 |
| FPS | 30 | 30 |
| Durasi target | **7–9 menit** — patokan, bukan gerbang (lihat di bawah) | **40–60 detik** (jangan lewat 60) |
| Kata VO | ~1.000–1.200 — ikut patokan durasi | ~100–130 |
| Jumlah scene | 55–90 — ikut patokan durasi | 8–14 |
| Chapter | Ya (≥ 3, wajib mulai `00:00`) | Tidak |
| Musik latar | Ya, −26 s/d −30 LUFS di bawah VO | Ya, boleh lebih hadir (−22 LUFS) |
| Loudness akhir | −14 LUFS integrated | −14 LUFS integrated |

**Patokan kecepatan baca VO Bahasa Indonesia: ~140 kata/menit.** Dipakai untuk
memperkirakan durasi dari naskah sebelum VO dibuat. Angka final selalu diambil
dari `ffprobe` berkas VO asli — lihat [pipeline §4](04-pipeline-produksi.md#4-tabel-timing).

### Durasi itu patokan, bukan batas keras — diubah 2026-08-14

Versi sebelumnya menulis "batas keras 6–12 menit", dan angka itu **menahan satu
episode yang sudah selesai** cuma karena ia kurang dari 3 menit 20 detik.
Keputusannya dibalik: **panjang video mengikuti materinya, bukan sebaliknya.**

Alasannya bukan kompromi. Menambah menit ke topik yang sudah tuntas berarti
menambah bagian yang tidak dibutuhkan penonton — dan yang jatuh duluan justru
metrik yang kita kejar: penonton berhenti di bagian yang terasa mengulang, dan
average view duration turun justru karena videonya dipanjangkan. Video enam menit
yang 40% ditinggalkan lebih buruk daripada video tiga menit yang ditonton habis.

Yang **tetap mengikat**, karena ketiganya soal isi, bukan panjang:

- Flow tujuh bagian lengkap — tidak ada bagian yang dilewati karena kependekan.
- Setiap `[explaining]` yang dijanjikan di tabel flow `naskah.md` punya scene.
  Kalau sebuah sub-topik tidak jadi dibuat, **coret dari tabelnya** — jangan
  ditinggal sebagai janji yang tidak ditepati.
- Chapter tetap ≥ 3 dan mulai `00:00`; di video pendek jaraknya tetap ≥ 10 detik.

7–9 menit tetap ditulis sebagai patokan karena topik yang benar-benar padat
biasanya mendarat di situ. Video yang jauh lebih pendek adalah **pertanyaan**,
bukan pelanggaran: apakah materinya memang sesingkat itu, atau ada bagian yang
belum digarap? Episode pertama dijawab dengan yang pertama — ia dirilis di
sekitar 3 mnt 20 dtk · ~430 kata · 11 scene.

Dua angka lain di tabel ringkasan — **kata VO** dan **jumlah scene** — cuma
turunan durasi, jadi keduanya ikut jadi patokan. Angka yang mengikat tetap
`SHORT_MAX_SECONDS` untuk Shorts (60 detik itu batas YouTube, bukan selera kita)
dan syarat chapter di atas.

---

## Anatomi video panjang — FLOW WAJIB

Setiap video panjang memakai **tujuh bagian, dalam urutan ini**. Bukan saran,
bukan template yang boleh dipilih-pilih: video yang tidak punya salah satunya
belum selesai.

Kolom **tangga** mengacu ke [09 · Tangga abstraksi](09-tangga-abstraksi.md):
L1 = bahasa anak 5 tahun, L2 = istilah teknis, L3 = angka dan batas.

| # | Bagian | Tangga | Tugasnya |
|---|---|---|---|
| **1** | **[question]** | **L1** | Satu pertanyaan yang jadi hook. **Frame pertama sudah pertanyaannya** — tanpa salam, tanpa perkenalan. Ini juga judul dan thumbnail-nya. |
| **2** | **brand opening** | — | Kartu judul 4,0 dtk. Scene standar, tidak dibuat ulang → [10](10-scene-standar.md). |
| **3** | **[problem]** | **L1** | Masalah yang dibawa pertanyaan itu. Kenapa hal ini bahkan jadi persoalan. Belum ada jawaban di sini. |
| **4** | **[answer] → [what]** | **L1→L2** | Jawaban atas problem — dan jawaban itu **dinamai**. Nama itulah `[what]`, subjek utama video. |
| **5** | **[why]** | **L2** | Kenapa `[what]` benar-benar menyelesaikan `[problem]`. Mekanisme sebabnya, bukan sekadar klaim. |
| **6** | **[explaining]** | **L2→L3** | Bedah `[what]` lebih dalam: cara kerjanya, batasnya, trade-off-nya. Bagian terpanjang dan paling padat visual. |
| **7** | **[case]** | **L3** | Di mana `[what]` benar-benar dipakai: siapa yang memakainya, di perangkat apa, kapan berguna dan kapan tidak. Angka nyata masuk di sini. |

### Aturan flow

- **Urutannya mengikat.** Jangan menjawab sebelum problemnya terasa; jangan
  menjelaskan dalam sebelum `[what]` dinamai; jangan memberi contoh sebelum
  penonton tahu kenapa itu bekerja.
- **`[what]` muncul tepat satu kali sebagai penamaan**, di bagian 4. Setelah itu
  ia dipakai konsisten sampai akhir.
- **Brand tidak pernah mendahului pertanyaan.** Sting selalu di bagian 2, tidak
  pernah di detik nol.
- **`[problem]` tidak boleh diringkas jadi satu kalimat.** Kalau penonton tidak
  merasakan masalahnya, jawaban di bagian 4 terasa seperti definisi kamus —
  dan itu titik penonton berhenti menonton.
- **`[why]` adalah bagian yang paling sering dilewatkan orang, dan paling
  menentukan.** Tanpa ini video cuma menghafalkan istilah.
- **`[case]` bukan rangkuman.** Ia menjawab "jadi ini kelihatan di mana?" —
  perangkat nyata, angka nyata, keputusan nyata.
- **Tidak ada babak "kontrak" atau "rangkuman" terpisah.** Kalimat bawa-pulang
  ditaruh sebagai penutup `[case]`, lalu langsung tanda brand.
- **Tanpa "jangan lupa like dan subscribe" di tengah video.** Cukup di tanda brand penutup.

### Patokan porsi (video 7 menit)

| Bagian | Porsi | Perkiraan |
|---|---|---|
| 1 [question] | 5% | ~20 dtk |
| 2 brand | — | 4,0 dtk |
| 3 [problem] | 15% | ~60 dtk |
| 4 [answer]/[what] | 10% | ~45 dtk |
| 5 [why] | 20% | ~85 dtk |
| 6 [explaining] | 35% | ~2,5 mnt |
| 7 [case] | 15% | ~65 dtk |

Kalau durasi kepanjangan, yang dipangkas duluan **[explaining]** — bukan
`[why]`, dan tidak pernah `[problem]`.

## Anatomi Shorts

Empat Shorts per topik punya **peran berbeda** — jangan bikin dua di antaranya
sejenis.

**Yang membedakan keempatnya PEKERJAANNYA, bukan sudutnya.** Ini pembedaan yang
paling gampang hilang saat digarap: empat sudut menarik dari topik yang sama
tetap bisa jadi empat Short yang terasa persis sama kalau keempatnya mengerjakan
hal yang sama pada penonton. Patokannya satu pertanyaan per Short — *apa yang
berubah pada penonton setelah menontonnya?*

| # | Peran | Pekerjaannya | Yang dituju |
|---|---|---|---|
| 1 | **Nugget** | Membuat penonton **kaget** oleh satu hal yang ternyata benar | jangkauan |
| 2 | **Jebakan** | **Mengoreksi** sesuatu yang sudah terlanjur dipercaya | komentar & share |
| 3 | **Beda tipis** | **Memisahkan** dua hal yang dikira sama | simpanan (save) |
| 4 | **Coba sendiri** | Memindahkan penonton dari *tahu* ke **melakukan** | kirim ke teman |

Uji cepatnya: tukar isi dua Short. Kalau keduanya masih masuk akal di tempat
yang lain, berarti perannya belum benar-benar berbeda dan salah satunya harus
ditulis ulang.

### Bentuk kedua: SERIAL

Empat peran di atas adalah **bentuk baku**. Ada bentuk kedua yang juga sah:
keempat Short menceritakan **satu cerita berurutan**, satu babak per Short —
perjalanan → masalah → jalan keluar → jawaban. Dipilih per topik, dan
diputuskan di `naskah.md` sebelum satu scene pun ditulis.

**Serial membeli kedalaman dengan membayar jangkauan**, dan harganya perlu
diketahui sebelum dipilih: penonton Shorts mendarat dari feed, satu per satu,
hampir tidak pernah berurutan. Yang membuka dengan "di video sebelumnya" atau
menyebut "pesan ini" tanpa memperkenalkannya sudah kehilangan penonton di detik
kedua — dan Short kedua sampai keempat berakhir hidup dari sisa penonton Short
pertama alih-alih membawa penontonnya sendiri.

**Karena itu serial punya satu syarat keras: SEPULUH DETIK PERTAMA TIAP SHORT
HARUS BERDIRI SENDIRI.** Bukan seluruh Short-nya — cuma pembukanya, dan itu
sudah cukup:

- **Bendanya diperkenalkan ulang, sekali, dalam satu frasa.** Bukan "pesan ini",
  melainkan "satu kalimat yang lagi jalan di internet". Satu frasa itu memakan
  ±1 detik dan menyelamatkan seluruh sisanya.
- **Dilarang membuka dengan "di video sebelumnya".** Ia memberi tahu penonton
  bahwa ia terlambat — dan penonton yang merasa terlambat menggeser. Kalau
  babak sebelumnya perlu diringkas, ringkas **bendanya**, bukan videonya:
  tunjukkan lagi dalam dua detik, jangan ceritakan.
- **CTA "Lanjut ke Short berikutnya" itu bonus, bukan syarat.** Ia mengundang
  yang sudah tertarik; ia tidak boleh jadi satu-satunya cara Short itu masuk
  akal.
- **Tiap Short tetap punya satu hal yang utuh di dalamnya** — satu temuan yang
  bernilai walaupun penonton berhenti di situ. Babak yang cuma menyiapkan babak
  berikutnya adalah trailer, dan trailer tidak ditonton sampai habis.

Yang **tidak** berubah di bentuk serial: batas 60 detik, hook ditulis ulang dari
nol, teks di layar wajib, berhenti di L1/L2, dan tanpa intro brand.

### Short 1 — “Nugget” (berdiri sendiri)

Satu insight utuh yang bernilai walaupun penonton tidak pernah menonton video
panjangnya. Ini yang dioptimalkan untuk jangkauan.

| Beat | Waktu | Isi |
|---|---|---|
| Hook visual + kalimat kejut | `0:00–0:03` | Frame pertama sudah bergerak. Kalimat pertama = klaim, bukan pengantar. |
| Ketegangan | `0:03–0:10` | Kenapa yang kamu kira benar itu keliru / kenapa ini penting. |
| Payoff | `0:10–0:45` | Jawabannya, divisualkan. Maksimal 3 langkah. |
| Tutup + loop | `0:45–0:55` | Satu kalimat rangkum yang menyambung mulus ke frame pertama (bikin loop terasa mulus). CTA lembut ke video panjang. |

### Short 2 — “Jebakan” (mitos / sebelum-sesudah)

Bentuk kontras: mitos vs kenyataan, kode salah vs kode benar, sebelum vs sesudah.
Ini yang biasanya mengundang komentar dan share.

| Beat | Waktu | Isi |
|---|---|---|
| Pernyataan mitos | `0:00–0:04` | Ditulis besar di layar, apa adanya. |
| Bantahan | `0:04–0:12` | "Salah — dan ini yang sebenarnya terjadi." |
| Bukti | `0:12–0:40` | Demo/diagram/angka. |
| Konsekuensi + CTA | `0:40–0:55` | Apa ruginya kalau tetap salah, lalu arahkan ke video panjang. |

### Short 3 — "Beda tipis" (dua benda yang dikira satu)

Dua hal yang penonton kira sama, dipisahkan sampai batasnya jelas. Ini bentuk
yang paling sering **disimpan** penonton, karena ia berguna sebagai rujukan
nanti — bukan cuma sebagai tontonan sekali lewat.

**Bedanya dengan Jebakan:** Jebakan membantah sesuatu yang **salah**; Beda tipis
memisahkan dua hal yang **dua-duanya benar** dan cuma tertukar. Tidak ada yang
dicoret di sini.

| Beat | Waktu | Isi |
|---|---|---|
| Dua benda berdampingan | `0:00–0:04` | Keduanya di layar sejak frame pertama, dengan namanya. Klaimnya: ini bukan hal yang sama. |
| "Kelihatannya sama" | `0:04–0:12` | Yang membuat keduanya tertukar — persamaan yang memang nyata, disebut jujur. |
| Satu perbedaan yang menentukan | `0:12–0:40` | Bukan daftar perbedaan. **Satu**, yang paling menentukan, divisualkan sampai selesai. |
| Akibatnya untukmu + CTA | `0:40–0:55` | Kapan tertukarnya merugikan. Kalau tidak pernah merugikan, Short ini tidak layak dibuat. |

### Short 4 — "Coba sendiri" (satu tes, hari ini juga)

Satu hal yang bisa dijalankan penonton dalam tiga puluh detik, dengan hasil yang
ia lihat **di layarnya sendiri**. Ini bentuk yang paling sering **dikirim ke
orang lain** ("coba deh"), karena yang dibagikan bukan informasinya melainkan
pengalamannya.

**Syarat mutlak:** tesnya harus bisa benar-benar dijalankan penonton awam, tanpa
memasang apa pun dan tanpa risiko. Kalau butuh terminal, akun kedua, atau
mematikan sesuatu — ganti tesnya, jangan dipermudah dengan kalimat.

| Beat | Waktu | Isi |
|---|---|---|
| Perintahnya, di detik nol | `0:00–0:04` | Bukan klaim dan bukan mitos: **suruhan**. "Buka X, tekan Y." |
| Apa yang akan kamu lihat | `0:04–0:14` | Dua kemungkinan hasilnya, keduanya disebut sebelum dijelaskan. |
| Kenapa hasilnya begitu | `0:14–0:42` | Mekanismenya, divisualkan. Di sinilah topiknya benar-benar diajarkan. |
| Arti hasilmu + CTA | `0:42–0:55` | Satu kalimat: kalau hasilmu A berarti ini, kalau B berarti itu. |

### Di mana berkasnya

Shorts tidak menumpang folder `scenes/` video panjang. Tiap Short punya
subfolder sendiri di bawah `scene-shorts/`:

```
ideas/<slug>/
  scenes/                        ← video panjang
  scene-shorts/
    s1-nugget/
      01-hook-vo.md              ← rencana VO   (HARD RULE 4)
      01-hook-direction.md       ← direction    (HARD RULE 3)
      01-hook.tsx                ← komposisi
      02-…
      index.ts                   ← SCENES Short ini
      Short.tsx                  ← perangkai, seperti Episode.tsx
    s2-jebakan/
      01-mitos-vo.md
      …
```

Seluruh HARD RULE berlaku apa adanya di dalamnya — tiga berkas per scene, tidak
ada scene yang isinya cuma teks, VO mengundang sebelum menamai, tiap sambungan
dijembatani.

**Penomoran mulai dari `01` lagi di tiap subfolder**, dan HARD RULE 5 (menyisipkan
scene = menomori ulang sesudahnya) berhenti di batas subfolder — empat Short
adalah empat urutan tayang yang berdiri sendiri, bukan satu daftar panjang.

**Id komposisi Remotion berprefiks nama subfolder**: `s1-01-hook`,
`s2-01-mitos`, `s3-01-berdampingan`, `s4-01-perintah`, dan Short utuhnya
`<slug>-s1` … `<slug>-s4`. Prefiksnya bukan hiasan — tanpa
itu `01-hook` milik Short bertabrakan dengan `01-hook-question` milik video
panjang di sidebar Studio yang sama. Ukuran komposisinya `SHORT_WIDTH` ×
`SHORT_HEIGHT` dengan `<Panggung rasio="9x16">`, bukan 16:9.

Yang membaca semuanya: `tools/baca-episode.mjs` mengambil tabel scene dari
bagian `## Short <n>` di `naskah.md` yang sama, `tools/bangun-timing.mjs` menulis
`timing.gen.ts` per Short, dan `src/Root.tsx` mendaftarkan komposisinya. **Yang
menentukan sebuah Short ada adalah SUBFOLDER-nya** — tidak ada daftar kedua di
skrip mana pun yang bisa meleset darinya.

### Aturan Shorts

- **Hook ditulis ulang dari nol**, bukan potongan mentah video panjang. Kalimat
  pembuka video panjang tidak pernah cukup agresif untuk feed Shorts.
- **HARD RULE 6 berlaku, tapi undangannya tidak jatuh di beat pertama.** Beat
  pertama sebuah Short adalah **klaim** (Nugget) atau **kutipan mitos**
  (Jebakan) — itu bentuknya, dan pengantar apa pun di detik nol membuang
  penontonnya. Undangan membayangkan jatuh di awal payoff, tempat gambarannya
  benar-benar dibangun, dan **cuma sekali**: scene sesudahnya meneruskan
  gambaran yang sama. Scene yang sengaja tidak mengundang tetap menulis
  alasannya di `## Catatan` (docs/11).
- **Nama benda tetap menyusul gambarannya.** Patokannya bukan nomor bagian —
  Shorts tidak punya flow tujuh bagian — melainkan syarat yang sama: bendanya
  sudah berdiri dan sudah dipakai di layar. **Satu pengecualian:** kalau
  mitosnya sendiri berbunyi dengan nama itu (`"Ganti DNS biar internet kencang"`),
  namanya jatuh di detik nol sebagai kutipan. Menuliskannya ulang tanpa nama
  bukan lagi mitos yang dipercaya orang, dan Short-nya kehilangan sasaran.
- **Teks di layar wajib** — mayoritas penonton Shorts menonton tanpa suara.
  Setiap kalimat VO punya padanan teksnya di layar (ringkas, bukan transkrip penuh).
- **Patuhi safe area.** Lihat [03 · Tema visual](03-tema-visual.md#safe-area-shorts).
- **Shorts berhenti di L1/L2.** Tidak cukup waktu untuk L3, dan memaksakan angka
  presisi di 50 detik justru membuat intinya hilang.
- **Tanpa intro brand.** Logo hanya muncul di 2 detik terakhir.
- Jangan lewat 60 detik. Video 61 detik kehilangan sebagian penempatan feed.

---

## Pacing & retensi

Aturan yang berlaku untuk ketiga keluaran:

1. **Durasi scene = durasi VO baris itu + 0,4 dtk padding.** Scene tidak pernah
   ditentukan dulu lalu VO dipaksa masuk — selalu sebaliknya.
2. **Tidak ada layar diam lebih dari 4 detik.** Kalau satu scene 8 detik, harus
   ada aktivitas tengah-scene: counter jalan, garis SVG tergambar, highlight
   berpindah, kamera zoom pelan.
3. **95% perpindahan scene = potong keras.** Transisi halus hanya di 2–3 momen
   kunci (buka babak, pergeseran besar, CTA). Ini konvensi film, dan alasan
   `shared/anim.ts` tidak menyediakan transisi antar-scene sebagai gerak baku.
4. **Satu layar = satu ide.** Kalau perlu tiga bullet, munculkan bertahap
   (stagger), jangan sekaligus.
5. **Kode di layar maksimal 12 baris**, highlight baris yang sedang dibahas.
   Kalau lebih panjang, potong jadi beberapa scene.
6. **Sunyi itu alat.** Beri jeda 0,5–0,8 dtk sebelum kalimat kunci — jangan isi
   penuh dengan VO.

## Aturan turunan Shorts ↔ video panjang

- Shorts dan video panjang **boleh** memakai ulang komponen visual (diagram,
  ikon, animasi) — memang itu gunanya `shared/theme.css`.
- Yang **tidak boleh** dipakai ulang: kalimat hook dan urutan beat. Feed berbeda,
  ritme berbeda.
- **Tidak ada dua Short yang boleh mengambil insight yang sama**, dan sejak naik
  jadi empat, syaratnya lebih ketat: yang harus berbeda **perannya**, bukan cuma
  insight-nya. Uji: tukar isi dua Short. Kalau keduanya masih masuk akal di
  tempat yang lain, salah satunya ditulis ulang.
- Publikasi: video panjang dulu, lalu keempat Short berjarak minimal 48 jam —
  H+2 jam, H+3, H+5, H+7. Detail di [06 · Publishing](06-publishing.md).
