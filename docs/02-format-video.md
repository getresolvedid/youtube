# 02 · Format Video

Satu topik = **1 video panjang + 2 Shorts**. Dokumen ini mengunci durasi,
struktur, dan pacing ketiganya.

---

## Ringkasan angka

| | Video panjang | Shorts |
|---|---|---|
| Rasio · resolusi | 16:9 · 1920×1080 | 9:16 · 1080×1920 |
| FPS | 30 | 30 |
| Durasi target | **7–9 menit** (batas keras 6–12) | **40–60 detik** (jangan lewat 60) |
| Kata VO | ~1.000–1.200 | ~100–130 |
| Jumlah scene | 55–90 | 8–14 |
| Chapter | Ya (≥ 3, wajib mulai `00:00`) | Tidak |
| Musik latar | Ya, −26 s/d −30 LUFS di bawah VO | Ya, boleh lebih hadir (−22 LUFS) |
| Loudness akhir | −14 LUFS integrated | −14 LUFS integrated |

**Patokan kecepatan baca VO Bahasa Indonesia: ~140 kata/menit.** Dipakai untuk
memperkirakan durasi dari naskah sebelum VO dibuat. Angka final selalu diambil
dari `ffprobe` berkas VO asli — lihat [pipeline §4](04-pipeline-produksi.md#4-tabel-timing).

---

## Anatomi video panjang

Timecode di bawah adalah patokan untuk video 8 menit. Geser proporsional.

Kolom **tangga** mengacu ke [09 · Tangga abstraksi](09-tangga-abstraksi.md):
L1 = bahasa anak 5 tahun, L2 = istilah teknis, L3 = angka dan batas.

Struktur ini sekaligus yang melayani **dua lapis penonton**
([01](01-positioning.md)): babak 1–4 harus bisa diikuti khalayak umum tanpa
tertinggal, babak 5 adalah bagian yang membuat developer bertahan. Karena itu
**babak 5 tidak pernah dipangkas demi durasi** — yang dipangkas duluan babak 3.

| Babak | Timecode | Tangga | Tugasnya |
|---|---|---|---|
| **1. Hook** | `0:00–0:15` | **L1** | Satu pertanyaan atau satu fakta mengganggu. **Tanpa salam, tanpa perkenalan.** Frame pertama sudah konten. |
| **2. Kontrak** | `0:15–0:45` | L1 | Apa yang akan penonton bisa lakukan setelah video ini + peta singkat 3 babak. Di sini brand sting 1,5 dtk boleh muncul. |
| **3. Fondasi** | `0:45–2:30` | **L1→L2** | Model mental dasar. Analogi utama dibangun, dinamai dengan istilah aslinya, lalu disebutkan titik putusnya. |
| **4. Mekanisme** | `2:30–5:30` | **L2** | Inti video: bedah cara kerjanya, langkah demi langkah, dengan animasi. Bagian paling padat visual. |
| **5. Realita** | `5:30–7:00` | **L3** | Kapan ini gagal, trade-off, kesalahan umum, angka nyata. Ini yang membedakan video kita dari artikel blog. |
| **6. Rangkuman + CTA** | `7:00–8:00` | **L1** | 3 poin bawa-pulang di satu layar (bahasa paling sederhana), lalu satu ajakan spesifik + end card 5 dtk. |

### Aturan babak

- **Hook lebih dulu dari brand.** Bumper/logo tidak pernah muncul sebelum detik 15.
  Brand sting dan end card sudah jadi scene standar → [10](10-scene-standar.md).
- **Hook selalu L1.** Jangan pernah membuka video dengan istilah teknis — istilah
  baru boleh muncul setelah benda yang diwakilinya sudah terbayang.
- **Open loop.** Di babak 2, tanam satu pertanyaan yang baru dijawab di babak 5
  ("nanti kita lihat kenapa angka ini justru bikin sistemnya lambat").
- **Satu ide per babak.** Kalau babak 4 punya dua ide besar, itu dua video.
- **Babak 5 tidak boleh dipotong** saat durasi kepanjangan. Yang dipangkas duluan
  adalah babak 3.
- **Tanpa "jangan lupa like dan subscribe" di tengah video.** Sekali saja, di CTA akhir.

## Anatomi Shorts

Dua Shorts per topik punya **peran berbeda** — jangan bikin dua-duanya sejenis.

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

### Aturan Shorts

- **Hook ditulis ulang dari nol**, bukan potongan mentah video panjang. Kalimat
  pembuka video panjang tidak pernah cukup agresif untuk feed Shorts.
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
3. **95% perpindahan scene = potong keras.** Transisi shader hanya di 2–3 momen
   kunci (buka babak, pergeseran besar, CTA). Ini konvensi HyperFrames sekaligus
   konvensi film.
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
- Kedua Shorts tidak boleh mengambil insight yang sama. Kalau Short 1 dan Short 2
  bisa saling menggantikan, salah satunya harus ditulis ulang.
- Publikasi: video panjang dulu, Short 1 di hari yang sama (+2 jam), Short 2
  di hari ke-3. Detail di [06 · Publishing](06-publishing.md).
