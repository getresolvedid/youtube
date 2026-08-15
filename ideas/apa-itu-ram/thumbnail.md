---
kode: T01
slug: apa-itu-ram
pola: koreksi
---

# T01 · Thumbnail & kover

Keluaran **fase 1** ([CLAUDE.md § Fase kerja](../../CLAUDE.md)). Aturannya:
[docs/06 § Thumbnail](../../docs/06-publishing.md#thumbnail).

> **Berkas ini ditulis mundur.** T01 dikerjakan waktu thumbnail masih keluaran
> fase 3, jadi ketegangan dan polanya direkonstruksi dari kartu yang sudah
> terlanjur jadi — bukan sebaliknya. Topik berikutnya menulisnya di urutan yang
> benar, sebelum ada satu baris naskah pun.

---

## Video panjang — 16:9

**Ketegangan.** Orang mengira RAM itu *tempat menyimpan* — satu lagi laci di
samping harddisk, bedanya cuma cepat. Padahal ia **meja tempat mengerjakan**,
dan itu sebabnya isinya harus disalin dulu setiap kali aplikasi dibuka. Selama
orang masih membayangkannya sebagai laci, seluruh pertanyaan "kenapa harus
disalin" tidak punya tempat untuk mendarat.

**Pola: koreksi.** Yang benar terang, yang salah redup — bukan proses, bukan
angka. Yang harus terbaca dalam seperempat detik adalah *yang ini, bukan yang
itu*.

**Kata: `MEJA, BUKAN GUDANG`** (3 kata). Tidak mengulang satu kata pun dari
judul — judul menjelaskan *kenapa disalin*, thumbnail menaruh gambarannya.

**Gambaran yang dijanjikan** (pesanan ke fase 2): figur **meja kerja** dengan
berkas terhampar di kiri, **lemari arsip** gudang di kanan, panah salin di
antaranya. Kelas `.meja` dan `.lemari` yang sama dengan scene `04-ram-analogy` —
benda yang sama yang dilihat penonton, bukan gambar baru yang mirip. Latar
`--bg`, aksen Indigo. Meja terang, lemari redup; panahnya cuma menegaskan.

**Sudah jadi** — `render/thumb.png`, 1280×720, 230 KB. Dibangun di fase 4 dari
[`thumb.tsx`](thumb.tsx).

```powershell
npx remotion still T01-thumb ideas/apa-itu-ram/render/thumb.png
```

**Uji 210×118: lolos.** Tinggi huruf kapital 95px (syarat ≥ 90). Panahnya
sengaja panjang dari tepi lemari sampai tepi meja — versi pendeknya terbaca
sebagai tanda, bukan sebagai jarak, padahal jarak itulah isi videonya.

---

## Kover Short 1 — 9:16

Direncanakan di **fase 3**, setelah hook S1 ditulis ulang dari nol.

**Kata: `1 DETIK, 3 BULAN`** — angkanya, bukan akibatnya. Judulnya sudah
menyebut akibatnya ("Prosesormu lebih sering menunggu"), jadi nol kata yang
diulang.

**Gambaran:** prosesor + meja yang menempel padanya di atas, lemari arsip jauh
di bawah, garis putus-putus panjang di antaranya. **Jaraknya digambar sebagai
jarak sungguhan**, memakai kelebihan tinggi kartu 9:16 untuk hal yang isinya
memang ketinggian.

**Sudah jadi** — `render/thumb-s1.png`, 2160×3840, 1,6 MB. Sumbernya
[`scene-shorts/thumb-s1.tsx`](scene-shorts/thumb-s1.tsx).

```powershell
npx remotion still T01-thumb-s1 ideas/apa-itu-ram/render/thumb-s1.png
```

Batasnya di [docs/06 § Kover Short](../../docs/06-publishing.md#kover-short--916-dan-bacalah-batasnya)
— kalau kolom unggah cuma menawarkan pilih-frame, pilih frame tempat ketiga
tempat sudah berdiri, dan **jangan** menempelkan kartu ini sebagai frame
pertama.

---

## Kover Short 2 — 9:16

**Kata: `MEJA LEBAR, SAMA SAJA`** — bahasa gambarannya, sementara judulnya
memakai bahasa bendanya ("Nambah RAM belum tentu bikin cepat"). Nol kata yang
sama, dan yang membaca judul dengan yang melihat kover dapat dua pegangan
berbeda pada gagasan yang sama.

**Gambaran:** dua meja, yang bawah dua kali lebih lebar, **dengan jumlah berkas
yang sama**. Separuh kanan meja lebar dibiarkan kosong melompong — kekosongan
itulah argumennya, dan ia tidak butuh satu kata pun untuk terbaca.

**Sudah jadi** — `render/thumb-s2.png`, 2160×3840, 1,7 MB. Sumbernya
[`scene-shorts/thumb-s2.tsx`](scene-shorts/thumb-s2.tsx).

```powershell
npx remotion still T01-thumb-s2 ideas/apa-itu-ram/render/thumb-s2.png
```

> Kata keduanya sempat "TANGAN SAMA" dan itu **melipat jadi kartu tiga baris**
> tanpa ada yang gagal — 11 huruf pada kartu yang muat 10.
> `shared/Thumbnail.tsx` sekarang menolaknya sebelum render.
