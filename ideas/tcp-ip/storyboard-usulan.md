---
judul: Apa Itu TCP/IP? — storyboard usulan
diusulkan: 2026-08-18
asal: dikirim user lewat chat, disimpan apa adanya
status: BELUM DITERIMA — bertabrakan dengan kontrak repo, lihat § Pemeriksaan
---

# Storyboard usulan — "Apa Itu TCP/IP?"

Dokumen ini **usulan dari luar alur repo**, disimpan utuh supaya tidak hilang
([`ideas/README.md`](../README.md): naskah hidup di berkas, bukan di chat).
Ia **belum** jadi keputusan apa pun: tidak ada berkas direction, tidak ada
`naskah.md`, dan topiknya sendiri masih berstatus `mentah` di
[`ide.md`](ide.md).

Bagian **§ Pemeriksaan** di bawah adalah penilaian terhadap kontrak repo.
Bagian **§ Storyboard (verbatim)** adalah dokumen aslinya, tidak disunting.

---

## § Pemeriksaan

### Yang bisa dipakai — dan memang bagus

1. **Scene 05 + 06 + 07 adalah inti topik ini, dan mekanismenya benar.** Data
   dipecah bernomor → tiap potongan lewat jalur berbeda → tiba tidak berurutan →
   satu nomor tidak pernah datang → diminta ulang → tersusun utuh. Itu persis
   "deret nomor yang berlubang" yang sudah ditulis sebagai peluang visual
   terkuat di [`ide.md`](ide.md), dan storyboard ini sudah memecahnya jadi shot
   yang bisa dibangun. **Ini yang paling berharga dari seluruh dokumen.**
2. **Scene 08 — dua tugas dipisah kiri/kanan lalu digabung.** Sejalan dengan
   sudut "kenapa namanya ditulis dua, dipisah garis miring".
3. **Tata bahasa kameranya sehat dan konsisten:** *pull-back* dipakai khusus
   untuk "benda kecil ini ternyata bagian dari sistem besar", *push-in* khusus
   untuk "perhatikan detail ini". Disiplin seperti itu jarang ditulis dan
   layak diadopsi apa adanya.
4. **Match cut fisik → digital** (kotak kurir jadi potongan data, jalan jadi
   jalur jaringan). Bentuk perpindahan yang benar untuk repo ini.

### Yang membuatnya tidak bisa dipakai sebagai kerangka

Diurut dari yang paling mengikat.

**1 · Melanggar HARD RULE 6 di kalimat ketiga.** Scene 01 sudah menyebut
**TCP/IP**, dan Scene 02 seluruhnya definisi kamus: *"TCP/IP adalah sekumpulan
protokol yang digunakan perangkat untuk berkomunikasi melalui jaringan."* Itu
bentuk yang secara eksplisit dilarang — nama `[what]` jatuh **tepat sekali, di
bagian 4**, setelah bendanya berdiri, dipakai, dan menyelesaikan masalah yang
sudah terasa. Nama yang datang sebelum gambarannya berdiri bukan cuma sia-sia,
ia merugikan: penonton berhenti membayangkan dan mulai menebak apakah ia
seharusnya sudah tahu.

**2 · Tidak ada `[problem]`. Tidak pernah ada yang salah.** Urutan dokumen ini:
definisi → analogi → komponen → contoh → kesimpulan. Itu bentuk artikel blog
yang dibacakan. Flow tujuh bagian channel ini menaruh **masalah yang terasa**
sebelum jawabannya, dan di sinilah topiknya paling kuat — bahwa internet
**tidak pernah berjanji** kirimanmu sampai, dan jalan keluar yang jelas
(perbaiki pengantarnya) tidak mungkin. Tanpa itu, penonton tidak punya alasan
bertahan sampai menit dua: ia sudah dapat definisinya di detik dua puluh.

**3 · Empat analogi untuk satu episode.** Buku aturan digital · paket kurir ·
rumah bernomor · sepuluh kotak. [docs/09](../../docs/09-tangga-abstraksi.md)
aturan 4 mematok **satu** analogi per episode, dan alasannya terlihat langsung
di sini: tiap pergantian analogi menyuruh penonton membongkar gambaran yang
baru saja ia bangun. Scene 07 bahkan mengakuinya sendiri — "jangan membuat
analogi terlalu panjang karena konsep sebenarnya sudah diperkenalkan pada Scene
06". Kalau analoginya mengulang scene sebelumnya, yang dibutuhkan bukan analogi
kedua.

**4 · Kosakata L1 dilanggar hampir di tiap baris VO.** *protokol · data ·
packet · request · response · routing · network · server · perangkat.*
[docs/09 § Kosakata L1](../../docs/09-tangga-abstraksi.md) adalah **daftar
larangan, bukan saran**. Yang menonton tidak menulis kode, dan tidak satu pun
dari kata-kata itu bisa ia gambar.

**5 · Seluruh teks layar berbahasa Inggris.** `SEND` · `ADDRESS` · `DELIVER` ·
`NETWORK RULES` · `IP = Where should it go?` · `The Foundation of Network
Communication`. Channel ini berbahasa Indonesia; teks layar ikut.

**6 · Scene 09 dan 10 adalah episode orang lain.** Scene 10 ("saat membuka
website": ketik alamat → DNS → IP → paket → router → server → balik) adalah
[T05 · Perjalanan satu alamat web](../../docs/07-backlog-topik.md#t05--perjalanan-satu-alamat-web)
hampir utuh, dan DNS **sudah tayang sendiri sebagai T14**. Dua episode yang
membuka hal yang sama saling memakan, dan yang kalah selalu yang tayang
belakangan — itu sebabnya [`ide.md`](ide.md) melarang DNS dan TLS masuk topik
ini. Scene 09 (HTTP/HTTPS/DNS/UDP/IP sekaligus) menambah empat istilah baru di
menit ketiga tanpa satu pun sempat berdiri.

**7 · Angka dan klaim tanpa sumber.** `192.168.1.10`, `93.xxx.xxx.xxx`, dan
"TCP memastikan data diterima lengkap dan dalam urutan yang benar" semuanya
butuh baris `sumber:`, dan tidak satu pun RFC-nya sudah dibuka. Selain itu
angka dilarang sama sekali di bagian 3–6.

**8 · Setelan produksi tidak boleh ditulis di dokumen.** 24 fps bertentangan
dengan repo (30), dan resolusi/rasio/durasi semuanya dibaca dari `.env`
([docs/08](../../docs/08-konfigurasi.md)) — bukan dipatok di storyboard.

**9 · Tidak ada opening & closing standar.** `<BrandSting/>` 4 dtk dan
`<EndCard/>` milik `shared/` dan wajib ada di tiap episode
([docs/10](../../docs/10-scene-standar.md)). Scene 12 menulis kartu penutupnya
sendiri.

**10 · SFX belum punya jalur produksi di repo ini sama sekali.** Tidak ada
folder, tidak ada aturan level, tidak ada perintah. Arahan SFX di dokumen ini
tidak bisa dieksekusi hari ini — ia butuh keputusan tersendiri lebih dulu, dan
keputusan itu mengubah **semua** episode, bukan cuma yang ini.

**11 · Fasenya melompat.** Topiknya masih `mentah`: belum lolos 4 syarat, belum
masuk backlog, belum punya `thumbnail.md` (fase 1). Storyboard adalah fase 2 —
dan bentuknya di repo ini bukan satu dokumen, melainkan **satu berkas direction
per scene** di samping rencana VO-nya (HARD RULE 1 · 3 · 4).

### Kesimpulan pemeriksaan

**Mekanismenya dipertahankan, kerangkanya tidak.** Yang layak diselamatkan:
Scene 05–08 (pemecahan bernomor, jalur berbeda, satu nomor hilang, minta ulang,
dua tugas dipisah) beserta seluruh tata bahasa kamera dan match cut-nya. Yang
dibuang: pembukaan definisi, empat analogi, Scene 09–10, dan seluruh teks layar
berbahasa Inggris.

---

## § Storyboard (verbatim)

> Di bawah ini dokumen asli, tidak disunting.

# STORYBOARD & DIRECTION VIDEO ANIMASI

## Apa Itu TCP/IP?

---

## 1. PRODUCTION OVERVIEW

**Judul:** Apa Itu TCP/IP?
**Format:** Video animasi edukasi
**Target durasi:** ±3–4 menit
**Audio:** Voice Over only
**Musik:** Tidak ada
**SFX:** Digunakan secara selektif untuk memperkuat visual
**Gaya:** Modern educational animation, clean, cinematic, mudah dipahami pemula
**Aspect Ratio:** 16:9
**Frame Rate:** 24 fps
**Visual approach:** Metafora dunia nyata dikombinasikan dengan visualisasi jaringan komputer.

### Prinsip Visual

1. Setiap konsep teknis harus memiliki representasi visual.
2. Hindari tampilan komputer yang terlalu rumit.
3. Gunakan objek sederhana seperti:

   * komputer
   * laptop
   * router
   * server
   * packet data
   * network line
   * alamat IP
4. Saat istilah teknis disebutkan oleh VO, istilah tersebut dapat muncul sebagai **on-screen text**.
5. Pergerakan kamera mengikuti alur informasi, bukan bergerak secara berlebihan.
6. Tidak menggunakan musik.
7. SFX harus tipis dan tidak mengganggu Voice Over.

---

# SCENE 01 — HOOK

**Timecode:** 00:00–00:15
**Durasi:** ±15 detik
**Purpose:** Membuat penonton penasaran bagaimana data dapat berpindah melalui internet.

### Voice Over

> Pernahkah kamu berpikir, bagaimana sebuah pesan bisa dikirim dari komputer kamu ke komputer yang berada ribuan kilometer jauhnya?
>
> Bagaimana saat kamu membuka sebuah website, data bisa menemukan jalan menuju perangkatmu?
>
> Semua itu terjadi karena perangkat di internet menggunakan aturan komunikasi yang disebut **TCP/IP**.

### Visual Direction

Mulai dengan sebuah **laptop** di atas meja dalam ruangan sederhana.

Pada layar laptop terlihat seseorang sedang membuka sebuah website.

Ketika website mulai dimuat, kamera perlahan mendekati layar.

Layar kemudian berubah menjadi representasi dunia digital.

Dari laptop muncul aliran titik-titik cahaya kecil yang bergerak keluar menuju jaringan besar.

Kamera melakukan **rapid pull-back** sehingga terlihat bahwa laptop terhubung dengan banyak perangkat lain.

Jaringan berkembang memenuhi layar.

Di tengah jaringan muncul teks:

**TCP/IP**

### Camera Direction

* Opening: medium shot laptop.
* Slow push-in menuju layar.
* Transition ke dunia digital melalui layar.
* Rapid pull-back untuk memperlihatkan jaringan.
* Kamera mengikuti satu aliran data menuju kejauhan.

### Animation Direction

* Laptop screen menyala.
* Website loading.
* Titik cahaya muncul dari laptop.
* Titik cahaya berubah menjadi packet.
* Packet bergerak melalui garis jaringan.
* Jaringan bertambah kompleks secara bertahap.
* Text **TCP/IP** muncul setelah kata tersebut disebutkan oleh VO.

### SFX

* Soft computer startup.
* Subtle digital pulse.
* Whoosh saat kamera masuk ke dunia digital.
* Soft data transmission sounds.

### Transition

Satu packet bergerak sangat cepat menuju kamera hingga memenuhi frame.

**Cut to Scene 02.**

---

# SCENE 02 — APA ITU TCP/IP?

**Timecode:** 00:15–00:35
**Durasi:** ±20 detik
**Purpose:** Memperkenalkan definisi TCP/IP.

### Voice Over

> TCP/IP adalah sekumpulan protokol yang digunakan perangkat untuk berkomunikasi melalui jaringan.
>
> Sederhananya, TCP/IP adalah seperti aturan yang mengatur bagaimana data dikirim, bagaimana alamat tujuan ditentukan, dan bagaimana data tersebut diterima oleh perangkat lain.

### Visual Direction

Packet yang memenuhi layar dari scene sebelumnya mengecil.

Kamera memperlihatkan beberapa perangkat:

* laptop
* smartphone
* desktop computer
* server

Semua perangkat terhubung dalam satu jaringan.

Di antara perangkat muncul beberapa label:

**SEND**

**ADDRESS**

**DELIVER**

Kemudian seluruh label berubah menjadi:

**TCP/IP**

Visual berikutnya menggunakan metafora buku aturan.

Sebuah buku digital muncul dengan judul:

**NETWORK RULES**

Halaman buku terbuka dan menampilkan simbol jaringan.

### Camera Direction

* Start close-up pada packet.
* Zoom out perlahan.
* Orbit ringan mengelilingi network.
* Push-in ke buku aturan.
* Static hold saat istilah TCP/IP muncul.

### Animation Direction

Setiap kata dalam VO mendapatkan visual:

**"data dikirim"**
→ packet bergerak.

**"alamat tujuan"**
→ address label muncul.

**"data diterima"**
→ packet masuk ke perangkat tujuan.

### SFX

* Soft digital clicks.
* Subtle interface sounds.
* Page flip digital.

### Transition

Buku aturan berubah menjadi sebuah paket fisik.

Kamera mengikuti paket tersebut.

---

# SCENE 03 — ANALOGI PENGIRIMAN PAKET

**Timecode:** 00:35–01:00
**Durasi:** ±25 detik
**Purpose:** Mengubah konsep abstrak menjadi analogi yang mudah dipahami.

### Voice Over

> Bayangkan kamu ingin mengirim sebuah paket kepada seseorang di kota lain.
>
> Kamu membutuhkan alamat tujuan agar paket tahu harus dikirim ke mana.
>
> Setelah itu, kamu membutuhkan sistem pengiriman yang memastikan paket tersebut sampai ke tujuan.
>
> Dalam jaringan komputer, konsepnya kurang lebih seperti ini.
>
> IP menentukan ke mana data harus pergi, sedangkan TCP membantu memastikan data sampai dengan benar.

### Visual Direction

Masuk ke dunia nyata.

Seseorang memasukkan sebuah kotak ke dalam paket pengiriman.

Pada kotak terdapat label:

**FROM: A**

**TO: B**

Kotak kemudian dibawa oleh kendaraan pengiriman.

Di perjalanan terlihat beberapa persimpangan jalan.

Sebuah tanda menunjukkan:

**DESTINATION**

Kemudian visual berubah perlahan menjadi dunia jaringan komputer.

Kotak berubah menjadi **data packet**.

Jalan berubah menjadi network route.

### Camera Direction

* Wide shot kota.
* Medium shot karakter memegang paket.
* Close-up address label.
* Tracking shot mengikuti paket.
* Transition menggunakan match cut dari paket fisik ke packet digital.

### Animation Direction

* Karakter menempelkan label alamat.
* Paket dimasukkan ke kendaraan.
* Kendaraan bergerak melalui beberapa jalur.
* Paket berubah menjadi packet digital.
* Jalan raya berubah menjadi network path.

### On-Screen Text

**IP = Where should it go?**

**TCP = Did it arrive correctly?**

### SFX

* Packaging sound.
* Tape rip.
* Vehicle movement.
* Digital transformation whoosh.

### Transition

Close-up pada tulisan **TO: B**.

Tulisan tersebut berubah menjadi:

**IP ADDRESS**

---

# SCENE 04 — IP ADDRESS

**Timecode:** 01:00–01:22
**Durasi:** ±22 detik
**Purpose:** Menjelaskan fungsi IP address.

### Voice Over

> Kita mulai dari IP.
>
> Setiap perangkat yang berkomunikasi melalui jaringan membutuhkan alamat yang disebut **IP address**.
>
> IP address berfungsi seperti alamat rumah.
>
> Tanpa alamat tujuan, jaringan tidak akan tahu ke mana data harus dikirim.

### Visual Direction

Kamera memperlihatkan beberapa rumah.

Setiap rumah memiliki alamat.

Contoh:

**HOUSE A — 01**

**HOUSE B — 02**

**HOUSE C — 03**

Satu kurir membawa paket dan mencari alamat tujuan.

Visual kemudian berubah.

Rumah berubah menjadi komputer.

Nomor rumah berubah menjadi representasi IP address.

Contoh on-screen:

**192.168.1.10**

Tidak perlu menekankan bahwa angka tersebut adalah alamat internet publik; gunakan hanya sebagai representasi sederhana.

### Camera Direction

* Wide establishing shot.
* Dolly menuju satu rumah.
* Close-up address plate.
* Match cut ke komputer.
* Zoom ke IP address.

### Animation Direction

* Address plate menyala ketika disebut.
* Packet mencari address yang sesuai.
* Perangkat tujuan diberi highlight.
* Garis koneksi menuju perangkat tujuan muncul.

### SFX

* Subtle notification tone.
* Digital scanning sound.
* Soft confirmation sound.

### Transition

IP address berubah menjadi label pada sebuah packet.

---

# SCENE 05 — DATA MENJADI PACKET

**Timecode:** 01:22–01:48
**Durasi:** ±26 detik
**Purpose:** Menjelaskan konsep packet.

### Voice Over

> Tapi data yang dikirim melalui jaringan tidak selalu dikirim sebagai satu bagian besar.
>
> Data dapat dipecah menjadi bagian-bagian kecil yang disebut **packet** atau paket data.
>
> Setiap paket membawa informasi penting, termasuk alamat tujuan.
>
> Paket-paket tersebut kemudian bergerak melalui jaringan menuju perangkat tujuan.

### Visual Direction

Tampilkan sebuah pesan besar:

**"HELLO FROM COMPUTER A"**

Pesan tersebut terpecah menjadi beberapa blok:

**PACKET 01**

**PACKET 02**

**PACKET 03**

**PACKET 04**

Setiap packet memiliki label tujuan.

Packet mulai bergerak melalui network.

Jalur packet tidak harus sama.

Packet 01 melalui jalur A.

Packet 02 melalui jalur B.

Packet 03 melalui jalur C.

### Camera Direction

* Close-up pada data.
* Slow zoom-out saat data terpecah.
* Tracking mengikuti beberapa packet.
* Camera pan mengikuti network routes.

### Animation Direction

* Data terpecah secara clean.
* Setiap bagian diberi nomor.
* Packet bergerak dengan kecepatan berbeda.
* Beberapa packet mengambil rute berbeda.
* Semua tetap menuju perangkat yang sama.

### On-Screen Text

**DATA**

↓

**PACKETS**

### SFX

* Soft splitting sound.
* Multiple digital pulses.
* Network movement sounds.

### Transition

Salah satu packet bergerak lebih cepat dari packet lainnya.

---

# SCENE 06 — PERAN TCP

**Timecode:** 01:48–02:15
**Durasi:** ±27 detik
**Purpose:** Memperkenalkan TCP sebagai mekanisme komunikasi yang andal.

### Voice Over

> Di sinilah TCP berperan.
>
> TCP, atau **Transmission Control Protocol**, bertugas membuat komunikasi menjadi lebih andal.
>
> TCP dapat memastikan data diterima dengan lengkap dan dalam urutan yang benar.
>
> Jika ada bagian data yang hilang dalam perjalanan, TCP dapat meminta bagian tersebut dikirim kembali.

### Visual Direction

Packet 01, 02, 03, dan 04 bergerak menuju server.

Packet 01 tiba.

Packet 03 tiba.

Packet 04 tiba.

Packet 02 tidak terlihat.

Di sisi penerima terlihat:

**01 ✓**

**02 ?**

**03 ✓**

**04 ✓**

Kemudian penerima mengirim sinyal kembali:

**REQUEST PACKET 02**

Packet 02 muncul kembali dan bergerak menuju tujuan.

Setelah tiba:

**01 ✓**

**02 ✓**

**03 ✓**

**04 ✓**

### Camera Direction

* Tracking shot mengikuti packet.
* Pause ketika packet 02 hilang.
* Cut ke receiver.
* Push-in pada missing packet indicator.
* Follow packet 02 saat dikirim ulang.

### Animation Direction

Gunakan gerakan yang sangat jelas.

Packet yang hilang tidak perlu dihancurkan; cukup menghilang dari network route.

Sinyal request dikirim kembali dari receiver ke sender.

Packet 02 kemudian dikirim ulang.

### SFX

* Packet arrival ticks.
* Missing/error tone sangat halus.
* Request pulse.
* Confirmation sound ketika packet lengkap.

### Transition

Empat packet bergabung menjadi satu data utuh.

---

# SCENE 07 — ANALOGI TCP

**Timecode:** 02:15–02:35
**Durasi:** ±20 detik
**Purpose:** Memperkuat pemahaman TCP melalui analogi.

### Voice Over

> Bayangkan kamu mengirim sepuluh kotak kepada seseorang.
>
> Kotak-kotak tersebut mungkin tidak semuanya tiba dalam urutan yang sama.
>
> TCP membantu memastikan semua bagian tersebut diperiksa, disusun kembali, dan jika ada yang hilang, bagian tersebut dikirim ulang.

### Visual Direction

Tampilkan sepuluh kotak.

Masing-masing memiliki nomor:

**01–10**

Kotak bergerak melalui beberapa jalur.

Di tujuan, kotak tiba dengan urutan:

**01 → 04 → 02 → 03 → 07 → 05...**

Sistem penerima kemudian menyusunnya:

**01 → 02 → 03 → 04 → 05...**

Satu kotak terlihat hilang.

Sistem meminta:

**SEND 06 AGAIN**

Kotak nomor 06 tiba.

Semua kotak akhirnya tersusun.

### Camera Direction

* Wide shot seluruh jalur.
* Tracking pada beberapa kotak.
* Top-down view saat kotak disusun.
* Close-up nomor kotak.

### Animation Direction

Gunakan visual yang sederhana dan sedikit playful.

Jangan membuat analogi terlalu panjang karena konsep sebenarnya sudah diperkenalkan pada Scene 06.

### SFX

* Box movement.
* Soft mechanical sorting sounds.
* Confirmation sound.

### Transition

Kotak-kotak berubah kembali menjadi packet digital.

---

# SCENE 08 — TCP + IP

**Timecode:** 02:35–02:55
**Durasi:** ±20 detik
**Purpose:** Menjelaskan hubungan TCP dan IP.

### Voice Over

> Jadi, TCP dan IP memiliki tugas yang berbeda.
>
> IP berfokus pada alamat dan pengiriman paket menuju tujuan.
>
> Sedangkan TCP berfokus pada memastikan komunikasi tersebut berlangsung dengan andal.
>
> Keduanya bekerja bersama sebagai bagian penting dari komunikasi internet.

### Visual Direction

Layar dibagi menjadi dua.

Sisi kiri:

**IP**

Dengan visual network route dan destination address.

Sisi kanan:

**TCP**

Dengan visual packet checking dan reordering.

Kemudian kedua sisi bergerak menuju tengah.

Muncul:

**TCP + IP**

Di belakangnya terlihat network besar.

### Camera Direction

* Symmetrical composition.
* Slow push-in.
* Center merge.
* Pull-back untuk memperlihatkan network.

### Animation Direction

IP mengirim packet menuju tujuan.

TCP memeriksa packet.

Keduanya kemudian berjalan secara simultan.

### On-Screen Text

**IP → Address & Routing**

**TCP → Reliable Delivery**

### SFX

* Two subtle digital pulses.
* Merge sound saat TCP + IP bergabung.

### Transition

TCP + IP berubah menjadi diagram protokol yang lebih besar.

---

# SCENE 09 — TCP/IP BUKAN HANYA TCP DAN IP

**Timecode:** 02:55–03:20
**Durasi:** ±25 detik
**Purpose:** Memperkenalkan bahwa TCP/IP adalah kumpulan protokol.

### Voice Over

> Namun, TCP/IP sebenarnya bukan hanya TCP dan IP.
>
> TCP/IP adalah kumpulan berbagai protokol yang bekerja bersama.
>
> Ada HTTP dan HTTPS yang digunakan untuk komunikasi website.
>
> Ada DNS yang membantu menerjemahkan nama seperti google.com menjadi alamat IP.
>
> Ada juga UDP yang digunakan untuk komunikasi yang membutuhkan kecepatan dan tidak selalu membutuhkan mekanisme pengiriman ulang seperti TCP.

### Visual Direction

Tampilkan sebuah network ecosystem.

Node-node muncul satu per satu:

**HTTP / HTTPS**

**DNS**

**TCP**

**UDP**

**IP**

Masing-masing memiliki fungsi visual sederhana.

HTTP/HTTPS:
Browser → Website

DNS:
`example.com` → `IP ADDRESS`

TCP:
Packet checking

UDP:
Fast packet stream

### Camera Direction

* Start centered.
* Camera slowly pulls back.
* Each protocol muncul di posisi berbeda.
* Slight orbit ketika seluruh ecosystem terbentuk.

### Animation Direction

Setiap protokol muncul bersamaan dengan penyebutan VO.

Jangan menampilkan terlalu banyak informasi teknis.

Fokus pada hubungan fungsi.

### SFX

* Individual digital pop untuk setiap protokol.
* Soft network ambience.

### Transition

Camera masuk ke node **DNS**.

---

# SCENE 10 — SAAT MEMBUKA WEBSITE

**Timecode:** 03:20–03:55
**Durasi:** ±35 detik
**Purpose:** Menggabungkan semua konsep dalam satu contoh nyata.

### Voice Over

> Sekarang bayangkan kamu mengetik sebuah alamat website di browser.
>
> Browser membutuhkan alamat server tujuan.
>
> DNS membantu menemukan alamat IP dari nama website tersebut.
>
> Setelah mengetahui tujuan, data dikirim melalui jaringan menggunakan protokol yang sesuai.
>
> TCP dapat membantu memastikan data diterima dengan benar, sementara IP membantu mengarahkan paket menuju server.
>
> Server kemudian mengirimkan data kembali ke perangkatmu.
>
> Semua proses ini terjadi dalam waktu yang sangat singkat.

### Visual Direction

Ini menjadi sequence paling cinematic.

#### Shot 10A — User mengetik website

User mengetik:

`example.com`

Browser menampilkan loading.

#### Shot 10B — DNS

Nama:

`example.com`

bergerak ke sebuah DNS server.

DNS server memberikan respons:

`93.xxx.xxx.xxx`

Gunakan alamat contoh, bukan alamat layanan nyata.

#### Shot 10C — Packet

Request berubah menjadi beberapa packet.

Packet keluar dari laptop.

#### Shot 10D — Network

Packet melewati:

**Router → Router → Router → Server**

Gunakan network nodes sebagai visualisasi sederhana.

#### Shot 10E — Server

Packet tiba di server.

Server memproses request.

#### Shot 10F — Response

Server mengirim packet kembali.

Packet bergerak menuju laptop.

#### Shot 10G — Website tampil

Browser selesai loading.

Website muncul.

### Camera Direction

Gunakan continuous camera movement agar seluruh proses terasa seperti satu perjalanan.

* Close-up keyboard.
* Push-in ke browser.
* Travel through DNS.
* Follow packet.
* Wide network shot.
* Enter server.
* Reverse tracking menuju laptop.
* Final close-up pada website.

### Animation Direction

Pastikan setiap proses mengikuti urutan:

**Website Name**

↓

**DNS**

↓

**IP Address**

↓

**Packets**

↓

**Network**

↓

**Server**

↓

**Response**

↓

**Website**

### SFX

* Keyboard typing.
* DNS query pulse.
* Packet movement.
* Router pass-by sounds.
* Server processing click.
* Final browser notification.

### Transition

Website selesai loading.

Kamera perlahan zoom-out dari layar.

---

# SCENE 11 — KESIMPULAN

**Timecode:** 03:55–04:20
**Durasi:** ±25 detik
**Purpose:** Merangkum konsep utama.

### Voice Over

> Jadi, apa itu TCP/IP?
>
> TCP/IP adalah sekumpulan protokol yang memungkinkan perangkat berkomunikasi melalui jaringan.
>
> IP membantu menentukan alamat dan jalur tujuan.
>
> TCP membantu memastikan data dikirim dan diterima secara andal.
>
> Dan bersama berbagai protokol lainnya, TCP/IP menjadi salah satu fondasi utama yang memungkinkan internet bekerja.

### Visual Direction

Kembali ke network besar dari Scene 01.

Tampilkan tiga konsep utama:

**IP**

Address & Route

**TCP**

Reliable Communication

**TCP/IP**

Network Communication

Kemudian berbagai protokol lain muncul secara halus di background.

### Camera Direction

* Wide shot network.
* Slow push-in ke tiga konsep.
* Slow pull-back pada final TCP/IP.

### Animation Direction

IP packet bergerak menuju tujuan.

TCP memeriksa packet.

Keduanya bekerja bersama.

Network kemudian menyala secara bertahap.

### On-Screen Text

**IP = Address & Routing**

**TCP = Reliable Delivery**

**TCP/IP = Communication**

### SFX

* Soft network pulses.
* Subtle confirmation tone.

### Transition

Network mulai mengecil dan membentuk satu titik cahaya.

---

# SCENE 12 — CLOSING

**Timecode:** 04:20–04:35
**Durasi:** ±15 detik
**Purpose:** Memberikan closing yang memorable.

### Voice Over

> Jadi, setiap kali kamu membuka website, mengirim pesan, atau mengakses sebuah layanan di internet, sebenarnya ada banyak proses komunikasi yang terjadi di balik layar.
>
> Dan salah satu fondasi terpenting di balik komunikasi tersebut adalah **TCP/IP**.

### Visual Direction

Mulai dari titik cahaya.

Titik tersebut berubah menjadi network.

Network berkembang menjadi:

* smartphone
* laptop
* server
* cloud
* website
* data packets

Semua perangkat saling terhubung.

Kamera kemudian menjauh semakin jauh.

Network berubah menjadi bentuk abstrak seperti peta internet.

Terakhir, seluruh visual fade menjadi:

# TCP/IP

**The Foundation of Network Communication**

### Camera Direction

* Macro shot titik cahaya.
* Slow zoom-out.
* Wide network reveal.
* Very slow pull-back.
* Final static frame selama ±2 detik.

### Animation Direction

Gerakan harus semakin tenang menjelang ending.

Hindari terlalu banyak elemen baru setelah kalimat terakhir VO.

### SFX

* Satu soft digital pulse.
* Gentle final resolve sound.
* Setelah itu **silence**.

### Music

**NONE.**

---

# 2. AUDIO DIRECTION

## Voice Over

Voice Over menjadi pusat perhatian sepanjang video.

### Karakter suara

* Jelas
* Tenang
* Informatif
* Friendly
* Tidak terlalu cepat
* Tidak terlalu formal
* Memberikan penekanan pada istilah teknis

### Penekanan kata

Berikan sedikit emphasis pada:

* **TCP/IP**
* **IP address**
* **packet**
* **TCP**
* **Transmission Control Protocol**
* **DNS**
* **HTTP / HTTPS**
* **UDP**

### Pause

Gunakan jeda pendek setelah pertanyaan dan sebelum definisi penting.

Contoh:

> "Jadi, apa itu TCP/IP?"

**Pause ±0.5–0.8 detik**

> "TCP/IP adalah sekumpulan protokol..."

---

# 3. GENERAL CAMERA LANGUAGE

Gunakan camera movement dengan tujuan memperjelas informasi.

### Wide Shot

Digunakan untuk:

* memperlihatkan network
* memperkenalkan environment
* menunjukkan hubungan antar perangkat

### Medium Shot

Digunakan untuk:

* karakter
* laptop
* router
* server

### Close-Up

Digunakan ketika menjelaskan:

* IP address
* packet
* data
* browser
* DNS response

### Tracking Shot

Digunakan untuk mengikuti:

* packet
* data
* request
* response

### Push-In

Digunakan ketika penonton harus memperhatikan sebuah detail.

### Pull-Back

Digunakan untuk menunjukkan bahwa objek kecil merupakan bagian dari sistem yang lebih besar.

---

# 4. TRANSITION LANGUAGE

Gunakan transisi yang memiliki hubungan visual antar scene.

Prioritas:

1. **Match Cut**
2. **Object Transformation**
3. **Camera Push Through**
4. **Data Flow Transition**
5. **Digital Wipe**
6. Hard cut hanya jika dibutuhkan untuk perubahan konsep.

Hindari penggunaan transition yang terlalu dekoratif.

---

# 5. VISUAL CONSISTENCY

Seluruh video harus mempertahankan:

* desain karakter yang konsisten
* bentuk komputer dan perangkat yang konsisten
* desain packet yang konsisten
* desain router yang konsisten
* desain server yang konsisten
* network line yang konsisten
* typography yang konsisten

Packet yang diperkenalkan pada Scene 05 harus memiliki bentuk yang sama ketika muncul kembali pada Scene 06, 08, 09, dan 10.

---

# 6. KEY VISUAL METAPHORS

| Konsep     | Visual                             |
| ---------- | ---------------------------------- |
| Internet   | Jaringan besar                     |
| IP         | Alamat rumah / address label       |
| IP Address | Nomor alamat                       |
| Packet     | Kotak kecil yang dikirim           |
| TCP        | Sistem pemeriksaan dan penyusunan  |
| Router     | Persimpangan / node jaringan       |
| Server     | Gedung pusat / komputer besar      |
| DNS        | Buku alamat digital                |
| HTTP/HTTPS | Jalur komunikasi browser ↔ website |
| UDP        | Aliran packet cepat                |
| TCP/IP     | Sistem aturan komunikasi           |

---

# 7. FINAL VISUAL FLOW

Alur visual keseluruhan:

**Computer**

↓

**Internet**

↓

**TCP/IP**

↓

**Network Rules**

↓

**Delivery Analogy**

↓

**IP Address**

↓

**Data**

↓

**Packets**

↓

**TCP**

↓

**Reliable Delivery**

↓

**TCP + IP**

↓

**Other Protocols**

↓

**Opening a Website**

↓

**DNS**

↓

**IP**

↓

**Packets**

↓

**Server**

↓

**Response**

↓

**TCP/IP**

↓

**Internet**

---

# 8. PRODUCTION NOTE

Jangan mencoba memvisualisasikan semua detail teknis jaringan secara literal.

Tujuan utama video adalah membuat penonton pemula memahami satu ide sederhana:

> **IP membantu data menemukan tujuan, sementara TCP membantu memastikan komunikasi berlangsung dengan andal.**

Seluruh visual, camera movement, animation, dan SFX harus mendukung pemahaman tersebut.

**Tidak ada musik sepanjang video.**

SFX digunakan hanya sebagai aksen dan harus berada di bawah level Voice Over.
