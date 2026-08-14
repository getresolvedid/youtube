---
kode: T14
slug: dns-server
judul_kerja: Dari mana komputermu tahu harus pergi ke mana?
pilar: P2 · Di Balik Aplikasi
lapis: umum → dev
what: DNS server
status: vo                # ketiganya masuk fase 4
naskah_beku:              # gerbang § Sumber dibuka lebih dulu — keenam baris ⚠ ditutup
  L: 2026-08-14
  S1: 2026-08-14
  S2: 2026-08-14
karakter_terpakai: 6285   # 2026-08-14 · L 4.866 + S1 738 + S2 681 — sekali jalan, nol generate ulang
tanggal_target:
---

# T14 · Apa itu DNS server

Disusun mengikuti **flow 7 bagian** ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)).

| # | Bagian | Isi |
|---|---|---|
| 1 | **[question]** | Kamu ketik satu nama. Dari mana komputermu tahu harus pergi ke mana? |
| 2 | **brand opening** | kartu judul standar |
| 3 | **[problem]** | Tempatnya tidak punya nama, ia punya nomor — dan nomornya berubah-ubah. Satu daftar berisi semuanya tidak akan pernah selesai dibuat: isinya sudah basi sebelum halaman terakhir jadi. |
| 4 | **[answer] → [what]** | Nomornya tidak disimpan, ia **ditanyakan**. Loket yang ditanya nama dan menjawab nomor — dan loket itu tidak memegang buku apa pun. Loketnya = **DNS server**. |
| 5 | **[why]** | Dua sebab: **tidak ada yang perlu tahu semuanya** (tiap loket cuma menunjuk loket berikutnya, jadi yang punya situs bisa mengganti nomornya sendiri) dan **jawabannya dicatat** (sebagian besar pertanyaan berhenti di catatan terdekat). |
| 6 | **[explaining]** | Umur catatan, dan kenapa "menunggu propagasi" itu nama yang salah · satu nama memegang lebih dari satu jenis catatan · pertanyaannya terkirim polos, dan siapa pun di jalur bisa menjawab duluan · amplop vs segel — dua tambalan yang bukan hal yang sama. |
| 7 | **[case]** | Apa yang benar-benar berubah saat orang ganti nomor loket: yang tadinya dijawab salah jadi dijawab benar. Itu terbuka, bukan kencang — dan loket barunya tetap melihat semua yang kamu tanyakan. |

## Penjelasan 5 tahun

> Setiap tempat di internet punya nomor, bukan nama. Kamu cuma hafal namanya.
> Jadi sebelum berangkat, komputermu bertanya dulu ke loket: nomor tempat ini
> berapa? Loketnya tidak tahu semua, tapi ia tahu harus bertanya ke siapa.
> Beberapa kali bertanya, nomornya ketemu — lalu dicatat, supaya besok tidak
> usah bertanya lagi.

*(48 kata, nol istilah teknis.)*

**Analogi utama:** deretan loket yang saling menunjuk. Satu analogi untuk seluruh
episode ([docs/09](../../docs/09-tangga-abstraksi.md) aturan 4) — tidak ada buku
telepon, tidak ada tukang pos, tidak ada peta. Buku memang muncul sekali di
`daftar-yang-basi`, tapi justru sebagai **jalan yang ditutup**, bukan sebagai
gambaran tandingan.

**Titik putus analogi** — ketiganya wajib disebut di VO, bukan cuma dicatat di sini:

1. **Loketnya tidak memegang buku.** Ia cuma menunjuk loket berikutnya, dan cuma
   loket terakhir yang benar-benar punya jawabannya (`tangga`).
2. **Catatannya punya umur.** Dua orang bisa mendapat jawaban berbeda untuk nama
   yang sama di detik yang sama, dan yang lama belum tentu salah — ia cuma belum
   kedaluwarsa (`umur-catatan`).
3. **Tidak ada yang memeriksa identitas loket.** Komputermu percaya jawaban
   pertama yang datang (`polos`).

## Satu kalimat bawa-pulang

> Sebelum kamu sampai ke mana pun, ada yang ditanya dulu. Ganti loketnya boleh —
> tapi yang berubah cuma siapa yang menjawab, bukan seberapa cepat kamu sampai.

## Naik tangga

| Tangga | Isi |
|---|---|
| **L1** | Tempatnya punya nomor, kamu punya namanya. Ada loket yang ditanya, dan loket itu menunjuk loket berikutnya. Jawabannya dicatat supaya tidak usah bertanya lagi. |
| **L2** | Nama diselesaikan dari kanan ke kiri lewat pendelegasian bertingkat. Loket yang bertanya untukmu berbeda dari loket yang memegang jawabannya. Catatan punya umur yang ditentukan pemilik namanya. Pertanyaannya dikirim polos. |
| **L3** | Kenapa "propagasi" nama yang salah untuk kedaluwarsanya cache; kenapa memindahkan sebuah nama bisa mematikan surat sementara halamannya baik-baik saja; kenapa menyamarkan pertanyaan dan menandatangani jawaban menyelesaikan dua masalah yang berbeda. |

## Kamus istilah → L1

| Istilah | Kalimat L1 pembuka | Scene |
|---|---|---|
| nomor tempat | "Papan namanya dicopot; yang tersisa cuma nomor." | `nomor-bukan-nama` |
| D N S server | "Loket yang ditanya nama, menjawab nomor." | `loket` |
| loket akar & tingkatannya | "Loket pertama tidak tahu situsnya. Ia cuma tahu siapa yang mengurus akhirannya." | `tangga` |
| catatan sementara | "Jawabannya ditulis di jalan pulang." | `dicatat` |
| umur catatan | "Tiap catatan punya tanggal habis." | `umur-catatan` |
| jenis catatan | "Satu nama, beberapa kartu berbeda di laci yang sama." | `jenis-catatan` |
| jawaban palsu | "Siapa pun di jalur bisa menjawab duluan." | `polos` |
| amplop & segel | "Yang satu menutupi pertanyaannya, yang satu menandatangani jawabannya." | `amplop-vs-segel` |

## Sumber

Keenam baris dibuka **2026-08-14**. Yang lima dari spesifikasi terbuka, yang satu
diukur sendiri di mesin ini.

| Klaim | Sumber | Status |
|---|---|---|
| Nama diselesaikan dari kanan ke kiri; tiap tingkat mendelegasikan ke tingkat di bawahnya | **RFC 1034** *Domain Names — Concepts and Facilities* (Nov 1987) §4.2.1 & §5.3.3 | ✅ dibuka |
| Jawaban disimpan sementara, umurnya ditentukan **pemilik namanya** | **RFC 1034** §3.6: *"The TTL is assigned by the administrator for the zone where the data originates."* · **RFC 1035** §3.2.1 | ✅ dibuka |
| Satu nama memegang beberapa jenis catatan; alamat surat terpisah dari alamat halaman | **RFC 1035** §3.2.2 (A, NS, CNAME, SOA, PTR, MX, TXT) · **RFC 3596** *DNS Extensions to Support IP Version 6* (Okt 2003, Internet Standard) untuk AAAA | ✅ dibuka |
| Pertanyaannya dikirim polos — tidak tertutup dan tidak bertanda tangan | **RFC 1035** §4.2 (UDP & TCP port 53, tanpa satu pun mekanisme kerahasiaan atau otentikasi) | ✅ dibuka |
| Tambalan **menyamarkan** pertanyaannya | **RFC 7858** *Specification for DNS over TLS* (Mei 2016, Proposed Standard, port 853) · **RFC 8484** *DNS Queries over HTTPS* (Okt 2018, Proposed Standard) | ✅ dibuka |
| Tambalan **menandatangani** jawabannya | **RFC 9364** = **BCP 237** *DNS Security Extensions (DNSSEC)* (2023); intinya **RFC 4033 + 4034 + 4035** (Mar 2005), dengan **RFC 6840** sebagai dokumen inti tambahan | ✅ dibuka |
| Jumlah dan sifat loket akar | root-servers.org, dibaca 2026-08-14: **13 huruf A–M**, **12 organisasi** pengelola, **2.003 instance** operasional | ✅ dibuka — jebakannya nyata, lihat di bawah |
| Waktu bertanya nama, pertama vs yang sudah tercatat | diukur sendiri, `tools/ukur-dns.mjs` | ✅ diukur — hasilnya **bukan yang diduga**, lihat di bawah |

### Jebakan loket akar — angkanya tiga, bukan satu

Ini persis jebakan yang diperingatkan [`ide.md`](ide.md), dan angkanya sekarang ada:
**13** itu jumlah **huruf/alamat**, **12** jumlah **organisasi** yang
mengelolanya, dan **2.003** jumlah **mesin** yang sungguhan melayani. Hampir
semua artikel populer menyebut yang pertama seolah yang ketiga.

**Tidak satu pun dari ketiganya masuk VO**, dan itu keputusan, bukan kelalaian:
`06-tangga` menggambarkan tangganya tanpa pernah menghitung anak tangganya.
Kalau nanti ada yang ingin menambahkannya, yang benar disebut **"tiga belas
alamat, ribuan mesin"** — menyebut "13 server" saja adalah kesalahan yang
justru sedang dikoreksi episode ini.

### Pengukuran — dan kenapa angkanya TIDAK masuk layar

`node tools/ukur-dns.mjs`, di mesin ini, lewat loket 8.8.8.8, median dari 25
pasang:

| Yang diukur | Hasil |
|---|---|
| Nama acak: tanya pertama vs tanya kedua ke loket yang sama | 34,2 ms vs 32,2 ms — **selisihnya hilang di derau** |
| Nama nyata: tanya pertama vs kedua | 26,5 ms vs 26,2 ms — **tidak terukur** |
| **Bertanya ke loket vs catatan di mesin sendiri** | **26,5 ms vs 1,1 ms — 24×** |

**Temuannya bukan yang diduga, dan itu justru berguna.** Selisih antara
pertanyaan yang menempuh tangga dan yang berhenti di catatan **loketnya** tidak
terukur dari sini: perjalanan ke loket itu sendiri (~26 ms) menelan semuanya.
Yang benar-benar terukur adalah catatan **di mesinmu sendiri** — dan itu persis
yang digambarkan `07-dicatat` ("pertanyaan berikutnya berhenti di catatan
pertama"). Jadi klaim scene itu ditopang; yang tidak ditopang adalah klaim
apa pun tentang seberapa cepat loketnya menjawab dari catatannya.

**Karena itu tidak ada angka yang ditambahkan ke `12-ganti-loket` beat 4.**
Direction scene itu mengizinkannya *kalau pengukurannya jadi* — tapi yang
dibutuhkan di sana adalah porsi waktu bertanya terhadap **seluruh pemuatan
halaman**, dan itu tidak diukur. Bilah tanpa angka tetap jadi buktinya.

> **GERBANG SUMBER SUDAH LEWAT** — blok 🔗 Sumber di
> [`render/publish.md`](render/publish.md) boleh diisi, dan sudah.
>
> **`naskah_beku` masih kosong, dan itu keputusan manusia, bukan turunan tabel
> di atas** ([docs/04 §5](../../docs/04-pipeline-produksi.md#5-gerbang--bekukan-naskah)).
> Membekukan berarti mengizinkan generate VO, dan VO dibayar per karakter.
>
> **Jangan menambahkan angka ke scene mana pun hanya karena gerbangnya sudah
> lewat.** Seluruh rencana VO episode ini ditulis tanpa satu angka pun dengan
> sengaja — angka di bagian 3–6 memang tidak bisa dibayangkan siapa pun
> ([docs/09](../../docs/09-tangga-abstraksi.md)).

## Kamus pengucapan

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| D N S | DNS | dieja per huruf; ditulis utuh "DNS" akan dibaca "dens" |
| internet | internet | dibaca wajar, aman |
| alamat | I P address | sengaja **tidak** memakai "I P" sama sekali di VO |
| loket | D N S server | benda L1-nya; nama resminya cuma jatuh sekali di `loket` |

---

## Video panjang — T14-L

### Scene standar (tanpa VO)

| Scene | Isi | Posisi | Durasi |
|---|---|---|---|
| `opening` | kartu judul — **"DNS" / "Domain Name System"** | bagian 2, setelah `hook-alamat` | `OPENING_SECONDS` |
| `closing` | tanda tangan brand, tanpa judul | setelah `ganti-loket` | `CLOSING_LONG_SECONDS` |

Judulnya diatur di `Episode.tsx` (`JUDUL` + `SUBJUDUL`). Keduanya **tidak ditulis
di episode ini** — `tools/bangun-timing.mjs` menyisipkannya sendiri ke
`timing.gen.ts` dan `Episode.tsx` memasang `<KartuJudul>` serta `<TandaBrand>`
dari `shared/StandarScenes.tsx` ([docs/10](../../docs/10-scene-standar.md)).

> **Kartu judul menulis "DNS" di sekitar detik sepuluh, dan itu disengaja.**
> Sama seperti T01: yang dilarang HARD RULE 6 adalah **VO** yang menyebut nama
> sebelum bendanya berdiri, bukan kartu judulnya. Karena itu penamaan di
> `05-loket` ditulis sebagai penegasan — "loket itu namanya D N S server" —
> bukan sebagai perkenalan. Tidak ada satu pun scene yang mengeja kepanjangannya
> lewat VO; kepanjangan itu tugas kartu judul, sekali, tanpa suara.

### Scene

**Daftar isi episode, bukan tempat kalimatnya hidup.** Teks VO tiap scene ada di
`scenes/<kunci>-vo.md` dan apa yang terjadi di layar di
`scenes/<kunci>-direction.md` (HARD RULE 3 & 4). Yang ditetapkan tabel ini cuma
tiga: **ada scene apa saja, urutannya, dan di bagian flow mana** — dan itulah
yang dibaca `tools/baca-episode.mjs` untuk menghitung nomor urut tiap berkas.

| # | Bagian | Ringkas |
|---|---|---|
| hook-alamat | 1 question | Nama diketik, halaman muncul. Diputar ulang pelan: di antara keduanya ada celah, dan di celah itu komputernya belum tahu harus ke mana. |
| nomor-bukan-nama | 3 problem | Papan nama tokonya dicopot; yang tersisa nomor. Komputer cuma bisa pergi ke nomor, kamu cuma hafal nama. |
| daftar-yang-basi | 3 problem | Jalan keluar yang paling masuk akal — satu daftar berisi semuanya — dicoba, lalu gagal di depan mata: barisnya kedaluwarsa lebih cepat daripada bisa ditulis. |
| loket | 4 answer | Kalau tidak bisa disimpan, ditanyakan. Satu loket, satu pertanyaan, satu jawaban — dan lacinya kosong. Namanya jatuh di sini, sekali. |
| tangga | 5 why | Namanya dibaca dari kanan ke kiri. Tiap potongan membuka loket berikutnya, sampai loket terakhir yang benar-benar memegang jawabannya. |
| dicatat | 5 why | Naik tangga tiap kali justru lebih lambat daripada daftar tadi. Makanya jawabannya ditulis di sepanjang jalan pulang, dan pertanyaan berikutnya berhenti di catatan pertama. |
| umur-catatan | 6 explaining | Tiap catatan punya tanggal habis. Situs pindah nomor, sebagian orang masih ke tempat lama — bukan karena ada yang disebarkan, tapi karena catatan lama belum kedaluwarsa. |
| jenis-catatan | 6 explaining | Satu nama tidak memegang satu kartu. Ada kartu alamat halaman, kartu alamat surat, dan kartu yang isinya cuma "tanya nama lain saja". |
| polos | 6 explaining | Pertanyaannya berjalan tanpa amplop. Siapa pun di jalur bisa membacanya — dan bisa menjawab duluan. Yang bertanya percaya jawaban yang datang pertama. |
| amplop-vs-segel | 6 explaining | Dua tambalan yang sering dikira satu barang, disandingkan: amplop menutupi pertanyaannya tapi tidak membuktikan apa pun; segel membuktikan jawabannya asli tapi tidak menutupi apa pun. |
| ganti-loket | 7 case | Mundur ke tangga utuh: apa yang benar-benar berubah saat loketnya diganti, dan apa yang tidak berubah sama sekali. Ditutup kalimat bawa-pulang. |

### Timing — estimasi

Keluaran `npm run gen`. Opening dan closing sudah ikut terhitung di sana, jadi
tidak ada angka yang ditambahkan manual.

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 1 — T14-S1 · "Nugget"

**Insight:** nama situs itu dibaca dari belakang, dan tiap potongan membuka satu
loket berikutnya.
**Target:** 40–60 dtk · ~115 kata · L1
**Berkas:** `scene-shorts/s1-nugget/` — id komposisi `t14-s1-01-…`, Short utuh `T14-dns-server-s1`.

Berdiri sendiri: penonton yang tidak pernah membuka video panjangnya tetap
pulang membawa satu hal utuh — arah bacanya terbalik, dan itu yang menjelaskan
kenapa tidak ada satu pun tempat yang perlu tahu semuanya. Tidak ada satu
kalimat pun yang menuntut penonton sudah menonton yang lain.

> **Hook-nya ditulis ulang dari nol.** Video panjang membuka dengan celah antara
> mengetik dan halaman muncul (`01-hook-alamat`); Short ini membuka dengan klaim
> soal arah baca — kalimat yang tidak ada di episode mana pun
> ([docs/02 § Aturan Shorts](../../docs/02-format-video.md)). Yang diwarisi cuma
> komponen visualnya (`Loket`, `NamaSitus`, `Penanda`), tidak pernah kalimatnya.

> **Tanpa angka sama sekali.** Tidak ada jumlah loket akar, tidak ada waktu
> bertanya. Keduanya baris ⚠ di [§ Sumber](#sumber), dan Short ini memang tidak
> membutuhkannya untuk berbunyi.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| dari-belakang | hook | Nama situs utuh memenuhi layar; penanda masuk dari kanan. Klaimnya jatuh di frame pertama, tanpa pengantar. |
| kamu-kiri | hook | Kamu membacanya dari kiri. Yang mengantarmu ke sana membacanya persis terbalik. |
| dipotong | ketegangan | Undangan: namanya dipecah di tiap titik jadi potongan yang berdiri sendiri. |
| paling-kanan | payoff | Potongan paling kanan dulu — dan yang ditanya cuma tahu siapa yang mengurus akhiran itu. |
| berikutnya | payoff | Potongan berikutnya membuka loket berikutnya. Tiap loket cuma menunjuk satu tingkat ke atas. |
| ujung | payoff | Potongan paling kiri sampai ke loket ujung — satu-satunya yang benar-benar memegang nomornya. |
| tidak-ada-yang-tahu | tutup | Kenapa arahnya begitu: tidak ada satu pun yang perlu tahu semuanya, jadi tidak ada satu pun yang perlu diperbarui. |
| namanya | tutup | Nama menyusul gambarannya: deretan loket itu namanya D N S. |
| loop | tutup | Balik ke nama utuh — kalimat penutup menyambung ke frame pertama supaya loop-nya mulus. |

### Timing — estimasi

Keluaran `npm run gen`. Closing (`CLOSING_SHORT_SECONDS`) sudah ikut terhitung;
Shorts tidak punya opening (docs/02 § Aturan Shorts).

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

## Short 2 — T14-S2 · "Jebakan"

**Mitos:** "Ganti DNS biar internet kencang."
**Target:** 40–60 dtk · ~115 kata · L1
**Berkas:** `scene-shorts/s2-jebakan/` — id komposisi `t14-s2-01-…`, Short utuh `T14-dns-server-s2`.

Insightnya **berbeda dari Short 1** dan tidak bisa saling menggantikan: S1 soal
*bentuk namanya* (kenapa dibaca mundur, kenapa tidak ada yang tahu semuanya),
S2 soal *apa yang sebenarnya berubah* saat loketnya diganti. Keduanya memakai
loket yang sama sebagai gambar, tapi menjawab pertanyaan yang berbeda.

> **Nama "D N S" jatuh di detik nol, dan itu pengecualian yang disengaja**
> (HARD RULE 6 · [docs/02 § Aturan Shorts](../../docs/02-format-video.md)).
> Mitosnya sendiri berbunyi dengan nama itu; menuliskannya ulang tanpa namanya
> bukan lagi mitos yang dipercaya orang, dan Short ini kehilangan sasarannya.

> **Tanpa angka, dan tanpa menyebut lembaga.** Yang membuktikan klaimnya adalah
> panjang relatif di bilah waktu, bukan satu pun angka — sama seperti
> [`12-ganti-loket`](scenes/12-ganti-loket-vo.md). Pemblokiran disebut lewat
> mekanismenya saja: dijawab salah, lalu dijawab benar.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| mitos | mitos | Kalimatnya ditulis besar di layar apa adanya, dibaca datar tanpa dibantah dulu. |
| salah | bantahan | Dicoret. Yang berubah bukan kecepatannya. |
| tanya-dulu | bantahan | Undangan: sebelum berangkat, kamu tanya alamatnya dulu ke loket di pojok. |
| sekali-di-awal | bukti | Bilah waktu satu halaman: bertanya cuma potongan paling pendek di paling depan. |
| sisanya-sama | bukti | Loketnya diganti; sisa bilah yang panjang tidak tersentuh sama sekali. |
| dijawab-salah | bukti | Yang benar-benar berubah: nama yang tadinya dijawab silang, sekarang dijawab nomor. |
| terbuka | konsekuensi | Dua kata yang dibawa pulang: terbuka, bukan kencang. |
| tetap-melihat | konsekuensi | Loket barunya tetap melihat semua yang kamu tanyakan — yang berubah cuma siapa yang menjawab. |
| pilih | konsekuensi | Jadi menggantinya boleh, asal tahu apa yang dibeli. CTA halus ke video panjang. |

### Timing — estimasi

Keluaran `npm run gen`.

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Metadata publish

**Pindah ke [`render/publish.md`](render/publish.md).** Judul, deskripsi,
chapter, tag, playlist, brief thumbnail, dan jadwal rilis — untuk video panjang
dan kedua Short — hidup di sana, satu berkas yang dibuka di sebelah halaman
unggah YouTube. Aturannya: [docs/06](../../docs/06-publishing.md).

Yang tetap di sini cuma bahan mentahnya: daftar scene di atas, dan
[§ Sumber](#sumber) yang gerbangnya masih menahan blok 🔗 Sumber di berkas itu.
