# 11 · Rencana VO per scene

**Teks VO hidup di `ideas/<slug>/scenes/<kunci>-vo.md`, bukan di `naskah.md`.**
Satu berkas per scene, nama identik dengan komposisi dan direction-nya
(HARD RULE 4 di [CLAUDE.md](../CLAUDE.md)):

```
ideas/apa-itu-firewall/scenes/05-dikunci-semua-vo.md          apa yang DIKATAKAN
ideas/apa-itu-firewall/scenes/05-dikunci-semua-direction.md   apa yang TERJADI di layar
ideas/apa-itu-firewall/scenes/05-dikunci-semua.tsx            turunan keduanya
```

`naskah.md` tetap sumber kebenaran **topik** — penjelasan 5 tahun, tangga
abstraksi, kamus istilah, sumber angka, daftar scene ([docs/05](05-template-naskah.md)).
Yang pindah ke sini hanya kalimat yang dibaca mesin TTS.

## Kenapa dipisah

Sebelum ini satu scene = satu sel tabel di naskah. Sel tabel tidak punya tempat
untuk mencatat **kenapa** kalimatnya begitu — kenapa "ditanyakan" bukan
"dicari", kenapa "D N S" dieja bukan dibaca "dins", kenapa satu kalimat sengaja
dipotong dua baris supaya animasinya punya waktu. Keputusan-keputusan itu mahal kalau hilang:

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

Yang dikirim ke TTS tetap **satu berkas audio per scene** — baris di sini
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
`06-tangga-vo.md`:

```
Dari loket di dekat rumahmu,
naik ke loket yang tahu siapa yang menyimpan namanya.
```

Perjalanan pertanyaan dari loket satu ke loket berikutnya makan waktu lebih lama
daripada satu tarikan napas. Kalau kalimatnya utuh satu baris, keberangkatan dan pendaratan
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
D N S adalah sistem penerjemah nama.            <- nama mendahului gambaran
Resolver mengirim query ke root server.         <- tiga istilah, nol gambar
Di scene ini kita akan membahas umur catatan.   <- menyebut scene, dan menunda
Bayangkan sebuah loket. Bayangkan buku telepon. <- dua undangan, satu scene
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
scenes/05-loket-vo.md     baris TERAKHIR di blok ## VO
scenes/06-tangga-vo.md    baris PERTAMA di blok ## VO
```

Itu sebabnya jenis kesalahan ini tidak pernah terlihat dari dalam satu berkas.
Scene digarap satu-satu; sambungannya milik dua berkas sekaligus, jadi ia milik
**tidak seorang pun** kalau tidak sengaja diperiksa.

### Tiga bentuk jembatan yang bekerja

| Bentuk | Baris terakhir scene N | Baris pertama scene N+1 |
|---|---|---|
| **Celah → tutup** | "Selama namanya belum ketemu, halamanmu cuma putih." | "Jadi yang ditanyakan duluan bukan halamannya." |
| **Belum selesai** | "Ya, loket itu D N S." | "Dekatnya memang membantu. Tapi bukan cuma itu." |
| **Mundur sejenak** | "Jadi catatan lama tidak ikut berubah." | "Sekarang mundur sedikit, lihat loketnya utuh lagi." |

Ketiganya punya satu ciri sama: **baris pertama scene N+1 tidak bisa dibaca
sendirian.** "Tapi bukan cuma itu" — bukan cuma *apa*? Kalimat yang menuntut
kalimat sebelumnya adalah kalimat yang menyambung.

Uji cepatnya begitu: **tutup scene sebelumnya, baca baris pertamanya.** Kalau
masih masuk akal utuh, ia bukan jembatan — ia pembukaan bab baru.

### Yang bocor, dan seperti apa rasanya

Sambungan yang lompat tidak pernah terasa salah, ia cuma terasa **tiba-tiba**:

```
… nama yang sama ditanyakan lagi ribuan kali.           <- scene 7 tutup rapat
Pernah sadar catatan itu punya tanggal kedaluwarsa?     <- scene 8 mulai dari nol
```

Tidak ada yang keliru di kedua kalimat itu. Yang hilang adalah alasan kenapa
yang kedua datang sesudah yang pertama — dan penonton yang tidak tahu kenapa
sebuah bagian dimulai akan menilainya sebagai bagian yang boleh dilewati.
Perbaikannya hampir selalu di **baris terakhir scene N**, bukan di scene
barunya: gantung sesuatu di sana.

### Jangan dijembatani dengan kalimat tentang videonya

```
Nah, sekarang kita bahas umur catatan.    Oke, lanjut ke bagian berikutnya.
Sebelum itu, mari kita lihat dulu…        Di scene ini kita akan…
```

Semuanya sudah dilarang di [§ Aturan menulis VO](#aturan-menulis-vo-untuk-tts)
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
  05-loket -> 06-tangga
    …"Ya, loket itu D N S."
     "Dekatnya memang membantu. Tapi bukan cuma itu."…
```

Ia **tidak** menilai dan tidak pernah gagal karenanya — sama seperti daftar
baris pembuka HARD RULE 6. Yang menilai tetap manusia yang membacanya berurutan.

Sambungan yang sengaja dibiarkan menganga (potongan kejut, pergantian babak
yang memang harus terasa) ditulis alasannya di `## Catatan`:

```markdown
- Sambungan dari `06-tangga` sengaja tidak dijembatani: di sini babak
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

## Aturan menulis VO untuk TTS

Naskah yang bagus dibaca ≠ naskah yang bagus disintesis. Aturan berikut khusus
supaya keluaran TTS terdengar wajar dan pengucapannya benar **pada
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

**Gemini tidak punya kamus pengucapan.** ElevenLabs punya
(`pronunciation_dictionary_locators`, aturan alias per topik); Gemini tidak,
dan tidak ada padanannya. Doktrin lamanya mati bersama mesinnya.

Yang TIDAK mati adalah tabelnya. `## Kamus pengucapan` di `naskah.md` tetap ada,
dengan tugas yang berbeda: **daftar istilah yang pengucapannya wajib diperiksa
dengan telinga.**

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| D N S | DNS | dieja per huruf; ditulis utuh "DNS" berisiko dibaca "dens" |
| cache | cache | dengarkan — tidak ada yang menjaminnya |

Dua alasan tabel itu tetap berdiri:

1. **`npm run vo-script-audit` memakainya.** Invariannya masih tajam dan tidak
   bergantung mesin: **akronim boleh ada di blok `## VO` jika dan hanya jika ada
   barisnya di tabel ini.** Itu memaksa tiap akronim jadi keputusan sadar, bukan
   sesuatu yang menyelinap masuk.
2. **Ia daftar periksa saat mendengarkan.** Setelah VO jadi, istilah di tabel
   inilah yang didengarkan satu per satu — sisanya boleh dipercaya.

**Kendali yang tersisa cuma dua**, dan keduanya lemah:

- `accent` dan `style` di `ideas/<slug>/vo-gemini-profile.yaml` — permintaan,
  bukan jaminan (§ Profil VO Gemini).
- **Ejaan di blok `## VO` itu sendiri.** Ini yang berhasil di T14: naskahnya
  menulis `D N S` terpisah, dan Gemini membacanya benar.

Poin kedua menghidupkan lagi ketegangan yang dulu diselesaikan kamus: blok
`## VO` punya empat pembaca, dan mengeja `D N S` untuk menyenangkan TTS
dibayar oleh subtitel yang ikut menulis `D N S`. Bedanya sekarang tidak ada
pilihan ketiga. **Jadi ejaan fonetik di blok `## VO` sah, tapi hanya untuk
istilah yang ada di tabel** — dan itu batas yang menjaganya tidak menyebar.

**Yang tidak boleh masuk tabel: pilihan kata.** `CPU → prosesor` adalah aturan
penulisan ([docs/09](09-tangga-abstraksi.md)), bukan pengucapan. Taruh di tabel
`## Pilihan kata` yang terpisah.

**Apa yang benar-benar diperiksa mesin:** `tools/cocokkan-vo.mjs` membandingkan
transkripsi audio dengan naskah **per kata** — jadi kata yang hilang, bertambah,
atau berganti tertangkap. **Bunyinya tidak.** "Dens" dan "D-N-S" ditranskripsi
jadi token yang sama. Pengucapan tetap urusan telinga.

**Yang dihindari di blok `## VO`**

- Tanda kurung — TTS sering membacanya sebagai jeda aneh. Jadikan kalimat terpisah.
- Simbol mentah: `→`, `&`, `%`, `/`. Tulis: "menjadi", "dan", "persen", "atau".
- Emoji dan markdown (`**tebal**`) di dalam teks VO.
- Menyebut nomor scene, timecode, atau instruksi visual.

**Audio tag** (`[slow]`, `[long pause]`, `[whispers]`): Gemini memahaminya,
tapi **jangan pernah diketik ke blok `## VO`** — ia terhitung sebagai kata,
muncul di subtitel preview, dan mengotori daftar sambungan. Tempatnya di batas
TTS: `tools/bikin-vo-utuh.mjs` menyuntikkan `[long pause]` sebagai pemisah scene
di sana, bukan di naskah. `npm run vo-script-audit` menolaknya sebagai tingkat A.

## Profil VO Gemini — `ideas/<slug>/vo-gemini-profile.yaml`

Berlaku saat `TTS_ENGINE=gemini` di `.env`. Arahan pembacaan **per topik**, bukan
global: episode penjelasan dan Short yang hooknya harus menampar di detik nol
bukan varian dari satu setelan.

```yaml
voice: Charon
profile: narasi video edukasi, satu orang bicara ke kamera, ruangan kecil tanpa gema
style: pencerita yang menjelaskan — tenang, yakin, tidak menggurui
accent: Indonesia netral, bukan logat daerah
pace: sedang dan mantap, kalimat pendek sedikit lebih cepat
tempo: 1.10

keluaran:            # timpaan per keluaran; sisanya diwarisi
  S1:
    pace: cepat dan ringan, tanpa jeda dramatis
    tempo: 1.15
```

**Dari enam medan itu, cuma `voice` yang medan API sungguhan.**

| Medan | Jadi apa | Dijamin? |
|---|---|---|
| `voice` | `prebuiltVoiceConfig.voiceName` | ya |
| `profile` `style` `accent` `pace` | satu kalimat arahan di depan teks VO | **tidak** — permintaan |
| `tempo` | pengali `atempo` ffmpeg setelah audio jadi | ya |

**`pace` dan `tempo` tidak saling menggantikan.** `pace` mengatur *pembawaan* dan
dijawab model — empat generate teks yang sama terukur berayun **24%** dari ujung
ke ujung. `tempo` mengatur *durasi* dan berlaku setelah audionya jadi, jadi ia
pasti. Yang satu tidak bisa mengerjakan pekerjaan yang satunya: `pace` saja
membuat durasi jadi undian, `tempo` saja membuat semua kalimat dibacakan dengan
pembawaan yang sama lalu diregangkan.

**`tempo` itu pengali, bukan target wpm.** Menyetel tiap scene ke satu angka akan
meratakan yang justru tidak boleh rata — VO T14 yang sudah tayang bergerak antara
115 dan 167 wpm karena hook dibaca cepat dan kalimat penjelasan dibaca pelan
(gabungannya 137 wpm, dan `VO_WORDS_PER_MINUTE=136` meleset 1% dari itu).

Tanpa berkas profil, semuanya jatuh ke `GEMINI_TTS_*` di `.env`, dan
`GEMINI_TTS_STYLE_PROMPT` dipakai sebagai arahan **utuh**. Arahan yang berlaku
tiap keluaran dicetak `bikin-vo.mjs` di rencananya — sebelum membayar.

**Yang tidak boleh masuk berkas ini:** API key (tetap di `.env`, docs/08) dan
pengucapan fonetik (tetap di `## Kamus pengucapan`, § di atas).

## Satu Short = satu permintaan, lalu dipotong

```powershell
npm run vo:utuh -- <slug> --target S1 --coba          # rencana
npm run vo:utuh -- <slug> --target S1 --coba --jalan  # jalan, ke out/voicetest/
npm run vo:utuh -- <slug> --target S1 --jalan         # ke public/vo/
```

**Kenapa tidak satu permintaan per scene.** Gemini dipanggil per scene itu buta
terhadap tetangganya, dan terukur: teks sama, setelan sama, durasi mentahnya
berayun **31%** antar-panggilan — lebih besar daripada seluruh jangkauan aman
pengali `tempo`. Sembilan potongan Short jadi jatuh di tempo yang acak satu sama
lain. Pencerita yang berganti kecepatan tanpa sebab di tiap potongan adalah
lawan dari terdengar wajar.

Dikirim sebagai satu naskah, kesembilan scene dibaca sebagai satu pertunjukan:
**155 wpm konsisten** di seluruh Short. Sambungan HARD RULE 7 tersambung di
suaranya, bukan cuma di naskahnya.

### Batas scene: cap waktu kata, bukan senyap

Setelah audionya jadi, ia harus dipotong kembali jadi satu berkas per scene.
Menebak batas dari senyap **tidak bisa bekerja**: jeda antar-kalimat *di dalam*
scene dan jeda *antar* scene secara akustik adalah benda yang sama. Terukur di
Short T14 — jeda dalam-scene 0,52–0,65 dtk, jeda antar-scene 0,65–0,99 dtk,
tumpang tindih. Satu scene terpotong jadi 2,10 dtk untuk 11 kata (314 wpm).

Jadi batasnya tidak dicari, melainkan **dibaca**:

```powershell
npm run vo:cocok -- <slug> --target S1
```

mentranskripsi audionya dengan cap waktu per kata, menyejajarkannya dengan
urutan kata dari blok `## VO` (Needleman–Wunsch, jadi satu kata hilang tidak
menggeser sisanya), lalu menulis batasnya ke `out/voicetest/<slug>/batas-<T>.json`.
`vo:utuh` memanggilnya sendiri — `--senyap` mengembalikan heuristik lama, dan itu
cuma untuk saat transkripsi gagal.

**Bayaran keduanya lebih berharga daripada batasnya.** Pencocokan yang sama
menjawab pertanyaan yang sebelumnya tidak punya penjaga sama sekali: **apakah
yang diucapkan sama dengan yang ditulis.** Gemini itu model bahasa — ia bisa
memparafrase — sementara naskahnya beku dan seluruh timing dihitung dari jumlah
katanya. Di T14 hasilnya 97,3%, dan satu-satunya selisih adalah `D N S` (3 token
naskah) vs `dns` (1 token transkrip): artefak ejaan fonetik, bukan pergeseran.

### Penjaganya menggigit

Potongan ditulis ke `.part`, **diukur**, baru dinamai. Kalau ada satu potongan
yang durasinya di luar 0,6–1,7× perkiraan dari jumlah katanya, **nol berkas**
ditulis. Penjaga versi pertama mengukur potongan *sebelum* tepinya dipangkas —
dan meloloskan potongan 330 wpm yang mustahil. Penjaga yang memeriksa angka yang
bukan angka yang ditulis adalah penjaga yang tidak ada.

`--pakai-wav` memakai ulang aliran utuh yang sudah dibayar, jadi menyetel
pemotong tidak pernah membayar sintesis ulang.

**Pembandingnya jumlah durasi sesudah dipangkas, bukan durasi aliran utuh.**
Jeda antar-scene milik sambungannya dan dibuang dari kedua tepi tiap potongan —
di S1 T14 ia 13 dtk dari 47,6, **27% yang tidak pernah mendarat di berkas mana
pun**. Diukur terhadap total mentah, setiap potongan terlihat kependekan segitu,
dan dua scene yang jedanya paling lebar jatuh lewat ambang tanpa ada yang salah
pada bacaannya. Dengan pembanding yang setara, sebaran S1 jadi 0,77–1,20.
Ambangnya sendiri tidak pernah dilonggarkan: penjaga yang dikendurkan sampai
lolos adalah penjaga yang tidak ada, sama seperti penjaga yang mengukur angka
yang bukan angka yang ditulis.

### Video panjang: beberapa permintaan, bukan satu dan bukan sebelas

**Gemini memotong permintaan yang terlalu panjang tanpa mengeluh.** Naskah L T14
(738 kata, ≈5,4 menit) dikirim utuh dan kembali sebagai audio **50,31 dtk** —
880 wpm, dan cuma 81 dari 747 kata yang benar-benar diucapkan. Tidak ada error
dari API; yang menangkapnya pencocokan per kata, yang jatuh ke 10,8% dan membuat
penjaga menulis nol berkas. Harganya **5.026 karakter hangus**, 2026-08-15.

Kesimpulan yang diambil saat itu — "vo:utuh itu jalur Short; video panjang per
scene" — **sudah dicabut**, karena harganya baru terbaca belakangan. VO T14 yang
lahir dari sebelas panggilan per scene berayun **119–161 wpm (36%)**, lebih
buruk daripada ayunan 31% yang justru jadi alasan `vo:utuh` dibuat. Yang paling
terdengar: hook-nya melambat sendirian, jadi episode dibuka oleh orang yang
terdengar lain dari yang melanjutkannya.

Jalan tengahnya **batch** — beberapa scene per permintaan:

```powershell
npm run vo:utuh -- <slug> --target L --pecah-di 06-penjaga,09-dari-atas,12-label-bukan-isi
npm run vo:utuh -- <slug> --target L --batch 4     # jalan cepat, buat mencoba
```

Di dalam satu batch semuanya tetap satu tarikan napas: satu tempo, satu
pembawaan, sambungan HARD RULE 7 tersambung di suaranya. Yang dibeli batch cuma
**sedikit** sambungan yang menyeberangi permintaan, bukan nol.

**Batasnya ditaruh di batas BAGIAN FLOW, bukan di angka bulat** — itu sebabnya
`--pecah-di` yang dipakai untuk keluaran sungguhan dan `--batch <n>` cuma untuk
mencoba-coba. Batas batch adalah satu-satunya tempat tempo boleh bergeser, jadi
ia harus jatuh di sambungan yang paling tahan digeser. Yang paling tidak boleh:
**sambungan 3 → 4**, tempat `[what]` akhirnya dinamai ([HARD RULE 6](../CLAUDE.md)).
Di situ celahnya paling lebar dan justru harus terdengar seperti jawaban;
pencerita yang berganti tempo persis di situ membatalkan seluruh bagian 3.

Berapa besar satu batch yang aman **tidak punya angka pasti**, dan tidak usah
ditebak — sejak sekarang penggalan ditangkap penjaganya sendiri, di tempat
kejadiannya:

> `POTONG GAGAL — batch 2/4 kembali 4,29 dtk untuk 52 kata (727 wpm, perkiraan
> 136). Aliran ini terpenggal — Gemini berhenti sebelum naskahnya habis.`

Diperiksa terhadap `VO_WORDS_PER_MINUTE` di `.env`, **di sintesis, bukan di
pemotong** — pemotong akan melaporkannya sebagai "batas tidak ketemu", yang
gejala, bukan sebabnya. Diukur di T14, batch 150–210 kata lolos dengan nyaman.

**Nol berkas berlaku lintas batch.** Batch 1 dan 2 yang sudah terpotong tetap
tinggal sebagai `.part` sampai batch terakhir lolos penjaganya; satu batch gagal
berarti semuanya dibuang. Keluaran yang separuh scene-nya dari bacaan lama dan
separuh dari bacaan baru adalah cacat yang paling susah ditunjuk saat
mendengarkan — dan dengan batch, "bacaan lama" itu bisa berarti batch yang baru
saja gagal beberapa detik lalu.

Penjaga tabrakan berkas juga pindah **ke depan**, sebelum satu permintaan pun
dikirim. Dulu ia duduk di dalam pemotong, dan itu cukup selama cuma ada satu
aliran. Dengan batch ia jadi jebakan: batch 1 dan 2 dibayar, lalu batch 3
berhenti karena berkasnya sudah ada — dan yang sudah dibayar tidak kembali.

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
  08-umur-catatan-vo.md — belum ada
  08-umur-catatan-direction.md — belum ada
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
