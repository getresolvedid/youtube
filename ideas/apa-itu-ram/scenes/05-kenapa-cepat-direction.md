Anggaran: mulai 49,77 dtk · durasi 24,84 dtk (estimasi, VO belum jadi).
Tujuh beat VO = tujuh tahap.

Frame pertama scene ini = frame terakhir `04-ram-analogy`: lemari di kiri
(skala 0,86), meja berdiri di tengah dengan satu berkas di atasnya, prosesor
menyala di kanan, jalur panjang gudang→meja masih tertinggal di layar, dan
tautan pendek meja→prosesor sudah tergambar. **Tidak ada yang masuk, menepi,
atau berpindah tempat di sini** — koordinatnya dipakai bersama lewat
`ideas/apa-itu-ram/panggung-analogi.tsx`, dan itulah yang membuat potongan
kerasnya terbaca sebagai "kamera masih di ruangan yang sama".

Scene ini mengisi bagian 5 [why] yang sebelumnya kosong: episode melompat dari
jawaban langsung ke penjelasan ukuran, dan lompatan itu meninggalkan pertanyaan
"kenapa lewat meja lebih cepat" tanpa jawaban. Yang dijawab di sini bukan
jaraknya — itu sudah digambar di scene 4 dan tidak digambar ulang — melainkan
dua hal yang belum pernah ditunjukkan: **di gudang isinya masih harus dicari**,
dan **perjalanan jauhnya cuma sekali**.

1. tautan pendek meja→prosesor MENEBAL sekali lalu kembali — itu saja isi
   "dekatnya memang membantu", tidak ada yang lain yang bergerak.
   sesudahnya perhatian pindah: tautan & prosesor meredup, lemari naik terang.
   (VO: "Dekatnya memang membantu. Tapi bukan cuma itu.")

2. animation — pencarian di gudang:
   - sorot kotak menyala di satu laci, lalu pindah ke laci berikutnya, satu per
     satu, dengan jeda yang TERLIHAT. urutannya 1, 3, 4, 2 — melompat, bukan
     runut: yang dicari letaknya belum diketahui, dan itu justru gagasannya.
   - berhenti di laci kedua (`LACI_SUMBER`), berkas aksennya berdenyut sekali.
   - lamanya tidak digambar sebagai grafik atau angka. ia dibuat TERASA dengan
     memakan waktu di layar — empat perhentian, ±0,7 dtk masing-masing.
   (VO: "Di gudang, berkasnya masih harus dicari, laci demi laci.")

3. permukaan meja terisi: empat berkas mendarat berjejer di kiri & kanan berkas
   yang sudah ada sejak scene 4, semuanya sekaligus (stagger 0,08 dtk dari
   tengah ke tepi). berkas lama ikut menyesuaikan ukurannya jadi satu deret.
   tidak ada laci, tidak ada tutup, tidak ada yang tersembunyi — seluruh isinya
   terlihat dalam satu pandangan.
   (VO: "Di meja, semuanya sudah terhampar di depan mata.")

4. animation — dua raihan yang memakan waktu SAMA:
   - prosesor meraih berkas paling KIRI: garis tergambar dari prosesor ke
     berkasnya, satu TITIK berjalan di ujungnya, dan begitu sampai, riak
     mengembang DI BERKAS ITU.
     titik, bukan ikon berkas: yang berjalan di sini jangkauannya, dan berkas
     kedua yang mendarat di atas berkas yang sudah ada terbaca sebagai gambar
     dobel. riaknya juga di berkasnya, bukan di prosesor — yang dijangkau
     berkasnya, dan di situ pula bilah waktunya berhenti.
   - lalu berkas paling KANAN, gerakan yang sama persis.
   - kedua garis TERTINGGAL di layar. panjangnya jelas berbeda — yang kiri
     hampir tiga kali yang kanan — dan itu memang yang harus terlihat.
   - dua bilah waktu terisi seiring masing-masing raihan, masing-masing tepat
     DI ATAS berkas yang diraihnya, dan keduanya berhenti di panjang yang SAMA
     PERSIS. label "sama saja" mendarat di antara keduanya setelah bilah kedua
     penuh.
   - bilahnya membandingkan raihan kiri dengan raihan kanan, TIDAK dengan
     gudang. tidak ada satuan, tidak ada angka: baris ⚠ di naskah § Sumber
     belum ditutup, jadi scene ini tidak boleh mengklaim berapa cepatnya.
   (VO: "Mau yang paling kiri atau paling kanan, tinggal diraih.")

5. bilah waktu & label "sama saja" memudar. jalur panjang gudang→meja — yang
   sejak awal scene ini cuma jejak redup — MENYALA penuh sekali, dan tanda
   `1×` mendarat di tengah lengkungnya. berkas di lemari berdenyut sekali
   bersamaan: yang jauh itu sudah selesai dikerjakan.
   (VO: "Dan perjalanan jauh tadi cuma terjadi sekali.")

6. animation — pengulangan:
   - jalur panjang balik jadi jejak redup, `1×` tetap menempel padanya.
   - lompatan pendek meja→prosesor berjalan berulang, siklus 0,42 dtk, jauh
     lebih cepat daripada antar-jemput di scene 3.
   - penghitung di dekat tautan lari naik dari nol, melambat di ujung, lalu
     label "ribuan kali" mendarat di bawahnya.
   - dua tanda itu bersanding di frame yang sama: `1×` di jalur panjang,
     "ribuan kali" di tautan pendek. itu seluruh isi bagian [why] dalam satu
     gambar.
   (VO: "Sesudahnya, berkas yang sama dipakai lagi ribuan kali.")

7. jembatan ke `06-ram-size` (HARD RULE 7):
   - kedua tanda tadi meredup — tidak dibuang, cuma mundur satu lapis.
   - garis ukur tergambar dari tepi kiri ke tepi kanan papan meja, dengan
     patok di kedua ujungnya, dan permukaan mejanya menyala sekali.
   - pertanyaannya digantung di layar, TIDAK dijawab di sini: scene berikutnya
     membuka permukaan yang sama jadi kotak-kotak, dan garis ukur inilah yang
     membuat pembukaan itu terbaca sebagai kelanjutan.
   - lompatan pendeknya tetap berjalan di belakang — pengulangannya tidak
     berhenti cuma karena kameranya pindah perhatian.
   (VO: "Tinggal satu: berapa banyak yang muat di meja itu.")

motion:
   - tautan menebal tahap 1: `strokeWidth` & opasitas `yoyo` 0,7 dtk, sinus
   - sorot laci: fade masuk 0,18 dtk, tahan, fade keluar 0,18 dtk; posisinya
     melompat antar-laci, tidak menggeser — geseran terbaca sebagai satu benda
     yang berjalan, dan yang dicari bukan bendanya
   - berkas mendarat tahap 3: `scale 0,6→1` + `y` turun, `back.out(1,6)`
   - garis raihan: `power2.out`, DURASI IDENTIK untuk kiri & kanan — konstanta
     yang sama dipakai keduanya, bukan dua angka yang kebetulan sama
   - bilah waktu: `linear`, mulai & berhenti bersama garisnya
   - jalur panjang menyala: opasitas `yoyo`, `expo.out`
   - `1×` dan "ribuan kali": fade + naik 18px, `expo.out`
   - penghitung: `power3.out` — cepat di awal, hampir berhenti di ujung; itu
     yang membuat angkanya terbaca "banyak", bukan angka akhirnya
   - semua nilai fungsi murni dari frame — `useDetik()` + helper `shared/anim.ts`,
     dilarang random/state (HARD RULE deterministik di CLAUDE.md)

catatan:
   - jaraknya TIDAK digambar ulang. scene 4 sudah menaruh jalur panjang dan
     tautan pendek berdampingan dengan bobot garis yang sama; mengulanginya di
     sini akan membuat scene ini terasa mundur satu langkah.
   - nama "random access" tidak jatuh di layar maupun di VO walaupun tahap 4
     persis menggambarkannya. kartu judul sudah menulis kepanjangan itu, dan
     menautkannya ke sini adalah pekerjaan scene bagian 6 — bukan pekerjaan
     scene yang sedang menjelaskan sebabnya (HARD RULE 6).
   - indigo tetap milik jawaban: berkas, meja, garis raihan, dan tautan. lemari
     tetap abu-abu, termasuk sorot pencariannya — yang disorot di sana adalah
     masalahnya, bukan jawabannya.
   - frame terakhir scene ini harus meninggalkan lemari, meja, dan prosesor di
     posisi yang sama seperti frame pertamanya. `06-ram-size` membuka dengan
     mengeluarkan lemari & prosesor dari frame dan menggeser meja ke tengah;
     kalau scene ini memindahkan salah satunya, sambungannya patah.
