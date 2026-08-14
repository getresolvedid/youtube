---
judul: Apa itu enkripsi
diusulkan: 2026-08-14
pilar: P5 · Keamanan & Privasi
lapis: umum → dev
status: lolos → T16
---

# Apa itu enkripsi

## Ide mentah

> "apa itu enkripsi"

## Sudutnya — dan kenapa bukan "cara mengacak tulisan"

Hampir semua penjelasan enkripsi membuka dengan **mengacak huruf**: A jadi D, B
jadi E. Itu bagian yang paling mudah dan paling tidak penting — dan setelah
menontonnya orang tetap tidak tahu apa-apa, karena pertanyaan sebenarnya belum
disentuh.

Pertanyaan sebenarnya: **bagaimana dua orang yang belum pernah bertemu bisa
menyepakati satu rahasia, sementara semua orang di jalan mendengarkan?** Kalau
kuncinya harus ikut lewat jalan yang sama dengan kotaknya, mengunci kotak tidak
menyelesaikan apa pun — ia cuma memindahkan masalahnya ke benda yang lebih kecil.

Seluruh episode ini dibangun di atas masalah itu. Mengacak isinya cuma akibat.

## Pemetaan ke flow 7 bagian

Flow wajib channel ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)):

| # | Bagian | Isi untuk topik ini |
|---|---|---|
| 1 | **[question]** | "Apa yang kamu ketik barusan lewat tangan orang yang tidak kamu kenal — beberapa kali. Kenapa mereka tidak bisa membacanya?" |
| 2 | **brand opening** | Sting standar 4,0 dtk |
| 3 | **[problem]** | Jalannya memang umum: tiap kiriman selalu lewat tangan yang tidak kamu pilih, dan itu bukan kebocoran — memang begitu bentuk jalannya. Jalan keluar yang paling masuk akal — taruh di kotak, kunci — gagal di depan mata: yang di ujung sana harus bisa membuka, jadi **kuncinya ikut lewat jalan yang sama**, dipegang tangan yang sama. Lebih buruk lagi: kamu **belum pernah bertemu** yang di ujung sana. Toko yang baru kamu buka hari ini. Tidak pernah ada kesempatan menyepakati kunci lebih dulu. |
| 4 | **[answer] → [what]** | Dibalik: yang dibagikan bukan kuncinya, tapi **gembok yang terbuka**. Siapa pun boleh mengambil satu dan mengunci; cuma pemiliknya yang bisa membuka. Isi yang jadi tidak terbaca sampai kotaknya dibuka — tindakan itu namanya **enkripsi**. `[what]` = enkripsi. |
| 5 | **[why]** | Dua sebab, keduanya harus terasa sebagai *jawaban atas masalah bagian 3*: **(a) kunci pembuka tidak pernah meninggalkan mejanya** — yang lewat jalan cuma gembok terbuka dan kotak tertutup, dan bahkan kamu yang mengunci pun tidak bisa membukanya lagi. **(b) dua orang bisa berakhir memegang kunci yang sama tanpa kunci itu pernah dikirim** — masing-masing menyimpan satu bagian yang tidak pernah keluar dari mejanya, dan yang mendengarkan di jalan memegang semua yang lewat tapi tidak bisa menyusunnya. |
| 6 | **[explaining]** | Gembok yang bagus itu lambat, jadi ia cuma dipakai di pembukaan — sisanya satu kunci yang sama untuk dua arah · **gembok terbuka tidak bertanda tangan**: siapa pun bisa menyodorkan gemboknya sambil mengaku toko itu, jadi ada surat pengenal yang ditandatangani pihak yang sudah dipercaya duluan · **terkunci ≠ utuh**: kotak terkunci masih bisa ditukar atau dipotong, jadi kotaknya disegel dan segel rusak = ditolak tanpa dibuka · kunci yang dipakai terus membuat rekaman kemarin bisa dibuka kalau kunci hari ini dicuri, jadi kuncinya **dibuang** setelah percakapannya selesai · **labelnya tetap harus terbaca** supaya kotaknya sampai: ke mana, sebesar apa, sesering apa. |
| 7 | **[case]** | Kotaknya **dibuka di ujung** — dan yang menentukan siapa bisa membaca adalah di mana ujung itu: sebagian cuma terbuka di rumah penerima, sebagian dibuka di ruang antara lalu dikunci lagi, dan yang tersimpan di rak masih tertutup atau tidak itu pertanyaan ketiga yang berbeda · yang jebol hampir tidak pernah gemboknya: kuncinya ditaruh sembarangan, kotaknya dibuka di tempat yang salah, atau kamu sendiri yang membukakannya · kalimat bawa-pulang balik ke L1. |

## Penjelasan 5 tahun

> Kamu menitipkan surat lewat banyak tangan. Supaya tidak dibaca di jalan,
> suratnya ditaruh di kotak yang dikunci. Masalahnya, kuncinya lewat jalan yang
> sama. Jadi orang yang kamu kirimi membagikan gembok terbukanya ke siapa saja.
> Siapa pun bisa mengunci — tapi cuma dia yang punya kunci pembukanya.

*(46 kata, nol istilah teknis.)*

**Analogi utama:** **kotak kiriman yang digembok, lewat kurir yang boleh melihat
segalanya.** Satu analogi untuk seluruh episode
([docs/09](../../docs/09-tangga-abstraksi.md) aturan 4) — tidak ada huruf yang
digeser, tidak ada sandi rahasia, tidak ada terowongan.

**Yang sengaja TIDAK dipakai: mengacak huruf.** Itu gambaran yang bikin penonton
mengira enkripsi adalah soal *bentuk tulisannya*, padahal seluruh persoalannya
ada di *kuncinya*. Huruf teracak boleh muncul **sekali** sebagai penampakan di
layar saat kotaknya ditutup — bukan sebagai gambaran tandingan, dan tidak pernah
dijelaskan cara mengacaknya.

**Titik putus analogi** — ketiganya wajib disebut di VO, bukan cuma dicatat di sini:

1. **Gembok terbuka tidak membuktikan siapa pemiliknya.** Siapa pun bisa
   menyodorkan gembok sambil mengaku toko itu, dan kotakmu akan terkunci rapat —
   untuk dia. Ini titik putus terbesar, dan ia yang melahirkan surat pengenal.
2. **Kotak terkunci menyembunyikan isi, bukan pengirimannya.** Bahwa kamu
   mengirim, ke mana, sebesar apa, dan sesering apa — semuanya tetap terbaca di
   jalan, karena tanpa itu kotaknya tidak sampai.
3. **Gemboknya tidak benar-benar dipakai mengantar kunci.** Di praktik sekarang
   keduanya menyusun kunci yang sama di dua meja sekaligus, dan gemboknya
   dipakai untuk membuktikan **siapa**, bukan untuk mengantar apa pun. Analogi
   gembok berhenti persis di situ.

## Uji 4 syarat

| Syarat | Lolos? | Catatan |
|---|---|---|
| 1 Bahasa anak 5 tahun | ✅ | Kotak, gembok, kunci, kurir — 46 kata |
| 2 Dua lapis (L1 + L3) | ✅ | L1: gembok terbuka dibagikan, kunci pembukanya tidak. L3: kenapa asimetris cuma dipakai di pembukaan lalu simetris mengambil alih, kesepakatan kunci tanpa mengirim kunci, sertifikat & rantai kepercayaan, enkripsi berotentikasi (terkunci ≠ utuh), kunci sekali pakai, dan beda in-transit / end-to-end / at-rest |
| 3 Ada mekanisme | ✅ | Kotak **berjalan** melewati tangan satu per satu; gembok terbuka diambil dari tumpukan lalu dijepit; kunci yang tidak pernah bergerak dari mejanya; dua meja menyusun benda yang sama dari bagian yang berbeda; segel yang robek. Semuanya bergerak |
| 4 Bisa diverifikasi | ⚠ | Semua mekanismenya punya sumber primer terbuka (RFC 8446, dokumen NIST, whitepaper protokol pesan), tapi **belum satu pun dibuka** — lihat catatan |

## Sudut video panjang

Bukan "bagaimana tulisan diacak", melainkan **bagaimana dua pihak yang belum
pernah bertemu bisa menyepakati satu rahasia di jalan yang semua orang
dengarkan** — masalah yang terlihat mustahil sampai satu pembalikan
menyelesaikannya: yang dibagikan bukan kuncinya, tapi gemboknya.

Babak realitanya yang jarang diceritakan: **yang jebol hampir tidak pernah
gemboknya.** Gembok modern tidak dipatahkan; yang terjadi adalah kotaknya
memang dibuka di ujung dan ujungnya bukan yang kamu kira, kuncinya tersimpan di
tempat yang bisa diambil, atau kamu sendiri yang membukakan pintunya karena
namanya kelihatan benar.

## Sudut dua Shorts

- **Nugget — ada kotak yang bisa kamu kunci, tapi tidak bisa kamu buka lagi.**
  Gembok yang mengunci dan kunci yang membuka adalah dua benda berbeda; yang
  pertama boleh ditaruh di depan umum. Begitu kamu jepit gemboknya, kamu sendiri
  ikut terkunci di luar — dan justru itu yang membuatnya berguna. Berdiri
  sendiri: penonton tidak perlu tahu apa pun soal enkripsi untuk kaget.
- **Jebakan — "ada gemboknya, berarti situsnya aman."** Gemboknya benar; yang
  salah artinya. Ia menjanjikan tepat dua hal: tidak ada yang membaca di jalan,
  dan nama di kotaknya cocok dengan nama yang kamu tuju. Ia tidak pernah
  menjanjikan bahwa nama itu jujur — dan gembok bisa dipasang siapa saja,
  termasuk yang memang berniat menipu.

## Usulan scene — draf

**Belum naskah.** Ini usulan urutan tayang yang tinggal dipindah ke tabel
`### Scene` di `naskah.md` kalau ide ini lolos ke backlog. Yang ditetapkan cuma
tiga hal: ada scene apa saja, urutannya, dan di bagian flow mana
(HARD RULE 1 · 5).

### Video panjang — 15 scene

| # | Bagian | Ringkas |
|---|---|---|
| hook-banyak-tangan | 1 question | Satu kalimat diketik dan dikirim. Kamera ikut kotaknya keluar rumah — dan di jalan ia berpindah dari tangan ke tangan, semuanya asing. Pertanyaan digantung: kenapa tidak satu pun dari mereka bisa membacanya? |
| jalan-umum | 3 problem | Jalannya dibedah: tidak ada jalur pribadi. Tiap kiriman lewat tangan yang tidak kamu pilih, dan itu bukan kerusakan — memang begitu bentuk jalannya. |
| kotak-digembok | 3 problem | Jalan keluar yang paling masuk akal dicoba: masukkan ke kotak, kunci. Kurir tetap membawanya, tapi cuma membawa. Isinya menghilang dari pandangan. |
| kuncinya-ikut | 3 problem | Gagal di depan mata: yang di ujung harus bisa membuka. Kuncinya berangkat lewat jalan yang sama, dipegang tangan yang sama. Masalahnya tidak selesai, cuma mengecil. |
| belum-pernah-ketemu | 3 problem | Dan yang di ujung itu belum pernah kamu temui — toko yang baru kamu buka hari ini. Tidak pernah ada hari kemarin untuk menyepakati kunci. |
| gembok-terbuka | 4 answer | Pembalikannya: yang dibagikan bukan kunci, tapi gembok terbuka — banyak, di depan umum, siapa pun boleh ambil. Kamu jepit satu di kotakmu. Namanya jatuh di sini, sekali. |
| kunci-tidak-pernah-lewat | 5 why | Kenapa itu benar-benar menyelesaikan bagian 3: kunci pembukanya tidak pernah meninggalkan meja pemiliknya. Yang lewat jalan cuma gembok terbuka dan kotak tertutup — dan kamu, yang mengunci, ikut terkunci di luar. |
| rahasia-berdua | 5 why | Lebih jauh: dua meja bisa berakhir memegang kunci yang sama tanpa kunci itu pernah dikirim. Masing-masing menahan satu bagian yang tidak pernah keluar; yang mendengarkan memegang semua yang lewat dan tetap tidak bisa menyusunnya. |
| gembok-lambat | 6 explaining | Gembok sebagus itu lambat, jadi ia cuma dipakai di menit pembukaan. Sesudahnya dipakai satu kunci yang sama untuk dua arah — yang murah, yang cepat, yang benar-benar mengangkut percakapannya. |
| gembok-siapa | 6 explaining | Titik putus terbesar: gembok terbuka tidak bertanda tangan. Seseorang menyodorkan gemboknya sambil mengaku toko itu — kotakmu terkunci rapat, untuk dia. Maka gembok datang bersama surat pengenal yang ditandatangani pihak yang sudah dipercaya duluan. |
| kotak-bisa-ditukar | 6 explaining | Terkunci bukan berarti utuh. Kotak yang tidak bisa dibuka tetap bisa ditukar, dipotong, diguncang. Maka kotaknya disegel — dan segel yang rusak membuat kotaknya ditolak tanpa pernah dibuka. |
| kunci-yang-dibuang | 6 explaining | Kalau kuncinya dipakai terus, satu kunci yang dicuri besok membuka semua rekaman kemarin. Maka kuncinya dibuang begitu percakapannya selesai — dan rekaman kemarin jadi tumpukan kotak tanpa kunci yang cocok. |
| label-tetap-terbaca | 6 explaining | Isinya tertutup, labelnya tidak — dan memang tidak boleh. Ke mana, sebesar apa, sesering apa: semua itu tetap terbaca di jalan, karena tanpa itu kotaknya tidak sampai. |
| dibuka-di-ujung | 7 case | Kotaknya selalu dibuka di suatu tempat, dan **di mana** itu yang menentukan siapa bisa membaca: sebagian cuma terbuka di rumah penerima, sebagian dibuka di ruang antara lalu dikunci lagi — dan yang sudah masuk rak masih tertutup atau tidak adalah pertanyaan ketiga. |
| bukan-gemboknya | 7 case | Penutup: yang jebol hampir tidak pernah gemboknya. Kuncinya ditaruh sembarangan, kotaknya dibuka di tempat yang salah, atau kamu sendiri yang membukakan karena namanya kelihatan benar. Ditutup kalimat bawa-pulang. |

**Kalau kepanjangan, yang dipangkas duluan `kunci-yang-dibuang`** lalu
`gembok-lambat` — keduanya `[explaining]`, dan docs/02 mematok `[explaining]`
sebagai yang pertama dipotong. **Tidak boleh disentuh:** `gembok-siapa`,
`kotak-bisa-ditukar`, dan `label-tetap-terbaca` — ketiganya titik putus analogi,
dan titik putus wajib disebut di VO. `kunci-tidak-pernah-lewat` dan
`rahasia-berdua` juga tidak: keduanya seluruh isi `[why]`.

**Kalau bagian 3 terasa berlarut, yang digabung `jalan-umum` + `kotak-digembok`**
— bukan dibuang. Empat scene `[problem]` itu memang banyak, tapi seluruh episode
bergantung pada satu perasaan yang harus benar-benar tumbuh di situ: kuncinya
ikut lewat jalan yang sama.

**Kartu judul menulis "Enkripsi" di sekitar detik sepuluh, dan itu disengaja** —
sama seperti T01, T14, dan T15. Yang dilarang HARD RULE 6 adalah **VO** yang
menyebut nama sebelum bendanya berdiri; penamaan di `gembok-terbuka` ditulis
sebagai penegasan ("mengunci isi seperti tadi itu namanya enkripsi"), bukan
perkenalan.

### Short 1 — Nugget · 9 scene

**Insight:** ada kotak yang bisa kamu kunci, tapi tidak bisa kamu buka lagi — dan
itu justru gunanya.

| # | Bagian | Ringkas |
|---|---|---|
| kunci-sendiri | hook | Klaim jatuh di frame pertama: "Kotak ini bisa kamu kunci, tapi tidak bisa kamu buka lagi." Gembok menjepit, bunyi klik. |
| buat-apa | ketegangan | Kelihatannya rugi — buat apa mengunci sesuatu yang kamu sendiri tidak bisa buka? |
| dua-benda | ketegangan | Karena yang mengunci dan yang membuka itu dua benda berbeda. Gembok terbuka di satu tangan, kunci di tangan lain. |
| dibagikan | payoff | Undangan: bayangkan pemiliknya menaruh gembok terbukanya di depan umum. Bertumpuk. Siapa pun boleh ambil. |
| kamu-mengunci | payoff | Kamu ambil satu, taruh suratmu di kotak, jepit gemboknya. Selesai. |
| terlambat | payoff | Sekarang kamu tidak bisa membukanya. Yang punya kuncinya cuma satu orang, dan itu bukan kamu. |
| lewat-siapa-pun | payoff | Kotaknya boleh lewat tangan siapa pun — bahkan orang yang memegang gembok terbuka yang sama persis tetap tidak bisa membukanya. |
| namanya | tutup | Nama menyusul gambarannya: mengunci isi supaya cuma pemegang kuncinya bisa membaca = enkripsi, dan gembok yang ditaruh di depan umum itu punya namanya sendiri. |
| loop | tutup | Balik ke kalimat pertama — kotak yang bisa dikunci tapi tidak bisa dibuka lagi, sekarang terdengar masuk akal. |

### Short 2 — Jebakan · 9 scene

**Mitos:** "Ada gemboknya, berarti situsnya aman."

| # | Bagian | Ringkas |
|---|---|---|
| mitos | mitos | Kalimatnya ditulis besar di layar apa adanya, dibaca datar tanpa dibantah dulu. Gembok kecil di sebelah alamat. |
| salah | bantahan | Dicoret. Gemboknya sendiri tidak bohong — yang salah cuma apa yang kita kira ia janjikan. |
| yang-dijanjikan | bantahan | Undangan: bayangkan kotak yang terkunci sepanjang jalan. Itu janji pertamanya — tidak ada yang membaca di tengah jalan. |
| dibuka-di-ujung | bukti | Tapi kotaknya tetap dibuka di ujung. Dan soal siapa yang berdiri di ujung itu, gembok tidak pernah berjanji apa-apa. |
| siapa-pun-punya | bukti | Gembok bisa dipasang siapa saja di kotaknya sendiri — termasuk yang memang berniat menipu. Memasangnya tidak sulit dan tidak mahal. |
| nama-yang-cocok | bukti | Janji keduanya cuma satu hal lagi: nama di kotaknya cocok dengan nama yang kamu tuju. Bukan bahwa nama itu jujur — dua nama bisa beda satu huruf. |
| yang-dibaca | konsekuensi | Jadi yang harus dibaca bukan gemboknya, tapi namanya — huruf per huruf, dari belakang. |
| tetap-berguna | konsekuensi | Bukan berarti gemboknya sia-sia: tanpa dia, apa pun yang kamu ketik terbaca semua orang yang menumpang jalan yang sama. |
| jadi | konsekuensi | Gembok menjawab "ada yang mengintip di jalan?", bukan "orang ini jujur?" — dua pertanyaan berbeda. CTA halus ke video panjang. |

## Catatan

**SUDAH DIPUTUSKAN 2026-08-14 — lolos sebagai T16, pilar P5.** Sudah masuk
[docs/07](../../docs/07-backlog-topik.md), rilis tepat di belakang T15, dan
baris "hashing vs enkripsi" **dicoret dari sudut T12** di dokumen yang sama.
Alasan kedua keputusan itu ditulis di sana, bukan di sini.

**Usulan scene di atas sudah dipindah ke `naskah.md`** dan di sanalah ia hidup
sekarang. Yang tinggal di berkas ini catatan kenapa scene-nya begitu, bukan
daftarnya.

**Batasnya dengan topik lain di backlog** — ini topik yang paling banyak
bersinggungan sejauh ini, jadi batasnya ditulis sebelum satu scene pun dibuat:

- **T12 · Apa yang terjadi saat password bocor** — paling rawan. T12 sekarang
  menulis "hashing **vs** enkripsi" di sudutnya. Batasnya: T12 memegang **sidik
  jari yang tidak bisa dibalik**, topik ini memegang **kotak yang memang
  dirancang untuk dibuka lagi**. **Diputuskan:** baris "hashing vs enkripsi"
  dicoret dari sudut T12, dan yang tersisa di sana satu kalimat pembeda — sidik
  jari tidak punya kunci, dan memang tidak dimaksudkan untuk dibalik.
- **T05 · Perjalanan satu alamat web** — T05 memakai "bersalaman rahasia"
  sebagai **ongkos**: satu perjalanan bolak-balik yang membuat kunjungan pertama
  lambat. Topik ini memegang **apa yang sebenarnya terjadi di dalam salaman itu**.
  Tidak ada scene di sini yang menghitung waktu bolak-balik.
- **T15 · Apa itu firewall** — bersambung rapi, tidak bertabrakan: penjaga T15
  **membaca label dan tidak pernah membuka kotaknya**, dan `label-tetap-terbaca`
  di sini menjelaskan kenapa labelnya memang harus tetap terbaca. Sambungan yang
  bagus untuk urutan rilis, bukan tumpang tindih.

**Urutan rilis — diputuskan: tepat setelah T15.** T15 menutup dengan penjaga
yang cuma membaca label, dan topik ini membuka dengan pertanyaan siapa yang bisa
membaca isinya. Harganya **tiga episode berturut-turut di lapis "umum → dev"**
(T14 → T15 → T16), diterima sadar. Kalau retensi T15 turun tajam, yang
disisipkan di antaranya T13 — bukan T16 yang dipindah ke belakang.

**Yang belum beres — semua sumber.** Tidak satu pun klaim boleh masuk naskah
sebelum punya baris `sumber:`, dan **tidak satu pun sudah dibuka**:

- **Kunci pembuka tidak pernah dikirim** (kesepakatan kunci) dan **gembok cuma
  dipakai di pembukaan** → RFC 8446 (TLS 1.3) adalah sumber primer yang tepat.
  Yang harus dibaca sendiri, bukan ditulis dari ingatan: apakah kunci masih
  pernah "diantar" dengan gembok di versi yang dipakai sekarang, atau selalu
  disusun berdua. Titik putus analogi #3 berdiri atau jatuh di jawaban itu.
- **Terkunci ≠ utuh** (segel) → dokumen NIST untuk mode enkripsi berotentikasi.
  Nama modenya jangan ditulis dari ingatan, dan di L1 ia tetap "segel".
- **Kunci yang dibuang** (kerahasiaan ke depan) → RFC 8446 lagi, bagian kunci
  sementara. Klaim "rekaman kemarin tidak bisa dibuka" harus dibaca persis
  batasnya sebelum diucapkan sekuat itu.
- **Gembok bisa dipasang siapa saja** (Short 2) → dokumen penerbit sertifikat
  gratis + dokumen validasi domain. Yang dibuktikan cuma "siapa pun bisa
  mendapatkannya untuk nama yang ia kuasai" — **jangan** menyebut berapa persen
  situs penipuan yang punya gembok tanpa membuka laporannya sendiri.
- **Dibuka di ujung** (`dibuka-di-ujung`) → whitepaper protokol aplikasi pesan
  yang bersangkutan. Ini bagian yang paling mudah salah dan paling mahal kalau
  salah: beda antara terkunci di jalan, terkunci sampai rumah penerima, dan
  terkunci saat tersimpan di rak adalah tiga hal berbeda, dan setelan
  cadangannya bisa mengubah jawabannya. Sebut nama aplikasi hanya kalau
  dokumennya sudah dibuka.
- **Jangan ada angka sama sekali di bagian 3–6.** Sama seperti T14 dan T15 —
  dan di topik ini godaannya paling besar: "butuh sekian miliar tahun untuk
  membobolnya". Angka seperti itu punya asumsi yang tidak pernah ikut disebut,
  dan basi. Kalau dipakai, tempatnya cuma `[case]`, dengan sumbernya.

**Peluang visual terkuat: satu kotak yang tidak pernah berganti bentuk sepanjang
episode.** Kotak yang sama berjalan dari tangan ke tangan (`hook-banyak-tangan`),
ditutup (`kotak-digembok`), digembok orang lain (`gembok-terbuka`), disegel
(`kotak-bisa-ditukar`), lalu akhirnya dibuka (`dibuka-di-ujung`). Yang berubah
cuma apa yang menempel padanya — dan penonton bisa membaca kemajuan episode dari
benda itu saja, tanpa satu kata pun.

Gerakan kedua: **kunci yang tidak pernah bergerak.** Sepanjang `[why]`, kamera
boleh berkali-kali kembali ke meja penerima dan kuncinya masih di sana, di
tempat yang sama persis. Diam adalah animasinya — dan itu yang membuat "kuncinya
tidak pernah lewat jalan" terasa, bukan cuma terdengar.
