# Thumbnail — tcp-ip (T18 provisional)

> **DITULIS TERLAMBAT, DAN ITU HARUS DICATAT.** Berkas ini milik **fase 1**
> (CLAUDE.md § Fase kerja) dan seharusnya ada sebelum satu baris naskah pun
> ditulis. Nyatanya topik ini masuk lewat storyboard langsung ke fase 2, dan
> brief ini baru ditulis setelah video panjang dan keempat Short jadi. Persis
> yang terjadi pada T17.
>
> **Akibatnya satu, dan ia mengubah arti berkas ini:** fase 1 seharusnya jadi
> **pesanan** ke fase 2 — gambaran yang ditulis di sini wajib jadi scene di
> videonya, dan itu yang membuat larangan docs/06 ("jangan menjanjikan gambar
> yang tidak ada di videonya") mustahil dilanggar alih-alih sekadar terlarang.
> Ditulis belakangan, ia berbalik jadi **pemeriksaan**: tiap gambaran di bawah
> ditunjuk ke scene yang sudah ada, dan kalau ada yang tidak ketemu, kartunya
> yang salah — bukan videonya.
>
> Yang hilang tidak bisa diambil lagi: penyaringan. Fase 1 ada untuk membunuh
> topik yang tidak bisa dijual dalam seperempat detik **sebelum** scene-nya
> dibuat.

## 1 · Ketegangannya

> **Satu potongan tidak pernah sampai — dan yang kamu terima tetap utuh.**

Bukan "video tentang TCP/IP". Yang menahan jempol adalah barisan bernomor yang
jelas kurang satu, disandingkan dengan klaim bahwa hasilnya lengkap. Dua hal itu
tidak bisa benar sekaligus menurut akal sehat penonton, dan justru itu syaratnya:
ia tidak perlu tahu apa pun soal jaringan untuk merasa ada yang tidak beres.

**Yang dikoreksi:** dugaan bahwa kalau ada yang hilang di jalan, yang sampai pasti
rusak. Di internet, kehilangan itu **normal** dan sudah ada mekanisme tetap
untuknya — dan itulah seluruh isi bagian TCP.

## 2 · Polanya

**Proses terpotong** — mekanismenya kelihatan, ujungnya belum
([docs/06 § Thumbnail](../../docs/06-publishing.md#thumbnail)).

**Kenapa bukan koreksi**, padahal dua episode pertama keduanya koreksi dan
dokumen menyebut itu bukan kebetulan: koreksi butuh keyakinan salah yang bisa
**dicoret**, dan keyakinan di topik ini ("kalau ada yang hilang, rusak") tidak
punya benda yang bisa dicoret — yang salah adalah kesimpulannya, bukan bendanya.
Proses terpotong menggambarkan hal yang sama tanpa perlu mencoret apa pun:
barisan bernomor berlubang, dan penonton sendiri yang bertanya bagaimana
akhirnya bisa lengkap.

**Kenapa bukan anomali:** anomali menaruh benda familiar di tempat yang salah.
Di sini tidak ada benda yang salah tempat — ada benda yang **tidak ada**, dan
ketiadaan bukan anomali, ia lubang.

## 3 · Kata & gambarannya

### Video panjang — 16:9

| | |
|---|---|
| **Baris 1** (aksen) | `SATU HILANG,` |
| **Baris 2** (klaim) | `TETAP UTUH` |
| **Jumlah kata** | 4 — batasnya (dijaga `shared/Thumbnail.tsx`, dilempar bukan diperingatkan) |
| **Panjang baris** | 12 dan 10 huruf; kartu 16:9 muat 13 pada 144px |

**Gambarannya, sebagai benda:** *empat kotak bernomor berjajar mendatar, dan
tempat nomor tiga kosong — cuma garis putus-putus merah.* Bukan "kesan tidak
lengkap": empat benda, satu lubang, nomornya terbaca.

**Ditunjuk ke scene yang sudah ada:**
[`scenes/07-peran-tcp.tsx`](scenes/07-peran-tcp.tsx) — papan penerima dengan
lubang di baris 02, tahap 3. Komponennya `Paket` dari
[`panggung-jaringan.tsx`](panggung-jaringan.tsx), persis yang dipakai scene-nya.

> **Nomor yang berlubang di kartu adalah 03, di scene 07 adalah 02.** Bedanya
> disengaja dan bukan kelalaian: di kartu, lubang di tengah barisan empat lebih
> terbaca sebagai lubang daripada lubang di posisi kedua, yang dari kejauhan
> terlihat seperti barisan yang cuma mulai dari kanan. Yang dijanjikan kartu
> adalah **barisan bernomor yang kurang satu**, dan itu benar-benar ada di
> videonya — nomornya sendiri bukan janji.

### Kover Short — 9:16, kartu 2160×3840

Kartu 9:16 muat **11 huruf** per baris pada 280px. Keempatnya di bawah batas.

| Short | Baris 1 | Baris 2 | Gambarannya (benda) | Ditunjuk ke |
|---|---|---|---|---|
| **S1** alamat | `ADA ALAMAT,` | `ADA JALAN` | jalur tegak bercabang tiga, satu cabang menyala, satu potongan di atasnya | `s1-alamat/4-cari-jalur.tsx` |
| **S2** potongan | `SATU FILE,` | `LIMA KOTAK` | bidang `FILE` di atas, lima kotak bernomor di bawahnya | `s2-potongan/2-dipecah.tsx` |
| **S3** hilang | `NOMOR TIGA` | `KE MANA?` | barisan lima slot, yang ketiga garis putus-putus merah | `s3-hilang/2-satu-hilang.tsx` |
| **S4** beda | `DUA NAMA,` | `DUA TUGAS` | persimpangan bercabang di atas, barisan bernomor bercentang di bawah | `s4-beda/4-bersama.tsx` |

**Keempatnya sengaja sejenis satu sama lain, dan berbeda dari kartu video
panjang.** Empat Short yang muncul berurutan di feed harus terbaca sebagai satu
keluarga — kalau tidak, penonton yang sudah menonton S1 tidak mengenali S2
sebagai saudaranya dan memperlakukannya sebagai video acak.

**Kover Short dibuat, tapi belum tentu terpakai** (docs/06): halaman bantuan
YouTube menyatakan Shorts tidak menerima thumbnail kustom sekaligus menyebut
ukuran 2160×3840 untuk Shorts, di halaman yang sama. PNG-nya disiapkan; kalau
kolom unggahnya cuma menawarkan pilih-frame, frame yang dipilih adalah tempat
gambaran di tabel ini mendarat — bukan frame pertama.

## Catatan

- **Judul tidak boleh berbagi kata dengan kartunya** (docs/06). Kartu memakai
  *satu*, *hilang*, *tetap*, *utuh*; judul di [`render/publish.md`](render/publish.md)
  menghindari keempatnya.
- **Sudut kanan bawah tidak dipakai** — badge durasi YouTube. Tata letaknya milik
  `shared/Thumbnail.tsx` dan tidak disetel per episode.
- **Uji 210×118 belum dilakukan.** Itu ukuran nyatanya di feed ponsel, dan tidak
  ada pemeriksaan yang bisa menggantikannya: kecilkan PNG-nya dan lihat sendiri.
  Yang paling mungkin gagal di situ bukan teksnya (12 huruf pada 144px aman)
  melainkan **nomor di dalam kotaknya** — angka setinggi 34px pada kartu 1280
  menyusut jadi 6px pada 210, dan barisan bernomor yang nomornya tidak terbaca
  cuma jadi deretan kotak abu-abu. Kalau gagal di situ, yang dibesarkan
  nomornya, bukan kartunya.
