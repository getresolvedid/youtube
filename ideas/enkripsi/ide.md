---
judul: Enkripsi
diusulkan: 2026-08-17
pilar: P5 · Keamanan & Privasi
lapis: umum → dev
status: diuji
---

# Enkripsi

## Ide mentah

> "enkripsi" — diangkat ulang setelah
> [T16 dibatalkan](../../docs/07-backlog-topik.md#t16--apa-itu-enkripsi--dibatalkan),
> dengan pintu masuk yang berbeda.

## Sudutnya — dan kenapa BUKAN sudut T16

T16 masuk lewat **pertukaran kunci**: bagaimana dua orang yang belum pernah
bertemu menyepakati satu rahasia sementara semua orang di jalan mendengarkan.
Analoginya kotak yang digembok, lewat kurir. Sudut itu ikut batal bersama T16
dan **tidak dipakai lagi di sini** — tidak ada gembok terbuka, tidak ada kurir,
tidak ada satu pun scene yang menjelaskan bagaimana dua pihak menyepakati kunci.

Pintu masuk yang dipakai sekarang satu pertanyaan yang jauh lebih dekat ke
penonton, dan jawabannya kebetulan seluruh isi topik enkripsi yang berguna:

> **Kunci itu menginap di mana?**

Bukan "bagaimana isinya diacak", bukan "bagaimana kuncinya disepakati" —
melainkan **siapa yang menyimpannya setelah semua itu selesai.** Itu satu-satunya
pertanyaan yang jawabannya benar-benar mengubah apa yang bisa terjadi pada isimu,
dan satu-satunya yang bisa diuji penonton sendiri sore ini juga.

**Yang membuatnya berdiri: penonton sudah pernah melihat jawabannya, tanpa tahu
itu jawaban.** Tombol "Lupa password?" bercabang dua di dunia nyata — satu
layanan mengembalikan seluruh isimu utuh, satu lagi bilang isimu hilang dan
mereka pun tidak bisa mengambilkannya. Dua jawaban itu sama-sama benar, dan
bedanya cuma satu hal: **kuncinya menginap di mana.**

## Pemetaan ke flow 7 bagian

Flow wajib channel ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)):

| # | Bagian | Isi untuk topik ini |
|---|---|---|
| 1 | **[question]** | Satu tombol yang sama — "Lupa password?" — ditekan di dua tempat. Yang satu mengembalikan semuanya utuh dalam lima detik. Yang satu bilang: isimu hilang, dan kami juga tidak bisa mengambilkannya. Digantung: kenapa dua jawaban yang berlawanan itu sama-sama benar? |
| 2 | **brand opening** | Sting standar 4,0 dtk |
| 3 | **[problem]** | Isimu tidak tinggal di HP-mu — ia dititipkan di gudang milik orang lain. Menjaga **pintunya** tidak cukup: gudang bisa kebobolan, dan orang yang bekerja di dalamnya memang boleh masuk. Jadi bukan gudangnya yang diamankan, tapi **lokernya** yang dikunci. Tapi loker yang dikunci harus bisa dibuka lagi — kamu masih mau memakai isinya besok. Dan begitu ia harus bisa dibuka, muncul pertanyaan yang tidak bisa dihindari: **kuncinya ditaruh di mana?** Kalau digantung di dinding gudang itu juga, mengunci lokernya cuma menunda, bukan menyelesaikan. |
| 4 | **[answer] → [what]** | Yang mengubah segalanya bukan lokernya, bukan pula gemboknya — tapi **kuncinya dibuat di mejamu dan tidak pernah keluar dari situ.** Yang berangkat ke gudang cuma loker yang sudah tertutup. Mengunci isi supaya cuma pemegang kuncinya bisa membaca — **itu namanya enkripsi**. `[what]` = enkripsi, dan namanya jatuh tepat di sini, sekali. |
| 5 | **[why]** | Dua sebab, keduanya harus terasa sebagai *jawaban atas masalah bagian 3*: **(a) gudang yang kebobolan cuma kehilangan tumpukan loker yang tidak bisa dibuka** — dan orang yang bekerja di dalamnya berdiri di depan loker yang sama, sama tidak bisanya. Yang dijaga bukan lagi gedungnya. **(b) dan itu juga sebabnya "hilang selamanya" itu ada** — balik ke tombol di bagian 1. Tidak ada yang bisa mengembalikan sesuatu yang kuncinya cuma ada padamu. Jawaban yang terdengar seperti kegagalan layanan itu justru **satu-satunya bukti** bahwa kuncinya benar-benar tidak pernah menginap di sana. |
| 6 | **[explaining]** | **Tiga tempat loker itu bisa terbuka** — cuma terkunci di perjalanan, terkunci selama disimpan tapi dibuka tiap kali dipakai, atau cuma bisa dibuka di meja kedua ujung; tiga janji berbeda yang sehari-hari disebut dengan satu kata yang sama · **kunci cadangan membatalkan semuanya, diam-diam** — supaya kamu tidak benar-benar kehilangan, dibuat salinan yang disimpan di tempat lain, dan tempat lain itu punya pemiliknya sendiri; cadangan yang menyelamatkanmu adalah salinan kunci yang tidak kamu pegang · **kunci yang lahir dari kata yang kamu ketik** tidak pernah lebih kuat dari kata itu — gembok sebagus apa pun berdiri di atas satu kata · **labelnya tetap terbaca** walau isinya terkunci: ke gudang mana, sebesar apa, sesering apa — tanpa itu lokernya tidak sampai · **"dienkripsi" hampir selalu benar dan hampir tidak pernah menjawab apa pun** — pertanyaannya bukan dikunci atau tidak, tapi **dengan kunci siapa**. |
| 7 | **[case]** | Tes yang bisa dipakai penonton sore ini juga: **tekan "lupa password"**. Isimu kembali utuh = kuncinya ada pada mereka. Mereka bilang tidak bisa = kuncinya ada padamu. Tidak ada yang jahat di antara keduanya — yang satu ditukar dengan kenyamanan, yang satu ditukar dengan risiko kehilangan permanen; yang keliru cuma mengira kamu dapat dua-duanya · dan yang jebol hampir tidak pernah gemboknya: kuncinya yang pindah tangan tanpa kamu sadari, lewat cadangan otomatis yang menyala sendiri sejak hari pertama · kalimat bawa-pulang balik ke L1. |

## Penjelasan 5 tahun

> Barangmu dititipkan di loker, di gudang milik orang lain. Lokernya dikunci,
> jadi tidak ada yang bisa melihat isinya. Pertanyaannya cuma satu: kuncinya
> menginap di mana? Kalau digantung di dinding gudang, penjaga gudang bisa
> membukanya. Kalau kamu bawa pulang, tidak ada yang bisa — termasuk kamu, kalau
> kuncinya hilang.

*(47 kata, nol istilah teknis.)*

**Analogi utama:** **loker di gudang sewaan, dan satu kunci yang menginap di
salah satu dari dua tempat.** Satu analogi untuk seluruh episode
([docs/09](../../docs/09-tangga-abstraksi.md) aturan 4).

**Yang sengaja TIDAK dipakai — tiga-tiganya:**

1. **Mengacak huruf.** A jadi D, B jadi E. Bagian yang paling mudah dan paling
   tidak penting; ia membuat penonton mengira enkripsi soal *bentuk tulisannya*.
   Boleh muncul **sekali** sebagai penampakan di layar saat lokernya ditutup,
   tidak pernah dijelaskan.
2. **Kurir, jalan, dan tangan-tangan yang menumpang.** Itu gambaran perjalanan,
   dan seluruh topik ini soal **tempat menginap**, bukan perjalanan. Loker yang
   berangkat ke gudang lewat begitu saja dalam satu potongan.
3. **Gembok terbuka yang dibagikan di depan umum.** Itu sudut T16 yang batal.
   Memasukkannya kembali berarti menjelaskan bagaimana kunci disepakati — cabang
   yang berbeda, dan cukup besar untuk jadi topiknya sendiri suatu hari.

**Titik putus analogi** — ketiganya wajib disebut di VO, bukan cuma dicatat di sini:

1. **Kunci ini tidak bisa disimpan di laci.** Ia lahir dari kata yang kamu ketik,
   atau tinggal di dalam mesin yang kamu pegang. "Kuncinya cuma padamu" berarti
   ia ikut ke mana pun mesin itu pergi — termasuk saat mesin itu diambil orang.
2. **Salinannya tidak meninggalkan bekas.** Kunci logam yang digandakan
   menyisakan serbuk di tukang kunci; yang ini disalin utuh tanpa jejak, dan
   yang menyalin tidak perlu memegangnya lama-lama.
3. **"Cuma kamu yang punya kuncinya" bukan "cuma kamu yang bisa membaca".**
   Lokernya tetap dibuka di mejamu — dan apa pun yang berdiri di meja itu ikut
   melihat isinya begitu ia terbuka.

## Uji 4 syarat

| Syarat | Lolos? | Catatan |
|---|---|---|
| 1 Bahasa anak 5 tahun | ✅ | Loker, gudang, kunci, dinding — 47 kata, nol istilah teknis |
| 2 Dua lapis (L1 + L3) | ✅ | L1: kuncinya menginap di mana, dan tombol "lupa password" yang membocorkan jawabannya. L3: beda tiga tempat pembukaan (perjalanan / penyimpanan / dua ujung), kunci yang diturunkan dari kata sandi, kunci pemulihan & titipan kunci, cadangan otomatis yang membatalkan janji dua-ujung, apa yang tetap terbaca walau isinya terkunci |
| 3 Ada mekanisme | ✅ | Kunci yang **berpindah tempat** — digantung di dinding gudang, dibawa pulang, disalin diam-diam ke gudang kedua. Gudang kebobolan dan yang terangkut cuma tumpukan loker yang tidak bisa dibuka. Satu tombol yang bercabang dua. Semuanya bergerak, dan semuanya benda yang sama sepanjang episode |
| 4 Bisa diverifikasi | ⚠ | **Belum satu pun sumber dibuka.** Ini yang menahan status di `diuji` — lihat Catatan |

**Belum boleh naik ke [docs/07](../../docs/07-backlog-topik.md).** Syarat 4 masih
⚠, dan tiga syarat lolos tidak menutup satu syarat gagal
([ideas/README](../README.md)). Yang harus terjadi lebih dulu: dokumen di daftar
sumber dibuka sendiri, dan batas dengan T12 diputuskan.

## Sudut video panjang

Bukan "bagaimana tulisan diacak" dan bukan "bagaimana dua orang menyepakati
kunci", melainkan **pertanyaan tunggal yang menentukan siapa yang bisa membaca
isimu: kuncinya menginap di mana.** Semua yang sehari-hari terasa
membingungkan — kenapa satu layanan bisa memulihkan isimu dan satu lagi tidak,
kenapa "sudah dienkripsi" tetap bisa bocor, kenapa mengaktifkan cadangan
otomatis diam-diam mengubah jawabannya — semuanya turunan dari pertanyaan itu.

Babak realitanya: **yang jebol hampir tidak pernah gemboknya.** Gembok modern
tidak dipatahkan. Yang terjadi kuncinya memang ada di sana sejak awal, atau
disalin ke tempat kedua oleh setelan yang menyala sendiri dan tidak pernah kamu
matikan.

## Sudut dua Shorts

- **Nugget — tombol "lupa password" itu jawaban paling jujur soal siapa yang bisa
  membaca isimu.** Kalau mereka bisa mengembalikan isimu utuh, berarti mereka
  bisa membukanya kapan saja tanpa kamu. Kalau mereka bilang tidak bisa,
  kuncinya memang cuma padamu. Berdiri sendiri: penonton tidak perlu tahu apa
  pun soal enkripsi, dan bisa mengujinya sendiri dalam tiga puluh detik.
- **Jebakan — "datanya dienkripsi kok, aman."** Kalimatnya hampir selalu benar,
  dan hampir tidak pernah menjawab pertanyaannya. Dienkripsi **dengan kunci
  siapa**, dan kunci itu menginap di mana? Tanpa dua jawaban itu, "dienkripsi"
  cuma memberi tahu bahwa lokernya punya lubang kunci.

## Catatan

**Ini bukan T16 yang dihidupkan lagi.** T16 dibatalkan 2026-08-17 dan
[kodenya tidak dipakai ulang](../../docs/07-backlog-topik.md#t16--apa-itu-enkripsi--dibatalkan)
— kalau ide ini lolos, ia mengambil **T17**. Yang diwarisi dari T16 cuma satu:
daftar apa yang **tidak** boleh dipakai lagi, dan itu sudah ditulis di atas.
Sudut, analogi, hook, [why], dan kedua Shorts-nya semuanya baru.

**Batas dengan T12 harus dinegosiasi ulang lebih dulu — dan ini yang paling
mendesak.** Hari ini juga, dengan alasan T16 batal, docs/07 mengembalikan
"hashing vs enkripsi" ke T12 sepenuhnya. Ide ini membuka lagi pertanyaan itu.
Usulan batasnya — **belum diputuskan, butuh keputusan user:**

- **T12 memegang sidik jari yang tidak bisa dibalik** dan apa yang sebenarnya
  dijual saat sebuah gudang catatan bocor. Ia tidak pernah bicara soal tempat
  menginapnya kunci.
- **Topik ini memegang kunci: siapa yang menyimpannya, dan apa akibatnya.** Ia
  tidak pernah menjelaskan sidik jari, garam, atau cara memecahkan kata sandi —
  termasuk di beat "kunci yang lahir dari kata yang kamu ketik", yang berhenti
  tepat di satu kalimat: gemboknya tidak pernah lebih kuat dari kata itu.
- Kalau batas ini diterima, catatan bertanggal 2026-08-17 di T12 perlu ditulis
  ulang — bukan dibiarkan, karena ia sekarang menunjuk alasan yang sudah tidak
  berlaku.

**Batas dengan topik lain:**

- **T15 · Apa itu firewall** — bersambung, tidak bertabrakan. Penjaga T15
  membaca label dan tidak pernah membuka kotaknya; beat "labelnya tetap terbaca"
  di sini menjelaskan dari sisi sebaliknya kenapa label itu memang harus tetap
  terbaca. **Tapi harganya urutan rilis:** T14 → T15 → topik ini semuanya
  "umum → dev", tiga berturut-turut. Ini persis beban yang dulu dipikul T16.
  Kalau retensi T15 turun, sisipkan T13 di antaranya.
- **T05 · Perjalanan satu alamat web** — nol singgungan, dan itu disengaja. T05
  memegang salaman pembuka sebagai **ongkos** (kunjungan pertama yang lambat).
  Topik ini tidak punya satu pun scene tentang salaman, karena seluruh sudutnya
  dimulai **setelah** kunci itu ada.

**Yang belum beres — semua sumber. Tidak satu pun sudah dibuka**, dan tidak satu
klaim pun boleh masuk naskah tanpa baris `sumber:`:

- **Tiga tempat loker terbuka** (di perjalanan / saat tersimpan / di dua ujung) →
  dokumen resmi penyedia yang bersangkutan, bukan artikel ringkasan. Ini bagian
  yang paling mudah salah dan paling mahal kalau salah. **Sebut nama layanan
  hanya kalau dokumennya sudah dibuka sendiri.**
- **Cadangan otomatis membatalkan janji dua-ujung** → halaman bantuan resmi
  layanan pesan + layanan cadangannya. Yang harus dibaca persis: apakah
  cadangannya ikut terkunci secara bawaan, dan siapa yang memegang kuncinya
  kalau ya. Beat ini berdiri atau jatuh di situ.
- **Kunci pemulihan / titipan kunci** → dokumentasi resmi fitur pemulihan akun
  yang bersangkutan. Klaim "mereka bisa mengembalikan isimu berarti mereka punya
  kuncinya" harus dicek batasnya sebelum diucapkan sekuat itu — ada bentuk
  pemulihan yang tidak berarti demikian, dan kalau bentuk itu umum, hook bagian
  1 perlu ditulis ulang.
- **Kunci yang diturunkan dari kata sandi** → dokumen NIST untuk fungsi
  penurunan kunci. Nama fungsinya jangan ditulis dari ingatan, dan di L1 ia
  tetap "kunci yang lahir dari kata yang kamu ketik".
- **Jangan ada angka sama sekali di bagian 3–6.** Sama seperti T14 dan T15.
  Godaan terbesarnya "butuh sekian miliar tahun untuk membobolnya" — angka
  dengan asumsi yang tidak pernah ikut disebut. Kalau dipakai, tempatnya cuma
  `[case]`, dengan sumbernya.

**Peluang visual terkuat: satu kunci yang tidak pernah berganti bentuk, dan
seluruh episode cuma soal ia sedang tergeletak di mana.** Digantung di dinding
gudang (bagian 3), pindah ke laci mejamu (bagian 4), tetap di laci itu sementara
gudangnya kebobolan (bagian 5), lalu diam-diam muncul salinannya di gudang kedua
(bagian 6). Penonton bisa membaca seluruh kemajuan episode dari satu benda itu
saja, tanpa satu kata pun — dan frame terakhirnya adalah pertanyaan yang sama
dengan judulnya.

Gerakan kedua: **tombol yang bercabang.** Tombol "Lupa password?" yang sama
persis muncul di bagian 1 dan kembali di bagian 5 dan 7 — tiga kali, tanpa
pernah berubah bentuk. Yang berubah cuma seberapa banyak yang penonton tahu saat
melihatnya.
