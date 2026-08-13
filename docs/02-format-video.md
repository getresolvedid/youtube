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

## Anatomi video panjang — FLOW WAJIB

Setiap video panjang memakai **tujuh bagian, dalam urutan ini**. Bukan saran,
bukan template yang boleh dipilih-pilih: video yang tidak punya salah satunya
belum selesai.

Kolom **tangga** mengacu ke [09 · Tangga abstraksi](09-tangga-abstraksi.md):
L1 = bahasa anak 5 tahun, L2 = istilah teknis, L3 = angka dan batas.

| # | Bagian | Tangga | Tugasnya |
|---|---|---|---|
| **1** | **[question]** | **L1** | Satu pertanyaan yang jadi hook. **Frame pertama sudah pertanyaannya** — tanpa salam, tanpa perkenalan. Ini juga judul dan thumbnail-nya. |
| **2** | **brand opening** | — | Brand sting 1,5 dtk. Scene standar, tidak dibuat ulang → [10](10-scene-standar.md). |
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
  ditaruh sebagai penutup `[case]`, lalu langsung end card.
- **Tanpa "jangan lupa like dan subscribe" di tengah video.** Cukup di end card.

### Patokan porsi (video 7 menit)

| Bagian | Porsi | Perkiraan |
|---|---|---|
| 1 [question] | 5% | ~20 dtk |
| 2 brand | — | 1,5 dtk |
| 3 [problem] | 15% | ~60 dtk |
| 4 [answer]/[what] | 10% | ~45 dtk |
| 5 [why] | 20% | ~85 dtk |
| 6 [explaining] | 35% | ~2,5 mnt |
| 7 [case] | 15% | ~65 dtk |

Kalau durasi kepanjangan, yang dipangkas duluan **[explaining]** — bukan
`[why]`, dan tidak pernah `[problem]`.

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
- Kedua Shorts tidak boleh mengambil insight yang sama. Kalau Short 1 dan Short 2
  bisa saling menggantikan, salah satunya harus ditulis ulang.
- Publikasi: video panjang dulu, Short 1 di hari yang sama (+2 jam), Short 2
  di hari ke-3. Detail di [06 · Publishing](06-publishing.md).
