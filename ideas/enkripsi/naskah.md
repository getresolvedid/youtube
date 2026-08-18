---
kode:
slug: enkripsi
judul_kerja: Apa itu enkripsi?
pilar: P5 · Keamanan & Privasi
lapis: umum
what: enkripsi
status: naskah
naskah_beku:
  L:  2026-08-18
  S1: 2026-08-18
  S2: 2026-08-18
  S3: 2026-08-18
  S4: 2026-08-18
karakter_terpakai: 0
tanggal_target:
---

# Enkripsi

> **SUDUTNYA SUDAH DIPUTUSKAN — sudut perjalanan.** Arahan animasi user
> 2026-08-17 (scene 3 sampai akhir) menetapkan seluruh episode: pesan diketik,
> berjalan lewat jaringan, ada yang bisa membacanya di jalan, lalu dikunci dan
> dibuka lagi di ujung. **Kotak sudut yang bertabrakan di versi berkas ini
> sebelumnya sudah tidak berlaku.**
>
> Akibatnya mengikat: **[ide.md](ide.md) sekarang bercerita tentang episode yang
> berbeda.** Sudut di sana — loker di gudang sewaan, hook tombol "Lupa
> password?", pertanyaan "kuncinya menginap di mana" — tidak ada satu pun yang
> dipakai. Berkas itu perlu ditulis ulang atau ditandai gugur; membiarkannya
> berarti dua sumber kebenaran yang akan dipercaya bergantian.

> **Kode topik masih kosong.** Topik ini belum ada di
> [docs/07](../../docs/07-backlog-topik.md) — ide-nya berstatus `diuji`, syarat 4
> belum lolos. `t17` yang dipakai di `src/Root.tsx` dan `tools/prefiks.mjs`
> **provisional**, dipakai karena id komposisi butuh awalan yang stabil sekarang.
> Yang pasti cuma satu: bukan T16, yang dibatalkan dan kodenya tidak dipakai ulang.

## Pemetaan ke flow 7 bagian

Flow wajib channel ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)).
Arahan user menyusun ceritanya sebagai **situasi → masalah → solusi → proses →
definisi**; tabel ini memetakannya ke tujuh bagian, dan **dua bagian memang tidak
terisi penuh** — dicatat apa adanya di bawah, bukan ditutupi.

| # | Bagian | Isi untuk topik ini |
|---|---|---|
| 1 | **[question]** | Pesan pendek diketik dan dikirim. Kamera ikut keluar dari HP: pesannya mengeras jadi paket dan berjalan di jalur. Ia berhenti di tengah — di kejauhan ada yang mengamatinya. |
| 2 | **brand opening** | Kartu judul standar, `OPENING_SECONDS` |
| 3 | **[problem]** | Adegannya diulang pelan-pelan, dari awal: percakapan dibuka, "Halo, apa kabar?" diketik, kirim ditekan. Pesannya berubah jadi paket dan masuk ke jaringan — melewati simpul demi simpul, bukan melompat langsung. Lalu masalahnya berdiri: ada pihak ketiga di jalur itu, dan di layarnya kalimat aslinya **terbaca utuh**. |
| 4 | **[answer] → [what]** | Kalimat itu dimasukkan ke satu kotak dan keluar dalam bentuk yang tidak terbaca. Tindakan itu namanya **enkripsi**. `[what]` = enkripsi, dinamai di sini, sekali. |
| 5 | **[why]** | Kenapa itu menyelesaikan bagian 3: paket yang sama berjalan di jaringan yang sama persis, melewati pengamat yang sama persis — dan sekarang yang terbaca di layarnya bukan kalimatnya. Lalu sisi lainnya: penerima **bisa** membukanya kembali, karena dia punya kuncinya. Yang dibuka lagi itu namanya **dekripsi**. |
| 6 | **[explaining]** | Seluruh rantainya disusun ulang jadi satu baris: kalimat → dikunci → tidak terbaca → jaringan → dibuka → kalimat. Lalu dua layar disandingkan: yang mengamati dan yang dituju, isi yang sama, terbaca berbeda. |
| 7 | **[case]** | Kartu definisi penutup. **Ini bukan `[case]` dalam arti docs/02** — lihat catatan di bawah. |

**Dua bagian yang tidak terisi, dan keduanya konsekuensi dari panjang yang
dipilih:**

- **`[explaining]` tidak memuat satu pun titik putus analogi.** docs/02
  memberinya tempat untuk hal-hal yang bikin gambarannya bocor — dan di topik ini
  daftarnya panjang: gembok tidak membuktikan siapa pemasangnya, terkunci tidak
  berarti utuh, label pengiriman tetap terbaca walau isinya tidak, dan kunci di
  sisi penerima itu datang dari mana. Arahan user secara eksplisit mengeluarkan
  yang terakhir (`Avoid introducing public/private keys`).
- **`[case]` diisi definisi, bukan kejadian nyata.** docs/02 memakai bagian 7
  untuk membawa penonton kembali ke dunianya — apa yang benar-benar terjadi, apa
  yang biasanya salah. Scene 10 justru menutup dengan kartu definisi, bentuk yang
  di dokumen yang sama disebut sebagai yang paling gampang dilupakan penonton.

Keduanya **dicatat, bukan diperbaiki diam-diam.** Yang menilai apakah harganya
sepadan dengan durasi 75 detik itu user, bukan berkas ini.

## Penjelasan 5 tahun

> Kamu menulis "Halo, apa kabar?" lalu menekan kirim. Kalimat itu tidak langsung
> muncul di HP temanmu — ia berjalan dulu, lewat banyak tempat. Di jalan, orang
> lain bisa membacanya. Jadi sebelum berangkat, kalimatnya diubah jadi sesuatu
> yang tidak bisa dibaca siapa pun, kecuali temanmu.

*(48 kata, nol istilah teknis.)*

**Analogi utama:** **kalimat yang berjalan sendiri di jalur bersimpul, lewat
depan orang yang bisa melihatnya.** Satu analogi untuk seluruh episode
([docs/09](../../docs/09-tangga-abstraksi.md) aturan 4) — tidak ada loker, tidak
ada gudang, tidak ada kurir.

**Yang sengaja diulang, dan itu inti arahan user:** jaringan yang sama, pengamat
yang sama, dan kalimat yang sama persis dipakai di bagian 3 dan bagian 5. Yang
berubah cuma **bentuk yang berjalan di atasnya** — dan perbandingan itulah
seluruh pelajarannya, tanpa satu kalimat penjelasan pun.

## Satu kalimat bawa-pulang

> Enkripsi tidak menyembunyikan bahwa kamu mengirim. Ia cuma memastikan yang
> lewat di jalan bukan kalimatmu.

*(Belum ada di naskah scene mana pun — scene 10 sekarang ditutup definisi. Kalau
`[case]` jadi diisi, ini kalimatnya.)*

## Naik tangga

| Tangga | Isi |
|---|---|
| **L1** | Kalimatmu berjalan lewat banyak tempat sebelum sampai. Di jalan ia bisa dibaca. Jadi ia dikunci dulu, dan cuma yang punya kuncinya bisa membukanya lagi. |
| **L2** | Mengunci dan membuka itu dua tindakan berbeda dengan nama sendiri — enkripsi dan dekripsi. Yang terkunci tetap berjalan di jaringan yang sama; yang berubah bentuknya, bukan jalannya. |
| **L3** | **KOSONG — dan ini yang membuat syarat 2 belum lolos.** Arahan user mengeluarkan kunci publik/privat, pertukaran kunci, dan nama algoritmanya secara eksplisit. Tanpa salah satu dari itu, tidak ada satu pun hal di episode ini yang tidak sudah diketahui developer. |

## Kamus istilah → L1

| Istilah | Kalimat L1 pembuka | Scene |
|---|---|---|
| enkripsi | "Enkripsi mengubah data yang dapat dibaca menjadi bentuk lain." | `enkripsi` |
| dekripsi | "Proses mengembalikan data terenkripsi menjadi bentuk yang dapat dibaca disebut dekripsi." | `dekripsi` |
| kunci | "…tanpa kunci yang tepat." | `enkripsi` |

## Sumber

Dibuka 2026-08-18. Ketiganya sumber primer, dan yang pertama menutup **dua**
klaim sekaligus.

| Klaim | Sumber | Status |
|---|---|---|
| Pesan melewati beberapa perangkat & jaringan sebelum sampai | **RFC 3552 §3.5** (BCP 72): *"In order for a datagram to be transmitted from one host to another, it generally must traverse some set of intermediate links and gateways."* · diperkuat **RFC 791 §2.2** (spesifikasi IP): *"The internet module determines from the internet address that the datagram is to be forwarded to another host in a second network."* | ✅ dibuka |
| Pihak di jalur bisa membaca isi yang tidak terlindungi | **RFC 3552 §3.5**, kalimat berikutnya: *"Such gateways are naturally able to read, modify, or remove any datagram transmitted along that path."* · konteksnya **RFC 7258** (BCP 188): *"The IETF community's technical assessment is that PM is an attack on the privacy of Internet users and organisations."* | ✅ dibuka |
| Enkripsi mengubah isi yang terbaca jadi bentuk yang tidak terbaca tanpa kunci | **NIST SP 800-133 Rev. 2** & **SP 800-57 Part 1 Rev. 5**: *"The process of changing plaintext into ciphertext using a cryptographic algorithm and key."* · **SP 800-38A**: *"The process of a confidentiality mode that transforms usable data into an unreadable form."* | ✅ dibuka |

**Klaim ketiga ditambahkan saat gerbangnya dibuka, dan itu perbaikan.** Sebelumnya
tabel ini cuma punya dua baris — padahal definisi yang diucapkan `10-definisi`
dan ditulis besar di kartu penutup adalah klaim juga, dan yang paling sering
dikutip ulang penonton. Definisi NIST-nya cocok dengan yang diucapkan video ini
tanpa perlu diubah.

**Yang TIDAK didukung sumber mana pun, dan karena itu tidak diucapkan:**

- **Berapa banyak perangkat yang dilewati.** RFC 3552 menulis *"some set of"* —
  tanpa angka, dan memang tidak ada angka yang benar untuk semua kiriman. VO
  berbunyi "beberapa perangkat", bukan "belasan".
- **Berapa lama enkripsi bertahan dipecahkan.** Tidak ada angka sama sekali di
  seluruh episode dan keempat Short. Ini godaan terbesar di topik ini ("butuh
  sekian miliar tahun"), dan angka seperti itu punya asumsi yang tidak pernah
  ikut disebut.
- **Nama algoritma.** Tidak disebut satu pun. Arahan animasi user mengeluarkannya
  secara eksplisit, dan tanpa nama algoritma tidak ada klaim yang perlu dibela.
- **`X7K9@2#L8$Q` bukan hasil enkripsi apa pun.** Ia lambang di layar, bukan
  keluaran algoritma — dan tidak ada satu kalimat pun di seluruh keluaran yang
  mengklaim sebaliknya.

> **GERBANG TERBUKA — 2026-08-18.** Tidak ada lagi baris ⚠, jadi naskah boleh
> dibekukan dan VO boleh digenerate
> ([docs/04 §5](../../docs/04-pipeline-produksi.md#5-gerbang--bekukan-naskah)).
> Bekunya per keluaran, tanggalnya di `naskah_beku` di kepala berkas ini.

## Kamus pengucapan

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| enkripsi | enkripsi | dibaca wajar |
| dekripsi | dekripsi | dibaca wajar; **jangan** dieja per huruf |
| HP | telepon genggam | dibaca **"ha-pe"**, bukan dieja "eitch-pi" dan bukan "handphone" |

**Kenapa "HP" didaftarkan alih-alih diganti "ponsel".** Ia dipakai sekali, di
`s4-dekripsi/1-masih-lambang`, dan `npm run vo-script-audit` menolaknya sebagai
tingkat A: akronim boleh ada **jika dan hanya jika** ada barisnya di tabel ini
(HARD RULE 4). Dua jalan keluarnya sama sahnya, dan yang dipilih yang **tidak
menyentuh satu baris VO pun** — mengganti katanya berarti menyunting naskah yang
sudah disetujui, dan tiap suntingan VO adalah kesempatan menggeser sesuatu yang
tidak sengaja.

Alasan kedua: **"HP" justru lebih L1 daripada "ponsel"**. Yang pertama yang
diucapkan orang; yang kedua kata tulis. Aturan akronim ada karena mesin TTS-nya
tidak bisa ditebak, bukan karena akronimnya buruk untuk penonton — dan tabel ini
persis mekanisme yang disediakan untuk itu.

> **Yang tersisa, dan ini belum beres:** Short 1 memakai "ponsel temanmu"
> (`2-keluar-layar`) sementara Short 4 memakai "HP temanmu". Dua kata untuk satu
> benda di satu seri. Bukan tingkat A dan tidak menghalangi pembekuan, tapi
> kalau nanti diseragamkan, **"HP" yang menang** — dan baris `2-keluar-layar`
> yang disunting, bukan sebaliknya.

---

## Video panjang

### Scene standar (tanpa VO)

| Scene | Isi | Posisi | Durasi |
|---|---|---|---|
| `opening` | kartu judul — **"Enkripsi"**, subjudul belum ditetapkan | bagian 2, setelah `pesan-dikirim` | `OPENING_SECONDS` |
| `closing` | tanda tangan brand, tanpa judul | setelah `definisi` | `CLOSING_LONG_SECONDS` |

Judulnya diatur di `Episode.tsx` (`JUDUL` + `SUBJUDUL`); `tools/bangun-timing.mjs`
yang menyisipkan kedua scene itu ke `timing.gen.ts`.

### Scene

**Daftar isi episode, bukan tempat kalimatnya hidup.** Teks VO tiap scene ada di
`scenes/<kunci>-vo.md` dan apa yang terjadi di layar di
`scenes/<kunci>-direction.md` (HARD RULE 3 & 4).

| # | Bagian | Ringkas |
|---|---|---|
| pesan-dikirim | 1 question | Satu sosok mengetik pesan pendek dan menekan kirim. Kamera ikut pesannya keluar, mengeras jadi paket, dan berjalan di jalur. Paket berhenti di tengah — di kejauhan ada yang mengamatinya. |
| mengirim-pesan | 3 problem | Kembali ke meja, kali ini pelan-pelan. Percakapan dibuka, "Halo, apa kabar?" diketik huruf demi huruf, kirim ditekan. Gelembungnya keluar dari layar dan mengeras jadi paket. |
| lewat-internet | 3 problem | Jaringannya tersingkap: simpul demi simpul, menyala satu per satu saat paketnya lewat. Pesannya tidak melompat — ia menempuh jalan. Kamera melambat di dekat HP penerima, lalu berhenti dengan satu pertanyaan. |
| bisa-dilihat | 3 problem | Ada yang ketiga di jalur itu — orang biasa di depan layar, bukan sosok bertudung. Kamera merapat ke layarnya, dan di sana kalimatnya terbaca utuh: "Halo, apa kabar?". Masalahnya bukan pengirimannya, tapi bahwa ia terbaca. |
| enkripsi | 4 answer | Kalimatnya masuk ke satu kotak, kotaknya menutup, dan yang keluar bukan kalimat lagi. Namanya jatuh di sini, sekali — dan gembok muncul di badan paketnya. |
| terkunci-di-jalan | 5 why | Paket yang sama, jaringan yang sama, pengamat yang sama persis — dan sekarang yang terbaca di layarnya bukan kalimatnya. Perbandingan itu yang bekerja, bukan penjelasannya. |
| dekripsi | 5 why | Sampai di HP penerima, yang tampil masih bentuk terkunci. Satu kunci muncul, kotaknya berjalan mundur, dan kalimatnya kembali utuh. Yang dibuka lagi itu namanya dekripsi. |
| ringkasan | 6 explaining | Seluruh rantainya disusun jadi satu baris mendatar, dibangun sepotong demi sepotong. Lalu dua layar disandingkan: yang mengamati dan yang dituju, isi yang sama, terbaca berbeda. |
| definisi | 7 case | Kartu penutup: gembok di tengah, dikelilingi benda-benda yang isinya lewat jalan yang sama, lalu definisinya. |

**Kalau kepanjangan, yang dipangkas duluan `ringkasan`** — ia `[explaining]`, dan
docs/02 mematok `[explaining]` sebagai yang pertama dipotong. Yang **tidak boleh
disentuh**: `terkunci-di-jalan`, karena seluruh pelajaran episode ini ada di
perbandingannya dengan `bisa-dilihat`; membuangnya menyisakan definisi tanpa
bukti.

**Kalau bagian 3 terasa berlarut, yang digabung `mengirim-pesan` + `lewat-internet`**
— bukan dibuang. `bisa-dilihat` tidak pernah digabung: di situlah masalahnya lahir.

### Timing — estimasi

Keluaran `npm run gen`. Opening dan closing sudah ikut terhitung di sana.

> **Arahan user mematok ±1 menit 15 detik untuk scene 3–10; hitungannya keluar
> lebih panjang.** Naskah VO-nya ±200 kata pada `VO_WORDS_PER_MINUTE`, ditambah
> `VO_PAD_SECONDS` per scene dan hook + kartu judul + penutup di depan-belakang.
> Angkanya tidak diketik di mana pun — `npm run gen` yang mencetaknya. Kalau 75
> detik memang target, yang dipotong kalimatnya.

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Empat Short — BENTUK SERIAL

Topik ini memakai **bentuk kedua** di
[docs/02 § Anatomi Shorts](../../docs/02-format-video.md#bentuk-kedua-serial):
keempat Short menceritakan satu cerita berurutan, satu babak per Short. Bukan
empat peran yang berdiri sendiri.

| # | Judul kerja | Babaknya | Pertanyaan yang dijawab |
|---|---|---|---|
| S1 | Apa yang terjadi pada pesanmu? | perjalanan | Apa yang sebenarnya terjadi setelah kamu menekan kirim? |
| S2 | Apa ada yang bisa melihatnya? | masalah | Bagaimana kalau orang lain bisa melihat isinya? |
| S3 | Bagaimana enkripsi bekerja? | jalan keluar | Bagaimana enkripsi melindunginya? |
| S4 | Bagaimana penerima membacanya? | jawaban | Bagaimana yang terkunci bisa terbaca lagi? |

**Syarat keras bentuk serial dipenuhi di sini: sepuluh detik pertama tiap Short
berdiri sendiri.** Arahan user menulis pembuka S2 sebagai *"Di video sebelumnya,
kita melihat…"* dan pembuka S3 sebagai *"Bagaimana kalau pesan ini diubah…"* —
keduanya mengandaikan penonton sudah menonton Short sebelumnya, dan feed Shorts
tidak menyediakan urutan itu. **Diputuskan user 2026-08-17:** isi dan urutan
ceritanya dipakai apa adanya, yang disesuaikan cuma frasa pembuka tiap Short
supaya bendanya diperkenalkan ulang sekali dalam satu frasa. Perubahannya
ditulis di `## Catatan` rencana VO scene pertama masing-masing Short, bukan
disembunyikan.

**Yang dipakai bersama keempatnya** (arahan user § Continuity): pengirim,
penerima, pengamat, HP, layar meja, jaringan, kalimat `"Halo, apa kabar?"`, dan
bentuk terkuncinya `X7K9@2#L8$Q`. Komponennya dari `../panggung-kiriman.tsx`,
koordinat 9:16-nya dari `scene-shorts/panggung-short.tsx` — **satu berkas untuk
keempat Short**, karena jaringan yang digambar ulang per Short akan berbeda
tanpa disengaja, dan seluruh perbandingan S1↔S3 bertumpu pada keduanya identik.

---

## Short 1 — T17-S1 · "Apa yang terjadi pada pesanmu?"

**Babak:** perjalanan. **Belum menyebut enkripsi sama sekali.**
**Target user:** ±35–40 dtk
**Berkas:** `scene-shorts/s1-perjalanan/` — id komposisi `t17-s1-…`, Short
utuhnya `T17-enkripsi-s1`.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| ketik-kirim | hook | Dekat ke HP. Percakapan terbuka, "Halo, apa kabar?" diketik huruf demi huruf. Pertanyaannya jatuh di frame pertama. |
| keluar-layar | ketegangan | Kirim ditekan. Gelembungnya naik, menyeberangi tepi layar, dan mengeras jadi paket di luar sana. |
| masuk-jaringan | payoff | Jaringan tersingkap — simpul demi simpul, menyala saat paketnya lewat. |
| perjalanan | payoff | Paketnya menempuh jalur dari simpul ke simpul. Yang ditunjukkan cuma satu hal: ia berjalan, tidak melompat. |
| sampai | payoff | HP penerima di ujung. Paket masuk, dan kalimatnya muncul utuh di percakapannya. |
| aman-tidak | tutup | Kamera mundur: pengirim, jaringan, penerima. Lalu satu sosok lagi terlihat di luar jalur — tidak dijelaskan. Pertanyaan penutup menggantung. |

## Short 2 — T17-S2 · "Apa ada yang bisa melihatnya?"

**Babak:** masalah. **Target user:** ±35–40 dtk · **hitungan:** ±30,4 dtk
**Berkas:** `scene-shorts/s2-bisa-dilihat/` — Short utuh `T17-enkripsi-s2`.

**Pembukanya ditulis ulang.** Arahan user membuka dengan *"Di video sebelumnya,
kita melihat bagaimana sebuah pesan berjalan melalui internet"* — itu memberi
tahu penonton bahwa ia terlambat, dan penonton yang merasa terlambat menggeser
(docs/02 § SERIAL). Yang dipakai: bendanya diperkenalkan ulang dalam satu frasa,
tanpa menyebut video sebelumnya. Gambarnya tetap sama persis — jaringan yang
sama, paket yang sama.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| jalan-terus | hook | Jaringan yang sama, paket yang sama, masih berjalan turun. Diperkenalkan ulang dalam satu frasa — bukan "di video sebelumnya". |
| ada-yang-lihat | ketegangan | Sosok ketiga tersingkap di samping jalur, di depan layarnya. Bukan bertudung, bukan ruang gelap. |
| terbaca | payoff | Kamera merapat ke layarnya. Paket terbuka, dan "Halo, apa kabar?" terbaca utuh. Ditahan. |
| mestinya-berdua | payoff | Mundur: pengirim, pengamat, penerima terlihat sekaligus. Yang di tengah bukan tujuannya. |
| pertanyaan | tutup | Semua lenyap kecuali kalimatnya, dikelilingi garis yang mulai terbentuk. |
| jawabannya | tutup | Garisnya menutup jadi gembok. Namanya jatuh: enkripsi. Berhenti persis di situ. |

## Short 3 — T17-S3 · "Bagaimana enkripsi bekerja?"

**Babak:** jalan keluar. **`[what]` dinamai di sini.**
**Target user:** ±35–45 dtk · **hitungan:** ±41,4 dtk
**Berkas:** `scene-shorts/s3-cara-kerja/` — Short utuh `T17-enkripsi-s3`.

**Pembukanya ditulis ulang.** Arahan user membuka dengan *"Bagaimana kalau pesan
ini diubah…"* — "pesan ini" mengandaikan penonton sudah menonton Short 2.
Diganti jadi frasa yang memperkenalkan bendanya sendiri.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| kalau-diubah | hook | Kalimatnya di tengah, dan satu sosok mengamati di latar. Klaimnya jatuh sebagai pertanyaan. |
| enkripsi | payoff | Kotak ENKRIPSI menutup di sekelilingnya, lalu isinya berganti jadi deretan lambang. |
| dikirim | payoff | Paket bergembok keluar dan turun ke jaringan yang sama persis dengan Short 1. |
| yang-terlihat | payoff | Pengamat yang sama, layar yang sama, gerak kamera yang sama — dan yang tampil sekarang lambang. |
| banding | payoff | Layar terbelah: kiri tanpa enkripsi, kanan dengan enkripsi. Ditahan. |
| gimana-bacanya | tutup | Paketnya sampai di HP penerima, isinya masih lambang. Pertanyaan penutup menggantung. |

## Short 4 — T17-S4 · "Bagaimana penerima membacanya?"

**Babak:** jawaban. **Target user:** ±35–45 dtk · **hitungan:** ±48,5 dtk
**Berkas:** `scene-shorts/s4-dekripsi/` — Short utuh `T17-enkripsi-s4`.

**Pembukanya ditulis ulang** dengan alasan yang sama: arahan user membuka dengan
*"Data yang sampai ke penerima…"* tanpa pernah menyebut pesan apa.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| masih-lambang | hook | HP penerima, isinya deretan lambang. Bendanya diperkenalkan dalam satu frasa. |
| kunci | ketegangan | Satu kunci mendekat dari sisi penerima — bukan dari jalur. |
| dekripsi | payoff | Kotak DEKRIPSI berjalan mundur; lambangnya kembali jadi kalimatnya, dan penerimanya membacanya. |
| rantai | payoff | Seluruh rantainya dibangun sepotong demi sepotong: kalimat → dikunci → lambang → jaringan → dibuka → kalimat. |
| dua-layar | payoff | Layar pengamat dan layar penerima disandingkan. Isi yang sama, terbaca berbeda. Ini bayaran seluruh seri. |
| definisi | tutup | Gembok besar mengunci satu ikon isi, lalu definisinya. |

> **Ketiganya memakai `panggung-short.tsx` yang sama persis** — jaringan, tempat
> duduk pengamat, dan kedua HP di koordinat yang identik. Itu bukan kerapian:
> seluruh perbandingan S1 ↔ S3 ↔ S4 bertumpu pada penonton mengenali tempat yang
> sama. Satu Short yang menggeser jaringannya sendiri membatalkan seri ini.
