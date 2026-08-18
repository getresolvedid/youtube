# Thumbnail — enkripsi

> **DITULIS TERLAMBAT, DAN ITU HARUS DICATAT.** Berkas ini milik **fase 1**
> (CLAUDE.md § Fase kerja) dan seharusnya ada sebelum satu baris naskah pun
> ditulis. Nyatanya topik ini masuk lewat arahan animasi langsung ke fase 2, dan
> brief ini baru ditulis setelah video panjang dan keempat Short jadi.
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
> topik yang tidak bisa dijual dalam seperempat detik **sebelum** delapan puluh
> scene dibuat. Topik ini lolos penyaringan itu secara kebetulan, bukan karena
> diuji.

## 1 · Ketegangannya

> **Orang yang sama, layar yang sama — dan yang ia lihat berubah total.**

Bukan "video tentang enkripsi". Yang menahan jempol adalah dua layar yang
seharusnya menampilkan hal yang sama tapi tidak: satu berisi kalimat yang bisa
dibaca siapa saja, satu berisi deretan lambang. Penonton tidak perlu tahu apa
pun soal enkripsi untuk merasa ada yang janggal di situ — dan justru itu
syaratnya.

**Yang dikoreksi:** dugaan bahwa pesan yang kamu kirim pergi langsung ke temanmu.
Ia tidak; ia lewat banyak tempat, dan di tiap tempat itu ada yang bisa melihat.

## 2 · Polanya

**Sebelum → sesudah** — dua keadaan bersebelahan, bedanya mencolok
([docs/06 § Thumbnail](../../docs/06-publishing.md#thumbnail)).

**Kenapa bukan koreksi**, padahal dua episode pertama keduanya koreksi dan
dokumen menyebut itu bukan kebetulan: koreksi butuh keyakinan yang salah untuk
dicoret, dan keyakinan yang salah di topik ini ("pesanku langsung sampai") tidak
punya bentuk yang bisa digambar dalam satu benda — yang salah adalah *ketiadaan*
sesuatu, dan ketiadaan tidak bisa dicoret. Sebelum→sesudah menggambarkan hal
yang sama tanpa perlu menggambar yang salahnya: dua layar berdampingan, dan
penonton sendiri yang menyimpulkan mana yang bermasalah.

## 3 · Kata & gambarannya

### Video panjang — 16:9

| | |
|---|---|
| **Baris 1** (aksen) | `LAYAR SAMA,` |
| **Baris 2** (klaim) | `ISI BEDA` |
| **Jumlah kata** | 4 — batasnya (dijaga `shared/Thumbnail.tsx`, dilempar bukan diperingatkan) |
| **Panjang baris** | 11 dan 8 huruf; kartu 16:9 muat 13 pada 144px |

**Gambarannya, sebagai benda:** *layar meja berisi deretan lambang, dan di
bawahnya HP berisi gelembung chat yang terbaca* — dua benda, satu di atas satu
di bawah, dengan garis pemisah di antaranya.

**Ditunjuk ke scene yang sudah ada:** [`scenes/09-ringkasan.tsx`](scenes/09-ringkasan.tsx)
beat 1, dan kembarannya di [`scene-shorts/s4-dekripsi/5-dua-layar.tsx`](scene-shorts/s4-dekripsi/5-dua-layar.tsx).
Komponennya `Monitor` dan `Hp` dari [`panggung-kiriman.tsx`](panggung-kiriman.tsx),
persis yang dipakai scene-nya — bukan gambar baru yang mirip.

### Kover Short — 9:16, kartu 2160×3840

Kartu 9:16 muat **11 huruf** per baris pada 280px. Keempatnya di bawah batas.

| Short | Baris 1 | Baris 2 | Gambarannya (benda) | Ditunjuk ke |
|---|---|---|---|---|
| **S1** perjalanan | `JALAN DULU,` | `BARU SAMPAI` | jalur tegak bersimpul dengan satu paket di tengahnya | `s1-perjalanan/3-masuk-jaringan.tsx` |
| **S2** bisa-dilihat | `ADA YANG` | `IKUT BACA` | layar meja berisi kalimat "Halo, apa kabar?" yang terbaca utuh | `s2-bisa-dilihat/3-terbaca.tsx` |
| **S3** cara-kerja | `DIKUNCI,` | `LALU LEWAT` | kotak berlabel ENKRIPSI dengan deretan lambang di dalamnya | `s3-cara-kerja/2-enkripsi.tsx` |
| **S4** dekripsi | `ADA KUNCI,` | `BISA BACA` | gembok terbuka dengan satu kunci di sebelahnya | `s4-dekripsi/3-dekripsi.tsx` |

**Keempatnya sengaja sejenis satu sama lain, dan berbeda dari kartu video
panjang.** Empat Short serial yang muncul berurutan di feed harus terbaca
sebagai satu keluarga — kalau tidak, penonton yang sudah menonton S1 tidak
mengenali S2 sebagai lanjutannya dan memperlakukannya sebagai video acak.

**Kover Short dibuat, tapi belum tentu terpakai** (docs/06): halaman bantuan
YouTube menyatakan Shorts tidak menerima thumbnail kustom sekaligus menyebut
ukuran 2160×3840 untuk Shorts, di halaman yang sama. PNG-nya disiapkan; kalau
kolom unggahnya cuma menawarkan pilih-frame, frame yang dipilih adalah tempat
gambaran di tabel ini mendarat — bukan frame pertama.

## Catatan

- **Judul tidak boleh berbagi kata dengan kartunya** (docs/06). Kartu memakai
  *layar*, *sama*, *isi*, *beda*; judul di [`render/publish.md`](render/publish.md)
  menghindari keempatnya.
- **Sudut kanan bawah tidak dipakai** — badge durasi YouTube. Tata letaknya milik
  `shared/Thumbnail.tsx` dan tidak disetel per episode.
- **Uji 210×118 belum dilakukan.** Itu ukuran nyatanya di feed ponsel, dan tidak
  ada pemeriksaan yang bisa menggantikannya: kecilkan PNG-nya dan lihat sendiri.
  Yang paling mungkin gagal di situ bukan teksnya (11 huruf pada 144px aman)
  melainkan **figurnya** — dua layar yang masing-masing berisi teks kecil bisa
  berubah jadi dua kotak abu-abu tanpa isi.
