Anggaran: mulai 158,92 dtk · durasi 34,68 dtk (estimasi, VO belum jadi).
Sembilan beat = sembilan tahap; satu tahap satu kejadian, tidak ada yang
menumpuk. Titik waktunya diambil dari `beat("ram-tugas", i)`, bukan diketik.

**Scene penutup episode (bagian 7 [case]).** Tujuh tahap pertama menetapkan
batas bendanya; dua tahap terakhir menaruh kalimat bawa-pulang, lalu langsung
tanda brand ([docs/02 § Aturan flow](../../../docs/02-format-video.md)).
Panjangnya memang di atas rata-rata episode ini, dan itu disengaja: scene
terakhir adalah satu-satunya yang tidak punya scene sesudahnya untuk
menyelesaikan apa pun yang ia gantung.

Frame pertama = frame terakhir `09-beda-penyimpanan`: batang DDR5 di kotak yang
sama persis — isinya barusan lenyap waktu listriknya dicabut, dan gudangnya
berdiri di kiri. Koordinatnya diambil dari
`KOTAK_TERTAHAN` di `../batang-ram.tsx` — bukan diketik ulang di sini, karena dua
salinan angka yang wajib sama adalah dua angka yang akan berbeda dalam seminggu.

Layarnya dibagi dua dan pembagian itu tidak berubah sampai frame terakhir:

- **atas — panggung** (y 280–680): lemari kiri, meja tengah, prosesor kanan,
  di koordinat yang sama persis dengan scene 3, 4, dan 5 (`../panggung-analogi.tsx`).
  Ini yang bicara. Setiap baris di bawahnya baru mendarat SETELAH panggung
  membuktikannya.
- **bawah — dua kolom** (y 696–912): kiri "yang dikerjakan meja" (centang, hijau),
  kanan "yang bukan tugasnya" (silang, merah), dipisah satu garis tegak tipis
  di x 960. Berhenti di 912, bukan mepet ke batas aman: baris terakhir kolom
  kanan tepat di bawah situ akan bertabrakan dengan subtitel preview, dan
  scene ini akan ditonton bisu berkali-kali sebelum VO-nya jadi.

Kolomnya adalah catatan, bukan isi. Kalau sebuah baris muncul tanpa ada yang
terjadi di panggung, baris itu salah tempat — pindahkan ke panggung atau buang.

1. mundur ke panggung utuh.
   - batang DDR5 dari scene sebelumnya melebar, bergeser kanan, dan MENIPIS
     jadi papan meja — satu tween, satu benda, tidak ada potongan di tengahnya
   - begitu bentuknya sampai, meja nyata menyilang masuk di kotak yang sama
     (papan + kaki), batangnya padam di frame yang sama
   - lemari masuk dari kiri dan prosesor dari kanan, ke posisi lamanya
   - dua kolom bawah masih KOSONG: tidak ada judul, tidak ada garis pemisah
   (VO: "Sekarang mundur sedikit, lihat mejanya utuh lagi.")

2. tugas mejanya, dibuktikan dulu.
   - empat berkas mendarat berjejer di permukaan meja, stagger, semuanya
     terlihat — tidak ada yang bertumpuk atau tertutup
   - tautan pendek meja→prosesor tergambar lalu berdenyut sekali
   - BARU sesudah itu judul kolom kiri muncul, dan baris pertamanya mendarat:
     "menaruh yang sedang dipakai" / "dekat, dan semuanya terhampar"
   (VO: "Tugas meja cuma satu. Menaruh yang sedang dipakai, dekat dan terhampar.")

3. kolom kanan dibuka.
   - garis tegak pemisah tergambar dari atas ke bawah, 0,45 dtk
   - judul kolom kanan muncul di sebelahnya
   - beat ini cuma 1,29 dtk — satu ketukan, tidak boleh ada gerakan lain di
     panggung. Panggungnya sengaja diam: yang berubah cuma layar dibelah dua
   (VO: "Selebihnya bukan tugasnya.")

4. bukan yang mengerjakan.
   - satu berkas melompat meja→prosesor, dan pekerjaannya terjadi DI PROSESOR:
     ikon `chip` menyala penuh, percikan (`bolt`) berkedip dua kali di sisinya
   - MEJA DIAM TOTAL selama tahap ini. Tidak ada denyut, tidak ada napas, tidak
     ada berkas yang bergerak di permukaannya — diamnya itu isi tahap ini
   - silang pertama: "mengerjakan berkasnya"
   (VO: "Meja tidak mengerjakan apa pun. Yang mengerjakan tetap prosesor.")

5. bukan tempat menyimpan.
   - perhatian balik ke lemari: berkas sumber di lacinya menyala dan berdenyut
     sekali, riak melebar keluar darinya — gerakan yang sama persis dengan
     scene 4, dan memang harus sama supaya terbaca sebagai benda yang sama
   - empat berkas di meja diberi tanda salinan: garis tepi putus-putus tipis
     menyala sebentar di keempatnya
   - silang kedua: "menyimpan aslinya"
   (VO: "Meja juga tidak menyimpan. Aslinya tetap di gudang sejak tadi.")

6. lebih lebar bukan lebih cepat.
   - meja melebar KE KIRI SAJA (papan + kaki ikut), 1,0 → 1,35, bertumpu di
     tepi kanan papan. Sisi yang menghadap prosesor tidak bergerak sedikit pun,
     dan itu bukan soal tata letak: jarak meja ke prosesor adalah pernyataan
     tersendiri sejak scene 4 ("jauh lebih dekat, bukan menempel" — yang
     menempel itu cache, dan cache belum datang). Meja yang tumbuh ke kanan
     merapat ke kartu prosesor dan diam-diam membatalkannya
   - konsekuensi keduanya justru yang paling penting: panjang lompatannya TETAP,
     jadi tidak ada satu pun alasan gerakannya terlihat berbeda
   - lompatan pendek meja↔prosesor sudah berjalan sejak ekor tahap 5 dan terus
     berjalan sesudahnya — dengan periode yang sama persis. Itu seluruh
     isi tahap ini, dan ia hanya terbaca kalau ritmenya tidak berubah satu frame
     pun. JANGAN mempercepat, memperlambat, atau menjeda lompatan itu
   - metronom kecil di bawah prosesor menandai ketukannya, supaya "sama persis"
     terlihat dan bukan cuma dirasakan
   - silang ketiga: "membuat prosesor lebih cepat"
   (VO: "Dan meja yang lebih lebar tidak membuat prosesor jadi lebih cepat.")

7. yang memang bertambah.
   - dua berkas tambahan mendarat di ruang meja yang baru — di sisi KIRI, ke
     situlah mejanya tumbuh — stagger cepat
   - centang kedua di kolom kiri: "memuat lebih banyak sekaligus"
   - di sini batas bendanya selesai. yang datang sesudahnya bukan rangkuman isi
     episode, melainkan kalimat bawa-pulang — dan itu memang milik penutup
     [case] (docs/02 § Aturan flow)
   (VO: "Ia cuma memuat lebih banyak sekaligus.")

8. dua tempat, dua isi.
   - dua kolom bawah MEREDUP jadi latar (0,28), tidak dibuang: yang mereka catat
     masih berlaku, cuma berhenti jadi yang dibaca
   - berkas di meja berdenyut bersamaan sekali — "yang sedang dipakai"
   - lalu, terpisah beberapa detik, berkas asli di laci lemari berdenyut sekali —
     "sisanya". dua denyut yang jatuh bersamaan akan terbaca sebagai satu tempat,
     dan kalimatnya menyebut dua
   (VO: "Jadi yang sedang dipakai ada di ram. Sisanya tetap di gudang.")

9. mejanya penuh.
   - sisa ruang meja diisi berkas sampai tidak ada celah lagi. titiknya jatuh di
     TENGAH-TENGAH slot yang sudah ada, jadi jaraknya menyempit jadi separuh —
     mejanya terbaca penuh, bukan cuma "ada beberapa berkas lagi"
   - kata "penuh" mendarat di atas meja, tanpa satuan dan tanpa angka: yang
     diklaim keadaannya, bukan berapa banyak yang muat
   - berhenti di situ. tidak ada yang memudar di ekor scene — sesudah frame
     terakhirnya langsung tanda brand
   (VO: "Dan ram yang lebih besar cuma menolong kalau mejamu memang sudah penuh.")

motion:
   - morph batang→papan: `x`, `lebar`, `tinggi` satu tween `power3.out` 0,7 dtk
   - silang masuk meja nyata: 0,3 dtk terakhir morph, dua opasitas yang saling
     menutup di kotak yang sama — bukan potongan
   - lemari & prosesor masuk: `masuk()` dari `shared/anim.ts`, stagger 0,12 dtk
   - berkas mendarat: `masuk()` stagger 0,09 dtk, `expo.out`
   - tautan & garis pemisah: `gambarGaris` dari `shared/anim.ts`
   - denyut tautan, denyut berkas sumber, riak: `tPP` — bolak-balik sekali,
     tidak pernah berulang tanpa henti
   - lompatan meja↔prosesor: `antarJemput` dari `../panggung-analogi.tsx`,
     siklus TETAP di kedua sisi tahap 6
   - percikan `bolt`: dua kedip, opasitas dari `tPP`, bukan `setInterval`
   - melebar: `scaleX` bertumpu di TEPI KANAN papan, `power2.out` 0,85 dtk
   - centang & silang: `back.out(2)` + fade, geser 12px
   - napas halus di berkas meja sepanjang scene KECUALI tahap 4 — layar tidak
     boleh diam lebih dari 4 dtk (docs/02 § pacing), tapi diamnya tahap 4 itu
     disengaja dan dibayar oleh prosesor yang justru bergerak di saat yang sama
   - semua nilai fungsi murni dari frame — `useDetik()` + helper `shared/anim.ts`,
     dilarang random/state (HARD RULE deterministik di CLAUDE.md)

warna:
   - panggung tetap indigo, seperti empat scene sebelumnya
   - hijau & merah HANYA di dua kolom bawah, dan itu pengecualian yang sah di
     [docs/03 § Aturan pakai warna](../../../docs/03-tema-visual.md): satu aksen
     dominan per scene "kecuali memang sedang membandingkan dua hal" — dan scene
     ini tidak melakukan apa pun selain membandingkan dua hal
   - warnanya tidak pernah jadi satu-satunya pembeda: ada ikon (`check` / `x`),
     ada judul kolom, dan ada posisi kiri/kanan

catatan akurasi:
   - **Tidak ada satu angka pun di layar** — tidak ada GB, tidak ada nanodetik,
     tidak ada persen. Semua baris ⚠ di `naskah.md` § Sumber masih terbuka, dan
     scene ini tidak membutuhkan satu pun dari angka itu
   - metronom tahap 6 menandai KETUKAN, bukan kecepatan prosesor. Ia tidak boleh
     diberi label satuan apa pun, karena begitu ada satuannya ia jadi klaim
   - "meja melebar" di tahap 6 berhenti sebagai pernyataan tentang berapa banyak
     yang muat. SYARATNYA baru disebut di tahap 9 ("cuma menolong kalau mejamu
     memang sudah penuh") — dan itu tetap bukan angka: berapa banyak yang perlu
     dibeli milik scene [case] yang belum ditulis, dan milik Short 2

catatan waktu:
   detiknya TIDAK diketik di `.tsx` — tiap tahap dipatok ke `beat("ram-tugas", i)`
   dari `timing.gen.ts` (HARD RULE 4).
