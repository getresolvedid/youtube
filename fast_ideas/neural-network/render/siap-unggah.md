# T19 · Daftar siap-unggah — 15 Short

**Unggahnya MANUAL, dan itu keputusan repo ini, bukan kekurangan.**
`.env.example` § YouTube menulisnya apa adanya: *"Kosongkan selama unggah masih
manual."* Keempat kredensial (`YOUTUBE_CHANNEL_ID`, `CLIENT_ID`,
`CLIENT_SECRET`, `REFRESH_TOKEN`) kosong, dan tidak ada satu pun perkakas unggah
di `tools/`. Berkas ini yang menggantikannya: satu baris per Short, semuanya
sudah dipasangkan, tinggal ditekan.

## Sebelum Short pertama diunggah

- [ ] **Dengarkan kelimabelasnya.** Pencocokan kata 100% membuktikan naskahnya
      terbaca benar; ia tidak membuktikan pengucapannya enak didengar.
      Perhatikan khusus: **S15** (dibaca per-scene, temponya bisa beda),
      **S09** dan **S14** (istilah Inggris jatuh di kalimat terakhir).
- [ ] **Lihat kelima belas kover berjajar** pada ukuran 210×118 px. Kalau ada
      dua yang terlihat kembar dari kejauhan, ganti polanya dulu
      ([thumbnail.md](../thumbnail.md) § Uji yang wajib).
- [ ] Pastikan setelan channel: **Shorts, bukan video biasa** (9:16 di bawah
      3 menit sudah otomatis, tapi periksa), bahasa **Indonesia**, dan
      **bukan konten untuk anak** ("not made for kids").

## Satu baris per Short

Kolom "kover" dan "video" adalah jalur berkasnya. Judul & deskripsi lengkap ada
di [publish.md](publish.md) — kolom judul di sini cuma pengenal cepat.

| # | Video | Kover | Judul | Durasi |
|---|---|---|---|---|
| 01 | `out/T19-neural-network-s1.mp4` | `render/thumb-s01.png` | Bagaimana AI belajar tanpa pernah diprogram | 30,6 |
| 02 | `out/T19-neural-network-s2.mp4` | `render/thumb-s02.png` | Cara kerja neuron buatan, dilihat dari dalam | 31,5 |
| 03 | `out/T19-neural-network-s3.mp4` | `render/thumb-s03.png` | Bobot dan bias di neural network, 30 detik | 30,7 |
| 04 | `out/T19-neural-network-s4.mp4` | `render/thumb-s04.png` | Kenapa neural network butuh fungsi aktivasi | 27,7 |
| 05 | `out/T19-neural-network-s5.mp4` | `render/thumb-s05.png` | Alasan jaringan saraf disusun bertingkat | 32,0 |
| 06 | `out/T19-neural-network-s6.mp4` | `render/thumb-s06.png` | Forward propagation dijelaskan sederhana | 28,7 |
| 07 | `out/T19-neural-network-s7.mp4` | `render/thumb-s07.png` | Fungsi loss: cara AI mengukur kekeliruan | 30,2 |
| 08 | `out/T19-neural-network-s8.mp4` | `render/thumb-s08.png` | Backpropagation dijelaskan tanpa rumus | 26,3 |
| 09 | `out/T19-neural-network-s9.mp4` | `render/thumb-s09.png` | Gradient descent dijelaskan pakai lereng | 34,8 |
| 10 | `out/T19-neural-network-s10.mp4` | `render/thumb-s10.png` | Apa yang terjadi saat model AI dilatih | 34,3 |
| 11 | `out/T19-neural-network-s11.mp4` | `render/thumb-s11.png` | Overfitting dijelaskan dalam 30 detik | 25,5 |
| 12 | `out/T19-neural-network-s12.mp4` | `render/thumb-s12.png` | Cara CNN mengenali isi sebuah gambar | 28,3 |
| 13 | `out/T19-neural-network-s13.mp4` | `render/thumb-s13.png` | Cara AI memproses deret dan konteks | 25,3 |
| 14 | `out/T19-neural-network-s14.mp4` | `render/thumb-s14.png` | Attention di transformer, dijelaskan pelan | 26,9 |
| 15 | `out/T19-neural-network-s15.mp4` | `render/thumb-s15.png` | Hubungan neural network dengan ChatGPT | 32,4 |

## Jadwal

**Satu per hari, urut 01 → 15.** Tiap Short menggantung episode berikutnya di
dua detik terakhirnya; gantungan yang dijawab di jam yang sama berhenti jadi
gantungan. Lima belas hari berturut-turut.

Kalau harus dipadatkan, yang boleh digabung **maksimal dua per hari** dan
**bukan yang bergantungan langsung** — mis. 01 pagi & 03 malam, bukan 01 & 02.

## Yang sudah dijamin, dan oleh apa

| Klaim | Dijamin oleh |
|---|---|
| Naskah yang diucapkan = naskah yang ditulis | `vo:cocok` — 100% di 14 Short; S15 diperiksa per-scene |
| Kenyaringan seragam antar-episode | `rata-vo` — kesembilan puluh satu berkas di −14 LUFS |
| Tidak ada scene yang tertinggal jadi placeholder | `npm run sisa` — nol di 20 keluaran |
| Tidak ada benda yang saling menutupi | `npm run tumpang` |
| Tidak ada potongan antar-scene yang melompat | `npm run jahit` |
| Kover tidak menjanjikan gambar yang tidak ada di videonya | kover mengimpor komponen scene-nya sendiri (`kover.tsx`) |
| Judul tidak berebut kata dengan kover | [publish.md](publish.md) kolom "kata terlarang" |

**Yang TIDAK dijamin siapa pun, dan cuma bisa kamu:** apakah suaranya enak
didengar, dan apakah penjelasannya benar-benar masuk di kepala orang yang belum
tahu apa-apa.
