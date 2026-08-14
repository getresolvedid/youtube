---
judul: Apa itu firewall
diusulkan: 2026-08-14
pilar: P5 · Keamanan & Privasi
lapis: umum → dev
status: lolos → T15
---

# Apa itu firewall

## Ide mentah

> "apa itu firewall"

## Pemetaan ke flow 7 bagian

Flow wajib channel ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)):

| # | Bagian | Isi untuk topik ini |
|---|---|---|
| 1 | **[question]** | "Komputermu tersambung ke internet sekarang juga. Kenapa orang asing tidak bisa langsung masuk?" |
| 2 | **brand opening** | Sting standar 4,0 dtk |
| 3 | **[problem]** | Untuk bisa **memakai** internet, mesinmu harus bisa **dihubungi** — ia punya alamat, dan alamat itu punya banyak pintu bernomor. Siapa pun di dunia boleh mengetuk pintu mana pun, kapan pun, tanpa kamu tahu. Jalan keluar yang paling masuk akal — kunci semua pintu — gagal di depan mata: barang yang **kamu pesan sendiri** juga datang dari luar, lewat pintu yang sama. Dari luar, kiriman yang kamu tunggu dan orang asing yang mengetuk **terlihat sama persis**. |
| 4 | **[answer] → [what]** | Kalau tidak bisa dikunci semua, ditaruh **seseorang di depan pintu**. Tiap yang datang dicocokkan ke daftar aturan; yang tidak cocok tidak masuk. Penjaganya = **firewall**. `[what]` = firewall. |
| 5 | **[why]** | Dua sebab, keduanya harus terasa sebagai *solusi atas masalah di bagian 3*: **(a) penjaganya punya buku catatan** — tiap kali kamu mengirim keluar, ia mencatat; yang boleh masuk cuma jawaban yang cocok dengan catatan itu. Itulah yang membedakan kiriman yang kamu tunggu dari orang asing, sesuatu yang tidak bisa dibedakan dari tampangnya. **(b) baris terakhir daftarnya berbunyi "selain itu, tidak"** — kekuatan penjaga bukan pada yang ia izinkan, tapi pada yang ia tolak tanpa perlu disebut satu per satu. |
| 6 | **[explaining]** | Daftarnya dibaca **dari atas** dan berhenti di baris pertama yang cocok — satu baris longgar di paling atas membuat sisanya tidak pernah terbaca · dua cara menolak: **bilang "tidak"** vs **diam sama sekali**, dan kenapa diam jauh lebih mahal untuk yang mengetuk · penjaganya berdiri **dua arah** — yang paling sering dilupakan bukan siapa yang masuk, tapi apa yang keluar · penjaga **membaca label, tidak membuka kotaknya**; kotak beralamat benar lewat apa pun isinya (dan itu sebabnya ada jenis penjaga kedua yang tugasnya memang membuka) · **penjaganya lebih dari satu** — di gerbang komplek, di pintu rumah sendiri, dan di gedung sewaan satu di depan tiap kamar; ketiganya bisa tidak sepakat. |
| 7 | **[case]** | Kamu sendiri yang menyuruh penjaga mengantar orang asing ke satu pintu — CCTV, server game, "port forward" — dan sejak itu pintunya terbuka untuk **seluruh dunia**, bukan cuma untukmu · penjaga minggir untuk siapa pun yang **kamu undang**: kamu klik, kamu pasang, catatannya cocok, pintunya dibuka. Itu bukan kebobolan, itu justru aturannya bekerja · kalimat bawa-pulang balik ke L1. |

## Penjelasan 5 tahun

> Rumahmu punya banyak pintu. Supaya bisa menerima kiriman, sebagian harus bisa
> diketuk — dan siapa pun boleh mengetuk. Jadi ditaruh satu penjaga di depan,
> dengan daftar siapa yang boleh lewat. Ia juga mencatat tiap kiriman yang kamu
> pesan sendiri, supaya cuma jawaban yang kamu tunggu yang boleh masuk. Sisanya
> tidak dijawab.

*(50 kata, nol istilah teknis.)*

**Analogi utama:** **satu penjaga di depan gedung berpintu banyak, dengan daftar
aturan dan buku catatan.** Satu analogi untuk seluruh episode
([docs/09](../../docs/09-tangga-abstraksi.md) aturan 4) — tidak ada tembok api,
tidak ada perisai, tidak ada benteng. Nama "firewall" memang berarti dinding,
tapi **dinding adalah gambaran yang salah**: dinding tidak memilih, dan seluruh
episode ini soal memilih. Dinding boleh muncul sekali sebagai jalan yang ditutup
(`dikunci-semua`), bukan sebagai gambaran tandingan.

**Titik putus analogi** — ketiganya wajib disebut di VO, bukan cuma dicatat di sini:

1. **Penjaganya tidak membuka kotaknya.** Ia cuma membaca label: dari mana, ke
   pintu nomor berapa. Isi kotak tidak pernah ia lihat.
2. **Buku catatannya cuma berisi percakapan yang KAMU mulai.** Apa pun yang kamu
   undang sendiri sudah punya barisnya di sana — dan penjaga minggir.
3. **Penjaganya bukan satu orang.** Ada beberapa, berlapis, dan yang satu bisa
   mengizinkan apa yang ditolak yang lain. "Punya firewall" tidak menjawab
   pertanyaan "yang mana".

## Uji 4 syarat

| Syarat | Lolos? | Catatan |
|---|---|---|
| 1 Bahasa anak 5 tahun | ✅ | Penjaga + daftar + buku catatan, 50 kata |
| 2 Dua lapis (L1 + L3) | ✅ | L1: penjaga yang mencocokkan ke daftar. L3: stateful connection tracking, urutan rule & first-match, DROP vs REJECT beserta jejaknya di pemindaian, egress filtering, batas L3/L4 vs L7, dan default-deny di security group cloud |
| 3 Ada mekanisme | ✅ | Yang datang **berjalan** menuju pintu lalu dicocokkan baris demi baris; catatan terisi saat kamu mengirim keluar lalu dipakai saat jawabannya pulang; pintu yang diam membuat pengetuk menunggu. Semuanya bergerak |
| 4 Bisa diverifikasi | ⚠ | Mekanismenya bersumber dokumentasi terbuka (netfilter/nftables, Windows Defender Firewall, nmap port states, dokumen security group), tapi **belum satu pun dibuka** — lihat catatan |

## Sudut video panjang

Kenapa mesin yang sedang kamu pakai harus bisa dihubungi siapa pun supaya bisa
berguna sama sekali — dan bagaimana satu buku catatan kecil menyelesaikan hal
yang terlihat mustahil: membedakan jawaban yang kamu tunggu dari orang asing,
padahal keduanya datang dari arah yang sama lewat pintu yang sama.

Babak realitanya justru yang paling jarang diceritakan: firewall gagal bukan
karena ditembus, tapi karena **kita sendiri yang menyuruhnya minggir** — satu
pintu dibuka untuk CCTV, satu baris longgar ditaruh di paling atas daftar, satu
kotak diundang masuk dan labelnya memang benar.

## Sudut dua Shorts

- **Nugget — cara paling aman menjawab ketukan adalah tidak menjawab.** Pintu
  yang bilang "tidak" sudah membocorkan satu hal: gedungnya ada, dan pintu itu
  ada. Pintu yang diam membuat pengetuk berdiri menunggu, mengulang, lalu
  menyerah dengan peta kosong. Satu animasi dua pintu, satu insight, berdiri
  sendiri — penonton tidak perlu tahu apa pun soal firewall untuk mengerti.
- **Jebakan — "sudah ada firewall, jadi aman dari virus."** Penjaganya memang
  berdiri, tapi ia tidak pernah membuka kotaknya — ia cuma membaca label. Dan
  kotak yang paling sering jadi masalah adalah kotak yang **kamu pesan sendiri**:
  catatannya cocok, jadi pintunya dibuka. Itu bukan kebobolan, itu aturannya
  bekerja persis seperti seharusnya.

## Usulan scene — draf

**Belum naskah.** Ini usulan urutan tayang yang tinggal dipindah ke tabel
`### Scene` di `naskah.md` kalau ide ini lolos ke backlog. Yang ditetapkan cuma
tiga hal: ada scene apa saja, urutannya, dan di bagian flow mana
(HARD RULE 1 · 5).

### Video panjang — 14 scene

| # | Bagian | Ringkas |
|---|---|---|
| hook-mengetuk | 1 question | Layar tenang: satu laptop menyala, halaman terbuka biasa saja. Lalu kamera mundur — di luar, ketukan datang terus-menerus ke pintu-pintu yang tidak pernah kamu lihat. Pertanyaannya digantung: siapa yang menahan mereka? |
| pintu-bernomor | 3 problem | Gedungnya dibedah: satu alamat, banyak pintu bernomor. Sebagian ada isinya, sebagian besar kosong. Supaya bisa dipakai, pintunya memang harus bisa diketuk. |
| siapa-pun-mengetuk | 3 problem | Siapa pun di dunia boleh datang dan mencoba semuanya, berurutan, sepanjang malam, tanpa perlu tahu siapa kamu. Ketukannya menumpuk di layar. |
| dikunci-semua | 3 problem | Jalan keluar yang paling masuk akal dicoba: kunci semua pintu. Lalu gagal di depan mata — kiriman yang kamu pesan sendiri ikut tertahan di luar, karena ia datang dari arah yang sama. |
| penjaga | 4 answer | Kalau tidak bisa dikunci, ditaruh yang memilih: satu penjaga, satu daftar, tiap yang datang dicocokkan. Namanya jatuh di sini, sekali. |
| buku-catatan | 5 why | Bagaimana penjaga membedakan yang tidak bisa dibedakan: tiap kali kamu mengirim keluar, ia menulis satu baris. Yang pulang dan cocok dengan baris itu masuk; yang datang tanpa baris, tidak. |
| baris-terakhir | 5 why | Yang membuat semuanya berarti: baris terakhir daftarnya berbunyi "selain itu, tidak". Daftar yang baris terakhirnya "boleh" membuat penjaganya cuma hiasan. |
| dari-atas | 6 explaining | Daftarnya dibaca dari atas dan berhenti di baris pertama yang cocok. Satu baris longgar diselipkan ke paling atas — dan seluruh sisa daftar tidak pernah terbaca lagi. |
| diam | 6 explaining | Dua cara menolak, disandingkan: menjawab "tidak" vs tidak menjawab sama sekali. Yang pertama memberi tahu bahwa pintunya ada. |
| keluar-juga | 6 explaining | Penjaganya dibalik badannya: ia juga berdiri untuk yang keluar. Yang paling sering dilupakan bukan siapa yang masuk, tapi apa yang diam-diam keluar. |
| label-bukan-isi | 6 explaining | Kotak diperiksa: label dibaca, kotaknya tidak pernah dibuka. Alamat benar = lewat, apa pun isinya — dan di situ munculnya jenis penjaga kedua yang tugasnya memang membuka. |
| banyak-penjaga | 6 explaining | Kamera mundur lagi: ada penjaga di gerbang komplek, satu lagi di pintu rumahmu sendiri, dan di gedung sewaan satu di depan tiap kamar. Ketiganya bisa tidak sepakat. |
| pintu-dibuka-sendiri | 7 case | Kamu sendiri yang menunjuk satu pintu dan menyuruh penjaga mengantar tamu ke sana — CCTV, server game. Sejak detik itu pintunya terbuka untuk seluruh dunia, bukan cuma untukmu. |
| diundang-masuk | 7 case | Penutup: penjaga minggir untuk yang kamu undang. Catatannya cocok, jadi pintunya dibuka — dan itu justru aturannya bekerja. Ditutup kalimat bawa-pulang. |

**Kalau kepanjangan, yang dipangkas duluan `banyak-penjaga`** lalu `keluar-juga`
— keduanya `[explaining]`, dan docs/02 mematok `[explaining]` sebagai yang
pertama dipotong. `buku-catatan` dan `baris-terakhir` tidak boleh disentuh:
keduanya seluruh isi `[why]`.

**Kartu judul menulis "Firewall" di sekitar detik sepuluh, dan itu disengaja** —
sama seperti T01 dan T14. Yang dilarang HARD RULE 6 adalah **VO** yang menyebut
nama sebelum bendanya berdiri; karena itu penamaan di `penjaga` ditulis sebagai
penegasan ("penjaga itu namanya firewall"), bukan perkenalan.

### Short 1 — Nugget · 9 scene

**Insight:** cara paling aman menjawab ketukan adalah tidak menjawab.

| # | Bagian | Ringkas |
|---|---|---|
| dua-pintu | hook | Dua pintu bersebelahan, sama-sama tidak boleh dimasuki. Klaimnya jatuh di frame pertama: yang satu sudah membocorkan sesuatu. |
| ditolak | hook | Pintu pertama menjawab: tidak boleh. Ketukan berhenti, kelihatannya beres. |
| sudah-tahu | ketegangan | Tapi pengetuknya pulang membawa satu hal — gedungnya ada, dan pintu itu ada. Satu titik di petanya terisi. |
| diam | payoff | Undangan: sekarang bayangkan pintu kedua. Diketuk, dan tidak terjadi apa-apa sama sekali. |
| menunggu | payoff | Pengetuknya berdiri. Mengulang. Menunggu lagi. Tidak ada apa pun yang bisa disimpulkan. |
| seribu-pintu | payoff | Dikalikan seribu pintu: yang menjawab selesai sekejap, yang diam memakan waktu tunggu satu per satu. |
| peta-kosong | tutup | Hasil akhirnya disandingkan: satu peta terisi rapi, satu peta kosong. |
| namanya | tutup | Nama menyusul gambarannya: yang memutuskan menjawab atau diam itu firewall, dan dua pilihannya memang punya nama sendiri. |
| loop | tutup | Balik ke dua pintu — kalimat penutup menyambung ke frame pertama supaya loop-nya mulus. |

### Short 2 — Jebakan · 9 scene

**Mitos:** "Sudah ada firewall, jadi aman dari virus."

| # | Bagian | Ringkas |
|---|---|---|
| mitos | mitos | Kalimatnya ditulis besar di layar apa adanya, dibaca datar tanpa dibantah dulu. |
| salah | bantahan | Dicoret. Penjaganya memang berdiri — tapi ada satu hal yang tidak pernah ia lakukan. |
| label | bantahan | Undangan: bayangkan tiap kotak yang datang diperiksa di depan pintu. Labelnya dibaca. |
| tidak-dibuka | bukti | Kotaknya tidak pernah dibuka. Alamat benar, pintu benar — lewat. Isinya tidak pernah jadi urusan. |
| kamu-yang-minta | bukti | Dan kotak yang paling sering jadi masalah bukan yang mengetuk. Ia yang kamu pesan sendiri. |
| catatan-cocok | bukti | Catatan penjaganya cocok, jadi pintunya dibuka. Itu bukan kebobolan — itu aturannya bekerja persis seperti seharusnya. |
| bukan-tugasnya | konsekuensi | Membuka kotak itu pekerjaan lain, oleh pemeriksa lain. Dua tugas berbeda yang sering dikira satu. |
| yang-dijaga | konsekuensi | Lalu apa yang benar-benar dijaga: semua pintu yang tidak pernah kamu buka. Itu banyak, dan itu berharga. |
| jadi | konsekuensi | Jadi firewall bukan tidak berguna — ia cuma menjawab pertanyaan yang berbeda. CTA halus ke video panjang. |

## Catatan

**SUDAH DIPUTUSKAN 2026-08-14 — lolos sebagai T15, pilar P5.** Sudah masuk
[docs/07](../../docs/07-backlog-topik.md), dan urutan rilisnya ikut berubah: T15
naik ke posisi ketiga tepat di belakang T14, T13 turun satu. Alasannya ditulis di
dokumen itu, bukan di sini.

**Usulan scene di atas sudah dipindah ke `naskah.md`** dan di sanalah ia hidup
sekarang. Yang tinggal di berkas ini catatan kenapa scene-nya begitu, bukan
daftarnya.

**Batasnya dengan topik lain di backlog:**

- **T12 · Apa yang terjadi saat password bocor** — sama-sama P5, tapi tidak
  bersinggungan: T12 soal apa yang terjadi pada rahasia yang sudah diberikan,
  T15 soal siapa yang boleh mengetuk sejak awal.
- **T05 · Perjalanan satu alamat web** — bersinggungan tipis di "pintu bernomor".
  Batasnya: T05 memakai pintu sebagai **tujuan yang dituju**, T15 memakainya
  sebagai **yang dijaga**. Tidak ada satu pun scene T15 yang menjelaskan
  salaman TCP, dan T05 tidak menyebut aturan atau penjaga.

**Yang belum beres — semua sumber.** Tidak satu pun klaim boleh masuk naskah
sebelum punya baris `sumber:`, dan **tidak satu pun sudah dibuka**:

- Pencatatan percakapan yang kamu mulai (buku catatan / *connection tracking*) →
  dokumen netfilter/nftables untuk sisi Linux, dan dokumen Windows Defender
  Firewall untuk sisi desktop. Keduanya harus dibuka, bukan ditulis dari ingatan.
- Beda jejak antara **menjawab "tidak"** dan **diam** → dokumentasi nmap soal
  status port adalah sumber primer yang tepat, karena ia menjelaskan apa yang
  **teramati** dari sisi pengetuk. Nama status persisnya jangan ditulis dari
  ingatan.
- Baris terakhir "selain itu, tidak" sebagai **bawaan** → dokumen security group
  cloud menyebut arah masuk ditolak secara bawaan dan pencatatannya dilakukan
  otomatis. Ini juga sumber terbaik untuk lapis L3-nya.
- **Jangan ada angka sama sekali di bagian 3–6.** Sama seperti T14: waktu tunggu
  ketukan, jumlah percobaan per hari, dan sejenisnya semuanya menggoda dan
  semuanya butuh sumber. Kalau nanti mau dipakai, tempatnya cuma di `[case]`,
  dengan sumbernya, atau diukur sendiri di mesin ini.

**Peluang visual terkuat:** **kamera yang mundur, tiga kali.** Scene 1 mundur
dari layar laptop ke gedung berpintu banyak; `banyak-penjaga` mundur lagi dari
gedung ke komplek; `diundang-masuk` maju kembali ke dalam — ke pintu yang kamu
buka sendiri dari dalam. Satu gerakan yang sama, dipakai tiga kali, dan tiap
kalinya mengubah siapa yang sebenarnya jadi subjeknya.

Gerakan kedua: **daftar aturan yang dibaca dari atas ke bawah**, baris demi baris
menyala lalu padam, dan berhenti di baris pertama yang cocok — satu animasi yang
sekaligus menjelaskan urutan, first-match, dan kenapa satu baris longgar di
paling atas mematikan sisanya.
