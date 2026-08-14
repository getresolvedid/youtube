Anggaran: mulai 67,31 dtk · durasi 19,68 dtk (estimasi, VO belum jadi).
Tujuh beat = tujuh tahap. Titik waktunya diambil dari `beat("ram-bentuk", i)`,
bukan diketik — lihat catatan di ujung berkas.

Scene terpanjang episode ini sampai sekarang, dan itu disengaja: isinya EMPAT
benda, dan tiap benda butuh waktunya sendiri untuk mendarat. Yang menahannya
supaya tidak jadi katalog adalah satu hal yang sama muncul di keempatnya —
kisi kotak dari scene sebelumnya (tahap 7).

Frame pertama = frame terakhir `06-ram-size`: meja di tengah bawah, bidang kotak
terbelah di atasnya, kata RAM kecil di bawah meja. Tidak ada yang masuk.

1. kisi kotak MENGATUP jadi batang.
   - garis-garis pembelah luruh, bidangnya menyempit tinggi dan melebar sedikit
     sampai jadi sebuah batang mendatar di tengah layar
   - kaki tumbuh di sisi bawahnya, dan satu coakan menganga di deretan kaki itu
   - mejanya ikut memudar keluar — mulai sekarang bendanya yang bicara,
     bukan analoginya. kata RAM ikut pergi bersama mejanya
   (VO: "Meja itu punya wujud nyata.")

2. kartu 1 — desktop.
   - kartunya TUMBUH MENGELILINGI batang yang sudah ada di tengah layar;
     batangnya sendiri cuma mengecil ke ukuran kartu, tidak berpindah
   - papan induk digambar sebagai bilah mendatar di bawah kartu, dengan slot
     menganga
   - batang turun, masuk, dan dua pengait di ujung slot mengatup
   - label kartu: "desktop" · sublabel mono "DIMM"
   (VO: "Di desktop, ia batang panjang yang ditancapkan ke papan induk.")

3. kartu 2 — laptop.
   - salinan batang muncul di atas kartu kedua, lalu MEMENDEK di tengah jalan
     turun. slotnya ikut memendek bersamaan, jadi keduanya tetap sepadan
   - masuknya sama seperti kartu 1
   - label: "laptop" · sublabel "SO-DIMM"
   (VO: "Di banyak laptop, batangnya lebih pendek.")

4. kartu 3 — ponsel, bagian pertama.
   - batang datang seperti dua kartu sebelumnya, TAPI papan di bawahnya
     TIDAK punya slot. tidak ada tempat masuk
   - kakinya rontok satu per satu dari kiri ke kanan
   - keheningan kecil di sini disengaja: yang hilang adalah slotnya, dan itu
     cuma terbaca kalau ada satu ketukan tanpa gerakan lain
   (VO: "Di ponsel tidak ada batang sama sekali.")

5. kartu 3 — ponsel, bagian kedua.
   - batang menyusut jadi chip persegi kecil dan mendarat menempel di papan
   - empat titik solder mendarat di sisinya, `back.out`, stagger cepat
   - satu lingkaran tipis mengembang dari chip lalu hilang — "sudah, permanen"
   - label: "ponsel" · sublabel "dipatri"
   (VO: "Chipnya dipatri langsung, tidak bisa dilepas.")

6. kartu 4 — kartu grafis.
   - papan digambar, prosesor grafis mendarat di tengahnya (ikon `chip`)
   - EMPAT chip memori kecil mendarat mengelilinginya, stagger memutar
   - garis pendek menghubungkan tiap chip ke prosesor grafis
   - label: "kartu grafis" · sublabel "memori sendiri"
   (VO: "Kartu grafis malah punya mejanya sendiri.")

7. penutup — yang sama di keempatnya.
   - kisi kotak kecil (motif yang sama persis dari tahap 1) MENYALA di dalam
     tiap benda memori di keempat kartu, serentak
   - prosesor grafis di kartu 4 TIDAK ikut menyala: ia bukan memori, dan kalau
     ikut menyala kalimat "tugasnya sama persis" jadi salah
   - keempat kartu naik sedikit bersamaan, sekali, lalu diam
   (VO: "Wujudnya beda-beda, tugasnya sama persis.")

motion:
   - kisi mengatup: garis pembelah `opacity 1→0` + bidang `scaleY`, `power2.in`;
     batangnya lahir dari bidang yang sama, tidak pernah ada potongan
   - kaki & coakan tumbuh: `scaleY 0→1` dari tepi atas, stagger 0,02 dtk
   - geser barisan: `power2.out`, jatuh bersamaan dengan kartu yang masuk
   - penyusutan batang ke ukuran kartu: `power3.out`, pusatnya tetap
   - batang masuk slot: `y` `power2.out`, berhenti dengan sedikit tekan
     (`scaleY` 1→0,94→1) — jangan pantulan, ia ditekan masuk, bukan dijatuhkan
   - pemendekan batang tahap 3: `width` `power2.out` bersamaan dengan turunnya
   - kaki rontok: tiap kaki `y +14` + fade, stagger 0,04 dtk, `power1.in`
   - titik solder: `back.out(2.4)`, stagger 0,05 dtk
   - chip memori kartu 4: `back.out(1.8)`, stagger 0,07 dtk memutar
   - nyala penutup: fade + `scale 0,9→1`, semuanya SERENTAK — stagger di sini
     akan membaca sebagai empat kejadian, padahal maksudnya satu
   - semua nilai fungsi murni dari frame — `useDetik()` + helper `shared/anim.ts`,
     dilarang random/state (HARD RULE deterministik di CLAUDE.md)

tata letak:
   - empat kartu sejajar, lebar 380, jarak 60, pusatnya di 300 · 740 · 1180 · 1620
   - **BARISANNYA SELALU TERPUSAT.** Tiap kartu baru menggeser seluruh barisan ke
     kiri setengah jarak antar-kartu, jadi yang di layar selalu seimbang: satu
     kartu di tengah, lalu dua, lalu tiga, lalu empat. Versi pertama scene ini
     memasang keempatnya di posisi akhir sejak awal, dan hasilnya tiga perempat
     frame kosong selama empat detik pertama — kartu tunggal nyangkut di pojok
     kiri bawah sementara VO sedang mengucapkan kalimat terpanjang scene ini
   - geseran itu juga yang membuat tahap 1 dan 2 nyambung tanpa perjalanan:
     kartu pertama lahir TEPAT di tengah layar, di tempat batangnya sudah berdiri
   - papan tiap kartu di ketinggian yang SAMA. keempat benda dibandingkan, dan
     pembanding yang garis dasarnya beda tidak membandingkan apa-apa
   - `Batang` tinggal di `ideas/apa-itu-ram/batang-ram.tsx`, di luar `scenes/`,
     karena scene 8 memakai bentuk yang sama persis — alasannya sama dengan
     `panggung-analogi.tsx` (`npm run sisa` memeriksa tiap `.tsx` di `scenes/`
     terhadap daftar kunci naskah, jadi berkas bantu tidak boleh di sana)

catatan akurasi:
   - coakan di batang digambar SKEMATIS. posisinya berbeda antar generasi dan
     itu memang benar, tapi angkanya belum ditopang sumber — baris ⚠ JEDEC di
     `naskah.md` § Sumber. di scene ini coakan cuma bagian dari bentuk; yang
     memakainya sebagai gagasan adalah scene 8
   - sublabel DIMM / SO-DIMM / dipatri / memori sendiri tidak pernah diucapkan
     VO. keempatnya nama, bukan klaim, dan tidak ada angka di satu pun
   - kartu grafis digambar punya memori TERPISAH dari RAM sistem. itu klaim, dan
     sudah masuk `naskah.md` § Sumber dengan status ⚠

catatan waktu:
   detiknya TIDAK diketik di `.tsx`. Tiap tahap dipatok ke `beat("ram-bentuk", i)`
   dari `timing.gen.ts` (HARD RULE 4), jadi mengubah satu kalimat di rencana VO
   menggeser koreografinya sendiri. Offset kecil di dalam satu beat (mis. kaki
   rontok 0,3 dtk setelah beatnya mulai) boleh ditulis sebagai angka — yang tidak
   boleh adalah menghitung sendiri kapan sebuah beat mulai.
