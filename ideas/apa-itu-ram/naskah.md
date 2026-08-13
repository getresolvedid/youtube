---
kode: T01
slug: apa-itu-ram
judul_kerja: Di mana data aplikasi saat aplikasi dibuka?
pilar: P1 · Cara Kerja Sehari-hari
lapis: umum
what: RAM
status: naskah
naskah_beku:            # BELUM — lihat "Sumber", masih ada angka tanpa sumber primer
karakter_terpakai:
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
| 5 | **[why]** | Jarak + pengulangan: satu perjalanan mahal terbayar ribuan kali |
| 6 | **[explaining]** | RAM lupa · mejanya bertingkat · kenapa tidak semua secepat cache · saat meja penuh |
| 7 | **[case]** | Mesin nyata, ponsel, server, kapan nambah RAM berguna |

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
| penyimpanan | "Lemari arsip raksasa di gudang lantai bawah." | 007 |
| RAM | "Meja kerja komputer." | 019 |
| cache | "Meja kecil yang menempel langsung di prosesor." | 047 |
| swap / berkas halaman | "Memindahkan berkas dari meja kembali ke gudang." | 083 |

## Sumber

| Klaim / angka | Sumber | Status |
|---|---|---|
| Spesifikasi mesin: Intel Core i7-11700F, 8 inti, L2 4 MB, L3 16 MB, RAM 32 GB DDR4-2667, SSD NVMe | `Win32_Processor` + `Win32_PhysicalMemory` + `Get-PhysicalDisk` di mesin ini, 2026-08-13 | ✅ terverifikasi |
| Prosesor mengerjakan miliaran perintah per detik | frekuensi 2,5 GHz dari spesifikasi di atas | ✅ terverifikasi |
| RAM ± 50–100 ns · cache ± 1–15 ns · SSD ± puluhan µs · HDD ± milidetik | — | ⚠ **BELUM** |
| Rasio "cache 1 detik : RAM ± 1 menit : HDD ± 2 bulan" | turunan dari angka di atas | ⚠ **BELUM** |
| DRAM disegarkan ribuan kali per detik | — | ⚠ **BELUM** (perlu JEDEC) |

> **GERBANG BELUM BOLEH DILEWATI.** Tiga baris ⚠ harus ditopang sumber primer
> **atau** diukur sendiri (`tools/ukur-latensi.mjs`) sebelum `naskah_beku` diisi
> dan VO dibuat. Angka yang sekarang tertulis adalah **placeholder** yang sengaja
> dibulatkan kasar.

## Kamus pengucapan

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| kesh | cache | TTS cenderung membaca "kaks" |
| S S D | SSD | dieja per huruf |
| ram | RAM | dibaca sebagai kata, aman |
| prosesor | CPU | sengaja tidak memakai "CPU" |

---

## Video panjang — T01-L

### Scene standar (tanpa VO)

| Scene | Isi | Posisi | Durasi |
|---|---|---|---|
| `opening` | kartu judul — **"RAM" / "Random Access Memory"** | bagian 2, setelah `hook-question` | **2,5 dtk** |
| `closing` | tanda tangan brand, tanpa judul | setelah scene 083 | **5,0 dtk** |

Judulnya diatur di `Episode.tsx` (`JUDUL` + `SUBJUDUL`).

> **UTANG NASKAH — belum diselesaikan.** Kartu judul tayang di detik ~10 dan
> sudah menulis "RAM" beserta kepanjangannya. Akibatnya dua scene ini mengulang
> sesuatu yang penonton baca satu menit sebelumnya:
>
> | Scene | Detik | VO sekarang |
> |---|---|---|
> | `019` | ~68 | "Tempat kerja itu namanya ram." |
> | `020` | ~72 | "Kepanjangannya random access memory. Tapi namanya tidak penting." |
>
> s020 paling parah: ia bilang "namanya tidak penting" tentang nama yang
> dipampang sebagai judul. Keduanya perlu ditulis ulang sebelum naskah dibekukan
> — kemungkinan s019 jadi penegasan ("Ya, itu RAM") dan s020 dibuang atau
> diganti isi lain. Lihat [docs/10](../../docs/10-scene-standar.md#isi-pembuka).

Keduanya **tidak ditulis di episode ini**. `tools/bangun-timing.mjs`
menyisipkannya otomatis ke `timing.gen.ts` — `opening` setelah baris terakhir
bagian 1, `closing` di paling akhir — dan `Episode.tsx` memasang `<BrandSting/>`
serta `<EndCard/>` dari `shared/StandarScenes.tsx` (docs/10). Durasinya dari
`.env` (`OPENING_SECONDS`, `CLOSING_LONG_SECONDS`).

`hook-question` adalah scene biasa milik episode ini: satu berkas di `scenes/`,
menggabungkan tiga shot yang dulu jadi scene 001–003.

### Scene

| # | Bagian | VO | Visual | Motion | Aset |
|---|---|---|---|---|---|
| hook-question | 1 question | Kamu buka sebuah aplikasi. Di mana datanya saat itu? Kelihatannya sepele. Tapi di mana persisnya ia ditaruh, dan di mana diproses? | Satu scene tiga tahap: ikon aplikasi + pertanyaan besar di tengah → pertanyaan naik & mengecil, "Kelihatannya sepele." muncul → dua kartu masuk dari sisi berlawanan: lemari arsip "ditaruh", keping prosesor "diproses". Pertanyaan tidak pernah hilang dari layar. Dua kartu itu adalah dua tempat yang jadi isi seluruh episode — di sini belum dijawab, cuma dinamai. | Tahap 1 ikon pop `back.out(2.0)`, pertanyaan fade + naik `expo.out`. Tahap 2 seluruh grup `scale 1→0.62` + naik 170px, `power3.out`; kicker fade. Tahap 3 tiap kartu masuk dari luar layar `expo.out` dan mendarat **tepat saat katanya diucapkan** — 6,55 dtk "ditaruh", 7,95 dtk "diproses" — bukan sebagai pasangan ber-stagger pendek. Aktivitas tengah-scene: ikon `y ±5px` `sine.inOut`. | **ditulis tangan** — `scenes/hook-question.tsx` |
| 004 | 3 problem | Semua yang kamu punya tersimpan di satu tempat. Foto, dokumen, aplikasi, sistemnya sendiri. | Ikon penyimpanan besar, empat label mengelilinginya. | Label masuk mengelilingi ikon, stagger 0.12 dtk. | — |
| 005 | 3 problem | Namanya penyimpanan. Hard disk, atau S S D di komputer yang lebih baru. | Label besar "PENYIMPANAN" + ikon disk. | Label slide dari bawah; ikon berdenyut sekali. | — |
| 006 | 3 problem | Kapasitasnya luas. Ratusan gigabita, sering jauh lebih. | Angka kapasitas membesar. | Counter naik ke 512, power2.out. | — |
| 007 | 3 problem | Bayangkan lemari arsip raksasa, di gudang, di lantai bawah. | Ilustrasi lemari tinggi, jauh di sisi kanan layar. | Lemari digambar stroke draw 1 dtk. | — |
| 008 | 3 problem | Muat semuanya. Tapi setiap kali butuh satu berkas, kamu harus turun ke sana. | Garis panjang dari meja ke gudang. | Titik berjalan menyusuri garis, 1.2 dtk linear. | — |
| 009 | 3 problem | Sekarang bandingkan dengan kecepatan prosesornya. | Ikon prosesor muncul di kiri. | Ikon pop, back.out(1.6). | — |
| 010 | 3 problem | Prosesor mengerjakan miliaran perintah setiap detik. | Angka besar: miliaran per detik. | Counter naik sangat cepat lalu berhenti. | — |
| 011 | 3 problem | Kalau ia menunggu setiap data datang dari gudang, ia lebih banyak menunggu daripada bekerja. | Bar waktu: potongan kecil "bekerja", sisanya "menunggu". | Bar tumbuh dari kiri; bagian menunggu jauh lebih panjang. | — |
| 012 | 3 problem | Seberapa timpang? Bagi prosesor, menunggu satu berkas dari hard disk itu seperti menunggu berminggu-minggu. | Skala waktu prosesor vs skala waktu gudang. | Dua sumbu waktu dengan panjang sangat berbeda. | — |
| 013 | 3 problem | Selama menunggu itu, ia sebenarnya bisa menyelesaikan jutaan pekerjaan lain. | Pekerjaan menumpuk tak tergarap di samping prosesor. | Kotak pekerjaan bertumpuk cepat, stagger 0.05 dtk. | — |
| 014 | 3 problem | Inilah masalahnya. Tempat yang muat banyak, selalu lambat. | Dua kartu: "muat banyak" dan "lambat". | Dua kartu masuk dari sisi berlawanan. | — |
| 015 | 3 problem | Dan tempat yang cepat, tidak pernah muat banyak. | Kartu ketiga muncul: "cepat, tapi kecil". | Kartu ketiga pop di tengah. | — |
| 016 | 4 answer | Jadi jawabannya bukan membaca langsung dari gudang. | Garis panjang ke gudang dicoret. | Coret SVG tergambar 0.4 dtk. | — |
| 017 | 4 answer | Begitu aplikasi dibuka, data yang dibutuhkan disalin lebih dulu. | Berkas melayang dari gudang ke meja. | Berkas menyusuri path lengkung 0.9 dtk. | — |
| 018 | 4 answer | Disalin ke tempat kerja yang jauh lebih dekat, dan jauh lebih cepat. | Meja tersorot di kiri, dekat prosesor. | Sorotan indigo menyebar dari meja. | — |
| 019 | 4 answer | Tempat kerja itu namanya ram. | Judul besar "RAM" + ikon keping RAM. | Ikon pop; huruf masuk stagger 0.06 dtk. | — |
| 020 | 4 answer | Kepanjangannya random access memory. Tapi namanya tidak penting. | Kepanjangan muncul kecil lalu memudar. | Fade in lalu fade turun ke separuh. | — |
| 021 | 4 answer | Yang penting fungsinya. Ram adalah meja kerja komputer. | Ikon meja besar + label RAM. | Ikon meja masuk dari bawah, y 40→0. | — |
| 022 | 4 answer | Gudang untuk menyimpan. Meja untuk mengerjakan. | Dua kartu berdampingan: gudang vs meja. | Dua kartu masuk bergantian, stagger 0.22 dtk. | — |
| 023 | 5 why | Tapi kenapa memindahkan data ke meja benar-benar menyelesaikan masalahnya? | Pertanyaan di tengah layar. | Teks masuk stagger per kata 0.07 dtk. | — |
| 024 | 5 why | Alasan pertama: jarak. | Ikon penggaris besar. | Ikon pop; garis ukur memanjang. | — |
| 025 | 5 why | Ram duduk jauh lebih dekat ke prosesor daripada gudang. | Sumbu jarak: prosesor, RAM dekat, gudang jauh. | Sumbu tergambar; titik muncul stagger 0.18 dtk. | — |
| 026 | 5 why | Makin pendek jaraknya, makin cepat datanya sampai. | Dua garis: pendek menyala cepat, panjang menyala lambat. | Dua garis menyala dengan durasi berbeda. | — |
| 027 | 5 why | Kalau mengambil dari ram terasa satu menit, mengambil dari hard disk terasa dua bulan. | Sumbu waktu manusiawi: 1 menit dan 2 bulan. | Counter naik; label kanan jauh di ujung. | — |
| 028 | 5 why | Alasan kedua, dan ini yang justru lebih menentukan. | Layar bersih, ikon pengulangan. | Ikon pop di tengah. | — |
| 029 | 5 why | Program tidak membaca datanya secara acak. | Grid data, semua sel gelap. | Grid muncul stagger cepat dari kiri atas. | — |
| 030 | 5 why | Ia memakai bagian yang sama, berulang-ulang. | Beberapa sel yang sama menyala berkali-kali. | Sel panas berdenyut tiga kali, sisanya diam. | — |
| 031 | 5 why | Jadi sekali data disalin ke meja, ia bisa dipakai ribuan kali tanpa turun ke gudang lagi. | Satu berkas di meja, dipakai berulang. | Denyut akses beruntun, stagger 0.15 dtk. | — |
| 032 | 5 why | Satu perjalanan yang mahal, terbayar ribuan kali. | Neraca: satu perjalanan vs ribuan pemakaian. | Bar kanan tumbuh jauh melebihi bar kiri. | — |
| 033 | 5 why | Tapi kecepatan itu ada harganya, dan harganya yang membuat meja tidak bisa dibuat sebesar gudang. | Dua ikon: penggaris dan koin, di bawah label meja. | Dua ikon masuk bergantian. | — |
| 034 | 5 why | Meja selalu jauh lebih kecil, jauh lebih mahal, dan isinya tidak bertahan. | Tiga kartu kecil: kecil, mahal, tidak bertahan. | Tiga kartu masuk stagger 0.16 dtk. | — |
| 035 | 5 why | Dan itu menjawab hal yang tadi kamu lihat di awal. | Callback: dua kartu buka ke-1 dan ke-2. | Dua kartu masuk kembali, lebih cepat. | — |
| 036 | 5 why | Buka pertama terasa lambat karena datanya masih diambil dari gudang. | Kartu kiri tersorot, jalur ke gudang menyala. | Jalur menyala dari gudang ke meja. | — |
| 037 | 5 why | Buka kedua langsung muncul karena datanya masih tergeletak di meja. | Kartu kanan tersorot, jalur gudang padam. | Jalur meredup; berkas berdenyut hijau. | — |
| 038 | 6 explaining | Sekarang kita bedah mejanya. Ada tiga hal yang jarang diceritakan. | Judul bagian + angka tiga. | Angka pop lalu mengecil ke sudut. | — |
| 039 | 6 explaining | Yang pertama, dan ini paling aneh. Ram sebenarnya tidak bisa mengingat. | Ikon tetesan. | Ikon pop; tetesan turun. | — |
| 040 | 6 explaining | Ingatannya disimpan di wadah-wadah kecil yang bocor pelan-pelan. | Deretan wadah kecil, isinya menetes keluar. | Tetesan berulang tiga siklus, sine.inOut. | — |
| 041 | 6 explaining | Supaya tidak hilang, isinya harus ditulis ulang terus-menerus. | Wadah diisi ulang berkali-kali. | Isi naik-turun cepat, repeat terbatas. | — |
| 042 | 6 explaining | Ribuan kali setiap detik, selama komputermu menyala. | Angka besar per detik. | Counter naik cepat lalu berdenyut. | — |
| 043 | 6 explaining | Berhenti sebentar saja, isinya hilang seluruhnya. | Wadah berhenti diisi, cahaya habis. | Cahaya meredup ke nol, 1.2 dtk power2.in. | — |
| 044 | 6 explaining | Itu sebabnya pekerjaan yang belum disimpan hilang saat listrik mati. | Ikon petir, layar gelap sesaat. | Kedip gelap sekali, lalu teks masuk. | — |
| 045 | 6 explaining | Gudang tidak begitu. Isinya tetap ada walaupun listriknya dicabut. | Ikon lemari tetap terang di layar gelap. | Latar meredup, ikon tetap terang. | — |
| 046 | 6 explaining | Hal kedua: mejanya ternyata bukan cuma satu. | Meja tunggal pecah jadi beberapa tingkat. | Meja terbelah, stagger 0.15 dtk. | — |
| 047 | 6 explaining | Ada meja yang jauh lebih kecil, menempel langsung di keping prosesor. | Ikon prosesor, area kecil tersorot di dalamnya. | Zoom ke keping; area berdenyut. | — |
| 048 | 6 explaining | Namanya kesh. | Label besar "CACHE". | Label pop, back.out(2). | — |
| 049 | 6 explaining | Ukurannya cuma beberapa megabita. Ram bisa puluhan gigabita. | Dua batang perbandingan sangat timpang. | Batang kanan tumbuh melewati kiri. | — |
| 050 | 6 explaining | Tapi kesh jauh lebih cepat, karena jaraknya nyaris nol. | Jarak nol digambar di sebelah prosesor. | Garis jarak menyusut ke nol. | — |
| 051 | 6 explaining | Jadi susunannya bertingkat. Kesh, ram, S S D, lalu hard disk. | Piramida empat tingkat. | Tingkat muncul dari puncak ke dasar, stagger 0.13 dtk. | — |
| 052 | 6 explaining | Makin dekat ke prosesor: makin cepat, makin kecil, dan makin mahal. | Tiga label di sisi piramida. | Label masuk berurutan dari atas. | — |
| 053 | 6 explaining | Lalu kenapa tidak semuanya dibuat secepat kesh? | Pertanyaan di tengah. | Teks masuk stagger per kata. | — |
| 054 | 6 explaining | Karena kecepatan dibayar dua hal. Ruang, dan uang. | Dua kartu: penggaris dan koin. | Dua kartu masuk dari sisi berlawanan. | — |
| 055 | 6 explaining | Kesh harus muat di dalam keping prosesor, dan ruang di sana sangat sempit. | Area cache melebar, mendesak blok lain. | Blok lain terdorong keluar bingkai. | — |
| 056 | 6 explaining | Per gigabita, harganya berkali lipat dibanding ram biasa. | Dua batang harga sangat timpang. | Batang tumbuh dari bawah, stagger 0.15 dtk. | — |
| 057 | 6 explaining | Jadi komputer tidak memilih salah satu. Ia memakai semuanya sekaligus. | Empat tingkat menyala bersamaan. | Empat kotak menyala berurutan cepat. | — |
| 058 | 6 explaining | Hal ketiga: apa yang terjadi kalau mejanya penuh? | Meja penuh sesak oleh berkas. | Berkas bertambah sampai bertumpuk. | — |
| 059 | 6 explaining | Sistem memilih berkas yang paling jarang kamu sentuh. | Satu berkas ditandai di tumpukan. | Berkas tersorot, glow kuning. | — |
| 060 | 6 explaining | Lalu memindahkannya kembali ke gudang, supaya meja punya ruang lagi. | Berkas melayang dari meja ke gudang. | Path lengkung ke gudang, 0.9 dtk. | — |
| 061 | 6 explaining | Kedengarannya pintar. Sampai berkas itu dibutuhkan lagi. | Berkas di gudang berdenyut merah. | Denyut merah dua kali. | — |
| 062 | 6 explaining | Karena mengambilnya balik berarti menempuh perjalanan yang tadi kita bilang dua bulan. | Jalur ke gudang menyala merah, label dua bulan. | Jalur menyala; label pop. | — |
| 063 | 6 explaining | Dan selama itu, semuanya berhenti menunggu. | Ikon jeda besar, layar membeku. | Elemen berhenti; ikon pop. | — |
| 064 | 6 explaining | Itulah yang kamu rasakan saat komputer tiba-tiba tersendat parah. | Grafik responsivitas terjun bebas. | Garis grafik jatuh tajam, power4.in. | — |
| 065 | 7 case | Sekarang, di mana ini benar-benar terlihat? | Judul bagian. | Teks masuk stagger per kata. | — |
| 066 | 7 case | Ini komputer yang dipakai membuat video ini. | Kartu spesifikasi mulai terbentuk. | Kartu masuk dari bawah, y 40→0. | — |
| 067 | 7 case | Keshnya sekitar dua puluh megabita. Ramnya tiga puluh dua gigabita. | Dua baris spesifikasi dengan angka. | Counter naik ke masing-masing nilai. | — |
| 068 | 7 case | Ramnya sekitar seribu enam ratus kali lebih besar daripada keshnya. | Bar perbandingan sangat panjang. | Bar memanjang keluar layar. | — |
| 069 | 7 case | Tapi hampir semua pekerjaan tetap lewat meja kecil yang jauh lebih sempit itu. | Bar kecil tersorot, bar besar meredup. | Sorotan berpindah ke bar kecil. | — |
| 070 | 7 case | Di ponsel, hal yang sama terjadi setiap hari. | Ikon aplikasi. | Ikon pop. | — |
| 071 | 7 case | Aplikasi yang baru kamu buka menempati ram. Saat ram penuh, yang lama ditutup diam-diam. | Deretan aplikasi, satu menghilang. | Satu kartu aplikasi memudar dan hilang. | — |
| 072 | 7 case | Itu sebabnya aplikasi yang kamu tinggal sebentar kadang memuat ulang dari awal. | Aplikasi memuat ulang. | Spinner muncul lalu jendela terbentuk lagi. | — |
| 073 | 7 case | Di server, pola yang sama justru dipakai dengan sengaja. | Ikon tumpukan server. | Ikon pop. | — |
| 074 | 7 case | Data yang paling sering diminta ditaruh di ram supaya tidak perlu menyentuh disk sama sekali. | Data panas berpindah ke RAM. | Berkas berpindah, glow hijau. | — |
| 075 | 7 case | Buka peramban dengan dua puluh tab, lalu aplikasi desain, lalu pemutar musik. | Tiga kelompok aplikasi memenuhi meja. | Kelompok aplikasi masuk berurutan, meja makin sesak. | — |
| 076 | 7 case | Di komputer dengan ram delapan gigabita, meja itu penuh sebelum kamu selesai. | Meja kecil penuh, tumpukan mulai muncul. | Tumpukan bertambah di sisi meja. | — |
| 077 | 7 case | Di enam belas gigabita, semuanya masih muat, dan tidak ada yang perlu dipindahkan. | Meja lebih lebar, semua muat, tanpa tumpukan. | Meja melebar; tumpukan tidak muncul. | — |
| 078 | 7 case | Lalu pertanyaan yang paling sering ditanyakan. Perlu tidak menambah ram? | Judul besar pertanyaan. | Teks masuk stagger per kata. | — |
| 079 | 7 case | Kalau mejamu memang sering penuh, tambahan ram mengubah segalanya. | Meja penuh lalu melebar, tumpukan hilang. | Meja melebar; tumpukan hilang berurutan. | — |
| 080 | 7 case | Tapi kalau pekerjaanmu masih muat, tambahan ram tidak memberi apa-apa. Nol. | Angka nol besar. | Angka pop lalu diam. | — |
| 081 | 7 case | Dan jangan menilai dari angka pemakaian ram. Ram yang kosong justru terbuang percuma. | Indikator delapan puluh persen dengan centang hijau. | Bar terisi lalu centang muncul. | — |
| 082 | 7 case | Yang harus dilihat adalah seberapa sering sistem memindahkan data kembali ke gudang. | Grafik aktivitas pemindahan. | Garis grafik tergambar dengan lonjakan. | — |
| 083 | 7 case | Di Windows namanya berkas halaman, di Linux dan Mac namanya swap. Kalau itu terus naik saat kamu bekerja, barulah menambah ram masuk akal. | Dua label sistem, lalu grafik naik dengan centang. | Dua label stagger; grafik naik; centang pop. | — |

### Timing — estimasi

Keluaran `node --env-file=.env tools/estimate-timing.mjs ideas/apa-itu-ram/naskah.md`,
lalu ditambah manual: +1,5 dtk (`opening` setelah `hook-question`) dan +5,0 dtk
(`closing` setelah scene 083).

### Timing — final *(setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 1 — T01-S1 · “Nugget”

**Insight:** skala jarak/waktu antar tingkat memori, dibuat manusiawi.
**Target:** 40–60 dtk · ~110 kata · L1

*(Ditulis setelah video panjang disetujui.)*

## Short 2 — T01-S2 · “Jebakan”

**Mitos:** "RAM lebih besar pasti bikin komputer lebih cepat."
**Target:** 40–60 dtk · ~110 kata · L1

*(Ditulis setelah video panjang disetujui.)*

---

## Metadata publish

Diisi menjelang unggah, lalu disalin ke `render/publish.md`. Lihat [docs/06](../../docs/06-publishing.md).
