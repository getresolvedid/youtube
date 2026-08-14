Anggaran: mulai 133,23 dtk · durasi 25,69 dtk (estimasi, VO belum jadi).
Delapan beat = delapan tahap. Titik waktunya diambil dari
`beat("beda-penyimpanan", i)`, bukan diketik.

Frame pertama = frame terakhir `08-ram-generasi`: batang DDR5 yang tertahan di
mulut slot lama, di kotak yang sama persis (`KOTAK_TERTAHAN` di
`../batang-ram.tsx`), dengan papan & slotnya masih di bawahnya.

**Batangnya TIDAK PERNAH BERGERAK sepanjang scene ini.** Itu bukan kemalasan
tata letak, itu syarat: `10-ram-tugas` membuka dengan melebarkan batang yang ada
di `KOTAK_TERTAHAN` jadi papan meja, satu tween tanpa potongan. Begitu scene ini
menggeser batangnya barang sedikit, morph di scene berikutnya mulai dari tempat
yang salah, dan yang terbaca bukan "benda yang sama berubah bentuk" melainkan
"ada benda lain yang muncul". Yang datang dan pergi di sini adalah benda
KEDUA — dan ia masuk dari KIRI, ke tempat yang kira-kira sama dengan tempat
lemari arsip mendarat di scene berikutnya. Penonton yang melihat kotak itu di
kiri lalu melihat lemari arsip di kiri membaca keduanya sebagai benda yang sama
berganti kostum, dan itu memang benar.

1. batang tetap, panggungnya dibersihkan.
   - papan & slot lama di bawah batang memudar keluar — yang barusan diuji
     (masuk atau tidak masuk ke slot) selesai, dan slot itu tidak punya urusan
     dengan perbandingan yang mau dikerjakan
   - batang diam di kotaknya, sel di dalam chipnya menyala tenang
   (VO: "Batang ini bukan satu-satunya tempat berkasmu berada.")

2. benda kedua masuk.
   - kotak besar meluncur masuk dari tepi KIRI dan berhenti; tingginya jelas
     lebih dari dua kali badan batang. besarnya adalah pernyataan pertama scene
     ini, dan ia disampaikan sebelum satu kata pun tentang muatnya diucapkan
   (VO: "Ada benda lain di komputer yang sama.")

3. isinya, dan apa kerjanya.
   - piringan (`disk`) di kepala kotak berputar sekali, lalu berhenti
   - kisi berkas di badan kotak terisi cepat dari atas ke bawah sampai PENUH —
     jauh lebih banyak daripada yang muat di batang
   (VO: "Dia yang memegang berkasmu waktu komputernya mati.")

4. baru namanya.
   - label "hardisk · S S D" mendarat di bawah kotak
   - tidak ada gerakan lain di tahap ini: nama butuh detiknya sendiri, dan
     bendanya sudah bekerja di depan mata sebelum namanya jatuh (HARD RULE 6)
   (VO: "Namanya hardisk, atau S S D.")

5. menempelkan analogi ke bendanya.
   - dua label kecil menyala berurutan: "meja" di batang, "gudang" di kotak
   - masing-masing memakai ikon yang sama dengan yang dipakai sejak scene 3
     (`desk`, `cabinet`) — itu yang membuat sambungannya terbaca tanpa dijelaskan
   (VO: "Kalau batang tadi mejanya, yang ini gudangnya.")

6. muatnya banyak, tapi ada ongkosnya.
   - sorot menelusuri kisi gudang — beberapa perhentian, melompat, sama seperti
     pencarian laci di `05-kenapa-cepat` dan sengaja begitu
   - berkas yang ketemu berangkat dari gudang ke batang lewat lengkung panjang,
     dan jalur itu TERTINGGAL di layar
   - tidak ada satu angka pun, tidak ada bilah waktu, tidak ada satuan: yang
     dijual mekanismenya (dijemput dulu, dicari dulu), bukan berapa lamanya
   (VO: "Gudang muat jauh lebih banyak, tapi isinya harus dijemput.")

7. listriknya dicabut.
   - simbol daya menyala di antara kedua benda, lalu PADAM dengan tanda silang
   - sekali kedip gelap di seluruh panggung, satu frame-tarikan saja
   (VO: "Bedanya yang paling besar kelihatan kalau listriknya dicabut.")

8. yang kosong dan yang tidak.
   - isi batang lenyap satu per satu, dari kiri ke kanan, sampai selnya mati
     total — batangnya masih ada, isinya tidak
   - kisi gudang TIDAK BERGEMING. tidak berkedip, tidak meredup, tidak bergerak
     satu piksel pun. diamnya itu separuh isi tahapnya
   - frame terakhir: batang kosong di kotaknya yang tidak pernah berubah, gudang
     penuh di kiri — dan itu persis frame yang dibutuhkan `10-ram-tugas`
   (VO: "Meja langsung kosong. Gudang tidak berubah sama sekali.")

motion:
   - papan & slot keluar: fade + turun 24px, `power2.in`
   - kotak gudang masuk: `x` dari luar frame, `expo.out` 0,7 dtk, berhenti tanpa
     pantulan — benda berat tidak memantul
   - piringan berputar: `rotate` satu putaran, `power2.out`
   - kisi gudang terisi: stagger per baris 0,05 dtk, fade + `scale 0,7→1`
   - label nama & label analogi: `masuk()` dari `shared/anim.ts`, geser 14px
   - sorot pencarian: fade masuk 0,18 dtk, tahan, fade keluar 0,18 dtk; MELOMPAT
     antar-sel, tidak menggeser
   - berkas dijemput: lengkung kuadratik, `power2.out`, jalurnya tergambar dengan
     `p` yang sama supaya ujung garis tidak mendahului bendanya
   - padam: opasitas simbol daya `tPP`, lalu tirai gelap 0,18 dtk sekali
   - isi batang lenyap: enam tween berurutan, stagger 0,12 dtk, fade + turun 10px
   - semua nilai fungsi murni dari frame — `useDetik()` + helper `shared/anim.ts`,
     dilarang random/state (HARD RULE deterministik di CLAUDE.md)

warna:
   - batang tetap indigo seperti tiga scene sebelumnya; gudang ABU-ABU, sama
     seperti lemari arsip sejak scene 3. Indigo cuma milik jawabannya, dan
     jawaban episode ini bukan gudang
   - tanda silang di simbol daya merah, dan itu satu-satunya merah di scene ini

catatan akurasi:
   - **Tidak ada satu angka pun**: tidak ada GB, tidak ada nanodetik, tidak ada
     rpm. Baris ⚠ di `naskah.md` § Sumber untuk latensi dan untuk volatilitas
     dua-duanya masih terbuka
   - kotak gudang digambar sebagai satu benda generik dengan piringan di
     kepalanya. Ia SKEMATIS: hardisk punya piringan, S S D tidak — dan karena VO
     menyebut keduanya sebagai satu benda, gambarnya tidak boleh mengklaim isi
     salah satunya. Piringan dipakai karena ia satu-satunya bentuk yang langsung
     terbaca "tempat menyimpan" dari kursi penonton
   - kenapa isinya hilang (muatan yang harus disegarkan) TIDAK disentuh — itu L3
     dan barisnya masih ⚠. Yang ditunjukkan cuma yang terlihat: kosong, dan
     tidak kosong

catatan waktu:
   detiknya TIDAK diketik di `.tsx` — tiap tahap dipatok ke
   `beat("beda-penyimpanan", i)` dari `timing.gen.ts` (HARD RULE 4).
