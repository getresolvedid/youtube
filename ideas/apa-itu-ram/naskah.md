---
kode: T01
slug: apa-itu-ram
judul_kerja: Apa itu RAM — dan kenapa nambah RAM tidak selalu bikin cepat
pilar: P1 · Cara Kerja Sehari-hari
lapis: umum
status: naskah
naskah_beku:            # BELUM — lihat "Sumber", masih ada angka tanpa sumber primer
karakter_terpakai:
tanggal_target:
---

# T01 · Apa itu RAM

## Penjelasan 5 tahun

> RAM itu meja kerja, hard disk itu lemari arsip. Kamu tidak membaca dokumen di
> dalam lemari — kamu ambil, taruh di meja, baru kerjakan. Meja lebih besar
> berarti lebih banyak yang terbuka sekaligus tanpa bolak-balik. Kalau meja
> penuh, berkas mulai ditumpuk di lantai.

**Analogi utama:** meja kerja (RAM) vs lemari arsip (penyimpanan).

**Titik putus analogi:** meja tetap berisi saat kamu pulang; RAM kosong total
begitu listrik mati. Dan prosesor tidak mengambil langsung dari meja — ada meja
jauh lebih kecil yang menempel padanya, namanya cache. **Keduanya wajib disebut
di VO**, bukan cuma dicatat di sini (scene 021 dan 030).

## Satu kalimat bawa-pulang

> RAM bukan tempat menyimpan — RAM tempat mengerjakan. Menambahnya hanya membantu
> kalau mejamu memang sudah penuh.

## Naik tangga

| Tangga | Isi |
|---|---|
| **L1** | Meja kerja vs lemari arsip. Ambil dulu, baru kerjakan. Meja penuh = numpuk di lantai. |
| **L2** | RAM = tempat kerja sementara, hilang saat listrik mati. Penyimpanan = permanen. Di antaranya ada cache. Saat RAM penuh, sistem memindahkan sebagian ke penyimpanan (swap) — dan penyimpanan jauh lebih lambat. |
| **L3** | Hierarki cache dan alasan keberadaannya (locality). Kenapa DRAM harus disegarkan ribuan kali per detik. Kenapa "RAM terpakai 80 persen" bukan masalah, dan indikator mana yang benar-benar menandakan butuh tambah RAM. |

## Kamus istilah → L1

| Istilah | Kalimat L1 pembuka | Scene |
|---|---|---|
| RAM | "Meja kerjanya komputer." | 014 |
| penyimpanan / hard disk | "Lemari arsipnya." | 012 |
| cache | "Meja kecil yang menempel langsung di prosesor." | 030 |
| swap | "Menumpuk berkas di lantai karena meja penuh." | 034 |

## Sumber

| Klaim / angka | Sumber | Status |
|---|---|---|
| Spesifikasi mesin di video: Intel Core i7-11700F, 8 inti, L2 4 MB, L3 16 MB, RAM 32 GB DDR4-2667, SSD NVMe | `Win32_Processor` + `Win32_PhysicalMemory` + `Get-PhysicalDisk` di mesin ini, 2026-08-13 | ✅ terverifikasi |
| RAM ± 50–100 nanodetik; cache ± 1–15 nanodetik; SSD ± puluhan mikrodetik; HDD ± milidetik | — | ⚠ **BELUM** |
| Rasio "cache 1 detik : RAM ± 1 menit : HDD ± 2 bulan" | turunan dari angka di atas | ⚠ **BELUM** |
| DRAM disegarkan ribuan kali per detik | — | ⚠ **BELUM** (perlu JEDEC / datasheet) |

> **GERBANG BELUM BOLEH DILEWATI.** Tiga baris ⚠ di atas harus ditopang sumber
> primer **atau** diukur sendiri di mesin ini sebelum `naskah_beku` diisi dan VO
> dibuat. Rencana: `tools/ukur-latensi.mjs` (pointer chasing) — hasilnya disebut
> sebagai "diukur di mesin ini", lengkap dengan spesifikasinya, bukan diklaim
> sebagai angka universal. Angka yang sekarang tertulis di kolom VO adalah
> **placeholder** dan sengaja dibulatkan kasar.

## Kamus pengucapan

| Tulis di VO | Maksudnya | Catatan |
|---|---|---|
| kesh | cache | TTS cenderung membaca "kaks" |
| S S D | SSD | dieja per huruf |
| ram | RAM | dibaca sebagai kata, aman |
| prosesor | CPU | sengaja **tidak** memakai "CPU" — hindari salah eja TTS |

---

## Video panjang — T01-L

**Target:** 7–9 menit · ~1.150 kata · 50 scene + 2 scene standar

### Outline babak

| Babak | Tangga | Isi | Perkiraan |
|---|---|---|---|
| 1 Hook | L1 | Aplikasi yang sama: pertama lambat, kedua langsung muncul | 0:00–0:20 |
| 2 Kontrak | L1 | Janji + peta 3 bagian. Brand sting di sini | 0:20–0:55 |
| 3 Fondasi | L1→L2 | Meja & lemari, lalu dinamai. Titik putus analogi | 0:55–2:40 |
| 4 Mekanisme | L2 | Tingkatan sebagai jarak, skala waktu manusiawi, meja penuh, kenapa RAM lupa | 2:40–5:45 |
| 5 Realita | L3 | Mesin nyata, kapan tambah RAM berguna, indikator yang benar | 5:45–7:15 |
| 6 Rangkuman + CTA | L1 | Tiga poin + end card | 7:15–8:10 |

### Scene standar (tanpa VO — durasi ditambahkan manual)

| Scene | Posisi | Durasi | Catatan |
|---|---|---|---|
| `sc-open` | setelah scene 005 | **1,5 dtk** | brand sting, awal babak 2 |
| `sc-close` | setelah scene 050 | **5,0 dtk** | end card 16:9 |

Keduanya tidak ikut terhitung `estimate-timing.mjs` — lihat [docs/10](../../docs/10-scene-standar.md#efeknya-ke-timing).

### Scene

| # | Babak | VO | Visual | Motion | Aset |
|---|---|---|---|---|---|
| 001 | 1 Hook | Kamu buka sebuah aplikasi. Yang pertama terasa lambat. | Layar gelap, satu ikon aplikasi di tengah, spinner berputar pelan. | Spinner berputar konstan, angka detik naik pelan di bawahnya. | — |
| 002 | 1 Hook | Kamu tutup, lalu buka lagi aplikasi yang sama persis. Kali ini langsung muncul. | Ikon sama, tanpa spinner, jendela langsung terbentuk. | Jendela scale 0.94→1 + fade, back.out(1.6), 0.25 dtk. | — |
| 003 | 1 Hook | Aplikasinya tidak berubah. Komputernya juga tidak. | Dua panel berdampingan, keduanya identik, diberi centang hijau. | Dua centang muncul bergantian, stagger 0.2 dtk. | — |
| 004 | 1 Hook | Yang berubah cuma satu hal: di mana datanya berada saat itu. | Panel menyatu; muncul dua kotak berlabel jauh dan dekat. | Kotak "jauh" bergeser menjauh 200px, "dekat" mendekat, power3.inOut. | — |
| 005 | 2 Kontrak | Dan tempat itulah yang namanya ram. | Judul besar: "RAM" Mono 800, di bawahnya "tempat kerja, bukan tempat simpan". | Huruf RAM masuk stagger per karakter 0.06 dtk, y 30→0. | — |
| 006 | 2 Kontrak | Delapan menit ke depan kamu akan paham kenapa komputer butuh dua tempat penyimpanan yang berbeda. | Peta tiga kartu: Meja & lemari · Tingkatan · Kapan perlu nambah. | Tiga kartu masuk stagger 0.14 dtk, garis penghubung SVG tergambar. | — |
| 007 | 2 Kontrak | Bukan satu tempat besar. Dua, dan alasannya masuk akal. | Kartu tengah tersorot; satu kotak besar dicoret, dua kotak muncul. | Coret SVG tergambar 0.5 dtk; dua kotak fade in stagger. | — |
| 008 | 3 Fondasi | Bayangkan kamu bekerja di ruangan dengan satu meja dan satu lemari arsip. | Ilustrasi ruangan sederhana: meja di kiri, lemari tinggi di kanan. | Ruangan digambar garis demi garis, stroke draw 1.2 dtk. | — |
| 009 | 3 Fondasi | Lemari itu besar. Semua dokumen yang pernah kamu punya ada di sana. | Lemari membesar, laci-laci terisi banyak berkas. | Laci terbuka berurutan stagger 0.1 dtk, berkas muncul. | — |
| 010 | 3 Fondasi | Tapi kamu tidak pernah membaca dokumen di dalam lemari. | Tanda silang merah di depan lemari. | Silang SVG tergambar cepat 0.35 dtk, ease power4.out. | — |
| 011 | 3 Fondasi | Kamu ambil dokumennya, taruh di meja, baru kamu kerjakan. | Satu berkas melayang dari lemari ke meja. | Berkas bergerak sepanjang path lengkung 0.9 dtk, power2.inOut. | — |
| 012 | 3 Fondasi | Lemari arsip itu penyimpanan. Hard disk, atau S S D di komputermu. | Label muncul di lemari: "PENYIMPANAN". | Label slide dari kanan + garis penunjuk tergambar. | — |
| 013 | 3 Fondasi | Isinya tetap ada walaupun kamu pulang dan mematikan lampu. | Ruangan gelap, lemari tetap terlihat samar dengan isinya. | Lampu meredup 0.6 dtk; lemari tetap ber-outline. | — |
| 014 | 3 Fondasi | Mejanya, itulah ram. | Label besar di meja: "RAM". | Label pop scale 0→1 back.out(2), meja tersorot indigo. | — |
| 015 | 3 Fondasi | Kecil, tapi semua pekerjaan terjadi di sana. | Meja tersorot, beberapa berkas terbuka di atasnya. | Tiga berkas muncul stagger 0.12 dtk. | — |
| 016 | 3 Fondasi | Meja yang lebih luas berarti lebih banyak dokumen terbuka sekaligus. | Meja melebar; jumlah berkas bertambah dari tiga jadi delapan. | Meja scaleX 1→1.5 power2.out; berkas bertambah stagger cepat. | — |
| 017 | 3 Fondasi | Kamu tidak perlu bolak-balik ke lemari setiap ganti pekerjaan. | Panah bolak-balik ke lemari memudar dan hilang. | Panah fade out + strokeDashoffset mundur. | — |
| 018 | 3 Fondasi | Dan setiap perjalanan ke lemari itu, jauh lebih lama daripada yang kamu kira. | Jam kecil muncul di jalur menuju lemari. | Jarum jam berputar cepat; jalur berdenyut merah. | — |
| 019 | 3 Fondasi | Itu sebabnya membuka aplikasi pertama kali terasa lambat tadi. | Kembali ke ikon aplikasi dari hook, dengan jalur ke lemari tersorot. | Jalur menyala berurutan dari lemari ke meja. | — |
| 020 | 3 Fondasi | Yang kedua cepat karena dokumennya masih tergeletak di meja. | Berkas sudah ada di meja, jalur ke lemari padam. | Berkas berdenyut hijau sekali; jalur meredup. | — |
| 021 | 3 Fondasi | Tapi analogi meja ini punya satu bocor yang penting. | Layar menggelap, meja tetap terlihat, muncul retakan garis di analoginya. | Garis retak tergambar melintasi ilustrasi, 0.6 dtk. | — |
| 022 | 3 Fondasi | Meja sungguhan tetap berisi saat kamu pulang. Ram tidak. | Ruangan gelap total; meja kosong melompong, lemari tetap berisi. | Semua berkas di meja fade out serentak 0.4 dtk. | — |
| 023 | 3 Fondasi | Begitu listrik mati, seluruh isi ram hilang. Semuanya, tanpa sisa. | Teks besar: "LISTRIK MATI" lalu meja kosong. | Layar berkedip gelap sekali, lalu teks masuk cepat. | — |
| 024 | 4 Mekanisme | Sekarang bagian yang jarang diceritakan. Mejanya ternyata bukan cuma satu. | Meja tunggal pecah jadi beberapa meja bertingkat. | Meja terbelah jadi empat tingkat, stagger 0.15 dtk. | — |
| 025 | 4 Mekanisme | Di dalam komputer ada beberapa tingkat tempat kerja, bukan hanya dua. | Diagram tangga empat tingkat mulai terbentuk. | Setiap anak tangga muncul dari bawah, stagger 0.18 dtk. | — |
| 026 | 4 Mekanisme | Dan yang membedakannya bukan ukuran. Yang membedakan adalah jarak. | Tangga berubah jadi peta jarak horizontal. | Layout beralih dari vertikal ke horizontal, 0.8 dtk power3.inOut. | — |
| 027 | 4 Mekanisme | Semakin dekat ke prosesor, semakin cepat. Tapi juga semakin kecil dan semakin mahal. | Sumbu: kiri "dekat & cepat", kanan "jauh & lambat". Kotak mengecil ke kiri. | Empat kotak menyusut ke kiri; label sumbu tergambar. | — |
| 028 | 4 Mekanisme | Bayangkan tingkatannya sebagai jarak yang harus kamu tempuh sendiri. | Ikon orang berdiri di titik prosesor. | Ikon muncul; lingkaran jangkauan melebar dari titiknya. | — |
| 029 | 4 Mekanisme | Tingkat pertama ada di meja, tepat di depanmu. Tinggal julurkan tangan. | Kotak pertama tepat di sebelah ikon orang, jarak nol. | Tangan menjulur pendek, 0.3 dtk. | — |
| 030 | 4 Mekanisme | Itu kesh. Meja kecil yang menempel langsung di prosesor. | Label "CACHE" pada kotak terdekat, dengan ukuran ditulis kecil. | Label pop + garis penunjuk pendek. | — |
| 031 | 4 Mekanisme | Tingkat berikutnya, ram, ada di rak seberang ruangan. | Kotak kedua diposisikan jauh, garis jarak digambar. | Garis jarak tergambar dari titik nol ke kotak RAM. | — |
| 032 | 4 Mekanisme | Dan penyimpanan, ada di gudang, di lantai bawah. | Kotak ketiga jauh sekali, sampai memerlukan skala baru. | Kamera zoom out; skala berubah, sumbu memanjang. | — |
| 033 | 4 Mekanisme | Kalau mengambil dari kesh terasa satu detik, mengambil dari ram terasa sekitar satu menit. | Dua label waktu muncul berdampingan: 1 detik dan 1 menit. | Angka counter naik dari nol ke nilainya, power2.out. | — |
| 034 | 4 Mekanisme | Dan mengambil dari hard disk yang berputar, terasa seperti dua bulan. | Label ketiga: "2 BULAN", jauh di ujung kanan layar. | Sumbu memanjang keluar layar; angka naik cepat lalu berhenti. | — |
| 035 | 4 Mekanisme | Jaraknya sejauh itu. Dan komputermu menempuhnya jutaan kali sehari. | Titik-titik cahaya mengalir bolak-balik di sepanjang sumbu. | Partikel mengalir dua arah, kecepatan berbeda per segmen. | — |
| 036 | 4 Mekanisme | Lalu apa yang terjadi kalau mejanya penuh? | Meja terlihat penuh sesak oleh berkas. | Berkas terus bertambah sampai bertumpuk, stagger cepat. | — |
| 037 | 4 Mekanisme | Sistem tidak menyerah. Ia memindahkan berkas yang paling jarang dipakai. | Satu berkas ditandai, diangkat dari meja. | Berkas terangkat, glow kuning, 0.5 dtk. | — |
| 038 | 4 Mekanisme | Dipindahkan ke lemari, supaya meja punya ruang lagi. | Berkas melayang dari meja ke lemari. | Path lengkung ke lemari, 0.9 dtk power2.inOut. | — |
| 039 | 4 Mekanisme | Kedengarannya pintar. Tapi ingat, lemari itu dua bulan jauhnya. | Label "2 BULAN" muncul kembali di jalur menuju lemari. | Jalur berdenyut merah; label pop. | — |
| 040 | 4 Mekanisme | Begitu berkas itu dibutuhkan lagi, semuanya berhenti menunggu. | Seluruh layar membeku, spinner muncul lagi seperti di awal. | Semua elemen freeze; spinner fade in di tengah. | — |
| 041 | 4 Mekanisme | Itulah yang kamu rasakan saat komputer tiba-tiba tersendat parah. | Grafik responsivitas terjun bebas. | Garis grafik jatuh tajam, strokeDashoffset, power4.in. | — |
| 042 | 4 Mekanisme | Satu hal terakhir, dan ini bagian yang aneh. | Layar bersih, satu kotak kecil di tengah. | Semua fade out kecuali satu kotak. | — |
| 043 | 4 Mekanisme | Ram menyimpan ingatannya di dalam wadah yang bocor pelan-pelan. | Wadah kecil berisi cahaya yang menetes keluar. | Tetesan turun berulang, sine.inOut, tiga siklus. | — |
| 044 | 4 Mekanisme | Jadi isinya harus ditulis ulang terus-menerus, ribuan kali setiap detik. | Wadah terisi ulang berkali-kali dengan cepat. | Isi wadah naik-turun cepat, repeat terbatas, tanpa loop tak hingga. | — |
| 045 | 4 Mekanisme | Berhenti menulis ulang sebentar saja, ingatannya hilang. Itu sebabnya ram lupa saat listrik mati. | Wadah berhenti diisi, cahaya habis, layar gelap. | Cahaya meredup sampai nol, 1.2 dtk power2.in. | — |
| 046 | 4 Mekanisme | Tapi kalau kesh itu kecil sekali, kenapa dia bisa membantu sebanyak itu? | Kotak cache kecil di sebelah kotak RAM yang jauh lebih besar. | Perbandingan ukuran dianimasikan; kotak kecil berdenyut. | — |
| 047 | 4 Mekanisme | Karena program tidak membaca data secara acak. Ia memakai data yang sama berulang kali. | Grid data; hanya beberapa sel yang menyala terus-menerus. | Sel yang sama menyala berulang, sel lain diam gelap. | — |
| 048 | 4 Mekanisme | Sekali sebuah data ditarik ke meja kecil, biasanya ia dipakai lagi sebentar kemudian. | Satu sel ditarik ke kotak cache, lalu diakses beberapa kali. | Sel bergerak ke cache; tiga denyut akses cepat, stagger 0.2. | — |
| 049 | 4 Mekanisme | Jadi meja sekecil apa pun tetap berguna, asal isinya yang tepat. | Cache kecil dengan tanda centang; label "isi yang tepat". | Centang hijau pop back.out(2). | — |
| 050 | 4 Mekanisme | Kalau meja kecil itu jauh lebih cepat, kenapa tidak semuanya dibuat seperti itu? | Pertanyaan besar di tengah layar. | Teks masuk stagger per kata 0.07 dtk. | — |
| 051 | 4 Mekanisme | Karena kecepatan itu dibayar dengan dua hal. Ruang, dan uang. | Dua ikon: penggaris dan tumpukan koin. | Dua ikon masuk dari sisi berlawanan. | — |
| 052 | 4 Mekanisme | Meja kecil harus menempel di prosesor. Ruang di sana sangat terbatas. | Zoom ke keping prosesor; area cache disorot kecil. | Kamera zoom in 1.4×, area cache berdenyut. | — |
| 053 | 4 Mekanisme | Setiap tambahan di sana memakan tempat yang bisa dipakai untuk hal lain. | Area cache melebar, mendesak blok lain sampai terjepit. | Blok lain terdorong keluar bingkai. | — |
| 054 | 4 Mekanisme | Dan per gigabita, harganya berkali lipat dibanding ram biasa. | Perbandingan harga: dua batang, satu jauh lebih tinggi. | Batang tumbuh dari bawah, stagger 0.15 dtk. | — |
| 055 | 4 Mekanisme | Jadi komputer tidak memilih satu. Ia memakai semuanya sekaligus. | Keempat tingkat muncul kembali, semuanya menyala. | Empat kotak menyala berurutan stagger 0.12 dtk. | — |
| 056 | 4 Mekanisme | Sedikit yang sangat cepat. Banyak yang lebih lambat. Sangat banyak yang paling lambat. | Piramida: puncak kecil, dasar lebar. | Piramida terbentuk dari puncak ke dasar. | — |
| 057 | 4 Mekanisme | Susunan itu bukan kompromi yang terpaksa. Itu memang rancangannya. | Piramida tersorot utuh dengan label "hierarki memori". | Garis tepi piramida tergambar; label muncul. | — |
| 058 | 5 Realita | Sekarang mari lihat angka aslinya, di komputer yang dipakai membuat video ini. | Kartu spesifikasi mesin mulai terbentuk. | Kartu masuk dari bawah, y 40→0, power3.out. | — |
| 059 | 5 Realita | Prosesornya punya meja kecil bertingkat, totalnya sekitar dua puluh megabita. | Baris spesifikasi: cache L2 4 MB, L3 16 MB. | Angka counter naik ke nilainya, power2.out. | — |
| 060 | 5 Realita | Ramnya tiga puluh dua gigabita. Kira-kira seribu enam ratus kali lebih besar. | Baris RAM 32 GB; bar perbandingan panjang muncul. | Bar memanjang keluar layar untuk menekankan rasio. | — |
| 061 | 5 Realita | Meja kecil itu hanya sepersekian ribu ukuran mejanya. Tapi hampir semua pekerjaan lewat sana. | Bar cache nyaris tak terlihat di sebelah bar RAM. | Sorotan berpindah ke bar kecil; bar besar meredup. | — |
| 062 | 5 Realita | Sekarang pertanyaan yang sebenarnya kamu cari. Perlu tidak menambah ram? | Judul: "Perlu nambah RAM?" | Judul masuk besar, stagger per kata 0.08 dtk. | — |
| 063 | 5 Realita | Jawabannya bukan angka besar-besaran. Jawabannya, apakah mejamu memang sudah penuh. | Dua meja berdampingan: satu longgar, satu penuh sesak. | Dua panel masuk dari sisi berlawanan, 0.6 dtk. | — |
| 064 | 5 Realita | Kalau semua pekerjaanmu masih muat, menambah meja tidak memberi apa-apa. | Meja longgar diperlebar; jarum kecepatan tidak bergerak. | Meja melebar; jarum indikator diam, garis datar. | — |
| 065 | 5 Realita | Bukan sedikit lebih cepat. Nol. | Angka besar "0%" di tengah layar. | Angka pop lalu diam; latar meredup. | — |
| 066 | 5 Realita | Tapi kalau mejamu penuh dan berkas mulai ditumpuk di lantai, tambahan meja mengubah segalanya. | Meja penuh; tumpukan di lantai; lalu meja melebar dan lantai bersih. | Tumpukan hilang berurutan saat meja melebar. | — |
| 067 | 5 Realita | Jadi jangan lihat angka pemakaian ram. Itu indikator yang salah. | Indikator "RAM terpakai 80 persen" dengan tanda silang merah. | Bar terisi ke 80 persen; silang merah tergambar di atasnya. | — |
| 068 | 5 Realita | Ram yang kosong itu justru terbuang percuma. Sistem sengaja mengisinya. | Bar yang sama, sekarang dengan centang hijau. | Silang memudar, centang hijau menggantikan. | — |
| 069 | 5 Realita | Yang harus kamu lihat adalah seberapa sering berkas dipindah ke lemari. | Grafik aktivitas pemindahan ke penyimpanan. | Garis grafik tergambar, ada lonjakan tajam. | — |
| 070 | 5 Realita | Di Windows namanya pemakaian berkas halaman. Di Linux dan Mac namanya swap. | Dua label sistem berdampingan dengan nama masing-masing. | Dua label masuk stagger 0.2 dtk. | — |
| 071 | 5 Realita | Kalau angka itu terus naik saat kamu bekerja, barulah menambah ram masuk akal. | Grafik naik terus; centang hijau muncul di sebelahnya. | Garis naik, lalu centang pop. | — |
| 072 | 6 Rangkuman | Jadi, tiga hal yang perlu kamu bawa pulang. | Layar bersih, angka "3" besar di tengah. | Angka pop lalu mengecil ke sudut, 0.5 dtk. | — |
| 073 | 6 Rangkuman | Satu. Ram bukan tempat menyimpan. Ram tempat mengerjakan. | Poin pertama muncul dengan nomor besar. | Baris masuk y 24→0, power3.out. | — |
| 074 | 6 Rangkuman | Dua. Yang membuat cepat bukan ukurannya, tapi jaraknya ke prosesor. | Poin kedua muncul di bawahnya. | Baris kedua masuk, stagger setelah poin pertama. | — |
| 075 | 6 Rangkuman | Tiga. Menambah ram hanya membantu kalau mejamu memang sudah penuh. | Poin ketiga muncul; ketiganya terlihat bersamaan. | Baris ketiga masuk; garis aksen tergambar di bawah ketiganya. | — |
| 076 | 6 Rangkuman | Dan kalau kamu penasaran apa yang terjadi di dalam meja kecil itu, bilang di komentar. | Ajakan singkat; ikon komentar. | Ikon pop, teks masuk dari bawah. | — |

### Timing — estimasi *(langkah 3)*

Diisi dari keluaran `node --env-file=.env tools/estimate-timing.mjs ideas/apa-itu-ram/naskah.md`,
lalu **ditambah manual**: +1,5 dtk (`sc-open` setelah scene 005) dan +5,0 dtk
(`sc-close` setelah scene 050).

### Timing — final *(langkah 7, setelah VO jadi)*

| # | Berkas VO | Durasi VO | data-duration | data-start |
|---|---|---|---|---|

---

## Short 1 — T01-S1 · “Nugget”

**Insight yang diambil:** skala jarak/waktu antar tingkat memori, dibuat manusiawi.
**Target:** 40–60 dtk · ~110 kata · tangga L1

*(Ditulis setelah video panjang disetujui.)*

## Short 2 — T01-S2 · “Jebakan”

**Mitos yang dibantah:** "RAM lebih besar pasti bikin komputer lebih cepat."
**Target:** 40–60 dtk · ~110 kata · tangga L1

*(Ditulis setelah video panjang disetujui.)*

---

## Metadata publish

Diisi menjelang unggah, lalu disalin ke `render/publish.md`. Lihat [docs/06](../../docs/06-publishing.md).
