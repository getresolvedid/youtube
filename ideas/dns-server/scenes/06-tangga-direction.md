Anggaran: mulai 82,95 dtk · durasi 36,82 dtk (estimasi, VO belum jadi).
Dua belas baris VO = dua belas tahap. **Scene terpanjang di episode**, dan
memang seharusnya: di sinilah utang bagian 3 dibayar.

Frame pertamanya = frame terakhir `05-loket`: loket utuh dengan nama resminya di
bawah. Nama resmi itu padam di tahap 0 dan tidak pernah kembali.

Geometri tangganya milik `../panggung-loket.tsx` (`TANGGA`, `posLoket(i)`) —
scene 7, 8 dan 12 memakai susunan loket yang sama persis, jadi angkanya tidak
boleh hidup di satu scene saja.

**ARAH TANGGANYA MENGIKAT: bawah = kamu, atas = pemilik situs.** VO memakai kata
"naik" berkali-kali (`07-dicatat`: "naik tangga begitu tiap kali", "jarang
benar-benar dinaiki"), jadi pertanyaan selalu bergerak KE ATAS dan jawaban turun.
Anak tangga terbawah adalah loket dari scene 5 — yang bertanya untukmu — dan
anak tangga teratas yang memegang jawabannya. Scene 7, 8, 9 dan 12 bertumpu pada
arah ini; membaliknya di salah satu scene memutus keempatnya sekaligus.

1. nama resmi padam. loket bergeser ke BAWAH dan mengecil, duduk di anak tangga
   terbawah. lacinya masih terbuka dan masih kosong — itu yang dipertanyakan.
   (VO: "Tidak memegang daftar, tapi tetap bisa menjawab.")

2. dua siluet loket lain memudar masuk DI ATASNYA, samar, makin kecil makin ke
   atas. belum jelas apa; cuma jelas bahwa loketnya tidak sendirian.
   (VO: "Caranya, dia tidak menjawab sendirian.")

3. nama situs tampil BESAR di atas frame, di koordinat `X_NAMA` dari scene 3.
   garis-garis tipis vertikal jatuh di antara potongannya, memecahnya jadi
   beberapa bagian yang terbaca terpisah.
   (VO: "Sekarang lihat namanya lagi, dan baca dari belakang.")

4. sebuah penanda segitiga masuk dari KANAN dan berhenti di potongan paling
   kanan. potongan itu menyala.
   arah masuknya dari kanan itu wajib — ia yang membuat "dari belakang" terasa.
   (VO: "Potongan paling kanan dulu.")

5. garis dari potongan yang menyala berjalan ke loket TEPAT DI ATAS loketmu —
   anak tangga berikutnya. loket itu menyala.
   (VO: "Potongan itu yang membuka loket pertama.")

6. kamera masuk sebentar ke loket pertama: lacinya juga ditarik, juga KOSONG.
   pengulangan yang disengaja dari scene 5 — bentuk lacinya sama persis.
   (VO: "Loket pertama tidak tahu apa-apa soal situs yang kamu tuju.")

7. dari jendela loket pertama keluar sebuah tangan penunjuk, mengarah KE ATAS ke
   loket berikutnya. bukan kartu, bukan jawaban — penunjuk.
   (VO: "Dia cuma tahu siapa yang mengurus akhiran itu.")

8. penanda di atas bergeser satu potongan ke kiri; loket kedua menyala;
   penunjuk kedua keluar.
   (VO: "Lalu potongan berikutnya, dan loket berikutnya.")

9. pengulangannya DIPERCEPAT: penanda bergeser, loket menyala, dua kali beruntun,
   masing-masing sekitar sepertiga waktu tahap 8.
   (VO: "Begitu terus, sampai loket paling ujung.")

10. loket paling ATAS menyala BERBEDA — aksen penuh, bukan sekadar terang.
    lacinya ditarik: ada SATU kartu di dalamnya. satu-satunya laci berisi di
    seluruh episode sampai titik ini.
    (VO: "Yang itu memang memegang jawabannya.")

11. sebuah sosok muncul di balik loket teratas. netral, tanpa wajah detail.
    label kecil di bawahnya: pemilik situsnya.
    (VO: "Karena yang duduk di situ pemilik situsnya sendiri.")

12. sosok itu mencabut kartu di lacinya dan memasukkan kartu baru — nomornya
    berbeda. seluruh loket lain di tangga TIDAK BERGERAK sama sekali, tidak
    menyala, tidak diberi tahu.
    frame terakhir: satu laci yang isinya baru, dan tangga di atasnya yang diam.
    (VO: "Makanya dia bisa mengganti nomornya kapan saja, tanpa memberi tahu siapa pun.")

motion:
   - loket menepi: `t()` x + `scale`, `E.power2out`, 0,8 dtk
   - siluet masuk: `masuk()` `urutan` 0 dan 1, opasitas berhenti di 0,35
   - potongan nama: garis pemisah `gambarGaris()` dari atas ke bawah, `jeda`
     0,06 antar garis
   - penanda: `t()` x dari luar kanan, `E.backOut(1,3)`, lalu tiap perpindahan
     `E.power2out` 0,35 dtk
   - loket menyala: `t()` opasitas + `filter` terang, 0,3 dtk
   - tangan penunjuk: `scaleX 0->1` dari sisi loket, `transformOrigin` di
     jendelanya, `E.expoOut`
   - tahap 9 dipercepat: durasi tween SAMA, cuma jarak `mulai`-nya yang
     dipersempit — melambatkan tween-nya akan terbaca sebagai gerakan yang beda,
     bukan sebagai ritme yang beda
   - kartu diganti: kartu lama `y` keluar `E.power2in`, kartu baru `y` masuk
     `E.expoOut`, tumpang tindih 0,15 dtk
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **penanda masuk dari kanan, dan itu tidak boleh dibalik.** seluruh gagasan
     scene ini adalah arah bacanya; penanda yang masuk dari kiri lalu melompat ke
     kanan akan mengajarkan hal yang sebaliknya di detik pertama.
   - **laci kosong diulang di tahap 6 dengan bentuk yang sama persis.** ini
     kutipan visual, bukan pengulangan yang malas: penonton mengenali laci yang
     baru saja dilihatnya, dan mengenali berarti "oh, yang ini pun tidak
     menyimpan".
   - **tahap 10 adalah satu-satunya laci berisi sampai titik ini**, dan karena
     itu ia diberi aksen penuh. kalau ada laci lain yang pernah digambar berisi
     sebelum ini, seluruh kontrasnya hilang.
   - **tahap 12 adalah bayaran scene 4.** di sana nomor berubah sendiri tanpa
     pelaku; di sini pelakunya punya wajah dan punya hak. loket lain yang diam
     total adalah bagian dari pernyataannya — jangan menyalakan apa pun di sana
     "supaya tidak sepi".
   - **jumlah loket di layar tetap dan tidak disebut.** berapa tingkat yang
     sebenarnya ada masih baris ⚠ di `naskah.md § Sumber`. yang digambar cukup
     untuk memperlihatkan polanya, dan VO cuma bilang "begitu terus".
   - sosok di tahap 11 netral: tanpa jas, tanpa dasi, tanpa atribut perusahaan.
     ia "yang punya", bukan "perusahaan besar".
