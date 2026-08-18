---
judul: TCP/IP
diusulkan: 2026-08-18
pilar: P2 · Di Balik Aplikasi
lapis: umum → dev
status: mentah
---

# TCP/IP

## Ide mentah

> "TCP/IP"

Dua huruf yang dipisah garis miring, dan hampir tidak ada yang tahu kenapa
namanya ditulis dua. Itu sekaligus ketegangan topiknya: **yang satu bertugas
tidak menjamin apa-apa, yang satu bertugas menjamin semuanya** — dan justru
bagian yang tidak menjamin apa-apa yang membuat internet bisa sebesar sekarang.

## Pemetaan ke flow 7 bagian

Flow wajib channel ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)):

| # | Bagian | Isi untuk topik ini |
|---|---|---|
| 1 | **[question]** | "Internet tidak pernah berjanji kirimanmu akan sampai. Sama sekali tidak. Jadi kenapa tidak pernah ada satu huruf pun yang hilang dari pesan yang kamu terima?" |
| 2 | **brand opening** | Sting standar 4,0 dtk |
| 3 | **[problem]** | Kirimanmu **terlalu besar untuk dibawa sekali jalan**, jadi ia dipotong-potong. Potongannya lalu berangkat sendiri-sendiri — bukan beriringan, bukan lewat jalan yang sama, dan tidak ada satu pun yang mengawal. Sebagian datang duluan padahal berangkat belakangan, sebagian telat, sebagian **tidak pernah datang sama sekali**. Yang mengantar tidak tahu, tidak mencatat, dan tidak peduli. Dan pengantarnya **tidak bisa diperbaiki**: jalannya melewati terlalu banyak tangan yang bukan milik siapa pun yang bisa kamu suruh. |
| 4 | **[answer] → [what]** | Kalau pengantarnya tidak bisa dipercaya dan tidak bisa diperbaiki, **jangan perbaiki pengantarnya** — taruh juru tulis di **kedua ujung**. Tiap potongan diberi nomor urut sebelum berangkat; di ujung sana ada yang menyusun ulang dan menagih nomor yang belum datang. Nama jatuh di sini, sekali: pengantarnya **IP**, juru tulisnya **TCP** — dan itulah kenapa namanya ditulis dua, dipisah garis miring. |
| 5 | **[why]** | Dua sebab, keduanya harus terasa sebagai jawaban atas masalah di bagian 3: **(a) nomor urut menyelesaikan dua hal sekaligus** — urutan yang berantakan *dan* potongan yang hilang — karena **lubang di deret nomor adalah satu-satunya bukti yang dibutuhkan**; tidak perlu ada siapa pun yang mengawasi jalannya. **(b) pengirim menyimpan salinannya** dan belum membuangnya sampai kabar "sudah sampai" datang. Makanya yang hilang bisa disembuhkan tanpa satu pun tangan di tengah tahu ada yang hilang. |
| 6 | **[explaining]** | Salaman tiga langkah sebelum satu potongan isi pun berangkat — dan kenapa **tiga**, bukan dua · potongan tidak dikirim satu-satu sambil menunggu balasan, tapi segerombolan sekaligus, dan gerombolannya melebar sendiri · yang hilang di jalan **paling sering bukan kecelakaan — ia sengaja dibuang** saat jalannya penuh, dan pengirim membaca pembuangan itu sebagai perintah melambat; itu yang membuat internet tidak macet total · satu potongan yang hilang **menahan seluruh antrean sesudahnya** walaupun yang sesudahnya sudah sampai dengan selamat · dan ada kiriman yang sengaja dikirim **tanpa** juru tulis sama sekali. |
| 7 | **[case]** | Panggilan video yang pecah sebentar lalu jernih lagi vs unduhan yang melambat tapi tidak pernah salah — **kejadian di jalannya sama persis**, yang beda cuma siapa yang dipilih untuk mengurusnya · dan satu potongan hilang yang menahan seluruh halaman menggantung, yaitu alasan orang akhirnya membangun jalur yang tidak menahan antrean · kalimat bawa-pulang balik ke L1: keandalan itu bukan sifat jalannya, melainkan kesepakatan di kedua ujungnya. |

## Penjelasan 5 tahun (draf)

> Kirimanmu dipotong jadi banyak amplop kecil, dan tiap amplop diberi nomor urut.
> Tukang antarnya cuma berusaha — ada amplop yang telat, nyasar, atau hilang, dan
> dia tidak peduli. Di ujung sana ada yang menyusun ulang menurut nomornya, lalu
> menagih yang belum datang. Makanya yang kamu terima selalu utuh dan urut,
> padahal jalannya berantakan.

*(51 kata, nol istilah teknis.)*

**Analogi utama:** **amplop bernomor + tukang antar yang cuma berusaha + juru
tulis di kedua ujung.** Satu analogi untuk seluruh episode
([docs/09](../../docs/09-tangga-abstraksi.md) aturan 4) — tidak ada pipa, tidak
ada aliran air, tidak ada jalan tol. **Pipa adalah gambaran yang salah** dan
paling sering dipakai orang: pipa mengantar dalam urutan yang sama dengan yang
dimasukkan, dan seluruh episode ini justru soal urutan yang berantakan. Kalau
pipa muncul, ia muncul sekali sebagai **yang dikira penonton**, lalu dibongkar.

**Titik putus analogi** — ketiganya wajib disebut di VO, bukan cuma dicatat di sini:

1. **Yang hilang paling sering bukan hilang — ia dibuang.** Tukang antar sungguhan
   tidak membuang surat saat sibuk; yang di tengah jalan ini melakukannya, dan
   pembuangan itu **bahasa**, bukan kegagalan.
2. **Yang menagih bukan penerima.** Penerima cuma bilang "aku sudah sampai nomor
   sekian"; yang memutuskan mengirim ulang adalah **pengirim yang berhenti
   mendengar kabar**. Di analogi pos, orang membayangkan penerima yang komplain.
3. **Amplopnya tidak selalu utuh selama perjalanan.** Ia bisa dipotong lagi di
   tengah jalan oleh tangan yang jalannya lebih sempit, lalu disambung lagi.

## Uji 4 syarat

| Syarat | Lolos? | Catatan |
|---|---|---|
| 1 Bahasa anak 5 tahun | ✅ | Amplop bernomor + tukang antar + juru tulis, 51 kata |
| 2 Dua lapis (L1 + L3) | ✅ | L1: potongan bernomor yang disusun ulang. L3: salaman tiga langkah & kenapa bukan dua, nomor urut awal yang disepakati, jendela kirim yang melebar sendiri, **kehilangan sebagai sinyal kendali** (ini isi L3 yang paling jarang ada di artikel blog — orang menulis "TCP itu andal" lalu berhenti), antrean yang tertahan satu potongan, dan kenapa ada yang sengaja memilih tanpa jaminan |
| 3 Ada mekanisme | ✅ | Paling kuat di antara semua topik di backlog: potongan **berjalan** lewat rute berbeda, datang tidak berurutan, satu lubang menganga di deret nomor, salinan dikirim ulang, gerombolan kirim melebar lalu menciut saat jalan penuh. Semuanya bergerak, dan semuanya bisa ditonton |
| 4 Bisa diverifikasi | ⚠ | Sumbernya spesifikasi terbuka dan berumur puluhan tahun (RFC), jadi tidak ada klaim yang jawabannya "kata orang" — tapi **belum satu pun dibuka**; lihat catatan |

## Sudut video panjang

Bukan "apa itu TCP/IP". Pertanyaannya: **kenapa yang sampai ke kamu selalu utuh
dan urut, padahal tidak ada satu pun bagian dari jalannya yang menjanjikan itu.**

Jawabannya adalah gagasan yang jarang diceritakan sebagai gagasan: alih-alih
membuat jalannya bisa dipercaya, keandalannya **dipindahkan ke kedua ujung** —
dan justru karena bagian tengahnya dibiarkan bodoh dan tidak berjanji apa-apa,
siapa pun boleh menyambung jalannya sendiri ke situ. Internet bisa sebesar
sekarang karena bagian yang tidak menjamin apa-apa itu, bukan meskipun.

Babak realitanya: **kehilangan bukan kegagalan, ia sinyal.** Potongan yang
dibuang saat jalan penuh adalah satu-satunya cara pengirim tahu ia harus
melambat — jalur yang tidak pernah kehilangan apa pun adalah jalur yang tidak
pernah dipakai sampai penuh. Dan konsekuensi yang paling terasa sehari-hari:
satu potongan hilang bisa menahan seluruh antrean sesudahnya, dan itu terlihat
di layar sebagai halaman yang menggantung tanpa alasan yang bisa ditunjuk.

## Sudut empat Shorts

Empat peran, empat pekerjaan yang berbeda ([docs/02 § Anatomi
Shorts](../../docs/02-format-video.md#anatomi-shorts)) — bentuk **baku**, bukan
serial.

- **Nugget** (bikin kaget) — **"Yang hilang di internet itu bukan kecelakaan.
  Ia sengaja dibuang."** Saat jalannya penuh, yang di tengah membuang potongan
  begitu saja — dan pembuangan itu bukan kerusakan, itu **kalimat**: satu-satunya
  cara memberi tahu pengirim supaya melambat. Berdiri sendiri sepenuhnya;
  penonton tidak perlu tahu apa pun soal TCP untuk kaget.
- **Jebakan** (mengoreksi yang dipercaya) — **"TCP/IP itu nama satu benda."**
  Salah: itu dua pekerjaan yang bertolak belakang, sengaja dipisah. Yang satu
  bertugas **tidak** menjamin apa-apa, yang satu bertugas menjamin semuanya. Dan
  yang bikin internet bisa sebesar sekarang justru bagian yang tidak menjamin
  apa-apa — karena tidak berjanji berarti siapa pun boleh menyambung ke situ.
- **Beda tipis** (memisahkan dua yang dikira sama) — **yang menunggu vs yang
  tidak pernah menunggu.** Dua-duanya benar, dua-duanya dipakai tiap hari,
  keduanya sering tertukar. Satu perbedaan yang menentukan: yang satu **menahan**
  potongan yang sudah sampai demi potongan yang belum datang; yang satu tidak
  pernah menahan apa pun. Karena itu panggilan video pecah sebentar lalu jernih
  lagi, sementara unduhan melambat tapi tidak pernah salah satu huruf pun —
  kejadian di jalannya sama persis, pilihannya yang beda. (Nama TCP/UDP jatuh
  belakangan, setelah keduanya berdiri.)
- **Coba sendiri** (dari tahu ke melakukan) — **hitung berapa tangan asing yang
  memegang kirimanmu.** Buka Command Prompt, jalankan `tracert` ke satu situs
  yang kamu buka tiap hari, lalu hitung barisnya: itu daftar mesin milik
  perusahaan yang tidak satu pun kamu kenal, dan tiap kirimanmu lewat semuanya.
  Tambahan opsional di akhir: `ping` yang dibiarkan jalan lama akan menunjukkan
  angka *loss* — bukti bahwa yang hilang itu memang normal.

## Catatan

### Ada storyboard usulan dari luar alur repo — disimpan, belum dipakai

[`storyboard-usulan.md`](storyboard-usulan.md) — 12 scene lengkap dengan VO,
arahan kamera, dan SFX, dikirim lewat chat pada 2026-08-18.

**Diputuskan 2026-08-18: disimpan sebagai bahan mentah, tidak diadopsi sebagai
kerangka.** Topik ini tetap lewat jalur normal — 4 syarat → backlog →
`thumbnail.md` (fase 1) → naskah. Storyboard itu dibuka lagi **di fase 2**, dan
yang diambil darinya sudah ditetapkan sekarang supaya tidak dinegosiasi ulang:

- **Diambil:** mekanisme Scene 05–08 (pemecahan bernomor → jalur berbeda → satu
  nomor tidak pernah datang → diminta ulang → dua tugas dipisah kiri/kanan),
  disiplin kameranya (*pull-back* = "ternyata bagian dari sistem besar",
  *push-in* = "perhatikan detail ini"), dan match cut fisik → digital.
- **Tidak diambil:** pembukaan definisi, keempat analoginya, Scene 09–10, dan
  seluruh teks layar berbahasa Inggris.

Alasan lengkapnya di § Pemeriksaan berkas itu. **Guideline tidak diubah** — dan
itu bagian dari keputusannya.

### ✅ Batas dengan T05 — diputuskan 2026-08-18

[T05 · Perjalanan satu alamat web](../../docs/07-backlog-topik.md#t05--perjalanan-satu-alamat-web)
memegang salaman TCP sebagai salah satu dari tiga perjalanan bolak-baliknya,
dan T05 **sudah pernah dipersempit sekali** (2026-08-14) saat DNS pindah ke T14.
Dua episode yang sama-sama membuka salaman akan saling memakan, persis kasus DNS
itu, dan yang kalah selalu yang tayang belakangan.

**Batas yang dipakai** — pola yang sama dengan T15 vs T05 di "pintu bernomor",
yang sudah terbukti jalan. T05 **tetap berdiri**, tidak dilebur:

- **T05 memakai salaman sebagai ONGKOS** — berapa kali bolak-balik sebelum satu
  huruf konten terkirim. Ia tidak pernah menjelaskan *kenapa* salamannya tiga
  langkah atau *apa* yang disepakati di situ.
- **Topik ini memakai salaman sebagai MEKANISME** — kenapa tiga, dan nomor awal
  apa yang disepakati supaya sisa episodenya masuk akal.
- **Yang dilarang muncul di topik ini:** DNS, TLS, dan seluruh cerita "kenapa
  kunjungan pertama lebih lambat". Sekali pertanyaan itu ditanyakan di sini,
  T05 kehilangan satu-satunya pertanyaan yang tersisa untuknya.
- **Yang dilarang muncul di T05:** nomor urut, kabar "sudah sampai", kirim ulang,
  gerombolan kirim, dan pembuangan saat penuh.

**Peleburan T05 ke topik ini ditolak** — pilihan itu ditimbang dan tidak
diambil. Melebur berarti satu episode yang menjelaskan keandalan *dan* ongkos
bolak-balik sekaligus, dan keduanya adalah pertanyaan yang berbeda: "kenapa yang
sampai selalu utuh" tidak dijawab oleh "kenapa kunjungan pertama lambat", dan
sebaliknya. Episode yang menjawab dua pertanyaan sekaligus tidak menjawab
keduanya dengan baik.

**Catatan cerminnya sudah ditulis di sisi T05**, di
[docs/07](../../docs/07-backlog-topik.md) — batas ini mengikat T05 juga, dan ia
harus terlihat dari sana tanpa perlu membuka berkas ini.

### Judulnya bukan "TCP/IP"

Nama itu **istilah**, dan istilah tidak menggerakkan siapa pun untuk menekan.
Ia juga melanggar bentuk yang dipakai backlog: tiap topik dijual sebagai
**pertanyaan**, bukan nama benda. Arah judulnya: *"Kenapa yang sampai ke kamu
selalu utuh, padahal jalannya tidak menjanjikan apa-apa"*. Judul final tetap
diputuskan di **fase 4**, bukan sekarang — dan `TCP/IP` sendiri lebih cocok
jadi kata yang **tidak** dipakai di thumbnail.

### Usulan scene sengaja belum ditulis

Berbeda dengan T15 yang usulan scene-nya ikut di berkas ide. Di sini
percuma: batas dengan T05 di atas menentukan apakah salaman jadi satu scene
utuh atau tidak sama sekali, dan itu menggeser sekitar sepertiga urutannya.
Scene ditulis setelah gerbang itu lewat.

### Kode topik

Kalau lolos, ia mengambil **T18**. Bukan T16 — itu
[dibatalkan dan tidak dipakai ulang](../../docs/07-backlog-topik.md#t16--apa-itu-enkripsi--dibatalkan)
— dan bukan T17, yang **sudah terpakai** oleh `ideas/enkripsi/`
(`T17-enkripsi` di `package.json`).

### Yang belum beres — semua sumber

Tidak satu pun klaim boleh masuk naskah sebelum punya baris `sumber:`, dan
**tidak satu pun sudah dibuka.** Yang harus dibuka, beserta klaim yang
menggantung padanya:

- **Pengantarnya tidak menjanjikan apa-apa** (boleh hilang, boleh tidak urut,
  boleh terpotong lagi di tengah jalan) → spesifikasi IP. Kalimat "tidak
  berjanji" ini adalah fondasi seluruh bagian 3 dan 4; ia harus dikutip, bukan
  ditulis dari ingatan.
- **Salaman tiga langkah, nomor urut, kabar "sudah sampai", dan kirim ulang** →
  spesifikasi TCP. **Perhatikan versinya**: dokumen TCP sudah diterbitkan ulang
  dan menggantikan yang lama, jadi jangan menyebut nomor dokumen dari ingatan —
  buka dan salin yang berlaku sekarang.
- **Potongan yang dibuang saat penuh dibaca sebagai perintah melambat** →
  dokumen kendali kepadatan TCP. Ini klaim paling berat di seluruh episode dan
  paling gampang salah diceritakan; ia butuh sumber yang paling rapi.
- **Yang sengaja dikirim tanpa jaminan** → spesifikasi UDP, dipakai untuk Short
  "Beda tipis".
- **Satu potongan hilang menahan antrean sesudahnya** → dokumen jalur yang
  dibuat belakangan justru untuk menghindari itu; alasannya biasanya ditulis
  terang-terangan di bagian pengantar dokumennya.

**Jangan ada angka sama sekali di bagian 3–6.** Sama seperti T14 dan T15:
ukuran potongan, berapa lama menunggu sebelum mengirim ulang, dan persentase
kehilangan yang "normal" — ketiganya menggoda, ketiganya butuh sumber, dan
ketiganya tidak dibutuhkan supaya mekanismenya terbaca. Kalau nanti dipakai,
tempatnya cuma `[case]`, dengan sumbernya, atau diukur sendiri di mesin ini
lewat `ping`/`tracert`.

### Peluang visual terkuat

**Deret nomor yang berlubang.** Satu baris kotak bernomor terisi satu per satu,
tidak berurutan — lalu satu kotak tidak pernah terisi, dan seluruh kotak
sesudahnya berhenti bisa dipakai walaupun sudah datang. Satu animasi itu
menjelaskan **tiga** hal sekaligus: kenapa nomor urut cukup untuk mendeteksi
yang hilang, kenapa penerima bisa menyusun ulang tanpa tahu apa-apa soal
jalannya, dan kenapa satu potongan bisa menahan antrean. Ia juga kandidat
terkuat untuk thumbnail-nya di fase 1.

Gerakan kedua: **satu kiriman, banyak jalan.** Potongan yang berangkat bersamaan
lalu berpencar ke rute yang berbeda-beda dan tiba dengan selisih waktu — dipakai
di bagian 3, lalu **dipakai ulang dengan hasil yang berbeda** di bagian 5 setelah
juru tulisnya ada. Kamera dan gerakannya sama, yang berubah cuma apa yang terjadi
di ujungnya.
