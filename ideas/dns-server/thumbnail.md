---
kode: T14
slug: dns-server
pola: koreksi
---

# T14 · Thumbnail & kover

Keluaran **fase 1** ([CLAUDE.md § Fase kerja](../../CLAUDE.md)). Aturannya:
[docs/06 § Thumbnail](../../docs/06-publishing.md#thumbnail).

> **Berkas ini ditulis mundur.** T14 dikerjakan waktu thumbnail masih keluaran
> fase 3; ketegangan dan polanya direkonstruksi dari kartu yang sudah jadi.

---

## Video panjang — 16:9

**Ketegangan.** Orang mengira komputernya **sudah tahu** alamat sebuah nama —
seolah ada satu daftar besar berisi semua nama di dunia yang tinggal dibuka.
Padahal namanya harus **ditanyakan dulu**, tiap kali, ke loket; dan daftar
sebesar itu akan basi lebih cepat daripada bisa ditulis ulang. Selama penonton
masih membayangkan daftar, "kenapa harus ditanya dulu" terdengar seperti
kerumitan yang mengada-ada.

**Pola: koreksi.** Yang dibaca dalam seperempat detik adalah *yang ini, bukan
yang itu*, dan itu dibawa kontras terang-redup — coretannya cuma menegaskan.

**Kata: `LOKET, BUKAN DAFTAR`** (3 kata). Nol kata yang sama dengan judul —
judul menjelaskan *kenapa satu nama harus ditanya dulu*, thumbnail menaruh
**gambarannya**, sekaligus jalan buntu yang ditutup episode ini.

> **Brief pertama menulis "BUKAN BUKU", dan itu keliru.** Jalan buntu di
> `04-daftar-yang-basi` digambar sebagai **tabel** — nama di kiri, nomor di
> kanan — bukan sebagai buku. Kartu yang menjanjikan buku akan menjanjikan
> gambar yang tidak ada di videonya: menaikkan CTR sambil menurunkan retensi,
> dan YouTube menghitung yang kedua
> ([docs/06](../../docs/06-publishing.md#dirender-dari-remotion-bukan-digambar-terpisah)).

**Gambaran yang dijanjikan** (pesanan ke fase 2): **dua loket** yang saling
menunjuk di kiri — lacinya terbuka, yang atas berisi dan beraksen — dan **tabel
nama→nomor** yang redup dan tercoret di kanan. Loketnya komponen `Loket` dari
[`panggung-loket.tsx`](panggung-loket.tsx), benda yang sama dengan `05-loket`
dan `06-tangga`. Latar `--bg`, aksen Indigo.

Dua loket saja, bukan empat: di 210×118 anak tangga ketiga dan keempat menyusut
jadi noda. Yang perlu terbaca cuma "ada lebih dari satu, dan yang satu menunjuk
yang lain".

**Sudah jadi** — `render/thumb.png`, 1280×720, 247 KB. Dibangun di fase 4 dari
[`thumb.tsx`](thumb.tsx).

```powershell
npx remotion still T14-thumb ideas/dns-server/render/thumb.png
```

Tinggi huruf kapital 95px (syarat ≥ 90, dihitung `TINGGI_KAPITAL` di
`shared/Thumbnail.tsx`). **Uji 210×118 belum dikerjakan** — itu pemeriksaan
mata, bukan angka: kecilkan PNG-nya ke ukuran itu dan lihat sendiri. Kalau tidak
terbaca, ulangi; jangan diloloskan.

---

## Kover Short 1 — 9:16

Direncanakan di **fase 3**, setelah hook S1 ditulis ulang dari nol.

**Kata: `KANAN DULUAN`** (2 kata). Nol kata yang sama dengan judul: judul
menyebut *arahnya* ("dari belakang"), kover menyebut *urutannya*.

> **Brief pertama menulis "KANAN DULU, KIRI TERAKHIR" dan ditolak sebelum
> render.** Kartu 9:16 cuma muat **11 huruf per baris** pada 260px, dan "Kiri
> Terakhir" 13 huruf — penjaga panjang baris di `shared/Thumbnail.tsx`
> melemparnya, persis seperti "TANGAN SAMA" di
> [T01](../apa-itu-ram/thumbnail.md). Yang dipendekkan **katanya**, bukan
> hurufnya: mengecilkan huruf melanggar syarat tinggi kapital docs/06, dan baris
> yang melipat jadi kartu tiga baris yang tidak terbaca di feed.

**Gambaran:** nama situs terpecah tiga di atas dengan potongan paling kanan
menyala dan dua lainnya redup, penanda segitiga di atasnya, tiga loket menurun
ke bawah-kanan — yang **terendah** beraksen, karena dialah yang dibuka potongan
paling kanan. Komponen `Loket` dari [`panggung-loket.tsx`](panggung-loket.tsx),
susunan yang sama dengan `06-ujung`. Kelebihan tinggi kartu 9:16 dipakai untuk
hal yang isinya memang ketinggian: tangganya.

> Garis penghubungnya **berhenti di atap loket**, bukan diteruskan ke jendelanya.
> Tiap loket duduk tepat di bawah potongannya, jadi garisnya persis tegak — dan
> garis tegak yang masuk ke dalam badan loket berhenti terbaca sebagai
> penghubung, mulai terbaca sebagai **tali gantungan**. Ketahuan dari still-nya,
> tidak dari kode.

**Sudah jadi** — `render/thumb-s1.png`, 2160×3840, 1,7 MB. Sumbernya
[`scene-shorts/thumb-s1.tsx`](scene-shorts/thumb-s1.tsx).

```powershell
npx remotion still T14-thumb-s1 ideas/dns-server/render/thumb-s1.png
```

Batasnya di [docs/06 § Kover Short](../../docs/06-publishing.md#kover-short--916-dan-bacalah-batasnya)
— kalau kolom unggah cuma menawarkan pilih-frame, pilih frame tempat tangganya
sudah berdiri utuh (sekitar detik 30–36), dan **jangan** menempelkan kartu ini
sebagai frame pertama Short.

---

## Kover Short 2 — 9:16

**Kata: `SEKALI, DI AWAL`** (3 kata). Judul membantah ("Ganti DNS tidak bikin
internet cepat"); kover menaruh **buktinya** — bagian yang berubah itu potongan
paling depan, dan cuma itu. Nol kata yang sama.

> **Brief pertama menulis "TERBUKA, BUKAN KENCANG" dan ditolak sebelum render.**
> "Bukan Kencang" 13 huruf pada kartu yang muat 11. Memendekkannya jadi "Bukan
> Cepat" akan **mengulang kata dari judulnya**, jadi yang diambil sudut lain:
> bukan kesimpulannya, melainkan gambar yang membawanya. Kesimpulan "terbuka,
> bukan kencang" tetap hidup di VO `07-terbuka` dan di deskripsi.

**Gambaran:** bilah waktu satu halaman melintang — potongan bertanya di paling
depan beraksen, sisanya panjang dan abu — di atas lantai dengan loket di pojok
kiri, sosok berjalan, dan tempat tujuan jauh di kanan. Porsi `tanya` sama persis
dengan `BILAH.tanya` di
[`scene-shorts/jalur-tanya.tsx`](scene-shorts/jalur-tanya.tsx); kover yang
memakai porsi berbeda menjanjikan perbandingan yang tidak ada di videonya.
Lantainya bukan hiasan — ia yang membuat bilah di atasnya terbaca sebagai
**waktu perjalanan**, bukan sebagai bilah pemuatan biasa.

**Perbandingan panjangnya yang jadi argumen**, dan ia tidak butuh satu angka
pun — penting justru karena angka itu masih baris ⚠ di
[`naskah.md § Sumber`](naskah.md).

**Sudah jadi** — `render/thumb-s2.png`, 2160×3840, 1,6 MB. Sumbernya
[`scene-shorts/thumb-s2.tsx`](scene-shorts/thumb-s2.tsx).

```powershell
npx remotion still T14-thumb-s2 ideas/dns-server/render/thumb-s2.png
```
