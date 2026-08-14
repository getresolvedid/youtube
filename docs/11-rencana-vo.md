# 11 · Rencana VO per scene

**Teks VO hidup di `ideas/<slug>/scenes/<kunci>-vo.md`, bukan di `naskah.md`.**
Satu berkas per scene, nama identik dengan komposisi dan direction-nya
(HARD RULE 4 di [CLAUDE.md](../CLAUDE.md)):

```
ideas/apa-itu-ram/scenes/01-hook-question-vo.md          apa yang DIKATAKAN
ideas/apa-itu-ram/scenes/01-hook-question-direction.md   apa yang TERJADI di layar
ideas/apa-itu-ram/scenes/01-hook-question.tsx            turunan keduanya
```

`naskah.md` tetap sumber kebenaran **topik** — penjelasan 5 tahun, tangga
abstraksi, kamus istilah, sumber angka, daftar scene ([docs/05](05-template-naskah.md)).
Yang pindah ke sini hanya kalimat yang dibaca ElevenLabs.

## Kenapa dipisah

Sebelum ini satu scene = satu sel tabel di naskah. Sel tabel tidak punya tempat
untuk mencatat **kenapa** kalimatnya begitu — kenapa "disalin" bukan "dipindah",
kenapa "ram" ditulis huruf kecil, kenapa satu kalimat sengaja dipotong dua baris
supaya animasinya punya waktu. Keputusan-keputusan itu mahal kalau hilang:

- Pengucapan yang salah = **generate ulang berbayar**. Alasannya harus menempel
  di sebelah kalimatnya, bukan di riwayat chat.
- Satu kata berubah = **seluruh timing scene bergeser**, karena durasi dihitung
  dari jumlah kata.
- Scene dibaca sendiri-sendiri saat digarap. Kalau VO-nya ada di berkas lain,
  yang dibuka adalah berkas lain — dan yang tidak dibuka tidak dibaca.

## Format

````markdown
# <kunci> · rencana VO

<Satu-dua paragraf: scene ini tugasnya apa di flow, dan apa yang harus berubah
di kepala penonton setelah menontonnya.>

## VO

Bayangkan kamu baru saja membuka sebuah aplikasi.
Isinya muncul di layar, satu per satu.
Kelihatannya sepele.
Tapi isi itu tadi diambil dari mana, dan sekarang dikerjakan di mana?

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Kursor bergerak, menekan pintasan, jendela tumbuh dari titik yang diklik. |
| 1 | Isi halaman terisi baris demi baris. |

## Catatan

- <kenapa kata ini, bukan kata itu>
- <jebakan pengucapan TTS di scene ini>
````

**Hanya blok `## VO` yang dibaca mesin.** Sisanya untuk manusia dan tidak pernah
ikut dihitung — supaya menambah catatan tidak diam-diam memperpanjang scene.

### Satu baris = satu beat

`tools/baca-episode.mjs` memecah blok `## VO` per baris dan menghitung detik tiap
baris dari jumlah katanya:

```
durasi_beat  = kata / VO_WORDS_PER_MINUTE * 60
durasi_scene = jumlah durasi_beat + VO_PAD_SECONDS
```

Yang dikirim ke ElevenLabs tetap **satu berkas audio per scene** — baris di sini
bukan potongan TTS, melainkan titik sinkron untuk animasi.

Komposisi memanggilnya dari `timing.gen.ts`, tidak pernah mengetik detiknya:

```tsx
import { beat } from "../timing.gen";

const T_GANTI = beat("hook-question", 3); // detik baris ke-4 mulai diucapkan
```

**Jangan pernah menulis detik di berkas rencana VO.** Begitu satu kalimat diubah,
semua beat sesudahnya bergeser sendiri; angka yang diketik tangan tidak ikut
bergeser dan diam-diam jadi bohong.

**Memotong kalimat jadi dua baris itu sah** — dan sering benar. Contoh dari
`04-ram-analogy-vo.md`:

```
Dari lemari arsip di gudang,
ke meja kerja yang jauh lebih dekat.
```

Perjalanan berkas dari lemari ke meja makan waktu lebih lama daripada satu
tarikan napas. Kalau kalimatnya utuh satu baris, keberangkatan dan pendaratan
jatuh di beat yang sama, dan animasinya harus menebak sendiri kapan bergerak.

## Cara membuka scene — HARD RULE 6

**Undangan dulu, nama belakangan.** Aturan lengkapnya di
[CLAUDE.md § HARD RULE 6](../CLAUDE.md); yang di bawah ini cara memakainya
sehari-hari saat menulis berkas `-vo.md`.

### Tiga pertanyaan sebelum menulis baris pertama

1. **Gambaran scene ini baru atau lanjutan?** Baru → baris pertama wajib
   mengundang. Lanjutan → jangan mengundang, langsung teruskan.
2. **Ada nama benda di baris pertama?** Kalau ya, cek: bendanya sudah berdiri
   dan sudah dipakai di layar sebelum baris ini? Kalau belum, ganti dengan kata
   sehari-hari dan tunda namanya.
3. **Ada kata dari daftar larangan L1?** *data, proses, memori, server, request,
   thread, buffer, node, query* — dan akronim apa pun
   ([docs/09 § Kosakata L1](09-tangga-abstraksi.md)). Ganti sebelum ditulis,
   bukan sesudah.

### Bentuk undangan

Variasikan; frasa yang sama berulang berhenti terdengar sebagai undangan.

| Bentuk | Contoh | Cocok untuk |
|---|---|---|
| Ajakan langsung | "Bayangkan sebuah gudang…" | memperkenalkan tempat/benda baru |
| Ajakan berjarak | "Coba bayangkan kalau…" | kondisi yang tidak dialami penonton |
| Andaian | "Anggap saja isinya cuma dua." | menyederhanakan sesuatu yang rumit |
| Penonton sebagai pelaku | "Kamu baru saja membuka…" | adegan sehari-hari yang memang ia alami |
| Arahan pandang | "Sekarang lihat permukaannya lebih dekat." | zoom ke bagian dari gambaran yang **sudah** berdiri |

Baris terakhir itu **bukan** undangan baru — ia perpindahan di dalam gambaran
yang sama, dan memang begitu seharusnya scene lanjutan dibuka.

### Yang salah, dan kenapa

```
Ram adalah tempat penyimpanan sementara.        <- nama mendahului gambaran
Prosesor mengambil data dari memori utama.      <- tiga istilah, nol gambar
Di scene ini kita akan membahas ukuran ram.     <- menyebut scene, dan menunda
Bayangkan sebuah meja. Bayangkan lemari arsip.  <- dua undangan, satu scene
```

Yang keempat paling halus: dua ajakan membayangkan di satu scene berarti dua
gambaran yang harus disambung penonton sendiri — dilarang oleh
[docs/09 aturan 4](09-tangga-abstraksi.md) (satu analogi per topik), dan tetap
salah walaupun keduanya diawali "Bayangkan".

### Undangan itu satu baris sendiri

Undangan dan adegannya **tidak** digabung jadi satu baris. Satu baris = satu
beat, dan undangan butuh beat-nya sendiri: di layar, itulah detik panggungnya
berdiri sebelum ada yang bergerak di atasnya.

```
Bayangkan sebuah gudang, penuh lemari arsip.    <- beat 0: lemarinya masuk
Ribuan berkas tersimpan rapi di dalam lacinya.  <- beat 1: lacinya terisi
```

Digabung jadi satu baris, lemari masuk dan lacinya terisi jatuh di beat yang
sama — dan penonton belum sempat melihat lemarinya waktu isinya sudah dibahas.

### Catat keputusannya

Kalau sebuah scene sengaja **tidak** mengundang, tulis alasannya di
`## Catatan`, satu baris. Tanpa itu, orang berikutnya (termasuk Claude di sesi
berikutnya) akan membacanya sebagai aturan yang kelewat dan "memperbaikinya" —
lalu gambaran yang tadinya nyambung jadi terpotong dua.

```markdown
- Tidak ada undangan di sini: gambarannya sama dengan scene sebelumnya
  (gudang + prosesor + siluet meja), scene ini cuma mengisi lubangnya.
```

## Sambungan antar-scene — HARD RULE 7

Aturan lengkapnya di [CLAUDE.md § HARD RULE 7](../CLAUDE.md). Yang di bawah ini
cara memakainya saat menulis berkas `-vo.md`.

**Sambungannya cuma dua baris**, dan keduanya ada di berkas yang berbeda:

```
scenes/04-ram-analogy-vo.md    baris TERAKHIR di blok ## VO
scenes/05-kenapa-cepat-vo.md   baris PERTAMA di blok ## VO
```

Itu sebabnya jenis kesalahan ini tidak pernah terlihat dari dalam satu berkas.
Scene digarap satu-satu; sambungannya milik dua berkas sekaligus, jadi ia milik
**tidak seorang pun** kalau tidak sengaja diperiksa.

### Tiga bentuk jembatan yang bekerja

| Bentuk | Baris terakhir scene N | Baris pertama scene N+1 |
|---|---|---|
| **Celah → tutup** | "Selama dijemput, prosesor cuma menunggu." | "Jadi berkasnya disalin dulu." |
| **Belum selesai** | "Ya, meja kerja itu ram." | "Dekatnya memang membantu. Tapi bukan cuma itu." |
| **Mundur sejenak** | "Jadi batang baru tidak masuk ke slot lama." | "Sekarang mundur sedikit, lihat mejanya utuh lagi." |

Ketiganya punya satu ciri sama: **baris pertama scene N+1 tidak bisa dibaca
sendirian.** "Tapi bukan cuma itu" — bukan cuma *apa*? Kalimat yang menuntut
kalimat sebelumnya adalah kalimat yang menyambung.

Uji cepatnya begitu: **tutup scene sebelumnya, baca baris pertamanya.** Kalau
masih masuk akal utuh, ia bukan jembatan — ia pembukaan bab baru.

### Yang bocor, dan seperti apa rasanya

Sambungan yang lompat tidak pernah terasa salah, ia cuma terasa **tiba-tiba**:

```
… berkas yang sama dipakai lagi ribuan kali.            <- scene 5 tutup rapat
Pernah sadar ukuran ram selalu delapan, enam belas?     <- scene 6 mulai dari nol
```

Tidak ada yang keliru di kedua kalimat itu. Yang hilang adalah alasan kenapa
yang kedua datang sesudah yang pertama — dan penonton yang tidak tahu kenapa
sebuah bagian dimulai akan menilainya sebagai bagian yang boleh dilewati.
Perbaikannya hampir selalu di **baris terakhir scene N**, bukan di scene
barunya: gantung sesuatu di sana.

### Jangan dijembatani dengan kalimat tentang videonya

```
Nah, sekarang kita bahas ukuran ram.      Oke, lanjut ke bagian berikutnya.
Sebelum itu, mari kita lihat dulu…        Di scene ini kita akan…
```

Semuanya sudah dilarang di [§ Aturan menulis VO](#aturan-menulis-vo-untuk-elevenlabs)
(menyebut nomor scene / instruksi visual), tapi bentuk halusnya lolos terus:
kalimat yang mengumumkan perpindahan **adalah** perpindahan yang tidak
dijembatani, cuma diberi label.

### Kapan sambungan ditulis

Bukan setelah semua scene jadi. Saat menulis `-vo.md` scene baru, **buka berkas
VO tetangganya** — kedua-duanya — dan baca baris yang bersentuhan. Scene yang
disisipi di tengah (HARD RULE 5) punya **dua** sambungan baru sekaligus, dan
yang paling sering terlupa adalah sambungan ke scene *sesudahnya*: baris
pertamanya dulu menyambung ke scene lain, dan sekarang tidak lagi.

### Melihat semuanya sekaligus

```powershell
npm run sisa
```

mencetak tiap sambungan berpasangan, urut tayang:

```
Sambungan antar-scene — HARD RULE 7 (jembatan, bukan pengumuman):
  04-ram-analogy -> 05-kenapa-cepat
    …"Ya, meja kerja itu ram."
     "Dekatnya memang membantu. Tapi bukan cuma itu."…
```

Ia **tidak** menilai dan tidak pernah gagal karenanya — sama seperti daftar
baris pembuka HARD RULE 6. Yang menilai tetap manusia yang membacanya berurutan.

Sambungan yang sengaja dibiarkan menganga (potongan kejut, pergantian babak
yang memang harus terasa) ditulis alasannya di `## Catatan`:

```markdown
- Sambungan dari `05-kenapa-cepat` sengaja tidak dijembatani: di sini babak
  berganti dan jeda itu yang bikin pertanyaannya terasa baru.
```

## Subtitel preview — sampai VO-nya jadi

VO dibuat paling akhir dan sekali jalan (docs/04 §5), jadi sepanjang komposisi
dibangun episode ditonton **bisu**. Menonton bisu berarti menilai timing tanpa
tahu kalimat mana yang sedang berjalan: scene terasa kepanjangan padahal
kalimatnya memang panjang, gerakan terasa telat padahal ia jatuh di kata yang
benar. Karena itu **selama berkas VO sebuah scene belum ada, teks VO-nya tampil
di layar sebagai subtitel** — baris demi baris, mengikuti beat dari blok `## VO`.

**Pergantiannya otomatis, per scene, dan bukan saklar.** Yang menentukan
preview atau final adalah ada tidaknya berkas VO scene itu:

```
public/vo/<slug>/L-<kunci>.mp3   belum ada  ->  subtitel preview, tanpa audio
                                 ada        ->  <Audio> bicara, subtitel hilang
```

`npm run gen` yang mendeteksinya dan menulisnya ke `timing.gen.ts` sebagai
`voAudio`; `shared/Vo.tsx` (`<TrekVO>`) yang memasangnya. Scene yang VO-nya
sudah jadi langsung final walaupun tetangganya masih bersubtitel — jadi VO bisa
dibuat bertahap, dan tidak ada satu pun nilai yang harus diingat untuk
dikembalikan sebelum render. Itu memang inti masalahnya: saklar yang harus
dimatikan tangan pada akhirnya ikut terbawa ke MP4.

Subtitelnya sengaja **tidak** terlihat seperti bagian dari video — ada label
`subtitel preview · 3/4` di atasnya, berbingkai putus-putus oranye. Channel ini
tidak memakai subtitel bakar; subtitel penonton diunggah terpisah sebagai berkas
([docs/06](06-publishing.md)).

**Memaksa lewat `SUBTITLE_MODE` di `.env`** — hanya untuk memeriksa, bukan untuk
produksi:

| Nilai | Yang terjadi |
|---|---|
| `auto` (baku) | Subtitel hanya di scene yang belum punya berkas VO |
| `off` | Tidak pernah tampil — melihat frame apa adanya |
| `on` | Tetap tampil walau VO-nya sudah ada — mencocokkan suara dengan teks |

```powershell
$env:SUBTITLE_MODE="off"; npm run studio    # sesi ini saja, .env tidak berubah
```

Untuk satu perintah saja, tanpa menyentuh `.env` sama sekali:

```powershell
npx remotion still 01-hook-question out/hook.png --props '{\"subtitel\":false}'
```

`npm run sisa` menyebut berapa scene yang masih bersubtitel dan **melarang
render MP4 final** selama masih ada — sama seperti placeholder. Ia juga protes
kalau ada berkas VO yang tidak cocok dengan kunci mana pun; itu tanda scene-nya
dinomori ulang setelah VO dibuat (HARD RULE 5), dan scene itu diam-diam kembali
bisu. Ganti nama berkas VO-nya, **jangan generate ulang** — itu berbayar.

## Aturan menulis VO untuk ElevenLabs

Naskah yang bagus dibaca ≠ naskah yang bagus disintesis. Aturan berikut khusus
supaya keluaran ElevenLabs terdengar wajar dan pengucapannya benar **pada
percobaan pertama** — setiap kesalahan di sini berarti generate ulang berbayar.

**Struktur kalimat**

- Maksimal **18 kata per kalimat**. Kalimat panjang bikin intonasi TTS melantur.
- Satu rencana VO = satu scene = satu berkas audio. Jangan menggabung dua ide.
- Hindari anak kalimat bertingkat ("yang mana, ketika, sehingga…"). Pecah jadi
  dua kalimat.
- Akhiri kalimat dengan titik. Tanda seru dipakai hemat — TTS menaikkan energi
  cukup banyak untuk itu.

**Jeda dan ritme**

- Koma menghasilkan jeda pendek; titik jeda sedang. Manfaatkan itu, jangan
  mengandalkan tag khusus.
- Jeda dramatis sebelum kalimat kunci diatur di **timing scene**
  (`VO_PAD_SECONDS`), bukan di dalam teks VO.

**Angka dan istilah** — ini penyebab generate ulang nomor satu

- Tulis angka sesuai cara baca: `"seratus milidetik"`, bukan `"100 ms"`.
  Kecuali angka besar yang memang dibaca sebagai angka: `"dua ribu dua puluh enam"`.
- **Akronim dan istilah asing tidak lagi ditulis fonetik di blok `## VO`.**
  Tulis ejaan normalnya — `SSD`, `DDR4`, `cache` — dan daftarkan pengucapannya
  di § Kamus pengucapan. Mekanismenya di bawah.

## Kamus pengucapan

Dulu perbaikan pengucapan ditulis langsung ke blok `## VO`: `cache` diketik
`kesh`, `SSD` diketik `S S D`. Itu berhasil untuk ElevenLabs dan **merusak
empat pembaca lain** — blok `## VO` juga sumber subtitel preview, sumber
hitungan kata untuk timing, yang dicetak `npm run sisa` saat kamu menilai
sambungan, dan nanti sumber berkas subtitel penonton. Salah eja yang disengaja
untuk menyenangkan satu pembaca dibayar oleh empat lainnya.

Sekarang pemetaannya hidup di luar naskah, di **kamus pengucapan ElevenLabs**.

**Sumbernya tabel `## Kamus pengucapan` di `naskah.md`**, dan arahnya kiri ke
kanan — naskah menulis ejaan normal, alias yang dikirim ke TTS:

| Tulis di VO | Alias ke TTS | Kenapa |
|---|---|---|
| cache | kesh | TTS cenderung membaca "kaks" |
| SSD | S S D | dieja per huruf |
| DDR4 | D D R empat | dieja per huruf, angkanya jadi kata |

Kamusnya berdiri di akun ElevenLabs dan `id` + `version`-nya disimpan di
frontmatter naskah, **satu kamus per topik**:

```yaml
kamus:
  id: XIVGhYQEqXXJmNBpHY7Z
  version: lxPnmq4DGvjvzzXPd8Aj
```

Endpoint-nya, semuanya `POST` ke `https://api.elevenlabs.io/v1/pronunciation-dictionaries`:

| Operasi | Jalur | Hasil |
|---|---|---|
| Buat | `…/add-from-rules` | `{id, version_id}` |
| Tambah aturan | `…/{id}/add-rules` | versi baru |
| Hapus aturan | `…/{id}/remove-rules` | versi baru |

lalu dipakai lewat `pronunciation_dictionary_locators` (maks 3) di panggilan
text-to-speech.

**Hanya aturan `alias` yang dipakai.** Aturan `phoneme` cuma didukung
`eleven_flash_v2` — model yang dilarang untuk produksi di `.env`. Untuk
`eleven_multilingual_v2` kendali pengucapan berarti substitusi kata, bukan
fonetik.

**`version` disematkan, tidak dibiarkan mengikuti yang terbaru.** Locator boleh
mengabaikannya, tapi versi kamus adalah riwayat, bukan alamat isi: menghapus
aturan yang baru ditambahkan menghasilkan versi **ketiga**, bukan kembali ke
yang pertama. Tanpa disematkan, tidak akan pernah bisa dibuktikan versi mana
yang menghasilkan audio yang ada. Konsekuensinya mengikat — **tabel berubah
berarti dua tempat naik**, kamus di server dan baris `version` di sini.

**Yang tidak boleh masuk kamus: pilihan kata.** `CPU → prosesor` adalah aturan
penulisan ([docs/09](09-tangga-abstraksi.md)), bukan pengucapan. Kalau ia jadi
aturan alias, ElevenLabs menutupi pelanggaran kosakata L1 alih-alih
membiarkannya ketahuan, dan naskah yang salah lolos karena terdengar benar.
Taruh di tabel `## Pilihan kata` yang terpisah.

**Topik yang sudah beku tidak dibersihkan.** Naskah T01 masih menulis `S S D`
karena VO-nya sudah dibayar; kamusnya inert terhadap teks itu dan baru aktif
saat digenerate ulang. Membersihkan teks tanpa generate ulang memisahkan naskah
dari audio yang sudah ada — dan tidak ada yang akan memberitahumu.

**Yang dihindari di blok `## VO`**

- Tanda kurung — TTS sering membacanya sebagai jeda aneh. Jadikan kalimat terpisah.
- Simbol mentah: `→`, `&`, `%`, `/`. Tulis: "menjadi", "dan", "persen", "atau".
- Emoji dan markdown (`**tebal**`) di dalam teks VO.
- Menyebut nomor scene, timecode, atau instruksi visual.

**Audio tag** (hanya `eleven_v3`): `[excited]`, `[whispers]`, dan sejenisnya.
Jangan dipakai di `eleven_multilingual_v2` — tag akan ikut dibaca sebagai teks.

## Audit naskah VO — dua lapis

Memeriksa naskah VO terbelah tajam, dan belahannya **bukan soal keparahan
melainkan soal siapa yang bisa memutuskan**.

```powershell
npm run vo-script-audit                              # kedua topik
node --env-file=.env tools/vo-script-audit.mjs <slug>
```

| Tingkat | Isi | Perilaku |
|---|---|---|
| **A · pasti salah** | audio tag di model yang tidak mendukungnya · simbol mentah · tanda kurung · angka digit · akronim tanpa aturan kamus · `<break>` mentah atau > 3 dtk | **exit 1** |
| **B · perlu dibaca** | ritme datar · dua kalimat dalam satu beat · kalimat > 18 kata · tanya tanpa `?` | dicetak saja |

**Tingkat B tidak pernah menggagalkan**, dan itu disengaja. Baris pembuka
`05-kenapa-cepat` — "Dekatnya memang membantu. Tapi bukan cuma itu." — ditandai
sebagai dua kalimat dalam satu beat, padahal ia justru jembatan HARD RULE 7
terbaik di episode itu. Aturan yang menggagalkan build karena naskahnya bagus
akan dimatikan orang dalam seminggu, dan tingkat A ikut mati bersamanya.

**Ritme diukur dengan cakupan berbeda.** Scene video panjang punya 4–9 baris,
jadi ritmenya hidup **di dalam** scene. Scene Short cuma 1–2 baris — menghitung
sebarannya di situ menyalakan bendera palsu di hampir semua scene. Ritme Short
diukur **melintasi** scene, satu angka per Short.

**Pemeriksaan akronim baru punya arti setelah kamus ada.** Selama istilah ditulis
fonetik dengan tangan (`S S D`), tidak ada yang tersisa untuk ditangkap. Dengan
kamus, invariannya tajam: **akronim boleh ada jika dan hanya jika ada aturan yang
mencakupnya.**

### Dua skill di atasnya

| | |
|---|---|
| `/vo-script-audit` | jalankan lapis mekanis, lalu **nilai** yang tidak bisa dinilai mesin — undangan, penamaan, kosakata L1, sambungan, VO vs direction. Tidak pernah menyunting. |
| `/vo-script-refactor` | audit lalu **perbaiki**. Dua gerbang: naskah yang sudah beku, dan indeks beat yang bergeser. |

**Gerbang indeks beat** yang paling mudah dilanggar. Komposisi memanggil
`beat(ID, 4)` dengan nomor, jadi **memecah satu baris menggeser semua indeks
sesudahnya** — dan `.tsx` yang menunjuk indeks lama diam-diam menunjuk kalimat
yang berbeda. Tanpa error, tanpa `tsc` gagal. Penyakit yang sama dengan
HARD RULE 5, tapi di dalam scene dan tanpa nama berkas yang membuatnya
kelihatan. Karena itu memecah baris **wajib** disertai remap di `.tsx`, di
suntingan yang sama.

## Siapa menulis, siapa merevisi

**Claude yang menulis, user merevisi lewat chat** — sama seperti direction
(HARD RULE 3). Koreksi dari chat **ditulis balik ke berkasnya** oleh Claude;
rencana VO yang cuma hidup di riwayat chat sama saja dengan tidak ada.

Kalau berkas dan chat berbeda, **berkasnya yang salah** dan harus diperbarui.

## Scene yang belum punya rencana VO

Tidak menghentikan build. Durasinya sementara memakai `VO_PLACEHOLDER_SECONDS`
supaya episode tetap bisa di-scrub, dan `npm run sisa` menyebutnya satu per satu:

```
2 sumber scene belum lengkap:
  5-ram-forgets-vo.md — belum ada
  5-ram-forgets-direction.md — belum ada
```

Tapi **komposisinya belum boleh dibangun** selama blok `## VO`-nya kosong —
`.tsx` adalah turunan rencana VO + direction, bukan tebakan yang mendahului
keduanya. Dan **jangan render MP4 final** selama masih ada yang kosong: totalnya
bukan durasi yang sebenarnya.

## Opening & closing

Keduanya tidak bicara ([docs/10](10-scene-standar.md)), jadi **tidak punya
rencana VO**. Durasinya dari `OPENING_SECONDS` dan `CLOSING_LONG_SECONDS` di
`.env`. Direction tetap ada — justru keduanya yang paling perlu, karena
koreografinya dipakai semua episode.

## Setelah VO jadi

Taruh berkasnya di `public/vo/<slug>/L-<kunci>.mp3`, lalu `npm run gen`. Scene
itu langsung bersuara dan subtitel preview-nya hilang; tidak ada berkas komposisi
yang perlu disunting untuk itu.

Durasi asli dari `tools/vo-durations.mjs` menggantikan perkiraan
([docs/04 §7](04-pipeline-produksi.md#7-re-timing-dengan-durasi-asli--render-final)).
Sampai langkah itu dikerjakan, durasi scene masih perkiraan dari jumlah kata —
kalau VO aslinya lebih panjang, ekornya terpotong saat scene berganti. Dengarkan,
jangan hanya lihat.
Kalau ada kata yang berbeda dari yang dibaca — seharusnya tidak ada, naskah sudah
beku — perbaiki **blok `## VO`**, lalu `npm run gen`. Jangan pernah menambal
`timing.gen.ts`.
