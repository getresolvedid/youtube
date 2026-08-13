# 03 · Tema Visual

Tema diturunkan dari brand guideline **getresolved** —
[`wargasipil/getresolved`](https://github.com/wargasipil/getresolved) →
`branding/guidelines/brand.html`. Tujuannya: channel ini terlihat satu keluarga
dengan brand induk, tanpa jadi iklan produk.

Token siap pakai ada di [`../shared/theme.css`](../shared/theme.css) — **impor itu
di setiap komposisi**, jangan menulis ulang nilai hex di tiap berkas.

---

## Warna

### Token brand (dari brand guideline, jangan diubah)

| Token | Hex | Pakai untuk |
|---|---|---|
| Indigo (primary) | `#4F46E5` | aksen utama, garis penekanan, elemen aktif |
| Indigo Deep | `#4338CA` | kedalaman gradient, sisi gelap aksen |
| Green (accent) | `#10B981` | hasil benar, "resolve point", status sukses |
| Ink | `#0F172A` | latar terang→teks, dan basis latar gelap |

### Turunan untuk video (dark-first)

Video edukasi tech ditonton malam hari, sering di layar besar, dan penuh kode —
**latar gelap adalah default**. Latar terang hanya untuk kontras satu-dua scene.

| Token | Hex | Peran |
|---|---|---|
| `--bg` | `#0B1020` | latar utama (panel gelap resmi brand) |
| `--bg-elev` | `#141B32` | kartu, panel kode, area terangkat |
| `--ink-0` | `#F6F8FB` | teks utama di latar gelap |
| `--ink-1` | `#94A3B8` | teks sekunder, label, keterangan |
| `--ink-2` | `#64748B` | teks mati, elemen non-aktif |
| `--line` | `#1E293B` | garis pemisah, grid, tepi kartu |
| `--accent` | `#4F46E5` | Indigo — sorotan utama |
| `--accent-deep` | `#4338CA` | gradient, hover, bayangan aksen |
| `--ok` | `#10B981` | benar, berhasil, "setelah" |
| `--warn` | `#F59E0B` | peringatan, trade-off, "hati-hati" |
| `--bad` | `#EF4444` | salah, gagal, "sebelum" |

**Aturan pakai warna:**

- Maksimal **satu warna aksen dominan per scene**. Indigo dan Green tidak
  bertarung di layar yang sama kecuali memang sedang membandingkan dua hal.
- Merah/hijau **selalu berpasangan makna** salah/benar. Jangan pakai merah untuk
  dekorasi.
- Warna tidak boleh jadi satu-satunya pembawa informasi — selalu dampingi dengan
  label, ikon, atau posisi (aksesibilitas + selamat kalau video di-recompress).
- Rasio kontras teks ke latar minimal **4.5:1**. `--ink-2` khusus elemen non-teks.

## Tipografi

| Peran | Font | Bobot |
|---|---|---|
| Display / judul scene | **Manrope** | 800 (ExtraBold) |
| Sub-judul | Manrope | 600 (SemiBold) |
| Body / kalimat layar | Manrope | 500 (Medium) |
| Kode, angka, label data | **JetBrains Mono** | 400–700 |

Manrope adalah tipografi brand. JetBrains Mono adalah pasangannya untuk kode —
kontras bobot yang tajam (500 vs 800) adalah ciri visual channel ini.

**Jangan pakai** Inter, Roboto, Poppins, atau Montserrat — default yang bikin
video terlihat seperti template.

### Skala minimum (wajib)

Ukuran video ≠ ukuran web. Penonton menonton di ponsel dari jarak sepelemparan tangan.

| Elemen | 16:9 (1920×1080) | 9:16 (1080×1920) |
|---|---|---|
| Judul scene | ≥ 72px | ≥ 96px |
| Sub-judul | ≥ 44px | ≥ 60px |
| Body | ≥ 30px | ≥ 44px |
| Kode | ≥ 26px | ≥ 34px |
| Label/keterangan | ≥ 20px | ≥ 28px |

Kalau teks tidak muat pada ukuran minimum, **teksnya yang dipotong**, bukan
ukurannya yang dikecilkan.

**Baris teks maksimal:** 2 baris untuk judul, 3 baris untuk body. Panjang baris
ideal 28–40 karakter di 16:9, 20–28 karakter di 9:16.

## Ikon & figur

> **HARD RULE: tidak ada scene yang isinya cuma teks.** Setiap scene wajib punya
> elemen visual — ikon, figur, diagram, ilustrasi, grafik, atau animasi bentuk.
> Scene yang cuma teks belum selesai.

Alasannya bukan estetika. Channel ini menjanjikan penonton **melihat
mekanismenya**; layar penuh teks adalah slide presentasi, dan penonton YouTube
menutup slide.

### Set ikon

[`shared/icons.js`](../shared/icons.js) menyuntikkan sprite SVG inline ke dokumen
— tidak ada permintaan jaringan, aman untuk capture headless.

```html
<script src="shared/icons.js"></script>

<svg class="ic"><use href="#ic-ram"/></svg>
<svg class="ic ic-lg c-accent"><use href="#ic-chip"/></svg>
<svg class="ic ic-sm c-ok"><use href="#ic-check"/></svg>
```

| Kelompok | Ikon |
|---|---|
| Benda analogi | `desk` `cabinet` `file` `stack` |
| Perangkat keras | `chip` `ram` `disk` |
| Orang & arah | `person` `arrows` `ruler` `layers` |
| Status | `check` `x` `warning` `info` |
| Kejadian | `bolt` `drop` `refresh` `clock` `pause` |
| Data & lain | `graph-down` `graph-up` `money` `comment` `app` |

**Gaya:** garis, `viewBox` 96×96, `stroke-width` 6, ujung membulat, tanpa isian.
Semua ikon mewarisi `currentColor`, jadi kelas warna tema (`.c-accent`, `.c-ok`,
`.c-bad`, `.c-warn`) langsung berlaku.

**Ukuran:** `.ic` 120px · `.ic-sm` 72px · `.ic-lg` 180px · `.ic-xl` 260px.
Di 9:16 semuanya otomatis lebih besar.

### Aturan pakai

- **Satu ikon per scene** sebagai penanda utama. Dua ikon hanya kalau memang
  sedang membandingkan dua hal (kiri/kanan).
- **Di dalam kartu, ikon di kiri dan teks di kanan** — bukan ikon menumpuk di
  atas teks. Susunan mendatar membaca lebih alami dan kartunya tidak jadi
  tinggi-canggung. Ini otomatis: `.panel` yang berisi `.ic` langsung memakai
  tata letak dua kolom.
- Ikon yang berdiri sendiri di scene tengah tetap di **atas** judulnya.
- Ikon **mendukung** kalimatnya, tidak mengulanginya. Kalau teksnya sudah
  "listrik mati", ikon petir menambah — ikon bertuliskan "mati" tidak.
- Kalau tidak ada ikon yang pas, **buat figur atau diagramnya**. Kalau bentuknya
  akan berguna di episode lain, tambahkan sebagai ikon baru di `shared/icons.js`.
- Ikon bukan dekorasi acak. Scene yang butuh gerak (aliran data, perubahan state)
  tetap butuh animasi, bukan sekadar ikon diam.
- **Logo getresolved tidak dipakai sebagai ikon.** Ia hanya muncul di brand sting
  dan end card ([10 · Scene standar](10-scene-standar.md)). Menaburkannya sebagai
  pengisi justru melemahkan momen brand-nya.

## Layout & safe area

### 16:9

- Margin konten: **96px** di semua sisi.
- Kotak aman kritis: `x 96–1824`, `y 60–1020`.
- **Jangan taruh teks penting di 120px paling bawah** — tertutup progress bar
  dan tombol pemutar saat penonton menggerakkan kursor.
- Grid kerja: 12 kolom, gutter 32px.

### Safe area Shorts

UI YouTube Shorts menutup tepi layar. Kotak aman konservatif untuk 1080×1920:

```
            y = 240  ┌──────────────────────┐  ← di atas ini: judul/UI atas
                     │                      │
   x = 90 ───────────│   KOTAK AMAN KONTEN  │─────────── x = 920
                     │   830 × 1240 px      │            (kanan: rail tombol
                     │                      │             like/komentar/share)
            y = 1480 └──────────────────────┘
                         ↓ 440px bawah: judul video, nama channel, teks CTA
```

- Semua teks dan elemen kunci **wajib** di dalam `x 90–920`, `y 240–1480`.
- Area di luar kotak boleh diisi elemen dekoratif (gradient, grid, partikel)
  yang tidak apa-apa kalau tertutup.
- Titik fokus visual taruh di sekitar `y 700–1000` — itu zona mata penonton.

## Bahasa gerak

Konsistensi gerak lebih penting daripada variasi gerak.

| Situasi | Pola |
|---|---|
| Masuknya elemen | `opacity 0→1` + `y 24→0`, `duration 0.5`, `ease power3.out` |
| Penekanan | `scale 1→1.04` lalu balik, `ease back.out(2)` |
| Angka/counter | tween objek + `onUpdate`, `duration 1.5–2.0`, `ease power2.out` |
| Garis/panah SVG | `strokeDashoffset → 0`, `duration 0.8–1.2`, `ease power2.out` |
| Bar/diagram | `scaleY 0→1` dari `transformOrigin: bottom`, stagger 0.15 dtk |
| Aktivitas tengah-scene | `y ±5px`, `duration 1.5`, `ease sine.inOut`, `yoyo` |
| Ganti scene | **potong keras** (default) |
| Momen kunci (2–3× per video) | transisi shader 0,5 dtk |

**Aturan:**

- Setiap scene punya minimal **satu tween masuk**, dipicu 0,1–0,3 dtk setelah
  scene mulai (bukan tepat di 0 — biar tidak terasa mekanis).
- Minimal **3 ease berbeda** per scene supaya gerak tidak terasa robotik.
- Gerak mengikuti makna: sesuatu yang "mengalir" bergerak horizontal, sesuatu
  yang "bertumpuk" bergerak vertikal, sesuatu yang "gagal" bergetar lalu memudar.
- **Dilarang** animasi `repeat: -1`, `Math.random()`, `Date.now()`, `setInterval` —
  render harus deterministik.

## Elemen brand tetap

Brand sting dan end card **tidak dibuat ulang tiap episode** — keduanya sudah
jadi scene standar di `shared/scenes.*`, lihat [10 · Scene standar](10-scene-standar.md).

| Elemen | Spesifikasi |
|---|---|
| **Brand sting** | 1,5 dtk. Mark getresolved menggambar diri (stroke draw) + wordmark disingkap. Muncul **hanya** di babak 2 video panjang (setelah hook), tidak pernah di awal, tidak pernah di Shorts. → [10](10-scene-standar.md) |
| **Lower third** | Kiri bawah, `x 96, y 880`. Manrope 600 32px + garis indigo 4px. Tampil 3 dtk saat istilah baru diperkenalkan. |
| **Chapter card** | Nomor babak besar (Mono 800, `--ink-2`) + judul babak (Manrope 800). Tahan 2 dtk. |
| **Panel kode** | `--bg-elev`, radius 16px, padding 40px, garis tepi 1px `--line`, header titik tiga warna dimatikan (bukan mockup macOS). Baris aktif: latar `rgba(79,70,229,.18)` + garis kiri 3px indigo. |
| **End card** | 5 dtk (16:9) / 2 dtk (9:16). Mark + 1 kalimat CTA + handle channel. Di 16:9 konten di **paruh kiri**; paruh kanan dikosongkan untuk end screen YouTube. → [10](10-scene-standar.md) |
| **Logo** | Pakai SVG dari `getresolved/branding/assets/logos/`. Varian putih/inverse di latar gelap. **Jangan** direntangkan, dimiringkan, diwarnai ulang, atau diberi efek. Clear space = tinggi huruf `o` bullseye. |

## Do / Don't

**Lakukan**

- Satu ide per layar; sisanya kosong.
- Gerak yang menjelaskan (aliran data, urutan langkah, perubahan state).
- Kontras bobot font ekstrem (500 vs 800) sebagai hierarki, bukan warna.
- Ruang kosong yang berani — layar penuh = layar tidak terbaca.

**Jangan**

- Stock footage orang mengetik / "hacker" hoodie.
- Efek transisi di setiap potongan.
- Emoji sebagai ikon utama.
- Musik latar yang naik sampai menutupi VO.
- Screenshot buram di-upscale — semua tampilan kode dibuat ulang sebagai teks HTML.
- Gradient warna-warni di luar palet indigo→indigo deep.

## Catatan teknis HyperFrames

Perilaku yang mudah bikin bug visual, ditulis di sini supaya tidak terulang:

- Setiap scene: `class="scene clip"` + `data-start` + `data-duration` +
  `data-track-index`, dan isi dibungkus `<div class="scene-content">`.
- Scene **non-anchor** disembunyikan dengan `visibility:hidden` di HTML, lalu
  ditampilkan/disembunyikan lewat **`autoAlpha`** di timeline —
  bukan properti `visibility` mentah.
- Scene **anchor** (batas transisi shader) memakai `opacity:0`, dan anchor
  pertama tiap grup shader wajib di-set `opacity: 1` secara eksplisit.
- Waktu transisi = `batas_scene − (durasi_transisi / 2)`.
- Jangan pakai grain lewat `data:image/svg+xml` filter — pakai `radial-gradient` CSS.
- Scene harus menempel ujung-ke-ujung, tanpa celah. Kalau satu durasi berubah,
  `data-start` semua scene sesudahnya ikut berubah.
