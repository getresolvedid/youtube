# T19 · Thumbnail & kover — brief

Fase 2 jalur cepat ([fast_ideas/README](../README.md#fase-2--bangun-thumbnail)).
Aturannya [docs/06 § Thumbnail](../../docs/06-publishing.md#thumbnail); yang
mengikat di kartu 9:16: **maksimal 4 kata seluruhnya**, dan **maksimal 11 huruf
per baris** pada ukuran 280px (`shared/Thumbnail.tsx` melemparkan error kalau
dilanggar — bukan peringatan).

**Semua kover dibangun SETELAH scene-nya jadi, dan itu disengaja.** docs/06
melarang thumbnail menjanjikan gambar yang tidak ada di videonya. Di sini
larangan itu jadi mustahil dilanggar, bukan sekadar terlarang: tiap kover
mengimpor komponen yang **sama persis** dengan scene-nya — `Jaringan`,
`SimpulBesar`, `Lereng`, `Kisi`, `Potongan`. Kalau figurnya tidak ada di
episodenya, ia tidak bisa diimpor.

## Ketegangan seri

> Orang mengira AI diprogram: seseorang menuliskan aturannya, mesinnya
> menjalankan. Yang sebenarnya terjadi kebalikannya — **tidak ada satu pun
> aturan yang pernah dituliskan.** Mesinnya menebak, ditegur, lalu menggeser
> dirinya sendiri, ribuan kali.

Itu ketegangan yang menopang kelima belas kartu. Tiap episode mengambil satu
potongannya, dan **tidak ada dua kartu yang memakai pola yang sama berturut-turut**
— dua kartu sejenis yang muncul beruntun di feed terbaca sebagai satu video yang
diulang.

## Yang menyatukan kelima belas kartu

Empat hal, dan keempatnya wajib sama di semua kartu supaya penonton mengenali
serinya dari kejauhan di feed (docs/06: "posisi teks, palet, dan gaya tetap sama
antar-episode"):

1. **Latar `--bg`, aksen Indigo** — tidak ada kartu yang memakai warna lain
   sebagai warna pokok.
2. **Teks di bawah, figur di pita atas** — tata letak `KartuThumbnail`, tidak
   ditimpa satu kartu pun.
3. **Satu benda yang menyala di antara benda yang tidak.** Ini yang membuat
   mata tahu ke mana harus melihat dalam seperempat detik.
4. **Figurnya komponen scene-nya sendiri**, bukan gambar baru.

## Kelima belas kartu

| Ep | Pola | Kata (≤ 4) | Gambaran yang dijanjikan — dan scene tempatnya benar-benar ada |
|---|---|---|---|
| 01 | proses terpotong | DITEGUR · RIBUAN KALI | dua kartu jawaban + batang meleset di antaranya — `4-diulang` |
| 02 | proses terpotong | ISI SATU · SIMPUL | simpul besar + tiga sambungan beda tebal — `2-tiga-masuk` |
| 03 | koreksi | BUKAN SAMA · KUAT | tiga sambungan: tebal, sedang, tipis — `1-kenapa-bobot` |
| 04 | sebelum → sesudah | LURUS JADI · BELOK | garis lurus dan lengkungan S berdampingan — `5-intinya` |
| 05 | koreksi | SATU LAPIS · TAK CUKUP | sebaran XOR + garis lurus yang gagal memisahkan — `2-cuma-garis` |
| 06 | proses terpotong | MASUK, · LALU APA? | jaringan + denyut berhenti di tengah jalan — `3-maju` |
| 07 | angka mengagetkan | SEBERAPA · SALAH? | dua kartu + batang selisih + meter — `3-jadi-angka` |
| 08 | anomali | BERJALAN · MUNDUR | denyut MERAH berjalan ke atas — `2-mundur` |
| 09 | proses terpotong | TURUN, · KE MANA? | bola di lereng + dua panah sama terang — `1-ke-mana` |
| 10 | proses terpotong | EMPAT TAHAP · DIULANG | gelung empat kotak + panah pulang — `5-perbarui` |
| 11 | koreksi | HAFAL, · BUKAN PAHAM | batas berkelok + titik baru di sisi salah — `3-data-baru` |
| 12 | proses terpotong | SEPETAK · DEMI PETAK | kisi gambar + jendela 3×3 — `2-jendela` |
| 13 | sebelum → sesudah | URUTAN · MENGUBAH | dua potongan kata bertukar tempat — `2-konteks` |
| 14 | anomali | KATA MANA · YANG KUAT? | garis perhatian tebal ke NASI — `3-perhatian` |
| 15 | sebelum → sesudah | DARI SATU · SIMPUL | simpul kecil di sebelah blok transformer — `5-intinya` |

**Tidak ada kartu yang mengulang kata judulnya.** docs/06 mensyaratkan judul dan
thumbnail tidak berbagi kata: yang satu menjelaskan, yang satu menarik. Judul
kelima belas episode ditulis di fase berikutnya, dan daftar kata di atas ini yang
jadi daftar larangannya.

## Uji yang wajib dilakukan sebelum menyatakan selesai

1. **Buka PNG-nya pada 210×118 px** (ukuran nyata di feed ponsel). Kalau
   katanya tidak terbaca di situ, ulangi — bukan kecilkan hurufnya.
2. **Lihat kelimabelasnya berjajar.** Kalau ada dua yang terlihat sama dari
   kejauhan, salah satunya harus diganti polanya.
3. **Cocokkan tiap gambaran dengan scene-nya.** Kolom terakhir tabel di atas
   adalah janjinya; buka scene itu dan pastikan bendanya memang ada di sana.

## Catatan

- **16:9 tidak dibuat.** Seri ini seluruhnya Shorts — tidak ada video panjang,
  jadi tidak ada tempat kartu 1280×720 dipakai
  ([naskah.md](naskah.md) § Peta seri).
- Keluarannya `render/thumb-s01.png` … `render/thumb-s15.png`, 2160×3840.
