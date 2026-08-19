# Kotak aman Shorts — standar tata letak 9:16

**Berlaku untuk:** setiap Short di repo ini — keempatnya, tiap topik, termasuk
hook, penjelasan, diagram, rekap, CTA, dan kartu penutup.
**Kanvas:** 1080 × 1920 (`SHORT_WIDTH` / `SHORT_HEIGHT` di `.env`).
**Status:** standar produksi. Ini **batasan tata letak**, bukan saran desain.
**Sumber angkanya:** `.r-9x16` di [`shared/theme.css`](../shared/theme.css),
digambar di [docs/03 § Safe area Shorts](../docs/03-tema-visual.md#safe-area-shorts).
Kalau dokumen ini dan CSS-nya berbeda, **CSS yang benar** — perbaiki di sini.

---

## Kenapa dokumen ini ada

Antarmuka YouTube Shorts menggambar dirinya **di atas** videonya: rail tombol di
kanan, nama channel dan judul di bawah, progress bar di paling bawah. Yang
hilang di situ bukan piksel, melainkan **pemahaman** — label yang tertutup
tombol *share* membuat diagramnya berhenti menjelaskan apa pun, dan penonton
tidak pernah tahu bahwa ada yang tertutup. Ia cuma merasa videonya
membingungkan, lalu menggeser.

Satu kalimat yang menampung seluruh dokumen ini:

> **Apa pun yang harus dibaca, dimengerti, atau diperhatikan penonton tinggal di
> kotak aman. Kanan dan bawah layar dianggap tertutup. Kalau ragu, geser ke
> tengah.**

---

## 1. Kanvas & zonanya

| Zona | Rentang | Yang menutupinya |
|---|---|---|
| **Kotak aman** | `x 90–920`, `y 240–1480` (830 × 1240) | — |
| Atas | `y 0–240` | UI atas pemutar Shorts |
| **Kanan** | `x 920–1080` | rail tombol: suka, komentar, kirim, remix, foto channel |
| **Bawah** | `y 1480–1920` | nama channel, judul video, teks CTA, progress bar |
| Kiri | `x 0–90` | bukan UI — tapi tepi tetap tepi (§5) |

Kotak amannya **separuh kanvas.** Separuh sisanya bukan tempat menaruh apa pun
yang harus dibaca. Ia bukan area terlarang — lihat §3 — cuma area yang isinya
harus tetap masuk akal kalau tertutup.

Angka-angka di atas dipakai lewat variabel, bukan diketik ulang: `--safe-x`,
`--safe-top`, `--safe-bottom` di `.r-9x16`. Ukuran kanvasnya sendiri datang dari
`.env` ([docs/08](../docs/08-konfigurasi.md)) — jangan pernah menulis `1080` atau
`1920` sebagai angka setelan di komposisi.

## 2. Kotak amannya tidak setengkuk kanvas

Jebakan yang paling mudah kena, dan paling tidak terlihat: zona kanan 160px,
margin kiri 90px, jadi **titik tengah kotak aman ada di `x 505`, bukan `540`.**

Akibatnya mengikat isi yang dipusatkan ke tengah kanvas — dan itu **baku** di
repo ini (`.scene-content.center`, `textAnchor="middle"` di `x={W / 2}`):

- Isi yang dipusatkan di `x 540` boleh selebar **760px**, bukan 830. Lebih dari
  itu, sisi kanannya masuk rail sementara sisi kirinya masih punya sisa ruang.
- Kalau memang butuh lebih lebar dari 760, **geser titik pusatnya ke `x 505`** —
  jangan melebarkan isinya dari titik tengah kanvas.

## 3. Apa yang dihitung kritis

**Kritis** — wajib utuh di dalam kotak aman:

- Teks apa pun yang dimaksudkan untuk dibaca: kalimat layar, judul, istilah, angka
- `<text>` di dalam figur SVG — label simpul, nomor potongan, nama perangkat
- Ikon yang menyampaikan makna (centang, silang, kunci), bukan yang menghias
- Ujung panah dan penanda arah yang menentukan urutan dibacanya diagram
- Bagian figur yang jadi **inti beat itu** — kotak yang menyala saat "sampai",
  potongan yang sedang diikuti mata
- Ajakan (CTA)

**Tidak kritis** — boleh menyeberang:

- Gradient latar, jaring latar, titik-titik, partikel
- Permukaan: kartu, panel, kanvas figur — asal labelnya sendiri di dalam kotak
- Garis jalur yang **maknanya justru keluar frame** ("pergi ke suatu tempat")
- Benda sekunder yang tetap terbaca walau separuhnya tertutup

Pembedaannya sama persis dengan yang dipakai `npm run tumpang`
([CLAUDE.md](../CLAUDE.md)): yang dihitung cuma yang bisa **rugi** kalau
tertutupi. Permukaan tidak rugi; label rugi.

## 4. Dua jalan isi sampai ke layar — cuma satu yang dijaga CSS

Ini bagian yang paling perlu diketahui sebelum menggarap Short di repo ini.

**Jalan pertama: isi alir lewat `<Scene>`.** Isinya otomatis dibungkus
`.scene-content` yang sudah berpadding `--safe-top` / `--safe-x` /
`--safe-bottom`. Gratis, seragam, dan **jangan menulis padding scene sendiri**
([docs/03](../docs/03-tema-visual.md)).

**Jalan kedua: figur SVG dengan `viewBox` sendiri** — dan ia **menembus padding
itu tanpa perlawanan.** `viewBox="0 0 1080 1920"` berarti koordinatnya piksel
kanvas langsung; tidak ada satu pun yang mencegah sebuah `<text>` mendarat di
`x 1000`. Di jalan kedua inilah kotak aman ditegakkan **dengan tangan**, dan di
jalan kedua itu pula mayoritas isi Short kita hidup (lihat
[`ideas/tcp-ip/scene-shorts/panggung-short.tsx`](../ideas/tcp-ip/scene-shorts/panggung-short.tsx)).

Dua akibat praktisnya:

- **Koordinat teks SVG itu baseline, bukan tepi atas.** `<text y={250}>` pada
  `fontSize 62` punya tepi glif di ±`205` — 35px di atas batas 240. Kotak aman
  bicara soal **tepi**; ubah dulu baseline jadi tepi sebelum membandingkannya.
- **Padding kanan CSS cuma 90px, bukan 160px.** Artinya `.scene-content` sendiri
  masih membolehkan teks tumbuh sampai `x 990` — 70px di dalam rail tombol.
  Jalan pertama pun **bukan jaminan**; ia cuma menutup tiga sisi dari empat.
  (Utang ini tercatat di §14.)

## 5. Aturan penempatan

1. **Konservatif, bukan pas-pasan.** Rancang dengan ruang napas; jangan
   menempelkan isi ke garis kotak aman. Kalau ragu, geser ke tengah.
2. **Titik fokus di `y 700–1000`** — zona mata penonton
   ([docs/03](../docs/03-tema-visual.md#safe-area-shorts)). Beat terpenting satu
   scene ditaruh di situ, bukan di mana pun yang kebetulan kosong.
3. **Susunan bakunya tegak:** konteks/teks layar di atas, gagasan utama di
   tengah, penopang di bawahnya, lalu ruang kosong untuk UI. Boleh berubah per
   scene; yang tidak boleh berubah cuma satu — yang terpenting tinggal di medan
   pandang tengah.
4. **Urutan prioritas saat bentrok:** paham → kotak aman → keterbacaan →
   hierarki visual → komposisi → hiasan. Tidak ada komposisi yang cukup bagus
   untuk membayar satu label yang tertutup.
5. **Jangan bikin benda yang mirip tombol platform** di dekat rail kanan —
   penonton mencoba menekannya, gagal, lalu menggeser.

## 6. Teks di layar

Teks di layar **wajib** di Shorts — mayoritas penonton menonton tanpa suara
([docs/02](../docs/02-format-video.md#anatomi-shorts)). Karena wajib, ia juga
yang paling sering menabrak kotak aman.

- **20–28 karakter per baris** ([docs/03](../docs/03-tema-visual.md)); `--measure`
  di `.r-9x16` sudah `24ch`.
- Maksimal **dua baris** per beat. Baris ketiga hampir selalu tanda bahwa
  beat-nya yang perlu dipecah, bukan fontnya yang perlu dikecilkan.
- Tempatnya **sepertiga atas atau tengah**. Tidak pernah menempel bawah: di
  situ ia bertabrakan dengan judul video, dan judul video menang.
- Kalau tidak muat: kurangi katanya dulu, baru pecah scene-nya. **Mengecilkan
  font adalah pilihan terakhir** — dan tetap tunduk pada skala di `.r-9x16`.

## 7. Subtitel

Repo ini **tidak membakar subtitel** ke MP4. Yang terlihat di preview adalah
subtitel sementara dari [`shared/Vo.tsx`](../shared/Vo.tsx), yang sengaja duduk
di `calc(var(--safe-bottom) * 0.45)` — **di dalam zona bawah** — karena ia
memang tidak pernah ikut ke berkas akhir dan hilang sendiri begitu
`public/vo/<slug>/L-<kunci>.mp3` ada.

Jadi: **jangan menata scene di sekitar kotak subtitel preview**, dan jangan
membacanya sebagai contoh penempatan yang sah. Kalau nanti kita memutuskan
membakar subtitel, ia jadi isi kritis penuh dan wajib naik ke dalam kotak aman.

## 8. Figur & diagram

- Seluruh bagian diagram yang **harus dibaca** ada di dalam kotak aman; kanvas
  SVG-nya sendiri boleh selebar layar.
- Label menjauh dari rail kanan dan zona bawah — termasuk label yang muncul
  belakangan lewat animasi.
- Panah tidak berakhir di bawah tombol. Kalau ujungnya memang harus keluar
  frame, pastikan **maknanya** yang keluar ("pergi"), bukan **informasinya**.
- Jaga jarak antara simpul dan labelnya; di layar HP, dua benda yang berjarak
  20px terbaca sebagai satu.

**Kalau diagramnya kelewat lebar, jangan langsung mengecilkannya.** Urutannya:
sederhanakan → kurangi simpulnya → munculkan bertahap → pecah ke beberapa scene
→ pindahkan yang sekunder ke shot berikutnya. Diagram yang muat tapi tidak
terbaca sama saja dengan diagram yang tertutup.

Di 9:16 arahnya pun berubah: video panjang mengalir kiri → kanan, Short mengalir
atas → bawah. **Komponennya diimpor, koordinatnya ditulis ulang** — persis
alasan `panggung-short.tsx` ada. Menyalin koordinat 16:9 ke kanvas 9:16
menghasilkan Short yang kosong di kanan dan terpotong di kiri.

## 9. Gerak & kamera

Kepatuhan diukur **sepanjang scene**, bukan di frame pertama.

- Benda kritis boleh **melintas** zona terlarang, tapi tidak boleh **berhenti**
  di sana. Yang menentukan bukan lintasannya, melainkan di mana ia diam saat
  penonton membacanya.
- Zoom, pan, dan skala ikut dihitung: posisi **akhir** setiap benda kritis tetap
  harus di dalam kotak. Scene yang aman di detik 0 dan tidak aman di detik 3
  **tidak patuh**.
- Yang masuk dari bawah wajib naik sampai ke dalam kotak sebelum berhenti.
  Angka atau label yang masuk dari bawah lalu diam separuh tertutup adalah cacat
  yang paling sering lolos, karena saat digarap kita menontonnya di layar besar
  tanpa UI.
- Semua ini tetap tunduk pada aturan deterministik: nilai gerak fungsi murni
  dari detik, dijepit di kedua ujung ([docs/03](../docs/03-tema-visual.md)).

## 10. Penutup & CTA

- Kartu penutup Short **2 detik** (`CLOSING_SHORT_SECONDS`), isinya di tengah —
  sudah diatur `shared/scenes.css`, jangan dibuat ulang
  ([docs/10](../docs/10-scene-standar.md)).
- CTA **tidak pernah bertumpu pada tepi bawah.** Bukan "SUBSCRIBE ↓" menempel
  bawah, melainkan satu kalimat ajakan di dalam kotak aman.
- CTA tidak boleh menutupi informasi yang masih dijelaskan.

## 11. Cara memeriksa

Sebelum satu scene Short dinyatakan selesai:

```powershell
npx remotion still t18-s1-1-paket out/cek.png     # id BERPREFIKS, lalu LIHAT
npm run tumpang -- tcp-ip --short s1-alamat       # yang saling menutupi
npm run jahit   -- tcp-ip --short s1-alamat       # potongan antar-scene
```

`<Panggung rasio="9x16" debug>` menggambar batas `.scene-content` di Studio.
**Itu batas bawah kepatuhan, bukan bukti:** ia tidak menggambar rail kanan
(§4), dan ia tidak tahu apa-apa soal figur SVG yang menembusnya.

**Belum ada penjaga otomatis untuk kotak aman.** `tumpang` menemukan benda yang
saling menutupi, bukan benda yang keluar kotak; `check` cuma membuktikan
frame-nya ada isinya. Sampai ada `periksa-aman.mjs`, yang menegakkan aturan ini
adalah still + mata + daftar di bawah.

### Daftar periksa per scene

- [ ] Semua teks — termasuk `<text>` di dalam figur — di dalam `x 90–920`, `y 240–1480`?
- [ ] Isi yang dipusatkan di `x 540` lebarnya ≤ 760px? (§2)
- [ ] Baseline sudah dihitung jadi tepi glif? (§4)
- [ ] Tidak ada label, angka, atau ikon bermakna di kanan `x 920`?
- [ ] Tidak ada yang penting di bawah `y 1480`?
- [ ] Ujung panah berakhir di dalam kotak?
- [ ] Posisi **akhir** animasi masih di dalam kotak? (§9)
- [ ] Scene masih dimengerti kalau seluruh zona terlarang dihitamkan?
- [ ] Tidak ada bentuk yang menyerupai tombol platform?

Uji terakhir itu yang paling cepat: **tutup kanan dan bawahnya dengan tangan,
lalu tonton.** Kalau masih jelas, scene-nya lulus.

## 12. Kalau tidak muat — urutan koreksi

1. **Geser** ke arah tengah.
2. **Kecilkan**, selama masih terbaca di layar HP.
3. **Sederhanakan** — buang yang tidak dibutuhkan beat itu.
4. **Tata ulang** komposisi scene-nya.
5. **Pecah jadi dua scene.**

Langkah 5 tidak gratis: memecah scene menyeret **HARD RULE 5** — tabel scene di
`naskah.md`, `npm run gen`, ganti nama tiga berkas untuk setiap scene sesudahnya,
perbarui `index.ts`, lalu `npm run sisa` sampai bersih. Karena itu ia langkah
terakhir. Karena itu juga ia **tetap harus diambil** kalau empat langkah pertama
gagal: mempertahankan komposisi asli bukan alasan yang sah untuk melanggar kotak
aman.

## 13. Pelanggaran yang disengaja

Ada scene yang memang benar melanggar — benda yang **maksudnya** keluar frame,
misalnya. Tulis alasannya satu baris di berkas direction scene itu:

```
aman: menembus bawah — jalur sengaja keluar frame; tidak ada label di ujungnya
```

Bentuknya sama dengan `data-tumpang="sengaja"` dan `jahitan: menganga` di
[CLAUDE.md](../CLAUDE.md), dan alasannya juga sama: tanpa catatan itu, sesi
berikutnya akan "memperbaiki"-nya — atau lebih buruk, membacanya sebagai izin.

## 14. Utang yang sudah diketahui

Dicatat di sini supaya tidak ditemukan ulang tiap sesi. Belum satu pun
diperbaiki.

- **`--safe-x` simetris 90px.** Kotak aman CSS jadi `x 90–990`, 70px masuk rail
  tombol. Perbaikannya `--safe-right: 160px` di `.r-9x16` plus penanda rail di
  mode `debug`; sampai itu ada, sisi kanan ditegakkan dengan tangan.
- **`Tujuan` di `panggung-short.tsx`** baku `y=1680` dan dipakai di `y 1700`–`1740`
  oleh lima scene S1 & S2. Kotaknya jatuh di `y 1570–1870` — seluruhnya di zona
  bawah, termasuk lampu hijau "sampai" yang jadi payoff Short 1.
- **`TeksLayar` baku `y=250`** (baseline) → tepi glifnya ±`205`, sedikit di atas
  batas 240. Kecil, tapi ia contoh persis dari jebakan baseline di §4.
- **`Y_BAWAH = 1520`** — ujung jalur 40px di bawah kotak. Ini kelas "boleh"
  (garis tanpa label, maknanya keluar), dicatat supaya tidak dibaca sebagai izin
  untuk benda berlabel.

## 15. Yang tidak diatur di sini

Kover Short (`thumb-s1.tsx`, 2160 × 3840) punya zona tumpangnya sendiri dan
bukan urusan dokumen ini → [docs/06](../docs/06-publishing.md#thumbnail).

## Versi

**v1.1 — disesuaikan dengan repo ini.** Diperbarui saat: YouTube mengubah
antarmuka Shorts, elemen UI baru muncul, resolusi produksi berubah, `.r-9x16`
berubah, atau salah satu utang di §14 dilunasi.

Batas pikselnya **konservatif dan belum diukur ulang** terhadap antarmuka Shorts
terkini. Sebelum dipatok permanen ke dalam alat, ukur ulang dengan satu Short
yang sudah tayang.
