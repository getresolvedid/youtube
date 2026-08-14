---
judul: Apa itu DNS server
diusulkan: 2026-08-14
pilar: P2 · Di Balik Aplikasi
lapis: umum → dev
status: lolos → T14
---

# Apa itu DNS server

## Ide mentah

> "dns server"

## Pemetaan ke flow 7 bagian

Flow wajib channel ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)):

| # | Bagian | Isi untuk topik ini |
|---|---|---|
| 1 | **[question]** | "Kamu ketik satu nama. Dari mana komputermu tahu harus pergi ke mana?" |
| 2 | **brand opening** | Sting standar 4,0 dtk |
| 3 | **[problem]** | Tempat-tempat di internet tidak punya nama, mereka punya **nomor** — dan komputer cuma bisa pergi ke nomor. Nomornya panjang, jumlahnya ratusan juta, dan **berubah-ubah**: situs yang sama bisa punya nomor berbeda besok, atau nomor berbeda untuk orang di kota lain. Satu buku besar berisi semuanya tidak akan pernah selesai dicetak — isinya sudah basi sebelum halaman terakhir jadi. |
| 4 | **[answer] → [what]** | Nomornya **tidak disimpan di satu tempat**. Ada loket yang tugasnya cuma satu: ditanya nama, menjawab nomor. Loket itu tidak tahu semua nama — ia tahu **siapa yang lebih tahu**, dan menunjuk ke sana. Loketnya = **DNS server**; seluruh susunan loketnya = **DNS**. `[what]` = DNS server. |
| 5 | **[why]** | Dua sebab, keduanya harus terasa sebagai *solusi atas masalah di bagian 3*: **(a) tidak ada yang perlu tahu semuanya** — tiap loket cuma menyimpan bagiannya sendiri dan menunjuk ke loket berikutnya, jadi yang punya situs bisa mengganti nomornya sendiri tanpa izin siapa pun; **(b) jawabannya dicatat sebentar** — sebagian besar pertanyaan berhenti di catatan terdekat dan tidak pernah menempuh seluruh tangga. Tanpa (a) sistemnya tidak bisa berubah; tanpa (b) sistemnya tidak akan sanggup menahan bebannya. |
| 6 | **[explaining]** | Namanya dibaca **dari kanan ke kiri**, titik paling belakang dulu · tiga tingkat loket (akar → tingkat nama belakang → loket pemilik situsnya) · loket yang **bertanya untukmu** vs loket yang **punya jawabannya** (resolver rekursif vs authoritative) · **umur catatan (TTL)** dan kenapa "menunggu propagasi DNS" itu istilah yang menyesatkan — tidak ada yang disebarkan, yang terjadi cuma catatan lama menunggu kedaluwarsa · satu nama bisa menyimpan lebih dari satu jenis catatan (alamat, alamat baru, alias, alamat surat) · pertanyaannya **terkirim polos** — siapa pun di jalur bisa melihat dan menjawabnya duluan; itu dasar semua babak berikutnya. |
| 7 | **[case]** | Nomor loket yang orang hafal (8.8.8.8, 1.1.1.1) dan apa yang sebenarnya berubah saat menggantinya · **pemblokiran situs lewat DNS** — kenapa ganti loket membuatnya terbuka lagi, dan kenapa itu bukan berarti tersembunyi · lookup pertama vs yang sudah tercatat, dengan angka nyata · satu layanan besar tumbang gara-gara catatannya, bukan gara-gara servernya mati · kalimat bawa-pulang balik ke L1. |

## Penjelasan 5 tahun

> Setiap tempat di internet punya nomor, bukan nama. Kamu cuma hafal namanya.
> Jadi sebelum berangkat, komputermu bertanya dulu ke loket: nomor tempat ini
> berapa? Loketnya tidak tahu semua, tapi ia tahu harus bertanya ke siapa.
> Beberapa kali bertanya, nomornya ketemu — lalu dicatat, supaya besok tidak
> usah bertanya lagi.

*(48 kata, nol istilah teknis.)*

**Titik putus analogi:** loket ini **tidak punya buku** — ia cuma menunjuk loket
berikutnya, dan cuma loket terakhir yang benar-benar memegang jawabannya.
Catatan yang disimpan punya **umur**, jadi dua orang bisa mendapat jawaban
berbeda untuk nama yang sama di detik yang sama — dan yang lama belum tentu
salah, ia cuma belum kedaluwarsa. Dan tidak ada yang memeriksa identitas loket:
siapa pun di jalur bisa menjawab duluan, dan komputermu akan percaya.

Ketiganya **wajib disebut di VO**, bukan cuma dicatat di sini. Yang ketiga
sekaligus jadi jembatan ke babak keamanan di bagian 6.

## Uji 4 syarat

| Syarat | Lolos? | Catatan |
|---|---|---|
| 1 Bahasa anak 5 tahun | ✅ | Analogi loket bertanya, 48 kata |
| 2 Dua lapis (L1 + L3) | ✅ | L1: loket yang menunjuk loket lain. L3: delegasi akar→TLD→authoritative, TTL & negative caching, kenapa "propagasi" salah nama, DoH/DoT vs DNSSEC (menyamarkan vs menandatangani — dua hal berbeda yang sering dikira sama) |
| 3 Ada mekanisme | ✅ | Pertanyaan **berjalan** naik tangga loket dan jawabannya turun; catatan terisi lalu kedaluwarsa; nama dibaca mundur dari kanan. Semuanya bergerak, tidak satu pun daftar poin |
| 4 Bisa diverifikasi | ⚠ | Mekanismenya bersumber RFC (spesifikasi terbuka, bukan "kata orang"), tapi **semua angka yang tampil di layar belum punya sumber** — lihat catatan |

## Sudut video panjang

Kenapa satu nama harus ditanyakan dulu sebelum satu huruf pun terkirim — dan
kenapa jawabannya sengaja **tidak** disimpan di satu tempat. Bedah tangganya:
pertanyaan naik dari loket terdekat sampai ke pemilik situsnya, lalu jawabannya
dicatat di sepanjang jalan pulang supaya perjalanan itu tidak perlu diulang.

Babak realitanya berat dan relevan di Indonesia: umur catatan yang membuat
pergantian alamat terasa "belum merata", pemblokiran situs yang bekerja dengan
membuat loket menjawab salah, dan pertanyaan yang selama puluhan tahun terkirim
polos tanpa amplop — beserta dua tambalan yang sering dikira satu barang
(menyamarkan pertanyaannya vs menandatangani jawabannya).

## Sudut dua Shorts

- **Nugget — nama situs itu dibaca dari belakang.** Titik paling kanan lebih
  dulu, baru bergerak ke kiri; tiap potongan membuka satu loket berikutnya. Satu
  animasi panah mundur di atas satu nama, satu insight, berdiri sendiri —
  penonton tidak perlu tahu apa pun soal DNS untuk kaget.
- **Jebakan — "ganti DNS biar internet kencang."** Yang berubah cuma waktu
  *bertanya alamat*, sekali di awal. Setelah nomornya ketemu, semua sisanya
  lewat jalur yang sama persis dan tidak disentuh sama sekali. Yang benar-benar
  berubah adalah situs yang tadinya dijawab salah jadi dijawab benar — itu
  **terbuka**, bukan **kencang**, dan bukan berarti tersembunyi.

## Catatan

**SUDAH DIPUTUSKAN 2026-08-14 — opsi 1.** DNS berdiri sendiri sebagai **T14**;
T05 dipersempit dan DNS di dalamnya tinggal satu beat, dengan catatan
pembatasnya ditulis langsung di [docs/07](../../docs/07-backlog-topik.md#t05--perjalanan-satu-alamat-web).
Urutan rilis ikut berubah: T14 naik ke posisi kedua, T05 turun ke belakangnya.
Uraian di bawah ditinggalkan apa adanya sebagai catatan kenapa opsi 2 dan 3
ditolak.

**Tabrakan dengan T05 — duduk perkaranya.**
[docs/07 · T05 "Perjalanan satu alamat web"](../../docs/07-backlog-topik.md#t05--perjalanan-satu-alamat-web)
sudah memakai DNS sebagai langkah pertama dari empat (DNS → TCP → TLS → HTTP),
dan Short Nugget-nya ("kenapa kunjungan pertama selalu lebih lambat") bertumpu
pada perjalanan bolak-balik yang salah satunya DNS. Dua episode yang sama-sama
membuka DNS akan saling memakan.

Tiga jalan keluar, harus dipilih **sebelum** ide ini naik ke backlog:

1. **DNS berdiri sendiri, T05 menyempit** — T05 jadi "tiga salaman sebelum satu
   huruf muncul" dan DNS di dalamnya cuma satu beat sepuluh detik yang menunjuk
   ke episode ini. Paling masuk akal: DNS punya cukup isi untuk tujuh menit
   sendiri (tangga loket + TTL + keamanan), dan T05 tetap utuh tanpanya.
2. **DNS dilebur ke T05** — ide ini jadi `ditolak`, materinya pindah ke T05.
   Konsekuensinya babak keamanan dan TTL hilang; tidak muat.
3. **T05 dipensiunkan**, digantikan episode ini + episode TLS terpisah nanti.

Rekomendasi: **(1)**. Tapi ini mengubah isi `docs/07`, jadi guideline-nya diubah
eksplisit dulu, bukan diam-diam.

**Yang belum beres — semua angka.** Tidak satu pun angka boleh masuk naskah
sebelum punya baris `sumber:`. Yang perlu ditelusuri ke sumber primer:

- Mekanisme dasar & format nama, jenis catatan, umur catatan → **RFC 1034 &
  RFC 1035**. Ini spesifikasi terbuka, jadi syarat 4 aman di sisi mekanisme.
- Menyamarkan pertanyaan → **DoH** dan **DoT** punya RFC masing-masing;
  menandatangani jawaban → **DNSSEC** punya rangkaian RFC sendiri. **Nomor
  RFC-nya jangan ditulis dari ingatan** — buka dan salin.
- **Jumlah dan sifat loket akar.** Ini jebakan klasik: jumlah *alamat* akar dan
  jumlah *mesin* akar adalah dua angka yang sangat berbeda, dan hampir semua
  artikel populer menyebut yang pertama seolah yang kedua. Sumbernya
  root-servers.org, dan kalimat di VO harus menyebut yang mana.
- **Waktu lookup pertama vs yang sudah tercatat.** Paling jujur diukur sendiri
  di mesin ini dan disebut sebagai "diukur di mesin ini", seperti rencana angka
  latensi di [T01](../apa-itu-ram/ide.md).

**Peluang visual terkuat:** nama situsnya dibaca **mundur** — kursor bergerak
dari titik paling kanan ke kiri, dan tiap potongan yang dilewati menyalakan satu
loket di tangga. Satu gerakan itu sekaligus menjelaskan bentuk namanya, urutan
bertanyanya, dan kenapa loket akar tidak perlu tahu apa-apa soal situsnya.
Gerakan kedua: jawaban yang **dicatat di sepanjang jalan pulang**, lalu satu per
satu memudar saat umurnya habis.

**Titik masuk paling emosional bukan teknisnya, tapi pemblokiran** — ini hal
yang benar-benar dialami penonton Indonesia dan biasanya dijelaskan salah. Tapi
tempatnya di bagian 7 [case], bukan hook: kalau dibuka dari situ, videonya jadi
video politik, bukan video mekanisme.
