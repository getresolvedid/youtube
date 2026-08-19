---
kode: T18
slug: tcp-ip
judul_kerja: Apa Itu TCP/IP?
pilar: P2 · Di Balik Aplikasi
lapis: umum
what: TCP/IP
status: render
naskah_beku:
  L: 2026-08-18
  S1: 2026-08-18
  S2: 2026-08-18
  S3: 2026-08-18
  S4: 2026-08-18
karakter_terpakai: 6137
tanggal_target:
---

# T18 · Apa Itu TCP/IP?

> **DIBANGUN DARI STORYBOARD USULAN, ATAS KEPUTUSAN USER 2026-08-18.**
> Sumbernya [`storyboard-usulan.md`](storyboard-usulan.md), dipakai sebagai
> kerangka apa adanya. Penyimpangannya dari kontrak repo dicatat di
> [§ Penyimpangan tercatat](#penyimpangan-tercatat) di bawah — **bukan** untuk
> ditawar ulang, tapi supaya sesi berikutnya tidak "memperbaikinya" dan supaya
> jelas mana yang keputusan sadar dan mana yang kelalaian.

## Penyimpangan tercatat

Topik ini **tidak** mengikuti sebagian aturan yang mengikat episode lain. Semua
di bawah ini disengaja dan diputuskan user; tidak satu pun boleh "dirapikan"
tanpa keputusan baru.

| Yang dilanggar | Bentuknya di sini | Aturan aslinya |
|---|---|---|
| **HARD RULE 6** — nama menyusul gambaran | "TCP/IP" jatuh di scene 1 baris ketiga, dan scene 3 adalah definisi | `[what]` dinamai sekali di bagian 4 |
| **Flow 7 bagian** | urutannya definisi → analogi → komponen → contoh → kesimpulan; tidak ada `[problem]` | docs/02 § Anatomi video panjang |
| **docs/09 aturan 4** — satu analogi | empat: buku aturan, paket kurir, rumah bernomor, sepuluh kotak | satu analogi per episode |
| **Kosakata L1** | "protokol", "data", "packet", "request", "server", "routing" dipakai di VO | docs/09 § Kosakata L1 |
| **Batas T05/T14** | scene 10 dan 11 membuka DNS dan "perjalanan satu alamat web" | batas yang dipatok 2026-08-18 di docs/07 |
| **Bahasa teks layar** | sebagian teks layar berbahasa Inggris, mengikuti storyboard | channel berbahasa Indonesia |

**Yang TETAP ditegakkan**, karena struktural dan bukan gaya:

- **Satu scene = tiga berkas** (`-vo.md`, `-direction.md`, `.tsx`) — HARD RULE 1 · 3 · 4.
- **Opening & closing standar** dari `shared/` — docs/10. Storyboard tidak
  punya keduanya; `tools/baca-episode.mjs` menyisipkannya sendiri. Scene 12
  storyboard tetap ada sebagai `penutup`, di depan kartu brand.
- **Timing tidak diketik tangan.** Timecode di storyboard (00:00–00:15 dst.)
  **tidak dipakai** — durasi dihitung `npm run gen` dari jumlah kata tiap baris
  `## VO`. Angka storyboard-nya meleset dari perhitungan itu (VO scene 1 saja
  ±22 dtk, bukan 15) dan yang mengikat perhitungannya.
- **30 fps, 1920×1080, dari `.env`.** Storyboard menulis 24 fps; angka itu
  diabaikan — spesifikasi video milik `.env` (docs/08), bukan dokumen naskah.
- **Deterministik** — nol `Math.random()`/`Date.now()` di komposisi.
- **SFX tidak dibangun.** Repo ini belum punya jalur produksi SFX sama sekali
  (tidak ada folder, tidak ada aturan level, tidak ada perintah). Seluruh blok
  SFX di storyboard disimpan di berkas direction sebagai catatan untuk nanti,
  tidak dieksekusi.

## Penjelasan 5 tahun

> Kirimanmu dipotong jadi banyak amplop kecil, dan tiap amplop diberi nomor
> urut. Tukang antarnya cuma berusaha — ada amplop yang telat, nyasar, atau
> hilang. Di ujung sana ada yang menyusun ulang menurut nomornya, lalu menagih
> yang belum datang. Makanya yang kamu terima selalu utuh dan urut, padahal
> jalannya berantakan.

*(51 kata, nol istilah teknis.)* Diambil dari [`ide.md`](ide.md). **Tidak
tercermin di VO episode ini** — VO-nya mengikuti storyboard, yang membuka dengan
definisi. Blok ini tetap ditulis karena ia syarat topik masuk backlog.

## Satu kalimat bawa-pulang

> IP mengurus **ke mana** kirimannya pergi. TCP mengurus **apakah ia sampai
> dengan benar**. Keduanya tugas yang berbeda, dan itulah kenapa namanya ditulis
> dua.

## Naik tangga

| Tangga | Isi |
|---|---|
| **L1** | Data dipecah jadi potongan kecil bernomor, tiap potongan mencari jalannya sendiri, lalu disusun ulang di tujuan. |
| **L2** | IP = alamat & jalur. TCP = kelengkapan & urutan, termasuk meminta ulang potongan yang tidak sampai. |
| **L3** | *Tidak digarap di episode ini.* Salaman tiga langkah, jendela kirim, dan kehilangan sebagai sinyal kendali semuanya di luar storyboard — lihat [`ide.md`](ide.md) kalau topik ini digarap ulang. |

## Sumber

**GERBANG TERBUKA — 2026-08-18.** Kelima klaim ditelusuri ke dokumen primer,
dan kelimanya dibuka, bukan ditulis dari ingatan.

| Klaim | Sumber | Kutipan |
|---|---|---|
| IP mengurus pengalamatan dan penerusan menuju tujuan | RFC 791 §1.4, §2.3 | *"The internet modules use the addresses carried in the internet header to transmit internet datagrams toward their destinations."* · *"The datagrams are routed from one internet module to another … based on the interpretation of an internet address."* |
| Pengantarnya tidak menjanjikan apa pun — inti bagian 3 & 4 | RFC 791 §1.2, §1.4 | *"There are no mechanisms to augment end-to-end data reliability, flow control, sequencing, or other services commonly found in host-to-host protocols."* · *"The internet protocol does not provide a reliable communication facility. There are no acknowledgments … There are no retransmissions. There is no flow control."* |
| Kiriman dipecah jadi potongan | RFC 791 §1.4, §2.3 | *"The internet protocol also provides for fragmentation and reassembly of long datagrams, if necessary, for transmission through 'small packet' networks."* |
| TCP mengurus kelengkapan, urutan, dan pengiriman ulang | **RFC 9293** §2.2, §3.4, §3.8 | *"TCP reliability consists of detecting packet losses (via sequence numbers) and errors (via per-segment checksums), as well as correction via retransmission."* · *"every octet of data sent over a TCP connection has a sequence number … an acknowledgment of sequence number X indicates that all octets up to but not including X have been received."* |
| UDP dipakai saat pengiriman ulang tidak dibutuhkan | RFC 768 | *"delivery and duplicate protection are not guaranteed"* · *"Applications requiring ordered reliable delivery of streams of data should use the Transmission Control Protocol (TCP)."* |
| DNS menerjemahkan nama jadi alamat (scene 10 & 11) | RFC 1035 | *"The goal of domain names is to provide a mechanism for naming resources in such a way that the names are usable in different hosts, networks, protocol families, internets, and administrative organizations."* |

**Versi dokumen TCP-nya penting, dan inilah kenapa berkas ini menyebutnya
tebal.** Spesifikasi TCP yang berlaku adalah **RFC 9293 (Agustus 2022,
Internet Standard, STD 7)**, yang **menggantikan RFC 793** beserta 793, 879,
2873, 6093, 6429, 6528, dan 6691. Menyebut "RFC 793" di deskripsi atau di
komentar kode berarti menunjuk dokumen yang sudah tidak berlaku — kesalahan
yang tidak menghasilkan error apa pun dan bertahan bertahun-tahun.

### Satu klaim yang BUKAN kutipan harfiah, dan itu harus dibedakan

VO scene 6 dan Short 2 mengatakan potongan **"dapat melewati jalur yang
berbeda"**. RFC 791 tidak pernah menuliskan kalimat itu. Yang ia tuliskan:

> *"The internet protocol treats each internet datagram as an independent
> entity unrelated to any other internet datagram."* — §1.4

digabung dengan §1.2 yang menyatakan tidak ada jaminan **sequencing**. Jalur
yang berbeda adalah **akibat wajar** dari keduanya di jaringan yang meneruskan
tiap datagram sendiri-sendiri — bukan kalimat yang bisa dikutip. Dibiarkan di
VO karena ia benar dan bisa digambar; dicatat di sini supaya tidak ada yang
kelak menaruh tanda kutip di sekelilingnya.

> **Angka yang tampil di layar tetap bukan klaim.** `192.168.1.10` dan
> `93.184.0.10` dipakai sebagai **contoh bentuk**, bukan alamat yang mengklaim
> milik siapa pun. Nomor potongan 01–10 juga cuma "banyak dan berurutan",
> bukan ukuran yang sebenarnya — RFC 791 §2.3 justru menyebut ukuran potongan
> ditentukan jaringan yang dilewatinya, dan episode ini sengaja tidak
> menyebut satu angka pun untuk itu.
## Kamus pengucapan

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| TCP IP | T C P — I P | dieja per huruf. **Ditulis TANPA garis miring di blok `## VO`** — simbol mentah dibaca mesin TTS tidak terduga dan ikut terbawa ke berkas subtitel penonton (`vo-script-audit` menolaknya sebagai tingkat A). Bentuk tertulis `TCP/IP` tetap dipakai di judul, deskripsi, dan teks layar |
| IP | I P | dieja per huruf, **terdaftar** |
| TCP | T C P | dieja per huruf, **terdaftar** |
| UDP | U D P | dieja per huruf, **terdaftar** |
| DNS | D N S | dieja per huruf, **terdaftar** |
| HTTP | H T T P | dieja per huruf, **terdaftar** |
| HTTPS | H T T P S | dieja per huruf, **terdaftar** |
| packet | paket | dibaca "paket", bukan ejaan Inggris |

---

## Video panjang — T18-L

### Scene standar (tanpa VO)

| Scene | Isi | Posisi | Durasi |
|---|---|---|---|
| `opening` | kartu judul — **"TCP/IP" / "Aturan yang dipakai internet"** | setelah `hook` | `OPENING_SECONDS` |
| `closing` | tanda tangan brand, tanpa judul | setelah `penutup` | `CLOSING_LONG_SECONDS` |

Judulnya diatur di `Episode.tsx` (`JUDUL` + `SUBJUDUL`); `tools/bangun-timing.mjs`
yang menyisipkan kedua scene itu ke `timing.gen.ts`.

### Scene

**Daftar isi episode, bukan tempat kalimatnya hidup.** Teks VO tiap scene ada di
`scenes/<kunci>-vo.md` dan apa yang terjadi di layar di
`scenes/<kunci>-direction.md` (HARD RULE 3 & 4).

| # | Bagian | Ringkas |
|---|---|---|
| hook | 1 question | Laptop di meja, halaman sedang dimuat. Kamera masuk ke layar, titik cahaya keluar jadi paket, lalu mundur cepat memperlihatkan jaringan besar. Nama topiknya jatuh di tengah jaringan. |
| apa-itu | definisi | Paket mengecil jadi jaringan berisi laptop, ponsel, desktop, server. Tiga label — kirim, alamat, sampaikan — melebur jadi satu nama, lalu berubah jadi buku aturan. |
| analogi-paket | analogi | Dunia nyata: kotak dilabeli pengirim dan tujuan, dibawa kendaraan, melewati persimpangan. Kotak berubah jadi paket data, jalan berubah jadi jalur jaringan. |
| ip-address | ip | Deretan rumah bernomor, kurir mencari yang cocok. Rumah berubah jadi komputer, nomor rumah berubah jadi alamat. |
| jadi-paket | packet | Satu pesan utuh dipecah jadi empat potongan bernomor. Tiap potongan berangkat lewat jalur yang berbeda, semuanya menuju tujuan yang sama. |
| peran-tcp | tcp | Potongan tiba satu per satu, tapi nomor dua tidak pernah datang. Penerima menandai lubangnya, meminta ulang, dan potongan itu dikirim lagi sampai lengkap. |
| analogi-tcp | analogi | Sepuluh kotak bernomor tiba tidak berurutan, disusun ulang di tujuan. Satu kotak hilang, diminta lagi, lalu barisannya utuh. |
| tcp-plus-ip | gabungan | Layar dibelah dua: satu sisi alamat dan jalur, satu sisi pemeriksaan dan penyusunan. Keduanya bergerak ke tengah dan menyatu. |
| bukan-hanya | protokol lain | Kamera mundur: nama itu ternyata payung untuk beberapa nama lain, masing-masing dengan satu pekerjaan yang berbeda. |
| buka-website | contoh | Satu perjalanan utuh dari mengetik alamat sampai halaman tampil, menyambung semua yang sudah ditunjukkan. |
| kesimpulan | kesimpulan | Kembali ke jaringan besar. Tiga hal dirangkum berdampingan: alamat, keandalan, dan gabungan keduanya. |
| penutup | penutup | Jaringan mengecil jadi satu titik cahaya, lalu mekar lagi jadi peta. Kartu akhir. |

**Kalau kepanjangan, yang dipangkas duluan `analogi-tcp`** — ia mengulang
mekanisme yang sudah ditunjukkan `peran-tcp`, dan storyboard-nya sendiri
mencatat itu. Berikutnya `bukan-hanya`. `jadi-paket` dan `peran-tcp` tidak boleh
disentuh: keduanya inti episode.

### Timing — estimasi

Keluaran `npm run gen`. Opening dan closing sudah ikut terhitung di sana.

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 1 — T18-S1 · "Bagaimana internet tahu data harus ke mana?"

**Sudut:** alamat & jalur.
**Target:** 40–60 dtk · L1
**Berkas:** `scene-shorts/s1-alamat/` — id komposisi `s1-01-…`, Short utuh `T18-tcp-ip-s1`.

**Hook ditulis ulang dari nol** (docs/02): scene 4 video panjang membuka dengan
kalimat yang mirip, tapi di sana ia lanjutan scene 3 — di sini ia harus berdiri
sendiri di detik nol.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| paket | hook | Sebuah kotak di meja, labelnya cuma "untuk seseorang". Tidak cukup untuk dikirim ke mana pun. |
| alamat | penjelasan | Label alamat ditempelkan. Sekarang kotaknya punya tujuan. |
| jadi-alamat-ip | penjelasan | Kotak berubah jadi paket digital, labelnya berubah jadi alamat angka. |
| cari-jalur | payoff | Paket di persimpangan jaringan. Satu jalur menyala, sisanya tidak. |
| sampai | tutup | Paket tiba. Rangkuman satu baris: alamat dan jalur. |

## Short 2 — T18-S2 · "Data kamu sebenarnya tidak dikirim sekaligus"

**Sudut:** pemecahan jadi potongan.
**Target:** 40–60 dtk · L1
**Berkas:** `scene-shorts/s2-potongan/` — id komposisi `s2-01-…`, Short utuh `T18-tcp-ip-s2`.

**Pekerjaannya berbeda dari Short 1**, dan keduanya tidak bisa saling
menggantikan: S1 soal *ke mana* satu kiriman pergi, S2 soal *berapa banyak
benda* yang sebenarnya berjalan. Loop-nya lewat bidang `FILE` yang sama di
frame pertama dan frame terakhir.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| terlalu-besar | hook | Satu berkas besar mencoba lewat dan tidak muat. |
| dipecah | penjelasan | Berkas terbelah jadi lima potongan bernomor. |
| jalur-beda | payoff | Kelimanya berangkat lewat jalur yang berbeda-beda. |
| disusun | payoff | Di tujuan, kelimanya disatukan kembali. |
| utuh | tutup | Berkasnya terbuka utuh. Rangkuman satu baris. |

## Short 3 — T18-S3 · "Apa yang terjadi kalau satu potongan hilang?"

**Sudut:** kelengkapan & kirim ulang.
**Target:** 40–60 dtk · L1
**Berkas:** `scene-shorts/s3-hilang/` — id komposisi `s3-01-…`, Short utuh `T18-tcp-ip-s3`.

**Ini satu-satunya keluaran topik ini yang urutannya kebetulan sesuai
HARD RULE 6** — masalahnya berdiri dan terlihat di scene 2, dan nama `TCP` baru
jatuh di scene 3. Kebetulan, bukan rancangan: storyboard yang menaruhnya begitu.

**Koordinat slot penerima milik `scene-shorts/panggung-short.tsx`**
(`slotX`, `Y_SLOT`, `SlotKosong`), bukan salah satu berkas scene. Kelima scene
memakainya, dan slot yang bergeser satu piksel pun antar-scene membatalkan
seluruh Short ini.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| lima-potongan | hook | Lima potongan berangkat menuju penerima. |
| satu-hilang | ketegangan | Nomor tiga tidak pernah sampai. Lubangnya terlihat. |
| ketahuan | ketegangan | Penerima menandai nomor yang belum datang. |
| minta-lagi | payoff | Permintaan dikirim balik ke pengirim. |
| lengkap | payoff | Nomor tiga datang. Semua tanda jadi centang. |
| namanya | tutup | Nama untuk pekerjaan itu baru disebut di sini. |

## Short 4 — T18-S4 · "Apa bedanya TCP dan IP?"

**Sudut:** dua tugas yang berbeda.
**Target:** 40–60 dtk · L1
**Berkas:** `scene-shorts/s4-beda/` — id komposisi `s4-01-…`, Short utuh `T18-tcp-ip-s4`.

> **Nama jatuh di detik nol, dan itu pengecualian yang disengaja** (HARD RULE 6 ·
> [docs/02 § Aturan Shorts](../../docs/02-format-video.md)). Yang dibantah Short
> ini adalah keyakinan yang sudah dipegang penonton tentang dua nama itu;
> menuliskannya ulang tanpa namanya bukan lagi keyakinan yang sama. Bentuk yang
> sama persis dipakai Short 2 T15.

> **Di 9:16 layar dibelah ATAS–BAWAH, bukan kiri–kanan.** Storyboard menulis
> "screen split menjadi dua" dengan sisi kiri dan kanan, tapi itu bentuk 16:9 —
> di bingkai tegak, dua kolom sempit membuat teksnya tidak terbaca di layar HP.
> Perputaran ini sejalan dengan arah jalur yang juga sudah diputar 90°.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| pertanyaan | hook | Dua nama yang selalu disebut bersamaan. Apa bedanya? |
| sisi-ip | penjelasan | Paket di persimpangan, satu tujuan dipilih dari tiga. |
| sisi-tcp | penjelasan | Potongan diperiksa dan diurutkan di tujuan. |
| bersama | payoff | Layar dibelah dua, lalu keduanya menyatu. |
| namanya | tutup | Gabungan keduanya, dan kenapa namanya ditulis dua. |
