---
kode: T16
slug: apa-itu-enkripsi
judul_kerja: Kenapa yang kamu ketik tidak bisa dibaca di jalan?
pilar: P5 · Keamanan & Privasi
lapis: umum → dev
what: enkripsi
status: komposisi   # video panjang selesai dibangun; Shorts = fase 3
naskah_beku:
  L:
  S1:
  S2:
karakter_terpakai: 0
tanggal_target:
---

# T16 · Apa itu enkripsi

Disusun mengikuti **flow 7 bagian** ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)).

| # | Bagian | Isi |
|---|---|---|
| 1 | **[question]** | Satu kalimat diketik, lalu berangkat. Di jalan ia berpindah dari tangan ke tangan, semuanya asing, dan tidak satu pun bisa membacanya. Kenapa? |
| 2 | **brand opening** | kartu judul standar |
| 3 | **[problem]** | Jalannya memang umum — tiap kiriman lewat tangan yang tidak kamu pilih, dan itu bukan kerusakan. Jalan keluar yang paling masuk akal, taruh di kotak lalu kunci, gagal di depan mata: yang di ujung harus bisa membuka, jadi **kuncinya ikut lewat jalan yang sama**, dipegang tangan yang sama. Dan yang di ujung itu belum pernah kamu temui — tidak pernah ada hari kemarin untuk menyepakati kunci. |
| 4 | **[answer] → [what]** | Dibalik: yang dibagikan bukan kuncinya, tapi **gembok yang terbuka**. Siapa pun boleh mengambil satu dan mengunci; cuma pemiliknya yang bisa membuka. Mengunci isi seperti itu namanya **enkripsi**. |
| 5 | **[why]** | Dua sebab: **kunci pembukanya tidak pernah meninggalkan meja** — yang lewat jalan cuma gembok terbuka dan kotak tertutup, dan yang mengunci pun ikut terkunci di luar; dan **dua meja bisa berakhir memegang kunci yang sama tanpa kunci itu pernah dikirim**, karena masing-masing menahan satu bagian yang tidak pernah keluar. |
| 6 | **[explaining]** | Gembok sebagus itu lambat, jadi ia cuma dipakai di pembukaan · gembok terbuka tidak bertanda tangan, jadi ia datang bersama surat pengenal · terkunci belum berarti utuh, jadi kotaknya disegel · kunci yang dipakai terus membuat rekaman kemarin bisa dibuka besok, jadi kuncinya dibuang · labelnya justru harus tetap terbaca, kalau tidak kotaknya tidak sampai. |
| 7 | **[case]** | Kotaknya selalu dibuka di suatu tempat, dan **di mana** itu yang menentukan siapa bisa membaca. Lalu: yang jebol hampir tidak pernah gemboknya — kuncinya ditaruh sembarangan, kotaknya dibuka di tempat yang salah, atau kamu sendiri yang membukakan karena namanya kelihatan benar. |

## Penjelasan 5 tahun

> Kamu menitipkan surat lewat banyak tangan. Supaya tidak dibaca di jalan,
> suratnya ditaruh di kotak yang dikunci. Masalahnya, kuncinya lewat jalan yang
> sama. Jadi orang yang kamu kirimi membagikan gembok terbukanya ke siapa saja.
> Siapa pun bisa mengunci — tapi cuma dia yang punya kunci pembukanya.

*(46 kata, nol istilah teknis.)*

**Analogi utama:** **kotak kiriman yang digembok, lewat kurir yang boleh melihat
segalanya.** Satu analogi untuk seluruh episode
([docs/09](../../docs/09-tangga-abstraksi.md) aturan 4) — tidak ada terowongan,
tidak ada perisai, tidak ada sandi rahasia.

**Mengacak huruf SENGAJA tidak dipakai sebagai gambaran.** Itu yang membuat orang
mengira enkripsi soal *bentuk tulisannya*, padahal seluruh persoalannya ada di
*kuncinya*. Tulisan yang berubah jadi tidak terbaca muncul tepat satu kali, di
`07-gembok-terbuka`, sebagai **yang terlihat saat kotaknya menutup** — bukan
sebagai gambaran tandingan, dan cara mengacaknya tidak pernah dijelaskan. Perannya
sama persis dengan dinding di T15 dan buku besar di T14.

**Titik putus analogi** — ketiganya wajib disebut di VO, bukan cuma dicatat di sini:

1. **Gembok terbuka tidak membuktikan siapa pemiliknya.** Siapa pun bisa
   menyodorkan gembok sambil mengaku toko itu (`11-gembok-siapa`).
2. **Kotak terkunci menyembunyikan isi, bukan pengirimannya.** Ke mana, sebesar
   apa, sesering apa — semuanya tetap terbaca (`14-label-tetap-terbaca`).
3. **Gemboknya tidak dipakai mengantar kunci.** Dua meja menyusun kunci yang sama
   tanpa mengirimkannya (`09-rahasia-berdua`), dan gemboknya dipakai untuk
   membuktikan **siapa** (`11-gembok-siapa`).

## Satu kalimat bawa-pulang

> Yang jebol hampir tidak pernah gemboknya. Yang jebol kuncinya ditaruh
> sembarangan, atau kotaknya dibuka di tempat yang salah — dan di situ gembok
> tidak pernah berjanji apa-apa.

## Naik tangga

| Tangga | Isi |
|---|---|
| **L1** | Kiriman lewat banyak tangan. Ditaruh di kotak dan dikunci, tapi kuncinya lewat jalan yang sama. Jalan keluarnya: yang dibagikan gemboknya, bukan kuncinya. |
| **L2** | Gembok dan kunci adalah dua benda berbeda; yang mengunci boleh terbuka untuk umum. Gembok cuma dipakai di pembukaan, sesudahnya satu kunci yang sama untuk dua arah. Gembok datang bersama surat pengenal. Kotak yang terkunci tetap disegel supaya perubahannya ketahuan. |
| **L3** | Kenapa kesepakatan kunci bisa terjadi di depan umum tanpa kunci itu pernah lewat; kenapa kunci sekali pakai membuat rekaman lama tetap tertutup walau kunci hari ini dicuri; kenapa "terenkripsi" tanpa menyebut **di mana kotaknya dibuka** tidak menjawab apa pun. |

## Kamus istilah → L1

| Istilah | Kalimat L1 pembuka | Scene |
|---|---|---|
| jalur yang dilewati bersama | "Tidak ada jalan pribadi. Semua kiriman lewat jalan yang sama." | `03-jalan-umum` |
| menyandikan isi | "Isinya masuk kotak, kotaknya dikunci." | `04-kotak-digembok` |
| masalah pengiriman kunci | "Kuncinya harus ikut lewat jalan yang sama." | `05-kuncinya-ikut` |
| enkripsi | "Mengunci isi seperti tadi itu namanya enkripsi." | `07-gembok-terbuka` |
| kunci publik & kunci pribadi | "Gembok terbuka yang dibagikan itu kunci publik. Yang tinggal di mejanya, kunci pribadi." | `08-kunci-tidak-pernah-lewat` |
| kesepakatan kunci | "Dua meja menyusun benda yang sama, dari bagian yang tidak pernah dikirim." | `09-rahasia-berdua` |
| gembok lambat vs kunci cepat | "Gembok sebagus itu makan waktu, jadi ia cuma dipakai sebentar di awal." | `10-gembok-lambat` |
| surat pengenal | "Gemboknya datang bersama surat pengenal, ditandatangani pihak yang sudah dipercaya duluan." | `11-gembok-siapa` |
| segel | "Kotaknya disegel. Segel rusak, kotaknya ditolak tanpa dibuka." | `12-kotak-bisa-ditukar` |
| kunci sekali pakai | "Kuncinya dibuang begitu percakapannya selesai." | `13-kunci-yang-dibuang` |
| yang tetap terbaca | "Labelnya harus tetap terbaca, kalau tidak kotaknya tidak sampai." | `14-label-tetap-terbaca` |
| ujung ke ujung | "Ada yang cuma terbuka di rumah penerima. Itu namanya ujung ke ujung." | `15-dibuka-di-ujung` |

## Sumber

| Klaim | Sumber | Status |
|---|---|---|
| Kunci pembuka tidak pernah dikirim, dan gembok cuma dipakai di pembukaan — sesudahnya satu kunci yang sama untuk dua arah | RFC 8446 (TLS 1.3) | ⚠ **belum dibuka** |
| Dua pihak bisa menyusun kunci yang sama tanpa mengirim kuncinya | RFC 8446 · dokumen NIST untuk kesepakatan kunci | ⚠ **belum dibuka. Titik putus analogi #3 berdiri atau jatuh di sini: apakah kunci masih pernah "diantar" dengan gembok di versi yang dipakai sekarang** |
| Terkunci belum berarti utuh — perubahan isi ketahuan dari segelnya, dan kotak bersegel rusak ditolak tanpa dibuka | dokumen NIST untuk mode enkripsi berotentikasi | ⚠ **belum dibuka. Nama modenya jangan ditulis dari ingatan; di VO ia tetap "segel"** |
| Kunci dibuang setelah percakapan selesai, sehingga rekaman lama tetap tertutup | RFC 8446, bagian kunci sementara | ⚠ **belum dibuka. Batas klaimnya harus dibaca persis sebelum diucapkan sekuat itu** |
| Gembok bisa dipasang siapa saja untuk nama yang ia kuasai | dokumen penerbit sertifikat gratis + dokumen validasi domain | ⚠ **belum dibuka — dipakai Short 2, bukan video panjang** |
| Ada yang cuma terbuka di rumah penerima, ada yang dibuka di ruang antara lalu dikunci lagi | whitepaper protokol aplikasi pesan yang bersangkutan | ⚠ **belum dibuka. Nama aplikasi tidak disebut sampai dokumennya dibuka** |

> **GERBANG MASIH TERTUTUP.** Naskah ini **tidak boleh dibekukan** dan VO-nya
> **tidak boleh digenerate** selama masih ada baris ⚠ di atas
> ([docs/04 §5](../../docs/04-pipeline-produksi.md#5-gerbang--bekukan-naskah)).
>
> **Tapi gerbang itu tidak menahan komposisinya**, sama seperti T14 dan T15:
> seluruh rencana VO episode ini ditulis **tanpa satu pun angka**. Di topik ini
> godaannya paling besar — "butuh sekian miliar tahun untuk membobolnya" adalah
> kalimat yang hampir menulis dirinya sendiri, punya asumsi yang tidak pernah
> ikut disebut, dan basi begitu perangkatnya berubah. Kalau nanti dipakai,
> tempatnya cuma `[case]`, dengan sumbernya.

## Kamus pengucapan

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| enkripsi | enkripsi | dibaca wajar; **jangan** dieja per huruf |
| gembok | kunci publik | benda L1-nya, dipakai sepanjang episode |
| kotak | satuan kiriman | tidak pernah disebut "paket data" |
| surat pengenal | sertifikat | kata "sertifikat" tidak pernah muncul di VO |
| segel | tanda keutuhan | tidak pernah disebut "tanda tangan" — itu benda lain |

## Pilihan kata

| Yang dipakai | Yang dihindari | Kenapa |
|---|---|---|
| isinya | data | kosakata L1 ([docs/09](../../docs/09-tangga-abstraksi.md)) |
| yang di ujung sana | server | sama |
| kotak | paket | "paket" sudah setengah istilah dan tidak lebih jelas |
| dikunci | dienkripsi | kata kerja teknis sebelum bendanya berdiri |
| gembok terbuka | kunci publik | namanya baru jatuh di `08` |

---

## Video panjang — T16-L

### Scene standar (tanpa VO)

| Scene | Isi | Posisi | Durasi |
|---|---|---|---|
| `opening` | kartu judul — **"Enkripsi" / "Kotak yang cuma satu orang bisa buka"** | bagian 2, setelah `hook-banyak-tangan` | `OPENING_SECONDS` |
| `closing` | tanda tangan brand, tanpa judul | setelah `bukan-gemboknya` | `CLOSING_LONG_SECONDS` |

Judulnya diatur di `Episode.tsx` (`JUDUL` + `SUBJUDUL`); `tools/bangun-timing.mjs`
yang menyisipkan kedua scene itu ke `timing.gen.ts`.

> **Kartu judul menulis "Enkripsi" di sekitar detik dua puluh, dan itu
> disengaja** — sama seperti T01, T14, dan T15. Yang dilarang HARD RULE 6 adalah
> **VO** yang menyebut nama sebelum bendanya berdiri, bukan kartu judulnya.
> Karena itu penamaan di `07-gembok-terbuka` ditulis sebagai penegasan atas
> benda yang barusan dilihat bekerja, bukan sebagai perkenalan.
>
> **Subjudulnya menaruh gambaran L1-nya lebih dulu**, dan itu satu-satunya
> tempat kata "kotak" bertemu kata "enkripsi" sebelum scene 7.

### Scene

**Daftar isi episode, bukan tempat kalimatnya hidup.** Teks VO tiap scene ada di
`scenes/<kunci>-vo.md` dan apa yang terjadi di layar di
`scenes/<kunci>-direction.md` (HARD RULE 3 & 4).

| # | Bagian | Ringkas |
|---|---|---|
| hook-banyak-tangan | 1 question | Satu kalimat diketik dan dikirim. Kamera ikut kotaknya keluar, dan di jalan ia berpindah dari tangan ke tangan, semuanya asing. Tidak satu pun membacanya. |
| jalan-umum | 3 problem | Jalannya dibedah: tidak ada jalur pribadi. Tiap kiriman lewat tangan yang tidak kamu pilih, dan itu bukan kerusakan — memang begitu bentuk jalannya. |
| kotak-digembok | 3 problem | Jalan keluar yang paling masuk akal dicoba: masukkan ke kotak, kunci. Kurirnya tetap membawa, tapi cuma membawa. |
| kuncinya-ikut | 3 problem | Gagal di depan mata: yang di ujung harus bisa membuka, jadi kuncinya berangkat lewat jalan yang sama, dipegang tangan yang sama. |
| belum-pernah-ketemu | 3 problem | Dan yang di ujung belum pernah kamu temui. Tidak pernah ada hari kemarin untuk menyepakati kunci lebih dulu. |
| gembok-terbuka | 4 answer | Pembalikannya: yang dibagikan gemboknya, bukan kuncinya. Siapa pun boleh mengambil satu dan menjepitnya. Namanya jatuh di sini, sekali. |
| kunci-tidak-pernah-lewat | 5 why | Kunci pembukanya tidak pernah meninggalkan meja. Yang lewat jalan cuma gembok terbuka dan kotak tertutup — dan yang mengunci ikut terkunci di luar. |
| rahasia-berdua | 5 why | Dua meja berakhir memegang kunci yang sama tanpa kunci itu pernah dikirim. Yang mendengarkan memegang semua yang lewat dan tetap tidak bisa menyusunnya. |
| gembok-lambat | 6 explaining | Gembok sebagus itu makan waktu, jadi ia cuma dipakai di pembukaan. Sesudahnya satu kunci yang sama untuk dua arah, dan kotaknya mengalir. |
| gembok-siapa | 6 explaining | Gembok terbuka tidak bertanda tangan. Seseorang menyodorkan gemboknya sambil mengaku, dan kotaknya terkunci rapat untuk dia. Maka gembok datang bersama surat pengenal. |
| kotak-bisa-ditukar | 6 explaining | Terkunci belum berarti utuh: kotak yang tidak bisa dibuka tetap bisa ditukar. Maka kotaknya disegel, dan segel rusak berarti ditolak tanpa dibuka. |
| kunci-yang-dibuang | 6 explaining | Kunci yang dipakai terus membuat rekaman kemarin bisa dibuka besok. Maka kuncinya dibuang begitu percakapannya selesai. |
| label-tetap-terbaca | 6 explaining | Isinya tertutup, labelnya tidak — dan memang tidak boleh. Ke mana, sebesar apa, sesering apa: semuanya tetap terbaca di jalan. |
| dibuka-di-ujung | 7 case | Kotaknya selalu dibuka di suatu tempat, dan di mana itu yang menentukan siapa bisa membaca. Ada yang cuma terbuka di rumah penerima, ada yang dibuka di ruang antara lalu dikunci lagi. |
| bukan-gemboknya | 7 case | Yang jebol hampir tidak pernah gemboknya. Kuncinya ditaruh sembarangan, atau kamu sendiri yang membukakan karena namanya kelihatan benar. Ditutup kalimat bawa-pulang. |

**Kalau kepanjangan, yang dipangkas duluan `kunci-yang-dibuang`, lalu
`gembok-lambat`** — keduanya `[explaining]`, dan docs/02 mematok `[explaining]`
sebagai yang pertama dipotong. **Tidak boleh disentuh:** `gembok-siapa`,
`kotak-bisa-ditukar`, dan `label-tetap-terbaca` (ketiganya titik putus analogi,
dan titik putus wajib disebut di VO), serta `kunci-tidak-pernah-lewat` dan
`rahasia-berdua` yang merupakan seluruh isi `[why]`.

**Empat scene di bagian 3 itu memang banyak, dan itu disengaja.** Seluruh episode
bertumpu pada satu perasaan yang harus benar-benar tumbuh di situ: kuncinya ikut
lewat jalan yang sama. Kalau bagian itu terasa berlarut, yang digabung
`jalan-umum` + `kotak-digembok` — bukan dibuang (docs/02: `[problem]` tidak
pernah dipangkas).

### Timing — estimasi

Keluaran `npm run gen`. Opening dan closing sudah ikut terhitung di sana.

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 1 — T16-S1 · "Nugget"

**Insight:** ada kotak yang bisa kamu kunci, tapi tidak bisa kamu buka lagi.
**Target:** 40–60 dtk · ~115 kata · L1
**Berkas:** `scene-shorts/s1-nugget/` — id komposisi `t16-s1-01-…`, Short utuh `T16-apa-itu-enkripsi-s1`.

> **FASE 2 — BELUM DIGARAP.** Tabel di bawah ini rencana, bukan produksi. Yang
> menentukan sebuah Short ada adalah **subfoldernya**, dan subfolder itu belum
> dibuat: selama belum ada, `npm run gen` tidak membaca bagian ini sama sekali
> ([docs/02 § Di mana berkasnya](../../docs/02-format-video.md)). Video panjang
> tuntas dulu (CLAUDE.md § Fase kerja satu topik).

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| kunci-sendiri | hook | Klaim jatuh di frame pertama: kotak ini bisa kamu kunci, tapi tidak bisa kamu buka lagi. |
| buat-apa | ketegangan | Kelihatannya rugi — buat apa mengunci sesuatu yang kamu sendiri tidak bisa buka? |
| dua-benda | ketegangan | Karena yang mengunci dan yang membuka itu dua benda berbeda. |
| dibagikan | payoff | Undangan: pemiliknya menaruh gembok terbukanya di depan umum, bertumpuk, siapa pun boleh ambil. |
| kamu-mengunci | payoff | Kamu ambil satu, taruh suratmu, jepit. Selesai. |
| terlambat | payoff | Sekarang kamu tidak bisa membukanya. Yang punya kuncinya cuma satu orang, dan itu bukan kamu. |
| lewat-siapa-pun | payoff | Kotaknya boleh lewat tangan siapa pun — bahkan yang memegang gembok yang sama persis tetap tidak bisa membuka. |
| namanya | tutup | Nama menyusul gambarannya: gembok yang ditaruh di depan umum itu kunci publik. |
| loop | tutup | Balik ke kalimat pertama, sekarang terdengar masuk akal. |

## Short 2 — T16-S2 · "Jebakan"

**Mitos:** "Ada gemboknya, berarti situsnya aman."
**Target:** 40–60 dtk · ~115 kata · L1
**Berkas:** `scene-shorts/s2-jebakan/` — id komposisi `t16-s2-01-…`, Short utuh `T16-apa-itu-enkripsi-s2`.

> **FASE 2 — BELUM DIGARAP.** Sama seperti Short 1.

Insightnya **berbeda dari Short 1** dan tidak bisa saling menggantikan: S1 soal
*kenapa gembok terbuka bisa dibagikan*, S2 soal *apa yang tidak pernah
dijanjikan gembok itu*.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| mitos | mitos | Kalimatnya ditulis besar di layar apa adanya, dibaca datar tanpa dibantah dulu. |
| salah | bantahan | Dicoret. Gemboknya tidak bohong — yang salah apa yang kita kira ia janjikan. |
| yang-dijanjikan | bantahan | Undangan: kotak yang terkunci sepanjang jalan. Itu janji pertamanya. |
| dibuka-di-ujung | bukti | Tapi kotaknya tetap dibuka di ujung, dan soal siapa yang berdiri di sana gembok tidak berjanji apa-apa. |
| siapa-pun-punya | bukti | Gembok bisa dipasang siapa saja di kotaknya sendiri, termasuk yang berniat menipu. |
| nama-yang-cocok | bukti | Janji keduanya: nama di kotaknya cocok dengan nama yang kamu tuju. Bukan bahwa nama itu jujur. |
| yang-dibaca | konsekuensi | Jadi yang harus dibaca bukan gemboknya, tapi namanya — huruf per huruf. |
| tetap-berguna | konsekuensi | Tanpa gembok itu, apa pun yang kamu ketik terbaca semua orang yang menumpang jalan yang sama. |
| jadi | konsekuensi | Gembok menjawab "ada yang mengintip di jalan?", bukan "orang ini jujur?". CTA halus ke video panjang. |
