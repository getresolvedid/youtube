---
kode: T15
slug: apa-itu-firewall
judul_kerja: Kenapa orang asing tidak bisa masuk ke komputermu?
pilar: P5 · Keamanan & Privasi
lapis: umum → dev
what: firewall
status: naskah
naskah_beku:
  L:
  S1:
  S2:
karakter_terpakai: 0
tanggal_target:
---

# T15 · Apa itu firewall

Disusun mengikuti **flow 7 bagian** ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)).

| # | Bagian | Isi |
|---|---|---|
| 1 | **[question]** | Layarmu tenang, halamannya terbuka biasa saja. Di sisi luarnya ada yang mengetuk terus-menerus, dan tidak satu pun sampai ke layarmu. Siapa yang menahan mereka? |
| 2 | **brand opening** | kartu judul standar |
| 3 | **[problem]** | Supaya bisa **dipakai**, mesinmu harus bisa **dihubungi** — sebagian pintunya memang harus bisa diketuk, dan siapa pun boleh mengetuknya. Jalan keluar yang paling masuk akal, kunci semua pintu, gagal di depan mata: kiriman yang kamu pesan sendiri juga datang dari luar lewat pintu yang sama. Dari sana, jawaban yang kamu tunggu dan orang asing terlihat sama persis. |
| 4 | **[answer] → [what]** | Yang kurang bukan kuncinya, tapi **seseorang yang memilih**. Satu penjaga di depan pintu, satu daftar, tiap yang datang dicocokkan. Penjaganya = **firewall**. |
| 5 | **[why]** | Dua sebab: **buku catatan** — tiap kali kamu mengirim keluar ia menulis satu baris, dan cuma yang cocok dengan baris itu yang boleh pulang masuk; dan **baris terakhir daftarnya** yang berbunyi "selain itu, tidak", yang membuat penjaga tidak perlu hafal siapa saja yang harus ditolak. |
| 6 | **[explaining]** | Daftarnya dibaca dari atas dan berhenti di baris pertama yang cocok · dua cara menolak: menjawab, atau diam · penjaganya berdiri dua arah, dan arah keluar nyaris tidak pernah dilihat orang · ia membaca label, tidak pernah membuka kotaknya · penjaganya lebih dari satu, dan daftarnya bisa berbeda. |
| 7 | **[case]** | Kamu sendiri yang menunjuk satu pintu dan menyuruh penjaga mengantar tamu ke sana — dan pintu itu terbuka untuk semua orang, bukan cuma untuk temanmu. Lalu pintu yang paling sering dipakai: yang dibuka **dari dalam**, oleh kamu, dengan barisnya sendiri di buku catatan. |

## Penjelasan 5 tahun

> Rumahmu punya banyak pintu. Supaya bisa menerima kiriman, sebagian harus bisa
> diketuk — dan siapa pun boleh mengetuk. Jadi ditaruh satu penjaga di depan,
> dengan daftar siapa yang boleh lewat. Ia juga mencatat tiap kiriman yang kamu
> pesan sendiri, supaya cuma jawaban yang kamu tunggu yang boleh masuk. Sisanya
> tidak dijawab.

*(50 kata, nol istilah teknis.)*

**Analogi utama:** satu **penjaga di depan gedung berpintu banyak**, dengan
daftar aturan dan buku catatan. Satu analogi untuk seluruh episode
([docs/09](../../docs/09-tangga-abstraksi.md) aturan 4) — tidak ada tembok api,
tidak ada perisai, tidak ada benteng.

**Nama "firewall" berarti dinding, dan dinding adalah gambaran yang salah.**
Dinding tidak memilih, dan seluruh episode ini soal memilih. Karena itu dinding
muncul tepat satu kali, di `dikunci-semua`, sebagai **jalan yang ditutup** —
persis peran "buku besar" di T14.

**Titik putus analogi** — ketiganya wajib disebut di VO, bukan cuma dicatat di sini:

1. **Penjaganya tidak pernah membuka kotaknya.** Ia cuma membaca label: dari
   mana, ke pintu nomor berapa (`label-bukan-isi`).
2. **Buku catatannya cuma berisi percakapan yang kamu mulai sendiri.** Apa pun
   yang kamu undang sudah punya barisnya di sana, dan penjaga minggir
   (`diundang-masuk`).
3. **Penjaganya bukan satu orang.** Ada beberapa, berlapis, dan yang satu bisa
   mengizinkan apa yang ditolak yang lain (`banyak-penjaga`).

## Satu kalimat bawa-pulang

> Firewall menjaga pintu yang tidak pernah kamu buka. Dan itu banyak. Tapi pintu
> yang kamu buka sendiri, tetap tanggung jawabmu sendiri.

## Naik tangga

| Tangga | Isi |
|---|---|
| **L1** | Gedungmu punya banyak pintu bernomor, dan siapa pun boleh mengetuk. Ada penjaga di depan dengan daftar. Ia mencatat tiap kiriman yang kamu pesan, supaya cuma jawabannya yang boleh masuk. |
| **L2** | Daftar dibaca berurutan dan berhenti di baris pertama yang cocok. Baris terakhirnya menolak apa pun yang tidak disebut. Menolak bisa dengan menjawab atau dengan diam. Arah keluar diperiksa dengan daftar yang terpisah. |
| **L3** | Kenapa pencatatan percakapan yang kamu mulai itu yang membuat "tertutup dari luar tapi tetap bisa dipakai" mungkin sama sekali; kenapa satu baris longgar di paling atas mematikan seluruh daftar di bawahnya; kenapa memeriksa isi kiriman adalah pekerjaan yang berbeda, jauh lebih lambat, dan dilakukan benda yang lain. |

## Kamus istilah → L1

| Istilah | Kalimat L1 pembuka | Scene |
|---|---|---|
| pintu bernomor | "Ada banyak pintu di situ, dan tiap pintu punya nomor." | `pintu-bernomor` |
| ketukan dari luar | "Siapa pun, dari mana pun, boleh datang dan mencoba satu per satu." | `siapa-pun-mengetuk` |
| firewall | "Penjaga di depan pintu itu namanya firewall." | `penjaga` |
| pencatatan percakapan | "Tiap kali kamu mengirim sesuatu keluar, dia menulis satu baris." | `buku-catatan` |
| tolak sebagai bawaan | "Selain yang di atas, tidak boleh." | `baris-terakhir` |
| urutan aturan | "Begitu ketemu baris yang cocok, dia berhenti di situ." | `dari-atas` |
| menolak vs mendiamkan | "Cara kedua, dia tidak menjawab apa pun." | `diam` |
| arah keluar | "Dia berdiri untuk dua arah." | `keluar-juga` |
| batas pemeriksaan | "Kotaknya tidak pernah dibuka." | `label-bukan-isi` |
| penjaga berlapis | "Ada satu di gerbang depan, ada satu lagi di pintu rumahmu sendiri." | `banyak-penjaga` |
| pintu yang dibuka sendiri | "Kamu tunjuk pintunya, dan kamu minta tamu diantar ke sana." | `pintu-dibuka-sendiri` |

## Sumber

| Klaim | Sumber | Status |
|---|---|---|
| Penjaga mencatat percakapan yang kamu mulai, dan balasan yang cocok dengan catatan itu yang boleh masuk | dokumen netfilter/nftables (sisi Linux) · dokumen Windows Defender Firewall (sisi desktop) | ⚠ **belum dibuka** |
| Daftar dibaca berurutan dan berhenti di baris pertama yang cocok | dokumen yang sama | ⚠ **belum dibuka** |
| Menolak dengan menjawab dan menolak dengan diam meninggalkan jejak yang berbeda bagi yang mengetuk | dokumentasi nmap tentang status port — sumber yang tepat karena ia menjelaskan apa yang **teramati** dari sisi pengetuk | ⚠ **belum dibuka, nama statusnya jangan ditulis dari ingatan** |
| Arah masuk ditolak sebagai bawaan, dan pencatatannya otomatis | dokumen security group cloud | ⚠ **belum dibuka** |
| Memeriksa isi kiriman adalah pekerjaan terpisah dan jauh lebih lambat | belum ditentukan | ⚠ **belum ada sumber — kalau tidak ketemu, kalimat "jauh lebih lambat" dicoret dari `label-bukan-isi`** |

> **GERBANG MASIH TERTUTUP.** Naskah ini **tidak boleh dibekukan** dan VO-nya
> **tidak boleh digenerate** selama masih ada baris ⚠ di atas
> ([docs/04 §5](../../docs/04-pipeline-produksi.md#5-gerbang--bekukan-naskah)).
>
> **Tapi gerbang itu tidak menahan komposisinya**, sama seperti T14: seluruh
> rencana VO episode ini ditulis **tanpa satu pun angka**. Bukan karena kehabisan
> bahan — waktu tunggu ketukan, jumlah percobaan per hari, dan jumlah pintu
> semuanya menggoda — tapi karena angka di bagian 3 sampai 6 memang tidak bisa
> dibayangkan siapa pun ([docs/09](../../docs/09-tangga-abstraksi.md)).
>
> **Nomor pintu di layar bukan angka yang mengklaim apa pun.** Ia sengaja
> dinomori satu sampai delapan, bukan nomor pintu yang sebenarnya dipakai
> internet — begitu nomor asli muncul di layar, ia jadi klaim yang butuh baris
> `sumber:` dan tidak menambah apa pun yang tidak sudah dikatakan "tiap pintu
> punya nomor".

## Kamus pengucapan

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| firewall | firewall | dibaca wajar; **jangan** dieja per huruf |
| pintu | port | benda L1-nya. Kata "port" tidak pernah muncul di VO |
| penjaga | firewall | nama resminya cuma jatuh di `penjaga` dan `diundang-masuk` |
| daftar | rule set | tidak pernah disebut "aturan firewall" |
| buku catatan | connection tracking | disebut "buku catatan" sepanjang episode |

---

## Video panjang — T15-L

### Scene standar (tanpa VO)

| Scene | Isi | Posisi | Durasi |
|---|---|---|---|
| `opening` | kartu judul — **"Firewall" / "Penjaga di depan pintu"** | bagian 2, setelah `hook-mengetuk` | `OPENING_SECONDS` |
| `closing` | tanda tangan brand, tanpa judul | setelah `diundang-masuk` | `CLOSING_LONG_SECONDS` |

Judulnya diatur di `Episode.tsx` (`JUDUL` + `SUBJUDUL`); `tools/bangun-timing.mjs`
yang menyisipkan kedua scene itu ke `timing.gen.ts`.

> **Kartu judul menulis "Firewall" di sekitar detik dua puluh, dan itu
> disengaja** — sama seperti T14. Yang dilarang HARD RULE 6 adalah **VO**
> yang menyebut nama sebelum bendanya berdiri, bukan kartu judulnya. Karena itu
> penamaan di `penjaga` ditulis sebagai penegasan atas benda yang sudah berdiri,
> bukan sebagai perkenalan.
>
> **Subjudulnya bukan kepanjangan.** "Firewall" tidak punya kepanjangan, jadi
> baris kedua kartu dipakai untuk menaruh gambaran L1-nya lebih dulu — dan itu
> satu-satunya tempat kata "penjaga" bertemu kata "firewall" sebelum scene 6.

### Scene

**Daftar isi episode, bukan tempat kalimatnya hidup.** Teks VO tiap scene ada di
`scenes/<kunci>-vo.md` dan apa yang terjadi di layar di
`scenes/<kunci>-direction.md` (HARD RULE 3 & 4).

| # | Bagian | Ringkas |
|---|---|---|
| hook-mengetuk | 1 question | Layar tenang, halaman terbuka biasa saja. Kamera mundur: mesinnya ternyata sebuah gedung, dan di luar ada yang mengetuk terus-menerus tanpa satu pun tembus. |
| pintu-bernomor | 3 problem | Dinding luarnya didekati. Banyak pintu bernomor; sebagian besar terkunci dan kosong, tapi beberapa memang harus bisa diketuk supaya gedungnya berguna. |
| siapa-pun-mengetuk | 3 problem | Pintu yang bisa diketuk bisa diketuk siapa saja. Ketukan menyusuri nomor pintu satu per satu, sepanjang malam, tanpa terdengar dari dalam. |
| dikunci-semua | 3 problem | Jalan keluar yang paling masuk akal dicoba: kunci semua. Lalu gagal di depan mata — kiriman yang dipesan sendiri ikut tertahan, dan dari luar ia terlihat sama persis dengan orang asing. |
| penjaga | 4 answer | Yang kurang bukan kunci, tapi yang memilih. Satu penjaga, satu daftar, tiap yang datang dicocokkan. Namanya jatuh di sini, sekali. |
| buku-catatan | 5 why | Bagaimana penjaga membedakan yang tidak bisa dibedakan: tiap kiriman keluar ditulis satu baris, dan yang pulang tanpa baris bukan jawaban siapa-siapa. |
| baris-terakhir | 5 why | Baris paling bawah daftarnya berbunyi "selain itu, tidak" — itu yang membuat penjaga tidak perlu hafal siapa saja yang jahat. |
| dari-atas | 6 explaining | Daftar dibaca dari atas dan berhenti di baris pertama yang cocok. Satu baris longgar diselipkan di puncak, dan seluruh sisa daftar berhenti berlaku. |
| diam | 6 explaining | Dua cara menolak disandingkan: menjawab "tidak", atau tidak menjawab sama sekali. Yang pertama memulangkan pengetuk dengan satu keterangan gratis. |
| keluar-juga | 6 explaining | Penjaganya diputar badannya. Ia berdiri dua arah, dan yang keluar nyaris tidak pernah diperiksa siapa pun. |
| label-bukan-isi | 6 explaining | Kotak sampai di depan penjaga: labelnya dibaca, kotaknya tidak pernah dibuka. Di situ munculnya jenis penjaga kedua yang tugasnya memang membuka. |
| banyak-penjaga | 6 explaining | Kamera mundur lagi: penjaga di gerbang komplek, penjaga di pintu rumah sendiri, penjaga di depan tiap kamar. Daftarnya bisa berbeda dan mereka tidak saling bertanya. |
| pintu-dibuka-sendiri | 7 case | Kamu sendiri yang menunjuk satu pintu dan menyuruh tamu diantar ke sana. Sejak itu pintunya terbuka untuk semua orang, bukan cuma untuk yang kamu maksud. |
| diundang-masuk | 7 case | Pintu yang paling sering dipakai dibuka dari dalam. Bukunya cocok karena kamu yang menulis barisnya. Ditutup kalimat bawa-pulang. |

**Kalau kepanjangan, yang dipangkas duluan `banyak-penjaga`, lalu `keluar-juga`**
— keduanya `[explaining]`, dan docs/02 mematok `[explaining]` sebagai yang
pertama dipotong. `buku-catatan` dan `baris-terakhir` tidak boleh disentuh:
keduanya seluruh isi `[why]`.

### Timing — estimasi

Keluaran `npm run gen`. Opening dan closing sudah ikut terhitung di sana.

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 1 — T15-S1 · "Nugget"

**Insight:** cara paling aman menjawab ketukan adalah tidak menjawab.
**Target:** 40–60 dtk · ~115 kata · L1
**Berkas:** `scene-shorts/s1-nugget/` — id komposisi `s1-01-…`, Short utuh `T15-apa-itu-firewall-s1`.

> **FASE 2 — BELUM DIGARAP.** Tabel di bawah ini rencana, bukan produksi. Yang
> menentukan sebuah Short ada adalah **subfoldernya**, dan subfolder itu belum
> dibuat: selama belum ada, `npm run gen` tidak membaca bagian ini sama sekali
> ([docs/02 § Di mana berkasnya](../../docs/02-format-video.md)). Video panjang
> tuntas dulu (CLAUDE.md § Fase kerja satu topik).

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| dua-pintu | hook | Dua pintu bersebelahan, sama-sama tidak boleh dimasuki. Klaimnya jatuh di frame pertama: yang satu sudah membocorkan sesuatu. |
| ditolak | hook | Pintu pertama menjawab: tidak boleh. Ketukan berhenti, kelihatannya beres. |
| sudah-tahu | ketegangan | Pengetuknya pulang membawa satu hal — pintunya ada, dan ada yang menjaganya. Satu titik di petanya terisi. |
| diam | payoff | Undangan: sekarang pintu kedua. Diketuk, dan tidak terjadi apa-apa sama sekali. |
| menunggu | payoff | Pengetuknya berdiri, mengulang, menunggu lagi. Tidak ada apa pun yang bisa disimpulkan. |
| seribu-pintu | payoff | Dikalikan banyak pintu: yang menjawab selesai sekejap, yang diam memakan waktu tunggu satu per satu. |
| peta-kosong | tutup | Hasil akhirnya disandingkan: satu peta terisi rapi, satu peta kosong. |
| namanya | tutup | Nama menyusul gambarannya: yang memutuskan menjawab atau diam itu firewall. |
| loop | tutup | Balik ke dua pintu — kalimat penutup menyambung ke frame pertama supaya loop-nya mulus. |

## Short 2 — T15-S2 · "Jebakan"

**Mitos:** "Sudah ada firewall, jadi aman dari virus."
**Target:** 40–60 dtk · ~115 kata · L1
**Berkas:** `scene-shorts/s2-jebakan/` — id komposisi `s2-01-…`, Short utuh `T15-apa-itu-firewall-s2`.

> **FASE 2 — BELUM DIGARAP.** Sama seperti Short 1.

Insightnya **berbeda dari Short 1** dan tidak bisa saling menggantikan: S1 soal
*cara menolak*, S2 soal *apa yang memang tidak pernah diperiksa*.

> **Nama "firewall" jatuh di detik nol, dan itu pengecualian yang disengaja**
> (HARD RULE 6 · [docs/02 § Aturan Shorts](../../docs/02-format-video.md)).
> Mitosnya sendiri berbunyi dengan nama itu; menuliskannya ulang tanpa namanya
> bukan lagi mitos yang dipercaya orang.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| mitos | mitos | Kalimatnya ditulis besar di layar apa adanya, dibaca datar tanpa dibantah dulu. |
| salah | bantahan | Dicoret. Penjaganya memang berdiri, tapi ada satu hal yang tidak pernah ia lakukan. |
| label | bantahan | Undangan: tiap kotak yang datang diperiksa di depan pintu. Labelnya dibaca. |
| tidak-dibuka | bukti | Kotaknya tidak pernah dibuka. Alamat benar, pintu benar, lewat. |
| kamu-yang-minta | bukti | Kotak yang paling sering jadi masalah bukan yang mengetuk. Ia yang kamu pesan sendiri. |
| catatan-cocok | bukti | Bukunya cocok, jadi pintunya dibuka. Itu bukan kebobolan, itu aturannya bekerja. |
| bukan-tugasnya | konsekuensi | Membuka kotak itu pekerjaan lain, oleh pemeriksa lain. Dua tugas yang sering dikira satu. |
| yang-dijaga | konsekuensi | Yang benar-benar dijaga: semua pintu yang tidak pernah kamu buka. Itu banyak, dan itu berharga. |
| jadi | konsekuensi | Firewall bukan tidak berguna, ia cuma menjawab pertanyaan yang berbeda. CTA halus ke video panjang. |
