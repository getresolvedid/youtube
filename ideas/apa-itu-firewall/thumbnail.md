# T15 · Thumbnail — brief fase 1

> **Berkas ini keputusannya, `thumb.tsx` turunannya** — arahnya satu, sama
> seperti direction → komposisi (HARD RULE 3). Kalau kartunya sudah dirender
> tapi terasa meleset dari brief ini, yang benar brief ini: ubah komposisinya,
> jangan menulis ulang brief supaya cocok dengan yang terlanjur digambar.
> → [docs/06 § Thumbnail](../../docs/06-publishing.md#thumbnail)

**Ditulis setelah fase 2, dan itu di luar urutan.** T15 dibangun waktu repo ini
belum memakai skema lima fase, jadi lima belas scene-nya sudah jadi duluan.
Akibatnya satu arah panah terbalik dan perlu diketahui siapa pun yang membaca
ini nanti: bagian 3 di bawah seharusnya **pesanan ke fase 2**, dan di sini ia
jadi **pilihan dari scene yang sudah ada**. Yang tidak berubah justru batas yang
paling penting — larangan menjanjikan gambar yang tidak ada di videonya
(docs/06) tetap dipenuhi, cuma dipenuhi dengan cara yang lebih lemah: dengan
memilih dengan jujur, bukan dengan dibuat mustahil dilanggar.

---

## 1. Ketegangannya

> **Namanya dinding, tapi yang sebenarnya bekerja bukan dinding — dan bedanya
> bukan soal istilah: dinding tidak memilih siapa yang boleh lewat.**

Ini bukan "video tentang firewall". Yang ditarik keyakinan yang hampir semua
orang punya dan tidak pernah diperiksa: *firewall itu tembok yang menahan hal
jahat.* Gambaran itu terasa benar karena namanya sendiri yang menanamkannya, dan
ia salah di titik yang paling menentukan — **tembok yang berhasil menahan semua
orang jahat juga menahan semua kiriman yang kamu tunggu.** Mesin yang benar-benar
tertutup adalah mesin yang tidak bisa dipakai.

Naskahnya sudah berdiri di atas kalimat itu sejak awal
([naskah.md](naskah.md) § Analogi utama): *"Nama firewall berarti dinding, dan
dinding adalah gambaran yang salah. Dinding tidak memilih, dan seluruh episode
ini soal memilih."* Dinding memang muncul di videonya — tepat **satu kali**, di
`05-dikunci-semua`, sebagai jalan yang ditutup dan gagal.

Ketegangan ini lolos syarat fase 1: ia bisa dijual dalam seperempat detik tanpa
satu pun istilah teknis, karena yang dibantah bukan definisi melainkan
**gambar** — dan penonton sudah memegang gambar itu sebelum kartunya muncul.

## 2. Polanya

**Koreksi** — yang benar terang, yang salah redup dan dicoret.

Dipilih satu, tidak dicampur. Dan dipilih bukan karena paling mudah: dua episode
pertama channel ini juga koreksi (`MEJA, BUKAN GUDANG` · `LOKET, BUKAN DAFTAR`),
dan keseragaman itu yang membuat kartunya dikenali di feed sebelum judulnya
terbaca (docs/06). Topik ini memang bentuk yang sama — benda yang penonton kira
sudah ia pahami.

Yang **tidak** dipakai, dan alasannya, supaya tidak dicoba ulang di sesi
berikutnya:

- **Angka mengagetkan** — "sekian ribu ketukan per malam" adalah angka paling
  menggoda di topik ini dan **sumbernya tidak ada**. Naskahnya sudah menolaknya
  di catatan scene 4; kartunya tidak boleh menyelundupkannya masuk lagi.
- **Anomali** — butuh benda familiar di tempat yang salah. Gedung berpintu banyak
  belum familiar bagi penonton sebelum ia menonton videonya.
- **Proses terpotong** — pas untuk "gimana caranya", padahal pertanyaan yang
  dijawab episode ini "siapa yang menahan mereka".

## 3. Kata-katanya & gambarannya

### Kata — 3 dari maksimal 4

```
PENJAGA, BUKAN DINDING
```

Batas 4 kata dijaga kode: `shared/Thumbnail.tsx` melempar error kalau dilanggar.

**Mengikat fase 4:** judul nanti **tidak boleh memakai satu pun** dari kata
*penjaga*, *bukan*, dan *dinding*. Judul menjelaskan, kartu menarik — dan
keduanya berbagi kata berarti salah satunya menganggur (docs/06). Ruang judul
enam puluh karakter; ruang kartu tiga kata dan tidak bisa mengelak, jadi kartu
ini yang dibekukan duluan dan judul yang mengalah.

### Gambaran — dua benda, keduanya sudah ada di videonya

Ditulis sebagai **benda**, bukan suasana, dan tiap baris menyebut scene asalnya.
Figurnya wajib komponen yang sama persis, bukan gambar baru yang mirip.

| Sisi | Bendanya | Asalnya |
|---|---|---|
| **Terang** (yang benar) | satu `<Penjaga>` berdiri di depan `<Gedung>` yang tiga pintunya menyala | [`06-penjaga.tsx`](scenes/06-penjaga.tsx) |
| **Redup + dicoret** (yang salah) | `<Gedung>` yang **delapan** pintunya tergembok semua, tanpa satu pun sosok di depannya | [`05-dikunci-semua.tsx`](scenes/05-dikunci-semua.tsx) |

Coretannya jatuh di sisi redup, bukan di sisi terang, dan cuma satu garis.

**Kenapa dua gedung, bukan gedung + tembok.** Godaan besarnya menggambar tembok
sungguhan di sisi yang salah — dan itu justru menegakkan gambaran yang sedang
dibantah. Yang dibandingkan harus **gedung yang sama** dalam dua keadaan: satu
dijaga, satu dikunci mati. Bedanya lalu terbaca sebagai *pilihan yang diambil*,
bukan sebagai *dua benda yang berbeda*.

**Kenapa penjaganya sendirian, tanpa ketukan dan tanpa `<Peretas>`.** Kartu ini
punya seperempat detik; menaruh yang mengetuk di situ menambah aktor ketiga yang
harus dibaca sebelum koreksinya terbaca. Peretasnya milik videonya, dan videonya
punya enam menit.

### Uji yang wajib lulus sebelum fase 4 dianggap selesai

- Terbaca pada **210×118 px** — ukuran nyata di feed ponsel. Kalau delapan gembok
  di sisi redup jadi bubur pada ukuran itu, yang dikurangi **jumlah gemboknya**,
  bukan ukuran hurufnya.
- **Sudut kanan bawah kosong** — badge durasi YouTube menempel di situ.
- Latar `--bg`, aksen dari palet, teks kiri bawah — semuanya milik
  `shared/Thumbnail.tsx` dan tidak disalin lalu digeser sedikit di sini.

---

## Kover Short — diisi di fase 3

Kosong dan memang belum boleh diisi. Kover S1 dan S2 ditulis di berkas ini juga,
**setelah** hook masing-masing Short ditulis ulang dari nol
([docs/02 § Anatomi Shorts](../../docs/02-format-video.md#anatomi-shorts)) —
karena kover Short menjual hook Short itu, bukan hook video panjangnya.

| Short | Ketegangan | Kata | Gambaran |
|---|---|---|---|
| S1 · Nugget | — | — | — |
| S2 · Jebakan | — | — | — |
