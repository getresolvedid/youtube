---
kode: T19
judul: Bagaimana AI sebenarnya belajar
sumber_direction: direction-masuk/30-second-shorts-production-standard.md
diunggah: 2026-08-18
naskah_beku:           # tanggal; diisi saat VO boleh digenerate
---

# T19 · Bagaimana AI sebenarnya belajar

Seri Shorts. Berkas ini **turunan** unggahan user di
[`direction-masuk/`](direction-masuk/30-second-shorts-production-standard.md) —
kalau keduanya berbeda, unggahannya yang benar dan berkas ini yang diperbaiki
([fast_ideas/README](../README.md#fase-1--direction-masuk)).

## Ringkas

Bukan "apa itu AI", dan bukan "kenapa AI ngarang". Yang ditunjukkan **mekanisme
belajarnya**: satu jaringan yang awalnya menebak asal, ditegur ribuan kali, lalu
pelan-pelan jadi benar — tanpa satu pun aturan yang pernah dituliskan manusia.
Gelung yang jadi tulang punggungnya: **tebak → meleset → geser → ulang**.

Unggahan menyebut batas belajarnya sendiri, dan itu dipegang: penonton **tidak**
perlu paham backpropagation atau gradient descent di episode ini. Keduanya milik
episode berikutnya.

## Penjelasan 5 tahun

> Bayangkan tumpukan saklar kecil yang saling terhubung. Kamu tunjukkan seribu
> gambar kucing sambil bilang benar atau salah. Setiap kali salah, saklar-saklarnya
> digeser sedikit. Setelah ribuan kali, tumpukan itu bisa menebak kucing sendiri —
> tanpa pernah ada yang menuliskan aturan seperti apa kucing itu.

**Titik putus analogi:** saklar itu tidak cuma hidup-mati, nilainya angka yang
bisa berapa saja — dan pergeserannya tidak asal coba-coba, arahnya dihitung dari
seberapa besar tiap saklar ikut menyumbang kesalahan tadi. Episode ini berhenti
tepat sebelum titik itu; yang menyeberanginya adalah episode gradient descent.

## Peta seri — 15 episode

**Sumbernya [`direction-masuk/15-episode-master-plan.md`](direction-masuk/15-episode-master-plan.md)**
(diunggah 2026-08-19), yang **menggantikan** unggahan pertama sebagai peta seri.
Unggahan pertama tetap berlaku sebagai **standar produksi** (struktur 6 blok,
anggaran 30 detik, aturan teks layar, kotak aman) — keduanya tidak bertabrakan
di situ.

Nomor Short = nomor episode. Bukan urutan pengerjaan, melainkan urutan tayang;
`s5-lapisan` berarti Episode 05, apa pun kapan ia dibangun.

| # | Episode | Berkas | Status |
|---|---|---|---|
| 01 | How Does AI Actually Learn? | `s1-belajar` | **jadi** — cocok persis dengan peta |
| 02 | How Does One Artificial Neuron Work? | `s2-neuron` | **jadi, tapi BENTROK** — lihat § Bentrok tercatat |
| 03 | What Are Weights and Biases? | — | belum |
| 04 | Why Does AI Need Activation Functions? | — | belum |
| 05 | Why Does a Neural Network Need Layers? | `s5-lapisan` | **jadi** — isi cocok; scene `berikutnya` masih menunjuk arah geser, harus jadi forward propagation |
| 06 | How Does Information Move Through a Network? | — | belum |
| 07 | How Does AI Know It Is Wrong? | — | belum |
| 08 | How Does AI Learn From Its Mistakes? | — | belum |
| 09 | How Does Gradient Descent Improve AI? | `s9-lereng` | **jadi sebagian** — lihat § Bentrok tercatat |
| 10 | What Actually Happens When AI Trains? | — | belum |
| 11 | Can AI Memorize Instead of Learn? | — | belum |
| 12 | How Do Neural Networks Understand Images? | — | belum |
| 13 | How Does AI Handle Sequences? | — | belum |
| 14 | How Do Transformers Understand Language? | — | belum |
| 15 | How Does This Connect to ChatGPT? | — | belum |

**Tiap Short tetap berdiri sendiri.** Bentuk serial di
[docs/02](../../docs/02-format-video.md#bentuk-kedua-serial) mensyaratkannya —
sepuluh detik pertama memperkenalkan ulang bendanya dalam satu frasa, dan
dilarang membuka dengan "di episode sebelumnya". Penonton Shorts mendarat dari
feed, satu per satu, hampir tidak pernah berurutan.

## Bentrok tercatat — apa yang harus diperbaiki

Tiga hal, semuanya akibat tiga Short dibangun sebelum peta 15 episode ada.
**Peta yang menang**, dan berkas di repo yang diperbaiki.

1. **Ep 02 memakai AMBANG, peta minta BIAS.** Scene `5-ambang` sekarang
   menunjukkan "kalau angkanya melewati batas, simpul menyala" — itu **fungsi
   aktivasi**, dan peta menaruhnya di **Episode 04**. Yang diminta peta di Ep 02:
   `weighted sum + bias` lalu `output`, tanpa ambang sama sekali. Akibatnya
   Ep 02 harus dibangun ulang dari scene 3 ke bawah:
   `jumlah-bias` → `keluaran` → `mesin-kecil` (INPUTS → CALCULATION → OUTPUT) →
   `berikutnya` yang menunjuk **WEIGHTS**, bukan "kenapa berlapis".
2. **Ep 05 menunjuk episode yang salah.** Scene `6-berikutnya`-nya menggantung
   "ke mana arah gesernya" (itu Ep 09); peta minta **forward propagation**
   (Ep 06).
3. **Ep 09 punya satu scene karangan dan kurang satu scene.** `2-coba-semua`
   ("sambungannya ribuan, tidak akan selesai") tidak ada di peta — peta memakai
   `LOSS LANDSCAPE` sebagai setup. Peta juga memisahkan `MOVE DOWNHILL` dari
   `SMALL STEPS`, dan menutup dengan `berikutnya` → **TRAINING** (Ep 10), yang
   sekarang tidak ada karena dulu Ep 09 dikira penutup seri.

**Peta melarang mengarang:** "Do not invent additional story elements when giving
these directions to another AI." Itu yang membatalkan `2-coba-semua`, dan itu
juga yang membuat sisa episode tidak boleh diisi tebakan — kalau sebuah beat
tidak ada di peta, ia tidak dibuat.

## Batas dengan topik lain

Tiga topik di [docs/07](../../docs/07-backlog-topik.md) berada di sebelahnya, dan
yang paling mudah termakan T10:

| Topik | Yang dipegangnya | Yang TIDAK boleh diambil T19 |
|---|---|---|
| T10 · Kenapa AI bisa menjawab tapi kadang ngarang | perilaku model bahasa, kenapa jawabannya bisa salah tapi terdengar yakin | seluruh urusan halusinasi & menebak kata berikutnya |
| T11 · Kenapa rekomendasi tahu selera kamu | sistem rekomendasi | contoh "ditawari film yang kamu suka" sebagai gambaran utama |

Sudut T19 yang tidak dipegang siapa pun: **jaringan yang tidak diprogram,
melainkan dilatih.** Uji satu baris — kalau sebuah scene bisa dipindahkan ke T10
tanpa terasa hilang, scene itu memang milik T10.

## Short 1 — T19-S1 · "Bagaimana AI sebenarnya belajar?"

**Sudut:** gelung belajar, satu putaran penuh.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s1-belajar/` — id komposisi `t19-s1-…`, Short utuh `T19-neural-network-s1`.
**Sumber:** unggahan § 23 "Example: Episode 1", scene 01–06.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| cara-belajar | hook | Simpul-simpul muncul dan saling terhubung; satu denyut lewat. Pertanyaannya jatuh. |
| belum-tahu | ketegangan | Satu contoh masuk, jawaban yang keluar salah. Salahnya ditunjukkan, bukan diberi tahu. |
| tebak-cek-geser | payoff | Tiga tahap: denyut lewat → jawaban vs seharusnya → sambungan bergeser. |
| diulang | payoff | Gelung yang sama diputar berkali-kali, tiap putaran makin dekat sampai benar. |
| intinya | tutup | Layar disederhanakan jadi satu rantai empat kata. Di sinilah namanya jatuh. |
| berikutnya | tutup | Kamera masuk ke satu simpul; episode berikutnya digantung di situ. |

Penutup 2 dtk (`<EndCard rasio="9x16">`) menyusul otomatis sesudahnya —
tidak didaftarkan di tabel, tidak punya rencana VO ([docs/10](../../docs/10-scene-standar.md)).

## Short 2 — T19-S02 · "Apa yang sebenarnya dikerjakan satu neuron?"

**Sudut:** satu neuron dari dalam: dikali, dijumlah + bias, keluar.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s2-neuron/` — id komposisi `t19-s2-…`, Short utuh `T19-neural-network-s2`.
**Sumber:** peta 15 episode § Episode 02.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| satu-simpul | hook | Kamera masuk dari jaringan ke satu simpul. Isinya belum kelihatan. |
| tiga-masuk | ketegangan | Tiga masukan datang, tiap sambungan beda kuatnya. |
| jumlah-bias | payoff | Ketiganya digabung, bias ditambahkan, satu angka keluar. |
| keluaran | payoff | Angka itu jadi keluaran simpulnya, berangkat ke lapis berikutnya. |
| mesin-kecil | tutup | MASUK → HITUNG → KELUAR. Di sinilah namanya jatuh. |
| berikutnya | tutup | Kamera masuk ke ketebalan sambungan; siapa yang menentukannya? |

**DIBANGUN ULANG 2026-08-19.** Versi lama memakai **ambang** ("lewat batas →
menyala") — itu fungsi aktivasi, dan peta menaruhnya di Episode 04. Yang benar
di sini: **bias**, lalu keluaran. Scene `3-tebal-tipis` dan `5-ambang` lama
dihapus; `jumlah-bias`, `keluaran`, dan `mesin-kecil` menggantikannya
(§ Bentrok tercatat 1).

## Short 5 — T19-S5 · "Kenapa jaringannya harus berlapis?"

**Sudut:** satu lapis tidak cukup.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s5-lapisan/` — id komposisi `t19-s5-…`, Short utuh `T19-neural-network-s5`.
**Dijanjikan Ep 2** di scene `6-berikutnya`.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| satu-lapis | hook | Satu lapis saja, langsung ke jawaban. Kelihatan cukup. |
| cuma-garis | ketegangan | Satu lapis cuma bisa memisahkan dengan satu garis lurus — dan titiknya tidak bisa dipisah begitu. |
| ditumpuk | payoff | Satu lapis disisipkan di tengah. Lapis pertama menemukan potongan-potongan sederhana. |
| jadi-bentuk | payoff | Lapis berikutnya menggabungkan potongan jadi bentuk, lalu jadi kucing. |
| bertingkat | tutup | Tiap lapis menyusun temuan lapis sebelumnya. Di sinilah namanya jatuh. |
| berikutnya | tutup | Satu sambungan menyala, siap digeser — tapi ke mana? |

## Short 9 — T19-S09 · "Dari mana AI tahu harus berubah ke arah mana?"

**Sudut:** menuruni lereng meleset.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s9-lereng/` — id komposisi `t19-s9-…`, Short utuh `T19-neural-network-s9`.
**Sumber:** peta 15 episode § Episode 09.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| ke-mana | hook | Satu bola di atas lereng meleset. Ke arah mana ia harus bergerak? |
| lereng | ketegangan | Melesetnya digambar sebagai lereng: ada yang tinggi, ada yang rendah. |
| menurun | payoff | Panah kemiringan menunjuk ke atas; yang dilakukan justru sebaliknya. |
| langkah-kecil | payoff | Langkah-langkah kecil diulang, melesetnya turun. |
| dasar | tutup | Sampai di dasar. Di sinilah namanya jatuh: gradient descent. |
| berikutnya | tutup | Keempat bagian tadi disusun jadi satu gelung; latihan digantung. |

**DIBANGUN ULANG 2026-08-19.** Scene `2-coba-semua` lama ("sambungannya ribuan,
tidak akan selesai") **tidak ada di peta** dan dihapus — peta melarang mengarang
beat. Peta juga memisahkan `MOVE DOWNHILL` dari `SMALL STEPS`, dan menutup
dengan gantungan ke Ep 10, bukan menutup seri (§ Bentrok tercatat 3).

## Short 3 — T19-S03 · "Apa itu bobot dan bias?"

**Sudut:** bobot mengatur pengaruh; bias menggeser hasil.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s3-bobot-bias/` — id komposisi `t19-s3-…`, Short utuh `T19-neural-network-s3`.
**Sumber:** peta 15 episode § Episode 03.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| kenapa-bobot | hook | Sambungan-sambungan muncul dengan kuat yang berbeda-beda. |
| pengaruh | ketegangan | Kuat, sedang, lemah — terangnya sinyal mengikuti kuatnya sambungan. |
| bias-geser | payoff | Garis bilangan bergeser saat biasnya diubah. |
| dilatih | payoff | Setelah salah, nilainya berubah; tebakan berikutnya membaik. |
| intinya | tutup | BOBOT → PENGARUH; BIAS → GESER. Di sinilah keduanya dinamai. |
| berikutnya | tutup | Simpul berhenti sejenak sebelum mengeluarkan hasil; sesuatu belum ada. |

## Short 4 — T19-S04 · "Kenapa AI tidak cukup menjumlah saja?"

**Sudut:** aktivasi menambahkan lengkungan.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s4-aktivasi/` — id komposisi `t19-s4-…`, Short utuh `T19-neural-network-s4`.
**Sumber:** peta 15 episode § Episode 04.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| cuma-tambah | hook | Satu simpul menjumlah, hasilnya garis lurus. |
| terlalu-sederhana | ketegangan | Berlapis-lapis penjumlahan runtuh jadi satu garis lurus juga. |
| dilengkungkan | payoff | Garisnya melewati kurva aktivasi dan berubah bentuk. |
| pola-rumit | payoff | Batas pemisah yang tadinya lurus jadi berkelok lewat lapisan. |
| intinya | tutup | Aktivasi membawa jaringan melewati garis lurus. Di sinilah namanya jatuh. |
| berikutnya | tutup | Simpul-simpul ditumpuk jadi lapisan; pertanyaannya digantung. |

## Short 6 — T19-S06 · "Apa yang terjadi saat AI diberi masukan?"

**Sudut:** perjalanan masukan sampai jadi tebakan.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s6-maju/` — id komposisi `t19-s6-…`, Short utuh `T19-neural-network-s6`.
**Sumber:** peta 15 episode § Episode 06.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| apa-terjadi | hook | Angka masukan muncul, jaringan menyala. |
| masuk | ketegangan | Masukan itu memasuki lapis pertama. |
| maju | payoff | Tiap simpul menghitung, lalu meneruskan ke lapis berikutnya. |
| keluaran | payoff | Lapis terakhir mengubah semuanya jadi satu tebakan. |
| forward | tutup | Perjalanan dari masuk sampai keluar itu namanya forward propagation. |
| berikutnya | tutup | Tebakannya sudah ada — tapi dari mana dia tahu itu salah? |

## Short 7 — T19-S07 · "Dari mana AI tahu tebakannya salah?"

**Sudut:** loss mengubah selisih jadi angka.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s7-seberapa-salah/` — id komposisi `t19-s7-…`, Short utuh `T19-neural-network-s7`.
**Sumber:** peta 15 episode § Episode 07.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| seberapa-salah | hook | Tebakan dan jawaban benar berdampingan. |
| dibandingkan | ketegangan | 0,2 dibanding 1,0 — selisihnya ditandai. |
| jadi-angka | payoff | Selisih itu diubah jadi satu angka. |
| makin-besar | payoff | Salah kecil jadi angka kecil; salah besar jadi angka besar. |
| intinya | tutup | Angka itu yang membuat kesalahan bisa diukur. Di sinilah namanya jatuh. |
| berikutnya | tutup | Sekarang jaringannya harus tahu apa yang harus diubah. |

## Short 8 — T19-S08 · "Bagaimana AI tahu bagian mana yang harus diubah?"

**Sudut:** kesalahan ditelusuri mundur.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s8-mundur/` — id komposisi `t19-s8-…`, Short utuh `T19-neural-network-s8`.
**Sumber:** peta 15 episode § Episode 08.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| apa-diubah | hook | Angka kesalahan muncul, jaringan membeku. |
| mundur | ketegangan | Keterangan kesalahan berjalan mundur dari keluaran ke lapis sebelumnya. |
| andil | payoff | Tiap sambungan menyala berbeda-beda sesuai andilnya pada kesalahan tadi. |
| arah-turun | payoff | Panah perubahan muncul, menunjuk ke arah yang menurunkan kesalahan. |
| intinya | tutup | Yang mundur itu memberi tahu DI MANA harus disetel. Di sinilah namanya jatuh. |
| berikutnya | tutup | Arahnya sudah ada — tapi seberapa besar tiap langkahnya? |

## Short 10 — T19-S10 · "Apa yang sebenarnya terjadi saat AI dilatih?"

**Sudut:** empat tahap jadi satu gelung.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s10-latihan/` — id komposisi `t19-s10-…`, Short utuh `T19-neural-network-s10`.
**Sumber:** peta 15 episode § Episode 10.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| apa-terjadi-latihan | hook | Empat kotak kosong berjajar. |
| tebak | ketegangan | Satu: jaringan menebak. |
| ukur | payoff | Dua: kesalahannya diukur. |
| mundur | payoff | Tiga: kesalahan ditelusuri mundur. |
| perbarui | payoff | Empat: nilainya disetel, lalu gelungnya berputar lagi. |
| intinya | tutup | Latihan adalah gelung ini, diulang untuk banyak contoh. |
| berikutnya | tutup | Diulang terus-menerus justru melahirkan masalah baru. |

## Short 11 — T19-S11 · "Bisakah AI cuma menghafal?"

**Sudut:** hafal contoh vs menangkap pola.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s11-hafalan/` — id komposisi `t19-s11-…`, Short utuh `T19-neural-network-s11`.
**Sumber:** peta 15 episode § Episode 11.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| hafal-atau-belajar | hook | Contoh yang sudah dikenal dijawab sempurna. |
| data-latih | ketegangan | Pada contoh latihannya, nilainya nyaris sempurna. |
| data-baru | payoff | Begitu datang yang baru, jawabannya meleset. |
| overfitting | payoff | Batas pemisahnya berkelok mengikuti tiap titik latihan, dan gagal di titik baru. |
| intinya | tutup | Belajar yang benar bekerja di luar contoh yang pernah dilihat. |
| berikutnya | tutup | Bagaimana kalau yang masuk itu sebuah gambar? |

## Short 12 — T19-S12 · "Bagaimana AI memahami gambar?"

**Sudut:** jendela kecil, penyaring, lalu bentuk.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s12-gambar/` — id komposisi `t19-s12-…`, Short utuh `T19-neural-network-s12`.
**Sumber:** peta 15 episode § Episode 12.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| lihat-gambar | hook | Sebuah gambar masuk sebagai kisi titik. |
| jendela | ketegangan | Bukan tiap titik dibaca sendiri — satu jendela kecil menyapu gambarnya. |
| penyaring | payoff | Penyaring yang berbeda menanggapi tepi dan tekstur yang berbeda. |
| bertingkat | payoff | Lapis yang lebih dalam menggabungkannya jadi bentuk dan bagian. |
| cnn | tutup | Itu inti convolutional neural network. Di sinilah namanya jatuh. |
| berikutnya | tutup | Tapi gambar bukan satu-satunya bentuk masukan. |

## Short 13 — T19-S13 · "Kenapa urutan penting buat AI?"

**Sudut:** yang datang duluan mengubah arti yang datang kemudian.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s13-urutan/` — id komposisi `t19-s13-…`, Short utuh `T19-neural-network-s13`.
**Sumber:** peta 15 episode § Episode 13.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| urutan | hook | Kata-kata yang sama, disusun dua urutan berbeda. |
| konteks | ketegangan | Yang datang lebih dulu mengubah cara kita membaca yang berikutnya. |
| bawa-konteks | payoff | Keterangan dari langkah sebelumnya dibawa ke langkah berikutnya. |
| contoh | payoff | Bahasa, suara, dan deret waktu masuk ke model yang sama. |
| intinya | tutup | Untuk urutan, apa yang datang sebelumnya bisa menentukan. |
| berikutnya | tutup | Lalu ada cara baru yang mengubah semuanya. |

## Short 14 — T19-S14 · "Bagaimana AI tahu kata mana yang penting?"

**Sudut:** perhatian antar-kata.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s14-perhatian/` — id komposisi `t19-s14-…`, Short utuh `T19-neural-network-s14`.
**Sumber:** peta 15 episode § Episode 14.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| kata-mana | hook | Kata-kata satu kalimat berdiri sendiri-sendiri. |
| token | ketegangan | Kalimatnya dipecah jadi potongan, lalu hubungannya dibaca. |
| perhatian | payoff | Satu potongan memberi perhatian berbeda-beda ke potongan lain. |
| konteks | payoff | Garis perhatian membentang, dan konteksnya digabung. |
| intinya | tutup | Transformer dibangun di atas cara menghubungkan itu. |
| berikutnya | tutup | Dan itu sebagian besar dari cara AI bahasa sekarang bekerja. |

## Short 15 — T19-S15 · "Semua ini nyambungnya ke ChatGPT di mana?"

**Sudut:** peta seluruh seri.
**Target:** 30 dtk (28 dtk isi + 2 dtk penutup) · L1
**Berkas:** `scene-shorts/s15-chatgpt/` — id komposisi `t19-s15-…`, Short utuh `T19-neural-network-s15`.
**Sumber:** peta 15 episode § Episode 15.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| di-mana | hook | Motif jaringan berubah jadi antarmuka percakapan. |
| fondasi | ketegangan | Di belakangnya, blok transformer tersusun. |
| ide-sama | payoff | Bobot, latihan, kesalahan, penyetelan — keempatnya tersambung. |
| bahasa | payoff | Potongan kata terhubung lewat perhatian, lalu mengalir jadi tebakan. |
| intinya | tutup | Satu simpul sederhana tadi adalah awal dari cerita yang jauh lebih besar. |
| penutup | tutup | Lima belas gagasan muncul sebagai satu jalur yang tersambung. |

## Kamus pengucapan

HARD RULE 4: akronim boleh muncul di blok `## VO` **jika dan hanya jika** ada
barisnya di sini.

| tertulis | dibaca |
|---|---|
| AI | e i |

## Penyimpangan tercatat

Unggahan ini bukan naskah biasa — ia sebuah **standar produksi**, dan sebagian
isinya bersinggungan dengan aturan repo. Yang diputuskan:

1. **Seri Shorts tanpa video panjang.** Model baku repo adalah 1 video panjang +
   4 Shorts berbeda peran ([docs/02](../../docs/02-format-video.md#anatomi-shorts));
   di sini tiap episode berdiri sendiri sebagai satu Short. Yang tetap mengikat
   dari bentuk serial docs/02: **sepuluh detik pertama tiap Short harus berdiri
   sendiri**, dan dilarang membuka dengan "di episode sebelumnya".
2. **Timing di unggahan adalah TARGET, bukan angka yang diketik.** Repo menghitung
   durasi tiap scene dari jumlah kata di `<kunci>-vo.md` (HARD RULE 4) — jadi
   `0:07–0:17` dipakai sebagai anggaran saat menulis VO, lalu `npm run gen` yang
   menetapkannya. Jangan pernah menyalin detik unggahan ke `.tsx`.
3. **Penutup 2 detik menekan anggaran isi jadi 28 detik.** Unggahan memakai
   0:28–0:30 untuk teaser episode berikutnya, sementara tiap Short repo wajib
   ditutup tanda brand 2 dtk. Yang dipilih: teaser tetap jadi scene sendiri
   (`berikutnya`) di ujung 28 detik isinya, penutup brand menyusul sesudahnya.
   → keputusan tertunda #2 di bawah.
4. **Kamera "push in / pull out" dikerjakan sebagai transform panggung**, bukan
   kamera sungguhan — `scale`/`translate` yang murni fungsi frame
   (CLAUDE.md § Deterministik). docs/03 membatasi gerak yang tidak menjelaskan,
   jadi tiap gerak kamera di berkas direction menyebutkan apa yang dijelaskannya.
5. **Musik: tidak ada.** Sejalan dengan repo, tidak perlu keputusan baru.
6. **Direction Ep 2–4 dulu disusun Claude** — atas permintaan user 2026-08-18
   ("all short eps"). **Gugur sebagian 2026-08-19**: peta 15 episode
   mengunggah direction sungguhan untuk semuanya, jadi Ep 02/05/09 sekarang
   punya sumber user dan yang berlaku peta itu, bukan susunan Claude. Yang
   tersisa dari penyimpangan ini cuma jejaknya di § Bentrok tercatat.
   Catatan aslinya: Ini menyimpang dari aturan pokok
   [fast_ideas/README](../README.md#fase-1--direction-masuk), yang menaruh
   direction sebagai keputusan user dan melarang Claude menambah gagasan di
   fase 1. Yang menahan penyimpangan ini supaya tidak jadi kebiasaan:
   **standar produksinya tetap dari unggahan** (struktur 6 scene, anggaran
   30 detik, aturan teks layar, kotak aman, § 22), dan **topik tiap episode
   diturunkan dari janji yang sudah ada di unggahan** — Ep 2 dari teaser
   "THE ARTIFICIAL NEURON" di § 8, Ep 4 dari gradient descent yang § 23
   sebutkan sebagai milik episode berikutnya. Yang murni pilihan Claude cuma
   Ep 3. Kalau user mengunggah direction sungguhan untuk salah satunya,
   **unggahan itu yang menang** dan berkas di sini yang diperbaiki.

## Yang perlu keputusan user

Belum dijawab, dan menahan fase 3 — bukan fase 1:

1. **Bahasa VO & teks layar.** Unggahan berbahasa Inggris; channel ini berbahasa
   Indonesia. Asumsi yang dipakai berkas direction: **VO Indonesia**, teks layar
   Indonesia (`TEBAK` · `MELESET` · `GESER` · `BELAJAR`). Kalau maunya teks layar
   tetap Inggris (PREDICT/ERROR/ADJUST/LEARN) sebagai kosakata seri, bilang —
   itu mengubah tujuh berkas direction sekaligus.
2. **Teaser episode berikutnya vs penutup brand.** Sekarang keduanya berdiri
   sendiri (2 dtk + 2 dtk). Alternatifnya teks `BERIKUTNYA: …` dititipkan ke
   kartu penutup, dan Short-nya balik jadi 30 dtk pas.
3. **Standar produksinya mau dipromosikan jadi guideline repo atau tidak.**
   Bagian 1–22 dan 24–26 unggahan berlaku untuk **semua** episode seri, bukan
   cuma Episode 1. Selama ia tinggal di `direction-masuk/`, ia arsip satu
   unggahan; kalau mau mengikat episode berikutnya, tempatnya `guidelines/` —
   dan bagian yang bertabrakan dengan docs/02, docs/03, dan docs/10 harus
   diselesaikan dulu, bukan didiamkan jadi dua kontrak.

## Sumber

Belum ada satu pun angka yang dipakai. Jangan menyebut jumlah lapisan, jumlah
parameter, lama pelatihan, atau akurasi apa pun sebelum barisnya ada di sini
(CLAUDE.md § Aturan kerja).

## Catatan

- Kode **T19** diambil karena T18 (tcp-ip) yang tertinggi terpakai; T15, T16, dan
  T17 sudah mati dan tidak pernah didaur ulang. Belum didaftarkan di
  `tools/prefiks.mjs` maupun `src/Root.tsx` — keduanya fase 3.
- Fase 2 (thumbnail) belum mulai. Figur yang dijanjikan kover Short-nya wajib
  komponen yang sama dengan yang dipakai scene — lahir sebagai `figur-*.tsx`,
  bukan digambar ulang di dalam `thumb-s1.tsx`
  ([fast_ideas/README § Fase 2](../README.md#fase-2--bangun-thumbnail)).
