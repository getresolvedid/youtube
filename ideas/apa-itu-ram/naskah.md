---
kode: T01
slug: apa-itu-ram
judul_kerja: Di mana data aplikasi saat aplikasi dibuka?
pilar: P1 · Cara Kerja Sehari-hari
lapis: umum
what: RAM
status: vo              # ketiganya masuk fase 5
naskah_beku:
  L: 2026-08-14
  S1: 2026-08-14
  S2: 2026-08-14
karakter_terpakai: 4185   # 2026-08-14 · L 2.785 + S1 & S2 1.400 — sekali jalan, nol generate ulang
kamus:                    # kamus pengucapan ElevenLabs, dikompilasi dari § Kamus pengucapan
  id: XIVGhYQEqXXJmNBpHY7Z
  version: lxPnmq4DGvjvzzXPd8Aj   # 6 aturan · dibuat 2026-08-14
tanggal_target:
---

# T01 · Apa itu RAM

Disusun mengikuti **flow 7 bagian** ([docs/02](../../docs/02-format-video.md#anatomi-video-panjang--flow-wajib)).

| # | Bagian | Isi |
|---|---|---|
| 1 | **[question]** | Di mana data aplikasi saat aplikasi dibuka? |
| 2 | **brand opening** | sting standar 1,5 dtk |
| 3 | **[problem]** | Tempat yang muat banyak selalu lambat — prosesor habis waktu menunggu |
| 4 | **[answer] → [what]** | Data disalin dulu ke tempat kerja yang dekat: **RAM** |
| 5 | **[why]** | Bukan cuma dekat: di meja tidak ada yang perlu dicari, dan satu perjalanan mahal terbayar ribuan kali |
| 6 | **[explaining]** | kenapa ukurannya selalu kelipatan dua · wujudnya beda-beda · angka DDR di kotaknya · bedanya dengan penyimpanan, termasuk kenapa RAM lupa |
| 7 | **[case]** | Yang bukan tugas RAM — batas yang membuat penonton berhenti menyalahkan RAM untuk hal yang bukan urusannya (`ram-tugas`) |

## Penjelasan 5 tahun

> RAM itu meja kerja, hard disk itu lemari arsip. Kamu tidak membaca dokumen di
> dalam lemari — kamu ambil, taruh di meja, baru kerjakan. Meja lebih besar
> berarti lebih banyak yang terbuka sekaligus tanpa bolak-balik. Kalau meja
> penuh, berkas mulai ditumpuk di lantai.

**Analogi utama:** meja kerja (RAM) vs lemari arsip di gudang (penyimpanan).

**Titik putus analogi:** meja tetap berisi saat kamu pulang; RAM kosong total
begitu listrik mati (scene 039–045). Dan prosesor tidak mengambil langsung dari
meja — ada meja jauh lebih kecil yang menempel padanya, namanya cache
(scene 046–050).

## Satu kalimat bawa-pulang

> Yang sedang dipakai ada di RAM. Sisanya masih di penyimpanan. Menambah RAM
> hanya membantu kalau mejamu memang sudah penuh.

## Naik tangga

| Tangga | Isi |
|---|---|
| **L1** | Gudang besar tapi jauh; meja kecil tapi dekat. Ambil dulu, baru kerjakan. |
| **L2** | Penyimpanan permanen tapi lambat; RAM cepat tapi hilang saat listrik mati. Di antaranya ada cache. Saat RAM penuh, data dipindahkan balik ke penyimpanan. |
| **L3** | Hierarki memori dan alasan keberadaannya (locality). DRAM disegarkan ribuan kali per detik. "RAM terpakai 80 persen" bukan indikator; yang benar adalah aktivitas paging/swap. |

## Kamus istilah → L1

| Istilah | Kalimat L1 pembuka | Scene |
|---|---|---|
| penyimpanan | "Lemari arsip raksasa di gudang lantai bawah." | `bolak-balik` |
| RAM | "Meja kerja komputer." | `ram-analogy` |
| cache | "Meja kecil yang menempel langsung di prosesor." | 047 |
| swap / berkas halaman | "Memindahkan berkas dari meja kembali ke gudang." | 083 |
| hardisk / SSD | "Benda yang memegang berkasmu waktu komputernya mati." | `beda-penyimpanan` |
| modul RAM | "Batang yang ditancapkan ke papan induk." | `ram-bentuk` |
| DDR | "Angka generasi yang tertulis di batangnya." | `ram-generasi` |
| takik | "Coakan di deretan kaki batangnya — kuncinya." | `ram-generasi` |

## Sumber

| Klaim / angka | Sumber | Status |
|---|---|---|
| Spesifikasi mesin: Intel Core i7-11700F, 8 inti, L2 4 MB, L3 16 MB, RAM 32 GB DDR4-2667, SSD NVMe | `Win32_Processor` + `Win32_PhysicalMemory` + `Get-PhysicalDisk` di mesin ini, 2026-08-13 | ✅ terverifikasi |
| Prosesor mengerjakan miliaran perintah per detik | frekuensi 2,5 GHz dari spesifikasi di atas | ✅ terverifikasi |
| Latensi tiap tingkat di mesin ini: L1 1,43 ns · L2 3,11 ns · L3 68,88 ns · RAM 111,58 ns (kerja 64 MB) / 142,24 ns (kerja 512 MB) | `node tools/ukur-latensi.mjs` di mesin ini, 2026-08-14 — pointer chasing, tiga kali jalan, diambil yang tercepat | ✅ terukur sendiri |
| Hardisk 7200 rpm: seek rata-rata baca 8,5 ms + latensi putaran 4,16 ms = **12,66 ms** sekali ambil acak | [Seagate Desktop HDD Product Manual 100686584 Rev. AA §2.6](https://www.seagate.com/content/dam/seagate/migrated-assets/www-content/product-content/barracuda-fam/desktop-hdd/barracuda-7200-14/en-us/docs/100686584aa.pdf) (seek 8,5/9,5 ms; latensi 4,16 ms); angka 4,16 ms yang sama masih berlaku di [BarraCuda SATA Product Manual 210203200 Rev A, Maret 2025](https://www.seagate.com/content/dam/seagate/assets/support/internal-hard-drive/enterprise-hard-drives/exos-x24/_shared/files/Seagate_EXOS24_CMR_ISE_SED\(10-12-16-20-24TB\).pdf) | ✅ terverifikasi |
| Rasio "cache 1 detik : ram ± 1 menit : gudang ± 3 bulan" (dipakai di T01-S1) | turunan dua baris di atas: 111,58 / 1,43 = **78×** → 78 dtk ≈ 1,3 menit; 12,66 ms / 1,43 ns = **8,85 juta ×** → 8,85 juta dtk = 102 hari ≈ **3,4 bulan** | ✅ terhitung dari sumber |
| DRAM harus disegarkan terus-menerus: 8.192 perintah refresh tiap 32 ms (0–85 °C) = ± 256 ribu kali per detik | [Micron 24Gb DDR5 SDRAM Die Rev C, CCM005-1684161373-48, Rev. B 04/2025](https://www.farnell.com/datasheets/4594004.pdf) — "The specification requires 8,192 refresh commands within 32ms between 0oC and 85oC" | ✅ terverifikasi |
| RAM kehilangan seluruh isinya begitu listrik putus; penyimpanan tetap | RAM: refresh di baris atas hanya jalan selama ada listrik. Penyimpanan: [Micron NAND MT29F2G08AAD](https://media.digikey.com/pdf/Data%20Sheets/Micron%20Technology%20Inc%20PDFs/MT29F2G\(08,16\)AAD,ABD.pdf) — "Data retention: 10 years" | ✅ terverifikasi |
| Ukuran modul RAM kelipatan dua karena alamat sel ditulis biner | [Micron 24Gb DDR5 Die Rev C](https://www.farnell.com/datasheets/4594004.pdf) Table 2 *Addressing*: alamat baris R0–R16, kolom C0–C10, 8 grup × 4 bank — semuanya rentang bit, jadi jumlah sel selalu 2ⁿ | ✅ terverifikasi |
| Pengecualian: die 24 Gb melahirkan modul 24 GB dan 48 GB — kelipatan dua bukan hukum mutlak | [Micron 24Gb DDR5 Die Rev C](https://www.farnell.com/datasheets/4594004.pdf) Table 2 catatan 1: "For non-binary densities, a quarter of the row address space is invalid"; [Micron 288-Pin DDR5 UDIMM Core, ddr5_udimm_core.pdf Rev. E 10/21](https://gzhls.at/blob/ldb/f/a/8/7/01a8d2e592a701b7b7658543a3bc564a3c76.pdf) — densitas didukung 16Gb, 24Gb, 32Gb, 64Gb | ✅ terverifikasi |
| RAM desktop modul panjang, laptop modul lebih pendek | UDIMM **133,35 mm × 31,25 mm, 288 pin** ([DDR5 UDIMM Core Rev. E 10/21](https://gzhls.at/blob/ldb/f/a/8/7/01a8d2e592a701b7b7658543a3bc564a3c76.pdf) Table 1) vs SODIMM **69,6 mm × 30 mm, 262 pin** ([Micron 262-Pin DDR5 SODIMM Core, ddr5_sodimm_core.pdf Rev. F 05/23](https://www.farnell.com/datasheets/4530576.pdf) Table 1) | ✅ terverifikasi |
| RAM ponsel dipatri, tidak bisa dilepas | [Micron LPDDR5 MT62F512M64D4 / MT62F1G64D8](https://www.farnell.com/datasheets/3761269.pdf) — kemasan "441-ball TFBGA (14.0mm x 14.0mm)", bola solder, bukan modul bertepi emas | ✅ terverifikasi |
| Kartu grafis punya memori sendiri | [NVIDIA GeForce RTX 5060 Family](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5060-family/) — "8 GB GDDR7", antarmuka 128-bit, di kartunya sendiri | ✅ terverifikasi |
| Takik modul digeser tiap generasi, jadi batang baru tidak masuk slot lama | DDR4 UDIMM: 288 pin, gambar mekanis **MO-309** ([Micron 8GB DDR4 UDIMM, atf4c1gx64az.pdf Rev. E 08/2020](https://www.farnell.com/datasheets/3151235.pdf) Figure 1). DDR5 UDIMM: **juga** 288 pin dan **juga** 133,35 mm, tapi takiknya di 62,9/57,8 TYP dengan catatan "(Area above notch)" ([DDR5 UDIMM Core Rev. E 10/21](https://gzhls.at/blob/ldb/f/a/8/7/01a8d2e592a701b7b7658543a3bc564a3c76.pdf) Figure 2), dan modulnya berdiri di standar terpisah [JEDEC JESD308](https://www.jedec.org/standards-documents/docs/jesd308b) — panjang dan jumlah pin sama, jadi **takik itulah satu-satunya penjaga mekanisnya** | ✅ terverifikasi |

> **GERBANG SUDAH DILEWATI — 2026-08-14.** Seluruh baris di atas ditopang sumber
> primer (datasheet vendor, standar JEDEC, spesifikasi produk) atau diukur
> sendiri di mesin ini. Angka yang berubah karena pemeriksaan ini dicatat di
> § Perubahan setelah verifikasi di bawah.
>
> **Berkas VO & direction yang ditulis sebelum tanggal ini masih menyebut
> "baris ⚠ belum ditutup"** sebagai alasan tidak memasang angka di layar —
> `03-bolak-balik`, `05-kenapa-cepat`, `06-ram-size`, `07-ram-bentuk`,
> `08-ram-generasi`, `09-beda-penyimpanan`. **Keputusannya tetap berlaku**, cuma
> alasannya berubah: angka latensi tidak dipasang karena scene-scene itu berdiri
> di L1–L2 dan angka nanodetik tidak bisa dibayangkan siapa pun
> ([docs/09](../../docs/09-tangga-abstraksi.md)) — bukan lagi karena sumbernya
> belum ada. Jangan menambahkan angka ke scene itu hanya karena gerbangnya sudah
> lewat.
>
> **Yang JEDEC-nya tidak diunduh:** JESD79-4/79-5 dan JESD21-C berbayar/berdaftar.
> Yang dipakai sebagai gantinya adalah datasheet vendor yang menyatakan dirinya
> "JEDEC JESD-79.5 compliant" dan mencantumkan angkanya — dokumen yang bisa dibuka
> penonton tanpa akun, dan itu justru lebih baik untuk baris 🔗 Sumber di deskripsi.

## Perubahan setelah verifikasi

| Yang berubah | Dari | Jadi | Kenapa |
|---|---|---|---|
| T01-S1 scene `06-gudang` & `08-sekali-jalan` | "sekitar **dua** bulan" | "sekitar **tiga** bulan" | Sumbernya memberi 12,66 ms sekali ambil acak → 3,4 bulan di skala Short ini. "Dua bulan" perlu hardisk ± 7,4 ms, dan angka itu tidak ada di manual mana pun — ia hanya muncul kalau seek-nya dibuang. Kalender di scene itu jadi tiga lembar. |
| Baris latensi | "± 50–100 ns · ± 1–15 ns" (dibulatkan kasar) | angka terukur di mesin ini | Pengukurannya gratis dan bisa diulang siapa pun lewat `tools/ukur-latensi.mjs`. |
| Refresh DRAM | "ribuan kali per detik" | ± 256 ribu kali per detik | Datasheet menyebut 8.192 perintah per 32 ms. Angka ini **tidak masuk VO** — ia cuma penjaga kalau ada yang bertanya di kolom komentar. |
| Durasi video panjang | ditahan karena 3 mnt 19 dtk < batas keras 6 mnt | dirilis apa adanya | Batas keras itu dicabut di [docs/02](../../docs/02-format-video.md) pada 2026-08-14: panjang video mengikuti materinya. Tabel flow bagian 6–7 ikut dirapikan — sub-topik yang tidak jadi dibuat (mejanya bertingkat, cache, saat meja penuh) **dicoret**, bukan ditinggal sebagai janji yang tidak ditepati. Cache tetap hidup sebagai pinned comment & umpan episode berikutnya. |

## Kamus pengucapan

Tabel ini **dikompilasi jadi kamus ElevenLabs** — `kamus:` di frontmatter
menyimpan `id` dan `version`-nya. Arahnya kiri ke kanan: naskah menulis ejaan
normal, alias yang dikirim ke TTS. Hanya ElevenLabs yang melihat kolom kanan;
subtitel penonton dan `npm run sisa` membaca kolom kiri.

| Tulis di VO | Alias ke TTS | Kenapa |
|---|---|---|
| cache | kesh | TTS cenderung membaca "kaks" |
| SSD | S S D | dieja per huruf |
| DDR4 | D D R empat | dieja per huruf, angkanya jadi kata |
| DDR5 | D D R lima | sama |
| hard disk | hardisk | lafal Indonesia; "hard disk" dibaca janggal |
| RAM | ram | supaya dibaca sebagai kata, bukan dieja |

**Blok `## VO` T01 belum memakai ejaan kolom kiri.** Naskahnya beku dan VO-nya
sudah dibayar, jadi teksnya masih `S S D` dan `D D R empat` seperti saat
digenerate. Kamusnya inert terhadap teks itu — `SSD` tidak cocok dengan `S S D`
karena `word_boundaries` dan `case_sensitive` keduanya `true` — dan baru aktif
saat T01 digenerate ulang. Membersihkan teksnya sekarang tanpa generate ulang
justru memisahkan naskah dari audio yang sudah ada.

## Pilihan kata

Bukan pengucapan, melainkan keputusan **istilah mana yang dipakai** — dan
sengaja **tidak** masuk kamus. Kalau `CPU → prosesor` jadi aturan alias,
ElevenLabs akan menutupi pelanggaran kosakata L1 alih-alih membiarkannya
ketahuan, dan naskah yang salah lolos karena terdengar benar.

| Dipakai | Bukan | Kenapa |
|---|---|---|
| prosesor | CPU | akronim dilarang di L1 ([docs/09](../../docs/09-tangga-abstraksi.md)) |
| — | SO-DIMM | hanya di layar, tidak pernah masuk VO |

---

## Video panjang — T01-L

### Scene standar (tanpa VO)

| Scene | Isi | Posisi | Durasi |
|---|---|---|---|
| `opening` | kartu judul — **"RAM" / "Random Access Memory"** | bagian 2, setelah `hook-question` | **4,0 dtk** |
| `closing` | tanda tangan brand, tanpa judul | setelah scene 083 | **5,0 dtk** |

Judulnya diatur di `Episode.tsx` (`JUDUL` + `SUBJUDUL`).

> **UTANG NASKAH — sudah lunas (2026-08-14).** Dulu scene `019` dan `020`
> mengulang nama yang sudah dipampang kartu judul satu menit sebelumnya, dan
> `020` bahkan bilang "namanya tidak penting" tentang nama yang jadi judul.
> Keduanya hilang saat scene ditulis ulang: penamaannya sekarang jatuh satu kali
> saja, sebagai penegasan di akhir [`04-ram-analogy`](scenes/04-ram-analogy-vo.md)
> — "Ya, meja kerja itu ram." — persis setelah bendanya dipakai
> (HARD RULE 6). Tidak ada scene yang mengeja kepanjangannya lewat VO.
> Lihat [docs/10](../../docs/10-scene-standar.md#isi-pembuka).

Keduanya **tidak ditulis di episode ini**. `tools/bangun-timing.mjs`
menyisipkannya otomatis ke `timing.gen.ts` — `opening` setelah baris terakhir
bagian 1, `closing` di paling akhir — dan `Episode.tsx` memasang `<BrandSting/>`
serta `<EndCard/>` dari `shared/StandarScenes.tsx` (docs/10). Durasinya dari
`.env` (`OPENING_SECONDS`, `CLOSING_LONG_SECONDS`).

`hook-question` adalah scene biasa milik episode ini: satu berkas di `scenes/`,
menggabungkan tiga shot yang dulu jadi scene 001–003.

### Scene

**Daftar isi episode, bukan tempat kalimatnya hidup.** Teks VO tiap scene ada di
`scenes/<kunci>-vo.md` dan apa yang terjadi di layar di
`scenes/<kunci>-direction.md` (HARD RULE 3 & 4). Yang ditetapkan tabel ini cuma
tiga: **ada scene apa saja, urutannya, dan di bagian flow mana** — dan itulah yang
dibaca `tools/baca-episode.mjs` untuk menghitung nomor urut tiap berkas.

| # | Bagian | Ringkas |
|---|---|---|
| hook-question | 1 question | Aplikasi dibuka; tiga tebakan tempat datanya berada, ketiganya dicoret. Meninggalkan lubang, bukan jawaban. |
| bolak-balik | 3 problem | Gudang penuh berkas, prosesor di seberangnya, dan tidak ada apa pun di antara keduanya. Tiap berkas dijemput ulang tiap kali dipakai, dan prosesor menunggu selama itu. |
| ram-analogy | 4 answer | Meja kerja mengisi ruang kosong itu. Berkas disalin sekali ke sana, aslinya tetap di gudang — dan meja itu dinamai RAM. |
| kenapa-cepat | 5 why | Kenapa lewat meja jauh lebih cepat: di gudang berkasnya masih harus dicari laci demi laci, di meja semuanya terhampar dan yang mana pun sama-sama tinggal diraih — lalu perjalanan jauh yang cuma sekali itu terbayar berkali-kali. |
| ram-size | 6 explaining | Kenapa ukurannya selalu kelipatan dua: tiap kotak bernomor biner, tambah satu digit berarti dua kali lipat. |
| ram-bentuk | 6 explaining | Meja yang sama, wujud yang beda-beda: batang panjang di desktop, batang pendek di laptop, chip dipatri di ponsel, dan meja sendiri di kartu grafis. |
| ram-generasi | 6 explaining | Angka di kotaknya — D D R tiga, empat, lima. Takiknya digeser tiap generasi, jadi batangnya tidak bisa saling tukar. |
| beda-penyimpanan | 6 explaining | Benda satunya lagi di komputer yang sama — hardisk atau S S D. Batangnya meja, yang ini gudangnya: muat jauh lebih banyak tapi isinya harus dijemput, dan begitu listrik dicabut meja langsung kosong sementara gudang tidak berubah. |
| ram-tugas | 7 case | Mundur ke panggung utuh: apa yang dikerjakan meja, dan apa yang bukan tugasnya. Bukan yang mengerjakan, bukan tempat menyimpan, dan lebih lebar bukan berarti lebih cepat — ditutup kalimat bawa-pulang. |

### Timing — estimasi

Keluaran `node --env-file=.env tools/estimate-timing.mjs apa-itu-ram`. Opening
(4,0 dtk) dan closing (5,0 dtk) sudah ikut terhitung di sana, jadi tidak ada
angka yang ditambahkan manual.

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 1 — T01-S1 · “Nugget”

**Insight:** skala jarak/waktu antar tingkat memori, dibuat manusiawi.
**Target:** 40–60 dtk · ~110 kata · L1
**Berkas:** `scene-shorts/s1-nugget/` — id komposisi `s1-01-…`, Short utuh `T01-apa-itu-ram-s1`.

Berdiri sendiri: penonton yang tidak pernah membuka video panjangnya tetap
pulang membawa satu hal utuh — jarak itu yang jadi alasan komputer menyalin,
bukan kecepatan bendanya. Tidak ada satu kalimat pun yang menuntut penonton
sudah menonton yang lain.

> **Angkanya belum boleh dibaca ElevenLabs.** Rasio “satu detik : satu menit :
> tiga bulan” persis baris ⚠ di § Sumber, dan gerbang di sana berlaku untuk Short
> ini juga. Komposisinya boleh dibangun sekarang (bisu, timing perkiraan);
> `naskah_beku` tetap kosong sampai baris itu ditopang sumber primer atau diukur
> sendiri.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| menunggu | hook | Prosesor berdenyut lalu berhenti; hitungan diam berjalan. Klaimnya jatuh di frame pertama, tanpa pengantar. |
| sekejap | hook | Angka aslinya terlalu kecil untuk dibayangkan — sepersemiliar detik lewat begitu saja di layar. |
| satu-detik | ketegangan | Undangan: anggap satu langkah prosesor itu satu detik penuh. Jam besar berdetak sekali. |
| meja-nempel | payoff | Tempat terdekat, menempel di prosesor: satu detik. Jarum jam bergerak satu strip. |
| meja-kerja | payoff | Meja kerja di sebelahnya: sekitar satu menit. Jarum berputar sekali penuh. |
| gudang | payoff | Lemari di gudang: sekitar tiga bulan. Kalender membalik lembar demi lembar. |
| namanya | payoff | Ketiga tempat itu baru dinamai: cache, ram, hardisk — nama menyusul gambarannya. |
| sekali-jalan | tutup | Karena itu isinya disalin dulu ke meja: perjalanan tiga bulan dibayar sekali, dipakai ribuan kali. |
| loop | tutup | Kembali ke prosesor yang menunggu — kalimat penutup menyambung ke frame pertama supaya loop-nya mulus. |

### Timing — estimasi

Keluaran `npm run gen`. Closing (2,0 dtk) sudah ikut terhitung; Shorts tidak
punya opening (docs/02 § Aturan Shorts).

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

## Short 2 — T01-S2 · “Jebakan”

**Mitos:** "RAM lebih besar pasti bikin komputer lebih cepat."
**Target:** 40–60 dtk · ~110 kata · L1
**Berkas:** `scene-shorts/s2-jebakan/` — id komposisi `s2-01-…`, Short utuh `T01-apa-itu-ram-s2`.

Insightnya **berbeda dari Short 1** dan tidak bisa saling menggantikan: S1 soal
*jarak* (kenapa disalin), S2 soal *kapasitas* (kenapa menambah tidak selalu
membantu). Keduanya memakai meja yang sama sebagai gambar, tapi menjawab
pertanyaan yang berbeda.

> **Tanpa angka sama sekali.** Semua klaim di sini kualitatif — “muat” dan
> “penuh”, bukan persentase atau benchmark. Itu bukan penghematan, itu yang
> membuat Short ini tidak ikut tertahan gerbang ⚠ di § Sumber.

### Scene

| # | Bagian | Ringkas |
|---|---|---|
| mitos | mitos | Kalimatnya ditulis besar di layar apa adanya, dibaca datar tanpa dibantah dulu. |
| salah | bantahan | Dicoret. "Sebagian besar waktu, itu tidak benar." |
| meja | bantahan | Gambarannya berdiri: meja kerja, berkas yang sedang dibuka terhampar di atasnya. |
| muat | bukti | Selama semua yang dibuka masih muat, mejanya tidak pernah jadi penghambat. |
| lebih-lebar | bukti | Meja dua kali lebih lebar, tangan yang sama: sisi kanan kosong melompong. |
| penuh | bukti | Meja yang benar-benar penuh — berkas baru tidak punya tempat lagi. |
| bolak-balik | bukti | Berkas lama dikembalikan ke gudang untuk memberi tempat, lalu dijemput lagi. Itu yang terasa lambat. |
| indikator | konsekuensi | Yang harus dilihat bukan angka terpakai, melainkan apakah bolak-baliknya terjadi. |
| beli | konsekuensi | Nambah ram membantu kalau mejanya memang penuh, dan tidak memberi apa-apa kalau tidak. CTA halus ke video panjang. |

### Timing — estimasi

Keluaran `npm run gen`.

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Metadata publish

**Pindah ke [`render/publish.md`](render/publish.md).** Judul, deskripsi,
chapter, tag, playlist, brief thumbnail, dan jadwal rilis — untuk video panjang
dan kedua Short — hidup di sana, satu berkas yang dibuka di sebelah halaman
unggah YouTube. Aturannya: [docs/06](../../docs/06-publishing.md).

Yang tetap di sini cuma bahan mentahnya: daftar scene di atas, dan
[§ Sumber](#sumber) yang gerbangnya masih menahan blok 🔗 Sumber di berkas itu.
